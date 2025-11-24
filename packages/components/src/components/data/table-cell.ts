import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

@customElement('table-cell')
export class TableCell extends LitElement {
  static override styles = [
    baseStyles,
    css`
      :host {
        display: table-cell;
        padding: ${tokens.spacing.md} ${tokens.spacing.lg};
        vertical-align: middle;
        color: ${tokens.color.gray900};
      }

      :host([align='center']) {
        text-align: center;
      }

      :host([align='right']) {
        text-align: right;
      }

      :host([header]) {
        font-weight: ${tokens.fontWeight.semibold};
        background: ${tokens.color.gray50};
        color: ${tokens.color.gray900};
        font-size: ${tokens.fontSize.sm};
        padding: ${tokens.spacing.sm} ${tokens.spacing.lg};
      }
    `,
  ];

  @property({ type: String }) align: 'left' | 'center' | 'right' = 'left';
  @property({ type: Boolean }) header = false;

  override render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'table-cell': TableCell;
  }
}
