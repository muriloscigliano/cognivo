import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

export interface CheckoutLineItem {
  id: string;
  name: string;
  description?: string;
  quantity: number;
  price: number;
  currency?: string;
}

export interface CheckoutSummaryData {
  items: CheckoutLineItem[];
  subtotal: number;
  tax: number;
  discount?: number;
  total: number;
  currency: string;
}

@customElement('checkout-summary')
export class CheckoutSummary extends LitElement {
  static override styles = [
    baseStyles,
    css`
      :host {
        display: block;
        font-family: ${tokens.fontFamily.primary};
      }

      .summary-container {
        background: white;
        border: 1px solid ${tokens.color.gray100};
        border-radius: ${tokens.radius.lg};
        overflow: hidden;
      }

      .summary-header {
        padding: ${tokens.spacing.lg};
        background: ${tokens.color.gray50};
        border-bottom: 1px solid ${tokens.color.gray100};
      }

      .summary-title {
        font-size: ${tokens.fontSize.lg};
        font-weight: ${tokens.fontWeight.bold};
        color: ${tokens.color.gray900};
        margin: 0;
      }

      .items-list {
        padding: ${tokens.spacing.lg};
        display: flex;
        flex-direction: column;
        gap: ${tokens.spacing.md};
      }

      .line-item {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        padding-bottom: ${tokens.spacing.md};
        border-bottom: 1px solid ${tokens.color.gray100};
      }

      .line-item:last-child {
        border-bottom: none;
        padding-bottom: 0;
      }

      .item-info {
        flex: 1;
      }

      .item-name {
        font-size: ${tokens.fontSize.base};
        font-weight: ${tokens.fontWeight.medium};
        color: ${tokens.color.gray900};
        margin: 0 0 4px 0;
      }

      .item-description {
        font-size: ${tokens.fontSize.sm};
        color: ${tokens.color.gray500};
        margin: 0;
      }

      .item-quantity {
        font-size: ${tokens.fontSize.sm};
        color: ${tokens.color.gray500};
        margin-top: 4px;
      }

      .item-price {
        font-size: ${tokens.fontSize.base};
        font-weight: ${tokens.fontWeight.semibold};
        color: ${tokens.color.gray900};
        white-space: nowrap;
        margin-left: ${tokens.spacing.md};
      }

      .summary-totals {
        padding: ${tokens.spacing.lg};
        background: ${tokens.color.gray50};
        border-top: 2px solid ${tokens.color.gray100};
      }

      .total-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: ${tokens.spacing.sm};
      }

      .total-row:last-child {
        margin-bottom: 0;
        margin-top: ${tokens.spacing.md};
        padding-top: ${tokens.spacing.md};
        border-top: 1px solid ${tokens.color.gray100};
      }

      .total-label {
        font-size: ${tokens.fontSize.base};
        color: ${tokens.color.gray900};
      }

      .total-value {
        font-size: ${tokens.fontSize.base};
        font-weight: ${tokens.fontWeight.medium};
        color: ${tokens.color.gray900};
      }

      .total-row:last-child .total-label {
        font-size: ${tokens.fontSize.lg};
        font-weight: ${tokens.fontWeight.bold};
        color: ${tokens.color.gray900};
      }

      .total-row:last-child .total-value {
        font-size: ${tokens.fontSize.xl};
        font-weight: ${tokens.fontWeight.bold};
        color: ${tokens.color.primaryMain};
      }

      .discount-value {
        color: ${tokens.color.success};
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

  @property({ type: Object })
  data: CheckoutSummaryData = {
    items: [],
    subtotal: 0,
    tax: 0,
    discount: 0,
    total: 0,
    currency: 'USD'
  };

  @property({ type: Boolean })
  showTax = true;

  @property({ type: Boolean })
  showDiscount = true;

  private formatCurrency(amount: number, currency: string = 'USD'): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(amount);
  }

  override render() {
    if (!this.data.items || this.data.items.length === 0) {
      return html`
        <div class="summary-container">
          <div class="empty-state">
            <div class="empty-icon">🛒</div>
            <div>Your cart is empty</div>
          </div>
        </div>
      `;
    }

    return html`
      <div class="summary-container">
        <div class="summary-header">
          <h3 class="summary-title">Order Summary</h3>
        </div>

        <div class="items-list">
          ${this.data.items.map(item => html`
            <div class="line-item">
              <div class="item-info">
                <div class="item-name">${item.name}</div>
                ${item.description ? html`
                  <div class="item-description">${item.description}</div>
                ` : ''}
                <div class="item-quantity">Qty: ${item.quantity}</div>
              </div>
              <div class="item-price">
                ${this.formatCurrency(item.price * item.quantity, item.currency || this.data.currency)}
              </div>
            </div>
          `)}
        </div>

        <div class="summary-totals">
          <div class="total-row">
            <span class="total-label">Subtotal</span>
            <span class="total-value">${this.formatCurrency(this.data.subtotal, this.data.currency)}</span>
          </div>

          ${this.showDiscount && this.data.discount && this.data.discount > 0 ? html`
            <div class="total-row">
              <span class="total-label">Discount</span>
              <span class="total-value discount-value">
                -${this.formatCurrency(this.data.discount, this.data.currency)}
              </span>
            </div>
          ` : ''}

          ${this.showTax ? html`
            <div class="total-row">
              <span class="total-label">Tax</span>
              <span class="total-value">${this.formatCurrency(this.data.tax, this.data.currency)}</span>
            </div>
          ` : ''}

          <div class="total-row">
            <span class="total-label">Total</span>
            <span class="total-value">${this.formatCurrency(this.data.total, this.data.currency)}</span>
          </div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'checkout-summary': CheckoutSummary;
  }
}
