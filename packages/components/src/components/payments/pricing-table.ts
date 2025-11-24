import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';
import type { SubscriptionPlan } from './subscription-card.js';

@customElement('pricing-table')
export class PricingTable extends LitElement {
  static override styles = [
    baseStyles,
    css`
      :host {
        display: block;
        font-family: ${tokens.fontFamily.primary};
      }

      .table-container {
        background: white;
        border: 1px solid ${tokens.color.gray100};
        border-radius: ${tokens.radius.lg};
        overflow: hidden;
      }

      .table-header {
        padding: ${tokens.spacing.lg};
        background: ${tokens.color.gray50};
        border-bottom: 1px solid ${tokens.color.gray100};
        text-align: center;
      }

      .table-title {
        font-size: ${tokens.fontSize.xl};
        font-weight: ${tokens.fontWeight.bold};
        color: ${tokens.color.gray900};
        margin: 0 0 ${tokens.spacing.xs} 0;
      }

      .table-subtitle {
        font-size: ${tokens.fontSize.sm};
        color: ${tokens.color.gray500};
        margin: 0;
      }

      .plans-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: ${tokens.spacing.lg};
        padding: ${tokens.spacing.xl};
      }

      @media (max-width: 768px) {
        .plans-grid {
          grid-template-columns: 1fr;
        }
      }
    `
  ];

  @property({ type: Array })
  plans: SubscriptionPlan[] = [];

  @property({ type: String })
  title = 'Choose Your Plan';

  @property({ type: String })
  subtitle = 'Select the perfect plan for your needs';

  @property({ type: Boolean })
  showHeader = true;

  override render() {
    return html`
      <div class="table-container">
        ${this.showHeader ? html`
          <div class="table-header">
            <h2 class="table-title">${this.title}</h2>
            <p class="table-subtitle">${this.subtitle}</p>
          </div>
        ` : ''}

        <div class="plans-grid">
          ${this.plans.map(plan => html`
            <subscription-card .plan="${plan}"></subscription-card>
          `)}
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pricing-table': PricingTable;
  }
}
