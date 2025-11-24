import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

@customElement('chat-header')
export class ChatHeader extends LitElement {
  static override styles = [
    baseStyles,
    css`
      :host {
        display: block;
        font-family: ${tokens.fontFamily.primary};
      }

      .header-container {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: ${tokens.spacing.md};
        background: white;
        border-bottom: 1px solid ${tokens.color.gray100};
      }

      .header-left {
        display: flex;
        align-items: center;
        gap: ${tokens.spacing.sm};
        flex: 1;
        min-width: 0;
      }

      .header-info {
        flex: 1;
        min-width: 0;
      }

      .title {
        font-size: ${tokens.fontSize.md};
        font-weight: ${tokens.fontWeight.semibold};
        color: ${tokens.color.gray900};
        margin: 0;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .subtitle {
        font-size: ${tokens.fontSize.sm};
        color: ${tokens.color.gray500};
        margin-top: 2px;
      }

      .status-indicator {
        display: inline-flex;
        align-items: center;
        gap: 4px;
        font-size: ${tokens.fontSize.xs};
      }

      .status-dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: ${tokens.color.success};
      }

      .status-dot.offline {
        background: ${tokens.color.gray500};
      }

      .status-dot.typing {
        background: ${tokens.color.aiAccent};
        animation: pulse 1.5s ease-in-out infinite;
      }

      @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.5; }
      }

      .header-actions {
        display: flex;
        align-items: center;
        gap: ${tokens.spacing.xs};
      }

      .action-button {
        padding: ${tokens.spacing.sm};
        background: transparent;
        border: none;
        color: ${tokens.color.gray500};
        cursor: pointer;
        border-radius: ${tokens.radius.sm};
        transition: all ${tokens.transition.fast};
        display: flex;
        align-items: center;
        justify-content: center;
        width: 36px;
        height: 36px;
      }

      .action-button:hover {
        background: ${tokens.color.gray50};
        color: ${tokens.color.gray900};
      }

      .back-button {
        margin-right: ${tokens.spacing.xs};
      }
    `
  ];

  @property({ type: String })
  override title = 'Chat';

  @property({ type: String })
  subtitle = '';

  @property({ type: String })
  status: 'online' | 'offline' | 'typing' | '' = '';

  @property({ type: Boolean })
  showBack = false;

  @property({ type: Boolean })
  showSearch = true;

  @property({ type: Boolean })
  showMore = true;

  private handleBack() {
    this.dispatchEvent(new CustomEvent('back-click', { bubbles: true, composed: true }));
  }

  private handleSearch() {
    this.dispatchEvent(new CustomEvent('search-click', { bubbles: true, composed: true }));
  }

  private handleMore() {
    this.dispatchEvent(new CustomEvent('more-click', { bubbles: true, composed: true }));
  }

  override render() {
    return html`
      <div class="header-container">
        <div class="header-left">
          ${this.showBack ? html`
            <button class="action-button back-button" @click=${this.handleBack} aria-label="Go back">
              ←
            </button>
          ` : ''}

          <slot name="avatar"></slot>

          <div class="header-info">
            <h2 class="title">${this.title}</h2>
            ${this.subtitle || this.status ? html`
              <div class="subtitle">
                ${this.status ? html`
                  <span class="status-indicator">
                    <span class="status-dot ${this.status}"></span>
                    <span>${this.status === 'typing' ? 'Typing...' : this.status}</span>
                  </span>
                ` : this.subtitle}
              </div>
            ` : ''}
          </div>
        </div>

        <div class="header-actions">
          ${this.showSearch ? html`
            <button class="action-button" @click=${this.handleSearch} aria-label="Search" title="Search">
              🔍
            </button>
          ` : ''}
          ${this.showMore ? html`
            <button class="action-button" @click=${this.handleMore} aria-label="More options" title="More">
              ⋮
            </button>
          ` : ''}
          <slot name="actions"></slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'chat-header': ChatHeader;
  }
}
