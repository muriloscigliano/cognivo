/**
 * @element ai-memory-panel
 * Agent memory viewer. Three variants: default (full panel), compact (sidebar), inline (no container).
 *
 * @fires {CustomEvent<{id: string, type: string}>} ai-memory-delete
 * @fires {CustomEvent<{id: string, pinned: boolean}>} ai-memory-pin
 * @fires {CustomEvent<{query: string}>} ai-memory-search
 */
import { LitElement, html, css, nothing } from 'lit';
import { property, state, customElement } from 'lit/decorators.js';
import { hostBlock, reducedMotion } from '../../styles/index.js';

export interface Memory {
  id: string;
  content: string;
  type: 'fact' | 'preference' | 'instruction' | 'context';
  timestamp: number;
  relevance?: number;
  pinned?: boolean;
}

@customElement('ai-memory-panel')
export class AiMemoryPanel extends LitElement {
  static override styles = [hostBlock, reducedMotion, css`

    /* ── Default variant — bordered panel ── */
    .panel {
      background: var(--cg-color-surface-cards-background);
      border: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
      border-radius: var(--cg-border-radius-100);
      overflow: hidden;
    }

    /* ── Rounded ── */
    :host([rounded="none"]) .panel { border-radius: 0; }
    :host([rounded="sm"]) .panel { border-radius: var(--cg-border-radius-50); }
    :host([rounded="md"]) .panel { border-radius: var(--cg-border-radius-100); }
    :host([rounded="lg"]) .panel { border-radius: var(--cg-border-radius-150); }

    /* ── Inline variant — no container ── */
    :host([variant="inline"]) .panel {
      background: transparent;
      border: none;
      border-radius: 0;
    }

    /* ── Tabs ── */
    .tabs {
      display: flex;
      border-bottom: var(--cg-border-width-50) solid var(--cg-color-surface-cards-divider);
    }
    .tab {
      flex: 1; padding: var(--cg-spacing-16) var(--cg-spacing-20); text-align: center;
      font-size: var(--cg-font-size-sm); font-weight: var(--cg-font-weight-medium);
      color: var(--cg-color-surface-container-outlined);
      background: none; border: none;
      border-bottom: var(--cg-border-width-100) solid transparent;
      cursor: pointer; font-family: inherit;
      transition: color var(--cg-motion-duration-fast) var(--cg-motion-easing-default);
    }
    .tab:hover { color: var(--cg-color-surface-base-text); }
    .tab.active {
      color: var(--cg-color-action-primary-background-default);
      border-bottom-color: var(--cg-color-action-primary-background-default);
      font-weight: var(--cg-font-weight-semibold);
    }
    .tab-count {
      font-size: var(--cg-font-size-xs);
      margin-left: var(--cg-spacing-4);
      opacity: 0.5;
    }

    /* ── Search ── */
    .search-row { padding: var(--cg-spacing-16) var(--cg-spacing-20); }
    .search-input {
      width: 100%; box-sizing: border-box;
      padding: var(--cg-spacing-12) var(--cg-spacing-16);
      border-radius: var(--cg-border-radius-100);
      border: var(--cg-border-width-50) solid var(--cg-color-surface-cards-divider);
      background: transparent; color: var(--cg-color-surface-base-text);
      font: inherit; font-size: var(--cg-font-size-xs); outline: none;
    }
    .search-input:focus { border-color: var(--cg-color-input-border-focus); }
    .search-input::placeholder { color: var(--cg-color-surface-container-outlined); }

    /* ── Memory list ── */
    .memories { max-height: 320px; overflow-y: auto; padding: var(--cg-spacing-12) 0; }

    .memory {
      display: flex; flex-direction: column; gap: var(--cg-spacing-8);
      padding: var(--cg-spacing-16) var(--cg-spacing-20);
      border-radius: var(--cg-border-radius-50);
      margin: 0 var(--cg-spacing-8);
      transition: background var(--cg-motion-duration-fast) var(--cg-motion-easing-default);
      position: relative;
    }
    .memory:hover { background: var(--cg-overlay-dark-subtle); }
    .memory.pinned { background: var(--cg-overlay-accent-subtle); }

    .memory-row {
      display: flex; align-items: center; gap: var(--cg-spacing-12);
    }

    .memory-type {
      font-size: var(--cg-font-size-xs);
      color: var(--cg-color-action-primary-background-default);
      font-weight: var(--cg-font-weight-medium);
      flex-shrink: 0;
    }

    .memory-meta {
      font-size: var(--cg-font-size-xs); color: var(--cg-color-surface-container-outlined);
      margin-left: auto; flex-shrink: 0;
    }

    .memory-content {
      font-size: var(--cg-font-size-sm); color: var(--cg-color-surface-base-text);
      line-height: var(--cg-line-height-snug);
    }

    /* ── Actions — show on hover ── */
    .memory-actions {
      position: absolute; top: var(--cg-spacing-8); right: var(--cg-spacing-16);
      display: flex; gap: var(--cg-spacing-2);
      opacity: 0; transition: opacity var(--cg-motion-duration-fast) var(--cg-motion-easing-default);
    }
    .memory:hover .memory-actions { opacity: 1; }

    .mem-btn {
      width: var(--cg-spacing-20); height: var(--cg-spacing-20);
      background: transparent; border: none;
      color: var(--cg-color-surface-container-outlined); cursor: pointer;
      display: flex; align-items: center; justify-content: center; padding: 0;
      border-radius: var(--cg-border-radius-50);
      transition: color var(--cg-motion-duration-fast) var(--cg-motion-easing-default);
    }
    .mem-btn svg { width: var(--cg-spacing-12); height: var(--cg-spacing-12); }
    .mem-btn:hover { color: var(--cg-color-surface-base-text); }
    .mem-btn:focus-visible { outline: none; box-shadow: 0 0 0 3px var(--cg-overlay-accent-strong); opacity: 1; }
    .mem-btn.pinned-btn { color: var(--cg-color-action-primary-background-default); opacity: 1; }

    .empty {
      padding: var(--cg-spacing-24) var(--cg-spacing-20);
      text-align: center; color: var(--cg-color-surface-container-outlined);
      font-size: var(--cg-font-size-xs);
    }

    /* ── Compact variant ── */
    :host([variant="compact"]) .search-row { display: none; }
    :host([variant="compact"]) .memory { padding: var(--cg-spacing-6) var(--cg-spacing-12); }
    :host([variant="compact"]) .memory-content { font-size: var(--cg-font-size-xs); }
    :host([variant="compact"]) .memory-type { display: none; }
  `];

  @property({ reflect: true }) variant: 'default' | 'compact' | 'inline' = 'default';
  @property({ reflect: true }) rounded: 'none' | 'sm' | 'md' | 'lg' = 'md';
  @property({ type: Array }) shortTerm: Memory[] = [];
  @property({ type: Array }) longTerm: Memory[] = [];
  @property({ type: Boolean }) searchable = true;

  @state() private _activeTab: 'short' | 'long' = 'short';
  @state() private _search = '';
  private _searchTimer?: ReturnType<typeof setTimeout>;

  private get _activeMemories(): Memory[] {
    const list = this._activeTab === 'short' ? this.shortTerm : this.longTerm;
    if (!this._search) return list;
    const q = this._search.toLowerCase();
    return list.filter(m => m.content.toLowerCase().includes(q));
  }

  private _formatTime(ts: number): string {
    const diff = Date.now() - ts;
    if (diff < 60000) return 'just now';
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
    return new Date(ts).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }

  override render() {
    const memories = this._activeMemories;

    return html`
      <div class="panel" role="region" aria-label="Agent memory">
        <div class="tabs">
          <button class="tab ${this._activeTab === 'short' ? 'active' : ''}" @click=${() => { this._activeTab = 'short'; }}>
            Short-term<span class="tab-count">${this.shortTerm.length}</span>
          </button>
          <button class="tab ${this._activeTab === 'long' ? 'active' : ''}" @click=${() => { this._activeTab = 'long'; }}>
            Long-term<span class="tab-count">${this.longTerm.length}</span>
          </button>
        </div>

        ${this.searchable && this.variant !== 'compact' ? html`
          <div class="search-row">
            <input class="search-input" type="text" placeholder="Search..."
              .value=${this._search}
              @input=${(e: Event) => {
                this._search = (e.target as HTMLInputElement).value;
                if (this._searchTimer) clearTimeout(this._searchTimer);
                this._searchTimer = setTimeout(() => {
                  this.dispatchEvent(new CustomEvent('ai-memory-search', { bubbles: true, composed: true, detail: { query: this._search } }));
                }, 250);
              }} />
          </div>
        ` : nothing}

        <div class="memories">
          ${memories.length === 0 ? html`
            <div class="empty">${this._search ? 'No matches' : 'No memories yet'}</div>
          ` : memories.map(m => html`
            <div class="memory ${m.pinned ? 'pinned' : ''}">
              <div class="memory-row">
                <span class="memory-type">${m.type}</span>
                <span class="memory-meta">${this._formatTime(m.timestamp)}</span>
              </div>
              <div class="memory-content">${m.content}</div>
              <div class="memory-actions">
                <button class="mem-btn ${m.pinned ? 'pinned-btn' : ''}"
                  @click=${() => this.dispatchEvent(new CustomEvent('ai-memory-pin', { bubbles: true, composed: true, detail: { id: m.id, pinned: !m.pinned } }))}
                  aria-label="${m.pinned ? 'Unpin' : 'Pin'}">
                  <svg viewBox="0 0 24 24" fill="${m.pinned ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 17v5m-4-9.26a2 2 0 01.88-1.66L12 9l3.12 2.08a2 2 0 01.88 1.66V15H8v-2.26zM9 9V4a1 1 0 011-1h4a1 1 0 011 1v5"/></svg>
                </button>
                <button class="mem-btn"
                  @click=${() => this.dispatchEvent(new CustomEvent('ai-memory-delete', { bubbles: true, composed: true, detail: { id: m.id, type: this._activeTab } }))}
                  aria-label="Delete">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
                </button>
              </div>
            </div>
          `)}
        </div>
      </div>
    `;
  }
}
