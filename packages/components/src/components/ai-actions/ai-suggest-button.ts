import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

@customElement('ai-suggest-button')
export class AiSuggestButton extends LitElement {
  static override styles = [
    baseStyles,
    css`:host {
      display: inline-flex;
      align-items: center;
      gap: ${tokens.spacing.xs};
      padding: ${tokens.spacing.sm} ${tokens.spacing.md};
      background: ${tokens.color.primary};
      color: ${tokens.color.grayWhite};
      border: none;
      border-radius: ${tokens.radius.md};
      cursor: pointer;
      font-family: ${tokens.font.family.base};
      font-size: ${tokens.font.size.sm};
    }
    :host(:hover) {
      background: ${tokens.color.primaryHover};
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
    'ai-suggest-button': AiSuggestButton;
  }
}
