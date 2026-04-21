/**
 * @element ai-search
 * AI-powered search input with dropdown results, faceted filter chips,
 * AI-generated suggestions, recent search history, and full keyboard
 * navigation (arrow keys, Enter, Escape).
 *
 * @example
 * ```html
 * <ai-search
 *   placeholder="Search docs..."
 *   .results=${[{ title: 'Getting Started', description: 'Quick start guide', icon: '[doc icon]' }]}
 *   .suggestions=${['How to deploy', 'API authentication']}
 *   .filters=${['Docs', 'API', 'Blog']}
 *   .recentSearches=${['setup guide', 'rate limits']}
 * ></ai-search>
 * ```
 *
 * @prop {string} placeholder - Input placeholder text
 * @prop {SearchResult[]} results - Search result items
 * @prop {string[]} suggestions - AI-generated query suggestions
 * @prop {string[]} filters - Available filter categories
 * @prop {string[]} recentSearches - Recently searched terms
 *
 * @fires {CustomEvent<{query: string, filters: string[]}>} ai-search-query - When query changes
 * @fires {CustomEvent<{result: SearchResult}>} ai-search-select - When a result is selected
 * @fires {CustomEvent<{filters: string[]}>} ai-search-filter - When filters change
 */
import { LitElement, html, css, nothing } from 'lit';
import { property, state, customElement } from 'lit/decorators.js';
import { hostBlock, reducedMotion } from '../../styles/index.js';

interface SearchResult {
  title: string;
  description?: string;
  icon?: string;
  url?: string;
}

@customElement('ai-search')
export class AiSearch extends LitElement {
  static override styles = [hostBlock, reducedMotion, css`
    :host {
      position: relative;
    }

    .search-wrapper { position: relative; }

    .input-row {
      display: flex;
      align-items: center;
      background: var(--cg-color-input-background-default);
      border: var(--cg-border-width-50) solid var(--cg-color-input-border-default);
      border-radius: var(--cg-component-input-radius);
      padding: 0 var(--cg-spacing-12);
      height: var(--cg-component-input-height-md);
      transition:
        border-color var(--cg-transition-duration-fast) var(--cg-transition-easing-default),
        box-shadow var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
    }
    .input-row:hover { border-color: var(--cg-color-input-border-hover); }
    .input-row:focus-within { border-color: var(--cg-color-input-border-focus); box-shadow: 0 0 0 var(--cg-border-width-300) var(--cg-overlay-accent-strong); }

    /* Rounded */
    :host([rounded="full"]) .input-row { border-radius: var(--cg-border-radius-full); }

    /* Size */
    :host([size="lg"]) .input-row { height: var(--cg-component-input-height-lg); padding: 0 var(--cg-spacing-16); }
    :host([size="lg"]) input { font-size: var(--cg-font-size-base); }

    .search-icon {
      color: var(--cg-color-input-icon-default);
      flex-shrink: 0;
      margin-right: var(--cg-spacing-8);
      display: flex;
    }
    .search-icon svg { width: var(--cg-icon-size-100); height: var(--cg-icon-size-100); }

    input {
      flex: 1;
      padding: var(--cg-spacing-8) 0;
      border: none;
      background: none;
      color: var(--cg-color-input-text-default);
      font: inherit;
      font-size: var(--cg-font-size-sm);
      outline: none;
    }
    input::placeholder { color: var(--cg-color-input-text-placeholder); }

    .shortcut {
      font-size: var(--cg-font-size-xs);
      padding: var(--cg-spacing-2) var(--cg-spacing-6);
      border-radius: var(--cg-border-radius-50);
      background: var(--cg-color-surface-cards-background);
      color: var(--cg-color-input-text-placeholder);
      font-weight: var(--cg-font-weight-semibold);
      flex-shrink: 0;
    }

    .clear-btn {
      background: none;
      border: none;
      color: var(--cg-color-input-text-placeholder);
      cursor: pointer;
      padding: var(--cg-spacing-4);
      font-size: var(--cg-font-size-sm);
      font-family: inherit;
      display: flex;
      transition: color var(--cg-transition-duration-default) var(--cg-transition-easing-default);
    }
    .clear-btn:focus-visible {
      outline: none;
      box-shadow: 0 0 0 var(--cg-border-width-300) var(--cg-overlay-accent-strong);
    }
    .clear-btn:hover { color: var(--cg-color-surface-base-text); }

    /* Dropdown */
    .dropdown {
      position: absolute;
      top: calc(100% + var(--cg-spacing-6));
      left: 0;
      right: 0;
      background: var(--cg-color-modal-container-background);
      border: var(--cg-border-width-50) solid var(--cg-color-modal-container-border);
      border-radius: var(--cg-border-radius-100);
      z-index: var(--cg-z-index-200);
      max-height: var(--cg-spacing-256);
      overflow-y: auto;
    }

    .section-label {
      padding: var(--cg-spacing-8) var(--cg-spacing-12) var(--cg-spacing-4);
      font-size: var(--cg-font-size-xs);
      font-weight: var(--cg-font-weight-bold);
      color: var(--cg-color-input-text-placeholder);
      text-transform: uppercase;
      letter-spacing: var(--cg-letter-spacing-wide);
    }

    /* Filters */
    .filters {
      display: flex;
      gap: var(--cg-spacing-6);
      padding: var(--cg-spacing-8) var(--cg-spacing-12);
      flex-wrap: wrap;
    }
    .filter-tag {
      padding: var(--cg-spacing-4) var(--cg-spacing-8);
      border-radius: var(--cg-border-radius-50);
      border: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
      background: none;
      color: var(--cg-color-input-text-placeholder);
      font: inherit;
      font-size: var(--cg-font-size-xs);
      font-weight: var(--cg-font-weight-semibold);
      cursor: pointer;
      transition:
        border-color var(--cg-transition-duration-default) var(--cg-transition-easing-default),
        color var(--cg-transition-duration-default) var(--cg-transition-easing-default),
        background-color var(--cg-transition-duration-default) var(--cg-transition-easing-default);
    }
    .filter-tag:hover { border-color: var(--cg-color-input-border-hover); color: var(--cg-color-surface-base-text); }
    .filter-tag:focus-visible { outline: none; box-shadow: 0 0 0 var(--cg-border-width-300) var(--cg-overlay-accent-strong); }
    .filter-tag.active { border-color: var(--cg-color-surface-base-text); color: var(--cg-color-surface-base-text); background: var(--cg-overlay-accent-subtle); }

    /* Result items */
    .result-item {
      display: flex;
      align-items: center;
      gap: var(--cg-spacing-8);
      padding: var(--cg-spacing-8) var(--cg-spacing-12);
      cursor: pointer;
      transition: background-color var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
    }
    .result-item:hover, .result-item.highlighted { background: var(--cg-overlay-dark-subtle); }
    .result-item:active { transform: scale(var(--cg-interaction-press-scale)); }
    .result-icon { font-size: var(--cg-font-size-base); flex-shrink: 0; }
    .result-info { flex: 1; min-width: 0; }
    .result-title {
      font-size: var(--cg-font-size-sm);
      color: var(--cg-color-surface-base-text);
      font-weight: var(--cg-font-weight-medium);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .result-desc {
      font-size: var(--cg-font-size-xs);
      color: var(--cg-color-input-text-placeholder);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    /* Recent */
    .recent-item {
      display: flex;
      align-items: center;
      gap: var(--cg-spacing-8);
      padding: var(--cg-spacing-6) var(--cg-spacing-12);
      cursor: pointer;
      transition: background-color var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
    }
    .recent-item:hover { background: var(--cg-overlay-dark-subtle); }
    .recent-icon { color: var(--cg-color-input-border-hover); font-size: var(--cg-font-size-xs); }
    .recent-text { font-size: var(--cg-font-size-xs); color: var(--cg-color-input-text-placeholder); flex: 1; }
    .recent-delete {
      background: none;
      border: none;
      color: var(--cg-color-input-border-hover);
      cursor: pointer;
      font-size: var(--cg-font-size-xs);
      opacity: 0;
      transition: opacity var(--cg-transition-duration-default) var(--cg-transition-easing-default);
    }
    .recent-item:hover .recent-delete { opacity: 1; }
    .recent-delete:focus-visible {
      opacity: 1;
      outline: none;
      box-shadow: 0 0 0 var(--cg-border-width-300) var(--cg-overlay-accent-strong);
    }

    .divider { height: var(--cg-border-width-50); background: var(--cg-color-surface-cards-border); margin: var(--cg-spacing-4) 0; }

  `];
  @property({ reflect: true }) size: 'md' | 'lg' = 'md';
  @property({ reflect: true }) rounded: 'default' | 'full' = 'default';
  @property({ type: String }) placeholder: string = 'Search...';
  @property({ type: String }) value: string = '';
  @property({ type: Array }) suggestions: string[] = [];
  @property({ type: Array }) filters: string[] = [];
  @property({ type: Array }) recentSearches: string[] = [];
  @property({ type: Array }) results: SearchResult[] = [];

  @state() private _query: string = '';
  @state() private _open: boolean = false;
  @state() private _highlightIndex: number = -1;
  @state() private _activeFilters: Set<string> = new Set();

  private _blurTimer: number | undefined;

  override disconnectedCallback() {
    super.disconnectedCallback();
    if (this._blurTimer !== undefined) {
      clearTimeout(this._blurTimer);
      this._blurTimer = undefined;
    }
  }

  override willUpdate(changed: Map<string, unknown>): void {
    // Propagate external `value` prop writes into internal query state.
    // Guarded by inequality to prevent infinite loop with write-back below.
    if (changed.has('value') && this.value !== this._query) {
      this._query = this.value ?? '';
    }
  }

  private _setQuery(next: string) {
    this._query = next;
    // Write back to public `value` so external consumers stay in sync.
    // Guarded by inequality — `willUpdate` also short-circuits on equality.
    if (this.value !== next) {
      this.value = next;
    }
  }

  private _handleInput(e: Event) {
    const next = (e.target as HTMLInputElement).value;
    this._setQuery(next);
    this._open = true;
    this._highlightIndex = -1;
    this.dispatchEvent(new CustomEvent('ai-search-query', {
      bubbles: true, composed: true,
      detail: { query: this._query, filters: [...this._activeFilters] },
    }));
  }

  private _handleFocus() { this._open = true; }

  private _handleBlur() {
    // Delay to allow click events on dropdown
    if (this._blurTimer !== undefined) clearTimeout(this._blurTimer);
    this._blurTimer = window.setTimeout(() => { this._open = false; this._blurTimer = undefined; }, 200);
  }

  private _handleKeyDown(e: KeyboardEvent) {
    const totalItems = this.results.length + this.suggestions.length;
    if (e.key === 'ArrowDown') { e.preventDefault(); this._highlightIndex = Math.min(this._highlightIndex + 1, totalItems - 1); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); this._highlightIndex = Math.max(this._highlightIndex - 1, -1); }
    else if (e.key === 'Enter' && this._highlightIndex >= 0) { e.preventDefault(); this._selectHighlighted(); }
    else if (e.key === 'Escape') { this._open = false; }
  }

  private _selectHighlighted() {
    if (this._highlightIndex < this.results.length) {
      this._selectResult(this.results[this._highlightIndex]!);
    } else {
      const sIdx = this._highlightIndex - this.results.length;
      if (sIdx < this.suggestions.length) {
        this._setQuery(this.suggestions[sIdx]!);
        this.dispatchEvent(new CustomEvent('ai-search-query', { bubbles: true, composed: true, detail: { query: this._query, filters: [...this._activeFilters] } }));
      }
    }
  }

  private _selectResult(result: SearchResult) {
    this._open = false;
    this.dispatchEvent(new CustomEvent('ai-search-select', {
      bubbles: true, composed: true,
      detail: { result },
    }));
  }

  private _toggleFilter(filter: string) {
    if (this._activeFilters.has(filter)) this._activeFilters.delete(filter);
    else this._activeFilters.add(filter);
    this._activeFilters = new Set(this._activeFilters);
    this.dispatchEvent(new CustomEvent('ai-search-filter', {
      bubbles: true, composed: true,
      detail: { filters: [...this._activeFilters] },
    }));
  }

  private _handleClear() { this._setQuery(''); this._open = false; }

  private _handleRecent(text: string) {
    this._setQuery(text);
    this.dispatchEvent(new CustomEvent('ai-search-query', { bubbles: true, composed: true, detail: { query: text, filters: [...this._activeFilters] } }));
  }

  override render() {
    const showDropdown = this._open && (this.results.length > 0 || this.suggestions.length > 0 || this.recentSearches.length > 0 || this.filters.length > 0);
    const activeId = this._highlightIndex >= 0 ? `ai-search-opt-${this._highlightIndex}` : '';

    return html`
      <div class="search-wrapper">
        <div class="input-row">
          <span class="search-icon" aria-hidden="true"><cg-icon name="search" size="sm"></cg-icon></span>
          <input type="text"
            role="combobox"
            aria-expanded="${showDropdown}"
            aria-haspopup="listbox"
            aria-controls="ai-search-listbox"
            aria-autocomplete="list"
            aria-activedescendant=${activeId || nothing}
            .value=${this._query}
            .placeholder=${this.placeholder}
            aria-label="${this.placeholder}"
            @input=${this._handleInput}
            @focus=${this._handleFocus}
            @blur=${this._handleBlur}
            @keydown=${this._handleKeyDown} />
          ${this._query ? html`
            <button class="clear-btn" @click=${this._handleClear} aria-label="Clear search"><cg-icon name="x" size="xs"></cg-icon></button>
          ` : html`<span class="shortcut" aria-hidden="true"><kbd>Cmd</kbd>+<kbd>K</kbd></span>`}
        </div>

        ${showDropdown ? html`
          <div id="ai-search-listbox" class="dropdown" role="listbox" aria-label="Search results">
            ${this.filters.length > 0 ? html`
              <div class="section-label" id="ai-search-filters-label">Filters</div>
              <div class="filters" role="group" aria-labelledby="ai-search-filters-label">
                ${this.filters.map(f => {
                  const isActive = this._activeFilters.has(f);
                  return html`
                    <button class="filter-tag ${isActive ? 'active' : ''}"
                      role="switch"
                      aria-checked=${isActive ? 'true' : 'false'}
                      @mousedown=${(e: Event) => { e.preventDefault(); this._toggleFilter(f); }}>${f}</button>
                  `;
                })}
              </div>
              <div class="divider" role="separator"></div>
            ` : nothing}

            ${this.results.length > 0 ? html`
              <div class="section-label">Results</div>
              ${this.results.map((r, i) => html`
                <div id="ai-search-opt-${i}" class="result-item ${i === this._highlightIndex ? 'highlighted' : ''}"
                  role="option"
                  aria-selected=${i === this._highlightIndex ? 'true' : 'false'}
                  @mousedown=${(e: Event) => { e.preventDefault(); this._selectResult(r); }}>
                  ${r.icon ? html`<span class="result-icon" aria-hidden="true">${r.icon}</span>` : nothing}
                  <div class="result-info">
                    <div class="result-title">${r.title}</div>
                    ${r.description ? html`<div class="result-desc">${r.description}</div>` : nothing}
                  </div>
                </div>
              `)}
            ` : nothing}

            ${this.suggestions.length > 0 ? html`
              ${this.results.length > 0 ? html`<div class="divider" role="separator"></div>` : nothing}
              <div class="section-label">Suggestions</div>
              ${this.suggestions.map((s, i) => {
                const idx = i + this.results.length;
                return html`
                  <div id="ai-search-opt-${idx}" class="result-item ${idx === this._highlightIndex ? 'highlighted' : ''}"
                    role="option"
                    aria-selected=${idx === this._highlightIndex ? 'true' : 'false'}
                    @mousedown=${(e: Event) => { e.preventDefault(); this._setQuery(s); }}>
                    <span class="result-icon" aria-hidden="true"><cg-icon name="sparkle" size="xs"></cg-icon></span>
                    <div class="result-info"><div class="result-title">${s}</div></div>
                  </div>
                `;
              })}
            ` : nothing}

            ${this.recentSearches.length > 0 && !this._query ? html`
              <div class="divider" role="separator"></div>
              <div class="section-label">Recent</div>
              ${this.recentSearches.slice(0, 10).map(r => html`
                <div class="recent-item" role="option" aria-selected="false" @mousedown=${(e: Event) => { e.preventDefault(); this._handleRecent(r); }}>
                  <span class="recent-icon" aria-hidden="true">↺</span>
                  <span class="recent-text">${r}</span>
                </div>
              `)}
            ` : nothing}
          </div>
        ` : nothing}
      </div>
    `;
  }
}
