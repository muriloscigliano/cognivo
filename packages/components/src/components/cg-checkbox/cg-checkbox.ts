import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

/**
 * <cg-checkbox> — Premium checkbox with HeroUI-quality animations.
 *
 * Features:
 * - Scale animation on check (scale 0.5→1 with spring bounce)
 * - Color transition on state change (200ms)
 * - Focus ring with dual-layer shadow
 * - Indeterminate state
 * - Press feedback (scale 0.95)
 * - prefers-reduced-motion respected
 */
@customElement('cg-checkbox')
export class CgCheckbox extends LitElement {
  static override styles = css`
    :host {
      transition: color 100ms cubic-bezier(0, 0, 0.58, 1);
      display: block;
      font-family: var(--cg-font-family-primary, 'Inter Variable', 'Inter', -apple-system, sans-serif);
    }

    label {
      display: inline-flex;
      align-items: flex-start;
      gap: 10px;
      cursor: pointer;
      padding: 4px 0;
      -webkit-tap-highlight-color: transparent;
    }
    :host([disabled]) label {
      cursor: not-allowed;
      opacity: 0.5;
    }

    /* ── Box ── */
    .box {
      width: 20px;
      height: 20px;
      flex-shrink: 0;
      margin-top: 1px;
      border: 2px solid var(--cg-gray-600, #52525b);
      border-radius: 5px;
      background: transparent;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      transition:
        background-color 200ms cubic-bezier(0, 0, 0.58, 1),
        border-color 200ms cubic-bezier(0, 0, 0.58, 1),
        box-shadow 200ms cubic-bezier(0, 0, 0.58, 1),
        transform 250ms cubic-bezier(0.4, 0, 0.2, 1);
    }

    /* Hover */
    :host(:not([disabled])) label:hover .box {
      border-color: var(--cg-brand-ai-accent, #dfff61);
      background: rgba(223, 255, 97, 0.06);
    }

    /* Pressed */
    :host(:not([disabled])) label:active .box {
      transform: scale(0.9);
    }

    /* Focus ring — dual layer like HeroUI */
    label:focus-visible .box {
      border-color: var(--cg-brand-ai-accent, #dfff61);
      box-shadow:
        0 0 0 2px var(--cg-color-surface-container-background, #18181b),
        0 0 0 4px var(--cg-brand-ai-accent, #dfff61);
    }

    /* Checked state — fill with spring animation */
    .box.checked {
      background: var(--cg-brand-ai-accent, #dfff61);
      border-color: var(--cg-brand-ai-accent, #dfff61);
    }

    /* Indeterminate */
    .box.indeterminate {
      background: var(--cg-brand-ai-accent, #dfff61);
      border-color: var(--cg-brand-ai-accent, #dfff61);
    }

    /* Check icon — scale in with spring bounce */
    .check-icon {
      width: 12px;
      height: 12px;
      color: var(--cg-gray-black, #000000);
      animation: checkIn 250ms cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
    }

    @keyframes checkIn {
      0% { transform: scale(0); opacity: 0; }
      50% { transform: scale(1.1); }
      100% { transform: scale(1); opacity: 1; }
    }

    /* Hidden native input */
    input {
      position: absolute;
      opacity: 0;
      width: 0;
      height: 0;
      pointer-events: none;
    }

    /* Text */
    .text-group { display: flex; flex-direction: column; gap: 2px; }
    .label-text {
      font-size: 14px;
      font-weight: 500;
      color: var(--cg-color-surface-base-text, #fafafa);
      line-height: 1.4;
    }
    .description {
      font-size: 12px;
      color: var(--cg-gray-500, #71717a);
      line-height: 1.4;
    }

    @media (prefers-reduced-motion: reduce) {
      .box { transition: none; }
      .check-icon { animation: none; transform: scale(1); opacity: 1; }
    }
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
    this.dispatchEvent(new CustomEvent('cg-change', {
      detail: { checked: this.checked, value: this.value },
      bubbles: true, composed: true,
    }));
  }

  override render() {
    const state = this.indeterminate ? 'indeterminate' : this.checked ? 'checked' : '';

    return html`
      <label
        tabindex=${this.disabled ? '-1' : '0'}
        role="checkbox"
        aria-checked=${this.indeterminate ? 'mixed' : String(this.checked)}
        aria-disabled=${String(this.disabled)}
        @click=${this._toggle}
        @keydown=${(e: KeyboardEvent) => { if (e.key === ' ') { e.preventDefault(); this._toggle(); } }}
      >
        <input type="checkbox" .checked=${this.checked} .indeterminate=${this.indeterminate}
          ?disabled=${this.disabled} name=${this.name} value=${this.value}
          tabindex="-1" aria-hidden="true" />

        <span class="box ${state}">
          ${this.checked ? html`
            <svg class="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round">
              <path d="M20 6L9 17l-5-5"></path>
            </svg>
          ` : nothing}
          ${this.indeterminate ? html`
            <svg class="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round">
              <path d="M5 12h14"></path>
            </svg>
          ` : nothing}
        </span>

        ${this.label ? html`
          <span class="text-group">
            <span class="label-text">${this.label}</span>
            ${this.description ? html`<span class="description">${this.description}</span>` : nothing}
          </span>
        ` : nothing}
      </label>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap { 'cg-checkbox': CgCheckbox; }
}
