import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { repeat } from 'lit/directives/repeat.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';
import '../ai-confidence-badge/ai-confidence-badge.js';

/**
 * Column definition for AI Table
 */
export interface AiTableColumn {
  key: string;
  label: string;
  type?: 'text' | 'number' | 'currency' | 'percentage' | 'date' | 'anomaly' | 'confidence';
  sortable?: boolean;
  width?: string;
  align?: 'left' | 'center' | 'right';
}

/**
 * Row data with optional AI metadata
 */
export interface AiTableRow {
  [key: string]: any;
  _anomaly?: boolean;
  _anomalySeverity?: 'low' | 'medium' | 'high' | 'critical';
  _confidence?: number;
  _highlighted?: boolean;
}

/**
 * AI Table
 *
 * Data table with AI-powered features: anomaly highlighting, confidence scores,
 * sortable columns, and inline AI actions.
 *
 * @element ai-table
 *
 * @attr {boolean} highlight-anomalies - Highlight rows with anomalies
 * @attr {boolean} show-confidence - Show confidence badges
 * @attr {boolean} striped - Striped rows
 * @attr {boolean} hoverable - Hover effect on rows
 * @attr {boolean} compact - Compact padding
 * @attr {string} empty-message - Message when no data
 *
 * @fires ai:row-selected - Fired when a row is clicked
 * @fires ai:sort-changed - Fired when sorting changes
 *
 * @example
 * ```html
 * <ai-table
 *   .columns=${columns}
 *   .data=${data}
 *   highlight-anomalies
 *   show-confidence
 * ></ai-table>
 * ```
 */
@customElement('ai-table')
export class AiTable extends LitElement {
  static override styles = [
    baseStyles,
    css`
      :host {
        display: block;
        width: 100%;
        overflow-x: auto;
        background: ${tokens.color.grayWhite};
        border: 1px solid ${tokens.color.gray100};
        border-radius: ${tokens.radius.lg};
      }

      table {
        width: 100%;
        border-collapse: collapse;
        font-size: ${tokens.fontSize.sm};
        font-family: ${tokens.fontFamily.primary};
      }

      /* Header */
      thead {
        background: ${tokens.color.gray50};
        border-bottom: 2px solid ${tokens.color.gray100};
      }

      th {
        padding: var(--cell-padding, 12px 16px);
        text-align: var(--cell-align, left);
        font-weight: ${tokens.fontWeight.semibold};
        color: ${tokens.color.gray900};
        white-space: nowrap;
        user-select: none;
      }

      th.sortable {
        cursor: pointer;
        transition: all ${tokens.transition.default};
      }

      th.sortable:hover {
        background: ${tokens.color.gray100};
        color: ${tokens.color.aiAccent};
      }

      .sort-icon {
        display: inline-block;
        margin-left: 4px;
        opacity: 0.5;
        font-size: 10px;
      }

      th.sorted .sort-icon {
        opacity: 1;
        color: ${tokens.color.aiAccent};
      }

      /* Body */
      tbody tr {
        border-bottom: 1px solid ${tokens.color.gray100};
        transition: all ${tokens.transition.default};
      }

      :host([striped]) tbody tr:nth-child(even) {
        background: ${tokens.color.gray50};
      }

      :host([hoverable]) tbody tr:hover {
        background: ${tokens.color.gray100};
        cursor: pointer;
      }

      td {
        padding: var(--cell-padding, 12px 16px);
        text-align: var(--cell-align, left);
        color: ${tokens.color.gray500};
      }

      /* Compact mode */
      :host([compact]) th,
      :host([compact]) td {
        --cell-padding: 8px 12px;
      }

      /* Anomaly highlighting */
      tr[data-anomaly='low'] {
        background: #fef9c3;
        border-left: 3px solid #eab308;
      }

      tr[data-anomaly='medium'] {
        background: #fed7aa;
        border-left: 3px solid #f97316;
      }

      tr[data-anomaly='high'] {
        background: #fecaca;
        border-left: 3px solid #ef4444;
      }

      tr[data-anomaly='critical'] {
        background: #fecaca;
        border-left: 3px solid #dc2626;
        box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1);
        animation: pulseGlow 2s infinite;
      }

      @keyframes pulseGlow {
        0%, 100% {
          box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1);
        }
        50% {
          box-shadow: 0 0 0 6px rgba(220, 38, 38, 0.2);
        }
      }

      /* Highlighted rows */
      tr.highlighted {
        background: ${tokens.color.aiBackground};
        border-left: 3px solid ${tokens.color.aiAccent};
      }

      /* Column alignment */
      .align-left {
        --cell-align: left;
      }

      .align-center {
        --cell-align: center;
      }

      .align-right {
        --cell-align: right;
      }

      /* Cell types */
      .cell-number,
      .cell-currency,
      .cell-percentage {
        font-variant-numeric: tabular-nums;
        font-weight: ${tokens.fontWeight.medium};
        color: ${tokens.color.gray900};
      }

      .cell-currency::before {
        content: '$';
        opacity: 0.5;
        margin-right: 2px;
      }

      .cell-percentage::after {
        content: '%';
        opacity: 0.5;
        margin-left: 2px;
      }

      .cell-anomaly {
        display: inline-flex;
        align-items: center;
        gap: 6px;
      }

      .anomaly-indicator {
        width: 8px;
        height: 8px;
        border-radius: 50%;
      }

      .anomaly-indicator.low {
        background: #eab308;
      }

      .anomaly-indicator.medium {
        background: #f97316;
      }

      .anomaly-indicator.high {
        background: #ef4444;
      }

      .anomaly-indicator.critical {
        background: #dc2626;
        animation: pulse 2s infinite;
      }

      /* Empty state */
      .empty-state {
        padding: ${tokens.spacing.xl};
        text-align: center;
        color: ${tokens.color.gray500};
      }

      .empty-state-icon {
        font-size: 48px;
        opacity: 0.3;
        margin-bottom: ${tokens.spacing.sm};
      }

      /* Legend */
      .legend {
        display: flex;
        align-items: center;
        gap: ${tokens.spacing.lg};
        padding: ${tokens.spacing.md} ${tokens.spacing.lg};
        background: ${tokens.color.gray50};
        border-top: 1px solid ${tokens.color.gray100};
        font-size: ${tokens.fontSize.xs};
        color: ${tokens.color.gray500};
      }

      .legend-item {
        display: flex;
        align-items: center;
        gap: 6px;
      }

      .legend-dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
      }

      /* Responsive */
      @media (max-width: 768px) {
        th, td {
          --cell-padding: 8px 12px;
          font-size: 12px;
        }

        .legend {
          flex-wrap: wrap;
        }
      }

      /* Dark mode */
      @media (prefers-color-scheme: dark) {
        :host {
          background: #1f2937;
          border-color: #374151;
        }

        thead {
          background: #111827;
          border-color: #374151;
        }

        th {
          color: #f9fafb;
        }

        tbody tr {
          border-color: #374151;
        }

        :host([striped]) tbody tr:nth-child(even) {
          background: #374151;
        }

        :host([hoverable]) tbody tr:hover {
          background: #4b5563;
        }

        td {
          color: #d1d5db;
        }

        .legend {
          background: #111827;
          border-color: #374151;
          color: #9ca3af;
        }
      }
    `,
  ];

  /**
   * Column definitions
   */
  @property({ type: Array })
  columns: AiTableColumn[] = [];

  /**
   * Table data
   */
  @property({ type: Array })
  data: AiTableRow[] = [];

  /**
   * Highlight anomalies
   */
  @property({ type: Boolean, attribute: 'highlight-anomalies' })
  highlightAnomalies = false;

  /**
   * Show confidence badges
   */
  @property({ type: Boolean, attribute: 'show-confidence' })
  showConfidence = false;

  /**
   * Striped rows
   */
  @property({ type: Boolean, reflect: true })
  striped = false;

  /**
   * Hoverable rows
   */
  @property({ type: Boolean, reflect: true })
  hoverable = true;

  /**
   * Compact padding
   */
  @property({ type: Boolean, reflect: true })
  compact = false;

  /**
   * Empty message
   */
  @property({ type: String, attribute: 'empty-message' })
  emptyMessage = 'No data available';

  /**
   * Show legend
   */
  @property({ type: Boolean, attribute: 'show-legend' })
  showLegend = false;

  /**
   * Sort state
   */
  @state()
  private sortColumn: string | null = null;

  @state()
  private sortDirection: 'asc' | 'desc' = 'asc';

  /**
   * Get sorted data
   */
  private get sortedData(): AiTableRow[] {
    if (!this.sortColumn) return this.data;

    return [...this.data].sort((a, b) => {
      const aVal = a[this.sortColumn!];
      const bVal = b[this.sortColumn!];

      if (aVal === bVal) return 0;

      const comparison = aVal > bVal ? 1 : -1;
      return this.sortDirection === 'asc' ? comparison : -comparison;
    });
  }

  /**
   * Handle column header click
   */
  private handleSort(column: AiTableColumn) {
    if (!column.sortable) return;

    if (this.sortColumn === column.key) {
      // Toggle direction
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      // New column
      this.sortColumn = column.key;
      this.sortDirection = 'asc';
    }

    this.dispatchEvent(
      new CustomEvent('ai:sort-changed', {
        detail: {
          column: this.sortColumn,
          direction: this.sortDirection,
          timestamp: Date.now(),
        },
        bubbles: true,
        composed: true,
      })
    );
  }

  /**
   * Handle row click
   */
  private handleRowClick(row: AiTableRow, index: number) {
    this.dispatchEvent(
      new CustomEvent('ai:row-selected', {
        detail: {
          row,
          index,
          timestamp: Date.now(),
        },
        bubbles: true,
        composed: true,
      })
    );
  }

  /**
   * Format cell value based on type
   */
  private formatCell(value: any, column: AiTableColumn): any {
    switch (column.type) {
      case 'currency':
        return typeof value === 'number' ? value.toLocaleString() : value;
      case 'percentage':
        return typeof value === 'number' ? Math.round(value * 100) : value;
      case 'number':
        return typeof value === 'number' ? value.toLocaleString() : value;
      case 'date':
        return value instanceof Date ? value.toLocaleDateString() : value;
      default:
        return value;
    }
  }

  /**
   * Render table header
   */
  private renderHeader() {
    return html`
      <thead>
        <tr>
          ${this.columns.map(
            (column) => html`
              <th
                class=${classMap({
                  sortable: column.sortable ?? false,
                  sorted: this.sortColumn === column.key,
                  [`align-${column.align || 'left'}`]: true,
                })}
                style=${column.width ? `width: ${column.width}` : ''}
                @click=${() => this.handleSort(column)}
              >
                ${column.label}
                ${column.sortable
                  ? html`
                      <span class="sort-icon">
                        ${this.sortColumn === column.key
                          ? this.sortDirection === 'asc'
                            ? '▲'
                            : '▼'
                          : '⇅'}
                      </span>
                    `
                  : null}
              </th>
            `
          )}
        </tr>
      </thead>
    `;
  }

  /**
   * Render table body
   */
  private renderBody() {
    const data = this.sortedData;

    if (data.length === 0) {
      return html`
        <tbody>
          <tr>
            <td colspan=${this.columns.length}>
              <div class="empty-state">
                <div class="empty-state-icon">📊</div>
                <p>${this.emptyMessage}</p>
              </div>
            </td>
          </tr>
        </tbody>
      `;
    }

    return html`
      <tbody>
        ${repeat(
          data,
          (row, index) => index,
          (row, index) => {
            const anomalySeverity = row._anomalySeverity || null;
            const isHighlighted = row._highlighted || false;

            return html`
              <tr
                class=${classMap({
                  highlighted: isHighlighted,
                })}
                data-anomaly=${anomalySeverity || ''}
                @click=${() => this.handleRowClick(row, index)}
              >
                ${this.columns.map((column) => {
                  const value = row[column.key];
                  const formattedValue = this.formatCell(value, column);

                  return html`
                    <td class=${`cell-${column.type || 'text'} align-${column.align || 'left'}`}>
                      ${column.type === 'anomaly'
                        ? html`
                            <div class="cell-anomaly">
                              ${anomalySeverity
                                ? html`
                                    <span class="anomaly-indicator ${anomalySeverity}"></span>
                                  `
                                : null}
                              <span>${value ? 'Anomaly' : 'Normal'}</span>
                            </div>
                          `
                        : column.type === 'confidence' && this.showConfidence
                        ? html`
                            <ai-confidence-badge
                              score=${value || 0}
                              size="sm"
                              show-percentage
                            ></ai-confidence-badge>
                          `
                        : formattedValue}
                    </td>
                  `;
                })}
              </tr>
            `;
          }
        )}
      </tbody>
    `;
  }

  /**
   * Render legend
   */
  private renderLegend() {
    if (!this.showLegend || !this.highlightAnomalies) return null;

    return html`
      <div class="legend">
        <span>Anomaly Severity:</span>
        <div class="legend-item">
          <span class="legend-dot" style="background: #eab308"></span>
          <span>Low</span>
        </div>
        <div class="legend-item">
          <span class="legend-dot" style="background: #f97316"></span>
          <span>Medium</span>
        </div>
        <div class="legend-item">
          <span class="legend-dot" style="background: #ef4444"></span>
          <span>High</span>
        </div>
        <div class="legend-item">
          <span class="legend-dot" style="background: #dc2626"></span>
          <span>Critical</span>
        </div>
      </div>
    `;
  }

  override render() {
    return html`
      <table>
        ${this.renderHeader()} ${this.renderBody()}
      </table>
      ${this.renderLegend()}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ai-table': AiTable;
  }
}
