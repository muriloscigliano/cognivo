import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

export interface InvoiceTotalData {
  subtotal: number;
  tax: number;
  discount?: number;
  total: number;
  currency: string;
  paid?: number;
  due?: number;
}

@customElement('invoice-total')
export class InvoiceTotal extends LitElement {
  static override styles = [
    baseStyles,
    css`
      :host {
        display: block;
        font-family: ${tokens.fontFamily.primary};
      }

      .totals-container {
        background: ${tokens.color.gray50};
        border: 1px solid ${tokens.color.gray100};
        border-radius: ${tokens.radius.lg};
        padding: ${tokens.spacing.lg};
      }

      .total-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: ${tokens.spacing.sm};
        font-size: ${tokens.fontSize.base};
      }

      .total-row:last-child {
        margin-bottom: 0;
      }

      .total-label {
        color: ${tokens.color.gray700};
      }

      .total-value {
        font-weight: ${tokens.fontWeight.medium};
        color: ${tokens.color.gray900};
      }

      .discount-value {
        color: ${tokens.color.success};
      }

      .grand-total {
        margin-top: ${tokens.spacing.md};
        padding-top: ${tokens.spacing.md};
        border-top: 2px solid ${tokens.color.gray200};
      }

      .grand-total .total-label {
        font-size: ${tokens.fontSize.lg};
        font-weight: ${tokens.fontWeight.bold};
        color: ${tokens.color.gray900};
      }

      .grand-total .total-value {
        font-size: ${tokens.fontSize.xl};
        font-weight: ${tokens.fontWeight.bold};
        color: ${tokens.color.primary};
      }

      .paid-section {
        margin-top: ${tokens.spacing.md};
        padding-top: ${tokens.spacing.md};
        border-top: 1px solid ${tokens.color.gray200};
      }

      .paid-value {
        color: ${tokens.color.success};
      }

      .due-value {
        color: ${tokens.color.error};
      }
    `
  ];

  @property({ type: Object })
  data: InvoiceTotalData = {
    subtotal: 0,
    tax: 0,
    discount: 0,
    total: 0,
    currency: 'USD'
  };

  private formatCurrency(amount: number, currency: string): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(amount);
  }

  override render() {
    const showPaymentInfo = this.data.paid !== undefined || this.data.due !== undefined;

    return html`
      <div class="totals-container">
        <div class="total-row">
          <span class="total-label">Subtotal</span>
          <span class="total-value">${this.formatCurrency(this.data.subtotal, this.data.currency)}</span>
        </div>

        ${this.data.discount && this.data.discount > 0 ? html`
          <div class="total-row">
            <span class="total-label">Discount</span>
            <span class="total-value discount-value">
              -${this.formatCurrency(this.data.discount, this.data.currency)}
            </span>
          </div>
        ` : ''}

        <div class="total-row">
          <span class="total-label">Tax</span>
          <span class="total-value">${this.formatCurrency(this.data.tax, this.data.currency)}</span>
        </div>

        <div class="total-row grand-total">
          <span class="total-label">Total</span>
          <span class="total-value">${this.formatCurrency(this.data.total, this.data.currency)}</span>
        </div>

        ${showPaymentInfo ? html`
          <div class="paid-section">
            ${this.data.paid !== undefined ? html`
              <div class="total-row">
                <span class="total-label">Paid</span>
                <span class="total-value paid-value">
                  ${this.formatCurrency(this.data.paid, this.data.currency)}
                </span>
              </div>
            ` : ''}

            ${this.data.due !== undefined ? html`
              <div class="total-row">
                <span class="total-label">Amount Due</span>
                <span class="total-value due-value">
                  ${this.formatCurrency(this.data.due, this.data.currency)}
                </span>
              </div>
            ` : ''}
          </div>
        ` : ''}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'invoice-total': InvoiceTotal;
  }
}
