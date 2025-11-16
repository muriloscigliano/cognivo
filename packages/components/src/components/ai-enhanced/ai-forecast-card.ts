import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

@customElement('ai-forecast-card')
export class AiForecastCard extends LitElement {
  static override styles = [
    baseStyles,
    css`:host {
      display: block;
      padding: var(--cg-spacing-16);
    }`
  ];

  @property({ type: Array }) data = [];

  override render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ai-forecast-card': AiForecastCard;
  }
}
