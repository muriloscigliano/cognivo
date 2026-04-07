import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { hostBlock, reducedMotion, shimmerKeyframes } from '../../styles/index.js';

/**
 * <cg-metric-card> — KPI metric display with trend indicator and sparkline.
 *
 * @example
 * ```html
 * <cg-metric-card title="Revenue" value="$2.4M" delta="+18%" trend="up" icon="chart" comparison="vs last quarter"></cg-metric-card>
 * ```
 *
 * @fires {CustomEvent} cg-metric-click - When a clickable card is clicked
 */
@customElement('cg-metric-card')
export class CgMetricCard extends LitElement {
  static override styles = [hostBlock, reducedMotion, shimmerKeyframes, css`
    .card {
      background: var(--cg-color-surface-cards-background);
      border: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
      border-radius: var(--cg-component-card-radius);
      padding: var(--cg-spacing-20);
      transition: border-color var(--cg-motion-duration-normal) var(--cg-motion-easing-default), transform var(--cg-motion-duration-normal) var(--cg-motion-easing-default), box-shadow var(--cg-motion-duration-normal) var(--cg-motion-easing-default), background var(--cg-motion-duration-normal) var(--cg-motion-easing-default);
    }
    :host([size="sm"]) .card { padding: var(--cg-spacing-12) var(--cg-spacing-16); }
    :host([size="lg"]) .card { padding: var(--cg-spacing-24) var(--cg-spacing-32); }

    /* Hover — subtle border glow on all cards */
    .card:hover {
      border-color: var(--cg-color-surface-cards-hover-border);
    }

    .card.clickable { cursor: pointer; }
    .card.clickable:hover {
      background: var(--cg-color-surface-cards-hover-background);
      transform: translateY(var(--cg-interaction-hover-lift));
    }
    .card.clickable:active {
      transform: scale(var(--cg-interaction-press-scale));
    }
    .card:focus-visible {
      outline: none;
      box-shadow: 0 0 0 3px var(--cg-overlay-accent-strong);
    }

    /* Value entrance animation */
    .value {
      animation: valueSlideIn var(--cg-motion-duration-slow) var(--cg-motion-easing-enter) both;
    }
    @keyframes valueSlideIn {
      from { opacity: 0; transform: translateY(var(--cg-spacing-4)); }
      to { opacity: 1; transform: translateY(0); }
    }
    .delta-row {
      animation: valueSlideIn var(--cg-motion-duration-slow) 80ms var(--cg-motion-easing-enter) both;
    }

    /* ── Header row ── */
    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: var(--cg-spacing-6);
    }
    .title-row {
      display: flex;
      align-items: center;
      gap: var(--cg-spacing-6);
    }
    .title-icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      color: var(--cg-color-surface-container-outlined);
    }
    .title-icon cg-icon {
      --cg-icon-size: var(--cg-icon-size-100);
    }
    .title {
      font-size: var(--cg-font-size-xs);
      font-weight: var(--cg-font-weight-medium);
      color: var(--cg-color-surface-container-outlined);
      text-transform: uppercase;
      letter-spacing: var(--cg-letter-spacing-wide);
    }
    :host([size="lg"]) .title { font-size: var(--cg-font-size-sm); }

    /* ── Value ── */
    .value {
      font-size: var(--cg-font-size-2xl);
      font-weight: var(--cg-font-weight-bold);
      color: var(--cg-color-surface-base-text);
      line-height: var(--cg-line-height-tight);
      letter-spacing: var(--cg-letter-spacing-tight);
    }
    :host([size="sm"]) .value { font-size: var(--cg-font-size-lg); }
    :host([size="lg"]) .value { font-size: var(--cg-font-size-4xl); }

    /* ── Delta badge ── */
    .delta-row {
      display: flex;
      align-items: center;
      gap: var(--cg-spacing-8);
      margin-top: var(--cg-spacing-8);
    }
    .delta {
      display: inline-flex;
      align-items: center;
      gap: var(--cg-spacing-4);
      font-size: var(--cg-font-size-xs);
      font-weight: var(--cg-font-weight-semibold);
      padding: var(--cg-spacing-2) var(--cg-spacing-8);
      border-radius: var(--cg-border-radius-full);
    }
    .delta.positive {
      color: var(--cg-color-status-success-text-default);
      background: var(--cg-color-status-success-background-default);
    }
    .delta.negative {
      color: var(--cg-color-status-error-text-default);
      background: var(--cg-color-status-error-background-default);
    }
    .delta.neutral {
      color: var(--cg-color-surface-container-outlined);
      background: var(--cg-color-action-secondary-background-default);
    }
    .delta-arrow {
      display: inline-flex;
    }
    .delta-arrow svg {
      width: var(--cg-spacing-12);
      height: var(--cg-spacing-12);
    }

    .comparison {
      font-size: var(--cg-font-size-xs);
      color: var(--cg-color-surface-container-outlined);
    }

    /* ── Sparkline ── */
    .sparkline {
      display: flex;
      align-items: flex-end;
      gap: var(--cg-spacing-2);
      height: var(--cg-spacing-32);
      margin-top: var(--cg-spacing-12);
      padding-top: var(--cg-spacing-12);
      border-top: var(--cg-border-width-50) solid var(--cg-color-surface-cards-divider);
    }
    .spark-bar {
      flex: 1;
      border-radius: var(--cg-border-radius-50);
      min-width: var(--cg-spacing-4);
      transition: height var(--cg-motion-duration-slow) var(--cg-motion-easing-default);
    }
    .spark-bar {
      opacity: 0.4;
      transition: height var(--cg-motion-duration-slow) var(--cg-motion-easing-default), opacity var(--cg-motion-duration-fast) var(--cg-motion-easing-default), transform var(--cg-motion-duration-fast) var(--cg-motion-easing-bounce);
    }
    .spark-bar.highlight {
      opacity: 1;
    }
    .sparkline:hover .spark-bar {
      opacity: 0.25;
    }
    .sparkline:hover .spark-bar:hover {
      opacity: 1;
      transform: scaleY(1.15);
      transform-origin: bottom;
    }

    /* ── Loading skeleton ── */
    .skeleton .skel {
      border-radius: var(--cg-border-radius-50);
      background: var(--cg-color-surface-cards-border);
      position: relative;
      overflow: hidden;
    }
    .skeleton .skel::after {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(90deg, transparent 25%, var(--cg-overlay-dark-light) 50%, transparent 75%);
      background-size: 200% 100%;
      animation: shimmer 1.5s linear infinite;
    }
    .skel-title { width: 60%; height: var(--cg-spacing-12); margin-bottom: var(--cg-spacing-8); }
    .skel-value { width: 45%; height: var(--cg-spacing-24); margin-bottom: var(--cg-spacing-8); }
    .skel-delta { width: 30%; height: var(--cg-spacing-16); }

    /* Rounded variants */
    :host([rounded="none"]) .card { border-radius: 0; }
    :host([rounded="sm"]) .card { border-radius: var(--cg-border-radius-50); }
    :host([rounded="md"]) .card { border-radius: var(--cg-border-radius-100); }
    :host([rounded="lg"]) .card { border-radius: var(--cg-component-card-radius); }
  `];

  /** Metric label (e.g. "Revenue", "Active Users") */
  @property() override title = '';

  /** Metric value (e.g. "$2.4M", "14.2K") */
  @property() value = '';

  /** Change text (e.g. "+18%", "-0.3%") */
  @property() delta = '';

  /** Trend direction — which way the number moved */
  @property() trend: 'up' | 'down' | 'neutral' = 'neutral';

  /** Whether down=good (e.g. churn, latency, error rate) */
  @property({ type: Boolean }) invertTrend = false;

  /** Icon name (cg-icon name) or emoji string */
  @property() icon = '';

  /** Comparison period text (e.g. "vs last quarter") */
  @property() comparison = '';

  /** Sparkline data points */
  @property({ type: Array }) sparkline: number[] = [];

  /** Card size */
  @property({ type: String, reflect: true }) size: 'sm' | 'md' | 'lg' = 'md';

  /** Border radius variant */
  @property({ reflect: true }) rounded: 'none' | 'sm' | 'md' | 'lg' = 'lg';

  /** Show loading skeleton */
  @property({ type: Boolean, reflect: true }) loading = false;

  /** Make card clickable */
  @property({ type: Boolean }) clickable = false;

  /** Get the sentiment class based on trend + invertTrend */
  private _getSentiment(): 'positive' | 'negative' | 'neutral' {
    if (this.trend === 'neutral') return 'neutral';
    if (this.invertTrend) {
      return this.trend === 'up' ? 'negative' : 'positive';
    }
    return this.trend === 'up' ? 'positive' : 'negative';
  }

  private _handleClick() {
    if (!this.clickable) return;
    this.dispatchEvent(new CustomEvent('cg-metric-click', {
      bubbles: true, composed: true,
      detail: { title: this.title, value: this.value, delta: this.delta, trend: this.trend },
    }));
  }

  private _handleKeyDown(e: KeyboardEvent) {
    if (this.clickable && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      this._handleClick();
    }
  }

  private _getSparkColor(value: number, max: number): string {
    const sentiment = this._getSentiment();
    const ratio = value / max;
    const isHigh = ratio > 0.6;
    if (sentiment === 'positive') return isHigh ? 'var(--cg-color-status-success-text-default)' : 'var(--cg-color-status-success-background-default)';
    if (sentiment === 'negative') return isHigh ? 'var(--cg-color-status-error-text-default)' : 'var(--cg-color-status-error-background-default)';
    return isHigh ? 'var(--cg-color-surface-container-outlined)' : 'var(--cg-color-action-secondary-background-default)';
  }

  private _isIconName(icon: string): boolean {
    return /^[a-z]/.test(icon) && !icon.includes(' ');
  }

  override render() {
    if (this.loading) {
      return html`
        <div class="card skeleton" role="status" aria-label="Loading metric">
          <div class="skel skel-title"></div>
          <div class="skel skel-value"></div>
          <div class="skel skel-delta"></div>
        </div>
      `;
    }

    const sentiment = this._getSentiment();
    const arrow = this.trend === 'up'
      ? html`<span class="delta-arrow" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5m-7 7l7-7 7 7"/></svg></span>`
      : this.trend === 'down'
      ? html`<span class="delta-arrow" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14m7-7l-7 7-7-7"/></svg></span>`
      : nothing;

    const trendText = this.trend === 'neutral' ? '' : this.trend;
    const ariaLabel = `${this.title}: ${this.value}${this.delta ? `, ${this.delta} ${trendText}` : ''}${this.comparison ? ` ${this.comparison}` : ''}`;

    return html`
      <div
        class="card ${this.clickable ? 'clickable' : ''}"
        role="figure"
        aria-roledescription="metric"
        aria-label="${ariaLabel}"
        tabindex="${this.clickable ? '0' : nothing}"
        @click=${this._handleClick}
        @keydown=${this._handleKeyDown}
      >
        <div class="header">
          <div class="title-row">
            ${this.icon ? html`<span class="title-icon" aria-hidden="true">${this._isIconName(this.icon) ? html`<cg-icon name="${this.icon}" size="sm" color="muted"></cg-icon>` : this.icon}</span>` : nothing}
            <span class="title">${this.title}</span>
          </div>
        </div>

        <div class="value">${this.value}</div>

        ${this.delta || this.comparison ? html`
          <div class="delta-row">
            ${this.delta ? html`
              <span class="delta ${sentiment}">
                ${arrow}
                ${this.delta}
              </span>
            ` : nothing}
            ${this.comparison ? html`<span class="comparison">${this.comparison}</span>` : nothing}
          </div>
        ` : nothing}

        ${this.sparkline.length > 1 ? html`
          <div class="sparkline" aria-hidden="true">
            ${(() => {
              const max = Math.max(...this.sparkline, 1);
              return this.sparkline.map(v => {
                const h = Math.max((v / max) * 32, 2);
                return html`<div class="spark-bar ${v / max > 0.6 ? 'highlight' : 'dim'}" style="height: ${h}px; background: ${this._getSparkColor(v, max)};"></div>`;
              });
            })()}
          </div>
        ` : nothing}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap { 'cg-metric-card': CgMetricCard; }
}
