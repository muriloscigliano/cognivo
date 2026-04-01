import { describe, it, expect, afterEach } from 'vitest';
import { CgTable } from '../components/cg-table/cg-table.js';

if (!customElements.get('cg-table')) {
  customElements.define('cg-table', CgTable);
}

/**
 * NOTE: cg-table uses `<th>` and `<td>` in Lit templates which JSDOM's HTML
 * parser moves out of context (table-related elements must be inside proper
 * table structure). This causes Lit's duplicate attribute check to fail.
 * These tests verify prop defaults and attribute reflection without triggering
 * a full render with columns.
 */
describe('cg-table', () => {
  let el: CgTable;

  async function create(props?: Partial<CgTable>): Promise<CgTable> {
    el = document.createElement('cg-table') as CgTable;
    if (props) {
      for (const [k, v] of Object.entries(props)) {
        (el as any)[k] = v;
      }
    }
    document.body.appendChild(el);
    await el.updateComplete;
    return el;
  }

  afterEach(() => el?.remove());

  it('is defined as a custom element', () => {
    expect(customElements.get('cg-table')).toBeDefined();
  });

  it('creates an instance', () => {
    el = document.createElement('cg-table') as CgTable;
    expect(el).toBeInstanceOf(CgTable);
  });

  it('default columns is empty array', () => {
    el = document.createElement('cg-table') as CgTable;
    expect(el.columns).toEqual([]);
  });

  it('default rows is empty array', () => {
    el = document.createElement('cg-table') as CgTable;
    expect(el.rows).toEqual([]);
  });

  it('default emptyText is "No data"', () => {
    el = document.createElement('cg-table') as CgTable;
    expect(el.emptyText).toBe('No data');
  });

  it('default striped is false', () => {
    el = document.createElement('cg-table') as CgTable;
    expect(el.striped).toBe(false);
  });

  it('default compact is false', () => {
    el = document.createElement('cg-table') as CgTable;
    expect(el.compact).toBe(false);
  });

  it('default rounded is lg', () => {
    el = document.createElement('cg-table') as CgTable;
    expect(el.rounded).toBe('lg');
  });

  it('accepts columns prop', () => {
    el = document.createElement('cg-table') as CgTable;
    const cols = [{ key: 'name', label: 'Name' }];
    el.columns = cols;
    expect(el.columns).toEqual(cols);
  });

  it('accepts rows prop', () => {
    el = document.createElement('cg-table') as CgTable;
    const rows = [['Alice', 30]];
    el.rows = rows;
    expect(el.rows).toEqual(rows);
  });
});
