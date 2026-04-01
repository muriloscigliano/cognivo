/**
 * @element ai-badge
 * AI confidence badge with three sizes (sm/md/lg), color-coded levels, tooltip, and optional sparkline.
 *
 * @example
 * ```html
 * <ai-badge score="0.92" size="sm"></ai-badge>
 * <ai-badge score="0.45" size="lg" explanation="Low training data coverage"
 *   .history=${[0.3, 0.4, 0.42, 0.45]}></ai-badge>
 * ```
 *
 * @fires {CustomEvent<{score: number, level: string}>} ai-badge-click - Badge clicked
 *
 * @cssprop [--cg-brand-ai-accent=#dfff61] - Focus ring color
 * @cssprop [--cg-green-400=#4ade80] - High confidence color
 * @cssprop [--cg-yellow-400=#fbbf24] - Medium confidence color
 * @cssprop [--cg-red-400=#f87171] - Low confidence color
 */
import { LitElement, html, css, nothing } from 'lit';
import { property, state, customElement } from 'lit/decorators.js';
import { hostBase, reducedMotion, fadeSlideInKeyframes } from '../../styles/index.js';

@customElement('ai-badge')
export class AiBadge extends LitElement {
  static override styles = [hostBase, reducedMotion, fadeSlideInKeyframes, css`
    :host {
      align-items: center;
      position: relative;
      animation: fadeSlideIn 200ms var(--cg-motion-easing-enter, cubic-bezier(0, 0, 0.2, 1)) both;
    }

    /* ── Base badge ── */
    .badge {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      cursor: pointer;
      transition: all 200ms ease;
      border: 1px solid transparent;
      position: relative;
      box-shadow: inset 0 1px 0 0 rgba(255, 255, 255, 0.05);
      background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0.03), transparent);
    }
    .badge:focus-visible {
      outline: 2px solid var(--cg-brand-ai-accent, #dfff61);
      outline-offset: 2px;
    }
    .badge:hover { filter: brightness(1.15); }

    /* ── Size: sm ── */
    :host([size="sm"]) .badge {
      padding: 1px 8px;
      border-radius: 4px;
      font-size: 11px;
      font-weight: 700;
      gap: 3px;
    }
    :host([size="sm"]) .icon { font-size: 9px; }

    /* ── Size: md (default) ── */
    .badge {
      padding: 4px 12px;
      border-radius: var(--cg-border-radius-full, 99999px);
      font-size: 12px;
      font-weight: 700;
    }

    /* ── Size: lg (card with bar) ── */
    :host([size="lg"]) .badge {
      padding: 10px 16px;
      border-radius: 10px;
      font-size: 14px;
      flex-direction: column;
      align-items: stretch;
      gap: 8px;
      min-width: 140px;
    }
    :host([size="lg"]) .top-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    :host([size="lg"]) .bar-track {
      height: 4px;
      border-radius: 2px;
      background: rgba(255, 255, 255, 0.08);
      overflow: hidden;
    }
    :host([size="lg"]) .bar-fill {
      height: 100%;
      border-radius: 2px;
      transition: width var(--cg-motion-duration-slow, 500ms) var(--cg-motion-easing-default, cubic-bezier(0.4, 0, 0.2, 1));
    }

    /* ── Colors ── */
    .badge.high {
      background: rgba(34, 197, 94, 0.12);
      color: var(--cg-green-400, #4ade80);
      border-color: rgba(34, 197, 94, 0.2);
    }
    .badge.high .bar-fill { background: var(--cg-green-400, #4ade80); }

    .badge.medium {
      background: rgba(245, 158, 11, 0.12);
      color: var(--cg-yellow-400, #fbbf24);
      border-color: rgba(245, 158, 11, 0.2);
    }
    .badge.medium .bar-fill { background: var(--cg-yellow-400, #fbbf24); }

    .badge.low {
      background: rgba(239, 68, 68, 0.12);
      color: var(--cg-red-400, #f87171);
      border-color: rgba(239, 68, 68, 0.2);
    }
    .badge.low .bar-fill { background: var(--cg-red-400, #f87171); }

    .icon { font-size: 11px; line-height: 1; }
    .score { letter-spacing: 0.02em; }
    .level-label { font-size: 11px; font-weight: 600; opacity: 0.8; text-transform: capitalize; }

    /* ── Sparkline ── */
    .sparkline {
      display: flex;
      align-items: flex-end;
      gap: 1px;
      height: 16px;
      margin-left: 6px;
    }
    .spark-bar {
      width: 2px;
      border-radius: 1px;
      transition: height 300ms ease;
      opacity: 0.5;
    }
    .spark-bar:last-child { opacity: 1; }

    /* ── Tooltip ── */
    .tooltip {
      position: absolute;
      bottom: calc(100% + 8px);
      left: 50%;
      transform: translateX(-50%);
      background: var(--cg-gray-800, #27272a);
      color: var(--cg-color-surface-base-text, #fafafa);
      border: 1px solid var(--cg-gray-700, #3f3f46);
      border-radius: 8px;
      padding: 8px 12px;
      font-size: 12px;
      line-height: 1.4;
      white-space: nowrap;
      pointer-events: none;
      opacity: 0;
      transition: opacity 150ms ease;
      z-index: 100;
      box-shadow: var(--cg-elevation-2, 0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -2px rgba(0, 0, 0, 0.2));
    }
    .tooltip::after {
      content: '';
      position: absolute;
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
      border: 5px solid transparent;
      border-top-color: var(--cg-gray-800, #27272a);
    }
    .badge:hover .tooltip,
    .badge:focus .tooltip {
      opacity: 1;
    }
    .tooltip-level { font-weight: 700; }
    .tooltip-score { opacity: 0.7; margin-left: 4px; }
    .tooltip-explanation {
      display: block;
      margin-top: 4px;
      font-size: 11px;
      opacity: 0.7;
      white-space: normal;
      max-width: 220px;
    }
    }
  `];
  /** Confidence score 0-1 */
  @property({ type: Number }) score: number = 0.85;

  /** Show percentage or level name */
  @property({ type: Boolean }) showPercentage: boolean = true;

  /** Size: sm, md, lg */
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

  private _getIcon(): unknown {
    const level = this._getLevel();
    if (level === 'high') return html`<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>`;
    if (level === 'medium') return html`<svg width="8" height="8" viewBox="0 0 8 8"><circle cx="4" cy="4" r="4" fill="currentColor"/></svg>`;
    return html`<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/></svg>`;
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
    if (value >= this.highThreshold) return 'var(--cg-green-400, #4ade80)';
    if (value >= this.lowThreshold) return 'var(--cg-yellow-400, #fbbf24)';
    return 'var(--cg-red-400, #f87171)';
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
            <span>
              <span class="icon" aria-hidden="true">${this._getIcon()}</span>
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
        <span class="icon" aria-hidden="true">${this._getIcon()}</span>
        <span class="score">${label}</span>
        ${this._renderSparkline()}
      </div>
    `;
  }
}
