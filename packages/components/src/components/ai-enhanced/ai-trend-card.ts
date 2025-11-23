import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

export interface TrendData {
  title: string;
  direction: 'up' | 'down' | 'stable';
  percentage: number;
  description: string;
  confidence: number;
  timeframe?: string;
}

@customElement('ai-trend-card')
export class AiTrendCard extends LitElement {
  static override styles = [
    baseStyles,
    css`
      :host {
        display: block;
        padding: ${tokens.spacing.lg};
        background: ${tokens.color.grayWhite};
        border-radius: ${tokens.radius.lg};
        border: 1px solid ${tokens.color.gray200};
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        transition: all ${tokens.transition.default};
      }

      :host(:hover) {
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      }

      .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: ${tokens.spacing.md};
      }

      .title {
        font-size: ${tokens.fontSize.md};
        font-weight: ${tokens.fontWeight.semibold};
        color: ${tokens.color.gray900};
      }

      .ai-badge {
        display: inline-flex;
        align-items: center;
        gap: ${tokens.spacing.xs};
        padding: ${tokens.spacing.xs} ${tokens.spacing.sm};
        background: ${tokens.color.primaryLight};
        color: ${tokens.color.primaryDark};
        border-radius: ${tokens.radius.full};
        font-size: ${tokens.fontSize.xs};
        font-weight: ${tokens.fontWeight.medium};
      }

      .trend-display {
        display: flex;
        align-items: center;
        gap: ${tokens.spacing.md};
        margin-bottom: ${tokens.spacing.md};
        padding: ${tokens.spacing.lg};
        background: ${tokens.color.gray50};
        border-radius: ${tokens.radius.md};
      }

      .trend-icon {
        font-size: ${tokens.fontSize.xxxl};
        line-height: 1;
      }

      .trend-up {
        color: ${tokens.color.successMain};
      }

      .trend-down {
        color: ${tokens.color.dangerMain};
      }

      .trend-stable {
        color: ${tokens.color.gray600};
      }

      .trend-info {
        flex: 1;
      }

      .trend-percentage {
        font-size: ${tokens.fontSize.xxl};
        font-weight: ${tokens.fontWeight.bold};
        line-height: 1.2;
      }

      .trend-timeframe {
        font-size: ${tokens.fontSize.sm};
        color: ${tokens.color.gray600};
        margin-top: ${tokens.spacing.xs};
      }

      .description {
        font-size: ${tokens.fontSize.md};
        color: ${tokens.color.gray700};
        line-height: 1.6;
        margin-bottom: ${tokens.spacing.md};
      }

      .confidence-section {
        padding-top: ${tokens.spacing.md};
        border-top: 1px solid ${tokens.color.gray200};
      }

      .confidence-label {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: ${tokens.fontSize.sm};
        color: ${tokens.color.gray600};
        margin-bottom: ${tokens.spacing.xs};
      }

      .confidence-value {
        font-weight: ${tokens.fontWeight.semibold};
        color: ${tokens.color.gray900};
      }

      .confidence-track {
        height: 8px;
        background: ${tokens.color.gray200};
        border-radius: ${tokens.radius.full};
        overflow: hidden;
      }

      .confidence-fill {
        height: 100%;
        background: linear-gradient(90deg, ${tokens.color.primaryMain} 0%, ${tokens.color.successMain} 100%);
        border-radius: ${tokens.radius.full};
        transition: width ${tokens.transition.default};
      }
    `,
  ];

  @property({ type: Object }) data: TrendData | null = null;

  private _getTrendIcon(direction: string): string {
    switch (direction) {
      case 'up':
        return '📈';
      case 'down':
        return '📉';
      case 'stable':
        return '➡️';
      default:
        return '📊';
    }
  }

  override render() {
    if (!this.data) {
      return html`<slot></slot>`;
    }

    return html`
      <div class="header">
        <div class="title">${this.data.title}</div>
        <div class="ai-badge">
          <span>✨</span>
          <span>AI</span>
        </div>
      </div>

      <div class="trend-display">
        <div class="trend-icon trend-${this.data.direction}">
          ${this._getTrendIcon(this.data.direction)}
        </div>
        <div class="trend-info">
          <div class="trend-percentage trend-${this.data.direction}">
            ${this.data.direction === 'up' ? '+' : this.data.direction === 'down' ? '-' : ''}${Math.abs(this.data.percentage).toFixed(1)}%
          </div>
          ${this.data.timeframe
            ? html`<div class="trend-timeframe">${this.data.timeframe}</div>`
            : ''}
        </div>
      </div>

      <div class="description">${this.data.description}</div>

      <div class="confidence-section">
        <div class="confidence-label">
          <span>AI Confidence</span>
          <span class="confidence-value">${Math.round(this.data.confidence * 100)}%</span>
        </div>
        <div class="confidence-track">
          <div class="confidence-fill" style="width: ${this.data.confidence * 100}%"></div>
        </div>
      </div>

      <slot></slot>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ai-trend-card': AiTrendCard;
  }
}
