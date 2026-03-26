import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * <cg-radio> — Radio button with description and proper ARIA.
 */
@customElement('cg-radio')
export class CgRadio extends LitElement {
  static override styles = css`
    :host { display: block; font-family: var(--cg-font-family-primary, 'Inter Variable', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif); }

    label {
      display: flex; align-items: flex-start; gap: var(--cg-spacing-8, 8px);
      cursor: pointer; padding: var(--cg-spacing-4, 4px) 0;
    }
    :host([disabled]) label { cursor: not-allowed; opacity: 0.5; }

    .circle {
      width: 18px; height: 18px; flex-shrink: 0; margin-top: 1px;
      border: 2px solid var(--cg-color-radio-border-default, #a1a1aa);
      border-radius: var(--cg-border-radius-full, 99999px); background: var(--cg-color-radio-background-default, #18181b);
      display: flex; align-items: center; justify-content: center;
      transition: all var(--cg-motion-duration-normal, 150ms);
    }
    :host(:not([disabled])) label:hover .circle { border-color: var(--cg-focus-ring-color, #c8e650); }
    .circle.checked { border-color: var(--cg-color-radio-border-checked, #dfff61); }
    .circle .dot { width: 8px; height: 8px; border-radius: var(--cg-border-radius-full, 99999px); background: var(--cg-color-radio-background-checked, #dfff61); transform: scale(0); transition: transform var(--cg-motion-duration-normal, 150ms); }
    .circle.checked .dot { transform: scale(1); }
    label:focus-visible .circle { outline: 2px solid var(--cg-focus-ring-color, #c8e650); outline-offset: 2px; }

    input { position: absolute; opacity: 0; width: 0; height: 0; }

    .text-group { display: flex; flex-direction: column; gap: 1px; }
    .label-text { font-size: var(--cg-font-size-sm, 14px); color: var(--cg-color-surface-base-text, #fafafa); }
    .description { font-size: var(--cg-font-size-xs, 12px); color: var(--cg-gray-500, #71717a); }
  `;

  @property() label = '';
  @property() description = '';
  @property() name = '';
  @property() value = '';
  @property({ type: Boolean }) checked = false;
  @property({ type: Boolean, reflect: true }) disabled = false;

  private _select() {
    if (this.disabled) return;
    this.checked = true;
    this.dispatchEvent(new CustomEvent('cg-change', { detail: { value: this.value }, bubbles: true, composed: true }));
  }

  override render() {
    return html`
      <label tabindex=${this.disabled ? '-1' : '0'} role="radio" aria-checked=${this.checked} @click=${this._select} @keydown=${(e: KeyboardEvent) => { if (e.key === ' ') { e.preventDefault(); this._select(); } }}>
        <input type="radio" .checked=${this.checked} ?disabled=${this.disabled} name=${this.name} value=${this.value} tabindex="-1" aria-hidden="true" />
        <span class="circle ${this.checked ? 'checked' : ''}"><span class="dot"></span></span>
        <span class="text-group">
          <span class="label-text">${this.label}</span>
          ${this.description ? html`<span class="description">${this.description}</span>` : ''}
        </span>
      </label>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap { 'cg-radio': CgRadio; }
}
