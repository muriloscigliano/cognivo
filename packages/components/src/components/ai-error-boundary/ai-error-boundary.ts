/**
 * @element ai-error-boundary
 * Error display card for AI failures with error code badge, expandable details, retry, and dismiss.
 *
 * @example
 * ```html
 * <ai-error-boundary
 *   error="Model returned an empty response"
 *   code="ERR_EMPTY_RESPONSE"
 *   details="Request ID: abc-123, latency: 4200ms"
 *   retryable
 * ></ai-error-boundary>
 * ```
 *
 * @fires {CustomEvent} ai-error-retry - Retry button clicked
 * @fires {CustomEvent} ai-error-dismiss - Dismiss button clicked
 */
import { LitElement, html, css, nothing } from 'lit';
import { property, state, customElement } from 'lit/decorators.js';
import { hostBlock, reducedMotion, fadeSlideInKeyframes } from '../../styles/index.js';

@customElement('ai-error-boundary')
export class AiErrorBoundary extends LitElement {
  static override styles = [hostBlock, reducedMotion, fadeSlideInKeyframes, css`
    :host {
      animation: fadeSlideIn var(--cg-transition-duration-default) var(--cg-transition-easing-ease-out) both;
    }
    :host([hidden]) { display: none; }

    .error-card {
      background: var(--cg-color-surface-container-background);
      border: var(--cg-border-width-50) solid var(--cg-color-ai-error-border);
      border-radius: var(--cg-border-radius-150);
      padding: var(--cg-spacing-16);
    }

    .header {
      display: flex;
      align-items: flex-start;
      gap: var(--cg-spacing-12);
      margin-bottom: var(--cg-spacing-12);
    }

    .icon {
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
      gap: var(--cg-spacing-8);
      flex-wrap: wrap;
    }

    .title {
      color: var(--cg-color-ai-error-text);
      font-size: var(--cg-font-size-sm);
      font-weight: var(--cg-font-weight-bold);
    }

    .code-badge {
      display: inline-block;
      padding: var(--cg-spacing-2) var(--cg-spacing-8);
      border-radius: var(--cg-border-radius-50);
      background: var(--cg-color-ai-error-background);
      color: var(--cg-color-ai-error-text);
      font-size: var(--cg-font-size-xs);
      font-weight: var(--cg-font-weight-bold);
      font-family: var(--cg-font-family-mono);
      letter-spacing: var(--cg-letter-spacing-wide);
    }

    .message {
      color: var(--cg-color-surface-base-text);
      font-size: var(--cg-font-size-sm);
      line-height: var(--cg-line-height-relaxed);
      margin-top: var(--cg-spacing-6);
    }

    .details-toggle {
      background: none;
      border: none;
      color: var(--cg-color-surface-container-outlined);
      font-size: var(--cg-font-size-xs);
      cursor: pointer;
      padding: var(--cg-spacing-4) 0;
      margin-top: var(--cg-spacing-8);
      font-family: inherit;
      text-decoration: underline;
      text-underline-offset: var(--cg-spacing-2);
    }
    .details-toggle:hover { color: var(--cg-color-surface-base-text); }
    .details-toggle:focus-visible {
      outline: none;
      box-shadow: 0 0 0 3px var(--cg-overlay-accent-strong);
      border-radius: var(--cg-border-radius-50);
    }

    .details {
      margin-top: var(--cg-spacing-8);
      padding: var(--cg-spacing-12);
      background: var(--cg-color-code-background);
      border-radius: var(--cg-border-radius-100);
      color: var(--cg-color-surface-container-outlined);
      font-size: var(--cg-font-size-xs);
      font-family: var(--cg-font-family-mono);
      line-height: var(--cg-line-height-relaxed);
      white-space: pre-wrap;
      word-break: break-word;
    }

    .actions {
      padding-top: var(--cg-spacing-12);
      border-top: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
      display: flex;
      gap: var(--cg-spacing-8);
      margin-top: var(--cg-spacing-16);
    }

    .btn {
      padding: var(--cg-spacing-8) var(--cg-spacing-16);
      border-radius: var(--cg-border-radius-100);
      font-size: var(--cg-font-size-sm);
      font-weight: var(--cg-font-weight-semibold);
      cursor: pointer;
      border: none;
      font-family: inherit;
      transition: filter var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
    }
    .btn:active:not(:disabled) { transform: scale(var(--cg-interaction-press-scale)); }
    .btn:focus-visible {
      outline: none;
      box-shadow: 0 0 0 3px var(--cg-overlay-accent-strong);
    }
    .btn:disabled {
      opacity: 0.4;
      cursor: default;
    }

    .retry-btn {
      background: var(--cg-color-action-primary-background-default);
      color: var(--cg-color-action-primary-text-default);
    }
    .retry-btn:hover:not(:disabled) { filter: brightness(1.1); }
    .retry-btn:disabled {
      opacity: 1;
      background: var(--cg-color-action-primary-background-disable);
      color: var(--cg-color-action-primary-text-disable);
    }

    .dismiss-btn {
      background: var(--cg-color-surface-container-background);
      color: var(--cg-color-surface-base-text);
      border: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
    }
    .dismiss-btn:hover:not(:disabled) { filter: brightness(1.2); }
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
          <span class="icon" aria-hidden="true"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/></svg></span>
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
