import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

export interface AiForecastData {
  title: string;
  current: number;
  predicted: number;
  unit?: string;
  timeframe: string;
  confidence: number;
  trend?: 'up' | 'down' | 'stable';
  insights?: string[];
}

@customElement('ai-forecast-card')
export class AiForecastCard extends LitElement {
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

      .title {
        font-size: ${tokens.fontSize.lg};
        font-weight: ${tokens.fontWeight.semibold};
        color: ${tokens.color.gray900};
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

      .metrics-container {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: ${tokens.spacing.lg};
        margin-bottom: ${tokens.spacing.lg};
        padding: ${tokens.spacing.lg};
        background: ${tokens.color.gray50};
        border-radius: ${tokens.radius.md};
      }

      .metric {
        display: flex;
        flex-direction: column;
        gap: ${tokens.spacing.xs};
      }

      .metric-label {
        font-size: ${tokens.fontSize.xs};
        color: ${tokens.color.gray500};
        text-transform: uppercase;
        font-weight: ${tokens.fontWeight.medium};
      }

      .metric-value {
        font-size: ${tokens.fontSize['2xl']};
        font-weight: ${tokens.fontWeight.bold};
        color: ${tokens.color.gray900};
        display: flex;
        align-items: baseline;
        gap: ${tokens.spacing.xs};
      }

      .metric-value.predicted {
        color: ${tokens.color.primaryMain};
      }

      .unit {
        font-size: ${tokens.fontSize.md};
        color: ${tokens.color.gray500};
      }

      .timeframe {
        font-size: ${tokens.fontSize.sm};
        color: ${tokens.color.gray500};
        text-align: center;
        margin-bottom: ${tokens.spacing.md};
      }

      .insights-section {
        margin-bottom: ${tokens.spacing.md};
      }

      .section-title {
        font-size: ${tokens.fontSize.sm};
        font-weight: ${tokens.fontWeight.semibold};
        color: ${tokens.color.gray900};
        margin-bottom: ${tokens.spacing.sm};
      }

      .insights-list {
        display: flex;
        flex-direction: column;
        gap: ${tokens.spacing.xs};
      }

      .insight-item {
        display: flex;
        align-items: flex-start;
        gap: ${tokens.spacing.sm};
        padding: ${tokens.spacing.sm};
        background: ${tokens.color.gray50};
        border-radius: ${tokens.radius.md};
        font-size: ${tokens.fontSize.sm};
        color: ${tokens.color.gray900};
        line-height: 1.5;
      }

      .insight-icon {
        color: ${tokens.color.primaryMain};
      }

      .confidence-section {
        padding-top: ${tokens.spacing.md};
        border-top: 1px solid ${tokens.color.gray100};
      }

      .confidence-label {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: ${tokens.fontSize.sm};
        color: ${tokens.color.gray500};
        margin-bottom: ${tokens.spacing.xs};
      }

      .confidence-value {
        font-weight: ${tokens.fontWeight.semibold};
        color: ${tokens.color.gray900};
      }

      .confidence-track {
        height: 8px;
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

  @property({ type: Object }) data: AiForecastData | null = null;

  override render() {
    if (!this.data) {
      return html`
        <div class="empty-state">
          <div class="empty-icon">🔮</div>
          <div class="empty-text">No forecast data available</div>
        </div>
        <slot></slot>
      `;
    }

    return html`
      <div class="header">
        <div class="title">${this.data.title}</div>
        <div class="ai-badge">
          <span>✨</span>
          <span>AI Forecast</span>
        </div>
      </div>

      <div class="metrics-container">
        <div class="metric">
          <div class="metric-label">Current</div>
          <div class="metric-value">
            <span>${this.data.current}</span>
            ${this.data.unit ? html`<span class="unit">${this.data.unit}</span>` : ''}
          </div>
        </div>
        <div class="metric">
          <div class="metric-label">Predicted</div>
          <div class="metric-value predicted">
            <span>${this.data.predicted}</span>
            ${this.data.unit ? html`<span class="unit">${this.data.unit}</span>` : ''}
          </div>
        </div>
      </div>

      <div class="timeframe">📅 ${this.data.timeframe}</div>

      ${this.data.insights && this.data.insights.length > 0 ? html`
        <div class="insights-section">
          <div class="section-title">Forecast Insights</div>
          <div class="insights-list">
            ${this.data.insights.map(insight => html`
              <div class="insight-item">
                <span class="insight-icon">•</span>
                <span>${insight}</span>
              </div>
            `)}
          </div>
        </div>
      ` : ''}

      <div class="confidence-section">
        <div class="confidence-label">
          <span>Prediction Confidence</span>
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
    'ai-forecast-card': AiForecastCard;
  }
}
