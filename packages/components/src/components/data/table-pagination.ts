import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

@customElement('table-pagination')
export class TablePagination extends LitElement {
  static override styles = [
    baseStyles,
    css`
      :host {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: ${tokens.spacing.md} ${tokens.spacing.lg};
        background: ${tokens.color.gray50};
        border-top: 1px solid ${tokens.color.gray100};
      }

      .pagination-info {
        font-size: ${tokens.fontSize.sm};
        color: ${tokens.color.gray500};
      }

      .pagination-controls {
        display: flex;
        gap: ${tokens.spacing.sm};
        align-items: center;
      }

      .pagination-btn {
        padding: ${tokens.spacing.xs} ${tokens.spacing.md};
        background: ${tokens.color.grayWhite};
        color: ${tokens.color.gray900};
        border: 1px solid ${tokens.color.gray100};
        border-radius: ${tokens.radius.sm};
        cursor: pointer;
        font-size: ${tokens.fontSize.sm};
        font-weight: ${tokens.fontWeight.medium};
        transition: all ${tokens.transition.default};
        min-width: 36px;
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

      .page-size-select {
        padding: ${tokens.spacing.xs} ${tokens.spacing.sm};
        border: 1px solid ${tokens.color.gray100};
        border-radius: ${tokens.radius.sm};
        font-size: ${tokens.fontSize.sm};
        cursor: pointer;
      }
    `,
  ];

  @property({ type: Number }) currentPage = 1;
  @property({ type: Number }) totalPages = 1;
  @property({ type: Number }) pageSize = 10;
  @property({ type: Number }) totalItems = 0;
  @property({ type: Array }) pageSizeOptions = [10, 20, 50, 100];

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

  private _handlePageSizeChange(e: Event) {
    const pageSize = parseInt((e.target as HTMLSelectElement).value);
    this.dispatchEvent(
      new CustomEvent('page-size-change', {
        bubbles: true,
        composed: true,
        detail: { pageSize },
      })
    );
  }

  override render() {
    const startItem = (this.currentPage - 1) * this.pageSize + 1;
    const endItem = Math.min(this.currentPage * this.pageSize, this.totalItems);

    const pageNumbers = [];
    const maxVisible = 5;
    let startPage = Math.max(1, this.currentPage - Math.floor(maxVisible / 2));
    const endPage = Math.min(this.totalPages, startPage + maxVisible - 1);
    startPage = Math.max(1, endPage - maxVisible + 1);

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return html`
      <div class="pagination-info">
        Showing ${startItem}-${endItem} of ${this.totalItems} items
        <select class="page-size-select" @change="${this._handlePageSizeChange}">
          ${this.pageSizeOptions.map(
            (size) => html`<option value="${size}" ?selected="${size === this.pageSize}">${size} per page</option>`
          )}
        </select>
      </div>
      <div class="pagination-controls">
        <button
          class="pagination-btn"
          @click="${() => this._handlePageChange(1)}"
          ?disabled="${this.currentPage === 1}"
        >
          ««
        </button>
        <button
          class="pagination-btn"
          @click="${() => this._handlePageChange(this.currentPage - 1)}"
          ?disabled="${this.currentPage === 1}"
        >
          ‹
        </button>
        ${pageNumbers.map(
          (page) => html`
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
        >
          ›
        </button>
        <button
          class="pagination-btn"
          @click="${() => this._handlePageChange(this.totalPages)}"
          ?disabled="${this.currentPage === this.totalPages}"
        >
          »»
        </button>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'table-pagination': TablePagination;
  }
}
