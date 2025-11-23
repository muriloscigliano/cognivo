import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

@customElement('list-item-meta')
export class ListItemMeta extends LitElement {
  static override styles = [
    baseStyles,
    css`
      :host {
        display: flex;
        align-items: flex-start;
        gap: ${tokens.spacing.md};
        min-width: 0;
      }

      .avatar-slot {
        flex-shrink: 0;
      }

      .content {
        flex: 1;
        min-width: 0;
        display: flex;
        flex-direction: column;
        gap: ${tokens.spacing.xs};
      }

      .title {
        font-size: ${tokens.fontSize.md};
        font-weight: ${tokens.fontWeight.medium};
        color: ${tokens.color.gray900};
        margin: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .description {
        font-size: ${tokens.fontSize.sm};
        color: ${tokens.color.gray600};
        margin: 0;
        line-height: ${tokens.lineHeight.relaxed};
      }

      .description.truncate {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    `,
  ];

  @property({ type: String }) title = '';
  @property({ type: String }) description = '';
  @property({ type: Boolean }) truncate = false;

  override render() {
    return html`
      <div class="avatar-slot">
        <slot name="avatar"></slot>
      </div>
      <div class="content">
        <div class="title">
          ${this.title || html`<slot name="title"></slot>`}
        </div>
        ${this.description || this.querySelector('[slot="description"]')
          ? html`
              <div class="description ${this.truncate ? 'truncate' : ''}">
                ${this.description || html`<slot name="description"></slot>`}
              </div>
            `
          : ''}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'list-item-meta': ListItemMeta;
  }
}
