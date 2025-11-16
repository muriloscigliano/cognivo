import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

@customElement('chat-container')
export class ChatContainer extends LitElement {
  static override styles = [
    baseStyles,
    css`:host {
      display: block;
      font-family: ${tokens.font.family.base};
    }`
  ];

  @property({ type: Array }) messages = [];
  @property({ type: String }) content = '';

  override render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'chat-container': ChatContainer;
  }
}
