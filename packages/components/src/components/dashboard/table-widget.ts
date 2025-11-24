import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

/**
 * Table Column Definition
 */
export interface TableColumn {
  key: string;
  label: string;
  sortable?: boolean;
  width?: string;
  align?: 'left' | 'center' | 'right';
}

/**
 * Table Row Data
 */
export interface WidgetTableRow {
  [key: string]: any;
}

/**
 * Table Widget - Table data widget with sorting and filtering
 *
 * Features:
 * - Sortable columns
 * - Row highlighting on hover
 * - Responsive design
 * - Empty state
 * - Custom column widths and alignment
 * - Row click events
 */
@customElement('table-widget')
export class TableWidget extends LitElement {
  static override styles = [
    baseStyles,
    css`
      :host {
        display: block;
        background: ${tokens.color.grayWhite};
        border-radius: ${tokens.radius.lg};
        overflow: hidden;
      }

      .table-container {
        width: 100%;
        overflow-x: auto;
      }

      table {
        width: 100%;
        border-collapse: collapse;
        font-size: ${tokens.fontSize.sm};
      }

      thead {
        background: ${tokens.color.gray100};
        border-bottom: 2px solid ${tokens.color.gray100};
      }

      th {
        padding: ${tokens.spacing.md} ${tokens.spacing.lg};
        text-align: left;
        font-weight: ${tokens.fontWeight.semibold};
        color: ${tokens.color.gray900};
        white-space: nowrap;
        position: relative;
      }

      th[data-align='center'] {
        text-align: center;
      }

      th[data-align='right'] {
        text-align: right;
      }

      th[data-sortable='true'] {
        cursor: pointer;
        user-select: none;
      }

      th[data-sortable='true']:hover {
        background: ${tokens.color.gray100};
      }

      .sort-indicator {
        display: inline-block;
        margin-left: ${tokens.spacing.xs};
        opacity: 0.5;
        font-size: ${tokens.fontSize.xs};
      }

      th[data-sort-direction='asc'] .sort-indicator,
      th[data-sort-direction='desc'] .sort-indicator {
        opacity: 1;
      }

      tbody tr {
        border-bottom: 1px solid ${tokens.color.gray100};
        transition: background ${tokens.transition.fast};
      }

      tbody tr:hover {
        background: ${tokens.color.gray50};
      }

      tbody tr[data-clickable='true'] {
        cursor: pointer;
      }

      tbody tr[data-clickable='true']:active {
        background: ${tokens.color.gray100};
      }

      td {
        padding: ${tokens.spacing.md} ${tokens.spacing.lg};
        color: ${tokens.color.gray900};
      }

      td[data-align='center'] {
        text-align: center;
      }

      td[data-align='right'] {
        text-align: right;
      }

      .empty-state {
        padding: ${tokens.spacing.xxl};
        text-align: center;
        color: ${tokens.color.gray500};
      }

      /* Responsive */
      @media (max-width: 768px) {
        th, td {
          padding: ${tokens.spacing.sm} ${tokens.spacing.md};
          font-size: ${tokens.fontSize.xs};
        }
      }

      /* Loading state */
      :host([loading]) tbody {
        opacity: 0.5;
        pointer-events: none;
      }
    `
  ];

  @property({ type: Array })
  columns: TableColumn[] = [];

  @property({ type: Array })
  rows: WidgetTableRow[] = [];

  @property({ type: Boolean, reflect: true })
  loading = false;

  @property({ type: Boolean })
  clickableRows = false;

  @property({ type: String })
  emptyText = 'No data available';

  @state()
  private _sortColumn: string | null = null;

  @state()
  private _sortDirection: 'asc' | 'desc' | null = null;

  private _handleSort(column: TableColumn) {
    if (!column.sortable) return;

    if (this._sortColumn === column.key) {
      if (this._sortDirection === 'asc') {
        this._sortDirection = 'desc';
      } else if (this._sortDirection === 'desc') {
        this._sortColumn = null;
        this._sortDirection = null;
      } else {
        this._sortDirection = 'asc';
      }
    } else {
      this._sortColumn = column.key;
      this._sortDirection = 'asc';
    }

    this.dispatchEvent(new CustomEvent('sort-change', {
      bubbles: true,
      composed: true,
      detail: {
        column: this._sortColumn,
        direction: this._sortDirection
      }
    }));
  }

  private _handleRowClick(row: WidgetTableRow, index: number) {
    if (!this.clickableRows) return;

    this.dispatchEvent(new CustomEvent('row-click', {
      bubbles: true,
      composed: true,
      detail: { row, index }
    }));
  }

  private _getSortedRows(): WidgetTableRow[] {
    if (!this._sortColumn || !this._sortDirection) {
      return this.rows;
    }

    return [...this.rows].sort((a, b) => {
      const aVal = a[this._sortColumn!];
      const bVal = b[this._sortColumn!];

      if (aVal === bVal) return 0;

      const comparison = aVal < bVal ? -1 : 1;
      return this._sortDirection === 'asc' ? comparison : -comparison;
    });
  }

  private _getSortIndicator(column: TableColumn): string {
    if (column.key !== this._sortColumn) return '⇅';
    return this._sortDirection === 'asc' ? '↑' : '↓';
  }

  override render() {
    if (this.columns.length === 0 || this.rows.length === 0) {
      return html`
        <div class="empty-state">${this.emptyText}</div>
      `;
    }

    const sortedRows = this._getSortedRows();

    return html`
      <div class="table-container">
        <table>
          <thead>
            <tr>
              ${this.columns.map(column => html`
                <th
                  data-sortable="${column.sortable || false}"
                  data-align="${column.align || 'left'}"
                  data-sort-direction="${column.key === this._sortColumn ? this._sortDirection : ''}"
                  style="${column.width ? `width: ${column.width}` : ''}"
                  @click=${() => this._handleSort(column)}
                >
                  ${column.label}
                  ${column.sortable ? html`
                    <span class="sort-indicator">
                      ${this._getSortIndicator(column)}
                    </span>
                  ` : ''}
                </th>
              `)}
            </tr>
          </thead>
          <tbody>
            ${sortedRows.map((row, index) => html`
              <tr
                data-clickable="${this.clickableRows}"
                @click=${() => this._handleRowClick(row, index)}
              >
                ${this.columns.map(column => html`
                  <td data-align="${column.align || 'left'}">
                    ${row[column.key] ?? '-'}
                  </td>
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
    'table-widget': TableWidget;
  }
}
