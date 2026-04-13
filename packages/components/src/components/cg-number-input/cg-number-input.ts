import { LitElement, html, css, nothing, type PropertyValues } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { hostBase, reducedMotion } from '../../styles/index.js';

/**
 * <cg-number-input> — Number input with increment/decrement buttons.
 *
 * @fires {CustomEvent<{value: number}>} cg-change - On value change
 */
@customElement('cg-number-input')
export class CgNumberInput extends LitElement {
  static formAssociated = true;
  private _internals: ElementInternals | undefined;

  constructor() {
    super();
    if (typeof this.attachInternals === 'function') {
      this._internals = this.attachInternals();
    }
  }

  static override styles = [hostBase, reducedMotion, css`
    .wrapper {
      display: inline-flex;
      align-items: center;
      border: var(--cg-border-width-50) solid var(--cg-color-input-border-default);
      border-radius: var(--cg-border-radius-100);
      background: var(--cg-color-input-background-default);
      overflow: hidden;
      transition: border-color var(--cg-transition-duration-default) var(--cg-transition-easing-default), box-shadow var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
    }
    .wrapper.focused {
      border-color: var(--cg-color-input-border-focus);
      box-shadow: 0 0 0 3px var(--cg-overlay-accent-strong);
    }
    .wrapper:hover:not(.disabled) {
      border-color: var(--cg-color-input-border-hover);
    }
    .wrapper.disabled { opacity: 0.5; cursor: not-allowed; background: var(--cg-color-input-background-disabled); border-color: var(--cg-color-input-border-disabled); }

    /* Error */
    :host([error]) .wrapper { border-color: var(--cg-color-input-border-error); }
    :host([error]) .wrapper.focused {
      border-color: var(--cg-color-status-error-text-default);
      box-shadow: 0 0 0 3px var(--cg-shadow-focus-error);
    }
    :host([error]) .label { color: var(--cg-color-status-error-text-default); }

    /* Success */
    :host([success]) .wrapper { border-color: var(--cg-color-status-success-text-default); }
    :host([success]) .wrapper.focused {
      border-color: var(--cg-color-status-success-text-default);
      box-shadow: 0 0 0 3px var(--cg-shadow-focus-success);
    }
    :host([success]) .label { color: var(--cg-color-status-success-text-default); }

    /* Loading */
    :host([loading]) .wrapper { pointer-events: none; opacity: 0.5; }
    .loading-spinner {
      width: var(--cg-spacing-16);
      height: var(--cg-spacing-16);
      border: var(--cg-border-width-100) solid var(--cg-color-loading-spinner-secondary);
      border-top-color: var(--cg-color-loading-spinner-primary);
      border-radius: var(--cg-border-radius-full);
      animation: cg-number-spin var(--cg-transition-duration-slow) linear infinite;
      flex-shrink: 0;
      margin: 0 var(--cg-spacing-4);
    }
    @keyframes cg-number-spin {
      to { transform: rotate(360deg); }
    }

    /* Rounded variants */
    :host([rounded="none"]) .wrapper { border-radius: 0; }
    :host([rounded="sm"]) .wrapper { border-radius: var(--cg-border-radius-50); }
    :host([rounded="md"]) .wrapper { border-radius: var(--cg-border-radius-100); }
    :host([rounded="lg"]) .wrapper { border-radius: var(--cg-border-radius-150); }
    :host([rounded="full"]) .wrapper { border-radius: var(--cg-border-radius-full); }

    .btn {
      display: flex;
      align-items: center;
      justify-content: center;
      border: none;
      background: var(--cg-color-action-secondary-background-default);
      color: var(--cg-color-surface-base-text);
      cursor: pointer;
      padding: 0;
      flex-shrink: 0;
      transition: background var(--cg-transition-duration-fast) var(--cg-transition-easing-default), transform var(--cg-transition-duration-fast) var(--cg-transition-easing-ease-out);
      -webkit-user-select: none;
      user-select: none;
    }
    .btn:hover:not(:disabled) { background: var(--cg-color-action-secondary-background-hover); }
    .btn:active:not(:disabled) { transform: scale(var(--cg-interaction-press-scale)); }
    .btn:disabled { cursor: not-allowed; opacity: 0.4; }
    .btn:focus-visible {
      box-shadow: 0 0 0 2px var(--cg-color-focus-ring-offset), 0 0 0 4px var(--cg-color-focus-ring);
      outline: none;
      z-index: 1;
      position: relative;
    }
    .btn svg { width: var(--cg-icon-size-100); height: var(--cg-icon-size-100); }

    /* Sizes */
    :host([size="sm"]) .btn { width: var(--cg-spacing-32); height: var(--cg-spacing-32); }
    :host([size="md"]) .btn { width: var(--cg-spacing-40); height: var(--cg-spacing-40); }
    :host([size="lg"]) .btn { width: var(--cg-spacing-48); height: var(--cg-spacing-48); }

    input {
      border: none;
      outline: none;
      background: transparent;
      font-family: inherit;
      color: var(--cg-color-input-text-default);
      text-align: center;
      min-width: 0;
      -moz-appearance: textfield;
    }
    input::-webkit-inner-spin-button,
    input::-webkit-outer-spin-button { -webkit-appearance: none; margin: 0; }
    input:disabled { cursor: not-allowed; }

    :host([size="sm"]) input { width: var(--cg-spacing-48); font-size: var(--cg-font-size-xs); height: var(--cg-spacing-32); }
    :host([size="md"]) input { width: var(--cg-spacing-56); font-size: var(--cg-font-size-sm); height: var(--cg-spacing-40); }
    :host([size="lg"]) input { width: var(--cg-spacing-64); font-size: var(--cg-font-size-base); height: var(--cg-spacing-48); }

    .label { display: block; font-size: var(--cg-font-size-xs); color: var(--cg-color-surface-container-outlined); margin-bottom: var(--cg-spacing-4); font-weight: var(--cg-font-weight-medium); }
  `];

  @property({ type: Number }) value = 0;
  @property({ type: Number }) min = -Infinity;
  @property({ type: Number }) max = Infinity;
  @property({ type: Number }) step = 1;
  @property() label = '';
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ type: Boolean, reflect: true }) error = false;
  @property({ type: Boolean, reflect: true }) success = false;
  @property({ type: Boolean, reflect: true }) loading = false;
  @property({ reflect: true }) size: 'sm' | 'md' | 'lg' = 'md';
  @property({ reflect: true }) rounded: 'none' | 'sm' | 'md' | 'lg' | 'full' = 'lg';
  @property() name = '';
  @property({ type: Boolean }) required = false;

  override updated(changed: PropertyValues) {
    super.updated(changed);
    if (changed.has('value')) {
      this._internals?.setFormValue(String(this.value));
    }
    if (changed.has('required') || changed.has('value')) {
      if (this.required && (this.value === undefined || this.value === null)) {
        this._internals?.setValidity({ valueMissing: true }, 'This field is required');
      } else {
        this._internals?.setValidity({});
      }
    }
  }

  formResetCallback() {
    const attr = this.getAttribute('value');
    this.value = attr !== null ? Number(attr) : 0;
  }

  formStateRestoreCallback(state: string) {
    this.value = Number(state);
  }

  @state() private _focused = false;
  private _repeatTimer = 0;

  @query('input') private _input!: HTMLInputElement;

  private _clamp(v: number): number {
    return Math.min(this.max, Math.max(this.min, v));
  }

  private _setValue(v: number) {
    const clamped = this._clamp(v);
    if (clamped !== this.value) {
      this.value = clamped;
      this.dispatchEvent(new CustomEvent('cg-change', { detail: { value: this.value }, bubbles: true, composed: true }));
    }
  }

  private _increment() { this._setValue(this.value + this.step); }
  private _decrement() { this._setValue(this.value - this.step); }

  private _startRepeat(action: () => void) {
    action();
    let delay = 400;
    const repeat = () => {
      action();
      delay = Math.max(60, delay * 0.8);
      this._repeatTimer = window.setTimeout(repeat, delay);
    };
    this._repeatTimer = window.setTimeout(repeat, delay);
  }
  private _stopRepeat() { clearTimeout(this._repeatTimer); }

  private _onInput(e: Event) {
    const raw = (e.target as HTMLInputElement).value;
    const parsed = parseFloat(raw);
    if (!Number.isNaN(parsed)) this._setValue(parsed);
  }

  private _onKeyDown(e: KeyboardEvent) {
    if (e.key === 'ArrowUp') { e.preventDefault(); this._increment(); }
    else if (e.key === 'ArrowDown') { e.preventDefault(); this._decrement(); }
  }

  override disconnectedCallback() { super.disconnectedCallback(); this._stopRepeat(); }

  override render() {
    const atMin = this.value <= this.min;
    const atMax = this.value >= this.max;
    return html`
      ${this.label ? html`<span class="label">${this.label}</span>` : nothing}
      <div class="wrapper ${this._focused ? 'focused' : ''} ${this.disabled ? 'disabled' : ''}">
        <button class="btn" aria-label="Decrease"
          ?disabled=${this.disabled || atMin}
          @mousedown=${() => this._startRepeat(() => this._decrement())}
          @mouseup=${this._stopRepeat} @mouseleave=${this._stopRepeat}
          @touchstart=${(e: Event) => { e.preventDefault(); this._startRepeat(() => this._decrement()); }}
          @touchend=${this._stopRepeat}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M5 12h14"/></svg>
        </button>
        ${this.loading ? html`<span class="loading-spinner" aria-hidden="true"></span>` : html`
        <input type="text" inputmode="numeric"
          role="spinbutton"
          aria-valuenow=${this.value}
          aria-valuemin=${this.min === -Infinity ? nothing : this.min}
          aria-valuemax=${this.max === Infinity ? nothing : this.max}
          aria-label=${this.label || 'Number input'}
          aria-required=${this.required ? 'true' : 'false'}
          aria-invalid=${this.error ? 'true' : 'false'}
          aria-busy=${this.loading ? 'true' : 'false'}
          .value=${String(this.value)}
          ?disabled=${this.disabled}
          @input=${this._onInput}
          @keydown=${this._onKeyDown}
          @focus=${() => { this._focused = true; }}
          @blur=${() => { this._focused = false; }} />`}
        <button class="btn" aria-label="Increase"
          ?disabled=${this.disabled || atMax}
          @mousedown=${() => this._startRepeat(() => this._increment())}
          @mouseup=${this._stopRepeat} @mouseleave=${this._stopRepeat}
          @touchstart=${(e: Event) => { e.preventDefault(); this._startRepeat(() => this._increment()); }}
          @touchend=${this._stopRepeat}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>
        </button>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cg-number-input': CgNumberInput;
  }
}
