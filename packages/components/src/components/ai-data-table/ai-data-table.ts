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
import { property, state, customElement, query } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import { styleMap } from 'lit/directives/style-map.js';
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

    /* ── Virtualized scroll container ── */
    :host([virtualize]) .table-scroll {
      overflow-y: auto;
      max-height: var(--cg-component-table-virtual-max-height);
    }
    :host([virtualize]) table { table-layout: fixed; }
    .virtual-spacer td { padding: 0; border: none; background: transparent; }

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
      box-shadow: inset 0 0 0 var(--cg-border-width-100) var(--cg-color-action-primary-background-default);
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
    tbody tr { transition: background-color var(--cg-transition-duration-fast) var(--cg-transition-easing-default); }
    tbody tr:hover td { background: var(--cg-color-action-tertiary-background-hover); }

    /* Striped */
    :host([striped]) tbody tr:nth-child(even) td {
      background: var(--cg-color-action-tertiary-background-hover);
    }

    /* ── Anomaly cells — left accent border ── */
    .anomaly-high {
      border-left: var(--cg-border-width-300) solid var(--cg-color-status-error-text-default);
    }
    .anomaly-medium {
      border-left: var(--cg-border-width-300) solid var(--cg-color-status-warning-text-default);
    }
    .anomaly-low {
      border-left: var(--cg-border-width-300) solid var(--cg-color-status-info-text-default);
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

  /** Field name used as stable key for each row (Lit repeat directive). Improves diffing on sort/filter. */
  @property({ type: String }) rowIdKey = 'id';
  /** Opt-in windowed rendering for large datasets (>200 rows recommended). */
  @property({ type: Boolean, reflect: true }) virtualize = false;
  /** Estimated row height in pixels (used to compute the visible window). */
  @property({ type: Number }) rowHeight = 48;
  /** Extra rows rendered above/below the viewport to avoid pop-in during fast scrolls. */
  @property({ type: Number }) overscan = 5;

  @state() private _sortKey = '';
  @state() private _sortDir: 'asc' | 'desc' = 'asc';
  @state() private _hoveredAnomaly: string | null = null;
  @state() private _scrollTop = 0;
  @state() private _viewportHeight = 0;

  @query('.table-scroll') private _scrollEl?: HTMLElement;

  private _resizeObserver: ResizeObserver | null = null;
  private _onScroll = (): void => {
    if (this._scrollEl) this._scrollTop = this._scrollEl.scrollTop;
  };

  // Memo cache for sorted data + anomaly lookup
  private _sortedCache: { data: Record<string, unknown>[]; key: string; dir: string; source: Record<string, unknown>[] } | null = null;
  private _anomalyMap: Map<string, Anomaly> | null = null;
  private _anomalyMapSource: Anomaly[] | null = null;

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this._scrollEl?.removeEventListener('scroll', this._onScroll);
    this._resizeObserver?.disconnect();
    this._resizeObserver = null;
  }

  override firstUpdated(): void {
    this._wireVirtualization();
  }

  override updated(changed: Map<string, unknown>): void {
    if (changed.has('virtualize')) this._wireVirtualization();
  }

  private _wireVirtualization(): void {
    if (!this.virtualize) {
      this._scrollEl?.removeEventListener('scroll', this._onScroll);
      this._resizeObserver?.disconnect();
      this._resizeObserver = null;
      return;
    }
    const el = this._scrollEl;
    if (!el) return;
    el.addEventListener('scroll', this._onScroll, { passive: true });
    this._viewportHeight = el.clientHeight;
    this._scrollTop = el.scrollTop;
    if (typeof ResizeObserver !== 'undefined') {
      this._resizeObserver?.disconnect();
      this._resizeObserver = new ResizeObserver(() => {
        if (this._scrollEl) this._viewportHeight = this._scrollEl.clientHeight;
      });
      this._resizeObserver.observe(el);
    }
  }

  private _getAnomaly(row: number, col: string): Anomaly | undefined {
    if (this._anomalyMapSource !== this.anomalies || !this._anomalyMap) {
      this._anomalyMap = new Map();
      for (const a of this.anomalies) this._anomalyMap.set(`${a.row}::${a.col}`, a);
      this._anomalyMapSource = this.anomalies;
    }
    return this._anomalyMap.get(`${row}::${col}`);
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
    const cached = this._sortedCache;
    if (cached && cached.source === this.data && cached.key === this._sortKey && cached.dir === this._sortDir) {
      return cached.data;
    }
    const key = this._sortKey;
    const dirMul = this._sortDir === 'desc' ? -1 : 1;
    const sorted = [...this.data].sort((a, b) => {
      const va = a[key];
      const vb = b[key];
      if (va == null && vb == null) return 0;
      if (va == null) return 1 * dirMul;
      if (vb == null) return -1 * dirMul;
      if (typeof va === 'number' && typeof vb === 'number') return (va - vb) * dirMul;
      return String(va).localeCompare(String(vb)) * dirMul;
    });
    this._sortedCache = { data: sorted, key, dir: this._sortDir, source: this.data };
    return sorted;
  }

  private _rowKey(row: Record<string, unknown>, fallbackIdx: number): string | number {
    const id = row[this.rowIdKey];
    if (id != null && (typeof id === 'string' || typeof id === 'number')) return id;
    return fallbackIdx;
  }

  private _renderRow(row: Record<string, unknown>, ri: number) {
    return html`
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
              aria-label=${anomaly ? `Anomaly: ${anomaly.reason}` : nothing}
              @click=${() => { this._handleCellClick(ri, col.key, row[col.key]); if (anomaly) this._handleAnomalyClick(anomaly); }}
              @mouseenter=${() => { if (anomaly) this._hoveredAnomaly = cellId; }}
              @mouseleave=${() => { this._hoveredAnomaly = null; }}
            >
              ${typeof row[col.key] === 'object' ? JSON.stringify(row[col.key]) : String(row[col.key] ?? '')}
              ${anomaly ? html`<span class="anomaly-icon" title="${anomaly.reason}" aria-hidden="true"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/></svg></span>` : nothing}
              ${anomaly && this._hoveredAnomaly === cellId ? html`<span class="tooltip" role="tooltip">${anomaly.reason}</span>` : nothing}
            </td>
          `;
        })}
      </tr>
    `;
  }

  private _renderRows() {
    const rows = this._sortedData;

    // Fast path: no virtualization — repeat with stable keys so sort/filter only moves nodes.
    if (!this.virtualize) {
      return repeat(
        rows,
        (row, i) => this._rowKey(row, i),
        (row, i) => this._renderRow(row, i),
      );
    }

    // Windowed rendering. Before firstUpdated, _viewportHeight is 0 — render an initial chunk
    // so rows exist to measure against and SSR/initial paint isn't empty.
    const rh = Math.max(1, this.rowHeight);
    const vh = this._viewportHeight > 0 ? this._viewportHeight : rh * 10;
    const start = Math.max(0, Math.floor(this._scrollTop / rh) - this.overscan);
    const end = Math.min(rows.length, Math.ceil((this._scrollTop + vh) / rh) + this.overscan);
    const visible = rows.slice(start, end);
    const topPad = start * rh;
    const bottomPad = Math.max(0, (rows.length - end) * rh);
    const colspan = this.columns.length;

    return html`
      ${topPad > 0 ? html`<tr class="virtual-spacer" aria-hidden="true"><td colspan=${colspan} style=${styleMap({ height: `${topPad}px` })}></td></tr>` : nothing}
      ${repeat(
        visible,
        (row, i) => this._rowKey(row, start + i),
        (row, i) => this._renderRow(row, start + i),
      )}
      ${bottomPad > 0 ? html`<tr class="virtual-spacer" aria-hidden="true"><td colspan=${colspan} style=${styleMap({ height: `${bottomPad}px` })}></td></tr>` : nothing}
    `;
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
              ${this._renderRows()}
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
