import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { hostBlock, reducedMotion } from '../../styles/index.js';

/**
 * @element cg-pagination
 * Page navigation with prev/next arrows, ellipsis gaps, and configurable siblings.
 *
 * @example
 * ```html
 * <cg-pagination total="20" current="5"></cg-pagination>
 * ```
 *
 * @fires {CustomEvent<{page: number}>} cg-page-change - When a page button is clicked
 *
 * @cssprop --cg-component-pagination-button-size - Button size (36px)
 * @cssprop --cg-color-action-primary-background-default - Active page background
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
      gap: var(--cg-spacing-4);
      list-style: none;
      margin: 0;
      padding: 0;
    }

    .page-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-width: var(--cg-component-pagination-button-size);
      height: var(--cg-component-pagination-button-size);
      padding: 0 var(--cg-spacing-8);
      border: var(--cg-border-width-50) solid var(--cg-color-surface-base-border);
      border-radius: var(--cg-border-radius-100);
      background: transparent;
      color: var(--cg-color-surface-container-text);
      font-family: inherit;
      font-size: var(--cg-font-size-sm);
      font-weight: var(--cg-font-weight-medium);
      font-variant-numeric: tabular-nums;
      cursor: pointer;
      line-height: 1;
      white-space: nowrap;
      transition:
        transform var(--cg-transition-duration-fast) var(--cg-motion-easing-default),
        background-color var(--cg-transition-duration-fast) var(--cg-motion-easing-default),
        border-color var(--cg-transition-duration-fast) var(--cg-motion-easing-default),
        color var(--cg-transition-duration-fast) var(--cg-motion-easing-default);
      -webkit-font-smoothing: antialiased;
    }

    .page-btn:hover:not(:disabled):not(.active) {
      background: var(--cg-overlay-accent-subtle);
      color: var(--cg-color-surface-container-text);
      border-color: var(--cg-color-surface-base-border);
    }

    .page-btn:active:not(:disabled) {
      transform: scale(var(--cg-interaction-press-scale));
    }

    .page-btn:focus-visible {
      box-shadow: 0 0 0 3px var(--cg-overlay-accent-strong);
      outline: none;
    }

    .page-btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    /* ── Active page ── */
    .page-btn.active {
      background: var(--cg-color-action-primary-background-default);
      color: var(--cg-color-action-primary-text-default);
      border-color: var(--cg-color-action-primary-border-default);
      font-weight: var(--cg-font-weight-semibold);
    }

    /* ── Ellipsis ── */
    .ellipsis {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-width: var(--cg-component-pagination-button-size);
      height: var(--cg-component-pagination-button-size);
      color: var(--cg-color-surface-container-outlined);
      font-size: var(--cg-font-size-sm);
      user-select: none;
      letter-spacing: var(--cg-letter-spacing-widest);
    }

    /* Size variants */
    :host([size="sm"]) .page-btn {
      min-width: var(--cg-spacing-32);
      height: var(--cg-spacing-32);
      font-size: var(--cg-font-size-xs);
    }
    :host([size="sm"]) .ellipsis {
      min-width: var(--cg-spacing-32);
      height: var(--cg-spacing-32);
      font-size: var(--cg-font-size-xs);
    }

    :host([size="lg"]) .page-btn {
      min-width: var(--cg-spacing-48);
      height: var(--cg-spacing-48);
      font-size: var(--cg-font-size-base);
    }
    :host([size="lg"]) .ellipsis {
      min-width: var(--cg-spacing-48);
      height: var(--cg-spacing-48);
      font-size: var(--cg-font-size-base);
    }

    @media (max-width: 480px) {
      .page-btn {
        min-width: var(--cg-spacing-32);
        height: var(--cg-spacing-32);
        font-size: var(--cg-font-size-xs);
        padding: 0 var(--cg-spacing-4);
      }
      .ellipsis {
        min-width: var(--cg-spacing-24);
        height: var(--cg-spacing-32);
      }
    }

    /* Rounded variants */
    :host([rounded="none"]) .page-btn { border-radius: 0; }
    :host([rounded="sm"]) .page-btn { border-radius: var(--cg-border-radius-50); }
    :host([rounded="md"]) .page-btn { border-radius: var(--cg-border-radius-100); }
    :host([rounded="lg"]) .page-btn { border-radius: var(--cg-border-radius-150); }
    :host([rounded="full"]) .page-btn { border-radius: var(--cg-border-radius-full); }
  `];

  @property({ reflect: true }) size: 'sm' | 'md' | 'lg' = 'md';
  @property({ reflect: true }) rounded: 'none' | 'sm' | 'md' | 'lg' | 'full' = 'md';
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

  private _getPages(): (number | 'ellipsis')[] {
    const total = this.total;
    const current = this.current;
    const siblings = this.siblings;

    if (total <= 7) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }

    const pages: (number | 'ellipsis')[] = [];

    if (this.showFirst) {
      pages.push(1);
    }

    const rangeStart = Math.max(2, current - siblings);
    const rangeEnd = Math.min(total - 1, current + siblings);

    if (rangeStart > 2) {
      pages.push('ellipsis');
    }

    for (let i = rangeStart; i <= rangeEnd; i++) {
      pages.push(i);
    }

    if (rangeEnd < total - 1) {
      pages.push('ellipsis');
    }

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
          <li>
            <button
              class="page-btn"
              ?disabled="${isFirstPage}"
              aria-label="Previous page"
              @click="${() => this._goToPage(this.current - 1)}"
            >
              <cg-icon name="chevron-left" size="sm"></cg-icon>
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

          <li>
            <button
              class="page-btn"
              ?disabled="${isLastPage}"
              aria-label="Next page"
              @click="${() => this._goToPage(this.current + 1)}"
            >
              <cg-icon name="chevron-right" size="sm"></cg-icon>
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
