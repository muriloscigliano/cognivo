import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * <cg-checkbox> — Checkbox with indeterminate state and proper ARIA.
 *
 * Better than OpenUI's CheckBoxGroup:
 * - Indeterminate state
 * - Proper ARIA checkbox role
 * - Keyboard accessible (Space to toggle)
 * - Description text support
 */
@customElement('cg-checkbox')
export class CgCheckbox extends LitElement {
  static override styles = css`
    :host { display: block; font-family: var(--cg-font-family-primary, 'Inter Variable', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif); }

    label {
      display: flex; align-items: flex-start; gap: var(--cg-spacing-8, 8px);
      cursor: pointer; padding: var(--cg-spacing-4, 4px) 0;
    }
    :host([disabled]) label { cursor: not-allowed; opacity: 0.5; }

    .box {
      width: 18px; height: 18px; flex-shrink: 0; margin-top: 1px;
      border: 2px solid var(--cg-color-checkbox-border-default, #a1a1aa);
      border-radius: var(--cg-border-radius-50, 4px); background: var(--cg-color-checkbox-background-default, #18181b);
      display: flex; align-items: center; justify-content: center;
      transition: all var(--cg-motion-duration-normal, 150ms);
    }
    :host(:not([disabled])) label:hover .box { border-color: var(--cg-focus-ring-color, #c8e650); }
    .box.checked, .box.indeterminate {
      background: var(--cg-color-checkbox-background-checked, #dfff61);
      border-color: var(--cg-color-checkbox-border-checked, #dfff61);
    }
    .box svg { width: 12px; height: 12px; color: var(--cg-gray-white, #ffffff); }
    label:focus-visible .box { outline: 2px solid var(--cg-focus-ring-color, #c8e650); outline-offset: 2px; }

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
  @property({ type: Boolean }) indeterminate = false;
  @property({ type: Boolean, reflect: true }) disabled = false;

  private _toggle() {
    if (this.disabled) return;
    this.checked = !this.checked;
    this.indeterminate = false;
    this.dispatchEvent(new CustomEvent('cg-change', { detail: { checked: this.checked, value: this.value }, bubbles: true, composed: true }));
  }

  override render() {
    const state = this.indeterminate ? 'indeterminate' : this.checked ? 'checked' : '';
    return html`
      <label tabindex=${this.disabled ? '-1' : '0'} role="checkbox" aria-checked=${this.indeterminate ? 'mixed' : this.checked} @click=${this._toggle} @keydown=${(e: KeyboardEvent) => { if (e.key === ' ') { e.preventDefault(); this._toggle(); } }}>
        <input type="checkbox" .checked=${this.checked} .indeterminate=${this.indeterminate} ?disabled=${this.disabled} name=${this.name} value=${this.value} tabindex="-1" aria-hidden="true" />
        <span class="box ${state}">
          ${this.checked ? html`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M20 6L9 17l-5-5"></path></svg>` : ''}
          ${this.indeterminate ? html`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M5 12h14"></path></svg>` : ''}
        </span>
        <span class="text-group">
          <span class="label-text">${this.label}</span>
          ${this.description ? html`<span class="description">${this.description}</span>` : ''}
        </span>
      </label>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap { 'cg-checkbox': CgCheckbox; }
}
