/**
 * @element ai-copy-button
 * One-click clipboard copy with animated confirmation state and three display variants.
 *
 * @example
 * ```html
 * <ai-copy-button value="sk-abc123..." label="Copy API Key"></ai-copy-button>
 * <ai-copy-button value="hello world" variant="icon-only"></ai-copy-button>
 * ```
 *
 * @fires {CustomEvent<{value: string}>} ai-copy-success - Content copied to clipboard
 * @fires {CustomEvent<{error: string}>} ai-copy-error - Clipboard write failed
 *
 * @cssprop [--cg-color-accent=#dfff61] - Focus ring and copied-state text color
 */
import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { hostBase, reducedMotion, fadeSlideInKeyframes } from '../../styles/index.js';

@customElement('ai-copy-button')
export class AiCopyButton extends LitElement {
  static override styles = [hostBase, reducedMotion, fadeSlideInKeyframes, css`
    :host {
      animation: fadeSlideIn 200ms var(--cg-motion-easing-enter, cubic-bezier(0, 0, 0.2, 1)) both;
    }
    :host([hidden]) { display: none; }

    .copy-btn {
      display: inline-flex;
      align-items: center;
      gap: var(--cg-spacing-6, 6px);
      font-family: inherit;
      font-weight: 500;
      cursor: pointer;
      border: none;
      border-radius: var(--cg-border-radius-100, 8px);
      transition: background 150ms ease, color 150ms ease, transform 100ms ease;
      white-space: nowrap;
      box-shadow: inset 0 1px 0 0 rgba(255, 255, 255, 0.05);
      background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0.03), transparent);
    }
    .copy-btn:active {
      transform: scale(var(--cg-interaction-press-scale, 0.97));
    }
    .copy-btn:focus-visible {
      outline: 2px solid var(--cg-color-accent, #dfff61);
      outline-offset: 2px;
    }

    /* Default variant */
    :host([variant="default"]) .copy-btn,
    :host(:not([variant])) .copy-btn {
      padding: var(--cg-spacing-6, 6px) var(--cg-spacing-12, 12px);
      font-size: var(--cg-font-size-sm, 14px);
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
      padding: var(--cg-spacing-4, 4px) var(--cg-spacing-8, 8px);
      font-size: var(--cg-font-size-xs, 12px);
      background: none;
      color: var(--cg-color-text-tertiary, #71717a);
    }
    :host([variant="minimal"]) .copy-btn:hover {
      color: var(--cg-color-text-primary, #fafafa);
    }

    /* Icon-only variant */
    :host([variant="icon-only"]) .copy-btn {
      padding: 4px;
      font-size: var(--cg-font-size-sm, 14px);
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
    }
  `];
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
