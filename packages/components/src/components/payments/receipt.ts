import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

@customElement('receipt')
export class Receipt extends LitElement {
  static override styles = [
    baseStyles,
    css`:host {
      display: block;
      padding: var(--cg-spacing-16);
      border: 1px solid var(--cg-gray-100);
      border-radius: var(--cg-Border-radius-150);
    }`
  ];

  @property({ type: Object }) data = {};
  @property({ type: Number }) amount = 0;

  override render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'receipt': Receipt;
  }
}
