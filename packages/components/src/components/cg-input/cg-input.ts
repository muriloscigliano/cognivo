import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { hostBlock, reducedMotion } from '../../styles/index.js';

/**
 * <cg-input> — Text input with prefix/suffix slots, clear button, and validation states.
 *
 * Better than OpenUI's Input:
 * - Prefix/suffix slots (icons, text, buttons)
 * - Clear button
 * - Character count
 * - All 8 states: default, hover, focus, disabled, readonly, error, success
 * - Proper ARIA integration
 */
@customElement('cg-input')
export class CgInput extends LitElement {
  static override styles = [hostBlock, reducedMotion, css`
    .wrapper {
      display: flex;
      align-items: center;
      gap: var(--cg-spacing-8, 8px);
      padding: 0 var(--cg-spacing-12, 12px);
      border: 1px solid var(--cg-color-input-border-default, #3f3f46);
      border-radius: var(--cg-border-radius-150, 12px);
      background: var(--cg-color-input-background-default, #18181b);
      transition: all var(--cg-transition-duration-default, 200ms) ease-out;
      min-height: 40px;
    }

    /* Size variants */
    :host([size="sm"]) .wrapper { min-height: 32px; padding: 0 var(--cg-spacing-8, 8px); }
    :host([size="lg"]) .wrapper { min-height: 48px; padding: 0 var(--cg-spacing-16, 16px); }

    /* Hover */
    .wrapper:hover:not(.disabled):not(.readonly) {
      border-color: var(--cg-color-input-border-hover, #dfff61);
    }

    /* Focus — dual layer ring like HeroUI */
    .wrapper.focused {
      border-color: var(--cg-brand-ai-accent, #dfff61);
      box-shadow:
        0 0 0 2px var(--cg-color-surface-base-background, #09090b),
        0 0 0 4px var(--cg-brand-ai-accent, #dfff61);
    }

    /* Error */
    :host([error]) .wrapper {
      border-color: var(--cg-color-input-border-error, rgba(239, 68, 68, 0.25));
    }
    :host([error]) .wrapper.focused {
      box-shadow: 0 0 0 3px var(--cg-color-status-error-background-default, rgba(239, 68, 68, 0.12));
    }

    /* Success */
    :host([success]) .wrapper {
      border-color: var(--cg-color-input-icon-success, #4ade80);
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
    }

    input {
      flex: 1;
      border: none;
      outline: none;
      background: transparent;
      font: inherit;
      font-size: var(--cg-font-size-sm, 14px);
      color: var(--cg-color-input-text-default, #f4f4f5);
      min-width: 0;
      padding: var(--cg-spacing-8, 8px) 0;
    }
    :host([size="sm"]) input { font-size: var(--cg-font-size-xs, 12px); padding: 6px 0; }
    :host([size="lg"]) input { font-size: var(--cg-font-size-base, 16px); padding: 10px 0; }

    input::placeholder {
      color: var(--cg-color-input-text-placeholder, #71717a);
    }

    input:disabled { cursor: not-allowed; }

    /* Slots */
    .prefix, .suffix {
      display: flex;
      align-items: center;
      color: var(--cg-color-input-icon-default, #dfff61);
      flex-shrink: 0;
    }

    /* Clear button */
    .clear {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 18px;
      height: 18px;
      border: none;
      background: var(--cg-gray-200, #e4e4e7);
      color: var(--cg-gray-500, #71717a);
      border-radius: var(--cg-border-radius-full, 99999px);
      cursor: pointer;
      padding: 0;
      flex-shrink: 0;
      transition: all var(--cg-transition-duration-fast, 100ms);
    }
    .clear:hover { background: var(--cg-gray-300, #d4d4d8); color: var(--cg-gray-700, #3f3f46); }
    .clear svg { width: 10px; height: 10px; }

    /* Character count */
    .count {
      font-size: 0.7rem;
      color: var(--cg-color-input-text-placeholder, #71717a);
      flex-shrink: 0;
      tabular-nums: true;
    }
    :host([error]) .count { color: var(--cg-color-status-error-text-default, #f87171); }
  

    :focus-visible {
      outline: none;
      box-shadow: 0 0 0 2px var(--cg-color-surface-base-background, #09090b), 0 0 0 4px var(--cg-brand-ai-accent, #dfff61);
    }
  `];

  @property() value = '';
  @property() placeholder = '';
  @property() name = '';
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

    return html`
      <div class=${wrapperClasses}>
        <span class="prefix"><slot name="prefix"></slot></span>
        <input
          .value=${this.value}
          type=${this.type}
          name=${this.name || nothing}
          placeholder=${this.placeholder || nothing}
          ?disabled=${this.disabled}
          ?readonly=${this.readonly}
          maxlength=${this.maxlength || nothing}
          autocomplete=${this.autocomplete}
          aria-invalid=${this.error ? 'true' : 'false'}
          @input=${this._handleInput}
          @focus=${this._handleFocus}
          @blur=${this._handleBlur}
        />
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
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cg-input': CgInput;
  }
}
