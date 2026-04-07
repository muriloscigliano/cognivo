import { LitElement, html, css, nothing, type PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { hostBlock, reducedMotion } from '../../styles/index.js';

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
 * @fires {CustomEvent<{value: string, label: string}>} cg-change - When a selection is made
 *
 * @cssprop [--cg-color-input-background-default=#18181b] - Trigger background
 * @cssprop [--cg-color-surface-container-background=#18181b] - Dropdown panel background
 * @cssprop [--cg-focus-ring-color=#c8e650] - Focus/hover border accent
 * @cssprop [--cg-border-radius-150=12px] - Border radius for trigger and dropdown
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
    if (typeof this.attachInternals === 'function') {
      this._internals = this.attachInternals();
    }
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
      transition: border-color var(--cg-motion-duration-fast) var(--cg-motion-easing-default), box-shadow var(--cg-motion-duration-fast) var(--cg-motion-easing-default), transform var(--cg-motion-duration-fast) var(--cg-motion-easing-default);
      outline: none;
    }
    .trigger:hover:not(.disabled) { border-color: var(--cg-color-input-border-hover); }
    .trigger:active:not(.disabled) {
      transform: scale(var(--cg-interaction-press-scale));
    }
    .trigger:focus-visible { outline: none; border-color: var(--cg-color-input-border-focus); box-shadow: 0 0 0 3px var(--cg-overlay-accent-strong); }

    /* Loading */
    :host([loading]) .trigger { pointer-events: none; opacity: 0.7; }
    .loading-spinner {
      width: var(--cg-spacing-16);
      height: var(--cg-spacing-16);
      border: var(--cg-border-width-100) solid var(--cg-color-loading-spinner-secondary);
      border-top-color: var(--cg-color-loading-spinner-primary);
      border-radius: var(--cg-border-radius-full);
      animation: cg-select-spin var(--cg-motion-duration-slow) linear infinite;
      flex-shrink: 0;
    }
    @keyframes cg-select-spin {
      to { transform: rotate(360deg); }
    }
    .trigger.open { border-color: var(--cg-color-input-border-focus); box-shadow: 0 0 0 3px var(--cg-overlay-accent-strong); }
    .trigger.disabled { opacity: 0.5; pointer-events: none; background: var(--cg-color-input-background-disabled); border-color: var(--cg-color-input-border-disabled); }
    :host([error]) .trigger { border-color: var(--cg-color-input-border-error); }
    :host([error]) .trigger:focus-visible,
    :host([error]) .trigger.open {
      border-color: var(--cg-color-status-error-text-default);
      box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.2);
    }
    :host([success]) .trigger { border-color: var(--cg-color-status-success-border-default); }
    :host([success]) .trigger:focus-visible,
    :host([success]) .trigger.open {
      border-color: var(--cg-color-status-success-text-default);
      box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.2);
    }

    .trigger-text { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .placeholder { color: var(--cg-color-input-text-placeholder); }
    .chevron { width: var(--cg-icon-size-100); height: var(--cg-icon-size-100); flex-shrink: 0; transition: transform var(--cg-motion-duration-normal) var(--cg-motion-easing-default); color: var(--cg-color-surface-container-outlined); }
    .trigger.open .chevron { transform: rotate(180deg); }

    .dropdown {
      position: absolute; top: 100%; left: 0; right: 0; z-index: 50;
      margin-top: var(--cg-spacing-4); padding: var(--cg-spacing-6);
      background: var(--cg-color-modal-container-background);
      border: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
      border-radius: var(--cg-component-card-radius);
      max-height: 240px; overflow-y: auto;
      opacity: 0; transform: translateY(calc(-1 * var(--cg-spacing-4))) scale(0.98); pointer-events: none;
      transition: opacity var(--cg-motion-duration-fast) var(--cg-motion-easing-default), transform var(--cg-motion-duration-fast) var(--cg-motion-easing-default);
    }
    .dropdown.open {
      opacity: 1; transform: translateY(0) scale(1); pointer-events: auto;
    }
    .dropdown[hidden] { display: none; }

    .option {
      padding: var(--cg-spacing-8) var(--cg-spacing-12); border-radius: var(--cg-border-radius-150); cursor: pointer;
      font-size: var(--cg-font-size-sm);
      color: var(--cg-color-surface-base-text);
      transition: background var(--cg-motion-duration-fast) var(--cg-motion-easing-default);
      display: flex; align-items: center; gap: var(--cg-spacing-8);
    }
    .option:hover { background: var(--cg-overlay-dark-subtle); }
    .option.highlighted { background: var(--cg-overlay-dark-subtle); }
    .option.selected { color: var(--cg-color-action-primary-background-default); font-weight: var(--cg-font-weight-medium); }
    .option.disabled { opacity: 0.5; pointer-events: none; }
    .option .check {
      width: var(--cg-icon-size-100); height: var(--cg-icon-size-100); flex-shrink: 0;
      margin-left: auto; opacity: 0;
      color: var(--cg-color-action-primary-background-default);
      transition: opacity var(--cg-motion-duration-fast) var(--cg-motion-easing-default);
    }
    .option.selected .check { opacity: 1; }

    .search { padding: 0; margin-bottom: var(--cg-spacing-4); }
    .search input {
      width: 100%; box-sizing: border-box;
      padding: var(--cg-spacing-8) var(--cg-spacing-12);
      border: var(--cg-border-width-50) solid var(--cg-color-surface-cards-divider);
      border-radius: var(--cg-border-radius-100);
      font: inherit; font-size: var(--cg-font-size-sm); outline: none;
      background: transparent; color: var(--cg-color-input-text-default);
    }
    .search input::placeholder { color: var(--cg-color-input-text-placeholder); }
    .search input:focus { border-color: var(--cg-color-input-border-focus); }

    .empty-msg { padding: var(--cg-spacing-12); text-align: center; color: var(--cg-color-input-text-placeholder); font-size: var(--cg-font-size-sm); }

    .label { display: block; font-size: var(--cg-font-size-xs); font-weight: var(--cg-font-weight-medium); color: var(--cg-color-surface-container-outlined); margin-bottom: var(--cg-spacing-4); }

    /* Size variants */
    :host([size="sm"]) .trigger { height: var(--cg-component-input-height-sm); font-size: var(--cg-font-size-xs); padding: 0 var(--cg-spacing-8); border-radius: var(--cg-border-radius-100); }
    :host([size="sm"]) .option { font-size: var(--cg-font-size-xs); }

    :host([size="lg"]) .trigger { height: var(--cg-component-input-height-lg); font-size: var(--cg-font-size-base); padding: 0 var(--cg-spacing-16); border-radius: var(--cg-border-radius-150); }
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
    :host([rounded="full"]) .dropdown { border-radius: var(--cg-border-radius-full); }
  `];

  @property({ reflect: true }) size: 'sm' | 'md' | 'lg' = 'md';
  @property({ reflect: true }) rounded: 'none' | 'sm' | 'md' | 'lg' | 'full' = 'lg';
  @property({ type: Array }) options: SelectOption[] = [];
  @property() value = '';
  @property() label = '';
  @property() placeholder = 'Select...';
  @property() name = '';
  @property({ type: Boolean }) disabled = false;
  @property({ type: Boolean, reflect: true }) error = false;
  @property({ type: Boolean, reflect: true }) success = false;
  @property({ type: Boolean, reflect: true }) loading = false;
  @property({ type: Boolean }) searchable = false;
  @property({ type: Boolean }) required = false;

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

  @state() private _open = false;
  @state() private _search = '';
  @state() private _highlighted = -1;

  private _toggle() {
    if (this.disabled || this.loading) return;
    this._open = !this._open;
    this._search = '';
    this._highlighted = -1;
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

  private _handleKeydown(e: KeyboardEvent) {
    const filtered = this._filteredOptions();
    if (e.key === 'Escape') { this._close(); return; }
    if (e.key === 'Enter' || e.key === ' ') {
      if (!this._open) { this._toggle(); e.preventDefault(); return; }
      if (this._highlighted >= 0 && this._highlighted < filtered.length) {
        this._select(filtered[this._highlighted]!);
        e.preventDefault();
      }
      return;
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (!this._open) { this._open = true; return; }
      this._highlighted = Math.min(this._highlighted + 1, filtered.length - 1);
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      this._highlighted = Math.max(this._highlighted - 1, 0);
    }
  }

  private _handleClickOutside = (e: Event) => {
    if (!e.composedPath().includes(this)) this._close();
  };

  override connectedCallback() { super.connectedCallback(); document.addEventListener('click', this._handleClickOutside); }
  override disconnectedCallback() { super.disconnectedCallback(); document.removeEventListener('click', this._handleClickOutside); }

  override render() {
    const selected = this.options.find(o => o.value === this.value);
    const filtered = this._filteredOptions();

    return html`
      ${this.label ? html`<span class="label">${this.label}</span>` : nothing}
      <div
        class="trigger ${this._open ? 'open' : ''} ${this.disabled ? 'disabled' : ''}"
        tabindex=${this.disabled ? '-1' : '0'}
        role="combobox"
        aria-expanded=${this._open}
        aria-haspopup="listbox"
        aria-required=${this.required ? 'true' : 'false'}
        aria-busy=${this.loading ? 'true' : 'false'}
        @click=${this._toggle}
        @keydown=${this._handleKeydown}
      >
        <span class="trigger-text ${!selected ? 'placeholder' : ''}">
          ${selected ? selected.label : this.placeholder}
        </span>
        ${this.loading ? html`<span class="loading-spinner" aria-hidden="true"></span>` : html`
        <svg class="chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M6 9l6 6 6-6"></path>
        </svg>`}
      </div>

      <div class="dropdown ${this._open ? 'open' : ''}" ?hidden=${!this._open} role="listbox">
        ${this.searchable ? html`
          <div class="search">
            <input
              placeholder="Search..."
              .value=${this._search}
              @input=${(e: Event) => { this._search = (e.target as HTMLInputElement).value; this._highlighted = 0; }}
              @click=${(e: Event) => e.stopPropagation()}
            />
          </div>
        ` : nothing}
        ${filtered.length === 0 ? html`<div class="empty-msg">No options</div>` : nothing}
        ${filtered.map((opt, i) => html`
          <div
            class="option ${opt.value === this.value ? 'selected' : ''} ${i === this._highlighted ? 'highlighted' : ''} ${opt.disabled ? 'disabled' : ''}"
            role="option"
            aria-selected=${opt.value === this.value}
            @click=${(e: Event) => { e.stopPropagation(); this._select(opt); }}
          >
            <span>${opt.label}</span>
            <svg class="check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"></path></svg>
          </div>
        `)}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap { 'cg-select': CgSelect; }
}
