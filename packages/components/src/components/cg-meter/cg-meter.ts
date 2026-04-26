import { LitElement, html, css, nothing, svg } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { hostBlock, reducedMotion } from '../../styles/index.js';

/**
 * @element cg-meter
 * Measurement gauge (battery, disk, score) with threshold coloring.
 * Different from cg-progress-bar: meter = measurement within a range, progress = task completion.
 *
 * @example
 * ```html
 * <cg-meter value="72" low="20" high="80" optimum="50" label="CPU usage" show-value></cg-meter>
 * <cg-meter variant="circular" value="85" label="Battery"></cg-meter>
 * ```
 */
@customElement('cg-meter')
export class CgMeter extends LitElement {
  static override styles = [hostBlock, reducedMotion, css`
    :host { width: 100%; font-family: var(--cg-font-family-primary); }
    :host([disabled]) { opacity: 0.5; cursor: not-allowed; }
    :host([disabled]) .track,
    :host([disabled]) .circular { pointer-events: none; }

    .header {
      display: flex;
      align-items: baseline;
      justify-content: space-between;
      gap: var(--cg-spacing-8);
      margin-bottom: var(--cg-spacing-6);
    }
    .label {
      font-size: var(--cg-font-size-sm);
      font-weight: var(--cg-font-weight-medium);
      color: var(--cg-color-surface-container-text);
      line-height: var(--cg-line-height-snug);
    }
    .value-text {
      font-size: var(--cg-font-size-xs);
      font-weight: var(--cg-font-weight-semibold);
      color: var(--cg-color-surface-container-text);
      font-variant-numeric: tabular-nums;
    }

    /* ── Linear ── */
    .track {
      width: 100%;
      background: var(--cg-color-surface-container-background);
      border-radius: var(--cg-component-meter-radius);
      overflow: hidden;
      position: relative;
    }
    :host([size="sm"]) .track { height: var(--cg-component-meter-height-sm); }
    :host([size="md"]) .track { height: var(--cg-component-meter-height-md); }
    :host([size="lg"]) .track { height: var(--cg-component-meter-height-lg); }

    .fill {
      height: 100%;
      border-radius: var(--cg-component-meter-radius);
      transition: width var(--cg-transition-duration-slow) var(--cg-transition-easing-default);
    }

    .fill.ok { background: var(--cg-color-status-success-text-default); }
    .fill.warn { background: var(--cg-color-status-warning-text-default); }
    .fill.bad { background: var(--cg-color-status-error-text-default); }

    /* ── Circular ── */
    .circular {
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
    }
    :host([size="sm"]) .circular { width: var(--cg-component-meter-circular-size-sm); height: var(--cg-component-meter-circular-size-sm); }
    :host([size="md"]) .circular { width: var(--cg-component-meter-circular-size-md); height: var(--cg-component-meter-circular-size-md); }
    :host([size="lg"]) .circular { width: var(--cg-component-meter-circular-size-lg); height: var(--cg-component-meter-circular-size-lg); }

    .circular svg {
      width: 100%;
      height: 100%;
      transform: rotate(-90deg);
    }
    .circular .bg {
      stroke: var(--cg-color-surface-container-background);
    }
    .circular .fg {
      transition: stroke-dashoffset var(--cg-transition-duration-slow) var(--cg-transition-easing-default);
      stroke-linecap: round;
    }
    .circular .fg.ok { stroke: var(--cg-color-status-success-text-default); }
    .circular .fg.warn { stroke: var(--cg-color-status-warning-text-default); }
    .circular .fg.bad { stroke: var(--cg-color-status-error-text-default); }

    .circular .center {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: var(--cg-font-size-sm);
      font-weight: var(--cg-font-weight-semibold);
      color: var(--cg-color-surface-container-text);
      font-variant-numeric: tabular-nums;
    }
  `];

  @property({ type: Number }) value = 0;
  @property({ type: Number }) min = 0;
  @property({ type: Number }) max = 100;
  @property({ type: Number }) low: number | null = null;
  @property({ type: Number }) high: number | null = null;
  @property({ type: Number }) optimum: number | null = null;
  @property() label = '';
  @property({ reflect: true }) variant: 'linear' | 'circular' = 'linear';
  @property({ reflect: true }) size: 'sm' | 'md' | 'lg' = 'md';
  @property({ type: Boolean, attribute: 'show-value' }) showValue = false;
  @property({ type: Boolean, reflect: true }) disabled = false;

  /** Compute color class from thresholds, mirroring <meter> semantics. */
  private _level(): 'ok' | 'warn' | 'bad' {
    const { value, min, max } = this;
    const low = this.low ?? min;
    const high = this.high ?? max;
    const optimum = this.optimum;

    // Inside safe zone
    if (value >= low && value <= high) {
      if (optimum == null) return 'ok';
      // Optimum also in safe zone -> ok
      if (optimum >= low && optimum <= high) return 'ok';
      return 'warn';
    }
    // Outside safe zone
    if (optimum == null) return 'bad';
    // If optimum is in the opposite suboptimal region, current is "bad"
    if ((value < low && optimum > high) || (value > high && optimum < low)) return 'bad';
    return 'warn';
  }

  private _pct(): number {
    const range = this.max - this.min;
    if (range <= 0) return 0;
    const clamped = Math.max(this.min, Math.min(this.max, this.value));
    return ((clamped - this.min) / range) * 100;
  }

  override render() {
    const level = this._level();
    const pct = this._pct();
    const valueText = this.showValue ? `${Math.round(pct)}%` : '';
    const labelId = this.label ? 'cg-meter-label' : undefined;

    if (this.variant === 'circular') {
      const radius = 42;
      const circ = 2 * Math.PI * radius;
      const offset = circ - (pct / 100) * circ;
      return html`
        ${this.label ? html`
          <div class="header">
            <span class="label" id=${labelId!}>${this.label}</span>
          </div>
        ` : nothing}
        <div class="circular"
          role="meter"
          aria-valuenow=${this.value}
          aria-valuemin=${this.min}
          aria-valuemax=${this.max}
          aria-labelledby=${labelId ?? nothing}
          aria-label=${labelId ? nothing : (this.label || 'Meter')}
          aria-disabled=${this.disabled ? 'true' : nothing}
        >
          ${svg`
            <svg viewBox="0 0 100 100">
              <circle class="bg" cx="50" cy="50" r="${radius}" fill="none" stroke-width="10"></circle>
              <circle
                class="fg ${level}"
                cx="50" cy="50" r="${radius}"
                fill="none" stroke-width="10"
                stroke-dasharray="${circ}"
                stroke-dashoffset="${offset}"
              ></circle>
            </svg>
          `}
          ${this.showValue ? html`<div class="center">${valueText}</div>` : nothing}
        </div>
      `;
    }

    return html`
      ${this.label || this.showValue ? html`
        <div class="header">
          ${this.label ? html`<span class="label" id=${labelId!}>${this.label}</span>` : nothing}
          ${this.showValue ? html`<span class="value-text">${valueText}</span>` : nothing}
        </div>
      ` : nothing}
      <div class="track"
        role="meter"
        aria-valuenow=${this.value}
        aria-valuemin=${this.min}
        aria-valuemax=${this.max}
        aria-labelledby=${labelId ?? nothing}
        aria-label=${labelId ? nothing : (this.label || 'Meter')}
        aria-disabled=${this.disabled ? 'true' : nothing}
      >
        <div class="fill ${level}" style="width: ${pct}%"></div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cg-meter': CgMeter;
  }
}
