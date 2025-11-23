import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

export interface TaggedItem {
  id: string;
  text: string;
  tags: string[];
  aiGenerated?: boolean;
}

@customElement('ai-auto-tag-list')
export class AiAutoTagList extends LitElement {
  static override styles = [
    baseStyles,
    css`
      :host {
        display: block;
        padding: ${tokens.spacing.md};
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

      .list-container {
        display: flex;
        flex-direction: column;
        gap: ${tokens.spacing.sm};
      }

      .list-item {
        padding: ${tokens.spacing.md};
        background: ${tokens.color.grayWhite};
        border: 1px solid ${tokens.color.gray200};
        border-radius: ${tokens.radius.md};
        transition: all ${tokens.transition.default};
      }

      .list-item:hover {
        border-color: ${tokens.color.primaryMain};
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
      }

      .item-text {
        font-size: ${tokens.fontSize.md};
        color: ${tokens.color.gray900};
        margin-bottom: ${tokens.spacing.sm};
        line-height: 1.5;
      }

      .tags-container {
        display: flex;
        flex-wrap: wrap;
        gap: ${tokens.spacing.xs};
      }

      .tag {
        display: inline-flex;
        align-items: center;
        gap: ${tokens.spacing.xs};
        padding: ${tokens.spacing.xs} ${tokens.spacing.sm};
        background: ${tokens.color.gray100};
        border-radius: ${tokens.radius.full};
        font-size: ${tokens.fontSize.xs};
        font-weight: ${tokens.fontWeight.medium};
        color: ${tokens.color.gray700};
        transition: all ${tokens.transition.default};
      }

      .tag.ai-generated {
        background: linear-gradient(135deg, ${tokens.color.primaryLight} 0%, ${tokens.color.primaryLight}80 100%);
        color: ${tokens.color.primaryDark};
        border: 1px solid ${tokens.color.primaryMain}40;
      }

      .tag-icon {
        font-size: ${tokens.fontSize.xs};
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
    `
  ];

  @property({ type: Array }) data: TaggedItem[] = [];
  @property({ type: String }) title = 'Auto-Tagged List';

  override render() {
    if (!this.data || this.data.length === 0) {
      return html`
        <div class="empty-state">
          <div class="empty-icon">🏷️</div>
          <div class="empty-text">No tagged items available</div>
        </div>
        <slot></slot>
      `;
    }

    return html`
      <div class="header">
        <div class="title">${this.title}</div>
        <div class="ai-badge">
          <span>✨</span>
          <span>AI Tags</span>
        </div>
      </div>

      <div class="list-container">
        ${this.data.map(item => html`
          <div class="list-item">
            <div class="item-text">${item.text}</div>
            <div class="tags-container">
              ${item.tags.map(tag => html`
                <span class="tag ${item.aiGenerated ? 'ai-generated' : ''}">
                  ${item.aiGenerated ? html`<span class="tag-icon">✨</span>` : ''}
                  <span>${tag}</span>
                </span>
              `)}
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
    'ai-auto-tag-list': AiAutoTagList;
  }
}
