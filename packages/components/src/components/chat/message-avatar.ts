import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

@customElement('message-avatar')
export class MessageAvatar extends LitElement {
  static override styles = [
    baseStyles,
    css`
      :host {
        display: inline-flex;
        font-family: ${tokens.fontFamily.primary};
      }

      .avatar {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        background: ${tokens.color.gray500};
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: ${tokens.fontSize.sm};
        font-weight: ${tokens.fontWeight.semibold};
        overflow: hidden;
        flex-shrink: 0;
      }

      .avatar img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      /* User variant */
      :host([variant='user']) .avatar {
        background: ${tokens.color.primaryMain};
      }

      /* Agent variant */
      :host([variant='agent']) .avatar {
        background: ${tokens.color.aiAccent};
      }

      /* System variant */
      :host([variant='system']) .avatar {
        background: ${tokens.color.gray500};
      }

      /* Size variants */
      :host([size='small']) .avatar {
        width: 24px;
        height: 24px;
        font-size: ${tokens.fontSize.xs};
      }

      :host([size='large']) .avatar {
        width: 40px;
        height: 40px;
        font-size: ${tokens.fontSize.base};
      }

      /* Shape variants */
      :host([shape='square']) .avatar {
        border-radius: ${tokens.radius.md};
      }

      :host([shape='rounded']) .avatar {
        border-radius: ${tokens.radius.lg};
      }
    `
  ];

  @property({ type: String })
  name = '';

  @property({ type: String })
  src = '';

  @property({ type: String, reflect: true })
  variant: 'user' | 'agent' | 'system' = 'user';

  @property({ type: String, reflect: true })
  size: 'small' | 'medium' | 'large' = 'medium';

  @property({ type: String, reflect: true })
  shape: 'circle' | 'square' | 'rounded' = 'circle';

  @property({ type: String })
  backgroundColor = '';

  private getInitials(): string {
    if (!this.name) return '?';
    return this.name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }

  override render() {
    const style = this.backgroundColor
      ? `background: ${this.backgroundColor};`
      : '';

    return html`
      <div class="avatar" style="${style}">
        ${this.src
          ? html`<img src="${this.src}" alt="${this.name}" />`
          : this.getInitials()
        }
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'message-avatar': MessageAvatar;
  }
}
