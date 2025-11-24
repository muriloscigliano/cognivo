import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

@customElement('ai-region')
export class AiRegion extends LitElement {
  static override styles = [
    baseStyles,
    css`
      :host {
        display: block;
        position: relative;
        padding: ${tokens.spacing.lg};
        background: linear-gradient(135deg, ${tokens.color.primaryLight}10 0%, ${tokens.color.grayWhite} 100%);
        border: 2px solid ${tokens.color.primaryMain};
        border-radius: ${tokens.radius.lg};
        overflow: hidden;
      }

      :host::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 4px;
        background: linear-gradient(90deg, ${tokens.color.primaryMain} 0%, ${tokens.color.primaryDark} 100%);
      }

      .ai-label {
        position: absolute;
        top: ${tokens.spacing.md};
        right: ${tokens.spacing.md};
        display: inline-flex;
        align-items: center;
        gap: ${tokens.spacing.xs};
        padding: ${tokens.spacing.xs} ${tokens.spacing.sm};
        background: linear-gradient(135deg, ${tokens.color.primaryMain} 0%, ${tokens.color.primaryDark} 100%);
        color: white;
        border-radius: ${tokens.radius.full};
        font-size: ${tokens.fontSize.xs};
        font-weight: ${tokens.fontWeight.medium};
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        z-index: 1;
      }

      .label-icon {
        font-size: ${tokens.fontSize.sm};
        animation: pulse 2s ease-in-out infinite;
      }

      @keyframes pulse {
        0%, 100% {
          opacity: 1;
        }
        50% {
          opacity: 0.6;
        }
      }

      .content-wrapper {
        position: relative;
        z-index: 0;
      }

      :host([highlight]) {
        animation: highlightPulse 2s ease-in-out;
      }

      @keyframes highlightPulse {
        0%, 100% {
          box-shadow: 0 0 0 0 ${tokens.color.primaryMain}40;
        }
        50% {
          box-shadow: 0 0 0 8px ${tokens.color.primaryMain}00;
        }
      }

      :host([variant='info']) {
        background: linear-gradient(135deg, ${tokens.color.primaryLight}10 0%, ${tokens.color.grayWhite} 100%);
        border-color: ${tokens.color.primaryMain};
      }

      :host([variant='warning']) {
        background: linear-gradient(135deg, ${tokens.color.warning}10 0%, ${tokens.color.grayWhite} 100%);
        border-color: ${tokens.color.warning};
      }

      :host([variant='warning'])::before {
        background: linear-gradient(90deg, ${tokens.color.warning} 0%, ${tokens.color.warning} 100%);
      }

      :host([variant='warning']) .ai-label {
        background: linear-gradient(135deg, ${tokens.color.warning} 0%, ${tokens.color.warning} 100%);
      }

      :host([variant='success']) {
        background: linear-gradient(135deg, ${tokens.color.success}10 0%, ${tokens.color.grayWhite} 100%);
        border-color: ${tokens.color.success};
      }

      :host([variant='success'])::before {
        background: linear-gradient(90deg, ${tokens.color.success} 0%, ${tokens.color.successDark} 100%);
      }

      :host([variant='success']) .ai-label {
        background: linear-gradient(135deg, ${tokens.color.success} 0%, ${tokens.color.successDark} 100%);
      }
    `
  ];

  @property({ type: String, reflect: true }) variant: 'info' | 'warning' | 'success' = 'info';
  @property({ type: String }) label = 'AI Enhanced';
  @property({ type: Boolean, reflect: true }) highlight = false;

  override render() {
    return html`
      <div class="ai-label">
        <span class="label-icon">✨</span>
        <span>${this.label}</span>
      </div>

      <div class="content-wrapper">
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ai-region': AiRegion;
  }
}
