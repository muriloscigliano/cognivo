import { LitElement, html, css, nothing, type PropertyValues } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { hostBlock, reducedMotion } from '../../styles/index.js';

/**
 * @element cg-input
 * Text input with floating label, prefix/suffix slots, clear button, and validation states.
 *
 * @example
 * ```html
 * <cg-input label="Email" type="email" placeholder="you@example.com"></cg-input>
 * <cg-input label="Search" clearable><span slot="prefix">[search icon]</span></cg-input>
 * <cg-input label="Bio" maxlength="200" error helper="Too long"></cg-input>
 * ```
 *
 * @slot prefix - Icon or content before the input field
 * @slot suffix - Icon or content after the input field
 *
 * @fires {CustomEvent<{value: string}>} cg-input - On every input change
 * @fires {CustomEvent} cg-clear - When the clear button is clicked
 *
 * @cssprop [--cg-color-input-border-default=#3f3f46] - Default border color
 * @cssprop [--cg-brand-ai-accent=#dfff61] - Focus ring and floating label color
 * @cssprop [--cg-component-input-height-md=44px] - Input height (md size)
 * @cssprop [--cg-color-input-background-default=#18181b] - Input background
 */
@customElement('cg-input')
export class CgInput extends LitElement {
  static formAssociated = true;
  private _internals: ElementInternals | undefined;

  constructor() {
    super();
    if (typeof this.attachInternals === 'function') {
      this._internals = this.attachInternals();
    }
  }

  static override styles = [hostBlock, reducedMotion, css`
    :host { display: block; }

    .wrapper {
      display: flex;
      align-items: center;
      gap: 0;
      padding: 0 var(--cg-spacing-4);
      border: var(--cg-border-width-50) solid var(--cg-color-input-border-default);
      border-radius: var(--cg-component-input-radius);
      background: var(--cg-color-input-background-default);
      transition:
        border-color var(--cg-transition-duration-fast) var(--cg-transition-easing-default),
        box-shadow var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
      height: var(--cg-component-input-height-md);
      position: relative;
    }

    /* Size variants */
    :host([size="lg"]) .wrapper { height: var(--cg-component-input-height-lg); padding: 0 var(--cg-spacing-4); border-radius: var(--cg-border-radius-150); }

    /* Rounded variants */
    :host([rounded="none"]) .wrapper { border-radius: 0; }
    :host([rounded="sm"]) .wrapper { border-radius: var(--cg-border-radius-50); }
    :host([rounded="md"]) .wrapper { border-radius: var(--cg-border-radius-100); }
    :host([rounded="lg"]) .wrapper { border-radius: var(--cg-component-input-radius); }

    /* Hover */
    .wrapper:hover:not(.disabled):not(.readonly) {
      border-color: var(--cg-color-input-border-hover);
    }

    /* Active / Press — no scale transform on text inputs */

    /* Loading */
    :host([loading]) .wrapper {
      position: relative;
      pointer-events: none;
      opacity: 0.7;
    }
    .loading-spinner {
      width: var(--cg-spacing-16);
      height: var(--cg-spacing-16);
      border: var(--cg-border-width-100) solid var(--cg-color-loading-spinner-secondary);
      border-top-color: var(--cg-color-loading-spinner-primary);
      border-radius: var(--cg-border-radius-full);
      animation: cg-input-spin 600ms linear infinite;
      flex-shrink: 0;
    }
    @keyframes cg-input-spin {
      to { transform: rotate(360deg); }
    }

    /* Focus — border change + subtle glow */
    .wrapper.focused {
      border-color: var(--cg-color-input-border-focus);
      box-shadow: 0 0 0 3px var(--cg-overlay-accent-strong);
    }

    /* Error */
    :host([error]) .wrapper {
      border-color: var(--cg-color-input-border-error);
    }
    :host([error]) .wrapper.focused {
      border-color: var(--cg-color-status-error-text-default);
      box-shadow: 0 0 0 3px var(--cg-shadow-focus-error);
    }

    /* Success */
    :host([success]) .wrapper {
      border-color: var(--cg-color-input-icon-success);
    }
    :host([success]) .wrapper.focused {
      border-color: var(--cg-color-status-success-text-default);
      box-shadow: 0 0 0 3px var(--cg-shadow-focus-success);
    }

    /* Disabled */
    .wrapper.disabled {
      opacity: 0.5;
      pointer-events: none;
      background: var(--cg-color-input-background-disabled);
      border-color: var(--cg-color-input-border-disabled);
    }

    /* Readonly */
    .wrapper.readonly {
      background: var(--cg-color-surface-field-readonly-background);
      border-style: dashed;
    }

    /* ── Input field area ── */
    .field {
      flex: 1;
      position: relative;
      display: flex;
      align-items: center;
      min-width: 0;
      min-height: 100%;
      padding: 0 var(--cg-spacing-8);
    }

    input {
      width: 100%;
      border: none;
      outline: none;
      background: transparent;
      font: inherit;
      font-size: var(--cg-font-size-sm);
      color: var(--cg-color-input-text-default);
      min-width: 0;
      padding: var(--cg-spacing-8) 0;
      z-index: 1;
    }
    :host([size="lg"]) input { font-size: var(--cg-font-size-base); padding: var(--cg-spacing-12) 0; }

    /* When floating label is active, shift input down to make room */
    :host([label]) input {
      padding-top: var(--cg-spacing-20);
      padding-bottom: var(--cg-spacing-2);
    }
    :host([label][size="lg"]) input {
      padding-top: var(--cg-spacing-24);
      padding-bottom: var(--cg-spacing-4);
    }

    input::placeholder {
      color: transparent;
    }
    /* Show placeholder only when label is floated (focused or has value) */
    .field.floated input::placeholder {
      color: var(--cg-color-input-text-placeholder);
      transition: color var(--cg-transition-duration-default) var(--cg-transition-easing-default);
    }

    input:disabled { cursor: not-allowed; }

    /* ── Floating label ── */
    .floating-label {
      position: absolute;
      left: var(--cg-spacing-8);
      right: var(--cg-spacing-8);
      top: 50%;
      transform: translateY(-50%);
      font-size: var(--cg-font-size-sm);
      color: var(--cg-color-input-text-placeholder);
      pointer-events: none;
      transform-origin: left top;
      transition:
        top var(--cg-transition-duration-default) var(--cg-transition-easing-default),
        transform var(--cg-transition-duration-default) var(--cg-transition-easing-default),
        font-size var(--cg-transition-duration-default) var(--cg-transition-easing-default),
        color var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
      z-index: 2;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    :host([size="lg"]) .floating-label { font-size: var(--cg-font-size-base); }

    /* Floated state — label shrinks and moves to top */
    .field.floated .floating-label {
      top: var(--cg-spacing-6);
      transform: translateY(0);
      font-size: var(--cg-font-size-xs);
      color: var(--cg-color-surface-container-text);
    }
    :host([size="lg"]) .field.floated .floating-label {
      top: var(--cg-spacing-8);
      font-size: var(--cg-font-size-xs);
    }

    /* Error state label color */
    :host([error]) .field.floated .floating-label {
      color: var(--cg-color-status-error-text-default);
    }

    /* Success state label color */
    :host([success]) .field.floated .floating-label {
      color: var(--cg-color-status-success-text-default);
    }

    /* Disabled label */
    .wrapper.disabled .floating-label {
      color: var(--cg-color-input-text-disabled);
    }

    /* ── Slots — hidden by default, shown when content is slotted ── */
    .prefix, .suffix {
      display: none;
      align-items: center;
      justify-content: center;
      color: var(--cg-color-input-icon-default);
      flex-shrink: 0;
      width: var(--cg-spacing-40);
      align-self: stretch;
      background: var(--cg-overlay-dark-subtle);
    }
    .prefix.has-content, .suffix.has-content {
      display: flex;
    }
    .prefix {
      border-right: var(--cg-border-width-50) solid var(--cg-color-input-border-default);
      border-radius: var(--cg-component-input-radius) 0 0 var(--cg-component-input-radius);
      margin-left: calc(-1 * var(--cg-spacing-4));
    }
    .suffix {
      border-left: var(--cg-border-width-50) solid var(--cg-color-input-border-default);
      border-radius: 0 var(--cg-component-input-radius) var(--cg-component-input-radius) 0;
      margin-right: calc(-1 * var(--cg-spacing-4));
    }

    /* ── Clear button ── */
    .clear {
      display: flex;
      align-items: center;
      justify-content: center;
      width: var(--cg-spacing-20);
      height: var(--cg-spacing-20);
      border: none;
      background: var(--cg-overlay-dark-subtle);
      color: var(--cg-color-input-text-placeholder);
      border-radius: var(--cg-border-radius-full);
      cursor: pointer;
      padding: 0;
      flex-shrink: 0;
      transition:
        background-color var(--cg-transition-duration-fast) var(--cg-transition-easing-default),
        color var(--cg-transition-duration-fast) var(--cg-transition-easing-default),
        transform var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
      opacity: 0;
      transform: scale(0.8);
      animation: clearIn 150ms var(--cg-transition-easing-ease-out) forwards;
    }
    .clear:hover { background: var(--cg-overlay-accent-subtle); color: var(--cg-color-surface-base-text); }
    .clear:active { transform: scale(0.9); }
    .clear svg { width: var(--cg-spacing-12); height: var(--cg-spacing-12); }

    @keyframes clearIn {
      from { opacity: 0; transform: scale(0.8); }
      to { opacity: 1; transform: scale(1); }
    }

    /* ── Character count ── */
    .count {
      font-size: var(--cg-font-size-xs);
      color: var(--cg-color-input-text-placeholder);
      flex-shrink: 0;
      font-variant-numeric: tabular-nums;
      transition: color var(--cg-transition-duration-default) var(--cg-transition-easing-default);
    }
    :host([error]) .count { color: var(--cg-color-status-error-text-default); }

    /* ── Helper text ── */
    .helper {
      font-size: var(--cg-font-size-xs);
      color: var(--cg-color-input-text-placeholder);
      padding: var(--cg-spacing-8) var(--cg-spacing-12) 0;
    }
    :host([error]) .helper { color: var(--cg-color-status-error-text-default); }
    :host([success]) .helper { color: var(--cg-color-status-success-text-default); }
  `];

  @property({ reflect: true }) label = '';
  @property() value = '';
  @property() placeholder = '';
  @property() name = '';
  @property() helper = '';
  @property({ reflect: true }) type: 'text' | 'email' | 'password' | 'number' | 'url' | 'search' | 'tel' = 'text';
  @property({ reflect: true }) size: 'md' | 'lg' = 'md';
  @property({ reflect: true }) rounded: 'none' | 'sm' | 'md' | 'lg' = 'lg';
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ type: Boolean }) readonly = false;
  @property({ type: Boolean, reflect: true }) error = false;
  @property({ type: Boolean, reflect: true }) success = false;
  @property({ type: Boolean, reflect: true }) loading = false;
  @property({ type: Boolean }) required = false;
  @property({ type: Boolean }) clearable = false;
  @property({ type: Number }) maxlength = 0;
  @property() autocomplete = 'off';

  @state() private _focused = false;
  @state() private _hasPrefix = false;
  @state() private _hasSuffix = false;

  @query('input') private _input!: HTMLInputElement;

  override updated(changed: PropertyValues) {
    super.updated(changed);
    if (changed.has('value')) {
      this._internals?.setFormValue(this.value);
    }
    if (changed.has('required') || changed.has('value')) {
      if (this.required && !this.value) {
        this._internals?.setValidity({ valueMissing: true }, 'This field is required');
      } else {
        this._internals?.setValidity({});
      }
    }
  }

  formResetCallback() {
    this.value = this.getAttribute('value') ?? '';
  }

  formStateRestoreCallback(state: string) {
    this.value = state;
  }

  private get _isFloated() {
    return this._focused || !!this.value;
  }

  private _handleInput(e: Event) {
    const input = e.target as HTMLInputElement;
    this.value = input.value;
    this.dispatchEvent(new CustomEvent('cg-input', { detail: { value: this.value }, bubbles: true, composed: true }));
  }

  private _handleFocus() { this._focused = true; }
  private _handleBlur() { this._focused = false; }

  private _handleClear() {
    this.value = '';
    this._input.value = '';
    this._input.focus();
    this.dispatchEvent(new CustomEvent('cg-input', { detail: { value: '' }, bubbles: true, composed: true }));
    this.dispatchEvent(new CustomEvent('cg-clear', { bubbles: true, composed: true }));
  }

  override render() {
    const wrapperClasses = [
      'wrapper',
      this._focused ? 'focused' : '',
      this.disabled ? 'disabled' : '',
      this.readonly ? 'readonly' : '',
    ].filter(Boolean).join(' ');

    const fieldClasses = ['field', this._isFloated ? 'floated' : ''].filter(Boolean).join(' ');

    return html`
      <div class=${wrapperClasses}>
        <span class="prefix ${this._hasPrefix ? 'has-content' : ''}">
          <slot name="prefix" @slotchange=${(e: Event) => { this._hasPrefix = (e.target as HTMLSlotElement).assignedNodes().length > 0; }}></slot>
        </span>

        <div class=${fieldClasses}>
          ${this.label ? html`<span class="floating-label">${this.label}</span>` : nothing}
          <input
            .value=${this.value}
            type=${this.type}
            name=${this.name || nothing}
            placeholder=${this.placeholder || (this.label ? ' ' : nothing)}
            ?disabled=${this.disabled || this.loading}
            ?readonly=${this.readonly}
            maxlength=${this.maxlength || nothing}
            autocomplete=${this.autocomplete}
            aria-invalid=${this.error ? 'true' : 'false'}
            aria-busy=${this.loading ? 'true' : 'false'}
            aria-required=${this.required ? 'true' : 'false'}
            aria-label=${this.label || nothing}
            aria-describedby=${this.helper ? 'helper' : nothing}
            @input=${this._handleInput}
            @focus=${this._handleFocus}
            @blur=${this._handleBlur}
          />
        </div>

        ${this.loading ? html`<span class="loading-spinner" aria-hidden="true"></span>` : nothing}
        ${this.clearable && this.value && !this.loading ? html`
          <button class="clear" @click=${this._handleClear} aria-label="Clear input" tabindex="-1">
            <cg-icon name="x" size="xs"></cg-icon>
          </button>
        ` : nothing}
        ${this.maxlength ? html`<span class="count">${this.value.length}/${this.maxlength}</span>` : nothing}
        <span class="suffix ${this._hasSuffix ? 'has-content' : ''}">
          <slot name="suffix" @slotchange=${(e: Event) => { this._hasSuffix = (e.target as HTMLSlotElement).assignedNodes().length > 0; }}></slot>
        </span>
      </div>
      ${this.helper ? html`<div class="helper" id="helper">${this.helper}</div>` : nothing}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cg-input': CgInput;
  }
}
