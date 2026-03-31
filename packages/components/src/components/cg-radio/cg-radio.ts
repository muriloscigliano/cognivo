import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { hostBlock, reducedMotion } from '../../styles/index.js';

/**
 * @element cg-radio
 * Radio button with spring-animated inner dot. Use inside a `<cg-radio-group>`.
 *
 * @example
 * ```html
 * <cg-radio label="Option A" value="a" description="First choice"></cg-radio>
 * <cg-radio label="Option B" value="b" checked></cg-radio>
 * ```
 *
 * @fires {CustomEvent<{value: string, checked: true}>} cg-change - When selected
 *
 * @cssprop [--cg-brand-ai-accent=#dfff61] - Checked dot and border color
 * @cssprop [--cg-gray-600=#52525b] - Unchecked border color
 * @cssprop [--cg-color-surface-base-text=#fafafa] - Label text color
 * @cssprop [--cg-motion-easing-bounce=cubic-bezier(0.34,1.56,0.64,1)] - Spring easing
 */
@customElement('cg-radio')
export class CgRadio extends LitElement {
  static override styles = [hostBlock, reducedMotion, css`
    label {
      display: inline-flex;
      align-items: flex-start;
      gap: 10px;
      cursor: pointer;
      padding: 4px 0;
      -webkit-tap-highlight-color: transparent;
    }
    :host([disabled]) label { cursor: not-allowed; opacity: 0.5; }

    /* ── Circle ── */
    .circle {
      width: 20px;
      height: 20px;
      flex-shrink: 0;
      margin-top: 1px;
      border: 2px solid var(--cg-gray-600, #52525b);
      border-radius: 50%;
      background: transparent;
      display: flex;
      align-items: center;
      justify-content: center;
      transition:
        border-color var(--cg-motion-duration-fast, 200ms) var(--cg-motion-easing-color, cubic-bezier(0, 0, 0.58, 1)),
        box-shadow var(--cg-motion-duration-fast, 200ms) var(--cg-motion-easing-color, cubic-bezier(0, 0, 0.58, 1)),
        transform var(--cg-motion-duration-slow, 250ms) var(--cg-motion-easing-default, cubic-bezier(0.4, 0, 0.2, 1));
    }

    /* Hover */
    :host(:not([disabled])) label:hover .circle {
      border-color: var(--cg-brand-ai-accent, #dfff61);
    }

    /* Press */
    :host(:not([disabled])) label:active .circle {
      transform: scale(0.9);
    }

    /* Focus ring — dual layer */
    label:focus-visible .circle {
      border-color: var(--cg-brand-ai-accent, #dfff61);
      box-shadow:
        0 0 0 2px var(--cg-color-surface-container-background, #18181b),
        0 0 0 4px var(--cg-brand-ai-accent, #dfff61);
    }

    /* Checked border */
    .circle.checked {
      border-color: var(--cg-brand-ai-accent, #dfff61);
    }

    /* ── Inner dot — spring scale ── */
    .dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: var(--cg-brand-ai-accent, #dfff61);
      animation: dotIn 250ms var(--cg-motion-easing-bounce, cubic-bezier(0.34, 1.56, 0.64, 1)) forwards;
    }

    @keyframes dotIn {
      0% { transform: scale(0); }
      60% { transform: scale(1.2); }
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
      line-height: var(--cg-line-height-snug, 1.375);
    }
    .description {
      font-size: 12px;
      color: var(--cg-gray-500, #71717a);
      line-height: var(--cg-line-height-snug, 1.375);
    }
  `];

  @property() label = '';
  @property() description = '';
  @property() name = '';
  @property() value = '';
  @property({ type: Boolean }) checked = false;
  @property({ type: Boolean, reflect: true }) disabled = false;

  private _select() {
    if (this.disabled || this.checked) return;
    this.checked = true;
    this.dispatchEvent(new CustomEvent('cg-change', {
      detail: { value: this.value, checked: true },
      bubbles: true, composed: true,
    }));
  }

  override render() {
    return html`
      <label
        tabindex=${this.disabled ? '-1' : '0'}
        role="radio"
        aria-checked=${String(this.checked)}
        aria-disabled=${String(this.disabled)}
        @click=${this._select}
        @keydown=${(e: KeyboardEvent) => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); this._select(); } }}
      >
        <input type="radio" .checked=${this.checked}
          ?disabled=${this.disabled} name=${this.name} value=${this.value}
          tabindex="-1" aria-hidden="true" />

        <span class="circle ${this.checked ? 'checked' : ''}">
          ${this.checked ? html`<span class="dot"></span>` : nothing}
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
  interface HTMLElementTagNameMap { 'cg-radio': CgRadio; }
}
