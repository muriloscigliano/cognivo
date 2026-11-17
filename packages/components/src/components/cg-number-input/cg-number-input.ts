import { LitElement, html, css, nothing, type PropertyValues } from 'lit';
import { property, state, query } from 'lit/decorators.js';
import { customElement } from '../../utils/define.js';
import { formInternals } from '../../utils/form-internals.js';
import { handleImplicitSubmit } from '../../utils/implicit-submit.js';
import { setValueMissing, type ValidationMessages, reportFormValidity } from '../../utils/validation.js';
import { hostBase, reducedMotion } from '../../styles/index.js';
import { defineMessages, Messages } from '../../utils/messages.js';

const MESSAGES = defineMessages('cg-number-input', {
  decrease: 'Decrease',
  increase: 'Increase',
  label: 'Number input',
});

/**
 * <cg-number-input> — Number input with increment/decrement buttons.
 *
 * @fires {CustomEvent<{value: number}>} cg-change - On value change
 */
@customElement('cg-number-input')
export class CgNumberInput extends LitElement {
  static formAssociated = true;
  /** Enter here submits the owning form per HTML implicit submission, and the
   *  field counts as one that blocks it (see utils/implicit-submit). */
  static blocksImplicitSubmission = true;
  private _internals: ElementInternals | undefined;

  constructor() {
    super();
    this._internals = formInternals(this);
  }

  static override styles = [hostBase, reducedMotion, css`
    .wrapper {
      display: inline-flex;
      align-items: center;
      border: var(--cg-border-width-50) solid var(--cg-color-input-border-default);
      border-radius: var(--cg-component-input-radius);
      background: var(--cg-color-input-background-default);
      overflow: hidden;
      transition: border-color var(--cg-transition-duration-default) var(--cg-transition-easing-default), box-shadow var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
    }
    .wrapper.focused {
      border-color: var(--cg-color-input-border-focus);
      box-shadow: 0 0 0 var(--cg-border-width-300) var(--cg-color-state-focus-halo);
    }
    .wrapper:hover:not(.disabled) {
      border-color: var(--cg-color-input-border-hover);
    }
    .wrapper.disabled { opacity: var(--cg-opacity-40); cursor: not-allowed; background: var(--cg-color-input-background-disabled); border-color: var(--cg-color-input-border-disabled); }

    /* Error */
    :host(:is([error],[data-invalid])) .wrapper { border-color: var(--cg-color-input-border-error); }
    :host(:is([error],[data-invalid])) .wrapper.focused {
      border-color: var(--cg-color-status-error-text-default);
      box-shadow: 0 0 0 3px var(--cg-shadow-focus-error);
    }
    .helper { display: block; padding-top: var(--cg-spacing-4); font-size: var(--cg-font-size-xs); color: var(--cg-color-status-error-text-default); }
    :host(:is([error],[data-invalid])) .label { color: var(--cg-color-status-error-text-default); }

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
    :host([rounded="lg"]) .wrapper { border-radius: var(--cg-component-input-radius); }
    :host([rounded="full"]) .wrapper { border-radius: var(--cg-border-radius-full); }

    .btn {
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: center;
      border: none;
      background: var(--cg-color-action-secondary-background-default);
      color: var(--cg-color-action-secondary-text-default);
      cursor: pointer;
      padding: 0;
      flex-shrink: 0;
      transition: background var(--cg-transition-duration-fast) var(--cg-transition-easing-default), transform var(--cg-transition-duration-fast) var(--cg-transition-easing-ease-out);
      -webkit-user-select: none;
      user-select: none;
    }
    .btn:hover:not(:disabled) { background: var(--cg-color-action-secondary-background-hover); }
    .btn:active:not(:disabled) { transform: scale(var(--cg-interaction-press-scale)); }
    .btn:disabled {
      cursor: not-allowed;
      background: var(--cg-color-action-secondary-background-disable);
      color: var(--cg-color-action-secondary-text-disable);
    }
    .btn:focus-visible {
      box-shadow: 0 0 0 2px var(--cg-color-focus-ring-offset), 0 0 0 4px var(--cg-color-focus-ring);
      outline: none;
      z-index: 1;
      position: relative;
    }
    .btn svg { width: var(--cg-icon-size-100); height: var(--cg-icon-size-100); }

    /* Sizes */
    :host([size="sm"]) .btn { width: var(--cg-component-input-height-sm); height: calc(var(--cg-component-input-height-sm) - 2 * var(--cg-border-width-50)); }
    :host([size="md"]) .btn { width: var(--cg-component-input-height-md); height: calc(var(--cg-component-input-height-md) - 2 * var(--cg-border-width-50)); }
    :host([size="lg"]) .btn { width: var(--cg-component-input-height-lg); height: calc(var(--cg-component-input-height-lg) - 2 * var(--cg-border-width-50)); }

    input {
      box-sizing: border-box;
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

    :host([size="sm"]) input { width: var(--cg-spacing-48); font-size: var(--cg-font-size-xs); height: calc(var(--cg-component-input-height-sm) - 2 * var(--cg-border-width-50)); }
    :host([size="md"]) input { width: var(--cg-spacing-56); font-size: var(--cg-font-size-sm); height: calc(var(--cg-component-input-height-md) - 2 * var(--cg-border-width-50)); }
    :host([size="lg"]) input { width: var(--cg-spacing-64); font-size: var(--cg-font-size-base); height: calc(var(--cg-component-input-height-lg) - 2 * var(--cg-border-width-50)); }

    .label { display: block; font-size: var(--cg-font-size-xs); color: var(--cg-color-input-text-placeholder); margin-bottom: var(--cg-spacing-4); font-weight: var(--cg-font-weight-medium); }
  `];

  /** Per-element text overrides (JSON attribute); see `setMessages()`. */
  @property({ type: Object }) messages: Partial<typeof MESSAGES> | null = null;

  private i18n = new Messages(this, MESSAGES);

  @property({ type: Number }) value = 0;
  @property({ type: Number }) min = -Infinity;
  @property({ type: Number }) max = Infinity;
  @property({ type: Number }) step = 1;
  @property() label = '';
  @property({ type: Boolean, reflect: true }) disabled = false;
  /** Disabled by an ancestor `<fieldset disabled>` or the own attribute
   *  (formDisabledCallback), so a fieldset disables this field as it does a native one. */
  @state() private _formDisabled = false;
  @state() private _invalid = '';
  private get _effectivelyDisabled(): boolean { return this.disabled || this._formDisabled; }
  formDisabledCallback(disabled: boolean): void { this._formDisabled = disabled; }
  @property({ type: Boolean, reflect: true }) error = false;
  @property({ type: Boolean, reflect: true }) success = false;
  @property({ type: Boolean, reflect: true }) loading = false;
  @property({ reflect: true }) size: 'sm' | 'md' | 'lg' = 'md';
  @property({ reflect: true }) rounded: 'none' | 'sm' | 'md' | 'lg' | 'full' = 'lg';
  @property({ reflect: true }) name = ''; // reflected: FormData keys a form-associated element by its name ATTRIBUTE
  @property({ type: Boolean }) required = false;

  /** Per-element validation texts (JSON in the `validation-messages` attribute
   *  or a property). Falls back to `setValidationMessages()` then to the
   *  browser's own localised message. */
  @property({ type: Object, attribute: 'validation-messages' }) validationMessages: ValidationMessages | null = null;

  /** Native-like constraint validation API (delegates to ElementInternals). */
  get validity(): ValidityState | undefined { return this._internals?.validity; }
  get validationMessage(): string { return this._internals?.validationMessage ?? ''; }
  get willValidate(): boolean { return this._internals?.willValidate ?? false; }
  checkValidity(): boolean { return this._internals?.checkValidity() ?? true; }
  reportValidity(): boolean { return this._internals ? reportFormValidity(this._internals) : true; }

  override updated(changed: PropertyValues) {
    super.updated(changed);
    if (changed.has('value')) {
      this._internals?.setFormValue(String(this.value));
    }
    if (changed.has('required') || changed.has('value')) {
      setValueMissing(this._internals, this.required && (this.value === undefined || this.value === null), this.validationMessages, 'text');
    }
    if (this._invalid) this._invalid = this.validationMessage;
    this.toggleAttribute('data-invalid', !!this._invalid);
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
    // The button disables itself at the boundary mid-press, which suppresses
    // its mouseup — release must be caught at the window level or the timer
    // loops forever.
    window.addEventListener('mouseup', this._stopRepeat, { once: true });
    window.addEventListener('touchend', this._stopRepeat, { once: true });
    let delay = 400;
    const repeat = () => {
      const before = this.value;
      action();
      if (this._effectivelyDisabled || this.value === before) return; // boundary reached — stop
      delay = Math.max(60, delay * 0.8);
      this._repeatTimer = window.setTimeout(repeat, delay);
    };
    this._repeatTimer = window.setTimeout(repeat, delay);
  }
  private _stopRepeat = () => { clearTimeout(this._repeatTimer); };

  private _onInput() {
    // Don't clamp while typing (min=10 would turn a keystroke "5" — intending
    // 50 — into 10 mid-edit). The value commits on blur or Enter.
  }

  private _commitInput() {
    const parsed = parseFloat(this._input?.value ?? '');
    if (Number.isFinite(parsed)) this._setValue(parsed);
    if (this._input) this._input.value = String(this.value);
  }

  private _onKeyDown(e: KeyboardEvent) {
    if (e.key === 'ArrowUp') { e.preventDefault(); this._increment(); }
    else if (e.key === 'ArrowDown') { e.preventDefault(); this._decrement(); }
    else if (e.key === 'Enter') { this._commitInput(); handleImplicitSubmit(e, this._internals); }
    else if (e.key === 'Home' && Number.isFinite(this.min)) { e.preventDefault(); this._setValue(this.min); }
    else if (e.key === 'End' && Number.isFinite(this.max)) { e.preventDefault(); this._setValue(this.max); }
  }

  override disconnectedCallback() { super.disconnectedCallback(); this._stopRepeat(); }

  override render() {
    const atMin = this.value <= this.min;
    const atMax = this.value >= this.max;
    return html`
      ${this.label ? html`<span class="label">${this.label}</span>` : nothing}
      <div class="wrapper ${this._focused ? 'focused' : ''} ${this._effectivelyDisabled ? 'disabled' : ''}">
        <button class="btn" aria-label=${this.i18n.t('decrease')}
          ?disabled=${this._effectivelyDisabled || atMin}
          @click=${(e: MouseEvent) => { if (e.detail === 0) this._decrement(); }}
          @mousedown=${() => this._startRepeat(() => this._decrement())}
          @mouseup=${this._stopRepeat} @mouseleave=${this._stopRepeat}
          @touchstart=${(e: Event) => { e.preventDefault(); this._startRepeat(() => this._decrement()); }}
          @touchend=${this._stopRepeat}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M5 12h14"/></svg>
        </button>
        ${this.loading ? html`<span class="loading-spinner" aria-hidden="true"></span>` : nothing}
        <input type="text" inputmode="numeric"
          role="spinbutton"
          aria-valuenow=${this.value}
          aria-valuemin=${this.min === -Infinity ? nothing : this.min}
          aria-valuemax=${this.max === Infinity ? nothing : this.max}
          aria-label=${this.label || this.i18n.t('label')}
          aria-required=${this.required ? 'true' : 'false'}
          aria-invalid=${this.error || !!this._invalid}
          aria-describedby=${this._invalid ? 'helper' : nothing}
          aria-busy=${this.loading ? 'true' : 'false'}
          .value=${String(this.value)}
          ?disabled=${this._effectivelyDisabled}
          ?readonly=${this.loading}
          @input=${this._onInput}
          @keydown=${this._onKeyDown}
          @focus=${() => { this._focused = true; }}
          @blur=${() => { this._focused = false; this._commitInput(); }} />
        <button class="btn" aria-label=${this.i18n.t('increase')}
          ?disabled=${this._effectivelyDisabled || atMax}
          @click=${(e: MouseEvent) => { if (e.detail === 0) this._increment(); }}
          @mousedown=${() => this._startRepeat(() => this._increment())}
          @mouseup=${this._stopRepeat} @mouseleave=${this._stopRepeat}
          @touchstart=${(e: Event) => { e.preventDefault(); this._startRepeat(() => this._increment()); }}
          @touchend=${this._stopRepeat}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>
        </button>
      </div>
      ${this._invalid ? html`<span class="helper" id="helper">${this._invalid}</span>` : nothing}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cg-number-input': CgNumberInput;
  }
}
