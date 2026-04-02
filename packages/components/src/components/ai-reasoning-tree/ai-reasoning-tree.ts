/**
 * @element ai-reasoning-tree
 * Expandable tree visualizing multi-step AI chain-of-thought reasoning.
 * Each node has a type (thought/action/observation/conclusion), confidence
 * score, and optional children. Supports path highlighting and expand/collapse all.
 *
 * @example
 * ```html
 * <ai-reasoning-tree .nodes=${[
 *   { id: '1', type: 'thought', content: 'The user wants a summary...', confidence: 0.9,
 *     children: [{ id: '2', type: 'action', content: 'Search knowledge base', confidence: 0.85 }] }
 * ]} .highlightPath=${['1', '2']}></ai-reasoning-tree>
 * ```
 *
 * @prop {ReasoningNode[]} nodes - Root-level reasoning nodes (recursive tree)
 * @prop {string[]} highlightPath - Array of node IDs to visually highlight
 *
 * @fires {CustomEvent<{id: string, expanded: boolean}>} ai-reasoning-expand - When a node is toggled
 * @fires {CustomEvent<{id: string, type: string, content: string}>} ai-reasoning-node-click - When a node is clicked
 */
import { LitElement, html, css, nothing } from 'lit';
import { property, state, customElement } from 'lit/decorators.js';
import { hostBlock, reducedMotion, fadeSlideInKeyframes } from '../../styles/index.js';

interface ReasoningNode {
  id: string;
  type: 'thought' | 'action' | 'observation' | 'conclusion';
  content: string;
  confidence?: number;
  children?: ReasoningNode[];
}

@customElement('ai-reasoning-tree')
export class AiReasoningTree extends LitElement {
  static override styles = [hostBlock, reducedMotion, fadeSlideInKeyframes, css`
    :host {
      animation: fadeSlideIn var(--cg-motion-duration-fast, 200ms) var(--cg-motion-easing-color, cubic-bezier(0, 0, 0.58, 1));
    }

    .tree {
      background: var(--cg-color-surface-container-background, #18181b);
      border: 1px solid var(--cg-color-surface-container-border, #27272a);
      border-radius: 12px;
      overflow: hidden;
      box-shadow: inset 0 1px 0 0 rgba(255, 255, 255, 0.05);
      background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0.03), transparent);
    }

    /* Toolbar */
    .toolbar {
      display: flex; align-items: center; gap: 8px;
      padding: 10px 16px;
      border-bottom: 1px solid var(--cg-gray-800, #27272a);
    }
    .toolbar-title {
      font-size: 12px; font-weight: 700; color: var(--cg-gray-400, #a1a1aa);
      text-transform: uppercase; letter-spacing: 0.05em; flex: 1;
    }
    .toolbar-btn {
      padding: 3px 10px; border-radius: 5px; border: 1px solid var(--cg-gray-700, #3f3f46);
      background: none; color: var(--cg-gray-400, #a1a1aa); font: inherit;
      font-size: 10px; font-weight: 600; cursor: pointer; transition: all 150ms;
    }
    .toolbar-btn:hover { color: var(--cg-color-surface-base-text, #fafafa); border-color: var(--cg-gray-600, #52525b); }

    /* Nodes */
    .nodes { padding: 12px 16px; }

    .node {
      position: relative;
      padding-left: 24px;
      margin-bottom: 4px;
    }

    /* Vertical connector line */
    .node::before {
      content: '';
      position: absolute;
      left: 8px;
      top: 24px;
      bottom: 0;
      width: 1px;
      background: var(--cg-gray-800, #27272a);
    }
    .node:last-child::before { display: none; }

    .node-header {
      display: flex; align-items: center; gap: 8px;
      padding: 6px 10px;
      border-radius: 8px;
      cursor: pointer;
      transition: background 100ms;
    }
    .node-header:hover { background: rgba(255, 255, 255, 0.03); }
    .node-header:focus-visible { outline: 2px solid var(--cg-brand-ai-accent, #dfff61); outline-offset: 1px; }

    /* Type icon */
    .node-icon {
      width: 20px; height: 20px; border-radius: 6px;
      display: flex; align-items: center; justify-content: center;
      font-size: 10px; font-weight: 800; flex-shrink: 0;
      z-index: 1;
    }
    .node-icon.thought { background: rgba(139, 92, 246, 0.15); color: #a78bfa; }
    .node-icon.action { background: rgba(59, 130, 246, 0.15); color: #60a5fa; }
    .node-icon.observation { background: rgba(245, 158, 11, 0.15); color: #fbbf24; }
    .node-icon.conclusion { background: rgba(34, 197, 94, 0.15); color: #4ade80; }

    .node-content {
      flex: 1; min-width: 0;
      font-size: 13px; color: var(--cg-color-surface-base-text, #fafafa);
      line-height: 1.4;
    }
    .node.collapsed .node-content {
      display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden;
    }

    .node-confidence {
      font-size: 10px; font-weight: 700; padding: 1px 6px; border-radius: 4px;
      flex-shrink: 0;
    }
    .conf-high { background: rgba(34, 197, 94, 0.12); color: #4ade80; }
    .conf-medium { background: rgba(245, 158, 11, 0.12); color: #fbbf24; }
    .conf-low { background: rgba(239, 68, 68, 0.12); color: #f87171; }

    .expand-icon {
      font-size: 10px; color: var(--cg-gray-500, #71717a); flex-shrink: 0;
      transition: transform 150ms; width: 12px; text-align: center;
    }
    .node:not(.collapsed) > .node-header .expand-icon { transform: rotate(90deg); }

    /* Children indented */
    .children { padding-left: 16px; }

    /* Highlighted path */
    .node.highlighted > .node-header {
      background: rgba(223, 255, 97, 0.04);
      border-left: 2px solid var(--cg-brand-ai-accent, #dfff61);
    }

    /* Type labels */
    .type-label {
      font-size: 9px; font-weight: 700; text-transform: uppercase;
      letter-spacing: 0.05em; flex-shrink: 0;
    }
    .type-label.thought { color: #a78bfa; }
    .type-label.action { color: #60a5fa; }
    .type-label.observation { color: #fbbf24; }
    .type-label.conclusion { color: #4ade80; }

    .empty { padding: 32px; text-align: center; color: var(--cg-gray-500, #71717a); font-size: 13px; }

    /* ── Rounded variants ── */
    :host([rounded="none"]) .tree { border-radius: 0; }
    :host([rounded="sm"]) .tree { border-radius: var(--cg-border-radius-50, 4px); }
    :host([rounded="md"]) .tree { border-radius: var(--cg-border-radius-100, 8px); }
    :host([rounded="lg"]) .tree { border-radius: var(--cg-border-radius-150, 12px); }
    :host([rounded="full"]) .tree { border-radius: var(--cg-border-radius-full, 99999px); }
  `];

  @property({ reflect: true }) rounded: 'none' | 'sm' | 'md' | 'lg' | 'full' = 'lg';
  @property({ type: Array }) nodes: ReasoningNode[] = [];
  @property({ type: Array }) highlightPath: string[] = [];

  @state() private _collapsed: Set<string> = new Set();

  private _toggleNode(id: string) {
    if (this._collapsed.has(id)) this._collapsed.delete(id);
    else this._collapsed.add(id);
    this._collapsed = new Set(this._collapsed);
    this.dispatchEvent(new CustomEvent('ai-reasoning-expand', {
      bubbles: true, composed: true,
      detail: { id, expanded: !this._collapsed.has(id) },
    }));
  }

  private _handleNodeClick(node: ReasoningNode) {
    this.dispatchEvent(new CustomEvent('ai-reasoning-node-click', {
      bubbles: true, composed: true,
      detail: { id: node.id, type: node.type, content: node.content },
    }));
  }

  private _expandAll() { this._collapsed = new Set(); }

  private _collapseAll() {
    const ids = new Set<string>();
    const collect = (nodes: ReasoningNode[]) => {
      for (const n of nodes) {
        if (n.children?.length) { ids.add(n.id); collect(n.children); }
      }
    };
    collect(this.nodes);
    this._collapsed = ids;
  }

  private _getIcon(type: string): unknown {
    if (type === 'thought') return html`<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/></svg>`;
    if (type === 'action') return html`<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>`;
    if (type === 'observation') return html`<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`;
    if (type === 'conclusion') return html`<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>`;
    return html`<svg width="8" height="8" viewBox="0 0 8 8"><circle cx="4" cy="4" r="4" fill="currentColor"/></svg>`;
  }

  private _getConfClass(c?: number): string {
    if (!c) return '';
    if (c >= 0.8) return 'conf-high';
    if (c >= 0.5) return 'conf-medium';
    return 'conf-low';
  }

  private _renderNode(node: ReasoningNode, depth: number = 0): unknown {
    const isCollapsed = this._collapsed.has(node.id);
    const hasChildren = (node.children?.length ?? 0) > 0;
    const isHighlighted = this.highlightPath.includes(node.id);

    return html`
      <div class="node ${isCollapsed ? 'collapsed' : ''} ${isHighlighted ? 'highlighted' : ''}">
        <div class="node-header" tabindex="0" role="treeitem"
          aria-expanded="${hasChildren ? !isCollapsed : nothing}"
          @click=${() => { if (hasChildren) this._toggleNode(node.id); this._handleNodeClick(node); }}
          @keydown=${(e: KeyboardEvent) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); if (hasChildren) this._toggleNode(node.id); this._handleNodeClick(node); } }}>

          ${hasChildren ? html`<span class="expand-icon"><svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg></span>` : html`<span class="expand-icon"></span>`}
          <div class="node-icon ${node.type}" aria-hidden="true">${this._getIcon(node.type)}</div>
          <span class="type-label ${node.type}">${node.type}</span>
          <span class="node-content">${node.content}</span>
          ${node.confidence ? html`<span class="node-confidence ${this._getConfClass(node.confidence)}">${Math.round(node.confidence * 100)}%</span>` : nothing}
        </div>

        ${hasChildren && !isCollapsed ? html`
          <div class="children" role="group">
            ${node.children!.map(child => this._renderNode(child, depth + 1))}
          </div>
        ` : nothing}
      </div>
    `;
  }

  override render() {
    if (this.nodes.length === 0) {
      return html`<div class="tree"><div class="empty">No reasoning data</div></div>`;
    }

    return html`
      <div class="tree">
        <div class="toolbar">
          <span class="toolbar-title">Reasoning Chain</span>
          <button class="toolbar-btn" @click=${this._expandAll}>Expand All</button>
          <button class="toolbar-btn" @click=${this._collapseAll}>Collapse All</button>
        </div>
        <div class="nodes" role="tree" aria-label="Reasoning tree">
          ${this.nodes.map(n => this._renderNode(n))}
        </div>
      </div>
    `;
  }
}
