import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { hostBlock, reducedMotion, shimmerKeyframes } from '../../styles/index.js';

/**
 * <cg-image> — Image with lazy loading, aspect ratio, skeleton placeholder, and error fallback.
 *
 * Better than OpenUI's Image:
 * - Native lazy loading
 * - Aspect ratio presets (no layout shift)
 * - Skeleton placeholder while loading
 * - Error fallback UI
 * - Object-fit control
 */
@customElement('cg-image')
export class CgImage extends LitElement {
  static override styles = [hostBlock, reducedMotion, shimmerKeyframes, css`
    :host {
      overflow: hidden;
      border-radius: var(--cg-border-radius-150);
      background: var(--cg-color-surface-container-background);
    }

    /* Rounded variants */
    :host([rounded="none"]) { border-radius: 0; }
    :host([rounded="sm"]) { border-radius: var(--cg-border-radius-50); }
    :host([rounded="md"]) { border-radius: var(--cg-border-radius-100); }
    :host([rounded="lg"]) { border-radius: var(--cg-border-radius-150); }
    :host([rounded="full"]) { border-radius: var(--cg-border-radius-full); }

    .container {
      position: relative;
      width: 100%;
    }

    /* Aspect ratios */
    :host([ratio="1:1"]) .container { aspect-ratio: 1 / 1; }
    :host([ratio="3:2"]) .container { aspect-ratio: 3 / 2; }
    :host([ratio="4:3"]) .container { aspect-ratio: 4 / 3; }
    :host([ratio="16:9"]) .container { aspect-ratio: 16 / 9; }
    :host([ratio="21:9"]) .container { aspect-ratio: 21 / 9; }

    img {
      width: 100%;
      height: auto;
      display: block;
    }

    /* When an aspect ratio is enforced on the container, the image should
       fill it exactly so object-fit can crop. Without a ratio, the image
       keeps its natural height to avoid vertical squeezing inside flex/grid. */
    :host([ratio]) img {
      height: 100%;
    }

    :host([fit="cover"]) img { object-fit: cover; }
    :host([fit="contain"]) img { object-fit: contain; }
    :host([fit="fill"]) img { object-fit: fill; }

    /* Skeleton loading */
    .skeleton {
      position: absolute;
      inset: 0;
      background: linear-gradient(90deg, var(--cg-color-surface-container-background) 25%, var(--cg-color-surface-container-border) 50%, var(--cg-color-surface-container-background) 75%);
      background-size: 200% 100%;
      animation: shimmer 1.5s linear infinite;
    }

    /* Error state */
    .error-fallback {
      position: absolute;
      inset: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: var(--cg-spacing-8);
      color: var(--cg-color-surface-container-outlined);
      background: var(--cg-color-surface-container-background);
    }
    .error-fallback svg {
      width: var(--cg-icon-size-300);
      height: var(--cg-icon-size-300);
      opacity: 0.4;
    }
    .error-fallback span {
      font-size: var(--cg-font-size-xs);
    }

    /* Loaded transition */
    img {
      opacity: 0;
      transition: opacity var(--cg-transition-duration-slow) var(--cg-transition-easing-default);
    }
    img.loaded {
      opacity: 1;
      animation: imgFadeIn var(--cg-transition-duration-default) var(--cg-transition-easing-ease-out);
    }
    @keyframes imgFadeIn {
      from { opacity: 0; transform: scale(1.01); }
      to { opacity: 1; transform: scale(1); }
    }

    @media (prefers-reduced-motion: reduce) {
      img { transition: none; }
      img.loaded { animation: none; }
    }
  `];

  @property() src = '';
  @property() alt = '';
  @property({ reflect: true }) ratio: '1:1' | '3:2' | '4:3' | '16:9' | '21:9' | 'auto' = 'auto';
  @property({ reflect: true }) fit: 'cover' | 'contain' | 'fill' = 'cover';
  @property({ type: Boolean }) lazy = true;
  @property({ reflect: true }) rounded: 'none' | 'sm' | 'md' | 'lg' | 'full' = 'lg';

  @state() private _loading = true;
  @state() private _error = false;

  private _handleLoad() {
    this._loading = false;
    this._error = false;
    this.dispatchEvent(new CustomEvent('cg-image-load', { bubbles: true, composed: true }));
  }

  private _handleError() {
    this._loading = false;
    this._error = true;
    this.dispatchEvent(new CustomEvent('cg-image-error', { bubbles: true, composed: true }));
  }

  override render() {
    return html`
      <div class="container">
        ${this._loading && !this._error ? html`<div class="skeleton"></div>` : nothing}
        ${this._error ? html`
          <div class="error-fallback">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <circle cx="8.5" cy="8.5" r="1.5"></circle>
              <polyline points="21 15 16 10 5 21"></polyline>
            </svg>
            <span>Image unavailable</span>
          </div>
        ` : nothing}
        <img
          src=${this.src || nothing}
          alt=${this.alt}
          loading=${this.lazy ? 'lazy' : 'eager'}
          class=${this._loading ? '' : 'loaded'}
          @load=${this._handleLoad}
          @error=${this._handleError}
          style=${this._error ? 'display: none' : ''}
        />
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cg-image': CgImage;
  }
}
