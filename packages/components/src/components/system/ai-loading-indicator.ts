import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

@customElement('ai-loading-indicator')
export class AiLoadingIndicator extends LitElement {
  static override styles = [
    baseStyles,
    css`
      :host {
        display: inline-flex;
        align-items: center;
        justify-content: center;
      }

      .loader-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: ${tokens.spacing.sm};
      }

      .spinner {
        width: 40px;
        height: 40px;
        border: 3px solid ${tokens.color.gray100};
        border-top-color: ${tokens.color.aiAccent};
        border-radius: 50%;
        animation: spin 0.8s linear infinite;
      }

      @keyframes spin {
        to {
          transform: rotate(360deg);
        }
      }

      :host([size='small']) .spinner {
        width: 24px;
        height: 24px;
        border-width: 2px;
      }

      :host([size='large']) .spinner {
        width: 56px;
        height: 56px;
        border-width: 4px;
      }

      .dual-ring {
        width: 40px;
        height: 40px;
        position: relative;
      }

      .dual-ring::after {
        content: '';
        display: block;
        width: 32px;
        height: 32px;
        margin: 4px;
        border-radius: 50%;
        border: 3px solid ${tokens.color.aiAccent};
        border-color: ${tokens.color.aiAccent} transparent ${tokens.color.aiAccent} transparent;
        animation: dual-ring 1.2s linear infinite;
      }

      @keyframes dual-ring {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }

      .pulse-loader {
        display: flex;
        gap: 8px;
      }

      .pulse-dot {
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background: ${tokens.color.aiAccent};
        animation: pulse 1.4s ease-in-out infinite;
      }

      .pulse-dot:nth-child(1) {
        animation-delay: 0s;
      }

      .pulse-dot:nth-child(2) {
        animation-delay: 0.2s;
      }

      .pulse-dot:nth-child(3) {
        animation-delay: 0.4s;
      }

      @keyframes pulse {
        0%, 80%, 100% {
          transform: scale(0);
          opacity: 0.5;
        }
        40% {
          transform: scale(1);
          opacity: 1;
        }
      }

      .bars-loader {
        display: flex;
        gap: 4px;
        align-items: center;
        height: 24px;
      }

      .bar {
        width: 4px;
        height: 100%;
        background: ${tokens.color.aiAccent};
        border-radius: 2px;
        animation: bars 1s ease-in-out infinite;
      }

      .bar:nth-child(1) {
        animation-delay: 0s;
      }

      .bar:nth-child(2) {
        animation-delay: 0.1s;
      }

      .bar:nth-child(3) {
        animation-delay: 0.2s;
      }

      .bar:nth-child(4) {
        animation-delay: 0.3s;
      }

      @keyframes bars {
        0%, 100% {
          height: 40%;
        }
        50% {
          height: 100%;
        }
      }

      .progress-ring {
        width: 40px;
        height: 40px;
      }

      .progress-ring-circle {
        stroke: ${tokens.color.aiAccent};
        stroke-linecap: round;
        animation: progress 1.5s ease-in-out infinite;
        transform-origin: 50% 50%;
      }

      @keyframes progress {
        0% {
          stroke-dasharray: 1, 150;
          stroke-dashoffset: 0;
        }
        50% {
          stroke-dasharray: 90, 150;
          stroke-dashoffset: -35;
        }
        100% {
          stroke-dasharray: 90, 150;
          stroke-dashoffset: -124;
        }
      }

      .label {
        font-size: ${tokens.fontSize.sm};
        color: ${tokens.color.gray500};
        font-weight: ${tokens.fontWeight.medium};
        text-align: center;
      }

      :host([variant='inline']) .loader-container {
        flex-direction: row;
      }

      .glow-effect {
        filter: drop-shadow(0 0 8px ${tokens.color.aiGlow});
      }
    `
  ];

  @property({ type: String, reflect: true })
  size: 'small' | 'medium' | 'large' = 'medium';

  @property({ type: String, reflect: true })
  type: 'spinner' | 'dual-ring' | 'pulse' | 'bars' | 'progress' = 'spinner';

  @property({ type: String, reflect: true })
  variant: 'default' | 'inline' = 'default';

  @property({ type: String })
  label = '';

  @property({ type: Boolean })
  glow = false;

  private renderLoader() {
    const glowClass = this.glow ? 'glow-effect' : '';

    switch (this.type) {
      case 'dual-ring':
        return html`<div class="dual-ring ${glowClass}"></div>`;
      case 'pulse':
        return html`
          <div class="pulse-loader ${glowClass}">
            <div class="pulse-dot"></div>
            <div class="pulse-dot"></div>
            <div class="pulse-dot"></div>
          </div>
        `;
      case 'bars':
        return html`
          <div class="bars-loader ${glowClass}">
            <div class="bar"></div>
            <div class="bar"></div>
            <div class="bar"></div>
            <div class="bar"></div>
          </div>
        `;
      case 'progress':
        return html`
          <svg class="progress-ring ${glowClass}" viewBox="0 0 50 50">
            <circle
              class="progress-ring-circle"
              stroke-width="4"
              fill="transparent"
              r="20"
              cx="25"
              cy="25"
            />
          </svg>
        `;
      default:
        return html`<div class="spinner ${glowClass}"></div>`;
    }
  }

  override render() {
    return html`
      <div class="loader-container">
        ${this.renderLoader()}
        ${this.label ? html`<div class="label">${this.label}</div>` : ''}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ai-loading-indicator': AiLoadingIndicator;
  }
}
