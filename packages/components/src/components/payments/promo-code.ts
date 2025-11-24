import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

@customElement('promo-code')
export class PromoCode extends LitElement {
  static override styles = [
    baseStyles,
    css`
      :host {
        display: block;
        font-family: ${tokens.fontFamily.primary};
      }

      .promo-container {
        background: white;
        border: 1px solid ${tokens.color.gray100};
        border-radius: ${tokens.radius.lg};
        padding: ${tokens.spacing.md};
      }

      .promo-header {
        display: flex;
        align-items: center;
        gap: ${tokens.spacing.xs};
        margin-bottom: ${tokens.spacing.sm};
      }

      .promo-title {
        font-size: ${tokens.fontSize.sm};
        font-weight: ${tokens.fontWeight.medium};
        color: ${tokens.color.gray900};
      }

      .promo-icon {
        color: ${tokens.color.primaryMain};
      }

      .promo-input-group {
        display: flex;
        gap: ${tokens.spacing.sm};
      }

      .promo-input {
        flex: 1;
        padding: ${tokens.spacing.sm} ${tokens.spacing.md};
        border: 2px solid ${tokens.color.gray100};
        border-radius: ${tokens.radius.md};
        font-size: ${tokens.fontSize.base};
        font-family: ${tokens.fontFamily.primary};
        transition: all ${tokens.transition.fast};
      }

      .promo-input:focus {
        outline: none;
        border-color: ${tokens.color.primaryMain};
        box-shadow: 0 0 0 3px rgba(0, 100, 255, 0.1);
      }

      .promo-input.error {
        border-color: ${tokens.color.danger};
      }

      .promo-input.success {
        border-color: ${tokens.color.success};
      }

      .apply-button {
        padding: ${tokens.spacing.sm} ${tokens.spacing.lg};
        background: ${tokens.color.primaryMain};
        color: white;
        border: none;
        border-radius: ${tokens.radius.md};
        font-size: ${tokens.fontSize.sm};
        font-weight: ${tokens.fontWeight.semibold};
        cursor: pointer;
        transition: all ${tokens.transition.fast};
        white-space: nowrap;
      }

      .apply-button:hover:not(:disabled) {
        background: ${tokens.color.primaryDark};
      }

      .apply-button:disabled {
        background: ${tokens.color.gray100};
        cursor: not-allowed;
      }

      .promo-message {
        margin-top: ${tokens.spacing.sm};
        font-size: ${tokens.fontSize.xs};
        display: flex;
        align-items: center;
        gap: ${tokens.spacing.xs};
      }

      .promo-message.success {
        color: ${tokens.color.success};
      }

      .promo-message.error {
        color: ${tokens.color.danger};
      }

      .applied-badge {
        display: inline-flex;
        align-items: center;
        gap: ${tokens.spacing.xs};
        padding: 4px ${tokens.spacing.sm};
        background: rgba(34, 197, 94, 0.1);
        color: ${tokens.color.success};
        border-radius: ${tokens.radius.sm};
        font-size: ${tokens.fontSize.xs};
        font-weight: ${tokens.fontWeight.medium};
      }

      .remove-button {
        background: none;
        border: none;
        color: ${tokens.color.success};
        cursor: pointer;
        padding: 0;
        margin-left: ${tokens.spacing.xs};
        font-size: ${tokens.fontSize.sm};
      }
    `
  ];

  @property({ type: String })
  code = '';

  @property({ type: Boolean })
  loading = false;

  @property({ type: Boolean })
  applied = false;

  @property({ type: String })
  errorMessage = '';

  @property({ type: String })
  successMessage = '';

  @state()
  private inputValue = '';

  private handleInput(e: Event) {
    const input = e.target as HTMLInputElement;
    this.inputValue = input.value.toUpperCase();
  }

  private handleApply() {
    if (!this.inputValue || this.loading) return;

    this.dispatchEvent(new CustomEvent('promo-apply', {
      detail: { code: this.inputValue },
      bubbles: true,
      composed: true
    }));
  }

  private handleRemove() {
    this.inputValue = '';
    this.code = '';
    this.applied = false;
    this.errorMessage = '';
    this.successMessage = '';

    this.dispatchEvent(new CustomEvent('promo-remove', {
      bubbles: true,
      composed: true
    }));
  }

  override render() {
    return html`
      <div class="promo-container">
        <div class="promo-header">
          <span class="promo-icon">🏷️</span>
          <span class="promo-title">Have a promo code?</span>
        </div>

        ${this.applied ? html`
          <div class="applied-badge">
            ✓ ${this.code} applied
            <button class="remove-button" @click="${this.handleRemove}">
              ✕
            </button>
          </div>
        ` : html`
          <div class="promo-input-group">
            <input
              type="text"
              class="promo-input ${this.errorMessage ? 'error' : ''} ${this.successMessage ? 'success' : ''}"
              .value="${this.inputValue}"
              @input="${this.handleInput}"
              placeholder="Enter code"
              ?disabled="${this.loading}"
            />
            <button
              class="apply-button"
              @click="${this.handleApply}"
              ?disabled="${!this.inputValue || this.loading}"
            >
              ${this.loading ? 'Applying...' : 'Apply'}
            </button>
          </div>

          ${this.successMessage ? html`
            <div class="promo-message success">
              ✓ ${this.successMessage}
            </div>
          ` : ''}

          ${this.errorMessage ? html`
            <div class="promo-message error">
              ✕ ${this.errorMessage}
            </div>
          ` : ''}
        `}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'promo-code': PromoCode;
  }
}
