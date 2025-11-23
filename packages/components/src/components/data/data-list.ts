import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

export interface DataListItem {
  id?: string | number;
  title: string;
  description?: string;
  avatar?: string;
  icon?: string;
  meta?: string;
}

@customElement('data-list')
export class DataList extends LitElement {
  static override styles = [
    baseStyles,
    css`
      :host {
        display: block;
        background: ${tokens.color.grayWhite};
        border: 1px solid ${tokens.color.gray200};
        border-radius: ${tokens.radius.md};
        overflow: hidden;
      }

      .list-container {
        display: flex;
        flex-direction: column;
      }

      .list-item {
        display: flex;
        align-items: center;
        gap: ${tokens.spacing.md};
        padding: ${tokens.spacing.md} ${tokens.spacing.lg};
        border-bottom: 1px solid ${tokens.color.gray100};
        transition: background ${tokens.transition.default};
      }

      .list-item:last-child {
        border-bottom: none;
      }

      .list-item:hover {
        background: ${tokens.color.gray50};
      }

      .avatar {
        width: 40px;
        height: 40px;
        border-radius: ${tokens.radius.full};
        background: ${tokens.color.primaryLight};
        color: ${tokens.color.primaryMain};
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: ${tokens.fontWeight.medium};
        flex-shrink: 0;
      }

      .avatar img {
        width: 100%;
        height: 100%;
        border-radius: ${tokens.radius.full};
        object-fit: cover;
      }

      .content {
        flex: 1;
        min-width: 0;
      }

      .title {
        font-weight: ${tokens.fontWeight.medium};
        color: ${tokens.color.gray900};
        margin-bottom: ${tokens.spacing.xs};
      }

      .description {
        font-size: ${tokens.fontSize.sm};
        color: ${tokens.color.gray600};
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .meta {
        font-size: ${tokens.fontSize.sm};
        color: ${tokens.color.gray500};
        flex-shrink: 0;
      }

      .empty-state {
        padding: ${tokens.spacing.xl};
        text-align: center;
        color: ${tokens.color.gray500};
      }
    `,
  ];

  @property({ type: Array }) data: DataListItem[] = [];

  override render() {
    if (!this.data || this.data.length === 0) {
      return html`
        <div class="empty-state">
          <slot name="empty">No items to display</slot>
        </div>
      `;
    }

    return html`
      <div class="list-container">
        ${this.data.map(
          (item) => html`
            <div class="list-item">
              ${item.avatar || item.icon
                ? html`
                    <div class="avatar">
                      ${item.avatar ? html`<img src="${item.avatar}" />` : item.icon}
                    </div>
                  `
                : ''}
              <div class="content">
                <div class="title">${item.title}</div>
                ${item.description ? html`<div class="description">${item.description}</div>` : ''}
              </div>
              ${item.meta ? html`<div class="meta">${item.meta}</div>` : ''}
            </div>
          `
        )}
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'data-list': DataList;
  }
}
