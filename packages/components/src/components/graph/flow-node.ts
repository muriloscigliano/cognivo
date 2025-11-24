import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

/**
 * FlowNode Component
 *
 * @element flow-node
 */
@customElement('flow-node')
export class FlowNode extends LitElement {
  static override styles = [
    baseStyles,
    css`
host {
      display: block;
      background: ${tokens.color.grayWhite};
      border-radius: ${tokens.radius.md};
      padding: ${tokens.spacing.md};
    }`,
  ];

  @property({ type: Object })
  data: any = {};

  override render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'flow-node': FlowNode;
  }
}
