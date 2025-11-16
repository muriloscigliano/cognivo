import { LitElement, html, css, svg } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

@customElement('network-node')
export class NetworkNode extends LitElement {
  static override styles = [
    baseStyles,
    css`:host {
      display: block;
      position: relative;
    }
    svg {
      width: 100%;
      height: 100%;
    }`
  ];

  @property({ type: Array }) nodes = [];
  @property({ type: Array }) edges = [];
  @state() private zoom = 1;

  override render() {
    return html`<svg><slot></slot></svg>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'network-node': NetworkNode;
  }
}
