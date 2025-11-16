import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

@customElement('widget-body')
export class WidgetBody extends LitElement {
  static override styles = [
    baseStyles,
    css`:host {
      display: block;
      background: ${tokens.color.grayWhite};
      border: 1px solid ${tokens.color.gray100};
      border-radius: ${tokens.radius.lg};
      padding: ${tokens.spacing.lg};
    }`
  ];

  @property({ type: String }) title = '';
  @property({ type: Object }) data = {};

  override render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'widget-body': WidgetBody;
  }
}
