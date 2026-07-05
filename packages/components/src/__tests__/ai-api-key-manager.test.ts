import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { AiApiKeyManager, type ApiKeyEntry } from '../components/ai-api-key-manager/ai-api-key-manager.js';

if (!customElements.get('ai-api-key-manager')) {
  customElements.define('ai-api-key-manager', AiApiKeyManager);
}

const KEYS: ApiKeyEntry[] = [
  { id: '1', name: 'Production', prefix: 'sk-abc', createdAt: '2024-01-15', status: 'active' },
  { id: '2', name: 'Staging', prefix: 'sk-def', createdAt: '2024-02-01', status: 'revoked' },
];

const flush = async (el: AiApiKeyManager) => {
  await Promise.resolve();
  await Promise.resolve();
  await el.updateComplete;
};

describe('ai-api-key-manager', () => {
  let el: AiApiKeyManager;
  let writeText: ReturnType<typeof vi.fn>;

  beforeEach(async () => {
    writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', { value: { writeText }, configurable: true });
    el = document.createElement('ai-api-key-manager') as AiApiKeyManager;
    el.keys = [...KEYS];
    document.body.appendChild(el);
    await el.updateComplete;
  });

  afterEach(() => {
    el.remove();
    vi.useRealTimers();
  });

  it('gives each copy button a per-key aria-label', () => {
    const copyBtns = el.shadowRoot!.querySelectorAll('button[title="Copy"]');
    expect(copyBtns.length).toBe(2);
    expect(copyBtns[0]!.getAttribute('aria-label')).toBe('Copy key prefix for Production');
    expect(copyBtns[1]!.getAttribute('aria-label')).toBe('Copy key prefix for Staging');
  });

  it('announces copy success through a polite live region', async () => {
    const live = el.shadowRoot!.querySelector('[role="status"][aria-live="polite"]')!;
    expect(live.textContent!.trim()).toBe('');

    (el.shadowRoot!.querySelector('button[title="Copy"]') as HTMLElement).click();
    await flush(el);

    expect(writeText).toHaveBeenCalledWith('sk-abc');
    expect(live.textContent!.trim()).toBe('Key prefix copied to clipboard');
  });

  it('resets the copied timer when a second key is copied within 2s', async () => {
    vi.useFakeTimers();
    const copyBtns = el.shadowRoot!.querySelectorAll('button[title="Copy"]');

    (copyBtns[0] as HTMLElement).click();
    await flush(el);
    expect(el.shadowRoot!.querySelector('.copied-toast')).not.toBeNull();

    vi.advanceTimersByTime(1000);
    (copyBtns[1] as HTMLElement).click();
    await flush(el);

    // 2.5s after the first copy, 1.5s after the second — the stale timer must not wipe it.
    vi.advanceTimersByTime(1500);
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector('.copied-toast')).not.toBeNull();

    vi.advanceTimersByTime(600);
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector('.copied-toast')).toBeNull();
  });

  it('does not put redundant tabindex on native buttons', () => {
    const buttons = el.shadowRoot!.querySelectorAll('button');
    expect(buttons.length).toBeGreaterThan(0);
    buttons.forEach((b) => expect(b.hasAttribute('tabindex')).toBe(false));
  });

  it('renders svg icons in every action button', () => {
    const actionBtns = el.shadowRoot!.querySelectorAll('.action-btn');
    expect(actionBtns.length).toBeGreaterThan(0);
    actionBtns.forEach((b) => {
      const svg = b.querySelector('svg');
      expect(svg).not.toBeNull();
      expect(svg!.getAttribute('aria-hidden')).toBe('true');
    });
  });

  it('disables the create button at the key limit', async () => {
    el.maxKeys = 2;
    await el.updateComplete;
    const createBtn = el.shadowRoot!.querySelector('.create-btn') as HTMLButtonElement;
    expect(createBtn.disabled).toBe(true);
  });
});
