/**
 * @element ai-toast
 * Fixed-position toast notification stack with auto-dismiss progress bars,
 * slide-in/out animations, type-colored left accent, optional title, and queue management.
 *
 * Imperative API: `show(message, options)`.
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
import { LitElement, html, css, nothing } from 'lit';
import { state, customElement, property } from 'lit/decorators.js';
import { hostBlock, reducedMotion } from '../../styles/index.js';

interface ToastOptions {
  type?: 'info' | 'success' | 'warning' | 'error' | 'ai';
  title?: string;
  duration?: number;
}

interface Toast {
  id: string;
  message: string;
  title: string;
  type: 'info' | 'success' | 'warning' | 'error' | 'ai';
  duration: number;
  createdAt: number;
  dismissing?: boolean;
}

@customElement('ai-toast')
export class AiToast extends LitElement {
  static override styles = [hostBlock, reducedMotion, css`
    :host {
      position: fixed;
      z-index: var(--cg-z-index-top);
      pointer-events: none;
    }
    :host([position="top-right"]), :host(:not([position])) { top: var(--cg-spacing-20); right: var(--cg-spacing-20); }
    :host([position="top-left"]) { top: var(--cg-spacing-20); left: var(--cg-spacing-20); }
    :host([position="bottom-right"]) { bottom: var(--cg-spacing-20); right: var(--cg-spacing-20); }
    :host([position="bottom-left"]) { bottom: var(--cg-spacing-20); left: var(--cg-spacing-20); }

    .stack {
      display: flex;
      flex-direction: column;
      gap: var(--cg-spacing-8);
      max-width: 24rem;
      min-width: 18rem;
    }

    /* ── Toast card ── */
    .toast {
      display: flex;
      align-items: flex-start;
      gap: var(--cg-spacing-12);
      padding: var(--cg-spacing-12) var(--cg-spacing-16);
      border-radius: var(--cg-border-radius-100);
      background: var(--cg-color-surface-toast-background);
      border: var(--cg-border-width-50) solid var(--cg-color-surface-toast-border);
      border-left: var(--cg-border-width-200) solid transparent;
      pointer-events: auto;
      animation: toastIn var(--cg-transition-duration-slow) var(--cg-transition-easing-ease-out);
      position: relative;
      overflow: hidden;
      box-shadow: var(--cg-elevation-2);
    }
    .toast.dismissing {
      animation: toastOut var(--cg-transition-duration-default) var(--cg-transition-easing-ease-in) forwards;
      pointer-events: none;
    }

    /* Type left-border accent */
    .toast.info    { border-left-color: var(--cg-color-status-info-text-default); }
    .toast.success { border-left-color: var(--cg-color-status-success-text-default); }
    .toast.warning { border-left-color: var(--cg-color-status-warning-text-default); }
    .toast.error   { border-left-color: var(--cg-color-status-error-text-default); }
    .toast.ai      { border-left-color: var(--cg-color-action-primary-background-default); }

    @keyframes toastIn {
      from { opacity: 0; transform: translateX(var(--cg-spacing-20)); }
      to { opacity: 1; transform: translateX(0); }
    }
    @keyframes toastOut {
      from { opacity: 1; transform: translateX(0); max-height: 200px; margin-bottom: 0; }
      to { opacity: 0; transform: translateX(var(--cg-spacing-20)); max-height: 0; margin-bottom: calc(-1 * var(--cg-spacing-8)); }
    }

    /* ── Icon ── */
    .icon {
      width: var(--cg-spacing-24);
      height: var(--cg-spacing-24);
      border-radius: var(--cg-border-radius-100);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    .toast.info .icon    { background: var(--cg-color-status-info-background-default); color: var(--cg-color-status-info-text-default); }
    .toast.success .icon { background: var(--cg-color-status-success-background-default); color: var(--cg-color-status-success-text-default); }
    .toast.warning .icon { background: var(--cg-color-status-warning-background-default); color: var(--cg-color-status-warning-text-default); }
    .toast.error .icon   { background: var(--cg-color-status-error-background-default); color: var(--cg-color-status-error-text-default); }
    .toast.ai .icon      { background: var(--cg-overlay-accent-strong); color: var(--cg-color-surface-toast-text); }

    /* ── Content ── */
    .content { flex: 1; min-width: 0; }
    .title {
      font-size: var(--cg-font-size-sm);
      font-weight: var(--cg-font-weight-bold);
      color: var(--cg-color-surface-toast-text);
      line-height: var(--cg-line-height-tight);
      margin-bottom: var(--cg-spacing-2);
    }
    .message {
      font-size: var(--cg-font-size-sm);
      color: var(--cg-color-surface-toast-text);
      line-height: var(--cg-line-height-normal);
    }
    .title + .message {
      font-size: var(--cg-font-size-xs);
      opacity: 0.85;
    }

    /* ── Dismiss ── */
    .dismiss-wrap { flex-shrink: 0; margin-top: var(--cg-spacing-1); }

    /* ── Progress bar ── */
    .progress {
      position: absolute;
      bottom: 0;
      left: 0;
      height: var(--cg-spacing-2);
      border-radius: 0 0 var(--cg-border-radius-100) var(--cg-border-radius-100);
      animation: shrink linear forwards;
    }
    .toast.info .progress    { background: var(--cg-color-status-info-text-default); }
    .toast.success .progress { background: var(--cg-color-status-success-text-default); }
    .toast.warning .progress { background: var(--cg-color-status-warning-text-default); }
    .toast.error .progress   { background: var(--cg-color-status-error-text-default); }
    .toast.ai .progress      { background: var(--cg-color-action-primary-background-default); }

    @keyframes shrink {
      from { width: 100%; }
      to { width: 0%; }
    }

    /* ── Rounded variants ── */
    :host([rounded="none"]) .toast { border-radius: 0; }
    :host([rounded="sm"]) .toast { border-radius: var(--cg-border-radius-50); }
    :host([rounded="md"]) .toast { border-radius: var(--cg-border-radius-100); }
    :host([rounded="lg"]) .toast { border-radius: var(--cg-border-radius-150); }

    @media (prefers-reduced-motion: reduce) {
      .toast { animation: none; }
      .toast.dismissing { animation: none; opacity: 0; }
    }
  `];

  @property({ reflect: true }) rounded: 'none' | 'sm' | 'md' | 'lg' = 'lg';
  @property({ type: String, reflect: true }) position: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' = 'top-right';
  @property({ type: Number }) maxQueue: number = 6;

  @state() private _toasts: Toast[] = [];
  private _counter = 0;
  private _timers: Map<string, ReturnType<typeof setTimeout>> = new Map();

  private _getIcon(type: string): unknown {
    if (type === 'info') return html`<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4m0-4h.01"/></svg>`;
    if (type === 'success') return html`<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>`;
    if (type === 'warning') return html`<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/></svg>`;
    if (type === 'error') return html`<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>`;
    if (type === 'ai') return html`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="8" width="18" height="12" rx="3"/><circle cx="9" cy="14" r="1.5"/><circle cx="15" cy="14" r="1.5"/><path d="M12 2v4M8 8V6a4 4 0 018 0v2"/></svg>`;
    return this._getIcon('info');
  }

  /** Show a toast notification. Returns the toast ID. */
  show(message: string, options?: ToastOptions | string, duration?: number): string {
    // Support legacy signature: show(message, type, duration)
    let opts: ToastOptions = {};
    if (typeof options === 'string') {
      opts = { type: options as Toast['type'], ...(duration !== undefined && { duration }) };
    } else if (options) {
      opts = options;
    }

    const id = `toast-${++this._counter}`;
    const toast: Toast = {
      id,
      message,
      title: opts.title || '',
      type: opts.type || 'info',
      duration: opts.duration ?? 5000,
      createdAt: Date.now(),
    };

    if (this._toasts.length >= this.maxQueue) {
      const oldest = this._toasts.find(t => !t.dismissing);
      if (oldest) this.dismiss(oldest.id);
    }

    this._toasts = [...this._toasts, toast];

    if (toast.duration > 0) {
      const timer = setTimeout(() => this._autoDismiss(id), toast.duration);
      this._timers.set(id, timer);
    }

    return id;
  }

  private _autoDismiss(id: string) { this._removeDismiss(id, 'auto'); }

  dismiss(id: string) { this._removeDismiss(id, 'user'); }

  private _removeDismiss(id: string, reason: 'user' | 'auto') {
    const timer = this._timers.get(id);
    if (timer) { clearTimeout(timer); this._timers.delete(id); }
    if (!this._toasts.find(t => t.id === id && !t.dismissing)) return;

    this._toasts = this._toasts.map(t => t.id === id ? { ...t, dismissing: true } : t);
    setTimeout(() => {
      this._toasts = this._toasts.filter(t => t.id !== id);
      this.dispatchEvent(new CustomEvent('ai-toast-dismiss', {
        bubbles: true, composed: true,
        detail: { id, reason },
      }));
    }, 200);
  }

  clear() {
    for (const [, timer] of this._timers) clearTimeout(timer);
    this._timers.clear();
    this._toasts = [];
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this.clear();
  }

  override render() {
    if (this._toasts.length === 0) return nothing;

    return html`
      <div class="stack" role="region" aria-label="Notifications" aria-live="polite">
        ${this._toasts.map(t => html`
          <div class="toast ${t.type} ${t.dismissing ? 'dismissing' : ''}" role="status">
            <div class="icon" aria-hidden="true">${this._getIcon(t.type)}</div>
            <div class="content">
              ${t.title ? html`<div class="title">${t.title}</div>` : nothing}
              <div class="message">${t.message}</div>
            </div>
            <span class="dismiss-wrap">
              <cg-button variant="tertiary" size="sm" rounded="full"
                label="Dismiss notification"
                @click=${() => this.dismiss(t.id)}>
                <cg-icon name="close" size="xs"></cg-icon>
              </cg-button>
            </span>
            ${t.duration > 0 ? html`
              <div class="progress" style="animation-duration: ${t.duration}ms"></div>
            ` : nothing}
          </div>
        `)}
      </div>
    `;
  }
}
