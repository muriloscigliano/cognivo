import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

export interface SubscriptionPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  interval: 'monthly' | 'yearly' | 'weekly';
  features: string[];
  badge?: string;
  popular?: boolean;
  current?: boolean;
}

@customElement('subscription-card')
export class SubscriptionCard extends LitElement {
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
        transition: all ${tokens.transition.default};
        position: relative;
      }

      .card:hover {
        border-color: ${tokens.color.primaryMain};
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        transform: translateY(-2px);
      }

      .card.popular {
        border-color: ${tokens.color.primaryMain};
        box-shadow: 0 8px 24px rgba(0, 100, 255, 0.15);
      }

      .card.current {
        border-color: ${tokens.color.success};
        background: ${tokens.color.gray50};
      }

      .badge {
        position: absolute;
        top: -12px;
        left: 50%;
        transform: translateX(-50%);
        background: ${tokens.color.primaryMain};
        color: white;
        padding: 4px ${tokens.spacing.md};
        border-radius: ${tokens.radius.full};
        font-size: ${tokens.fontSize.xs};
        font-weight: ${tokens.fontWeight.bold};
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }

      .current-badge {
        background: ${tokens.color.success};
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
      }

      .currency {
        font-size: ${tokens.fontSize.lg};
        font-weight: ${tokens.fontWeight.bold};
        color: ${tokens.color.gray900};
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
        color: ${tokens.color.gray900};
      }

      .feature-icon {
        color: ${tokens.color.success};
        font-weight: bold;
        flex-shrink: 0;
      }

      .cta-button {
        width: 100%;
        padding: ${tokens.spacing.md} ${tokens.spacing.lg};
        background: ${tokens.color.primaryMain};
        color: white;
        border: none;
        border-radius: ${tokens.radius.md};
        font-size: ${tokens.fontSize.base};
        font-weight: ${tokens.fontWeight.semibold};
        cursor: pointer;
        transition: all ${tokens.transition.fast};
      }

      .cta-button:hover {
        background: ${tokens.color.primaryDark};
        transform: scale(1.02);
      }

      .cta-button:disabled {
        background: ${tokens.color.gray100};
        cursor: not-allowed;
        transform: none;
      }

      .card.current .cta-button {
        background: ${tokens.color.success};
      }

      .card.current .cta-button:hover {
        background: ${tokens.color.success};
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

  @property({ type: Boolean })
  disabled = false;

  private getCurrencySymbol(currency: string): string {
    const symbols: Record<string, string> = {
      USD: '$',
      EUR: '€',
      GBP: '£',
      JPY: '¥'
    };
    return symbols[currency] || currency;
  }

  private handleSelect() {
    if (this.disabled || this.plan.current) return;

    this.dispatchEvent(new CustomEvent('plan-select', {
      detail: { plan: this.plan },
      bubbles: true,
      composed: true
    }));
  }

  override render() {
    const classes = [
      'card',
      this.plan.popular ? 'popular' : '',
      this.plan.current ? 'current' : ''
    ].filter(Boolean).join(' ');

    return html`
      <div class="${classes}">
        ${this.plan.popular && this.plan.badge ? html`
          <div class="badge">${this.plan.badge}</div>
        ` : ''}

        ${this.plan.current ? html`
          <div class="badge current-badge">Current Plan</div>
        ` : ''}

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

        <button
          class="cta-button"
          ?disabled="${this.disabled || this.plan.current}"
          @click="${this.handleSelect}"
        >
          ${this.plan.current ? 'Current Plan' : 'Select Plan'}
        </button>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'subscription-card': SubscriptionCard;
  }
}
