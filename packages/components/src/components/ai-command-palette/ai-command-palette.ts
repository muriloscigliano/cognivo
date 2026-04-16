/**
 * @element ai-command-palette
 * AI-flavored command palette — thin wrapper around <cg-command> adding fuzzy
 * search, recent commands history, and category badges.
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
 */
import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { hostBlock } from '../../styles/index.js';
import '../cg-command/cg-command.js';
import type { CommandItem } from '../cg-command/cg-command.js';

export interface PaletteCommand {
  id: string;
  label: string;
  shortcut?: string;
  icon?: string;
  category?: string;
}

const RECENT_STORAGE_KEY = 'cognivo:ai-command-palette:recent';
const RECENT_LIMIT = 5;

@customElement('ai-command-palette')
export class AiCommandPalette extends LitElement {
  static override styles = [hostBlock, css`
    :host { display: contents; }
    :host([hidden]) { display: none; }
  `];

  @property({ reflect: true }) rounded: 'none' | 'sm' | 'md' | 'lg' | 'full' = 'lg';
  @property({ type: Array }) commands: PaletteCommand[] = [];
  @property({ type: Boolean, reflect: true }) open = false;
  @property({ type: String }) placeholder = 'Type a command\u2026';

  @state() private _query = '';

  private _readRecent(): string[] {
    try {
      const raw = globalThis.localStorage?.getItem(RECENT_STORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed.filter((x): x is string => typeof x === 'string') : [];
    } catch {
      return [];
    }
  }

  private _writeRecent(id: string): void {
    try {
      const prev = this._readRecent().filter(x => x !== id);
      prev.unshift(id);
      globalThis.localStorage?.setItem(RECENT_STORAGE_KEY, JSON.stringify(prev.slice(0, RECENT_LIMIT)));
    } catch {
      /* ignore quota / privacy mode */
    }
  }

  /** Fuzzy score: substring match (strong), then in-order character match (weak). Returns -1 if no match. */
  private _score(label: string, q: string): number {
    if (!q) return 0;
    const l = label.toLowerCase();
    const needle = q.toLowerCase();
    const idx = l.indexOf(needle);
    if (idx !== -1) return 1000 - idx;
    let li = 0, matched = 0, lastHit = -1, gaps = 0;
    for (let i = 0; i < needle.length; i++) {
      const ch = needle[i]!;
      const found = l.indexOf(ch, li);
      if (found === -1) return -1;
      if (lastHit !== -1) gaps += found - lastHit - 1;
      lastHit = found;
      li = found + 1;
      matched++;
    }
    return matched === needle.length ? 100 - gaps : -1;
  }

  /** Map PaletteCommand → CommandItem (category → group). */
  private _toItem(c: PaletteCommand, groupOverride?: string, query = ''): CommandItem {
    // Inject the active query as a keyword so cg-command's internal substring
    // filter passes through items we've already matched via fuzzy scoring.
    const item: CommandItem = {
      id: c.id,
      label: c.label,
      group: groupOverride ?? c.category ?? 'General',
    };
    if (c.shortcut !== undefined) item.shortcut = c.shortcut;
    if (c.icon !== undefined) item.icon = c.icon;
    if (query) item.keywords = [query];
    return item;
  }

  /** Build the filtered + ordered + recent-prepended item list to hand to cg-command. */
  private get _items(): CommandItem[] {
    const q = this._query.trim();
    const base = this.commands;

    // Recent group (only when no active query)
    const recentIds = q ? [] : this._readRecent();
    const byId = new Map(base.map(c => [c.id, c]));
    const recentItems: CommandItem[] = recentIds
      .map(id => byId.get(id))
      .filter((c): c is PaletteCommand => !!c)
      .map(c => this._toItem(c, 'Recent', q));

    let rest: PaletteCommand[];
    if (q) {
      const scored = base
        .map(c => ({ c, s: this._score(c.label, q) }))
        .filter(x => x.s >= 0)
        .sort((a, b) => b.s - a.s);
      rest = scored.map(x => x.c);
    } else {
      const recentSet = new Set(recentIds);
      rest = base.filter(c => !recentSet.has(c.id));
    }

    return [...recentItems, ...rest.map(c => this._toItem(c, undefined, q))];
  }

  private _onSelect = (e: Event): void => {
    const ev = e as CustomEvent<{ id: string; command: CommandItem }>;
    e.stopPropagation();
    const id = ev.detail?.id;
    const cmd = this.commands.find(c => c.id === id);
    if (!cmd) return;
    this._writeRecent(id);
    this.open = false;
    this.dispatchEvent(new CustomEvent('ai-command-select', {
      detail: { id: cmd.id, label: cmd.label },
      bubbles: true,
      composed: true,
    }));
  };

  private _onClose = (e: Event): void => {
    e.stopPropagation();
    if (this.open) this.open = false;
    this._query = '';
    this.dispatchEvent(new CustomEvent('ai-command-close', {
      bubbles: true,
      composed: true,
    }));
  };

  private _onInput = (e: Event): void => {
    const ev = e as CustomEvent<{ value: string }>;
    e.stopPropagation();
    this._query = ev.detail?.value ?? '';
  };

  override render() {
    if (!this.open) return nothing;
    return html`
      <cg-command
        ?open=${this.open}
        .placeholder=${this.placeholder}
        .commands=${this._items}
        @cg-command-select=${this._onSelect}
        @cg-command-close=${this._onClose}
        @cg-command-input=${this._onInput}
      ></cg-command>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ai-command-palette': AiCommandPalette;
  }
}
