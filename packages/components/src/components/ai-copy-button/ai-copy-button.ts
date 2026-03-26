/**
 * <ai-copy-button> — One-click copy with confirmation.
 *
 * Props: value, label, variant, timeout
 * Events: ai-copy-success, ai-copy-error
 * Features: Click to copy to clipboard, "Copied!" confirmation with checkmark,
 *           auto-resets after timeout, icon-only variant for inline use
 */
import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

@customElement('ai-copy-button')
export class AiCopyButton extends LitElement {
  static override styles = css`
    :host {
      display: inline-flex;
      font-family: var(--cg-font-family-primary, 'Inter Variable', 'Inter', -apple-system, sans-serif);
    }
    :host([hidden]) { display: none; }

    .copy-btn {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-family: inherit;
      font-weight: 500;
      cursor: pointer;
      border: none;
      border-radius: 6px;
      transition: background 150ms ease, color 150ms ease, transform 100ms ease;
      white-space: nowrap;
    }
    .copy-btn:active {
      transform: scale(0.96);
    }
    .copy-btn:focus-visible {
      outline: 2px solid var(--cg-color-accent, #dfff61);
      outline-offset: 2px;
    }

    /* Default variant */
    :host([variant="default"]) .copy-btn,
    :host(:not([variant])) .copy-btn {
      padding: 6px 14px;
      font-size: 13px;
      background: rgba(255, 255, 255, 0.06);
      color: var(--cg-color-text-secondary, #a1a1aa);
      border: 1px solid var(--cg-color-border, #27272a);
    }
    :host([variant="default"]) .copy-btn:hover,
    :host(:not([variant])) .copy-btn:hover {
      background: rgba(255, 255, 255, 0.1);
      color: var(--cg-color-text-primary, #fafafa);
    }

    /* Minimal variant */
    :host([variant="minimal"]) .copy-btn {
      padding: 4px 10px;
      font-size: 12px;
      background: none;
      color: var(--cg-color-text-tertiary, #71717a);
    }
    :host([variant="minimal"]) .copy-btn:hover {
      color: var(--cg-color-text-primary, #fafafa);
    }

    /* Icon-only variant */
    :host([variant="icon-only"]) .copy-btn {
      padding: 4px;
      font-size: 15px;
      background: none;
      color: var(--cg-color-text-tertiary, #71717a);
      line-height: 1;
    }
    :host([variant="icon-only"]) .copy-btn:hover {
      color: var(--cg-color-text-primary, #fafafa);
    }
    :host([variant="icon-only"]) .label-text {
      display: none;
    }

    /* Copied state */
    .copy-btn[data-copied="true"] {
      color: var(--cg-color-accent, #dfff61) !important;
    }

    .icon {
      display: inline-flex;
      font-size: inherit;
      line-height: 1;
    }

    @media (prefers-reduced-motion: reduce) {
      .copy-btn { transition: none; transform: none !important; }
    }
  `;

  @property({ type: String }) value = '';
  @property({ type: String }) label = 'Copy';
  @property({ type: String, reflect: true }) variant: 'default' | 'minimal' | 'icon-only' = 'default';
  @property({ type: Number }) timeout = 2000;

  @state() private _copied = false;

  private _timer: ReturnType<typeof setTimeout> | null = null;

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    if (this._timer) clearTimeout(this._timer);
  }

  private async _handleCopy(): Promise<void> {
    if (!this.value) return;
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(this.value);
      } else {
        // Fallback for non-secure contexts
        const ta = document.createElement('textarea');
        ta.value = this.value;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
      }
      this._copied = true;
      this.dispatchEvent(new CustomEvent('ai-copy-success', {
        detail: { value: this.value },
        bubbles: true,
        composed: true,
      }));

      if (this._timer) clearTimeout(this._timer);
      this._timer = setTimeout(() => {
        this._copied = false;
        this._timer = null;
      }, this.timeout);
    } catch (err) {
      this.dispatchEvent(new CustomEvent('ai-copy-error', {
        detail: { error: err instanceof Error ? err.message : 'Copy failed' },
        bubbles: true,
        composed: true,
      }));
    }
  }

  private get _icon(): string {
    return this._copied ? '\u2713' : '\u2398';
  }

  private get _displayLabel(): string {
    return this._copied ? 'Copied!' : this.label;
  }

  override render() {
    return html`
      <button
        class="copy-btn"
        role="button"
        tabindex="0"
        data-copied=${this._copied ? 'true' : 'false'}
        aria-label=${this._displayLabel}
        @click=${this._handleCopy}
      >
        <span class="icon">${this._icon}</span>
        <span class="label-text">${this._displayLabel}</span>
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ai-copy-button': AiCopyButton;
  }
}
