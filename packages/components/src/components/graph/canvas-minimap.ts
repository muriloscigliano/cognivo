import { LitElement, html, css, svg } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';
import { GraphNode, GraphEdge } from './graph-canvas.js';

/**
 * Canvas Minimap Component
 *
 * Mini overview map of canvas showing nodes and viewport
 *
 * @element canvas-minimap
 *
 * @attr {Array} nodes - Array of nodes to display
 * @attr {Array} edges - Array of edges to display
 * @attr {Object} viewport - Current viewport position and zoom
 * @attr {number} width - Minimap width
 * @attr {number} height - Minimap height
 *
 * @fires viewport-click - Fired when minimap is clicked
 *
 * @example
 * ```html
 * <canvas-minimap
 *   .nodes="${nodes}"
 *   .edges="${edges}"
 *   .viewport="${viewport}"
 *   width="200"
 *   height="150"
 * ></canvas-minimap>
 * ```
 */
@customElement('canvas-minimap')
export class CanvasMinimap extends LitElement {
  static override styles = [
    baseStyles,
    css`
      :host {
        display: block;
        width: 200px;
        height: 150px;
        background: ${tokens.color.gray50};
        border: 2px solid ${tokens.color.gray100};
        border-radius: ${tokens.radius.md};
        overflow: hidden;
        box-shadow: ${tokens.shadow.lg};
      }

      svg {
        width: 100%;
        height: 100%;
        cursor: pointer;
      }

      .minimap-node {
        fill: ${tokens.color.primaryMain};
        opacity: 0.6;
      }

      .minimap-edge {
        stroke: ${tokens.color.gray500};
        stroke-width: 1;
        opacity: 0.4;
      }

      .viewport-rect {
        fill: ${tokens.color.primaryLight};
        stroke: ${tokens.color.primaryMain};
        stroke-width: 2;
        opacity: 0.3;
        cursor: move;
      }

      .viewport-rect:hover {
        opacity: 0.5;
      }
    `,
  ];

  @property({ type: Array })
  nodes: GraphNode[] = [];

  @property({ type: Array })
  edges: GraphEdge[] = [];

  @property({ type: Object })
  viewport = { x: 0, y: 0, zoom: 1, width: 800, height: 600 };

  @property({ type: Number })
  width = 200;

  @property({ type: Number })
  height = 150;

  private getBounds() {
    if (this.nodes.length === 0) {
      return { minX: 0, minY: 0, maxX: 800, maxY: 600 };
    }

    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;

    this.nodes.forEach(node => {
      const w = node.width || 120;
      const h = node.height || 60;
      minX = Math.min(minX, node.x);
      minY = Math.min(minY, node.y);
      maxX = Math.max(maxX, node.x + w);
      maxY = Math.max(maxY, node.y + h);
    });

    return { minX, minY, maxX, maxY };
  }

  private handleClick(e: MouseEvent) {
    const svg = e.currentTarget as SVGElement;
    const rect = svg.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * this.viewport.width;
    const y = ((e.clientY - rect.top) / rect.height) * this.viewport.height;

    this.dispatchEvent(
      new CustomEvent('viewport-click', {
        detail: { x, y },
      })
    );
  }

  override render() {
    const bounds = this.getBounds();
    const viewBox = `${bounds.minX} ${bounds.minY} ${bounds.maxX - bounds.minX} ${bounds.maxY - bounds.minY}`;

    return html`
      <svg viewBox="${viewBox}" @click="${this.handleClick}">
        <!-- Edges -->
        <g class="minimap-edges">
          ${this.edges.map(edge => {
            const source = this.nodes.find(n => n.id === edge.source);
            const target = this.nodes.find(n => n.id === edge.target);
            if (!source || !target) return null;

            const sx = source.x + (source.width || 120) / 2;
            const sy = source.y + (source.height || 60) / 2;
            const tx = target.x + (target.width || 120) / 2;
            const ty = target.y + (target.height || 60) / 2;

            return svg`
              <line
                class="minimap-edge"
                x1="${sx}"
                y1="${sy}"
                x2="${tx}"
                y2="${ty}"
              />
            `;
          })}
        </g>

        <!-- Nodes -->
        <g class="minimap-nodes">
          ${this.nodes.map(node => svg`
            <rect
              class="minimap-node"
              x="${node.x}"
              y="${node.y}"
              width="${node.width || 120}"
              height="${node.height || 60}"
              rx="2"
            />
          `)}
        </g>

        <!-- Viewport indicator -->
        <rect
          class="viewport-rect"
          x="${-this.viewport.x / this.viewport.zoom}"
          y="${-this.viewport.y / this.viewport.zoom}"
          width="${this.viewport.width / this.viewport.zoom}"
          height="${this.viewport.height / this.viewport.zoom}"
        />
      </svg>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'canvas-minimap': CanvasMinimap;
  }
}
