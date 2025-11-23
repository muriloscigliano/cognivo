import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

export interface TableFilter {
  label: string;
  value: string;
  type: 'text' | 'select' | 'date' | 'number';
  options?: Array<{ label: string; value: string }>;
}

@customElement('table-filters')
export class TableFilters extends LitElement {
  static override styles = [
    baseStyles,
    css`
      :host {
        display: block;
        padding: ${tokens.spacing.md};
        background: ${tokens.color.gray50};
        border-radius: ${tokens.radius.md};
        margin-bottom: ${tokens.spacing.md};
      }

      .filters-container {
        display: flex;
        gap: ${tokens.spacing.md};
        align-items: center;
        flex-wrap: wrap;
      }

      .filter-group {
        display: flex;
        flex-direction: column;
        gap: ${tokens.spacing.xs};
        min-width: 200px;
      }

      .filter-label {
        font-size: ${tokens.fontSize.sm};
        font-weight: ${tokens.fontWeight.medium};
        color: ${tokens.color.gray700};
      }

      .filter-input,
      .filter-select {
        padding: ${tokens.spacing.sm} ${tokens.spacing.md};
        border: 1px solid ${tokens.color.gray300};
        border-radius: ${tokens.radius.sm};
        font-family: ${tokens.fontFamily.primary};
        font-size: ${tokens.fontSize.sm};
      }

      .filter-input:focus,
      .filter-select:focus {
        outline: none;
        border-color: ${tokens.color.primaryMain};
      }

      .actions {
        display: flex;
        gap: ${tokens.spacing.sm};
        align-items: flex-end;
      }

      .action-btn {
        padding: ${tokens.spacing.sm} ${tokens.spacing.md};
        background: ${tokens.color.primaryMain};
        color: ${tokens.color.grayWhite};
        border: none;
        border-radius: ${tokens.radius.sm};
        cursor: pointer;
        font-size: ${tokens.fontSize.sm};
        font-weight: ${tokens.fontWeight.medium};
        transition: background ${tokens.transition.default};
      }

      .action-btn:hover {
        background: ${tokens.color.primaryDark};
      }

      .action-btn.secondary {
        background: ${tokens.color.gray200};
        color: ${tokens.color.gray700};
      }

      .action-btn.secondary:hover {
        background: ${tokens.color.gray300};
      }
    `,
  ];

  @property({ type: Array }) filters: TableFilter[] = [];

  private _handleFilterChange(filterValue: string, value: string) {
    this.dispatchEvent(
      new CustomEvent('filter-change', {
        bubbles: true,
        composed: true,
        detail: { filter: filterValue, value },
      })
    );
  }

  private _handleApply() {
    this.dispatchEvent(
      new CustomEvent('apply-filters', {
        bubbles: true,
        composed: true,
      })
    );
  }

  private _handleClear() {
    this.dispatchEvent(
      new CustomEvent('clear-filters', {
        bubbles: true,
        composed: true,
      })
    );
  }

  override render() {
    return html`
      <div class="filters-container">
        ${this.filters.map(
          (filter) => html`
            <div class="filter-group">
              <label class="filter-label">${filter.label}</label>
              ${filter.type === 'select'
                ? html`
                    <select
                      class="filter-select"
                      @change="${(e: Event) =>
                        this._handleFilterChange(filter.value, (e.target as HTMLSelectElement).value)}"
                    >
                      <option value="">All</option>
                      ${filter.options?.map((opt) => html`<option value="${opt.value}">${opt.label}</option>`)}
                    </select>
                  `
                : html`
                    <input
                      type="${filter.type}"
                      class="filter-input"
                      @input="${(e: Event) =>
                        this._handleFilterChange(filter.value, (e.target as HTMLInputElement).value)}"
                    />
                  `}
            </div>
          `
        )}
        <div class="actions">
          <button class="action-btn" @click="${this._handleApply}">Apply</button>
          <button class="action-btn secondary" @click="${this._handleClear}">Clear</button>
        </div>
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'table-filters': TableFilters;
  }
}
