/**
 * @element ai-badge
 * AI confidence badge with three sizes (sm/md/lg), color-coded levels, tooltip, and optional sparkline.
 *
 * @example
 * ```html
 * <ai-badge score="0.92" size="sm"></ai-badge>
 * <ai-badge score="0.45" size="lg" explanation="Low data coverage"
 *   .history=${[0.3, 0.4, 0.42, 0.45]}></ai-badge>
 * ```
 *
 * @fires {CustomEvent<{score: number, level: string}>} ai-badge-click - Badge clicked
 *
 * @cssprop --cg-color-status-success-text-default - High confidence color
 * @cssprop --cg-color-status-warning-text-default - Medium confidence color
 * @cssprop --cg-color-status-error-text-default - Low confidence color
 */
import { LitElement, html, css, nothing } from 'lit';
import { property, state, customElement } from 'lit/decorators.js';
import { hostBase, reducedMotion } from '../../styles/index.js';

@customElement('ai-badge')
export class AiBadge extends LitElement {
  static override styles = [hostBase, reducedMotion, css`
    :host {
      align-items: center;
      position: relative;
    }

    /* ── Base badge ── */
    .badge {
      display: inline-flex;
      align-items: center;
      gap: var(--cg-spacing-4);
      cursor: pointer;
      border: var(--cg-border-width-50) solid transparent;
      position: relative;
      transition:
        filter var(--cg-transition-duration-fast) var(--cg-transition-easing-default),
        transform var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
    }
    .badge:focus-visible {
      outline: none;
      box-shadow: 0 0 0 3px var(--cg-overlay-accent-strong);
    }
    .badge:hover { filter: brightness(1.1); }
    .badge:active { transform: scale(var(--cg-interaction-press-scale)); }

    /* ── Size: sm ── */
    :host([size="sm"]) .badge {
      padding: var(--cg-spacing-2) var(--cg-spacing-8);
      border-radius: var(--cg-component-ai-badge-radius-sm);
      font-size: var(--cg-font-size-xs);
      font-weight: var(--cg-font-weight-bold);
      gap: var(--cg-spacing-2);
    }

    /* ── Size: md (default) ── */
    .badge {
      padding: var(--cg-spacing-4) var(--cg-spacing-12);
      border-radius: var(--cg-component-ai-badge-radius-md);
      font-size: var(--cg-font-size-xs);
      font-weight: var(--cg-font-weight-bold);
    }

    /* ── Size: lg (card with bar) ── */
    :host([size="lg"]) .badge {
      padding: var(--cg-spacing-12) var(--cg-spacing-16);
      border-radius: var(--cg-component-ai-badge-radius-lg);
      font-size: var(--cg-font-size-sm);
      flex-direction: column;
      align-items: stretch;
      gap: var(--cg-spacing-8);
      min-width: 140px;
    }
    :host([size="lg"]) .top-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    :host([size="lg"]) .bar-track {
      height: var(--cg-spacing-4);
      border-radius: var(--cg-border-radius-full);
      background: var(--cg-overlay-dark-subtle);
      overflow: hidden;
    }
    :host([size="lg"]) .bar-fill {
      height: 100%;
      border-radius: var(--cg-border-radius-full);
      transition: width var(--cg-transition-duration-slow) var(--cg-transition-easing-default);
    }

    /* ── Colors ── */
    .badge.high {
      background: var(--cg-color-status-success-background-default);
      color: var(--cg-color-status-success-text-default);
      border-color: var(--cg-color-status-success-border-default);
    }
    .badge.high .bar-fill { background: var(--cg-color-status-success-text-default); }

    .badge.medium {
      background: var(--cg-color-status-warning-background-default);
      color: var(--cg-color-status-warning-text-default);
      border-color: var(--cg-color-status-warning-border-default);
    }
    .badge.medium .bar-fill { background: var(--cg-color-status-warning-text-default); }

    .badge.low {
      background: var(--cg-color-status-error-background-default);
      color: var(--cg-color-status-error-text-default);
      border-color: var(--cg-color-status-error-border-default);
    }
    .badge.low .bar-fill { background: var(--cg-color-status-error-text-default); }

    .score { letter-spacing: 0.02em; }
    .level-label {
      font-size: var(--cg-font-size-xs);
      font-weight: var(--cg-font-weight-semibold);
      opacity: 0.8;
      text-transform: capitalize;
    }

    /* ── Sparkline ── */
    .sparkline {
      display: flex;
      align-items: flex-end;
      gap: var(--cg-spacing-1);
      height: var(--cg-spacing-16);
      margin-left: var(--cg-spacing-6);
    }
    .spark-bar {
      width: var(--cg-spacing-2);
      border-radius: var(--cg-border-radius-full);
      transition: height var(--cg-transition-duration-slow) var(--cg-transition-easing-default);
      opacity: 0.5;
    }
    .spark-bar:last-child { opacity: 1; }

    /* ── Tooltip ── */
    .tooltip {
      position: absolute;
      bottom: calc(100% + var(--cg-spacing-8));
      left: 50%;
      transform: translateX(-50%);
      background: var(--cg-color-surface-container-background);
      color: var(--cg-color-surface-base-text);
      border: var(--cg-border-width-50) solid var(--cg-color-surface-container-border);
      border-radius: var(--cg-border-radius-100);
      padding: var(--cg-spacing-8) var(--cg-spacing-12);
      font-size: var(--cg-font-size-xs);
      line-height: var(--cg-line-height-snug);
      white-space: nowrap;
      pointer-events: none;
      opacity: 0;
      transition: opacity var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
      z-index: var(--cg-z-index-300);
      box-shadow:
        0 var(--cg-shadow-sm-y) var(--cg-shadow-sm-blur) var(--cg-shadow-sm-spread) rgba(0, 0, 0, 0.08);
    }
    .tooltip::after {
      content: '';
      position: absolute;
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
      border: var(--cg-spacing-4) solid transparent;
      border-top-color: var(--cg-color-surface-container-background);
    }
    .badge:hover .tooltip,
    .badge:focus .tooltip {
      opacity: 1;
    }
    .tooltip-level { font-weight: var(--cg-font-weight-bold); }
    .tooltip-score { opacity: 0.7; margin-left: var(--cg-spacing-4); }
    .tooltip-explanation {
      display: block;
      margin-top: var(--cg-spacing-4);
      font-size: var(--cg-font-size-xs);
      opacity: 0.7;
      white-space: normal;
      max-width: 220px;
    }

    /* Reduced motion */
    @media (prefers-reduced-motion: reduce) {
      .bar-fill { transition: none; }
      .spark-bar { transition: none; }
    }
  `];

  /** Confidence score 0-1 */
  @property({ type: Number }) score: number = 0.85;
  /** Show percentage or level name */
  @property({ type: Boolean }) showPercentage: boolean = true;
  /** Size variant */
  @property({ type: String, reflect: true }) size: 'sm' | 'md' | 'lg' = 'md';
  /** Explanation text for tooltip */
  @property({ type: String }) explanation: string = '';
  /** History array of scores for sparkline */
  @property({ type: Array }) history: number[] = [];
  /** High confidence threshold */
  @property({ type: Number }) highThreshold: number = 0.8;
  /** Low confidence threshold */
  @property({ type: Number }) lowThreshold: number = 0.5;

  @state() private _showTooltip: boolean = false;

  private _getLevel(): 'high' | 'medium' | 'low' {
    if (this.score >= this.highThreshold) return 'high';
    if (this.score >= this.lowThreshold) return 'medium';
    return 'low';
  }

  private _getIconName(): string {
    const level = this._getLevel();
    if (level === 'high') return 'check';
    if (level === 'medium') return 'info';
    return 'warning';
  }

  private _handleClick() {
    this.dispatchEvent(new CustomEvent('ai-badge-click', {
      bubbles: true, composed: true,
      detail: { score: this.score, level: this._getLevel() },
    }));
  }

  private _handleKeyDown(e: KeyboardEvent) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this._handleClick();
    }
  }

  private _getSparkColor(value: number): string {
    if (value >= this.highThreshold) return 'var(--cg-color-status-success-text-default)';
    if (value >= this.lowThreshold) return 'var(--cg-color-status-warning-text-default)';
    return 'var(--cg-color-status-error-text-default)';
  }

  private _renderSparkline() {
    if (this.history.length < 2) return nothing;
    const max = Math.max(...this.history, 1);
    return html`
      <div class="sparkline" aria-hidden="true">
        ${this.history.slice(-12).map(v => html`
          <div class="spark-bar" style="height: ${(v / max) * 16}px; background: ${this._getSparkColor(v)};"></div>
        `)}
      </div>
    `;
  }

  private _renderTooltip() {
    const level = this._getLevel();
    const pct = Math.round(this.score * 100);
    return html`
      <div class="tooltip" role="tooltip">
        <span class="tooltip-level">${level.charAt(0).toUpperCase() + level.slice(1)} confidence</span>
        <span class="tooltip-score">(${pct}%)</span>
        ${this.explanation ? html`<span class="tooltip-explanation">${this.explanation}</span>` : nothing}
      </div>
    `;
  }

  override render() {
    const level = this._getLevel();
    const pct = Math.round(this.score * 100);
    const label = this.showPercentage ? `${pct}%` : level;

    if (this.size === 'lg') {
      return html`
        <div
          class="badge ${level}"
          role="status"
          tabindex="0"
          aria-label="AI confidence: ${pct}%, ${level}"
          @click=${this._handleClick}
          @keydown=${this._handleKeyDown}
        >
          ${this._renderTooltip()}
          <div class="top-row">
            <span style="display:flex;align-items:center;gap:var(--cg-spacing-4);">
              <cg-icon name="${this._getIconName()}" size="xs"></cg-icon>
              <span class="score">${pct}%</span>
            </span>
            <span class="level-label">${level}</span>
          </div>
          <div class="bar-track">
            <div class="bar-fill" style="width: ${pct}%"></div>
          </div>
          ${this._renderSparkline()}
        </div>
      `;
    }

    return html`
      <div
        class="badge ${level}"
        role="status"
        tabindex="0"
        aria-label="AI confidence: ${pct}%, ${level}"
        @click=${this._handleClick}
        @keydown=${this._handleKeyDown}
      >
        ${this._renderTooltip()}
        <cg-icon name="${this._getIconName()}" size="xs"></cg-icon>
        <span class="score">${label}</span>
        ${this._renderSparkline()}
      </div>
    `;
  }
}
