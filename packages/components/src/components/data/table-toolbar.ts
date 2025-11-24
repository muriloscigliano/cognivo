import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

@customElement('table-toolbar')
export class TableToolbar extends LitElement {
  static override styles = [
    baseStyles,
    css`
      :host {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: ${tokens.spacing.md} ${tokens.spacing.lg};
        background: ${tokens.color.grayWhite};
        border-bottom: 1px solid ${tokens.color.gray100};
      }

      .toolbar-left {
        display: flex;
        gap: ${tokens.spacing.md};
        align-items: center;
      }

      .toolbar-right {
        display: flex;
        gap: ${tokens.spacing.sm};
        align-items: center;
      }

      .toolbar-title {
        font-size: ${tokens.fontSize.lg};
        font-weight: ${tokens.fontWeight.semibold};
        color: ${tokens.color.gray900};
      }

      .toolbar-btn {
        padding: ${tokens.spacing.sm} ${tokens.spacing.md};
        background: ${tokens.color.primaryMain};
        color: ${tokens.color.grayWhite};
        border: none;
        border-radius: ${tokens.radius.sm};
        cursor: pointer;
        font-size: ${tokens.fontSize.sm};
        font-weight: ${tokens.fontWeight.medium};
        transition: background ${tokens.transition.default};
      }

      .toolbar-btn:hover {
        background: ${tokens.color.primaryDark};
      }

      .toolbar-btn.secondary {
        background: ${tokens.color.gray100};
        color: ${tokens.color.gray900};
      }

      .toolbar-btn.secondary:hover {
        background: ${tokens.color.gray100};
      }
    `,
  ];

  @property({ type: String }) title = '';

  override render() {
    return html`
      <div class="toolbar-left">
        ${this.title ? html`<div class="toolbar-title">${this.title}</div>` : ''}
        <slot name="left"></slot>
      </div>
      <div class="toolbar-right">
        <slot name="right"></slot>
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'table-toolbar': TableToolbar;
  }
}
