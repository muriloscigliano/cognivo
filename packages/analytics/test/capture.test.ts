import { describe, it, expect, afterEach, beforeEach, vi } from 'vitest';
import {
  enableAnalytics,
  disableAnalytics,
  extendEventRegistry,
  getSessionId,
  sanitizeDetail,
  REDACTED,
} from '../src/index.js';

// happy-dom doesn't auto-reset between tests; clear handlers ourselves.
afterEach(() => {
  disableAnalytics();
  document.body.innerHTML = '';
});

describe('enableAnalytics — basic capture', () => {
  it('captures a cg-button-click event', () => {
    const sink = vi.fn();
    enableAnalytics({ sink });

    const btn = document.createElement('cg-button');
    document.body.appendChild(btn);
    btn.dispatchEvent(
      new CustomEvent('cg-button-click', {
        bubbles: true,
        composed: true,
        detail: { variant: 'primary' },
      })
    );

    expect(sink).toHaveBeenCalledTimes(1);
    const event = sink.mock.calls[0][0];
    expect(event.component).toBe('cg-button');
    expect(event.event).toBe('cg-button-click');
    expect(event.detail.variant).toBe('primary');
    expect(event.sessionId).toBeTruthy();
    expect(typeof event.timestamp).toBe('string');
  });

  it('captures an ai-* event from a nested custom element', () => {
    const sink = vi.fn();
    enableAnalytics({ sink });

    const chat = document.createElement('ai-chat');
    document.body.appendChild(chat);
    chat.dispatchEvent(
      new CustomEvent('ai-message-sent', {
        bubbles: true,
        composed: true,
        detail: { role: 'user' },
      })
    );

    expect(sink).toHaveBeenCalledTimes(1);
    expect(sink.mock.calls[0][0].component).toBe('ai-chat');
  });

  it('ignores non-Cognivo events', () => {
    const sink = vi.fn();
    enableAnalytics({ sink });

    // "click" isn't in the registry; even if we add listeners we wouldn't
    // have one bound. Use a cognivo-named type but from a non-cognivo tag.
    const div = document.createElement('div');
    document.body.appendChild(div);
    div.dispatchEvent(
      new CustomEvent('cg-button-click', { bubbles: true, composed: true })
    );

    expect(sink).not.toHaveBeenCalled();
  });
});

describe('enableAnalytics — filtering', () => {
  it('filters by trackComponents glob', () => {
    const sink = vi.fn();
    enableAnalytics({ sink, trackComponents: ['bias-*'] });

    const btn = document.createElement('cg-button');
    document.body.appendChild(btn);
    btn.dispatchEvent(
      new CustomEvent('cg-button-click', { bubbles: true, composed: true })
    );

    expect(sink).not.toHaveBeenCalled();

    const biasEl = document.createElement('bias-commitment');
    document.body.appendChild(biasEl);
    biasEl.dispatchEvent(
      new CustomEvent('bias-commitment-advance', {
        bubbles: true,
        composed: true,
      })
    );

    expect(sink).toHaveBeenCalledTimes(1);
    expect(sink.mock.calls[0][0].component).toBe('bias-commitment');
  });

  it('filters by trackEvents glob', () => {
    const sink = vi.fn();
    enableAnalytics({ sink, trackEvents: ['cg-modal-*'] });

    const btn = document.createElement('cg-button');
    document.body.appendChild(btn);
    btn.dispatchEvent(
      new CustomEvent('cg-button-click', { bubbles: true, composed: true })
    );
    expect(sink).not.toHaveBeenCalled();

    const modal = document.createElement('cg-modal');
    document.body.appendChild(modal);
    modal.dispatchEvent(
      new CustomEvent('cg-modal-open', { bubbles: true, composed: true })
    );

    expect(sink).toHaveBeenCalledTimes(1);
    expect(sink.mock.calls[0][0].event).toBe('cg-modal-open');
  });

  it('respects sampleRate = 0 (captures nothing)', () => {
    const sink = vi.fn();
    enableAnalytics({ sink, sampleRate: 0 });

    const btn = document.createElement('cg-button');
    document.body.appendChild(btn);
    for (let i = 0; i < 50; i++) {
      btn.dispatchEvent(
        new CustomEvent('cg-button-click', { bubbles: true, composed: true })
      );
    }
    expect(sink).not.toHaveBeenCalled();
  });

  it('respects sampleRate = 1 (captures everything)', () => {
    const sink = vi.fn();
    enableAnalytics({ sink, sampleRate: 1 });

    const btn = document.createElement('cg-button');
    document.body.appendChild(btn);
    for (let i = 0; i < 10; i++) {
      btn.dispatchEvent(
        new CustomEvent('cg-button-click', { bubbles: true, composed: true })
      );
    }
    expect(sink).toHaveBeenCalledTimes(10);
  });
});

describe('enableAnalytics — privacy & sanitization', () => {
  it('anonymizes long strings by default', () => {
    const sink = vi.fn();
    enableAnalytics({ sink });

    const longString = 'x'.repeat(200);
    const btn = document.createElement('cg-button');
    document.body.appendChild(btn);
    btn.dispatchEvent(
      new CustomEvent('cg-button-click', {
        bubbles: true,
        composed: true,
        detail: { email: longString, short: 'ok' },
      })
    );

    const detail = sink.mock.calls[0][0].detail;
    expect(detail.email.length).toBeLessThanOrEqual(41); // 40 + '…'
    expect(detail.email.endsWith('…')).toBe(true);
    expect(detail.short).toBe('ok');
  });

  it('drops deeply nested objects beyond depth 2', () => {
    // depth 0 => a is recursed (call depth 1)
    // depth 1 => b is recursed (call depth 2)
    // depth 2 => c is NOT recursed (depth < 2 is false), so `c` is dropped.
    const result = sanitizeDetail({
      a: { b: { c: { d: 'too deep' }, keep: 'kept' } },
    });
    expect(result).toEqual({ a: { b: { keep: 'kept' } } });
  });

  it('keeps shallow nested objects up to depth 2', () => {
    // a (0) → b (1) → primitive at depth 2 is kept
    const result = sanitizeDetail({
      a: { b: { kept: 'ok', num: 7, bool: true } },
    });
    expect(result).toEqual({ a: { b: { kept: 'ok', num: 7, bool: true } } });
  });

  it('drops functions, symbols, and bigints', () => {
    const result = sanitizeDetail({
      fn: () => 1,
      sym: Symbol('x'),
      big: 10n,
      kept: 42,
    });
    expect(result).toEqual({ kept: 42 });
  });

  it('defaults page to pathname (no query/hash)', () => {
    const sink = vi.fn();
    enableAnalytics({ sink });

    const btn = document.createElement('cg-button');
    document.body.appendChild(btn);
    btn.dispatchEvent(
      new CustomEvent('cg-button-click', { bubbles: true, composed: true })
    );

    const page = sink.mock.calls[0][0].page;
    expect(page).not.toContain('?');
    expect(page).not.toContain('#');
  });

  it('skips anonymization when anonymizeDetail: false', () => {
    const sink = vi.fn();
    enableAnalytics({ sink, anonymizeDetail: false });

    const longString = 'x'.repeat(200);
    const btn = document.createElement('cg-button');
    document.body.appendChild(btn);
    btn.dispatchEvent(
      new CustomEvent('cg-button-click', {
        bubbles: true,
        composed: true,
        detail: { raw: longString },
      })
    );

    expect(sink.mock.calls[0][0].detail.raw).toBe(longString);
  });
});

describe('sanitizeDetail — secret redaction', () => {
  it('redacts fields whose name looks like a secret, regardless of length', () => {
    const result = sanitizeDetail({
      password: 'hunter2',
      newPassword: 'short',
      apiKey: 'sk-abc',
      access_token: 'xyz',
      cardNumber: '4111111111111111',
      cvv: '123',
      ssn: '123-45-6789',
      authHeader: 'Bearer t',
      username: 'alice', // benign — kept
    });

    expect(result.password).toBe(REDACTED);
    expect(result.newPassword).toBe(REDACTED);
    expect(result.apiKey).toBe(REDACTED);
    expect(result.access_token).toBe(REDACTED);
    expect(result.cardNumber).toBe(REDACTED);
    expect(result.cvv).toBe(REDACTED);
    expect(result.ssn).toBe(REDACTED);
    expect(result.authHeader).toBe(REDACTED);
    expect(result.username).toBe('alice');
  });

  it('redacts event-specific generic keys (OTP/password value, search query)', () => {
    expect(sanitizeDetail({ value: '482913' }, 0, 'cg-otp-change').value).toBe(REDACTED);
    expect(sanitizeDetail({ value: '482913' }, 0, 'cg-otp-complete').value).toBe(REDACTED);
    expect(sanitizeDetail({ value: 'p@ss' }, 0, 'cg-password-change').value).toBe(REDACTED);
    expect(sanitizeDetail({ query: 'john doe cancer' }, 0, 'ai-search-query').query).toBe(REDACTED);
    expect(sanitizeDetail({ query: 'x' }, 0, 'ai-memory-search').query).toBe(REDACTED);
  });

  it('does NOT over-redact benign keys that merely contain a substring', () => {
    // `tokens` is an LLM token COUNT, not a credential; `author`/`pinned`
    // are not secrets. These must survive so useful telemetry isn't lost.
    const result = sanitizeDetail({
      tokens: 1280,
      tokenCount: 42,
      author: 'alice',
      pinned: true,
      label: 'intro',
    });
    expect(result.tokens).toBe(1280);
    expect(result.tokenCount).toBe(42);
    expect(result.author).toBe('alice');
    expect(result.pinned).toBe(true);
    expect(result.label).toBe('intro');
  });

  it('does NOT redact a generic `value` key for unrelated events', () => {
    // A slider/select `value` is not a secret — only the OTP/password
    // events register `value` as sensitive.
    expect(sanitizeDetail({ value: 'medium' }, 0, 'cg-button-click').value).toBe('medium');
    expect(sanitizeDetail({ value: 42 }).value).toBe(42);
  });

  it('redacts password verbatim through the full capture path', () => {
    const sink = vi.fn();
    enableAnalytics({ sink });
    extendEventRegistry(['cg-password-change']);

    const input = document.createElement('cg-password-input');
    document.body.appendChild(input);
    input.dispatchEvent(
      new CustomEvent('cg-password-change', {
        bubbles: true,
        composed: true,
        detail: { value: 'hunter2', strength: 3 },
      })
    );

    const detail = sink.mock.calls[0][0].detail;
    expect(detail.value).toBe(REDACTED);
    expect(detail.strength).toBe(3); // non-secret sibling kept
  });

  it('redacts OTP code through the full capture path', () => {
    const sink = vi.fn();
    enableAnalytics({ sink });
    extendEventRegistry(['cg-otp-complete']);

    const input = document.createElement('cg-otp-input');
    document.body.appendChild(input);
    input.dispatchEvent(
      new CustomEvent('cg-otp-complete', {
        bubbles: true,
        composed: true,
        detail: { value: '482913' },
      })
    );

    expect(sink.mock.calls[0][0].detail.value).toBe(REDACTED);
  });
});

describe('enableAnalytics — lifecycle', () => {
  it('disableAnalytics removes listeners', () => {
    const sink = vi.fn();
    enableAnalytics({ sink });
    disableAnalytics();

    const btn = document.createElement('cg-button');
    document.body.appendChild(btn);
    btn.dispatchEvent(
      new CustomEvent('cg-button-click', { bubbles: true, composed: true })
    );

    expect(sink).not.toHaveBeenCalled();
  });

  it('calling enableAnalytics twice replaces the previous capture', () => {
    const sinkA = vi.fn();
    const sinkB = vi.fn();
    enableAnalytics({ sink: sinkA });
    enableAnalytics({ sink: sinkB });

    const btn = document.createElement('cg-button');
    document.body.appendChild(btn);
    btn.dispatchEvent(
      new CustomEvent('cg-button-click', { bubbles: true, composed: true })
    );

    expect(sinkA).not.toHaveBeenCalled();
    expect(sinkB).toHaveBeenCalledTimes(1);
  });

  it('sessionId is stable across enable/disable cycles on one page', () => {
    enableAnalytics({ sink: () => {} });
    const first = getSessionId();
    disableAnalytics();
    enableAnalytics({ sink: () => {} });
    const second = getSessionId();

    expect(first).toBeTruthy();
    expect(first).toBe(second);
  });

  it('sink throwing does not crash the capture pipeline', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    enableAnalytics({
      sink: () => {
        throw new Error('boom');
      },
    });

    const btn = document.createElement('cg-button');
    document.body.appendChild(btn);
    expect(() =>
      btn.dispatchEvent(
        new CustomEvent('cg-button-click', { bubbles: true, composed: true })
      )
    ).not.toThrow();

    expect(warn).toHaveBeenCalled();
    warn.mockRestore();
  });

  it('throws if sink is not a function', () => {
    expect(() =>
      // @ts-expect-error intentional
      enableAnalytics({ sink: 'nope' })
    ).toThrow(TypeError);
  });
});

describe('extendEventRegistry', () => {
  it('captures custom event types added at runtime', () => {
    const sink = vi.fn();
    enableAnalytics({ sink });
    extendEventRegistry(['cg-totally-custom']);

    const btn = document.createElement('cg-button');
    document.body.appendChild(btn);
    btn.dispatchEvent(
      new CustomEvent('cg-totally-custom', { bubbles: true, composed: true })
    );

    expect(sink).toHaveBeenCalledTimes(1);
    expect(sink.mock.calls[0][0].event).toBe('cg-totally-custom');
  });
});
