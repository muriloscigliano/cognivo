import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

export type BillingCycleType = 'monthly' | 'yearly';

@customElement('billing-cycle')
export class BillingCycle extends LitElement {
  static override styles = [
    baseStyles,
    css`
      :host {
        display: block;
        font-family: ${tokens.fontFamily.primary};
      }

      .cycle-container {
        display: inline-flex;
        background: ${tokens.color.gray100};
        border-radius: ${tokens.radius.full};
        padding: 4px;
      }

      .cycle-button {
        padding: ${tokens.spacing.sm} ${tokens.spacing.lg};
        background: transparent;
        border: none;
        border-radius: ${tokens.radius.full};
        font-size: ${tokens.fontSize.base};
        font-weight: ${tokens.fontWeight.medium};
        color: ${tokens.color.gray900};
        cursor: pointer;
        transition: all ${tokens.transition.fast};
        position: relative;
      }

      .cycle-button:hover {
        color: ${tokens.color.gray900};
      }

      .cycle-button.active {
        background: white;
        color: ${tokens.color.primaryMain};
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }

      .savings-badge {
        position: absolute;
        top: -8px;
        right: -8px;
        background: ${tokens.color.success};
        color: white;
        font-size: ${tokens.fontSize.xs};
        font-weight: ${tokens.fontWeight.bold};
        padding: 2px 6px;
        border-radius: ${tokens.radius.full};
        white-space: nowrap;
      }
    `
  ];

  @property({ type: String })
  selected: BillingCycleType = 'monthly';

  @property({ type: String })
  savingsText = 'Save 20%';

  @property({ type: Boolean })
  showSavings = true;

  private handleSelect(cycle: BillingCycleType) {
    this.selected = cycle;

    this.dispatchEvent(new CustomEvent('cycle-change', {
      detail: { cycle },
      bubbles: true,
      composed: true
    }));
  }

  override render() {
    return html`
      <div class="cycle-container">
        <button
          class="cycle-button ${this.selected === 'monthly' ? 'active' : ''}"
          @click="${() => this.handleSelect('monthly')}"
        >
          Monthly
        </button>

        <button
          class="cycle-button ${this.selected === 'yearly' ? 'active' : ''}"
          @click="${() => this.handleSelect('yearly')}"
        >
          Yearly
          ${this.showSavings && this.savingsText ? html`
            <span class="savings-badge">${this.savingsText}</span>
          ` : ''}
        </button>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'billing-cycle': BillingCycle;
  }
}
