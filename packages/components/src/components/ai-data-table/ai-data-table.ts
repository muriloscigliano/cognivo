/**
 * @element ai-data-table
 * Data table with sortable columns, AI-detected anomaly cell highlighting, and click events.
 *
 * @example
 * ```html
 * <ai-data-table
 *   .columns=${[{key:'name', label:'Name'}, {key:'score', label:'Score', type:'number'}]}
 *   .data=${[{name:'Alice', score:92}, {name:'Bob', score:12}]}
 *   .anomalies=${[{row:1, col:'score', severity:'high', reason:'Unusually low'}]}
 *   sortable
 * ></ai-data-table>
 * ```
 *
 * @fires {CustomEvent<{key, direction}>} ai-data-sort - Column header clicked for sorting
 * @fires {CustomEvent<{row, col, value}>} ai-data-cell-click - Cell clicked
 * @fires {CustomEvent<{row, col, severity, reason}>} ai-data-anomaly-click - Anomaly cell clicked
 */
import { LitElement, html, css, nothing } from 'lit';
import { property, state, customElement } from 'lit/decorators.js';
import { hostBlock, reducedMotion, fadeSlideInKeyframes } from '../../styles/index.js';

interface Column {
  key: string;
  label: string;
  type?: string;
}

interface Anomaly {
  row: number;
  col: string;
  severity: 'high' | 'medium' | 'low';
  reason: string;
}

@customElement('ai-data-table')
export class AiDataTable extends LitElement {
  static override styles = [hostBlock, reducedMotion, fadeSlideInKeyframes, css`
    :host {
      animation: fadeSlideIn var(--cg-motion-duration-fast) var(--cg-motion-easing-enter) both;
    }
    :host([hidden]) { display: none; }

    .container {
      background: var(--cg-color-surface-table-background);
      border: var(--cg-border-width-50) solid var(--cg-color-surface-table-border);
      border-radius: var(--cg-border-radius-150);
      overflow: hidden;
      color: var(--cg-color-surface-base-text);
    }

    .table-wrap {
      overflow-x: auto;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      font-size: var(--cg-font-size-sm);
    }

    thead th {
      background: var(--cg-color-surface-table-header-background);
      padding: var(--cg-spacing-12) var(--cg-spacing-16);
      text-align: left;
      font-size: var(--cg-font-size-xs);
      font-weight: var(--cg-font-weight-bold);
      text-transform: uppercase;
      letter-spacing: var(--cg-letter-spacing-wide);
      color: var(--cg-color-surface-table-header-text);
      border-bottom: var(--cg-border-width-50) solid var(--cg-color-surface-table-header-border);
      white-space: nowrap;
      user-select: none;
    }

    thead th.sortable {
      cursor: pointer;
      transition: color var(--cg-motion-duration-fast) var(--cg-motion-easing-color);
    }
    thead th.sortable:hover { color: var(--cg-color-surface-base-text); }
    thead th.sortable:focus-visible {
      outline: 2px solid var(--cg-color-accent-border);
      outline-offset: -2px;
    }

    .sort-arrow {
      font-size: var(--cg-font-size-xs);
      margin-left: var(--cg-spacing-4);
      color: var(--cg-color-surface-base-text);
    }

    tbody tr {
      transition: background var(--cg-motion-duration-fast) var(--cg-motion-easing-color);
    }
    tbody tr:hover { background: var(--cg-color-surface-table-row-hover-background); }

    tbody td {
      padding: var(--cg-spacing-12) var(--cg-spacing-16);
      border-bottom: var(--cg-border-width-50) solid var(--cg-color-surface-table-row-border);
      color: var(--cg-color-surface-table-text);
      cursor: default;
    }
    tbody td.clickable { cursor: pointer; }

    /* Anomaly cells */
    .anomaly-high {
      background: var(--cg-color-status-error-background-default);
      border-left: 3px solid var(--cg-color-status-error-text-default);
      position: relative;
    }
    .anomaly-medium {
      background: var(--cg-color-status-warning-background-default);
      border-left: 3px solid var(--cg-color-status-warning-text);
      position: relative;
    }
    .anomaly-low {
      background: var(--cg-color-status-info-background-default);
      border-left: 3px solid var(--cg-color-status-info-text);
      position: relative;
    }

    .anomaly-icon {
      display: inline-block;
      margin-left: var(--cg-spacing-6);
      font-size: var(--cg-font-size-xs);
      cursor: help;
    }

    .tooltip {
      position: absolute;
      bottom: calc(100% + 6px);
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
    }

    .empty-state {
      padding: var(--cg-spacing-24);
      text-align: center;
      color: var(--cg-color-input-border-hover);
      font-size: var(--cg-font-size-sm);
    }
  `];
  @property({ type: Array }) columns: Column[] = [];
  @property({ type: Array }) data: Record<string, unknown>[] = [];
  @property({ type: Array }) anomalies: Anomaly[] = [];
  @property({ type: Boolean }) sortable = false;

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
      bubbles: true,
      composed: true,
    }));
  }

  private _handleCellClick(row: number, col: string, value: unknown) {
    this.dispatchEvent(new CustomEvent('ai-data-cell-click', {
      detail: { row, col, value },
      bubbles: true,
      composed: true,
    }));
  }

  private _handleAnomalyClick(anomaly: Anomaly) {
    this.dispatchEvent(new CustomEvent('ai-data-anomaly-click', {
      detail: anomaly,
      bubbles: true,
      composed: true,
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
      return html`<div class="container"><div class="empty-state">No columns defined</div></div>`;
    }

    return html`
      <div class="container" role="table" aria-label="AI data table">
        <div class="table-wrap">
          <table>
            <thead>
              <tr role="row">
                ${this.columns.map(col => html`
                  <th
                    class=${this.sortable ? 'sortable' : ''}
                    role="columnheader"
                    tabindex=${this.sortable ? '0' : '-1'}
                    aria-sort=${this._sortKey === col.key ? (this._sortDir === 'asc' ? 'ascending' : 'descending') : 'none'}
                    @click=${() => this._handleSort(col.key)}
                    @keydown=${(e: KeyboardEvent) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); this._handleSort(col.key); } }}
                  >
                    ${col.label}
                    ${this._sortKey === col.key ? html`<span class="sort-arrow">${this._sortDir === 'asc' ? '\u25B2' : '\u25BC'}</span>` : nothing}
                  </th>
                `)}
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
                        role="cell"
                        @click=${() => { this._handleCellClick(ri, col.key, row[col.key]); if (anomaly) this._handleAnomalyClick(anomaly); }}
                        @mouseenter=${() => { if (anomaly) this._hoveredAnomaly = cellId; }}
                        @mouseleave=${() => { this._hoveredAnomaly = null; }}
                      >
                        ${typeof row[col.key] === 'object' ? JSON.stringify(row[col.key]) : String(row[col.key] ?? '')}
                        ${anomaly ? html`<span class="anomaly-icon" aria-label="Anomaly: ${anomaly.reason}">\u26A0</span>` : nothing}
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
