import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { hostBase, reducedMotion } from '../../styles/index.js';

/**
 * <cg-otp-input> — One-time password input with individual digit boxes.
 *
 * @example
 * ```html
 * <cg-otp-input length="6"></cg-otp-input>
 * <cg-otp-input length="4" mask></cg-otp-input>
 * ```
 *
 * @fires {CustomEvent<{value: string}>} cg-otp-change - On each digit change
 * @fires {CustomEvent<{value: string}>} cg-otp-complete - When all digits filled
 *
 * @cssprop --cg-component-otp-box-width - Box width (48px)
 * @cssprop --cg-component-otp-box-height - Box height (56px)
 * @cssprop --cg-color-input-border-default - Default border color
 */
@customElement('cg-otp-input')
export class CgOtpInput extends LitElement {
  static override styles = [hostBase, reducedMotion, css`
    .container {
      display: flex;
      gap: var(--cg-spacing-8);
    }

    .box {
      width: var(--cg-component-otp-box-width);
      height: var(--cg-component-otp-box-height);
      border: var(--cg-border-width-50) solid var(--cg-color-input-border-default);
      border-radius: var(--cg-border-radius-100);
      background: var(--cg-color-input-background-default);
      color: var(--cg-color-input-text-default);
      font-family: inherit;
      font-size: var(--cg-font-size-lg);
      font-weight: var(--cg-font-weight-semibold);
      text-align: center;
      caret-color: var(--cg-color-accent-text);
      outline: none;
      transition:
        border-color var(--cg-transition-duration-fast) var(--cg-transition-easing-default),
        box-shadow var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
      animation: otpCellIn var(--cg-transition-duration-slow) var(--cg-transition-easing-default) both;
    }

    @keyframes otpCellIn {
      from { opacity: 0; transform: translateY(var(--cg-spacing-4)) scale(0.95); }
      to { opacity: 1; transform: translateY(0) scale(1); }
    }

    .box:hover:not(:disabled) {
      border-color: var(--cg-color-input-border-hover);
    }

    .box:focus {
      border-color: var(--cg-color-input-border-focus);
      box-shadow: 0 0 0 3px var(--cg-overlay-accent-strong);
    }

    .box:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      background: var(--cg-color-input-background-disabled);
      border-color: var(--cg-color-input-border-disabled);
    }

    :host([error]) .box {
      border-color: var(--cg-color-input-border-error);
    }
    :host([error]) .box:focus {
      border-color: var(--cg-color-status-error-text-default);
      box-shadow: 0 0 0 3px var(--cg-shadow-focus-error);
    }

    /* ── Success state ── */
    :host([success]) .box {
      border-color: var(--cg-color-status-success-text-default);
    }
    :host([success]) .box:focus {
      border-color: var(--cg-color-status-success-text-default);
      box-shadow: 0 0 0 3px var(--cg-shadow-focus-success);
    }

    .box.filled {
      border-color: var(--cg-color-surface-cards-border-strong);
    }

    /* Rounded variants */
    :host([rounded="none"]) .box { border-radius: 0; }
    :host([rounded="sm"]) .box { border-radius: var(--cg-border-radius-50); }
    :host([rounded="md"]) .box { border-radius: var(--cg-border-radius-100); }
    :host([rounded="lg"]) .box { border-radius: var(--cg-border-radius-150); }
    :host([rounded="full"]) .box { border-radius: var(--cg-border-radius-full); }

    /* Reduced motion */
    @media (prefers-reduced-motion: reduce) {
      .box {
        animation: none !important;
        transform: none !important;
      }
    }
  `];

  @property({ type: Number }) length = 6;
  @property({ reflect: true }) rounded: 'none' | 'sm' | 'md' | 'lg' | 'full' = 'md';
  @property() value = '';
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ type: Boolean, reflect: true }) error = false;
  @property({ type: Boolean, reflect: true }) success = false;
  @property({ type: Boolean }) mask = false;

  @state() private _digits: string[] = [];

  override connectedCallback() {
    super.connectedCallback();
    this._syncDigits();
  }

  override updated(changed: Map<string, unknown>) {
    if ((changed.has('value') && this.value !== this._digits.join('')) || changed.has('length')) this._syncDigits();
  }

  private _syncDigits() {
    this._digits = Array.from({ length: this.length }, (_, i) => this.value[i] || '');
  }

  private _getBoxes(): HTMLInputElement[] {
    return Array.from(this.shadowRoot?.querySelectorAll<HTMLInputElement>('.box') ?? []);
  }

  private _focusBox(index: number) {
    const boxes = this._getBoxes();
    const target = boxes[Math.min(Math.max(0, index), this.length - 1)];
    target?.focus();
    target?.select();
  }

  private _emitValue() {
    const val = this._digits.join('');
    this.value = val;
    this.dispatchEvent(new CustomEvent('cg-otp-change', { detail: { value: val }, bubbles: true, composed: true }));
    if (val.length === this.length && val.split('').every(c => c !== '')) {
      this.dispatchEvent(new CustomEvent('cg-otp-complete', { detail: { value: val }, bubbles: true, composed: true }));
    }
  }

  private _onInput(index: number, e: Event) {
    const input = e.target as HTMLInputElement;
    const chars = input.value.replace(/[^0-9]/g, '');
    if (chars.length > 1) {
      // OS one-time-code autofill inserts the whole code as one input event —
      // distribute across boxes like paste instead of keeping only one digit.
      this._digits = Array.from({ length: this.length }, (_, i) => chars[i] || '');
      this._emitValue();
      this.updateComplete.then(() => {
        const boxes = this._getBoxes();
        this._digits.forEach((d, i) => {
          const box = boxes[i];
          if (box) box.value = this.mask && d ? '\u2022' : d;
        });
        this._focusBox(Math.min(chars.length, this.length - 1));
      });
      return;
    }
    const char = chars;
    this._digits = [...this._digits];
    this._digits[index] = char;
    input.value = this.mask && char ? '\u2022' : char;
    this._emitValue();
    if (char && index < this.length - 1) this._focusBox(index + 1);
  }

  private _onKeyDown(index: number, e: KeyboardEvent) {
    if (e.key === 'Backspace') {
      e.preventDefault();
      if (this._digits[index]) {
        this._digits = [...this._digits];
        this._digits[index] = '';
        (e.target as HTMLInputElement).value = '';
        this._emitValue();
      } else if (index > 0) {
        this._focusBox(index - 1);
        this._digits = [...this._digits];
        this._digits[index - 1] = '';
        this._emitValue();
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      e.preventDefault(); this._focusBox(index - 1);
    } else if (e.key === 'ArrowRight' && index < this.length - 1) {
      e.preventDefault(); this._focusBox(index + 1);
    }
  }

  private _onPaste(e: ClipboardEvent) {
    e.preventDefault();
    const data = (e.clipboardData?.getData('text') || '').replace(/[^0-9]/g, '').slice(0, this.length);
    this._digits = Array.from({ length: this.length }, (_, i) => data[i] || '');
    this._emitValue();
    this.requestUpdate();
    this.updateComplete.then(() => {
      this._focusBox(Math.min(data.length, this.length - 1));
      const boxes = this._getBoxes();
      this._digits.forEach((d, i) => { if (boxes[i]) boxes[i].value = this.mask && d ? '\u2022' : d; });
    });
  }

  override render() {
    return html`
      <div class="container" role="group" aria-label="One-time password input">
        ${Array.from({ length: this.length }, (_, i) => {
          const digit = this._digits[i] || '';
          const display = this.mask && digit ? '\u2022' : digit;
          return html`
            <input class="box ${digit ? 'filled' : ''}"
              type="text" inputmode="numeric" maxlength="1"
              style="animation-delay: calc(${i} * var(--cg-transition-duration-fast) / 2)"
              .value=${display}
              ?disabled=${this.disabled}
              aria-invalid=${this.error ? 'true' : 'false'}
              autocomplete="one-time-code"
              aria-label=${`Digit ${i + 1} of ${this.length}`}
              @input=${(e: Event) => this._onInput(i, e)}
              @keydown=${(e: KeyboardEvent) => this._onKeyDown(i, e)}
              @paste=${this._onPaste}
              @focus=${(e: Event) => (e.target as HTMLInputElement).select()} />
          `;
        })}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cg-otp-input': CgOtpInput;
  }
}
