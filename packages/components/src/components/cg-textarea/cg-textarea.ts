import { LitElement, html, css, nothing, type PropertyValues } from 'lit';
import { property, state, query } from 'lit/decorators.js';
import { customElement } from '../../utils/define.js';
import { formInternals } from '../../utils/form-internals.js';
import { mirrorValidity, type ValidationMessages, reportFormValidity } from '../../utils/validation.js';
import { hostBlock, reducedMotion } from '../../styles/index.js';
import { defineMessages, Messages } from '../../utils/messages.js';

const MESSAGES = defineMessages('cg-textarea', {
  loading: 'Loading',
});

/**
 * @element cg-textarea
 * Multi-line text input with a label above it (or `label-position="floating"`),
 * an optional toolbar, optional auto-resize, and character count.
 *
 * `slot="toolbar"` content sits above the text, inside the field's border
 * (formatting buttons, "Insert variable"). Invalid state as in cg-input: no
 * native bubble, the message under the field, the first invalid field focused.
 *
 * @example
 * ```html
 * <cg-textarea label="Message" placeholder="Write something..." rows="4"></cg-textarea>
 * <cg-textarea label="Bio" autoresize maxlength="500" helper="Keep it short"></cg-textarea>
 * <cg-textarea label="Notes" error helper="Required field"></cg-textarea>
 * ```
 *
 * @slot toolbar - Controls above the text, inside the border
 * @fires {CustomEvent<{value: string}>} cg-input - On every input change
 *
 * @cssprop [--cg-color-input-background-default=#18181b] - Textarea background
 * @cssprop [--cg-color-focus-ring] - Focus border color
 * @cssprop [--cg-border-radius-150=12px] - Border radius
 * @cssprop [--cg-text-danger=#ef4444] - Error state border color
 */
@customElement('cg-textarea')
export class CgTextarea extends LitElement {
  static formAssociated = true;
  private _internals: ElementInternals | undefined;

  constructor() {
    super();
    this._internals = formInternals(this);
  }

  static override styles = [hostBlock, reducedMotion, css`
    .wrapper {
      position: relative;
    }

    /* ── Field container for floating label ── */
    .field {
      position: relative;
    }

    /* The frame carries the field's border, radius and states, around the
       optional toolbar and the text. */
    .frame {
      position: relative;
      border: var(--cg-border-width-50) solid var(--cg-color-input-border-default);
      border-radius: var(--cg-component-input-radius);
      background: var(--cg-color-input-background-default);
      overflow: hidden;
      transition:
        border-color var(--cg-transition-duration-default) var(--cg-transition-easing-default),
        box-shadow var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
    }
    /* Toolbar above the text, inside the border (Bold, Link, Insert variable…). */
    slot[name="toolbar"]::slotted(*) {
      display: flex;
      align-items: center;
      gap: var(--cg-spacing-4);
      padding: var(--cg-spacing-4);
      border-bottom: var(--cg-border-width-50) solid var(--cg-color-input-border-default);
    }

    textarea {
      display: block;
      width: 100%;
      box-sizing: border-box;
      padding: var(--cg-spacing-12);
      border: none;
      border-radius: 0;
      background: transparent;
      color: var(--cg-color-input-text-default);
      font: inherit;
      font-size: var(--cg-font-size-sm);
      line-height: var(--cg-line-height-normal);
      resize: vertical;
      outline: none;
      min-height: var(--cg-spacing-96);
    }
    textarea::placeholder { color: var(--cg-color-input-text-placeholder); }
    /* A floating label stands in for the placeholder until it floats. */
    .field:not(.floated) .floating-label + textarea::placeholder { color: transparent; }

    .frame:hover:not(:has(:disabled, [readonly])) { border-color: var(--cg-color-input-border-hover); }
    .frame:has(textarea:focus-visible) { border-color: var(--cg-color-input-border-focus); box-shadow: 0 0 0 var(--cg-border-width-300) var(--cg-color-state-focus-halo); }
    .frame:has(textarea:disabled) { opacity: var(--cg-opacity-40); background: var(--cg-color-input-background-disabled); }
    textarea:disabled { cursor: not-allowed; }
    .frame:has(textarea[readonly]) { background: var(--cg-color-surface-field-readonly-background); }

    /* Loading */
    :host([loading]) .wrapper { position: relative; pointer-events: none; opacity: 0.7; }
    .loading-overlay {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: var(--cg-component-input-radius);
      background: var(--cg-overlay-dark-subtle);
      z-index: 3;
    }
    .loading-spinner {
      width: var(--cg-spacing-20);
      height: var(--cg-spacing-20);
      border: var(--cg-border-width-100) solid var(--cg-color-loading-spinner-secondary);
      border-top-color: var(--cg-color-loading-spinner-primary);
      border-radius: var(--cg-border-radius-full);
      animation: cg-textarea-spin var(--cg-transition-duration-slow) linear infinite;
    }
    @keyframes cg-textarea-spin {
      to { transform: rotate(360deg); }
    }

    /* When floating label is active, shift textarea padding to make room */
    .floating-label + textarea {
      padding-top: var(--cg-spacing-24);
      padding-bottom: var(--cg-spacing-6);
    }
    :host([size="lg"]) .floating-label + textarea {
      padding-top: var(--cg-spacing-32);
      padding-bottom: var(--cg-spacing-8);
    }

    :host(:is([error],[data-invalid])) .frame { border-color: var(--cg-color-input-border-error); }
    :host(:is([error],[data-invalid])) .frame:has(textarea:focus-visible) {
      border-color: var(--cg-color-status-error-text-default);
      box-shadow: 0 0 0 3px var(--cg-shadow-focus-error);
    }

    :host([success]) .frame { border-color: var(--cg-color-input-icon-success); }
    :host([success]) .frame:has(textarea:focus-visible) {
      border-color: var(--cg-color-status-success-text-default);
      box-shadow: 0 0 0 3px var(--cg-shadow-focus-success);
    }

    :host([autoresize]) textarea { resize: none; overflow: hidden; }

    /* ── Floating label ── */
    .floating-label {
      position: absolute;
      left: var(--cg-spacing-12);
      right: var(--cg-spacing-12);
      top: var(--cg-spacing-20);
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

    :host([size="lg"]) .floating-label { font-size: var(--cg-font-size-base); left: var(--cg-spacing-16); right: var(--cg-spacing-16); }

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
    :host(:is([error],[data-invalid])) .field.floated .floating-label {
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

    .footer {
      display: flex;
      justify-content: flex-end;
      margin-top: var(--cg-spacing-4);
    }
    .count {
      font-size: var(--cg-font-size-xs);
      color: var(--cg-color-input-text-placeholder);
    }
    :host(:is([error],[data-invalid])) :is(.count, .helper) { color: var(--cg-color-status-error-text-default); }

    /* ── Label above the field (the default) and help / error text below ── */
    .label, .helper {
      display: block;
      font-size: var(--cg-font-size-xs);
      color: var(--cg-color-input-text-placeholder);
    }
    .label { font-weight: var(--cg-font-weight-medium); margin-bottom: var(--cg-component-input-label-gap); }
    .helper { padding-top: var(--cg-spacing-4); }
    :host([success]) .helper { color: var(--cg-color-status-success-text-default); }

    /* Size variants */
    :host([size="lg"]) textarea { font-size: var(--cg-font-size-base); padding: var(--cg-spacing-12) var(--cg-spacing-16); min-height: var(--cg-spacing-128); }

    /* ── Rounded overrides ── */
    :host([rounded="none"]) .frame { border-radius: 0; }
    :host([rounded="sm"]) .frame { border-radius: var(--cg-border-radius-50); }
    :host([rounded="md"]) .frame { border-radius: var(--cg-border-radius-100); }
    :host([rounded="lg"]) .frame { border-radius: var(--cg-component-input-radius); }
  `];

  /** Per-element text overrides (JSON attribute); see `setMessages()`. */
  @property({ type: Object }) messages: Partial<typeof MESSAGES> | null = null;
  private i18n = new Messages(this, MESSAGES);

  @property({ reflect: true }) label = '';
  /** `top` (default): the label sits above the field. `floating`: inside it, floating up on focus / value. */
  @property({ attribute: 'label-position' }) labelPosition: 'top' | 'floating' = 'top';
  @property() helper = '';
  @property({ reflect: true }) size: 'md' | 'lg' = 'md';
  @property({ reflect: true }) rounded: 'none' | 'sm' | 'md' | 'lg' = 'lg';
  @property() value = '';
  @property() placeholder = '';
  @property({ reflect: true }) name = ''; // reflected: FormData keys a form-associated element by its name ATTRIBUTE
  @property({ type: Number }) rows = 3;
  @property({ type: Number }) maxlength = 0;
  @property({ type: Boolean, reflect: true }) disabled = false;
  /** Disabled by an ancestor `<fieldset disabled>` or the own attribute
   *  (formDisabledCallback), so a fieldset disables this field as it does a native one. */
  @state() private _formDisabled = false;
  private get _effectivelyDisabled(): boolean { return this.disabled || this._formDisabled; }
  formDisabledCallback(disabled: boolean): void { this._formDisabled = disabled; }
  @property({ type: Boolean, reflect: true }) readonly = false;
  @property({ type: Boolean, reflect: true }) error = false;
  @property({ type: Boolean, reflect: true }) success = false;
  @property({ type: Boolean, reflect: true }) autoresize = false;
  @property({ type: Boolean, reflect: true }) loading = false;
  @property({ type: Boolean }) required = false;

  @state() private _focused = false;
  /** The validation message shown after an `invalid` event, until the field is valid again. */
  @state() private _invalid = '';

  @query('textarea') private _textarea!: HTMLTextAreaElement;

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

  /* ── Selection API (passthrough to the inner <textarea>), e.g. to insert a
     variable at the cursor:
       ta.setRangeText('{{first_name}}', ta.selectionStart, ta.selectionEnd, 'end'); ta.focus();
     Before the first render there is no selection (null / no-op). ── */

  /** Start of the selection (the caret when nothing is selected). */
  get selectionStart(): number | null { return this._textarea?.selectionStart ?? null; }
  set selectionStart(v: number | null) { if (this._textarea) this._textarea.selectionStart = v ?? 0; }
  /** End of the selection. */
  get selectionEnd(): number | null { return this._textarea?.selectionEnd ?? null; }
  set selectionEnd(v: number | null) { if (this._textarea) this._textarea.selectionEnd = v ?? 0; }
  /** `forward`, `backward` or `none`. */
  get selectionDirection(): 'forward' | 'backward' | 'none' | null {
    return (this._textarea?.selectionDirection as 'forward' | 'backward' | 'none' | undefined) ?? null;
  }
  set selectionDirection(v: 'forward' | 'backward' | 'none' | null) {
    if (this._textarea) this._textarea.selectionDirection = v ?? 'none';
  }

  /** Select a range of the text, like `HTMLTextAreaElement.setSelectionRange`. */
  setSelectionRange(start: number | null, end: number | null, direction?: 'forward' | 'backward' | 'none'): void {
    this._textarea?.setSelectionRange(start, end, direction);
  }

  /** Select all the text. */
  select(): void { this._textarea?.select(); }

  /**
   * Replace a range of the text (default: the current selection), like
   * `HTMLTextAreaElement.setRangeText`. `value` and the form value update;
   * like the native method, no `input` / `cg-input` event fires.
   */
  setRangeText(replacement: string): void;
  setRangeText(replacement: string, start: number, end: number, selectMode?: SelectionMode): void;
  setRangeText(replacement: string, start?: number, end?: number, selectMode?: SelectionMode): void {
    const ta = this._textarea;
    if (!ta) return;
    if (start === undefined || end === undefined) ta.setRangeText(replacement);
    else ta.setRangeText(replacement, start, end, selectMode);
    // Keep the property (and so the re-render's `.value` binding) in step,
    // and preserve the selection the native call left.
    const [s, e, d] = [ta.selectionStart, ta.selectionEnd, ta.selectionDirection];
    this.value = ta.value;
    void this.updateComplete.then(() => ta.setSelectionRange(s, e, d));
  }

  /** Focus the text field (the host itself is not focusable). */
  override focus(options?: FocusOptions): void { this._textarea?.focus(options); }
  override blur(): void { this._textarea?.blur(); }

  override updated(changed: PropertyValues) {
    super.updated(changed);
    if (changed.has('value')) {
      this._internals?.setFormValue(this.value);
    }
    mirrorValidity(this._internals, this._textarea, this.validationMessages);
    if (this._invalid) this._invalid = this.validationMessage;
    this.toggleAttribute('data-invalid', !!this._invalid);
    if (this.autoresize && changed.has('value') && this._textarea) {
      this._textarea.style.height = 'auto';
      this._textarea.style.height = this._textarea.scrollHeight + 'px';
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

  private _handleFocus() { this._focused = true; }
  private _handleBlur() { this._focused = false; }

  private _handleInput(e: Event) {
    const ta = e.target as HTMLTextAreaElement;
    this.value = ta.value;
    if (this.autoresize) {
      ta.style.height = 'auto';
      ta.style.height = ta.scrollHeight + 'px';
    }
    this.dispatchEvent(new CustomEvent('cg-input', { detail: { value: this.value }, bubbles: true, composed: true }));
  }

  override render() {
    const fieldClasses = ['field', this._isFloated ? 'floated' : ''].filter(Boolean).join(' ');

    const floating = this.labelPosition === 'floating';
    const help = this._invalid || this.helper;
    return html`
      ${this.label && !floating ? html`<label class="label" for="t">${this.label}</label>` : nothing}
      <div class="wrapper ${this._effectivelyDisabled ? 'disabled' : ''}">
        <div class="frame">
        <slot name="toolbar"></slot>
        <div class=${fieldClasses}>
          ${this.label && floating ? html`<span class="floating-label">${this.label}</span>` : nothing}
          <textarea
            id="t"
            .value=${this.value}
            rows=${this.rows}
            name=${this.name || nothing}
            placeholder=${this.placeholder || (this.label && floating ? ' ' : nothing)}
            maxlength=${this.maxlength || nothing}
            ?disabled=${this._effectivelyDisabled || this.loading}
            ?readonly=${this.readonly}
            ?required=${this.required}
            aria-invalid=${this.error || !!this._invalid}
            aria-busy=${this.loading ? 'true' : 'false'}
            aria-required=${this.required ? 'true' : 'false'}
            aria-label=${this.label || nothing}
            aria-describedby=${[help ? 'helper' : '', this.maxlength ? 'count' : ''].filter(Boolean).join(' ') || nothing}
            @input=${this._handleInput}
            @focus=${this._handleFocus}
            @blur=${this._handleBlur}
          ></textarea>
          ${this.loading ? html`<div class="loading-overlay" role="status" aria-label=${this.i18n.t('loading')}><span class="loading-spinner" aria-hidden="true"></span></div>` : nothing}
        </div>
        </div>
        ${this.maxlength ? html`<div class="footer"><span class="count" id="count">${this.value.length}/${this.maxlength}</span></div>` : nothing}
      </div>
      ${help ? html`<div class="helper" id="helper">${help}</div>` : nothing}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap { 'cg-textarea': CgTextarea; }
}
