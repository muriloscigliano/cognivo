import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

@customElement('tax-line')
export class TaxLine extends LitElement {
  static override styles = [
    baseStyles,
    css`
      :host {
        display: block;
        font-family: ${tokens.fontFamily.primary};
      }

      .tax-line {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: ${tokens.spacing.sm} 0;
        font-size: ${tokens.fontSize.base};
      }

      .tax-label {
        color: ${tokens.color.gray700};
        display: flex;
        align-items: center;
        gap: ${tokens.spacing.xs};
      }

      .tax-rate {
        font-size: ${tokens.fontSize.xs};
        color: ${tokens.color.gray500};
      }

      .tax-value {
        font-weight: ${tokens.fontWeight.medium};
        color: ${tokens.color.gray900};
      }
    `
  ];

  @property({ type: String })
  label = 'Tax';

  @property({ type: Number })
  amount = 0;

  @property({ type: String })
  currency = 'USD';

  @property({ type: Number })
  rate = 0;

  @property({ type: Boolean })
  showRate = true;

  private formatCurrency(amount: number, currency: string): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(amount);
  }

  override render() {
    return html`
      <div class="tax-line">
        <span class="tax-label">
          ${this.label}
          ${this.showRate && this.rate > 0 ? html`
            <span class="tax-rate">(${this.rate}%)</span>
          ` : ''}
        </span>
        <span class="tax-value">${this.formatCurrency(this.amount, this.currency)}</span>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'tax-line': TaxLine;
  }
}
