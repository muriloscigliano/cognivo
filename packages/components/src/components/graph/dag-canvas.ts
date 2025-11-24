import { LitElement, html, css, svg } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';
import { GraphNode, GraphEdge } from './graph-canvas.js';

export interface DAGNode extends GraphNode {
  level?: number;
  inputs?: string[];
  outputs?: string[];
}

/**
 * DAG Canvas Component
 *
 * Directed Acyclic Graph canvas with automatic hierarchical layout
 *
 * @element dag-canvas
 *
 * @attr {Array} nodes - Array of DAG nodes
 * @attr {Array} edges - Array of directed edges
 * @attr {string} direction - Layout direction: 'horizontal' or 'vertical'
 * @attr {boolean} auto-layout - Enable automatic hierarchical layout
 *
 * @example
 * ```html
 * <dag-canvas
 *   .nodes="${nodes}"
 *   .edges="${edges}"
 *   direction="horizontal"
 *   auto-layout
 * ></dag-canvas>
 * ```
 */
@customElement('dag-canvas')
export class DAGCanvas extends LitElement {
  static override styles = [
    baseStyles,
    css`
      :host {
        display: block;
        width: 100%;
        height: 100%;
        background: ${tokens.color.grayWhite};
        border-radius: ${tokens.radius.md};
      }

      svg {
        width: 100%;
        height: 100%;
      }

      .node {
        cursor: pointer;
        transition: all ${tokens.transition.default};
      }

      .node:hover {
        filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1));
      }

      .node-rect {
        fill: ${tokens.color.grayWhite};
        stroke: ${tokens.color.primaryMain};
        stroke-width: 2;
        rx: 8;
      }

      .node-label {
        font-family: ${tokens.fontFamily.primary};
        font-size: ${tokens.fontSize.sm};
        fill: ${tokens.color.gray900};
        text-anchor: middle;
        dominant-baseline: middle;
      }

      .edge {
        fill: none;
        stroke: ${tokens.color.gray400};
        stroke-width: 2;
        marker-end: url(#dag-arrow);
      }

      .edge-animated {
        stroke-dasharray: 5, 5;
        animation: dash 20s linear infinite;
      }

      @keyframes dash {
        to {
          stroke-dashoffset: -200;
        }
      }

      .port {
        fill: ${tokens.color.grayWhite};
        stroke: ${tokens.color.primaryMain};
        stroke-width: 2;
        transition: all ${tokens.transition.default};
      }

      .port:hover {
        fill: ${tokens.color.primaryMain};
        transform: scale(1.2);
      }

      .level-label {
        font-family: ${tokens.fontFamily.primary};
        font-size: ${tokens.fontSize.xs};
        fill: ${tokens.color.gray500};
        text-anchor: middle;
      }
    `,
  ];

  @property({ type: Array })
  nodes: DAGNode[] = [];

  @property({ type: Array })
  edges: GraphEdge[] = [];

  @property({ type: String })
  direction: 'horizontal' | 'vertical' = 'horizontal';

  @property({ type: Boolean, attribute: 'auto-layout' })
  autoLayout = true;

  @state()
  private layoutNodes: DAGNode[] = [];

  override willUpdate(changedProperties: Map<string, any>) {
    if (changedProperties.has('nodes') || changedProperties.has('edges') || changedProperties.has('direction')) {
      if (this.autoLayout) {
        this.layoutNodes = this.calculateLayout();
      } else {
        this.layoutNodes = this.nodes;
      }
    }
  }

  private calculateLayout(): DAGNode[] {
    // Calculate node levels (topological sort)
    const levels = this.calculateLevels();
    const nodeWidth = 140;
    const nodeHeight = 70;
    const levelSpacing = 200;
    const nodeSpacing = 100;

    const levelGroups = new Map<number, DAGNode[]>();
    levels.forEach((level, nodeId) => {
      const node = this.nodes.find(n => n.id === nodeId);
      if (node) {
        if (!levelGroups.has(level)) {
          levelGroups.set(level, []);
        }
        levelGroups.get(level)!.push({ ...node, level });
      }
    });

    const layoutedNodes: DAGNode[] = [];
    levelGroups.forEach((nodesInLevel, level) => {
      nodesInLevel.forEach((node, index) => {
        if (this.direction === 'horizontal') {
          layoutedNodes.push({
            ...node,
            x: level * levelSpacing + 50,
            y: index * nodeSpacing + 50,
            width: nodeWidth,
            height: nodeHeight,
          });
        } else {
          layoutedNodes.push({
            ...node,
            x: index * nodeSpacing + 50,
            y: level * levelSpacing + 50,
            width: nodeWidth,
            height: nodeHeight,
          });
        }
      });
    });

    return layoutedNodes;
  }

  private calculateLevels(): Map<string, number> {
    const levels = new Map<string, number>();
    const visited = new Set<string>();
    const inDegree = new Map<string, number>();

    // Calculate in-degrees
    this.nodes.forEach(node => inDegree.set(node.id, 0));
    this.edges.forEach(edge => {
      inDegree.set(edge.target, (inDegree.get(edge.target) || 0) + 1);
    });

    // BFS to assign levels
    const queue: string[] = [];
    this.nodes.forEach(node => {
      if (inDegree.get(node.id) === 0) {
        queue.push(node.id);
        levels.set(node.id, 0);
      }
    });

    while (queue.length > 0) {
      const nodeId = queue.shift()!;
      const currentLevel = levels.get(nodeId) || 0;
      visited.add(nodeId);

      // Find all outgoing edges
      this.edges
        .filter(edge => edge.source === nodeId)
        .forEach(edge => {
          const targetLevel = levels.get(edge.target) || 0;
          levels.set(edge.target, Math.max(targetLevel, currentLevel + 1));

          inDegree.set(edge.target, inDegree.get(edge.target)! - 1);
          if (inDegree.get(edge.target) === 0 && !visited.has(edge.target)) {
            queue.push(edge.target);
          }
        });
    }

    return levels;
  }

  private renderEdges() {
    return this.edges.map(edge => {
      const sourceNode = this.layoutNodes.find(n => n.id === edge.source);
      const targetNode = this.layoutNodes.find(n => n.id === edge.target);

      if (!sourceNode || !targetNode) return null;

      const sw = sourceNode.width || 140;
      const sh = sourceNode.height || 70;
      const tw = targetNode.width || 140;
      const th = targetNode.height || 70;

      let sx: number, sy: number, tx: number, ty: number, path: string;

      if (this.direction === 'horizontal') {
        sx = sourceNode.x + sw;
        sy = sourceNode.y + sh / 2;
        tx = targetNode.x;
        ty = targetNode.y + th / 2;
        const midX = (sx + tx) / 2;
        path = `M ${sx} ${sy} C ${midX} ${sy}, ${midX} ${ty}, ${tx} ${ty}`;
      } else {
        sx = sourceNode.x + sw / 2;
        sy = sourceNode.y + sh;
        tx = targetNode.x + tw / 2;
        ty = targetNode.y;
        const midY = (sy + ty) / 2;
        path = `M ${sx} ${sy} C ${sx} ${midY}, ${tx} ${midY}, ${tx} ${ty}`;
      }

      return svg`
        <path class="edge" d="${path}" />
      `;
    });
  }

  private renderNodes() {
    return this.layoutNodes.map(node => {
      const width = node.width || 140;
      const height = node.height || 70;

      return svg`
        <g class="node">
          <rect
            class="node-rect"
            x="${node.x}"
            y="${node.y}"
            width="${width}"
            height="${height}"
          />
          <text
            class="node-label"
            x="${node.x + width / 2}"
            y="${node.y + height / 2}"
          >
            ${node.label || node.id}
          </text>
          ${node.level !== undefined ? svg`
            <text
              class="level-label"
              x="${node.x + width / 2}"
              y="${node.y - 8}"
            >
              Level ${node.level}
            </text>
          ` : null}
        </g>
      `;
    });
  }

  override render() {
    const viewBox = this.direction === 'horizontal' ? '0 0 800 600' : '0 0 600 800';

    return html`
      <svg viewBox="${viewBox}" preserveAspectRatio="xMidYMid meet">
        <defs>
          <marker
            id="dag-arrow"
            markerWidth="10"
            markerHeight="10"
            refX="9"
            refY="3"
            orient="auto"
          >
            <polygon points="0 0, 10 3, 0 6" fill="${tokens.color.gray400}" />
          </marker>
        </defs>
        <g class="edges">${this.renderEdges()}</g>
        <g class="nodes">${this.renderNodes()}</g>
      </svg>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dag-canvas': DAGCanvas;
  }
}
