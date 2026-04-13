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
      animation: fadeSlideIn 200ms var(--cg-transition-easing-ease-out) both;
    }
    :host([hidden]) { display: none; }

    .copy-btn {
      display: inline-flex;
      align-items: center;
      gap: var(--cg-spacing-6);
      font-family: inherit;
      font-weight: var(--cg-font-weight-medium);
      cursor: pointer;
      border: none;
      border-radius: var(--cg-border-radius-100);
      transition: background var(--cg-transition-duration-default) var(--cg-transition-easing-default), color var(--cg-transition-duration-default) var(--cg-transition-easing-default), transform var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
      white-space: nowrap;
    }
    .copy-btn:active {
      transform: scale(var(--cg-interaction-press-scale));
    }
    .copy-btn:focus-visible {
      outline: 2px solid var(--cg-overlay-accent-strong);
      outline-offset: var(--cg-outline-offset-default);
    }

    /* Default variant */
    :host([variant="default"]) .copy-btn,
    :host(:not([variant])) .copy-btn {
      padding: var(--cg-spacing-6) var(--cg-spacing-12);
      font-size: var(--cg-font-size-sm);
      background: var(--cg-overlay-dark-subtle);
      color: var(--cg-color-input-text-placeholder);
      border: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
    }
    :host([variant="default"]) .copy-btn:hover,
    :host(:not([variant])) .copy-btn:hover {
      background: var(--cg-overlay-dark-strong);
      color: var(--cg-color-surface-base-text);
    }

    /* Minimal variant */
    :host([variant="minimal"]) .copy-btn {
      padding: var(--cg-spacing-4) var(--cg-spacing-8);
      font-size: var(--cg-font-size-xs);
      background: none;
      color: var(--cg-color-input-text-placeholder);
    }
    :host([variant="minimal"]) .copy-btn:hover {
      color: var(--cg-color-surface-base-text);
    }

    /* Icon-only variant */
    :host([variant="icon-only"]) .copy-btn {
      padding: var(--cg-spacing-4);
      font-size: var(--cg-font-size-sm);
      background: none;
      color: var(--cg-color-input-text-placeholder);
      line-height: 1;
    }
    :host([variant="icon-only"]) .copy-btn:hover {
      color: var(--cg-color-surface-base-text);
    }
    :host([variant="icon-only"]) .label-text {
      display: none;
    }

    /* Copied (success) state */
    .copy-btn[data-copied="true"] {
      color: var(--cg-color-status-success-text) !important;
    }

    /* Error state */
    .copy-btn[data-error="true"] {
      color: var(--cg-color-status-error-text) !important;
      animation: error-shake var(--cg-transition-duration-slow) var(--cg-transition-easing-default);
    }
    @keyframes error-shake {
      0%, 100% { transform: translateX(0); }
      20% { transform: translateX(-3px); }
      40% { transform: translateX(3px); }
      60% { transform: translateX(-2px); }
      80% { transform: translateX(2px); }
    }
    @media (prefers-reduced-motion: reduce) {
      .copy-btn[data-error="true"] {
        animation: none;
      }
    }

    /* Disabled state */
    .copy-btn:disabled {
      opacity: 0.5;
      cursor: var(--cg-cursor-not-allowed);
      pointer-events: none;
    }

    .icon {
      display: inline-flex;
      font-size: inherit;
      line-height: 1;
    }
  `];
  @property({ type: String }) value = '';
  @property({ type: String }) label = 'Copy';
  @property({ type: String, reflect: true }) variant: 'default' | 'minimal' | 'icon-only' = 'default';
  @property({ type: Number }) timeout = 2000;
  @property({ type: Boolean, reflect: true }) disabled = false;

  @state() private _copied = false;
  @state() private _error = false;

  private _timer: ReturnType<typeof setTimeout> | null = null;

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    if (this._timer) clearTimeout(this._timer);
  }

  private async _handleCopy(): Promise<void> {
    if (!this.value || this.disabled) return;
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
      this._error = true;
      this.dispatchEvent(new CustomEvent('ai-copy-error', {
        detail: { error: err instanceof Error ? err.message : 'Copy failed' },
        bubbles: true,
        composed: true,
      }));

      if (this._timer) clearTimeout(this._timer);
      this._timer = setTimeout(() => {
        this._error = false;
        this._timer = null;
      }, this.timeout);
    }
  }

  private get _icon(): string {
    if (this._error) return '\u2717';
    return this._copied ? '\u2713' : '\u2398';
  }

  private get _displayLabel(): string {
    if (this._error) return 'Failed';
    return this._copied ? 'Copied!' : this.label;
  }

  override render() {
    return html`
      <button
        class="copy-btn"
        ?disabled=${this.disabled}
        data-copied=${this._copied ? 'true' : 'false'}
        data-error=${this._error ? 'true' : 'false'}
        aria-label=${this._displayLabel}
        aria-disabled=${this.disabled ? 'true' : 'false'}
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
