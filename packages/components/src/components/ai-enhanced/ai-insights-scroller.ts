import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

export interface ScrollerInsight {
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  type: 'positive' | 'negative' | 'warning' | 'info';
  confidence?: number;
}

@customElement('ai-insights-scroller')
export class AiInsightsScroller extends LitElement {
  static override styles = [
    baseStyles,
    css`
      :host {
        display: block;
        padding: ${tokens.spacing.md};
      }

      .scroller-container {
        position: relative;
      }

      .scroller-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: ${tokens.spacing.md};
      }

      .scroller-title {
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

      .scroller {
        display: flex;
        gap: ${tokens.spacing.md};
        overflow-x: auto;
        scroll-behavior: smooth;
        padding-bottom: ${tokens.spacing.sm};
        scrollbar-width: thin;
        scrollbar-color: ${tokens.color.gray300} ${tokens.color.gray100};
      }

      .scroller::-webkit-scrollbar {
        height: 8px;
      }

      .scroller::-webkit-scrollbar-track {
        background: ${tokens.color.gray100};
        border-radius: ${tokens.radius.full};
      }

      .scroller::-webkit-scrollbar-thumb {
        background: ${tokens.color.gray300};
        border-radius: ${tokens.radius.full};
      }

      .scroller::-webkit-scrollbar-thumb:hover {
        background: ${tokens.color.gray400};
      }

      .insight-card {
        flex: 0 0 280px;
        padding: ${tokens.spacing.lg};
        background: ${tokens.color.grayWhite};
        border: 1px solid ${tokens.color.gray200};
        border-radius: ${tokens.radius.lg};
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        transition: all ${tokens.transition.default};
        cursor: pointer;
      }

      .insight-card:hover {
        transform: translateY(-4px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      }

      .card-header {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        margin-bottom: ${tokens.spacing.sm};
        gap: ${tokens.spacing.sm};
      }

      .card-title {
        font-size: ${tokens.fontSize.md};
        font-weight: ${tokens.fontWeight.semibold};
        color: ${tokens.color.gray900};
        flex: 1;
        line-height: 1.4;
      }

      .priority-badge {
        padding: ${tokens.spacing.xs} ${tokens.spacing.sm};
        border-radius: ${tokens.radius.full};
        font-size: ${tokens.fontSize.xs};
        font-weight: ${tokens.fontWeight.medium};
        white-space: nowrap;
      }

      .priority-badge.high {
        background: ${tokens.color.dangerLight};
        color: ${tokens.color.dangerDark};
      }

      .priority-badge.medium {
        background: ${tokens.color.warningLight};
        color: ${tokens.color.warningDark};
      }

      .priority-badge.low {
        background: ${tokens.color.gray200};
        color: ${tokens.color.gray700};
      }

      .card-description {
        font-size: ${tokens.fontSize.sm};
        color: ${tokens.color.gray700};
        line-height: 1.5;
        margin-bottom: ${tokens.spacing.md};
      }

      .card-footer {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-top: ${tokens.spacing.sm};
        border-top: 1px solid ${tokens.color.gray200};
      }

      .type-indicator {
        display: flex;
        align-items: center;
        gap: ${tokens.spacing.xs};
        font-size: ${tokens.fontSize.xs};
        color: ${tokens.color.gray600};
      }

      .type-icon {
        font-size: ${tokens.fontSize.md};
      }

      .type-indicator.positive .type-icon {
        color: ${tokens.color.successMain};
      }

      .type-indicator.negative .type-icon {
        color: ${tokens.color.dangerMain};
      }

      .type-indicator.warning .type-icon {
        color: ${tokens.color.warningMain};
      }

      .type-indicator.info .type-icon {
        color: ${tokens.color.primaryMain};
      }

      .confidence-mini {
        font-size: ${tokens.fontSize.xs};
        color: ${tokens.color.gray600};
        font-weight: ${tokens.fontWeight.medium};
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
        font-size: ${tokens.fontSize.xxxl};
        margin-bottom: ${tokens.spacing.sm};
      }

      .empty-text {
        font-size: ${tokens.fontSize.md};
      }
    `
  ];

  @property({ type: Array }) data: ScrollerInsight[] = [];

  private _getTypeIcon(type: string): string {
    switch (type) {
      case 'positive':
        return '✓';
      case 'negative':
        return '✗';
      case 'warning':
        return '⚠';
      case 'info':
        return 'ℹ';
      default:
        return '•';
    }
  }

  override render() {
    if (!this.data || this.data.length === 0) {
      return html`
        <div class="empty-state">
          <div class="empty-icon">📊</div>
          <div class="empty-text">No insights available</div>
        </div>
        <slot></slot>
      `;
    }

    return html`
      <div class="scroller-container">
        <div class="scroller-header">
          <div class="scroller-title">
            <span>AI Insights</span>
          </div>
          <div class="ai-badge">
            <span>✨</span>
            <span>AI</span>
          </div>
        </div>

        <div class="scroller">
          ${this.data.map(insight => html`
            <div class="insight-card">
              <div class="card-header">
                <div class="card-title">${insight.title}</div>
                <div class="priority-badge ${insight.priority}">
                  ${insight.priority}
                </div>
              </div>

              <div class="card-description">
                ${insight.description}
              </div>

              <div class="card-footer">
                <div class="type-indicator ${insight.type}">
                  <span class="type-icon">${this._getTypeIcon(insight.type)}</span>
                  <span>${insight.type}</span>
                </div>
                ${insight.confidence ? html`
                  <div class="confidence-mini">
                    ${Math.round(insight.confidence * 100)}%
                  </div>
                ` : ''}
              </div>
            </div>
          `)}
        </div>
      </div>

      <slot></slot>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ai-insights-scroller': AiInsightsScroller;
  }
}
