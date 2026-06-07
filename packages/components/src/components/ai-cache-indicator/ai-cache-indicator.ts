/**
 * @element ai-cache-indicator
 * Compact inline cache status indicator with optional expanded detail card.
 *
 * @example
 * ```html
 * <ai-cache-indicator status="hit" hitRate="87" latencySaved="240ms" cacheAge="2m ago"></ai-cache-indicator>
 * ```
 *
 * @fires {CustomEvent} ai-cache-clear - Clear cache clicked
 * @fires {CustomEvent<{status, hitRate}>} ai-cache-detail - Detail panel toggled
 *
 * @cssprop [--cg-brand-ai-accent=#dfff61] - Accent for hit rate bar
 */
import { LitElement, html, css, nothing } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { hostBlock, reducedMotion, fadeSlideInKeyframes } from '../../styles/index.js';

@customElement('ai-cache-indicator')
export class AiCacheIndicator extends LitElement {
  static override styles = [hostBlock, reducedMotion, fadeSlideInKeyframes, css`
    :host {
      display: inline-flex;
    }
    :host([hidden]) { display: none; }

    .pill {
      display: inline-flex;
      align-items: center;
      gap: var(--cg-spacing-6);
      padding: var(--cg-spacing-4) var(--cg-spacing-12);
      background: var(--cg-color-surface-cards-background);
      border: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
      border-radius: var(--cg-border-radius-full);
      cursor: pointer;
      transition: border-color var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
      font-size: var(--cg-font-size-xs);
      color: var(--cg-color-input-text-placeholder);
    }
    .pill:hover {
      border-color: var(--cg-color-surface-cards-border);
    }
    .pill:focus-visible {
      outline: none;
      box-shadow: 0 0 0 3px var(--cg-overlay-accent-strong);
    }

    .dot {
      width: var(--cg-spacing-8);
      height: var(--cg-spacing-8);
      border-radius: var(--cg-border-radius-full);
      flex-shrink: 0;
    }
    .dot.hit { background: var(--cg-color-ai-cached-text); }
    .dot.miss { background: var(--cg-color-status-error-text-default); }
    .dot.stale { background: var(--cg-color-status-warning-text-default); }
    .dot.disabled { background: var(--cg-color-input-text-placeholder); }
    .dot.loading { background: var(--cg-color-status-info-text-default); }

    .status-text {
      font-weight: var(--cg-font-weight-semibold);
      text-transform: capitalize;
    }

    /* ── Detail card ── */
    .detail-card {
      margin-top: var(--cg-spacing-8);
      background: var(--cg-color-surface-cards-background);
      border: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
      border-radius: var(--cg-border-radius-200);
      padding: var(--cg-spacing-16);
      color: var(--cg-color-surface-base-text);
      animation: fadeSlideIn var(--cg-transition-duration-default) var(--cg-transition-easing-ease-out) both;
      min-width: var(--cg-spacing-256);
    }

    .detail-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: var(--cg-spacing-6) 0;
    }

    .detail-label {
      font-size: var(--cg-font-size-xs);
      color: var(--cg-color-input-text-placeholder);
    }

    .detail-value {
      font-size: var(--cg-font-size-sm);
      font-weight: var(--cg-font-weight-semibold);
    }

    /* ── Hit rate bar ── */
    .rate-bar-track {
      height: var(--cg-spacing-6);
      background: var(--cg-color-surface-cards-divider);
      border-radius: var(--cg-border-radius-50);
      overflow: hidden;
      margin-top: var(--cg-spacing-6);
    }

    .rate-bar-fill {
      height: 100%;
      background: var(--cg-color-ai-cached-text);
      border-radius: var(--cg-border-radius-50);
      transition: width var(--cg-transition-duration-slow) var(--cg-transition-easing-default);
    }

    .divider {
      height: var(--cg-border-width-50);
      background: var(--cg-color-surface-cards-divider);
      margin: var(--cg-spacing-12) 0;
    }

    .clear-btn {
      width: 100%;
      background: transparent;
      border: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
      color: var(--cg-color-input-text-placeholder);
      font-size: var(--cg-font-size-xs);
      font-weight: var(--cg-font-weight-semibold);
      padding: var(--cg-spacing-8);
      border-radius: var(--cg-border-radius-100);
      cursor: pointer;
      transition: border-color var(--cg-transition-duration-fast) var(--cg-transition-easing-default),
                  color var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
    }
    .clear-btn:hover {
      border-color: var(--cg-color-status-error-text-default);
      color: var(--cg-color-status-error-text-default);
    }
    .clear-btn:focus-visible {
      outline: none;
      box-shadow: 0 0 0 3px var(--cg-overlay-accent-strong);
    }

    @media (prefers-reduced-motion: reduce) {
      .detail-card { animation: none; }
    }

    .wrapper {
      display: inline-flex;
      flex-direction: column;
    }
  `];

  @property({ type: String }) status: 'hit' | 'miss' | 'stale' | 'disabled' | 'loading' = 'disabled';
  @property({ type: Number }) hitRate = 0;
  @property({ type: String }) latencySaved = '';
  @property({ type: String }) cacheAge = '';
  @property({ type: Boolean }) showDetails = false;

  private _toggleDetails() {
    this.showDetails = !this.showDetails;
    this.dispatchEvent(new CustomEvent('ai-cache-detail', {
      detail: { status: this.status, hitRate: this.hitRate },
      bubbles: true, composed: true,
    }));
  }

  private _onClear() {
    this.dispatchEvent(new CustomEvent('ai-cache-clear', {
      bubbles: true, composed: true,
    }));
  }

  override render() {
    return html`
      <div class="wrapper">
        <button
          class="pill"
          @click=${this._toggleDetails}
          aria-expanded=${this.showDetails}
          aria-label="Cache status: ${this.status}"
        >
          <span class="dot ${this.status}"></span>
          <span class="status-text">${this.status}</span>
          ${this.latencySaved && this.status === 'hit' ? html`<span>${this.latencySaved}</span>` : nothing}
        </button>

        ${this.showDetails ? html`
          <div class="detail-card" role="region" aria-label="Cache details">
            <div class="detail-row">
              <span class="detail-label">Hit Rate</span>
              <span class="detail-value">${this.hitRate}%</span>
            </div>
            <div class="rate-bar-track" role="progressbar" aria-valuenow=${this.hitRate} aria-valuemin="0" aria-valuemax="100">
              <div class="rate-bar-fill" style="width:${Math.min(100, Math.max(0, this.hitRate))}%"></div>
            </div>

            ${this.latencySaved ? html`
              <div class="detail-row" style="margin-top:var(--cg-spacing-8);">
                <span class="detail-label">Latency Saved</span>
                <span class="detail-value" style="color:var(--cg-color-status-success-text-default)">${this.latencySaved}</span>
              </div>
            ` : nothing}

            ${this.cacheAge ? html`
              <div class="detail-row">
                <span class="detail-label">Cache Age</span>
                <span class="detail-value">${this.cacheAge}</span>
              </div>
            ` : nothing}

            <div class="divider"></div>
            <button class="clear-btn" @click=${this._onClear} aria-label="Clear cache">Clear Cache</button>
          </div>
        ` : nothing}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ai-cache-indicator': AiCacheIndicator;
  }
}
