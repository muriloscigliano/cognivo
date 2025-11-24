import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

export interface MetricData {
  label: string;
  value: number;
  unit?: string;
  prediction?: number;
  trend?: 'up' | 'down' | 'stable';
  change?: number;
  insight?: string;
  confidence?: number;
}

@customElement('ai-metric-card')
export class AiMetricCard extends LitElement {
  static override styles = [
    baseStyles,
    css`
      :host {
        display: block;
        padding: ${tokens.spacing.lg};
        background: ${tokens.color.grayWhite};
        border: 1px solid ${tokens.color.gray100};
        border-radius: ${tokens.radius.lg};
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

      .label {
        font-size: ${tokens.fontSize.sm};
        color: ${tokens.color.gray500};
        text-transform: uppercase;
        letter-spacing: 0.5px;
        font-weight: ${tokens.fontWeight.medium};
      }

      .ai-badge {
        display: inline-flex;
        align-items: center;
        gap: ${tokens.spacing.xs};
        padding: ${tokens.spacing.xs} ${tokens.spacing.sm};
        background: linear-gradient(135deg, ${tokens.color.primaryMain} 0%, ${tokens.color.primaryDark} 100%);
        color: white;
        border-radius: ${tokens.radius.full};
        font-size: ${tokens.fontSize.xs};
        font-weight: ${tokens.fontWeight.medium};
      }

      .value-section {
        margin-bottom: ${tokens.spacing.md};
      }

      .current-value {
        font-size: ${tokens.fontSize['3xl']};
        font-weight: ${tokens.fontWeight.bold};
        color: ${tokens.color.gray900};
        line-height: 1.2;
        display: flex;
        align-items: baseline;
        gap: ${tokens.spacing.xs};
      }

      .unit {
        font-size: ${tokens.fontSize.lg};
        color: ${tokens.color.gray500};
      }

      .change {
        display: flex;
        align-items: center;
        gap: ${tokens.spacing.xs};
        margin-top: ${tokens.spacing.sm};
        font-size: ${tokens.fontSize.sm};
        font-weight: ${tokens.fontWeight.semibold};
      }

      .change.up {
        color: ${tokens.color.success};
      }

      .change.down {
        color: ${tokens.color.danger};
      }

      .change.stable {
        color: ${tokens.color.gray500};
      }

      .prediction-section {
        padding: ${tokens.spacing.md};
        background: linear-gradient(135deg, ${tokens.color.primaryLight}15 0%, ${tokens.color.gray50} 100%);
        border-radius: ${tokens.radius.md};
        margin-bottom: ${tokens.spacing.md};
      }

      .prediction-label {
        font-size: ${tokens.fontSize.xs};
        color: ${tokens.color.gray500};
        text-transform: uppercase;
        margin-bottom: ${tokens.spacing.xs};
      }

      .prediction-value {
        font-size: ${tokens.fontSize.xl};
        font-weight: ${tokens.fontWeight.bold};
        color: ${tokens.color.primaryMain};
        display: flex;
        align-items: baseline;
        gap: ${tokens.spacing.xs};
      }

      .insight {
        padding: ${tokens.spacing.sm};
        background: ${tokens.color.gray50};
        border-radius: ${tokens.radius.md};
        border-left: 3px solid ${tokens.color.primaryMain};
        font-size: ${tokens.fontSize.sm};
        color: ${tokens.color.gray900};
        line-height: 1.5;
        margin-bottom: ${tokens.spacing.md};
      }

      .confidence-section {
        padding-top: ${tokens.spacing.md};
        border-top: 1px solid ${tokens.color.gray100};
      }

      .confidence-label {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: ${tokens.fontSize.xs};
        color: ${tokens.color.gray500};
        margin-bottom: ${tokens.spacing.xs};
      }

      .confidence-value {
        font-weight: ${tokens.fontWeight.semibold};
        color: ${tokens.color.gray900};
      }

      .confidence-track {
        height: 6px;
        background: ${tokens.color.gray100};
        border-radius: ${tokens.radius.full};
        overflow: hidden;
      }

      .confidence-fill {
        height: 100%;
        background: linear-gradient(90deg, ${tokens.color.primaryMain} 0%, ${tokens.color.success} 100%);
        border-radius: ${tokens.radius.full};
        transition: width ${tokens.transition.default};
      }

      .empty-state {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: ${tokens.spacing.xl};
        color: ${tokens.color.gray500};
        text-align: center;
      }

      .empty-icon {
        font-size: ${tokens.fontSize['3xl']};
        margin-bottom: ${tokens.spacing.sm};
      }
    `
  ];

  @property({ type: Object }) data: MetricData | null = null;

  private _getTrendIcon(trend: string): string {
    switch (trend) {
      case 'up':
        return '↑';
      case 'down':
        return '↓';
      case 'stable':
        return '→';
      default:
        return '•';
    }
  }

  override render() {
    if (!this.data) {
      return html`
        <div class="empty-state">
          <div class="empty-icon">📊</div>
          <div class="empty-text">No metric data available</div>
        </div>
        <slot></slot>
      `;
    }

    return html`
      <div class="header">
        <div class="label">${this.data.label}</div>
        <div class="ai-badge">
          <span>✨</span>
          <span>AI</span>
        </div>
      </div>

      <div class="value-section">
        <div class="current-value">
          <span>${this.data.value}</span>
          ${this.data.unit ? html`<span class="unit">${this.data.unit}</span>` : ''}
        </div>
        ${this.data.change !== undefined && this.data.trend ? html`
          <div class="change ${this.data.trend}">
            <span>${this._getTrendIcon(this.data.trend)}</span>
            <span>${this.data.change > 0 ? '+' : ''}${this.data.change.toFixed(1)}%</span>
          </div>
        ` : ''}
      </div>

      ${this.data.prediction !== undefined ? html`
        <div class="prediction-section">
          <div class="prediction-label">AI Prediction</div>
          <div class="prediction-value">
            <span>${this.data.prediction}</span>
            ${this.data.unit ? html`<span class="unit">${this.data.unit}</span>` : ''}
          </div>
        </div>
      ` : ''}

      ${this.data.insight ? html`
        <div class="insight">${this.data.insight}</div>
      ` : ''}

      ${this.data.confidence ? html`
        <div class="confidence-section">
          <div class="confidence-label">
            <span>Prediction Confidence</span>
            <span class="confidence-value">${Math.round(this.data.confidence * 100)}%</span>
          </div>
          <div class="confidence-track">
            <div class="confidence-fill" style="width: ${this.data.confidence * 100}%"></div>
          </div>
        </div>
      ` : ''}

      <slot></slot>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ai-metric-card': AiMetricCard;
  }
}
