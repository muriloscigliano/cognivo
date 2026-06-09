import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { hostBlock, reducedMotion, shimmerKeyframes } from '../../styles/index.js';

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
  static override styles = [hostBlock, reducedMotion, shimmerKeyframes, css`
    figure {
      margin: 0;
      border-radius: var(--cg-border-radius-200);
      overflow: hidden;
      background: var(--cg-color-surface-container-background);
    }

    /* Rounded variants */
    :host([rounded="none"]) figure { border-radius: 0; }
    :host([rounded="sm"]) figure { border-radius: var(--cg-border-radius-50); }
    :host([rounded="md"]) figure { border-radius: var(--cg-border-radius-100); }
    :host([rounded="lg"]) figure { border-radius: var(--cg-border-radius-150); }
    :host([rounded="full"]) figure { border-radius: var(--cg-border-radius-full); }

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
      height: auto;
      object-fit: cover;
      display: block;
      opacity: 0;
      transition: opacity var(--cg-transition-duration-slow) var(--cg-transition-easing-default);
    }
    img.loaded { opacity: 1; }

    /* When an aspect ratio is enforced, the image should fill the container
       so object-fit can crop. Without a ratio, keep natural height to avoid
       vertical squeezing inside flex/grid parents. */
    :host([ratio]) img {
      height: 100%;
    }

    .skeleton {
      position: absolute;
      inset: 0;
      background: linear-gradient(90deg, var(--cg-color-surface-container-background) 25%, var(--cg-color-surface-container-border) 50%, var(--cg-color-surface-container-background) 75%);
      background-size: 200% 100%;
      animation: shimmer 1.5s infinite;
    }
    .error-state {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      gap: var(--cg-spacing-12);
      padding: var(--cg-spacing-24);
      color: var(--cg-color-surface-container-outlined);
    }
    .error-state svg {
      width: var(--cg-icon-size-300);
      height: var(--cg-icon-size-300);
      opacity: 0.4;
    }
    .error-state span {
      font-size: var(--cg-font-size-sm);
    }

    .retry-btn {
      padding: var(--cg-spacing-6) var(--cg-spacing-16);
      border-radius: var(--cg-border-radius-100);
      font-size: var(--cg-font-size-xs);
      font-weight: var(--cg-font-weight-semibold);
      background: var(--cg-color-surface-container-background);
      color: var(--cg-color-surface-base-text);
      border: var(--cg-border-width-50) solid var(--cg-color-surface-container-border);
      cursor: pointer;
      transition: background var(--cg-transition-duration-default) var(--cg-transition-easing-default), border-color var(--cg-transition-duration-default) var(--cg-transition-easing-default);
    }
    .retry-btn:hover {
      background: var(--cg-color-action-tertiary-background-hover);
      border-color: var(--cg-color-action-primary-background-default);
    }
    .retry-btn:focus-visible {
      outline: none;
      box-shadow: 0 0 0 2px var(--cg-color-focus-ring-offset), 0 0 0 4px var(--cg-color-focus-ring);
    }

    figcaption {
      padding: var(--cg-spacing-8) var(--cg-spacing-12);
      font-size: var(--cg-font-size-xs);
      color: var(--cg-color-surface-container-outlined);
      line-height: var(--cg-line-height-snug);
    }
    .source {
      color: var(--cg-color-action-primary-background-default);
      text-decoration: none;
      font-weight: var(--cg-font-weight-medium);
    }
    .source:hover { text-decoration: underline; }

    /* Clickable variant */
    :host([clickable]) figure { cursor: pointer; }
    :host([clickable]) figure:hover img { transform: scale(1.02); }
    :host([clickable]) figure:active img { transform: scale(0.99); }
    :host([clickable]) img { transition: opacity var(--cg-transition-duration-slow) var(--cg-transition-easing-default), transform var(--cg-transition-duration-default) var(--cg-transition-easing-default); }

    :focus-visible {
      outline: none;
      box-shadow: 0 0 0 2px var(--cg-color-focus-ring-offset), 0 0 0 4px var(--cg-color-focus-ring);
    }
  `];

  @property() src = '';
  @property() alt = '';
  @property() caption = '';
  @property() source = '';
  @property() sourceUrl = '';
  @property({ reflect: true }) ratio: '16:9' | '4:3' | '1:1' | '3:2' | 'auto' = 'auto';
  @property({ type: Boolean, reflect: true }) clickable = false;
  @property({ reflect: true }) rounded: 'none' | 'sm' | 'md' | 'lg' | 'full' = 'lg';

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

  private _handleKeydown(e: KeyboardEvent) {
    if (this.clickable && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      this._handleClick();
    }
  }

  override render() {
    return html`
      <figure
        @click=${this.clickable ? this._handleClick : nothing}
        @keydown=${this.clickable ? this._handleKeydown : nothing}
        tabindex=${this.clickable ? '0' : nothing}
        role=${this.clickable ? 'button' : nothing}
        aria-label=${this.clickable ? `View image: ${this.alt}` : nothing}
      >
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
