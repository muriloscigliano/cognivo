/**
 * @element ai-citation
 * Inline numbered citation badges or bibliography list with expandable source cards.
 *
 * @fires {CustomEvent<{index: number, source: CitationSource}>} ai-citation-click
 */
import { LitElement, html, css, nothing } from 'lit';
import { property, state, customElement } from 'lit/decorators.js';
import { hostBlock, reducedMotion } from '../../styles/index.js';

interface CitationSource {
  title: string;
  url?: string;
  excerpt?: string;
  relevance?: number;
}

@customElement('ai-citation')
export class AiCitation extends LitElement {
  static override styles = [hostBlock, reducedMotion, css`
    /* ── Inline mode ── */
    .inline { display: inline; }

    .cite-badge {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: var(--cg-spacing-16);
      height: var(--cg-spacing-16);
      border-radius: var(--cg-border-radius-50);
      background: var(--cg-overlay-accent-light);
      color: var(--cg-color-surface-base-text);
      font-size: var(--cg-font-size-xs);
      font-weight: var(--cg-font-weight-bold);
      cursor: pointer;
      vertical-align: super;
      margin: 0 var(--cg-spacing-1);
      border: var(--cg-border-width-50) solid transparent;
      transition:
        background-color var(--cg-motion-duration-fast) var(--cg-motion-easing-color),
        border-color var(--cg-motion-duration-fast) var(--cg-motion-easing-color);
    }
    .cite-badge:hover {
      background: var(--cg-overlay-accent-medium);
      border-color: var(--cg-overlay-accent-strong);
    }
    .cite-badge:focus-visible {
      outline: none;
      box-shadow: 0 0 0 3px var(--cg-overlay-accent-strong);
    }

    /* ── Source card (expanded) ── */
    .source-card {
      background: var(--cg-color-surface-cards-background);
      border: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
      border-radius: var(--cg-border-radius-100);
      padding: var(--cg-spacing-12);
      margin: var(--cg-spacing-8) 0;
      max-width: 400px;
    }

    .source-header {
      display: flex;
      align-items: center;
      gap: var(--cg-spacing-8);
      margin-bottom: var(--cg-spacing-6);
    }
    .source-number {
      width: var(--cg-spacing-20);
      height: var(--cg-spacing-20);
      border-radius: var(--cg-border-radius-50);
      background: var(--cg-overlay-accent-light);
      color: var(--cg-color-surface-base-text);
      font-size: var(--cg-font-size-xs);
      font-weight: var(--cg-font-weight-bold);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    .source-title {
      font-size: var(--cg-font-size-sm);
      font-weight: var(--cg-font-weight-medium);
      color: var(--cg-color-surface-base-text);
      text-decoration: none;
      flex: 1;
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    a.source-title:hover { text-decoration: underline; }

    .relevance-dot {
      width: var(--cg-spacing-6);
      height: var(--cg-spacing-6);
      border-radius: var(--cg-border-radius-full);
      flex-shrink: 0;
    }
    .relevance-dot.high { background: var(--cg-color-status-success-text-default); }
    .relevance-dot.medium { background: var(--cg-color-status-warning-text-default); }
    .relevance-dot.low { background: var(--cg-color-input-text-placeholder); }

    .source-excerpt {
      font-size: var(--cg-font-size-xs);
      color: var(--cg-color-input-text-placeholder);
      line-height: var(--cg-line-height-snug);
      margin-top: var(--cg-spacing-6);
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    .source-url {
      font-size: var(--cg-font-size-xs);
      color: var(--cg-color-input-text-placeholder);
      margin-top: var(--cg-spacing-4);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    /* ── List mode ── */
    .list {
      display: flex;
      flex-direction: column;
      gap: var(--cg-spacing-2);
    }
    .list-item {
      display: flex;
      align-items: flex-start;
      gap: var(--cg-spacing-8);
      padding: var(--cg-spacing-8) 0;
      border-bottom: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
    }
    .list-item:last-child { border-bottom: none; }

    .list-content { flex: 1; min-width: 0; }
    .list-title {
      font-size: var(--cg-font-size-sm);
      font-weight: var(--cg-font-weight-medium);
      color: var(--cg-color-surface-base-text);
    }
    .list-title a {
      color: var(--cg-color-surface-base-text);
      text-decoration: none;
    }
    .list-title a:hover { text-decoration: underline; }
    .list-excerpt {
      font-size: var(--cg-font-size-xs);
      color: var(--cg-color-input-text-placeholder);
      line-height: var(--cg-line-height-snug);
      margin-top: var(--cg-spacing-4);
    }

    .sources-label {
      font-size: var(--cg-font-size-xs);
      font-weight: var(--cg-font-weight-medium);
      color: var(--cg-color-input-text-placeholder);
      text-transform: uppercase;
      letter-spacing: var(--cg-letter-spacing-wide);
      margin-bottom: var(--cg-spacing-8);
    }
  `];

  @property({ type: Array }) sources: CitationSource[] = [];
  @property() mode: 'inline' | 'list' = 'inline';
  @property({ type: Number }) maxVisible = 5;

  @state() private _expandedIndex = -1;

  private _sanitizeUrl(url?: string): string | undefined {
    if (!url) return undefined;
    const trimmed = url.trim();
    if (!trimmed) return undefined;
    const lower = trimmed.toLowerCase().replace(/[\s\u0000-\u001f]/g, '');
    if (lower.startsWith('javascript:') || lower.startsWith('data:') || lower.startsWith('vbscript:')) return undefined;
    if (lower.startsWith('http:') || lower.startsWith('https:') || lower.startsWith('//')) return trimmed;
    const colonIndex = trimmed.indexOf(':');
    const slashIndex = trimmed.indexOf('/');
    if (colonIndex === -1 || (slashIndex !== -1 && slashIndex < colonIndex)) return trimmed;
    return undefined;
  }

  private _relevanceClass(r?: number): string {
    if (!r) return 'low';
    return r >= 0.7 ? 'high' : r >= 0.4 ? 'medium' : 'low';
  }

  private _handleCiteClick(index: number) {
    this._expandedIndex = this._expandedIndex === index ? -1 : index;
    this.dispatchEvent(new CustomEvent('ai-citation-click', {
      bubbles: true, composed: true,
      detail: { index, source: this.sources[index] },
    }));
  }

  private _renderCard(source: CitationSource, index: number) {
    const safeUrl = this._sanitizeUrl(source.url);
    return html`
      <div class="source-card">
        <div class="source-header">
          <div class="source-number">${index + 1}</div>
          ${safeUrl
            ? html`<a class="source-title" href="${safeUrl}" target="_blank" rel="noopener">${source.title}</a>`
            : html`<span class="source-title">${source.title}</span>`}
          <div class="relevance-dot ${this._relevanceClass(source.relevance)}" title="Relevance: ${source.relevance ? Math.round(source.relevance * 100) + '%' : 'unknown'}"></div>
        </div>
        ${source.excerpt ? html`<div class="source-excerpt">${source.excerpt}</div>` : nothing}
        ${safeUrl ? html`<div class="source-url">${safeUrl}</div>` : nothing}
      </div>
    `;
  }

  override render() {
    if (!this.sources.length) return nothing;

    if (this.mode === 'list') {
      return html`
        <div class="list">
          <div class="sources-label">Sources (${this.sources.length})</div>
          ${this.sources.map((s, i) => {
            const safeUrl = this._sanitizeUrl(s.url);
            return html`
              <div class="list-item">
                <div class="source-number">${i + 1}</div>
                <div class="list-content">
                  <div class="list-title">
                    ${safeUrl ? html`<a href="${safeUrl}" target="_blank" rel="noopener">${s.title}</a>` : s.title}
                  </div>
                  ${s.excerpt ? html`<div class="list-excerpt">${s.excerpt}</div>` : nothing}
                </div>
                <div class="relevance-dot ${this._relevanceClass(s.relevance)}"></div>
              </div>
            `;
          })}
        </div>
      `;
    }

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
        ${remaining > 0 ? html`<span class="cite-badge" style="width:auto; padding:0 var(--cg-spacing-4);">+${remaining}</span>` : nothing}
      </div>
    `;
  }
}
