import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

export interface ChartSummary {
  title?: string;
  keyPoints: string[];
  trend?: 'up' | 'down' | 'stable';
  trendPercentage?: number;
  confidence?: number;
}

@customElement('ai-chart-summary')
export class AiChartSummary extends LitElement {
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

      .trend-section {
        display: flex;
        align-items: center;
        gap: ${tokens.spacing.md};
        padding: ${tokens.spacing.md};
        background: ${tokens.color.gray50};
        border-radius: ${tokens.radius.md};
        margin-bottom: ${tokens.spacing.md};
      }

      .trend-icon {
        font-size: ${tokens.fontSize['2xl']};
      }

      .trend-icon.up {
        color: ${tokens.color.success};
      }

      .trend-icon.down {
        color: ${tokens.color.danger};
      }

      .trend-icon.stable {
        color: ${tokens.color.gray500};
      }

      .trend-info {
        flex: 1;
      }

      .trend-label {
        font-size: ${tokens.fontSize.sm};
        color: ${tokens.color.gray500};
        margin-bottom: ${tokens.spacing.xs};
      }

      .trend-value {
        font-size: ${tokens.fontSize.xl};
        font-weight: ${tokens.fontWeight.bold};
        color: ${tokens.color.gray900};
      }

      .key-points-section {
        margin-bottom: ${tokens.spacing.md};
      }

      .section-title {
        font-size: ${tokens.fontSize.md};
        font-weight: ${tokens.fontWeight.semibold};
        color: ${tokens.color.gray900};
        margin-bottom: ${tokens.spacing.sm};
      }

      .key-points {
        display: flex;
        flex-direction: column;
        gap: ${tokens.spacing.sm};
      }

      .key-point {
        display: flex;
        align-items: flex-start;
        gap: ${tokens.spacing.sm};
        padding: ${tokens.spacing.sm};
        background: ${tokens.color.gray50};
        border-radius: ${tokens.radius.md};
        border-left: 3px solid ${tokens.color.primaryMain};
      }

      .point-icon {
        font-size: ${tokens.fontSize.md};
        color: ${tokens.color.primaryMain};
        line-height: 1.5;
      }

      .point-text {
        flex: 1;
        font-size: ${tokens.fontSize.sm};
        color: ${tokens.color.gray900};
        line-height: 1.5;
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

  @property({ type: Object }) data: ChartSummary | null = null;

  private _getTrendIcon(trend: string): string {
    switch (trend) {
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
    if (!this.data || this.data.keyPoints.length === 0) {
      return html`
        <div class="empty-state">
          <div class="empty-icon">📊</div>
          <div class="empty-text">No chart summary available</div>
        </div>
        <slot></slot>
      `;
    }

    return html`
      <div class="header">
        <div class="title">${this.data.title || 'Chart Summary'}</div>
        <div class="ai-badge">
          <span>✨</span>
          <span>AI</span>
        </div>
      </div>

      ${this.data.trend ? html`
        <div class="trend-section">
          <div class="trend-icon ${this.data.trend}">
            ${this._getTrendIcon(this.data.trend)}
          </div>
          <div class="trend-info">
            <div class="trend-label">Overall Trend</div>
            <div class="trend-value">
              ${this.data.trend === 'up' ? '+' : this.data.trend === 'down' ? '-' : ''}${this.data.trendPercentage ? Math.abs(this.data.trendPercentage).toFixed(1) + '%' : this.data.trend}
            </div>
          </div>
        </div>
      ` : ''}

      <div class="key-points-section">
        <div class="section-title">Key Insights</div>
        <div class="key-points">
          ${this.data.keyPoints.map(point => html`
            <div class="key-point">
              <div class="point-icon">•</div>
              <div class="point-text">${point}</div>
            </div>
          `)}
        </div>
      </div>

      ${this.data.confidence ? html`
        <div class="confidence-section">
          <div class="confidence-label">
            <span>AI Confidence</span>
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
    'ai-chart-summary': AiChartSummary;
  }
}
