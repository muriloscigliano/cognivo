import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { hostBlock, reducedMotion } from '../../styles/index.js';

/**
 * @element cg-textarea
 * Multi-line text input with optional auto-resize and character count.
 *
 * @example
 * ```html
 * <cg-textarea placeholder="Write something..." rows="4"></cg-textarea>
 * <cg-textarea autoresize maxlength="500" error></cg-textarea>
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
    textarea::placeholder { color: var(--cg-gray-500, #71717a); }
    textarea:hover:not(:disabled):not([readonly]) { border-color: var(--cg-focus-ring-color, #c8e650); }
    textarea:focus { border-color: var(--cg-focus-ring-color, #c8e650); box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1), 0 0 0 3px var(--cg-overlay-accent-strong, rgba(223, 255, 97, 0.25)); }
    textarea:disabled { opacity: 0.5; cursor: not-allowed; background: var(--cg-color-surface-field-disable-background, #18181b); }
    textarea[readonly] { background: var(--cg-color-surface-field-disable-background, #18181b); }

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

  @query('textarea') private _textarea!: HTMLTextAreaElement;

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
    return html`
      <div class="wrapper">
        <textarea
          .value=${this.value}
          rows=${this.rows}
          name=${this.name || nothing}
          placeholder=${this.placeholder || nothing}
          maxlength=${this.maxlength || nothing}
          ?disabled=${this.disabled}
          ?readonly=${this.readonly}
          aria-invalid=${this.error ? 'true' : 'false'}
          @input=${this._handleInput}
        ></textarea>
        ${this.maxlength ? html`<div class="footer"><span class="count">${this.value.length}/${this.maxlength}</span></div>` : nothing}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap { 'cg-textarea': CgTextarea; }
}
