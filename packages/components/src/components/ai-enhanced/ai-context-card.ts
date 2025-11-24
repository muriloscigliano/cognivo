import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

export interface ContextInfo {
  title: string;
  description: string;
  relatedItems?: string[];
  importance?: 'high' | 'medium' | 'low';
}

@customElement('ai-context-card')
export class AiContextCard extends LitElement {
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
        align-items: flex-start;
        justify-content: space-between;
        margin-bottom: ${tokens.spacing.md};
        gap: ${tokens.spacing.sm};
      }

      .title {
        font-size: ${tokens.fontSize.lg};
        font-weight: ${tokens.fontWeight.semibold};
        color: ${tokens.color.gray900};
        flex: 1;
      }

      .importance-badge {
        padding: ${tokens.spacing.xs} ${tokens.spacing.sm};
        border-radius: ${tokens.radius.full};
        font-size: ${tokens.fontSize.xs};
        font-weight: ${tokens.fontWeight.semibold};
        text-transform: uppercase;
      }

      .importance-badge.high {
        background: ${tokens.color.danger};
        color: ${tokens.color.danger};
      }

      .importance-badge.medium {
        background: ${tokens.color.warning};
        color: ${tokens.color.warning};
      }

      .importance-badge.low {
        background: ${tokens.color.gray100};
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

      .description {
        font-size: ${tokens.fontSize.md};
        color: ${tokens.color.gray900};
        line-height: 1.6;
        margin-bottom: ${tokens.spacing.md};
      }

      .related-section {
        padding-top: ${tokens.spacing.md};
        border-top: 1px solid ${tokens.color.gray100};
      }

      .section-title {
        font-size: ${tokens.fontSize.sm};
        font-weight: ${tokens.fontWeight.semibold};
        color: ${tokens.color.gray900};
        margin-bottom: ${tokens.spacing.sm};
      }

      .related-items {
        display: flex;
        flex-direction: column;
        gap: ${tokens.spacing.xs};
      }

      .related-item {
        display: flex;
        align-items: center;
        gap: ${tokens.spacing.sm};
        padding: ${tokens.spacing.sm};
        background: ${tokens.color.gray50};
        border-radius: ${tokens.radius.md};
        font-size: ${tokens.fontSize.sm};
        color: ${tokens.color.gray900};
      }

      .item-icon {
        color: ${tokens.color.primaryMain};
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

  @property({ type: Object }) data: ContextInfo | null = null;

  override render() {
    if (!this.data) {
      return html`
        <div class="empty-state">
          <div class="empty-icon">📝</div>
          <div class="empty-text">No context information available</div>
        </div>
        <slot></slot>
      `;
    }

    return html`
      <div class="header">
        <div class="title">${this.data.title}</div>
        ${this.data.importance ? html`
          <div class="importance-badge ${this.data.importance}">
            ${this.data.importance}
          </div>
        ` : ''}
        <div class="ai-badge">
          <span>✨</span>
          <span>AI</span>
        </div>
      </div>

      <div class="description">${this.data.description}</div>

      ${this.data.relatedItems && this.data.relatedItems.length > 0 ? html`
        <div class="related-section">
          <div class="section-title">Related Context</div>
          <div class="related-items">
            ${this.data.relatedItems.map(item => html`
              <div class="related-item">
                <span class="item-icon">→</span>
                <span>${item}</span>
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
    'ai-context-card': AiContextCard;
  }
}
