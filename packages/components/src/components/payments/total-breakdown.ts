import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

export interface BreakdownData {
  subtotal: number;
  tax: number;
  discount?: number;
  shipping?: number;
  total: number;
  currency: string;
}

@customElement('total-breakdown')
export class TotalBreakdown extends LitElement {
  static override styles = [
    baseStyles,
    css`
      :host {
        display: block;
        font-family: ${tokens.fontFamily.primary};
      }

      .breakdown-container {
        background: white;
        border: 1px solid ${tokens.color.gray100};
        border-radius: ${tokens.radius.lg};
        padding: ${tokens.spacing.lg};
      }

      .breakdown-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: ${tokens.spacing.sm};
        font-size: ${tokens.fontSize.base};
      }

      .breakdown-row:last-child {
        margin-bottom: 0;
      }

      .breakdown-label {
        color: ${tokens.color.gray700};
      }

      .breakdown-value {
        font-weight: ${tokens.fontWeight.medium};
        color: ${tokens.color.gray900};
      }

      .discount-value {
        color: ${tokens.color.success};
      }

      .total-row {
        margin-top: ${tokens.spacing.md};
        padding-top: ${tokens.spacing.md};
        border-top: 2px solid ${tokens.color.gray200};
      }

      .total-row .breakdown-label {
        font-size: ${tokens.fontSize.lg};
        font-weight: ${tokens.fontWeight.bold};
        color: ${tokens.color.gray900};
      }

      .total-row .breakdown-value {
        font-size: ${tokens.fontSize.xl};
        font-weight: ${tokens.fontWeight.bold};
        color: ${tokens.color.primary};
      }
    `
  ];

  @property({ type: Object })
  data: BreakdownData = {
    subtotal: 0,
    tax: 0,
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
      <div class="breakdown-container">
        <div class="breakdown-row">
          <span class="breakdown-label">Subtotal</span>
          <span class="breakdown-value">${this.formatCurrency(this.data.subtotal, this.data.currency)}</span>
        </div>

        ${this.data.shipping !== undefined ? html`
          <div class="breakdown-row">
            <span class="breakdown-label">Shipping</span>
            <span class="breakdown-value">${this.formatCurrency(this.data.shipping, this.data.currency)}</span>
          </div>
        ` : ''}

        ${this.data.discount && this.data.discount > 0 ? html`
          <div class="breakdown-row">
            <span class="breakdown-label">Discount</span>
            <span class="breakdown-value discount-value">
              -${this.formatCurrency(this.data.discount, this.data.currency)}
            </span>
          </div>
        ` : ''}

        <div class="breakdown-row">
          <span class="breakdown-label">Tax</span>
          <span class="breakdown-value">${this.formatCurrency(this.data.tax, this.data.currency)}</span>
        </div>

        <div class="breakdown-row total-row">
          <span class="breakdown-label">Total</span>
          <span class="breakdown-value">${this.formatCurrency(this.data.total, this.data.currency)}</span>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'total-breakdown': TotalBreakdown;
  }
}
