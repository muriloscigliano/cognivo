import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

/**
 * Graph Port Component
 *
 * Connection port on nodes for edges
 *
 * @element graph-port
 */
@customElement('graph-port')
export class GraphPort extends LitElement {
  static override styles = [
    baseStyles,
    css`
      :host {
        display: inline-block;
        width: 16px;
        height: 16px;
      }

      .port {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background: ${tokens.color.grayWhite};
        border: 2px solid ${tokens.color.primaryMain};
        cursor: crosshair;
        transition: all ${tokens.transition.default};
      }

      .port:hover {
        background: ${tokens.color.primaryMain};
        transform: scale(1.3);
      }
    `,
  ];

  @property({ type: String })
  type: 'input' | 'output' = 'output';

  override render() {
    return html`<div class="port"></div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'graph-port': GraphPort;
  }
}
