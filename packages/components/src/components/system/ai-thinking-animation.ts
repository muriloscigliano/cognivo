import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

@customElement('ai-thinking-animation')
export class AiThinkingAnimation extends LitElement {
  static override styles = [
    baseStyles,
    css`
      :host {
        display: inline-flex;
        align-items: center;
        gap: ${tokens.spacing.sm};
      }

      .thinking-container {
        display: flex;
        align-items: center;
        gap: 6px;
      }

      .dots {
        display: flex;
        align-items: center;
        gap: 4px;
      }

      .dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: ${tokens.color.aiAccent};
        animation: thinking-pulse 1.4s ease-in-out infinite;
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

      @keyframes thinking-pulse {
        0%, 80%, 100% {
          opacity: 0.3;
          transform: scale(0.8);
        }
        40% {
          opacity: 1;
          transform: scale(1.2);
        }
      }

      .label {
        font-size: ${tokens.fontSize.sm};
        color: ${tokens.color.gray500};
        font-weight: ${tokens.fontWeight.medium};
      }

      .brain-icon {
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        animation: brain-glow 2s ease-in-out infinite;
      }

      @keyframes brain-glow {
        0%, 100% {
          opacity: 0.6;
          filter: brightness(1);
        }
        50% {
          opacity: 1;
          filter: brightness(1.3) drop-shadow(0 0 4px ${tokens.color.aiGlow});
        }
      }

      :host([variant='minimal']) .label {
        display: none;
      }

      :host([variant='minimal']) .brain-icon {
        display: none;
      }

      :host([variant='full']) .thinking-container {
        padding: ${tokens.spacing.sm} ${tokens.spacing.md};
        background: ${tokens.color.aiBackground};
        border-radius: ${tokens.radius.md};
        border: 1px solid ${tokens.color.aiBorder};
      }

      .pulse-ring {
        width: 24px;
        height: 24px;
        border-radius: 50%;
        border: 2px solid ${tokens.color.aiAccent};
        position: relative;
        animation: pulse-ring 1.5s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;
      }

      @keyframes pulse-ring {
        0% {
          transform: scale(0.8);
          opacity: 1;
        }
        50% {
          transform: scale(1.2);
          opacity: 0.5;
        }
        100% {
          transform: scale(0.8);
          opacity: 1;
        }
      }

      :host([type='pulse']) .dots {
        display: none;
      }

      :host([type='pulse']) .brain-icon {
        display: none;
      }

      :host([type='dots']) .pulse-ring {
        display: none;
      }

      :host([type='brain']) .dots {
        display: none;
      }

      :host([type='brain']) .pulse-ring {
        display: none;
      }
    `
  ];

  @property({ type: String })
  label = 'AI is thinking';

  @property({ type: String, reflect: true })
  variant: 'minimal' | 'default' | 'full' = 'default';

  @property({ type: String, reflect: true })
  type: 'dots' | 'pulse' | 'brain' = 'dots';

  override render() {
    return html`
      <div class="thinking-container">
        ${this.type === 'brain' ? html`
          <div class="brain-icon">🧠</div>
        ` : ''}
        ${this.type === 'pulse' ? html`
          <div class="pulse-ring"></div>
        ` : ''}
        ${this.type === 'dots' ? html`
          <div class="dots">
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
          </div>
        ` : ''}
        <span class="label">${this.label}</span>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ai-thinking-animation': AiThinkingAnimation;
  }
}
