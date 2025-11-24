import { LitElement, html, css, svg } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';
import { GraphNode, GraphEdge } from './graph-canvas.js';

export interface FlowNode extends GraphNode {
  type?: 'input' | 'output' | 'process' | 'decision';
}

/**
 * Flow Canvas Component
 *
 * Canvas for flow diagrams and process visualizations
 *
 * @element flow-canvas
 *
 * @attr {Array} nodes - Array of flow nodes
 * @attr {Array} edges - Array of flow connections
 * @attr {boolean} enable-snap - Enable snap-to-grid
 * @attr {number} grid-size - Grid size for snapping
 *
 * @example
 * ```html
 * <flow-canvas
 *   .nodes="${nodes}"
 *   .edges="${edges}"
 *   enable-snap
 *   grid-size="20"
 * ></flow-canvas>
 * ```
 */
@customElement('flow-canvas')
export class FlowCanvas extends LitElement {
  static override styles = [
    baseStyles,
    css`
      :host {
        display: block;
        width: 100%;
        height: 100%;
        background: ${tokens.color.gray50};
        border-radius: ${tokens.radius.md};
        position: relative;
      }

      svg {
        width: 100%;
        height: 100%;
      }

      .grid {
        stroke: ${tokens.color.gray100};
        stroke-width: 1;
      }

      .node {
        cursor: move;
        transition: all ${tokens.transition.default};
      }

      .node:hover {
        filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.15));
      }

      .node.dragging {
        opacity: 0.7;
      }

      .node-shape {
        fill: ${tokens.color.grayWhite};
        stroke: ${tokens.color.primaryMain};
        stroke-width: 2;
      }

      .node-input .node-shape {
        fill: ${tokens.color.success};
      }

      .node-output .node-shape {
        fill: ${tokens.color.infoLight};
      }

      .node-process .node-shape {
        fill: ${tokens.color.grayWhite};
      }

      .node-decision .node-shape {
        fill: ${tokens.color.warning};
      }

      .node-label {
        font-family: ${tokens.fontFamily.primary};
        font-size: ${tokens.fontSize.sm};
        fill: ${tokens.color.gray900};
        text-anchor: middle;
        dominant-baseline: middle;
        pointer-events: none;
      }

      .edge {
        fill: none;
        stroke: ${tokens.color.gray500};
        stroke-width: 2;
        transition: all ${tokens.transition.default};
        marker-end: url(#flow-arrow);
      }

      .edge:hover {
        stroke: ${tokens.color.primaryMain};
        stroke-width: 3;
      }

      .handle {
        fill: ${tokens.color.primaryMain};
        stroke: ${tokens.color.grayWhite};
        stroke-width: 2;
        cursor: crosshair;
        opacity: 0;
        transition: all ${tokens.transition.default};
      }

      .node:hover .handle {
        opacity: 1;
      }
    `,
  ];

  @property({ type: Array })
  nodes: FlowNode[] = [];

  @property({ type: Array })
  edges: GraphEdge[] = [];

  @property({ type: Boolean, attribute: 'enable-snap' })
  enableSnap = false;

  @property({ type: Number, attribute: 'grid-size' })
  gridSize = 20;

  @state()
  private draggingNode: FlowNode | null = null;

  @state()
  private dragOffset = { x: 0, y: 0 };

  private handleNodeMouseDown(node: FlowNode, e: MouseEvent) {
    this.draggingNode = node;
    const svgPoint = this.getSVGPoint(e);
    this.dragOffset = {
      x: svgPoint.x - node.x,
      y: svgPoint.y - node.y,
    };
  }

  private handleMouseMove = (e: MouseEvent) => {
    if (!this.draggingNode) return;

    const svgPoint = this.getSVGPoint(e);
    let newX = svgPoint.x - this.dragOffset.x;
    let newY = svgPoint.y - this.dragOffset.y;

    if (this.enableSnap) {
      newX = Math.round(newX / this.gridSize) * this.gridSize;
      newY = Math.round(newY / this.gridSize) * this.gridSize;
    }

    this.nodes = this.nodes.map(n =>
      n.id === this.draggingNode!.id ? { ...n, x: newX, y: newY } : n
    );
  };

  private handleMouseUp = () => {
    this.draggingNode = null;
  };

  private getSVGPoint(e: MouseEvent): { x: number; y: number } {
    const svg = this.shadowRoot?.querySelector('svg');
    if (!svg) return { x: 0, y: 0 };

    const rect = svg.getBoundingClientRect();
    const viewBox = svg.viewBox.baseVal;
    const scaleX = viewBox.width / rect.width;
    const scaleY = viewBox.height / rect.height;

    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  }

  override connectedCallback() {
    super.connectedCallback();
    document.addEventListener('mousemove', this.handleMouseMove);
    document.addEventListener('mouseup', this.handleMouseUp);
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('mousemove', this.handleMouseMove);
    document.removeEventListener('mouseup', this.handleMouseUp);
  }

  private renderGrid() {
    const gridLines = [];
    for (let i = 0; i <= 800; i += this.gridSize) {
      gridLines.push(svg`<line class="grid" x1="${i}" y1="0" x2="${i}" y2="600" />`);
    }
    for (let i = 0; i <= 600; i += this.gridSize) {
      gridLines.push(svg`<line class="grid" x1="0" y1="${i}" x2="800" y2="${i}" />`);
    }
    return gridLines;
  }

  private renderNodeShape(node: FlowNode, width: number, height: number) {
    const cx = node.x + width / 2;
    const cy = node.y + height / 2;

    switch (node.type) {
      case 'input':
      case 'output':
        return svg`<ellipse class="node-shape" cx="${cx}" cy="${cy}" rx="${width / 2}" ry="${height / 2}" />`;
      case 'decision':
        const points = `${cx},${node.y} ${node.x + width},${cy} ${cx},${node.y + height} ${node.x},${cy}`;
        return svg`<polygon class="node-shape" points="${points}" />`;
      default:
        return svg`<rect class="node-shape" x="${node.x}" y="${node.y}" width="${width}" height="${height}" rx="8" />`;
    }
  }

  private renderNodes() {
    return this.nodes.map(node => {
      const width = node.width || 120;
      const height = node.height || 60;
      const isDragging = this.draggingNode?.id === node.id;

      return svg`
        <g
          class="node node-${node.type || 'process'} ${isDragging ? 'dragging' : ''}"
          @mousedown="${(e: MouseEvent) => this.handleNodeMouseDown(node, e)}"
        >
          ${this.renderNodeShape(node, width, height)}
          <text
            class="node-label"
            x="${node.x + width / 2}"
            y="${node.y + height / 2}"
          >
            ${node.label || node.id}
          </text>
          <!-- Connection handles -->
          <circle class="handle" cx="${node.x + width / 2}" cy="${node.y}" r="6" />
          <circle class="handle" cx="${node.x + width}" cy="${node.y + height / 2}" r="6" />
          <circle class="handle" cx="${node.x + width / 2}" cy="${node.y + height}" r="6" />
          <circle class="handle" cx="${node.x}" cy="${node.y + height / 2}" r="6" />
        </g>
      `;
    });
  }

  private renderEdges() {
    return this.edges.map(edge => {
      const sourceNode = this.nodes.find(n => n.id === edge.source);
      const targetNode = this.nodes.find(n => n.id === edge.target);

      if (!sourceNode || !targetNode) return null;

      const sw = sourceNode.width || 120;
      const sh = sourceNode.height || 60;
      const tw = targetNode.width || 120;
      const th = targetNode.height || 60;

      const sx = sourceNode.x + sw / 2;
      const sy = sourceNode.y + sh / 2;
      const tx = targetNode.x + tw / 2;
      const ty = targetNode.y + th / 2;

      const dx = tx - sx;
      const dy = ty - sy;
      const midX = sx + dx / 2;
      const midY = sy + dy / 2;

      const path = `M ${sx} ${sy} Q ${midX} ${sy}, ${midX} ${midY} T ${tx} ${ty}`;

      return svg`<path class="edge" d="${path}" />`;
    });
  }

  override render() {
    return html`
      <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid meet">
        <defs>
          <marker
            id="flow-arrow"
            markerWidth="10"
            markerHeight="10"
            refX="9"
            refY="3"
            orient="auto"
          >
            <polygon points="0 0, 10 3, 0 6" fill="${tokens.color.gray500}" />
          </marker>
        </defs>
        ${this.enableSnap ? this.renderGrid() : null}
        <g class="edges">${this.renderEdges()}</g>
        <g class="nodes">${this.renderNodes()}</g>
      </svg>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'flow-canvas': FlowCanvas;
  }
}
