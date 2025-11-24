import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

export interface TableTagSuggestion {
  column: string;
  suggestedTags: string[];
  confidence: number;
}

@customElement('ai-table-auto-tag')
export class AiTableAutoTag extends LitElement {
  static override styles = [
    baseStyles,
    css`
      :host {
        display: block;
        padding: ${tokens.spacing.lg};
        background: ${tokens.color.grayWhite};
        border: 1px solid ${tokens.color.gray100};
        border-radius: ${tokens.radius.md};
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
        background: linear-gradient(135deg, ${tokens.color.primaryMain} 0%, ${tokens.color.primaryDark} 100%);
        color: white;
        border-radius: ${tokens.radius.full};
        font-size: ${tokens.fontSize.xs};
        font-weight: ${tokens.fontWeight.medium};
      }

      .suggestions-list {
        display: flex;
        flex-direction: column;
        gap: ${tokens.spacing.md};
      }

      .suggestion-item {
        padding: ${tokens.spacing.md};
        background: ${tokens.color.gray50};
        border-radius: ${tokens.radius.md};
      }

      .suggestion-column {
        font-size: ${tokens.fontSize.sm};
        font-weight: ${tokens.fontWeight.semibold};
        color: ${tokens.color.primaryMain};
        margin-bottom: ${tokens.spacing.sm};
      }

      .tags-container {
        display: flex;
        flex-wrap: wrap;
        gap: ${tokens.spacing.xs};
        margin-bottom: ${tokens.spacing.sm};
      }

      .tag {
        display: inline-flex;
        align-items: center;
        gap: ${tokens.spacing.xs};
        padding: ${tokens.spacing.xs} ${tokens.spacing.sm};
        background: linear-gradient(135deg, ${tokens.color.primaryLight} 0%, ${tokens.color.primaryLight}80 100%);
        color: ${tokens.color.primaryDark};
        border: 1px solid ${tokens.color.primaryMain}40;
        border-radius: ${tokens.radius.full};
        font-size: ${tokens.fontSize.xs};
        font-weight: ${tokens.fontWeight.medium};
        cursor: pointer;
        transition: all ${tokens.transition.default};
      }

      .tag:hover {
        background: ${tokens.color.primaryMain};
        color: white;
      }

      .tag-icon {
        font-size: ${tokens.fontSize.xs};
      }

      .confidence-bar {
        height: 4px;
        background: ${tokens.color.gray100};
        border-radius: ${tokens.radius.full};
        overflow: hidden;
      }

      .confidence-fill {
        height: 100%;
        background: ${tokens.color.primaryMain};
        border-radius: ${tokens.radius.full};
        transition: width ${tokens.transition.default};
      }

      .empty-state {
        text-align: center;
        padding: ${tokens.spacing.xl};
        color: ${tokens.color.gray500};
      }

      .empty-icon {
        font-size: ${tokens.fontSize['3xl']};
        margin-bottom: ${tokens.spacing.sm};
      }
    `
  ];

  @property({ type: Array }) data: TableTagSuggestion[] = [];

  override render() {
    if (!this.data || this.data.length === 0) {
      return html`
        <div class="empty-state">
          <div class="empty-icon">🏷️</div>
          <div>No tag suggestions available</div>
        </div>
        <slot></slot>
      `;
    }

    return html`
      <div class="header">
        <div class="title">AI Tag Suggestions</div>
        <div class="ai-badge">
          <span>✨</span>
          <span>AI</span>
        </div>
      </div>

      <div class="suggestions-list">
        ${this.data.map(suggestion => html`
          <div class="suggestion-item">
            <div class="suggestion-column">${suggestion.column}</div>
            <div class="tags-container">
              ${suggestion.suggestedTags.map(tag => html`
                <span class="tag">
                  <span class="tag-icon">✨</span>
                  <span>${tag}</span>
                </span>
              `)}
            </div>
            <div class="confidence-bar">
              <div class="confidence-fill" style="width: ${suggestion.confidence * 100}%"></div>
            </div>
          </div>
        `)}
      </div>

      <slot></slot>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ai-table-auto-tag': AiTableAutoTag;
  }
}
