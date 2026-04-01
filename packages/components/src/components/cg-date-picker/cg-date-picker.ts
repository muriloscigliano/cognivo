import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { hostBlock, reducedMotion } from '../../styles/index.js';

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
  static override styles = [hostBlock, reducedMotion, css`
    input {
      width: 100%; padding: var(--cg-spacing-8, 8px) var(--cg-spacing-12, 12px); min-height: 40px;
      border: var(--cg-border-width-50, 1px) solid var(--cg-color-surface-field-border, #27272a);
      border-radius: var(--cg-border-radius-150, 12px);
      background: var(--cg-color-input-background-default, #18181b);
      color: var(--cg-color-surface-base-text, #fafafa);
      font: inherit; font-size: var(--cg-font-size-sm, 14px);
      outline: none;
      box-shadow: inset 0 1px 0 0 rgba(255, 255, 255, 0.05), 0 0 0 0px transparent;
      transition: border-color var(--cg-motion-duration-normal, 150ms), box-shadow 150ms ease;
    }
    input:hover:not(:disabled) { border-color: var(--cg-focus-ring-color, #c8e650); }
    input:focus { border-color: var(--cg-focus-ring-color, #c8e650); box-shadow: inset 0 1px 0 0 rgba(255, 255, 255, 0.05), 0 0 0 3px var(--cg-overlay-accent-strong, rgba(223, 255, 97, 0.25)); }
    input:disabled { opacity: 0.5; cursor: not-allowed; }
    :host([error]) input { border-color: var(--cg-text-danger, #ef4444); }

    /* Rounded variants */
    :host([rounded="none"]) input { border-radius: 0; }
    :host([rounded="sm"]) input { border-radius: var(--cg-border-radius-50, 4px); }
    :host([rounded="md"]) input { border-radius: var(--cg-border-radius-100, 8px); }
    :host([rounded="lg"]) input { border-radius: var(--cg-border-radius-150, 12px); }
    :host([rounded="full"]) input { border-radius: var(--cg-border-radius-full, 99999px); }
  `];

  @property() value = '';
  @property() name = '';
  @property() min = '';
  @property() max = '';
  @property({ type: Boolean }) disabled = false;
  @property({ type: Boolean, reflect: true }) error = false;
  @property({ reflect: true }) rounded: 'none' | 'sm' | 'md' | 'lg' | 'full' = 'lg';

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
