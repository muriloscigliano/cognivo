import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import type { CSSResult } from 'lit';
import { AiContextWindow, type ContextSegment } from '../components/ai-context-window/ai-context-window.js';

if (!customElements.get('ai-context-window')) {
  customElements.define('ai-context-window', AiContextWindow);
}

const cssText = (AiContextWindow.styles as CSSResult[]).map((s) => s.cssText).join('\n');

const SEGMENTS: ContextSegment[] = [
  { label: 'System', tokens: 2000 },
  { label: 'History', tokens: 4000 },
];

describe('ai-context-window', () => {
  let el: AiContextWindow;

  beforeEach(async () => {
    el = document.createElement('ai-context-window') as AiContextWindow;
    el.total = 128000;
    el.segments = SEGMENTS.map((s) => ({ ...s }));
    document.body.appendChild(el);
    await el.updateComplete;
  });

  afterEach(() => el.remove());

  it('exposes each segment as a keyboard-focusable button with an accessible name', () => {
    const segs = el.shadowRoot!.querySelectorAll('.segment');
    expect(segs.length).toBe(2);
    segs.forEach((s) => {
      expect(s.getAttribute('role')).toBe('button');
      expect(s.getAttribute('tabindex')).toBe('0');
    });
    expect(segs[0].getAttribute('aria-label')).toBe('System: 2.0k');
  });

  it('activates a segment via Enter and Space keydown, dispatching ai-context-segment-click', () => {
    const events: Array<{ label: string; tokens: number }> = [];
    el.addEventListener('ai-context-segment-click', ((e: CustomEvent) => { events.push(e.detail); }) as EventListener);
    const seg = el.shadowRoot!.querySelector('.segment') as HTMLElement;
    seg.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    seg.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true }));
    expect(events).toEqual([
      { label: 'System', tokens: 2000 },
      { label: 'System', tokens: 2000 },
    ]);
  });

  it('reveals the tooltip on keyboard focus (focus-visible parity, not hover-only)', () => {
    expect(cssText).toContain('.segment:focus-visible::after');
  });

  it('clamps over-budget segment widths to <=100% and flags the bar as over', async () => {
    el.total = 5000;
    el.segments = [
      { label: 'A', tokens: 4000 },
      { label: 'B', tokens: 6000 },
    ];
    await el.updateComplete;
    const bar = el.shadowRoot!.querySelector('.bar')!;
    expect(bar.classList.contains('over')).toBe(true);
    const widths = [...el.shadowRoot!.querySelectorAll('.segment')].map((s) => {
      const m = (s.getAttribute('style') || '').match(/width:\s*([\d.]+)%/);
      return m ? parseFloat(m[1]) : 0;
    });
    const sum = widths.reduce((a, b) => a + b, 0);
    expect(sum).toBeLessThanOrEqual(100.01);
  });

  it('ships the over-budget bar style and segment focus ring with semantic tokens', () => {
    expect(cssText).toContain('.bar.over');
    expect(cssText).toContain('var(--cg-color-status-error-border-default)');
    expect(cssText).toContain('.segment:focus-visible');
    expect(cssText).toContain('var(--cg-focus-ring-color)');
  });
});
