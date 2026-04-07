import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { hostBlock, reducedMotion } from '../../styles/index.js';

/**
 * <cg-skeleton> — Loading placeholder with pulse animation.
 *
 * @example
 * ```html
 * <cg-skeleton variant="rectangular" width="100%" height="80px"></cg-skeleton>
 * <cg-skeleton variant="circular" width="40px" height="40px"></cg-skeleton>
 * <cg-skeleton variant="text" lines="3"></cg-skeleton>
 * ```
 *
 * @cssprop --cg-color-loading-spinner-secondary - Skeleton background color
 * @cssprop --cg-border-radius-100 - Default border radius (12px)
 */
@customElement('cg-skeleton')
export class CgSkeleton extends LitElement {
  static override styles = [hostBlock, reducedMotion, css`
    .skeleton {
      background: var(--cg-color-action-secondary-background-hover);
      animation: skeletonPulse 2s ease-in-out infinite;
    }

    @keyframes skeletonPulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.4; }
    }

    :host([animated="false"]) .skeleton {
      animation: none;
    }

    /* ── Rounded variants ── */
    :host([rounded="none"]) .skeleton { border-radius: 0; }
    :host([rounded="sm"]) .skeleton { border-radius: var(--cg-border-radius-50); }
    :host([rounded="md"]) .skeleton { border-radius: var(--cg-border-radius-100); }
    :host([rounded="lg"]) .skeleton { border-radius: var(--cg-border-radius-150); }
    :host([rounded="full"]) .skeleton { border-radius: var(--cg-border-radius-full); }

    /* ── Variants ── */
    .rectangular {
      border-radius: var(--cg-border-radius-100);
    }

    .circular {
      border-radius: 50%;
    }

    .text-line {
      border-radius: var(--cg-border-radius-50);
      height: var(--cg-spacing-12);
    }

    .text-line + .text-line {
      margin-top: var(--cg-spacing-8);
    }

    /* Text lines get varying widths for realism */
    .text-line:last-child:not(:first-child) {
      width: 60% !important;
    }
    .text-line:nth-child(even) {
      width: 90% !important;
    }

    .lines-container {
      display: flex;
      flex-direction: column;
    }

    /* Reduced motion: no animation, static placeholder */
    @media (prefers-reduced-motion: reduce) {
      .skeleton {
        animation: none !important;
      }
    }
  `];

  @property({ type: String, reflect: true }) variant: 'text' | 'circular' | 'rectangular' = 'rectangular';
  @property({ type: String }) width = '100%';
  @property({ type: String }) height = '';
  @property({ type: Number }) lines = 3;
  @property({ type: Boolean, reflect: true }) animated = true;
  @property({ reflect: true }) rounded: 'none' | 'sm' | 'md' | 'lg' | 'full' = 'md';

  private _getDefaultHeight(): string {
    if (this.height) return this.height;
    switch (this.variant) {
      case 'circular': return '40px';
      case 'rectangular': return '80px';
      case 'text': return '12px';
      default: return '80px';
    }
  }

  override render() {
    if (this.variant === 'text') {
      const lineCount = Math.max(1, Math.min(20, this.lines));
      return html`
        <div class="lines-container" role="status" aria-label="Loading content" aria-busy="true">
          ${Array.from({ length: lineCount }, () => html`
            <div
              class="skeleton text-line"
              style="width: ${this.width}; height: ${this._getDefaultHeight()}"
            ></div>
          `)}
        </div>
      `;
    }

    const shapeClass = this.variant === 'circular' ? 'circular' : 'rectangular';

    return html`
      <div
        class="skeleton ${shapeClass}"
        role="status"
        aria-label="Loading content"
        aria-busy="true"
        style="width: ${this.width}; height: ${this._getDefaultHeight()}"
      ></div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cg-skeleton': CgSkeleton;
  }
}
