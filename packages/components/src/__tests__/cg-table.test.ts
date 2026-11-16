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

  it('emptyText is unset by default; the empty state falls back to the "No data" message', () => {
    const t = make();
    expect(t.emptyText).toBeUndefined();
    expect((t as any).i18n.t('empty')).toBe('No data');
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
    expect(result).toEqual([{ row: ['B'], i: 0 }, { row: ['A'], i: 1 }]);
  });

  it('_getSortedRows sorts numeric ascending', () => {
    const el2 = make({
      columns: [{ key: 'age', label: 'Age', sortable: true }],
      rows: [[10], [2], [30]],
    });
    (el2 as any)._handleSort({ key: 'age', label: 'Age', sortable: true });
    const sorted = (el2 as any)._getSortedRows();
    expect(sorted.map((e: { row: number[] }) => e.row)).toEqual([[2], [10], [30]]);
    // Original indices travel with the rows so selection stays stable under sorting
    expect(sorted.map((e: { i: number }) => e.i)).toEqual([1, 0, 2]);
  });

  it('_getSortedRows sorts strings alphabetically', () => {
    const el2 = make({
      columns: [{ key: 'name', label: 'Name', sortable: true }],
      rows: [['Charlie'], ['Alice'], ['Bob']],
    });
    (el2 as any)._handleSort({ key: 'name', label: 'Name', sortable: true });
    const sorted = (el2 as any)._getSortedRows();
    expect(sorted.map((e: { row: string[] }) => e.row[0])).toEqual(['Alice', 'Bob', 'Charlie']);
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
    expect(sorted.map((e: { row: number[] }) => e.row[0])).toEqual([3, 2, 1]);
  });

  it('_getSortedRows returns rows unchanged when sort key not in columns', () => {
    const el2 = make({
      columns: [{ key: 'x', label: 'X' }],
      rows: [[1], [2]],
    });
    (el2 as any)._sortKey = 'unknown';
    const sorted = (el2 as any)._getSortedRows();
    expect(sorted).toEqual([{ row: [1], i: 0 }, { row: [2], i: 1 }]);
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

  // ── Sorting: accessor, comparator, controlled, manual ──

  const names = (el2: CgTable) => (el2 as any)._getSortedRows().map((e: { row: unknown[] }) => e.row[0]);
  const deal = (name: string, amount: number) => ({ name, amount, toString: () => `<a>${name}</a>` });

  it('accessor: cells holding objects (links, badges) sort by the value it returns, not "[object Object]"', () => {
    const el2 = make({
      columns: [{ key: 'deal', label: 'Deal', sortable: true, accessor: (cell: unknown) => (cell as { amount: number }).amount }],
      rows: [[deal('B', 300)], [deal('A', 1200)], [deal('C', 50)]],
    });
    (el2 as any)._handleSort(el2.columns[0]);
    expect(names(el2).map((d: { name: string }) => d.name)).toEqual(['C', 'B', 'A']);
  });

  it('accessor receives the whole row, so a column can sort by another field', () => {
    const el2 = make({
      columns: [{ key: 'name', label: 'Name', sortable: true, accessor: (_c: unknown, row: unknown[]) => row[1] }],
      rows: [['x', 3], ['y', 1], ['z', 2]],
    });
    (el2 as any)._handleSort(el2.columns[0]);
    expect(names(el2)).toEqual(['y', 'z', 'x']);
  });

  it('compare: a per-column comparator orders ascending; descending is its inverse', () => {
    const rank = { Qualified: 0, Lead: 1, Won: 2 } as Record<string, number>;
    const col = { key: 'stage', label: 'Stage', sortable: true, compare: (a: unknown, b: unknown) => rank[a as string]! - rank[b as string]! };
    const el2 = make({ columns: [col], rows: [['Won'], ['Lead'], ['Qualified']] });
    (el2 as any)._handleSort(col);
    expect(names(el2)).toEqual(['Qualified', 'Lead', 'Won']);
    (el2 as any)._handleSort(col);
    expect(names(el2)).toEqual(['Won', 'Lead', 'Qualified']);
  });

  it('descending keeps equal rows in their original order (stable), and empty values sort last', () => {
    const col = { key: 'n', label: 'N', sortable: true };
    const el2 = make({ columns: [col, { key: 'id', label: 'Id' }], rows: [[1, 'a'], [null, 'e'], [2, 'b'], [1, 'c'], [2, 'd']] });
    (el2 as any)._handleSort(col);
    expect((el2 as any)._getSortedRows().map((e: { row: unknown[] }) => e.row[1])).toEqual(['a', 'c', 'b', 'd', 'e']);
    (el2 as any)._handleSort(col);
    expect((el2 as any)._getSortedRows().map((e: { row: unknown[] }) => e.row[1])).toEqual(['b', 'd', 'a', 'c', 'e']);
  });

  it('Dates sort chronologically', () => {
    const col = { key: 'd', label: 'D', sortable: true };
    const el2 = make({ columns: [col], rows: [[new Date('2026-03-01')], [new Date('2025-12-31')], [new Date('2026-01-15')]] });
    (el2 as any)._handleSort(col);
    expect(names(el2).map((d: Date) => d.toISOString().slice(0, 10))).toEqual(['2025-12-31', '2026-01-15', '2026-03-01']);
  });

  it('controlled: with `sort` set, a header click emits cg-sort-change with the next sort and leaves the shown sort alone', () => {
    const col = { key: 'name', label: 'Name', sortable: true };
    const el2 = make({ columns: [col, { key: 'age', label: 'Age', sortable: true }], rows: [['b'], ['a']], sort: { key: 'name', direction: 'asc' } });
    const changes: unknown[] = [];
    const sorts: unknown[] = [];
    el2.addEventListener('cg-sort-change', (e) => changes.push((e as CustomEvent).detail));
    el2.addEventListener('cg-sort', (e) => sorts.push((e as CustomEvent).detail));
    (el2 as any)._handleSort(col);
    (el2 as any)._handleSort(el2.columns[1]);
    expect(changes).toEqual([{ key: 'name', direction: 'desc' }, { key: 'age', direction: 'asc' }]);
    expect(sorts).toEqual([]); // nothing was sorted by the table
    expect(names(el2)).toEqual(['a', 'b']); // client-sorted by the controlled sort (no manual-sort)
    el2.sort = { key: 'name', direction: 'desc' };
    expect(names(el2)).toEqual(['b', 'a']);
  });

  it('manual-sort: rows render in the given order whatever the sort', () => {
    const col = { key: 'name', label: 'Name', sortable: true };
    const el2 = make({ columns: [col], rows: [['b'], ['c'], ['a']], manualSort: true, sort: { key: 'name', direction: 'asc' } });
    expect(names(el2)).toEqual(['b', 'c', 'a']);
  });

  it('uncontrolled: a header click sorts, fires cg-sort and cg-sort-change with the same detail', () => {
    const col = { key: 'name', label: 'Name', sortable: true };
    const el2 = make({ columns: [col], rows: [['b'], ['a']] });
    const got: string[] = [];
    el2.addEventListener('cg-sort-change', (e) => got.push(`change:${JSON.stringify((e as CustomEvent).detail)}`));
    el2.addEventListener('cg-sort', (e) => got.push(`sort:${JSON.stringify((e as CustomEvent).detail)}`));
    (el2 as any)._handleSort(col);
    expect(got).toEqual(['change:{"key":"name","direction":"asc"}', 'sort:{"key":"name","direction":"asc"}']);
    expect(names(el2)).toEqual(['a', 'b']);
  });
});
