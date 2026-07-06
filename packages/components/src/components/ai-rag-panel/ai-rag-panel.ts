/**
 * @element ai-rag-panel
 * RAG results panel showing retrieved documents with relevance scores, type badges, and excerpts.
 *
 * @fires {CustomEvent<{index: number, document: object}>} ai-rag-document-click - Document clicked
 */
import { LitElement, html, css, nothing } from 'lit';
import { property, state, customElement } from 'lit/decorators.js';
import { hostBlock, reducedMotion } from '../../styles/index.js';

export interface RagDocument {
  title: string;
  source: string;
  excerpt: string;
  relevance: number;
  type?: 'doc' | 'web' | 'database' | 'api';
  url?: string;
}

@customElement('ai-rag-panel')
export class AiRagPanel extends LitElement {
  static override styles = [hostBlock, reducedMotion, css`
    .panel {
      background: var(--cg-color-surface-cards-background);
      border: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
      border-radius: var(--cg-component-card-radius);
      overflow: hidden;
    }

    /* ── Header ── */
    .header {
      display: flex; align-items: center; justify-content: space-between;
      padding: var(--cg-spacing-16) var(--cg-spacing-20);
      border-bottom: var(--cg-border-width-50) solid var(--cg-color-surface-cards-divider);
    }
    .header-left { display: flex; align-items: center; gap: var(--cg-spacing-12); }
    .header-icon {
      width: var(--cg-spacing-16); height: var(--cg-spacing-16);
      color: var(--cg-color-surface-container-outlined);
      display: flex; align-items: center; justify-content: center;
      flex-shrink: 0;
    }
    .header-icon svg { width: 100%; height: 100%; }
    .header-title {
      font-size: var(--cg-font-size-xs); font-weight: var(--cg-font-weight-semibold);
      color: var(--cg-color-surface-container-outlined);
      text-transform: uppercase; letter-spacing: var(--cg-letter-spacing-wide);
    }
    .header-stats { font-size: var(--cg-font-size-xs); color: var(--cg-color-surface-container-outlined); }

    /* ── Filter controls ── */
    .controls {
      display: flex; gap: var(--cg-spacing-8);
      padding: var(--cg-spacing-12) var(--cg-spacing-20);
      border-bottom: var(--cg-border-width-50) solid var(--cg-color-surface-cards-divider);
    }
    .control-btn {
      padding: var(--cg-spacing-4) var(--cg-spacing-8); border-radius: var(--cg-border-radius-full);
      border: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
      background: transparent; color: var(--cg-color-surface-container-outlined);
      font: inherit; font-size: var(--cg-font-size-xs); font-weight: var(--cg-font-weight-medium);
      cursor: pointer; text-transform: capitalize;
      transition: border-color var(--cg-transition-duration-fast) var(--cg-transition-easing-default), color var(--cg-transition-duration-fast) var(--cg-transition-easing-default), background var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
    }
    .control-btn:hover { border-color: var(--cg-color-surface-cards-hover-border); color: var(--cg-color-surface-base-text); }
    .control-btn:active { transform: scale(var(--cg-interaction-press-scale)); }
    .control-btn:focus-visible { outline: none; box-shadow: 0 0 0 var(--cg-focus-ring-width) var(--cg-overlay-accent-strong); }
    .control-btn.active { border-color: var(--cg-color-action-primary-background-default); color: var(--cg-color-action-primary-background-default); background: var(--cg-overlay-accent-subtle); }

    /* ── Documents ── */
    .documents { max-height: 400px; overflow-y: auto; }

    .doc {
      padding: var(--cg-spacing-16) var(--cg-spacing-20);
      border-bottom: var(--cg-border-width-50) solid var(--cg-color-surface-cards-divider);
      cursor: pointer;
      transition: background var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
    }
    .doc:hover { background: var(--cg-overlay-dark-subtle); }
    .doc:last-child { border-bottom: none; }
    .doc:focus-visible {
      outline: none;
      box-shadow: inset 0 0 0 var(--cg-focus-ring-width) var(--cg-overlay-accent-strong);
    }

    .doc-header { display: flex; align-items: center; gap: var(--cg-spacing-12); margin-bottom: var(--cg-spacing-4); }
    .doc-type {
      font-size: var(--cg-font-size-xs); font-weight: var(--cg-font-weight-medium);
      padding: var(--cg-spacing-2) var(--cg-spacing-6); border-radius: var(--cg-border-radius-full);
      text-transform: uppercase; letter-spacing: var(--cg-letter-spacing-wide);
      background: var(--cg-overlay-accent-light);
      color: var(--cg-color-accent-text);
    }

    .doc-title {
      font-size: var(--cg-font-size-sm); font-weight: var(--cg-font-weight-medium); color: var(--cg-color-surface-base-text);
      flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
    }

    .doc-relevance {
      font-size: var(--cg-font-size-xs); font-weight: var(--cg-font-weight-medium);
      flex-shrink: 0; font-family: var(--cg-font-family-mono);
      color: var(--cg-color-surface-container-outlined);
    }

    .doc-source {
      font-size: var(--cg-font-size-xs); color: var(--cg-color-surface-container-outlined); margin-bottom: var(--cg-spacing-4);
    }

    .doc-excerpt {
      font-size: var(--cg-font-size-sm); color: var(--cg-color-surface-base-text); opacity: 0.8;
      line-height: var(--cg-line-height-relaxed);
      display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
    }
    .doc.expanded .doc-excerpt { -webkit-line-clamp: unset; display: block; }

    /* Relevance bar */
    .relevance-bar {
      height: var(--cg-spacing-2); border-radius: var(--cg-border-radius-full);
      background: var(--cg-color-surface-cards-border); margin-top: var(--cg-spacing-12); overflow: hidden;
    }
    .relevance-fill {
      height: 100%; border-radius: var(--cg-border-radius-full);
      background: var(--cg-color-action-primary-background-default);
      opacity: var(--cg-opacity-60);
      transition: width var(--cg-transition-duration-slow) var(--cg-transition-easing-default);
    }

    .empty {
      padding: var(--cg-spacing-48) var(--cg-spacing-24);
      text-align: center; color: var(--cg-color-surface-container-outlined); font-size: var(--cg-font-size-sm);
    }

    /* ── Rounded ── */
    :host([rounded="none"]) .panel { border-radius: 0; }
    :host([rounded="sm"]) .panel { border-radius: var(--cg-border-radius-50); }
    :host([rounded="md"]) .panel { border-radius: var(--cg-border-radius-100); }
    :host([rounded="lg"]) .panel { border-radius: var(--cg-component-card-radius); }
  `];

  @property({ reflect: true }) rounded: 'none' | 'sm' | 'md' | 'lg' = 'lg';
  @property({ type: Array }) documents: RagDocument[] = [];
  @property() query = '';
  @property() sortBy: 'relevance' = 'relevance';

  @state() private _expandedIndex = -1;
  @state() private _filterType = '';

  private get _filteredDocs(): RagDocument[] {
    let docs = [...this.documents];
    if (this._filterType) docs = docs.filter(d => d.type === this._filterType);
    docs.sort((a, b) => b.relevance - a.relevance);
    return docs;
  }

  private get _types(): string[] {
    return [...new Set(this.documents.map(d => d.type || 'doc'))];
  }

  private _formatRelevance(r: number): string {
    return `${Math.round(r * 100)}%`;
  }

  private _handleDocClick(index: number) {
    this._expandedIndex = this._expandedIndex === index ? -1 : index;
    this.dispatchEvent(new CustomEvent('ai-rag-document-click', {
      bubbles: true, composed: true,
      detail: { index, document: this._filteredDocs[index] },
    }));
  }

  override render() {
    if (this.documents.length === 0) {
      return html`<div class="panel"><div class="empty">No documents retrieved</div></div>`;
    }

    const docs = this._filteredDocs;
    const types = this._types;

    return html`
      <div class="panel" role="region" aria-label="Retrieved documents">
        <div class="header">
          <div class="header-left">
            <div class="header-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
            </div>
            <span class="header-title">Retrieved Sources</span>
          </div>
          <span class="header-stats">${docs.length} document${docs.length !== 1 ? 's' : ''}</span>
        </div>

        ${types.length > 1 ? html`
          <div class="controls">
            <button class="control-btn ${!this._filterType ? 'active' : ''}" @click=${() => { this._filterType = ''; }}>All</button>
            ${types.map(t => html`
              <button class="control-btn ${this._filterType === t ? 'active' : ''}" @click=${() => { this._filterType = this._filterType === t ? '' : t; }}>${t}</button>
            `)}
          </div>
        ` : nothing}

        <div class="documents">
          ${docs.map((doc, i) => html`
            <div class="doc ${this._expandedIndex === i ? 'expanded' : ''}"
              @click=${() => this._handleDocClick(i)}
              role="button"
              aria-expanded=${this._expandedIndex === i ? 'true' : 'false'}
              aria-label=${`${doc.title}, relevance ${this._formatRelevance(doc.relevance)}`}
              tabindex="0"
              @keydown=${(e: KeyboardEvent) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); this._handleDocClick(i); } }}>
              <div class="doc-header">
                <span class="doc-type">${doc.type || 'doc'}</span>
                <span class="doc-title">${doc.title}</span>
                <span class="doc-relevance">${this._formatRelevance(doc.relevance)}</span>
              </div>
              <div class="doc-source">${doc.source}</div>
              <div class="doc-excerpt">${doc.excerpt}</div>
              <div class="relevance-bar">
                <div class="relevance-fill" style="width: ${doc.relevance * 100}%"></div>
              </div>
            </div>
          `)}
        </div>
      </div>
    `;
  }
}
