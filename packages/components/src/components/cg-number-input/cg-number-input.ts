import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';

/**
 * <cg-number-input> — Number input with increment/decrement buttons.
 *
 * Features:
 * - +/- buttons with press scale and long-press repeat
 * - Keyboard up/down arrows, direct typing
 * - Clamp to min/max, configurable step
 * - Dual focus ring, size variants
 * - Full ARIA: spinbutton role, valuemin/max/now
 */
@customElement('cg-number-input')
export class CgNumberInput extends LitElement {
  static override styles = css`
    :host {
      display: inline-flex;
      font-family: var(--cg-font-family-primary, 'Inter Variable', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif);
    }

    .wrapper {
      display: inline-flex;
      align-items: center;
      border: 1px solid var(--cg-color-input-border-default, #3f3f46);
      border-radius: var(--cg-border-radius-150, 12px);
      background: var(--cg-color-input-background-default, #18181b);
      overflow: hidden;
      transition: border-color 200ms ease-out, box-shadow 200ms ease-out;
    }
    .wrapper.focused {
      border-color: var(--cg-brand-ai-accent, #dfff61);
      box-shadow:
        0 0 0 2px var(--cg-color-surface-base-background, #09090b),
        0 0 0 4px var(--cg-brand-ai-accent, #dfff61);
    }
    .wrapper:hover:not(.disabled) {
      border-color: var(--cg-color-input-border-hover, #dfff61);
    }
    .wrapper.disabled { opacity: 0.5; cursor: not-allowed; }

    .btn {
      display: flex;
      align-items: center;
      justify-content: center;
      border: none;
      background: var(--cg-color-action-secondary-background-default, #27272a);
      color: var(--cg-color-surface-base-text, #fafafa);
      cursor: pointer;
      padding: 0;
      flex-shrink: 0;
      transition: background 100ms ease, transform 250ms cubic-bezier(0.4, 0, 0.2, 1);
      -webkit-user-select: none;
      user-select: none;
    }
    .btn:hover:not(:disabled) { background: var(--cg-color-action-secondary-background-hover, #3f3f46); }
    .btn:active:not(:disabled) { transform: scale(0.92); }
    .btn:disabled { cursor: not-allowed; opacity: 0.4; }
    .btn:focus-visible {
      box-shadow: 0 0 0 2px var(--cg-color-surface-base-background, #09090b), 0 0 0 4px var(--cg-brand-ai-accent, #dfff61);
      outline: none;
      z-index: 1;
      position: relative;
    }
    .btn svg { width: 14px; height: 14px; }

    /* Sizes */
    :host([size="sm"]) .btn { width: 28px; height: 28px; }
    :host([size="md"]) .btn { width: 36px; height: 36px; }
    :host([size="lg"]) .btn { width: 44px; height: 44px; }

    input {
      border: none;
      outline: none;
      background: transparent;
      font-family: inherit;
      color: var(--cg-color-input-text-default, #f4f4f5);
      text-align: center;
      min-width: 0;
      -moz-appearance: textfield;
    }
    input::-webkit-inner-spin-button,
    input::-webkit-outer-spin-button { -webkit-appearance: none; margin: 0; }
    input:disabled { cursor: not-allowed; }

    :host([size="sm"]) input { width: 40px; font-size: var(--cg-font-size-xs, 12px); height: 28px; }
    :host([size="md"]) input { width: 52px; font-size: var(--cg-font-size-sm, 14px); height: 36px; }
    :host([size="lg"]) input { width: 64px; font-size: var(--cg-font-size-base, 16px); height: 44px; }

    .label { display: block; font-size: var(--cg-font-size-xs, 12px); color: var(--cg-color-input-text-placeholder, #71717a); margin-bottom: var(--cg-spacing-4, 4px); }

    @media (prefers-reduced-motion: reduce) {
      .btn, .wrapper { transition: none; }
    }
  `;

  @property({ type: Number }) value = 0;
  @property({ type: Number }) min = -Infinity;
  @property({ type: Number }) max = Infinity;
  @property({ type: Number }) step = 1;
  @property() label = '';
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ reflect: true }) size: 'sm' | 'md' | 'lg' = 'md';

  @state() private _focused = false;
  private _repeatTimer = 0;

  @query('input') private _input!: HTMLInputElement;

  private _clamp(v: number): number {
    return Math.min(this.max, Math.max(this.min, v));
  }

  private _setValue(v: number) {
    const clamped = this._clamp(v);
    if (clamped !== this.value) {
      this.value = clamped;
      this.dispatchEvent(new CustomEvent('cg-change', { detail: { value: this.value }, bubbles: true, composed: true }));
    }
  }

  private _increment() { this._setValue(this.value + this.step); }
  private _decrement() { this._setValue(this.value - this.step); }

  private _startRepeat(action: () => void) {
    action();
    let delay = 400;
    const repeat = () => {
      action();
      delay = Math.max(60, delay * 0.8);
      this._repeatTimer = window.setTimeout(repeat, delay);
    };
    this._repeatTimer = window.setTimeout(repeat, delay);
  }
  private _stopRepeat() { clearTimeout(this._repeatTimer); }

  private _onInput(e: Event) {
    const raw = (e.target as HTMLInputElement).value;
    const parsed = parseFloat(raw);
    if (!Number.isNaN(parsed)) this._setValue(parsed);
  }

  private _onKeyDown(e: KeyboardEvent) {
    if (e.key === 'ArrowUp') { e.preventDefault(); this._increment(); }
    else if (e.key === 'ArrowDown') { e.preventDefault(); this._decrement(); }
  }

  override disconnectedCallback() { super.disconnectedCallback(); this._stopRepeat(); }

  override render() {
    const atMin = this.value <= this.min;
    const atMax = this.value >= this.max;
    return html`
      ${this.label ? html`<span class="label">${this.label}</span>` : nothing}
      <div class="wrapper ${this._focused ? 'focused' : ''} ${this.disabled ? 'disabled' : ''}">
        <button class="btn" aria-label="Decrease"
          ?disabled=${this.disabled || atMin}
          @mousedown=${() => this._startRepeat(() => this._decrement())}
          @mouseup=${this._stopRepeat} @mouseleave=${this._stopRepeat}
          @touchstart=${() => this._startRepeat(() => this._decrement())}
          @touchend=${this._stopRepeat}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M5 12h14"/></svg>
        </button>
        <input type="text" inputmode="numeric"
          role="spinbutton"
          aria-valuenow=${this.value}
          aria-valuemin=${this.min === -Infinity ? nothing : this.min}
          aria-valuemax=${this.max === Infinity ? nothing : this.max}
          aria-label=${this.label || 'Number input'}
          .value=${String(this.value)}
          ?disabled=${this.disabled}
          @input=${this._onInput}
          @keydown=${this._onKeyDown}
          @focus=${() => { this._focused = true; }}
          @blur=${() => { this._focused = false; }} />
        <button class="btn" aria-label="Increase"
          ?disabled=${this.disabled || atMax}
          @mousedown=${() => this._startRepeat(() => this._increment())}
          @mouseup=${this._stopRepeat} @mouseleave=${this._stopRepeat}
          @touchstart=${() => this._startRepeat(() => this._increment())}
          @touchend=${this._stopRepeat}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>
        </button>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cg-number-input': CgNumberInput;
  }
}
