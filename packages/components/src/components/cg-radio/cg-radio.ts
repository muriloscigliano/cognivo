import { LitElement, html, css, nothing, type PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { hostBlock, reducedMotion } from '../../styles/index.js';

/**
 * @element cg-radio
 * Radio button with dot or tick indicator and spring animation.
 *
 * @example
 * ```html
 * <cg-radio label="Option A" value="a"></cg-radio>
 * <cg-radio label="Option B" value="b" checked></cg-radio>
 * <cg-radio label="With tick" value="c" variant="tick" checked></cg-radio>
 * ```
 *
 * @fires {CustomEvent<{value: string, checked: true}>} cg-change - When selected
 */
@customElement('cg-radio')
export class CgRadio extends LitElement {
  static formAssociated = true;
  private _internals: ElementInternals | undefined;

  constructor() {
    super();
    if (typeof this.attachInternals === 'function') {
      this._internals = this.attachInternals();
    }
  }

  static override styles = [hostBlock, reducedMotion, css`
    label {
      display: inline-flex;
      align-items: center;
      gap: var(--cg-spacing-8);
      cursor: pointer;
      padding: var(--cg-spacing-6) 0;
      min-height: 44px;
      -webkit-tap-highlight-color: transparent;
      user-select: none;
    }
    :host([disabled]) label { cursor: not-allowed; }
    :host([disabled]) .circle {
      background: var(--cg-color-radio-background-disabled);
      border-color: var(--cg-color-radio-border-disabled);
    }
    :host([disabled]) .dot {
      background: var(--cg-color-radio-dot-disabled);
    }
    :host([disabled]) .tick-icon {
      color: var(--cg-color-radio-dot-disabled);
    }

    /* ── Circle ── */
    .circle {
      width: var(--cg-spacing-20);
      height: var(--cg-spacing-20);
      flex-shrink: 0;
      border: var(--cg-border-width-100) solid var(--cg-color-radio-border-default);
      border-radius: var(--cg-border-radius-full);
      background: var(--cg-color-radio-background-default);
      display: flex;
      align-items: center;
      justify-content: center;
      transition:
        border-color var(--cg-transition-duration-fast) var(--cg-transition-easing-default),
        background var(--cg-transition-duration-fast) var(--cg-transition-easing-default),
        box-shadow var(--cg-transition-duration-fast) var(--cg-transition-easing-default),
        transform var(--cg-transition-duration-default) var(--cg-transition-easing-ease-out);
    }

    /* Hover */
    :host(:not([disabled])) label:hover .circle {
      border-color: var(--cg-color-radio-border-checked);
      background: var(--cg-color-radio-background-hover);
    }

    /* Press */
    :host(:not([disabled])) label:active .circle {
      transform: scale(var(--cg-interaction-press-scale));
    }

    /* Focus ring */
    label:focus-visible .circle {
      border-color: var(--cg-color-radio-border-focus);
      box-shadow: 0 0 0 var(--cg-spacing-2) var(--cg-overlay-accent-strong);
      outline: none;
    }

    /* Checked */
    .circle.checked {
      border-color: var(--cg-color-radio-border-checked);
      background: var(--cg-color-radio-background-checked);
      animation: circlePop var(--cg-transition-duration-default) var(--cg-transition-easing-ease-out);
    }

    @keyframes circlePop {
      0% { transform: scale(1); }
      30% { transform: scale(0.85); }
      60% { transform: scale(1.08); }
      80% { transform: scale(0.97); }
      100% { transform: scale(1); }
    }

    /* ── Dot indicator ── */
    .dot {
      width: 10px;
      height: 10px;
      border-radius: var(--cg-border-radius-full);
      background: var(--cg-color-radio-dot-default);
      animation: dotIn var(--cg-transition-duration-default) var(--cg-transition-easing-ease-out) forwards;
    }

    @keyframes dotIn {
      0% { transform: scale(0); }
      60% { transform: scale(1.2); }
      100% { transform: scale(1); }
    }

    /* ── Tick indicator — stroke reveal ── */
    .tick-icon {
      width: var(--cg-spacing-12);
      height: var(--cg-spacing-12);
      color: var(--cg-color-radio-dot-default);
      overflow: visible;
    }

    .tick-icon .tick-path {
      stroke-dasharray: 24;
      stroke-dashoffset: 24;
      animation: drawRadioTick var(--cg-transition-duration-default) 60ms var(--cg-transition-easing-ease-out) forwards;
    }

    @keyframes drawRadioTick {
      to { stroke-dashoffset: 0; }
    }

    /* Hidden native input */
    input {
      position: absolute;
      opacity: 0;
      width: 0;
      height: 0;
      pointer-events: none;
    }

    /* ── Error state ── */
    :host([error]) .circle { border-color: var(--cg-color-status-error-text-default); }
    :host([error]) .circle.checked { border-color: var(--cg-color-status-error-text-default); }
    :host([error]) .dot { background: var(--cg-color-status-error-text-default); }
    :host([error]) .tick-icon { color: var(--cg-color-status-error-text-default); }
    :host([error]) .label-text { color: var(--cg-color-status-error-text-default); }

    /* ── Success state ── */
    :host([success]) .circle { border-color: var(--cg-color-status-success-text-default); }
    :host([success]) .circle.checked { border-color: var(--cg-color-status-success-text-default); }
    :host([success]) .dot { background: var(--cg-color-status-success-text-default); }
    :host([success]) .tick-icon { color: var(--cg-color-status-success-text-default); }
    :host([success]) .label-text { color: var(--cg-color-status-success-text-default); }

    /* ── Loading state ── */
    :host([loading]) label { pointer-events: none; opacity: 0.5; }
    .loading-spinner {
      width: var(--cg-spacing-20);
      height: var(--cg-spacing-20);
      flex-shrink: 0;
      border: var(--cg-border-width-100) solid var(--cg-color-loading-spinner-secondary);
      border-top-color: var(--cg-color-loading-spinner-primary);
      border-radius: var(--cg-border-radius-full);
      animation: cg-radio-spin var(--cg-transition-duration-slow) linear infinite;
    }
    @keyframes cg-radio-spin {
      to { transform: rotate(360deg); }
    }

    /* Text */
    .text-group { display: flex; flex-direction: column; gap: var(--cg-spacing-2); }
    .label-text {
      font-size: var(--cg-font-size-sm);
      font-weight: var(--cg-font-weight-medium);
      color: var(--cg-color-surface-base-text);
      line-height: var(--cg-line-height-snug);
    }
    .description {
      font-size: var(--cg-font-size-xs);
      color: var(--cg-color-surface-container-outlined);
      line-height: var(--cg-line-height-snug);
    }
  `];

  @property() label = '';
  @property() description = '';
  @property() name = '';
  @property() value = '';
  @property({ type: Boolean }) checked = false;
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ type: Boolean, reflect: true }) error = false;
  @property({ type: Boolean, reflect: true }) success = false;
  @property({ type: Boolean, reflect: true }) loading = false;
  @property({ type: Boolean }) required = false;
  @property({ reflect: true }) variant: 'dot' | 'tick' = 'dot';

  override updated(changed: PropertyValues) {
    super.updated(changed);
    if (changed.has('checked') || changed.has('value')) {
      this._internals?.setFormValue(this.checked ? this.value : null);
    }
    if (changed.has('required') || changed.has('checked')) {
      if (this.required && !this.checked) {
        this._internals?.setValidity({ valueMissing: true }, 'This field is required');
      } else {
        this._internals?.setValidity({});
      }
    }
  }

  formResetCallback() {
    this.checked = this.hasAttribute('checked');
  }

  formStateRestoreCallback(state: string) {
    this.checked = state === this.value;
  }

  private _select() {
    if (this.disabled || this.loading || this.checked) return;
    this.checked = true;
    this.dispatchEvent(new CustomEvent('cg-change', {
      detail: { value: this.value, checked: true },
      bubbles: true, composed: true,
    }));
  }

  private _renderIndicator() {
    if (!this.checked) return nothing;
    if (this.variant === 'tick') {
      return html`
        <svg class="tick-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
          <path class="tick-path" d="M20 6L9 17l-5-5"></path>
        </svg>
      `;
    }
    return html`<span class="dot"></span>`;
  }

  override render() {
    return html`
      <label
        tabindex=${this.disabled ? '-1' : '0'}
        role="radio"
        aria-checked=${String(this.checked)}
        aria-disabled=${String(this.disabled)}
        aria-required=${this.required ? 'true' : 'false'}
        @click=${this._select}
        @keydown=${(e: KeyboardEvent) => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); this._select(); } }}
      >
        <input type="radio" .checked=${this.checked}
          ?disabled=${this.disabled} name=${this.name} value=${this.value}
          tabindex="-1" aria-hidden="true"
          @click=${(e: Event) => e.stopPropagation()} />

        ${this.loading ? html`<span class="loading-spinner" aria-hidden="true"></span>` : html`
        <span class="circle ${this.checked ? 'checked' : ''}">
          ${this._renderIndicator()}
        </span>`}

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
