import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * <cg-skeleton> — Loading placeholder with shimmer.
 *
 * Features:
 * - Shimmer gradient animation (200% background-size, linear infinite)
 * - Variant shapes (text, circular, rectangular)
 * - Configurable dimensions
 * - Multiple text lines with varying widths
 * - prefers-reduced-motion: pulse instead of shimmer
 */
@customElement('cg-skeleton')
export class CgSkeleton extends LitElement {
  static override styles = css`
    :host {
      transition: color var(--cg-motion-duration-fast, 80ms) var(--cg-motion-easing-color, cubic-bezier(0, 0, 0.58, 1));
      display: block;
      font-family: var(--cg-font-family-primary, 'Inter Variable', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif);
    }

    .skeleton {
      background: linear-gradient(
        90deg,
        var(--cg-color-surface-base-border, #27272a) 25%,
        rgba(255, 255, 255, 0.06) 50%,
        var(--cg-color-surface-base-border, #27272a) 75%
      );
      background-size: 200% 100%;
      animation: shimmer 1.8s ease-in-out infinite;
    }

    :host([animated="false"]) .skeleton {
      animation: none;
      background: var(--cg-color-surface-base-border, #27272a);
    }

    @media (prefers-reduced-motion: reduce) {
      .skeleton {
        animation: skeleton-pulse 2s ease-in-out infinite;
        background: var(--cg-color-surface-base-border, #27272a);
      }
    }

    @keyframes shimmer {
      0% { background-position: 200% 0; }
      100% { background-position: -200% 0; }
    }

    @keyframes skeleton-pulse {
      0%, 100% { opacity: 0.4; }
      50% { opacity: 0.8; }
    }

    /* ── Variants ── */
    .rectangular {
      border-radius: var(--cg-border-radius-100, 8px);
    }

    .circular {
      border-radius: 50%;
    }

    .text-line {
      border-radius: var(--cg-border-radius-050, 4px);
      height: 14px;
    }

    .text-line + .text-line {
      margin-top: var(--cg-spacing-8, 8px);
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
  `;

  @property({ type: String, reflect: true }) variant: 'text' | 'circular' | 'rectangular' = 'rectangular';
  @property({ type: String }) width = '100%';
  @property({ type: String }) height = '';
  @property({ type: Number }) lines = 3;
  @property({ type: Boolean, reflect: true }) animated = true;

  private _getDefaultHeight(): string {
    if (this.height) return this.height;
    switch (this.variant) {
      case 'circular': return '40px';
      case 'rectangular': return '80px';
      case 'text': return '14px';
      default: return '80px';
    }
  }

  override render() {
    if (this.variant === 'text') {
      const lineCount = Math.max(1, Math.min(20, this.lines));
      return html`
        <div class="lines-container" role="status" aria-label="Loading content">
          ${Array.from({ length: lineCount }, (_, i) => html`
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
