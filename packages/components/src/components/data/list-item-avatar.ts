import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

@customElement('list-item-avatar')
export class ListItemAvatar extends LitElement {
  static override styles = [
    baseStyles,
    css`
      :host {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
      }

      .avatar {
        width: 40px;
        height: 40px;
        border-radius: ${tokens.radius.full};
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        background: ${tokens.color.gray100};
        color: ${tokens.color.gray700};
        font-weight: ${tokens.fontWeight.medium};
        font-size: ${tokens.fontSize.sm};
      }

      .avatar img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .avatar.icon {
        background: ${tokens.color.primaryLight};
        color: ${tokens.color.primaryMain};
      }

      :host([size='small']) .avatar {
        width: 32px;
        height: 32px;
        font-size: ${tokens.fontSize.xs};
      }

      :host([size='large']) .avatar {
        width: 56px;
        height: 56px;
        font-size: ${tokens.fontSize.md};
      }

      :host([shape='square']) .avatar {
        border-radius: ${tokens.radius.md};
      }
    `,
  ];

  @property({ type: String }) src = '';
  @property({ type: String }) alt = '';
  @property({ type: String }) size: 'small' | 'medium' | 'large' = 'medium';
  @property({ type: String }) shape: 'circle' | 'square' = 'circle';
  @property({ type: String }) icon = '';

  override render() {
    if (this.src) {
      return html`
        <div class="avatar">
          <img src="${this.src}" alt="${this.alt}" />
        </div>
      `;
    }

    if (this.icon) {
      return html`
        <div class="avatar icon">
          ${this.icon}
        </div>
      `;
    }

    return html`
      <div class="avatar">
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'list-item-avatar': ListItemAvatar;
  }
}
