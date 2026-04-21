import { describe, it, expect, afterEach } from 'vitest';
import { CgTable } from '../components/cg-table/cg-table.js';

if (!customElements.get('cg-table')) {
  customElements.define('cg-table', CgTable);
}

/**
 * NOTE: cg-table uses `<tr><td>` directly in Lit templates which triggers
 * happy-dom's duplicate-attribute parse error when rendered outside a table
 * context. We test prop defaults, attribute reflection, and private logic by
 * instantiating elements without calling `updateComplete` (so no render
 * occurs), and invoking the private methods directly.
 */
describe('cg-table', () => {
  let el: CgTable;

  function make(props?: Partial<CgTable>): CgTable {
    el = document.createElement('cg-table') as CgTable;
    if (props) {
      for (const [k, v] of Object.entries(props)) {
        (el as any)[k] = v;
      }
    }
    return el;
  }

  afterEach(() => el?.remove());

  // ── Defaults ──

  it('is defined as a custom element', () => {
    expect(customElements.get('cg-table')).toBeDefined();
  });

  it('creates an instance', () => {
    expect(make()).toBeInstanceOf(CgTable);
  });

  it('default columns is empty array', () => {
    expect(make().columns).toEqual([]);
  });

  it('default rows is empty array', () => {
    expect(make().rows).toEqual([]);
  });

  it('default emptyText is "No data"', () => {
    expect(make().emptyText).toBe('No data');
  });

  it('default striped is false', () => {
    expect(make().striped).toBe(false);
  });

  it('default compact is false', () => {
    expect(make().compact).toBe(false);
  });

  it('default clickable is false', () => {
    expect(make().clickable).toBe(false);
  });

  it('default selectable is false', () => {
    expect(make().selectable).toBe(false);
  });

  it('default loading is false', () => {
    expect(make().loading).toBe(false);
  });

  it('default rounded is lg', () => {
    expect(make().rounded).toBe('lg');
  });

  it('default loadingRows is 5', () => {
    expect(make().loadingRows).toBe(5);
  });

  // ── Props ──

  it('accepts columns prop', () => {
    const cols = [{ key: 'name', label: 'Name' }];
    expect(make({ columns: cols }).columns).toEqual(cols);
  });

  it('accepts rows prop', () => {
    const rows = [['Alice', 30]];
    expect(make({ rows }).rows).toEqual(rows);
  });

  // ── Private logic via direct invocation (no render required) ──

  it('_handleSort sets sort key and emits cg-sort with asc direction', () => {
    const el2 = make();
    const col = { key: 'name', label: 'Name', sortable: true };
    let detail: any;
    el2.addEventListener('cg-sort', (e: any) => (detail = e.detail));
    (el2 as any)._handleSort(col);
    expect(detail).toEqual({ key: 'name', direction: 'asc' });
  });

  it('_handleSort on same column toggles direction to desc', () => {
    const el2 = make();
    const col = { key: 'name', label: 'Name', sortable: true };
    let detail: any;
    el2.addEventListener('cg-sort', (e: any) => (detail = e.detail));
    (el2 as any)._handleSort(col);
    (el2 as any)._handleSort(col);
    expect(detail).toEqual({ key: 'name', direction: 'desc' });
  });

  it('_handleSort switching columns resets to asc', () => {
    const el2 = make();
    const colA = { key: 'a', label: 'A', sortable: true };
    const colB = { key: 'b', label: 'B', sortable: true };
    (el2 as any)._handleSort(colA);
    (el2 as any)._handleSort(colA); // desc
    let detail: any;
    el2.addEventListener('cg-sort', (e: any) => (detail = e.detail));
    (el2 as any)._handleSort(colB);
    expect(detail).toEqual({ key: 'b', direction: 'asc' });
  });

  it('_handleSort ignores non-sortable columns', () => {
    const el2 = make();
    const col = { key: 'name', label: 'Name' };
    let fired = false;
    el2.addEventListener('cg-sort', () => (fired = true));
    (el2 as any)._handleSort(col);
    expect(fired).toBe(false);
  });

  it('_toggleRow adds and removes index from selection and dispatches cg-select', () => {
    const el2 = make({ rows: [['A'], ['B'], ['C']] });
    let detail: any;
    el2.addEventListener('cg-select', (e: any) => (detail = e.detail));
    (el2 as any)._toggleRow(1);
    expect(detail.indices).toEqual([1]);
    (el2 as any)._toggleRow(2);
    expect(detail.indices).toEqual([1, 2]);
    (el2 as any)._toggleRow(1);
    expect(detail.indices).toEqual([2]);
  });

  it('_toggleAll selects every row when none selected', () => {
    const el2 = make({ rows: [['A'], ['B']] });
    let detail: any;
    el2.addEventListener('cg-select', (e: any) => (detail = e.detail));
    (el2 as any)._toggleAll();
    expect(detail.indices.length).toBe(2);
    expect(detail.indices).toContain(0);
    expect(detail.indices).toContain(1);
  });

  it('_toggleAll clears when all already selected', () => {
    const el2 = make({ rows: [['A'], ['B']] });
    (el2 as any)._toggleAll();
    let detail: any;
    el2.addEventListener('cg-select', (e: any) => (detail = e.detail));
    (el2 as any)._toggleAll();
    expect(detail.indices).toEqual([]);
  });

  it('_handleRowClick dispatches cg-row-click when clickable', () => {
    const el2 = make({ clickable: true });
    let detail: any;
    el2.addEventListener('cg-row-click', (e: any) => (detail = e.detail));
    (el2 as any)._handleRowClick(0, ['Alice']);
    expect(detail).toEqual({ index: 0, row: ['Alice'] });
  });

  it('_handleRowClick does nothing when not clickable', () => {
    const el2 = make({ clickable: false });
    let fired = false;
    el2.addEventListener('cg-row-click', () => (fired = true));
    (el2 as any)._handleRowClick(0, ['Alice']);
    expect(fired).toBe(false);
  });

  it('_getSortedRows returns rows unchanged when no sort key set', () => {
    const el2 = make({ rows: [['B'], ['A']] });
    const result = (el2 as any)._getSortedRows();
    expect(result).toEqual([['B'], ['A']]);
  });

  it('_getSortedRows sorts numeric ascending', () => {
    const el2 = make({
      columns: [{ key: 'age', label: 'Age', sortable: true }],
      rows: [[10], [2], [30]],
    });
    (el2 as any)._handleSort({ key: 'age', label: 'Age', sortable: true });
    const sorted = (el2 as any)._getSortedRows();
    expect(sorted).toEqual([[2], [10], [30]]);
  });

  it('_getSortedRows sorts strings alphabetically', () => {
    const el2 = make({
      columns: [{ key: 'name', label: 'Name', sortable: true }],
      rows: [['Charlie'], ['Alice'], ['Bob']],
    });
    (el2 as any)._handleSort({ key: 'name', label: 'Name', sortable: true });
    const sorted = (el2 as any)._getSortedRows();
    expect(sorted.map((r: string[]) => r[0])).toEqual(['Alice', 'Bob', 'Charlie']);
  });

  it('_getSortedRows reverses on desc', () => {
    const el2 = make({
      columns: [{ key: 'age', label: 'Age', sortable: true }],
      rows: [[1], [2], [3]],
    });
    const col = { key: 'age', label: 'Age', sortable: true };
    (el2 as any)._handleSort(col);
    (el2 as any)._handleSort(col); // desc
    const sorted = (el2 as any)._getSortedRows();
    expect(sorted.map((r: number[]) => r[0])).toEqual([3, 2, 1]);
  });

  it('_getSortedRows returns rows unchanged when sort key not in columns', () => {
    const el2 = make({
      columns: [{ key: 'x', label: 'X' }],
      rows: [[1], [2]],
    });
    (el2 as any)._sortKey = 'unknown';
    const sorted = (el2 as any)._getSortedRows();
    expect(sorted).toEqual([[1], [2]]);
  });

  it('_handleFooterSlotChange with nodes sets _hasFooter=true', () => {
    const el2 = make();
    const slot = { assignedNodes: () => [document.createElement('span')] } as unknown as HTMLSlotElement;
    (el2 as any)._handleFooterSlotChange({ target: slot });
    expect((el2 as any)._hasFooter).toBe(true);
  });

  it('_handleFooterSlotChange with no nodes sets _hasFooter=false', () => {
    const el2 = make();
    const slot = { assignedNodes: () => [] } as unknown as HTMLSlotElement;
    (el2 as any)._handleFooterSlotChange({ target: slot });
    expect((el2 as any)._hasFooter).toBe(false);
  });
});
