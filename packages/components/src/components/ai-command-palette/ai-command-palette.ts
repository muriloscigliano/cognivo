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
      background: var(--cg-overlay-dark-strong);
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
      display: flex;
      align-items: flex-start;
      justify-content: center;
      padding-top: 15vh;
    }

    .palette {
      width: 100%;
      max-width: 520px;
      background: var(--cg-color-modal-container-background);
      border: var(--cg-border-width-50) solid var(--cg-color-modal-container-border);
      border-radius: var(--cg-border-radius-150);
      overflow: hidden;
      animation: fadeSlideIn var(--cg-motion-duration-normal) var(--cg-motion-easing-enter) both;
    }

    .search-wrap {
      display: flex;
      align-items: center;
      gap: var(--cg-spacing-8);
      padding: var(--cg-spacing-12) var(--cg-spacing-16);
      border-bottom: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
    }
    .search-icon {
      color: var(--cg-color-input-text-placeholder);
      font-size: var(--cg-font-size-base);
      flex-shrink: 0;
    }
    .search-input {
      flex: 1;
      background: transparent;
      border: none;
      outline: none;
      color: var(--cg-color-surface-popover-text);
      font-size: var(--cg-font-size-sm);
      font-family: inherit;
      border-radius: 0;
      padding: var(--cg-spacing-6) var(--cg-spacing-8);
    }
    .search-input:focus-visible {
      outline: none;
      box-shadow: none;
    }
    .search-input::placeholder {
      color: var(--cg-color-input-text-placeholder);
    }

    .results {
      max-height: 360px;
      overflow-y: auto;
      overflow-x: hidden;
      padding: var(--cg-spacing-8) 0;
    }

    .category-label {
      padding: var(--cg-spacing-8) var(--cg-spacing-16) var(--cg-spacing-4);
      font-size: var(--cg-font-size-xs);
      font-weight: var(--cg-font-weight-semibold);
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--cg-color-input-text-placeholder);
      border-top: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
      margin-top: var(--cg-spacing-4);
    }
    .category-label:first-child {
      border-top: none;
      margin-top: 0;
    }

    .cmd {
      display: flex;
      align-items: center;
      gap: var(--cg-spacing-8);
      width: 100%;
      padding: var(--cg-spacing-8) var(--cg-spacing-12);
      background: none;
      border: none;
      color: var(--cg-color-input-text-placeholder);
      font-size: var(--cg-font-size-sm);
      font-family: inherit;
      cursor: pointer;
      text-align: left;
      transition: background-color var(--cg-motion-duration-normal) var(--cg-motion-easing-color), color var(--cg-motion-duration-normal) var(--cg-motion-easing-color);
      min-height: var(--cg-spacing-40);
      border-radius: var(--cg-border-radius-100);
      margin: 0 var(--cg-spacing-4);
    }
    .cmd:hover, .cmd[data-active="true"] {
      background: var(--cg-color-surface-cards-border);
      color: var(--cg-color-surface-base-text);
    }
    .cmd:active { transform: scale(var(--cg-interaction-press-scale)); transition: transform var(--cg-motion-duration-fast) var(--cg-motion-easing-color); }
    .cmd:focus-visible {
      outline: none;
      box-shadow:
        0 0 0 2px var(--cg-color-surface-base-background),
        0 0 0 3px var(--cg-overlay-accent-strong);
    }

    .cmd-icon { flex-shrink: 0; width: var(--cg-spacing-20); text-align: center; }
    .cmd-label { flex: 1; }
    .cmd-label mark {
      background: var(--cg-overlay-accent-strong);
      color: var(--cg-color-surface-base-text);
      border-radius: var(--cg-border-radius-50);
      padding: 0 var(--cg-spacing-2);
    }

    .cmd-shortcut {
      flex-shrink: 0;
      font-size: var(--cg-font-size-xs);
      font-family: var(--cg-font-family-mono);
      padding: var(--cg-spacing-2) var(--cg-spacing-6);
      border-radius: var(--cg-border-radius-50);
      background: var(--cg-overlay-dark-subtle);
      color: var(--cg-color-input-text-placeholder);
    }

    .empty {
      padding: var(--cg-spacing-24) var(--cg-spacing-16);
      text-align: center;
      color: var(--cg-color-input-text-placeholder);
      font-size: var(--cg-font-size-sm);
    }

    /* ── Rounded variants ── */
    :host([rounded="none"]) .palette { border-radius: 0; }
    :host([rounded="sm"]) .palette { border-radius: var(--cg-border-radius-50); }
    :host([rounded="md"]) .palette { border-radius: var(--cg-border-radius-100); }
    :host([rounded="lg"]) .palette { border-radius: var(--cg-border-radius-150); }
    :host([rounded="full"]) .palette { border-radius: var(--cg-border-radius-full); }
  `];
  @property({ reflect: true }) rounded: 'none' | 'sm' | 'md' | 'lg' | 'full' = 'lg';
  @property({ type: Array }) commands: PaletteCommand[] = [];
  @property({ type: Boolean, reflect: true }) open = false;
  @property({ type: String }) placeholder = 'Type a command\u2026';

  @state() private _query = '';
  @state() private _activeIndex = 0;

  @query('.search-input') private _input!: HTMLInputElement;

  private _previousFocus: HTMLElement | null = null;
  private _previousOverflow = '';

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
    if (changed.has('open')) {
      if (this.open) {
        this._previousFocus = document.activeElement as HTMLElement;
        this._previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        this._query = '';
        this._activeIndex = 0;
        requestAnimationFrame(() => this._input?.focus());
      } else if (changed.get('open') === true) {
        document.body.style.overflow = this._previousOverflow;
        this._previousFocus?.focus();
        this._previousFocus = null;
      }
    }
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    if (this.open) {
      document.body.style.overflow = this._previousOverflow || '';
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
      this._activeIndex = this._activeIndex >= list.length - 1 ? 0 : this._activeIndex + 1;
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      this._activeIndex = this._activeIndex <= 0 ? list.length - 1 : this._activeIndex - 1;
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
