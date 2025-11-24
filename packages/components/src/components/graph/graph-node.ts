import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

export interface NodeData {
  id: string;
  label?: string;
  type?: string;
  data?: any;
}

/**
 * Graph Node Component
 *
 * Base graph node with dragging, selection, and interaction
 *
 * @element graph-node
 *
 * @attr {Object} node - Node data
 * @attr {boolean} selected - Whether node is selected
 * @attr {boolean} draggable - Enable dragging
 * @attr {number} x - X position
 * @attr {number} y - Y position
 *
 * @fires node-click - Fired when node is clicked
 * @fires node-drag - Fired when node is dragged
 *
 * @example
 * ```html
 * <graph-node
 *   .node="${node}"
 *   x="100"
 *   y="100"
 *   draggable
 * ></graph-node>
 * ```
 */
@customElement('graph-node')
export class GraphNode extends LitElement {
  static override styles = [
    baseStyles,
    css`
      :host {
        display: block;
        position: absolute;
        cursor: pointer;
      }

      :host([draggable]) {
        cursor: move;
      }

      .node-container {
        min-width: 120px;
        min-height: 60px;
        background: ${tokens.color.grayWhite};
        border: 2px solid ${tokens.color.gray400};
        border-radius: ${tokens.radius.md};
        padding: ${tokens.spacing.md};
        transition: all ${tokens.transition.default};
        box-shadow: ${tokens.shadow.sm};
      }

      :host([selected]) .node-container {
        border-color: ${tokens.color.primaryMain};
        box-shadow: ${tokens.shadow.lg};
      }

      .node-container:hover {
        border-color: ${tokens.color.primaryMain};
        box-shadow: ${tokens.shadow.md};
      }

      .node-label {
        font-family: ${tokens.fontFamily.primary};
        font-size: ${tokens.fontSize.sm};
        font-weight: ${tokens.fontWeight.semibold};
        color: ${tokens.color.gray900};
        text-align: center;
      }

      .node-content {
        margin-top: ${tokens.spacing.xs};
        font-family: ${tokens.fontFamily.primary};
        font-size: ${tokens.fontSize.xs};
        color: ${tokens.color.gray700};
      }
    `,
  ];

  @property({ type: Object })
  node: NodeData = { id: '', label: 'Node' };

  @property({ type: Boolean, reflect: true })
  selected = false;

  @property({ type: Boolean, reflect: true })
  draggable = true;

  @property({ type: Number })
  x = 0;

  @property({ type: Number })
  y = 0;

  override connectedCallback() {
    super.connectedCallback();
    this.style.left = `${this.x}px`;
    this.style.top = `${this.y}px`;
  }

  override updated(changedProperties: Map<string, any>) {
    if (changedProperties.has('x') || changedProperties.has('y')) {
      this.style.left = `${this.x}px`;
      this.style.top = `${this.y}px`;
    }
  }

  private handleClick(e: MouseEvent) {
    e.stopPropagation();
    this.dispatchEvent(new CustomEvent('node-click', { detail: { node: this.node } }));
  }

  override render() {
    return html`
      <div class="node-container" @click="${this.handleClick}">
        <div class="node-label">${this.node.label || this.node.id}</div>
        ${this.node.data ? html`
          <div class="node-content">
            <slot></slot>
          </div>
        ` : null}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'graph-node': GraphNode;
  }
}
