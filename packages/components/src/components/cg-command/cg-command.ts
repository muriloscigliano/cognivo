import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { hostBlock, reducedMotion } from '../../styles/index.js';
import { FocusTrap } from '../../utils/focus-trap.js';
import { handleRovingKey } from '../../utils/roving-index.js';

export interface CommandItem {
  id: string;
  label: string;
  group?: string;
  icon?: string;
  shortcut?: string;
  keywords?: string[];
  disabled?: boolean;
}

/**
 * @element cg-command
 * Searchable command palette foundation. Combobox pattern with grouped items,
 * keyboard navigation, and type-ahead filtering.
 *
 * @example
 * ```html
 * <cg-command
 *   open
 *   placeholder="Type a command..."
 *   .commands=${[
 *     { id: 'new', label: 'New file', group: 'File', shortcut: '⌘N' },
 *     { id: 'open', label: 'Open file', group: 'File', shortcut: '⌘O' },
 *   ]}
 * ></cg-command>
 * ```
 *
 * @slot header - Content above the input
 * @slot footer - Content below the list
 * @slot empty - Custom empty state
 *
 * @fires {CustomEvent<{id: string, command: CommandItem}>} cg-command-select
 * @fires {CustomEvent<{value: string}>} cg-command-input
 * @fires {CustomEvent} cg-command-open
 * @fires {CustomEvent} cg-command-close
 */
@customElement('cg-command')
export class CgCommand extends LitElement {
  static override styles = [hostBlock, reducedMotion, css`
    :host {
      display: contents;
    }

    .backdrop {
      position: fixed;
      inset: 0;
      z-index: var(--cg-z-index-500);
      background: var(--cg-color-modal-overlay-background);
      backdrop-filter: blur(var(--cg-blur-backdrop));
      opacity: 0;
      pointer-events: none;
      transition: opacity var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
    }
    :host([open]) .backdrop {
      opacity: 1;
      pointer-events: auto;
    }

    .palette {
      position: fixed;
      top: 20%;
      left: 50%;
      z-index: var(--cg-z-index-top);
      width: calc(100% - var(--cg-spacing-32));
      max-width: var(--cg-component-command-width);
      max-height: var(--cg-component-command-max-height);
      display: flex;
      flex-direction: column;
      background: var(--cg-color-surface-cards-background);
      border: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
      border-radius: var(--cg-component-command-radius);
      box-shadow: var(--cg-shadow-elevation-xl);
      opacity: 0;
      transform: translateX(-50%) translateY(calc(-1 * var(--cg-spacing-8))) scale(0.96);
      pointer-events: none;
      overflow: hidden;
      transition:
        opacity var(--cg-transition-duration-fast) var(--cg-transition-easing-default),
        transform var(--cg-transition-duration-default) var(--cg-transition-easing-ease-out);
    }
    :host([open]) .palette {
      opacity: 1;
      transform: translateX(-50%) translateY(0) scale(1);
      pointer-events: auto;
    }

    .input-wrap {
      display: flex;
      align-items: center;
      gap: var(--cg-spacing-12);
      padding: var(--cg-spacing-20);
      border-bottom: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
    }
    .search-icon {
      color: var(--cg-color-surface-container-outlined);
      flex-shrink: 0;
    }
    input {
      flex: 1;
      border: none;
      outline: none;
      background: none;
      color: var(--cg-color-surface-base-text);
      font-family: inherit;
      font-size: var(--cg-font-size-base);
    }
    input::placeholder { color: var(--cg-color-surface-container-outlined); }

    .list {
      flex: 1;
      overflow-y: auto;
      padding: var(--cg-spacing-8);
      display: flex;
      flex-direction: column;
      gap: var(--cg-spacing-4);
    }

    /* Group label — uppercase mono. Extra top margin separates groups
       visually so the eye groups items by section. First group hugs the top. */
    .group-label {
      padding: var(--cg-spacing-6) var(--cg-spacing-12);
      margin-top: var(--cg-spacing-12);
      font: 600 var(--cg-font-size-xs) var(--cg-font-family-mono);
      color: var(--cg-color-surface-container-outlined);
      text-transform: uppercase;
      letter-spacing: 0.06em;
    }
    .group-label:first-child { margin-top: 0; }

    .item {
      display: flex;
      align-items: center;
      gap: var(--cg-spacing-12);
      width: 100%;
      /* min-height + real padding instead of fixed height — gives labels room
         to breathe and lets items grow if content wraps. */
      min-height: var(--cg-component-command-item-height);
      padding: var(--cg-spacing-8) var(--cg-spacing-12);
      border: none;
      background: none;
      color: var(--cg-color-surface-base-text);
      font-family: inherit;
      font-size: var(--cg-font-size-sm);
      line-height: var(--cg-line-height-snug);
      text-align: left;
      cursor: pointer;
      border-radius: var(--cg-border-radius-100);
      transition:
        background-color var(--cg-transition-duration-fast) var(--cg-transition-easing-default),
        color var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
    }
    /* Hover (mouse) AND data-active (keyboard) get the same treatment so both
       input methods feel instant — no waiting for a state-driven re-render. */
    .item:hover:not([disabled]),
    .item[data-active]:not([disabled]) {
      background: var(--cg-color-action-tertiary-background-hover);
      color: var(--cg-color-surface-base-text);
    }
    .item:active:not([disabled]) {
      transform: scale(var(--cg-interaction-press-scale));
    }
    .item[disabled] {
      opacity: 0.5;
      cursor: not-allowed;
    }
    .item-icon {
      flex-shrink: 0;
      color: var(--cg-color-surface-container-outlined);
      opacity: 0.85;
      transition:
        opacity var(--cg-transition-duration-fast) var(--cg-transition-easing-default),
        color var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
    }
    .item[data-active] .item-icon {
      color: var(--cg-color-action-primary-background-default);
      opacity: 1;
    }
    .item-label { flex: 1; }

    /* Loading state — small spinner + label, replaces empty/list when loading. */
    .loading {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: var(--cg-spacing-8);
      padding: var(--cg-spacing-32);
      color: var(--cg-color-surface-container-outlined);
      font-size: var(--cg-font-size-sm);
    }
    .shortcut {
      font: 500 var(--cg-font-size-xs) var(--cg-font-family-mono);
      color: var(--cg-color-surface-container-outlined);
      padding: var(--cg-spacing-2) var(--cg-spacing-6);
      border-radius: var(--cg-border-radius-50);
      background: var(--cg-color-surface-container-background);
    }

    .empty {
      padding: var(--cg-spacing-40);
      text-align: center;
      color: var(--cg-color-surface-container-outlined);
      font-size: var(--cg-font-size-sm);
    }
  `];

  @property({ type: Boolean, reflect: true }) open = false;
  @property() placeholder = 'Type a command or search...';
  @property({ type: Array }) commands: CommandItem[] = [];
  @property() value = '';
  @property({ attribute: 'empty-text' }) emptyText = 'No results found.';
  @property({ type: Boolean }) loading = false;

  @state() private _activeIndex = 0;

  @query('input') private _inputEl!: HTMLInputElement;
  @query('.palette') private _paletteEl!: HTMLElement;

  private _focusTrap = new FocusTrap();

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this._focusTrap.deactivate();
  }

  override updated(changed: Map<string, unknown>): void {
    if (changed.has('open')) {
      if (this.open) this._onOpen();
      else this._onClose();
    }
  }

  private _onOpen(): void {
    this._activeIndex = 0;
    this.dispatchEvent(new CustomEvent('cg-command-open', { bubbles: true, composed: true }));
    requestAnimationFrame(() => {
      if (this._paletteEl) {
        this._focusTrap.activate(this._paletteEl, {
          initialFocus: this._inputEl,
          onEscape: () => { this.open = false; },
        });
      }
    });
  }

  private _onClose(): void {
    this._focusTrap.deactivate();
    this.dispatchEvent(new CustomEvent('cg-command-close', { bubbles: true, composed: true }));
  }

  private get _filteredCommands(): CommandItem[] {
    const query = this.value.toLowerCase().trim();
    if (!query) return this.commands;
    return this.commands.filter(c => {
      if (c.disabled) return false;
      const label = c.label.toLowerCase();
      const keywords = (c.keywords || []).join(' ').toLowerCase();
      return label.includes(query) || keywords.includes(query);
    });
  }

  private get _groupedCommands(): Array<{ group: string; items: CommandItem[] }> {
    const filtered = this._filteredCommands;
    const groups = new Map<string, CommandItem[]>();
    for (const cmd of filtered) {
      const group = cmd.group || '';
      if (!groups.has(group)) groups.set(group, []);
      groups.get(group)!.push(cmd);
    }
    return Array.from(groups.entries()).map(([group, items]) => ({ group, items }));
  }

  private _handleInput(e: Event): void {
    this.value = (e.target as HTMLInputElement).value;
    this._activeIndex = 0;
    this.dispatchEvent(new CustomEvent('cg-command-input', {
      detail: { value: this.value },
      bubbles: true,
      composed: true,
    }));
  }

  private _handleKeydown(e: KeyboardEvent): void {
    // Enter-only select — Space is reserved for typing the query.
    if (e.key === ' ') return;
    const { index, handled } = handleRovingKey(e, {
      items: this._filteredCommands,
      activeIndex: this._activeIndex,
      onSelect: item => this._select(item),
    });
    if (handled) {
      e.preventDefault();
      this._activeIndex = index;
    }
  }

  private _select(item: CommandItem): void {
    if (item.disabled) return;
    this.dispatchEvent(new CustomEvent('cg-command-select', {
      detail: { id: item.id, command: item },
      bubbles: true,
      composed: true,
    }));
    this.open = false;
    this.value = '';
  }

  override render() {
    const groups = this._groupedCommands;
    const filtered = this._filteredCommands;
    let flatIndex = -1;

    return html`
      <div class="backdrop" @click=${() => this.open = false}></div>
      <div
        class="palette"
        role="dialog"
        aria-label="Command palette"
        aria-modal="true"
        ?hidden=${!this.open}
      >
        <slot name="header"></slot>
        <div class="input-wrap">
          <cg-icon class="search-icon" name="minimalistic-magnifer-linear" size="sm" aria-hidden="true"></cg-icon>
          <input
            type="text"
            role="combobox"
            aria-expanded=${this.open ? 'true' : 'false'}
            aria-controls="command-list"
            aria-autocomplete="list"
            placeholder=${this.placeholder}
            .value=${this.value}
            @input=${this._handleInput}
            @keydown=${this._handleKeydown}
          />
        </div>
        <div class="list" id="command-list" role="listbox">
          ${this.loading ? html`
            <div class="loading" aria-busy="true">
              <cg-spinner size="sm"></cg-spinner>
              <span>Loading…</span>
            </div>
          ` : filtered.length === 0 ? html`
            <slot name="empty">
              <div class="empty">${this.emptyText}</div>
            </slot>
          ` : groups.map(({ group, items }) => html`
            ${group ? html`<div class="group-label">${group}</div>` : nothing}
            ${items.map(item => {
              flatIndex++;
              const isActive = flatIndex === this._activeIndex;
              return html`
                <button
                  class="item"
                  role="option"
                  ?disabled=${item.disabled}
                  aria-selected=${isActive ? 'true' : 'false'}
                  data-active=${isActive ? 'true' : nothing}
                  @click=${() => this._select(item)}
                  @mouseenter=${() => { this._activeIndex = flatIndex; }}
                >
                  ${item.icon ? html`<cg-icon class="item-icon" name=${item.icon} size="sm" aria-hidden="true"></cg-icon>` : nothing}
                  <span class="item-label">${item.label}</span>
                  ${item.shortcut ? html`<span class="shortcut">${item.shortcut}</span>` : nothing}
                </button>
              `;
            })}
          `)}
        </div>
        <slot name="footer"></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cg-command': CgCommand;
  }
}
