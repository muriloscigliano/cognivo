import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';
import type { PaymentStatusType } from './payment-status.js';

export interface TransactionData {
  id: string;
  date: string;
  description: string;
  amount: string;
  status: PaymentStatusType;
  method?: string;
}

@customElement('transaction-item')
export class TransactionItem extends LitElement {
  static override styles = [
    baseStyles,
    css`
      :host {
        display: block;
        font-family: ${tokens.fontFamily.primary};
      }

      .transaction {
        display: flex;
        align-items: center;
        gap: ${tokens.spacing.md};
        padding: ${tokens.spacing.md} ${tokens.spacing.lg};
        border-bottom: 1px solid ${tokens.color.gray100};
        transition: background ${tokens.transition.fast};
        cursor: pointer;
      }

      .transaction:hover {
        background: ${tokens.color.gray50};
      }

      .transaction:last-child {
        border-bottom: none;
      }

      .transaction-icon {
        width: 40px;
        height: 40px;
        background: ${tokens.color.gray100};
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        font-size: 20px;
      }

      .transaction-info {
        flex: 1;
        min-width: 0;
      }

      .transaction-primary {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 4px;
      }

      .transaction-description {
        font-size: ${tokens.fontSize.base};
        font-weight: ${tokens.fontWeight.medium};
        color: ${tokens.color.gray900};
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .transaction-amount {
        font-size: ${tokens.fontSize.base};
        font-weight: ${tokens.fontWeight.bold};
        color: ${tokens.color.gray900};
        white-space: nowrap;
        margin-left: ${tokens.spacing.md};
      }

      .transaction-secondary {
        display: flex;
        align-items: center;
        gap: ${tokens.spacing.sm};
        font-size: ${tokens.fontSize.sm};
        color: ${tokens.color.gray500};
      }

      .transaction-date {
        white-space: nowrap;
      }

      .transaction-method {
        white-space: nowrap;
      }

      .dot-separator {
        color: ${tokens.color.gray300};
      }

      @media (max-width: 640px) {
        .transaction {
          flex-direction: column;
          align-items: flex-start;
        }

        .transaction-primary {
          width: 100%;
        }

        .transaction-amount {
          margin-left: 0;
        }
      }
    `
  ];

  @property({ type: Object })
  transaction: TransactionData = {
    id: '',
    date: '',
    description: '',
    amount: '',
    status: 'pending'
  };

  private handleClick() {
    this.dispatchEvent(new CustomEvent('transaction-click', {
      detail: { transaction: this.transaction },
      bubbles: true,
      composed: true
    }));
  }

  override render() {
    return html`
      <div class="transaction" @click="${this.handleClick}">
        <div class="transaction-icon">💳</div>

        <div class="transaction-info">
          <div class="transaction-primary">
            <div class="transaction-description">${this.transaction.description}</div>
            <div class="transaction-amount">${this.transaction.amount}</div>
          </div>

          <div class="transaction-secondary">
            <span class="transaction-date">${this.transaction.date}</span>
            ${this.transaction.method ? html`
              <span class="dot-separator">•</span>
              <span class="transaction-method">${this.transaction.method}</span>
            ` : ''}
            <span class="dot-separator">•</span>
            <payment-status .status="${this.transaction.status}"></payment-status>
          </div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'transaction-item': TransactionItem;
  }
}
