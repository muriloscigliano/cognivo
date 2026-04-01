import { LitElement, html, css, nothing } from 'lit';
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
      padding: var(--cg-spacing-12, 12px);
      border: var(--cg-border-width-50, 1px) solid var(--cg-color-surface-field-border, #27272a);
      border-radius: var(--cg-border-radius-150, 12px);
      background: var(--cg-color-input-background-default, #18181b);
      color: var(--cg-color-surface-base-text, #fafafa);
      font: inherit;
      font-size: var(--cg-font-size-sm, 14px);
      line-height: var(--cg-line-height-normal, 1.5);
      resize: vertical;
      outline: none;
      min-height: 80px;
      box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1), 0 0 0 0px transparent;
      transition: border-color var(--cg-motion-duration-normal, 150ms), box-shadow 150ms ease, height 200ms ease-out;
    }
    textarea::placeholder { color: transparent; }
    /* Show placeholder only when label is floated (focused or has value) */
    .field.floated textarea::placeholder {
      color: var(--cg-gray-500, #71717a);
      transition: color 150ms ease;
    }
    /* When no label, always show placeholder */
    :host(:not([label])) textarea::placeholder { color: var(--cg-gray-500, #71717a); }

    textarea:hover:not(:disabled):not([readonly]) { border-color: var(--cg-focus-ring-color, #c8e650); }
    textarea:focus { border-color: var(--cg-focus-ring-color, #c8e650); box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1), 0 0 0 3px var(--cg-overlay-accent-strong, rgba(223, 255, 97, 0.25)); }
    textarea:disabled { opacity: 0.5; cursor: not-allowed; background: var(--cg-color-surface-field-disable-background, #18181b); }
    textarea[readonly] { background: var(--cg-color-surface-field-disable-background, #18181b); }

    /* When floating label is active, shift textarea padding to make room */
    :host([label]) textarea {
      padding-top: 22px;
      padding-bottom: 6px;
    }
    :host([label][size="sm"]) textarea {
      padding-top: 18px;
      padding-bottom: 4px;
    }
    :host([label][size="lg"]) textarea {
      padding-top: 26px;
      padding-bottom: 8px;
    }

    :host([error]) textarea { border-color: var(--cg-text-danger, #ef4444); }
    :host([error]) textarea:focus {
      border-color: var(--cg-color-status-error-text-default, #ef4444);
      box-shadow: 0 0 0 2px var(--cg-color-surface-base-background, #09090b), 0 0 0 4px var(--cg-color-status-error-background-default, rgba(239, 68, 68, 0.6));
    }

    :host([success]) textarea { border-color: var(--cg-color-input-icon-success, #4ade80); }
    :host([success]) textarea:focus {
      border-color: var(--cg-color-status-success-text-default, #4ade80);
      box-shadow: 0 0 0 2px var(--cg-color-surface-base-background, #09090b), 0 0 0 4px var(--cg-color-status-success-background-default, rgba(74, 222, 128, 0.5));
    }

    :host([autoresize]) textarea { resize: none; overflow: hidden; }

    /* ── Floating label ── */
    .floating-label {
      position: absolute;
      left: var(--cg-spacing-12, 12px);
      top: 18px;
      transform: translateY(-50%);
      font-size: var(--cg-font-size-sm, 14px);
      color: var(--cg-color-input-text-placeholder, #71717a);
      pointer-events: none;
      transform-origin: left top;
      transition:
        top 200ms var(--cg-motion-easing-default, cubic-bezier(0.4, 0, 0.2, 1)),
        transform 200ms var(--cg-motion-easing-default, cubic-bezier(0.4, 0, 0.2, 1)),
        font-size 200ms var(--cg-motion-easing-default, cubic-bezier(0.4, 0, 0.2, 1)),
        color 150ms ease;
      z-index: 2;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: calc(100% - var(--cg-spacing-24, 24px));
    }

    :host([size="sm"]) .floating-label { font-size: var(--cg-font-size-xs, 12px); left: 8px; top: 14px; }
    :host([size="lg"]) .floating-label { font-size: var(--cg-font-size-base, 16px); left: 16px; top: 22px; }

    /* Floated state — label shrinks and moves to top INSIDE the textarea */
    .field.floated .floating-label {
      top: 4px;
      transform: translateY(0);
      font-size: 10px;
      color: var(--cg-brand-ai-accent, #dfff61);
    }
    :host([size="sm"]) .field.floated .floating-label {
      top: 2px;
      font-size: 9px;
    }
    :host([size="lg"]) .field.floated .floating-label {
      top: 6px;
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

    .footer {
      display: flex;
      justify-content: flex-end;
      margin-top: 4px;
    }
    .count {
      font-size: var(--cg-font-size-xs, 12px);
      color: var(--cg-gray-500, #71717a);
    }
    :host([error]) .count { color: var(--cg-text-danger, #ef4444); }

    /* ── Helper text ── */
    .helper {
      font-size: 12px;
      color: var(--cg-gray-500, #71717a);
      padding: 4px 12px 0;
    }
    :host([error]) .helper { color: var(--cg-color-status-error-text-default, #ef4444); }
    :host([success]) .helper { color: var(--cg-color-status-success-text-default, #4ade80); }

    /* Size variants */
    :host([size="sm"]) textarea { font-size: 12px; padding: 6px 8px; min-height: 60px; }
    :host([size="lg"]) textarea { font-size: 16px; padding: 10px 16px; min-height: 100px; }

    /* ── Rounded overrides ── */
    :host([rounded="none"]) textarea { border-radius: 0; }
    :host([rounded="sm"]) textarea { border-radius: var(--cg-border-radius-50, 4px); }
    :host([rounded="md"]) textarea { border-radius: var(--cg-border-radius-100, 8px); }
    :host([rounded="lg"]) textarea { border-radius: var(--cg-border-radius-150, 12px); }
    :host([rounded="full"]) textarea { border-radius: var(--cg-border-radius-full, 99999px); }
  `];

  @property({ reflect: true }) label = '';
  @property() helper = '';
  @property({ reflect: true }) size: 'sm' | 'md' | 'lg' = 'md';
  @property({ reflect: true }) rounded: 'none' | 'sm' | 'md' | 'lg' | 'full' = 'lg';
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

  @state() private _focused = false;

  @query('textarea') private _textarea!: HTMLTextAreaElement;

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
            ?disabled=${this.disabled}
            ?readonly=${this.readonly}
            aria-invalid=${this.error ? 'true' : 'false'}
            aria-label=${this.label || nothing}
            aria-describedby=${this.helper ? 'helper' : nothing}
            @input=${this._handleInput}
            @focus=${this._handleFocus}
            @blur=${this._handleBlur}
          ></textarea>
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
