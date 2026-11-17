import { LitElement, html, css, nothing } from 'lit';
import { property, state, query } from 'lit/decorators.js';
import { customElement } from '../../utils/define.js';
import { hostBlock, reducedMotion } from '../../styles/index.js';
import { defineMessages, Messages } from '../../utils/messages.js';

const MESSAGES = defineMessages('cg-autocomplete', {
  label: 'Autocomplete',
  clear: 'Clear',
  noResults: 'No results found',
});

export interface AutocompleteOption {
  value: string;
  label: string;
  icon?: string;
}

/**
 * <cg-autocomplete> — Combobox input with filtered dropdown suggestions.
 *
 * @example
 * ```html
 * <cg-autocomplete label="Country" placeholder="Search..." .options=${countries}></cg-autocomplete>
 * ```
 *
 * @fires {CustomEvent<{query: string}>} cg-autocomplete-input - On input change
 * @fires {CustomEvent<{value: string, label: string}>} cg-autocomplete-select - On option select
 *
 * @cssprop --cg-component-input-radius - Input border radius
 * @cssprop --cg-component-input-height-md - Input height
 * @cssprop --cg-color-input-border-default - Default border color
 */
@customElement('cg-autocomplete')
export class CgAutocomplete extends LitElement {
  static override styles = [hostBlock, reducedMotion, css`
    :host {
      position: relative;
    }

    .label {
      display: block;
      font-size: var(--cg-font-size-sm);
      font-weight: var(--cg-font-weight-medium);
      color: var(--cg-color-surface-container-text);
      margin-bottom: var(--cg-spacing-6);
    }

    .input-wrap {
      display: flex;
      align-items: center;
      gap: var(--cg-spacing-8);
      padding: 0 var(--cg-spacing-12);
      border: var(--cg-border-width-50) solid var(--cg-color-input-border-default);
      border-radius: var(--cg-component-input-radius);
      background: var(--cg-color-input-background-default);
      box-sizing: border-box;
      min-height: var(--cg-component-input-height-md);
      transition:
        border-color var(--cg-transition-duration-fast) var(--cg-transition-easing-default),
        box-shadow var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
    }
    .input-wrap:hover:not(.disabled) {
      border-color: var(--cg-color-input-border-hover);
    }
    .input-wrap.focused {
      border-color: var(--cg-color-input-border-focus);
      box-shadow: 0 0 0 var(--cg-border-width-300) var(--cg-color-state-focus-halo);
    }
    .input-wrap.disabled {
      opacity: var(--cg-opacity-40);
      cursor: not-allowed;
      background: var(--cg-color-input-background-disabled);
      border-color: var(--cg-color-input-border-disabled);
    }

    /* ── Error state ── */
    :host([error]) .input-wrap {
      border-color: var(--cg-color-input-border-error);
    }
    :host([error]) .input-wrap.focused {
      border-color: var(--cg-color-status-error-text-default);
      box-shadow: 0 0 0 3px var(--cg-shadow-focus-error);
    }

    input {
      flex: 1;
      border: none;
      outline: none;
      background: transparent;
      font: inherit;
      font-size: var(--cg-font-size-sm);
      color: var(--cg-color-input-text-default);
      min-width: 0;
      padding: var(--cg-spacing-8) 0;
    }
    input::placeholder { color: var(--cg-color-input-text-placeholder); }
    input:disabled { cursor: not-allowed; }

    .clear {
      display: flex;
      align-items: center;
      justify-content: center;
      width: var(--cg-spacing-20);
      height: var(--cg-spacing-20);
      border: none;
      padding: 0;
      background: var(--cg-color-action-tertiary-background-hover);
      color: var(--cg-color-surface-container-outlined);
      border-radius: var(--cg-border-radius-full);
      cursor: pointer;
      flex-shrink: 0;
      transition: background-color var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
    }
    .clear:hover {
      background: var(--cg-color-action-secondary-background-hover);
      color: var(--cg-color-surface-container-text);
    }

    .chevron {
      flex-shrink: 0;
      color: var(--cg-color-input-icon-default);
      transition: transform var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
    }
    .chevron.open { transform: rotate(180deg); }

    .dropdown {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      margin-top: var(--cg-spacing-4);
      background: var(--cg-color-modal-container-background);
      border: var(--cg-border-width-50) solid var(--cg-color-modal-container-border);
      border-radius: var(--cg-border-radius-100);
      box-shadow: var(--cg-elevation-3);
      max-height: 280px;
      overflow-y: auto;
      z-index: var(--cg-z-index-400);
      padding: var(--cg-spacing-6);
      animation: dropIn var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
    }

    @keyframes dropIn {
      from { opacity: 0; transform: scale(0.96) translateY(calc(var(--cg-spacing-4) * -1)); }
      to { opacity: 1; transform: scale(1) translateY(0); }
    }

    .option {
      display: flex;
      align-items: center;
      gap: var(--cg-spacing-8);
      padding: var(--cg-spacing-8) var(--cg-spacing-12);
      border-radius: var(--cg-border-radius-50);
      font-size: var(--cg-font-size-sm);
      color: var(--cg-color-surface-container-text);
      cursor: pointer;
      transition: background-color var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
    }
    .option:hover, .option.active {
      background: var(--cg-color-action-tertiary-background-hover);
    }
    .option .match {
      color: var(--cg-color-accent-text);
      font-weight: var(--cg-font-weight-semibold);
    }

    .empty {
      padding: var(--cg-spacing-16);
      text-align: center;
      font-size: var(--cg-font-size-sm);
      color: var(--cg-color-surface-container-outlined);
    }

    /* Rounded variants */
    :host([rounded="none"]) .input-wrap { border-radius: 0; }
    :host([rounded="sm"]) .input-wrap { border-radius: var(--cg-border-radius-50); }
    :host([rounded="md"]) .input-wrap { border-radius: var(--cg-border-radius-100); }
    :host([rounded="lg"]) .input-wrap { border-radius: var(--cg-component-input-radius); }
    :host([rounded="full"]) .input-wrap { border-radius: var(--cg-border-radius-full); }

    /* Reduced motion */
    @media (prefers-reduced-motion: reduce) {
      .dropdown { animation: none; }
    }
  `];

  /** Per-element text overrides (JSON attribute); see `setMessages()`. */
  @property({ type: Object }) messages: Partial<typeof MESSAGES> | null = null;
  private i18n = new Messages(this, MESSAGES);

  @property({ type: Array }) options: AutocompleteOption[] = [];
  @property({ reflect: true }) rounded: 'none' | 'sm' | 'md' | 'lg' | 'full' = 'lg';
  @property() value = '';
  @property() placeholder = '';
  @property() label = '';
  @property({ type: Boolean }) disabled = false;
  @property({ type: Boolean, reflect: true }) error = false;
  @property({ type: Boolean }) clearable = false;

  @state() private _query = '';
  @state() private _open = false;
  @state() private _focused = false;
  @state() private _activeIndex = -1;

  @query('input') private _input!: HTMLInputElement;

  // Per-instance id prefix so aria-controls / aria-activedescendant references
  // never collide across multiple autocompletes on the same page.
  private _uid = `cg-ac-${Math.random().toString(36).slice(2, 9)}`;

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

  private async _onKeyDown(e: KeyboardEvent) {
    const list = this._filtered;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      this._open = true;
      this._activeIndex = Math.min(this._activeIndex + 1, list.length - 1);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      this._open = true;
      this._activeIndex = Math.max(this._activeIndex - 1, 0);
    } else if (e.key === 'Enter' && this._activeIndex >= 0 && list[this._activeIndex]) {
      e.preventDefault();
      this._select(list[this._activeIndex]!);
      return;
    } else if (e.key === 'Escape') {
      // An open popup consumes its Escape, so an enclosing drawer or dialog stays open.
      if (this._open) { e.preventDefault(); e.stopPropagation(); this._open = false; }
      return;
    } else {
      return;
    }
    // Keep the active option visible when navigating past the scroll window.
    await this.updateComplete;
    this.renderRoot.querySelector('.option.active')?.scrollIntoView({ block: 'nearest' });
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
          aria-controls=${`${this._uid}-listbox`}
          aria-activedescendant=${this._open && this._activeIndex >= 0 ? `${this._uid}-opt-${this._activeIndex}` : nothing}
          aria-invalid=${this.error ? 'true' : nothing}
          aria-label=${this.label || this.i18n.t('label')}
          @input=${this._onInput}
          @keydown=${this._onKeyDown}
          @focus=${() => { this._focused = true; this._open = true; }}
          @blur=${() => { this._focused = false; this._open = false; }}
        />
        ${this.clearable && this._query ? html`
          <button class="clear" @mousedown=${(e: Event) => e.preventDefault()} @click=${this._clear} aria-label=${this.i18n.t('clear')}>
            <cg-icon name="x" size="xs"></cg-icon>
          </button>
        ` : nothing}
        <span class="chevron ${this._open ? 'open' : ''}">
          <cg-icon name="chevron-down" size="sm"></cg-icon>
        </span>
      </div>
      ${this._open ? html`
        <div class="dropdown" role="listbox" id=${`${this._uid}-listbox`}>
          ${filtered.length === 0 ? html`<div class="empty">${this.i18n.t('noResults')}</div>` :
            filtered.map((opt, i) => html`
              <div class="option ${i === this._activeIndex ? 'active' : ''}"
                role="option"
                id=${`${this._uid}-opt-${i}`}
                aria-selected=${i === this._activeIndex}
                @mousedown=${(e: Event) => e.preventDefault()}
                @click=${() => this._select(opt)}>
                ${opt.icon ? html`<cg-icon name="${opt.icon}" size="sm"></cg-icon>` : nothing}
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
