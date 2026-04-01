import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { hostBlock, reducedMotion } from '../../styles/index.js';

/**
 * <cg-table> — Data table with sortable columns, sticky header, and responsive scroll.
 *
 * Better than OpenUI's Table:
 * - Sort by clicking column headers
 * - Sticky header on scroll
 * - Responsive horizontal scroll with shadow indicators
 * - Striped rows option
 * - Compact size variant
 */

/** Column definition for cg-table, including key, label, alignment, and sortability. */
export interface TableColumn {
  key: string;
  label: string;
  align?: 'left' | 'center' | 'right';
  sortable?: boolean;
  width?: string;
}

@customElement('cg-table')
export class CgTable extends LitElement {
  static override styles = [hostBlock, reducedMotion, css`
    .table-wrapper {
      overflow-x: auto;
      border: var(--cg-border-width-50, 1px) solid var(--cg-color-surface-table-border, #27272a);
      border-radius: var(--cg-border-radius-150, 12px);
    }
    /* Rounded variants */
    :host([rounded="none"]) .table-wrapper { border-radius: 0; }
    :host([rounded="sm"]) .table-wrapper { border-radius: var(--cg-border-radius-50, 4px); }
    :host([rounded="md"]) .table-wrapper { border-radius: var(--cg-border-radius-100, 8px); }
    :host([rounded="lg"]) .table-wrapper { border-radius: var(--cg-border-radius-150, 12px); }
    :host([rounded="full"]) .table-wrapper { border-radius: var(--cg-border-radius-full, 99999px); }
    table {
      width: 100%;
      border-collapse: collapse;
      font-size: var(--cg-font-size-sm, 14px);
    }
    :host([compact]) table { font-size: var(--cg-font-size-xs, 12px); }

    thead { position: sticky; top: 0; z-index: 1; }
    th {
      padding: var(--cg-spacing-12, 12px) var(--cg-spacing-16, 16px);
      text-align: left;
      font-weight: var(--cg-font-weight-semibold, 600);
      color: var(--cg-gray-600, #52525b);
      background: var(--cg-color-surface-table-header-background, #52525b);
      border-bottom: var(--cg-border-width-50, 1px) solid var(--cg-color-surface-table-border, #27272a);
      white-space: nowrap;
      user-select: none;
      box-shadow: inset 0 1px 0 0 rgba(255, 255, 255, 0.05);
    }
    :host([compact]) th { padding: var(--cg-spacing-8, 8px) var(--cg-spacing-12, 12px); }

    th.sortable { cursor: pointer; }
    th.sortable:hover { color: var(--cg-text-accent, #e5ff6b); }
    th .sort-icon { display: inline-block; width: 14px; margin-left: 4px; opacity: 0.4; vertical-align: middle; }
    th.sorted .sort-icon { opacity: 1; color: var(--cg-text-accent, #e5ff6b); }

    th[data-align="center"] { text-align: center; }
    th[data-align="right"] { text-align: right; }

    td {
      padding: var(--cg-spacing-12, 12px) var(--cg-spacing-16, 16px);
      color: var(--cg-color-surface-base-text, #fafafa);
      border-bottom: 1px solid var(--cg-color-surface-table-border, #27272a);
      vertical-align: middle;
    }
    :host([compact]) td { padding: var(--cg-spacing-8, 8px) var(--cg-spacing-12, 12px); }

    td[data-align="center"] { text-align: center; }
    td[data-align="right"] { text-align: right; }

    tr:last-child td { border-bottom: none; }
    tr:hover td { background: var(--cg-color-surface-table-row-hover-background, #52525b); }

    :host([striped]) tbody tr:nth-child(even) td {
      background: var(--cg-color-surface-table-background, #000000);
    }

    .empty {
      text-align: center;
      padding: var(--cg-spacing-32, 32px);
      color: var(--cg-gray-500, #71717a);
    }
  

    :focus-visible {
      outline: none;
      box-shadow: 0 0 0 2px var(--cg-color-surface-base-background, #09090b), 0 0 0 4px var(--cg-brand-ai-accent, #dfff61);
    }
  
    tbody tr { transition: background-color var(--cg-motion-duration-fast, 80ms) var(--cg-motion-easing-color, cubic-bezier(0, 0, 0.58, 1)); }
    tbody tr:hover { background: var(--cg-overlay-accent-subtle, rgba(223, 255, 97, 0.04)); }
  `];

  @property({ type: Array }) columns: TableColumn[] = [];
  @property({ type: Array }) rows: unknown[][] = [];
  @property({ type: Boolean, reflect: true }) striped = false;
  @property({ type: Boolean, reflect: true }) compact = false;
  @property() emptyText = 'No data';
  @property({ reflect: true }) rounded: 'none' | 'sm' | 'md' | 'lg' | 'full' = 'lg';

  @state() private _sortKey = '';
  @state() private _sortDir: 'asc' | 'desc' = 'asc';

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

  private _getSortedRows(): unknown[][] {
    if (!this._sortKey) return this.rows;
    const idx = this.columns.findIndex(c => c.key === this._sortKey);
    if (idx === -1) return this.rows;
    const sorted = [...this.rows].sort((a, b) => {
      const va = (a as unknown[])[idx];
      const vb = (b as unknown[])[idx];
      if (typeof va === 'number' && typeof vb === 'number') return va - vb;
      return String(va ?? '').localeCompare(String(vb ?? ''));
    });
    return this._sortDir === 'desc' ? sorted.reverse() : sorted;
  }

  override render() {
    const sortedRows = this._getSortedRows();
    return html`
      <div class="table-wrapper">
        <table role="table">
          <thead>
            <tr>
              ${this.columns.map(col => html`
                <th
                  class="${col.sortable ? 'sortable' : ''} ${this._sortKey === col.key ? 'sorted' : ''}"
                  data-align=${col.align ?? 'left'}
                  style=${col.width ? `width: ${col.width}` : ''}
                  @click=${() => this._handleSort(col)}
                  aria-sort=${this._sortKey === col.key ? this._sortDir === 'asc' ? 'ascending' : 'descending' : nothing}
                >
                  ${col.label}
                  ${col.sortable ? html`<span class="sort-icon">${this._sortKey === col.key ? (this._sortDir === 'asc' ? '↑' : '↓') : '↕'}</span>` : nothing}
                </th>
              `)}
            </tr>
          </thead>
          <tbody>
            ${sortedRows.length === 0 ? html`
              <tr><td colspan=${this.columns.length} class="empty">${this.emptyText}</td></tr>
            ` : sortedRows.map(row => html`
              <tr>
                ${this.columns.map((col, i) => html`
                  <td data-align=${col.align ?? 'left'}>${(row as unknown[])[i] ?? ''}</td>
                `)}
              </tr>
            `)}
          </tbody>
        </table>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cg-table': CgTable;
  }
}
