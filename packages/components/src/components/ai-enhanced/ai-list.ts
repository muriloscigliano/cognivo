import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

export interface ListItem {
  id: string;
  text: string;
  priority?: number;
  category?: string;
  metadata?: Record<string, unknown>;
}

@customElement('ai-list')
export class AiList extends LitElement {
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

      .controls {
        display: flex;
        gap: ${tokens.spacing.sm};
        align-items: center;
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

      .sort-button {
        padding: ${tokens.spacing.xs} ${tokens.spacing.sm};
        background: ${tokens.color.gray100};
        border: 1px solid ${tokens.color.gray200};
        border-radius: ${tokens.radius.md};
        font-size: ${tokens.fontSize.xs};
        cursor: pointer;
        transition: all ${tokens.transition.default};
      }

      .sort-button:hover {
        background: ${tokens.color.gray200};
      }

      .sort-button.active {
        background: ${tokens.color.primaryMain};
        color: white;
        border-color: ${tokens.color.primaryMain};
      }

      .list-container {
        display: flex;
        flex-direction: column;
        gap: ${tokens.spacing.sm};
      }

      .list-item {
        display: flex;
        align-items: center;
        gap: ${tokens.spacing.md};
        padding: ${tokens.spacing.md};
        background: ${tokens.color.grayWhite};
        border: 1px solid ${tokens.color.gray200};
        border-radius: ${tokens.radius.md};
        transition: all ${tokens.transition.default};
        cursor: pointer;
      }

      .list-item:hover {
        border-color: ${tokens.color.primaryMain};
        transform: translateX(4px);
      }

      .item-priority {
        width: 8px;
        height: 8px;
        border-radius: ${tokens.radius.full};
        flex-shrink: 0;
      }

      .item-priority.high {
        background: ${tokens.color.dangerMain};
        box-shadow: 0 0 8px ${tokens.color.dangerMain}80;
      }

      .item-priority.medium {
        background: ${tokens.color.warningMain};
      }

      .item-priority.low {
        background: ${tokens.color.successMain};
      }

      .item-content {
        flex: 1;
      }

      .item-text {
        font-size: ${tokens.fontSize.md};
        color: ${tokens.color.gray900};
        line-height: 1.5;
      }

      .item-category {
        display: inline-block;
        margin-top: ${tokens.spacing.xs};
        padding: 2px ${tokens.spacing.xs};
        background: ${tokens.color.primaryLight};
        color: ${tokens.color.primaryDark};
        border-radius: ${tokens.radius.sm};
        font-size: ${tokens.fontSize.xs};
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
    `
  ];

  @property({ type: Array }) data: ListItem[] = [];
  @property({ type: String }) title = 'AI-Enhanced List';
  @state() private sortBy: 'priority' | 'category' | 'default' = 'default';

  private _getPriorityLevel(priority?: number): 'high' | 'medium' | 'low' {
    if (!priority) return 'low';
    if (priority >= 7) return 'high';
    if (priority >= 4) return 'medium';
    return 'low';
  }

  private _getSortedData(): ListItem[] {
    const items = [...this.data];
    switch (this.sortBy) {
      case 'priority':
        return items.sort((a, b) => (b.priority || 0) - (a.priority || 0));
      case 'category':
        return items.sort((a, b) => (a.category || '').localeCompare(b.category || ''));
      default:
        return items;
    }
  }

  private _handleSort(type: 'priority' | 'category' | 'default') {
    this.sortBy = type;
  }

  override render() {
    if (!this.data || this.data.length === 0) {
      return html`
        <div class="empty-state">
          <div class="empty-icon">📝</div>
          <div class="empty-text">No items in list</div>
        </div>
        <slot></slot>
      `;
    }

    const sortedData = this._getSortedData();

    return html`
      <div class="header">
        <div class="title">${this.title}</div>
        <div class="controls">
          <button
            class="sort-button ${this.sortBy === 'priority' ? 'active' : ''}"
            @click="${() => this._handleSort('priority')}"
          >
            Priority
          </button>
          <button
            class="sort-button ${this.sortBy === 'category' ? 'active' : ''}"
            @click="${() => this._handleSort('category')}"
          >
            Category
          </button>
          <div class="ai-badge">
            <span>✨</span>
            <span>AI</span>
          </div>
        </div>
      </div>

      <div class="list-container">
        ${sortedData.map(item => html`
          <div class="list-item">
            <div class="item-priority ${this._getPriorityLevel(item.priority)}"></div>
            <div class="item-content">
              <div class="item-text">${item.text}</div>
              ${item.category ? html`
                <span class="item-category">${item.category}</span>
              ` : ''}
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
    'ai-list': AiList;
  }
}
