import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

@customElement('message-bubble')
export class MessageBubble extends LitElement {
  static override styles = [
    baseStyles,
    css`
      :host {
        display: block;
        font-family: ${tokens.fontFamily.primary};
        max-width: 100%;
      }

      .bubble {
        position: relative;
        padding: ${tokens.spacing.sm} ${tokens.spacing.md};
        border-radius: ${tokens.radius.md};
        background: white;
        border: 1px solid ${tokens.color.gray100};
        word-wrap: break-word;
        overflow-wrap: break-word;
      }

      .bubble-content {
        font-size: ${tokens.fontSize.base};
        line-height: ${tokens.lineHeight.normal};
        color: ${tokens.color.gray900};
        white-space: pre-wrap;
      }

      /* User variant - right-aligned, primary color */
      :host([variant='user']) .bubble {
        background: ${tokens.color.aiAccent};
        color: white;
        border-color: transparent;
        border-bottom-right-radius: 4px;
      }

      :host([variant='user']) .bubble-content {
        color: white;
      }

      /* Agent variant - left-aligned, gray background */
      :host([variant='agent']) .bubble {
        background: ${tokens.color.gray50};
        border-color: ${tokens.color.gray100};
        border-bottom-left-radius: 4px;
      }

      /* System variant */
      :host([variant='system']) .bubble {
        background: ${tokens.color.gray50};
        border-color: ${tokens.color.gray100};
        text-align: center;
        font-size: ${tokens.fontSize.sm};
        color: ${tokens.color.gray500};
        border-radius: ${tokens.radius.md};
      }

      /* Tail styles */
      :host([show-tail]) .bubble::before {
        content: '';
        position: absolute;
        width: 0;
        height: 0;
        border-style: solid;
      }

      /* User tail - bottom right */
      :host([variant='user'][show-tail]) .bubble::before {
        bottom: 0;
        right: -6px;
        border-width: 0 0 10px 10px;
        border-color: transparent transparent transparent ${tokens.color.aiAccent};
      }

      /* Agent tail - bottom left */
      :host([variant='agent'][show-tail]) .bubble::before {
        bottom: 0;
        left: -6px;
        border-width: 0 10px 10px 0;
        border-color: transparent ${tokens.color.gray50} transparent transparent;
      }

      /* Size variants */
      :host([size='small']) .bubble {
        padding: 6px ${tokens.spacing.sm};
        font-size: ${tokens.fontSize.sm};
      }

      :host([size='large']) .bubble {
        padding: ${tokens.spacing.md} ${tokens.spacing.lg};
        font-size: ${tokens.fontSize.md};
      }

      /* Status styles */
      .bubble-footer {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: ${tokens.spacing.xs};
        margin-top: 4px;
        font-size: ${tokens.fontSize.xs};
        color: ${tokens.color.gray500};
      }

      :host([variant='user']) .bubble-footer {
        color: rgba(255, 255, 255, 0.8);
      }

      .timestamp {
        opacity: 0.7;
      }

      .status-icon {
        display: flex;
        align-items: center;
      }

      /* Read receipts */
      .read-receipt {
        width: 14px;
        height: 14px;
        border-radius: 50%;
        background: ${tokens.color.success};
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 10px;
      }

      /* Error state */
      :host([error]) .bubble {
        border-color: ${tokens.color.danger};
        background: rgba(239, 68, 68, 0.1);
      }

      /* Loading state */
      :host([loading]) .bubble {
        opacity: 0.6;
      }

      /* Slide in animations */
      @keyframes slideInLeft {
        from {
          opacity: 0;
          transform: translateX(-20px);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }

      @keyframes slideInRight {
        from {
          opacity: 0;
          transform: translateX(20px);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }

      :host([variant='agent'][animated]) .bubble {
        animation: slideInLeft 0.3s ease-out;
      }

      :host([variant='user'][animated]) .bubble {
        animation: slideInRight 0.3s ease-out;
      }
    `
  ];

  @property({ type: String })
  content = '';

  @property({ type: String, reflect: true })
  variant: 'user' | 'agent' | 'system' = 'user';

  @property({ type: String, reflect: true })
  size: 'small' | 'medium' | 'large' = 'medium';

  @property({ type: Boolean, reflect: true, attribute: 'show-tail' })
  showTail = true;

  @property({ type: Boolean, reflect: true })
  animated = false;

  @property({ type: Boolean, reflect: true })
  error = false;

  @property({ type: Boolean, reflect: true })
  loading = false;

  @property({ type: String })
  timestamp = '';

  @property({ type: String })
  status: 'sending' | 'sent' | 'delivered' | 'read' | '' = '';

  @property({ type: Boolean })
  showFooter = false;

  private renderStatus() {
    switch (this.status) {
      case 'sending':
        return html`<span class="status-icon">⏱</span>`;
      case 'sent':
        return html`<span class="status-icon">✓</span>`;
      case 'delivered':
        return html`<span class="status-icon">✓✓</span>`;
      case 'read':
        return html`<span class="read-receipt">✓</span>`;
      default:
        return '';
    }
  }

  override render() {
    return html`
      <div class="bubble">
        <div class="bubble-content">
          ${this.content || html`<slot></slot>`}
        </div>
        ${this.showFooter || this.timestamp || this.status ? html`
          <div class="bubble-footer">
            ${this.timestamp ? html`<span class="timestamp">${this.timestamp}</span>` : ''}
            ${this.status ? this.renderStatus() : ''}
          </div>
        ` : ''}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'message-bubble': MessageBubble;
  }
}
