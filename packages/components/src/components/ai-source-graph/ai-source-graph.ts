/**
 * @element ai-source-graph
 * Source attribution panel showing which knowledge sources contributed to an
 * AI response — Perplexity/ChatGPT-style numbered list with type badges,
 * weight bars, expandable excerpts, and inline footnote references.
 *
 * @example
 * ```html
 * <ai-source-graph
 *   .sources=${[
 *     { id: 's1', title: 'API Docs', type: 'doc', weight: 0.8, url: '#', excerpt: 'Rate limits...' },
 *     { id: 's2', title: 'Stack Overflow', type: 'web', weight: 0.4 }
 *   ]}
 * ></ai-source-graph>
 * ```
 *
 * @fires {CustomEvent<{id, title, type, weight}>} ai-source-click - Source clicked
 */
import { LitElement, html, css, nothing } from 'lit';
import { property, state, customElement } from 'lit/decorators.js';
import { hostBlock, reducedMotion, fadeSlideInKeyframes } from '../../styles/index.js';

interface SourceNode {
  id: string;
  title: string;
  type: 'doc' | 'web' | 'database' | 'api';
  weight: number;
  url?: string;
  excerpt?: string;
}

const TYPE_BADGE = 'accent';

@customElement('ai-source-graph')
export class AiSourceGraph extends LitElement {
  static override styles = [hostBlock, reducedMotion, fadeSlideInKeyframes, css`
    :host {
      animation: fadeSlideIn var(--cg-motion-duration-fast) var(--cg-motion-easing-enter) both;
    }

    .panel {
      background: var(--cg-color-surface-cards-background);
      border: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
      border-radius: var(--cg-border-radius-150);
      overflow: hidden;
    }

    /* ── Header ── */
    .header {
      display: flex;
      align-items: center;
      gap: var(--cg-spacing-8);
      padding: var(--cg-spacing-12) var(--cg-spacing-16);
      border-bottom: var(--cg-border-width-50) solid var(--cg-color-surface-cards-divider);
    }
    .header-title {
      font-size: var(--cg-font-size-sm);
      font-weight: var(--cg-font-weight-bold);
      color: var(--cg-color-surface-base-text);
      flex: 1;
    }
    .source-count {
      font-size: var(--cg-font-size-xs);
      color: var(--cg-color-input-text-placeholder);
    }

    /* ── Source list ── */
    .sources {
      display: flex;
      flex-direction: column;
    }

    .source {
      display: flex;
      align-items: flex-start;
      gap: var(--cg-spacing-12);
      padding: var(--cg-spacing-12) var(--cg-spacing-16);
      border-bottom: var(--cg-border-width-50) solid var(--cg-color-surface-cards-divider);
      cursor: pointer;
      transition:
        background var(--cg-motion-duration-fast) var(--cg-motion-easing-default);
    }
    .source:last-child { border-bottom: none; }
    .source:hover { background: var(--cg-overlay-dark-subtle); }
    .source:focus-visible {
      outline: none;
      box-shadow: inset 0 0 0 2px var(--cg-color-focus-ring);
    }

    /* Footnote number */
    .footnote {
      width: var(--cg-spacing-24);
      height: var(--cg-spacing-24);
      border-radius: var(--cg-border-radius-full);
      background: var(--cg-color-surface-container-background);
      border: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      font-size: var(--cg-font-size-xs);
      font-weight: var(--cg-font-weight-bold);
      color: var(--cg-color-surface-base-text);
      font-family: var(--cg-font-family-mono);
    }

    /* Source content */
    .source-body { flex: 1; min-width: 0; }
    .source-top {
      display: flex;
      align-items: center;
      gap: var(--cg-spacing-8);
    }
    .source-title {
      font-size: var(--cg-font-size-sm);
      font-weight: var(--cg-font-weight-semibold);
      color: var(--cg-color-surface-base-text);
      line-height: var(--cg-line-height-tight);
    }
    .source-title a {
      color: inherit;
      text-decoration: none;
    }
    .source-title a:hover { text-decoration: underline; }

    /* Weight bar */
    .weight-area {
      flex-shrink: 0;
      display: flex;
      align-items: center;
      gap: var(--cg-spacing-6);
      margin-left: auto;
    }
    .weight-bar {
      width: var(--cg-spacing-48);
      height: var(--cg-spacing-4);
      background: var(--cg-color-surface-cards-border);
      border-radius: var(--cg-border-radius-full);
      overflow: hidden;
    }
    .weight-fill {
      height: 100%;
      border-radius: var(--cg-border-radius-full);
      background: var(--cg-color-action-primary-background-default);
      transition: width var(--cg-motion-duration-normal) var(--cg-motion-easing-default);
    }
    .weight-label {
      font-size: var(--cg-font-size-xs);
      font-family: var(--cg-font-family-mono);
      color: var(--cg-color-input-text-placeholder);
      min-width: var(--cg-spacing-32);
      text-align: right;
    }

    /* Excerpt */
    .excerpt {
      font-size: var(--cg-font-size-xs);
      color: var(--cg-color-input-text-placeholder);
      line-height: var(--cg-line-height-normal);
      margin-top: var(--cg-spacing-4);
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    .source.expanded .excerpt {
      -webkit-line-clamp: unset;
      display: block;
    }

    .empty {
      text-align: center;
      padding: var(--cg-spacing-32);
      color: var(--cg-color-input-text-placeholder);
      font-size: var(--cg-font-size-sm);
    }

    /* ── Rounded variants ── */
    :host([rounded="none"]) .panel { border-radius: 0; }
    :host([rounded="sm"]) .panel { border-radius: var(--cg-border-radius-50); }
    :host([rounded="md"]) .panel { border-radius: var(--cg-border-radius-100); }
    :host([rounded="lg"]) .panel { border-radius: var(--cg-border-radius-150); }
  `];

  @property({ reflect: true }) rounded: 'none' | 'sm' | 'md' | 'lg' = 'lg';
  @property({ type: Array }) sources: SourceNode[] = [];

  @state() private _expandedId: string = '';

  private _handleSourceClick(source: SourceNode) {
    this._expandedId = this._expandedId === source.id ? '' : source.id;
    this.dispatchEvent(new CustomEvent('ai-source-click', {
      bubbles: true, composed: true,
      detail: { id: source.id, title: source.title, type: source.type, weight: source.weight },
    }));
  }

  override render() {
    if (this.sources.length === 0) {
      return html`<div class="panel"><div class="empty">No sources</div></div>`;
    }

    const sorted = [...this.sources].sort((a, b) => b.weight - a.weight);

    return html`
      <div class="panel" role="list" aria-label="Source attribution">
        <div class="header">
          <span class="header-title">Sources</span>
          <span class="source-count">${this.sources.length}</span>
        </div>
        <div class="sources">
          ${sorted.map((s, i) => {
            const isExpanded = s.id === this._expandedId;
            return html`
              <div class="source ${isExpanded ? 'expanded' : ''}"
                role="listitem" tabindex="0"
                @click=${() => this._handleSourceClick(s)}
                @keydown=${(e: KeyboardEvent) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); this._handleSourceClick(s); } }}>
                <span class="footnote">${i + 1}</span>
                <div class="source-body">
                  <div class="source-top">
                    <span class="source-title">
                      ${s.url ? html`<a href=${s.url} target="_blank" rel="noopener" @click=${(e: Event) => e.stopPropagation()}>${s.title}</a>` : s.title}
                    </span>
                    <cg-badge variant=${TYPE_BADGE} label=${s.type} size="sm" rounded="full"></cg-badge>
                  </div>
                  ${s.excerpt ? html`<div class="excerpt">${s.excerpt}</div>` : nothing}
                </div>
                <div class="weight-area">
                  <div class="weight-bar"><div class="weight-fill" style="width: ${Math.round(s.weight * 100)}%"></div></div>
                  <span class="weight-label">${Math.round(s.weight * 100)}%</span>
                </div>
              </div>
            `;
          })}
        </div>
      </div>
    `;
  }
}
