import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

@customElement('ai-insights-scroller')
export class AiInsightsScroller extends LitElement {
  static override styles = [
    baseStyles,
    css`:host {
      display: block;
      padding: ${tokens.spacing.md};
    }`
  ];

  @property({ type: Array }) data = [];

  override render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ai-insights-scroller': AiInsightsScroller;
  }
}
