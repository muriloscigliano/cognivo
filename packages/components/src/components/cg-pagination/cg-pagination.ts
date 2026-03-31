import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { hostBlock, reducedMotion } from '../../styles/index.js';

/**
 * @element cg-pagination
 * Page navigation with prev/next arrows, ellipsis gaps, and configurable siblings.
 *
 * @example
 * ```html
 * <cg-pagination total="20" current="5" siblings="1"></cg-pagination>
 * <cg-pagination total="100" current="1" size="sm"></cg-pagination>
 * ```
 *
 * @fires {CustomEvent<{page: number}>} cg-page-change - When a page button is clicked
 *
 * @cssprop [--cg-brand-ai-accent=#dfff61] - Active page background and focus ring
 * @cssprop [--cg-color-surface-base-border=#27272a] - Page button border
 * @cssprop [--cg-interaction-press-scale=0.97] - Press scale feedback
 * @cssprop [--cg-font-size-sm=14px] - Page button font size (md)
 */
@customElement('cg-pagination')
export class CgPagination extends LitElement {
  static override styles = [hostBlock, reducedMotion, css`
    :host {
      display: flex;
    }

    .pagination {
      display: flex;
      align-items: center;
      gap: var(--cg-spacing-4, 4px);
      list-style: none;
      margin: 0;
      padding: 0;
    }

    .page-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-width: 36px;
      height: 36px;
      padding: 0 var(--cg-spacing-8, 8px);
      border: 1px solid var(--cg-color-surface-base-border, #27272a);
      border-radius: var(--cg-border-radius-100, 8px);
      background: transparent;
      color: var(--cg-color-text-secondary, #a1a1aa);
      font-family: inherit;
      font-size: var(--cg-font-size-sm, 14px);
      font-weight: var(--cg-font-weight-medium, 500);
      font-variant-numeric: tabular-nums;
      cursor: pointer;
      line-height: 1;
      white-space: nowrap;
      transition:
        transform var(--cg-motion-duration-slow, 250ms) var(--cg-motion-easing-default, cubic-bezier(0.4, 0, 0.2, 1)),
        background-color var(--cg-motion-duration-fast, 80ms) var(--cg-motion-easing-color, cubic-bezier(0, 0, 0.58, 1)),
        border-color var(--cg-motion-duration-fast, 80ms) var(--cg-motion-easing-color, cubic-bezier(0, 0, 0.58, 1)),
        color var(--cg-motion-duration-fast, 80ms) var(--cg-motion-easing-color, cubic-bezier(0, 0, 0.58, 1));
      -webkit-font-smoothing: antialiased;
    }

    .page-btn:hover:not(:disabled):not(.active) {
      background: var(--cg-color-surface-hover-background, rgba(255, 255, 255, 0.06));
      color: var(--cg-color-text-primary, #fafafa);
      border-color: var(--cg-color-surface-base-border, #3f3f46);
    }

    .page-btn:active:not(:disabled) {
      transform: scale(var(--cg-interaction-press-scale, 0.97));
    }

    .page-btn:focus-visible {
      box-shadow:
        0 0 0 2px var(--cg-color-surface-base-background, #09090b),
        0 0 0 4px var(--cg-brand-ai-accent, #dfff61);
      outline: none;
    }

    .page-btn:disabled {
      opacity: 0.35;
      cursor: not-allowed;
    }

    /* ── Active page ── */
    .page-btn.active {
      background: var(--cg-brand-ai-accent, #dfff61);
      color: var(--cg-gray-black, #000000);
      border-color: var(--cg-brand-ai-accent, #dfff61);
      font-weight: var(--cg-font-weight-semibold, 600);
    }

    /* ── Ellipsis ── */
    .ellipsis {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-width: 36px;
      height: 36px;
      color: var(--cg-color-text-disabled, #52525b);
      font-size: var(--cg-font-size-sm, 14px);
      user-select: none;
      letter-spacing: 2px;
    }

    /* ── Arrow icons ── */
    .arrow-icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 16px;
      height: 16px;
    }

    /* Size variants */
    :host([size="sm"]) .page-btn { min-width: 28px; height: 28px; font-size: 12px; }
    :host([size="sm"]) .ellipsis { min-width: 28px; height: 28px; font-size: 12px; }

    :host([size="lg"]) .page-btn { min-width: 44px; height: 44px; font-size: 16px; }
    :host([size="lg"]) .ellipsis { min-width: 44px; height: 44px; font-size: 16px; }

    @media (max-width: 480px) {
      .page-btn {
        min-width: 32px;
        height: 32px;
        font-size: var(--cg-font-size-xs, 12px);
        padding: 0 var(--cg-spacing-4, 4px);
      }
      .ellipsis {
        min-width: 24px;
        height: 32px;
      }
    }
  `];

  @property({ reflect: true }) size: 'sm' | 'md' | 'lg' = 'md';
  @property({ type: Number }) total = 1;
  @property({ type: Number }) current = 1;
  @property({ type: Number }) siblings = 1;
  @property({ type: Boolean }) showFirst = true;
  @property({ type: Boolean }) showLast = true;

  private _goToPage(page: number) {
    if (page < 1 || page > this.total || page === this.current) return;
    this.dispatchEvent(new CustomEvent('cg-page-change', {
      bubbles: true,
      composed: true,
      detail: { page },
    }));
  }

  /**
   * Compute visible page numbers with ellipsis gaps.
   * Returns array of numbers and 'ellipsis' strings.
   */
  private _getPages(): (number | 'ellipsis')[] {
    const total = this.total;
    const current = this.current;
    const siblings = this.siblings;

    if (total <= 7) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }

    const pages: (number | 'ellipsis')[] = [];

    // Always show first
    if (this.showFirst) {
      pages.push(1);
    }

    const rangeStart = Math.max(2, current - siblings);
    const rangeEnd = Math.min(total - 1, current + siblings);

    // Left ellipsis
    if (rangeStart > 2) {
      pages.push('ellipsis');
    } else if (rangeStart === 2 && this.showFirst) {
      // No gap needed
    }

    // Middle range
    for (let i = rangeStart; i <= rangeEnd; i++) {
      pages.push(i);
    }

    // Right ellipsis
    if (rangeEnd < total - 1) {
      pages.push('ellipsis');
    }

    // Always show last
    if (this.showLast) {
      pages.push(total);
    }

    return pages;
  }

  override render() {
    const pages = this._getPages();
    const isFirstPage = this.current <= 1;
    const isLastPage = this.current >= this.total;

    return html`
      <nav aria-label="Pagination">
        <ul class="pagination">
          <!-- Prev button -->
          <li>
            <button
              class="page-btn"
              ?disabled="${isFirstPage}"
              aria-label="Previous page"
              @click="${() => this._goToPage(this.current - 1)}"
            >
              <span class="arrow-icon">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M10 12L6 8l4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </span>
            </button>
          </li>

          ${pages.map(page => {
            if (page === 'ellipsis') {
              return html`<li><span class="ellipsis" aria-hidden="true">...</span></li>`;
            }
            const isActive = page === this.current;
            return html`
              <li>
                <button
                  class="page-btn ${isActive ? 'active' : ''}"
                  aria-label="Page ${page}"
                  aria-current="${isActive ? 'page' : nothing}"
                  @click="${() => this._goToPage(page)}"
                >
                  ${page}
                </button>
              </li>
            `;
          })}

          <!-- Next button -->
          <li>
            <button
              class="page-btn"
              ?disabled="${isLastPage}"
              aria-label="Next page"
              @click="${() => this._goToPage(this.current + 1)}"
            >
              <span class="arrow-icon">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M6 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </span>
            </button>
          </li>
        </ul>
      </nav>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cg-pagination': CgPagination;
  }
}
