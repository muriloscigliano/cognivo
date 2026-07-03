import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { hostBlock, pulseKeyframes, reducedMotion } from '../../styles/index.js';

/**
 * <cg-skeleton> — Loading placeholder with pulse animation.
 *
 * @example
 * ```html
 * <cg-skeleton variant="rectangular" width="100%" height="80px"></cg-skeleton>
 * <cg-skeleton variant="circular" width="40px" height="40px"></cg-skeleton>
 * <cg-skeleton variant="text" lines="3"></cg-skeleton>
 * <cg-skeleton no-animation></cg-skeleton>
 * ```
 *
 * @cssprop --cg-color-loading-spinner-secondary - Skeleton background color
 * @cssprop --cg-border-radius-100 - Default border radius (12px)
 */
@customElement('cg-skeleton')
export class CgSkeleton extends LitElement {
  static override styles = [hostBlock, reducedMotion, pulseKeyframes, css`
    .skeleton {
      background: var(--cg-color-loading-spinner-secondary);
      animation: pulse 2s ease-in-out infinite;
    }

    :host([no-animation]) .skeleton {
      animation: none;
    }

    /* ── Rounded variants (rectangular shape only — circular and text
       lines own their radii) ── */
    :host([rounded="none"]) .rectangular { border-radius: 0; }
    :host([rounded="sm"]) .rectangular { border-radius: var(--cg-border-radius-50); }
    :host([rounded="md"]) .rectangular { border-radius: var(--cg-border-radius-100); }
    :host([rounded="lg"]) .rectangular { border-radius: var(--cg-border-radius-150); }
    :host([rounded="full"]) .rectangular { border-radius: var(--cg-border-radius-full); }

    /* ── Variants ── */
    .rectangular {
      border-radius: var(--cg-border-radius-100);
    }

    .circular {
      border-radius: var(--cg-border-radius-full);
    }

    .text-line {
      border-radius: var(--cg-border-radius-50);
      height: var(--cg-spacing-12);
    }

    .text-line + .text-line {
      margin-top: var(--cg-spacing-8);
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
  @property({ type: Boolean, reflect: true, attribute: 'no-animation' }) noAnimation = false;

  /** @deprecated Use `noAnimation` / `no-animation`. Kept as a JS-property
   *  alias so adapter wrappers and existing consumers don't break — the old
   *  `animated="false"` attribute path never worked (Lit Boolean semantics). */
  get animated(): boolean { return !this.noAnimation; }
  set animated(v: boolean) { this.noAnimation = !v; }
  @property({ reflect: true }) rounded: 'none' | 'sm' | 'md' | 'lg' | 'full' = 'md';

  private _getDefaultHeight(): string {
    if (this.height) return this.height;
    switch (this.variant) {
      case 'circular': return '40px';
      case 'rectangular': return '80px';
      default: return '80px';
    }
  }

  override render() {
    if (this.variant === 'text') {
      const lineCount = Math.max(1, Math.min(20, this.lines));
      return html`
        <div class="lines-container" role="status" aria-label="Loading content" aria-busy="true">
          ${Array.from({ length: lineCount }, (_, i) => {
            // Varying widths for realism, unless the user set an explicit width.
            const w = this.width !== '100%'
              ? this.width
              : i === lineCount - 1 && lineCount > 1
                ? '60%'
                : i % 2 === 1
                  ? '90%'
                  : '100%';
            return html`
              <div
                class="skeleton text-line"
                style="width: ${w}${this.height ? `; height: ${this.height}` : ''}"
              ></div>
            `;
          })}
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
