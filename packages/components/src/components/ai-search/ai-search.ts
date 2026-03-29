/**
 * <ai-search> — AI-Powered Search
 *
 * Search input with AI suggestions, faceted filters,
 * recent searches, result preview, keyboard navigation.
 */
import { LitElement, html, css, nothing } from 'lit';
import { property, state, customElement } from 'lit/decorators.js';

interface SearchResult {
  title: string;
  description?: string;
  icon?: string;
  url?: string;
}

@customElement('ai-search')
export class AiSearch extends LitElement {
  static override styles = css`
    :host {
      transition: color var(--cg-motion-duration-fast, 80ms) var(--cg-motion-easing-color, cubic-bezier(0, 0, 0.58, 1));
      display: block;
      font-family: var(--cg-font-family-primary, 'Inter Variable', 'Inter', -apple-system, sans-serif);
      position: relative;
    }

    .search-wrapper { position: relative; }

    .input-row {
      display: flex;
      align-items: center;
      background: var(--cg-color-surface-container-background, #18181b);
      border: 1px solid var(--cg-color-surface-container-border, #27272a);
      border-radius: 10px;
      padding: 0 12px;
      transition: border-color 200ms;
    }
    .input-row:focus-within { border-color: var(--cg-brand-ai-accent, #dfff61); }

    .search-icon {
      color: var(--cg-gray-500, #71717a);
      font-size: 14px;
      flex-shrink: 0;
      margin-right: 8px;
    }

    input {
      flex: 1;
      padding: 10px 0;
      border: none;
      background: none;
      color: var(--cg-color-surface-base-text, #fafafa);
      font: inherit;
      font-size: 14px;
      outline: none;
    }
    input::placeholder { color: var(--cg-gray-600, #52525b); }

    .shortcut {
      font-size: 10px;
      padding: 2px 6px;
      border-radius: 4px;
      background: var(--cg-gray-800, #27272a);
      color: var(--cg-gray-500, #71717a);
      font-weight: 600;
      flex-shrink: 0;
    }

    .clear-btn {
      background: none;
      border: none;
      color: var(--cg-gray-500, #71717a);
      cursor: pointer;
      padding: 4px;
      font-size: 14px;
      display: flex;
      transition: color 150ms;
    }
    .clear-btn:hover { color: var(--cg-color-surface-base-text, #fafafa); }

    /* Dropdown */
    .dropdown {
      position: absolute;
      top: calc(100% + 6px);
      left: 0;
      right: 0;
      background: var(--cg-color-surface-container-background, #18181b);
      border: 1px solid var(--cg-color-surface-container-border, #27272a);
      border-radius: 10px;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
      z-index: 100;
      max-height: 360px;
      overflow-y: auto;
      animation: fadeIn 150ms ease;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(-4px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .section-label {
      padding: 8px 14px 4px;
      font-size: 10px;
      font-weight: 700;
      color: var(--cg-gray-500, #71717a);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    /* Filters */
    .filters {
      display: flex;
      gap: 6px;
      padding: 8px 14px;
      flex-wrap: wrap;
    }
    .filter-tag {
      padding: 3px 10px;
      border-radius: 5px;
      border: 1px solid var(--cg-gray-700, #3f3f46);
      background: none;
      color: var(--cg-gray-400, #a1a1aa);
      font: inherit;
      font-size: 11px;
      font-weight: 600;
      cursor: pointer;
      transition: all 150ms;
    }
    .filter-tag:hover { border-color: var(--cg-gray-600, #52525b); }
    .filter-tag.active { border-color: var(--cg-brand-ai-accent, #dfff61); color: var(--cg-brand-ai-accent, #dfff61); background: rgba(223, 255, 97, 0.06); }

    /* Result items */
    .result-item {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 8px 14px;
      cursor: pointer;
      transition: background 100ms;
    }
    .result-item:hover, .result-item.highlighted { background: rgba(255, 255, 255, 0.04); }
    .result-icon { font-size: 16px; flex-shrink: 0; }
    .result-info { flex: 1; min-width: 0; }
    .result-title {
      font-size: 13px;
      color: var(--cg-color-surface-base-text, #fafafa);
      font-weight: 500;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .result-desc {
      font-size: 11px;
      color: var(--cg-gray-500, #71717a);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    /* Recent */
    .recent-item {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 6px 14px;
      cursor: pointer;
      transition: background 100ms;
    }
    .recent-item:hover { background: rgba(255, 255, 255, 0.04); }
    .recent-icon { color: var(--cg-gray-600, #52525b); font-size: 12px; }
    .recent-text { font-size: 12px; color: var(--cg-gray-400, #a1a1aa); flex: 1; }
    .recent-delete {
      background: none;
      border: none;
      color: var(--cg-gray-600, #52525b);
      cursor: pointer;
      font-size: 12px;
      opacity: 0;
      transition: opacity 150ms;
    }
    .recent-item:hover .recent-delete { opacity: 1; }

    .divider { height: 1px; background: var(--cg-gray-800, #27272a); margin: 4px 0; }

    @media (prefers-reduced-motion: reduce) {
      .dropdown { animation: none; }
      .filter-tag, .result-item, .recent-item { transition: none; }
    }
  

    :focus-visible {
      outline: none;
      box-shadow: 0 0 0 2px var(--cg-color-surface-base-background, #09090b), 0 0 0 4px var(--cg-brand-ai-accent, #dfff61);
    }
  `;

  @property({ type: String }) placeholder: string = 'Search...';
  @property({ type: Array }) suggestions: string[] = [];
  @property({ type: Array }) filters: string[] = [];
  @property({ type: Array }) recentSearches: string[] = [];
  @property({ type: Array }) results: SearchResult[] = [];

  @state() private _query: string = '';
  @state() private _open: boolean = false;
  @state() private _highlightIndex: number = -1;
  @state() private _activeFilters: Set<string> = new Set();

  private _handleInput(e: Event) {
    this._query = (e.target as HTMLInputElement).value;
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
    setTimeout(() => { this._open = false; }, 200);
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
      this._selectResult(this.results[this._highlightIndex]);
    } else {
      const sIdx = this._highlightIndex - this.results.length;
      if (sIdx < this.suggestions.length) {
        this._query = this.suggestions[sIdx];
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

  private _handleClear() { this._query = ''; this._open = false; }

  private _handleRecent(text: string) {
    this._query = text;
    this.dispatchEvent(new CustomEvent('ai-search-query', { bubbles: true, composed: true, detail: { query: text, filters: [...this._activeFilters] } }));
  }

  override render() {
    const showDropdown = this._open && (this.results.length > 0 || this.suggestions.length > 0 || this.recentSearches.length > 0 || this.filters.length > 0);

    return html`
      <div class="search-wrapper" role="combobox" aria-expanded="${showDropdown}" aria-haspopup="listbox">
        <div class="input-row">
          <span class="search-icon" aria-hidden="true">🔍</span>
          <input type="text"
            .value=${this._query}
            .placeholder=${this.placeholder}
            aria-label="${this.placeholder}"
            @input=${this._handleInput}
            @focus=${this._handleFocus}
            @blur=${this._handleBlur}
            @keydown=${this._handleKeyDown} />
          ${this._query ? html`
            <button class="clear-btn" @click=${this._handleClear} aria-label="Clear search">✕</button>
          ` : html`<span class="shortcut">⌘K</span>`}
        </div>

        ${showDropdown ? html`
          <div class="dropdown" role="listbox" aria-live="polite" aria-label="Search results">
            ${this.filters.length > 0 ? html`
              <div class="section-label">Filters</div>
              <div class="filters">
                ${this.filters.map(f => html`
                  <button class="filter-tag ${this._activeFilters.has(f) ? 'active' : ''}"
                    @mousedown=${(e: Event) => { e.preventDefault(); this._toggleFilter(f); }}>${f}</button>
                `)}
              </div>
              <div class="divider"></div>
            ` : nothing}

            ${this.results.length > 0 ? html`
              <div class="section-label">Results</div>
              ${this.results.map((r, i) => html`
                <div class="result-item ${i === this._highlightIndex ? 'highlighted' : ''}"
                  role="option" @mousedown=${(e: Event) => { e.preventDefault(); this._selectResult(r); }}>
                  ${r.icon ? html`<span class="result-icon">${r.icon}</span>` : nothing}
                  <div class="result-info">
                    <div class="result-title">${r.title}</div>
                    ${r.description ? html`<div class="result-desc">${r.description}</div>` : nothing}
                  </div>
                </div>
              `)}
            ` : nothing}

            ${this.suggestions.length > 0 ? html`
              ${this.results.length > 0 ? html`<div class="divider"></div>` : nothing}
              <div class="section-label">Suggestions</div>
              ${this.suggestions.map((s, i) => html`
                <div class="result-item ${(i + this.results.length) === this._highlightIndex ? 'highlighted' : ''}"
                  role="option" @mousedown=${(e: Event) => { e.preventDefault(); this._query = s; }}>
                  <span class="result-icon" style="color: var(--cg-brand-ai-accent, #dfff61);">✦</span>
                  <div class="result-info"><div class="result-title">${s}</div></div>
                </div>
              `)}
            ` : nothing}

            ${this.recentSearches.length > 0 && !this._query ? html`
              <div class="divider"></div>
              <div class="section-label">Recent</div>
              ${this.recentSearches.slice(0, 10).map(r => html`
                <div class="recent-item" @mousedown=${(e: Event) => { e.preventDefault(); this._handleRecent(r); }}>
                  <span class="recent-icon">↺</span>
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
