/**
 * <ai-insight-card> — Actionable AI Insight
 *
 * SVG icons (not emoji), expandable detail, action buttons,
 * source attribution, loading skeleton, status indicator,
 * selected state, animated entry, keyboard accessible.
 */
import { LitElement, html, css, nothing } from 'lit';
import { property, customElement } from 'lit/decorators.js';

interface Source {
  title: string;
  url?: string;
  relevance?: number;
}

@customElement('ai-insight-card')
export class AiInsightCard extends LitElement {
  static override styles = css`
    :host {
      transition: color 100ms cubic-bezier(0, 0, 0.58, 1);
      animation: fadeSlideIn 200ms cubic-bezier(0, 0, 0.58, 1);
      display: block;
      font-family: var(--cg-font-family-primary, 'Inter Variable', 'Inter', -apple-system, sans-serif);
    }

    .card {
      display: flex;
      gap: 14px;
      padding: 14px 16px;
      background: var(--cg-color-surface-container-background, #18181b);
      border: 1px solid var(--cg-color-surface-container-border, #27272a);
      border-radius: 12px;
      cursor: pointer;
      transition: all 200ms ease;
      position: relative;
      animation: fadeIn 300ms ease;
    }
    .card:hover {
      border-color: var(--cg-gray-600, #52525b);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    }
    .card:focus-visible {
      outline: 2px solid var(--cg-brand-ai-accent, #dfff61);
      outline-offset: 2px;
    }
    .card.selected {
      border-color: var(--cg-brand-ai-accent, #dfff61);
      background: rgba(223, 255, 97, 0.04);
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(6px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .status-dot {
      position: absolute;
      top: 10px;
      right: 10px;
      width: 6px;
      height: 6px;
      border-radius: 50%;
    }
    .status-dot.new { background: var(--cg-brand-ai-accent, #dfff61); }
    .status-dot.read { background: var(--cg-gray-600, #52525b); }

    .icon-area {
      width: 40px;
      height: 40px;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    .icon-area svg { width: 20px; height: 20px; }
    .icon-area.explanation { background: rgba(59, 130, 246, 0.12); color: #60a5fa; }
    .icon-area.forecast { background: rgba(223, 255, 97, 0.12); color: #dfff61; }
    .icon-area.anomaly { background: rgba(239, 68, 68, 0.12); color: #f87171; }
    .icon-area.optimization { background: rgba(245, 158, 11, 0.12); color: #fbbf24; }
    .icon-area.classification { background: rgba(34, 197, 94, 0.12); color: #4ade80; }

    .content { flex: 1; min-width: 0; }

    .type-label {
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: var(--cg-brand-ai-accent, #dfff61);
      margin-bottom: 3px;
    }

    .insight-text {
      font-size: 14px;
      color: var(--cg-color-surface-base-text, #fafafa);
      line-height: 1.5;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    .card.expanded .insight-text {
      -webkit-line-clamp: unset;
      display: block;
    }

    .meta {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-top: 6px;
      font-size: 11px;
    }
    .timestamp { color: var(--cg-gray-500, #71717a); }

    .detail {
      margin-top: 12px;
      padding-top: 12px;
      border-top: 1px solid var(--cg-gray-800, #27272a);
    }
    .sources-label {
      font-size: 11px;
      font-weight: 700;
      color: var(--cg-gray-400, #a1a1aa);
      margin-bottom: 6px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .source {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 4px 0;
      font-size: 12px;
      color: var(--cg-gray-400, #a1a1aa);
    }
    .source a { color: var(--cg-brand-ai-accent, #dfff61); text-decoration: none; }
    .source a:hover { text-decoration: underline; }
    .source-dot { width: 4px; height: 4px; border-radius: 50%; flex-shrink: 0; }
    .source-dot.high { background: var(--cg-green-400, #4ade80); }
    .source-dot.medium { background: var(--cg-yellow-400, #fbbf24); }
    .source-dot.low { background: var(--cg-gray-500, #71717a); }

    .actions {
      display: flex;
      gap: 4px;
      position: absolute;
      top: 8px;
      right: 8px;
      opacity: 0;
      transition: opacity 150ms;
    }
    .card:hover .actions { opacity: 1; }
    .action-btn {
      width: 24px;
      height: 24px;
      border-radius: 6px;
      background: var(--cg-gray-800, #27272a);
      border: 1px solid var(--cg-gray-700, #3f3f46);
      color: var(--cg-gray-400, #a1a1aa);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      transition: all 150ms;
      padding: 0;
    }
    .action-btn:hover {
      color: var(--cg-color-surface-base-text, #fafafa);
      background: var(--cg-gray-700, #3f3f46);
    }

    .skeleton {
      display: flex;
      gap: 14px;
      padding: 14px 16px;
      background: var(--cg-color-surface-container-background, #18181b);
      border: 1px solid var(--cg-color-surface-container-border, #27272a);
      border-radius: 12px;
    }
    .skel-icon {
      width: 40px;
      height: 40px;
      border-radius: 10px;
      background: linear-gradient(90deg, var(--cg-gray-800, #27272a) 25%, var(--cg-gray-700, #3f3f46) 50%, var(--cg-gray-800, #27272a) 75%);
      background-size: 200% 100%;
      animation: shimmer 1.5s linear infinite;
    }
    .skel-lines { flex: 1; display: flex; flex-direction: column; gap: 8px; }
    .skel-line {
      height: 10px;
      border-radius: 5px;
      background: linear-gradient(90deg, var(--cg-gray-800, #27272a) 25%, var(--cg-gray-700, #3f3f46) 50%, var(--cg-gray-800, #27272a) 75%);
      background-size: 200% 100%;
      animation: shimmer 1.5s linear infinite;
    }
    .skel-line:nth-child(1) { width: 40%; }
    .skel-line:nth-child(2) { width: 90%; }
    .skel-line:nth-child(3) { width: 60%; }

    @keyframes shimmer {
      0% { background-position: 200% 0; }
      100% { background-position: -200% 0; }
    }

    @media (prefers-reduced-motion: reduce) {
      .card, .skel-icon, .skel-line { animation: none; }
    }
  
    @keyframes fadeSlideIn {
      from { opacity: 0; transform: translateY(4px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `;

  @property({ type: String }) type: 'explanation' | 'forecast' | 'anomaly' | 'optimization' | 'classification' = 'explanation';
  @property({ type: String }) text: string = '';
  @property({ type: Number }) confidence: number = 0;
  @property({ type: String }) timestamp: string = '';
  @property({ type: Boolean }) expandable: boolean = false;
  @property({ type: Boolean }) expanded: boolean = false;
  @property({ type: Array }) sources: Source[] = [];
  @property({ type: String }) status: 'new' | 'read' | 'dismissed' | '' = '';
  @property({ type: Boolean }) loading: boolean = false;
  @property({ type: Boolean }) selected: boolean = false;

  private _getIcon() {
    const icons: Record<string, string> = {
      explanation: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>',
      forecast: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>',
      anomaly: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
      optimization: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',
      classification: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>',
    };
    return icons[this.type] || icons.explanation;
  }

  private _handleClick() {
    if (this.expandable) {
      this.expanded = !this.expanded;
      this.dispatchEvent(new CustomEvent('ai-insight-expand', {
        bubbles: true, composed: true,
        detail: { expanded: this.expanded, type: this.type },
      }));
    }
    this.dispatchEvent(new CustomEvent('ai-insight-click', {
      bubbles: true, composed: true,
      detail: { type: this.type, text: this.text, confidence: this.confidence },
    }));
  }

  private _handleDismiss(e: Event) {
    e.stopPropagation();
    this.dispatchEvent(new CustomEvent('ai-insight-dismiss', { bubbles: true, composed: true, detail: { type: this.type, text: this.text } }));
  }

  private _handleBookmark(e: Event) {
    e.stopPropagation();
    this.dispatchEvent(new CustomEvent('ai-insight-bookmark', { bubbles: true, composed: true, detail: { type: this.type, text: this.text } }));
  }

  private _handleKeyDown(e: KeyboardEvent) {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); this._handleClick(); }
  }

  private _getRelevanceClass(r?: number): string {
    if (!r) return 'low';
    if (r >= 0.7) return 'high';
    if (r >= 0.4) return 'medium';
    return 'low';
  }

  override render() {
    if (this.loading) {
      return html`
        <div class="skeleton" aria-label="Loading insight">
          <div class="skel-icon"></div>
          <div class="skel-lines"><div class="skel-line"></div><div class="skel-line"></div><div class="skel-line"></div></div>
        </div>
      `;
    }
    if (!this.text) return nothing;

    return html`
      <div class="card ${this.expanded ? 'expanded' : ''} ${this.selected ? 'selected' : ''}"
        role="article" tabindex="0" aria-label="${this.type} insight"
        @click=${this._handleClick} @keydown=${this._handleKeyDown}>

        ${this.status && this.status !== 'dismissed' ? html`<div class="status-dot ${this.status}" aria-hidden="true"></div>` : nothing}

        <div class="actions">
          <button class="action-btn" @click=${this._handleBookmark} title="Bookmark" aria-label="Bookmark">★</button>
          <button class="action-btn" @click=${this._handleDismiss} title="Dismiss" aria-label="Dismiss">✕</button>
        </div>

        <div class="icon-area ${this.type}" aria-hidden="true" .innerHTML=${this._getIcon()}></div>

        <div class="content">
          <div class="type-label">${this.type}</div>
          <div class="insight-text">${this.text}</div>
          <div class="meta">
            ${this.confidence > 0 ? html`<ai-badge score="${this.confidence}" size="sm"></ai-badge>` : nothing}
            ${this.timestamp ? html`<span class="timestamp">${this.timestamp}</span>` : nothing}
            ${this.sources.length > 0 ? html`<span class="timestamp">${this.sources.length} source${this.sources.length > 1 ? 's' : ''}</span>` : nothing}
          </div>
          ${this.expanded && this.sources.length > 0 ? html`
            <div class="detail">
              <div class="sources-label">Sources</div>
              ${this.sources.map(s => html`
                <div class="source">
                  <div class="source-dot ${this._getRelevanceClass(s.relevance)}"></div>
                  ${s.url ? html`<a href="${s.url}" target="_blank" rel="noopener">${s.title}</a>` : html`<span>${s.title}</span>`}
                </div>
              `)}
            </div>
          ` : nothing}
        </div>
      </div>
    `;
  }
}
