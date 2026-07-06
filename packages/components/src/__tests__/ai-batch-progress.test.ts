/**
 * Focused tests for <ai-batch-progress>, covering the wave-A audit fixes:
 * percent clamping (ABP-12), status live region (ABP-08), no redundant
 * tabindex on native buttons (ABP-13), and event dispatch.
 */
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { AiBatchProgress } from '../components/ai-batch-progress/ai-batch-progress.js';

if (!customElements.get('ai-batch-progress')) {
  customElements.define('ai-batch-progress', AiBatchProgress);
}

describe('ai-batch-progress', () => {
  let element: AiBatchProgress;

  beforeEach(async () => {
    element = document.createElement('ai-batch-progress') as AiBatchProgress;
    element.total = 100;
    element.completed = 40;
    element.failed = 10;
    document.body.appendChild(element);
    await element.updateComplete;
  });

  afterEach(() => element.remove());

  it('exposes a progressbar with the correct aria-valuenow', () => {
    const bar = element.shadowRoot!.querySelector('[role="progressbar"]')!;
    expect(bar).not.toBeNull();
    expect(bar.getAttribute('aria-valuenow')).toBe('50');
    expect(bar.getAttribute('aria-valuemax')).toBe('100');
  });

  it('clamps percent and segment widths when completed + failed exceed total', async () => {
    element.completed = 150;
    element.failed = 30;
    await element.updateComplete;

    const bar = element.shadowRoot!.querySelector('[role="progressbar"]')!;
    expect(Number(bar.getAttribute('aria-valuenow'))).toBeLessThanOrEqual(100);

    const success = element.shadowRoot!.querySelector('.progress-success') as HTMLElement;
    expect(success.style.width).toBe('100%');
  });

  it('announces status changes via a role=status badge', async () => {
    const badge = element.shadowRoot!.querySelector('.status-badge')!;
    expect(badge.getAttribute('role')).toBe('status');
    expect(badge.textContent!.trim()).toBe('running');

    element.status = 'complete';
    await element.updateComplete;
    expect(element.shadowRoot!.querySelector('.status-badge')!.textContent!.trim()).toBe('complete');
  });

  it('renders action buttons without redundant tabindex', () => {
    const buttons = element.shadowRoot!.querySelectorAll('button');
    expect(buttons.length).toBeGreaterThan(0);
    buttons.forEach((btn) => {
      expect(btn.hasAttribute('tabindex')).toBe(false);
    });
  });

  it('shows pause/cancel while running and retry when failed', async () => {
    expect(element.shadowRoot!.querySelector('.action-btn.pause')).not.toBeNull();
    expect(element.shadowRoot!.querySelector('.action-btn.cancel')).not.toBeNull();

    element.status = 'failed';
    await element.updateComplete;
    expect(element.shadowRoot!.querySelector('.action-btn.retry')).not.toBeNull();
    expect(element.shadowRoot!.querySelector('.action-btn.pause')).toBeNull();
  });

  it('dispatches ai-batch-pause with job detail when pause is clicked', async () => {
    let detail: any = null;
    element.addEventListener('ai-batch-pause', (e) => {
      detail = (e as CustomEvent).detail;
    });

    (element.shadowRoot!.querySelector('.action-btn.pause') as HTMLButtonElement).click();
    expect(detail).toEqual({ total: 100, completed: 40, failed: 10, status: 'running' });
  });
});
