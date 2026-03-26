import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * <cg-switch> — Toggle switch with label positioning.
 */
@customElement('cg-switch')
export class CgSwitch extends LitElement {
  static override styles = css`
    :host { display: block; font-family: var(--cg-font-family-primary, 'Inter Variable', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif); }

    label {
      display: flex; align-items: center; gap: var(--cg-spacing-8, 8px);
      cursor: pointer;
    }
    :host([disabled]) label { cursor: not-allowed; opacity: 0.5; }

    .track {
      width: 40px; height: 22px; flex-shrink: 0;
      border-radius: 11px;
      background: var(--cg-gray-300, #d4d4d8);
      position: relative;
      transition: background var(--cg-motion-duration-normal, 150ms);
    }
    .track.on { background: var(--cg-focus-ring-color, #c8e650); }
    :host(:not([disabled])) label:hover .track { filter: brightness(0.95); }

    .thumb {
      width: 18px; height: 18px;
      border-radius: var(--cg-border-radius-full, 99999px);
      background: var(--cg-gray-white, #ffffff);
      box-shadow: var(--cg-shadow-sm-x, 0px) var(--cg-shadow-sm-y, 1px) var(--cg-shadow-sm-blur, 4px) var(--cg-shadow-sm-spread, 0px) var(--cg-shadow-sm-Color, #616161);
      position: absolute; top: 2px; left: 2px;
      transition: transform var(--cg-motion-duration-normal, 150ms) cubic-bezier(0.4, 0, 0.2, 1);
    }
    .track.on .thumb { transform: translateX(18px); }

    label:focus-visible .track { outline: 2px solid var(--cg-focus-ring-color, #c8e650); outline-offset: 2px; }

    input { position: absolute; opacity: 0; width: 0; height: 0; }

    .label-text { font-size: var(--cg-font-size-sm, 14px); color: var(--cg-color-surface-base-text, #fafafa); }
    .description { font-size: var(--cg-font-size-xs, 12px); color: var(--cg-gray-500, #71717a); }

    @media (prefers-reduced-motion: reduce) {
      .thumb, .track { transition: none; }
    }
  `;

  @property() label = '';
  @property() description = '';
  @property() name = '';
  @property({ type: Boolean }) checked = false;
  @property({ type: Boolean, reflect: true }) disabled = false;

  private _toggle() {
    if (this.disabled) return;
    this.checked = !this.checked;
    this.dispatchEvent(new CustomEvent('cg-change', { detail: { checked: this.checked }, bubbles: true, composed: true }));
  }

  override render() {
    return html`
      <label tabindex=${this.disabled ? '-1' : '0'} role="switch" aria-checked=${this.checked} @click=${this._toggle} @keydown=${(e: KeyboardEvent) => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); this._toggle(); } }}>
        <input type="checkbox" .checked=${this.checked} ?disabled=${this.disabled} name=${this.name} tabindex="-1" aria-hidden="true" />
        <span class="track ${this.checked ? 'on' : ''}"><span class="thumb"></span></span>
        <span>
          <span class="label-text">${this.label}</span>
          ${this.description ? html`<br/><span class="description">${this.description}</span>` : ''}
        </span>
      </label>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap { 'cg-switch': CgSwitch; }
}
