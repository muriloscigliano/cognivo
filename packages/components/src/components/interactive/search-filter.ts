import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

@customElement('search-filter')
export class SearchFilter extends LitElement {
  static override styles = [
    baseStyles,
    css`
      :host {
        display: flex;
        gap: ${tokens.spacing.md};
        align-items: center;
      }

      .search-input {
        flex: 1;
        padding: ${tokens.spacing.sm} ${tokens.spacing.md};
        border: 1px solid ${tokens.color.gray100};
        border-radius: ${tokens.radius.sm};
      }

      .filter-select {
        padding: ${tokens.spacing.sm} ${tokens.spacing.md};
        border: 1px solid ${tokens.color.gray100};
        border-radius: ${tokens.radius.sm};
        min-width: 150px;
      }
    `,
  ];

  @property({ type: String }) searchValue = '';
  @property({ type: String }) filterValue = '';
  @property({ type: Array }) filterOptions: Array<{ value: string; label: string }> = [];

  override render() {
    return html`
      <input type="text" class="search-input" .value="${this.searchValue}" @input="${(e: Event) => {
        this.searchValue = (e.target as HTMLInputElement).value;
        this.dispatchEvent(new CustomEvent('filter-change'));
      }}" placeholder="Search..." />
      <select class="filter-select" .value="${this.filterValue}" @change="${(e: Event) => {
        this.filterValue = (e.target as HTMLSelectElement).value;
        this.dispatchEvent(new CustomEvent('filter-change'));
      }}">
        ${this.filterOptions.map((opt) => html`<option value="${opt.value}">${opt.label}</option>`)}
      </select>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'search-filter': SearchFilter;
  }
}
