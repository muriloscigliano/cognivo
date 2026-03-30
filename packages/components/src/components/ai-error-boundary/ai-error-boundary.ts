/**
 * <ai-error-boundary> — Error Display with Retry for AI Failures
 *
 * Error icon, message, code badge, expandable details.
 * Retry and Dismiss buttons.
 * Keyboard accessible, aria-live for announcements.
 */
import { LitElement, html, css, nothing } from 'lit';
import { property, state, customElement } from 'lit/decorators.js';
import { hostBlock, reducedMotion } from '../../styles/index.js';

@customElement('ai-error-boundary')
export class AiErrorBoundary extends LitElement {
  static override styles = [hostBlock, reducedMotion, css`
    
    :host([hidden]) { display: none; }

    .error-card {
      background: var(--cg-color-bg-primary, #18181b);
      border: 1px solid #7f1d1d;
      border-radius: 12px;
      padding: 20px;
    }

    .header {
      display: flex;
      align-items: flex-start;
      gap: 12px;
      margin-bottom: 12px;
    }

    .icon {
      font-size: 24px;
      flex-shrink: 0;
      line-height: 1;
    }

    .header-content {
      flex: 1;
      min-width: 0;
    }

    .title-row {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
    }

    .title {
      color: #fca5a5;
      font-size: 15px;
      font-weight: 700;
    }

    .code-badge {
      display: inline-block;
      padding: 2px 8px;
      border-radius: 4px;
      background: rgba(239, 68, 68, 0.15);
      color: #fca5a5;
      font-size: 11px;
      font-weight: 700;
      font-family: var(--cg-font-family-mono, 'Fira Code', monospace);
      letter-spacing: 0.5px;
    }

    .message {
      color: var(--cg-color-text-secondary, #a1a1aa);
      font-size: 14px;
      line-height: 1.5;
      margin-top: 6px;
    }

    .details-toggle {
      background: none;
      border: none;
      color: var(--cg-color-text-secondary, #a1a1aa);
      font-size: 12px;
      cursor: pointer;
      padding: 4px 0;
      margin-top: 8px;
      font-family: inherit;
      text-decoration: underline;
      text-underline-offset: 2px;
    }
    .details-toggle:hover { color: var(--cg-color-text-primary, #fafafa); }
    .details-toggle:focus-visible {
      outline: 2px solid var(--cg-brand-ai-accent, #dfff61);
      outline-offset: 2px;
    }

    .details {
      margin-top: 10px;
      padding: 12px;
      background: var(--cg-color-bg-secondary, #27272a);
      border-radius: 8px;
      color: var(--cg-color-text-secondary, #a1a1aa);
      font-size: 12px;
      font-family: var(--cg-font-family-mono, 'Fira Code', monospace);
      line-height: 1.6;
      white-space: pre-wrap;
      word-break: break-word;
    }

    .actions {
      display: flex;
      gap: 10px;
      margin-top: 16px;
    }

    .btn {
      padding: 8px 20px;
      border-radius: 8px;
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      border: none;
      font-family: inherit;
      transition: filter 150ms ease;
    }
    .btn:focus-visible {
      outline: 2px solid var(--cg-brand-ai-accent, #dfff61);
      outline-offset: 2px;
    }
    .btn:disabled {
      opacity: 0.4;
      cursor: default;
    }

    .retry-btn {
      background: var(--cg-brand-ai-accent, #dfff61);
      color: #18181b;
    }
    .retry-btn:hover:not(:disabled) { filter: brightness(1.1); }

    .dismiss-btn {
      background: var(--cg-color-bg-secondary, #27272a);
      color: var(--cg-color-text-primary, #fafafa);
      border: 1px solid var(--cg-color-border-primary, #3f3f46);
    }
    .dismiss-btn:hover:not(:disabled) { filter: brightness(1.2); }
    }
  `];
  @property({ type: String }) error = '';
  @property({ type: String }) code = '';
  @property({ type: Boolean }) retryable = true;
  @property({ type: String }) details = '';

  @state() private _showDetails = false;

  private _emit(name: string) {
    this.dispatchEvent(new CustomEvent(name, { bubbles: true, composed: true }));
  }

  override render() {
    if (!this.error) return nothing;

    return html`
      <div class="error-card" role="alert" aria-live="assertive">
        <div class="header">
          <span class="icon" aria-hidden="true">⚠️</span>
          <div class="header-content">
            <div class="title-row">
              <span class="title">Something went wrong</span>
              ${this.code ? html`<span class="code-badge">${this.code}</span>` : nothing}
            </div>
            <div class="message">${this.error}</div>

            ${this.details ? html`
              <button
                class="details-toggle"
                aria-expanded=${this._showDetails}
                @click=${() => { this._showDetails = !this._showDetails; }}
              >${this._showDetails ? 'Hide details' : 'Show details'}</button>
              ${this._showDetails ? html`<div class="details">${this.details}</div>` : nothing}
            ` : nothing}
          </div>
        </div>

        <div class="actions">
          ${this.retryable ? html`
            <button class="btn retry-btn" @click=${() => this._emit('ai-error-retry')}>
              Retry
            </button>
          ` : nothing}
          <button class="btn dismiss-btn" @click=${() => this._emit('ai-error-dismiss')}>
            Dismiss
          </button>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ai-error-boundary': AiErrorBoundary;
  }
}
