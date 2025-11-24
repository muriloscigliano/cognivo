import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

export interface InvoiceItemData {
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
  currency: string;
}

@customElement('invoice-item')
export class InvoiceItem extends LitElement {
  static override styles = [
    baseStyles,
    css`
      :host {
        display: block;
        font-family: ${tokens.fontFamily.primary};
      }

      .item {
        display: grid;
        grid-template-columns: 2fr 1fr 1fr 1fr;
        gap: ${tokens.spacing.md};
        padding: ${tokens.spacing.md} 0;
        border-bottom: 1px solid ${tokens.color.gray100};
        align-items: center;
      }

      .description {
        font-size: ${tokens.fontSize.base};
        color: ${tokens.color.gray900};
      }

      .quantity, .unit-price, .total {
        font-size: ${tokens.fontSize.base};
        color: ${tokens.color.gray700};
        text-align: right;
      }

      .total {
        font-weight: ${tokens.fontWeight.semibold};
        color: ${tokens.color.gray900};
      }

      @media (max-width: 640px) {
        .item {
          grid-template-columns: 1fr;
          gap: ${tokens.spacing.xs};
        }

        .quantity, .unit-price, .total {
          text-align: left;
          font-size: ${tokens.fontSize.sm};
        }

        .quantity::before {
          content: 'Qty: ';
          color: ${tokens.color.gray500};
        }

        .unit-price::before {
          content: 'Unit Price: ';
          color: ${tokens.color.gray500};
        }

        .total::before {
          content: 'Total: ';
          color: ${tokens.color.gray500};
        }
      }
    `
  ];

  @property({ type: Object })
  item: InvoiceItemData = {
    description: '',
    quantity: 0,
    unitPrice: 0,
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
    return html`
      <div class="item">
        <div class="description">${this.item.description}</div>
        <div class="quantity">${this.item.quantity}</div>
        <div class="unit-price">${this.formatCurrency(this.item.unitPrice, this.item.currency)}</div>
        <div class="total">${this.formatCurrency(this.item.total, this.item.currency)}</div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'invoice-item': InvoiceItem;
  }
}
