import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

@customElement('icon-avatar')
export class IconAvatar extends LitElement {
  static override styles = [
    baseStyles,
    css`
      :host {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border-radius: ${tokens.radius.full};
        background: ${tokens.color.primaryLight};
        color: ${tokens.color.primaryMain};
        font-weight: ${tokens.fontWeight.semibold};
        overflow: hidden;
      }

      :host([size='small']) {
        width: 32px;
        height: 32px;
        font-size: ${tokens.fontSize.sm};
      }

      :host([size='medium']),
      :host {
        width: 40px;
        height: 40px;
        font-size: ${tokens.fontSize.md};
      }

      :host([size='large']) {
        width: 56px;
        height: 56px;
        font-size: ${tokens.fontSize.xl};
      }

      :host([variant='primary']) {
        background: ${tokens.color.primaryLight};
        color: ${tokens.color.primaryMain};
      }

      :host([variant='success']) {
        background: rgba(76, 175, 80, 0.1);
        color: ${tokens.color.success};
      }

      :host([variant='warning']) {
        background: rgba(255, 193, 7, 0.1);
        color: ${tokens.color.warning};
      }

      :host([variant='danger']) {
        background: rgba(244, 67, 54, 0.1);
        color: ${tokens.color.danger};
      }

      :host([variant='gray']) {
        background: ${tokens.color.gray100};
        color: ${tokens.color.gray900};
      }
    `,
  ];

  @property({ type: String, reflect: true }) size: 'small' | 'medium' | 'large' = 'medium';
  @property({ type: String, reflect: true }) variant: 'primary' | 'success' | 'warning' | 'danger' | 'gray' = 'primary';

  override render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'icon-avatar': IconAvatar;
  }
}
