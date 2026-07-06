import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { AiAccessibilityReport, type A11yIssue } from '../components/ai-accessibility-report/ai-accessibility-report.js';

if (!customElements.get('ai-accessibility-report')) {
  customElements.define('ai-accessibility-report', AiAccessibilityReport);
}

const issues: A11yIssue[] = [
  { rule: 'color-contrast', level: 'AA', severity: 'error', element: '<p class="hint">', description: 'Low contrast', fix: 'Increase to 4.5:1' },
  { rule: 'image-alt', level: 'A', severity: 'warning', description: 'Missing alt text' },
];

describe('ai-accessibility-report', () => {
  let el: AiAccessibilityReport;

  beforeEach(async () => {
    el = document.createElement('ai-accessibility-report') as AiAccessibilityReport;
    el.issues = issues;
    el.score = 72;
    document.body.appendChild(el);
    await el.updateComplete;
  });

  afterEach(() => el.remove());

  it('clamps out-of-range scores for the meter and display', async () => {
    el.score = 140;
    await el.updateComplete;
    const meter = el.shadowRoot!.querySelector('[role="meter"]')!;
    expect(meter.getAttribute('aria-valuenow')).toBe('100');
    expect(meter.getAttribute('aria-label')).toContain('100 out of 100');
    expect(el.shadowRoot!.querySelector('.score-text')!.textContent).toContain('100');

    el.score = -5;
    await el.updateComplete;
    expect(meter.getAttribute('aria-valuenow')).toBe('0');
    const fg = el.shadowRoot!.querySelector('.score-fg')!;
    // offset equals full circumference at score 0 — never over-length
    expect(Number(fg.getAttribute('stroke-dashoffset'))).toBeCloseTo(2 * Math.PI * 27, 3);
  });

  it('uses Lighthouse-style score buckets (90 success / 50 warning / else error)', async () => {
    const color = () => (el.shadowRoot!.querySelector('.score-text') as HTMLElement).style.color;
    el.score = 95;
    await el.updateComplete;
    expect(color()).toContain('success');
    el.score = 55;
    await el.updateComplete;
    expect(color()).toContain('warning');
    el.score = 40;
    await el.updateComplete;
    expect(color()).toContain('error');
  });

  it('wires aria-controls from each disclosure button to its details panel', () => {
    const buttons = el.shadowRoot!.querySelectorAll('.issue-header');
    buttons.forEach((btn, i) => {
      expect(btn.getAttribute('aria-controls')).toBe(`issue-details-${i}`);
      const panel = el.shadowRoot!.getElementById(`issue-details-${i}`);
      expect(panel).not.toBeNull();
    });
  });

  it('hides collapsed details panels and reveals them on toggle', async () => {
    const btn = el.shadowRoot!.querySelector('.issue-header') as HTMLButtonElement;
    const panel = el.shadowRoot!.getElementById('issue-details-0')!;
    expect(panel.hasAttribute('hidden')).toBe(true);
    expect(btn.getAttribute('aria-expanded')).toBe('false');

    btn.click();
    await el.updateComplete;
    expect(panel.hasAttribute('hidden')).toBe(false);
    expect(btn.getAttribute('aria-expanded')).toBe('true');
    expect(panel.textContent).toContain('Low contrast');
    expect(panel.textContent).toContain('Increase to 4.5:1');
  });

  it('dispatches ai-a11y-issue-click with issue and index', async () => {
    let detail: any = null;
    el.addEventListener('ai-a11y-issue-click', ((e: CustomEvent) => { detail = e.detail; }) as EventListener);
    const buttons = el.shadowRoot!.querySelectorAll('.issue-header');
    (buttons[1] as HTMLElement).click();
    expect(detail).not.toBeNull();
    expect(detail.index).toBe(1);
    expect(detail.issue.rule).toBe('image-alt');
  });

  it('shows the empty state when there are no issues', async () => {
    el.issues = [];
    await el.updateComplete;
    const empty = el.shadowRoot!.querySelector('.empty[role="status"]')!;
    expect(empty.textContent).toContain('No accessibility issues found');
  });
});
