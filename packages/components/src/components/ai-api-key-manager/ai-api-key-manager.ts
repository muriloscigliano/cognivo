/**
 * @element ai-api-key-manager
 * API key management panel with masked display, copy, revoke, delete, and create controls.
 *
 * @example
 * ```html
 * <ai-api-key-manager
 *   .keys=${[{id:'1', name:'Production', prefix:'sk-abc', createdAt:'2024-01-15', status:'active'}]}
 *   maxKeys="5"
 * ></ai-api-key-manager>
 * ```
 *
 * @fires {CustomEvent} ai-key-create - Create button clicked
 * @fires {CustomEvent<{id: string, name: string}>} ai-key-revoke - Revoke button clicked
 * @fires {CustomEvent<{id: string, name: string}>} ai-key-delete - Delete button clicked
 *
 * @cssprop [--cg-color-accent=#dfff61] - Create button and focus ring color
 */
import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { hostBlock, reducedMotion, fadeSlideInKeyframes } from '../../styles/index.js';

export interface ApiKeyEntry {
  id: string;
  name: string;
  prefix: string;
  createdAt: string;
  lastUsed?: string;
  status: 'active' | 'revoked';
}

@customElement('ai-api-key-manager')
export class AiApiKeyManager extends LitElement {
  static override styles = [hostBlock, reducedMotion, fadeSlideInKeyframes, css`
    :host {
      background: var(--cg-color-surface-base, #18181b);
      background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0.03), transparent);
      color: var(--cg-color-surface-base-text, #fafafa);
      border: 1px solid var(--cg-color-border-default, #27272a);
      border-radius: var(--cg-radius-lg, 12px);
      padding: var(--cg-spacing-16, 16px);
      box-shadow: inset 0 1px 0 0 rgba(255, 255, 255, 0.05);
      animation: fadeSlideIn 200ms var(--cg-motion-easing-enter, cubic-bezier(0, 0, 0.2, 1)) both;
    }
    :host([hidden]) { display: none; }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: var(--cg-spacing-12, 12px);
    }

    .title {
      font-size: var(--cg-font-size-sm, 14px);
      font-weight: var(--cg-font-weight-semibold, 600);
      margin: 0;
    }

    .count {
      font-size: var(--cg-font-size-xs, 12px);
      color: var(--cg-color-text-tertiary, #71717a);
    }

    .create-btn {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      background: var(--cg-color-accent, #dfff61);
      color: #18181b;
      border: none;
      border-radius: var(--cg-radius-md, 8px);
      padding: 6px 12px;
      font-size: var(--cg-font-size-xs, 12px);
      font-weight: var(--cg-font-weight-semibold, 600);
      cursor: pointer;
      font-family: inherit;
    }

    .create-btn:focus-visible {
      outline: 2px solid var(--cg-color-accent, #dfff61);
      outline-offset: 2px;
    }

    .create-btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .key-list {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .key-item {
      display: flex;
      align-items: center;
      gap: var(--cg-spacing-12, 12px);
      padding: var(--cg-spacing-12, 12px);
      background: var(--cg-color-surface-overlay, #27272a);
      border-radius: var(--cg-radius-md, 8px);
      border: 1px solid var(--cg-color-border-default, #27272a);
    }

    .key-info {
      flex: 1;
      min-width: 0;
    }

    .key-name {
      font-size: var(--cg-font-size-sm, 14px);
      font-weight: var(--cg-font-weight-medium, 500);
      margin-bottom: 2px;
    }

    .key-prefix {
      font-family: var(--cg-font-family-mono, 'JetBrains Mono', monospace);
      font-size: var(--cg-font-size-xs, 12px);
      color: var(--cg-color-text-secondary, #a1a1aa);
    }

    .key-meta {
      font-size: 10px;
      color: var(--cg-color-text-tertiary, #71717a);
      margin-top: 4px;
      display: flex;
      gap: 8px;
    }

    .status-badge {
      display: inline-flex;
      align-items: center;
      padding: 2px 8px;
      border-radius: var(--cg-radius-full, 9999px);
      font-size: 10px;
      font-weight: var(--cg-font-weight-semibold, 600);
      text-transform: uppercase;
      letter-spacing: 0.05em;
      flex-shrink: 0;
    }

    .status-active {
      background: rgba(34, 197, 94, 0.15);
      color: #4ade80;
    }

    .status-revoked {
      background: rgba(239, 68, 68, 0.15);
      color: #f87171;
    }

    .actions {
      display: flex;
      gap: 4px;
      flex-shrink: 0;
    }

    .action-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 28px;
      height: 28px;
      background: transparent;
      border: 1px solid var(--cg-color-border-default, #3f3f46);
      border-radius: var(--cg-radius-sm, 4px);
      color: var(--cg-color-text-secondary, #a1a1aa);
      cursor: pointer;
      font-size: var(--cg-font-size-xs, 12px);
      font-family: inherit;
      padding: 0;
    }

    .action-btn:hover {
      background: var(--cg-color-surface-hover, #3f3f46);
      color: var(--cg-color-surface-base-text, #fafafa);
    }

    .action-btn:focus-visible {
      outline: 2px solid var(--cg-color-accent, #dfff61);
      outline-offset: 2px;
    }

    .action-btn.danger:hover {
      background: rgba(239, 68, 68, 0.15);
      color: #f87171;
      border-color: #f87171;
    }

    .copied-toast {
      font-size: 10px;
      color: var(--cg-color-accent, #dfff61);
      margin-left: 4px;
    }

    .empty {
      text-align: center;
      padding: 24px;
      color: var(--cg-color-text-tertiary, #71717a);
      font-size: var(--cg-font-size-sm, 14px);
    }
    }
  `];
  @property({ type: Array }) keys: ApiKeyEntry[] = [];
  @property({ type: Number }) maxKeys = 10;

  @state() private _copiedId: string | null = null;

  private _onCreate(): void {
    this.dispatchEvent(new CustomEvent('ai-key-create', {
      bubbles: true, composed: true,
    }));
  }

  private _onRevoke(key: ApiKeyEntry): void {
    this.dispatchEvent(new CustomEvent('ai-key-revoke', {
      bubbles: true, composed: true,
      detail: { id: key.id, name: key.name },
    }));
  }

  private _onDelete(key: ApiKeyEntry): void {
    this.dispatchEvent(new CustomEvent('ai-key-delete', {
      bubbles: true, composed: true,
      detail: { id: key.id, name: key.name },
    }));
  }

  private async _onCopy(key: ApiKeyEntry): Promise<void> {
    try {
      await navigator.clipboard.writeText(key.prefix);
      this._copiedId = key.id;
      setTimeout(() => { this._copiedId = null; }, 2000);
    } catch { /* clipboard not available */ }
  }

  override render() {
    const atLimit = this.keys.length >= this.maxKeys;

    return html`
      <div class="header">
        <div>
          <h3 class="title">API Keys</h3>
          <span class="count">${this.keys.length} / ${this.maxKeys} keys</span>
        </div>
        <button class="create-btn" ?disabled=${atLimit}
                @click=${this._onCreate}
                aria-label="Create new API key"
                tabindex="0">
          + Create Key
        </button>
      </div>
      ${this.keys.length === 0 ? html`
        <div class="empty" role="status">No API keys created yet.</div>
      ` : html`
        <div class="key-list" role="list" aria-label="API keys">
          ${this.keys.map(k => html`
            <div class="key-item" role="listitem">
              <div class="key-info">
                <div class="key-name">${k.name}</div>
                <div class="key-prefix">${k.prefix}...xxxx
                  ${this._copiedId === k.id ? html`<span class="copied-toast">Copied!</span>` : nothing}
                </div>
                <div class="key-meta">
                  <span>Created ${k.createdAt}</span>
                  ${k.lastUsed ? html`<span>Last used ${k.lastUsed}</span>` : nothing}
                </div>
              </div>
              <span class="status-badge status-${k.status}">${k.status}</span>
              <div class="actions">
                <button class="action-btn" @click=${() => this._onCopy(k)}
                        aria-label="Copy key prefix" tabindex="0"
                        title="Copy">&#x2398;</button>
                ${k.status === 'active' ? html`
                  <button class="action-btn" @click=${() => this._onRevoke(k)}
                          aria-label="Revoke key ${k.name}" tabindex="0"
                          title="Revoke">&#x2718;</button>
                ` : nothing}
                <button class="action-btn danger" @click=${() => this._onDelete(k)}
                        aria-label="Delete key ${k.name}" tabindex="0"
                        title="Delete">&#x1f5d1;</button>
              </div>
            </div>
          `)}
        </div>
      `}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ai-api-key-manager': AiApiKeyManager;
  }
}
