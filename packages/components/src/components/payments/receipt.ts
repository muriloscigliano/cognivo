import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';
import type { CheckoutLineItem } from './checkout-summary.js';

export interface ReceiptData {
  receiptNumber: string;
  date: string;
  businessName: string;
  businessAddress?: string;
  items: CheckoutLineItem[];
  subtotal: number;
  tax: number;
  total: number;
  currency: string;
  paymentMethod?: string;
  customerEmail?: string;
}

@customElement('receipt')
export class Receipt extends LitElement {
  static override styles = [
    baseStyles,
    css`
      :host {
        display: block;
        font-family: ${tokens.fontFamily.primary};
      }

      .receipt-container {
        background: white;
        border: 1px solid ${tokens.color.gray100};
        border-radius: ${tokens.radius.lg};
        padding: ${tokens.spacing.xl};
        max-width: 600px;
        margin: 0 auto;
      }

      .receipt-header {
        text-align: center;
        padding-bottom: ${tokens.spacing.lg};
        border-bottom: 2px dashed ${tokens.color.gray200};
        margin-bottom: ${tokens.spacing.lg};
      }

      .business-name {
        font-size: ${tokens.fontSize.xl};
        font-weight: ${tokens.fontWeight.bold};
        color: ${tokens.color.gray900};
        margin: 0 0 ${tokens.spacing.xs} 0;
      }

      .business-address {
        font-size: ${tokens.fontSize.sm};
        color: ${tokens.color.gray500};
        margin: 0;
      }

      .receipt-meta {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: ${tokens.spacing.sm};
        margin-bottom: ${tokens.spacing.lg};
        font-size: ${tokens.fontSize.sm};
      }

      .meta-item {
        display: flex;
        flex-direction: column;
        gap: 4px;
      }

      .meta-label {
        color: ${tokens.color.gray500};
        font-weight: ${tokens.fontWeight.medium};
      }

      .meta-value {
        color: ${tokens.color.gray900};
      }

      .receipt-items {
        margin-bottom: ${tokens.spacing.lg};
      }

      .item {
        display: flex;
        justify-content: space-between;
        padding: ${tokens.spacing.sm} 0;
        border-bottom: 1px solid ${tokens.color.gray100};
      }

      .item-info {
        flex: 1;
      }

      .item-name {
        font-size: ${tokens.fontSize.base};
        color: ${tokens.color.gray900};
        margin-bottom: 4px;
      }

      .item-quantity {
        font-size: ${tokens.fontSize.sm};
        color: ${tokens.color.gray500};
      }

      .item-price {
        font-size: ${tokens.fontSize.base};
        font-weight: ${tokens.fontWeight.medium};
        color: ${tokens.color.gray900};
        white-space: nowrap;
        margin-left: ${tokens.spacing.md};
      }

      .receipt-totals {
        padding-top: ${tokens.spacing.md};
        border-top: 2px solid ${tokens.color.gray200};
      }

      .total-row {
        display: flex;
        justify-content: space-between;
        margin-bottom: ${tokens.spacing.sm};
        font-size: ${tokens.fontSize.base};
      }

      .total-row:last-child {
        margin-top: ${tokens.spacing.md};
        padding-top: ${tokens.spacing.md};
        border-top: 1px solid ${tokens.color.gray200};
        font-size: ${tokens.fontSize.lg};
        font-weight: ${tokens.fontWeight.bold};
      }

      .total-label {
        color: ${tokens.color.gray700};
      }

      .total-value {
        color: ${tokens.color.gray900};
        font-weight: ${tokens.fontWeight.medium};
      }

      .total-row:last-child .total-value {
        color: ${tokens.color.primary};
      }

      .receipt-footer {
        text-align: center;
        padding-top: ${tokens.spacing.lg};
        margin-top: ${tokens.spacing.lg};
        border-top: 2px dashed ${tokens.color.gray200};
        font-size: ${tokens.fontSize.sm};
        color: ${tokens.color.gray500};
      }

      .print-button {
        margin-top: ${tokens.spacing.lg};
        padding: ${tokens.spacing.sm} ${tokens.spacing.lg};
        background: ${tokens.color.primary};
        color: white;
        border: none;
        border-radius: ${tokens.radius.md};
        font-size: ${tokens.fontSize.sm};
        font-weight: ${tokens.fontWeight.semibold};
        cursor: pointer;
        transition: all ${tokens.transition.fast};
      }

      .print-button:hover {
        background: ${tokens.color.primaryDark};
      }

      @media print {
        .print-button {
          display: none;
        }
      }
    `
  ];

  @property({ type: Object })
  data: ReceiptData = {
    receiptNumber: '',
    date: '',
    businessName: 'Business Name',
    items: [],
    subtotal: 0,
    tax: 0,
    total: 0,
    currency: 'USD'
  };

  @property({ type: Boolean })
  showPrintButton = true;

  private formatCurrency(amount: number, currency: string): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(amount);
  }

  private handlePrint() {
    window.print();
  }

  override render() {
    return html`
      <div class="receipt-container">
        <div class="receipt-header">
          <h2 class="business-name">${this.data.businessName}</h2>
          ${this.data.businessAddress ? html`
            <p class="business-address">${this.data.businessAddress}</p>
          ` : ''}
        </div>

        <div class="receipt-meta">
          <div class="meta-item">
            <div class="meta-label">Receipt #</div>
            <div class="meta-value">${this.data.receiptNumber}</div>
          </div>
          <div class="meta-item">
            <div class="meta-label">Date</div>
            <div class="meta-value">${this.data.date}</div>
          </div>
          ${this.data.paymentMethod ? html`
            <div class="meta-item">
              <div class="meta-label">Payment Method</div>
              <div class="meta-value">${this.data.paymentMethod}</div>
            </div>
          ` : ''}
          ${this.data.customerEmail ? html`
            <div class="meta-item">
              <div class="meta-label">Email</div>
              <div class="meta-value">${this.data.customerEmail}</div>
            </div>
          ` : ''}
        </div>

        <div class="receipt-items">
          ${this.data.items.map(item => html`
            <div class="item">
              <div class="item-info">
                <div class="item-name">${item.name}</div>
                <div class="item-quantity">Qty: ${item.quantity}</div>
              </div>
              <div class="item-price">
                ${this.formatCurrency(item.price * item.quantity, item.currency || this.data.currency)}
              </div>
            </div>
          `)}
        </div>

        <div class="receipt-totals">
          <div class="total-row">
            <span class="total-label">Subtotal</span>
            <span class="total-value">${this.formatCurrency(this.data.subtotal, this.data.currency)}</span>
          </div>
          <div class="total-row">
            <span class="total-label">Tax</span>
            <span class="total-value">${this.formatCurrency(this.data.tax, this.data.currency)}</span>
          </div>
          <div class="total-row">
            <span class="total-label">Total</span>
            <span class="total-value">${this.formatCurrency(this.data.total, this.data.currency)}</span>
          </div>
        </div>

        <div class="receipt-footer">
          <p>Thank you for your business!</p>
          ${this.showPrintButton ? html`
            <button class="print-button" @click="${this.handlePrint}">
              Print Receipt
            </button>
          ` : ''}
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'receipt': Receipt;
  }
}
