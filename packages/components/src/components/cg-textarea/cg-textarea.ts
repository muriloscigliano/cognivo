import { LitElement, html, css, nothing, type PropertyValues } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { hostBlock, reducedMotion } from '../../styles/index.js';

/**
 * @element cg-textarea
 * Multi-line text input with floating label, optional auto-resize, and character count.
 *
 * @example
 * ```html
 * <cg-textarea label="Message" placeholder="Write something..." rows="4"></cg-textarea>
 * <cg-textarea label="Bio" autoresize maxlength="500" helper="Keep it short"></cg-textarea>
 * <cg-textarea label="Notes" error helper="Required field"></cg-textarea>
 * ```
 *
 * @fires {CustomEvent<{value: string}>} cg-input - On every input change
 *
 * @cssprop [--cg-color-input-background-default=#18181b] - Textarea background
 * @cssprop [--cg-focus-ring-color=#c8e650] - Focus border color
 * @cssprop [--cg-border-radius-150=12px] - Border radius
 * @cssprop [--cg-text-danger=#ef4444] - Error state border color
 */
@customElement('cg-textarea')
export class CgTextarea extends LitElement {
  static formAssociated = true;
  private _internals: ElementInternals | undefined;

  constructor() {
    super();
    if (typeof this.attachInternals === 'function') {
      this._internals = this.attachInternals();
    }
  }

  static override styles = [hostBlock, reducedMotion, css`
    .wrapper {
      position: relative;
    }

    /* ── Field container for floating label ── */
    .field {
      position: relative;
    }

    textarea {
      width: 100%;
      box-sizing: border-box;
      padding: var(--cg-spacing-12);
      border: var(--cg-border-width-50) solid var(--cg-color-input-border-default);
      border-radius: var(--cg-component-input-radius);
      background: var(--cg-color-input-background-default);
      color: var(--cg-color-input-text-default);
      font: inherit;
      font-size: var(--cg-font-size-sm);
      line-height: var(--cg-line-height-normal);
      resize: vertical;
      outline: none;
      min-height: var(--cg-spacing-96);
      transition:
        border-color var(--cg-motion-duration-normal) var(--cg-motion-easing-color),
        box-shadow var(--cg-motion-duration-fast) var(--cg-motion-easing-color);
    }
    textarea::placeholder { color: transparent; }
    .field.floated textarea::placeholder {
      color: var(--cg-color-input-text-placeholder);
      transition: color var(--cg-motion-duration-fast) var(--cg-motion-easing-color);
    }
    :host(:not([label])) textarea::placeholder { color: var(--cg-color-input-text-placeholder); }

    textarea:hover:not(:disabled):not([readonly]) { border-color: var(--cg-color-input-border-hover); }
    textarea:focus-visible { outline: none; border-color: var(--cg-color-input-border-focus); box-shadow: 0 0 0 3px var(--cg-overlay-accent-strong); }
    textarea:disabled { opacity: 0.5; cursor: not-allowed; background: var(--cg-color-input-background-disabled); }
    textarea[readonly] { background: var(--cg-color-surface-field-readonly-background); }

    /* Loading */
    :host([loading]) .wrapper { position: relative; pointer-events: none; opacity: 0.7; }
    .loading-overlay {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: var(--cg-component-input-radius);
      background: var(--cg-overlay-dark-subtle);
      z-index: 3;
    }
    .loading-spinner {
      width: var(--cg-spacing-20);
      height: var(--cg-spacing-20);
      border: var(--cg-border-width-100) solid var(--cg-color-loading-spinner-secondary);
      border-top-color: var(--cg-color-loading-spinner-primary);
      border-radius: var(--cg-border-radius-full);
      animation: cg-textarea-spin var(--cg-motion-duration-slow) linear infinite;
    }
    @keyframes cg-textarea-spin {
      to { transform: rotate(360deg); }
    }

    /* When floating label is active, shift textarea padding to make room */
    :host([label]) textarea {
      padding-top: var(--cg-spacing-24);
      padding-bottom: var(--cg-spacing-6);
    }
    :host([label][size="lg"]) textarea {
      padding-top: var(--cg-spacing-32);
      padding-bottom: var(--cg-spacing-8);
    }

    :host([error]) textarea { border-color: var(--cg-color-input-border-error); }
    :host([error]) textarea:focus-visible {
      border-color: var(--cg-color-status-error-text-default);
      box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.2);
    }

    :host([success]) textarea { border-color: var(--cg-color-input-icon-success); }
    :host([success]) textarea:focus-visible {
      border-color: var(--cg-color-status-success-text-default);
      box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.2);
    }

    :host([autoresize]) textarea { resize: none; overflow: hidden; }

    /* ── Floating label ── */
    .floating-label {
      position: absolute;
      left: var(--cg-spacing-12);
      right: var(--cg-spacing-12);
      top: var(--cg-spacing-20);
      transform: translateY(-50%);
      font-size: var(--cg-font-size-sm);
      color: var(--cg-color-input-text-placeholder);
      pointer-events: none;
      transform-origin: left top;
      transition:
        top var(--cg-motion-duration-normal) var(--cg-motion-easing-default),
        transform var(--cg-motion-duration-normal) var(--cg-motion-easing-default),
        font-size var(--cg-motion-duration-normal) var(--cg-motion-easing-default),
        color var(--cg-motion-duration-fast) var(--cg-motion-easing-color);
      z-index: 2;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    :host([size="lg"]) .floating-label { font-size: var(--cg-font-size-base); left: var(--cg-spacing-16); right: var(--cg-spacing-16); }

    /* Floated state — label shrinks and moves to top */
    .field.floated .floating-label {
      top: var(--cg-spacing-6);
      transform: translateY(0);
      font-size: var(--cg-font-size-xs);
      color: var(--cg-color-surface-container-text);
    }
    :host([size="lg"]) .field.floated .floating-label {
      top: var(--cg-spacing-8);
      font-size: var(--cg-font-size-xs);
    }

    /* Error state label color */
    :host([error]) .field.floated .floating-label {
      color: var(--cg-color-status-error-text-default);
    }

    /* Success state label color */
    :host([success]) .field.floated .floating-label {
      color: var(--cg-color-status-success-text-default);
    }

    /* Disabled label */
    .wrapper.disabled .floating-label {
      color: var(--cg-color-input-text-disabled);
    }

    .footer {
      display: flex;
      justify-content: flex-end;
      margin-top: var(--cg-spacing-4);
    }
    .count {
      font-size: var(--cg-font-size-xs);
      color: var(--cg-color-input-text-placeholder);
    }
    :host([error]) .count { color: var(--cg-color-input-icon-error); }

    /* ── Helper text ── */
    .helper {
      font-size: var(--cg-font-size-xs);
      color: var(--cg-color-input-text-placeholder);
      padding: var(--cg-spacing-8) var(--cg-spacing-12) 0;
    }
    :host([error]) .helper { color: var(--cg-color-status-error-text-default); }
    :host([success]) .helper { color: var(--cg-color-status-success-text-default); }

    /* Size variants */
    :host([size="lg"]) textarea { font-size: var(--cg-font-size-base); padding: var(--cg-spacing-12) var(--cg-spacing-16); min-height: 140px; }

    /* ── Rounded overrides ── */
    :host([rounded="none"]) textarea { border-radius: 0; }
    :host([rounded="sm"]) textarea { border-radius: var(--cg-border-radius-50); }
    :host([rounded="md"]) textarea { border-radius: var(--cg-border-radius-100); }
    :host([rounded="lg"]) textarea { border-radius: var(--cg-component-input-radius); }
  `];

  @property({ reflect: true }) label = '';
  @property() helper = '';
  @property({ reflect: true }) size: 'md' | 'lg' = 'md';
  @property({ reflect: true }) rounded: 'none' | 'sm' | 'md' | 'lg' = 'lg';
  @property() value = '';
  @property() placeholder = '';
  @property() name = '';
  @property({ type: Number }) rows = 3;
  @property({ type: Number }) maxlength = 0;
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ type: Boolean, reflect: true }) readonly = false;
  @property({ type: Boolean, reflect: true }) error = false;
  @property({ type: Boolean, reflect: true }) success = false;
  @property({ type: Boolean, reflect: true }) autoresize = false;
  @property({ type: Boolean, reflect: true }) loading = false;
  @property({ type: Boolean }) required = false;

  @state() private _focused = false;

  @query('textarea') private _textarea!: HTMLTextAreaElement;

  override updated(changed: PropertyValues) {
    super.updated(changed);
    if (changed.has('value')) {
      this._internals?.setFormValue(this.value);
    }
    if (changed.has('required') || changed.has('value')) {
      if (this.required && !this.value) {
        this._internals?.setValidity({ valueMissing: true }, 'This field is required');
      } else {
        this._internals?.setValidity({});
      }
    }
  }

  formResetCallback() {
    this.value = this.getAttribute('value') ?? '';
  }

  formStateRestoreCallback(state: string) {
    this.value = state;
  }

  private get _isFloated() {
    return this._focused || !!this.value;
  }

  private _handleFocus() { this._focused = true; }
  private _handleBlur() { this._focused = false; }

  private _handleInput(e: Event) {
    const ta = e.target as HTMLTextAreaElement;
    this.value = ta.value;
    if (this.autoresize) {
      ta.style.height = 'auto';
      ta.style.height = ta.scrollHeight + 'px';
    }
    this.dispatchEvent(new CustomEvent('cg-input', { detail: { value: this.value }, bubbles: true, composed: true }));
  }

  override render() {
    const fieldClasses = ['field', this._isFloated ? 'floated' : ''].filter(Boolean).join(' ');

    return html`
      <div class="wrapper ${this.disabled ? 'disabled' : ''}">
        <div class=${fieldClasses}>
          ${this.label ? html`<span class="floating-label">${this.label}</span>` : nothing}
          <textarea
            .value=${this.value}
            rows=${this.rows}
            name=${this.name || nothing}
            placeholder=${this.placeholder || (this.label ? ' ' : nothing)}
            maxlength=${this.maxlength || nothing}
            ?disabled=${this.disabled || this.loading}
            ?readonly=${this.readonly}
            aria-invalid=${this.error ? 'true' : 'false'}
            aria-busy=${this.loading ? 'true' : 'false'}
            aria-required=${this.required ? 'true' : 'false'}
            aria-label=${this.label || nothing}
            aria-describedby=${this.helper ? 'helper' : nothing}
            @input=${this._handleInput}
            @focus=${this._handleFocus}
            @blur=${this._handleBlur}
          ></textarea>
          ${this.loading ? html`<div class="loading-overlay"><span class="loading-spinner" aria-hidden="true"></span></div>` : nothing}
        </div>
        ${this.maxlength ? html`<div class="footer"><span class="count">${this.value.length}/${this.maxlength}</span></div>` : nothing}
      </div>
      ${this.helper ? html`<div class="helper" id="helper">${this.helper}</div>` : nothing}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap { 'cg-textarea': CgTextarea; }
}
