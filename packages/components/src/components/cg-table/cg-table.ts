import { LitElement, html, css, nothing, type PropertyValues } from 'lit';
import { property, state } from 'lit/decorators.js';
import { customElement } from '../../utils/define.js';
import { hostBlock, reducedMotion } from '../../styles/index.js';
import { defineMessages, Messages } from '../../utils/messages.js';
import { slotHasContent, observeLightDom } from '../../utils/slot-content.js';

const MESSAGES = defineMessages('cg-table', {
  empty: 'No data',
  selectAll: 'Select all rows',
  selectRow: 'Select row {row}',
});

/** A column sort: the column `key` and its direction. */
export interface TableSort {
  key: string;
  direction: 'asc' | 'desc';
}

/** Column definition for cg-table. */
export interface TableColumn {
  key: string;
  label: string;
  align?: 'left' | 'center' | 'right';
  sortable?: boolean;
  width?: string;
  /** Cells of this column are row headers (`<th scope="row">`): the column
   *  that names each row (company, contact). Screen readers announce it with
   *  every other cell of the row. */
  rowHeader?: boolean;
  /** Each cell is a `<slot name="cell-{rowIndex}-{key}">` (`rowIndex` = the
   *  row's index in `rows`, stable under sorting). Light-DOM children with that
   *  slot — links, badges, buttons, framework components — replace the cell;
   *  the row value shows where nothing is slotted. Their tab order follows the
   *  displayed (sorted) rows. */
  slotted?: boolean;
  /** Cell content from the value: a Lit template, a DOM node or text. */
  render?: (cell: unknown, row: unknown[], rowIndex: number) => unknown;
  /** The value this column sorts by (default: the cell). Use it when cells
   *  hold objects or templates (a link, a badge), so they sort by their data. */
  accessor?: (cell: unknown, row: unknown[]) => unknown;
  /** Ascending comparator of accessor values (descending is its inverse).
   *  Default: numbers, numeric strings ('9' before '10') and dates by value,
   *  ahead of text; nodes by their text; text in the page language
   *  (`<html lang>`) with digit runs compared as numbers ('item 9' before
   *  'item 10'). Empty values (null, undefined, '') always sort last. */
  compare?: (a: unknown, b: unknown) => number;
}

const plain = (v: unknown): unknown => (v instanceof Date ? v.getTime() : v instanceof Node ? v.textContent : v);
const NUMERIC = /^\s*[-+]?(\d+\.?\d*|\.\d+)(e[-+]?\d+)?\s*$/i;
/** A number, or a string that is one ('10', '2.5'); otherwise NaN. */
const asNumber = (v: unknown): number =>
  typeof v === 'number' ? v : typeof v === 'string' && NUMERIC.test(v) ? Number(v) : NaN;
/** Default ascending order, total and transitive: numbers (and numeric
 *  strings) first, by value; then text in the page language, digit runs
 *  compared as numbers ('item 9' before 'item 10'). */
const compareValues = (a: unknown, b: unknown): number => {
  const pa = plain(a);
  const pb = plain(b);
  const na = asNumber(pa);
  const nb = asNumber(pb);
  const aNum = !Number.isNaN(na);
  const bNum = !Number.isNaN(nb);
  if (aNum && bNum) return na < nb ? -1 : na > nb ? 1 : 0;
  if (aNum !== bNum) return aNum ? -1 : 1;
  const lang = (typeof document !== 'undefined' && document.documentElement.lang) || undefined;
  return String(pa).localeCompare(String(pb), lang, { numeric: true });
};
const isEmpty = (v: unknown): boolean => v == null || v === '';
/** Text of a labelling element for its accessible name: hidden descendants
 *  (`hidden`, `aria-hidden="true"`, `display: none`, `visibility: hidden`)
 *  are left out, as in the ARIA name computation. */
const nameText = (el: Element): string => {
  const hidden = (n: Element) =>
    n.hasAttribute('hidden') || n.getAttribute('aria-hidden') === 'true' ||
    (typeof getComputedStyle === 'function' && (() => { const cs = getComputedStyle(n); return cs.display === 'none' || cs.visibility === 'hidden'; })());
  const walk = (n: Node): string => {
    if (n.nodeType === Node.TEXT_NODE) return n.textContent ?? '';
    if (n.nodeType !== Node.ELEMENT_NODE || hidden(n as Element)) return '';
    return Array.from(n.childNodes, walk).join('');
  };
  return Array.from(el.childNodes, walk).join('').replace(/\s+/g, ' ').trim();
};
/** Elements whose own click/Enter must not also activate a clickable row. */
const CONTROL = 'a[href],button,input,select,textarea,summary,label,[role=button],[role=link],[contenteditable]';

/**
 * <cg-table> — Data table with sorting, selection, loading, and pagination.
 *
 * @example
 * ```html
 * <cg-table
 *   .columns=${[{key:'name',label:'Name',sortable:true},{key:'role',label:'Role'}]}
 *   .rows=${[['Alice','Designer'],['Bob','Developer']]}
 *   selectable striped
 * ></cg-table>
 * ```
 *
 * Accessible name: `caption` (add `caption-hidden` to hide it visually),
 * `label`, or `labelledby` (ids of page elements; their text names the
 * table and follows text changes).
 *
 * Sorting: sortable headers are buttons; the sorted header has `aria-sort`.
 * Uncontrolled by default. Set `sort` to control it (the table shows `sort`
 * and asks for changes with `cg-sort-change`); add `manual-sort` when the
 * rows arrive sorted (server-side or cursor data) so the table never
 * reorders them.
 *
 * @slot footer - Footer area for pagination or summary
 * @slot cell-{rowIndex}-{key} - Content of one cell of a `slotted` column
 *
 * @fires {CustomEvent<TableSort>} cg-sort-change - A header asked for this sort (always; in controlled mode nothing changes until `sort` does)
 * @fires {CustomEvent<TableSort>} cg-sort - Uncontrolled only: the table sorted
 * @fires {CustomEvent<{indices: number[]}>} cg-select - Row selection changed
 * @fires {CustomEvent<{index, row}>} cg-row-click - Row clicked
 *
 * @cssprop --cg-component-table-radius - Table border radius
 */
@customElement('cg-table')
export class CgTable extends LitElement {
  static override styles = [hostBlock, reducedMotion, css`
    .table-wrapper {
      overflow: hidden;
      background: var(--cg-color-surface-container-background);
      border: var(--cg-border-width-50) solid var(--cg-color-surface-table-border);
      border-radius: var(--cg-component-table-radius);
      padding: var(--cg-spacing-4) 0;
    }

    .table-scroll {
      overflow-x: auto;
    }

    /* Body area — slightly darker inset with inner rounding + border */
    tbody {
      background: var(--cg-overlay-dark-subtle);
    }
    tbody tr:first-child > * {
      border-top: var(--cg-border-width-50) solid var(--cg-color-surface-table-divider);
    }
    tbody tr:last-child > * {
      border-bottom: var(--cg-border-width-50) solid var(--cg-color-surface-table-divider);
    }
    tbody tr > :first-child {
      border-left: var(--cg-border-width-50) solid var(--cg-color-surface-table-divider);
    }
    tbody tr > :last-child {
      border-right: var(--cg-border-width-50) solid var(--cg-color-surface-table-divider);
    }
    tbody tr:first-child > :first-child {
      border-top-left-radius: var(--cg-border-radius-150);
    }
    tbody tr:first-child > :last-child {
      border-top-right-radius: var(--cg-border-radius-150);
    }
    tbody tr:last-child > :first-child {
      border-bottom-left-radius: var(--cg-border-radius-150);
    }
    tbody tr:last-child > :last-child {
      border-bottom-right-radius: var(--cg-border-radius-150);
    }

    /* Rounded variants — outer wrapper + inner tbody corners */
    :host([rounded="none"]) .table-wrapper { border-radius: 0; }
    :host([rounded="none"]) tbody tr:first-child > :first-child,
    :host([rounded="none"]) tbody tr:first-child > :last-child,
    :host([rounded="none"]) tbody tr:last-child > :first-child,
    :host([rounded="none"]) tbody tr:last-child > :last-child { border-radius: 0; }

    :host([rounded="sm"]) .table-wrapper { border-radius: var(--cg-border-radius-100); }
    :host([rounded="sm"]) tbody tr:first-child > :first-child { border-top-left-radius: var(--cg-border-radius-50); }
    :host([rounded="sm"]) tbody tr:first-child > :last-child { border-top-right-radius: var(--cg-border-radius-50); }
    :host([rounded="sm"]) tbody tr:last-child > :first-child { border-bottom-left-radius: var(--cg-border-radius-50); }
    :host([rounded="sm"]) tbody tr:last-child > :last-child { border-bottom-right-radius: var(--cg-border-radius-50); }

    :host([rounded="md"]) .table-wrapper { border-radius: var(--cg-border-radius-150); }
    :host([rounded="md"]) tbody tr:first-child > :first-child { border-top-left-radius: var(--cg-border-radius-100); }
    :host([rounded="md"]) tbody tr:first-child > :last-child { border-top-right-radius: var(--cg-border-radius-100); }
    :host([rounded="md"]) tbody tr:last-child > :first-child { border-bottom-left-radius: var(--cg-border-radius-100); }
    :host([rounded="md"]) tbody tr:last-child > :last-child { border-bottom-right-radius: var(--cg-border-radius-100); }

    :host([rounded="lg"]) .table-wrapper { border-radius: var(--cg-component-table-radius); }

    table {
      width: calc(100% - var(--cg-spacing-8) * 2);
      margin: 0 var(--cg-spacing-8);
      border-collapse: separate;
      border-spacing: 0;
      font-size: var(--cg-font-size-sm);
    }
    :host([compact]) table { font-size: var(--cg-font-size-xs); }

    /* ── Header ── */
    thead { position: sticky; top: 0; z-index: 1; }

    caption {
      padding: 0 var(--cg-spacing-16) var(--cg-spacing-12);
      text-align: left;
      font-weight: var(--cg-font-weight-medium);
      color: var(--cg-color-surface-table-text);
    }
    /* Canonical visually-hidden recipe (functional values, see cg-visually-hidden). */
    caption.sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip-path: inset(50%);
      white-space: nowrap;
    }

    thead th {
      padding: var(--cg-spacing-12) var(--cg-spacing-16);
      text-align: left;
      font-weight: var(--cg-font-weight-medium);
      font-size: var(--cg-font-size-xs);
      color: var(--cg-color-on-surface-container-default);
      background: var(--cg-color-surface-container-background);
      border-bottom: none;
      white-space: nowrap;
      user-select: none;
    }
    :host([compact]) thead th {
      padding: var(--cg-spacing-6) var(--cg-spacing-12);
    }

    /* Sortable header: a real button that reads as header text. */
    .sort-btn {
      display: inline-flex;
      align-items: center;
      padding: 0;
      border: 0;
      border-radius: var(--cg-border-radius-50);
      background: none;
      color: inherit;
      font: inherit;
      text-align: inherit;
      cursor: pointer;
    }
    .sort-btn:hover { color: var(--cg-color-accent-text); }
    .sort-btn:active {
      transform: scale(var(--cg-interaction-press-scale));
      transition: transform var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
    }
    .sort-btn:focus-visible {
      outline: none;
      box-shadow: 0 0 0 var(--cg-focus-ring-width) var(--cg-color-focus-ring);
    }

    th .sort-icon {
      display: inline-flex;
      margin-left: var(--cg-spacing-4);
      opacity: 0.4;
      vertical-align: middle;
    }
    th.sorted .sort-icon {
      opacity: 1;
      color: var(--cg-color-accent-text);
    }

    th[data-align="center"] { text-align: center; }
    th[data-align="right"] { text-align: right; }

    /* ── Selection checkbox column ── */
    th.select-col, td.select-col {
      width: var(--cg-spacing-48);
      padding: 0 var(--cg-spacing-12);
    }
    th.select-col cg-checkbox,
    td.select-col cg-checkbox {
      min-height: 0;
    }

    /* ── Cells (row-header cells are th in tbody) ── */
    td, tbody th {
      text-align: left;
      padding: var(--cg-spacing-12) var(--cg-spacing-16);
      color: var(--cg-color-surface-table-text);
      border-bottom: var(--cg-border-width-50) solid var(--cg-color-surface-table-divider);
      vertical-align: middle;
    }
    :host([compact]) td, :host([compact]) tbody th {
      padding: var(--cg-spacing-6) var(--cg-spacing-12);
    }

    tbody th { font-weight: var(--cg-font-weight-medium); }
    td[data-align="center"], tbody th[data-align="center"] { text-align: center; }
    td[data-align="right"], tbody th[data-align="right"] { text-align: right; }

    /* Row dividers — last row keeps its content border from the tbody border rules */

    /* ── Row states ── */
    tbody tr {
      transition: background-color var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
    }
    tbody tr:hover > * {
      background: var(--cg-color-action-tertiary-background-hover);
    }
    tbody tr.selected > * {
      background: var(--cg-color-action-tertiary-background-hover);
    }
    :host([clickable]) tbody tr {
      cursor: pointer;
    }
    :host([clickable]) tbody tr:focus-visible {
      outline: none;
    }
    :host([clickable]) tbody tr:focus-visible > * {
      box-shadow: inset 0 0 0 var(--cg-focus-ring-width) var(--cg-color-focus-ring);
    }

    /* ── Striped ── */
    :host([striped]) tbody tr:nth-child(even) > * {
      background: var(--cg-color-action-tertiary-background-hover);
    }
    :host([striped]) tbody tr:nth-child(even):hover > * {
      background: var(--cg-color-action-tertiary-background-hover);
    }

    /* ── Empty state ── */
    /* The empty-state cell controls its own spacing — strip the row's td
       padding so it doesn't stack on top, which made the vertical gap read
       larger than the left/right. Even padding keeps it centered in the
       inner container on all four sides. */
    td.empty-cell {
      padding: 0;
    }
    .empty-state {
      padding: var(--cg-spacing-32);
      text-align: center;
      font-size: var(--cg-font-size-sm);
      color: var(--cg-color-on-surface-container-default);
    }

    /* ── Loading ── */
    .loading-row td {
      padding: var(--cg-spacing-12) var(--cg-spacing-16);
    }
    .loading-bar {
      height: var(--cg-spacing-12);
      border-radius: var(--cg-border-radius-50);
      background: var(--cg-color-action-secondary-background-hover);
      animation: tablePulse 2s ease-in-out infinite;
    }
    .loading-bar.short { width: 60%; }
    .loading-bar.med { width: 80%; }
    .loading-bar.long { width: 95%; }
    .loading-check {
      width: var(--cg-spacing-16);
      height: var(--cg-spacing-16);
      margin: 0 auto;
    }

    @keyframes tablePulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.4; }
    }

    /* ── Footer ── */
    .table-footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: var(--cg-spacing-12) var(--cg-spacing-16);
      font-size: var(--cg-font-size-xs);
      color: var(--cg-color-on-surface-container-default);
    }
    .table-footer[hidden] { display: none; }
    .table-footer ::slotted(*) {
      display: flex;
      align-items: center;
      gap: var(--cg-spacing-8);
    }

    /* Reduced motion */
    @media (prefers-reduced-motion: reduce) {
      .loading-bar { animation: none; opacity: 0.6; }
    }
  `];

  @property({ type: Array }) columns: TableColumn[] = [];
  @property({ type: Array }) rows: unknown[][] = [];
  @property({ type: Boolean, reflect: true }) striped = false;
  @property({ type: Boolean, reflect: true }) compact = false;
  @property({ type: Boolean, reflect: true }) clickable = false;
  @property({ type: Boolean, reflect: true }) selectable = false;
  @property({ type: Boolean, reflect: true }) loading = false;
  @property({ type: Number }) loadingRows = 5;
  /** Empty-state text; defaults to the `empty` message. */
  @property() emptyText?: string;
  /** Per-element text overrides (JSON attribute); see `setMessages()`. */
  @property({ type: Object }) messages: Partial<typeof MESSAGES> | null = null;

  private i18n = new Messages(this, MESSAGES);
  @property({ reflect: true }) rounded: 'none' | 'sm' | 'md' | 'lg' = 'lg';

  /** Caption (names the table). */
  @property() caption = '';
  /** Hide the caption visually; it still names the table. */
  @property({ type: Boolean, reflect: true, attribute: 'caption-hidden' }) captionHidden = false;
  /** Accessible name of the inner table (wins over `caption`; `labelledby` wins over it). */
  @property() label = '';
  /** Space-separated ids of elements in the table's document or shadow root
   *  whose text names the table. */
  @property() labelledby = '';
  /** Controlled sort. `undefined` (default): the table keeps its own sort.
   *  Set (a sort, or `null` for none): the table shows it and only asks for
   *  changes with `cg-sort-change`. */
  @property({
    // Removing the attribute releases control (undefined); `sort="null"` is controlled, no sort.
    converter: { fromAttribute: (v: string | null) => (v === null ? undefined : JSON.parse(v)), toAttribute: (v: unknown) => JSON.stringify(v) },
  })
  sort: TableSort | null | undefined = undefined;
  /** Rows arrive sorted (server-side, cursor data): never reorder them. */
  @property({ type: Boolean, reflect: true, attribute: 'manual-sort' }) manualSort = false;

  @state() private _labelledText = '';
  private _labelObserver: MutationObserver | undefined;

  @state() private _sortKey = '';
  @state() private _sortDir: 'asc' | 'desc' = 'asc';
  @state() private _selected = new Set<number>();
  @state() private _hasFooter = false;

  private _unobserveLight: (() => void) | null = null;

  override connectedCallback() {
    super.connectedCallback();
    this._resolveLabelledBy();
    // slotchange misses edits inside a slotted footer wrapper.
    this._unobserveLight = observeLightDom(this, () => this._syncFooter());
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this._labelObserver?.disconnect();
    this._labelObserver = undefined;
    this._unobserveLight?.();
    this._unobserveLight = null;
  }

  override willUpdate(changed: PropertyValues) {
    if (changed.has('rows')) {
      this._selected = new Set([...this._selected].filter(i => i < this.rows.length));
    }
    if (changed.has('labelledby')) this._resolveLabelledBy();
  }

  /** `aria-labelledby` cannot reach out of the shadow root, so the referenced
   *  elements' text becomes the inner table's label. One observer on the
   *  table's root keeps it in sync: text changes, a target that appears
   *  later, is replaced, gains the id, or has descendants hidden or shown. */
  private _resolveLabelledBy() {
    const root = this.getRootNode() as Partial<Document> & Node;
    const ids = this.isConnected && this.labelledby && root.getElementById ? this.labelledby.split(/\s+/).filter(Boolean) : [];
    const els = ids.map(id => root.getElementById!(id)).filter((el): el is HTMLElement => !!el);
    this._labelledText = els.map(nameText).filter(Boolean).join(' ');
    if (!ids.length) {
      this._labelObserver?.disconnect();
      this._labelObserver = undefined;
    } else if (!this._labelObserver && typeof MutationObserver === 'function') {
      this._labelObserver = new MutationObserver(() => this._resolveLabelledBy());
      this._labelObserver.observe(root, {
        subtree: true, childList: true, characterData: true,
        attributes: true, attributeFilter: ['id', 'hidden', 'aria-hidden', 'style', 'class'],
      });
    }
  }

  /** The shown sort: the controlled `sort`, else the table's own. */
  private get _sort(): TableSort | null {
    if (this.sort !== undefined) return this.sort;
    return this._sortKey ? { key: this._sortKey, direction: this._sortDir } : null;
  }

  private _handleSort(col: TableColumn) {
    if (!col.sortable) return;
    const cur = this._sort;
    const next: TableSort = { key: col.key, direction: cur?.key === col.key && cur.direction === 'asc' ? 'desc' : 'asc' };
    this.dispatchEvent(new CustomEvent('cg-sort-change', { detail: next, bubbles: true, composed: true }));
    if (this.sort !== undefined) return;
    this._sortKey = next.key;
    this._sortDir = next.direction;
    this.dispatchEvent(new CustomEvent('cg-sort', { detail: next, bubbles: true, composed: true }));
  }

  private _toggleRow(index: number) {
    const next = new Set(this._selected);
    if (next.has(index)) next.delete(index);
    else next.add(index);
    this._selected = next;
    this.dispatchEvent(new CustomEvent('cg-select', {
      detail: { indices: [...next] },
      bubbles: true, composed: true,
    }));
  }

  private _toggleAll() {
    if (this._selected.size === this.rows.length) {
      this._selected = new Set();
    } else {
      this._selected = new Set(this.rows.map((_, i) => i));
    }
    this.dispatchEvent(new CustomEvent('cg-select', {
      detail: { indices: [...this._selected] },
      bubbles: true, composed: true,
    }));
  }

  /** Did the event start on a link, button or field inside the row? */
  private _fromControl(e: Event): boolean {
    for (const n of e.composedPath()) {
      if (n === e.currentTarget) return false;
      if (n instanceof HTMLElement && (n.matches(CONTROL) || n.tabIndex >= 0 || (n.constructor as { formAssociated?: boolean }).formAssociated)) return true;
    }
    return false;
  }

  private _handleRowClick(index: number, row: unknown[]) {
    if (this.clickable) {
      this.dispatchEvent(new CustomEvent('cg-row-click', {
        detail: { index, row },
        bubbles: true, composed: true,
      }));
    }
  }

  private _handleFooterSlotChange() {
    this._syncFooter();
  }

  /** The footer shows only when it has content (an empty wrapper takes no space). */
  private _syncFooter() {
    const slot = this.renderRoot?.querySelector?.<HTMLSlotElement>('slot[name="footer"]');
    if (slot) this._hasFooter = slotHasContent(slot);
  }

  /** Rows paired with their ORIGINAL index so selection/click events stay stable under sorting. */
  private _getSortedRows(): Array<{ row: unknown[]; i: number }> {
    const entries = this.rows.map((row, i) => ({ row, i }));
    const sort = this._sort;
    if (!sort || this.manualSort) return entries;
    const idx = this.columns.findIndex(c => c.key === sort.key);
    if (idx === -1) return entries;
    const col = this.columns[idx]!;
    const cmp = col.compare ?? compareValues;
    const dir = sort.direction === 'desc' ? -1 : 1;
    const keyed = entries.map(e => ({ ...e, v: col.accessor ? col.accessor(e.row[idx], e.row) : e.row[idx] }));
    // Stable in both directions (ties keep row order); empty values last.
    keyed.sort((a, b) => {
      const ea = isEmpty(a.v);
      const eb = isEmpty(b.v);
      if (ea || eb) return ea === eb ? a.i - b.i : ea ? 1 : -1;
      return dir * cmp(a.v, b.v) || a.i - b.i;
    });
    return keyed.map(({ row, i }) => ({ row, i }));
  }

  private _cell(col: TableColumn, row: unknown[], ci: number, rowIndex: number): unknown {
    const value = col.render ? col.render(row[ci], row, rowIndex) : row[ci] ?? '';
    return col.slotted ? html`<slot name="cell-${rowIndex}-${col.key}">${value}</slot>` : value;
  }

  override render() {
    const sortedRows = this._getSortedRows();
    const sort = this._sort;
    const allSelected = this.rows.length > 0 && this._selected.size === this.rows.length;
    const widths = ['short', 'long', 'med', 'short'];

    return html`
      <div class="table-wrapper">
        <div class="table-scroll">
        <table aria-label=${this._labelledText || this.label || nothing} aria-busy=${this.loading ? 'true' : nothing}>
          ${this.caption ? html`<caption class=${this.captionHidden ? 'sr-only' : ''}>${this.caption}</caption>` : nothing}
          <thead>
            <tr>
              ${this.selectable ? html`
                <th scope="col" class="select-col">
                  <cg-checkbox
                    ?checked=${allSelected}
                    .indeterminate=${this._selected.size > 0 && !allSelected}
                    @cg-change=${this._toggleAll}
                    label=""
                    aria-label=${this.i18n.t('selectAll')}></cg-checkbox>
                </th>
              ` : nothing}
              ${this.columns.map(col => {
                const dir = sort?.key === col.key ? sort.direction : undefined;
                return html`
                <th
                  scope="col"
                  class=${dir ? 'sorted' : ''}
                  data-align=${col.align ?? 'left'}
                  style=${col.width ? `width: ${col.width}` : ''}
                  aria-sort=${dir ? (dir === 'asc' ? 'ascending' : 'descending') : nothing}
                >${col.sortable ? html`<button type="button" class="sort-btn" @click=${() => this._handleSort(col)}>${col.label}<span class="sort-icon" aria-hidden="true"><cg-icon name=${dir ? (dir === 'asc' ? 'arrow-up' : 'arrow-down') : 'sort'} size="xs"></cg-icon></span></button>` : col.label}</th>
              `;
              })}
            </tr>
          </thead>
          <tbody>
            ${this.loading ? Array.from({ length: this.loadingRows }, (_, ri) => html`
              <tr class="loading-row" aria-hidden="true">
                ${this.selectable ? html`<td class="select-col"><div class="loading-bar loading-check"></div></td>` : nothing}
                ${this.columns.map((_, ci) => html`
                  <td><div class="loading-bar ${widths[ci % widths.length]}"></div></td>
                `)}
              </tr>
            `) : sortedRows.length === 0 ? html`
              <tr>
                <td class="empty-cell" colspan=${this.columns.length + (this.selectable ? 1 : 0)}>
                  <div class="empty-state">${this.emptyText ?? this.i18n.t('empty')}</div>
                </td>
              </tr>
            ` : sortedRows.map(({ row, i: origIdx }) => html`
              <tr class="${this._selected.has(origIdx) ? 'selected' : ''}"
                tabindex=${this.clickable ? '0' : nothing}
                @click=${(e: Event) => { if (!this._fromControl(e)) this._handleRowClick(origIdx, row); }}
                @keydown=${(e: KeyboardEvent) => { if (this.clickable && e.target === e.currentTarget && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); this._handleRowClick(origIdx, row); } }}>
                ${this.selectable ? html`
                  <td class="select-col" @click=${(e: Event) => e.stopPropagation()}>
                    <cg-checkbox
                      ?checked=${this._selected.has(origIdx)}
                      @cg-change=${() => this._toggleRow(origIdx)}
                      label=""
                      aria-label=${this.i18n.t('selectRow', { row: origIdx + 1 })}></cg-checkbox>
                  </td>
                ` : nothing}
                ${this.columns.map((col, ci) => col.rowHeader
                  ? html`<th scope="row" data-align=${col.align ?? 'left'}>${this._cell(col, row, ci, origIdx)}</th>`
                  : html`<td data-align=${col.align ?? 'left'}>${this._cell(col, row, ci, origIdx)}</td>`)}
              </tr>
            `)}
          </tbody>
        </table>
        </div>
        <div class="table-footer" ?hidden=${!this._hasFooter}>
          <slot name="footer" @slotchange=${this._handleFooterSlotChange}></slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cg-table': CgTable;
  }
}
