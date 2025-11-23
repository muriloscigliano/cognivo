import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

export interface Suggestion {
  id: string;
  text: string;
  icon?: string;
  category?: string;
}

@customElement('chat-suggestions')
export class ChatSuggestions extends LitElement {
  static override styles = [
    baseStyles,
    css`
      :host {
        display: block;
        font-family: ${tokens.fontFamily.primary};
      }

      .suggestions-container {
        padding: ${tokens.spacing.md};
      }

      .title {
        font-size: ${tokens.fontSize.sm};
        font-weight: ${tokens.fontWeight.semibold};
        color: ${tokens.color.gray500};
        margin-bottom: ${tokens.spacing.sm};
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }

      .suggestions-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: ${tokens.spacing.sm};
      }

      .suggestion-card {
        padding: ${tokens.spacing.md};
        background: white;
        border: 1px solid ${tokens.color.gray100};
        border-radius: ${tokens.radius.md};
        cursor: pointer;
        transition: all ${tokens.transition.fast};
        display: flex;
        align-items: flex-start;
        gap: ${tokens.spacing.sm};
      }

      .suggestion-card:hover {
        border-color: ${tokens.color.aiAccent};
        background: ${tokens.color.aiBackground};
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      }

      .suggestion-icon {
        font-size: 24px;
        flex-shrink: 0;
      }

      .suggestion-text {
        font-size: ${tokens.fontSize.sm};
        color: ${tokens.color.gray900};
        line-height: ${tokens.lineHeight.normal};
      }

      .category-badge {
        display: inline-block;
        padding: 2px 8px;
        background: ${tokens.color.gray50};
        border-radius: ${tokens.radius.sm};
        font-size: ${tokens.fontSize.xs};
        color: ${tokens.color.gray500};
        margin-top: ${tokens.spacing.xs};
      }

      /* List layout */
      :host([layout='list']) .suggestions-grid {
        grid-template-columns: 1fr;
      }

      /* Compact layout */
      :host([compact]) .suggestions-grid {
        gap: ${tokens.spacing.xs};
      }

      :host([compact]) .suggestion-card {
        padding: ${tokens.spacing.sm};
      }

      /* Animation */
      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(10px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      :host([animate]) .suggestion-card {
        animation: fadeInUp 0.3s ease-out;
        animation-fill-mode: both;
      }

      :host([animate]) .suggestion-card:nth-child(1) { animation-delay: 0s; }
      :host([animate]) .suggestion-card:nth-child(2) { animation-delay: 0.05s; }
      :host([animate]) .suggestion-card:nth-child(3) { animation-delay: 0.1s; }
      :host([animate]) .suggestion-card:nth-child(4) { animation-delay: 0.15s; }
    `
  ];

  @property({ type: Array })
  suggestions: Suggestion[] = [];

  @property({ type: String })
  title = 'Suggested Prompts';

  @property({ type: String, reflect: true })
  layout: 'grid' | 'list' = 'grid';

  @property({ type: Boolean, reflect: true })
  compact = false;

  @property({ type: Boolean, reflect: true })
  animate = false;

  @property({ type: Boolean })
  showTitle = true;

  private handleSuggestionClick(suggestion: Suggestion) {
    this.dispatchEvent(new CustomEvent('suggestion-select', {
      detail: suggestion,
      bubbles: true,
      composed: true
    }));
  }

  override render() {
    if (this.suggestions.length === 0) {
      return html``;
    }

    return html`
      <div class="suggestions-container">
        ${this.showTitle ? html`<div class="title">${this.title}</div>` : ''}

        <div class="suggestions-grid">
          ${this.suggestions.map(suggestion => html`
            <div
              class="suggestion-card"
              @click=${() => this.handleSuggestionClick(suggestion)}
              role="button"
              tabindex="0"
            >
              ${suggestion.icon ? html`
                <div class="suggestion-icon">${suggestion.icon}</div>
              ` : ''}
              <div>
                <div class="suggestion-text">${suggestion.text}</div>
                ${suggestion.category ? html`
                  <div class="category-badge">${suggestion.category}</div>
                ` : ''}
              </div>
            </div>
          `)}
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'chat-suggestions': ChatSuggestions;
  }
}
