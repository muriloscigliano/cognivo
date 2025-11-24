import { LitElement, html, css, svg } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

/**
 * Graph Edge Component
 *
 * Base edge/connection between nodes
 *
 * @element graph-edge
 *
 * @attr {Object} source - Source position {x, y}
 * @attr {Object} target - Target position {x, y}
 * @attr {string} type - Edge type: 'straight', 'curved', 'orthogonal'
 * @attr {string} label - Edge label
 *
 * @example
 * ```html
 * <graph-edge
 *   .source="${{x: 100, y: 100}}"
 *   .target="${{x: 300, y: 200}}"
 *   type="curved"
 *   label="connects"
 * ></graph-edge>
 * ```
 */
@customElement('graph-edge')
export class GraphEdge extends LitElement {
  static override styles = [
    baseStyles,
    css`
      :host {
        display: block;
        position: absolute;
        pointer-events: none;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }

      svg {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: visible;
      }

      .edge-path {
        fill: none;
        stroke: ${tokens.color.gray400};
        stroke-width: 2;
        pointer-events: stroke;
        transition: all ${tokens.transition.default};
      }

      .edge-path:hover {
        stroke: ${tokens.color.primaryMain};
        stroke-width: 3;
      }

      .edge-label {
        font-family: ${tokens.fontFamily.primary};
        font-size: ${tokens.fontSize.xs};
        fill: ${tokens.color.gray700};
        text-anchor: middle;
        dominant-baseline: middle;
        pointer-events: none;
      }
    `,
  ];

  @property({ type: Object })
  source = { x: 0, y: 0 };

  @property({ type: Object })
  target = { x: 0, y: 0 };

  @property({ type: String })
  type: 'straight' | 'curved' | 'orthogonal' = 'straight';

  @property({ type: String })
  label = '';

  private getPath(): string {
    const sx = this.source.x;
    const sy = this.source.y;
    const tx = this.target.x;
    const ty = this.target.y;

    if (this.type === 'straight') {
      return `M ${sx} ${sy} L ${tx} ${ty}`;
    } else if (this.type === 'curved') {
      const dx = tx - sx;
      const dy = ty - sy;
      const midX = sx + dx / 2;
      const midY = sy + dy / 2;
      return `M ${sx} ${sy} Q ${midX} ${sy}, ${midX} ${midY} T ${tx} ${ty}`;
    } else {
      const midX = (sx + tx) / 2;
      return `M ${sx} ${sy} L ${midX} ${sy} L ${midX} ${ty} L ${tx} ${ty}`;
    }
  }

  override render() {
    const path = this.getPath();
    const midX = (this.source.x + this.target.x) / 2;
    const midY = (this.source.y + this.target.y) / 2;

    return html`
      <svg>
        <defs>
          <marker
            id="edge-arrow"
            markerWidth="10"
            markerHeight="10"
            refX="9"
            refY="3"
            orient="auto"
          >
            <polygon points="0 0, 10 3, 0 6" fill="${tokens.color.gray400}" />
          </marker>
        </defs>
        <path class="edge-path" d="${path}" marker-end="url(#edge-arrow)" />
        ${this.label ? svg`
          <text class="edge-label" x="${midX}" y="${midY}">
            ${this.label}
          </text>
        ` : null}
      </svg>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'graph-edge': GraphEdge;
  }
}
