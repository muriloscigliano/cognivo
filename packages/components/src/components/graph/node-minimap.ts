import { LitElement, html, css, svg } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';
import { GraphNode } from './graph-canvas.js';

/**
 * Node Minimap Component
 *
 * Mini indicator showing a node's position in a larger canvas
 *
 * @element node-minimap
 *
 * @attr {Object} node - Node to display
 * @attr {boolean} active - Whether node is active/selected
 *
 * @example
 * ```html
 * <node-minimap .node="${node}" active></node-minimap>
 * ```
 */
@customElement('node-minimap')
export class NodeMinimap extends LitElement {
  static override styles = [
    baseStyles,
    css`
      :host {
        display: inline-block;
        width: 40px;
        height: 30px;
      }

      svg {
        width: 100%;
        height: 100%;
      }

      .node-indicator {
        fill: ${tokens.color.primaryMain};
        stroke: ${tokens.color.grayWhite};
        stroke-width: 2;
        transition: all ${tokens.transition.default};
      }

      :host([active]) .node-indicator {
        fill: ${tokens.color.primaryDark};
        filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
      }

      .node-label {
        font-family: ${tokens.fontFamily.primary};
        font-size: ${tokens.fontSize.xs};
        fill: ${tokens.color.grayWhite};
        text-anchor: middle;
        dominant-baseline: middle;
      }
    `,
  ];

  @property({ type: Object })
  node: GraphNode | null = null;

  @property({ type: Boolean, reflect: true })
  active = false;

  override render() {
    if (!this.node) {
      return html`<svg></svg>`;
    }

    return html`
      <svg viewBox="0 0 40 30">
        <rect
          class="node-indicator"
          x="5"
          y="5"
          width="30"
          height="20"
          rx="4"
        />
        <text class="node-label" x="20" y="15">
          ${this.node.label?.[0] || this.node.id[0]}
        </text>
      </svg>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'node-minimap': NodeMinimap;
  }
}
