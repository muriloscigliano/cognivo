/**
 * @element ai-command-palette
 * Cmd+K modal palette with fuzzy search, category grouping, keyboard navigation, and shortcut badges.
 *
 * @example
 * ```html
 * <ai-command-palette
 *   .commands=${[
 *     {id:'new-chat', label:'New Chat', shortcut:'Ctrl+N', category:'AI'},
 *     {id:'export', label:'Export Data', icon:'[box icon]', category:'Data'}
 *   ]}
 *   open
 * ></ai-command-palette>
 * ```
 *
 * @fires {CustomEvent<{id: string, label: string}>} ai-command-select - Command selected
 * @fires {CustomEvent} ai-command-close - Palette closed (Escape or overlay click)
 *
 * @cssprop [--cg-color-accent=#dfff61] - Match highlight and focus outline color
 */
import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { hostBlock, reducedMotion, fadeSlideInKeyframes } from '../../styles/index.js';

export interface PaletteCommand {
  id: string;
  label: string;
  shortcut?: string;
  icon?: string;
  category?: string;
}

@customElement('ai-command-palette')
export class AiCommandPalette extends LitElement {
  static override styles = [hostBlock, reducedMotion, fadeSlideInKeyframes, css`
    :host {
      display: contents;
    }
    :host([hidden]) { display: none; }

    .overlay {
      position: fixed;
      inset: 0;
      z-index: 9998;
      background: rgba(0, 0, 0, 0.6);
      display: flex;
      align-items: flex-start;
      justify-content: center;
      padding-top: 15vh;
    }

    .palette {
      width: 100%;
      max-width: 520px;
      background: var(--cg-color-surface, #18181b);
      background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0.03), transparent);
      border: 1px solid var(--cg-color-border, #27272a);
      border-radius: 12px;
      box-shadow: var(--cg-elevation-4, 0 20px 25px -5px rgba(0, 0, 0, 0.4), 0 8px 10px -6px rgba(0, 0, 0, 0.3)), inset 0 1px 0 0 rgba(255, 255, 255, 0.05);
      overflow: hidden;
      animation: fadeSlideIn 200ms var(--cg-motion-easing-enter, cubic-bezier(0, 0, 0.2, 1)) both;
    }

    .search-wrap {
      display: flex;
      align-items: center;
      gap: var(--cg-spacing-8, 8px);
      padding: var(--cg-spacing-12, 12px) var(--cg-spacing-16, 16px);
      border-bottom: 1px solid var(--cg-color-border, #27272a);
      border-image: linear-gradient(to right, transparent, var(--cg-color-border, #27272a) 20%, var(--cg-color-border, #27272a) 80%, transparent) 1;
    }
    .search-icon {
      color: var(--cg-color-text-tertiary, #71717a);
      font-size: 16px;
      flex-shrink: 0;
    }
    .search-input {
      flex: 1;
      background: none;
      border: none;
      outline: none;
      color: var(--cg-color-text-primary, #fafafa);
      font-size: 15px;
      font-family: inherit;
    }
    .search-input::placeholder {
      color: var(--cg-color-text-tertiary, #71717a);
    }

    .results {
      max-height: 320px;
      overflow-y: auto;
      padding: var(--cg-spacing-8, 8px) 0;
    }

    .category-label {
      padding: var(--cg-spacing-8, 8px) var(--cg-spacing-16, 16px) var(--cg-spacing-4, 4px);
      font-size: var(--cg-font-size-xs, 12px);
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--cg-color-text-tertiary, #71717a);
    }

    .cmd {
      display: flex;
      align-items: center;
      gap: var(--cg-spacing-10, 10px);
      width: 100%;
      padding: var(--cg-spacing-8, 8px) var(--cg-spacing-16, 16px);
      background: none;
      border: none;
      color: var(--cg-color-text-secondary, #a1a1aa);
      font-size: 14px;
      font-family: inherit;
      cursor: pointer;
      text-align: left;
      transition: background 100ms ease, color 100ms ease;
    }
    .cmd:hover, .cmd[data-active="true"] {
      background: rgba(255, 255, 255, 0.06);
      color: var(--cg-color-text-primary, #fafafa);
    }
    .cmd:focus-visible {
      outline: 2px solid var(--cg-color-accent, #dfff61);
      outline-offset: -2px;
    }

    .cmd-icon { flex-shrink: 0; width: 20px; text-align: center; }
    .cmd-label { flex: 1; }
    .cmd-label mark {
      background: rgba(223, 255, 97, 0.25);
      color: var(--cg-color-accent, #dfff61);
      border-radius: 2px;
      padding: 0 1px;
    }

    .cmd-shortcut {
      flex-shrink: 0;
      font-size: var(--cg-font-size-xs, 12px);
      font-family: var(--cg-font-family-mono, 'JetBrains Mono', monospace);
      padding: 2px 6px;
      border-radius: 4px;
      background: rgba(255, 255, 255, 0.06);
      color: var(--cg-color-text-tertiary, #71717a);
    }

    .empty {
      padding: 24px 16px;
      text-align: center;
      color: var(--cg-color-text-tertiary, #71717a);
      font-size: 13px;
    }
    }

    /* ── Rounded variants ── */
    :host([rounded="none"]) .palette { border-radius: 0; }
    :host([rounded="sm"]) .palette { border-radius: var(--cg-border-radius-50, 4px); }
    :host([rounded="md"]) .palette { border-radius: var(--cg-border-radius-100, 8px); }
    :host([rounded="lg"]) .palette { border-radius: var(--cg-border-radius-150, 12px); }
    :host([rounded="full"]) .palette { border-radius: var(--cg-border-radius-full, 99999px); }
  `];
  @property({ reflect: true }) rounded: 'none' | 'sm' | 'md' | 'lg' | 'full' = 'lg';
  @property({ type: Array }) commands: PaletteCommand[] = [];
  @property({ type: Boolean, reflect: true }) open = false;
  @property({ type: String }) placeholder = 'Type a command\u2026';

  @state() private _query = '';
  @state() private _activeIndex = 0;

  @query('.search-input') private _input!: HTMLInputElement;

  private get _filtered(): PaletteCommand[] {
    const q = this._query.toLowerCase().trim();
    if (!q) return this.commands;
    return this.commands.filter(c => c.label.toLowerCase().includes(q));
  }

  private get _grouped(): Map<string, PaletteCommand[]> {
    const map = new Map<string, PaletteCommand[]>();
    for (const cmd of this._filtered) {
      const cat = cmd.category || 'General';
      if (!map.has(cat)) map.set(cat, []);
      map.get(cat)!.push(cmd);
    }
    return map;
  }

  override updated(changed: Map<string, unknown>): void {
    if (changed.has('open') && this.open) {
      this._query = '';
      this._activeIndex = 0;
      requestAnimationFrame(() => this._input?.focus());
    }
  }

  private _close(): void {
    this.open = false;
    this.dispatchEvent(new CustomEvent('ai-command-close', {
      bubbles: true, composed: true,
    }));
  }

  private _select(cmd: PaletteCommand): void {
    this.dispatchEvent(new CustomEvent('ai-command-select', {
      detail: { id: cmd.id, label: cmd.label },
      bubbles: true, composed: true,
    }));
    this._close();
  }

  private _onInput(e: Event): void {
    this._query = (e.target as HTMLInputElement).value;
    this._activeIndex = 0;
  }

  private _onKeydown(e: KeyboardEvent): void {
    const list = this._filtered;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      this._activeIndex = Math.min(this._activeIndex + 1, list.length - 1);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      this._activeIndex = Math.max(this._activeIndex - 1, 0);
    } else if (e.key === 'Enter' && list[this._activeIndex]) {
      e.preventDefault();
      this._select(list[this._activeIndex]);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      this._close();
    }
  }

  private _highlightMatch(label: string): unknown {
    const q = this._query.toLowerCase().trim();
    if (!q) return label;
    const idx = label.toLowerCase().indexOf(q);
    if (idx === -1) return label;
    const before = label.slice(0, idx);
    const match = label.slice(idx, idx + q.length);
    const after = label.slice(idx + q.length);
    return html`${before}<mark>${match}</mark>${after}`;
  }

  private _onOverlayClick(e: Event): void {
    if ((e.target as HTMLElement).classList.contains('overlay')) {
      this._close();
    }
  }

  override render() {
    if (!this.open) return nothing;

    let flatIdx = 0;
    return html`
      <div
        class="overlay"
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        @click=${this._onOverlayClick}
        @keydown=${this._onKeydown}
      >
        <div class="palette">
          <div class="search-wrap">
            <span class="search-icon">\u2318</span>
            <input
              class="search-input"
              type="text"
              .value=${this._query}
              placeholder=${this.placeholder}
              aria-label="Search commands"
              @input=${this._onInput}
            />
          </div>
          <div class="results" role="listbox">
            ${this._filtered.length === 0
              ? html`<div class="empty">No commands found</div>`
              : Array.from(this._grouped.entries()).map(([cat, cmds]) => html`
                  <div class="category-label">${cat}</div>
                  ${cmds.map(cmd => {
                    const idx = flatIdx++;
                    return html`
                      <button
                        class="cmd"
                        role="option"
                        tabindex="-1"
                        data-active=${idx === this._activeIndex ? 'true' : 'false'}
                        aria-selected=${idx === this._activeIndex ? 'true' : 'false'}
                        aria-label=${cmd.label}
                        @click=${() => this._select(cmd)}
                      >
                        ${cmd.icon ? html`<span class="cmd-icon">${cmd.icon}</span>` : nothing}
                        <span class="cmd-label">${this._highlightMatch(cmd.label)}</span>
                        ${cmd.shortcut ? html`<span class="cmd-shortcut">${cmd.shortcut}</span>` : nothing}
                      </button>
                    `;
                  })}
                `)
            }
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
