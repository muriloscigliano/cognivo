import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

@customElement('list-divider')
export class ListDivider extends LitElement {
  static override styles = [
    baseStyles,
    css`
      :host {
        display: block;
        margin: ${tokens.spacing.sm} 0;
      }

      .divider {
        border: none;
        border-top: 1px solid ${tokens.color.gray200};
        margin: 0;
      }

      .divider.with-text {
        display: flex;
        align-items: center;
        border: none;
        gap: ${tokens.spacing.md};
        color: ${tokens.color.gray500};
        font-size: ${tokens.fontSize.sm};
        font-weight: ${tokens.fontWeight.medium};
      }

      .divider.with-text::before,
      .divider.with-text::after {
        content: '';
        flex: 1;
        border-top: 1px solid ${tokens.color.gray200};
      }

      :host([dashed]) .divider {
        border-top-style: dashed;
      }

      :host([orientation='vertical']) {
        display: inline-block;
        height: 100%;
        margin: 0 ${tokens.spacing.sm};
      }

      :host([orientation='vertical']) .divider {
        border-top: none;
        border-left: 1px solid ${tokens.color.gray200};
        height: 100%;
      }
    `,
  ];

  @property({ type: String }) orientation: 'horizontal' | 'vertical' = 'horizontal';
  @property({ type: Boolean }) dashed = false;

  override render() {
    const hasText = this.textContent?.trim();

    if (hasText && this.orientation === 'horizontal') {
      return html`<div class="divider with-text"><slot></slot></div>`;
    }

    return html`<hr class="divider" />`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'list-divider': ListDivider;
  }
}
