/**
 * @element ai-toast
 * Fixed-position toast notification stack with auto-dismiss progress bars,
 * slide-in/out animations, and queue management. Use the imperative API
 * to show notifications: `show(message, type, duration)`.
 *
 * @example
 * ```html
 * <ai-toast position="top-right"></ai-toast>
 * <script>
 *   document.querySelector('ai-toast').show('Model updated successfully', 'success', 4000);
 * </script>
 * ```
 *
 * @prop {'top-right'|'top-left'|'bottom-right'|'bottom-left'} position - Screen position
 *
 * @method show(message: string, type?: string, duration?: number): string - Show a toast, returns its ID
 * @method dismiss(id: string) - Dismiss a specific toast
 * @method clear() - Remove all toasts
 *
 * @fires {CustomEvent<{id: string, reason: string}>} ai-toast-dismiss - When a toast is dismissed
 */
import { LitElement, html, css, nothing } from 'lit';
import { state, customElement, property } from 'lit/decorators.js';
import { hostBlock, reducedMotion } from '../../styles/index.js';

interface Toast {
  id: string;
  message: string;
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
      z-index: 9999;
      pointer-events: none;
    }
    :host([position="top-right"]), :host(:not([position])) { top: 16px; right: 16px; }
    :host([position="top-left"]) { top: 16px; left: 16px; }
    :host([position="bottom-right"]) { bottom: 16px; right: 16px; }
    :host([position="bottom-left"]) { bottom: 16px; left: 16px; }

    .stack {
      display: flex;
      flex-direction: column;
      gap: var(--cg-spacing-8, 8px);
      max-width: 380px;
      min-width: 280px;
    }

    .toast {
      display: flex;
      align-items: flex-start;
      gap: var(--cg-spacing-10, 10px);
      padding: var(--cg-spacing-12, 12px) var(--cg-spacing-14, 14px);
      border-radius: var(--cg-border-radius-100, 10px);
      background: var(--cg-color-surface-container-background, #18181b);
      border: 1px solid var(--cg-color-surface-container-border, #27272a);
      box-shadow: var(--cg-elevation-2, 0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -2px rgba(0, 0, 0, 0.2)), inset 0 1px 0 0 rgba(255, 255, 255, 0.05);
      background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0.03), transparent);
      pointer-events: auto;
      animation: slideIn 250ms ease;
      position: relative;
      overflow: hidden;
    }
    .toast.dismissing { animation: slideOut 200ms ease forwards; }

    @keyframes slideIn {
      from { opacity: 0; transform: translateX(20px); }
      to { opacity: 1; transform: translateX(0); }
    }
    @keyframes slideOut {
      from { opacity: 1; transform: translateX(0); }
      to { opacity: 0; transform: translateX(20px); }
    }

    /* Type icon */
    .icon {
      width: 20px;
      height: 20px;
      border-radius: 6px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 11px;
      font-weight: 800;
      flex-shrink: 0;
    }
    .toast.info .icon { background: rgba(59, 130, 246, 0.15); color: #60a5fa; }
    .toast.success .icon { background: rgba(34, 197, 94, 0.15); color: #4ade80; }
    .toast.warning .icon { background: rgba(245, 158, 11, 0.15); color: #fbbf24; }
    .toast.error .icon { background: rgba(239, 68, 68, 0.15); color: #f87171; }
    .toast.ai .icon { background: rgba(223, 255, 97, 0.15); color: #dfff61; }

    .content { flex: 1; min-width: 0; }
    .message {
      font-size: var(--cg-font-size-sm, 14px);
      color: var(--cg-color-surface-base-text, #fafafa);
      line-height: 1.4;
    }

    .dismiss {
      background: none;
      border: none;
      color: var(--cg-gray-500, #71717a);
      cursor: pointer;
      padding: 0;
      font-size: 14px;
      line-height: 1;
      flex-shrink: 0;
      transition: color 150ms;
    }
    .dismiss:hover { color: var(--cg-color-surface-base-text, #fafafa); }

    /* Progress bar */
    .progress {
      position: absolute;
      bottom: 0;
      left: 0;
      height: 2px;
      border-radius: 0 0 10px 10px;
      animation: shrink linear forwards;
    }
    .toast.info .progress { background: #60a5fa; }
    .toast.success .progress { background: #4ade80; }
    .toast.warning .progress { background: #fbbf24; }
    .toast.error .progress { background: #f87171; }
    .toast.ai .progress { background: #dfff61; }

    @keyframes shrink {
      from { width: 100%; }
      to { width: 0%; }
    }

    :focus-visible {
      outline: none;
      box-shadow: 0 0 0 2px var(--cg-color-surface-base-background, #09090b), 0 0 0 4px var(--cg-brand-ai-accent, #dfff61);
    }

    /* ── Rounded variants ── */
    :host([rounded="none"]) .toast { border-radius: 0; }
    :host([rounded="sm"]) .toast { border-radius: var(--cg-border-radius-50, 4px); }
    :host([rounded="md"]) .toast { border-radius: var(--cg-border-radius-100, 8px); }
    :host([rounded="lg"]) .toast { border-radius: var(--cg-border-radius-150, 12px); }
    :host([rounded="full"]) .toast { border-radius: var(--cg-border-radius-full, 99999px); }
  `];

  @property({ reflect: true }) rounded: 'none' | 'sm' | 'md' | 'lg' | 'full' = 'lg';
  /** Position on screen */
  @property({ type: String, reflect: true }) position: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' = 'top-right';

  @state() private _toasts: Toast[] = [];
  private _counter = 0;
  private _timers: Map<string, ReturnType<typeof setTimeout>> = new Map();

  private _getIcon(type: string): unknown {
    if (type === 'info') return html`<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4m0-4h.01"/></svg>`;
    if (type === 'success') return html`<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>`;
    if (type === 'warning') return html`<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/></svg>`;
    if (type === 'error') return html`<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>`;
    if (type === 'ai') return html`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="8" width="18" height="12" rx="3"/><circle cx="9" cy="14" r="1.5"/><circle cx="15" cy="14" r="1.5"/><path d="M12 2v4M8 8V6a4 4 0 018 0v2"/></svg>`;
    return html`<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4m0-4h.01"/></svg>`;
  }

  private _maxQueue = 8;

  /** Show a toast notification */
  show(message: string, type: Toast['type'] = 'info', duration: number = 5000): string {
    const id = `toast-${++this._counter}`;
    const toast: Toast = { id, message, type, duration, createdAt: Date.now() };

    // Cap queue — dismiss oldest if at max
    if (this._toasts.length >= this._maxQueue) {
      const oldest = this._toasts.find(t => !t.dismissing);
      if (oldest) this.dismiss(oldest.id);
    }

    this._toasts = [...this._toasts, toast];

    if (duration > 0) {
      const timer = setTimeout(() => this._autoDismiss(id), duration);
      this._timers.set(id, timer);
    }

    return id;
  }

  /** Auto-dismiss (from timeout) — distinguished from user dismiss */
  private _autoDismiss(id: string) {
    this._removeDismiss(id, 'auto');
  }

  /** Dismiss a specific toast (user action) */
  dismiss(id: string) {
    this._removeDismiss(id, 'user');
  }

  private _removeDismiss(id: string, reason: 'user' | 'auto') {
    const timer = this._timers.get(id);
    if (timer) { clearTimeout(timer); this._timers.delete(id); }

    // Don't dismiss if already dismissing
    if (!this._toasts.find(t => t.id === id && !t.dismissing)) return;

    // Animate out
    this._toasts = this._toasts.map(t => t.id === id ? { ...t, dismissing: true } : t);
    setTimeout(() => {
      this._toasts = this._toasts.filter(t => t.id !== id);
      this.dispatchEvent(new CustomEvent('ai-toast-dismiss', {
        bubbles: true, composed: true,
        detail: { id, reason },
      }));
    }, 200);
  }

  /** Clear all toasts */
  clear() {
    for (const [id, timer] of this._timers) clearTimeout(timer);
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
      <div class="stack" role="region" aria-label="Notifications" aria-live="assertive">
        ${this._toasts.map(t => html`
          <div class="toast ${t.type} ${t.dismissing ? 'dismissing' : ''}" role="alert" aria-live="${t.type === 'error' ? 'assertive' : 'polite'}">
            <div class="icon" aria-hidden="true">${this._getIcon(t.type)}</div>
            <div class="content">
              <div class="message">${t.message}</div>
            </div>
            <button class="dismiss" @click=${() => this.dismiss(t.id)} aria-label="Dismiss notification"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg></button>
            ${t.duration > 0 ? html`
              <div class="progress" style="animation-duration: ${t.duration}ms"></div>
            ` : nothing}
          </div>
        `)}
      </div>
    `;
  }
}
