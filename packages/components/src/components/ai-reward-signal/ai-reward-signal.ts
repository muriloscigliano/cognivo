/**
 * @element ai-reward-signal
 * Reward/engagement signal card with score display, trend indicator, sparkline, and progress bar.
 *
 * @example
 * ```html
 * <ai-reward-signal
 *   score="78" maxScore="100" trend="up" label="Engagement"
 *   .history=${[45,52,48,60,65,72,78]}
 * ></ai-reward-signal>
 * ```
 *
 * @fires {CustomEvent<{score, trend}>} ai-reward-detail - Detail requested
 */
import { LitElement, html, css, nothing } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { hostBlock, reducedMotion } from '../../styles/index.js';

@customElement('ai-reward-signal')
export class AiRewardSignal extends LitElement {
  static override styles = [hostBlock, reducedMotion, css`
    .container {
      background: var(--cg-color-surface-cards-background);
      border: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
      border-radius: var(--cg-border-radius-200);
      padding: var(--cg-spacing-20);
      color: var(--cg-color-surface-base-text);
      cursor: pointer;
      transition:
        border-color var(--cg-motion-duration-fast) var(--cg-motion-easing-default),
        box-shadow var(--cg-motion-duration-fast) var(--cg-motion-easing-default);
    }
    .container:hover {
      border-color: var(--cg-color-input-border-hover);
    }
    .container:focus-visible {
      outline: none;
      box-shadow:
        0 0 0 2px var(--cg-color-surface-base-background),
        0 0 0 4px var(--cg-color-focus-ring);
    }

    .top-row {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      margin-bottom: var(--cg-spacing-16);
    }

    .score-section {
      display: flex;
      align-items: baseline;
      gap: var(--cg-spacing-8);
    }
    .score {
      font-size: var(--cg-font-size-3xl);
      font-weight: var(--cg-font-weight-extrabold);
      line-height: 1;
      color: var(--cg-color-surface-base-text);
    }
    .max-score {
      font-size: var(--cg-font-size-sm);
      color: var(--cg-color-input-text-placeholder);
    }

    .trend {
      display: flex;
      align-items: center;
      gap: var(--cg-spacing-4);
      font-size: var(--cg-font-size-xs);
      font-weight: var(--cg-font-weight-bold);
      padding: var(--cg-spacing-4) var(--cg-spacing-8);
      border-radius: var(--cg-border-radius-full);
    }
    .trend.up {
      background: var(--cg-color-status-success-background-default);
      color: var(--cg-color-status-success-text-default);
    }
    .trend.down {
      background: var(--cg-color-status-error-background-default);
      color: var(--cg-color-status-error-text-default);
    }
    .trend.stable {
      background: var(--cg-overlay-dark-subtle);
      color: var(--cg-color-input-text-placeholder);
    }

    /* ── Progress bar ── */
    .progress-track {
      height: var(--cg-spacing-6);
      background: var(--cg-color-surface-cards-divider);
      border-radius: var(--cg-border-radius-50);
      overflow: hidden;
      margin-bottom: var(--cg-spacing-16);
    }
    .progress-fill {
      height: 100%;
      border-radius: var(--cg-border-radius-50);
      background: var(--cg-color-surface-base-text);
      transition: width var(--cg-motion-duration-slow) var(--cg-motion-easing-default);
    }

    /* ── Sparkline ── */
    .sparkline { margin-bottom: var(--cg-spacing-16); }
    .sparkline svg {
      width: 100%;
      height: var(--cg-spacing-40);
      display: block;
    }
    .spark-line {
      fill: none;
      stroke: var(--cg-color-surface-base-text);
      stroke-width: 1.5;
      stroke-linecap: round;
      stroke-linejoin: round;
    }
    .spark-area {
      fill: var(--cg-overlay-dark-subtle);
    }

    /* ── Labels ── */
    .label {
      font-size: var(--cg-font-size-base);
      font-weight: var(--cg-font-weight-semibold);
      margin-bottom: var(--cg-spacing-4);
    }
    .description {
      font-size: var(--cg-font-size-sm);
      color: var(--cg-color-input-text-placeholder);
      line-height: var(--cg-line-height-relaxed);
    }

    /* ── Rounded variants ── */
    :host([rounded="none"]) .container { border-radius: 0; }
    :host([rounded="sm"]) .container { border-radius: var(--cg-border-radius-50); }
    :host([rounded="md"]) .container { border-radius: var(--cg-border-radius-100); }
    :host([rounded="lg"]) .container { border-radius: var(--cg-border-radius-200); }

    @media (prefers-reduced-motion: reduce) {
      .container { transition: none; }
      .progress-fill { transition: none; }
    }
  `];

  @property({ reflect: true }) rounded: 'none' | 'sm' | 'md' | 'lg' = 'lg';
  @property({ type: Number }) score = 0;
  @property({ type: Number }) maxScore = 100;
  @property({ type: String }) trend: 'up' | 'down' | 'stable' = 'stable';
  @property({ attribute: false }) history: number[] = [];
  @property({ type: String }) label = '';
  @property({ type: String }) description = '';

  private get _percent(): number {
    if (this.maxScore <= 0) return 0;
    return Math.min(100, Math.max(0, (this.score / this.maxScore) * 100));
  }

  private get _trendArrow(): string {
    switch (this.trend) {
      case 'up': return '\u2191';
      case 'down': return '\u2193';
      default: return '\u2192';
    }
  }

  private _sparklinePath(): { line: string; area: string } {
    if (this.history.length < 2) return { line: '', area: '' };
    const w = 200, h = 40, pad = 2;
    const min = Math.min(...this.history);
    const max = Math.max(...this.history);
    const range = max - min || 1;
    const step = (w - pad * 2) / (this.history.length - 1);

    const points = this.history.map((v, i) => ({
      x: pad + i * step,
      y: h - pad - ((v - min) / range) * (h - pad * 2),
    }));

    const line = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ');
    const last = points[points.length - 1]!;
    const first = points[0]!;
    const area = `${line} L${last.x},${h} L${first.x},${h} Z`;

    return { line, area };
  }

  private _onDetail() {
    this.dispatchEvent(new CustomEvent('ai-reward-detail', {
      detail: { score: this.score, trend: this.trend },
      bubbles: true, composed: true,
    }));
  }

  override render() {
    const spark = this._sparklinePath();

    return html`
      <div class="container" role="button" tabindex="0"
        aria-label="${this.label}: ${this.score} of ${this.maxScore}, trend ${this.trend}"
        @click=${this._onDetail}
        @keydown=${(e: KeyboardEvent) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); this._onDetail(); } }}>

        <div class="top-row">
          <div class="score-section">
            <span class="score">${this.score}</span>
            <span class="max-score">/ ${this.maxScore}</span>
          </div>
          <span class="trend ${this.trend}">
            <span>${this._trendArrow}</span>
            ${this.trend}
          </span>
        </div>

        <div class="progress-track" role="progressbar" aria-valuenow=${this._percent} aria-valuemin="0" aria-valuemax="100">
          <div class="progress-fill" style="width:${this._percent}%"></div>
        </div>

        ${spark.line ? html`
          <div class="sparkline">
            <svg viewBox="0 0 200 40" preserveAspectRatio="none" aria-hidden="true">
              <path class="spark-area" d="${spark.area}" />
              <path class="spark-line" d="${spark.line}" />
            </svg>
          </div>
        ` : nothing}

        ${this.label ? html`<div class="label">${this.label}</div>` : nothing}
        ${this.description ? html`<div class="description">${this.description}</div>` : nothing}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ai-reward-signal': AiRewardSignal;
  }
}
