import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { hostBlock, reducedMotion } from '../../styles/index.js';

export interface AutocompleteOption {
  value: string;
  label: string;
  icon?: string;
}

/**
 * <cg-autocomplete> — Combobox input with filtered dropdown suggestions.
 *
 * Features:
 * - Type to filter, arrow key navigation, Enter to select, Escape to close
 * - Clear button, highlight matching text
 * - Scale+fade dropdown animation
 * - Empty state message, proper ARIA combobox pattern
 * - Dual focus ring, keyboard accessible
 */
@customElement('cg-autocomplete')
export class CgAutocomplete extends LitElement {
  static override styles = [hostBlock, reducedMotion, css`
    :host {
      position: relative;
    }

    .label {
      display: block;
      font-size: var(--cg-font-size-xs, 12px);
      color: var(--cg-color-input-text-placeholder, #71717a);
      margin-bottom: var(--cg-spacing-4, 4px);
    }

    .input-wrap {
      display: flex;
      align-items: center;
      gap: var(--cg-spacing-8, 8px);
      padding: 0 var(--cg-spacing-12, 12px);
      border: 1px solid var(--cg-color-input-border-default, #3f3f46);
      border-radius: var(--cg-border-radius-150, 12px);
      background: var(--cg-color-input-background-default, #18181b);
      min-height: 40px;
      transition: border-color 200ms ease-out, box-shadow 200ms ease-out;
    }
    .input-wrap:hover:not(.disabled) {
      border-color: var(--cg-color-input-border-hover, #dfff61);
    }
    .input-wrap.focused {
      border-color: var(--cg-brand-ai-accent, #dfff61);
      box-shadow:
        0 0 0 2px var(--cg-color-surface-base-background, #09090b),
        0 0 0 4px var(--cg-brand-ai-accent, #dfff61);
    }
    .input-wrap.disabled { opacity: 0.5; cursor: not-allowed; }

    input {
      flex: 1;
      border: none;
      outline: none;
      background: transparent;
      font: inherit;
      font-size: var(--cg-font-size-sm, 14px);
      color: var(--cg-color-input-text-default, #f4f4f5);
      min-width: 0;
      padding: var(--cg-spacing-8, 8px) 0;
    }
    input::placeholder { color: var(--cg-color-input-text-placeholder, #71717a); }
    input:disabled { cursor: not-allowed; }

    .clear {
      display: flex; align-items: center; justify-content: center;
      width: 18px; height: 18px; border: none; padding: 0;
      background: var(--cg-gray-200, #e4e4e7); color: var(--cg-gray-500, #71717a);
      border-radius: var(--cg-border-radius-full, 99999px); cursor: pointer; flex-shrink: 0;
      transition: background 100ms ease;
    }
    .clear:hover { background: var(--cg-gray-300, #d4d4d8); color: var(--cg-gray-700, #3f3f46); }
    .clear svg { width: 10px; height: 10px; }

    .chevron {
      flex-shrink: 0; color: var(--cg-color-input-text-placeholder, #71717a);
      transition: transform 200ms ease;
    }
    .chevron.open { transform: rotate(180deg); }
    .chevron svg { width: 16px; height: 16px; display: block; }

    .dropdown {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      margin-top: var(--cg-spacing-4, 4px);
      background: var(--cg-color-surface-container-background, #1c1c1f);
      border: 1px solid var(--cg-color-surface-container-border, #27272a);
      border-radius: var(--cg-border-radius-150, 12px);
      max-height: 240px;
      overflow-y: auto;
      z-index: 50;
      padding: var(--cg-spacing-4, 4px);
      box-shadow: var(--cg-elevation-3, 0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 10px 15px -3px rgba(0, 0, 0, 0.4));
      animation: dropIn 150ms cubic-bezier(0.2, 0, 0, 1);
    }

    @keyframes dropIn {
      from { opacity: 0; transform: scale(0.95) translateY(-4px); }
      to { opacity: 1; transform: scale(1) translateY(0); }
    }

    .option {
      display: flex;
      align-items: center;
      gap: var(--cg-spacing-8, 8px);
      padding: var(--cg-spacing-8, 8px) var(--cg-spacing-12, 12px);
      border-radius: var(--cg-border-radius-100, 8px);
      font-size: var(--cg-font-size-sm, 14px);
      color: var(--cg-color-surface-base-text, #fafafa);
      cursor: pointer;
      transition: background 100ms ease, opacity 150ms ease, transform 150ms ease;
      animation: optionIn 200ms cubic-bezier(0.2, 0, 0, 1) both;
    }
    .option:nth-child(1) { animation-delay: 0ms; }
    .option:nth-child(2) { animation-delay: 30ms; }
    .option:nth-child(3) { animation-delay: 60ms; }
    .option:nth-child(4) { animation-delay: 90ms; }
    .option:nth-child(5) { animation-delay: 120ms; }
    .option:nth-child(6) { animation-delay: 150ms; }
    .option:nth-child(7) { animation-delay: 180ms; }
    .option:nth-child(8) { animation-delay: 210ms; }

    @keyframes optionIn {
      from { opacity: 0; transform: translateY(4px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .option:hover, .option.active {
      background: var(--cg-color-action-secondary-background-hover, #3f3f46);
    }
    .option .match { color: var(--cg-brand-ai-accent, #dfff61); font-weight: var(--cg-font-weight-semibold, 600); }

    .empty {
      padding: var(--cg-spacing-16, 16px);
      text-align: center;
      font-size: var(--cg-font-size-sm, 14px);
      color: var(--cg-color-input-text-placeholder, #71717a);
    }
  

    :focus-visible {
      outline: none;
      box-shadow: 0 0 0 2px var(--cg-color-surface-base-background, #09090b), 0 0 0 4px var(--cg-brand-ai-accent, #dfff61);
    }

    /* Rounded variants */
    :host([rounded="none"]) .input-wrap { border-radius: 0; }
    :host([rounded="sm"]) .input-wrap { border-radius: var(--cg-border-radius-50, 4px); }
    :host([rounded="md"]) .input-wrap { border-radius: var(--cg-border-radius-100, 8px); }
    :host([rounded="lg"]) .input-wrap { border-radius: var(--cg-border-radius-150, 12px); }
    :host([rounded="full"]) .input-wrap { border-radius: var(--cg-border-radius-full, 99999px); }
  `];

  @property({ type: Array }) options: AutocompleteOption[] = [];
  @property({ reflect: true }) rounded: 'none' | 'sm' | 'md' | 'lg' | 'full' = 'lg';
  @property() value = '';
  @property() placeholder = '';
  @property() label = '';
  @property({ type: Boolean }) disabled = false;
  @property({ type: Boolean }) clearable = false;

  @state() private _query = '';
  @state() private _open = false;
  @state() private _focused = false;
  @state() private _activeIndex = -1;

  @query('input') private _input!: HTMLInputElement;

  private get _filtered(): AutocompleteOption[] {
    const q = this._query.toLowerCase();
    if (!q) return this.options;
    return this.options.filter(o => o.label.toLowerCase().includes(q));
  }

  private _onInput(e: Event) {
    this._query = (e.target as HTMLInputElement).value;
    this._open = true;
    this._activeIndex = -1;
    this.dispatchEvent(new CustomEvent('cg-autocomplete-input', { detail: { query: this._query }, bubbles: true, composed: true }));
  }

  private _select(opt: AutocompleteOption) {
    this.value = opt.value;
    this._query = opt.label;
    this._open = false;
    this.dispatchEvent(new CustomEvent('cg-autocomplete-select', { detail: { value: opt.value, label: opt.label }, bubbles: true, composed: true }));
  }

  private _onKeyDown(e: KeyboardEvent) {
    const list = this._filtered;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      this._open = true;
      this._activeIndex = Math.min(this._activeIndex + 1, list.length - 1);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      this._activeIndex = Math.max(this._activeIndex - 1, 0);
    } else if (e.key === 'Enter' && this._activeIndex >= 0 && list[this._activeIndex]) {
      e.preventDefault();
      this._select(list[this._activeIndex]!);
    } else if (e.key === 'Escape') {
      this._open = false;
    }
  }

  private _clear() {
    this.value = '';
    this._query = '';
    this._input.focus();
    this.dispatchEvent(new CustomEvent('cg-autocomplete-select', { detail: { value: '', label: '' }, bubbles: true, composed: true }));
  }

  private _highlightMatch(label: string): unknown {
    const q = this._query.toLowerCase();
    const idx = label.toLowerCase().indexOf(q);
    if (idx < 0 || !q) return label;
    const before = label.slice(0, idx);
    const match = label.slice(idx, idx + q.length);
    const after = label.slice(idx + q.length);
    return html`${before}<span class="match">${match}</span>${after}`;
  }

  override render() {
    const filtered = this._filtered;
    return html`
      ${this.label ? html`<span class="label">${this.label}</span>` : nothing}
      <div class="input-wrap ${this._focused ? 'focused' : ''} ${this.disabled ? 'disabled' : ''}">
        <input
          .value=${this._query}
          placeholder=${this.placeholder || nothing}
          ?disabled=${this.disabled}
          role="combobox"
          aria-expanded=${this._open}
          aria-autocomplete="list"
          aria-label=${this.label || 'Autocomplete'}
          @input=${this._onInput}
          @keydown=${this._onKeyDown}
          @focus=${() => { this._focused = true; this._open = true; }}
          @blur=${() => { this._focused = false; setTimeout(() => { this._open = false; }, 150); }}
        />
        ${this.clearable && this._query ? html`
          <button class="clear" @mousedown=${(e: Event) => e.preventDefault()} @click=${this._clear} aria-label="Clear">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
        ` : nothing}
        <span class="chevron ${this._open ? 'open' : ''}">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 9l6 6 6-6"/></svg>
        </span>
      </div>
      ${this._open ? html`
        <div class="dropdown" role="listbox">
          ${filtered.length === 0 ? html`<div class="empty">No results found</div>` :
            filtered.map((opt, i) => html`
              <div class="option ${i === this._activeIndex ? 'active' : ''}"
                role="option"
                aria-selected=${i === this._activeIndex}
                @mousedown=${(e: Event) => e.preventDefault()}
                @click=${() => this._select(opt)}>
                ${opt.icon ? html`<span>${opt.icon}</span>` : nothing}
                <span>${this._highlightMatch(opt.label)}</span>
              </div>
            `)}
        </div>
      ` : nothing}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cg-autocomplete': CgAutocomplete;
  }
}
