import { LitElement, html, css, nothing, type PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { hostBlock, reducedMotion } from '../../styles/index.js';

/**
 * <cg-slider> — Range slider with floating tooltip, filled track, and spring interactions.
 *
 * @fires {CustomEvent<{value: number}>} cg-change - On value change
 */
@customElement('cg-slider')
export class CgSlider extends LitElement {
  static formAssociated = true;
  private _internals: ElementInternals | undefined;

  constructor() {
    super();
    if (typeof this.attachInternals === 'function') {
      this._internals = this.attachInternals();
    }
  }

  static override styles = [hostBlock, reducedMotion, css`
    .slider-wrapper { padding: var(--cg-spacing-8) 0; }

    .header {
      display: flex; justify-content: space-between; align-items: baseline; margin-bottom: var(--cg-spacing-8);
    }
    .label { font-size: var(--cg-font-size-sm); font-weight: var(--cg-font-weight-medium); color: var(--cg-color-surface-base-text); }
    .value-display { font-size: var(--cg-font-size-sm); font-weight: var(--cg-font-weight-semibold); color: var(--cg-color-action-primary-background-default); transition: transform var(--cg-transition-duration-fast) var(--cg-transition-easing-ease-out); }
    .value-display.active { transform: scale(1.1); }

    /* ── Track container ── */
    .track-container {
      position: relative;
      height: 44px;
      display: flex;
      align-items: center;
    }

    /* ── Track ── */
    .track {
      position: relative;
      width: 100%;
      height: var(--cg-spacing-6);
      border-radius: var(--cg-border-radius-full);
      background: var(--cg-color-slider-track-background);
      cursor: pointer;
    }

    /* Filled portion */
    .track-fill {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      border-radius: var(--cg-border-radius-full);
      background: var(--cg-color-slider-track-filled);
      transition: width var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
      pointer-events: none;
    }
    .track-fill.dragging {
      transition: none;
    }

    /* ── Thumb ── */
    .thumb-wrapper {
      position: absolute;
      top: 50%;
      transform: translate(-50%, -50%);
      z-index: 2;
      pointer-events: none;
      transition: left var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
    }
    .thumb-wrapper.dragging {
      transition: none;
    }
    .thumb {
      width: var(--cg-spacing-20);
      height: var(--cg-spacing-20);
      border-radius: var(--cg-border-radius-full);
      background: var(--cg-color-slider-thumb-background);
      border: var(--cg-border-width-100) solid var(--cg-color-surface-cards-border);
      box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
      transition: transform var(--cg-transition-duration-default) var(--cg-transition-easing-ease-out), box-shadow var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
      pointer-events: auto;
      cursor: grab;
    }
    .thumb:hover {
      transform: scale(1.15);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
    }
    .thumb.dragging {
      cursor: grabbing;
      transform: scale(1.2);
      box-shadow: 0 3px 12px rgba(0, 0, 0, 0.35);
    }

    /* Focus ring */
    .thumb:focus-visible {
      outline: none;
      box-shadow: 0 0 0 3px var(--cg-overlay-accent-strong);
    }

    /* ── Floating tooltip ── */
    .tooltip {
      position: absolute;
      bottom: calc(100% + var(--cg-spacing-12));
      left: 50%;
      transform: translateX(-50%) scale(0.7) rotate(0deg);
      transform-origin: center bottom;
      padding: var(--cg-spacing-6) var(--cg-spacing-12);
      background: var(--cg-color-tooltip-background);
      color: var(--cg-color-tooltip-text);
      font-size: var(--cg-font-size-sm);
      font-weight: var(--cg-font-weight-semibold);
      border-radius: var(--cg-border-radius-100);
      white-space: nowrap;
      pointer-events: none;
      opacity: 0;
      transition: opacity var(--cg-transition-duration-fast) var(--cg-transition-easing-default), transform var(--cg-transition-duration-slow) cubic-bezier(0.22, 1.8, 0.36, 1);
    }
    .tooltip::after {
      content: '';
      position: absolute;
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
      border: var(--cg-spacing-4) solid transparent;
      border-top-color: var(--cg-color-tooltip-arrow);
    }
    .tooltip.visible {
      opacity: 1;
      transform: translateX(-50%) scale(1) rotate(var(--_tilt, 0deg));
    }

    /* ── Hidden native input — drives keyboard ── */
    input[type="range"] {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      opacity: 0;
      cursor: pointer;
      margin: 0;
      z-index: 3;
    }
    input[type="range"]:disabled { cursor: not-allowed; }

    /* ── Disabled ── */
    :host([disabled]) .track-container { opacity: 0.5; pointer-events: none; }

    /* ── Error ── */
    :host([error]) .track-fill { background: var(--cg-color-status-error-text-default); }
    :host([error]) .label { color: var(--cg-color-status-error-text-default); }
    :host([error]) .value-display { color: var(--cg-color-status-error-text-default); }

    /* ── Success ── */
    :host([success]) .track-fill { background: var(--cg-color-status-success-text-default); }
    :host([success]) .label { color: var(--cg-color-status-success-text-default); }
    :host([success]) .value-display { color: var(--cg-color-status-success-text-default); }

    /* ── Loading ── */
    :host([loading]) .track-container { pointer-events: none; opacity: 0.5; }
    .loading-bar {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      left: 0;
      height: var(--cg-spacing-6);
      width: 40%;
      background: var(--cg-color-slider-track-filled);
      border-radius: var(--cg-border-radius-full);
      animation: cg-slider-loading 1.2s ease-in-out infinite;
    }
    @keyframes cg-slider-loading {
      0% { left: 0; width: 40%; }
      50% { left: 60%; width: 40%; }
      100% { left: 0; width: 40%; }
    }

    .range-labels { display: flex; justify-content: space-between; margin-top: var(--cg-spacing-4); }
    .range-label { font-size: var(--cg-font-size-xs); color: var(--cg-color-slider-mark-background); }

    /* ── Simple variant — no fill, no tooltip ── */
    :host([variant="simple"]) .track-fill { display: none; }
    :host([variant="simple"]) .tooltip { display: none; }

    /* ── Toggle variant — thick pill track, thumb inside ── */
    :host([variant="toggle"]) .track {
      height: var(--cg-spacing-24);
      border: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
    }
    :host([variant="toggle"]) .thumb {
      width: var(--cg-spacing-20);
      height: var(--cg-spacing-20);
      border: var(--cg-border-width-50) solid var(--cg-overlay-accent-subtle);
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15);
    }
    :host([variant="toggle"]) .thumb:hover {
      transform: scale(1.05);
    }
    :host([variant="toggle"]) .thumb.dragging {
      transform: scaleX(1.2);
    }

    :host([variant="toggle"][size="sm"]) .track { height: var(--cg-spacing-16); }
    :host([variant="toggle"][size="sm"]) .thumb { width: var(--cg-spacing-12); height: var(--cg-spacing-12); }

    :host([variant="toggle"][size="lg"]) .track { height: var(--cg-spacing-32); }
    :host([variant="toggle"][size="lg"]) .thumb { width: var(--cg-spacing-24); height: var(--cg-spacing-24); }

    /* Size variants (default + simple) */
    :host([size="sm"]:not([variant="toggle"])) .track { height: var(--cg-spacing-4); }
    :host([size="sm"]:not([variant="toggle"])) .thumb { width: var(--cg-spacing-16); height: var(--cg-spacing-16); }

    :host([size="lg"]:not([variant="toggle"])) .track { height: var(--cg-spacing-8); }
    :host([size="lg"]:not([variant="toggle"])) .thumb { width: var(--cg-spacing-24); height: var(--cg-spacing-24); }
  `];

  @property({ reflect: true }) variant: 'default' | 'simple' | 'toggle' = 'default';
  @property({ reflect: true }) size: 'sm' | 'md' | 'lg' = 'md';
  @property() label = '';
  @property() name = '';
  @property({ type: Number }) value = 50;
  @property({ type: Number }) min = 0;
  @property({ type: Number }) max = 100;
  @property({ type: Number }) step = 1;
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ type: Boolean, reflect: true }) error = false;
  @property({ type: Boolean, reflect: true }) success = false;
  @property({ type: Boolean, reflect: true }) loading = false;
  @property({ type: Boolean }) showValue = true;
  @property({ type: Boolean }) showRange = false;
  @property({ type: Boolean }) showTooltip = true;
  @property() unit = '';

  @state() private _dragging = false;
  @state() private _hovering = false;
  @state() private _tilt = 0;
  private _prevValue = 0;
  private _tiltTimer: ReturnType<typeof setTimeout> | null = null;

  override updated(changed: PropertyValues) {
    super.updated(changed);
    if (changed.has('value')) {
      this._internals?.setFormValue(String(this.value));
    }
  }

  formResetCallback() {
    const attr = this.getAttribute('value');
    this.value = attr !== null ? Number(attr) : 50;
  }

  formStateRestoreCallback(state: string) {
    this.value = Number(state);
  }

  private _getPercent(): number {
    return ((this.value - this.min) / (this.max - this.min)) * 100;
  }

  private _handleInput(e: Event) {
    const newVal = Number((e.target as HTMLInputElement).value);
    const delta = newVal - this._prevValue;
    this._prevValue = newVal;

    // Tilt tooltip based on drag direction — clamp to ±20deg
    const tiltAmount = Math.max(-20, Math.min(20, delta * 4));
    this._tilt = tiltAmount;

    // Settle back to 0 after a pause
    if (this._tiltTimer) clearTimeout(this._tiltTimer);
    this._tiltTimer = setTimeout(() => { this._tilt = 0; }, 150);

    this.value = newVal;
    this.dispatchEvent(new CustomEvent('cg-change', { detail: { value: this.value }, bubbles: true, composed: true }));
  }

  private _onPointerDown() { this._dragging = true; this._prevValue = this.value; }
  private _onPointerUp() { this._dragging = false; this._tilt = 0; }
  private _onMouseEnter() { this._hovering = true; }
  private _onMouseLeave() { this._hovering = false; this._dragging = false; }

  override connectedCallback() {
    super.connectedCallback();
    window.addEventListener('pointerup', this._onPointerUp);
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('pointerup', this._onPointerUp);
  }

  override render() {
    const pct = this._getPercent();
    const tooltipVisible = this.showTooltip && (this._hovering || this._dragging);

    return html`
      <div class="slider-wrapper">
        ${this.label || this.showValue ? html`
          <div class="header">
            ${this.label ? html`<span class="label">${this.label}</span>` : nothing}
            ${this.showValue ? html`<span class="value-display ${this._dragging ? 'active' : ''}">${this.value}${this.unit}</span>` : nothing}
          </div>
        ` : nothing}

        <div class="track-container"
          @mouseenter=${this._onMouseEnter}
          @mouseleave=${this._onMouseLeave}
        >
          <div class="track">
            <div class="track-fill ${this._dragging ? 'dragging' : ''}" style="width: ${pct}%"></div>
          </div>

          <div class="thumb-wrapper ${this._dragging ? 'dragging' : ''}" style="left: ${pct}%; --_tilt: ${this._tilt}deg">
            <div class="thumb ${this._dragging ? 'dragging' : ''}"
              tabindex=${this.disabled ? '-1' : '0'}
              role="slider"
              aria-valuenow=${this.value}
              aria-valuemin=${this.min}
              aria-valuemax=${this.max}
              aria-label=${this.label || nothing}
            >
              ${this.showTooltip ? html`
                <div class="tooltip ${tooltipVisible ? 'visible' : ''}">${this.value}${this.unit}</div>
              ` : nothing}
            </div>
          </div>

          <input
            type="range"
            .value=${String(this.value)}
            min=${this.min}
            max=${this.max}
            step=${this.step}
            ?disabled=${this.disabled || this.loading}
            aria-hidden="true"
            tabindex="-1"
            name=${this.name || nothing}
            @input=${this._handleInput}
            @pointerdown=${this._onPointerDown}
          />

          ${this.loading ? html`<div class="loading-bar" aria-hidden="true"></div>` : nothing}
        </div>

        ${this.showRange ? html`
          <div class="range-labels">
            <span class="range-label">${this.min}${this.unit}</span>
            <span class="range-label">${this.max}${this.unit}</span>
          </div>
        ` : nothing}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap { 'cg-slider': CgSlider; }
}
