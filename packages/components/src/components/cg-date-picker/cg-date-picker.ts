import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * <cg-date-picker> — Native date input with Cognivo styling.
 *
 * Better than OpenUI's DatePicker:
 * - Uses native browser date picker (works everywhere, no JS calendar)
 * - Consistent styling via Shadow DOM
 * - min/max date support
 * - All states: default, focus, disabled, error
 */
@customElement('cg-date-picker')
export class CgDatePicker extends LitElement {
  static override styles = css`
    :host { display: block; font-family: var(--cg-font-family-primary, 'Inter Variable', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif); }

    input {
      width: 100%; padding: var(--cg-spacing-8, 8px) var(--cg-spacing-12, 12px); min-height: 40px;
      border: var(--cg-border-width-50, 1px) solid var(--cg-color-surface-field-border, #27272a);
      border-radius: var(--cg-border-radius-150, 12px);
      background: var(--cg-color-input-background-default, #18181b);
      color: var(--cg-color-surface-base-text, #fafafa);
      font: inherit; font-size: var(--cg-font-size-sm, 14px);
      outline: none;
      transition: border-color var(--cg-motion-duration-normal, 150ms), box-shadow 0.15s;
    }
    input:hover:not(:disabled) { border-color: var(--cg-focus-ring-color, #c8e650); }
    input:focus { border-color: var(--cg-focus-ring-color, #c8e650); box-shadow: 0 0 0 3px var(--cg-overlay-accent-strong, rgba(223, 255, 97, 0.25))))))))); }
    input:disabled { opacity: 0.5; cursor: not-allowed; }
    :host([error]) input { border-color: var(--cg-text-danger, #ef4444); }
  

    @media (prefers-reduced-motion: reduce) {
      * { transition: none !important; animation: none !important; }
    }
  `;

  @property() value = '';
  @property() name = '';
  @property() min = '';
  @property() max = '';
  @property({ type: Boolean }) disabled = false;
  @property({ type: Boolean, reflect: true }) error = false;

  private _handleChange(e: Event) {
    this.value = (e.target as HTMLInputElement).value;
    this.dispatchEvent(new CustomEvent('cg-change', { detail: { value: this.value }, bubbles: true, composed: true }));
  }

  override render() {
    return html`
      <input
        type="date"
        .value=${this.value}
        name=${this.name || nothing}
        min=${this.min || nothing}
        max=${this.max || nothing}
        ?disabled=${this.disabled}
        aria-invalid=${this.error ? 'true' : 'false'}
        @change=${this._handleChange}
      />
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap { 'cg-date-picker': CgDatePicker; }
}
