import { LitElement, html, css, svg } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';
import { GraphNode as Node, GraphEdge as Edge } from './graph-canvas.js';

/**
 * GanttChart Component
 *
 * @element gantt-chart
 */
@customElement('gantt-chart')
export class GanttChart extends LitElement {
  static override styles = [
    baseStyles,
    css`
host {
      display: block;
      width: 100%;
      height: 100%;
      background: ${tokens.color.grayWhite};
      border-radius: ${tokens.radius.md};
    }
    svg {
      width: 100%;
      height: 100%;
    }`,
  ];

  @property({ type: Array })
  nodes: Node[] = [];

  @property({ type: Array })
  edges: Edge[] = [];

  override render() {
    return html`
      <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid meet">
        <g class="nodes">
          ${this.nodes.map(node => svg`
            <rect
              x="${node.x}"
              y="${node.y}"
              width="${node.width || 120}"
              height="${node.height || 60}"
              fill="${tokens.color.grayWhite}"
              stroke="${tokens.color.primaryMain}"
              stroke-width="2"
              rx="8"
            />
            <text
              x="${node.x + (node.width || 120) / 2}"
              y="${node.y + (node.height || 60) / 2}"
              text-anchor="middle"
              dominant-baseline="middle"
              fill="${tokens.color.gray900}"
              font-family="${tokens.fontFamily.primary}"
              font-size="${tokens.fontSize.sm}"
            >
              ${node.label || node.id}
            </text>
          `)}
        </g>
        <g class="edges">
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
                x1="${sx}"
                y1="${sy}"
                x2="${tx}"
                y2="${ty}"
                stroke="${tokens.color.gray500}"
                stroke-width="2"
              />
            `;
          })}
        </g>
      </svg>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'gantt-chart': GanttChart;
  }
}
