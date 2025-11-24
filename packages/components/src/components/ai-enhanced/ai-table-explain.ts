import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

export interface TableExplanation {
  summary: string;
  columnInsights?: Array<{ column: string; insight: string }>;
  patterns?: string[];
  recommendations?: string[];
}

@customElement('ai-table-explain')
export class AiTableExplain extends LitElement {
  static override styles = [
    baseStyles,
    css`
      :host {
        display: block;
        padding: ${tokens.spacing.lg};
        background: ${tokens.color.grayWhite};
        border: 1px solid ${tokens.color.gray100};
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

      .summary {
        padding: ${tokens.spacing.md};
        background: linear-gradient(135deg, ${tokens.color.primaryLight}20 0%, ${tokens.color.gray50} 100%);
        border-radius: ${tokens.radius.md};
        border-left: 4px solid ${tokens.color.primaryMain};
        margin-bottom: ${tokens.spacing.md};
      }

      .summary-text {
        font-size: ${tokens.fontSize.md};
        color: ${tokens.color.gray900};
        line-height: 1.6;
      }

      .section {
        margin-bottom: ${tokens.spacing.md};
      }

      .section-title {
        font-size: ${tokens.fontSize.md};
        font-weight: ${tokens.fontWeight.semibold};
        color: ${tokens.color.gray900};
        margin-bottom: ${tokens.spacing.sm};
        display: flex;
        align-items: center;
        gap: ${tokens.spacing.xs};
      }

      .section-icon {
        font-size: ${tokens.fontSize.lg};
      }

      .column-insights {
        display: flex;
        flex-direction: column;
        gap: ${tokens.spacing.sm};
      }

      .column-insight {
        padding: ${tokens.spacing.sm};
        background: ${tokens.color.gray50};
        border-radius: ${tokens.radius.md};
      }

      .column-name {
        font-size: ${tokens.fontSize.sm};
        font-weight: ${tokens.fontWeight.semibold};
        color: ${tokens.color.primaryMain};
        margin-bottom: ${tokens.spacing.xs};
      }

      .insight-text {
        font-size: ${tokens.fontSize.sm};
        color: ${tokens.color.gray900};
        line-height: 1.5;
      }

      .patterns-list,
      .recommendations-list {
        display: flex;
        flex-direction: column;
        gap: ${tokens.spacing.xs};
      }

      .list-item {
        display: flex;
        align-items: flex-start;
        gap: ${tokens.spacing.sm};
        padding: ${tokens.spacing.sm};
        font-size: ${tokens.fontSize.sm};
        color: ${tokens.color.gray900};
        line-height: 1.5;
      }

      .list-icon {
        color: ${tokens.color.primaryMain};
        font-weight: ${tokens.fontWeight.bold};
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

  @property({ type: Object }) data: TableExplanation | null = null;

  override render() {
    if (!this.data || !this.data.summary) {
      return html`
        <div class="empty-state">
          <div class="empty-icon">📊</div>
          <div class="empty-text">No table explanation available</div>
        </div>
        <slot></slot>
      `;
    }

    return html`
      <div class="header">
        <div class="title">Table Analysis</div>
        <div class="ai-badge">
          <span>✨</span>
          <span>AI</span>
        </div>
      </div>

      <div class="summary">
        <div class="summary-text">${this.data.summary}</div>
      </div>

      ${this.data.columnInsights && this.data.columnInsights.length > 0 ? html`
        <div class="section">
          <div class="section-title">
            <span class="section-icon">📋</span>
            <span>Column Insights</span>
          </div>
          <div class="column-insights">
            ${this.data.columnInsights.map(item => html`
              <div class="column-insight">
                <div class="column-name">${item.column}</div>
                <div class="insight-text">${item.insight}</div>
              </div>
            `)}
          </div>
        </div>
      ` : ''}

      ${this.data.patterns && this.data.patterns.length > 0 ? html`
        <div class="section">
          <div class="section-title">
            <span class="section-icon">🔍</span>
            <span>Detected Patterns</span>
          </div>
          <div class="patterns-list">
            ${this.data.patterns.map(pattern => html`
              <div class="list-item">
                <span class="list-icon">•</span>
                <span>${pattern}</span>
              </div>
            `)}
          </div>
        </div>
      ` : ''}

      ${this.data.recommendations && this.data.recommendations.length > 0 ? html`
        <div class="section">
          <div class="section-title">
            <span class="section-icon">💡</span>
            <span>Recommendations</span>
          </div>
          <div class="recommendations-list">
            ${this.data.recommendations.map(rec => html`
              <div class="list-item">
                <span class="list-icon">→</span>
                <span>${rec}</span>
              </div>
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
    'ai-table-explain': AiTableExplain;
  }
}
