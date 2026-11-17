import { LitElement, html, css, nothing, type PropertyValues } from 'lit';
import { property, state, query } from 'lit/decorators.js';
import { customElement } from '../../utils/define.js';
import { formInternals } from '../../utils/form-internals.js';
import { handleImplicitSubmit } from '../../utils/implicit-submit.js';
import { mirrorValidity, showInvalid, type ValidationMessages } from '../../utils/validation.js';
import { hostBlock, reducedMotion, spinKeyframes } from '../../styles/index.js';
import { defineMessages, Messages } from '../../utils/messages.js';

const MESSAGES = defineMessages('cg-input', {
  clear: 'Clear input',
});

/**
 * @element cg-input
 * Text input with a label above it (or a floating label), prefix/suffix slots, clear button, and validation states.
 *
 * @example
 * ```html
 * <cg-input label="Email" type="email" placeholder="you@example.com"></cg-input>
 * <cg-input label="Search" clearable><span slot="prefix">[search icon]</span></cg-input>
 * <cg-input label="Bio" maxlength="200" error helper="Too long"></cg-input>
 * <cg-input label="Close date" type="date" name="close" min="2026-01-01"></cg-input>
 * <cg-input size="sm" affix="plain" placeholder="Search"><cg-icon slot="prefix" name="search" size="sm"></cg-icon></cg-input>
 * ```
 *
 * The label sits above the field by default (`label-position="top"`: 12 px,
 * 500, muted, 6 px gap); `label-position="floating"` puts it inside the field,
 * where it stands in for the placeholder until it floats.
 *
 * Invalid state: when the field fails validation (a form's submit,
 * `checkValidity()`, `reportValidity()`), the browser's bubble is suppressed;
 * the field gets the error border, `aria-invalid`, its validation message
 * under it (in place of `helper`) and a `data-invalid` attribute, and the
 * first invalid field takes focus. The message clears once the value is valid. `affix="plain"` draws prefix / suffix
 * content inside the field with no box or divider; `size="sm"` is the
 * compact toolbar height (`--cg-component-input-height-sm`) and has no
 * floating label (it would not fit): `label` only names the field.
 *
 * @slot prefix - Icon or content before the input field
 * @slot suffix - Icon or content after the input field
 *
 * @fires {CustomEvent<{value: string}>} cg-input - On every input change
 * @fires {CustomEvent} cg-clear - When the clear button is clicked
 *
 * @cssprop [--cg-color-input-border-default=#3f3f46] - Default border color
 * @cssprop --cg-color-focus-ring - Focus ring color (offset band: --cg-color-focus-ring-offset)
 * @cssprop [--cg-component-input-height-md=44px] - Input height (md size)
 * @cssprop [--cg-color-input-background-default=#18181b] - Input background
 */
@customElement('cg-input')
export class CgInput extends LitElement {
  static formAssociated = true;
  /** Enter here submits the owning form per HTML implicit submission, and the
   *  field counts as one that blocks it (see utils/implicit-submit). */
  static blocksImplicitSubmission = true;
  private _internals: ElementInternals | undefined;

  constructor() {
    super();
    this._internals = formInternals(this);
    // No native bubble: the field shows its own message (utils/validation showInvalid).
    this.addEventListener('invalid', (e) => { showInvalid(e, () => this._input.focus()); this._invalid = this.validationMessage; });
  }

  static override styles = [hostBlock, reducedMotion, spinKeyframes, css`
    .wrapper {
      box-sizing: border-box;
      display: flex;
      align-items: center;
      padding: 0 var(--cg-spacing-4);
      border: var(--cg-border-width-50) solid var(--cg-color-input-border-default);
      border-radius: var(--cg-component-input-radius);
      background: var(--cg-color-input-background-default);
      transition: var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
      transition-property: border-color, box-shadow;
      height: var(--cg-component-input-height-md);
      position: relative;
      overflow: hidden; /* clips a boxed prefix / suffix to the field's corners */
    }

    /* Size variants */
    :host([size="lg"]) .wrapper { height: var(--cg-component-input-height-lg); }
    :host([size="sm"]) .wrapper { height: var(--cg-component-input-height-sm); }

    /* Rounded variants */
    :host([rounded="none"]) .wrapper { border-radius: 0; }
    :host([rounded="sm"]) .wrapper { border-radius: var(--cg-border-radius-50); }
    :host([rounded="md"]) .wrapper { border-radius: var(--cg-border-radius-100); }
    :host([rounded="lg"]) .wrapper { border-radius: var(--cg-component-input-radius); }

    /* Hover */
    .wrapper:hover:not(.disabled):not(.readonly):not(.focused) {
      border-color: var(--cg-color-input-border-hover);
    }

    /* Active / Press — no scale transform on text inputs */

    /* Loading */
    :host([loading]) .wrapper {
      pointer-events: none;
      opacity: 0.7;
    }
    .loading-spinner {
      width: var(--cg-spacing-16);
      height: var(--cg-spacing-16);
      border: var(--cg-border-width-100) solid var(--cg-color-loading-spinner-secondary);
      border-top-color: var(--cg-color-loading-spinner-primary);
      border-radius: var(--cg-border-radius-full);
      animation: spin 600ms linear infinite;
      flex-shrink: 0;
    }

    /* Focus — a near-black (dark: white) border, the visible indicator, plus a
       soft neutral 3px halo (--cg-color-state-focus-*). No accent glow. */
    .wrapper.focused {
      border-color: var(--cg-color-input-border-focus);
      box-shadow: 0 0 0 var(--cg-border-width-300) var(--cg-color-state-focus-halo);
    }

    /* Error */
    :host(:is([error],[data-invalid])) .wrapper {
      border-color: var(--cg-color-input-border-error);
    }
    :host(:is([error],[data-invalid])) .wrapper.focused {
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
      opacity: var(--cg-opacity-40);
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
    }
    :host([size="lg"]) input { font-size: var(--cg-font-size-base); }

    /* When floating label is active, shift input down to make room.
       (The label element, not :host([label]): label reflects, so the attribute is there even when empty.) */
    .floating-label+input {
      padding: var(--cg-spacing-16) 0 0;
    }

    input::placeholder {
      color: var(--cg-color-input-text-placeholder);
    }
    /* A floating label stands in for the placeholder until it floats (focus or a value). */
    .field:not(.floated) .floating-label+input::placeholder {
      color: transparent;
    }

    input:disabled { cursor: not-allowed; }
    /* type="search": no native cancel button (blue in some browsers); clearable draws the grey one. */
    input::-webkit-search-cancel-button { display: none; }

    /* ── Floating label ── */
    .floating-label {
      position: absolute;
      inset-inline: var(--cg-spacing-8);
      top: 50%;
      transform: translateY(-50%);
      font-size: var(--cg-font-size-sm);
      color: var(--cg-color-input-text-placeholder);
      pointer-events: none;
      transition: var(--cg-transition-duration-default) var(--cg-transition-easing-default);
      transition-property: top, transform, font-size, color;
      z-index: 2;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    /* Floated state — label shrinks and moves to top */
    .field.floated .floating-label {
      top: var(--cg-spacing-2);
      transform: translateY(0);
      font-size: var(--cg-font-size-xs);
      color: var(--cg-color-surface-container-text);
    }

    /* Error / success: the floated label, the count and the helper take the status colour. */
    :host(:is([error],[data-invalid])) :is(.field.floated .floating-label, .count, .helper) {
      color: var(--cg-color-status-error-text-default);
    }
    :host([success]) :is(.field.floated .floating-label, .helper) {
      color: var(--cg-color-status-success-text-default);
    }

    /* Disabled label */
    .wrapper.disabled .floating-label {
      color: var(--cg-color-input-text-disabled);
    }

    /* ── Slots — hidden by default, shown when content is slotted ── */
    .prefix, .suffix {
      display: none;
      place-items: center;
      color: var(--cg-color-input-icon-default);
      flex-shrink: 0;
      width: var(--cg-spacing-40);
      align-self: stretch;
      background: var(--cg-overlay-dark-subtle);
    }
    .has-content { display: grid; }
    .prefix {
      border-right: var(--cg-border-width-50) solid var(--cg-color-input-border-default);
      margin-left: calc(-1 * var(--cg-spacing-4));
    }
    .suffix {
      border-left: var(--cg-border-width-50) solid var(--cg-color-input-border-default);
      margin-right: calc(-1 * var(--cg-spacing-4));
    }
    /* Plain affixes: the icon sits inside the field — no box, no divider. */
    :host([affix="plain"]) :is(.prefix, .suffix) {
      width: auto;
      margin: 0;
      padding: 0 var(--cg-spacing-4);
      border: 0;
      background: none;
    }

    /* ── Clear button ── */
    .clear {
      display: grid;
      place-items: center;
      width: var(--cg-spacing-20);
      height: var(--cg-spacing-20);
      border: none;
      background: var(--cg-overlay-dark-subtle);
      color: var(--cg-color-input-text-placeholder);
      border-radius: var(--cg-border-radius-full);
      cursor: pointer;
      padding: 0;
      flex-shrink: 0;
    }
    .clear:hover { background: var(--cg-color-state-hover); color: var(--cg-color-state-text); }

    /* ── Character count ── */
    .count {
      font-size: var(--cg-font-size-xs);
      color: var(--cg-color-input-text-placeholder);
      flex-shrink: 0;
      font-variant-numeric: tabular-nums;
    }

    /* ── Label above the field (the default) and help / error text below ── */
    .label, .helper {
      display: block;
      font-size: var(--cg-font-size-xs);
      color: var(--cg-color-input-text-placeholder);
    }
    .label { font-weight: var(--cg-font-weight-medium); margin-bottom: var(--cg-component-input-label-gap); }
    .helper { padding-top: var(--cg-spacing-4); }
  `];

  @property({ reflect: true }) label = '';
  /** `top` (default): the label sits above the field (12 px, 500, muted).
   *  `floating`: the label sits inside the field and floats up on focus / value. */
  @property({ attribute: 'label-position' }) labelPosition: 'top' | 'floating' = 'top';
  @property() value = '';
  @property() placeholder = '';
  @property({ reflect: true }) name = ''; // reflected: FormData keys a form-associated element by its name ATTRIBUTE
  @property() helper = '';
  /** `date` renders the browser's date control; its value is ISO `YYYY-MM-DD`. */
  @property({ reflect: true }) type: 'text' | 'email' | 'password' | 'number' | 'url' | 'search' | 'tel' | 'date' = 'text';
  /** Lowest / highest allowed value (`type="date"`: `YYYY-MM-DD`; `number`):
   *  validated natively (rangeUnderflow / rangeOverflow). */
  @property() min = '';
  @property() max = '';
  /** `sm` is the compact toolbar height: label-less (a toolbar field) — `label`
   *  still names it (aria-label) but draws no floating label; the placeholder
   *  shows. For a visible label, put one outside the field. */
  @property({ reflect: true }) size: 'sm' | 'md' | 'lg' = 'md';
  /** `plain`: prefix / suffix content sits inside the field, with no box or divider. */
  @property({ reflect: true }) affix: 'boxed' | 'plain' = 'boxed';
  @property({ reflect: true }) rounded: 'none' | 'sm' | 'md' | 'lg' = 'lg';
  @property({ type: Boolean, reflect: true }) disabled = false;
  /** Disabled by an ancestor `<fieldset disabled>` or the own attribute
   *  (formDisabledCallback), so a fieldset disables this field as it does a native one. */
  @state() private _formDisabled = false;
  private get _effectivelyDisabled(): boolean { return this.disabled || this._formDisabled; }
  formDisabledCallback(disabled: boolean): void { this._formDisabled = disabled; }
  @property({ type: Boolean }) readonly = false;
  @property({ type: Boolean, reflect: true }) error = false;
  @property({ type: Boolean, reflect: true }) success = false;
  @property({ type: Boolean, reflect: true }) loading = false;
  @property({ type: Boolean }) required = false;
  @property({ type: Boolean }) clearable = false;
  @property({ type: Number }) maxlength = 0;
  @property() autocomplete = 'off';

  @state() private _focused = false;
  /** The validation message shown after an `invalid` event, until the field is valid again. */
  @state() private _invalid = '';
  @state() private _hasPrefix = false;
  @state() private _hasSuffix = false;

  @query('input') private _input!: HTMLInputElement;

  /** Per-element validation texts (JSON in the `validation-messages` attribute
   *  or a property). Falls back to `setValidationMessages()` then to the
   *  browser's own localised message. */
  @property({ type: Object, attribute: 'validation-messages' }) validationMessages: ValidationMessages | null = null;
  /** Per-element text overrides (JSON attribute); see `setMessages()`. */
  @property({ type: Object }) messages: Partial<typeof MESSAGES> | null = null;

  private i18n = new Messages(this, MESSAGES);

  /** Native-like constraint validation API (delegates to ElementInternals). */
  get validity(): ValidityState | undefined { return this._internals?.validity; }
  get validationMessage(): string { return this._internals?.validationMessage ?? ''; }
  get willValidate(): boolean { return this._internals?.willValidate ?? false; }
  checkValidity(): boolean { return this._internals?.checkValidity() ?? true; }
  reportValidity(): boolean { return this._internals?.reportValidity() ?? true; }

  override updated(changed: PropertyValues) {
    super.updated(changed);
    // A date control drops a non-ISO value ('15/03/2026') and shows blank;
    // take its sanitised value back so the form never submits what is not shown.
    if (this.type === 'date' && this._input && this._input.value !== this.value) {
      this.value = this._input.value;
    }
    if (changed.has('value')) {
      this._internals?.setFormValue(this.value);
    }
    // Mirror the native input: required, type="email"/"url" typeMismatch, maxlength.
    mirrorValidity(this._internals, this._input, this.validationMessages);
    if (this._invalid) this._invalid = this.validationMessage;
    this.toggleAttribute('data-invalid', !!this._invalid);
  }

  formResetCallback() {
    this.value = this.getAttribute('value') ?? '';
  }

  formStateRestoreCallback(state: string) {
    this.value = state;
  }

  private get _isFloated() {
    // A date control always shows its own format text, so its label stays up.
    return this._focused || !!this.value || this.type === 'date';
  }

  private _handleInput(e: Event) {
    const input = e.target as HTMLInputElement;
    this.value = input.value;
    this.dispatchEvent(new CustomEvent('cg-input', { detail: { value: this.value }, bubbles: true, composed: true }));
  }

  /** Implicit submission: Enter in the field submits the owning form, as it
   *  does for a native <input> (the real input lives in our shadow root, so
   *  the browser cannot do this for us). */
  private _handleKeydown(e: KeyboardEvent) {
    handleImplicitSubmit(e, this._internals);
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
    const label = this.size !== 'sm' && this.label;
    const help = this._invalid || this.helper;
    return html`
      ${label && this.labelPosition === 'top' ? html`<label class="label" for="i">${label}</label>` : nothing}
      <div class="wrapper ${this._focused ? 'focused' : ''} ${this._effectivelyDisabled ? 'disabled' : ''} ${this.readonly ? 'readonly' : ''}">
        <span class="prefix ${this._hasPrefix ? 'has-content' : ''}">
          <slot name="prefix" @slotchange=${(e: Event) => { this._hasPrefix = (e.target as HTMLSlotElement).assignedNodes().length > 0; }}></slot>
        </span>

        <div class="field ${this._isFloated ? 'floated' : ''}">
          ${label && this.labelPosition === 'floating' ? html`<span class="floating-label">${label}</span>` : nothing}
          <input
            id="i"
            .value=${this.value}
            type=${this.type}
            name=${this.name || nothing}
            placeholder=${this.placeholder || (this.label ? ' ' : nothing)}
            ?disabled=${this._effectivelyDisabled || this.loading}
            ?readonly=${this.readonly}
            ?required=${this.required}
            maxlength=${this.maxlength || nothing}
            min=${this.min || nothing}
            max=${this.max || nothing}
            autocomplete=${this.autocomplete}
            aria-invalid=${this.error || !!this._invalid}
            aria-busy=${this.loading}
            aria-label=${this.label || this.placeholder || nothing}
            aria-describedby=${help ? 'helper' : nothing}
            @input=${this._handleInput}
            @keydown=${this._handleKeydown}
            @focus=${this._handleFocus}
            @blur=${this._handleBlur}
          />
        </div>

        ${this.loading ? html`<span class="loading-spinner" aria-hidden="true"></span>` : nothing}
        ${this.clearable && this.value && !this.loading ? html`
          <button class="clear" @click=${this._handleClear} aria-label=${this.i18n.t('clear')} tabindex="-1">
            <cg-icon name="x" size="xs"></cg-icon>
          </button>
        ` : nothing}
        ${this.maxlength ? html`<span class="count">${this.value.length}/${this.maxlength}</span>` : nothing}
        <span class="suffix ${this._hasSuffix ? 'has-content' : ''}">
          <slot name="suffix" @slotchange=${(e: Event) => { this._hasSuffix = (e.target as HTMLSlotElement).assignedNodes().length > 0; }}></slot>
        </span>
      </div>
      ${help ? html`<div class="helper" id="helper">${help}</div>` : nothing}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cg-input': CgInput;
  }
}
