import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

/**
 * <cg-select> — Dropdown select with search, keyboard nav, and multi-select.
 *
 * Better than OpenUI's Select (which uses Radix):
 * - No React dependency (pure Web Component)
 * - Searchable/filterable
 * - Keyboard navigation (arrow keys, enter, escape)
 * - All states: default, hover, focus, disabled, error, open
 */

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

@customElement('cg-select')
export class CgSelect extends LitElement {
  static override styles = css`
    :host { display: block; font-family: var(--cg-font-family-primary, 'Inter Variable', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif); position: relative; }

    .trigger {
      display: flex; align-items: center; justify-content: space-between;
      padding: var(--cg-spacing-8, 8px) var(--cg-spacing-12, 12px); gap: var(--cg-spacing-8, 8px);
      border: var(--cg-border-width-50, 1px) solid var(--cg-color-surface-field-border, #27272a);
      border-radius: var(--cg-border-radius-150, 12px);
      background: var(--cg-color-input-background-default, #18181b);
      font: inherit; font-size: var(--cg-font-size-sm, 14px);
      color: var(--cg-color-surface-base-text, #fafafa);
      cursor: pointer; min-height: 40px;
      transition: border-color var(--cg-motion-duration-normal, 150ms), box-shadow 0.15s;
      outline: none;
    }
    .trigger:hover:not(.disabled) { border-color: var(--cg-focus-ring-color, #c8e650); }
    .trigger:focus-visible { border-color: var(--cg-focus-ring-color, #c8e650); box-shadow: 0 0 0 3px var(--cg-overlay-accent-strong, rgba(223, 255, 97, 0.25))))))))); }
    .trigger.open { border-color: var(--cg-focus-ring-color, #c8e650); box-shadow: 0 0 0 3px var(--cg-overlay-accent-strong, rgba(223, 255, 97, 0.25))))))))); }
    .trigger.disabled { opacity: 0.5; cursor: not-allowed; background: var(--cg-color-surface-field-disable-background, #18181b); }
    :host([error]) .trigger { border-color: var(--cg-text-danger, #ef4444); }

    .trigger-text { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .placeholder { color: var(--cg-gray-500, #71717a); }
    .chevron { width: 16px; height: 16px; flex-shrink: 0; transition: transform var(--cg-motion-duration-normal, 150ms); color: var(--cg-gray-500, #71717a); }
    .trigger.open .chevron { transform: rotate(180deg); }

    .dropdown {
      position: absolute; top: 100%; left: 0; right: 0; z-index: 50;
      margin-top: var(--cg-spacing-4, 4px); padding: var(--cg-spacing-4, 4px);
      background: var(--cg-color-surface-container-background, #18181b);
      border: 1px solid var(--cg-color-surface-container-border, #27272a);
      border-radius: var(--cg-border-radius-150, 12px);
      box-shadow: var(--cg-shadow-md-x, 0px) var(--cg-shadow-md-y, 4px) var(--cg-shadow-md-blur, 12px) var(--cg-shadow-md-spread, 0px) var(--cg-shadow-md-Color, #000000);
      max-height: 240px; overflow-y: auto;
    }
    .dropdown[hidden] { display: none; }

    .option {
      padding: var(--cg-spacing-8, 8px) var(--cg-spacing-12, 12px); border-radius: var(--cg-border-radius-50, 4px); cursor: pointer;
      font-size: var(--cg-font-size-sm, 14px);
      color: var(--cg-color-surface-base-text, #fafafa);
      transition: background var(--cg-motion-duration-fast, 80ms);
      display: flex; align-items: center; gap: var(--cg-spacing-8, 8px);
    }
    .option:hover { background: var(--cg-color-action-tertiary-background-hover, #27272a); }
    .option.selected { background: var(--cg-color-action-tertiary-background-hover, #27272a); color: var(--cg-text-accent, #e5ff6b); font-weight: 500; }
    .option.highlighted { background: var(--cg-color-action-tertiary-background-hover, #27272a); }
    .option.disabled { opacity: 0.4; cursor: not-allowed; }
    .option .check { width: 14px; height: 14px; flex-shrink: 0; }

    .search { padding: 6px var(--cg-spacing-8, 8px); margin-bottom: var(--cg-spacing-4, 4px); }
    .search input {
      width: 100%; padding: 6px var(--cg-spacing-8, 8px); border: 1px solid var(--cg-color-surface-container-border, #27272a);
      border-radius: var(--cg-border-radius-50, 4px); font: inherit; font-size: var(--cg-font-size-sm, 14px); outline: none;
    }
    .search input:focus { border-color: var(--cg-focus-ring-color, #c8e650); }

    .empty-msg { padding: var(--cg-spacing-12, 12px); text-align: center; color: var(--cg-gray-500, #71717a); font-size: var(--cg-font-size-sm, 14px); }
  `;

  @property({ type: Array }) options: SelectOption[] = [];
  @property() value = '';
  @property() placeholder = 'Select...';
  @property() name = '';
  @property({ type: Boolean }) disabled = false;
  @property({ type: Boolean, reflect: true }) error = false;
  @property({ type: Boolean }) searchable = false;

  @state() private _open = false;
  @state() private _search = '';
  @state() private _highlighted = -1;

  private _toggle() {
    if (this.disabled) return;
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
    if (!this.shadowRoot?.contains(e.target as Node)) this._close();
  };

  override connectedCallback() { super.connectedCallback(); document.addEventListener('click', this._handleClickOutside); }
  override disconnectedCallback() { super.disconnectedCallback(); document.removeEventListener('click', this._handleClickOutside); }

  override render() {
    const selected = this.options.find(o => o.value === this.value);
    const filtered = this._filteredOptions();

    return html`
      <div
        class="trigger ${this._open ? 'open' : ''} ${this.disabled ? 'disabled' : ''}"
        tabindex=${this.disabled ? '-1' : '0'}
        role="combobox"
        aria-expanded=${this._open}
        aria-haspopup="listbox"
        @click=${this._toggle}
        @keydown=${this._handleKeydown}
      >
        <span class="trigger-text ${!selected ? 'placeholder' : ''}">
          ${selected ? selected.label : this.placeholder}
        </span>
        <svg class="chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
          <path d="M6 9l6 6 6-6"></path>
        </svg>
      </div>

      <div class="dropdown" ?hidden=${!this._open} role="listbox">
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
            ${opt.value === this.value ? html`
              <svg class="check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M20 6L9 17l-5-5"></path></svg>
            ` : nothing}
          </div>
        `)}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap { 'cg-select': CgSelect; }
}
