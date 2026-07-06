import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { AiCostDashboard } from '../components/ai-cost-dashboard/ai-cost-dashboard.js';

if (!customElements.get('ai-cost-dashboard')) {
  customElements.define('ai-cost-dashboard', AiCostDashboard);
}

describe('ai-cost-dashboard', () => {
  let el: AiCostDashboard;

  beforeEach(async () => {
    el = document.createElement('ai-cost-dashboard') as AiCostDashboard;
    el.entries = [
      { date: '2024-03-15', model: 'gpt-4o', inputTokens: 50000, outputTokens: 12000, cost: 0.42 },
      { date: '2024-03-16', model: 'claude', inputTokens: 30000, outputTokens: 8000, cost: 0.21 },
    ];
    el.budget = 50;
    document.body.appendChild(el);
    await el.updateComplete;
  });

  afterEach(() => el.remove());

  it('uses the tokenized focus-ring width, no raw px in the ring (acd-1)', () => {
    const cssText = (el.constructor as typeof AiCostDashboard).styles
      .map(s => (s as { cssText?: string }).cssText ?? '')
      .join('\n');
    expect(cssText).toContain('0 0 0 var(--cg-focus-ring-width) var(--cg-overlay-accent-strong)');
    expect(cssText).not.toContain('0 0 0 3px');
  });

  it('uses a background press feedback (not scale) on the full-width model row (acd-2)', () => {
    const cssText = (el.constructor as typeof AiCostDashboard).styles
      .map(s => (s as { cssText?: string }).cssText ?? '')
      .join('\n');
    expect(cssText).toContain('.model-row:active { background: var(--cg-color-surface-base-background); }');
    expect(cssText).not.toContain('.model-row:active { transform: scale');
  });

  it('renders a model breakdown row per unique model', () => {
    const rows = el.shadowRoot!.querySelectorAll('.model-row');
    expect(rows.length).toBe(2);
  });

  it('fires ai-cost-entry-click when a model row is clicked', async () => {
    let fired: { model: string; cost: number } | null = null;
    el.addEventListener('ai-cost-entry-click', (e) => {
      fired = (e as CustomEvent).detail;
    });
    (el.shadowRoot!.querySelector('.model-row') as HTMLElement).click();
    expect(fired).not.toBeNull();
    expect(fired!.model).toBe('gpt-4o');
  });

  it('shows the empty state when there are no entries', async () => {
    el.entries = [];
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector('.empty-state')!.textContent).toContain('No cost data');
  });
});
