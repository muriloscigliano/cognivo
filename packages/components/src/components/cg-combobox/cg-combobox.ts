import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { hostBlock, reducedMotion } from '../../styles/index.js';

export interface ComboOption {
  label: string;
  value: string;
  disabled?: boolean;
}

/**
 * @element cg-combobox
 * Typeahead input with optional chips for multi-select.
 *
 * @fires {CustomEvent<{value:string|string[]}>} cg-combobox-change
 */
@customElement('cg-combobox')
export class CgCombobox extends LitElement {
  static formAssociated = true;

  static override styles = [hostBlock, reducedMotion, css`
    :host {
      display: inline-block;
      width: 100%;
      max-width: 100%;
      font-family: var(--cg-font-family-primary);
    }

    .wrapper {
      position: relative;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: var(--cg-spacing-6);
      min-height: var(--cg-component-input-height-md);
      padding: var(--cg-spacing-10) var(--cg-spacing-12);
      background: var(--cg-color-surface-container-background);
      border: var(--cg-border-width-50) solid var(--cg-color-surface-container-border);
      border-radius: var(--cg-component-input-radius);
      color: var(--cg-color-surface-container-text);
      cursor: text;
      transition:
        border-color var(--cg-transition-duration-fast) var(--cg-transition-easing-default),
        box-shadow var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
    }
    .wrapper:hover { border-color: var(--cg-color-input-border-hover); }
    .wrapper:focus-within {
      border-color: var(--cg-color-input-border-focus);
      box-shadow: 0 0 0 var(--cg-focus-ring-width) var(--cg-color-focus-ring);
    }
    :host([disabled]) .wrapper {
      opacity: 0.5;
      cursor: not-allowed;
      pointer-events: none;
    }

    .chip {
      display: inline-flex;
      align-items: center;
      gap: var(--cg-spacing-4);
      padding: var(--cg-spacing-4) var(--cg-spacing-4) var(--cg-spacing-4) var(--cg-spacing-10);
      background: var(--cg-color-action-tertiary-background-hover);
      border: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
      color: var(--cg-color-surface-base-text);
      font-size: var(--cg-font-size-xs);
      font-weight: var(--cg-font-weight-medium);
      border-radius: var(--cg-border-radius-full);
      animation: comboChipIn var(--cg-transition-duration-default) var(--cg-transition-easing-spring);
    }
    @keyframes comboChipIn {
      from { opacity: 0; transform: scale(0.8); }
      to { opacity: 1; transform: scale(1); }
    }
    .chip-remove {
      background: none;
      border: none;
      color: inherit;
      font: inherit;
      cursor: pointer;
      padding: 0;
      font-size: var(--cg-font-size-sm);
      line-height: 1;
    }

    input {
      flex: 1;
      min-width: var(--cg-spacing-80);
      background: transparent;
      border: none;
      outline: none;
      color: inherit;
      font: inherit;
      font-size: var(--cg-font-size-sm);
    }
    input::placeholder { color: var(--cg-color-surface-container-outlined); }

    .clear-btn {
      background: none;
      border: none;
      color: var(--cg-color-surface-container-outlined);
      cursor: pointer;
      padding: var(--cg-spacing-2);
      font-size: var(--cg-font-size-sm);
      line-height: 1;
    }

    .listbox {
      position: absolute;
      top: calc(100% + var(--cg-spacing-6));
      left: 0;
      right: 0;
      z-index: var(--cg-z-index-500);
      max-height: var(--cg-component-combobox-listbox-max-height);
      overflow-y: auto;
      padding: var(--cg-spacing-6);
      background: var(--cg-color-modal-container-background);
      border: var(--cg-border-width-50) solid var(--cg-color-modal-container-border);
      border-radius: var(--cg-border-radius-150);
      box-shadow: var(--cg-shadow-elevation-xl);
      display: none;
      opacity: 0;
      transform: translateY(-4px);
      transition:
        opacity var(--cg-transition-duration-fast) var(--cg-transition-easing-default),
        transform var(--cg-transition-duration-default) var(--cg-transition-easing-ease-out);
    }
    :host([open]) .listbox {
      display: block;
      opacity: 1;
      transform: translateY(0);
    }

    .option {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--cg-spacing-12);
      padding: var(--cg-spacing-10) var(--cg-spacing-12);
      border-radius: var(--cg-border-radius-50);
      font-size: var(--cg-font-size-sm);
      color: var(--cg-color-surface-container-text);
      cursor: pointer;
      transition: background-color var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
    }
    .option:hover,
    .option.active {
      background: var(--cg-color-action-tertiary-background-hover);
    }
    .option.disabled { opacity: 0.5; cursor: not-allowed; }
    .option.selected { font-weight: var(--cg-font-weight-medium); }
    .option.selected::after {
      content: '✓';
      color: var(--cg-color-action-primary-background-default);
      font-weight: var(--cg-font-weight-semibold);
    }

    .empty {
      padding: var(--cg-spacing-16);
      text-align: center;
      color: var(--cg-color-surface-container-outlined);
      font-size: var(--cg-font-size-sm);
    }
  `];

  @property({ type: Array }) options: ComboOption[] = [];
  @property() value: string | string[] = '';
  @property({ type: Boolean }) multiple = false;
  @property() placeholder = '';
  @property({ type: Boolean }) searchable = true;
  @property({ type: Boolean }) clearable = false;
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ type: Boolean }) loading = false;
  @property() name = '';
  @property({ type: Boolean, reflect: true }) open = false;

  @state() private _query = '';
  @state() private _activeIndex = -1;

  @query('input') private _input!: HTMLInputElement;

  private _internals: ElementInternals | null = null;

  private _outsideHandler = (e: MouseEvent) => {
    if (!this.open) return;
    if (!e.composedPath().includes(this)) this.open = false;
  };

  constructor() {
    super();
    if ('attachInternals' in this) {
      try { this._internals = (this as HTMLElement).attachInternals(); } catch { /* ignore */ }
    }
  }

  override connectedCallback(): void {
    super.connectedCallback();
    document.addEventListener('click', this._outsideHandler);
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    document.removeEventListener('click', this._outsideHandler);
  }

  override updated(changed: Map<string, unknown>): void {
    if (changed.has('value')) this._updateFormValue();
  }

  private _updateFormValue(): void {
    if (!this._internals) return;
    const v = Array.isArray(this.value) ? this.value.join(',') : this.value;
    this._internals.setFormValue(v);
  }

  private get _values(): string[] {
    if (this.multiple) return Array.isArray(this.value) ? this.value : [];
    return typeof this.value === 'string' && this.value ? [this.value] : [];
  }

  private _filteredOptions(): ComboOption[] {
    if (!this._query || !this.searchable) return this.options;
    const q = this._query.toLowerCase();
    return this.options.filter(o => o.label.toLowerCase().includes(q));
  }

  private _selectOption(opt: ComboOption): void {
    if (opt.disabled) return;
    if (this.multiple) {
      const cur = this._values;
      const next = cur.includes(opt.value) ? cur.filter(v => v !== opt.value) : [...cur, opt.value];
      this.value = next;
    } else {
      this.value = opt.value;
      this.open = false;
    }
    this._query = '';
    this.dispatchEvent(new CustomEvent('cg-combobox-change', {
      bubbles: true, composed: true, detail: { value: this.value },
    }));
  }

  private _removeChip(v: string): void {
    if (!this.multiple) return;
    this.value = this._values.filter(x => x !== v);
    this.dispatchEvent(new CustomEvent('cg-combobox-change', {
      bubbles: true, composed: true, detail: { value: this.value },
    }));
  }

  private _clear(): void {
    this.value = this.multiple ? [] : '';
    this._query = '';
    this.dispatchEvent(new CustomEvent('cg-combobox-change', {
      bubbles: true, composed: true, detail: { value: this.value },
    }));
  }

  private _onInput(e: Event): void {
    this._query = (e.target as HTMLInputElement).value;
    this.open = true;
    this._activeIndex = 0;
  }

  private _onKeydown(e: KeyboardEvent): void {
    const filtered = this._filteredOptions();
    if (e.key === 'Backspace' && !this._query && this.multiple && this._values.length) {
      this._removeChip(this._values[this._values.length - 1]!);
      return;
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      this.open = true;
      this._activeIndex = Math.min(filtered.length - 1, this._activeIndex + 1);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      this._activeIndex = Math.max(0, this._activeIndex - 1);
    } else if (e.key === 'Enter') {
      if (this.open && filtered[this._activeIndex]) {
        e.preventDefault();
        this._selectOption(filtered[this._activeIndex]!);
      }
    } else if (e.key === 'Escape') {
      this.open = false;
    }
  }

  private _onWrapperClick(): void {
    if (this.disabled) return;
    this._input?.focus();
    this.open = true;
  }

  private _labelFor(value: string): string {
    return this.options.find(o => o.value === value)?.label ?? value;
  }

  override render() {
    const filtered = this._filteredOptions();
    const values = this._values;
    const hasValue = values.length > 0;

    return html`
      <div class="wrapper" @click=${this._onWrapperClick}>
        ${this.multiple
          ? values.map(v => html`
              <span class="chip">
                ${this._labelFor(v)}
                <button class="chip-remove" aria-label="Remove" @click=${(e: MouseEvent) => { e.stopPropagation(); this._removeChip(v); }}>×</button>
              </span>
            `)
          : nothing}
        <input
          type="text"
          role="combobox"
          aria-expanded=${this.open ? 'true' : 'false'}
          aria-autocomplete="list"
          aria-controls="combobox-listbox"
          aria-activedescendant=${this.open && this._activeIndex >= 0 ? `combobox-opt-${this._activeIndex}` : nothing}
          ?disabled=${this.disabled}
          .value=${this.multiple ? this._query : (typeof this.value === 'string' ? (this._query || this._labelFor(this.value)) : this._query)}
          placeholder=${this.placeholder}
          @input=${this._onInput}
          @keydown=${this._onKeydown}
          @focus=${() => { this.open = true; }}
        />
        ${this.clearable && hasValue ? html`
          <button class="clear-btn" aria-label="Clear" @click=${(e: MouseEvent) => { e.stopPropagation(); this._clear(); }}>×</button>
        ` : nothing}
      </div>
      <div
        class="listbox"
        id="combobox-listbox"
        role="listbox"
        aria-multiselectable=${this.multiple ? 'true' : 'false'}
      >
        ${this.loading ? html`<div class="empty">Loading…</div>` :
          filtered.length === 0 ? html`<div class="empty">No options</div>` :
          filtered.map((opt, i) => html`
            <div
              class="option ${opt.disabled ? 'disabled' : ''} ${values.includes(opt.value) ? 'selected' : ''} ${i === this._activeIndex ? 'active' : ''}"
              id=${`combobox-opt-${i}`}
              role="option"
              aria-selected=${values.includes(opt.value) ? 'true' : 'false'}
              aria-disabled=${opt.disabled ? 'true' : 'false'}
              @click=${(e: MouseEvent) => { e.stopPropagation(); this._selectOption(opt); }}
            >${opt.label}</div>
          `)}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cg-combobox': CgCombobox;
  }
}
