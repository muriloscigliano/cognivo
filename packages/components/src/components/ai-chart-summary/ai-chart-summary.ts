/**
 * @element ai-chart-summary
 * AI-generated chart insight — clean card with summary, trends, and metadata.
 *
 * @fires {CustomEvent<{collapsed: boolean}>} ai-summary-toggle
 * @fires {CustomEvent<{label, direction, value}>} ai-summary-trend-click
 * @fires {CustomEvent} ai-summary-refresh
 */
import { LitElement, html, css, nothing } from 'lit';
import { property, state, customElement } from 'lit/decorators.js';
import { hostBlock, reducedMotion, shimmerKeyframes } from '../../styles/index.js';

interface Trend {
  label: string;
  direction: 'up' | 'down' | 'neutral';
  value: string;
}

@customElement('ai-chart-summary')
export class AiChartSummary extends LitElement {
  static override styles = [hostBlock, reducedMotion, shimmerKeyframes, css`
    :host { display: block; }

    .card {
      background: var(--cg-color-surface-cards-background);
      border: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
      border-radius: var(--cg-component-card-radius);
      padding: var(--cg-spacing-20) var(--cg-spacing-24);
    }

    /* ── Header ── */
    .header {
      display: flex;
      align-items: center;
      gap: var(--cg-spacing-8);
      margin-bottom: var(--cg-spacing-16);
    }
    .ai-dot {
      width: var(--cg-spacing-6);
      height: var(--cg-spacing-6);
      background: var(--cg-color-accent-text);
      border-radius: var(--cg-border-radius-full);
      flex-shrink: 0;
    }
    .header-label {
      font-size: var(--cg-font-size-xs);
      font-weight: var(--cg-font-weight-medium);
      color: var(--cg-color-input-text-placeholder);
      text-transform: uppercase;
      letter-spacing: var(--cg-letter-spacing-wide);
    }
    .header-right {
      margin-left: auto;
      display: flex;
      align-items: center;
      gap: var(--cg-spacing-8);
    }
    .time-range {
      font-size: var(--cg-font-size-xs);
      color: var(--cg-color-input-text-placeholder);
    }
    .icon-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: var(--cg-spacing-24);
      height: var(--cg-spacing-24);
      border: none;
      background: transparent;
      color: var(--cg-color-input-text-placeholder);
      border-radius: var(--cg-border-radius-50);
      cursor: pointer;
      padding: 0;
      transition: color var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
    }
    .icon-btn:hover { color: var(--cg-color-surface-base-text); }
    .icon-btn:active { transform: scale(var(--cg-interaction-press-scale)); }
    .icon-btn svg { width: var(--cg-spacing-12); height: var(--cg-spacing-12); }

    /* ── Summary text ── */
    .summary-text {
      font-size: var(--cg-font-size-sm);
      color: var(--cg-color-surface-base-text);
      line-height: var(--cg-line-height-normal);
      margin-bottom: var(--cg-spacing-20);
    }

    /* ── Trends ── */
    .trends {
      display: flex;
      flex-wrap: wrap;
      margin-bottom: var(--cg-spacing-16);
    }
    .trend {
      display: flex;
      flex-direction: column;
      gap: var(--cg-spacing-2);
      cursor: pointer;
      padding: 0 var(--cg-spacing-20);
      border-right: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
    }
    .trend:first-child { padding-left: 0; }
    .trend:last-child { border-right: none; padding-right: 0; }
    .trend:hover { opacity: 0.8; }
    .trend-header {
      display: flex;
      align-items: center;
      gap: var(--cg-spacing-4);
      font-size: var(--cg-font-size-xs);
      color: var(--cg-color-input-text-placeholder);
      font-weight: var(--cg-font-weight-medium);
    }
    .trend-value {
      font-size: var(--cg-font-size-lg);
      font-weight: var(--cg-font-weight-semibold);
      letter-spacing: var(--cg-letter-spacing-tight);
    }
    .trend.up .trend-value { color: var(--cg-color-status-success-text-default); }
    .trend.down .trend-value { color: var(--cg-color-status-error-text-default); }
    .trend.neutral .trend-value { color: var(--cg-color-surface-base-text); }
    .trend-icon svg { width: 10px; height: 10px; display: block; }

    /* ── Footer metadata ── */
    .footer {
      display: flex;
      align-items: center;
      gap: var(--cg-spacing-8);
      padding-top: var(--cg-spacing-12);
      border-top: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
      font-size: var(--cg-font-size-xs);
      color: var(--cg-color-input-text-placeholder);
    }
    .confidence {
      font-weight: var(--cg-font-weight-medium);
    }
    .dot-sep {
      width: var(--cg-spacing-2);
      height: var(--cg-spacing-2);
      border-radius: var(--cg-border-radius-full);
      background: var(--cg-color-input-text-placeholder);
      flex-shrink: 0;
    }
    .type-tag {
      text-transform: capitalize;
    }

    /* ── Collapsed ── */
    .collapsed .summary-text,
    .collapsed .trends,
    .collapsed .footer { display: none; }

    /* ── Compact ── */
    :host([compact]) .card { padding: var(--cg-spacing-12); }
    :host([compact]) .summary-text { display: none; }
    :host([compact]) .header { margin-bottom: var(--cg-spacing-8); }

    /* ── Loading ── */
    .skel {
      border-radius: var(--cg-border-radius-50);
      background: linear-gradient(90deg, var(--cg-color-surface-container-background) 25%, var(--cg-color-surface-container-border) 50%, var(--cg-color-surface-container-background) 75%);
      background-size: 200% 100%;
      animation: shimmer 1.5s linear infinite;
    }
    .skel-line { height: var(--cg-spacing-12); margin-bottom: var(--cg-spacing-8); }
    .skel-line:nth-child(2) { width: 80%; }
    .skel-line:nth-child(3) { width: 50%; }
  `];

  @property() summary = '';
  @property({ type: Array }) trends: Trend[] = [];
  @property({ type: Boolean }) collapsible = false;
  @property({ type: Number }) confidence = 0;
  @property() type: 'summary' | 'anomaly' | 'forecast' | 'comparison' = 'summary';
  @property({ type: Boolean, reflect: true }) compact = false;
  @property({ type: Boolean }) loading = false;
  @property() timeRange = '';

  @state() private _collapsed = false;

  private _toggle() {
    this._collapsed = !this._collapsed;
    this.dispatchEvent(new CustomEvent('ai-summary-toggle', { bubbles: true, composed: true, detail: { collapsed: this._collapsed } }));
  }

  private _handleTrendClick(trend: Trend) {
    this.dispatchEvent(new CustomEvent('ai-summary-trend-click', { bubbles: true, composed: true, detail: trend }));
  }

  private _handleRefresh() {
    this.dispatchEvent(new CustomEvent('ai-summary-refresh', { bubbles: true, composed: true }));
  }

  override render() {
    if (this.loading) {
      return html`
        <div class="card">
          <div class="header">
            <span class="ai-dot"></span>
            <span class="header-label">AI Insight</span>
          </div>
          <div class="skel skel-line" style="width:100%"></div>
          <div class="skel skel-line"></div>
          <div class="skel skel-line"></div>
        </div>
      `;
    }

    if (!this.summary) return nothing;

    const hasFooter = this.confidence > 0 || this.type !== 'summary';

    return html`
      <div class="card ${this._collapsed ? 'collapsed' : ''}" role="complementary" aria-label="AI chart insight">
        <div class="header">
          <span class="ai-dot"></span>
          <span class="header-label">AI Insight</span>
          <div class="header-right">
            ${this.timeRange ? html`<span class="time-range">${this.timeRange}</span>` : nothing}
            <button class="icon-btn" @click=${this._handleRefresh} aria-label="Refresh">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M23 4v6h-6"/><path d="M1 20v-6h6"/><path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15"/></svg>
            </button>
            ${this.collapsible ? html`
              <button class="icon-btn" @click=${this._toggle} aria-expanded="${!this._collapsed}" aria-label="${this._collapsed ? 'Expand' : 'Collapse'}">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
                  <path d="${this._collapsed ? 'M6 9l6 6 6-6' : 'M18 15l-6-6-6 6'}"/>
                </svg>
              </button>
            ` : nothing}
          </div>
        </div>

        <div class="summary-text">${this.summary}</div>

        ${this.trends.length > 0 ? html`
          <div class="trends">
            ${this.trends.map(t => html`
              <span class="trend ${t.direction}" @click=${() => this._handleTrendClick(t)} role="button" tabindex="0">
                <span class="trend-header">
                  <span class="trend-icon" aria-hidden="true">
                    ${t.direction === 'up'
                      ? html`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M12 19V5m-7 7l7-7 7 7"/></svg>`
                      : t.direction === 'down'
                      ? html`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M12 5v14m7-7l-7 7-7-7"/></svg>`
                      : html`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M5 12h14"/></svg>`}
                  </span>
                  ${t.label}
                </span>
                <span class="trend-value">${t.value}</span>
              </span>
            `)}
          </div>
        ` : nothing}

        ${hasFooter ? html`
          <div class="footer">
            ${this.confidence > 0 ? html`<span class="confidence">${Math.round(this.confidence * 100)}% confidence</span>` : nothing}
            ${this.confidence > 0 && this.type !== 'summary' ? html`<span class="dot-sep"></span>` : nothing}
            ${this.type !== 'summary' ? html`<span class="type-tag">${this.type}</span>` : nothing}
          </div>
        ` : nothing}
      </div>
    `;
  }
}
