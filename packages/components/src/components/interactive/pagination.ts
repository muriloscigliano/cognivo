import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

@customElement('pagination')
export class Pagination extends LitElement {
  static override styles = [
    baseStyles,
    css`
      :host {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: ${tokens.spacing.sm};
      }

      .pagination-btn {
        min-width: 36px;
        height: 36px;
        padding: ${tokens.spacing.xs} ${tokens.spacing.sm};
        background: ${tokens.color.grayWhite};
        color: ${tokens.color.gray900};
        border: 1px solid ${tokens.color.gray100};
        border-radius: ${tokens.radius.sm};
        cursor: pointer;
        font-size: ${tokens.fontSize.sm};
        font-weight: ${tokens.fontWeight.medium};
        transition: all ${tokens.transition.default};
      }

      .pagination-btn:hover:not(:disabled) {
        background: ${tokens.color.gray100};
        border-color: ${tokens.color.gray500};
      }

      .pagination-btn:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }

      .pagination-btn.active {
        background: ${tokens.color.primaryMain};
        color: ${tokens.color.grayWhite};
        border-color: ${tokens.color.primaryMain};
      }

      .ellipsis {
        padding: ${tokens.spacing.xs};
        color: ${tokens.color.gray500};
      }
    `,
  ];

  @property({ type: Number }) currentPage = 1;
  @property({ type: Number }) totalPages = 1;
  @property({ type: Number }) maxVisible = 5;

  private _handlePageChange(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.dispatchEvent(
        new CustomEvent('page-change', {
          bubbles: true,
          composed: true,
          detail: { page },
        })
      );
    }
  }

  private _getVisiblePages(): (number | 'ellipsis')[] {
    const pages: (number | 'ellipsis')[] = [];
    const half = Math.floor(this.maxVisible / 2);
    let start = Math.max(1, this.currentPage - half);
    const end = Math.min(this.totalPages, start + this.maxVisible - 1);
    start = Math.max(1, end - this.maxVisible + 1);

    if (start > 1) {
      pages.push(1);
      if (start > 2) pages.push('ellipsis');
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < this.totalPages) {
      if (end < this.totalPages - 1) pages.push('ellipsis');
      pages.push(this.totalPages);
    }

    return pages;
  }

  override render() {
    const pages = this._getVisiblePages();

    return html`
      <button
        class="pagination-btn"
        @click="${() => this._handlePageChange(this.currentPage - 1)}"
        ?disabled="${this.currentPage === 1}"
        aria-label="Previous page"
      >
        ‹
      </button>
      ${pages.map((page) =>
        page === 'ellipsis'
          ? html`<span class="ellipsis">...</span>`
          : html`
              <button
                class="pagination-btn ${page === this.currentPage ? 'active' : ''}"
                @click="${() => this._handlePageChange(page)}"
              >
                ${page}
              </button>
            `
      )}
      <button
        class="pagination-btn"
        @click="${() => this._handlePageChange(this.currentPage + 1)}"
        ?disabled="${this.currentPage === this.totalPages}"
        aria-label="Next page"
      >
        ›
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pagination': Pagination;
  }
}
