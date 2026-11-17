import { LitElement, html, css, nothing, type PropertyValues } from 'lit';
import { property, state } from 'lit/decorators.js';
import { customElement } from '../../utils/define.js';
import { formInternals } from '../../utils/form-internals.js';
import { setValueMissing, type ValidationMessages, reportFormValidity } from '../../utils/validation.js';
import { hostBlock, reducedMotion } from '../../styles/index.js';
import { bindOutsideClick } from '../../utils/outside-click.js';
import { defineMessages, Messages } from '../../utils/messages.js';

const MESSAGES = defineMessages('cg-select', {
  placeholder: 'Select...',
  search: 'Search...',
  searchLabel: 'Search options',
  noOptions: 'No options',
});

/**
 * @element cg-select
 * Dropdown select with optional search filtering and keyboard navigation.
 *
 * @example
 * ```html
 * <cg-select
 *   placeholder="Choose a fruit"
 *   .options=${[{value:'apple',label:'Apple'},{value:'banana',label:'Banana'}]}
 * ></cg-select>
 * <cg-select searchable error .options=${items}></cg-select>
 * ```
 *
 * The label sits above the trigger (12 px, 500, 6 px gap). `width="auto"`
 * (with `size="sm"`, 32 px) makes a small inline select for a row or a
 * sentence: as wide as its longest option, up to its container. The menu is at
 * least as wide as the trigger and 200 px, and options stay on one line.
 * When the field fails validation, the browser's bubble is suppressed and the
 * message shows under the field (see cg-input).
 *
 * @fires {CustomEvent<{value: string, label: string}>} cg-change - When a selection is made
 *
 * @cssprop [--cg-color-input-background-default=#18181b] - Trigger background
 * @cssprop [--cg-color-surface-container-background=#18181b] - Dropdown panel background
 * @cssprop [--cg-color-focus-ring] - Focus/hover border accent
 * @cssprop [--cg-component-select-radius] - Border radius for trigger and dropdown (default rounded="md")
 */

/** Option entry for cg-select, with value, display label, and optional disabled state. */
export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

@customElement('cg-select')
export class CgSelect extends LitElement {
  static formAssociated = true;
  private _internals: ElementInternals | undefined;

  constructor() {
    super();
    this._internals = formInternals(this, () => this.shadowRoot?.querySelector<HTMLElement>('.trigger')?.focus());
  }

  static override styles = [hostBlock, reducedMotion, css`
    :host { position: relative; display: block; }

    .trigger {
      display: flex; align-items: center; justify-content: space-between;
      width: 100%; box-sizing: border-box;
      padding: 0 var(--cg-spacing-12); gap: var(--cg-spacing-8);
      border: var(--cg-border-width-50) solid var(--cg-color-input-border-default);
      border-radius: var(--cg-component-select-radius);
      background: var(--cg-color-input-background-default);
      font: inherit; font-size: var(--cg-font-size-sm);
      color: var(--cg-color-input-text-default);
      cursor: pointer; height: var(--cg-component-select-height-md);
      transition: background-color var(--cg-transition-duration-state) var(--cg-transition-easing-ease-out), border-color var(--cg-transition-duration-state) var(--cg-transition-easing-ease-out), box-shadow var(--cg-transition-duration-state) var(--cg-transition-easing-ease-out);
      outline: none;
    }
    /* Neutral states: hover / open a small neutral overlay, focus a near-black border + soft halo. */
    @media (hover: hover) {
      .trigger:hover:not(.disabled) { border-color: var(--cg-color-input-border-hover); background-image: linear-gradient(var(--cg-color-state-hover), var(--cg-color-state-hover)); }
      .option:hover { background: var(--cg-color-state-hover); }
    }
    .trigger:active:not(.disabled) { background-image: linear-gradient(var(--cg-color-state-pressed), var(--cg-color-state-pressed)); }
    .trigger:focus-visible { outline: none; border-color: var(--cg-color-input-border-focus); box-shadow: 0 0 0 var(--cg-border-width-300) var(--cg-color-state-focus-halo); }

    /* Loading */
    :host([loading]) .trigger { pointer-events: none; opacity: 0.7; }
    .loading-spinner {
      width: var(--cg-spacing-16);
      height: var(--cg-spacing-16);
      border: var(--cg-border-width-100) solid var(--cg-color-loading-spinner-secondary);
      border-top-color: var(--cg-color-loading-spinner-primary);
      border-radius: var(--cg-border-radius-full);
      animation: cg-select-spin var(--cg-transition-duration-slow) linear infinite;
      flex-shrink: 0;
    }
    @keyframes cg-select-spin {
      to { transform: rotate(360deg); }
    }
    .trigger.open { border-color: var(--cg-color-input-border-focus); box-shadow: 0 0 0 var(--cg-border-width-300) var(--cg-color-state-focus-halo); background-image: linear-gradient(var(--cg-color-state-hover), var(--cg-color-state-hover)); }
    .trigger.disabled { opacity: var(--cg-opacity-40); cursor: not-allowed; pointer-events: none; background: var(--cg-color-input-background-disabled); border-color: var(--cg-color-input-border-disabled); }
    :host(:is([error],[data-invalid])) .trigger { border-color: var(--cg-color-input-border-error); }
    :host(:is([error],[data-invalid])) .trigger:focus-visible,
    :host(:is([error],[data-invalid])) .trigger.open {
      border-color: var(--cg-color-status-error-text-default);
      box-shadow: 0 0 0 3px var(--cg-shadow-focus-error);
    }
    :host([success]) .trigger { border-color: var(--cg-color-status-success-border-default); }
    :host([success]) .trigger:focus-visible,
    :host([success]) .trigger.open {
      border-color: var(--cg-color-status-success-text-default);
      box-shadow: 0 0 0 3px var(--cg-shadow-focus-success);
    }

    .trigger-text { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .placeholder { color: var(--cg-color-input-text-placeholder); }
    .chevron { width: var(--cg-icon-size-100); height: var(--cg-icon-size-100); flex-shrink: 0; transition: transform var(--cg-transition-duration-default) var(--cg-transition-easing-default); color: var(--cg-color-input-text-placeholder); }
    .trigger.open .chevron { transform: rotate(180deg); }

    .dropdown {
      /* At least as wide as the trigger and 200 px; options never wrap (dashboard audit P1-9). */
      position: absolute; top: 100%; left: 0; z-index: var(--cg-z-index-200);
      box-sizing: border-box; min-width: max(100%, 200px); width: max-content; max-width: max(100%, 320px);
      margin-top: var(--cg-spacing-4); padding: var(--cg-spacing-6);
      background: var(--cg-color-modal-container-background);
      border: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
      border-radius: var(--cg-component-card-radius);
      max-height: var(--cg-component-combobox-listbox-max-height); overflow-y: auto;
    }
    .dropdown.open {
      animation: cg-select-dropdown-in var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
    }
    @keyframes cg-select-dropdown-in {
      from { opacity: 0; transform: scale(0.96) translateY(calc(var(--cg-spacing-4) * -1)); }
      to { opacity: 1; transform: scale(1) translateY(0); }
    }
    .dropdown[hidden] { display: none; }

    .option {
      padding: var(--cg-spacing-8) var(--cg-spacing-12); border-radius: var(--cg-border-radius-100); cursor: pointer;
      font-size: var(--cg-font-size-sm);
      color: var(--cg-color-surface-base-text);
      transition: background-color var(--cg-transition-duration-state) var(--cg-transition-easing-ease-out);
      display: flex; align-items: center; gap: var(--cg-spacing-8);
      white-space: nowrap;
    }
    .option > span { overflow: hidden; text-overflow: ellipsis; }
    .option.highlighted { background: var(--cg-color-state-hover); }
    .option.selected { color: var(--cg-color-state-text); font-weight: var(--cg-font-weight-medium); }
    .option.disabled { opacity: var(--cg-opacity-40); pointer-events: none; }
    .option .check {
      width: var(--cg-icon-size-100); height: var(--cg-icon-size-100); flex-shrink: 0;
      margin-left: auto; opacity: 0;
      color: var(--cg-color-state-text);
      transition: opacity var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
    }
    .option.selected .check { opacity: 1; }

    .search { padding: 0; margin-bottom: var(--cg-spacing-4); }
    .search input {
      width: 100%; box-sizing: border-box;
      padding: var(--cg-spacing-8) var(--cg-spacing-12);
      border: var(--cg-border-width-50) solid var(--cg-color-input-border-default);
      border-radius: var(--cg-border-radius-100);
      font: inherit; font-size: var(--cg-font-size-sm); outline: none;
      background: transparent; color: var(--cg-color-input-text-default);
    }
    .search input::placeholder { color: var(--cg-color-input-text-placeholder); }
    .search input:focus { border-color: var(--cg-color-input-border-focus); }

    .empty-msg { padding: var(--cg-spacing-12); text-align: center; color: var(--cg-color-input-text-placeholder); font-size: var(--cg-font-size-sm); }

    .label { display: block; font-size: var(--cg-font-size-xs); font-weight: var(--cg-font-weight-medium); color: var(--cg-color-surface-container-text); margin-bottom: var(--cg-component-input-label-gap); }
    .helper { padding-top: var(--cg-spacing-4); font-size: var(--cg-font-size-xs); color: var(--cg-color-status-error-text-default); }

    /* Size variants */
    :host([size="sm"]) .trigger { height: var(--cg-component-input-height-sm); font-size: var(--cg-font-size-xs); padding: 0 var(--cg-spacing-8); }
    :host([size="sm"]) .option { font-size: var(--cg-font-size-xs); }

    /* width="auto": inline, as wide as the longest option or the placeholder (the width holds as the value changes). */
    :host([width="auto"]) { display: inline-block; vertical-align: middle; max-width: 100%; }
    .fit { flex: 1; min-width: 0; display: grid; }
    .fit > * { grid-area: 1 / 1; min-width: 0; }
    .sizer { visibility: hidden; white-space: nowrap; }

    :host([size="lg"]) .trigger { height: var(--cg-component-input-height-lg); font-size: var(--cg-font-size-base); padding: 0 var(--cg-spacing-16); }
    :host([size="lg"]) .option { font-size: var(--cg-font-size-base); }

    /* ── Rounded overrides ── */
    :host([rounded="none"]) .trigger { border-radius: 0; }
    :host([rounded="none"]) .dropdown { border-radius: 0; }
    :host([rounded="sm"]) .trigger { border-radius: var(--cg-border-radius-50); }
    :host([rounded="sm"]) .dropdown { border-radius: var(--cg-border-radius-50); }
    :host([rounded="md"]) .trigger { border-radius: var(--cg-component-select-radius); }
    :host([rounded="md"]) .dropdown { border-radius: var(--cg-component-select-radius); }
    :host([rounded="lg"]) .trigger { border-radius: var(--cg-border-radius-150); }
    :host([rounded="lg"]) .dropdown { border-radius: var(--cg-border-radius-150); }
    :host([rounded="full"]) .trigger { border-radius: var(--cg-border-radius-full); }
    :host([rounded="full"]) .dropdown { border-radius: var(--cg-border-radius-150); }
  `];

  /** Per-element text overrides (JSON attribute); see `setMessages()`. */
  @property({ type: Object }) messages: Partial<typeof MESSAGES> | null = null;
  private i18n = new Messages(this, MESSAGES);

  @property({ reflect: true }) size: 'sm' | 'md' | 'lg' = 'md';
  /** `full` (default): fills its container. `auto`: inline, as wide as its longest option — for a select in a row or sentence (with `size="sm"`). */
  @property({ reflect: true }) width: 'full' | 'auto' = 'full';
  @property({ reflect: true }) rounded: 'none' | 'sm' | 'md' | 'lg' | 'full' = 'md';
  @property({ type: Array }) options: SelectOption[] = [];
  @property() value = '';
  @property() label = '';
  /** Accessible name of the field when it should differ from the visible
   *  `label` (e.g. "Deal stage" for a label that just says "Stage"). It names
   *  the combobox and its listbox. Keep the visible label's words in it
   *  (WCAG 2.5.3, label in name). `aria-label` on the host works too. */
  @property({ attribute: 'accessible-label' }) accessibleLabel = '';
  /** `aria-label` set on the host, forwarded to the inner combobox. */
  @property({ attribute: 'aria-label' }) private _hostAriaLabel: string | null = null;
  @property() placeholder?: string;
  @property({ reflect: true }) name = ''; // reflected: FormData keys a form-associated element by its name ATTRIBUTE
  @property({ type: Boolean }) disabled = false;
  /** Disabled by an ancestor `<fieldset disabled>` or the own attribute
   *  (formDisabledCallback), so a fieldset disables this field as it does a native one. */
  @state() private _formDisabled = false;
  private get _effectivelyDisabled(): boolean { return this.disabled || this._formDisabled; }
  formDisabledCallback(disabled: boolean): void { this._formDisabled = disabled; }
  @property({ type: Boolean, reflect: true }) error = false;
  @property({ type: Boolean, reflect: true }) success = false;
  @property({ type: Boolean, reflect: true }) loading = false;
  @property({ type: Boolean }) searchable = false;
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
      this._internals?.setFormValue(this.value);
    }
    if (changed.has('required') || changed.has('value')) {
      setValueMissing(this._internals, this.required && !this.value, this.validationMessages, 'select');
    }
    if (this._invalid) this._invalid = this.validationMessage;
    this.toggleAttribute('data-invalid', !!this._invalid);
  }

  formResetCallback() {
    this.value = this.getAttribute('value') ?? '';
  }

  formStateRestoreCallback(state: string) {
    this.value = state;
  }

  @state() private _open = false;
  /** The validation message shown after an `invalid` event, until the field is valid again. */
  @state() private _invalid = '';
  @state() private _search = '';
  @state() private _highlighted = -1;

  private _openPanel() {
    this._open = true;
    this._search = '';
    this._highlighted = this.options.findIndex(o => o.value === this.value);
  }

  private _toggle() {
    if (this._effectivelyDisabled || this.loading) return;
    if (this._open) {
      this._close();
      return;
    }
    this._openPanel();
    if (this.searchable) {
      this.updateComplete.then(() => this.shadowRoot?.querySelector<HTMLInputElement>('.search input')?.focus());
    }
  }

  private _close() { this._open = false; this._search = ''; }

  private _select(opt: SelectOption) {
    if (opt.disabled) return;
    this.value = opt.value;
    this._close();
    this.dispatchEvent(new CustomEvent('cg-change', { detail: { value: opt.value, label: opt.label }, bubbles: true, composed: true }));
  }

  private _filteredOptions() {
    if (!this._search) return this.options;
    const q = this._search.toLowerCase();
    return this.options.filter(o => o.label.toLowerCase().includes(q));
  }

  private _scrollHighlightedIntoView() {
    this.updateComplete.then(() =>
      this.shadowRoot?.querySelector('.option.highlighted')?.scrollIntoView({ block: 'nearest' })
    );
  }

  private _handleKeydown(e: KeyboardEvent) {
    if (e.key === ' ' && e.target instanceof HTMLInputElement) return;
    const filtered = this._filteredOptions();
    if (e.key === 'Escape') {
      // An open popup consumes its Escape, so an enclosing drawer or dialog stays open.
      if (this._open) { e.preventDefault(); e.stopPropagation(); this._close(); }
      return;
    }
    if (e.key === 'Enter' || e.key === ' ') {
      if (!this._open) { this._toggle(); e.preventDefault(); return; }
      e.preventDefault();
      if (this._highlighted >= 0 && this._highlighted < filtered.length) {
        this._select(filtered[this._highlighted]!);
      }
      return;
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (!this._open) { this._openPanel(); return; }
      this._highlighted = Math.min(this._highlighted + 1, filtered.length - 1);
      this._scrollHighlightedIntoView();
      return;
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (!this._open) { this._openPanel(); return; }
      this._highlighted = Math.max(this._highlighted - 1, 0);
      this._scrollHighlightedIntoView();
      return;
    }
    if (e.key === 'Home' && this._open) {
      e.preventDefault();
      this._highlighted = 0;
      this._scrollHighlightedIntoView();
      return;
    }
    if (e.key === 'End' && this._open) {
      e.preventDefault();
      this._highlighted = filtered.length - 1;
      this._scrollHighlightedIntoView();
    }
  }

  private _disposeOutsideClick: (() => void) | null = null;

  override connectedCallback() {
    super.connectedCallback();
    this._disposeOutsideClick?.();
    this._disposeOutsideClick = bindOutsideClick(this, () => this._close());
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this._disposeOutsideClick?.();
    this._disposeOutsideClick = null;
  }

  override render() {
    const selected = this.options.find(o => o.value === this.value);
    const filtered = this._filteredOptions();
    const accessibleName = this.accessibleLabel || this._hostAriaLabel || '';
    const labelledby = accessibleName ? undefined : this.label ? 'select-label' : undefined;
    const shown = selected ? selected.label : this.placeholder ?? this.i18n.t('placeholder');
    const text = html`<span class="trigger-text ${!selected ? 'placeholder' : ''}">${shown}</span>`;

    return html`
      ${this.label ? html`<span class="label" id="select-label">${this.label}</span>` : nothing}
      <div
        class="trigger ${this._open ? 'open' : ''} ${this._effectivelyDisabled ? 'disabled' : ''}"
        tabindex=${this._effectivelyDisabled ? '-1' : '0'}
        role="combobox"
        aria-expanded=${this._open}
        aria-haspopup="listbox"
        aria-controls="select-listbox"
        aria-labelledby=${labelledby ?? nothing}
        aria-label=${labelledby ? nothing : accessibleName || (this.placeholder ?? this.i18n.t('placeholder'))}
        aria-activedescendant=${this._open && this._highlighted >= 0 && this._highlighted < filtered.length ? `select-option-${this._highlighted}` : nothing}
        aria-required=${this.required ? 'true' : 'false'}
        aria-invalid=${this.error || !!this._invalid}
        aria-describedby=${this._invalid ? 'helper' : nothing}
        aria-busy=${this.loading ? 'true' : 'false'}
        @click=${this._toggle}
        @keydown=${this._handleKeydown}
      >
        ${this.width === 'auto' ? html`<span class="fit">${text}${[{ label: this.placeholder ?? this.i18n.t('placeholder') }, ...this.options].map((o) => html`<span class="sizer" aria-hidden="true">${o.label}</span>`)}</span>` : text}
        ${this.loading ? html`<span class="loading-spinner" aria-hidden="true"></span>` : html`
        <svg class="chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M6 9l6 6 6-6"></path>
        </svg>`}
      </div>

      <div class="dropdown ${this._open ? 'open' : ''}" ?hidden=${!this._open} role="listbox" id="select-listbox"
        aria-labelledby=${labelledby ?? nothing}
        aria-label=${!labelledby && accessibleName ? accessibleName : nothing}>
        ${this.searchable ? html`
          <div class="search">
            <input
              placeholder=${this.i18n.t('search')}
              aria-label=${this.i18n.t('searchLabel')}
              .value=${this._search}
              @input=${(e: Event) => { this._search = (e.target as HTMLInputElement).value; this._highlighted = 0; }}
              @keydown=${this._handleKeydown}
              @click=${(e: Event) => e.stopPropagation()}
            />
          </div>
        ` : nothing}
        ${filtered.length === 0 ? html`<div class="empty-msg">${this.i18n.t('noOptions')}</div>` : nothing}
        ${filtered.map((opt, i) => html`
          <div
            class="option ${opt.value === this.value ? 'selected' : ''} ${i === this._highlighted ? 'highlighted' : ''} ${opt.disabled ? 'disabled' : ''}"
            role="option"
            id="select-option-${i}"
            aria-selected=${opt.value === this.value}
            aria-disabled=${opt.disabled ? 'true' : 'false'}
            @click=${(e: Event) => { e.stopPropagation(); this._select(opt); }}
          >
            <span>${opt.label}</span>
            <svg class="check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"></path></svg>
          </div>
        `)}
      </div>
      ${this._invalid ? html`<div class="helper" id="helper">${this._invalid}</div>` : nothing}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap { 'cg-select': CgSelect; }
}
