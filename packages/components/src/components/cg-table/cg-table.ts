import { LitElement, html, css, nothing, type PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { hostBlock, reducedMotion } from '../../styles/index.js';

/** Column definition for cg-table. */
export interface TableColumn {
  key: string;
  label: string;
  align?: 'left' | 'center' | 'right';
  sortable?: boolean;
  width?: string;
}

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
 * @slot footer - Footer area for pagination or summary
 *
 * @fires {CustomEvent<{key, direction}>} cg-sort - Column sorted
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
    tbody tr:first-child td {
      border-top: var(--cg-border-width-50) solid var(--cg-color-surface-table-divider);
    }
    tbody tr:last-child td {
      border-bottom: var(--cg-border-width-50) solid var(--cg-color-surface-table-divider);
    }
    tbody td:first-child {
      border-left: var(--cg-border-width-50) solid var(--cg-color-surface-table-divider);
    }
    tbody td:last-child {
      border-right: var(--cg-border-width-50) solid var(--cg-color-surface-table-divider);
    }
    tbody tr:first-child td:first-child {
      border-top-left-radius: var(--cg-border-radius-150);
    }
    tbody tr:first-child td:last-child {
      border-top-right-radius: var(--cg-border-radius-150);
    }
    tbody tr:last-child td:first-child {
      border-bottom-left-radius: var(--cg-border-radius-150);
    }
    tbody tr:last-child td:last-child {
      border-bottom-right-radius: var(--cg-border-radius-150);
    }

    /* Rounded variants — outer wrapper + inner tbody corners */
    :host([rounded="none"]) .table-wrapper { border-radius: 0; }
    :host([rounded="none"]) tbody tr:first-child td:first-child,
    :host([rounded="none"]) tbody tr:first-child td:last-child,
    :host([rounded="none"]) tbody tr:last-child td:first-child,
    :host([rounded="none"]) tbody tr:last-child td:last-child { border-radius: 0; }

    :host([rounded="sm"]) .table-wrapper { border-radius: var(--cg-border-radius-100); }
    :host([rounded="sm"]) tbody tr:first-child td:first-child { border-top-left-radius: var(--cg-border-radius-50); }
    :host([rounded="sm"]) tbody tr:first-child td:last-child { border-top-right-radius: var(--cg-border-radius-50); }
    :host([rounded="sm"]) tbody tr:last-child td:first-child { border-bottom-left-radius: var(--cg-border-radius-50); }
    :host([rounded="sm"]) tbody tr:last-child td:last-child { border-bottom-right-radius: var(--cg-border-radius-50); }

    :host([rounded="md"]) .table-wrapper { border-radius: var(--cg-border-radius-150); }
    :host([rounded="md"]) tbody tr:first-child td:first-child { border-top-left-radius: var(--cg-border-radius-100); }
    :host([rounded="md"]) tbody tr:first-child td:last-child { border-top-right-radius: var(--cg-border-radius-100); }
    :host([rounded="md"]) tbody tr:last-child td:first-child { border-bottom-left-radius: var(--cg-border-radius-100); }
    :host([rounded="md"]) tbody tr:last-child td:last-child { border-bottom-right-radius: var(--cg-border-radius-100); }

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

    th {
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
    :host([compact]) th {
      padding: var(--cg-spacing-6) var(--cg-spacing-12);
    }

    th.sortable { cursor: pointer; }
    th.sortable:hover { color: var(--cg-color-accent-text); }
    th.sortable:active {
      transform: scale(var(--cg-interaction-press-scale));
      transition: transform var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
    }
    th.sortable:focus-visible {
      outline: none;
      box-shadow: inset 0 0 0 var(--cg-focus-ring-width) var(--cg-color-focus-ring);
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

    /* ── Cells ── */
    td {
      padding: var(--cg-spacing-12) var(--cg-spacing-16);
      color: var(--cg-color-surface-table-text);
      border-bottom: var(--cg-border-width-50) solid var(--cg-color-surface-table-divider);
      vertical-align: middle;
    }
    :host([compact]) td {
      padding: var(--cg-spacing-6) var(--cg-spacing-12);
    }

    td[data-align="center"] { text-align: center; }
    td[data-align="right"] { text-align: right; }

    /* Row dividers — last row keeps its content border from the tbody border rules */

    /* ── Row states ── */
    tbody tr {
      transition: background-color var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
    }
    tbody tr:hover td {
      background: var(--cg-color-action-tertiary-background-hover);
    }
    tbody tr.selected td {
      background: var(--cg-color-action-tertiary-background-hover);
    }
    :host([clickable]) tbody tr {
      cursor: pointer;
    }
    :host([clickable]) tbody tr:focus-visible {
      outline: none;
    }
    :host([clickable]) tbody tr:focus-visible td {
      box-shadow: inset 0 0 0 var(--cg-focus-ring-width) var(--cg-color-focus-ring);
    }

    /* ── Striped ── */
    :host([striped]) tbody tr:nth-child(even) td {
      background: var(--cg-color-action-tertiary-background-hover);
    }
    :host([striped]) tbody tr:nth-child(even):hover td {
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
  @property() emptyText = 'No data';
  @property({ reflect: true }) rounded: 'none' | 'sm' | 'md' | 'lg' = 'lg';

  @state() private _sortKey = '';
  @state() private _sortDir: 'asc' | 'desc' = 'asc';
  @state() private _selected = new Set<number>();
  @state() private _hasFooter = false;

  override willUpdate(changed: PropertyValues) {
    if (changed.has('rows')) {
      this._selected = new Set([...this._selected].filter(i => i < this.rows.length));
    }
  }

  private _handleSort(col: TableColumn) {
    if (!col.sortable) return;
    if (this._sortKey === col.key) {
      this._sortDir = this._sortDir === 'asc' ? 'desc' : 'asc';
    } else {
      this._sortKey = col.key;
      this._sortDir = 'asc';
    }
    this.dispatchEvent(new CustomEvent('cg-sort', {
      detail: { key: this._sortKey, direction: this._sortDir },
      bubbles: true, composed: true,
    }));
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

  private _handleRowClick(index: number, row: unknown[]) {
    if (this.clickable) {
      this.dispatchEvent(new CustomEvent('cg-row-click', {
        detail: { index, row },
        bubbles: true, composed: true,
      }));
    }
  }

  private _handleFooterSlotChange(e: Event) {
    const slot = e.target as HTMLSlotElement;
    this._hasFooter = slot.assignedNodes({ flatten: true }).length > 0;
  }

  /** Rows paired with their ORIGINAL index so selection/click events stay stable under sorting. */
  private _getSortedRows(): Array<{ row: unknown[]; i: number }> {
    const entries = this.rows.map((row, i) => ({ row, i }));
    if (!this._sortKey) return entries;
    const idx = this.columns.findIndex(c => c.key === this._sortKey);
    if (idx === -1) return entries;
    const sorted = [...entries].sort((a, b) => {
      const va = a.row[idx];
      const vb = b.row[idx];
      if (typeof va === 'number' && typeof vb === 'number') return va - vb;
      return String(va ?? '').localeCompare(String(vb ?? ''));
    });
    return this._sortDir === 'desc' ? sorted.reverse() : sorted;
  }

  override render() {
    const sortedRows = this._getSortedRows();
    const allSelected = this.rows.length > 0 && this._selected.size === this.rows.length;
    const widths = ['short', 'long', 'med', 'short'];

    return html`
      <div class="table-wrapper">
        <div class="table-scroll">
        <table role="table" aria-busy=${this.loading ? 'true' : nothing}>
          <thead>
            <tr>
              ${this.selectable ? html`
                <th class="select-col">
                  <cg-checkbox
                    ?checked=${allSelected}
                    .indeterminate=${this._selected.size > 0 && !allSelected}
                    @cg-change=${this._toggleAll}
                    label=""
                    aria-label="Select all rows"></cg-checkbox>
                </th>
              ` : nothing}
              ${this.columns.map(col => html`
                <th
                  class="${col.sortable ? 'sortable' : ''} ${this._sortKey === col.key ? 'sorted' : ''}"
                  data-align=${col.align ?? 'left'}
                  style=${col.width ? `width: ${col.width}` : ''}
                  tabindex=${col.sortable ? '0' : nothing}
                  @click=${() => this._handleSort(col)}
                  @keydown=${(e: KeyboardEvent) => { if (col.sortable && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); this._handleSort(col); } }}
                  aria-sort=${this._sortKey === col.key ? (this._sortDir === 'asc' ? 'ascending' : 'descending') : nothing}
                >
                  ${col.label}
                  ${col.sortable ? html`<span class="sort-icon"><cg-icon name="${this._sortKey === col.key ? (this._sortDir === 'asc' ? 'arrow-up' : 'arrow-down') : 'sort'}" size="xs"></cg-icon></span>` : nothing}
                </th>
              `)}
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
                  <div class="empty-state">${this.emptyText}</div>
                </td>
              </tr>
            ` : sortedRows.map(({ row, i: origIdx }) => html`
              <tr class="${this._selected.has(origIdx) ? 'selected' : ''}"
                tabindex=${this.clickable ? '0' : nothing}
                @click=${() => this._handleRowClick(origIdx, row)}
                @keydown=${(e: KeyboardEvent) => { if (this.clickable && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); this._handleRowClick(origIdx, row); } }}>
                ${this.selectable ? html`
                  <td class="select-col" @click=${(e: Event) => e.stopPropagation()}>
                    <cg-checkbox
                      ?checked=${this._selected.has(origIdx)}
                      @cg-change=${() => this._toggleRow(origIdx)}
                      label=""
                      aria-label=${`Select row ${origIdx + 1}`}></cg-checkbox>
                  </td>
                ` : nothing}
                ${this.columns.map((col, ci) => html`
                  <td data-align=${col.align ?? 'left'}>${row[ci] ?? ''}</td>
                `)}
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
