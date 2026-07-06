import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { AiKpiGrid } from '../components/ai-kpi-grid/ai-kpi-grid.js';

if (!customElements.get('ai-kpi-grid')) {
  customElements.define('ai-kpi-grid', AiKpiGrid);
}

describe('ai-kpi-grid', () => {
  let element: AiKpiGrid;

  beforeEach(async () => {
    element = document.createElement('ai-kpi-grid') as AiKpiGrid;
    document.body.appendChild(element);
    await element.updateComplete;
  });

  afterEach(() => element.remove());

  it('renders an empty-state message when not loading and no kpis', () => {
    const empty = element.shadowRoot!.querySelector('.kpi-empty');
    expect(empty).not.toBeNull();
    expect(empty!.textContent).toContain('No metrics available');
  });

  it('does not render the empty state while loading', async () => {
    element.loading = true;
    await element.updateComplete;
    expect(element.shadowRoot!.querySelector('.kpi-empty')).toBeNull();
    expect(element.shadowRoot!.querySelector('.skeleton-cell')).not.toBeNull();
  });

  it('renders kpi cells and fires ai-kpi-click', async () => {
    element.kpis = [{ label: 'Revenue', value: '$12K', delta: '+8%', trend: 'up' }];
    await element.updateComplete;

    const cells = element.shadowRoot!.querySelectorAll('.kpi');
    expect(cells.length).toBe(1);
    expect(element.shadowRoot!.querySelector('.kpi-empty')).toBeNull();

    let detail: unknown = null;
    element.addEventListener('ai-kpi-click', ((e: CustomEvent) => { detail = e.detail; }) as EventListener);
    (cells[0] as HTMLElement).click();
    expect((detail as { label: string }).label).toBe('Revenue');
  });

  it('scopes the 1-column divider removal so focus ring survives', () => {
    // The last-child divider rule must not clobber the focus outline.
    const sheets = element.shadowRoot!.adoptedStyleSheets;
    const cssText = sheets
      .flatMap(s => Array.from(s.cssRules).map(r => r.cssText))
      .join('\n');
    expect(cssText).toContain(':host([columns="1"]) .kpi:last-child:not(:focus-visible)');
  });

  it('skeleton cell count falls back to columns*2 with no kpis', async () => {
    element.loading = true;
    element.columns = 3;
    await element.updateComplete;
    const skels = element.shadowRoot!.querySelectorAll('.skeleton-cell');
    expect(skels.length).toBe(6);
  });

  it('skeleton matches known kpi count when pre-populated', async () => {
    element.kpis = [
      { label: 'A', value: '1' },
      { label: 'B', value: '2' },
      { label: 'C', value: '3' },
    ];
    element.loading = true;
    await element.updateComplete;
    const skels = element.shadowRoot!.querySelectorAll('.skeleton-cell');
    expect(skels.length).toBe(3);
  });
});
