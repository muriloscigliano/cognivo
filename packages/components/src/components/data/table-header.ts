import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

@customElement('table-header')
export class TableHeader extends LitElement {
  static override styles = [
    baseStyles,
    css`
      :host {
        display: table-header-group;
        font-weight: ${tokens.fontWeight.semibold};
        background: ${tokens.color.gray50};
        color: ${tokens.color.gray700};
        font-size: ${tokens.fontSize.sm};
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }
    `,
  ];

  override render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'table-header': TableHeader;
  }
}
