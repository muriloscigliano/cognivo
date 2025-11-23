import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

@customElement('icon-badge')
export class IconBadge extends LitElement {
  static override styles = [
    baseStyles,
    css`
      :host {
        display: inline-block;
        position: relative;
      }

      .icon-wrapper {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        position: relative;
      }

      .badge {
        position: absolute;
        top: -6px;
        right: -6px;
        min-width: 18px;
        height: 18px;
        padding: 0 4px;
        background: ${tokens.color.danger};
        color: ${tokens.color.grayWhite};
        border-radius: ${tokens.radius.full};
        font-size: ${tokens.fontSize.xs};
        font-weight: ${tokens.fontWeight.semibold};
        display: flex;
        align-items: center;
        justify-content: center;
        line-height: 1;
        border: 2px solid ${tokens.color.grayWhite};
      }

      .badge.dot {
        min-width: 10px;
        width: 10px;
        height: 10px;
        padding: 0;
        top: -4px;
        right: -4px;
      }

      :host([variant='primary']) .badge {
        background: ${tokens.color.primaryMain};
      }

      :host([variant='success']) .badge {
        background: ${tokens.color.success};
      }

      :host([variant='warning']) .badge {
        background: ${tokens.color.warning};
      }
    `,
  ];

  @property({ type: String }) count = '';
  @property({ type: Boolean }) dot = false;
  @property({ type: String, reflect: true }) variant: 'primary' | 'success' | 'warning' | 'danger' = 'danger';

  override render() {
    const shouldShowBadge = this.count || this.dot;

    return html`
      <div class="icon-wrapper">
        <slot></slot>
        ${shouldShowBadge
          ? html`
              <div class="badge ${this.dot ? 'dot' : ''}">
                ${!this.dot && this.count ? this.count : ''}
              </div>
            `
          : ''}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'icon-badge': IconBadge;
  }
}
