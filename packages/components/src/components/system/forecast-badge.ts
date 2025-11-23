import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

export interface ForecastData {
  trend: 'up' | 'down' | 'stable';
  value: number;
  unit?: string;
  confidence?: number;
}

@customElement('forecast-badge')
export class ForecastBadge extends LitElement {
  static override styles = [
    baseStyles,
    css`
      :host {
        display: inline-flex;
        align-items: center;
        gap: ${tokens.spacing.xs};
        padding: 4px 10px;
        border-radius: ${tokens.radius.full};
        font-size: ${tokens.fontSize.xs};
        font-weight: ${tokens.fontWeight.medium};
        background: ${tokens.color.gray100};
        border: 1px solid ${tokens.color.gray100};
        transition: all ${tokens.transition.default};
      }

      :host([trend='up']) {
        background: rgba(34, 197, 94, 0.1);
        border-color: ${tokens.color.success};
        color: ${tokens.color.success};
      }

      :host([trend='down']) {
        background: rgba(239, 68, 68, 0.1);
        border-color: ${tokens.color.danger};
        color: ${tokens.color.danger};
      }

      :host([trend='stable']) {
        background: rgba(100, 116, 139, 0.1);
        border-color: ${tokens.color.gray500};
        color: ${tokens.color.gray500};
      }

      :host(:hover) {
        transform: translateY(-1px);
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
      }

      .badge-content {
        display: flex;
        align-items: center;
        gap: 6px;
      }

      .trend-icon {
        font-size: 14px;
        display: flex;
        align-items: center;
        animation: pulse-trend 2s ease-in-out infinite;
      }

      @keyframes pulse-trend {
        0%, 100% {
          opacity: 1;
        }
        50% {
          opacity: 0.6;
        }
      }

      .value {
        font-weight: ${tokens.fontWeight.bold};
        display: flex;
        align-items: baseline;
        gap: 2px;
      }

      .unit {
        font-size: 10px;
        opacity: 0.8;
      }

      .ai-indicator {
        width: 12px;
        height: 12px;
        background: ${tokens.color.aiAccent};
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 8px;
        color: white;
        animation: ai-glow 2s ease-in-out infinite;
      }

      @keyframes ai-glow {
        0%, 100% {
          box-shadow: 0 0 0 rgba(0, 100, 255, 0);
        }
        50% {
          box-shadow: 0 0 8px ${tokens.color.aiGlow};
        }
      }

      .confidence-bar {
        width: 30px;
        height: 3px;
        background: rgba(0, 0, 0, 0.1);
        border-radius: 2px;
        overflow: hidden;
        margin-left: 4px;
      }

      .confidence-fill {
        height: 100%;
        background: currentColor;
        transition: width ${tokens.transition.default};
      }

      :host([size='small']) {
        padding: 2px 6px;
        font-size: 10px;
      }

      :host([size='small']) .trend-icon {
        font-size: 12px;
      }

      :host([size='large']) {
        padding: 6px 14px;
        font-size: ${tokens.fontSize.sm};
      }

      :host([size='large']) .trend-icon {
        font-size: 18px;
      }
    `
  ];

  @property({ type: String, reflect: true })
  trend: 'up' | 'down' | 'stable' = 'stable';

  @property({ type: Number })
  value = 0;

  @property({ type: String })
  unit = '';

  @property({ type: Number })
  confidence = 0;

  @property({ type: String, reflect: true })
  size: 'small' | 'medium' | 'large' = 'medium';

  @property({ type: Boolean })
  showAi = true;

  private getTrendIcon(): string {
    switch (this.trend) {
      case 'up':
        return '↗';
      case 'down':
        return '↘';
      case 'stable':
        return '→';
      default:
        return '→';
    }
  }

  private formatValue(): string {
    if (Math.abs(this.value) >= 1000000) {
      return (this.value / 1000000).toFixed(1) + 'M';
    }
    if (Math.abs(this.value) >= 1000) {
      return (this.value / 1000).toFixed(1) + 'K';
    }
    return this.value.toFixed(this.value % 1 === 0 ? 0 : 1);
  }

  override render() {
    const formattedValue = this.formatValue();
    const confidencePercent = Math.round(this.confidence * 100);

    return html`
      <div class="badge-content">
        ${this.showAi ? html`
          <div class="ai-indicator" title="AI Forecast">✨</div>
        ` : ''}
        <span class="trend-icon">${this.getTrendIcon()}</span>
        <span class="value">
          <span>${formattedValue}</span>
          ${this.unit ? html`<span class="unit">${this.unit}</span>` : ''}
        </span>
        ${this.confidence > 0 ? html`
          <div class="confidence-bar" title="Confidence: ${confidencePercent}%">
            <div class="confidence-fill" style="width: ${confidencePercent}%"></div>
          </div>
        ` : ''}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'forecast-badge': ForecastBadge;
  }
}
