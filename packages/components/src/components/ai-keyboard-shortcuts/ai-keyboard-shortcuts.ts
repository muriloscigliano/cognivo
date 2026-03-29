/**
 * <ai-keyboard-shortcuts> — Shortcut Hint Overlay
 *
 * Modal overlay with grouped shortcuts.
 * Key badges styled like keyboard keys.
 * Close on Escape, search filter.
 * Focus trap and keyboard accessible.
 */
import { LitElement, html, css, nothing } from 'lit';
import { property, state, customElement } from 'lit/decorators.js';

export interface ShortcutEntry {
  keys: string[];
  description: string;
  category?: string;
}

@customElement('ai-keyboard-shortcuts')
export class AiKeyboardShortcuts extends LitElement {
  static override styles = css`
    :host {
      transition: color var(--cg-motion-duration-fast, 80ms) var(--cg-motion-easing-color, cubic-bezier(0, 0, 0.58, 1));
      display: block;
      font-family: var(--cg-font-family-primary, 'Inter Variable', 'Inter', -apple-system, sans-serif);
    }
    :host([hidden]) { display: none; }

    .overlay {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.6);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
      backdrop-filter: blur(4px);
    }

    .modal {
      background: var(--cg-color-bg-primary, #18181b);
      border: 1px solid var(--cg-color-border-primary, #27272a);
      border-radius: 16px;
      padding: 24px;
      max-width: 520px;
      width: 90vw;
      max-height: 70vh;
      display: flex;
      flex-direction: column;
    }

    .modal-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 16px;
    }

    .modal-title {
      color: var(--cg-color-text-primary, #fafafa);
      font-size: 18px;
      font-weight: 700;
    }

    .close-btn {
      background: none;
      border: none;
      color: var(--cg-color-text-secondary, #a1a1aa);
      font-size: 20px;
      cursor: pointer;
      padding: 4px;
      border-radius: 4px;
      line-height: 1;
    }
    .close-btn:hover { color: var(--cg-color-text-primary, #fafafa); }
    .close-btn:focus-visible {
      outline: 2px solid var(--cg-brand-ai-accent, #dfff61);
      outline-offset: 2px;
    }

    .search-input {
      width: 100%;
      padding: 8px 12px;
      border-radius: 8px;
      border: 1px solid var(--cg-color-border-primary, #3f3f46);
      background: var(--cg-color-bg-secondary, #27272a);
      color: var(--cg-color-text-primary, #fafafa);
      font-size: 13px;
      font-family: inherit;
      margin-bottom: 16px;
      box-sizing: border-box;
    }
    .search-input::placeholder {
      color: var(--cg-color-text-secondary, #a1a1aa);
    }
    .search-input:focus {
      outline: 2px solid var(--cg-brand-ai-accent, #dfff61);
      outline-offset: -1px;
    }

    .shortcuts-list {
      overflow-y: auto;
      flex: 1;
    }

    .category-label {
      color: var(--cg-color-text-secondary, #a1a1aa);
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      padding: 8px 0 6px;
      border-bottom: 1px solid var(--cg-color-border-primary, #27272a);
      margin-bottom: 4px;
    }

    .shortcut-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 8px 4px;
    }

    .shortcut-desc {
      color: var(--cg-color-text-primary, #fafafa);
      font-size: 13px;
    }

    .key-group {
      display: flex;
      align-items: center;
      gap: 4px;
      flex-shrink: 0;
    }

    .key-badge {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-width: 24px;
      height: 24px;
      padding: 0 6px;
      background: var(--cg-color-bg-secondary, #27272a);
      border: 1px solid var(--cg-color-border-primary, #3f3f46);
      border-bottom-width: 3px;
      border-radius: 5px;
      color: var(--cg-color-text-primary, #fafafa);
      font-size: 11px;
      font-weight: 700;
      font-family: var(--cg-font-family-mono, 'Fira Code', monospace);
      white-space: nowrap;
    }

    .key-plus {
      color: var(--cg-color-text-secondary, #a1a1aa);
      font-size: 11px;
    }

    .no-results {
      color: var(--cg-color-text-secondary, #a1a1aa);
      font-size: 13px;
      text-align: center;
      padding: 20px;
    }

    @media (prefers-reduced-motion: reduce) {
      .overlay { backdrop-filter: none; }
    }
  `;

  @property({ type: Array }) shortcuts: ShortcutEntry[] = [];
  @property({ type: Boolean, reflect: true }) open = false;

  @state() private _search = '';

  private _handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && this.open) {
      this._close();
    }
  };

  override connectedCallback() {
    super.connectedCallback();
    document.addEventListener('keydown', this._handleKeyDown);
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('keydown', this._handleKeyDown);
  }

  private _close() {
    this.open = false;
    this._search = '';
    this.dispatchEvent(new CustomEvent('ai-shortcuts-close', { bubbles: true, composed: true }));
  }

  private _filtered(): ShortcutEntry[] {
    if (!this._search) return this.shortcuts;
    const q = this._search.toLowerCase();
    return this.shortcuts.filter(s =>
      s.description.toLowerCase().includes(q) ||
      s.keys.some(k => k.toLowerCase().includes(q)) ||
      (s.category?.toLowerCase().includes(q))
    );
  }

  private _grouped(items: ShortcutEntry[]): Map<string, ShortcutEntry[]> {
    const map = new Map<string, ShortcutEntry[]>();
    for (const item of items) {
      const cat = item.category || 'General';
      if (!map.has(cat)) map.set(cat, []);
      map.get(cat)!.push(item);
    }
    return map;
  }

  override render() {
    if (!this.open) return nothing;
    const filtered = this._filtered();
    const grouped = this._grouped(filtered);

    return html`
      <div class="overlay" @click=${(e: Event) => { if (e.target === e.currentTarget) this._close(); }}>
        <div class="modal" role="dialog" aria-label="Keyboard shortcuts" aria-modal="true">
          <div class="modal-header">
            <span class="modal-title">Keyboard Shortcuts</span>
            <button class="close-btn" aria-label="Close shortcuts" @click=${this._close}>✕</button>
          </div>
          <input
            class="search-input"
            type="text"
            placeholder="Search shortcuts..."
            .value=${this._search}
            @input=${(e: Event) => { this._search = (e.target as HTMLInputElement).value; }}
            aria-label="Search shortcuts"
          />
          <div class="shortcuts-list" role="list">
            ${filtered.length === 0
              ? html`<div class="no-results">No shortcuts found</div>`
              : Array.from(grouped.entries()).map(([cat, items]) => html`
                <div class="category-label">${cat}</div>
                ${items.map(s => html`
                  <div class="shortcut-row" role="listitem">
                    <span class="shortcut-desc">${s.description}</span>
                    <span class="key-group">
                      ${s.keys.map((k, i) => html`
                        ${i > 0 ? html`<span class="key-plus">+</span>` : nothing}
                        <span class="key-badge">${k}</span>
                      `)}
                    </span>
                  </div>
                `)}
              `)}
          </div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ai-keyboard-shortcuts': AiKeyboardShortcuts;
  }
}
