import { describe, it, expect, afterEach } from 'vitest';
import { AiTokenTracker } from '../components/ai-token-tracker/ai-token-tracker.js';

if (!customElements.get('ai-token-tracker')) {
  customElements.define('ai-token-tracker', AiTokenTracker);
}

async function mount(props: Partial<AiTokenTracker> = {}): Promise<AiTokenTracker> {
  const element = document.createElement('ai-token-tracker') as AiTokenTracker;
  Object.assign(element, props);
  document.body.appendChild(element);
  await element.updateComplete;
  return element;
}

describe('ai-token-tracker', () => {
  afterEach(() => {
    document.body.querySelectorAll('ai-token-tracker').forEach((el) => el.remove());
  });

  it('compact badge is keyboard-operable (role=button, tabindex=0, no live region)', async () => {
    const el = await mount({ mode: 'compact', inputTokens: 100, outputTokens: 50 });
    const badge = el.shadowRoot!.querySelector('.compact')!;
    expect(badge.getAttribute('role')).toBe('button');
    expect(badge.getAttribute('tabindex')).toBe('0');
    expect(badge.hasAttribute('aria-live')).toBe(false);
  });

  it('dispatches ai-token-click on Enter and Space via keyboard', async () => {
    const el = await mount({ mode: 'compact', cost: 0.5 });
    const badge = el.shadowRoot!.querySelector('.compact') as HTMLElement;
    let count = 0;
    el.addEventListener('ai-token-click', () => count++);
    badge.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    badge.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true }));
    expect(count).toBe(2);
  });

  it('detailed card uses role=group, not a status live region', async () => {
    const el = await mount({ mode: 'detailed', inputTokens: 10 });
    const card = el.shadowRoot!.querySelector('.detailed')!;
    expect(card.getAttribute('role')).toBe('group');
    expect(card.hasAttribute('aria-live')).toBe(false);
    expect(card.getAttribute('aria-label')).toBe('Token usage details');
  });

  it('applies latency class (fast/medium/slow) to the latency value', async () => {
    const fast = await mount({ mode: 'detailed', latency: 500 });
    expect(fast.shadowRoot!.querySelector('.metric-value.fast')).toBeTruthy();
    const slow = await mount({ mode: 'detailed', latency: 5000 });
    expect(slow.shadowRoot!.querySelector('.metric-value.slow')).toBeTruthy();
  });

  it('uses the semantic focus-ring token, not a translucent overlay', async () => {
    const el = await mount();
    const css = (el.constructor as typeof AiTokenTracker).styles!.toString();
    expect(css).toContain('var(--cg-color-focus-ring)');
    expect(css).not.toContain('box-shadow: 0 0 0 var(--cg-focus-ring-width) var(--cg-overlay-accent-strong)');
  });
});
