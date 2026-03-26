import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

/**
 * <cg-image-block> — Image with caption, loading state, and error fallback.
 *
 * Features:
 * - Skeleton loading placeholder
 * - Error fallback with retry
 * - Aspect ratio control
 * - Caption with optional source attribution
 * - Click to expand (emits event)
 */
@customElement('cg-image-block')
export class CgImageBlock extends LitElement {
  static override styles = css`
    :host {
      display: block;
      font-family: var(--cg-font-family-primary, 'Inter Variable', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif);
    }

    figure {
      margin: 0;
      border-radius: var(--cg-border-radius-200, 24px);
      overflow: hidden;
      background: var(--cg-color-surface-container-background, #18181b);
    }

    .image-container {
      position: relative;
      overflow: hidden;
    }

    :host([ratio="16:9"]) .image-container { aspect-ratio: 16 / 9; }
    :host([ratio="4:3"]) .image-container { aspect-ratio: 4 / 3; }
    :host([ratio="1:1"]) .image-container { aspect-ratio: 1 / 1; }
    :host([ratio="3:2"]) .image-container { aspect-ratio: 3 / 2; }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      opacity: 0;
      transition: opacity var(--cg-motion-duration-slower, 350ms) ease;
    }
    img.loaded { opacity: 1; }

    .skeleton {
      position: absolute;
      inset: 0;
      background: linear-gradient(90deg, var(--cg-gray-100, #f4f4f5) 25%, var(--cg-gray-200, #e4e4e7) 50%, var(--cg-gray-100, #f4f4f5) 75%);
      background-size: 200% 100%;
      animation: shimmer 1.5s infinite;
    }
    @keyframes shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
    @media (prefers-reduced-motion: reduce) { .skeleton { animation: none; background: var(--cg-gray-200, #e4e4e7); } }

    .error-state {
      position: absolute;
      inset: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: var(--cg-spacing-8, 8px);
      color: var(--cg-gray-500, #71717a);
      min-height: 120px;
    }
    .error-state svg { width: 32px; height: 32px; opacity: 0.4; }
    .error-state span { font-size: var(--cg-font-size-xs, 12px); }
    .retry-btn {
      font-size: var(--cg-font-size-xs, 12px);
      color: var(--cg-text-accent, #e5ff6b);
      background: none; border: none; cursor: pointer;
      text-decoration: underline; padding: 0; font-family: inherit;
    }
    .retry-btn:hover { opacity: 0.8; }

    figcaption {
      padding: var(--cg-spacing-8, 8px) var(--cg-spacing-12, 12px);
      font-size: var(--cg-font-size-xs, 12px);
      color: var(--cg-gray-500, #71717a);
      line-height: 1.4;
    }
    .source {
      color: var(--cg-text-accent, #e5ff6b);
      text-decoration: none;
      font-weight: 500;
    }
    .source:hover { text-decoration: underline; }

    /* Clickable variant */
    :host([clickable]) figure { cursor: pointer; }
    :host([clickable]) figure:hover img { transform: scale(1.02); }
    :host([clickable]) img { transition: opacity var(--cg-motion-duration-slower, 350ms) ease, transform 0.2s ease; }
  `;

  @property() src = '';
  @property() alt = '';
  @property() caption = '';
  @property() source = '';
  @property() sourceUrl = '';
  @property({ reflect: true }) ratio: '16:9' | '4:3' | '1:1' | '3:2' | 'auto' = 'auto';
  @property({ type: Boolean, reflect: true }) clickable = false;

  @state() private _loading = true;
  @state() private _error = false;

  private _onLoad() { this._loading = false; this._error = false; }
  private _onError() { this._loading = false; this._error = true; }
  private _retry() { this._loading = true; this._error = false; this.requestUpdate(); }

  private _handleClick() {
    if (this.clickable) {
      this.dispatchEvent(new CustomEvent('cg-image-click', { detail: { src: this.src, alt: this.alt }, bubbles: true, composed: true }));
    }
  }

  override render() {
    return html`
      <figure @click=${this.clickable ? this._handleClick : nothing}>
        <div class="image-container">
          ${this._loading && !this._error ? html`<div class="skeleton"></div>` : nothing}
          ${this._error ? html`
            <div class="error-state">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
              <span>Image unavailable</span>
              <button class="retry-btn" @click=${this._retry}>Retry</button>
            </div>
          ` : nothing}
          ${!this._error ? html`
            <img
              src=${this.src}
              alt=${this.alt}
              loading="lazy"
              class=${this._loading ? '' : 'loaded'}
              @load=${this._onLoad}
              @error=${this._onError}
            />
          ` : nothing}
        </div>
        ${this.caption || this.source ? html`
          <figcaption>
            ${this.caption}
            ${this.source ? html` — <a class="source" href=${this.sourceUrl || '#'} target="_blank" rel="noopener">${this.source}</a>` : nothing}
          </figcaption>
        ` : nothing}
      </figure>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap { 'cg-image-block': CgImageBlock; }
}
