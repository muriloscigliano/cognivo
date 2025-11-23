import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

export interface ListSummaryData {
  totalItems: number;
  keyPoints: string[];
  categories?: Array<{ name: string; count: number }>;
  insights?: string[];
}

@customElement('ai-list-summary')
export class AiListSummary extends LitElement {
  static override styles = [
    baseStyles,
    css`
      :host {
        display: block;
        padding: ${tokens.spacing.lg};
        background: ${tokens.color.grayWhite};
        border: 1px solid ${tokens.color.gray200};
        border-radius: ${tokens.radius.lg};
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

      .total-count {
        font-size: ${tokens.fontSize.xxl};
        font-weight: ${tokens.fontWeight.bold};
        color: ${tokens.color.primaryMain};
        margin-bottom: ${tokens.spacing.md};
      }

      .key-points {
        display: flex;
        flex-direction: column;
        gap: ${tokens.spacing.sm};
        margin-bottom: ${tokens.spacing.md};
      }

      .key-point {
        display: flex;
        align-items: flex-start;
        gap: ${tokens.spacing.sm};
        padding: ${tokens.spacing.sm};
        background: ${tokens.color.gray50};
        border-radius: ${tokens.radius.md};
        border-left: 3px solid ${tokens.color.primaryMain};
        font-size: ${tokens.fontSize.sm};
        color: ${tokens.color.gray700};
        line-height: 1.5;
      }

      .point-icon {
        color: ${tokens.color.primaryMain};
      }

      .categories-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
        gap: ${tokens.spacing.sm};
        margin-bottom: ${tokens.spacing.md};
      }

      .category-item {
        padding: ${tokens.spacing.sm};
        background: ${tokens.color.gray50};
        border-radius: ${tokens.radius.md};
        text-align: center;
      }

      .category-count {
        font-size: ${tokens.fontSize.lg};
        font-weight: ${tokens.fontWeight.bold};
        color: ${tokens.color.primaryMain};
      }

      .category-name {
        font-size: ${tokens.fontSize.xs};
        color: ${tokens.color.gray600};
        margin-top: ${tokens.spacing.xs};
      }

      .insights-section {
        padding-top: ${tokens.spacing.md};
        border-top: 1px solid ${tokens.color.gray200};
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
        font-size: ${tokens.fontSize.sm};
        color: ${tokens.color.gray700};
        padding-left: ${tokens.spacing.sm};
      }

      .insight-item:before {
        content: '→';
        margin-right: ${tokens.spacing.xs};
        color: ${tokens.color.primaryMain};
      }
    `
  ];

  @property({ type: Object }) data: ListSummaryData | null = null;

  override render() {
    if (!this.data) {
      return html`<slot></slot>`;
    }

    return html`
      <div class="header">
        <div class="title">List Summary</div>
        <div class="ai-badge">
          <span>✨</span>
          <span>AI</span>
        </div>
      </div>

      <div class="total-count">${this.data.totalItems} Items</div>

      <div class="key-points">
        ${this.data.keyPoints.map(point => html`
          <div class="key-point">
            <span class="point-icon">•</span>
            <span>${point}</span>
          </div>
        `)}
      </div>

      ${this.data.categories && this.data.categories.length > 0 ? html`
        <div class="categories-grid">
          ${this.data.categories.map(cat => html`
            <div class="category-item">
              <div class="category-count">${cat.count}</div>
              <div class="category-name">${cat.name}</div>
            </div>
          `)}
        </div>
      ` : ''}

      ${this.data.insights && this.data.insights.length > 0 ? html`
        <div class="insights-section">
          <div class="section-title">AI Insights</div>
          <div class="insights-list">
            ${this.data.insights.map(insight => html`
              <div class="insight-item">${insight}</div>
            `)}
          </div>
        </div>
      ` : ''}

      <slot></slot>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ai-list-summary': AiListSummary;
  }
}
