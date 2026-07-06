/**
 * Focused tests for <ai-capture-flow>, covering the audit fixes:
 * step indicator uses role="group" not navigation (acf-5),
 * processing progressbar exposes aria-valuetext + a live region (acf-6),
 * plus core step rendering and events.
 */
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { AiCaptureFlow } from '../components/ai-capture-flow/ai-capture-flow.js';

if (!customElements.get('ai-capture-flow')) {
  customElements.define('ai-capture-flow', AiCaptureFlow);
}

describe('ai-capture-flow', () => {
  let element: AiCaptureFlow;

  beforeEach(async () => {
    element = document.createElement('ai-capture-flow') as AiCaptureFlow;
    document.body.appendChild(element);
    await element.updateComplete;
  });

  afterEach(() => element.remove());

  it('marks the step indicator as a group, not a navigation landmark', async () => {
    const steps = element.shadowRoot!.querySelector('.steps')!;
    expect(steps.getAttribute('role')).toBe('group');
    expect(steps.getAttribute('aria-label')).toBe('Capture progress');
  });

  it('exposes aria-valuetext and a live region on the processing step', async () => {
    element.step = 'processing';
    element.progress = 63;
    await element.updateComplete;

    const bar = element.shadowRoot!.querySelector('[role="progressbar"]')!;
    expect(bar.getAttribute('aria-valuetext')).toBe('63%');

    const pct = element.shadowRoot!.querySelector('.progress-pct')!;
    expect(pct.getAttribute('aria-live')).toBe('polite');
    expect(pct.getAttribute('aria-atomic')).toBe('true');
    expect(pct.textContent!.trim()).toBe('63%');
  });

  it('fires ai-capture-confirm from the preview Confirm button', async () => {
    element.step = 'preview';
    await element.updateComplete;

    let fired = false;
    element.addEventListener('ai-capture-confirm', () => { fired = true; });
    element.shadowRoot!.querySelector<HTMLButtonElement>('.btn-primary')!.click();
    expect(fired).toBe(true);
  });

  it('fires ai-capture-retry from the preview Retake button', async () => {
    element.step = 'preview';
    await element.updateComplete;

    let fired = false;
    element.addEventListener('ai-capture-retry', () => { fired = true; });
    element.shadowRoot!.querySelector<HTMLButtonElement>('.btn-secondary')!.click();
    expect(fired).toBe(true);
  });

  it('fires ai-capture-complete from the Done button on the complete step', async () => {
    element.step = 'complete';
    await element.updateComplete;

    let fired = false;
    element.addEventListener('ai-capture-complete', () => { fired = true; });
    element.shadowRoot!.querySelector<HTMLButtonElement>('.btn-primary')!.click();
    expect(fired).toBe(true);
  });
});
