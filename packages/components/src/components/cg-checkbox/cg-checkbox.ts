import { LitElement, html, css, nothing, type PropertyValues } from 'lit';
import { property } from 'lit/decorators.js';
import { customElement } from '../../utils/define.js';
import { mirrorValidity, type ValidationMessages } from '../../utils/validation.js';
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
 * <cg-checkbox rounded="full" checked label="Round checkbox"></cg-checkbox>
 * ```
 *
 * @fires {CustomEvent<{checked: boolean, value: string}>} cg-change - When toggled
 *
 * Renders a real `<input type="checkbox">` (visually replaced by the animated
 * box): native focus, Space to toggle, checkbox role/state and validity.
 * Enter does not toggle, as with a native checkbox.
 */
@customElement('cg-checkbox')
export class CgCheckbox extends LitElement {
  static formAssociated = true;
  private _internals: ElementInternals | undefined;

  constructor() {
    super();
    if (typeof this.attachInternals === 'function') {
      this._internals = this.attachInternals();
    }
  }

  static override styles = [hostBlock, reducedMotion, css`
    :host { display: inline-block; }

    label {
      display: inline-flex;
      align-items: center;
      gap: var(--cg-spacing-8);
      cursor: pointer;
      padding: var(--cg-spacing-6) 0;
      min-height: var(--cg-size-touch-target);
      -webkit-tap-highlight-color: transparent;
      user-select: none;
    }
    :host([disabled]) label {
      pointer-events: none;
    }
    :host([disabled]) .box {
      background: var(--cg-color-checkbox-background-disabled);
      border-color: var(--cg-color-checkbox-border-disabled);
    }
    :host([disabled]) .check-icon {
      color: var(--cg-color-checkbox-checkmark-disabled);
    }

    /* ── Box ── */
    .box {
      width: var(--cg-spacing-20);
      height: var(--cg-spacing-20);
      flex-shrink: 0;
      border: var(--cg-border-width-100) solid var(--cg-color-checkbox-border-default);
      border-radius: var(--cg-border-radius-50);
      background: transparent;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      transition: border-color var(--cg-transition-duration-fast) var(--cg-transition-easing-default), background var(--cg-transition-duration-fast) var(--cg-transition-easing-default), box-shadow var(--cg-transition-duration-fast) var(--cg-transition-easing-default), transform var(--cg-transition-duration-fast) var(--cg-transition-easing-ease-out);
    }

    /* ── Rounded variants ── */
    :host([rounded="none"]) .box { border-radius: 0; }
    :host([rounded="sm"]) .box { border-radius: var(--cg-border-radius-50); }
    :host([rounded="md"]) .box { border-radius: var(--cg-border-radius-100); }
    :host([rounded="lg"]) .box { border-radius: var(--cg-border-radius-150); }
    :host([rounded="full"]) .box { border-radius: var(--cg-border-radius-full); }

    /* Hover — scoped so it doesn't override the error/success border, and
       uses the accent BORDER token (not a -background- fill) for the edge. */
    :host(:not([disabled]):not([error]):not([success])) label:hover .box {
      border-color: var(--cg-color-checkbox-border-checked);
    }

    /* Pressed */
    :host(:not([disabled])) label:active .box {
      transform: scale(var(--cg-interaction-press-scale));
    }

    /* Native control: a real <input type="checkbox"> laid exactly over the
       box — it owns focus, keyboard (Space), the accessible role/state and
       form validity; the box is only its picture. */
    .control {
      position: relative;
      display: inline-flex;
      flex-shrink: 0;
    }
    .native {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      margin: 0;
      opacity: 0;
      cursor: inherit;
      z-index: 1;
    }

    /* Focus ring */
    .native:focus-visible + .box,
    .native:focus-visible + .loading-spinner {
      border-color: var(--cg-color-checkbox-border-focus);
      box-shadow: 0 0 0 var(--cg-border-width-100) var(--cg-color-focus-ring-offset), 0 0 0 calc(var(--cg-border-width-100) * 2) var(--cg-color-focus-ring);
    }

    /* ── Checked state ── */
    .box.checked {
      background: var(--cg-color-checkbox-background-checked);
      border-color: var(--cg-color-checkbox-border-checked);
      animation: boxPop var(--cg-transition-duration-slow) var(--cg-transition-easing-ease-out);
    }

    /* Indeterminate — same spring entry as checked for consistent feedback. */
    .box.indeterminate {
      background: var(--cg-color-checkbox-background-checked);
      border-color: var(--cg-color-checkbox-border-checked);
      animation: boxPop var(--cg-transition-duration-slow) var(--cg-transition-easing-ease-out);
    }

    /* ── Animated tick — stroke reveal ── */
    .check-icon {
      width: var(--cg-spacing-12);
      height: var(--cg-spacing-12);
      color: var(--cg-color-checkbox-checkmark-default);
      overflow: visible;
    }

    .check-icon .tick {
      stroke-dasharray: 24;
      stroke-dashoffset: 24;
      animation: drawTick var(--cg-transition-duration-slow) 60ms var(--cg-transition-easing-ease-out) forwards;
    }

    .check-icon .dash {
      stroke-dasharray: 14;
      stroke-dashoffset: 14;
      animation: drawDash var(--cg-transition-duration-default) 40ms var(--cg-transition-easing-ease-out) forwards;
    }

    @keyframes drawTick {
      to { stroke-dashoffset: 0; }
    }

    @keyframes drawDash {
      to { stroke-dashoffset: 0; }
    }

    @keyframes boxPop {
      0% { transform: scale(1); }
      30% { transform: scale(0.85); }
      60% { transform: scale(1.08); }
      80% { transform: scale(0.97); }
      100% { transform: scale(1); }
    }

    /* ── Error state ── */
    :host([error]) .box {
      border-color: var(--cg-color-status-error-text-default);
    }
    :host([error]) .box.checked,
    :host([error]) .box.indeterminate {
      background: var(--cg-color-status-error-text-default);
      border-color: var(--cg-color-status-error-text-default);
    }
    :host([error]) .label-text {
      color: var(--cg-color-status-error-text-default);
    }

    /* ── Success state ── */
    :host([success]) .box {
      border-color: var(--cg-color-status-success-text-default);
    }
    :host([success]) .box.checked,
    :host([success]) .box.indeterminate {
      background: var(--cg-color-status-success-text-default);
      border-color: var(--cg-color-status-success-text-default);
    }
    :host([success]) .label-text {
      color: var(--cg-color-status-success-text-default);
    }

    /* ── Loading state ── */
    :host([loading]) label { pointer-events: none; opacity: 0.5; }
    .loading-spinner {
      width: var(--cg-spacing-20);
      height: var(--cg-spacing-20);
      flex-shrink: 0;
      margin-top: var(--cg-spacing-2);
      border: var(--cg-border-width-100) solid var(--cg-color-loading-spinner-secondary);
      border-top-color: var(--cg-color-loading-spinner-primary);
      border-radius: var(--cg-border-radius-full);
      animation: cg-checkbox-spin var(--cg-transition-duration-slow) linear infinite;
    }
    @keyframes cg-checkbox-spin {
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
  /** Accessible name when no visible label is rendered (host aria-label is
   *  forwarded to the internal control, which carries the role). */
  @property({ attribute: 'aria-label' }) override ariaLabel: string | null = null;
  @property() description = '';
  @property({ reflect: true }) name = ''; // reflected: FormData keys a form-associated element by its name ATTRIBUTE
  @property() value = '';
  @property({ type: Boolean }) checked = false;
  @property({ type: Boolean }) indeterminate = false;
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ type: Boolean, reflect: true }) error = false;
  @property({ type: Boolean, reflect: true }) success = false;
  @property({ type: Boolean, reflect: true }) loading = false;
  @property({ type: Boolean }) required = false;
  @property({ reflect: true }) rounded: 'none' | 'sm' | 'md' | 'lg' | 'full' = 'sm';

  /** Per-element validation texts (JSON in the `validation-messages` attribute
   *  or a property). Falls back to `setValidationMessages()` then to the
   *  browser's own localised message. */
  @property({ type: Object, attribute: 'validation-messages' }) validationMessages: ValidationMessages | null = null;

  /** Native-like constraint validation API (delegates to ElementInternals). */
  get validity(): ValidityState | undefined { return this._internals?.validity; }
  get validationMessage(): string { return this._internals?.validationMessage ?? ''; }
  get willValidate(): boolean { return this._internals?.willValidate ?? false; }
  checkValidity(): boolean { return this._internals?.checkValidity() ?? true; }
  reportValidity(): boolean { return this._internals?.reportValidity() ?? true; }

  override updated(changed: PropertyValues) {
    super.updated(changed);
    if (changed.has('checked') || changed.has('value')) {
      this._internals?.setFormValue(this.checked ? (this.value || 'on') : null);
    }
    mirrorValidity(this._internals, this.renderRoot.querySelector<HTMLInputElement>('input.native'), this.validationMessages);
  }

  formResetCallback() {
    this.checked = this.hasAttribute('checked');
  }

  formStateRestoreCallback(state: string) {
    this.checked = state === (this.value || 'on');
  }

  private _handleChange(e: Event) {
    const input = e.target as HTMLInputElement;
    this.checked = input.checked;
    this.indeterminate = false;
    this.dispatchEvent(new CustomEvent('cg-change', {
      detail: { checked: this.checked, value: this.value },
      bubbles: true, composed: true,
    }));
  }

  override render() {
    const state = this.indeterminate ? 'indeterminate' : this.checked ? 'checked' : '';
    const ariaLabel = !this.label && this.ariaLabel ? this.ariaLabel : nothing;

    return html`
      <label>
        <span class="control">
          <input
            class="native"
            type="checkbox"
            .checked=${this.checked}
            .indeterminate=${this.indeterminate}
            .value=${this.value || 'on'}
            ?disabled=${this.disabled || this.loading}
            ?required=${this.required}
            aria-label=${ariaLabel}
            aria-labelledby=${this.label ? 'label-text' : nothing}
            aria-describedby=${this.label && this.description ? 'description' : nothing}
            aria-invalid=${this.error ? 'true' : 'false'}
            aria-busy=${this.loading ? 'true' : nothing}
            @change=${this._handleChange}
          />
          ${this.loading ? html`<span class="loading-spinner" aria-hidden="true"></span>` : html`<span class="box ${state}" aria-hidden="true">
            ${this.checked && !this.indeterminate ? html`
              <svg class="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                <path class="tick" d="M4 12L9 17L20 6"></path>
              </svg>
            ` : nothing}
            ${this.indeterminate ? html`
              <svg class="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round">
                <path class="dash" d="M5 12h14"></path>
              </svg>
            ` : nothing}
          </span>`}
        </span>

        ${this.label ? html`
          <span class="text-group">
            <span class="label-text" id="label-text">${this.label}</span>
            ${this.description ? html`<span class="description" id="description">${this.description}</span>` : nothing}
          </span>
        ` : nothing}
      </label>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap { 'cg-checkbox': CgCheckbox; }
}
