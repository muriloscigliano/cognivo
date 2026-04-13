/**
 * @element ai-reasoning-tree
 * Collapsible AI chain-of-thought display. Two variants:
 * - minimal (Claude-style): left border, no background
 * - contained (DeepSeek-style): subtle background card
 *
 * @fires {CustomEvent<{id: string, type: string, content: string}>} ai-reasoning-node-click
 */
import { LitElement, html, css, nothing } from 'lit';
import { property, state, customElement } from 'lit/decorators.js';
import { hostBlock, reducedMotion } from '../../styles/index.js';

export interface ReasoningNode {
  id: string;
  type: 'thought' | 'action' | 'observation' | 'conclusion';
  content: string;
  confidence?: number;
  children?: ReasoningNode[];
}

@customElement('ai-reasoning-tree')
export class AiReasoningTree extends LitElement {
  static override styles = [hostBlock, reducedMotion, css`

    /* ── Minimal variant (default) — Claude-style ── */
    .reasoning {
      border-left: var(--cg-border-width-100) solid var(--cg-color-surface-cards-border);
      padding-left: var(--cg-spacing-20);
    }

    /* ── Contained variant — DeepSeek-style ── */
    :host([variant="contained"]) .reasoning {
      border-left: none;
      padding-left: 0;
      background: var(--cg-color-surface-cards-background);
      border: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
      border-radius: var(--cg-component-card-radius);
      padding: var(--cg-spacing-12);
    }
    :host([variant="contained"]) .toggle {
      padding: var(--cg-spacing-12) var(--cg-spacing-16);
    }
    :host([variant="contained"]) .steps {
      padding: 0 var(--cg-spacing-16) var(--cg-spacing-16);
    }

    /* ── Toggle ── */
    .toggle {
      display: flex;
      align-items: center;
      gap: var(--cg-spacing-12);
      padding: var(--cg-spacing-8) 0;
      cursor: pointer;
      background: none;
      border: none;
      font: inherit;
      color: var(--cg-color-surface-container-outlined);
      font-size: var(--cg-font-size-sm);
      font-weight: var(--cg-font-weight-medium);
      width: 100%;
      text-align: left;
    }
    .toggle:hover { color: var(--cg-color-surface-base-text); }
    .toggle:focus-visible {
      outline: none;
      border-radius: var(--cg-border-radius-50);
      box-shadow: 0 0 0 3px var(--cg-overlay-accent-strong);
    }

    .chevron {
      width: var(--cg-spacing-12);
      height: var(--cg-spacing-12);
      transition: transform var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
      flex-shrink: 0;
      opacity: 0.5;
    }
    :host(:not([collapsed])) .chevron { transform: rotate(90deg); }

    .toggle-count {
      font-size: var(--cg-font-size-xs);
      opacity: 0.5;
      margin-left: auto;
    }

    /* ── Steps ── */
    .steps {
      display: flex;
      flex-direction: column;
      padding: var(--cg-spacing-6) 0 var(--cg-spacing-12);
    }

    .step {
      display: flex;
      align-items: baseline;
      gap: var(--cg-spacing-12);
      padding: var(--cg-spacing-12) var(--cg-spacing-12);
      font-size: var(--cg-font-size-sm);
      color: var(--cg-color-surface-base-text);
      line-height: var(--cg-line-height-relaxed);
      border-radius: var(--cg-border-radius-50);
      cursor: default;
      opacity: 0.8;
    }
    .step:hover { background: var(--cg-overlay-dark-subtle); }

    .dot {
      width: var(--cg-spacing-6);
      height: var(--cg-spacing-6);
      border-radius: var(--cg-border-radius-full);
      flex-shrink: 0;
      margin-top: var(--cg-spacing-6);
    }
    .dot.thought { background: var(--cg-color-action-primary-background-default); opacity: 0.7; }
    .dot.action { background: var(--cg-color-status-info-text-default); opacity: 0.7; }
    .dot.observation { background: var(--cg-color-status-warning-text-default); opacity: 0.7; }
    .dot.conclusion { background: var(--cg-color-status-success-text-default); opacity: 0.7; }

    .step-text { flex: 1; }

    .conf {
      font-size: var(--cg-font-size-xs);
      font-family: var(--cg-font-family-mono);
      opacity: 0.4;
      flex-shrink: 0;
    }

    .children { padding-left: var(--cg-spacing-20); }

    .step.highlighted { background: var(--cg-overlay-accent-subtle); }

    @media (prefers-reduced-motion: reduce) {
      .chevron { transition: none; }
    }
  `];

  @property({ type: Array }) nodes: ReasoningNode[] = [];
  @property({ type: Array }) highlightPath: string[] = [];
  @property() label = 'Thinking';
  @property({ type: Boolean, reflect: true }) collapsed = true;
  @property({ reflect: true }) variant: 'minimal' | 'contained' = 'minimal';

  private _count(nodes: ReasoningNode[]): number {
    let c = 0;
    for (const n of nodes) { c++; if (n.children) c += this._count(n.children); }
    return c;
  }

  private _renderNodes(nodes: ReasoningNode[]): unknown {
    return nodes.map(n => html`
      <div class="step ${this.highlightPath.includes(n.id) ? 'highlighted' : ''}"
        @click=${() => this.dispatchEvent(new CustomEvent('ai-reasoning-node-click', { bubbles: true, composed: true, detail: { id: n.id, type: n.type, content: n.content } }))}>
        <span class="dot ${n.type}"></span>
        <span class="step-text">${n.content}</span>
        ${n.confidence ? html`<span class="conf">${Math.round(n.confidence * 100)}%</span>` : nothing}
      </div>
      ${n.children?.length ? html`<div class="children">${this._renderNodes(n.children)}</div>` : nothing}
    `);
  }

  override render() {
    if (!this.nodes.length) return nothing;
    const total = this._count(this.nodes);

    return html`
      <div class="reasoning">
        <button class="toggle" @click=${() => { this.collapsed = !this.collapsed; }} aria-expanded=${!this.collapsed}>
          <svg class="chevron" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
          <span>${this.label}</span>
          <span class="toggle-count">${total} step${total !== 1 ? 's' : ''}</span>
        </button>
        ${!this.collapsed ? html`<div class="steps">${this._renderNodes(this.nodes)}</div>` : nothing}
      </div>
    `;
  }
}
