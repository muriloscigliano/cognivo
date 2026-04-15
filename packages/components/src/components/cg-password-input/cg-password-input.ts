import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { hostBlock, reducedMotion } from '../../styles/index.js';

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
      box-shadow: 0 0 0 3px var(--cg-overlay-accent-strong);
    }
    input:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    :host([error]) input {
      border-color: var(--cg-color-status-error-border-default);
    }
    :host([success]) input {
      border-color: var(--cg-color-status-success-border-default);
    }

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
    .toggle:hover {
      color: var(--cg-color-surface-base-text);
      background: var(--cg-color-action-tertiary-background-hover);
    }
    .toggle:focus-visible {
      outline: none;
      box-shadow:
        0 0 0 2px var(--cg-color-focus-ring-offset),
        0 0 0 4px var(--cg-color-focus-ring);
    }

    .helper {
      margin-top: var(--cg-spacing-6);
      font-size: var(--cg-font-size-xs);
      color: var(--cg-color-surface-container-outlined);
    }
    :host([error]) .helper { color: var(--cg-color-status-error-text-default); }
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
    .toggle:active { transform: translateY(-50%) scale(0.9); }
    .strength-bar.active[data-level="1"] { background: var(--cg-color-status-error-text-default); }
    .strength-bar.active[data-level="2"] { background: var(--cg-color-status-warning-text-default); }
    .strength-bar.active[data-level="3"] { background: var(--cg-color-status-warning-text-default); }
    .strength-bar.active[data-level="4"] { background: var(--cg-color-status-success-text-default); }

    .strength-label {
      margin-top: var(--cg-spacing-6);
      font-size: var(--cg-font-size-xs);
      color: var(--cg-color-surface-container-outlined);
    }
  `];

  static formAssociated = true;
  private _internals?: ElementInternals;

  constructor() {
    super();
    if (typeof this.attachInternals === 'function') {
      this._internals = this.attachInternals();
    }
  }

  @property() value = '';
  @property() label = '';
  @property() placeholder = '';
  @property() helper = '';
  @property() name = '';
  @property({ type: Boolean, reflect: true }) required = false;
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ type: Boolean, reflect: true }) error = false;
  @property({ type: Boolean, reflect: true }) success = false;
  @property({ type: Boolean, attribute: 'show-strength' }) showStrength = false;
  @property({ type: Number, attribute: 'min-length' }) minLength = 0;

  @state() private _visible = false;

  override updated(changed: Map<string, unknown>): void {
    if (changed.has('value')) {
      this._internals?.setFormValue(this.value);
      if (this.required && !this.value) {
        this._internals?.setValidity({ valueMissing: true }, 'Password is required');
      } else if (this.minLength > 0 && this.value.length < this.minLength) {
        this._internals?.setValidity({ tooShort: true }, `Minimum length is ${this.minLength}`);
      } else {
        this._internals?.setValidity({});
      }
    }
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
    if (score === 1) return 'Weak';
    if (score === 2) return 'Fair';
    if (score === 3) return 'Good';
    return 'Strong';
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
    return html`
      <div class="wrap">
        ${this.label ? html`<label>${this.label}${this.required ? html` <span style="color:var(--cg-color-status-error-text-default);">*</span>` : nothing}</label>` : nothing}
        <div class="input-wrap">
          <input
            type=${this._visible ? 'text' : 'password'}
            .value=${this.value}
            placeholder=${this.placeholder}
            name=${this.name}
            ?disabled=${this.disabled}
            ?required=${this.required}
            aria-invalid=${this.error ? 'true' : 'false'}
            aria-required=${this.required ? 'true' : 'false'}
            @input=${this._handleInput}
          />
          <button
            type="button"
            class="toggle"
            aria-label=${this._visible ? 'Hide password' : 'Show password'}
            aria-pressed=${this._visible ? 'true' : 'false'}
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
          <div class="strength-label">${this._strengthLabel()}</div>
        ` : nothing}
        ${this.helper ? html`<div class="helper">${this.helper}</div>` : nothing}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cg-password-input': CgPasswordInput;
  }
}
