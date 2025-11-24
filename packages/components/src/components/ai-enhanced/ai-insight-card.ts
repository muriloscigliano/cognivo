import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

export interface Insight {
  text: string;
  type: 'positive' | 'negative' | 'warning' | 'neutral';
  importance?: number;
}

@customElement('ai-insight-card')
export class AiInsightCard extends LitElement {
  static override styles = [
    baseStyles,
    css`
      :host {
        display: block;
        padding: ${tokens.spacing.lg};
        border: 1px solid ${tokens.color.gray100};
        border-radius: ${tokens.radius.lg};
        background: ${tokens.color.grayWhite};
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
        display: flex;
        align-items: center;
        gap: ${tokens.spacing.sm};
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

      .insights-list {
        display: flex;
        flex-direction: column;
        gap: ${tokens.spacing.sm};
        margin-bottom: ${tokens.spacing.md};
      }

      .insight-item {
        display: flex;
        align-items: flex-start;
        gap: ${tokens.spacing.sm};
        padding: ${tokens.spacing.md};
        background: ${tokens.color.gray50};
        border-radius: ${tokens.radius.md};
        border-left: 3px solid ${tokens.color.gray100};
        transition: all ${tokens.transition.default};
      }

      .insight-item:hover {
        transform: translateX(4px);
      }

      .insight-item.positive {
        border-left-color: ${tokens.color.success};
        background: linear-gradient(90deg, ${tokens.color.success}15 0%, ${tokens.color.gray50} 100%);
      }

      .insight-item.negative {
        border-left-color: ${tokens.color.danger};
        background: linear-gradient(90deg, ${tokens.color.danger}15 0%, ${tokens.color.gray50} 100%);
      }

      .insight-item.warning {
        border-left-color: ${tokens.color.warning};
        background: linear-gradient(90deg, ${tokens.color.warning}15 0%, ${tokens.color.gray50} 100%);
      }

      .insight-icon {
        font-size: ${tokens.fontSize.lg};
        line-height: 1;
        margin-top: 2px;
      }

      .insight-text {
        flex: 1;
        font-size: ${tokens.fontSize.md};
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
        animation: fillProgress 0.8s ease-out forwards;
      }

      @keyframes fillProgress {
        from {
          width: 0;
        }
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

      .empty-text {
        font-size: ${tokens.fontSize.md};
      }
    `
  ];

  @property({ type: String }) title = '';
  @property({ type: Number }) confidence = 0;
  @property({ type: Array }) insights: Insight[] = [];

  private _getInsightIcon(type: string): string {
    switch (type) {
      case 'positive':
        return '✓';
      case 'negative':
        return '✗';
      case 'warning':
        return '⚠';
      default:
        return '•';
    }
  }

  override render() {
    if (!this.title && this.insights.length === 0) {
      return html`
        <div class="empty-state">
          <div class="empty-icon">💡</div>
          <div class="empty-text">No insights available</div>
        </div>
        <slot></slot>
      `;
    }

    return html`
      <div class="header">
        <div class="title">
          <span>${this.title || 'AI Insights'}</span>
        </div>
        <div class="ai-badge">
          <span>✨</span>
          <span>AI</span>
        </div>
      </div>

      ${this.insights.length > 0 ? html`
        <div class="insights-list">
          ${this.insights.map(insight => html`
            <div class="insight-item ${insight.type}">
              <div class="insight-icon">${this._getInsightIcon(insight.type)}</div>
              <div class="insight-text">${insight.text}</div>
            </div>
          `)}
        </div>
      ` : ''}

      ${this.confidence > 0 ? html`
        <div class="confidence-section">
          <div class="confidence-label">
            <span>AI Confidence</span>
            <span class="confidence-value">${Math.round(this.confidence * 100)}%</span>
          </div>
          <div class="confidence-track">
            <div class="confidence-fill" style="width: ${this.confidence * 100}%"></div>
          </div>
        </div>
      ` : ''}

      <slot></slot>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ai-insight-card': AiInsightCard;
  }
}
