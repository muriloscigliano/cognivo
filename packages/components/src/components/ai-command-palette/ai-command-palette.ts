import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

export interface CommandItem {
  id: string;
  label: string;
  description?: string;
  icon?: string;
  category?: string;
  shortcut?: string;
  action?: () => void;
}

export interface CommandCategory {
  id: string;
  label: string;
  commands: CommandItem[];
}

/**
 * AI Command Palette
 *
 * Cmd+K style command palette with AI-powered search and suggestions.
 * Supports categories, keyboard navigation, and fuzzy matching.
 *
 * @element ai-command-palette
 *
 * @fires ai:command-select - Fired when a command is selected
 * @fires ai:command-search - Fired on search input change
 * @fires ai:palette-open - Fired when palette opens
 * @fires ai:palette-close - Fired when palette closes
 */
@customElement('ai-command-palette')
export class AiCommandPalette extends LitElement {
  static override styles = [
    baseStyles,
    css`
      :host {
        display: contents;
        font-family: ${tokens.fontFamily.primary};
      }

      .overlay {
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.5);
        backdrop-filter: blur(4px);
        display: flex;
        align-items: flex-start;
        justify-content: center;
        padding-top: 15vh;
        z-index: 9999;
        opacity: 0;
        visibility: hidden;
        transition: all ${tokens.transition.default};
      }

      .overlay.open {
        opacity: 1;
        visibility: visible;
      }

      .palette {
        width: 100%;
        max-width: 640px;
        background: ${tokens.color.grayWhite};
        border-radius: ${tokens.radius.xl};
        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        overflow: hidden;
        transform: translateY(-20px) scale(0.95);
        transition: all ${tokens.transition.default};
      }

      .overlay.open .palette {
        transform: translateY(0) scale(1);
      }

      /* Search header */
      .search-header {
        display: flex;
        align-items: center;
        gap: ${tokens.spacing.md};
        padding: ${tokens.spacing.md} ${tokens.spacing.lg};
        border-bottom: 1px solid ${tokens.color.gray100};
      }

      .search-icon {
        color: ${tokens.color.gray400};
        flex-shrink: 0;
      }

      .search-input {
        flex: 1;
        border: none;
        outline: none;
        font-size: ${tokens.fontSize.lg};
        color: ${tokens.color.gray900};
        background: transparent;
        font-family: inherit;
      }

      .search-input::placeholder {
        color: ${tokens.color.gray400};
      }

      .ai-mode-badge {
        display: inline-flex;
        align-items: center;
        gap: 4px;
        padding: 4px 10px;
        background: ${tokens.color.aiBackground};
        border: 1px solid ${tokens.color.aiBorder};
        border-radius: ${tokens.radius.full};
        font-size: ${tokens.fontSize.xs};
        font-weight: ${tokens.fontWeight.semibold};
        color: ${tokens.color.aiAccent};
        flex-shrink: 0;
      }

      .shortcut-hint {
        display: flex;
        align-items: center;
        gap: 4px;
        color: ${tokens.color.gray400};
        font-size: ${tokens.fontSize.xs};
      }

      .kbd {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-width: 20px;
        padding: 2px 6px;
        background: ${tokens.color.gray100};
        border: 1px solid ${tokens.color.gray200};
        border-radius: 4px;
        font-size: 10px;
        font-family: monospace;
      }

      /* Results area */
      .results {
        max-height: 400px;
        overflow-y: auto;
      }

      .category {
        padding: ${tokens.spacing.xs} ${tokens.spacing.lg};
      }

      .category-label {
        font-size: ${tokens.fontSize.xs};
        font-weight: ${tokens.fontWeight.semibold};
        color: ${tokens.color.gray500};
        text-transform: uppercase;
        letter-spacing: 0.05em;
        padding: ${tokens.spacing.xs} 0;
      }

      .command-item {
        display: flex;
        align-items: center;
        gap: ${tokens.spacing.md};
        padding: ${tokens.spacing.sm} ${tokens.spacing.md};
        border-radius: ${tokens.radius.md};
        cursor: pointer;
        transition: all ${tokens.transition.fast};
      }

      .command-item:hover,
      .command-item.highlighted {
        background: ${tokens.color.gray100};
      }

      .command-item.highlighted {
        background: ${tokens.color.aiBackground};
      }

      .command-icon {
        width: 36px;
        height: 36px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: ${tokens.color.gray100};
        border-radius: ${tokens.radius.md};
        font-size: 16px;
        flex-shrink: 0;
      }

      .command-item.highlighted .command-icon {
        background: ${tokens.color.aiBorder};
      }

      .command-content {
        flex: 1;
        min-width: 0;
      }

      .command-label {
        font-size: ${tokens.fontSize.sm};
        font-weight: ${tokens.fontWeight.medium};
        color: ${tokens.color.gray900};
      }

      .command-description {
        font-size: ${tokens.fontSize.xs};
        color: ${tokens.color.gray500};
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .command-shortcut {
        display: flex;
        align-items: center;
        gap: 4px;
        flex-shrink: 0;
      }

      /* AI suggestion mode */
      .ai-suggestion {
        display: flex;
        align-items: flex-start;
        gap: ${tokens.spacing.md};
        padding: ${tokens.spacing.md} ${tokens.spacing.lg};
        background: ${tokens.color.aiBackground};
        border-top: 1px solid ${tokens.color.aiBorder};
      }

      .ai-suggestion-icon {
        font-size: 20px;
        flex-shrink: 0;
      }

      .ai-suggestion-content {
        flex: 1;
      }

      .ai-suggestion-label {
        font-size: ${tokens.fontSize.sm};
        font-weight: ${tokens.fontWeight.medium};
        color: ${tokens.color.aiAccent};
        margin-bottom: 4px;
      }

      .ai-suggestion-text {
        font-size: ${tokens.fontSize.sm};
        color: ${tokens.color.gray700};
        line-height: 1.5;
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

      .empty-text {
        font-size: ${tokens.fontSize.sm};
      }

      /* Loading */
      .loading {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: ${tokens.spacing.sm};
        padding: ${tokens.spacing.lg};
        color: ${tokens.color.gray500};
        font-size: ${tokens.fontSize.sm};
      }

      /* Footer */
      .footer {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: ${tokens.spacing.sm} ${tokens.spacing.lg};
        background: ${tokens.color.gray50};
        border-top: 1px solid ${tokens.color.gray100};
        font-size: ${tokens.fontSize.xs};
        color: ${tokens.color.gray500};
      }

      .footer-hints {
        display: flex;
        align-items: center;
        gap: ${tokens.spacing.md};
      }

      .footer-hint {
        display: flex;
        align-items: center;
        gap: 4px;
      }

      /* Recent searches */
      .recent-label {
        display: flex;
        align-items: center;
        gap: ${tokens.spacing.xs};
        padding: ${tokens.spacing.xs} 0;
        font-size: ${tokens.fontSize.xs};
        color: ${tokens.color.gray500};
      }
    `
  ];

  @property({ type: Boolean, reflect: true }) open = false;
  @property({ type: String }) placeholder = 'Search commands or ask AI...';
  @property({ type: Array }) commands: CommandItem[] = [];
  @property({ type: Array }) categories: CommandCategory[] = [];
  @property({ type: Array, attribute: 'recent-searches' }) recentSearches: string[] = [];
  @property({ type: Boolean }) loading = false;
  @property({ type: String, attribute: 'ai-suggestion' }) aiSuggestion = '';
  @property({ type: Boolean, attribute: 'show-ai-mode' }) showAiMode = true;

  @state() private query = '';
  @state() private highlightedIndex = 0;
  @state() private filteredCommands: CommandItem[] = [];

  override connectedCallback() {
    super.connectedCallback();
    document.addEventListener('keydown', this.handleGlobalKeydown);
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('keydown', this.handleGlobalKeydown);
  }

  private handleGlobalKeydown = (e: KeyboardEvent) => {
    // Cmd/Ctrl + K to toggle
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      this.toggle();
    }
    // Escape to close
    if (e.key === 'Escape' && this.open) {
      this.close();
    }
  };

  private handleKeydown(e: KeyboardEvent) {
    const items = this.getFilteredItems();

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        this.highlightedIndex = Math.min(this.highlightedIndex + 1, items.length - 1);
        break;
      case 'ArrowUp':
        e.preventDefault();
        this.highlightedIndex = Math.max(this.highlightedIndex - 1, 0);
        break;
      case 'Enter':
        e.preventDefault();
        if (items[this.highlightedIndex]) {
          this.selectCommand(items[this.highlightedIndex]);
        }
        break;
    }
  }

  private handleInput(e: InputEvent) {
    const target = e.target as HTMLInputElement;
    this.query = target.value;
    this.highlightedIndex = 0;

    this.dispatchEvent(new CustomEvent('ai:command-search', {
      detail: { query: this.query },
      bubbles: true,
      composed: true
    }));
  }

  private getFilteredItems(): CommandItem[] {
    if (!this.query) {
      return this.commands;
    }

    const lowerQuery = this.query.toLowerCase();
    return this.commands.filter(cmd =>
      cmd.label.toLowerCase().includes(lowerQuery) ||
      cmd.description?.toLowerCase().includes(lowerQuery) ||
      cmd.category?.toLowerCase().includes(lowerQuery)
    );
  }

  private selectCommand(command: CommandItem) {
    this.dispatchEvent(new CustomEvent('ai:command-select', {
      detail: { command },
      bubbles: true,
      composed: true
    }));

    if (command.action) {
      command.action();
    }

    this.close();
  }

  toggle() {
    this.open ? this.close() : this.openPalette();
  }

  openPalette() {
    this.open = true;
    this.query = '';
    this.highlightedIndex = 0;

    this.dispatchEvent(new CustomEvent('ai:palette-open', {
      bubbles: true,
      composed: true
    }));

    requestAnimationFrame(() => {
      this.shadowRoot?.querySelector('input')?.focus();
    });
  }

  close() {
    this.open = false;

    this.dispatchEvent(new CustomEvent('ai:palette-close', {
      bubbles: true,
      composed: true
    }));
  }

  private handleOverlayClick(e: MouseEvent) {
    if (e.target === e.currentTarget) {
      this.close();
    }
  }

  private groupCommandsByCategory(): Map<string, CommandItem[]> {
    const items = this.getFilteredItems();
    const grouped = new Map<string, CommandItem[]>();

    items.forEach(cmd => {
      const category = cmd.category || 'Commands';
      if (!grouped.has(category)) {
        grouped.set(category, []);
      }
      grouped.get(category)!.push(cmd);
    });

    return grouped;
  }

  override render() {
    const grouped = this.groupCommandsByCategory();
    const items = this.getFilteredItems();
    let globalIndex = 0;

    return html`
      <div class="overlay ${this.open ? 'open' : ''}" @click=${this.handleOverlayClick}>
        <div class="palette">
          <div class="search-header">
            <svg class="search-icon" width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>

            <input
              class="search-input"
              type="text"
              placeholder=${this.placeholder}
              .value=${this.query}
              @input=${this.handleInput}
              @keydown=${this.handleKeydown}
            />

            ${this.showAiMode ? html`
              <span class="ai-mode-badge">
                <span>✨</span>
                <span>AI</span>
              </span>
            ` : null}

            <div class="shortcut-hint">
              <span class="kbd">esc</span>
              <span>to close</span>
            </div>
          </div>

          <div class="results">
            ${this.loading ? html`
              <div class="loading">
                <ai-thinking-indicator size="sm"></ai-thinking-indicator>
                <span>Searching...</span>
              </div>
            ` : items.length > 0 ? html`
              ${Array.from(grouped.entries()).map(([category, cmds]) => html`
                <div class="category">
                  <div class="category-label">${category}</div>
                  ${cmds.map(cmd => {
                    const index = globalIndex++;
                    return html`
                      <div
                        class="command-item ${index === this.highlightedIndex ? 'highlighted' : ''}"
                        @click=${() => this.selectCommand(cmd)}
                        @mouseenter=${() => this.highlightedIndex = index}
                      >
                        <div class="command-icon">${cmd.icon || '⚡'}</div>
                        <div class="command-content">
                          <div class="command-label">${cmd.label}</div>
                          ${cmd.description ? html`
                            <div class="command-description">${cmd.description}</div>
                          ` : null}
                        </div>
                        ${cmd.shortcut ? html`
                          <div class="command-shortcut">
                            ${cmd.shortcut.split('+').map(key => html`
                              <span class="kbd">${key}</span>
                            `)}
                          </div>
                        ` : null}
                      </div>
                    `;
                  })}
                </div>
              `)}
            ` : this.query ? html`
              <div class="empty-state">
                <div class="empty-icon">🔍</div>
                <div class="empty-text">No commands found for "${this.query}"</div>
              </div>
            ` : this.recentSearches.length > 0 ? html`
              <div class="category">
                <div class="recent-label">
                  <span>🕐</span>
                  <span>Recent</span>
                </div>
                ${this.recentSearches.slice(0, 5).map(search => html`
                  <div
                    class="command-item"
                    @click=${() => { this.query = search; }}
                  >
                    <div class="command-icon">🔍</div>
                    <div class="command-content">
                      <div class="command-label">${search}</div>
                    </div>
                  </div>
                `)}
              </div>
            ` : null}
          </div>

          ${this.aiSuggestion ? html`
            <div class="ai-suggestion">
              <div class="ai-suggestion-icon">✨</div>
              <div class="ai-suggestion-content">
                <div class="ai-suggestion-label">AI Suggestion</div>
                <div class="ai-suggestion-text">${this.aiSuggestion}</div>
              </div>
            </div>
          ` : null}

          <div class="footer">
            <div class="footer-hints">
              <div class="footer-hint">
                <span class="kbd">↑</span>
                <span class="kbd">↓</span>
                <span>Navigate</span>
              </div>
              <div class="footer-hint">
                <span class="kbd">↵</span>
                <span>Select</span>
              </div>
              <div class="footer-hint">
                <span class="kbd">⌘K</span>
                <span>Toggle</span>
              </div>
            </div>
            <div>Powered by AI</div>
          </div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ai-command-palette': AiCommandPalette;
  }
}
