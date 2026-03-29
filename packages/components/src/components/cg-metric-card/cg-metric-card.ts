import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * <cg-metric-card> — KPI metric display with trend indicator.
 *
 * Fixes from audit:
 * - CRITICAL: Added ARIA (role, aria-label) — was ZERO accessibility
 * - Added loading skeleton state
 * - Added sparkline mini chart
 * - Added clickable mode with hover state
 * - Added comparison text ("vs last period")
 * - Added icon prop
 * - Added size variants (sm, md, lg)
 */
@customElement('cg-metric-card')
export class CgMetricCard extends LitElement {
  static override styles = css`
    :host {
      transition: color var(--cg-motion-duration-fast, 80ms) var(--cg-motion-easing-color, cubic-bezier(0, 0, 0.58, 1));
      display: block;
      font-family: var(--cg-font-family-primary, 'Inter Variable', 'Inter', -apple-system, sans-serif);
    }

    .card {
      background: var(--cg-color-surface-container-background, #18181b);
      border: 1px solid var(--cg-color-surface-container-border, #27272a);
      border-radius: 12px;
      padding: 18px 20px;
      min-width: 140px;
      transition: all 150ms ease;
    }
    :host([size="sm"]) .card { padding: 12px 14px; min-width: 110px; }
    :host([size="lg"]) .card { padding: 24px 28px; min-width: 180px; }

    .card.clickable { cursor: pointer; }
    .card.clickable:hover {
      border-color: var(--cg-gray-600, #52525b);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
      transform: translateY(-1px);
    }
    .card:focus-visible {
      outline: 2px solid var(--cg-brand-ai-accent, #dfff61);
      outline-offset: 2px;
    }

    /* ── Header row ── */
    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 6px;
    }
    .title-row {
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .title-icon {
      font-size: 14px;
      line-height: 1;
    }
    .title {
      font-size: 11px;
      font-weight: 700;
      color: var(--cg-gray-400, #a1a1aa);
      text-transform: uppercase;
      letter-spacing: 0.06em;
    }
    :host([size="lg"]) .title { font-size: 13px; }

    /* ── Value ── */
    .value {
      font-size: 1.75rem;
      font-weight: 700;
      color: var(--cg-color-surface-base-text, #fafafa);
      line-height: 1.2;
      letter-spacing: -0.02em;
    }
    :host([size="sm"]) .value { font-size: 1.25rem; }
    :host([size="lg"]) .value { font-size: 2.25rem; }

    /* ── Delta badge ── */
    .delta-row {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-top: 8px;
    }
    .delta {
      display: inline-flex;
      align-items: center;
      gap: 3px;
      font-size: 12px;
      font-weight: 700;
      padding: 2px 8px;
      border-radius: 99999px;
    }
    .delta.up {
      color: var(--cg-green-400, #4ade80);
      background: rgba(34, 197, 94, 0.1);
    }
    .delta.down {
      color: var(--cg-red-400, #f87171);
      background: rgba(239, 68, 68, 0.1);
    }
    .delta.neutral {
      color: var(--cg-gray-400, #a1a1aa);
      background: rgba(161, 161, 170, 0.1);
    }
    .arrow { font-size: 10px; }

    .comparison {
      font-size: 11px;
      color: var(--cg-gray-500, #71717a);
    }

    /* ── Sparkline ── */
    .sparkline {
      display: flex;
      align-items: flex-end;
      gap: 2px;
      height: 24px;
      margin-top: 10px;
    }
    .spark-bar {
      flex: 1;
      border-radius: 2px;
      min-width: 3px;
      transition: height 300ms ease;
    }

    /* ── Loading skeleton ── */
    .skeleton .skel {
      border-radius: 6px;
      background: linear-gradient(90deg, var(--cg-gray-800, #27272a) 25%, var(--cg-gray-700, #3f3f46) 50%, var(--cg-gray-800, #27272a) 75%);
      background-size: 200% 100%;
      animation: shimmer 1.5s linear infinite;
    }
    .skel-title { width: 60%; height: 10px; margin-bottom: 10px; }
    .skel-value { width: 45%; height: 22px; margin-bottom: 10px; }
    .skel-delta { width: 30%; height: 14px; }

    @keyframes shimmer {
      0% { background-position: 200% 0; }
      100% { background-position: -200% 0; }
    }

    @media (prefers-reduced-motion: reduce) {
      .card { transition: none; }
      .spark-bar { transition: none; }
      .skeleton .skel { animation: none; background: var(--cg-gray-800, #27272a); }
    }
  `;

  /** Metric label */
  @property() title = '';

  /** Metric value (e.g. "$2.4M") */
  @property() value = '';

  /** Change indicator text (e.g. "+18%") */
  @property() delta = '';

  /** Trend direction */
  @property() trend: 'up' | 'down' | 'neutral' = 'neutral';

  /** Leading icon (emoji or text) */
  @property() icon = '';

  /** Comparison text (e.g. "vs last quarter") */
  @property() comparison = '';

  /** Sparkline data array (numbers) */
  @property({ type: Array }) sparkline: number[] = [];

  /** Card size */
  @property({ type: String, reflect: true }) size: 'sm' | 'md' | 'lg' = 'md';

  /** Loading skeleton state */
  @property({ type: Boolean }) loading = false;

  /** Make card clickable */
  @property({ type: Boolean }) clickable = false;

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
    const ratio = value / max;
    if (this.trend === 'up') return ratio > 0.7 ? 'var(--cg-green-400, #4ade80)' : 'rgba(34, 197, 94, 0.3)';
    if (this.trend === 'down') return ratio > 0.7 ? 'var(--cg-red-400, #f87171)' : 'rgba(239, 68, 68, 0.3)';
    return ratio > 0.7 ? 'var(--cg-gray-400, #a1a1aa)' : 'rgba(161, 161, 170, 0.2)';
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

    const arrow = this.trend === 'up' ? '↑' : this.trend === 'down' ? '↓' : '→';
    const ariaLabel = `${this.title}: ${this.value}${this.delta ? `, ${this.delta} ${this.trend}` : ''}`;

    return html`
      <div
        class="card ${this.clickable ? 'clickable' : ''}"
        role="figure"
        aria-label="${ariaLabel}"
        tabindex="${this.clickable ? '0' : '-1'}"
        @click=${this._handleClick}
        @keydown=${this._handleKeyDown}
      >
        <div class="header">
          <div class="title-row">
            ${this.icon ? html`<span class="title-icon" aria-hidden="true">${this.icon}</span>` : nothing}
            <div class="title">${this.title}</div>
          </div>
        </div>

        <div class="value">${this.value}</div>

        ${this.delta || this.comparison ? html`
          <div class="delta-row">
            ${this.delta ? html`
              <span class="delta ${this.trend}" aria-label="${this.delta} ${this.trend}">
                <span class="arrow" aria-hidden="true">${arrow}</span>
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
              return this.sparkline.map(v => html`
                <div class="spark-bar" style="height: ${Math.max((v / max) * 24, 2)}px; background: ${this._getSparkColor(v, max)};"></div>
              `);
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
