import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

export interface ComparisonFeature {
  name: string;
  values: (string | boolean)[];
}

export interface ComparisonPlan {
  name: string;
  price: number;
  currency: string;
  interval: string;
}

@customElement('pricing-comparison')
export class PricingComparison extends LitElement {
  static override styles = [
    baseStyles,
    css`
      :host {
        display: block;
        font-family: ${tokens.fontFamily.primary};
      }

      .comparison-container {
        background: white;
        border: 1px solid ${tokens.color.gray100};
        border-radius: ${tokens.radius.lg};
        overflow-x: auto;
      }

      .comparison-table {
        width: 100%;
        border-collapse: collapse;
        min-width: 600px;
      }

      .table-header th {
        padding: ${tokens.spacing.lg};
        background: ${tokens.color.gray50};
        border-bottom: 2px solid ${tokens.color.gray100};
        text-align: center;
        font-size: ${tokens.fontSize.base};
        font-weight: ${tokens.fontWeight.bold};
        color: ${tokens.color.gray900};
      }

      .table-header th:first-child {
        text-align: left;
      }

      .plan-cell {
        padding: ${tokens.spacing.md};
      }

      .plan-name {
        font-size: ${tokens.fontSize.lg};
        font-weight: ${tokens.fontWeight.bold};
        color: ${tokens.color.gray900};
        margin: 0 0 ${tokens.spacing.xs} 0;
      }

      .plan-price {
        font-size: ${tokens.fontSize.sm};
        color: ${tokens.color.primaryMain};
        font-weight: ${tokens.fontWeight.semibold};
      }

      tbody tr {
        border-bottom: 1px solid ${tokens.color.gray100};
      }

      tbody td {
        padding: ${tokens.spacing.md};
        text-align: center;
        font-size: ${tokens.fontSize.sm};
        color: ${tokens.color.gray900};
      }

      tbody td:first-child {
        text-align: left;
        font-weight: ${tokens.fontWeight.medium};
        color: ${tokens.color.gray900};
      }

      .check-icon {
        color: ${tokens.color.success};
        font-size: ${tokens.fontSize.lg};
      }

      .cross-icon {
        color: ${tokens.color.gray100};
        font-size: ${tokens.fontSize.lg};
      }
    `
  ];

  @property({ type: Array })
  plans: ComparisonPlan[] = [];

  @property({ type: Array })
  features: ComparisonFeature[] = [];

  private formatCurrency(amount: number, currency: string): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(amount);
  }

  private renderValue(value: string | boolean) {
    if (typeof value === 'boolean') {
      return value ? html`<span class="check-icon">✓</span>` : html`<span class="cross-icon">✕</span>`;
    }
    return value;
  }

  override render() {
    return html`
      <div class="comparison-container">
        <table class="comparison-table">
          <thead class="table-header">
            <tr>
              <th>Features</th>
              ${this.plans.map(plan => html`
                <th>
                  <div class="plan-cell">
                    <div class="plan-name">${plan.name}</div>
                    <div class="plan-price">
                      ${this.formatCurrency(plan.price, plan.currency)}/${plan.interval}
                    </div>
                  </div>
                </th>
              `)}
            </tr>
          </thead>
          <tbody>
            ${this.features.map(feature => html`
              <tr>
                <td>${feature.name}</td>
                ${feature.values.map(value => html`
                  <td>${this.renderValue(value)}</td>
                `)}
              </tr>
            `)}
          </tbody>
        </table>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pricing-comparison': PricingComparison;
  }
}
