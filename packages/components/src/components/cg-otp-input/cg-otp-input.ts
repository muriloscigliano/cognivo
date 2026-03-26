import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

/**
 * <cg-otp-input> — One-time password input with individual digit boxes.
 *
 * Features:
 * - Auto-focus next on type, backspace goes to previous
 * - Paste fills all boxes
 * - Mask mode (dots instead of digits)
 * - Error state with red border
 * - Dual focus ring on active box
 * - Full ARIA and keyboard support
 */
@customElement('cg-otp-input')
export class CgOtpInput extends LitElement {
  static override styles = css`
    :host {
      display: inline-flex;
      font-family: var(--cg-font-family-primary, 'Inter Variable', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif);
    }

    .container {
      display: flex;
      gap: var(--cg-spacing-8, 8px);
    }

    .box {
      width: 44px;
      height: 52px;
      border: 1px solid var(--cg-color-input-border-default, #3f3f46);
      border-radius: var(--cg-border-radius-150, 12px);
      background: var(--cg-color-input-background-default, #18181b);
      color: var(--cg-color-input-text-default, #f4f4f5);
      font-family: inherit;
      font-size: var(--cg-font-size-lg, 20px);
      font-weight: var(--cg-font-weight-semibold, 600);
      text-align: center;
      caret-color: var(--cg-brand-ai-accent, #dfff61);
      outline: none;
      transition: border-color 200ms ease-out, box-shadow 200ms ease-out, transform 250ms cubic-bezier(0.4, 0, 0.2, 1);
    }

    .box:hover:not(:disabled) {
      border-color: var(--cg-color-input-border-hover, #dfff61);
    }

    .box:focus {
      border-color: var(--cg-brand-ai-accent, #dfff61);
      box-shadow:
        0 0 0 2px var(--cg-color-surface-base-background, #09090b),
        0 0 0 4px var(--cg-brand-ai-accent, #dfff61);
      transform: scale(1.05);
    }

    .box:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    :host([error]) .box {
      border-color: var(--cg-color-status-error-border-default, rgba(239, 68, 68, 0.25));
    }
    :host([error]) .box:focus {
      border-color: var(--cg-color-status-error-text-default, #f87171);
      box-shadow: 0 0 0 3px var(--cg-color-status-error-background-default, rgba(239, 68, 68, 0.12));
    }

    .box.filled {
      border-color: var(--cg-color-surface-container-border, #3f3f46);
    }

    @media (prefers-reduced-motion: reduce) {
      .box { transition: none; }
    }
  `;

  @property({ type: Number }) length = 6;
  @property() value = '';
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ type: Boolean, reflect: true }) error = false;
  @property({ type: Boolean }) mask = false;

  @state() private _digits: string[] = [];

  override connectedCallback() {
    super.connectedCallback();
    this._syncDigits();
  }

  override updated(changed: Map<string, unknown>) {
    if (changed.has('value') || changed.has('length')) this._syncDigits();
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
    const char = input.value.replace(/[^0-9]/g, '').slice(-1);
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
              .value=${display}
              ?disabled=${this.disabled}
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
