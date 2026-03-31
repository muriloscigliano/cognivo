import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { hostBlock, reducedMotion } from '../../styles/index.js';

/**
 * @element cg-input
 * Text input with floating label, prefix/suffix slots, clear button, and validation states.
 *
 * @example
 * ```html
 * <cg-input label="Email" type="email" placeholder="you@example.com"></cg-input>
 * <cg-input label="Search" clearable><span slot="prefix">🔍</span></cg-input>
 * <cg-input label="Bio" maxlength="200" error helper="Too long"></cg-input>
 * ```
 *
 * @slot prefix - Icon or content before the input field
 * @slot suffix - Icon or content after the input field
 *
 * @fires {CustomEvent<{value: string}>} cg-input - On every input change
 * @fires {CustomEvent} cg-clear - When the clear button is clicked
 *
 * @cssprop [--cg-color-input-border-default=#3f3f46] - Default border color
 * @cssprop [--cg-brand-ai-accent=#dfff61] - Focus ring and floating label color
 * @cssprop [--cg-component-input-height-md=40px] - Input height (md size)
 * @cssprop [--cg-color-input-background-default=#18181b] - Input background
 */
@customElement('cg-input')
export class CgInput extends LitElement {
  static override styles = [hostBlock, reducedMotion, css`
    :host { display: block; }

    .wrapper {
      display: flex;
      align-items: center;
      gap: var(--cg-spacing-8, 8px);
      padding: 0 var(--cg-spacing-12, 12px);
      border: 1px solid var(--cg-color-input-border-default, #3f3f46);
      border-radius: var(--cg-border-radius-150, 12px);
      background: var(--cg-color-input-background-default, #18181b);
      box-shadow: inset 0 1px 0 0 rgba(255, 255, 255, 0.05), 0 0 0 0px transparent, 0 0 0 0px transparent;
      transition:
        border-color 200ms ease-out,
        box-shadow 150ms ease;
      min-height: var(--cg-component-input-height-md, 40px);
      position: relative;
    }

    /* Size variants */
    :host([size="sm"]) .wrapper { min-height: var(--cg-component-input-height-sm, 32px); padding: 0 var(--cg-spacing-8, 8px); }
    :host([size="lg"]) .wrapper { min-height: var(--cg-component-input-height-lg, 48px); padding: 0 var(--cg-spacing-16, 16px); }

    /* Hover */
    .wrapper:hover:not(.disabled):not(.readonly) {
      border-color: var(--cg-color-input-border-hover, #dfff61);
    }

    /* Focus — dual layer ring */
    .wrapper.focused {
      border-color: var(--cg-brand-ai-accent, #dfff61);
      box-shadow:
        inset 0 1px 0 0 rgba(255, 255, 255, 0.05),
        0 0 0 2px var(--cg-color-surface-base-background, #09090b),
        0 0 0 4px var(--cg-brand-ai-accent, #dfff61);
    }

    /* Error */
    :host([error]) .wrapper {
      border-color: var(--cg-color-input-border-error, rgba(239, 68, 68, 0.5));
    }
    :host([error]) .wrapper.focused {
      border-color: var(--cg-color-status-error-text-default, #ef4444);
      box-shadow:
        0 0 0 2px var(--cg-color-surface-base-background, #09090b),
        0 0 0 4px var(--cg-color-status-error-background-default, rgba(239, 68, 68, 0.6));
    }

    /* Success */
    :host([success]) .wrapper {
      border-color: var(--cg-color-input-icon-success, #4ade80);
    }
    :host([success]) .wrapper.focused {
      border-color: var(--cg-color-status-success-text-default, #4ade80);
      box-shadow:
        0 0 0 2px var(--cg-color-surface-base-background, #09090b),
        0 0 0 4px var(--cg-color-status-success-background-default, rgba(74, 222, 128, 0.5));
    }

    /* Disabled */
    .wrapper.disabled {
      background: var(--cg-color-input-background-disabled, #18181b);
      opacity: 0.6;
      cursor: not-allowed;
    }

    /* Readonly */
    .wrapper.readonly {
      background: var(--cg-color-input-background-disabled, #18181b);
      border-style: dashed;
    }

    /* ── Input field area ── */
    .field {
      flex: 1;
      position: relative;
      display: flex;
      align-items: center;
      min-width: 0;
    }

    input {
      width: 100%;
      border: none;
      outline: none;
      background: transparent;
      font: inherit;
      font-size: var(--cg-font-size-sm, 14px);
      color: var(--cg-color-input-text-default, #f4f4f5);
      min-width: 0;
      padding: var(--cg-spacing-8, 8px) 0;
      z-index: 1;
    }
    :host([size="sm"]) input { font-size: var(--cg-font-size-xs, 12px); padding: 6px 0; }
    :host([size="lg"]) input { font-size: var(--cg-font-size-base, 16px); padding: 10px 0; }

    /* When floating label is active, shift input down to make room */
    :host([label]) input {
      padding-top: 14px;
      padding-bottom: 2px;
    }
    :host([label][size="sm"]) input {
      padding-top: 12px;
      padding-bottom: 1px;
    }
    :host([label][size="lg"]) input {
      padding-top: 18px;
      padding-bottom: 4px;
    }

    input::placeholder {
      color: transparent;
    }
    /* Show placeholder only when label is floated (focused or has value) */
    .field.floated input::placeholder {
      color: var(--cg-color-input-text-placeholder, #71717a);
      transition: color 150ms ease;
    }

    input:disabled { cursor: not-allowed; }

    /* ── Floating label ── */
    .floating-label {
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      font-size: var(--cg-font-size-sm, 14px);
      color: var(--cg-color-input-text-placeholder, #71717a);
      pointer-events: none;
      transform-origin: left center;
      transition:
        transform 200ms var(--cg-motion-easing-default, cubic-bezier(0.4, 0, 0.2, 1)),
        font-size 200ms var(--cg-motion-easing-default, cubic-bezier(0.4, 0, 0.2, 1)),
        color 150ms ease;
      z-index: 2;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 100%;
    }

    :host([size="sm"]) .floating-label { font-size: var(--cg-font-size-xs, 12px); }
    :host([size="lg"]) .floating-label { font-size: var(--cg-font-size-base, 16px); }

    /* Floated state — label shrinks and moves to top */
    .field.floated .floating-label {
      transform: translateY(-100%);
      font-size: 10px;
      color: var(--cg-brand-ai-accent, #dfff61);
    }
    :host([size="sm"]) .field.floated .floating-label {
      font-size: 9px;
    }
    :host([size="lg"]) .field.floated .floating-label {
      font-size: 11px;
    }

    /* Error state label color */
    :host([error]) .field.floated .floating-label {
      color: var(--cg-color-status-error-text-default, #ef4444);
    }

    /* Success state label color */
    :host([success]) .field.floated .floating-label {
      color: var(--cg-color-status-success-text-default, #4ade80);
    }

    /* Disabled label */
    .wrapper.disabled .floating-label {
      color: var(--cg-gray-600, #52525b);
    }

    /* ── Slots ── */
    .prefix, .suffix {
      display: flex;
      align-items: center;
      color: var(--cg-color-input-icon-default, #dfff61);
      flex-shrink: 0;
    }

    /* ── Clear button ── */
    .clear {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 18px;
      height: 18px;
      border: none;
      background: rgba(255, 255, 255, 0.1);
      color: var(--cg-gray-400, #a1a1aa);
      border-radius: var(--cg-border-radius-full, 99999px);
      cursor: pointer;
      padding: 0;
      flex-shrink: 0;
      transition:
        background 100ms ease,
        color 100ms ease,
        transform 100ms ease;
      opacity: 0;
      transform: scale(0.8);
      animation: clearIn 150ms var(--cg-motion-easing-enter, cubic-bezier(0, 0, 0.2, 1)) forwards;
    }
    .clear:hover { background: rgba(255, 255, 255, 0.15); color: var(--cg-gray-200, #e4e4e7); }
    .clear:active { transform: scale(0.9); }
    .clear svg { width: 10px; height: 10px; }

    @keyframes clearIn {
      from { opacity: 0; transform: scale(0.8); }
      to { opacity: 1; transform: scale(1); }
    }

    /* ── Character count ── */
    .count {
      font-size: 0.7rem;
      color: var(--cg-color-input-text-placeholder, #71717a);
      flex-shrink: 0;
      font-variant-numeric: tabular-nums;
      transition: color 200ms ease;
    }
    :host([error]) .count { color: var(--cg-color-status-error-text-default, #f87171); }

    /* ── Helper text ── */
    .helper {
      font-size: 12px;
      color: var(--cg-gray-500, #71717a);
      padding: 4px 12px 0;
    }
    :host([error]) .helper { color: var(--cg-color-status-error-text-default, #ef4444); }
    :host([success]) .helper { color: var(--cg-color-status-success-text-default, #4ade80); }
  `];

  @property({ reflect: true }) label = '';
  @property() value = '';
  @property() placeholder = '';
  @property() name = '';
  @property() helper = '';
  @property({ reflect: true }) type: 'text' | 'email' | 'password' | 'number' | 'url' | 'search' | 'tel' = 'text';
  @property({ reflect: true }) size: 'sm' | 'md' | 'lg' = 'md';
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ type: Boolean }) readonly = false;
  @property({ type: Boolean, reflect: true }) error = false;
  @property({ type: Boolean, reflect: true }) success = false;
  @property({ type: Boolean }) clearable = false;
  @property({ type: Number }) maxlength = 0;
  @property() autocomplete = 'off';

  @state() private _focused = false;

  @query('input') private _input!: HTMLInputElement;

  private get _isFloated() {
    return this._focused || !!this.value;
  }

  private _handleInput(e: Event) {
    const input = e.target as HTMLInputElement;
    this.value = input.value;
    this.dispatchEvent(new CustomEvent('cg-input', { detail: { value: this.value }, bubbles: true, composed: true }));
  }

  private _handleFocus() { this._focused = true; }
  private _handleBlur() { this._focused = false; }

  private _handleClear() {
    this.value = '';
    this._input.value = '';
    this._input.focus();
    this.dispatchEvent(new CustomEvent('cg-input', { detail: { value: '' }, bubbles: true, composed: true }));
    this.dispatchEvent(new CustomEvent('cg-clear', { bubbles: true, composed: true }));
  }

  override render() {
    const wrapperClasses = [
      'wrapper',
      this._focused ? 'focused' : '',
      this.disabled ? 'disabled' : '',
      this.readonly ? 'readonly' : '',
    ].filter(Boolean).join(' ');

    const fieldClasses = ['field', this._isFloated ? 'floated' : ''].filter(Boolean).join(' ');

    return html`
      <div class=${wrapperClasses}>
        <span class="prefix"><slot name="prefix"></slot></span>

        <div class=${fieldClasses}>
          ${this.label ? html`<span class="floating-label">${this.label}</span>` : nothing}
          <input
            .value=${this.value}
            type=${this.type}
            name=${this.name || nothing}
            placeholder=${this.placeholder || (this.label ? ' ' : nothing)}
            ?disabled=${this.disabled}
            ?readonly=${this.readonly}
            maxlength=${this.maxlength || nothing}
            autocomplete=${this.autocomplete}
            aria-invalid=${this.error ? 'true' : 'false'}
            aria-label=${this.label || nothing}
            aria-describedby=${this.helper ? 'helper' : nothing}
            @input=${this._handleInput}
            @focus=${this._handleFocus}
            @blur=${this._handleBlur}
          />
        </div>

        ${this.clearable && this.value ? html`
          <button class="clear" @click=${this._handleClear} aria-label="Clear input" tabindex="-1">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round">
              <path d="M18 6L6 18M6 6l12 12"></path>
            </svg>
          </button>
        ` : nothing}
        ${this.maxlength ? html`<span class="count">${this.value.length}/${this.maxlength}</span>` : nothing}
        <span class="suffix"><slot name="suffix"></slot></span>
      </div>
      ${this.helper ? html`<div class="helper" id="helper">${this.helper}</div>` : nothing}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cg-input': CgInput;
  }
}
