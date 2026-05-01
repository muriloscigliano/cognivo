import { LitElement, html, css, nothing, type PropertyValues } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { hostBlock, reducedMotion } from '../../styles/index.js';
import { bindOutsideClick } from '../../utils/outside-click.js';
import {
  COUNTRIES,
  COUNTRIES_BY_ISO,
  detectCountryFromValue,
  digitsOnly,
  type Country,
} from './countries.js';

/**
 * @element cg-phone-input
 * International phone-number input with searchable country selector. Emits a
 * single E.164 value (`+15551234567`).
 *
 * @example
 * ```html
 * <cg-phone-input label="Phone" country="US"></cg-phone-input>
 * <cg-phone-input
 *   label="Mobile"
 *   default-country="BR"
 *   preferred-countries='["BR","US","PT","DE"]'
 *   helper="We'll text a code"
 * ></cg-phone-input>
 * ```
 *
 * @fires {CustomEvent<{value:string;country:string;dialCode:string;nationalNumber:string;valid:boolean}>} cg-phone-input-change
 * @fires {CustomEvent<{country:string;dialCode:string}>} cg-phone-input-country-change
 *
 * @cssprop [--cg-component-phone-input-radius] - Outer corner radius
 * @cssprop [--cg-component-phone-input-popover-width] - Country popover width
 * @cssprop [--cg-component-phone-input-popover-max-height] - Country popover scroll height
 * @cssprop [--cg-component-phone-input-option-height] - Country list option height
 */
@customElement('cg-phone-input')
export class CgPhoneInput extends LitElement {
  static formAssociated = true;
  private _internals?: ElementInternals;

  constructor() {
    super();
    if (typeof this.attachInternals === 'function') {
      this._internals = this.attachInternals();
    }
  }

  static override styles = [hostBlock, reducedMotion, css`
    :host { display: block; font-family: var(--cg-font-family-primary); }

    /* ── Outer wrapper — matches cg-input chrome ────────────────────────── */
    .wrapper {
      display: flex;
      align-items: stretch;
      height: var(--cg-component-input-height-md);
      background: var(--cg-color-input-background-default);
      border: var(--cg-border-width-50) solid var(--cg-color-input-border-default);
      border-radius: var(--cg-component-phone-input-radius);
      transition:
        border-color var(--cg-transition-duration-fast) var(--cg-transition-easing-default),
        box-shadow var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
      position: relative;
    }

    :host([size="lg"]) .wrapper { height: var(--cg-component-input-height-lg); }

    :host([rounded="none"]) .wrapper { border-radius: 0; }
    :host([rounded="sm"]) .wrapper { border-radius: var(--cg-border-radius-50); }
    :host([rounded="md"]) .wrapper { border-radius: var(--cg-border-radius-100); }
    :host([rounded="lg"]) .wrapper { border-radius: var(--cg-component-phone-input-radius); }

    .wrapper:hover:not(.disabled) {
      border-color: var(--cg-color-input-border-hover);
    }
    .wrapper.focused {
      border-color: var(--cg-color-input-border-focus);
      box-shadow: 0 0 0 3px var(--cg-overlay-accent-strong);
    }

    :host([error]) .wrapper { border-color: var(--cg-color-input-border-error); }
    :host([error]) .wrapper.focused {
      border-color: var(--cg-color-status-error-text-default);
      box-shadow: 0 0 0 3px var(--cg-shadow-focus-error);
    }
    :host([success]) .wrapper { border-color: var(--cg-color-input-icon-success); }
    :host([success]) .wrapper.focused {
      border-color: var(--cg-color-status-success-text-default);
      box-shadow: 0 0 0 3px var(--cg-shadow-focus-success);
    }

    .wrapper.disabled {
      opacity: 0.5;
      pointer-events: none;
      background: var(--cg-color-input-background-disabled);
      border-color: var(--cg-color-input-border-disabled);
    }
    .wrapper.readonly {
      background: var(--cg-color-surface-field-readonly-background);
      border-style: dashed;
    }

    /* ── Country trigger ────────────────────────────────────────────────── */
    .trigger {
      display: inline-flex;
      align-items: center;
      gap: var(--cg-component-phone-input-trigger-gap);
      padding: 0 var(--cg-component-phone-input-trigger-padding-x);
      background: var(--cg-overlay-dark-subtle);
      border: none;
      border-right: var(--cg-border-width-50) solid var(--cg-color-input-border-default);
      border-radius: var(--cg-component-phone-input-radius) 0 0 var(--cg-component-phone-input-radius);
      color: var(--cg-color-input-text-default);
      cursor: pointer;
      font: inherit;
      font-size: var(--cg-font-size-sm);
      font-weight: var(--cg-font-weight-medium);
      flex-shrink: 0;
      margin: calc(-1 * var(--cg-border-width-50));
      margin-right: 0;
      transition:
        background-color var(--cg-transition-duration-fast) var(--cg-transition-easing-default),
        color var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
    }
    .trigger:hover:not(:disabled) { background: var(--cg-overlay-accent-subtle); }
    .trigger:focus-visible {
      outline: none;
      background: var(--cg-overlay-accent-subtle);
    }
    .trigger:disabled { cursor: not-allowed; }

    :host([rounded="none"]) .trigger { border-radius: 0; }
    :host([rounded="sm"]) .trigger { border-radius: var(--cg-border-radius-50) 0 0 var(--cg-border-radius-50); }
    :host([rounded="md"]) .trigger { border-radius: var(--cg-border-radius-100) 0 0 var(--cg-border-radius-100); }

    .flag {
      font-size: var(--cg-font-size-base);
      line-height: 1;
      filter: saturate(1.1);
      flex-shrink: 0;
    }
    :host([size="lg"]) .flag { font-size: var(--cg-font-size-lg); }

    .dial-code {
      color: var(--cg-color-input-text-default);
      font-variant-numeric: tabular-nums;
      letter-spacing: 0.01em;
    }

    .chevron {
      width: var(--cg-icon-size-100);
      height: var(--cg-icon-size-100);
      color: var(--cg-color-input-text-placeholder);
      transition: transform var(--cg-transition-duration-default) var(--cg-transition-easing-default);
      flex-shrink: 0;
    }
    :host([open]) .chevron { transform: rotate(180deg); }

    .trigger-spinner {
      width: var(--cg-spacing-12);
      height: var(--cg-spacing-12);
      border: var(--cg-border-width-100) solid var(--cg-color-loading-spinner-secondary);
      border-top-color: var(--cg-color-loading-spinner-primary);
      border-radius: var(--cg-border-radius-full);
      animation: cg-phone-spin 600ms linear infinite;
    }
    @keyframes cg-phone-spin { to { transform: rotate(360deg); } }

    /* ── Number field ───────────────────────────────────────────────────── */
    .field {
      flex: 1;
      display: flex;
      align-items: center;
      min-width: 0;
      padding: 0 var(--cg-spacing-12);
      position: relative;
    }

    input[type="tel"] {
      flex: 1;
      width: 100%;
      min-width: 0;
      border: none;
      outline: none;
      background: transparent;
      font: inherit;
      font-size: var(--cg-font-size-sm);
      color: var(--cg-color-input-text-default);
      padding: var(--cg-spacing-8) 0;
      font-variant-numeric: tabular-nums;
      letter-spacing: 0.01em;
    }
    :host([size="lg"]) input[type="tel"] {
      font-size: var(--cg-font-size-base);
      padding: var(--cg-spacing-12) 0;
    }
    .field.has-label input[type="tel"] {
      padding-top: var(--cg-spacing-20);
      padding-bottom: var(--cg-spacing-2);
    }
    :host([size="lg"]) .field.has-label input[type="tel"] {
      padding-top: var(--cg-spacing-24);
      padding-bottom: var(--cg-spacing-4);
    }
    input[type="tel"]::placeholder { color: transparent; }
    .field.floated input[type="tel"]::placeholder {
      color: var(--cg-color-input-text-placeholder);
      transition: color var(--cg-transition-duration-default) var(--cg-transition-easing-default);
    }
    input[type="tel"]:disabled { cursor: not-allowed; }

    /* ── Floating label ─────────────────────────────────────────────────── */
    .floating-label {
      position: absolute;
      left: var(--cg-spacing-12);
      right: var(--cg-spacing-12);
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
    :host([error]) .field.floated .floating-label {
      color: var(--cg-color-status-error-text-default);
    }
    :host([success]) .field.floated .floating-label {
      color: var(--cg-color-status-success-text-default);
    }

    /* ── Helper text ────────────────────────────────────────────────────── */
    .helper {
      font-size: var(--cg-font-size-xs);
      color: var(--cg-color-input-text-placeholder);
      padding: var(--cg-spacing-8) var(--cg-spacing-12) 0;
    }
    :host([error]) .helper { color: var(--cg-color-status-error-text-default); }
    :host([success]) .helper { color: var(--cg-color-status-success-text-default); }

    /* ── Country popover ────────────────────────────────────────────────── */
    .popover {
      position: absolute;
      top: calc(100% + var(--cg-spacing-6));
      left: 0;
      z-index: var(--cg-z-index-500);
      width: var(--cg-component-phone-input-popover-width);
      max-width: calc(100vw - var(--cg-spacing-32));
      background: var(--cg-color-modal-container-background);
      border: var(--cg-border-width-50) solid var(--cg-color-modal-container-border);
      border-radius: var(--cg-component-popover-radius);
      box-shadow: var(--cg-shadow-elevation-xl);
      display: none;
      opacity: 0;
      transform: translateY(calc(var(--cg-spacing-4) * -1));
      transition:
        opacity var(--cg-transition-duration-fast) var(--cg-transition-easing-default),
        transform var(--cg-transition-duration-default) var(--cg-transition-easing-ease-out);
      overflow: hidden;
    }
    :host([open]) .popover {
      display: block;
      opacity: 1;
      transform: translateY(0);
    }

    .search {
      display: flex;
      align-items: center;
      gap: var(--cg-spacing-8);
      padding: var(--cg-spacing-8) var(--cg-spacing-12);
      border-bottom: var(--cg-border-width-50) solid var(--cg-color-modal-container-border);
    }
    .search svg {
      width: var(--cg-icon-size-100);
      height: var(--cg-icon-size-100);
      color: var(--cg-color-input-text-placeholder);
      flex-shrink: 0;
    }
    .search input {
      flex: 1;
      width: 100%;
      border: none;
      outline: none;
      background: transparent;
      font: inherit;
      font-size: var(--cg-font-size-sm);
      color: var(--cg-color-surface-base-text);
      padding: var(--cg-spacing-4) 0;
    }
    .search input::placeholder { color: var(--cg-color-input-text-placeholder); }

    .options {
      max-height: var(--cg-component-phone-input-popover-max-height);
      overflow-y: auto;
      padding: var(--cg-spacing-4);
      scrollbar-width: thin;
      scrollbar-color: var(--cg-color-surface-cards-border-strong) transparent;
    }

    .group-label {
      padding: var(--cg-spacing-8) var(--cg-spacing-12) var(--cg-spacing-4);
      font-size: var(--cg-font-size-xs);
      font-weight: var(--cg-font-weight-semibold);
      color: var(--cg-color-input-text-placeholder);
      letter-spacing: 0.06em;
      text-transform: uppercase;
    }

    .option {
      display: flex;
      align-items: center;
      gap: var(--cg-spacing-12);
      height: var(--cg-component-phone-input-option-height);
      padding: 0 var(--cg-spacing-12);
      border-radius: var(--cg-border-radius-50);
      font-size: var(--cg-font-size-sm);
      color: var(--cg-color-surface-container-text);
      cursor: pointer;
      transition: background-color var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
    }
    .option .opt-flag { font-size: var(--cg-font-size-base); flex-shrink: 0; }
    .option .opt-name {
      flex: 1;
      min-width: 0;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .option .opt-dial {
      color: var(--cg-color-input-text-placeholder);
      font-variant-numeric: tabular-nums;
      flex-shrink: 0;
    }
    .option:hover, .option.active {
      background: var(--cg-color-action-tertiary-background-hover);
      color: var(--cg-color-surface-base-text);
    }
    .option.selected { font-weight: var(--cg-font-weight-medium); }
    .option.selected .opt-name::after {
      content: '';
      display: inline-block;
      width: var(--cg-spacing-6);
    }
    .option.selected .opt-dial::after {
      content: ' ✓';
      color: var(--cg-color-accent-text);
      font-weight: var(--cg-font-weight-semibold);
    }

    .empty {
      padding: var(--cg-spacing-20);
      text-align: center;
      color: var(--cg-color-surface-container-outlined);
      font-size: var(--cg-font-size-sm);
    }

    /* ── Visually-hidden live region ────────────────────────────────────── */
    .sr-only {
      position: absolute; width: 1px; height: 1px;
      padding: 0; margin: -1px; overflow: hidden;
      clip: rect(0, 0, 0, 0); white-space: nowrap; border: 0;
    }
  `];

  // ─── Public API ───────────────────────────────────────────────────────────

  @property() value = '';
  @property({ reflect: true }) country = 'US';
  @property({ attribute: 'default-country' }) defaultCountry = 'US';
  @property() name = '';
  @property() label = '';
  @property() placeholder = '';
  @property() helper = '';
  @property({ reflect: true }) size: 'md' | 'lg' = 'md';
  @property({ reflect: true }) rounded: 'none' | 'sm' | 'md' | 'lg' = 'lg';
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ type: Boolean }) readonly = false;
  @property({ type: Boolean, reflect: true }) error = false;
  @property({ type: Boolean, reflect: true }) success = false;
  @property({ type: Boolean }) required = false;
  @property({ type: Boolean, reflect: true }) loading = false;
  @property({ type: Boolean, attribute: 'national-mode' }) nationalMode = false;
  @property({ type: Array, attribute: 'preferred-countries' })
  preferredCountries: string[] = ['US', 'GB', 'BR', 'DE', 'FR', 'CA', 'AU', 'IN', 'JP', 'MX'];
  @property({ type: Array, attribute: 'only-countries' }) onlyCountries: string[] = [];
  @property({ type: Array, attribute: 'exclude-countries' }) excludeCountries: string[] = [];
  @property({ type: Boolean, reflect: true }) open = false;

  // ─── Internal state ───────────────────────────────────────────────────────

  /** Display string for the number field — digits + light formatting. */
  @state() private _national = '';
  @state() private _focused = false;
  @state() private _query = '';
  @state() private _activeIndex = 0;
  @state() private _announcement = '';

  @query('input[type="tel"]') private _telInput!: HTMLInputElement;
  @query('.search input') private _searchInput!: HTMLInputElement;
  @query('.options') private _optionsEl!: HTMLElement;

  private _disposeOutside: (() => void) | null = null;

  // ─── Lifecycle ────────────────────────────────────────────────────────────

  override connectedCallback(): void {
    super.connectedCallback();
    if (!this.country && this.defaultCountry) this.country = this.defaultCountry;
    if (this.value) {
      const detected = detectCountryFromValue(this.value, this.country || 'US');
      const allDigits = digitsOnly(this.value);
      if (detected) {
        this.country = detected.iso2;
        this._national = allDigits.slice(detected.dialCode.length);
      } else {
        this._national = allDigits;
      }
    }
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this._disposeOutside?.();
    this._disposeOutside = null;
  }

  override updated(changed: PropertyValues): void {
    super.updated(changed);
    if (changed.has('open')) {
      if (this.open) {
        this._disposeOutside = bindOutsideClick(this, () => { this._close(); });
        // Focus search after the popover renders.
        this.updateComplete.then(() => this._searchInput?.focus());
      } else {
        this._disposeOutside?.();
        this._disposeOutside = null;
        this._query = '';
        this._activeIndex = 0;
      }
    }

    if (changed.has('value') && !changed.has('country') && this.value) {
      const detected = detectCountryFromValue(this.value, this.country || 'US');
      if (detected) {
        if (detected.iso2 !== this.country) this.country = detected.iso2;
        const allDigits = digitsOnly(this.value);
        this._national = allDigits.slice(detected.dialCode.length);
      }
    }

    if (changed.has('value') || changed.has('required')) {
      this._internals?.setFormValue(this.value || '');
      if (this.required && !this.value) {
        this._internals?.setValidity({ valueMissing: true }, 'This field is required');
      } else {
        this._internals?.setValidity({});
      }
    }
  }

  formResetCallback(): void {
    this.value = this.getAttribute('value') ?? '';
    this._national = '';
  }

  formStateRestoreCallback(state: string): void {
    this.value = state;
  }

  // ─── Public methods ───────────────────────────────────────────────────────

  override focus(): void { this._telInput?.focus(); }

  /** Length-based validation against the selected country format. */
  validate(): boolean {
    const c = this._currentCountry;
    if (!c) return false;
    const len = this._national.length;
    if (c.minLength != null && len < c.minLength) return false;
    if (c.maxLength != null && len > c.maxLength) return false;
    return len > 0;
  }

  // ─── Derived values ───────────────────────────────────────────────────────

  private get _currentCountry(): Country | undefined {
    return COUNTRIES_BY_ISO[(this.country || 'US').toUpperCase()];
  }

  private get _filteredCountries(): { preferred: Country[]; rest: Country[] } {
    const q = this._query.trim().toLowerCase();
    const allow = (c: Country) => {
      if (this.onlyCountries.length && !this.onlyCountries.includes(c.iso2)) return false;
      if (this.excludeCountries.includes(c.iso2)) return false;
      return true;
    };
    const matches = (c: Country) => {
      if (!q) return true;
      const stripped = q.startsWith('+') ? q.slice(1) : q;
      return (
        c.name.toLowerCase().includes(q) ||
        c.iso2.toLowerCase().includes(q) ||
        c.dialCode.startsWith(stripped)
      );
    };
    if (q) {
      const all = COUNTRIES.filter(c => allow(c) && matches(c));
      return { preferred: [], rest: all };
    }
    const preferredSet = new Set(this.preferredCountries);
    const preferred = this.preferredCountries
      .map(iso => COUNTRIES_BY_ISO[iso])
      .filter((c): c is Country => !!c && allow(c));
    const rest = COUNTRIES.filter(c => allow(c) && !preferredSet.has(c.iso2));
    return { preferred, rest };
  }

  private get _flatFiltered(): Country[] {
    const { preferred, rest } = this._filteredCountries;
    return [...preferred, ...rest];
  }

  private get _isFloated(): boolean {
    return this._focused || !!this._national;
  }

  // ─── Event helpers ────────────────────────────────────────────────────────

  private _emitChange(): void {
    const c = this._currentCountry;
    const dialCode = c?.dialCode ?? '';
    const national = digitsOnly(this._national);
    const next = national ? `+${dialCode}${national}` : '';
    if (next !== this.value) this.value = next;
    this.dispatchEvent(new CustomEvent('cg-phone-input-change', {
      detail: {
        value: next,
        country: this.country,
        dialCode,
        nationalNumber: national,
        valid: this.validate(),
      },
      bubbles: true,
      composed: true,
    }));
  }

  private _announce(msg: string): void {
    this._announcement = '';
    requestAnimationFrame(() => { this._announcement = msg; });
  }

  // ─── Country trigger / popover ────────────────────────────────────────────

  private _toggleOpen(e: Event): void {
    e.stopPropagation();
    if (this.disabled || this.readonly) return;
    this.open = !this.open;
  }

  private _close(): void {
    if (this.open) this.open = false;
  }

  private _selectCountry(c: Country, returnFocusToInput = true): void {
    if (this.country !== c.iso2) {
      this.country = c.iso2;
      this._announce(`Switched to ${c.name}, +${c.dialCode}`);
      this.dispatchEvent(new CustomEvent('cg-phone-input-country-change', {
        detail: { country: c.iso2, dialCode: c.dialCode },
        bubbles: true,
        composed: true,
      }));
      this._emitChange();
    }
    this.open = false;
    if (returnFocusToInput) {
      this.updateComplete.then(() => this._telInput?.focus());
    }
  }

  private _onSearchInput(e: Event): void {
    this._query = (e.target as HTMLInputElement).value;
    this._activeIndex = 0;
    this.updateComplete.then(() => this._optionsEl?.scrollTo({ top: 0 }));
  }

  private _onPopoverKey(e: KeyboardEvent): void {
    const flat = this._flatFiltered;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      this._activeIndex = Math.min(flat.length - 1, this._activeIndex + 1);
      this._scrollActiveIntoView();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      this._activeIndex = Math.max(0, this._activeIndex - 1);
      this._scrollActiveIntoView();
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const c = flat[this._activeIndex];
      if (c) this._selectCountry(c);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      this._close();
      this._telInput?.focus();
    }
  }

  private _scrollActiveIntoView(): void {
    this.updateComplete.then(() => {
      const el = this._optionsEl?.querySelector(`.option[data-index="${this._activeIndex}"]`) as HTMLElement | null;
      el?.scrollIntoView({ block: 'nearest' });
    });
  }

  // ─── Number input handlers ────────────────────────────────────────────────

  private _onTelKeydown(e: KeyboardEvent): void {
    if (e.key === 'ArrowDown' && (e.altKey || e.metaKey)) {
      e.preventDefault();
      this.open = true;
    }
  }

  private _onTelInput(e: Event): void {
    const raw = (e.target as HTMLInputElement).value;
    this._national = digitsOnly(raw);
    this._emitChange();
  }

  private _onTelFocus(): void { this._focused = true; }
  private _onTelBlur(): void { this._focused = false; }

  // ─── Render helpers ───────────────────────────────────────────────────────

  private _renderOption(c: Country, idx: number): ReturnType<typeof html> {
    const isSelected = c.iso2 === this.country;
    const isActive = idx === this._activeIndex;
    return html`
      <div
        class="option ${isSelected ? 'selected' : ''} ${isActive ? 'active' : ''}"
        role="option"
        id="cg-phone-opt-${idx}"
        data-index=${idx}
        aria-selected=${isSelected ? 'true' : 'false'}
        @click=${(e: MouseEvent) => { e.stopPropagation(); this._selectCountry(c); }}
        @mouseenter=${() => { this._activeIndex = idx; }}
      >
        <span class="opt-flag" aria-hidden="true">${c.flag}</span>
        <span class="opt-name">${c.name}</span>
        <span class="opt-dial">+${c.dialCode}</span>
      </div>
    `;
  }

  override render() {
    const c = this._currentCountry;
    const wrapperClasses = [
      'wrapper',
      this._focused ? 'focused' : '',
      this.disabled ? 'disabled' : '',
      this.readonly ? 'readonly' : '',
    ].filter(Boolean).join(' ');
    const fieldClasses = [
      'field',
      this.label ? 'has-label' : '',
      this._isFloated ? 'floated' : '',
    ].filter(Boolean).join(' ');
    const { preferred, rest } = this._filteredCountries;
    const triggerLabel = c
      ? `Country code, currently ${c.name}, +${c.dialCode}`
      : 'Select country code';
    const placeholder =
      this.placeholder ||
      c?.format ||
      'Phone number';

    return html`
      <div class=${wrapperClasses}>
        <button
          type="button"
          class="trigger"
          aria-haspopup="dialog"
          aria-expanded=${this.open ? 'true' : 'false'}
          aria-controls="cg-phone-listbox"
          aria-label=${triggerLabel}
          ?disabled=${this.disabled || this.readonly}
          @click=${this._toggleOpen}
          @keydown=${(e: KeyboardEvent) => {
            if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              this.open = true;
            }
          }}
          @focus=${() => { this._focused = true; }}
          @blur=${() => { this._focused = false; }}
        >
          ${this.loading
            ? html`<span class="trigger-spinner" aria-hidden="true"></span>`
            : html`<span class="flag" aria-hidden="true">${c?.flag ?? '🌐'}</span>`}
          <span class="dial-code">+${c?.dialCode ?? ''}</span>
          <svg class="chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="m6 9 6 6 6-6"/>
          </svg>
        </button>

        <div class=${fieldClasses}>
          ${this.label ? html`<span class="floating-label">${this.label}</span>` : nothing}
          <input
            type="tel"
            inputmode="tel"
            autocomplete="tel"
            .value=${this._national}
            name=${this.name || nothing}
            placeholder=${placeholder}
            ?disabled=${this.disabled || this.loading}
            ?readonly=${this.readonly}
            aria-invalid=${this.error ? 'true' : 'false'}
            aria-required=${this.required ? 'true' : 'false'}
            aria-describedby=${this.helper ? 'cg-phone-helper' : nothing}
            @input=${this._onTelInput}
            @keydown=${this._onTelKeydown}
            @focus=${this._onTelFocus}
            @blur=${this._onTelBlur}
          />
        </div>

        <div
          class="popover"
          role="dialog"
          aria-label="Select country"
          @keydown=${this._onPopoverKey}
          @click=${(e: MouseEvent) => e.stopPropagation()}
        >
          <div class="search">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <circle cx="11" cy="11" r="7"/>
              <path d="m20 20-3.5-3.5"/>
            </svg>
            <input
              type="search"
              role="searchbox"
              .value=${this._query}
              placeholder="Search country or +code"
              aria-controls="cg-phone-listbox"
              aria-activedescendant=${this.open && this._activeIndex >= 0 ? `cg-phone-opt-${this._activeIndex}` : nothing}
              @input=${this._onSearchInput}
            />
          </div>

          <div
            class="options"
            id="cg-phone-listbox"
            role="listbox"
            aria-label="Countries"
          >
            ${this._flatFiltered.length === 0
              ? html`<div class="empty">No countries match "${this._query}"</div>`
              : html`
                  ${preferred.length > 0 ? html`
                    <div class="group-label" role="presentation">Suggested</div>
                    ${preferred.map((cc, i) => this._renderOption(cc, i))}
                    <div class="group-label" role="presentation">All countries</div>
                  ` : nothing}
                  ${rest.map((cc, i) => this._renderOption(cc, preferred.length + i))}
                `}
          </div>
        </div>
      </div>

      ${this.helper ? html`<div class="helper" id="cg-phone-helper">${this.helper}</div>` : nothing}
      <div class="sr-only" role="status" aria-live="polite" aria-atomic="true">${this._announcement}</div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cg-phone-input': CgPhoneInput;
  }
}
