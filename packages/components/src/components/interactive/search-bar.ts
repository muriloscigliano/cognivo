import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

@customElement('search-bar')
export class SearchBar extends LitElement {
  static override styles = [
    baseStyles,
    css`
      :host {
        display: block;
        width: 100%;
      }

      .search-container {
        position: relative;
        display: flex;
        align-items: center;
      }

      .search-input {
        width: 100%;
        padding: ${tokens.spacing.sm} ${tokens.spacing.md} ${tokens.spacing.sm} ${tokens.spacing.xl};
        border: 1px solid ${tokens.color.gray100};
        border-radius: ${tokens.radius.md};
        font-family: ${tokens.fontFamily.primary};
        font-size: ${tokens.fontSize.md};
        color: ${tokens.color.gray900};
        transition: all ${tokens.transition.default};
      }

      .search-input:focus {
        outline: none;
        border-color: ${tokens.color.primaryMain};
        box-shadow: 0 0 0 3px ${tokens.color.primaryLight};
      }

      .search-icon {
        position: absolute;
        left: ${tokens.spacing.md};
        color: ${tokens.color.gray500};
        pointer-events: none;
      }

      .clear-btn {
        position: absolute;
        right: ${tokens.spacing.md};
        background: none;
        border: none;
        color: ${tokens.color.gray500};
        cursor: pointer;
        padding: ${tokens.spacing.xs};
        display: flex;
        align-items: center;
        transition: color ${tokens.transition.default};
      }

      .clear-btn:hover {
        color: ${tokens.color.gray900};
      }

      :host([size='small']) .search-input {
        padding: ${tokens.spacing.xs} ${tokens.spacing.sm} ${tokens.spacing.xs} ${tokens.spacing.lg};
        font-size: ${tokens.fontSize.sm};
      }

      :host([size='large']) .search-input {
        padding: ${tokens.spacing.md} ${tokens.spacing.lg} ${tokens.spacing.md} 48px;
        font-size: ${tokens.fontSize.lg};
      }
    `,
  ];

  @property({ type: String }) value = '';
  @property({ type: String }) placeholder = 'Search...';
  @property({ type: String, reflect: true }) size: 'small' | 'medium' | 'large' = 'medium';
  @property({ type: Boolean }) clearable = true;

  private _handleInput(e: Event) {
    const input = e.target as HTMLInputElement;
    this.value = input.value;
    this.dispatchEvent(
      new CustomEvent('search', {
        bubbles: true,
        composed: true,
        detail: { value: this.value },
      })
    );
  }

  private _handleClear() {
    this.value = '';
    this.dispatchEvent(
      new CustomEvent('search', {
        bubbles: true,
        composed: true,
        detail: { value: '' },
      })
    );
  }

  override render() {
    return html`
      <div class="search-container">
        <span class="search-icon">🔍</span>
        <input
          type="text"
          class="search-input"
          .value="${this.value}"
          placeholder="${this.placeholder}"
          @input="${this._handleInput}"
        />
        ${this.clearable && this.value
          ? html`
              <button class="clear-btn" @click="${this._handleClear}" aria-label="Clear search">
                ✕
              </button>
            `
          : ''}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'search-bar': SearchBar;
  }
}
