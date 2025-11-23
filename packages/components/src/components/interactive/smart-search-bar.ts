import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

export interface SearchSuggestion {
  value: string;
  label: string;
  category?: string;
}

@customElement('smart-search-bar')
export class SmartSearchBar extends LitElement {
  static override styles = [
    baseStyles,
    css`
      :host {
        display: block;
        position: relative;
      }

      .search-input {
        width: 100%;
        padding: ${tokens.spacing.sm} ${tokens.spacing.xl};
        border: 1px solid ${tokens.color.gray300};
        border-radius: ${tokens.radius.md};
        font-size: ${tokens.fontSize.md};
      }

      .suggestions {
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        margin-top: ${tokens.spacing.xs};
        background: ${tokens.color.grayWhite};
        border: 1px solid ${tokens.color.gray200};
        border-radius: ${tokens.radius.md};
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        max-height: 300px;
        overflow-y: auto;
        z-index: 100;
      }

      .suggestion-item {
        padding: ${tokens.spacing.sm} ${tokens.spacing.md};
        cursor: pointer;
        transition: background ${tokens.transition.default};
      }

      .suggestion-item:hover,
      .suggestion-item.highlighted {
        background: ${tokens.color.gray50};
      }
    `,
  ];

  @property({ type: String }) value = '';
  @property({ type: Array }) suggestions: SearchSuggestion[] = [];
  @state() private showSuggestions = false;
  @state() private highlightedIndex = -1;

  private _handleInput(e: Event) {
    const input = e.target as HTMLInputElement;
    this.value = input.value;
    this.showSuggestions = this.value.length > 0;
    this.dispatchEvent(new CustomEvent('search-input', { detail: { value: this.value } }));
  }

  private _selectSuggestion(suggestion: SearchSuggestion) {
    this.value = suggestion.value;
    this.showSuggestions = false;
    this.dispatchEvent(new CustomEvent('suggestion-select', { detail: { suggestion } }));
  }

  override render() {
    return html`
      <input type="text" class="search-input" .value="${this.value}" @input="${this._handleInput}" placeholder="Search..." />
      ${this.showSuggestions && this.suggestions.length > 0
        ? html`
            <div class="suggestions">
              ${this.suggestions.map(
                (s, i) => html`
                  <div class="suggestion-item ${i === this.highlightedIndex ? 'highlighted' : ''}" @click="${() => this._selectSuggestion(s)}">
                    ${s.label}
                  </div>
                `
              )}
            </div>
          `
        : ''}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'smart-search-bar': SmartSearchBar;
  }
}
