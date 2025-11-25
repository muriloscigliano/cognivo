import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

export interface AiSearchSuggestion {
  text: string;
  type: 'query' | 'result' | 'action';
  icon?: string;
  description?: string;
  confidence?: number;
}

export interface AiSearchResult {
  id: string;
  title: string;
  description?: string;
  type?: string;
  score?: number;
}

/**
 * AI Smart Search
 *
 * Semantic search input with AI-powered suggestions and results.
 * Features typeahead, intent detection, and smart filtering.
 *
 * @element ai-smart-search
 *
 * @fires ai:search - Fired when search is submitted
 * @fires ai:suggestion-select - Fired when a suggestion is selected
 * @fires ai:input-change - Fired on input change (debounced)
 */
@customElement('ai-smart-search')
export class AiSmartSearch extends LitElement {
  static override styles = [
    baseStyles,
    css`
      :host {
        display: block;
        position: relative;
        width: 100%;
        font-family: ${tokens.fontFamily.primary};
      }

      .search-container {
        position: relative;
      }

      .search-input-wrapper {
        display: flex;
        align-items: center;
        gap: ${tokens.spacing.sm};
        padding: ${tokens.spacing.sm} ${tokens.spacing.md};
        background: ${tokens.color.grayWhite};
        border: 2px solid ${tokens.color.gray100};
        border-radius: ${tokens.radius.lg};
        transition: all ${tokens.transition.default};
      }

      .search-input-wrapper:focus-within {
        border-color: ${tokens.color.aiAccent};
        box-shadow: 0 0 0 3px ${tokens.color.aiBackground};
      }

      .search-icon {
        color: ${tokens.color.gray500};
        flex-shrink: 0;
      }

      .ai-badge {
        display: inline-flex;
        align-items: center;
        gap: 4px;
        padding: 2px 8px;
        background: ${tokens.color.aiBackground};
        border: 1px solid ${tokens.color.aiBorder};
        border-radius: ${tokens.radius.full};
        font-size: 10px;
        font-weight: ${tokens.fontWeight.semibold};
        color: ${tokens.color.aiAccent};
        flex-shrink: 0;
      }

      input {
        flex: 1;
        border: none;
        outline: none;
        font-size: ${tokens.fontSize.md};
        color: ${tokens.color.gray900};
        background: transparent;
        font-family: inherit;
      }

      input::placeholder {
        color: ${tokens.color.gray500};
      }

      .clear-button {
        background: none;
        border: none;
        padding: ${tokens.spacing.xs};
        cursor: pointer;
        color: ${tokens.color.gray500};
        border-radius: ${tokens.radius.sm};
        transition: all ${tokens.transition.fast};
        flex-shrink: 0;
      }

      .clear-button:hover {
        background: ${tokens.color.gray100};
        color: ${tokens.color.gray900};
      }

      /* Dropdown */
      .dropdown {
        position: absolute;
        top: calc(100% + 8px);
        left: 0;
        right: 0;
        background: ${tokens.color.grayWhite};
        border: 1px solid ${tokens.color.gray100};
        border-radius: ${tokens.radius.lg};
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
        max-height: 400px;
        overflow-y: auto;
        z-index: 100;
        opacity: 0;
        transform: translateY(-8px);
        pointer-events: none;
        transition: all ${tokens.transition.default};
      }

      .dropdown.open {
        opacity: 1;
        transform: translateY(0);
        pointer-events: auto;
      }

      .dropdown-section {
        padding: ${tokens.spacing.sm};
      }

      .dropdown-section + .dropdown-section {
        border-top: 1px solid ${tokens.color.gray100};
      }

      .section-label {
        padding: ${tokens.spacing.xs} ${tokens.spacing.sm};
        font-size: ${tokens.fontSize.xs};
        font-weight: ${tokens.fontWeight.semibold};
        color: ${tokens.color.gray500};
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }

      .suggestion-item {
        display: flex;
        align-items: center;
        gap: ${tokens.spacing.sm};
        padding: ${tokens.spacing.sm} ${tokens.spacing.md};
        border-radius: ${tokens.radius.md};
        cursor: pointer;
        transition: all ${tokens.transition.fast};
      }

      .suggestion-item:hover,
      .suggestion-item.highlighted {
        background: ${tokens.color.aiBackground};
      }

      .suggestion-icon {
        width: 32px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: ${tokens.color.gray100};
        border-radius: ${tokens.radius.md};
        font-size: 14px;
        flex-shrink: 0;
      }

      .suggestion-icon.query { background: ${tokens.color.aiBackground}; }
      .suggestion-icon.result { background: ${tokens.color.gray100}; }
      .suggestion-icon.action { background: ${tokens.color.success}; color: white; }

      .suggestion-content {
        flex: 1;
        min-width: 0;
      }

      .suggestion-text {
        font-size: ${tokens.fontSize.sm};
        font-weight: ${tokens.fontWeight.medium};
        color: ${tokens.color.gray900};
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .suggestion-description {
        font-size: ${tokens.fontSize.xs};
        color: ${tokens.color.gray500};
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .suggestion-confidence {
        font-size: ${tokens.fontSize.xs};
        color: ${tokens.color.gray500};
        flex-shrink: 0;
      }

      /* Loading state */
      .loading-state {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: ${tokens.spacing.sm};
        padding: ${tokens.spacing.lg};
        color: ${tokens.color.gray500};
        font-size: ${tokens.fontSize.sm};
      }

      /* Empty state */
      .empty-state {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: ${tokens.spacing.xl};
        color: ${tokens.color.gray500};
        text-align: center;
      }

      .empty-icon {
        font-size: 32px;
        margin-bottom: ${tokens.spacing.sm};
        opacity: 0.5;
      }

      /* Keyboard hints */
      .keyboard-hints {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: ${tokens.spacing.md};
        padding: ${tokens.spacing.sm};
        background: ${tokens.color.gray50};
        border-top: 1px solid ${tokens.color.gray100};
        font-size: ${tokens.fontSize.xs};
        color: ${tokens.color.gray500};
      }

      .kbd {
        display: inline-flex;
        align-items: center;
        padding: 2px 6px;
        background: ${tokens.color.grayWhite};
        border: 1px solid ${tokens.color.gray200};
        border-radius: 4px;
        font-size: 10px;
        font-family: monospace;
        box-shadow: 0 1px 0 ${tokens.color.gray200};
      }

      /* Size variants */
      :host([size="sm"]) .search-input-wrapper {
        padding: ${tokens.spacing.xs} ${tokens.spacing.sm};
      }

      :host([size="sm"]) input {
        font-size: ${tokens.fontSize.sm};
      }

      :host([size="lg"]) .search-input-wrapper {
        padding: ${tokens.spacing.md} ${tokens.spacing.lg};
      }

      :host([size="lg"]) input {
        font-size: ${tokens.fontSize.lg};
      }
    `
  ];

  @property({ type: String }) placeholder = 'Search with AI...';
  @property({ type: String }) value = '';
  @property({ type: Array }) suggestions: AiSearchSuggestion[] = [];
  @property({ type: Boolean }) loading = false;
  @property({ type: Boolean, attribute: 'show-ai-badge' }) showAiBadge = true;
  @property({ type: Boolean, attribute: 'show-hints' }) showHints = true;
  @property({ type: String, reflect: true }) size: 'sm' | 'md' | 'lg' = 'md';
  @property({ type: Number }) debounceMs = 300;

  @state() private isOpen = false;
  @state() private highlightedIndex = -1;
  @state() private debounceTimer: number | null = null;

  private handleInput(e: InputEvent) {
    const target = e.target as HTMLInputElement;
    this.value = target.value;
    this.isOpen = this.value.length > 0;
    this.highlightedIndex = -1;

    // Debounced input event
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
    }

    this.debounceTimer = window.setTimeout(() => {
      this.dispatchEvent(new CustomEvent('ai:input-change', {
        detail: { value: this.value },
        bubbles: true,
        composed: true
      }));
    }, this.debounceMs);
  }

  private handleKeyDown(e: KeyboardEvent) {
    if (!this.isOpen) {
      if (e.key === 'ArrowDown') {
        this.isOpen = true;
      }
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        this.highlightedIndex = Math.min(
          this.highlightedIndex + 1,
          this.suggestions.length - 1
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        this.highlightedIndex = Math.max(this.highlightedIndex - 1, -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (this.highlightedIndex >= 0) {
          this.selectSuggestion(this.suggestions[this.highlightedIndex]);
        } else {
          this.submitSearch();
        }
        break;
      case 'Escape':
        this.isOpen = false;
        this.highlightedIndex = -1;
        break;
    }
  }

  private selectSuggestion(suggestion: AiSearchSuggestion) {
    this.value = suggestion.text;
    this.isOpen = false;
    this.highlightedIndex = -1;

    this.dispatchEvent(new CustomEvent('ai:suggestion-select', {
      detail: { suggestion },
      bubbles: true,
      composed: true
    }));
  }

  private submitSearch() {
    this.isOpen = false;
    this.dispatchEvent(new CustomEvent('ai:search', {
      detail: { query: this.value },
      bubbles: true,
      composed: true
    }));
  }

  private clearInput() {
    this.value = '';
    this.isOpen = false;
    this.highlightedIndex = -1;
    this.shadowRoot?.querySelector('input')?.focus();
  }

  private getSuggestionIcon(type: string): string {
    switch (type) {
      case 'query': return '🔍';
      case 'result': return '📄';
      case 'action': return '⚡';
      default: return '💡';
    }
  }

  override render() {
    return html`
      <div class="search-container">
        <div class="search-input-wrapper">
          <svg class="search-icon" width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>

          <input
            type="text"
            .value=${this.value}
            placeholder=${this.placeholder}
            @input=${this.handleInput}
            @keydown=${this.handleKeyDown}
            @focus=${() => this.value && (this.isOpen = true)}
            @blur=${() => setTimeout(() => this.isOpen = false, 150)}
          />

          ${this.value ? html`
            <button class="clear-button" @click=${this.clearInput} type="button">
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          ` : null}

          ${this.showAiBadge ? html`
            <span class="ai-badge">
              <span>✨</span>
              <span>AI</span>
            </span>
          ` : null}
        </div>

        <div class="dropdown ${this.isOpen ? 'open' : ''}">
          ${this.loading ? html`
            <div class="loading-state">
              <ai-thinking-indicator size="sm"></ai-thinking-indicator>
              <span>Finding suggestions...</span>
            </div>
          ` : this.suggestions.length > 0 ? html`
            <div class="dropdown-section">
              <div class="section-label">Suggestions</div>
              ${this.suggestions.map((suggestion, index) => html`
                <div
                  class="suggestion-item ${index === this.highlightedIndex ? 'highlighted' : ''}"
                  @click=${() => this.selectSuggestion(suggestion)}
                  @mouseenter=${() => this.highlightedIndex = index}
                >
                  <div class="suggestion-icon ${suggestion.type}">
                    ${suggestion.icon || this.getSuggestionIcon(suggestion.type)}
                  </div>
                  <div class="suggestion-content">
                    <div class="suggestion-text">${suggestion.text}</div>
                    ${suggestion.description ? html`
                      <div class="suggestion-description">${suggestion.description}</div>
                    ` : null}
                  </div>
                  ${suggestion.confidence ? html`
                    <div class="suggestion-confidence">${Math.round(suggestion.confidence * 100)}%</div>
                  ` : null}
                </div>
              `)}
            </div>
          ` : this.value ? html`
            <div class="empty-state">
              <div class="empty-icon">🔍</div>
              <div>No suggestions found</div>
              <div style="font-size: 12px; margin-top: 4px;">Press Enter to search</div>
            </div>
          ` : null}

          ${this.showHints && (this.suggestions.length > 0 || this.value) ? html`
            <div class="keyboard-hints">
              <span><span class="kbd">↑↓</span> Navigate</span>
              <span><span class="kbd">Enter</span> Select</span>
              <span><span class="kbd">Esc</span> Close</span>
            </div>
          ` : null}
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ai-smart-search': AiSmartSearch;
  }
}
