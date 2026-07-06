/**
 * @element ai-insight-card
 * Actionable AI insight card with type icons, expandable detail, sources, and status.
 *
 * @fires {CustomEvent<{type, text}>} ai-insight-click
 * @fires {CustomEvent<{type, text, expanded}>} ai-insight-expand
 * @fires {CustomEvent<{type, text}>} ai-insight-dismiss
 * @fires {CustomEvent<{type, text}>} ai-insight-bookmark
 */
import { LitElement, html, css, nothing } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { hostBlock, reducedMotion, shimmerKeyframes } from '../../styles/index.js';

interface Source {
  title: string;
  url?: string;
  relevance?: number;
}

@customElement('ai-insight-card')
export class AiInsightCard extends LitElement {
  static override styles = [hostBlock, reducedMotion, shimmerKeyframes, css`
    :host { display: block; }

    .card {
      display: flex;
      gap: var(--cg-spacing-16);
      padding: var(--cg-spacing-20);
      background: var(--cg-color-surface-cards-background);
      border: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
      border-radius: var(--cg-component-card-radius);
      cursor: pointer;
      position: relative;
      transition:
        border-color var(--cg-transition-duration-fast) var(--cg-transition-easing-default),
        transform var(--cg-transition-duration-fast) var(--cg-transition-easing-default),
        box-shadow var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
    }
    .card:hover {
      border-color: var(--cg-color-surface-cards-hover-border);
      transform: translateY(-1px);
    }
    .card:active { transform: scale(var(--cg-interaction-press-scale)); }
    .card:focus-visible {
      outline: none;
      box-shadow: 0 0 0 var(--cg-focus-ring-offset) var(--cg-color-focus-ring-offset), 0 0 0 calc(var(--cg-focus-ring-offset) + var(--cg-focus-ring-width)) var(--cg-color-focus-ring);
    }
    .card:focus-within .actions { opacity: 1; }
    .card.selected {
      border-color: var(--cg-color-action-primary-background-default);
      background: var(--cg-overlay-accent-subtle);
    }

    /* ── Status dot ── */
    .status-dot {
      position: absolute;
      top: var(--cg-spacing-12);
      right: var(--cg-spacing-12);
      width: var(--cg-spacing-6);
      height: var(--cg-spacing-6);
      border-radius: var(--cg-border-radius-full);
    }
    .status-dot.new { background: var(--cg-color-action-primary-background-default); }
    .status-dot.read { background: var(--cg-color-input-text-placeholder); }

    /* ── Icon ── */
    .icon-area {
      width: var(--cg-spacing-40);
      height: var(--cg-spacing-40);
      border-radius: var(--cg-border-radius-full);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    .icon-area svg { width: var(--cg-icon-size-100); height: var(--cg-icon-size-100); }
    .icon-area.explanation { background: var(--cg-color-status-info-background-default); border: var(--cg-border-width-50) solid var(--cg-color-status-info-border-default); color: var(--cg-color-status-info-text-default); }
    .icon-area.forecast { background: var(--cg-overlay-accent-light); border: var(--cg-border-width-50) solid var(--cg-overlay-accent-medium); color: var(--cg-color-surface-base-text); }
    .icon-area.anomaly { background: var(--cg-color-status-error-background-default); border: var(--cg-border-width-50) solid var(--cg-color-status-error-border-default); color: var(--cg-color-status-error-text-default); }
    .icon-area.optimization { background: var(--cg-color-status-warning-background-default); border: var(--cg-border-width-50) solid var(--cg-color-status-warning-border-default); color: var(--cg-color-status-warning-text-default); }
    .icon-area.classification { background: var(--cg-color-status-success-background-default); border: var(--cg-border-width-50) solid var(--cg-color-status-success-border-default); color: var(--cg-color-status-success-text-default); }

    .content { flex: 1; min-width: 0; }

    .type-label {
      font-size: var(--cg-font-size-xs);
      font-weight: var(--cg-font-weight-medium);
      text-transform: uppercase;
      letter-spacing: var(--cg-letter-spacing-wide);
      color: var(--cg-color-input-text-placeholder);
      margin-bottom: var(--cg-spacing-4);
    }

    .insight-text {
      font-size: var(--cg-font-size-sm);
      color: var(--cg-color-surface-base-text);
      line-height: var(--cg-line-height-normal);
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    .card.expanded .insight-text {
      -webkit-line-clamp: unset;
      display: block;
    }

    /* ── Meta row ── */
    .meta {
      display: flex;
      align-items: center;
      gap: var(--cg-spacing-8);
      margin-top: var(--cg-spacing-12);
      padding-top: var(--cg-spacing-8);
      border-top: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
      font-size: var(--cg-font-size-xs);
      color: var(--cg-color-input-text-placeholder);
    }
    .meta-dot {
      width: var(--cg-spacing-2);
      height: var(--cg-spacing-2);
      border-radius: var(--cg-border-radius-full);
      background: var(--cg-color-input-text-placeholder);
    }
    .confidence { font-weight: var(--cg-font-weight-medium); }

    /* ── Expanded detail ── */
    .detail {
      margin-top: var(--cg-spacing-12);
      padding-top: var(--cg-spacing-12);
      border-top: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
      animation: detailReveal var(--cg-transition-duration-default) var(--cg-transition-easing-ease-out) both;
    }
    @keyframes detailReveal {
      from { opacity: 0; transform: translateY(-4px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .sources-label {
      font-size: var(--cg-font-size-xs);
      font-weight: var(--cg-font-weight-medium);
      color: var(--cg-color-input-text-placeholder);
      margin-bottom: var(--cg-spacing-8);
      text-transform: uppercase;
      letter-spacing: var(--cg-letter-spacing-wide);
    }
    .source {
      display: flex;
      align-items: center;
      gap: var(--cg-spacing-6);
      padding: var(--cg-spacing-4) 0;
      font-size: var(--cg-font-size-xs);
      color: var(--cg-color-input-text-placeholder);
    }
    .source a {
      color: var(--cg-color-surface-base-text);
      text-decoration: none;
      font-weight: var(--cg-font-weight-medium);
    }
    .source a:hover { text-decoration: underline; }
    .source a:focus-visible {
      outline: none;
      box-shadow: 0 0 0 var(--cg-focus-ring-offset) var(--cg-color-focus-ring-offset), 0 0 0 calc(var(--cg-focus-ring-offset) + var(--cg-focus-ring-width)) var(--cg-color-focus-ring);
      border-radius: var(--cg-border-radius-50);
    }
    .source-dot { width: var(--cg-spacing-4); height: var(--cg-spacing-4); border-radius: var(--cg-border-radius-full); flex-shrink: 0; }
    .source-dot.high { background: var(--cg-color-status-success-text-default); }
    .source-dot.medium { background: var(--cg-color-status-warning-text-default); }
    .source-dot.low { background: var(--cg-color-input-text-placeholder); }

    /* ── Action buttons ── */
    .actions {
      display: flex;
      gap: var(--cg-spacing-4);
      position: absolute;
      top: var(--cg-spacing-8);
      right: var(--cg-spacing-8);
      opacity: 0;
      transition: opacity var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
    }
    .card:hover .actions { opacity: 1; }

    /* ── Skeleton ── */
    .skeleton {
      display: flex;
      gap: var(--cg-spacing-16);
      padding: var(--cg-spacing-20);
      background: var(--cg-color-surface-cards-background);
      border: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
      border-radius: var(--cg-component-card-radius);
    }
    .skel-icon {
      width: var(--cg-spacing-40); height: var(--cg-spacing-40);
      border-radius: var(--cg-border-radius-50);
      background: linear-gradient(90deg, var(--cg-color-surface-container-background) 25%, var(--cg-color-surface-container-border) 50%, var(--cg-color-surface-container-background) 75%);
      background-size: 200% 100%;
      animation: shimmer 1.5s linear infinite;
    }
    .skel-lines { flex: 1; display: flex; flex-direction: column; gap: var(--cg-spacing-8); }
    .skel-line {
      height: var(--cg-spacing-8);
      border-radius: var(--cg-border-radius-50);
      background: linear-gradient(90deg, var(--cg-color-surface-container-background) 25%, var(--cg-color-surface-container-border) 50%, var(--cg-color-surface-container-background) 75%);
      background-size: 200% 100%;
      animation: shimmer 1.5s linear infinite;
    }
    .skel-line:nth-child(1) { width: 40%; }
    .skel-line:nth-child(2) { width: 90%; }
    .skel-line:nth-child(3) { width: 60%; }

    @media (prefers-reduced-motion: reduce) {
      .card:hover { transform: none; }
      .card:active { transform: none; }
      .detail { animation: none; }
    }
  `];

  @property() type: 'explanation' | 'forecast' | 'anomaly' | 'optimization' | 'classification' = 'explanation';
  @property() text = '';
  @property({ type: Number }) confidence = 0;
  @property() timestamp = '';
  @property({ type: Boolean }) expandable = false;
  @property({ type: Boolean }) expanded = false;
  @property({ type: Array }) sources: Source[] = [];
  @property() status: 'new' | 'read' | 'dismissed' | '' = '';
  @property({ type: Boolean }) loading = false;
  @property({ type: Boolean }) selected = false;

  private _getIconName(): string {
    const icons: Record<string, string> = {
      explanation: 'info',
      forecast: 'chart',
      anomaly: 'warning',
      optimization: 'sparkle',
      classification: 'filter',
    };
    return icons[this.type] || 'info';
  }

  private _handleClick() {
    if (this.expandable) {
      this.expanded = !this.expanded;
      this.dispatchEvent(new CustomEvent('ai-insight-expand', { bubbles: true, composed: true, detail: { expanded: this.expanded, type: this.type } }));
    }
    this.dispatchEvent(new CustomEvent('ai-insight-click', { bubbles: true, composed: true, detail: { type: this.type, text: this.text, confidence: this.confidence } }));
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

  private _relevanceClass(r?: number): string {
    if (!r) return 'low';
    return r >= 0.7 ? 'high' : r >= 0.4 ? 'medium' : 'low';
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
        role="button" tabindex="0" aria-label="${this.type} insight"
        aria-expanded=${this.expandable ? String(this.expanded) : nothing}
        @click=${this._handleClick} @keydown=${this._handleKeyDown}>

        ${this.status && this.status !== 'dismissed' ? html`<div class="status-dot ${this.status}" aria-hidden="true"></div>` : nothing}

        <div class="actions">
          <cg-button variant="tertiary" size="sm" rounded="full" label="Bookmark" @click=${this._handleBookmark}>
            <cg-icon name="star" size="xs"></cg-icon>
          </cg-button>
          <cg-button variant="tertiary" size="sm" rounded="full" label="Dismiss" @click=${this._handleDismiss}>
            <cg-icon name="close" size="xs"></cg-icon>
          </cg-button>
        </div>

        <div class="icon-area ${this.type}" aria-hidden="true"><cg-icon name="${this._getIconName()}" size="sm"></cg-icon></div>

        <div class="content">
          <div class="type-label">${this.type}</div>
          <div class="insight-text">${this.text}</div>

          <div class="meta">
            ${this.confidence > 0 ? html`<span class="confidence" aria-label="Confidence ${Math.round(this.confidence * 100)} percent">${Math.round(this.confidence * 100)}%</span>` : nothing}
            ${this.confidence > 0 && this.timestamp ? html`<span class="meta-dot"></span>` : nothing}
            ${this.timestamp ? html`<span>${this.timestamp}</span>` : nothing}
            ${(this.confidence > 0 || this.timestamp) && this.sources.length > 0 ? html`<span class="meta-dot"></span>` : nothing}
            ${this.sources.length > 0 ? html`<span>${this.sources.length} source${this.sources.length > 1 ? 's' : ''}</span>` : nothing}
          </div>

          ${this.expanded && this.sources.length > 0 ? html`
            <div class="detail">
              <div class="sources-label">Sources</div>
              ${this.sources.map(s => html`
                <div class="source">
                  <div class="source-dot ${this._relevanceClass(s.relevance)}"></div>
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
