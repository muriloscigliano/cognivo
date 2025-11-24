import { LitElement, html, css, svg, PropertyValues } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

export interface GraphNode {
  id: string;
  x: number;
  y: number;
  width?: number;
  height?: number;
  label?: string;
  data?: any;
}

export interface GraphEdge {
  id: string;
  source: string;
  target: string;
  label?: string;
  data?: any;
}

export interface ViewportTransform {
  x: number;
  y: number;
  zoom: number;
}

/**
 * Graph Canvas Component
 *
 * Main canvas container for rendering node-based graphs with pan, zoom, and drag
 *
 * @element graph-canvas
 *
 * @attr {Array} nodes - Array of graph nodes
 * @attr {Array} edges - Array of graph edges
 * @attr {boolean} enable-pan - Enable panning
 * @attr {boolean} enable-zoom - Enable zooming
 * @attr {number} min-zoom - Minimum zoom level
 * @attr {number} max-zoom - Maximum zoom level
 * @attr {string} background - Canvas background pattern
 *
 * @fires node-click - Fired when a node is clicked
 * @fires edge-click - Fired when an edge is clicked
 * @fires viewport-change - Fired when viewport transforms
 *
 * @example
 * ```html
 * <graph-canvas
 *   .nodes="${nodes}"
 *   .edges="${edges}"
 *   enable-pan
 *   enable-zoom
 * ></graph-canvas>
 * ```
 */
@customElement('graph-canvas')
export class GraphCanvas extends LitElement {
  static override styles = [
    baseStyles,
    css`
      :host {
        display: block;
        width: 100%;
        height: 100%;
        position: relative;
        overflow: hidden;
        background: ${tokens.color.grayWhite};
        border-radius: ${tokens.radius.md};
      }

      .canvas-container {
        width: 100%;
        height: 100%;
        position: relative;
        cursor: grab;
      }

      .canvas-container.panning {
        cursor: grabbing;
      }

      svg {
        width: 100%;
        height: 100%;
        display: block;
      }

      .viewport {
        transition: transform 0.1s ease-out;
      }

      .background {
        fill: ${tokens.color.grayWhite};
      }

      .grid-pattern {
        stroke: ${tokens.color.gray200};
        stroke-width: 1;
        fill: none;
      }

      .dot-pattern circle {
        fill: ${tokens.color.gray300};
      }

      .node-group {
        cursor: pointer;
        transition: all ${tokens.transition.default};
      }

      .node-group:hover {
        filter: brightness(0.95);
      }

      .node-rect {
        fill: ${tokens.color.grayWhite};
        stroke: ${tokens.color.gray400};
        stroke-width: 2;
        rx: 8;
      }

      .node-selected .node-rect {
        stroke: ${tokens.color.primaryMain};
        stroke-width: 3;
      }

      .node-label {
        font-family: ${tokens.fontFamily.primary};
        font-size: ${tokens.fontSize.sm};
        fill: ${tokens.color.gray900};
        text-anchor: middle;
        dominant-baseline: middle;
        user-select: none;
      }

      .edge-path {
        fill: none;
        stroke: ${tokens.color.gray400};
        stroke-width: 2;
        transition: all ${tokens.transition.default};
      }

      .edge-path:hover {
        stroke: ${tokens.color.primaryMain};
        stroke-width: 3;
      }

      .controls {
        position: absolute;
        top: ${tokens.spacing.md};
        right: ${tokens.spacing.md};
        display: flex;
        gap: ${tokens.spacing.xs};
        z-index: 10;
      }

      .control-button {
        width: 32px;
        height: 32px;
        border-radius: ${tokens.radius.sm};
        background: ${tokens.color.grayWhite};
        border: 1px solid ${tokens.color.gray300};
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all ${tokens.transition.default};
      }

      .control-button:hover {
        background: ${tokens.color.gray50};
        border-color: ${tokens.color.primaryMain};
      }

      .control-button:active {
        transform: scale(0.95);
      }
    `,
  ];

  @property({ type: Array })
  nodes: GraphNode[] = [];

  @property({ type: Array })
  edges: GraphEdge[] = [];

  @property({ type: Boolean, attribute: 'enable-pan' })
  enablePan = true;

  @property({ type: Boolean, attribute: 'enable-zoom' })
  enableZoom = true;

  @property({ type: Number, attribute: 'min-zoom' })
  minZoom = 0.1;

  @property({ type: Number, attribute: 'max-zoom' })
  maxZoom = 4;

  @property({ type: String })
  background: 'grid' | 'dots' | 'none' = 'grid';

  @state()
  private viewport: ViewportTransform = { x: 0, y: 0, zoom: 1 };

  @state()
  private isPanning = false;

  @state()
  private panStart = { x: 0, y: 0 };

  @state()
  private selectedNodeId: string | null = null;

  @query('.canvas-container')
  private canvasContainer!: HTMLElement;

  override connectedCallback() {
    super.connectedCallback();
    this.addEventListener('wheel', this.handleWheel);
    this.addEventListener('mousedown', this.handleMouseDown);
    document.addEventListener('mousemove', this.handleMouseMove);
    document.addEventListener('mouseup', this.handleMouseUp);
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('wheel', this.handleWheel);
    this.removeEventListener('mousedown', this.handleMouseDown);
    document.removeEventListener('mousemove', this.handleMouseMove);
    document.removeEventListener('mouseup', this.handleMouseUp);
  }

  private handleWheel = (e: WheelEvent) => {
    if (!this.enableZoom) return;
    e.preventDefault();

    const delta = e.deltaY * -0.001;
    const newZoom = Math.min(this.maxZoom, Math.max(this.minZoom, this.viewport.zoom + delta));

    this.viewport = { ...this.viewport, zoom: newZoom };
    this.dispatchEvent(new CustomEvent('viewport-change', { detail: this.viewport }));
  };

  private handleMouseDown = (e: MouseEvent) => {
    if (!this.enablePan || (e.target as HTMLElement).closest('.node-group')) return;
    this.isPanning = true;
    this.panStart = { x: e.clientX - this.viewport.x, y: e.clientY - this.viewport.y };
  };

  private handleMouseMove = (e: MouseEvent) => {
    if (!this.isPanning) return;
    this.viewport = {
      ...this.viewport,
      x: e.clientX - this.panStart.x,
      y: e.clientY - this.panStart.y,
    };
  };

  private handleMouseUp = () => {
    this.isPanning = false;
  };

  private handleNodeClick(node: GraphNode) {
    this.selectedNodeId = node.id;
    this.dispatchEvent(new CustomEvent('node-click', { detail: node }));
  }

  private handleZoomIn() {
    const newZoom = Math.min(this.maxZoom, this.viewport.zoom + 0.2);
    this.viewport = { ...this.viewport, zoom: newZoom };
    this.dispatchEvent(new CustomEvent('viewport-change', { detail: this.viewport }));
  }

  private handleZoomOut() {
    const newZoom = Math.max(this.minZoom, this.viewport.zoom - 0.2);
    this.viewport = { ...this.viewport, zoom: newZoom };
    this.dispatchEvent(new CustomEvent('viewport-change', { detail: this.viewport }));
  }

  private handleResetView() {
    this.viewport = { x: 0, y: 0, zoom: 1 };
    this.dispatchEvent(new CustomEvent('viewport-change', { detail: this.viewport }));
  }

  private renderBackground() {
    const size = 20;
    const largeSize = 100;

    if (this.background === 'grid') {
      return svg`
        <defs>
          <pattern id="grid" width="${size}" height="${size}" patternUnits="userSpaceOnUse">
            <path d="M ${size} 0 L 0 0 0 ${size}" class="grid-pattern"/>
          </pattern>
          <pattern id="grid-large" width="${largeSize}" height="${largeSize}" patternUnits="userSpaceOnUse">
            <rect width="${largeSize}" height="${largeSize}" fill="url(#grid)"/>
            <path d="M ${largeSize} 0 L 0 0 0 ${largeSize}" class="grid-pattern" stroke-width="2"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid-large)"/>
      `;
    } else if (this.background === 'dots') {
      return svg`
        <defs>
          <pattern id="dots" width="${size}" height="${size}" patternUnits="userSpaceOnUse">
            <circle class="dot-pattern" cx="${size / 2}" cy="${size / 2}" r="1"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dots)"/>
      `;
    }
    return svg`<rect class="background" width="100%" height="100%"/>`;
  }

  private renderEdges() {
    return this.edges.map(edge => {
      const sourceNode = this.nodes.find(n => n.id === edge.source);
      const targetNode = this.nodes.find(n => n.id === edge.target);

      if (!sourceNode || !targetNode) return null;

      const sourceX = sourceNode.x + (sourceNode.width || 120) / 2;
      const sourceY = sourceNode.y + (sourceNode.height || 60) / 2;
      const targetX = targetNode.x + (targetNode.width || 120) / 2;
      const targetY = targetNode.y + (targetNode.height || 60) / 2;

      return svg`
        <path
          class="edge-path"
          d="M ${sourceX} ${sourceY} L ${targetX} ${targetY}"
          marker-end="url(#arrowhead)"
        />
      `;
    });
  }

  private renderNodes() {
    return this.nodes.map(node => {
      const width = node.width || 120;
      const height = node.height || 60;
      const isSelected = this.selectedNodeId === node.id;

      return svg`
        <g
          class="node-group ${isSelected ? 'node-selected' : ''}"
          @click="${() => this.handleNodeClick(node)}"
        >
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
        </g>
      `;
    });
  }

  override render() {
    const transform = `translate(${this.viewport.x}px, ${this.viewport.y}px) scale(${this.viewport.zoom})`;

    return html`
      <div class="canvas-container ${this.isPanning ? 'panning' : ''}">
        <svg>
          <defs>
            <marker
              id="arrowhead"
              markerWidth="10"
              markerHeight="10"
              refX="9"
              refY="3"
              orient="auto"
            >
              <polygon points="0 0, 10 3, 0 6" fill="${tokens.color.gray400}" />
            </marker>
          </defs>
          ${this.renderBackground()}
          <g class="viewport" style="transform: ${transform}">
            <g class="edges">${this.renderEdges()}</g>
            <g class="nodes">${this.renderNodes()}</g>
          </g>
        </svg>
        <div class="controls">
          <div class="control-button" @click="${this.handleZoomIn}" title="Zoom In">+</div>
          <div class="control-button" @click="${this.handleZoomOut}" title="Zoom Out">−</div>
          <div class="control-button" @click="${this.handleResetView}" title="Reset View">⊙</div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'graph-canvas': GraphCanvas;
  }
}
