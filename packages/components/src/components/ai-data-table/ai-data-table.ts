/**
 * @element ai-data-table
 * Data table with sortable columns, AI-detected anomaly highlighting, striped rows, and compact mode.
 * Aligned with cg-table patterns — same header style, spacing, row hover, focus rings.
 * Adds: anomaly left-border + tooltip, sort arrows, cell click events.
 *
 * @example
 * ```html
 * <ai-data-table
 *   .columns=${[{key:'name', label:'Name'}, {key:'score', label:'Score', type:'number'}]}
 *   .data=${[{name:'Alice', score:92}, {name:'Bob', score:12}]}
 *   .anomalies=${[{row:1, col:'score', severity:'high', reason:'Unusually low'}]}
 *   sortable striped
 * ></ai-data-table>
 * ```
 *
 * @fires {CustomEvent<{key, direction}>} ai-data-sort - Column sorted
 * @fires {CustomEvent<{row, col, value}>} ai-data-cell-click - Cell clicked
 * @fires {CustomEvent<{row, col, severity, reason}>} ai-data-anomaly-click - Anomaly clicked
 */
import { LitElement, html, css, nothing } from 'lit';
import { property, state, customElement } from 'lit/decorators.js';
import { hostBlock, reducedMotion } from '../../styles/index.js';

interface Column {
  key: string;
  label: string;
  type?: string;
  align?: 'left' | 'center' | 'right';
}

interface Anomaly {
  row: number;
  col: string;
  severity: 'high' | 'medium' | 'low';
  reason: string;
}

@customElement('ai-data-table')
export class AiDataTable extends LitElement {
  static override styles = [hostBlock, reducedMotion, css`
    :host([hidden]) { display: none; }

    /* ── Wrapper — matches cg-table ── */
    .wrapper {
      overflow: hidden;
      background: var(--cg-color-surface-container-background);
      border: var(--cg-border-width-50) solid var(--cg-color-surface-table-divider);
      border-radius: var(--cg-component-table-radius);
      padding: var(--cg-spacing-4) 0;
    }

    .table-scroll { overflow-x: auto; }

    table {
      width: calc(100% - var(--cg-spacing-8) * 2);
      margin: 0 var(--cg-spacing-8);
      border-collapse: separate;
      border-spacing: 0;
      font-size: var(--cg-font-size-sm);
    }
    :host([compact]) table { font-size: var(--cg-font-size-xs); }

    /* ── Header — matches cg-table: transparent, medium weight, muted ── */
    thead { position: sticky; top: 0; z-index: 1; }

    th {
      padding: var(--cg-spacing-12) var(--cg-spacing-16);
      text-align: left;
      font-weight: var(--cg-font-weight-medium);
      font-size: var(--cg-font-size-xs);
      color: var(--cg-color-surface-container-outlined);
      background: transparent;
      border-bottom: none;
      white-space: nowrap;
      user-select: none;
    }
    :host([compact]) th { padding: var(--cg-spacing-6) var(--cg-spacing-12); }
    th[data-align="center"] { text-align: center; }
    th[data-align="right"] { text-align: right; }

    th.sortable { cursor: pointer; }
    th.sortable:hover { color: var(--cg-color-action-primary-background-default); }
    th.sortable:focus-visible {
      outline: none;
      box-shadow: inset 0 0 0 2px var(--cg-color-action-primary-background-default);
    }

    .sort-icon {
      display: inline-flex;
      margin-left: var(--cg-spacing-4);
      opacity: 0.4;
      vertical-align: middle;
    }
    th.sorted .sort-icon {
      opacity: 1;
      color: var(--cg-color-action-primary-background-default);
    }

    /* ── Body — inset with inner rounding (matches cg-table) ── */
    tbody { background: var(--cg-overlay-dark-subtle); }
    tbody tr:first-child td { border-top: var(--cg-border-width-50) solid var(--cg-color-surface-table-divider); }
    tbody tr:last-child td { border-bottom: var(--cg-border-width-50) solid var(--cg-color-surface-table-divider); }
    tbody td:first-child { border-left: var(--cg-border-width-50) solid var(--cg-color-surface-table-divider); }
    tbody td:last-child { border-right: var(--cg-border-width-50) solid var(--cg-color-surface-table-divider); }
    tbody tr:first-child td:first-child { border-top-left-radius: var(--cg-border-radius-150); }
    tbody tr:first-child td:last-child { border-top-right-radius: var(--cg-border-radius-150); }
    tbody tr:last-child td:first-child { border-bottom-left-radius: var(--cg-border-radius-150); }
    tbody tr:last-child td:last-child { border-bottom-right-radius: var(--cg-border-radius-150); }

    td {
      padding: var(--cg-spacing-12) var(--cg-spacing-16);
      color: var(--cg-color-surface-table-text);
      border-bottom: var(--cg-border-width-50) solid var(--cg-color-surface-table-divider);
      vertical-align: middle;
      position: relative;
    }
    :host([compact]) td { padding: var(--cg-spacing-6) var(--cg-spacing-12); }
    td[data-align="center"] { text-align: center; }
    td[data-align="right"] { text-align: right; }
    td.clickable { cursor: pointer; }

    /* Row states */
    tbody tr { transition: background-color var(--cg-transition-duration-fast) var(--cg-motion-easing-default); }
    tbody tr:hover td { background: var(--cg-color-action-tertiary-background-hover); }

    /* Striped */
    :host([striped]) tbody tr:nth-child(even) td {
      background: var(--cg-color-action-tertiary-background-hover);
    }

    /* ── Anomaly cells — left accent border ── */
    .anomaly-high {
      border-left: var(--cg-border-width-200) solid var(--cg-color-status-error-text-default);
    }
    .anomaly-medium {
      border-left: var(--cg-border-width-200) solid var(--cg-color-status-warning-text-default);
    }
    .anomaly-low {
      border-left: var(--cg-border-width-200) solid var(--cg-color-status-info-text-default);
    }

    .anomaly-icon {
      display: inline-flex;
      margin-left: var(--cg-spacing-6);
      color: var(--cg-color-input-text-placeholder);
      vertical-align: middle;
    }

    /* Tooltip */
    .tooltip {
      position: absolute;
      bottom: calc(100% + var(--cg-spacing-4));
      left: 50%;
      transform: translateX(-50%);
      background: var(--cg-color-surface-base-background);
      border: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
      color: var(--cg-color-surface-base-text);
      font-size: var(--cg-font-size-xs);
      padding: var(--cg-spacing-6) var(--cg-spacing-8);
      border-radius: var(--cg-border-radius-100);
      white-space: nowrap;
      pointer-events: none;
      z-index: 10;
      box-shadow: var(--cg-elevation-2);
    }

    .empty-state {
      padding: var(--cg-spacing-24);
      text-align: center;
      color: var(--cg-color-input-text-placeholder);
      font-size: var(--cg-font-size-sm);
    }

    /* ── Rounded variants — matches cg-table ── */
    :host([rounded="none"]) .wrapper { border-radius: 0; }
    :host([rounded="none"]) tbody tr:first-child td:first-child,
    :host([rounded="none"]) tbody tr:first-child td:last-child,
    :host([rounded="none"]) tbody tr:last-child td:first-child,
    :host([rounded="none"]) tbody tr:last-child td:last-child { border-radius: 0; }

    :host([rounded="sm"]) .wrapper { border-radius: var(--cg-border-radius-100); }
    :host([rounded="sm"]) tbody tr:first-child td:first-child { border-top-left-radius: var(--cg-border-radius-50); }
    :host([rounded="sm"]) tbody tr:first-child td:last-child { border-top-right-radius: var(--cg-border-radius-50); }
    :host([rounded="sm"]) tbody tr:last-child td:first-child { border-bottom-left-radius: var(--cg-border-radius-50); }
    :host([rounded="sm"]) tbody tr:last-child td:last-child { border-bottom-right-radius: var(--cg-border-radius-50); }

    :host([rounded="md"]) .wrapper { border-radius: var(--cg-border-radius-150); }
    :host([rounded="lg"]) .wrapper { border-radius: var(--cg-component-table-radius); }
  `];

  @property({ reflect: true }) rounded: 'none' | 'sm' | 'md' | 'lg' = 'lg';
  @property({ type: Array }) columns: Column[] = [];
  @property({ type: Array }) data: Record<string, unknown>[] = [];
  @property({ type: Array }) anomalies: Anomaly[] = [];
  @property({ type: Boolean, reflect: true }) sortable = false;
  @property({ type: Boolean, reflect: true }) striped = false;
  @property({ type: Boolean, reflect: true }) compact = false;

  @state() private _sortKey = '';
  @state() private _sortDir: 'asc' | 'desc' = 'asc';
  @state() private _hoveredAnomaly: string | null = null;

  private _getAnomaly(row: number, col: string): Anomaly | undefined {
    return this.anomalies.find(a => a.row === row && a.col === col);
  }

  private _handleSort(key: string) {
    if (!this.sortable) return;
    if (this._sortKey === key) {
      this._sortDir = this._sortDir === 'asc' ? 'desc' : 'asc';
    } else {
      this._sortKey = key;
      this._sortDir = 'asc';
    }
    this.dispatchEvent(new CustomEvent('ai-data-sort', {
      detail: { key: this._sortKey, direction: this._sortDir },
      bubbles: true, composed: true,
    }));
  }

  private _handleCellClick(row: number, col: string, value: unknown) {
    this.dispatchEvent(new CustomEvent('ai-data-cell-click', {
      detail: { row, col, value },
      bubbles: true, composed: true,
    }));
  }

  private _handleAnomalyClick(anomaly: Anomaly) {
    this.dispatchEvent(new CustomEvent('ai-data-anomaly-click', {
      detail: anomaly,
      bubbles: true, composed: true,
    }));
  }

  private get _sortedData(): Record<string, unknown>[] {
    if (!this._sortKey) return this.data;
    const sorted = [...this.data].sort((a, b) => {
      const va = a[this._sortKey];
      const vb = b[this._sortKey];
      if (va == null || vb == null) return 0;
      if (typeof va === 'number' && typeof vb === 'number') return va - vb;
      return String(va).localeCompare(String(vb));
    });
    return this._sortDir === 'desc' ? sorted.reverse() : sorted;
  }

  override render() {
    if (!this.columns.length) {
      return html`<div class="wrapper"><div class="empty-state">No columns defined</div></div>`;
    }

    return html`
      <div class="wrapper">
        <div class="table-scroll">
          <table role="table" aria-label="Data table">
            <thead>
              <tr role="row">
                ${this.columns.map(col => {
                  const isSorted = this._sortKey === col.key;
                  return html`
                    <th
                      class="${this.sortable ? 'sortable' : ''} ${isSorted ? 'sorted' : ''}"
                      data-align=${col.align || 'left'}
                      role="columnheader"
                      tabindex=${this.sortable ? '0' : '-1'}
                      aria-sort=${isSorted ? (this._sortDir === 'asc' ? 'ascending' : 'descending') : 'none'}
                      @click=${() => this._handleSort(col.key)}
                      @keydown=${(e: KeyboardEvent) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); this._handleSort(col.key); } }}
                    >
                      ${col.label}
                      ${this.sortable ? html`
                        <span class="sort-icon">
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
                            ${isSorted && this._sortDir === 'desc'
                              ? html`<path d="M12 5v14m-7-7l7 7 7-7"/>`
                              : html`<path d="M12 19V5m-7 7l7-7 7 7"/>`}
                          </svg>
                        </span>
                      ` : nothing}
                    </th>
                  `;
                })}
              </tr>
            </thead>
            <tbody>
              ${this._sortedData.map((row, ri) => html`
                <tr role="row">
                  ${this.columns.map(col => {
                    const anomaly = this._getAnomaly(ri, col.key);
                    const anomalyClass = anomaly ? `anomaly-${anomaly.severity}` : '';
                    const cellId = `${ri}-${col.key}`;
                    return html`
                      <td
                        class="clickable ${anomalyClass}"
                        data-align=${col.align || 'left'}
                        role="cell"
                        @click=${() => { this._handleCellClick(ri, col.key, row[col.key]); if (anomaly) this._handleAnomalyClick(anomaly); }}
                        @mouseenter=${() => { if (anomaly) this._hoveredAnomaly = cellId; }}
                        @mouseleave=${() => { this._hoveredAnomaly = null; }}
                      >
                        ${typeof row[col.key] === 'object' ? JSON.stringify(row[col.key]) : String(row[col.key] ?? '')}
                        ${anomaly ? html`<span class="anomaly-icon" title="${anomaly.reason}"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/></svg></span>` : nothing}
                        ${anomaly && this._hoveredAnomaly === cellId ? html`<span class="tooltip">${anomaly.reason}</span>` : nothing}
                      </td>
                    `;
                  })}
                </tr>
              `)}
            </tbody>
          </table>
        </div>
        ${!this.data.length ? html`<div class="empty-state">No data available</div>` : nothing}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ai-data-table': AiDataTable;
  }
}
