import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

@customElement('popover')
export class Popover extends LitElement {
  static override styles = [
    baseStyles,
    css`:host {
      display: none;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      z-index: 1000;
    }
    :host([open]) {
      display: flex;
    }
    .panel {
      background: inherit;
      border-radius: var(--cg-Border-radius-150);
      padding: var(--cg-spacing-24);
      max-width: 600px;
      margin: auto;
    }`
  ];

  @property({ type: Boolean, reflect: true }) open = false;

  override render() {
    return html`
      <div class="panel">
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'popover': Popover;
  }
}
