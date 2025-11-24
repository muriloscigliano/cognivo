import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

@customElement('table-selection')
export class TableSelection extends LitElement {
  static override styles = [
    baseStyles,
    css`
      :host {
        display: flex;
        align-items: center;
        gap: ${tokens.spacing.md};
        padding: ${tokens.spacing.md} ${tokens.spacing.lg};
        background: ${tokens.color.primaryLight};
        border-bottom: 1px solid ${tokens.color.primaryMain};
      }

      .selection-info {
        font-size: ${tokens.fontSize.sm};
        color: ${tokens.color.gray900};
        font-weight: ${tokens.fontWeight.medium};
      }

      .selection-actions {
        display: flex;
        gap: ${tokens.spacing.sm};
      }

      .selection-btn {
        padding: ${tokens.spacing.xs} ${tokens.spacing.md};
        background: ${tokens.color.primaryMain};
        color: ${tokens.color.grayWhite};
        border: none;
        border-radius: ${tokens.radius.sm};
        cursor: pointer;
        font-size: ${tokens.fontSize.sm};
        font-weight: ${tokens.fontWeight.medium};
        transition: background ${tokens.transition.default};
      }

      .selection-btn:hover {
        background: ${tokens.color.primaryDark};
      }

      .selection-btn.danger {
        background: ${tokens.color.danger};
      }

      .selection-btn.danger:hover {
        background: #d32f2f;
      }

      .selection-btn.secondary {
        background: ${tokens.color.grayWhite};
        color: ${tokens.color.gray900};
        border: 1px solid ${tokens.color.gray100};
      }

      .selection-btn.secondary:hover {
        background: ${tokens.color.gray100};
      }
    `,
  ];

  @property({ type: Number }) selectedCount = 0;
  @property({ type: Number }) totalCount = 0;

  private _handleClearSelection() {
    this.dispatchEvent(
      new CustomEvent('clear-selection', {
        bubbles: true,
        composed: true,
      })
    );
  }

  private _handleSelectAll() {
    this.dispatchEvent(
      new CustomEvent('select-all', {
        bubbles: true,
        composed: true,
      })
    );
  }

  private _handleAction(action: string) {
    this.dispatchEvent(
      new CustomEvent('selection-action', {
        bubbles: true,
        composed: true,
        detail: { action },
      })
    );
  }

  override render() {
    if (this.selectedCount === 0) {
      return html``;
    }

    return html`
      <div class="selection-info">
        ${this.selectedCount} of ${this.totalCount} item${this.selectedCount !== 1 ? 's' : ''} selected
      </div>
      <div class="selection-actions">
        ${this.selectedCount < this.totalCount
          ? html`
              <button class="selection-btn secondary" @click="${this._handleSelectAll}">Select All</button>
            `
          : ''}
        <button class="selection-btn secondary" @click="${this._handleClearSelection}">Clear Selection</button>
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'table-selection': TableSelection;
  }
}
