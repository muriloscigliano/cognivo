import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

@customElement('ai-explain-button')
export class AiExplainButton extends LitElement {
  static override styles = [
    baseStyles,
    css`:host {
      display: inline-flex;
      align-items: center;
      gap: var(--cg-spacing-4);
      padding: var(--cg-spacing-8) var(--cg-spacing-16);
      background: inherit;
      color: inherit;
      border: none;
      border-radius: var(--cg-Border-radius-100);
      cursor: pointer;
      font-family: inherit;
      font-size: inherit;
    }
    :host(:hover) {
      background: inherit;
    }
    :host([loading]) {
      opacity: 0.6;
      cursor: wait;
    }`
  ];

  @property({ type: Boolean, reflect: true }) loading = false;
  @property({ type: String }) label = '';

  override render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ai-explain-button': AiExplainButton;
  }
}
