import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

export interface SortOption {
  value: string;
  label: string;
}

@customElement('sorter')
export class Sorter extends LitElement {
  static override styles = [
    baseStyles,
    css`
      :host {
        display: inline-flex;
        align-items: center;
        gap: ${tokens.spacing.sm};
      }

      .label {
        font-size: ${tokens.fontSize.sm};
        font-weight: ${tokens.fontWeight.medium};
        color: ${tokens.color.gray900};
      }

      .sort-select {
        padding: ${tokens.spacing.xs} ${tokens.spacing.md};
        border: 1px solid ${tokens.color.gray100};
        border-radius: ${tokens.radius.sm};
        font-family: ${tokens.fontFamily.primary};
        font-size: ${tokens.fontSize.sm};
        color: ${tokens.color.gray900};
        background: ${tokens.color.grayWhite};
        cursor: pointer;
        transition: all ${tokens.transition.default};
      }

      .sort-select:hover {
        border-color: ${tokens.color.gray500};
      }

      .sort-select:focus {
        outline: none;
        border-color: ${tokens.color.primaryMain};
        box-shadow: 0 0 0 3px ${tokens.color.primaryLight};
      }

      .direction-btn {
        padding: ${tokens.spacing.xs};
        background: ${tokens.color.grayWhite};
        border: 1px solid ${tokens.color.gray100};
        border-radius: ${tokens.radius.sm};
        cursor: pointer;
        display: flex;
        align-items: center;
        color: ${tokens.color.gray500};
        transition: all ${tokens.transition.default};
      }

      .direction-btn:hover {
        border-color: ${tokens.color.gray500};
        color: ${tokens.color.gray900};
      }

      .direction-btn.asc {
        transform: rotate(180deg);
      }
    `,
  ];

  @property({ type: Array }) options: SortOption[] = [];
  @property({ type: String }) value = '';
  @property({ type: String }) direction: 'asc' | 'desc' = 'asc';
  @property({ type: String }) label = 'Sort by:';

  private _handleChange(e: Event) {
    const select = e.target as HTMLSelectElement;
    this.value = select.value;
    this._emitChange();
  }

  private _toggleDirection() {
    this.direction = this.direction === 'asc' ? 'desc' : 'asc';
    this._emitChange();
  }

  private _emitChange() {
    this.dispatchEvent(
      new CustomEvent('sort-change', {
        bubbles: true,
        composed: true,
        detail: { value: this.value, direction: this.direction },
      })
    );
  }

  override render() {
    return html`
      ${this.label ? html`<span class="label">${this.label}</span>` : ''}
      <select class="sort-select" @change="${this._handleChange}">
        ${this.options.map(
          (option) => html`
            <option value="${option.value}" ?selected="${option.value === this.value}">
              ${option.label}
            </option>
          `
        )}
      </select>
      <button
        class="direction-btn ${this.direction}"
        @click="${this._toggleDirection}"
        aria-label="Toggle sort direction"
      >
        ↓
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sorter': Sorter;
  }
}
