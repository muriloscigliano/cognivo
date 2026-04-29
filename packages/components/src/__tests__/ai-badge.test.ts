/**
 * Smoke tests for the deprecated <ai-badge> shim.
 * The full behavior suite lives in `ai-confidence-badge.test.ts` — this file
 * only verifies the shim renders the new element underneath and re-fires
 * the legacy `ai-badge-click` event.
 */
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { AiBadge } from '../components/ai-badge/ai-badge.js';

if (!customElements.get('ai-badge')) {
  customElements.define('ai-badge', AiBadge);
}

describe('ai-badge (deprecated shim)', () => {
  let element: AiBadge;

  beforeEach(async () => {
    element = document.createElement('ai-badge') as AiBadge;
    document.body.appendChild(element);
    await element.updateComplete;
  });

  afterEach(() => element.remove());

  it('renders an inner ai-confidence-badge', () => {
    const inner = element.shadowRoot!.querySelector('ai-confidence-badge');
    expect(inner).not.toBeNull();
  });

  it('forwards the score property', async () => {
    element.score = 0.92;
    await element.updateComplete;
    const inner = element.shadowRoot!.querySelector('ai-confidence-badge') as any;
    expect(inner.score).toBe(0.92);
  });

  it('re-fires legacy ai-badge-click when inner element clicked', async () => {
    element.score = 0.65;
    await element.updateComplete;

    let detail: any = null;
    element.addEventListener('ai-badge-click', (e) => {
      detail = (e as CustomEvent).detail;
    });

    const inner = element.shadowRoot!.querySelector('ai-confidence-badge') as any;
    await inner.updateComplete;
    inner.dispatchEvent(new CustomEvent('ai-confidence-badge-click', {
      detail: { score: 0.65, level: 'medium' },
      bubbles: true,
      composed: true,
    }));

    expect(detail).toEqual({ score: 0.65, level: 'medium' });
  });
});
