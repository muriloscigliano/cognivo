/**
 * @element ai-toast
 * AI-flavored toast notification stack. Thin wrapper around `cg-toaster`
 * defaulting to the `ai` variant (brand-accented left border + sparkle icon).
 *
 * @example
 * ```html
 * <ai-toast position="top-right"></ai-toast>
 * <script>
 *   const toast = document.querySelector('ai-toast');
 *   toast.show('Model updated successfully', { type: 'success' });
 *   toast.show('Rate limit exceeded', { type: 'error', title: 'API Error' });
 *   toast.show('Thinking...', { type: 'ai', duration: 0 }); // persistent
 * </script>
 * ```
 *
 * @method show(message, options?) - Show a toast, returns its ID
 * @method dismiss(id) - Dismiss a specific toast
 * @method clear() - Remove all toasts
 *
 * @fires {CustomEvent<{id, reason}>} ai-toast-dismiss - When a toast is dismissed
 */
import { LitElement, html, css } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { CgToaster, type ToastVariant } from '../cg-toaster/cg-toaster.js';

// Ensure foundation element is registered.
if (!customElements.get('cg-toaster')) {
  customElements.define('cg-toaster', CgToaster);
}

interface ToastOptions {
  type?: 'info' | 'success' | 'warning' | 'error' | 'ai';
  title?: string;
  duration?: number;
}

// ai-toast's cg-toaster position enum (subset kept for BC).
type AiPosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';

@customElement('ai-toast')
export class AiToast extends LitElement {
  static override styles = css`
    :host { display: contents; }
  `;

  @property({ reflect: true }) rounded: 'none' | 'sm' | 'md' | 'lg' = 'lg';
  @property({ type: String, reflect: true }) position: AiPosition = 'top-right';
  @property({ type: Number }) maxQueue: number = 6;

  @query('cg-toaster') private _toaster!: CgToaster;

  /** Show a toast notification. Returns the toast ID. */
  show(message: string, options?: ToastOptions | string, duration?: number): string {
    let opts: ToastOptions = {};
    if (typeof options === 'string') {
      opts = { type: options as NonNullable<ToastOptions['type']> };
      if (duration !== undefined) opts.duration = duration;
    } else if (options) {
      opts = options;
    }

    // Default to 'ai' variant — this is ai-toast's differentiator.
    const type = (opts.type ?? 'ai') as ToastVariant;
    // Translate ai-toast options → cg-toaster ToastOptions.
    // `message` becomes the title when no explicit title is given (preserves
    // existing behavior where the message is always visible); otherwise
    // message goes to `description`.
    const title = opts.title || message;
    const cgOpts: { title: string; variant: ToastVariant; description?: string; duration?: number } = {
      title,
      variant: type,
    };
    if (opts.title) cgOpts.description = message;
    if (opts.duration !== undefined) cgOpts.duration = opts.duration;

    return this._toaster.show(cgOpts);
  }

  dismiss(id: string): void {
    this._toaster?.dismiss(id);
  }

  clear(): void {
    this._toaster?.clear();
  }

  private _onInnerDismiss = (e: Event) => {
    const ce = e as CustomEvent<{ id: string }>;
    this.dispatchEvent(new CustomEvent('ai-toast-dismiss', {
      bubbles: true,
      composed: true,
      detail: { id: ce.detail.id, reason: 'auto' },
    }));
  };

  override render() {
    return html`
      <cg-toaster
        .position=${this.position}
        .max=${this.maxQueue}
        @cg-toaster-dismiss=${this._onInnerDismiss}
      ></cg-toaster>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ai-toast': AiToast;
  }
}
