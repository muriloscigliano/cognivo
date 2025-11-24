import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

export type CardBrand = 'visa' | 'mastercard' | 'amex' | 'discover' | 'unknown';

export interface CardValidation {
  valid: boolean;
  error?: string;
}

@customElement('credit-card-input')
export class CreditCardInput extends LitElement {
  static override styles = [
    baseStyles,
    css`
      :host {
        display: block;
        font-family: ${tokens.fontFamily.primary};
      }

      .card-input-container {
        display: flex;
        flex-direction: column;
        gap: ${tokens.spacing.md};
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

      .input-wrapper {
        position: relative;
      }

      .input {
        width: 100%;
        padding: ${tokens.spacing.md};
        border: 2px solid ${tokens.color.gray100};
        border-radius: ${tokens.radius.md};
        font-size: ${tokens.fontSize.base};
        font-family: ${tokens.fontFamily.primary};
        transition: all ${tokens.transition.fast};
        box-sizing: border-box;
      }

      .input:focus {
        outline: none;
        border-color: ${tokens.color.primary};
        box-shadow: 0 0 0 3px rgba(0, 100, 255, 0.1);
      }

      .input.error {
        border-color: ${tokens.color.error};
      }

      .input.error:focus {
        box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
      }

      .card-number-input {
        padding-right: 50px;
      }

      .card-brand-icon {
        position: absolute;
        right: ${tokens.spacing.md};
        top: 50%;
        transform: translateY(-50%);
        font-size: 24px;
        pointer-events: none;
      }

      .row {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: ${tokens.spacing.md};
      }

      .error-message {
        font-size: ${tokens.fontSize.xs};
        color: ${tokens.color.error};
        margin-top: 4px;
      }

      .security-note {
        display: flex;
        align-items: center;
        gap: ${tokens.spacing.xs};
        padding: ${tokens.spacing.sm};
        background: ${tokens.color.gray50};
        border-radius: ${tokens.radius.sm};
        font-size: ${tokens.fontSize.xs};
        color: ${tokens.color.gray500};
      }

      .security-icon {
        color: ${tokens.color.success};
      }

      @media (max-width: 640px) {
        .row {
          grid-template-columns: 1fr;
        }
      }
    `
  ];

  @property({ type: String })
  cardNumber = '';

  @property({ type: String })
  cardholderName = '';

  @property({ type: String })
  expiryDate = '';

  @property({ type: String })
  cvv = '';

  @property({ type: Boolean })
  disabled = false;

  @state()
  private cardBrand: CardBrand = 'unknown';

  @state()
  private errors: Record<string, string> = {};

  private detectCardBrand(number: string): CardBrand {
    const cleaned = number.replace(/\s/g, '');

    if (/^4/.test(cleaned)) return 'visa';
    if (/^5[1-5]/.test(cleaned)) return 'mastercard';
    if (/^3[47]/.test(cleaned)) return 'amex';
    if (/^6(?:011|5)/.test(cleaned)) return 'discover';

    return 'unknown';
  }

  private getCardBrandIcon(brand: CardBrand): string {
    const icons: Record<CardBrand, string> = {
      visa: '💳',
      mastercard: '💳',
      amex: '💳',
      discover: '💳',
      unknown: '💳'
    };
    return icons[brand];
  }

  private formatCardNumber(value: string): string {
    const cleaned = value.replace(/\s/g, '');
    const chunks = cleaned.match(/.{1,4}/g) || [];
    return chunks.join(' ').substr(0, 19); // Max 16 digits + 3 spaces
  }

  private formatExpiryDate(value: string): string {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length >= 2) {
      return cleaned.substr(0, 2) + '/' + cleaned.substr(2, 2);
    }
    return cleaned;
  }

  private validateCardNumber(number: string): CardValidation {
    const cleaned = number.replace(/\s/g, '');

    if (!cleaned) {
      return { valid: false, error: 'Card number is required' };
    }

    if (cleaned.length < 13 || cleaned.length > 16) {
      return { valid: false, error: 'Invalid card number length' };
    }

    // Luhn algorithm
    let sum = 0;
    let isEven = false;

    for (let i = cleaned.length - 1; i >= 0; i--) {
      let digit = parseInt(cleaned[i], 10);

      if (isEven) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }

      sum += digit;
      isEven = !isEven;
    }

    if (sum % 10 !== 0) {
      return { valid: false, error: 'Invalid card number' };
    }

    return { valid: true };
  }

  private validateExpiryDate(expiry: string): CardValidation {
    if (!expiry) {
      return { valid: false, error: 'Expiry date is required' };
    }

    const [month, year] = expiry.split('/');
    if (!month || !year || month.length !== 2 || year.length !== 2) {
      return { valid: false, error: 'Invalid format (MM/YY)' };
    }

    const monthNum = parseInt(month, 10);
    if (monthNum < 1 || monthNum > 12) {
      return { valid: false, error: 'Invalid month' };
    }

    const now = new Date();
    const currentYear = now.getFullYear() % 100;
    const currentMonth = now.getMonth() + 1;
    const yearNum = parseInt(year, 10);

    if (yearNum < currentYear || (yearNum === currentYear && monthNum < currentMonth)) {
      return { valid: false, error: 'Card has expired' };
    }

    return { valid: true };
  }

  private validateCVV(cvv: string): CardValidation {
    if (!cvv) {
      return { valid: false, error: 'CVV is required' };
    }

    const expectedLength = this.cardBrand === 'amex' ? 4 : 3;
    if (cvv.length !== expectedLength) {
      return { valid: false, error: `CVV must be ${expectedLength} digits` };
    }

    return { valid: true };
  }

  private handleCardNumberInput(e: Event) {
    const input = e.target as HTMLInputElement;
    const formatted = this.formatCardNumber(input.value);
    this.cardNumber = formatted;
    this.cardBrand = this.detectCardBrand(formatted);

    const validation = this.validateCardNumber(formatted);
    if (!validation.valid && formatted.length >= 13) {
      this.errors = { ...this.errors, cardNumber: validation.error || '' };
    } else {
      const { cardNumber, ...rest } = this.errors;
      this.errors = rest;
    }

    this.dispatchChange();
  }

  private handleExpiryInput(e: Event) {
    const input = e.target as HTMLInputElement;
    const formatted = this.formatExpiryDate(input.value);
    this.expiryDate = formatted;

    if (formatted.length === 5) {
      const validation = this.validateExpiryDate(formatted);
      if (!validation.valid) {
        this.errors = { ...this.errors, expiry: validation.error || '' };
      } else {
        const { expiry, ...rest } = this.errors;
        this.errors = rest;
      }
    }

    this.dispatchChange();
  }

  private handleCVVInput(e: Event) {
    const input = e.target as HTMLInputElement;
    const value = input.value.replace(/\D/g, '').substr(0, 4);
    this.cvv = value;

    this.dispatchChange();
  }

  private handleNameInput(e: Event) {
    const input = e.target as HTMLInputElement;
    this.cardholderName = input.value;
    this.dispatchChange();
  }

  private dispatchChange() {
    const cardValidation = this.validateCardNumber(this.cardNumber);
    const expiryValidation = this.validateExpiryDate(this.expiryDate);
    const cvvValidation = this.validateCVV(this.cvv);

    this.dispatchEvent(new CustomEvent('card-change', {
      detail: {
        cardNumber: this.cardNumber,
        cardholderName: this.cardholderName,
        expiryDate: this.expiryDate,
        cvv: this.cvv,
        cardBrand: this.cardBrand,
        valid: cardValidation.valid && expiryValidation.valid && cvvValidation.valid && !!this.cardholderName
      },
      bubbles: true,
      composed: true
    }));
  }

  override render() {
    return html`
      <div class="card-input-container">
        <div class="input-group">
          <label class="label">Card Number</label>
          <div class="input-wrapper">
            <input
              type="text"
              class="input card-number-input ${this.errors.cardNumber ? 'error' : ''}"
              .value="${this.cardNumber}"
              @input="${this.handleCardNumberInput}"
              placeholder="1234 5678 9012 3456"
              ?disabled="${this.disabled}"
              inputmode="numeric"
            />
            <span class="card-brand-icon">${this.getCardBrandIcon(this.cardBrand)}</span>
          </div>
          ${this.errors.cardNumber ? html`
            <div class="error-message">${this.errors.cardNumber}</div>
          ` : ''}
        </div>

        <div class="input-group">
          <label class="label">Cardholder Name</label>
          <input
            type="text"
            class="input"
            .value="${this.cardholderName}"
            @input="${this.handleNameInput}"
            placeholder="John Doe"
            ?disabled="${this.disabled}"
          />
        </div>

        <div class="row">
          <div class="input-group">
            <label class="label">Expiry Date</label>
            <input
              type="text"
              class="input ${this.errors.expiry ? 'error' : ''}"
              .value="${this.expiryDate}"
              @input="${this.handleExpiryInput}"
              placeholder="MM/YY"
              ?disabled="${this.disabled}"
              inputmode="numeric"
            />
            ${this.errors.expiry ? html`
              <div class="error-message">${this.errors.expiry}</div>
            ` : ''}
          </div>

          <div class="input-group">
            <label class="label">CVV</label>
            <input
              type="text"
              class="input"
              .value="${this.cvv}"
              @input="${this.handleCVVInput}"
              placeholder="${this.cardBrand === 'amex' ? '1234' : '123'}"
              ?disabled="${this.disabled}"
              inputmode="numeric"
            />
          </div>
        </div>

        <div class="security-note">
          <span class="security-icon">🔒</span>
          <span>Your payment information is encrypted and secure</span>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'credit-card-input': CreditCardInput;
  }
}
