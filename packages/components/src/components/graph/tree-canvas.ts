import { LitElement, html, css, svg } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';
import { GraphNode } from './graph-canvas.js';

export interface TreeNode extends GraphNode {
  children?: string[];
  parent?: string;
  collapsed?: boolean;
}

/**
 * Tree Canvas Component
 *
 * Canvas for hierarchical tree visualizations
 *
 * @element tree-canvas
 *
 * @attr {Array} nodes - Array of tree nodes
 * @attr {string} orientation - 'vertical' or 'horizontal'
 * @attr {boolean} collapsible - Enable node collapse/expand
 *
 * @example
 * ```html
 * <tree-canvas
 *   .nodes="${nodes}"
 *   orientation="vertical"
 *   collapsible
 * ></tree-canvas>
 * ```
 */
@customElement('tree-canvas')
export class TreeCanvas extends LitElement {
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

      .node-collapsed .node-rect {
        fill: ${tokens.color.gray100};
      }

      .node-label {
        font-family: ${tokens.fontFamily.primary};
        font-size: ${tokens.fontSize.sm};
        fill: ${tokens.color.gray900};
        text-anchor: middle;
        dominant-baseline: middle;
      }

      .branch {
        fill: none;
        stroke: ${tokens.color.gray500};
        stroke-width: 2;
      }

      .expand-icon {
        fill: ${tokens.color.primaryMain};
        font-family: ${tokens.fontFamily.primary};
        font-size: ${tokens.fontSize.md};
        text-anchor: middle;
        dominant-baseline: middle;
      }
    `,
  ];

  @property({ type: Array })
  nodes: TreeNode[] = [];

  @property({ type: String })
  orientation: 'vertical' | 'horizontal' = 'vertical';

  @property({ type: Boolean })
  collapsible = true;

  @state()
  private layoutNodes: TreeNode[] = [];

  override willUpdate(changedProperties: Map<string, any>) {
    if (changedProperties.has('nodes') || changedProperties.has('orientation')) {
      this.layoutNodes = this.calculateTreeLayout();
    }
  }

  private calculateTreeLayout(): TreeNode[] {
    // Find root nodes (nodes without parents)
    const rootNodes = this.nodes.filter(n => !n.parent);
    const nodeWidth = 120;
    const nodeHeight = 60;
    const levelSpacing = 150;
    const siblingSpacing = 80;

    const layout: TreeNode[] = [];
    const visited = new Set<string>();

    const layoutSubtree = (nodeId: string, level: number, position: number): number => {
      const node = this.nodes.find(n => n.id === nodeId);
      if (!node || visited.has(nodeId) || node.collapsed) return position;

      visited.add(nodeId);

      // Get children
      const children = this.nodes.filter(n => n.parent === nodeId);
      let childPosition = position;

      // Layout children first (post-order)
      children.forEach(child => {
        childPosition = layoutSubtree(child.id, level + 1, childPosition);
      });

      // Calculate node position
      let x, y;
      if (this.orientation === 'vertical') {
        x = position * siblingSpacing + 50;
        y = level * levelSpacing + 50;
      } else {
        x = level * levelSpacing + 50;
        y = position * siblingSpacing + 50;
      }

      layout.push({
        ...node,
        x,
        y,
        width: nodeWidth,
        height: nodeHeight,
      });

      return childPosition + 1;
    };

    let currentPosition = 0;
    rootNodes.forEach(root => {
      currentPosition = layoutSubtree(root.id, 0, currentPosition);
    });

    return layout;
  }

  private handleNodeClick(node: TreeNode) {
    if (!this.collapsible) return;

    this.nodes = this.nodes.map(n =>
      n.id === node.id ? { ...n, collapsed: !n.collapsed } : n
    );

    this.dispatchEvent(
      new CustomEvent('node-toggle', {
        detail: { node, collapsed: !node.collapsed },
      })
    );
  }

  private renderBranches() {
    return this.layoutNodes.map(node => {
      if (!node.parent) return null;

      const parentNode = this.layoutNodes.find(n => n.id === node.parent);
      if (!parentNode) return null;

      const pw = parentNode.width || 120;
      const ph = parentNode.height || 60;
      const cw = node.width || 120;
      const ch = node.height || 60;

      let path: string;
      if (this.orientation === 'vertical') {
        const px = parentNode.x + pw / 2;
        const py = parentNode.y + ph;
        const cx = node.x + cw / 2;
        const cy = node.y;
        const midY = (py + cy) / 2;
        path = `M ${px} ${py} L ${px} ${midY} L ${cx} ${midY} L ${cx} ${cy}`;
      } else {
        const px = parentNode.x + pw;
        const py = parentNode.y + ph / 2;
        const cx = node.x;
        const cy = node.y + ch / 2;
        const midX = (px + cx) / 2;
        path = `M ${px} ${py} L ${midX} ${py} L ${midX} ${cy} L ${cx} ${cy}`;
      }

      return svg`<path class="branch" d="${path}" />`;
    });
  }

  private renderNodes() {
    return this.layoutNodes.map(node => {
      const width = node.width || 120;
      const height = node.height || 60;
      const hasChildren = this.nodes.some(n => n.parent === node.id);

      return svg`
        <g
          class="node ${node.collapsed ? 'node-collapsed' : ''}"
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
          ${hasChildren && this.collapsible ? svg`
            <text
              class="expand-icon"
              x="${node.x + width - 15}"
              y="${node.y + 15}"
            >
              ${node.collapsed ? '+' : '−'}
            </text>
          ` : null}
        </g>
      `;
    });
  }

  override render() {
    const viewBox = this.orientation === 'vertical' ? '0 0 800 600' : '0 0 800 600';

    return html`
      <svg viewBox="${viewBox}" preserveAspectRatio="xMidYMid meet">
        <g class="branches">${this.renderBranches()}</g>
        <g class="nodes">${this.renderNodes()}</g>
      </svg>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'tree-canvas': TreeCanvas;
  }
}
