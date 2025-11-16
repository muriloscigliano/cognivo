import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

@customElement('checkout-summary')
export class CheckoutSummary extends LitElement {
  static override styles = [
    baseStyles,
    css`:host {
      display: block;
      padding: ${tokens.spacing.md};
      border: 1px solid ${tokens.color.gray100};
      border-radius: ${tokens.radius.lg};
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
    'checkout-summary': CheckoutSummary;
  }
}
