import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

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
  static override styles = css`
    :host {
      transition: color var(--cg-motion-duration-fast, 80ms) var(--cg-motion-easing-color, cubic-bezier(0, 0, 0.58, 1));
      display: block;
      font-family: var(--cg-font-family-primary, 'Inter Variable', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif);
      overflow: hidden;
      border-radius: var(--cg-border-radius-150, 12px);
      background: var(--cg-color-surface-container-background, #18181b);
    }

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
      height: 100%;
      display: block;
    }

    :host([fit="cover"]) img { object-fit: cover; }
    :host([fit="contain"]) img { object-fit: contain; }
    :host([fit="fill"]) img { object-fit: fill; }

    /* Skeleton loading */
    .skeleton {
      position: absolute;
      inset: 0;
      background: linear-gradient(90deg, var(--cg-gray-100, #f4f4f5) 25%, var(--cg-gray-200, #e4e4e7) 50%, var(--cg-gray-100, #f4f4f5) 75%);
      background-size: 200% 100%;
      animation: shimmer 1.5s infinite;
    }

    @keyframes shimmer {
      0% { background-position: 200% 0; }
      100% { background-position: -200% 0; }
    }

    @media (prefers-reduced-motion: reduce) {
      .skeleton { animation: none; background: var(--cg-gray-200, #e4e4e7); }
    }

    /* Error state */
    .error-fallback {
      position: absolute;
      inset: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: var(--cg-spacing-8, 8px);
      color: var(--cg-gray-500, #71717a);
      background: var(--cg-color-surface-container-background, #18181b);
    }
    .error-fallback svg {
      width: 32px;
      height: 32px;
      opacity: 0.5;
    }
    .error-fallback span {
      font-size: var(--cg-font-size-xs, 12px);
    }

    /* Loaded transition */
    img {
      opacity: 0;
      transition: opacity var(--cg-motion-duration-slower, 350ms) ease;
    }
    img.loaded { opacity: 1; }
  `;

  @property() src = '';
  @property() alt = '';
  @property({ reflect: true }) ratio: '1:1' | '3:2' | '4:3' | '16:9' | '21:9' | 'auto' = 'auto';
  @property({ reflect: true }) fit: 'cover' | 'contain' | 'fill' = 'cover';
  @property({ type: Boolean }) lazy = true;

  @state() private _loading = true;
  @state() private _error = false;

  private _handleLoad() {
    this._loading = false;
    this._error = false;
  }

  private _handleError() {
    this._loading = false;
    this._error = true;
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
