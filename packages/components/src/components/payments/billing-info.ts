import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

export interface BillingAddress {
  name: string;
  email: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

@customElement('billing-info')
export class BillingInfo extends LitElement {
  static override styles = [
    baseStyles,
    css`
      :host {
        display: block;
        font-family: ${tokens.fontFamily.primary};
      }

      .billing-container {
        background: white;
        border: 1px solid ${tokens.color.gray100};
        border-radius: ${tokens.radius.lg};
        padding: ${tokens.spacing.lg};
      }

      .billing-title {
        font-size: ${tokens.fontSize.lg};
        font-weight: ${tokens.fontWeight.bold};
        color: ${tokens.color.gray900};
        margin: 0 0 ${tokens.spacing.md} 0;
      }

      .form-row {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: ${tokens.spacing.md};
        margin-bottom: ${tokens.spacing.md};
      }

      .form-row.full {
        grid-template-columns: 1fr;
      }

      .input-group {
        display: flex;
        flex-direction: column;
        gap: ${tokens.spacing.xs};
      }

      .label {
        font-size: ${tokens.fontSize.sm};
        font-weight: ${tokens.fontWeight.medium};
        color: ${tokens.color.gray700};
      }

      .required {
        color: ${tokens.color.error};
      }

      .input {
        padding: ${tokens.spacing.md};
        border: 2px solid ${tokens.color.gray100};
        border-radius: ${tokens.radius.md};
        font-size: ${tokens.fontSize.base};
        font-family: ${tokens.fontFamily.primary};
        transition: all ${tokens.transition.fast};
      }

      .input:focus {
        outline: none;
        border-color: ${tokens.color.primary};
        box-shadow: 0 0 0 3px rgba(0, 100, 255, 0.1);
      }

      .input.error {
        border-color: ${tokens.color.error};
      }

      .error-message {
        font-size: ${tokens.fontSize.xs};
        color: ${tokens.color.error};
        margin-top: 4px;
      }

      @media (max-width: 640px) {
        .form-row {
          grid-template-columns: 1fr;
        }
      }
    `
  ];

  @property({ type: Object })
  address: Partial<BillingAddress> = {};

  @property({ type: Boolean })
  disabled = false;

  @state()
  private errors: Record<string, string> = {};

  private handleInput(field: keyof BillingAddress, value: string) {
    this.address = { ...this.address, [field]: value };

    this.dispatchEvent(new CustomEvent('billing-change', {
      detail: { address: this.address },
      bubbles: true,
      composed: true
    }));
  }

  override render() {
    return html`
      <div class="billing-container">
        <h3 class="billing-title">Billing Information</h3>

        <div class="form-row">
          <div class="input-group">
            <label class="label">
              Full Name <span class="required">*</span>
            </label>
            <input
              type="text"
              class="input"
              .value="${this.address.name || ''}"
              @input="${(e: Event) => this.handleInput('name', (e.target as HTMLInputElement).value)}"
              placeholder="John Doe"
              ?disabled="${this.disabled}"
            />
          </div>

          <div class="input-group">
            <label class="label">
              Email <span class="required">*</span>
            </label>
            <input
              type="email"
              class="input"
              .value="${this.address.email || ''}"
              @input="${(e: Event) => this.handleInput('email', (e.target as HTMLInputElement).value)}"
              placeholder="john@example.com"
              ?disabled="${this.disabled}"
            />
          </div>
        </div>

        <div class="form-row full">
          <div class="input-group">
            <label class="label">
              Address Line 1 <span class="required">*</span>
            </label>
            <input
              type="text"
              class="input"
              .value="${this.address.line1 || ''}"
              @input="${(e: Event) => this.handleInput('line1', (e.target as HTMLInputElement).value)}"
              placeholder="123 Main St"
              ?disabled="${this.disabled}"
            />
          </div>
        </div>

        <div class="form-row full">
          <div class="input-group">
            <label class="label">Address Line 2</label>
            <input
              type="text"
              class="input"
              .value="${this.address.line2 || ''}"
              @input="${(e: Event) => this.handleInput('line2', (e.target as HTMLInputElement).value)}"
              placeholder="Apt 4B (optional)"
              ?disabled="${this.disabled}"
            />
          </div>
        </div>

        <div class="form-row">
          <div class="input-group">
            <label class="label">
              City <span class="required">*</span>
            </label>
            <input
              type="text"
              class="input"
              .value="${this.address.city || ''}"
              @input="${(e: Event) => this.handleInput('city', (e.target as HTMLInputElement).value)}"
              placeholder="New York"
              ?disabled="${this.disabled}"
            />
          </div>

          <div class="input-group">
            <label class="label">
              State/Province <span class="required">*</span>
            </label>
            <input
              type="text"
              class="input"
              .value="${this.address.state || ''}"
              @input="${(e: Event) => this.handleInput('state', (e.target as HTMLInputElement).value)}"
              placeholder="NY"
              ?disabled="${this.disabled}"
            />
          </div>
        </div>

        <div class="form-row">
          <div class="input-group">
            <label class="label">
              ZIP/Postal Code <span class="required">*</span>
            </label>
            <input
              type="text"
              class="input"
              .value="${this.address.zip || ''}"
              @input="${(e: Event) => this.handleInput('zip', (e.target as HTMLInputElement).value)}"
              placeholder="10001"
              ?disabled="${this.disabled}"
            />
          </div>

          <div class="input-group">
            <label class="label">
              Country <span class="required">*</span>
            </label>
            <input
              type="text"
              class="input"
              .value="${this.address.country || ''}"
              @input="${(e: Event) => this.handleInput('country', (e.target as HTMLInputElement).value)}"
              placeholder="United States"
              ?disabled="${this.disabled}"
            />
          </div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'billing-info': BillingInfo;
  }
}
