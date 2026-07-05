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
      background: var(--cg-color-surface-base-background);
      color: var(--cg-color-surface-base-text);
      border: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
      border-radius: var(--cg-border-radius-150);
      padding: var(--cg-spacing-16);
      animation: fadeSlideIn var(--cg-transition-duration-default) var(--cg-transition-easing-ease-out) both;
    }
    :host([hidden]) { display: none; }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: var(--cg-spacing-12);
      border-bottom: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
      margin-bottom: var(--cg-spacing-12);
    }

    .title {
      font-size: var(--cg-font-size-sm);
      font-weight: var(--cg-font-weight-semibold);
      margin: 0;
    }

    .count {
      font-size: var(--cg-font-size-xs);
      color: var(--cg-color-input-text-placeholder);
    }

    .create-btn {
      display: inline-flex;
      align-items: center;
      gap: var(--cg-spacing-4);
      background: var(--cg-color-action-primary-background-default);
      color: var(--cg-color-action-primary-text-default);
      border: none;
      border-radius: var(--cg-border-radius-100);
      padding: var(--cg-spacing-6) var(--cg-spacing-12);
      font-size: var(--cg-font-size-xs);
      font-weight: var(--cg-font-weight-semibold);
      cursor: pointer;
      font-family: inherit;
      transition:
        background-color var(--cg-transition-duration-default) var(--cg-transition-easing-ease-out),
        color var(--cg-transition-duration-default) var(--cg-transition-easing-ease-out);
    }

    .create-btn:focus-visible {
      outline: var(--cg-border-width-100) solid var(--cg-color-focus-ring);
      outline-offset: var(--cg-outline-offset-default);
    }

    .create-btn:hover:not(:disabled) {
      background: var(--cg-color-action-primary-background-hover);
    }
    .create-btn:active:not(:disabled) {
      background: var(--cg-color-action-primary-background-active);
      transform: scale(var(--cg-interaction-press-scale));
    }
    .create-btn:disabled {
      background: var(--cg-color-action-primary-background-disable);
      color: var(--cg-color-action-primary-text-disable);
      cursor: not-allowed;
    }

    .key-list {
      display: flex;
      flex-direction: column;
      gap: var(--cg-spacing-8);
    }

    .key-item {
      display: flex;
      align-items: center;
      gap: var(--cg-spacing-12);
      padding: var(--cg-spacing-12);
      background: var(--cg-color-surface-cards-background);
      border-radius: var(--cg-border-radius-100);
      border: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
    }

    .key-info {
      flex: 1;
      min-width: 0;
    }

    .key-name {
      font-size: var(--cg-font-size-sm);
      font-weight: var(--cg-font-weight-medium);
      margin-bottom: var(--cg-spacing-2);
    }

    .key-prefix {
      font-family: var(--cg-font-family-mono);
      font-size: var(--cg-font-size-xs);
      color: var(--cg-color-input-text-placeholder);
    }

    .key-meta {
      font-size: var(--cg-font-size-xs);
      color: var(--cg-color-input-text-placeholder);
      margin-top: var(--cg-spacing-4);
      display: flex;
      gap: var(--cg-spacing-8);
    }

    .status-badge {
      display: inline-flex;
      align-items: center;
      padding: var(--cg-spacing-2) var(--cg-spacing-8);
      border-radius: var(--cg-border-radius-full);
      font-size: var(--cg-font-size-xs);
      font-weight: var(--cg-font-weight-semibold);
      text-transform: uppercase;
      letter-spacing: var(--cg-letter-spacing-wider);
      flex-shrink: 0;
    }

    .status-active {
      background: var(--cg-color-status-success-background-default);
      color: var(--cg-color-status-success-text-default);
    }

    .status-revoked {
      background: var(--cg-color-status-error-background-default);
      color: var(--cg-color-status-error-text-default);
    }

    .actions {
      display: flex;
      gap: var(--cg-spacing-4);
      flex-shrink: 0;
    }

    .action-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: var(--cg-spacing-24);
      height: var(--cg-spacing-24);
      background: transparent;
      border: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
      border-radius: var(--cg-border-radius-50);
      color: var(--cg-color-input-text-placeholder);
      cursor: pointer;
      font-size: var(--cg-font-size-xs);
      font-family: inherit;
      padding: 0;
      transition:
        background-color var(--cg-transition-duration-default) var(--cg-transition-easing-ease-out),
        color var(--cg-transition-duration-default) var(--cg-transition-easing-ease-out),
        border-color var(--cg-transition-duration-default) var(--cg-transition-easing-ease-out);
    }

    .action-btn svg {
      width: var(--cg-icon-size-100);
      height: var(--cg-icon-size-100);
    }

    .action-btn:active {
      transform: scale(var(--cg-interaction-press-scale));
    }

    .action-btn:hover {
      background: var(--cg-color-surface-cards-hover-background);
      color: var(--cg-color-surface-base-text);
    }

    .action-btn:focus-visible {
      outline: var(--cg-border-width-100) solid var(--cg-color-focus-ring);
      outline-offset: var(--cg-outline-offset-default);
    }

    .action-btn.danger:hover {
      background: var(--cg-color-status-error-background-default);
      color: var(--cg-color-status-error-text-default);
      border-color: var(--cg-color-status-error-border-default);
    }

    .copied-toast {
      font-size: var(--cg-font-size-xs);
      color: var(--cg-color-surface-base-text);
      margin-left: var(--cg-spacing-4);
    }

    .empty {
      text-align: center;
      padding: var(--cg-spacing-24);
      color: var(--cg-color-input-text-placeholder);
      font-size: var(--cg-font-size-sm);
    }

    .sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border: 0;
    }
  `];
  @property({ type: Array }) keys: ApiKeyEntry[] = [];
  @property({ type: Number }) maxKeys = 10;

  @state() private _copiedId: string | null = null;

  private _copiedTimer?: ReturnType<typeof setTimeout>;

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    clearTimeout(this._copiedTimer);
  }

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
      clearTimeout(this._copiedTimer);
      this._copiedId = key.id;
      this._copiedTimer = setTimeout(() => { this._copiedId = null; }, 2000);
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
                aria-label="Create new API key">
          + Create Key
        </button>
      </div>
      <div class="sr-only" role="status" aria-live="polite" aria-atomic="true">${this._copiedId ? 'Key prefix copied to clipboard' : ''}</div>
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
                        aria-label="Copy key prefix for ${k.name}"
                        title="Copy">
                  <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                    <path d="M5 2h7a1 1 0 0 1 1 1v8h-1.5V3.5H5V2ZM3 4.5h7a1 1 0 0 1 1 1V13a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5.5a1 1 0 0 1 1-1Zm.5 1.5v6.5h6V6h-6Z"/>
                  </svg>
                </button>
                ${k.status === 'active' ? html`
                  <button class="action-btn" @click=${() => this._onRevoke(k)}
                          aria-label="Revoke key ${k.name}"
                          title="Revoke">
                    <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                      <path d="M4.28 3.22 8 6.94l3.72-3.72 1.06 1.06L9.06 8l3.72 3.72-1.06 1.06L8 9.06l-3.72 3.72-1.06-1.06L6.94 8 3.22 4.28l1.06-1.06Z"/>
                    </svg>
                  </button>
                ` : nothing}
                <button class="action-btn danger" @click=${() => this._onDelete(k)}
                        aria-label="Delete key ${k.name}"
                        title="Delete">
                  <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                    <path d="M6 2h4l.5 1H14v1.5H2V3h3.5L6 2ZM3.5 6h9L12 14a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1L3.5 6Zm2.2 1.5.3 5.5h1.2l-.3-5.5H5.7Zm3.4 0-.3 5.5h1.2l.3-5.5H9.1Z"/>
                  </svg>
                </button>
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
