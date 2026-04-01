/**
 * @element ai-rag-panel
 * Retrieval-Augmented Generation (RAG) results panel. Displays retrieved
 * documents with relevance scores, source type badges, excerpts, and
 * relevance bars. Supports filtering by type and click-to-expand.
 *
 * @example
 * ```html
 * <ai-rag-panel .documents=${[
 *   { title: 'API Guide', source: 'docs.example.com', excerpt: 'Authentication uses...', relevance: 0.92, type: 'doc' }
 * ]} query="authentication" sortBy="relevance"></ai-rag-panel>
 * ```
 *
 * @prop {RagDocument[]} documents - Array of retrieved documents
 * @prop {string} query - The search query (used for context)
 * @prop {string} sortBy - Sort order: 'relevance' | 'recency' | 'source'
 *
 * @fires {CustomEvent<{index: number, document: object}>} ai-rag-document-click - When a document is clicked
 */
import { LitElement, html, css, nothing } from 'lit';
import { property, state, customElement } from 'lit/decorators.js';
import { hostBlock, reducedMotion, fadeSlideInKeyframes } from '../../styles/index.js';

interface RagDocument {
  title: string;
  source: string;
  excerpt: string;
  relevance: number;
  type?: 'doc' | 'web' | 'database' | 'api';
  url?: string;
}

@customElement('ai-rag-panel')
export class AiRagPanel extends LitElement {
  static override styles = [hostBlock, reducedMotion, fadeSlideInKeyframes, css`
    :host {
      animation: fadeSlideIn var(--cg-motion-duration-fast, 200ms) var(--cg-motion-easing-color, cubic-bezier(0, 0, 0.58, 1));
    }

    .panel {
      background: var(--cg-color-surface-container-background, #18181b);
      border: 1px solid var(--cg-color-surface-container-border, #27272a);
      border-radius: 12px;
      overflow: hidden;
    }

    /* Header */
    .header {
      display: flex; align-items: center; justify-content: space-between;
      padding: 12px 16px;
      border-bottom: 1px solid var(--cg-gray-800, #27272a);
    }
    .header-left { display: flex; align-items: center; gap: 8px; }
    .header-icon {
      width: 20px; height: 20px; border-radius: 6px;
      background: rgba(59, 130, 246, 0.12); color: #60a5fa;
      display: flex; align-items: center; justify-content: center;
      font-size: 10px; font-weight: 800;
    }
    .header-title {
      font-size: 12px; font-weight: 700; color: var(--cg-gray-400, #a1a1aa);
      text-transform: uppercase; letter-spacing: 0.05em;
    }
    .header-stats {
      font-size: 11px; color: var(--cg-gray-500, #71717a);
    }

    /* Sort/Filter */
    .controls {
      display: flex; gap: 4px; padding: 8px 16px;
      border-bottom: 1px solid var(--cg-gray-800, #27272a);
    }
    .control-btn {
      padding: 3px 10px; border-radius: 5px;
      border: 1px solid var(--cg-gray-700, #3f3f46);
      background: none; color: var(--cg-gray-400, #a1a1aa);
      font: inherit; font-size: 10px; font-weight: 600;
      cursor: pointer; transition: all 150ms;
    }
    .control-btn:hover { border-color: var(--cg-gray-600, #52525b); color: var(--cg-color-surface-base-text, #fafafa); }
    .control-btn.active { border-color: var(--cg-brand-ai-accent, #dfff61); color: var(--cg-brand-ai-accent, #dfff61); background: rgba(223, 255, 97, 0.06); }

    /* Documents */
    .documents { max-height: 400px; overflow-y: auto; }

    .doc {
      padding: 12px 16px;
      border-bottom: 1px solid var(--cg-gray-800, #27272a);
      cursor: pointer;
      transition: background 100ms;
    }
    .doc:hover { background: rgba(255, 255, 255, 0.02); }
    .doc:last-child { border-bottom: none; }

    .doc-header { display: flex; align-items: center; gap: 8px; margin-bottom: 6px; }
    .doc-type {
      font-size: 9px; font-weight: 700; padding: 2px 6px; border-radius: 3px;
      text-transform: uppercase;
    }
    .doc-type.doc { background: rgba(139, 92, 246, 0.12); color: #a78bfa; }
    .doc-type.web { background: rgba(59, 130, 246, 0.12); color: #60a5fa; }
    .doc-type.database { background: rgba(34, 197, 94, 0.12); color: #4ade80; }
    .doc-type.api { background: rgba(245, 158, 11, 0.12); color: #fbbf24; }

    .doc-title {
      font-size: 13px; font-weight: 600; color: var(--cg-color-surface-base-text, #fafafa);
      flex: 1; min-width: 0;
      overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
    }

    .doc-relevance {
      font-size: 10px; font-weight: 700; padding: 2px 8px; border-radius: 4px;
      flex-shrink: 0;
    }
    .rel-high { background: rgba(34, 197, 94, 0.12); color: #4ade80; }
    .rel-medium { background: rgba(245, 158, 11, 0.12); color: #fbbf24; }
    .rel-low { background: rgba(161, 161, 170, 0.1); color: var(--cg-gray-400, #a1a1aa); }

    .doc-source {
      font-size: 11px; color: var(--cg-gray-500, #71717a); margin-bottom: 6px;
    }

    .doc-excerpt {
      font-size: 12px; color: var(--cg-gray-400, #a1a1aa);
      line-height: 1.5;
      display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden;
    }
    .doc.expanded .doc-excerpt {
      -webkit-line-clamp: unset; display: block;
    }

    /* Relevance bar */
    .relevance-bar {
      height: 2px; border-radius: 1px;
      background: var(--cg-gray-800, #27272a);
      margin-top: 8px; overflow: hidden;
    }
    .relevance-fill {
      height: 100%; border-radius: 1px;
      transition: width 300ms;
    }

    .query-highlight { background: rgba(223, 255, 97, 0.15); padding: 0 2px; border-radius: 2px; }

    .empty { padding: 32px; text-align: center; color: var(--cg-gray-500, #71717a); font-size: 13px; }

    :focus-visible {
      outline: none;
      box-shadow: 0 0 0 2px var(--cg-color-surface-base-background, #09090b), 0 0 0 4px var(--cg-brand-ai-accent, #dfff61);
    }
  `];

  @property({ type: Array }) documents: RagDocument[] = [];
  @property({ type: String }) query: string = '';
  @property({ type: String }) sortBy: 'relevance' | 'recency' | 'source' = 'relevance';

  @state() private _expandedIndex: number = -1;
  @state() private _filterType: string = '';

  private get _filteredDocs(): RagDocument[] {
    let docs = [...this.documents];
    if (this._filterType) docs = docs.filter(d => d.type === this._filterType);
    if (this.sortBy === 'relevance') docs.sort((a, b) => b.relevance - a.relevance);
    return docs;
  }

  private get _types(): string[] {
    return [...new Set(this.documents.map(d => d.type || 'doc'))];
  }

  private _getRelClass(r: number): string {
    if (r >= 0.7) return 'rel-high';
    if (r >= 0.4) return 'rel-medium';
    return 'rel-low';
  }

  private _getRelColor(r: number): string {
    if (r >= 0.7) return '#4ade80';
    if (r >= 0.4) return '#fbbf24';
    return '#71717a';
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
            <div class="header-icon"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg></div>
            <span class="header-title">Retrieved Sources</span>
          </div>
          <span class="header-stats">${docs.length} document${docs.length !== 1 ? 's' : ''}</span>
        </div>

        ${types.length > 1 ? html`
          <div class="controls">
            <button class="control-btn ${!this._filterType ? 'active' : ''}"
              @click=${() => { this._filterType = ''; }}>All</button>
            ${types.map(t => html`
              <button class="control-btn ${this._filterType === t ? 'active' : ''}"
                @click=${() => { this._filterType = this._filterType === t ? '' : t; }}>${t}</button>
            `)}
          </div>
        ` : nothing}

        <div class="documents">
          ${docs.map((doc, i) => html`
            <div class="doc ${this._expandedIndex === i ? 'expanded' : ''}"
              @click=${() => this._handleDocClick(i)}
              role="article" tabindex="0"
              @keydown=${(e: KeyboardEvent) => { if (e.key === 'Enter') this._handleDocClick(i); }}>

              <div class="doc-header">
                <span class="doc-type ${doc.type || 'doc'}">${doc.type || 'doc'}</span>
                <span class="doc-title">${doc.title}</span>
                <span class="doc-relevance ${this._getRelClass(doc.relevance)}">${Math.round(doc.relevance * 100)}%</span>
              </div>
              <div class="doc-source">${doc.source}</div>
              <div class="doc-excerpt">${doc.excerpt}</div>
              <div class="relevance-bar">
                <div class="relevance-fill" style="width: ${doc.relevance * 100}%; background: ${this._getRelColor(doc.relevance)};"></div>
              </div>
            </div>
          `)}
        </div>
      </div>
    `;
  }
}
