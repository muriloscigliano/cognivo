import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';
import type { SubscriptionPlan } from './subscription-card.js';

@customElement('pricing-card')
export class PricingCard extends LitElement {
  static override styles = [
    baseStyles,
    css`
      :host {
        display: block;
        font-family: ${tokens.fontFamily.primary};
      }

      .card {
        background: white;
        border: 2px solid ${tokens.color.gray100};
        border-radius: ${tokens.radius.lg};
        padding: ${tokens.spacing.xl};
        height: 100%;
        display: flex;
        flex-direction: column;
        transition: all ${tokens.transition.normal};
      }

      .card:hover {
        border-color: ${tokens.color.primary};
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        transform: translateY(-2px);
      }

      .card.popular {
        border-color: ${tokens.color.primary};
        box-shadow: 0 8px 24px rgba(0, 100, 255, 0.15);
      }

      .card-header {
        text-align: center;
        margin-bottom: ${tokens.spacing.lg};
      }

      .plan-name {
        font-size: ${tokens.fontSize.xl};
        font-weight: ${tokens.fontWeight.bold};
        color: ${tokens.color.gray900};
        margin: 0 0 ${tokens.spacing.xs} 0;
      }

      .plan-description {
        font-size: ${tokens.fontSize.sm};
        color: ${tokens.color.gray500};
        margin: 0;
      }

      .pricing {
        text-align: center;
        margin-bottom: ${tokens.spacing.xl};
      }

      .price {
        display: flex;
        align-items: baseline;
        justify-content: center;
        gap: 4px;
        margin-bottom: ${tokens.spacing.sm};
      }

      .currency {
        font-size: ${tokens.fontSize.lg};
        font-weight: ${tokens.fontWeight.bold};
        color: ${tokens.color.gray700};
      }

      .amount {
        font-size: 48px;
        font-weight: ${tokens.fontWeight.bold};
        color: ${tokens.color.gray900};
        line-height: 1;
      }

      .interval {
        font-size: ${tokens.fontSize.base};
        color: ${tokens.color.gray500};
      }

      .features {
        flex: 1;
        margin-bottom: ${tokens.spacing.lg};
      }

      .features-list {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: column;
        gap: ${tokens.spacing.sm};
      }

      .feature-item {
        display: flex;
        align-items: center;
        gap: ${tokens.spacing.sm};
        font-size: ${tokens.fontSize.sm};
        color: ${tokens.color.gray700};
      }

      .feature-icon {
        color: ${tokens.color.success};
        font-weight: bold;
        flex-shrink: 0;
      }
    `
  ];

  @property({ type: Object })
  plan: SubscriptionPlan = {
    id: '',
    name: 'Plan',
    description: '',
    price: 0,
    currency: 'USD',
    interval: 'monthly',
    features: []
  };

  private getCurrencySymbol(currency: string): string {
    const symbols: Record<string, string> = {
      USD: '$',
      EUR: '€',
      GBP: '£',
      JPY: '¥'
    };
    return symbols[currency] || currency;
  }

  override render() {
    const classes = ['card', this.plan.popular ? 'popular' : ''].filter(Boolean).join(' ');

    return html`
      <div class="${classes}">
        <div class="card-header">
          <h3 class="plan-name">${this.plan.name}</h3>
          <p class="plan-description">${this.plan.description}</p>
        </div>

        <div class="pricing">
          <div class="price">
            <span class="currency">${this.getCurrencySymbol(this.plan.currency)}</span>
            <span class="amount">${this.plan.price}</span>
            <span class="interval">/${this.plan.interval}</span>
          </div>
        </div>

        <div class="features">
          <ul class="features-list">
            ${this.plan.features.map(feature => html`
              <li class="feature-item">
                <span class="feature-icon">✓</span>
                <span>${feature}</span>
              </li>
            `)}
          </ul>
        </div>

        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pricing-card': PricingCard;
  }
}
