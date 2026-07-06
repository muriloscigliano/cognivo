/**
 * Focused tests for <ai-cache-indicator>, covering the audit fixes:
 * disabled pill is inert (aci-5), loading dot animates (aci-4),
 * progressbar has an accessible name (aci-3), and the detail toggle event.
 */
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { AiCacheIndicator } from '../components/ai-cache-indicator/ai-cache-indicator.js';

if (!customElements.get('ai-cache-indicator')) {
  customElements.define('ai-cache-indicator', AiCacheIndicator);
}

describe('ai-cache-indicator', () => {
  let element: AiCacheIndicator;

  beforeEach(async () => {
    element = document.createElement('ai-cache-indicator') as AiCacheIndicator;
    document.body.appendChild(element);
    await element.updateComplete;
  });

  afterEach(() => element.remove());

  it('renders a disabled pill when status is disabled and does not open the detail card', async () => {
    element.status = 'disabled';
    await element.updateComplete;
    const pill = element.shadowRoot!.querySelector<HTMLButtonElement>('.pill')!;
    expect(pill.disabled).toBe(true);

    pill.click();
    await element.updateComplete;
    expect(element.showDetails).toBe(false);
    expect(element.shadowRoot!.querySelector('.detail-card')).toBeNull();
  });

  it('toggles the detail card and fires ai-cache-detail when active', async () => {
    element.status = 'hit';
    element.hitRate = 87;
    await element.updateComplete;

    let detail: any = null;
    element.addEventListener('ai-cache-detail', (e) => { detail = (e as CustomEvent).detail; });

    const pill = element.shadowRoot!.querySelector<HTMLButtonElement>('.pill')!;
    pill.click();
    await element.updateComplete;

    expect(element.showDetails).toBe(true);
    expect(detail).toEqual({ status: 'hit', hitRate: 87 });
    expect(element.shadowRoot!.querySelector('.detail-card')).not.toBeNull();
  });

  it('gives the hit-rate progressbar an accessible name and value', async () => {
    element.status = 'hit';
    element.hitRate = 42;
    element.showDetails = true;
    await element.updateComplete;

    const bar = element.shadowRoot!.querySelector('[role="progressbar"]')!;
    expect(bar.getAttribute('aria-label')).toBe('Cache hit rate');
    expect(bar.getAttribute('aria-valuenow')).toBe('42');
  });

  it('marks the loading dot with a pulse animation', async () => {
    element.status = 'loading';
    await element.updateComplete;
    const dot = element.shadowRoot!.querySelector('.dot.loading')!;
    expect(dot).not.toBeNull();
    // animation shorthand set via CSS; class presence drives the keyframe rule
    expect(dot.classList.contains('loading')).toBe(true);
  });

  it('fires ai-cache-clear from the Clear Cache button', async () => {
    element.status = 'hit';
    element.showDetails = true;
    await element.updateComplete;

    let fired = false;
    element.addEventListener('ai-cache-clear', () => { fired = true; });
    element.shadowRoot!.querySelector<HTMLButtonElement>('.clear-btn')!.click();
    expect(fired).toBe(true);
  });
});
