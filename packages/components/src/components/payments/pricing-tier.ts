import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

export interface PricingTierData {
  min: number;
  max?: number;
  pricePerUnit: number;
  currency: string;
}

@customElement('pricing-tier')
export class PricingTier extends LitElement {
  static override styles = [
    baseStyles,
    css`
      :host {
        display: block;
        font-family: ${tokens.fontFamily.primary};
      }

      .tier {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: ${tokens.spacing.md};
        background: white;
        border: 1px solid ${tokens.color.gray100};
        border-radius: ${tokens.radius.md};
        transition: all ${tokens.transition.fast};
      }

      .tier:hover {
        border-color: ${tokens.color.primary};
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      }

      .tier-range {
        font-size: ${tokens.fontSize.base};
        color: ${tokens.color.gray900};
        font-weight: ${tokens.fontWeight.medium};
      }

      .tier-price {
        font-size: ${tokens.fontSize.lg};
        font-weight: ${tokens.fontWeight.bold};
        color: ${tokens.color.primary};
      }

      .price-label {
        font-size: ${tokens.fontSize.xs};
        color: ${tokens.color.gray500};
        margin-top: 2px;
      }
    `
  ];

  @property({ type: Object })
  tier: PricingTierData = {
    min: 0,
    pricePerUnit: 0,
    currency: 'USD'
  };

  private formatCurrency(amount: number, currency: string): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(amount);
  }

  private getRangeLabel(): string {
    if (this.tier.max !== undefined) {
      return `${this.tier.min} - ${this.tier.max}`;
    }
    return `${this.tier.min}+`;
  }

  override render() {
    return html`
      <div class="tier">
        <div class="tier-range">${this.getRangeLabel()} units</div>
        <div>
          <div class="tier-price">
            ${this.formatCurrency(this.tier.pricePerUnit, this.tier.currency)}
          </div>
          <div class="price-label">per unit</div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pricing-tier': PricingTier;
  }
}
