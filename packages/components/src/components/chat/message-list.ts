import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';
import type { MessageData } from './chat-message.js';

@customElement('message-list')
export class MessageList extends LitElement {
  static override styles = [
    baseStyles,
    css`
      :host {
        display: block;
        font-family: ${tokens.fontFamily.primary};
        height: 100%;
      }

      .message-list-container {
        height: 100%;
        overflow-y: auto;
        overflow-x: hidden;
        padding: ${tokens.spacing.md};
        scroll-behavior: smooth;
      }

      /* Custom scrollbar */
      .message-list-container::-webkit-scrollbar {
        width: 8px;
      }

      .message-list-container::-webkit-scrollbar-track {
        background: ${tokens.color.gray50};
        border-radius: 4px;
      }

      .message-list-container::-webkit-scrollbar-thumb {
        background: ${tokens.color.gray500};
        border-radius: 4px;
      }

      .message-list-container::-webkit-scrollbar-thumb:hover {
        background: ${tokens.color.gray900};
      }

      .messages {
        display: flex;
        flex-direction: column;
        gap: ${tokens.spacing.sm};
      }

      .date-separator {
        text-align: center;
        margin: ${tokens.spacing.md} 0;
        position: relative;
      }

      .date-separator::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 0;
        right: 0;
        height: 1px;
        background: ${tokens.color.gray100};
        z-index: 0;
      }

      .date-label {
        position: relative;
        display: inline-block;
        padding: 4px ${tokens.spacing.sm};
        background: white;
        border: 1px solid ${tokens.color.gray100};
        border-radius: ${tokens.radius.full};
        font-size: ${tokens.fontSize.xs};
        color: ${tokens.color.gray500};
        font-weight: ${tokens.fontWeight.medium};
        z-index: 1;
      }

      .loading-indicator {
        display: flex;
        justify-content: center;
        padding: ${tokens.spacing.md};
      }

      .empty-state {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100%;
        color: ${tokens.color.gray500};
        text-align: center;
        padding: ${tokens.spacing.xl};
      }

      .empty-icon {
        font-size: 48px;
        margin-bottom: ${tokens.spacing.md};
        opacity: 0.5;
      }

      .empty-message {
        font-size: ${tokens.fontSize.base};
        margin-bottom: ${tokens.spacing.xs};
      }

      .empty-hint {
        font-size: ${tokens.fontSize.sm};
        opacity: 0.7;
      }

      /* Scroll to bottom button */
      .scroll-button {
        position: absolute;
        bottom: ${tokens.spacing.md};
        right: ${tokens.spacing.md};
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: ${tokens.color.aiAccent};
        color: white;
        border: none;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
        transition: all ${tokens.transition.fast};
        opacity: 0;
        pointer-events: none;
      }

      .scroll-button.visible {
        opacity: 1;
        pointer-events: all;
      }

      .scroll-button:hover {
        background: ${tokens.color.primaryDark};
        transform: scale(1.1);
      }

      :host([auto-scroll]) .message-list-container {
        scroll-behavior: smooth;
      }
    `
  ];

  @property({ type: Array })
  messages: MessageData[] = [];

  @property({ type: Boolean, reflect: true, attribute: 'auto-scroll' })
  autoScroll = true;

  @property({ type: Boolean })
  showDateSeparators = true;

  @property({ type: Boolean })
  loading = false;

  @property({ type: String })
  emptyMessage = 'No messages yet';

  @property({ type: String })
  emptyHint = 'Start a conversation';

  @state()
  private showScrollButton = false;

  private containerRef?: HTMLDivElement;

  private handleScroll = () => {
    if (!this.containerRef) return;

    const { scrollTop, scrollHeight, clientHeight } = this.containerRef;
    const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;

    this.showScrollButton = !isNearBottom && scrollHeight > clientHeight;
  };

  private scrollToBottom(smooth = true) {
    if (!this.containerRef) return;

    this.containerRef.scrollTo({
      top: this.containerRef.scrollHeight,
      behavior: smooth ? 'smooth' : 'auto'
    });
  }

  override updated(changedProperties: Map<string, any>) {
    if (changedProperties.has('messages') && this.autoScroll) {
      setTimeout(() => this.scrollToBottom(), 100);
    }
  }

  override firstUpdated() {
    this.containerRef = this.shadowRoot?.querySelector('.message-list-container') as HTMLDivElement;
    if (this.containerRef) {
      this.containerRef.addEventListener('scroll', this.handleScroll);
    }
    if (this.autoScroll) {
      setTimeout(() => this.scrollToBottom(false), 0);
    }
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    if (this.containerRef) {
      this.containerRef.removeEventListener('scroll', this.handleScroll);
    }
  }

  private groupMessagesByDate(): Map<string, MessageData[]> {
    const groups = new Map<string, MessageData[]>();

    this.messages.forEach(message => {
      const date = new Date(message.timestamp).toLocaleDateString();
      if (!groups.has(date)) {
        groups.set(date, []);
      }
      groups.get(date)!.push(message);
    });

    return groups;
  }

  override render() {
    if (this.messages.length === 0 && !this.loading) {
      return html`
        <div class="message-list-container">
          <div class="empty-state">
            <div class="empty-icon">💬</div>
            <div class="empty-message">${this.emptyMessage}</div>
            <div class="empty-hint">${this.emptyHint}</div>
          </div>
        </div>
      `;
    }

    const messageGroups = this.showDateSeparators ? this.groupMessagesByDate() : null;

    return html`
      <div class="message-list-container">
        <div class="messages">
          ${messageGroups ?
            Array.from(messageGroups.entries()).map(([date, messages]) => html`
              <div class="date-separator">
                <span class="date-label">${date}</span>
              </div>
              ${messages.map(msg => this.renderMessage(msg))}
            `) :
            this.messages.map(msg => this.renderMessage(msg))
          }

          ${this.loading ? html`
            <div class="loading-indicator">
              <typing-indicator></typing-indicator>
            </div>
          ` : ''}
        </div>

        <button
          class="scroll-button ${this.showScrollButton ? 'visible' : ''}"
          @click=${() => this.scrollToBottom()}
          aria-label="Scroll to bottom"
        >
          ↓
        </button>
      </div>
    `;
  }

  private renderMessage(message: MessageData) {
    return html`
      <chat-message
        content="${message.content}"
        variant="${message.variant}"
        sender="${message.sender}"
        timestamp="${new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}"
        avatar="${message.avatar || ''}"
        status="${message.status || ''}"
        animate
      ></chat-message>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'message-list': MessageList;
  }
}
