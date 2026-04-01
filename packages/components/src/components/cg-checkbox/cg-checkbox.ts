import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { hostBlock, reducedMotion } from '../../styles/index.js';

/**
 * @element cg-checkbox
 * Checkbox with animated tick draw, spring bounce, and indeterminate state.
 *
 * @example
 * ```html
 * <cg-checkbox label="Accept terms" description="Required to continue"></cg-checkbox>
 * <cg-checkbox checked label="Notifications"></cg-checkbox>
 * <cg-checkbox indeterminate label="Select all"></cg-checkbox>
 * ```
 *
 * @fires {CustomEvent<{checked: boolean, value: string}>} cg-change - When toggled
 *
 * @cssprop [--cg-brand-ai-accent=#dfff61] - Checked box background and border
 * @cssprop [--cg-gray-600=#52525b] - Unchecked border color
 * @cssprop [--cg-color-surface-base-text=#fafafa] - Label text color
 * @cssprop [--cg-motion-easing-bounce=cubic-bezier(0.34,1.56,0.64,1)] - Bounce easing
 */
@customElement('cg-checkbox')
export class CgCheckbox extends LitElement {
  static override styles = [hostBlock, reducedMotion, css`
    :host { display: inline-block; }

    label {
      display: inline-flex;
      align-items: flex-start;
      gap: 10px;
      cursor: pointer;
      padding: 4px 0;
      -webkit-tap-highlight-color: transparent;
      user-select: none;
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
      border-radius: 6px;
      background: transparent;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      transition:
        background-color 200ms var(--cg-motion-easing-color, cubic-bezier(0, 0, 0.58, 1)),
        border-color 200ms var(--cg-motion-easing-color, cubic-bezier(0, 0, 0.58, 1)),
        box-shadow 200ms var(--cg-motion-easing-color, cubic-bezier(0, 0, 0.58, 1)),
        transform 250ms var(--cg-motion-easing-default, cubic-bezier(0.4, 0, 0.2, 1));
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

    /* Focus ring — dual layer */
    label:focus-visible .box {
      border-color: var(--cg-brand-ai-accent, #dfff61);
      box-shadow:
        0 0 0 2px var(--cg-color-surface-container-background, #18181b),
        0 0 0 4px var(--cg-brand-ai-accent, #dfff61);
    }

    /* ── Checked state ── */
    .box.checked {
      background: var(--cg-brand-ai-accent, #dfff61);
      border-color: var(--cg-brand-ai-accent, #dfff61);
      animation: boxBounce 300ms var(--cg-motion-easing-bounce, cubic-bezier(0.34, 1.56, 0.64, 1));
    }

    /* Indeterminate */
    .box.indeterminate {
      background: var(--cg-brand-ai-accent, #dfff61);
      border-color: var(--cg-brand-ai-accent, #dfff61);
    }

    /* ── Animated tick ── */
    .check-icon {
      width: 12px;
      height: 12px;
      color: var(--cg-gray-black, #000000);
    }

    .check-icon .tick {
      stroke-dasharray: 24;
      stroke-dashoffset: 24;
      animation: drawTick 300ms 50ms var(--cg-motion-easing-enter, cubic-bezier(0, 0, 0.2, 1)) forwards;
    }

    .check-icon .dash {
      stroke-dasharray: 14;
      stroke-dashoffset: 14;
      animation: drawDash 250ms 50ms var(--cg-motion-easing-enter, cubic-bezier(0, 0, 0.2, 1)) forwards;
    }

    @keyframes drawTick {
      to { stroke-dashoffset: 0; }
    }

    @keyframes drawDash {
      to { stroke-dashoffset: 0; }
    }

    @keyframes boxBounce {
      0% { transform: scale(1); }
      40% { transform: scale(0.85); }
      70% { transform: scale(1.05); }
      100% { transform: scale(1); }
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
  `];

  @property() label = '';
  @property() description = '';
  @property() name = '';
  @property() value = '';
  @property({ type: Boolean }) checked = false;
  @property({ type: Boolean }) indeterminate = false;
  @property({ type: Boolean, reflect: true }) disabled = false;

  private _toggle(e: Event) {
    e.preventDefault();
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
        @keydown=${(e: KeyboardEvent) => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); this._toggle(e); } }}
      >
        <input type="checkbox" .checked=${this.checked} .indeterminate=${this.indeterminate}
          ?disabled=${this.disabled} name=${this.name} value=${this.value}
          tabindex="-1" aria-hidden="true" />

        <span class="box ${state}">
          ${this.checked ? html`
            <svg class="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
              <path class="tick" d="M20 6L9 17l-5-5"></path>
            </svg>
          ` : nothing}
          ${this.indeterminate ? html`
            <svg class="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round">
              <path class="dash" d="M5 12h14"></path>
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
