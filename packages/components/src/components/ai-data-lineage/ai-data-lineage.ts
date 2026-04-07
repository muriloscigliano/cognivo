/**
 * @element ai-data-lineage
 * Minimal data provenance flow — clean monochrome nodes connected by arrows.
 * Click a node to highlight its upstream path.
 *
 * @example
 * ```html
 * <ai-data-lineage
 *   .nodes=${[{id:'1',label:'CSV Upload',type:'source'},{id:'2',label:'Clean',type:'transform'},{id:'3',label:'GPT-4',type:'model'},{id:'4',label:'Summary',type:'output'}]}
 *   .edges=${[{from:'1',to:'2'},{from:'2',to:'3'},{from:'3',to:'4'}]}
 *   highlightPath="4"
 * ></ai-data-lineage>
 * ```
 *
 * @fires {CustomEvent<{id, label, type}>} ai-lineage-node-click - Node clicked
 */
import { LitElement, html, css, nothing } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { hostBlock, reducedMotion } from '../../styles/index.js';

export interface LineageNode {
  id: string;
  label: string;
  type: 'source' | 'transform' | 'model' | 'output';
  status?: 'active' | 'complete' | 'error';
}

export interface LineageEdge {
  from: string;
  to: string;
}

@customElement('ai-data-lineage')
export class AiDataLineage extends LitElement {
  static override styles = [hostBlock, reducedMotion, css`
    .container {
      background: var(--cg-color-surface-cards-background);
      border: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
      border-radius: var(--cg-border-radius-200);
      padding: var(--cg-spacing-20);
      overflow-x: auto;
    }

    .flow {
      display: flex;
      align-items: center;
      min-width: min-content;
    }
    .flow.vertical { flex-direction: column; }

    .step {
      display: flex;
      align-items: center;
      flex-shrink: 0;
    }
    .flow.vertical .step { flex-direction: column; }

    /* ── Node ── */
    .node {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--cg-spacing-4);
      padding: var(--cg-spacing-12) var(--cg-spacing-16);
      background: var(--cg-color-surface-container-background);
      border: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
      border-radius: var(--cg-border-radius-100);
      cursor: pointer;
      font-family: inherit;
      color: var(--cg-color-surface-base-text);
      min-width: var(--cg-spacing-80);
      text-align: center;
      position: relative;
      transition:
        border-color var(--cg-motion-duration-fast) var(--cg-motion-easing-default),
        background var(--cg-motion-duration-fast) var(--cg-motion-easing-default);
    }
    .node:hover {
      border-color: var(--cg-color-input-border-hover);
    }
    .node:focus-visible {
      outline: none;
      box-shadow:
        0 0 0 2px var(--cg-color-surface-base-background),
        0 0 0 4px var(--cg-color-focus-ring);
    }
    .node.on-path {
      border-color: var(--cg-color-surface-base-text);
      background: var(--cg-overlay-dark-subtle);
    }

    .node-label {
      font-size: var(--cg-font-size-xs);
      font-weight: var(--cg-font-weight-semibold);
      white-space: nowrap;
    }
    .node-type {
      font-size: var(--cg-font-size-xs);
      color: var(--cg-color-input-text-placeholder);
    }

    /* Status dot */
    .status-dot {
      width: var(--cg-spacing-6);
      height: var(--cg-spacing-6);
      border-radius: var(--cg-border-radius-full);
      position: absolute;
      top: var(--cg-spacing-6);
      right: var(--cg-spacing-6);
    }
    .status-dot.active { background: var(--cg-color-surface-base-text); }
    .status-dot.complete { background: var(--cg-color-input-text-placeholder); }
    .status-dot.error { background: var(--cg-color-status-error-text-default); }

    /* ── Arrow ── */
    .arrow {
      flex-shrink: 0;
      color: var(--cg-color-surface-cards-border);
      display: flex;
      padding: 0 var(--cg-spacing-2);
    }
    .arrow.on-path { color: var(--cg-color-surface-base-text); }
    .flow.vertical .arrow { padding: var(--cg-spacing-2) 0; }

    .empty {
      text-align: center;
      padding: var(--cg-spacing-32);
      color: var(--cg-color-input-text-placeholder);
      font-size: var(--cg-font-size-sm);
    }

    :host([rounded="none"]) .container { border-radius: 0; }
    :host([rounded="sm"]) .container { border-radius: var(--cg-border-radius-50); }
    :host([rounded="md"]) .container { border-radius: var(--cg-border-radius-100); }
    :host([rounded="lg"]) .container { border-radius: var(--cg-border-radius-200); }
  `];

  @property({ reflect: true }) rounded: 'none' | 'sm' | 'md' | 'lg' = 'lg';
  @property({ attribute: false }) nodes: LineageNode[] = [];
  @property({ attribute: false }) edges: LineageEdge[] = [];
  @property({ type: String }) highlightPath = '';
  @property({ type: String }) direction: 'horizontal' | 'vertical' = 'horizontal';

  private _getPathIds(): Set<string> {
    if (!this.highlightPath) return new Set();
    const ids = new Set<string>();
    const parents = new Map<string, string[]>();
    for (const e of this.edges) {
      if (!parents.has(e.to)) parents.set(e.to, []);
      parents.get(e.to)!.push(e.from);
    }
    const q = [this.highlightPath];
    while (q.length) {
      const id = q.shift()!;
      if (ids.has(id)) continue;
      ids.add(id);
      for (const p of parents.get(id) || []) q.push(p);
    }
    return ids;
  }

  private _onNodeClick(node: LineageNode) {
    this.dispatchEvent(new CustomEvent('ai-lineage-node-click', {
      detail: { id: node.id, label: node.label, type: node.type },
      bubbles: true, composed: true,
    }));
  }

  override render() {
    if (this.nodes.length === 0) {
      return html`<div class="container"><div class="empty">No lineage data</div></div>`;
    }

    const pathIds = this._getPathIds();
    const isV = this.direction === 'vertical';

    // Topological order
    const done = new Set<string>();
    const ordered: LineageNode[] = [];
    const children = new Map<string, string[]>();
    for (const e of this.edges) {
      if (!children.has(e.from)) children.set(e.from, []);
      children.get(e.from)!.push(e.to);
    }
    const targeted = new Set(this.edges.map(e => e.to));
    const q: (LineageNode | undefined)[] = this.nodes.filter(n => !targeted.has(n.id));
    if (q.length === 0 && this.nodes.length > 0) q.push(this.nodes[0]);
    while (q.length) {
      const n = q.shift();
      if (!n || done.has(n.id)) continue;
      done.add(n.id);
      ordered.push(n);
      for (const cid of children.get(n.id) || []) {
        const c = this.nodes.find(x => x.id === cid);
        if (c && !done.has(c.id)) q.push(c);
      }
    }
    for (const n of this.nodes) if (!done.has(n.id)) ordered.push(n);

    const arrowH = html`<svg width="24" height="12" viewBox="0 0 24 12" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><line x1="0" y1="6" x2="18" y2="6"/><path d="M15 2l5 4-5 4"/></svg>`;
    const arrowV = html`<svg width="12" height="24" viewBox="0 0 12 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><line x1="6" y1="0" x2="6" y2="18"/><path d="M2 15l4 5 4-5"/></svg>`;

    return html`
      <div class="container" role="group" aria-label="Data lineage">
        <div class="flow ${isV ? 'vertical' : ''}">
          ${ordered.map((node, i) => {
            const onPath = pathIds.has(node.id);
            const next = ordered[i + 1];
            const hasEdge = next && this.edges.some(e => e.from === node.id && e.to === next.id);
            const edgeOnPath = next && pathIds.has(node.id) && pathIds.has(next.id);

            return html`
              <div class="step">
                <button class="node ${onPath ? 'on-path' : ''}"
                  @click=${() => this._onNodeClick(node)}
                  aria-label="${node.label} (${node.type})">
                  <span class="node-label">${node.label}</span>
                  <span class="node-type">${node.type}</span>
                  ${node.status ? html`<span class="status-dot ${node.status}"></span>` : nothing}
                </button>
                ${hasEdge ? html`<span class="arrow ${edgeOnPath ? 'on-path' : ''}">${isV ? arrowV : arrowH}</span>` : nothing}
              </div>
            `;
          })}
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ai-data-lineage': AiDataLineage;
  }
}
