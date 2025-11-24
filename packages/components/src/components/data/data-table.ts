import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

export interface DataTableColumn {
  key: string;
  label: string;
  sortable?: boolean;
  width?: string;
}

export interface DataTableRow {
  [key: string]: any;
}

/**
 * Data Table Component
 *
 * Feature-rich table with sorting, hover effects, and responsive design
 *
 * @element data-table
 *
 * @attr {Array} columns - Array of column definitions
 * @attr {Array} data - Array of row data
 * @attr {boolean} striped - Alternating row colors
 * @attr {boolean} hoverable - Hover effect on rows
 *
 * @example
 * ```html
 * <data-table
 *   .columns="${[{key: 'name', label: 'Name', sortable: true}]}"
 *   .data="${[{name: 'John', age: 30}]}"
 *   striped
 *   hoverable
 * ></data-table>
 * ```
 */
@customElement('data-table')
export class DataTable extends LitElement {
  static override styles = [
    baseStyles,
    css`
      :host {
        display: block;
        width: 100%;
        background: ${tokens.color.grayWhite};
        border-radius: ${tokens.radius.md};
        overflow: hidden;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      }

      .table-container {
        overflow-x: auto;
      }

      table {
        width: 100%;
        border-collapse: collapse;
        font-family: ${tokens.fontFamily.primary};
      }

      thead {
        background: ${tokens.color.gray100};
        border-bottom: 2px solid ${tokens.color.gray500};
      }

      th {
        padding: ${tokens.spacing.md};
        text-align: left;
        font-weight: ${tokens.fontWeight.semibold};
        font-size: ${tokens.fontSize.sm};
        color: ${tokens.color.gray900};
        white-space: nowrap;
        user-select: none;
      }

      th.sortable {
        cursor: pointer;
        transition: background ${tokens.transition.default};
      }

      th.sortable:hover {
        background: ${tokens.color.gray50};
      }

      th.sortable::after {
        content: '';
        display: inline-block;
        width: 0;
        height: 0;
        margin-left: 8px;
        vertical-align: middle;
        border-left: 4px solid transparent;
        border-right: 4px solid transparent;
      }

      th.sort-asc::after {
        border-bottom: 4px solid ${tokens.color.gray900};
      }

      th.sort-desc::after {
        border-top: 4px solid ${tokens.color.gray900};
      }

      td {
        padding: ${tokens.spacing.md};
        font-size: ${tokens.fontSize.sm};
        color: ${tokens.color.gray900};
        border-bottom: 1px solid ${tokens.color.gray100};
      }

      tbody tr {
        transition: background ${tokens.transition.default};
      }

      :host([hoverable]) tbody tr:hover {
        background: ${tokens.color.gray50};
      }

      :host([striped]) tbody tr:nth-child(even) {
        background: ${tokens.color.gray50};
      }

      :host([striped][hoverable]) tbody tr:nth-child(even):hover {
        background: ${tokens.color.gray100};
      }

      .no-data {
        padding: ${tokens.spacing.xl};
        text-align: center;
        color: ${tokens.color.gray500};
        font-size: ${tokens.fontSize.sm};
      }

      .loading {
        padding: ${tokens.spacing.xl};
        text-align: center;
        color: ${tokens.color.gray500};
      }
    `,
  ];

  @property({ type: Array })
  columns: DataTableColumn[] = [];

  @property({ type: Array })
  data: DataTableRow[] = [];

  @property({ type: Boolean })
  striped = false;

  @property({ type: Boolean })
  hoverable = true;

  @property({ type: Boolean })
  loading = false;

  @state()
  private sortKey: string | null = null;

  @state()
  private sortDirection: 'asc' | 'desc' = 'asc';

  private handleSort(column: DataTableColumn) {
    if (!column.sortable) return;

    if (this.sortKey === column.key) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortKey = column.key;
      this.sortDirection = 'asc';
    }
  }

  private getSortedData(): DataTableRow[] {
    if (!this.sortKey) return this.data;

    return [...this.data].sort((a, b) => {
      const aVal = a[this.sortKey!];
      const bVal = b[this.sortKey!];

      if (aVal === bVal) return 0;

      const comparison = aVal < bVal ? -1 : 1;
      return this.sortDirection === 'asc' ? comparison : -comparison;
    });
  }

  override render() {
    if (this.loading) {
      return html`<div class="loading">Loading...</div>`;
    }

    if (!this.data || this.data.length === 0) {
      return html`<div class="no-data">No data available</div>`;
    }

    const sortedData = this.getSortedData();

    return html`
      <div class="table-container">
        <table>
          <thead>
            <tr>
              ${this.columns.map(column => {
                const isSorted = this.sortKey === column.key;
                const sortClass = isSorted
                  ? this.sortDirection === 'asc'
                    ? 'sort-asc'
                    : 'sort-desc'
                  : '';
                const classes = [
                  column.sortable ? 'sortable' : '',
                  sortClass,
                ].filter(Boolean).join(' ');

                return html`
                  <th
                    class="${classes}"
                    style="${column.width ? `width: ${column.width}` : ''}"
                    @click="${() => this.handleSort(column)}"
                  >
                    ${column.label}
                  </th>
                `;
              })}
            </tr>
          </thead>
          <tbody>
            ${sortedData.map(row => html`
              <tr>
                ${this.columns.map(column => html`
                  <td>${row[column.key] ?? '-'}</td>
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
    'data-table': DataTable;
  }
}
