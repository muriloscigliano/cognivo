import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';
import type { MessageData } from './chat-message.js';

@customElement('conversation-thread')
export class ConversationThread extends LitElement {
  static override styles = [
    baseStyles,
    css`
      :host {
        display: flex;
        flex-direction: column;
        font-family: ${tokens.fontFamily.primary};
        height: 100%;
      }

      .thread-container {
        display: flex;
        flex-direction: column;
        height: 100%;
        background: white;
      }

      .thread-header {
        padding: ${tokens.spacing.sm} ${tokens.spacing.md};
        background: ${tokens.color.gray50};
        border-bottom: 1px solid ${tokens.color.gray100};
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      .thread-title {
        font-size: ${tokens.fontSize.sm};
        font-weight: ${tokens.fontWeight.semibold};
        color: ${tokens.color.gray900};
      }

      .thread-count {
        font-size: ${tokens.fontSize.xs};
        color: ${tokens.color.gray500};
      }

      .close-button {
        padding: 4px;
        background: transparent;
        border: none;
        color: ${tokens.color.gray500};
        cursor: pointer;
        border-radius: ${tokens.radius.sm};
        transition: all ${tokens.transition.fast};
      }

      .close-button:hover {
        background: ${tokens.color.gray100};
        color: ${tokens.color.gray900};
      }

      .thread-messages {
        flex: 1;
        overflow-y: auto;
        padding: ${tokens.spacing.md};
      }

      .thread-reply {
        margin-top: auto;
        border-top: 1px solid ${tokens.color.gray100};
      }
    `
  ];

  @property({ type: Array })
  messages: MessageData[] = [];

  @property({ type: String })
  threadTitle = 'Thread';

  @property({ type: Boolean })
  showHeader = true;

  private handleClose() {
    this.dispatchEvent(new CustomEvent('thread-close', {
      bubbles: true,
      composed: true
    }));
  }

  override render() {
    return html`
      <div class="thread-container">
        ${this.showHeader ? html`
          <div class="thread-header">
            <div>
              <div class="thread-title">${this.threadTitle}</div>
              <div class="thread-count">${this.messages.length} messages</div>
            </div>
            <button class="close-button" @click=${this.handleClose} aria-label="Close thread">
              ✕
            </button>
          </div>
        ` : ''}

        <div class="thread-messages">
          <message-list .messages=${this.messages}></message-list>
        </div>

        <div class="thread-reply">
          <chat-input placeholder="Reply to thread..."></chat-input>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'conversation-thread': ConversationThread;
  }
}
