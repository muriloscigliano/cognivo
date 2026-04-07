import { LitElement, html, css, nothing, type PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { hostBase, reducedMotion } from '../../styles/index.js';

/**
 * @element cg-switch
 * Toggle switch with spring-animated thumb.
 *
 * @example
 * ```html
 * <cg-switch label="Dark mode" checked></cg-switch>
 * <cg-switch label="Notifications"></cg-switch>
 * <cg-switch disabled label="Locked"></cg-switch>
 * ```
 *
 * @fires {CustomEvent<{checked: boolean}>} cg-change - When toggled on/off
 */
@customElement('cg-switch')
export class CgSwitch extends LitElement {
  static formAssociated = true;
  private _internals: ElementInternals | undefined;

  constructor() {
    super();
    if (typeof this.attachInternals === 'function') {
      this._internals = this.attachInternals();
    }
  }

  static override styles = [hostBase, reducedMotion, css`
    label {
      display: inline-flex;
      align-items: center;
      gap: var(--cg-spacing-8);
      cursor: pointer;
      min-height: 44px;
      -webkit-tap-highlight-color: transparent;
      user-select: none;
    }
    :host([disabled]) label { pointer-events: none; }
    :host([disabled]) .track {
      background: var(--cg-color-toggle-background-disabled);
    }
    :host([disabled]) .thumb {
      background: var(--cg-color-toggle-thumb-disabled);
    }

    /* ── Track ── */
    .track {
      position: relative;
      width: var(--cg-component-switch-width);
      height: var(--cg-component-switch-height);
      border-radius: var(--cg-border-radius-full);
      background: var(--cg-color-toggle-background-off);
      transition: background var(--cg-motion-duration-fast) var(--cg-motion-easing-color), box-shadow var(--cg-motion-duration-fast) var(--cg-motion-easing-default);
      flex-shrink: 0;
    }

    /* Track checked */
    .track.checked {
      background: var(--cg-color-toggle-background-on);
    }

    /* ── Thumb ── */
    .thumb {
      position: absolute;
      width: var(--cg-spacing-20);
      height: var(--cg-spacing-20);
      border-radius: var(--cg-border-radius-full);
      background: var(--cg-color-toggle-thumb-off);
      top: var(--cg-spacing-2);
      left: var(--cg-spacing-2);
      transition: transform var(--cg-motion-duration-normal) var(--cg-motion-easing-bounce), width var(--cg-motion-duration-fast) var(--cg-motion-easing-default);
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
    }

    /* Thumb checked — slide right */
    .track.checked .thumb {
      background: var(--cg-color-toggle-thumb-on);
      transform: translateX(var(--cg-spacing-20));
    }

    /* ── Hover — thumb grows slightly ── */
    :host(:not([disabled])) label:hover .thumb {
      box-shadow: 0 1px 6px rgba(0, 0, 0, 0.3);
      transform: scale(1.05);
    }
    :host(:not([disabled])) label:hover .track.checked .thumb {
      transform: translateX(var(--cg-spacing-20)) scale(1.05);
    }

    /* ── Press — thumb stretches horizontally ── */
    :host(:not([disabled])) label:active .thumb {
      width: var(--cg-spacing-24);
      transform: none;
    }
    :host(:not([disabled])) label:active .track.checked .thumb {
      width: var(--cg-spacing-24);
      transform: translateX(var(--cg-spacing-16));
    }

    /* ── Focus ring ── */
    label:focus-visible .track {
      box-shadow: 0 0 0 2px var(--cg-color-focus-ring-offset), 0 0 0 4px var(--cg-color-focus-ring);
    }

    /* ── Error state ── */
    :host([error]) .track.checked {
      background: var(--cg-color-status-error-text-default);
    }
    :host([error]) .label-text {
      color: var(--cg-color-status-error-text-default);
    }

    /* ── Success state ── */
    :host([success]) .track.checked {
      background: var(--cg-color-status-success-text-default);
    }
    :host([success]) .label-text {
      color: var(--cg-color-status-success-text-default);
    }

    /* ── Loading state ── */
    :host([loading]) label { pointer-events: none; opacity: 0.5; }
    .loading-spinner {
      width: var(--cg-spacing-16);
      height: var(--cg-spacing-16);
      border: var(--cg-border-width-100) solid var(--cg-color-loading-spinner-secondary);
      border-top-color: var(--cg-color-loading-spinner-primary);
      border-radius: var(--cg-border-radius-full);
      animation: cg-switch-spin var(--cg-motion-duration-slow) linear infinite;
      flex-shrink: 0;
    }
    @keyframes cg-switch-spin {
      to { transform: rotate(360deg); }
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
      font-size: var(--cg-font-size-sm);
      font-weight: var(--cg-font-weight-medium);
      color: var(--cg-color-surface-base-text);
      line-height: var(--cg-line-height-snug);
    }
  `];

  @property() label = '';
  @property({ type: Boolean }) checked = false;
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ type: Boolean, reflect: true }) error = false;
  @property({ type: Boolean, reflect: true }) success = false;
  @property({ type: Boolean, reflect: true }) loading = false;
  @property() name = '';

  override updated(changed: PropertyValues) {
    super.updated(changed);
    if (changed.has('checked')) {
      this._internals?.setFormValue(this.checked ? 'on' : null);
    }
  }

  formResetCallback() {
    this.checked = this.hasAttribute('checked');
  }

  formStateRestoreCallback(state: string) {
    this.checked = state === 'on';
  }

  private _toggle() {
    if (this.disabled || this.loading) return;
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
        aria-invalid=${this.error ? 'true' : 'false'}
        aria-busy=${this.loading ? 'true' : 'false'}
        @click=${this._toggle}
        @keydown=${(e: KeyboardEvent) => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); this._toggle(); } }}
      >
        <input type="checkbox" .checked=${this.checked}
          ?disabled=${this.disabled} tabindex="-1" aria-hidden="true"
          @click=${(e: Event) => e.stopPropagation()} />

        ${this.loading ? html`<span class="loading-spinner" aria-hidden="true"></span>` : html`
        <span class="track ${this.checked ? 'checked' : ''}">
          <span class="thumb"></span>
        </span>`}

        ${this.label ? html`<span class="label-text">${this.label}</span>` : nothing}
      </label>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap { 'cg-switch': CgSwitch; }
}
