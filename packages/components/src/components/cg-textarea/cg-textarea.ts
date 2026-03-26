import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';

/**
 * <cg-textarea> — Multi-line text input with auto-resize and character count.
 *
 * Better than OpenUI's TextArea:
 * - Auto-resize to content
 * - Character count with maxlength
 * - All states: default, hover, focus, disabled, readonly, error
 */
@customElement('cg-textarea')
export class CgTextarea extends LitElement {
  static override styles = css`
    :host {
      transition: color 100ms cubic-bezier(0, 0, 0.58, 1);
      display: block;
      font-family: var(--cg-font-family-primary, 'Inter Variable', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif);
    }
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
      line-height: 1.5;
      resize: vertical;
      outline: none;
      transition: border-color var(--cg-motion-duration-normal, 150ms), box-shadow 0.15s;
      min-height: 80px;
    }
    textarea::placeholder { color: var(--cg-gray-500, #71717a); }
    textarea:hover:not(:disabled):not([readonly]) { border-color: var(--cg-focus-ring-color, #c8e650); }
    textarea:focus { border-color: var(--cg-focus-ring-color, #c8e650); box-shadow: 0 0 0 3px var(--cg-overlay-accent-strong, rgba(223, 255, 97, 0.25))))))))); }
    textarea:disabled { opacity: 0.5; cursor: not-allowed; background: var(--cg-color-surface-field-disable-background, #18181b); }
    textarea[readonly] { background: var(--cg-color-surface-field-disable-background, #18181b); }

    :host([error]) textarea { border-color: var(--cg-text-danger, #ef4444); }
    :host([error]) textarea:focus { box-shadow: 0 0 0 3px var(--cg-overlay-dark-medium, rgba(0, 0, 0, 0.3))))))))); }

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
  

    @media (prefers-reduced-motion: reduce) {
      * { transition: none !important; animation: none !important; }
    }
  `;

  @property() value = '';
  @property() placeholder = '';
  @property() name = '';
  @property({ type: Number }) rows = 3;
  @property({ type: Number }) maxlength = 0;
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ type: Boolean }) readonly = false;
  @property({ type: Boolean, reflect: true }) error = false;
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
