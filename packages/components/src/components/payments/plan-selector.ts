import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';
import type { SubscriptionPlan } from './subscription-card.js';

@customElement('plan-selector')
export class PlanSelector extends LitElement {
  static override styles = [
    baseStyles,
    css`
      :host {
        display: block;
        font-family: ${tokens.fontFamily.primary};
      }

      .selector-container {
        background: white;
        border: 1px solid ${tokens.color.gray100};
        border-radius: ${tokens.radius.lg};
        padding: ${tokens.spacing.lg};
      }

      .selector-header {
        margin-bottom: ${tokens.spacing.lg};
      }

      .selector-title {
        font-size: ${tokens.fontSize.lg};
        font-weight: ${tokens.fontWeight.bold};
        color: ${tokens.color.gray900};
        margin: 0 0 ${tokens.spacing.xs} 0;
      }

      .selector-description {
        font-size: ${tokens.fontSize.sm};
        color: ${tokens.color.gray500};
        margin: 0;
      }

      .plans-list {
        display: flex;
        flex-direction: column;
        gap: ${tokens.spacing.md};
      }

      .plan-option {
        display: flex;
        align-items: center;
        padding: ${tokens.spacing.md};
        border: 2px solid ${tokens.color.gray100};
        border-radius: ${tokens.radius.md};
        cursor: pointer;
        transition: all ${tokens.transition.fast};
      }

      .plan-option:hover {
        border-color: ${tokens.color.primaryMain};
        background: ${tokens.color.gray50};
      }

      .plan-option.selected {
        border-color: ${tokens.color.primaryMain};
        background: rgba(0, 100, 255, 0.05);
      }

      .radio {
        width: 20px;
        height: 20px;
        border: 2px solid ${tokens.color.gray100};
        border-radius: 50%;
        margin-right: ${tokens.spacing.md};
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
      }

      .plan-option.selected .radio {
        border-color: ${tokens.color.primaryMain};
      }

      .radio-dot {
        width: 10px;
        height: 10px;
        background: ${tokens.color.primaryMain};
        border-radius: 50%;
        display: none;
      }

      .plan-option.selected .radio-dot {
        display: block;
      }

      .plan-info {
        flex: 1;
      }

      .plan-name {
        font-size: ${tokens.fontSize.base};
        font-weight: ${tokens.fontWeight.semibold};
        color: ${tokens.color.gray900};
        margin-bottom: 4px;
      }

      .plan-description {
        font-size: ${tokens.fontSize.sm};
        color: ${tokens.color.gray500};
      }

      .plan-price {
        font-size: ${tokens.fontSize.lg};
        font-weight: ${tokens.fontWeight.bold};
        color: ${tokens.color.primaryMain};
        white-space: nowrap;
      }
    `
  ];

  @property({ type: Array })
  plans: SubscriptionPlan[] = [];

  @property({ type: String })
  selectedPlanId = '';

  @property({ type: String })
  override title: string = 'Select a Plan';

  @property({ type: String })
  description = '';

  private handlePlanSelect(plan: SubscriptionPlan) {
    this.selectedPlanId = plan.id;

    this.dispatchEvent(new CustomEvent('plan-change', {
      detail: { plan },
      bubbles: true,
      composed: true
    }));
  }

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
    return html`
      <div class="selector-container">
        <div class="selector-header">
          <h3 class="selector-title">${this.title}</h3>
          ${this.description ? html`
            <p class="selector-description">${this.description}</p>
          ` : ''}
        </div>

        <div class="plans-list">
          ${this.plans.map(plan => html`
            <div
              class="plan-option ${this.selectedPlanId === plan.id ? 'selected' : ''}"
              @click="${() => this.handlePlanSelect(plan)}"
            >
              <div class="radio">
                <div class="radio-dot"></div>
              </div>
              <div class="plan-info">
                <div class="plan-name">${plan.name}</div>
                <div class="plan-description">${plan.description}</div>
              </div>
              <div class="plan-price">
                ${this.getCurrencySymbol(plan.currency)}${plan.price}/${plan.interval}
              </div>
            </div>
          `)}
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'plan-selector': PlanSelector;
  }
}
