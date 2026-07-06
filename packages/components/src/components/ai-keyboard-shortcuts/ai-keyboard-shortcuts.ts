/**
 * @element ai-keyboard-shortcuts
 * Modal overlay displaying grouped keyboard shortcuts with searchable
 * key badge UI. Closes on Escape or backdrop click.
 *
 * @example
 * ```html
 * <ai-keyboard-shortcuts
 *   .shortcuts=${[{ keys: ['Ctrl', 'K'], description: 'Open search', category: 'Navigation' }]}
 *   open
 * ></ai-keyboard-shortcuts>
 * ```
 *
 * @prop {ShortcutEntry[]} shortcuts - Array of shortcut definitions with keys, description, category
 * @prop {boolean} open - Whether the modal is visible
 *
 * @fires ai-shortcuts-close - When the modal is dismissed
 *
 * @cssprop [--cg-font-family-mono] - Font for key badges
 * @cssprop [--cg-color-bg-primary] - Modal background color
 */
import { LitElement, html, css, nothing, svg } from 'lit';
import { property, state, customElement } from 'lit/decorators.js';
import { hostBlock, reducedMotion, fadeSlideInKeyframes } from '../../styles/index.js';

export interface ShortcutEntry {
  keys: string[];
  description: string;
  category?: string;
}

@customElement('ai-keyboard-shortcuts')
export class AiKeyboardShortcuts extends LitElement {
  static override styles = [hostBlock, reducedMotion, fadeSlideInKeyframes, css`
    :host {
      animation: fadeSlideIn var(--cg-transition-duration-default) var(--cg-transition-easing-ease-out) both;
    }
    :host([hidden]) { display: none; }

    .overlay {
      position: fixed;
      inset: 0;
      background: var(--cg-color-modal-overlay-background);
      backdrop-filter: blur(2px);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: var(--cg-z-index-top);
    }

    .modal {
      background: var(--cg-color-surface-base-background);
      border: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
      border-radius: var(--cg-border-radius-150);
      padding: var(--cg-spacing-24);
      max-width: var(--cg-component-modal-width-md);
      width: 90vw;
      max-height: 70vh;
      display: flex;
      flex-direction: column;
    }

    .modal-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: var(--cg-spacing-16);
    }

    .modal-title {
      color: var(--cg-color-surface-base-text);
      font-size: var(--cg-font-size-lg);
      font-weight: var(--cg-font-weight-bold);
    }

    .close-btn {
      background: none;
      border: none;
      color: var(--cg-color-input-text-placeholder);
      font-size: var(--cg-font-size-xl);
      cursor: pointer;
      padding: var(--cg-spacing-4);
      border-radius: var(--cg-border-radius-50);
      line-height: 1;
    }
    .close-btn:hover { color: var(--cg-color-surface-base-text); }
    .close-btn:focus-visible {
      outline: var(--cg-outline-width-default) solid var(--cg-color-focus-ring);
      outline-offset: var(--cg-outline-offset-default);
    }

    .search-input {
      width: 100%;
      padding: var(--cg-spacing-8) var(--cg-spacing-12);
      border-radius: var(--cg-border-radius-100);
      border: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
      background: var(--cg-color-surface-container-background);
      color: var(--cg-color-surface-base-text);
      font-size: var(--cg-font-size-sm);
      font-family: inherit;
      margin-bottom: var(--cg-spacing-16);
      box-sizing: border-box;
    }
    .search-input::placeholder {
      color: var(--cg-color-input-text-placeholder);
    }
    .search-input:focus-visible {
      outline: var(--cg-outline-width-default) solid var(--cg-color-focus-ring);
      outline-offset: var(--cg-outline-offset-default);
    }

    .shortcuts-list {
      overflow-y: auto;
      flex: 1;
    }

    .category-label {
      color: var(--cg-color-input-text-placeholder);
      font-size: var(--cg-font-size-xs);
      font-weight: var(--cg-font-weight-bold);
      text-transform: uppercase;
      letter-spacing: var(--cg-letter-spacing-wide);
      padding: var(--cg-spacing-8) 0 var(--cg-spacing-6);
      border-bottom: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
      margin-bottom: var(--cg-spacing-4);
    }

    .shortcut-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: var(--cg-spacing-8) var(--cg-spacing-4);
      transition: background-color var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
    }
    .shortcut-row:hover {
      background: var(--cg-color-surface-container-background);
      border-radius: var(--cg-border-radius-50);
    }

    .shortcut-desc {
      color: var(--cg-color-surface-base-text);
      font-size: var(--cg-font-size-sm);
    }

    .key-group {
      display: flex;
      align-items: center;
      gap: var(--cg-spacing-4);
      flex-shrink: 0;
    }

    .key-badge {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-width: var(--cg-spacing-24);
      height: var(--cg-spacing-24);
      padding: 0 var(--cg-spacing-6);
      background: var(--cg-color-surface-container-background);
      border: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
      border-bottom-width: 3px;
      border-radius: var(--cg-border-radius-50);
      color: var(--cg-color-surface-base-text);
      font-size: var(--cg-font-size-xs);
      font-weight: var(--cg-font-weight-bold);
      font-family: var(--cg-font-family-mono);
      white-space: nowrap;
    }

    .key-plus {
      color: var(--cg-color-input-text-placeholder);
      font-size: var(--cg-font-size-xs);
    }

    .no-results {
      color: var(--cg-color-input-text-placeholder);
      font-size: var(--cg-font-size-sm);
      text-align: center;
      padding: var(--cg-spacing-16);
    }
  `];
  @property({ type: Array }) shortcuts: ShortcutEntry[] = [];
  @property({ type: Boolean, reflect: true }) open = false;

  @state() private _search = '';

  private _prevFocus: HTMLElement | null = null;

  override updated(changed: Map<string, unknown>) {
    if (changed.has('open')) {
      if (this.open) {
        this._prevFocus = (this.getRootNode() as Document | ShadowRoot)
          .activeElement as HTMLElement | null;
        const input = this.renderRoot.querySelector<HTMLElement>('.search-input');
        (input ?? this.renderRoot.querySelector<HTMLElement>('.close-btn'))?.focus();
      } else {
        this._prevFocus?.focus();
        this._prevFocus = null;
      }
    }
  }

  private _trapFocus = (e: KeyboardEvent) => {
    if (e.key !== 'Tab') return;
    const focusables = Array.from(
      this.renderRoot.querySelectorAll<HTMLElement>(
        'button, input, [tabindex]:not([tabindex="-1"])'
      )
    ).filter((el) => !el.hasAttribute('disabled'));
    if (focusables.length === 0) return;
    const first = focusables[0]!;
    const last = focusables[focusables.length - 1]!;
    const active = (this.renderRoot as unknown as DocumentOrShadowRoot)
      .activeElement as HTMLElement | null;
    if (e.shiftKey && active === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && active === last) {
      e.preventDefault();
      first.focus();
    }
  };

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
        <div class="modal" role="dialog" aria-label="Keyboard shortcuts" aria-modal="true" @keydown=${this._trapFocus}>
          <div class="modal-header">
            <span class="modal-title">Keyboard Shortcuts</span>
            <button class="close-btn" aria-label="Close shortcuts" @click=${this._close}>${svg`<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>`}</button>
          </div>
          <input
            class="search-input"
            type="text"
            placeholder="Search shortcuts..."
            .value=${this._search}
            @input=${(e: Event) => { this._search = (e.target as HTMLInputElement).value; }}
            aria-label="Search shortcuts"
          />
          <div class="shortcuts-list">
            ${filtered.length === 0
              ? html`<div class="no-results">No shortcuts found</div>`
              : Array.from(grouped.entries()).map(([cat, items]) => html`
                <div class="category-label">${cat}</div>
                ${items.map(s => html`
                  <div class="shortcut-row">
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
