import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * <cg-switch> — Toggle switch with spring animation (HeroUI-quality).
 *
 * Features:
 * - Spring bounce on thumb movement (cubic-bezier overshoot)
 * - Scale press feedback
 * - Dual-layer focus ring
 * - Smooth track color transition
 * - Thumb shadow for depth
 * - prefers-reduced-motion respected
 */
@customElement('cg-switch')
export class CgSwitch extends LitElement {
  static override styles = css`
    :host {
      display: inline-flex;
      font-family: var(--cg-font-family-primary, 'Inter Variable', 'Inter', -apple-system, sans-serif);
    }

    label {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
    }
    :host([disabled]) label { cursor: not-allowed; opacity: 0.5; }

    /* ── Track ── */
    .track {
      position: relative;
      width: 44px;
      height: 24px;
      border-radius: 9999px;
      background: var(--cg-gray-700, #3f3f46);
      transition: background-color 200ms cubic-bezier(0, 0, 0.58, 1);
      flex-shrink: 0;
    }

    /* Track checked */
    .track.checked {
      background: var(--cg-brand-ai-accent, #dfff61);
    }

    /* ── Thumb ── */
    .thumb {
      position: absolute;
      width: 18px;
      height: 18px;
      border-radius: 50%;
      background: var(--cg-gray-white, #ffffff);
      top: 3px;
      left: 3px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
      transition:
        transform 250ms cubic-bezier(0.34, 1.56, 0.64, 1),
        box-shadow 200ms cubic-bezier(0, 0, 0.58, 1);
    }

    /* Thumb checked — slide right with spring bounce */
    .track.checked .thumb {
      transform: translateX(20px);
    }

    /* ── Press feedback ── */
    :host(:not([disabled])) label:active .thumb {
      box-shadow: 0 1px 6px rgba(0, 0, 0, 0.3);
      transform: scale(1.1);
    }
    :host(:not([disabled])) label:active .track.checked .thumb {
      transform: translateX(20px) scale(1.1);
    }

    /* ── Hover ── */
    :host(:not([disabled])) label:hover .track {
      background: var(--cg-gray-600, #52525b);
    }
    :host(:not([disabled])) label:hover .track.checked {
      background: var(--cg-brand-ai-highlight, #e2ff70);
    }

    /* ── Focus ring — dual layer ── */
    label:focus-visible .track {
      box-shadow:
        0 0 0 2px var(--cg-color-surface-container-background, #18181b),
        0 0 0 4px var(--cg-brand-ai-accent, #dfff61);
    }

    /* Hidden native input */
    input {
      position: absolute;
      opacity: 0;
      width: 0;
      height: 0;
      pointer-events: none;
    }

    /* Label text */
    .label-text {
      font-size: 14px;
      font-weight: 500;
      color: var(--cg-color-surface-base-text, #fafafa);
    }

    /* Size variants */
    :host([size="sm"]) .track { width: 36px; height: 20px; }
    :host([size="sm"]) .thumb { width: 14px; height: 14px; }
    :host([size="sm"]) .track.checked .thumb { transform: translateX(16px); }

    :host([size="lg"]) .track { width: 52px; height: 28px; }
    :host([size="lg"]) .thumb { width: 22px; height: 22px; }
    :host([size="lg"]) .track.checked .thumb { transform: translateX(24px); }

    @media (prefers-reduced-motion: reduce) {
      .thumb, .track { transition: none; }
    }
  `;

  @property() label = '';
  @property({ type: Boolean }) checked = false;
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ reflect: true }) size: 'sm' | 'md' | 'lg' = 'md';

  private _toggle() {
    if (this.disabled) return;
    this.checked = !this.checked;
    this.dispatchEvent(new CustomEvent('cg-change', {
      detail: { checked: this.checked },
      bubbles: true, composed: true,
    }));
  }

  override render() {
    return html`
      <label
        tabindex=${this.disabled ? '-1' : '0'}
        role="switch"
        aria-checked=${String(this.checked)}
        aria-disabled=${String(this.disabled)}
        @click=${this._toggle}
        @keydown=${(e: KeyboardEvent) => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); this._toggle(); } }}
      >
        <input type="checkbox" .checked=${this.checked}
          ?disabled=${this.disabled} tabindex="-1" aria-hidden="true" />

        <span class="track ${this.checked ? 'checked' : ''}">
          <span class="thumb"></span>
        </span>

        ${this.label ? html`<span class="label-text">${this.label}</span>` : nothing}
      </label>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap { 'cg-switch': CgSwitch; }
}
