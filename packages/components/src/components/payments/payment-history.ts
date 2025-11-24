import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';
import type { PaymentStatusType } from './payment-status.js';

export interface PaymentHistoryItem {
  id: string;
  date: string;
  description: string;
  amount: number;
  currency: string;
  status: PaymentStatusType;
  method?: string;
  receipt?: string;
}

@customElement('payment-history')
export class PaymentHistory extends LitElement {
  static override styles = [
    baseStyles,
    css`
      :host {
        display: block;
        font-family: ${tokens.fontFamily.primary};
      }

      .history-container {
        background: white;
        border: 1px solid ${tokens.color.gray100};
        border-radius: ${tokens.radius.lg};
        overflow: hidden;
      }

      .history-header {
        padding: ${tokens.spacing.lg};
        background: ${tokens.color.gray50};
        border-bottom: 1px solid ${tokens.color.gray100};
      }

      .history-title {
        font-size: ${tokens.fontSize.lg};
        font-weight: ${tokens.fontWeight.bold};
        color: ${tokens.color.gray900};
        margin: 0;
      }

      .history-list {
        display: flex;
        flex-direction: column;
      }

      .empty-state {
        padding: ${tokens.spacing.xl};
        text-align: center;
        color: ${tokens.color.gray500};
      }

      .empty-icon {
        font-size: 48px;
        margin-bottom: ${tokens.spacing.md};
        opacity: 0.5;
      }
    `
  ];

  @property({ type: Array })
  payments: PaymentHistoryItem[] = [];

  @property({ type: String })
  override title: string = 'Payment History';

  @property({ type: Boolean })
  showHeader = true;

  private formatCurrency(amount: number, currency: string): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(amount);
  }

  private formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  override render() {
    return html`
      <div class="history-container">
        ${this.showHeader ? html`
          <div class="history-header">
            <h3 class="history-title">${this.title}</h3>
          </div>
        ` : ''}

        ${this.payments.length === 0 ? html`
          <div class="empty-state">
            <div class="empty-icon">💳</div>
            <div>No payment history</div>
          </div>
        ` : html`
          <div class="history-list">
            ${this.payments.map(payment => html`
              <transaction-item
                .transaction="${{
                  id: payment.id,
                  date: this.formatDate(payment.date),
                  description: payment.description,
                  amount: this.formatCurrency(payment.amount, payment.currency),
                  status: payment.status,
                  method: payment.method
                }}"
                @transaction-click="${() => this.handleTransactionClick(payment)}"
              ></transaction-item>
            `)}
          </div>
        `}
      </div>
    `;
  }

  private handleTransactionClick(payment: PaymentHistoryItem) {
    this.dispatchEvent(new CustomEvent('payment-select', {
      detail: { payment },
      bubbles: true,
      composed: true
    }));
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'payment-history': PaymentHistory;
  }
}
