import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { hostBlock, reducedMotion } from '../../styles/index.js';

/**
 * <cg-progress-bar> — Linear progress bar with label, buffer, and custom formatting.
 *
 * @example
 * ```html
 * <cg-progress-bar value="68" label="Upload" showValue></cg-progress-bar>
 * <cg-progress-bar value="45" label="Storage" formatValue="45 MB / 100 MB"></cg-progress-bar>
 * <cg-progress-bar value="80" buffer="95" label="Video" showValue></cg-progress-bar>
 * <cg-progress-bar indeterminate label="Processing..."></cg-progress-bar>
 * ```
 *
 * @cssprop --cg-component-progress-radius - Track border radius
 * @cssprop --cg-component-progress-height-sm - Track height sm (4px)
 * @cssprop --cg-component-progress-height-md - Track height md (8px)
 * @cssprop --cg-component-progress-height-lg - Track height lg (12px)
 */
@customElement('cg-progress-bar')
export class CgProgressBar extends LitElement {
  static override styles = [hostBlock, reducedMotion, css`
    :host {
      width: 100%;
    }

    .header {
      display: flex;
      align-items: baseline;
      justify-content: space-between;
      margin-bottom: var(--cg-spacing-6);
    }

    .header-left {
      display: flex;
      flex-direction: column;
      gap: var(--cg-spacing-2);
    }

    .label {
      font-size: var(--cg-font-size-sm);
      font-weight: var(--cg-font-weight-medium);
      color: var(--cg-color-surface-container-text);
      line-height: var(--cg-line-height-snug);
    }

    .description {
      font-size: var(--cg-font-size-xs);
      color: var(--cg-color-surface-container-outlined);
      line-height: var(--cg-line-height-snug);
    }

    .value-text {
      font-size: var(--cg-font-size-xs);
      font-weight: var(--cg-font-weight-semibold);
      color: var(--cg-color-surface-container-text);
      font-variant-numeric: tabular-nums;
      white-space: nowrap;
    }

    /* ── Track ── */
    .track {
      width: 100%;
      background: var(--cg-color-loading-spinner-secondary);
      border-radius: var(--cg-component-progress-radius);
      overflow: hidden;
      position: relative;
    }

    /* Sizes */
    :host([size="sm"]) .track { height: var(--cg-component-progress-height-sm); }
    :host([size="md"]) .track { height: var(--cg-component-progress-height-md); }
    :host([size="lg"]) .track { height: var(--cg-component-progress-height-lg); }

    /* ── Buffer bar (behind fill) ── */
    .buffer {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      border-radius: var(--cg-component-progress-radius);
      background: var(--cg-color-loading-spinner-primary);
      opacity: 0.25;
      transition: width var(--cg-transition-duration-slow) var(--cg-transition-easing-default);
    }

    /* ── Fill bar ── */
    .fill {
      height: 100%;
      border-radius: var(--cg-component-progress-radius);
      transition: width var(--cg-transition-duration-slow) var(--cg-transition-easing-default);
      position: relative;
      overflow: hidden;
    }

    /* ── Variant colors ── */
    :host([variant="default"]) .fill {
      background: var(--cg-color-loading-spinner-primary);
    }
    :host([variant="success"]) .fill {
      background: var(--cg-color-status-success-text-default);
    }
    :host([variant="warning"]) .fill {
      background: var(--cg-color-status-warning-text-default);
    }
    :host([variant="danger"]) .fill {
      background: var(--cg-color-status-error-text-default);
    }

    /* ── Striped pattern ── */
    :host([striped]) .fill::after {
      content: '';
      position: absolute;
      inset: 0;
      background-image: linear-gradient(
        45deg,
        var(--cg-overlay-white-strong) 25%,
        transparent 25%,
        transparent 50%,
        var(--cg-overlay-white-strong) 50%,
        var(--cg-overlay-white-strong) 75%,
        transparent 75%,
        transparent
      );
      background-size: 20px 20px;
    }

    /* ── Animated stripes ── */
    :host([animated]) .fill::after {
      animation: stripe-move 1s linear infinite;
    }

    @keyframes stripe-move {
      from { background-position: 0 0; }
      to { background-position: 20px 0; }
    }

    /* ── Indeterminate ── */
    :host([indeterminate]) .fill {
      width: 40% !important;
      animation: indeterminate-slide 1.5s var(--cg-transition-easing-ease-in-out) infinite;
    }

    @keyframes indeterminate-slide {
      0% { transform: translateX(-100%); }
      50% { transform: translateX(150%); }
      100% { transform: translateX(-100%); }
    }

    @keyframes indeterminate-pulse {
      0%, 100% { opacity: 0.4; }
      50% { opacity: 1; }
    }

    /* ── Min/Max labels ── */
    .range-labels {
      display: flex;
      justify-content: space-between;
      margin-top: var(--cg-spacing-4);
      font-size: var(--cg-font-size-xs);
      color: var(--cg-color-surface-container-outlined);
      font-variant-numeric: tabular-nums;
    }

    /* Reduced motion */
    @media (prefers-reduced-motion: reduce) {
      .fill::before {
        animation: none !important;
        background: none !important;
      }
      :host([animated]) .fill::after {
        animation: none !important;
      }
      :host([indeterminate]) .fill {
        animation: indeterminate-pulse 2s ease-in-out infinite !important;
        animation-duration: 2s !important;
        transform: none !important;
        width: 100% !important;
      }
    }
  `];

  /** Progress value 0–100 */
  @property({ type: Number }) value = 0;

  /** Label text above the bar */
  @property({ type: String }) label = '';

  /** Description text below the label */
  @property({ type: String }) description = '';

  /** Show percentage value */
  @property({ type: Boolean }) showValue = false;

  /** Custom formatted value text (e.g. "45 MB / 100 MB") — overrides percentage */
  @property({ type: String }) formatValue = '';

  /** Buffer value 0–100 (secondary fill, e.g. video buffering) */
  @property({ type: Number }) buffer = 0;

  /** Min label shown under the track */
  @property({ type: String }) minLabel = '';

  /** Max label shown under the track */
  @property({ type: String }) maxLabel = '';

  @property({ type: String, reflect: true }) variant: 'default' | 'success' | 'warning' | 'danger' = 'default';
  @property({ type: Boolean, reflect: true }) indeterminate = false;
  @property({ type: String, reflect: true }) size: 'sm' | 'md' | 'lg' = 'md';
  @property({ type: Boolean, reflect: true }) striped = false;
  @property({ type: Boolean, reflect: true }) animated = false;

  private get _clampedValue(): number {
    return Math.max(0, Math.min(100, this.value));
  }

  private get _clampedBuffer(): number {
    return Math.max(0, Math.min(100, this.buffer));
  }

  private get _displayValue(): string {
    if (this.formatValue) return this.formatValue;
    return `${this._clampedValue}%`;
  }

  override render() {
    const showHeader = this.label || this.description || ((this.showValue || this.formatValue) && !this.indeterminate);
    const showRangeLabels = this.minLabel || this.maxLabel;
    const hasBuffer = this.buffer > 0 && !this.indeterminate;

    return html`
      ${showHeader ? html`
        <div class="header">
          <div class="header-left">
            ${this.label ? html`<span class="label">${this.label}</span>` : nothing}
            ${this.description ? html`<span class="description">${this.description}</span>` : nothing}
          </div>
          ${(this.showValue || this.formatValue) && !this.indeterminate ? html`
            <span class="value-text">${this._displayValue}</span>
          ` : nothing}
        </div>
      ` : nothing}
      <div
        class="track"
        role="progressbar"
        aria-valuenow="${this.indeterminate ? nothing : this._clampedValue}"
        aria-valuemin="0"
        aria-valuemax="100"
        aria-label="${this.label || 'Progress'}"
        aria-busy="${this.indeterminate}"
      >
        ${hasBuffer ? html`
          <div class="buffer" style="width: ${this._clampedBuffer}%"></div>
        ` : nothing}
        <div
          class="fill"
          style="${this.indeterminate ? '' : `width: ${this._clampedValue}%`}"
        ></div>
      </div>
      ${showRangeLabels ? html`
        <div class="range-labels">
          <span>${this.minLabel}</span>
          <span>${this.maxLabel}</span>
        </div>
      ` : nothing}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cg-progress-bar': CgProgressBar;
  }
}
