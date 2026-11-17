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
  /** The range shown at the left when `page-size` and `total-items` are set. */
  range: '{start}–{end} of {total}',
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
 * <!-- "1–25 of 90" at the left -->
 * <cg-pagination total="4" current="1" page-size="25" total-items="90"></cg-pagination>
 * ```
 *
 * Buttons are 28 px grey pills (`--cg-component-pagination-button-size`;
 * `rounded` still overrides the corner); the current page is the selection
 * colour. With `page-size` and `total-items` a 13 px muted range summary
 * ("1–25 of 90", numbers in the page's locale) sits at the left.
 *
 * @fires {CustomEvent<{page: number} | {direction: 'previous' | 'next'}>} cg-page-change - A page was requested: `{page}` in pages mode, `{direction}` in cursor mode
 *
 * @cssprop --cg-component-pagination-button-size - Button size (28px)
 * @cssprop --cg-color-selected-background - Current page background (neutral preset: the state-selected grey)
 */
@customElement('cg-pagination')
export class CgPagination extends LitElement {
  static override styles = [hostBlock, reducedMotion, css`
    :host {
      display: flex;
      align-items: center;
      gap: var(--cg-spacing-16);
    }
    .summary {
      margin-inline-end: auto;
      font-size: var(--cg-font-size-13);
      color: var(--cg-color-on-surface-container-default);
      font-variant-numeric: tabular-nums;
      white-space: nowrap;
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
      border: var(--cg-border-width-50) solid transparent;
      border-radius: var(--cg-border-radius-full);
      background: var(--cg-color-action-secondary-background-default);
      color: var(--cg-color-action-secondary-text-default);
      font-family: inherit;
      font-size: var(--cg-font-size-sm);
      font-weight: var(--cg-font-weight-medium);
      font-variant-numeric: tabular-nums;
      cursor: pointer;
      line-height: 1;
      white-space: nowrap;
      transition: var(--cg-transition-duration-state) var(--cg-transition-easing-ease-out);
      transition-property: background-color, border-color, color;
      -webkit-font-smoothing: antialiased;
    }

    /* Hover / pressed: the neutral state overlay on the grey pill; nothing moves. */
    .page-btn:hover:not([aria-disabled="true"]):not(.active) {
      background-image: linear-gradient(var(--cg-color-state-hover), var(--cg-color-state-hover));
    }
    .page-btn:active:not([aria-disabled="true"]):not(.active) {
      background-image: linear-gradient(var(--cg-color-state-pressed), var(--cg-color-state-pressed));
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
    :host([size="sm"]) :is(.page-btn, .ellipsis) {
      min-width: var(--cg-spacing-24);
      height: var(--cg-spacing-24);
      font-size: var(--cg-font-size-xs);
    }

    :host([size="lg"]) :is(.page-btn, .ellipsis) {
      min-width: var(--cg-component-button-height-md);
      height: var(--cg-component-button-height-md);
    }

    @media (max-width: 480px) {
      .page-btn { padding: 0 var(--cg-spacing-4); }
      .summary { display: none; }
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
  @property({ reflect: true }) rounded: 'none' | 'sm' | 'md' | 'lg' | 'full' = 'full';
  /** Items per page: with `total-items`, shows "1–25 of 90" at the left. */
  @property({ type: Number, attribute: 'page-size' }) pageSize = 0;
  /** Total number of items: with `page-size`, shows "1–25 of 90" at the left. */
  @property({ type: Number, attribute: 'total-items' }) totalItems = 0;
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

  /** "1–25 of 90" (locale-formatted numbers), when page-size and total-items are set. */
  private _renderSummary() {
    if (!(this.pageSize > 0 && this.totalItems > 0) || this.mode === 'cursor') return nothing;
    const n = new Intl.NumberFormat(this.i18n.locale);
    const start = Math.min(this.totalItems, (Math.max(1, this.current) - 1) * this.pageSize + 1);
    const end = Math.min(this.totalItems, Math.max(1, this.current) * this.pageSize);
    return html`<span class="summary">${this.i18n.t('range', { start: n.format(start), end: n.format(end), total: n.format(this.totalItems) })}</span>`;
  }

  override render() {
    if (this.mode === 'cursor') return this._renderCursor();
    const pages = this._getPages();
    const isFirstPage = this.current <= 1;
    const isLastPage = this.current >= this.total;

    return html`
      ${this._renderSummary()}
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
