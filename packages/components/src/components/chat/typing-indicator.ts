import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

@customElement('typing-indicator')
export class TypingIndicator extends LitElement {
  static override styles = [
    baseStyles,
    css`
      :host {
        display: inline-flex;
        align-items: center;
        font-family: ${tokens.fontFamily.primary};
      }

      .typing-container {
        display: flex;
        align-items: center;
        gap: ${tokens.spacing.sm};
        padding: ${tokens.spacing.sm} ${tokens.spacing.md};
        background: ${tokens.color.gray50};
        border-radius: ${tokens.radius.md};
      }

      .typing-text {
        font-size: ${tokens.fontSize.sm};
        color: ${tokens.color.gray500};
        font-style: italic;
      }

      .dots {
        display: flex;
        align-items: center;
        gap: 6px;
      }

      .dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: ${tokens.color.aiAccent};
        animation: bounce 1.4s ease-in-out infinite;
      }

      .dot:nth-child(1) {
        animation-delay: 0s;
      }

      .dot:nth-child(2) {
        animation-delay: 0.2s;
      }

      .dot:nth-child(3) {
        animation-delay: 0.4s;
      }

      @keyframes bounce {
        0%, 60%, 100% {
          transform: translateY(0);
          opacity: 0.7;
        }
        30% {
          transform: translateY(-10px);
          opacity: 1;
        }
      }

      /* Pulse variant */
      :host([variant='pulse']) .dot {
        animation: pulse 1.4s ease-in-out infinite;
      }

      @keyframes pulse {
        0%, 60%, 100% {
          transform: scale(0.8);
          opacity: 0.5;
        }
        30% {
          transform: scale(1.2);
          opacity: 1;
        }
      }

      /* Fade variant */
      :host([variant='fade']) .dot {
        animation: fade 1.4s ease-in-out infinite;
      }

      @keyframes fade {
        0%, 60%, 100% {
          opacity: 0.3;
        }
        30% {
          opacity: 1;
        }
      }

      /* Wave variant */
      :host([variant='wave']) .dot {
        animation: wave 1.4s ease-in-out infinite;
      }

      @keyframes wave {
        0%, 60%, 100% {
          transform: translateY(0) scale(1);
        }
        30% {
          transform: translateY(-8px) scale(1.1);
        }
      }

      /* Size variants */
      :host([size='small']) .typing-container {
        padding: 6px ${tokens.spacing.sm};
      }

      :host([size='small']) .dot {
        width: 6px;
        height: 6px;
      }

      :host([size='large']) .typing-container {
        padding: ${tokens.spacing.md} ${tokens.spacing.lg};
      }

      :host([size='large']) .dot {
        width: 10px;
        height: 10px;
      }

      /* Avatar variant */
      :host([show-avatar]) .typing-container {
        gap: ${tokens.spacing.md};
      }

      .avatar {
        width: 24px;
        height: 24px;
        border-radius: 50%;
        background: ${tokens.color.aiAccent};
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: ${tokens.fontSize.xs};
        font-weight: ${tokens.fontWeight.bold};
        flex-shrink: 0;
      }

      /* Minimal variant */
      :host([minimal]) .typing-container {
        background: transparent;
        padding: 0;
      }

      :host([minimal]) .typing-text {
        display: none;
      }

      /* Color variants */
      :host([color='secondary']) .dot {
        background: ${tokens.color.secondaryMain};
      }

      :host([color='success']) .dot {
        background: ${tokens.color.success};
      }

      :host([color='gray']) .dot {
        background: ${tokens.color.gray500};
      }

      /* Slide in animation */
      @keyframes slideIn {
        from {
          opacity: 0;
          transform: translateX(-10px);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }

      .typing-container {
        animation: slideIn 0.3s ease-out;
      }
    `
  ];

  @property({ type: String })
  text = 'Typing';

  @property({ type: String, reflect: true })
  variant: 'bounce' | 'pulse' | 'fade' | 'wave' = 'bounce';

  @property({ type: String, reflect: true })
  size: 'small' | 'medium' | 'large' = 'medium';

  @property({ type: String, reflect: true })
  color: 'primary' | 'secondary' | 'success' | 'gray' = 'primary';

  @property({ type: Boolean, reflect: true, attribute: 'show-avatar' })
  showAvatar = false;

  @property({ type: String })
  avatarText = 'AI';

  @property({ type: Boolean, reflect: true })
  minimal = false;

  @property({ type: Boolean })
  showText = true;

  override render() {
    return html`
      <div class="typing-container">
        ${this.showAvatar ? html`
          <div class="avatar">${this.avatarText}</div>
        ` : ''}
        ${this.showText && !this.minimal ? html`
          <span class="typing-text">${this.text}</span>
        ` : ''}
        <div class="dots">
          <div class="dot"></div>
          <div class="dot"></div>
          <div class="dot"></div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'typing-indicator': TypingIndicator;
  }
}
