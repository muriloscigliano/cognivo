import { LitElement, html, css, nothing } from 'lit';
import { property } from 'lit/decorators.js';
import { customElement } from '../../utils/define.js';
import { hostBlock, reducedMotion } from '../../styles/index.js';
import { defineMessages, Messages } from '../../utils/messages.js';

const MESSAGES = defineMessages('cg-pagination', {
  label: 'Pagination',
  previous: 'Previous page',
  next: 'Next page',
  page: 'Page {page}',
  /** Visible text of the cursor-mode buttons. */
  previousLabel: 'Previous',
  nextLabel: 'Next',
});

/**
 * @element cg-pagination
 * Page navigation with prev/next arrows, ellipsis gaps, and configurable siblings.
 *
 * @example
 * ```html
 * <cg-pagination total="20" current="5"></cg-pagination>
 * <!-- Cursor-based data (no page count): Previous / Next only -->
 * <cg-pagination mode="cursor" has-next></cg-pagination>
 * ```
 *
 * @fires {CustomEvent<{page: number} | {direction: 'previous' | 'next'}>} cg-page-change - A page was requested: `{page}` in pages mode, `{direction}` in cursor mode
 *
 * @cssprop --cg-component-pagination-button-size - Button size (36px)
 * @cssprop --cg-color-selected-background - Current page background (neutral preset: the state-selected grey)
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
      gap: var(--cg-spacing-4);
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
        transform var(--cg-transition-duration-fast) var(--cg-transition-easing-default),
        background-color var(--cg-transition-duration-fast) var(--cg-transition-easing-default),
        border-color var(--cg-transition-duration-fast) var(--cg-transition-easing-default),
        color var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
      -webkit-font-smoothing: antialiased;
    }

    .page-btn:hover:not([aria-disabled="true"]):not(.active) {
      background: var(--cg-color-state-hover);
    }

    .page-btn:active:not([aria-disabled="true"]) {
      transform: scale(var(--cg-interaction-press-scale));
    }

    .page-btn:focus-visible {
      outline: none;
      box-shadow:
        0 0 0 var(--cg-border-width-100) var(--cg-color-focus-ring-offset),
        0 0 0 calc(var(--cg-border-width-100) * 2) var(--cg-color-focus-ring);
    }

    .page-btn[aria-disabled="true"] {
      opacity: var(--cg-opacity-40);
      cursor: not-allowed;
    }

    /* ── Active page ── */
    .page-btn.active {
      cursor: default;
      background: var(--cg-color-selected-background);
      color: var(--cg-color-selected-text);
      border-color: var(--cg-color-current-indicator);
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

  /** Per-element text overrides (JSON attribute); see `setMessages()`. */
  @property({ type: Object }) messages: Partial<typeof MESSAGES> | null = null;
  private i18n = new Messages(this, MESSAGES);

  @property({ reflect: true }) size: 'sm' | 'md' | 'lg' = 'md';
  @property({ reflect: true }) rounded: 'none' | 'sm' | 'md' | 'lg' | 'full' = 'md';
  /** `pages` (numbered, needs `total`) or `cursor` (Previous / Next only,
   *  for APIs that page with cursors and know no page count). */
  @property({ reflect: true }) mode: 'pages' | 'cursor' = 'pages';
  /** Cursor mode: there is a previous page. */
  @property({ type: Boolean, attribute: 'has-previous' }) hasPrevious = false;
  /** Cursor mode: there is a next page. */
  @property({ type: Boolean, attribute: 'has-next' }) hasNext = false;
  @property({ type: Number }) total = 1;
  @property({ type: Number }) current = 1;
  @property({ type: Number }) siblings = 1;
  /** Accepts attribute "false" — plain Lit Booleans can never be turned off from markup. */
  private static _boolConverter = { fromAttribute: (v: string | null) => v !== 'false' };
  @property({ converter: CgPagination._boolConverter }) showFirst = true;
  @property({ converter: CgPagination._boolConverter }) showLast = true;

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

  private _step(direction: 'previous' | 'next', enabled: boolean) {
    if (enabled) this.dispatchEvent(new CustomEvent('cg-page-change', { bubbles: true, composed: true, detail: { direction } }));
  }

  private _renderCursor() {
    const step = (direction: 'previous' | 'next', enabled: boolean, icon: string) => html`
      <li>
        <button class="page-btn" aria-disabled=${enabled ? 'false' : 'true'} @click=${() => this._step(direction, enabled)}>
          ${direction === 'next' ? this.i18n.t('nextLabel') : nothing}
          <cg-icon name=${icon} size="sm" aria-hidden="true"></cg-icon>
          ${direction === 'previous' ? this.i18n.t('previousLabel') : nothing}
        </button>
      </li>`;
    return html`
      <nav aria-label=${this.i18n.t('label')}>
        <ul class="pagination">
          ${step('previous', this.hasPrevious, 'chevron-left')}
          ${step('next', this.hasNext, 'chevron-right')}
        </ul>
      </nav>
    `;
  }

  override render() {
    if (this.mode === 'cursor') return this._renderCursor();
    const pages = this._getPages();
    const isFirstPage = this.current <= 1;
    const isLastPage = this.current >= this.total;

    return html`
      <nav aria-label=${this.i18n.t('label')}>
        <ul class="pagination">
          <li>
            <button
              class="page-btn"
              aria-disabled="${isFirstPage ? 'true' : 'false'}"
              aria-label=${this.i18n.t('previous')}
              @click="${() => this._goToPage(this.current - 1)}"
            >
              <cg-icon name="chevron-left" size="sm"></cg-icon>
            </button>
          </li>

          ${pages.map(page => {
            if (page === 'ellipsis') {
              return html`<li><span class="ellipsis" aria-hidden="true">…</span></li>`;
            }
            const isActive = page === this.current;
            return html`
              <li>
                <button
                  class="page-btn ${isActive ? 'active' : ''}"
                  aria-label=${this.i18n.t('page', { page })}
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
              aria-disabled="${isLastPage ? 'true' : 'false'}"
              aria-label=${this.i18n.t('next')}
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
