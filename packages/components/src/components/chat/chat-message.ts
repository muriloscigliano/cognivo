import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

export interface MessageData {
  id: string;
  content: string;
  sender: string;
  timestamp: string;
  variant: 'user' | 'agent' | 'system';
  avatar?: string;
  status?: 'sending' | 'sent' | 'delivered' | 'read';
}

@customElement('chat-message')
export class ChatMessage extends LitElement {
  static override styles = [
    baseStyles,
    css`
      :host {
        display: block;
        font-family: ${tokens.fontFamily.primary};
        margin-bottom: ${tokens.spacing.md};
      }

      .message-container {
        display: flex;
        gap: ${tokens.spacing.sm};
        align-items: flex-start;
      }

      /* User messages - right aligned */
      :host([variant='user']) .message-container {
        flex-direction: row-reverse;
      }

      .message-content {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 4px;
        max-width: 70%;
      }

      :host([variant='user']) .message-content {
        align-items: flex-end;
      }

      :host([variant='agent']) .message-content {
        align-items: flex-start;
      }

      :host([variant='system']) .message-content {
        align-items: center;
        max-width: 100%;
      }

      .message-header {
        display: flex;
        align-items: center;
        gap: ${tokens.spacing.xs};
        font-size: ${tokens.fontSize.xs};
        color: ${tokens.color.gray500};
        padding: 0 ${tokens.spacing.xs};
      }

      .sender-name {
        font-weight: ${tokens.fontWeight.semibold};
      }

      .timestamp {
        opacity: 0.7;
      }

      /* System messages */
      :host([variant='system']) {
        text-align: center;
        margin: ${tokens.spacing.md} 0;
      }

      :host([variant='system']) .message-container {
        justify-content: center;
      }

      /* Hide avatar for system messages */
      :host([variant='system']) message-avatar {
        display: none;
      }

      /* Compact mode */
      :host([compact]) {
        margin-bottom: ${tokens.spacing.xs};
      }

      :host([compact]) .message-header {
        display: none;
      }

      /* Animation */
      @keyframes messageSlideIn {
        from {
          opacity: 0;
          transform: translateY(10px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      :host([animate]) .message-container {
        animation: messageSlideIn 0.3s ease-out;
      }
    `
  ];

  @property({ type: String })
  content = '';

  @property({ type: String, reflect: true })
  variant: 'user' | 'agent' | 'system' = 'user';

  @property({ type: String })
  sender = '';

  @property({ type: String })
  timestamp = '';

  @property({ type: String })
  avatar = '';

  @property({ type: String })
  status: 'sending' | 'sent' | 'delivered' | 'read' | '' = '';

  @property({ type: Boolean, reflect: true })
  compact = false;

  @property({ type: Boolean, reflect: true })
  animate = false;

  @property({ type: Boolean })
  showAvatar = true;

  @property({ type: Boolean })
  showHeader = true;

  @property({ type: Boolean })
  showTail = true;

  override render() {
    return html`
      <div class="message-container">
        ${this.showAvatar && this.variant !== 'system' ? html`
          <message-avatar
            name="${this.sender}"
            src="${this.avatar}"
            variant="${this.variant}"
          ></message-avatar>
        ` : ''}

        <div class="message-content">
          ${this.showHeader && !this.compact && this.sender ? html`
            <div class="message-header">
              <span class="sender-name">${this.sender}</span>
              ${this.timestamp ? html`
                <span class="timestamp">${this.timestamp}</span>
              ` : ''}
            </div>
          ` : ''}

          <message-bubble
            variant="${this.variant}"
            content="${this.content}"
            timestamp="${this.compact ? this.timestamp : ''}"
            status="${this.status}"
            ?show-tail="${this.showTail}"
            ?animate="${this.animate}"
          >
            <slot></slot>
          </message-bubble>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'chat-message': ChatMessage;
  }
}
