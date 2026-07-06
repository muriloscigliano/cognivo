import { describe, it, expect, afterEach } from 'vitest';
import { AiDataTable } from '../components/ai-data-table/ai-data-table.js';

if (!customElements.get('ai-data-table')) {
  customElements.define('ai-data-table', AiDataTable);
}

/**
 * NOTE: ai-data-table renders `<table><tr><td>` in Lit templates, which trips
 * happy-dom's duplicate-attribute parse error when a `<th>`/`<td>` template is
 * rendered as a fostered root (same limitation documented in cg-table.test.ts).
 * So the full table render is exercised only via the render paths that do NOT
 * emit table markup (e.g. the "No columns" empty state), and everything else is
 * verified through static styles and private logic without calling render.
 */
function make(props: Partial<AiDataTable> = {}): AiDataTable {
  const el = document.createElement('ai-data-table') as AiDataTable;
  Object.assign(el, props);
  return el;
}

function cssText(): string {
  const styles = (AiDataTable as typeof AiDataTable).styles as Array<{ cssText?: string }>;
  return styles.map((s) => s.cssText ?? '').join('\n');
}

describe('ai-data-table', () => {
  afterEach(() => {
    document.body.querySelectorAll('ai-data-table').forEach((el) => el.remove());
  });

  it('exposes a configurable accessible-name property defaulting to empty (adt-6)', () => {
    expect(make().label).toBe('');
    expect(make({ label: 'Quarterly revenue' }).label).toBe('Quarterly revenue');
  });

  it('gives the no-columns empty state a live region (adt-5)', async () => {
    // columns=[] renders WITHOUT any table markup, so happy-dom is happy here.
    const el = make({ columns: [] });
    document.body.appendChild(el);
    await el.updateComplete;
    const empty = el.shadowRoot!.querySelector('.empty-state');
    expect(empty?.getAttribute('role')).toBe('status');
    el.remove();
  });

  it('activates an anomaly cell from the keyboard handler path (adt-4)', () => {
    const el = make({
      columns: [{ key: 'score', label: 'Score' }],
      data: [{ score: 12 }],
      anomalies: [{ row: 0, col: 'score', severity: 'high', reason: 'Unusually low' }],
    });
    let cellClicks = 0;
    let anomalyClicks = 0;
    el.addEventListener('ai-data-cell-click', () => { cellClicks++; });
    el.addEventListener('ai-data-anomaly-click', () => { anomalyClicks++; });
    // Drive the same private handlers the keydown listener invokes.
    (el as unknown as { _handleCellClick(r: number, c: string, v: unknown): void })._handleCellClick(0, 'score', 12);
    (el as unknown as { _handleAnomalyClick(a: unknown): void })._handleAnomalyClick({ row: 0, col: 'score', severity: 'high', reason: 'Unusually low' });
    expect(cellClicks).toBe(1);
    expect(anomalyClicks).toBe(1);
  });

  it('gives anomaly cells a tokenized focus-visible ring (adt-4)', () => {
    expect(cssText()).toContain('td.anomaly-cell:focus-visible');
    expect(cssText()).toContain('var(--cg-focus-ring-width) var(--cg-color-focus-ring)');
  });

  it('uses semantic accent/focus tokens, not action -background- as a foreground (adt-1/2/3)', () => {
    const css = cssText();
    expect(css).toContain('--cg-color-accent-text');
    expect(css).toContain('--cg-color-focus-ring');
    // The -background- token must not be used as color/box-shadow foreground anymore.
    expect(css).not.toContain('color: var(--cg-color-action-primary-background-default)');
    expect(css).not.toContain('var(--cg-border-width-100) var(--cg-color-action-primary-background-default)');
  });
});
