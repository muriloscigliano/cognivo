/**
 * <ai-memory-panel> — Agent Memory Display
 *
 * Short-term (conversation) vs long-term (persisted) memories.
 * Search, delete, pin. Memory type badges.
 */
import { LitElement, html, css, nothing } from 'lit';
import { property, state, customElement } from 'lit/decorators.js';

interface Memory {
  id: string;
  content: string;
  type: 'fact' | 'preference' | 'instruction' | 'context';
  timestamp: number;
  relevance?: number;
  pinned?: boolean;
}

@customElement('ai-memory-panel')
export class AiMemoryPanel extends LitElement {
  static override styles = css`
    :host {
      display: block;
      font-family: var(--cg-font-family-primary, 'Inter Variable', 'Inter', -apple-system, sans-serif);
    }

    .panel {
      background: var(--cg-color-surface-container-background, #18181b);
      border: 1px solid var(--cg-color-surface-container-border, #27272a);
      border-radius: 12px;
      overflow: hidden;
    }

    .header {
      display: flex; align-items: center; justify-content: space-between;
      padding: 12px 16px;
      border-bottom: 1px solid var(--cg-gray-800, #27272a);
    }
    .header-title {
      font-size: 12px; font-weight: 700; color: var(--cg-gray-400, #a1a1aa);
      text-transform: uppercase; letter-spacing: 0.05em;
    }

    /* Tabs */
    .tabs {
      display: flex; border-bottom: 1px solid var(--cg-gray-800, #27272a);
    }
    .tab {
      flex: 1; padding: 8px 16px; text-align: center;
      font-size: 12px; font-weight: 600; color: var(--cg-gray-500, #71717a);
      background: none; border: none; border-bottom: 2px solid transparent;
      cursor: pointer; font-family: inherit; transition: all 150ms;
    }
    .tab:hover { color: var(--cg-gray-300, #d4d4d8); }
    .tab.active { color: var(--cg-brand-ai-accent, #dfff61); border-bottom-color: var(--cg-brand-ai-accent, #dfff61); }
    .tab-count {
      font-size: 10px; padding: 0 5px; border-radius: 8px;
      background: var(--cg-gray-800, #27272a); margin-left: 4px;
    }

    /* Search */
    .search-row { padding: 8px 16px; border-bottom: 1px solid var(--cg-gray-800, #27272a); }
    .search-input {
      width: 100%; padding: 6px 10px; border-radius: 6px;
      border: 1px solid var(--cg-gray-700, #3f3f46);
      background: var(--cg-color-surface-base-background, #09090b);
      color: var(--cg-color-surface-base-text, #fafafa);
      font: inherit; font-size: 12px; outline: none;
    }
    .search-input:focus { border-color: var(--cg-brand-ai-accent, #dfff61); }
    .search-input::placeholder { color: var(--cg-gray-600, #52525b); }

    /* Memory list */
    .memories { max-height: 350px; overflow-y: auto; }

    .memory {
      display: flex; align-items: flex-start; gap: 10px;
      padding: 10px 16px;
      border-bottom: 1px solid var(--cg-gray-800, #27272a);
      transition: background 100ms;
    }
    .memory:hover { background: rgba(255, 255, 255, 0.02); }
    .memory:last-child { border-bottom: none; }
    .memory.pinned { background: rgba(223, 255, 97, 0.03); }

    .memory-type {
      font-size: 9px; font-weight: 700; padding: 2px 6px; border-radius: 3px;
      text-transform: uppercase; flex-shrink: 0; margin-top: 2px;
    }
    .memory-type.fact { background: rgba(59, 130, 246, 0.12); color: #60a5fa; }
    .memory-type.preference { background: rgba(139, 92, 246, 0.12); color: #a78bfa; }
    .memory-type.instruction { background: rgba(245, 158, 11, 0.12); color: #fbbf24; }
    .memory-type.context { background: rgba(34, 197, 94, 0.12); color: #4ade80; }

    .memory-content {
      flex: 1; min-width: 0;
      font-size: 13px; color: var(--cg-color-surface-base-text, #fafafa); line-height: 1.4;
    }
    .memory-meta {
      font-size: 10px; color: var(--cg-gray-500, #71717a); margin-top: 3px;
    }

    .memory-actions {
      display: flex; gap: 2px; flex-shrink: 0;
      opacity: 0; transition: opacity 150ms;
    }
    .memory:hover .memory-actions { opacity: 1; }
    .mem-btn {
      width: 22px; height: 22px; border-radius: 5px;
      background: none; border: 1px solid var(--cg-gray-700, #3f3f46);
      color: var(--cg-gray-500, #71717a); cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      font-size: 10px; padding: 0; transition: all 150ms;
    }
    .mem-btn:hover { color: var(--cg-color-surface-base-text, #fafafa); background: var(--cg-gray-800, #27272a); }
    .mem-btn.pinned-btn { color: var(--cg-brand-ai-accent, #dfff61); }

    .empty { padding: 32px; text-align: center; color: var(--cg-gray-500, #71717a); font-size: 13px; }

    @media (prefers-reduced-motion: reduce) {
      .tab, .memory, .mem-btn, .memory-actions { transition: none; }
    }
  

    :focus-visible {
      outline: none;
      box-shadow: 0 0 0 2px var(--cg-color-surface-base-background, #09090b), 0 0 0 4px var(--cg-brand-ai-accent, #dfff61);
    }
  `;

  @property({ type: Array }) shortTerm: Memory[] = [];
  @property({ type: Array }) longTerm: Memory[] = [];
  @property({ type: Boolean }) searchable: boolean = true;

  @state() private _activeTab: 'short' | 'long' = 'short';
  private _searchTimer?: ReturnType<typeof setTimeout>;
  @state() private _search: string = '';

  private get _activeMemories(): Memory[] {
    const list = this._activeTab === 'short' ? this.shortTerm : this.longTerm;
    if (!this._search) return list;
    const q = this._search.toLowerCase();
    return list.filter(m => m.content.toLowerCase().includes(q));
  }

  private _formatTime(ts: number): string {
    const d = new Date(ts);
    const now = Date.now();
    const diff = now - ts;
    if (diff < 60000) return 'just now';
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }

  private _handleDelete(memory: Memory) {
    this.dispatchEvent(new CustomEvent('ai-memory-delete', {
      bubbles: true, composed: true,
      detail: { id: memory.id, type: this._activeTab },
    }));
  }

  private _handlePin(memory: Memory) {
    this.dispatchEvent(new CustomEvent('ai-memory-pin', {
      bubbles: true, composed: true,
      detail: { id: memory.id, pinned: !memory.pinned },
    }));
  }

  override render() {
    const memories = this._activeMemories;

    return html`
      <div class="panel" role="region" aria-label="Agent memory">
        <div class="header">
          <span class="header-title">Agent Memory</span>
        </div>

        <div class="tabs">
          <button class="tab ${this._activeTab === 'short' ? 'active' : ''}"
            @click=${() => { this._activeTab = 'short'; }}>
            Short-term<span class="tab-count">${this.shortTerm.length}</span>
          </button>
          <button class="tab ${this._activeTab === 'long' ? 'active' : ''}"
            @click=${() => { this._activeTab = 'long'; }}>
            Long-term<span class="tab-count">${this.longTerm.length}</span>
          </button>
        </div>

        ${this.searchable ? html`
          <div class="search-row">
            <input class="search-input" type="text" placeholder="Search memories..."
              .value=${this._search}
              @input=${(e: Event) => {
                this._search = (e.target as HTMLInputElement).value;
                // Debounce event dispatch
                if (this._searchTimer) clearTimeout(this._searchTimer);
                this._searchTimer = setTimeout(() => {
                  this.dispatchEvent(new CustomEvent('ai-memory-search', { bubbles: true, composed: true, detail: { query: this._search } }));
                }, 250);
              }} />
          </div>
        ` : nothing}

        <div class="memories">
          ${memories.length === 0 ? html`
            <div class="empty">${this._search ? 'No matching memories' : 'No memories stored'}</div>
          ` : memories.map(m => html`
            <div class="memory ${m.pinned ? 'pinned' : ''}">
              <span class="memory-type ${m.type}">${m.type}</span>
              <div class="memory-content">
                ${m.content}
                <div class="memory-meta">${this._formatTime(m.timestamp)}${m.relevance ? ` · ${Math.round(m.relevance * 100)}% relevant` : ''}</div>
              </div>
              <div class="memory-actions">
                <button class="mem-btn ${m.pinned ? 'pinned-btn' : ''}" @click=${() => this._handlePin(m)}
                  title="${m.pinned ? 'Unpin' : 'Pin'}" aria-label="${m.pinned ? 'Unpin' : 'Pin'} memory">📌</button>
                <button class="mem-btn" @click=${() => this._handleDelete(m)} title="Delete" aria-label="Delete memory">✕</button>
              </div>
            </div>
          `)}
        </div>
      </div>
    `;
  }
}
