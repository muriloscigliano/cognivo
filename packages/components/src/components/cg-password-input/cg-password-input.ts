import { LitElement, html, css, nothing } from 'lit';
import { property, state } from 'lit/decorators.js';
import { customElement } from '../../utils/define.js';
import { formInternals } from '../../utils/form-internals.js';
import { handleImplicitSubmit } from '../../utils/implicit-submit.js';
import { messageFor, setValueMissing, type ValidationMessages, reportFormValidity } from '../../utils/validation.js';
import { hostBlock, reducedMotion } from '../../styles/index.js';
import { defineMessages, Messages } from '../../utils/messages.js';

const MESSAGES = defineMessages('cg-password-input', {
  label: 'Password',
  show: 'Show password',
  hide: 'Hide password',
  weak: 'Weak',
  fair: 'Fair',
  good: 'Good',
  strong: 'Strong',
});

/**
 * @element cg-password-input
 * Password input with visibility toggle and optional strength meter.
 *
 * @example
 * ```html
 * <cg-password-input label="Password" show-strength></cg-password-input>
 * ```
 *
 * @fires {CustomEvent<{value: string, strength?: number}>} cg-password-change
 * @fires {CustomEvent<{visible: boolean}>} cg-password-toggle
 */
@customElement('cg-password-input')
export class CgPasswordInput extends LitElement {
  static override styles = [hostBlock, reducedMotion, css`
    :host { display: block; }

    .wrap {
      position: relative;
      display: block;
    }

    label {
      display: block;
      margin-bottom: var(--cg-spacing-6);
      font-size: var(--cg-font-size-sm);
      font-weight: var(--cg-font-weight-medium);
      color: var(--cg-color-surface-base-text);
    }

    .input-wrap {
      position: relative;
      display: flex;
      align-items: center;
    }

    input {
      flex: 1;
      box-sizing: border-box;
      height: var(--cg-component-input-height-md);
      padding: 0 var(--cg-spacing-40) 0 var(--cg-spacing-12);
      background: var(--cg-color-input-background-default);
      border: var(--cg-border-width-50) solid var(--cg-color-input-border-default);
      border-radius: var(--cg-component-input-radius);
      color: var(--cg-color-input-text-default);
      font-family: inherit;
      font-size: var(--cg-font-size-base);
      outline: none;
      transition:
        border-color var(--cg-transition-duration-fast) var(--cg-transition-easing-default),
        background var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
    }
    input::placeholder { color: var(--cg-color-input-text-placeholder); }
    input:hover:not(:disabled) {
      border-color: var(--cg-color-input-border-hover);
    }
    input:focus {
      border-color: var(--cg-color-input-border-focus);
      box-shadow: 0 0 0 var(--cg-border-width-300) var(--cg-color-state-focus-halo);
    }
    input:disabled {
      opacity: var(--cg-opacity-40);
      cursor: not-allowed;
    }

    :host(:is([error],[data-invalid])) input {
      border-color: var(--cg-color-status-error-border-default);
    }
    :host(:is([error],[data-invalid])) input:focus { box-shadow: 0 0 0 3px var(--cg-shadow-focus-error); }
    :host([success]) input {
      border-color: var(--cg-color-status-success-border-default);
    }
    :host([success]) input:focus { box-shadow: 0 0 0 3px var(--cg-shadow-focus-success); }

    .toggle {
      position: absolute;
      right: var(--cg-spacing-8);
      top: 50%;
      transform: translateY(-50%);
      display: flex;
      align-items: center;
      justify-content: center;
      width: var(--cg-spacing-32);
      height: var(--cg-spacing-32);
      border: none;
      background: none;
      color: var(--cg-color-input-text-placeholder);
      cursor: pointer;
      border-radius: var(--cg-border-radius-50);
      transition: color var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
    }
    .toggle:hover:not(:disabled) {
      color: var(--cg-color-surface-base-text);
      background: var(--cg-color-action-tertiary-background-hover);
    }
    .toggle:disabled { opacity: var(--cg-opacity-40); cursor: not-allowed; }
    .toggle:focus-visible {
      outline: none;
      box-shadow:
        0 0 0 var(--cg-focus-ring-offset) var(--cg-color-focus-ring-offset),
        0 0 0 calc(var(--cg-focus-ring-offset) + var(--cg-focus-ring-width)) var(--cg-color-focus-ring);
    }
    .toggle:active { transform: translateY(-50%) scale(var(--cg-interaction-press-scale)); }

    .helper {
      margin-top: var(--cg-spacing-6);
      font-size: var(--cg-font-size-xs);
      color: var(--cg-color-surface-container-outlined);
    }
    :host(:is([error],[data-invalid])) .helper { color: var(--cg-color-status-error-text-default); }
    :host([success]) .helper { color: var(--cg-color-status-success-text-default); }

    /* Strength meter */
    .strength {
      display: flex;
      gap: var(--cg-spacing-4);
      margin-top: var(--cg-spacing-12);
    }
    .strength-bar {
      flex: 1;
      height: var(--cg-spacing-4);
      background: var(--cg-color-surface-container-border);
      border-radius: var(--cg-border-radius-full);
      transition:
        background var(--cg-transition-duration-default) var(--cg-transition-easing-default),
        transform var(--cg-transition-duration-default) var(--cg-transition-easing-default);
      transform-origin: left;
    }
    .strength-bar.active {
      animation: barIn var(--cg-transition-duration-default) var(--cg-transition-easing-default);
    }
    @keyframes barIn {
      from { transform: scaleX(0); }
      to { transform: scaleX(1); }
    }
    .strength-bar.active[data-level="1"] { background: var(--cg-color-status-error-text-default); }
    .strength-bar.active[data-level="2"] { background: var(--cg-color-status-warning-text-default); }
    .strength-bar.active[data-level="3"] { background: var(--cg-color-status-warning-text-default); }
    .strength-bar.active[data-level="4"] { background: var(--cg-color-status-success-text-default); }

    .strength-label {
      margin-top: var(--cg-spacing-6);
      font-size: var(--cg-font-size-xs);
      color: var(--cg-color-surface-container-outlined);
    }

    .required-marker { color: var(--cg-color-status-error-text-default); }
  `];

  static formAssociated = true;
  /** Enter here submits the owning form per HTML implicit submission, and the
   *  field counts as one that blocks it (see utils/implicit-submit). */
  static blocksImplicitSubmission = true;
  private _internals: ElementInternals | undefined;

  constructor() {
    super();
    this._internals = formInternals(this);
  }

  /** Per-element text overrides (JSON attribute); see `setMessages()`. */
  @property({ type: Object }) messages: Partial<typeof MESSAGES> | null = null;
  private i18n = new Messages(this, MESSAGES);

  @property() value = '';
  @property() label = '';
  @property() placeholder = '';
  @property() helper = '';
  @property({ reflect: true }) name = ''; // reflected: FormData keys a form-associated element by its name ATTRIBUTE
  @property({ type: Boolean, reflect: true }) required = false;
  @property({ type: Boolean, reflect: true }) disabled = false;
  /** Disabled by an ancestor `<fieldset disabled>` or the own attribute
   *  (formDisabledCallback), so a fieldset disables this field as it does a native one. */
  @state() private _formDisabled = false;
  private get _effectivelyDisabled(): boolean { return this.disabled || this._formDisabled; }
  formDisabledCallback(disabled: boolean): void { this._formDisabled = disabled; }
  @property({ type: Boolean, reflect: true }) error = false;
  @property({ type: Boolean, reflect: true }) success = false;
  @property({ type: Boolean, attribute: 'show-strength' }) showStrength = false;
  @property({ type: Number, attribute: 'min-length' }) minLength = 0;

  @state() private _visible = false;
  @state() private _invalid = '';

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

  override updated(changed: Map<string, unknown>): void {
    if (changed.has('value') || changed.has('required') || changed.has('minLength') || changed.has('validationMessages')) {
      this._internals?.setFormValue(this.value);
      if (this.required && !this.value) {
        setValueMissing(this._internals, true, this.validationMessages, 'text');
      } else if (this.minLength > 0 && this.value.length < this.minLength) {
        // No browser fallback exists for a programmatic tooShort: supply it via
        // validation-messages / setValidationMessages({ tooShort }).
        this._internals?.setValidity({ tooShort: true }, messageFor('tooShort', this.validationMessages, ''));
      } else {
        this._internals?.setValidity({});
      }
    }
    if (this._invalid) this._invalid = this.validationMessage;
    this.toggleAttribute('data-invalid', !!this._invalid);
  }

  private _strengthScore(): number {
    const v = this.value;
    if (!v) return 0;
    let score = 0;
    if (v.length >= 8) score++;
    if (v.length >= 12) score++;
    if (/[a-z]/.test(v) && /[A-Z]/.test(v)) score++;
    if (/\d/.test(v) && /[^a-zA-Z0-9]/.test(v)) score++;
    return Math.min(4, score);
  }

  private _strengthLabel(): string {
    const score = this._strengthScore();
    if (score === 0) return '';
    return this.i18n.t(score === 1 ? 'weak' : score === 2 ? 'fair' : score === 3 ? 'good' : 'strong');
  }

  private _handleInput(e: Event): void {
    this.value = (e.target as HTMLInputElement).value;
    this.dispatchEvent(new CustomEvent('cg-password-change', {
      detail: { value: this.value, strength: this._strengthScore() },
      bubbles: true,
      composed: true,
    }));
  }

  private _toggleVisibility(): void {
    this._visible = !this._visible;
    this.dispatchEvent(new CustomEvent('cg-password-toggle', {
      detail: { visible: this._visible },
      bubbles: true,
      composed: true,
    }));
  }

  override render() {
    const score = this._strengthScore();
    const help = this._invalid || this.helper;
    return html`
      <div class="wrap">
        ${this.label ? html`<label for="input">${this.label}${this.required ? html` <span class="required-marker">*</span>` : nothing}</label>` : nothing}
        <div class="input-wrap">
          <input
            id="input"
            type=${this._visible ? 'text' : 'password'}
            .value=${this.value}
            placeholder=${this.placeholder}
            name=${this.name}
            ?disabled=${this._effectivelyDisabled}
            ?required=${this.required}
            aria-label=${this.label ? nothing : (this.placeholder || this.i18n.t('label'))}
            aria-describedby=${help ? 'helper' : nothing}
            aria-invalid=${this.error || !!this._invalid}
            aria-required=${this.required ? 'true' : 'false'}
            @input=${this._handleInput}
            @keydown=${(e: KeyboardEvent) => handleImplicitSubmit(e, this._internals)}
          />
          <button
            type="button"
            class="toggle"
            ?disabled=${this._effectivelyDisabled}
            aria-label=${this.i18n.t(this._visible ? 'hide' : 'show')}
            @click=${this._toggleVisibility}
          >
            ${this._visible ? html`
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                <line x1="1" y1="1" x2="23" y2="23"/>
              </svg>
            ` : html`
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                <circle cx="12" cy="12" r="3"/>
              </svg>
            `}
          </button>
        </div>
        ${this.showStrength && this.value ? html`
          <div class="strength" aria-hidden="true">
            ${[1, 2, 3, 4].map(i => html`
              <div class="strength-bar ${i <= score ? 'active' : ''}" data-level=${score}></div>
            `)}
          </div>
          <div class="strength-label" role="status" aria-live="polite">${this._strengthLabel()}</div>
        ` : nothing}
        ${help ? html`<div class="helper" id="helper">${help}</div>` : nothing}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cg-password-input': CgPasswordInput;
  }
}
