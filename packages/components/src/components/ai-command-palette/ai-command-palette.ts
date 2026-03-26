/**
 * <ai-command-palette> — Command-K palette with fuzzy search.
 *
 * Props: commands, open, placeholder
 * Events: ai-command-select, ai-command-close
 * Features: Modal overlay, search input, filtered list grouped by category,
 *           keyboard nav (up/down/enter/escape), shortcut badges, match highlight
 */
import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';

export interface PaletteCommand {
  id: string;
  label: string;
  shortcut?: string;
  icon?: string;
  category?: string;
}

@customElement('ai-command-palette')
export class AiCommandPalette extends LitElement {
  static override styles = css`
    :host {
      transition: color 100ms cubic-bezier(0, 0, 0.58, 1);
      display: contents;
      font-family: var(--cg-font-family-primary, 'Inter Variable', 'Inter', -apple-system, sans-serif);
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
      border: 1px solid var(--cg-color-border, #27272a);
      border-radius: 12px;
      box-shadow: 0 24px 48px rgba(0, 0, 0, 0.4);
      overflow: hidden;
    }

    .search-wrap {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 12px 16px;
      border-bottom: 1px solid var(--cg-color-border, #27272a);
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
      padding: 8px 0;
    }

    .category-label {
      padding: 8px 16px 4px;
      font-size: 11px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--cg-color-text-tertiary, #71717a);
    }

    .cmd {
      display: flex;
      align-items: center;
      gap: 10px;
      width: 100%;
      padding: 8px 16px;
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
      font-size: 11px;
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

    @media (prefers-reduced-motion: reduce) {
      .cmd { transition: none; }
    }
  `;

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
