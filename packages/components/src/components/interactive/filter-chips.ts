import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

export interface FilterChip {
  id: string;
  label: string;
  value: string;
}

@customElement('filter-chips')
export class FilterChips extends LitElement {
  static override styles = [
    baseStyles,
    css`
      :host {
        display: flex;
        flex-wrap: wrap;
        gap: ${tokens.spacing.sm};
      }

      .chip {
        display: inline-flex;
        align-items: center;
        gap: ${tokens.spacing.xs};
        padding: ${tokens.spacing.xs} ${tokens.spacing.md};
        background: ${tokens.color.primaryLight};
        color: ${tokens.color.primaryMain};
        border-radius: ${tokens.radius.full};
        font-size: ${tokens.fontSize.sm};
        font-weight: ${tokens.fontWeight.medium};
      }

      .remove-btn {
        background: none;
        border: none;
        color: inherit;
        cursor: pointer;
        padding: 0;
        display: flex;
      }
    `,
  ];

  @property({ type: Array }) filters: FilterChip[] = [];

  private _removeFilter(filter: FilterChip) {
    this.dispatchEvent(new CustomEvent('remove-filter', { detail: { filter } }));
  }

  override render() {
    return html`
      ${this.filters.map(
        (filter) => html`
          <div class="chip">
            ${filter.label}: ${filter.value}
            <button class="remove-btn" @click="${() => this._removeFilter(filter)}">✕</button>
          </div>
        `
      )}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'filter-chips': FilterChips;
  }
}
