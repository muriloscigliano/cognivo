/**
 * @element ai-citation
 * Inline numbered citation badges or bibliography list with expandable source cards and relevance dots.
 *
 * @example
 * ```html
 * <ai-citation mode="inline" .sources=${[
 *   {title:'Attention Is All You Need', url:'https://arxiv.org/abs/1706.03762', relevance:0.95},
 *   {title:'BERT Paper', excerpt:'We introduce a new language representation model...'}
 * ]}></ai-citation>
 * ```
 *
 * @fires {CustomEvent<{index: number, source: CitationSource}>} ai-citation-click - Citation badge clicked
 *
 * @cssprop [--cg-brand-ai-accent=#dfff61] - Badge background tint and source title link color
 */
import { LitElement, html, css, nothing } from 'lit';
import { property, state, customElement } from 'lit/decorators.js';
import { hostBlock, reducedMotion, fadeInKeyframes } from '../../styles/index.js';

interface CitationSource {
  title: string;
  url?: string;
  excerpt?: string;
  relevance?: number;
}

@customElement('ai-citation')
export class AiCitation extends LitElement {
  static override styles = [hostBlock, reducedMotion, fadeInKeyframes, css`


    /* ── Inline mode ── */
    .inline { display: inline; }

    .cite-badge {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 16px;
      height: 16px;
      border-radius: 4px;
      background: rgba(223, 255, 97, 0.12);
      color: var(--cg-brand-ai-accent, #dfff61);
      font-size: 10px;
      font-weight: 800;
      cursor: pointer;
      vertical-align: super;
      margin: 0 1px;
      transition: all 150ms;
      border: 1px solid transparent;
    }
    .cite-badge:hover {
      background: rgba(223, 255, 97, 0.25);
      border-color: rgba(223, 255, 97, 0.3);
    }
    .cite-badge:focus-visible {
      outline: 2px solid var(--cg-brand-ai-accent, #dfff61);
      outline-offset: 1px;
    }

    /* ── Source card (expanded) ── */
    .source-card {
      background: var(--cg-color-surface-container-background, #18181b);
      background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0.03), transparent);
      border: 1px solid var(--cg-gray-700, #3f3f46);
      border-radius: 10px;
      padding: 12px 14px;
      margin: 8px 0;
      animation: fadeIn 200ms ease;
      max-width: 400px;
      box-shadow: var(--cg-elevation-1, 0 1px 3px rgba(0,0,0,0.3), 0 1px 2px rgba(0,0,0,0.2)), inset 0 1px 0 0 rgba(255, 255, 255, 0.05);
    }

    .source-header {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 6px;
    }
    .source-number {
      width: 20px;
      height: 20px;
      border-radius: 5px;
      background: rgba(223, 255, 97, 0.12);
      color: var(--cg-brand-ai-accent, #dfff61);
      font-size: 11px;
      font-weight: 800;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    .source-title {
      font-size: 13px;
      font-weight: 600;
      color: var(--cg-brand-ai-accent, #dfff61);
      text-decoration: none;
      flex: 1;
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .source-title:hover { text-decoration: underline; }

    .relevance-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      flex-shrink: 0;
    }
    .relevance-dot.high { background: var(--cg-green-400, #4ade80); }
    .relevance-dot.medium { background: var(--cg-yellow-400, #fbbf24); }
    .relevance-dot.low { background: var(--cg-gray-500, #71717a); }

    .source-excerpt {
      font-size: 12px;
      color: var(--cg-gray-400, #a1a1aa);
      line-height: 1.4;
      margin-top: 6px;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    .source-url {
      font-size: 11px;
      color: var(--cg-gray-500, #71717a);
      margin-top: 4px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    /* ── List mode ── */
    .list {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }
    .list-item {
      display: flex;
      align-items: flex-start;
      gap: 10px;
      padding: 10px 0;
      border-bottom: 1px solid var(--cg-gray-800, #27272a);
    }
    .list-item:last-child { border-bottom: none; }

    .list-content { flex: 1; min-width: 0; }
    .list-title {
      font-size: 13px;
      font-weight: 600;
      color: var(--cg-color-surface-base-text, #fafafa);
    }
    .list-title a {
      color: var(--cg-brand-ai-accent, #dfff61);
      text-decoration: none;
    }
    .list-title a:hover { text-decoration: underline; }
    .list-excerpt {
      font-size: 12px;
      color: var(--cg-gray-400, #a1a1aa);
      line-height: 1.4;
      margin-top: 4px;
    }

    .sources-label {
      font-size: 11px;
      font-weight: 700;
      color: var(--cg-gray-400, #a1a1aa);
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 8px;
    }
    }
  `];
  /** Array of source objects */
  @property({ type: Array }) sources: CitationSource[] = [];

  /** Display mode: inline (badges) or list (bibliography) */
  @property({ type: String }) mode: 'inline' | 'list' = 'inline';

  /** Max visible in inline mode before "+N more" */
  @property({ type: Number }) maxVisible: number = 5;

  @state() private _expandedIndex: number = -1;

  private _getRelevanceClass(r?: number): string {
    if (!r) return 'low';
    if (r >= 0.7) return 'high';
    if (r >= 0.4) return 'medium';
    return 'low';
  }

  private _handleCiteClick(index: number) {
    this._expandedIndex = this._expandedIndex === index ? -1 : index;
    this.dispatchEvent(new CustomEvent('ai-citation-click', {
      bubbles: true, composed: true,
      detail: { index, source: this.sources[index] },
    }));
  }

  private _renderInline() {
    const visible = this.sources.slice(0, this.maxVisible);
    const remaining = this.sources.length - this.maxVisible;

    return html`
      <div class="inline">
        ${visible.map((s, i) => html`
          <span class="cite-badge" tabindex="0" role="button"
            aria-label="Source ${i + 1}: ${s.title}"
            @click=${() => this._handleCiteClick(i)}
            @keydown=${(e: KeyboardEvent) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); this._handleCiteClick(i); } }}
          >${i + 1}</span>
          ${this._expandedIndex === i ? this._renderCard(s, i) : nothing}
        `)}
        ${remaining > 0 ? html`<span class="cite-badge" style="width: auto; padding: 0 6px;">+${remaining}</span>` : nothing}
      </div>
    `;
  }

  private _renderCard(source: CitationSource, index: number) {
    return html`
      <div class="source-card">
        <div class="source-header">
          <div class="source-number">${index + 1}</div>
          ${source.url
            ? html`<a class="source-title" href="${source.url}" target="_blank" rel="noopener">${source.title}</a>`
            : html`<span class="source-title">${source.title}</span>`}
          <div class="relevance-dot ${this._getRelevanceClass(source.relevance)}" title="Relevance: ${source.relevance ? Math.round(source.relevance * 100) + '%' : 'unknown'}"></div>
        </div>
        ${source.excerpt ? html`<div class="source-excerpt">${source.excerpt}</div>` : nothing}
        ${source.url ? html`<div class="source-url">${source.url}</div>` : nothing}
      </div>
    `;
  }

  private _renderList() {
    return html`
      <div class="list">
        <div class="sources-label">Sources (${this.sources.length})</div>
        ${this.sources.map((s, i) => html`
          <div class="list-item">
            <div class="source-number">${i + 1}</div>
            <div class="list-content">
              <div class="list-title">
                ${s.url ? html`<a href="${s.url}" target="_blank" rel="noopener">${s.title}</a>` : s.title}
              </div>
              ${s.excerpt ? html`<div class="list-excerpt">${s.excerpt}</div>` : nothing}
            </div>
            <div class="relevance-dot ${this._getRelevanceClass(s.relevance)}"></div>
          </div>
        `)}
      </div>
    `;
  }

  override render() {
    if (this.sources.length === 0) return nothing;
    return this.mode === 'list' ? this._renderList() : this._renderInline();
  }
}
