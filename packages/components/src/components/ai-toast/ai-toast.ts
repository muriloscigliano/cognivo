/**
 * <ai-toast> — Notification Queue
 *
 * Floating toast notifications with auto-dismiss, progress bar, stacking.
 * API: show(message, type, duration), dismiss(id), clear().
 */
import { LitElement, html, css, nothing } from 'lit';
import { state, customElement, property } from 'lit/decorators.js';

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
  static override styles = css`
    :host {
      display: block;
      position: fixed;
      z-index: 9999;
      pointer-events: none;
      font-family: var(--cg-font-family-primary, 'Inter Variable', 'Inter', -apple-system, sans-serif);
    }
    :host([position="top-right"]), :host(:not([position])) { top: 16px; right: 16px; }
    :host([position="top-left"]) { top: 16px; left: 16px; }
    :host([position="bottom-right"]) { bottom: 16px; right: 16px; }
    :host([position="bottom-left"]) { bottom: 16px; left: 16px; }

    .stack {
      display: flex;
      flex-direction: column;
      gap: 8px;
      max-width: 380px;
      min-width: 280px;
    }

    .toast {
      display: flex;
      align-items: flex-start;
      gap: 10px;
      padding: 12px 14px;
      border-radius: 10px;
      background: var(--cg-color-surface-container-background, #18181b);
      border: 1px solid var(--cg-color-surface-container-border, #27272a);
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
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
      font-size: 13px;
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

    @media (prefers-reduced-motion: reduce) {
      .toast { animation: none; }
      .toast.dismissing { animation: none; opacity: 0; }
      .progress { animation: none; width: 0; }
    }
  `;

  /** Position on screen */
  @property({ type: String, reflect: true }) position: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' = 'top-right';

  @state() private _toasts: Toast[] = [];
  private _counter = 0;
  private _timers: Map<string, ReturnType<typeof setTimeout>> = new Map();

  private _getIcon(type: string): string {
    const icons: Record<string, string> = {
      info: 'ℹ', success: '✓', warning: '!', error: '✕', ai: 'AI',
    };
    return icons[type] || 'ℹ';
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
            <button class="dismiss" @click=${() => this.dismiss(t.id)} aria-label="Dismiss notification">✕</button>
            ${t.duration > 0 ? html`
              <div class="progress" style="animation-duration: ${t.duration}ms"></div>
            ` : nothing}
          </div>
        `)}
      </div>
    `;
  }
}
