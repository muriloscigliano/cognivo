import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

@customElement('ai-insight-card')
export class AiInsightCard extends LitElement {
  static override styles = [
    baseStyles,
    css`:host {
      display: block;
      padding: ${tokens.spacing.md};
      border: 1px solid ${tokens.color.gray100};
      border-radius: ${tokens.radius.lg};
      background: ${tokens.color.grayWhite};
    }`
  ];

  @property({ type: String }) title = '';
  @property({ type: Number }) confidence = 0;
  @property({ type: Array }) insights = [];

  override render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ai-insight-card': AiInsightCard;
  }
}
