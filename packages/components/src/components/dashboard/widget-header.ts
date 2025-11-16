import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

@customElement('widget-header')
export class WidgetHeader extends LitElement {
  static override styles = [
    baseStyles,
    css`:host {
      display: block;
      background: inherit;
      border: 1px solid var(--cg-gray-100);
      border-radius: var(--cg-Border-radius-150);
      padding: var(--cg-spacing-24);
    }`
  ];

  @property({ type: String })
  override title = '';
  @property({ type: Object }) data = {};

  override render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'widget-header': WidgetHeader;
  }
}
