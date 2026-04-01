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
      animation: fadeSlideIn 200ms var(--cg-motion-easing-enter, cubic-bezier(0, 0, 0.2, 1)) both;
    }
    :host([hidden]) { display: none; }

    .container {
      background: #18181b;
      border: 1px solid #27272a;
      border-radius: 12px;
      overflow: hidden;
      color: #fafafa;
      box-shadow: inset 0 1px 0 0 rgba(255, 255, 255, 0.05);
      background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0.03), transparent);
    }

    .table-wrap {
      overflow-x: auto;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      font-size: 13px;
    }

    thead th {
      background: #09090b;
      padding: 10px 14px;
      text-align: left;
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: #71717a;
      border-bottom: 1px solid #27272a;
      white-space: nowrap;
      user-select: none;
    }

    thead th.sortable {
      cursor: pointer;
      transition: color 150ms ease;
    }
    thead th.sortable:hover { color: #dfff61; }
    thead th.sortable:focus-visible {
      outline: 2px solid #dfff61;
      outline-offset: -2px;
    }

    .sort-arrow {
      font-size: 10px;
      margin-left: 4px;
      color: #dfff61;
    }

    tbody tr {
      transition: background 120ms ease;
    }
    tbody tr:hover { background: rgba(223, 255, 97, 0.04); }

    tbody td {
      padding: 10px 14px;
      border-bottom: 1px solid #1e1e21;
      color: #d4d4d8;
      cursor: default;
    }
    tbody td.clickable { cursor: pointer; }

    /* Anomaly cells */
    .anomaly-high {
      background: rgba(239, 68, 68, 0.15);
      border-left: 3px solid #ef4444;
      position: relative;
    }
    .anomaly-medium {
      background: rgba(234, 179, 8, 0.12);
      border-left: 3px solid #eab308;
      position: relative;
    }
    .anomaly-low {
      background: rgba(59, 130, 246, 0.10);
      border-left: 3px solid #3b82f6;
      position: relative;
    }

    .anomaly-icon {
      display: inline-block;
      margin-left: 6px;
      font-size: 11px;
      cursor: help;
    }

    .tooltip {
      position: absolute;
      bottom: calc(100% + 6px);
      left: 50%;
      transform: translateX(-50%);
      background: #09090b;
      border: 1px solid #3f3f46;
      color: #e4e4e7;
      font-size: 11px;
      padding: 6px 10px;
      border-radius: 6px;
      white-space: nowrap;
      pointer-events: none;
      z-index: 10;
      box-shadow: var(--cg-elevation-2, 0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -2px rgba(0, 0, 0, 0.2));
    }

    .empty-state {
      padding: 32px;
      text-align: center;
      color: #52525b;
      font-size: 13px;
    }
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
