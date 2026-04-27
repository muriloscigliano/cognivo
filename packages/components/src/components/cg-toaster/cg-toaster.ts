import { LitElement, html, css, nothing } from 'lit';
import { svg } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { reducedMotion } from '../../styles/index.js';

export type ToastVariant = 'default' | 'success' | 'warning' | 'error' | 'info' | 'ai';

export interface ToastOptions {
  title: string;
  description?: string;
  variant?: ToastVariant;
  duration?: number;
  action?: { label: string; id?: string };
}

interface ToastEntry extends ToastOptions {
  id: string;
  timer: number | null;
}

/**
 * @element cg-toaster
 * Manages a stack of auto-dismissing toast notifications.
 *
 * @fires {CustomEvent<{id:string}>} cg-toaster-dismiss
 * @fires {CustomEvent<{id:string,actionId?:string}>} cg-toaster-action
 */
@customElement('cg-toaster')
export class CgToaster extends LitElement {
  static override styles = [reducedMotion, css`
    :host {
      position: fixed;
      z-index: var(--cg-z-index-top);
      pointer-events: none;
      display: flex;
      flex-direction: column;
      gap: var(--cg-component-toaster-gap);
      padding: var(--cg-component-toaster-region-padding);
      font-family: var(--cg-font-family-primary);
      max-width: min(var(--cg-component-toaster-max-width), calc(100vw - var(--cg-spacing-32)));
    }
    :host([position="top-right"]) { top: 0; right: 0; }
    :host([position="top-left"]) { top: 0; left: 0; }
    :host([position="bottom-right"]) { bottom: 0; right: 0; }
    :host([position="bottom-left"]) { bottom: 0; left: 0; }
    :host([position="top-center"]) { top: 0; left: 50%; transform: translateX(-50%); }
    :host([position="bottom-center"]) { bottom: 0; left: 50%; transform: translateX(-50%); }

    .toast {
      pointer-events: auto;
      display: flex;
      align-items: flex-start;
      gap: var(--cg-spacing-12);
      min-width: var(--cg-component-toaster-min-width);
      padding: var(--cg-spacing-16) var(--cg-spacing-16);
      background: var(--cg-color-modal-container-background);
      border: var(--cg-border-width-50) solid var(--cg-color-modal-container-border);
      border-radius: var(--cg-border-radius-150);
      color: var(--cg-color-surface-container-text);
      box-shadow: var(--cg-shadow-elevation-lg);
      animation: toast-in var(--cg-transition-duration-default) var(--cg-transition-easing-ease-out);
      transform-origin: center;
      transition: transform var(--cg-transition-duration-default) var(--cg-transition-easing-default);
    }
    /* Stack effect: non-last toasts scale down subtly */
    .toast:not(:last-child) {
      transform: scale(0.98);
      opacity: 0.9;
    }
    :host([position^="top"]) .toast {
      animation-name: toast-in-top;
    }
    @keyframes toast-in {
      from { opacity: 0; transform: translateY(var(--cg-spacing-16)) scale(0.96); }
      to { opacity: 1; transform: translateY(0) scale(1); }
    }
    @keyframes toast-in-top {
      from { opacity: 0; transform: translateY(calc(-1 * var(--cg-spacing-16))) scale(0.96); }
      to { opacity: 1; transform: translateY(0) scale(1); }
    }

    .toast.success { border-color: var(--cg-color-status-success-border-default); }
    .toast.warning { border-color: var(--cg-color-status-warning-border-default); }
    .toast.error { border-color: var(--cg-color-status-error-border-default); }
    .toast.info { border-color: var(--cg-color-status-info-border-default); }
    .toast.ai {
      border-left: var(--cg-border-width-200) solid var(--cg-color-action-primary-background-default);
    }

    /* Status icon — colored per variant to match the border + give the toast
       a glanceable status indicator (success, warning, error, info, ai). */
    .toast-icon {
      flex-shrink: 0;
      width: var(--cg-spacing-16);
      height: var(--cg-spacing-16);
      margin-top: var(--cg-spacing-2);
    }
    .toast.success .toast-icon { color: var(--cg-color-status-success-text-default); }
    .toast.warning .toast-icon { color: var(--cg-color-status-warning-text-default); }
    .toast.error .toast-icon { color: var(--cg-color-status-error-text-default); }
    .toast.info .toast-icon { color: var(--cg-color-status-info-text-default); }
    .toast.ai .toast-icon { color: var(--cg-color-action-primary-background-default); }

    .toast-body {
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;
      gap: var(--cg-spacing-4);
    }
    .toast-title {
      font-size: var(--cg-font-size-sm);
      font-weight: var(--cg-font-weight-semibold);
    }
    .toast-desc {
      font-size: var(--cg-font-size-xs);
      color: var(--cg-color-surface-container-outlined);
    }

    .toast-action, .toast-close {
      background: transparent;
      border: none;
      color: inherit;
      font: inherit;
      font-size: var(--cg-font-size-xs);
      font-weight: var(--cg-font-weight-medium);
      padding: var(--cg-spacing-6) var(--cg-spacing-10);
      border-radius: var(--cg-border-radius-50);
      cursor: pointer;
      transition: background-color var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
    }
    .toast-action:hover, .toast-close:hover {
      background: var(--cg-color-action-tertiary-background-hover);
    }
    .toast-close {
      color: var(--cg-color-surface-container-outlined);
    }
  `];

  @property({ reflect: true }) position: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center' = 'bottom-right';
  @property({ type: Number }) max = 5;

  @state() private _toasts: ToastEntry[] = [];

  public show(opts: ToastOptions): string {
    const id = `t_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
    const duration = opts.duration ?? 5000;
    const entry: ToastEntry = { ...opts, id, timer: null };
    let next = [...this._toasts, entry];
    if (next.length > this.max) {
      // Clear timers for dropped toasts so they don't leak.
      const dropped = next.slice(0, next.length - this.max);
      for (const t of dropped) if (t.timer) clearTimeout(t.timer);
      next = next.slice(next.length - this.max);
    }
    this._toasts = next;
    if (duration > 0) {
      entry.timer = window.setTimeout(() => this.dismiss(id), duration);
    }
    return id;
  }

  public dismiss(id: string): void {
    const toast = this._toasts.find(t => t.id === id);
    if (toast?.timer) clearTimeout(toast.timer);
    this._toasts = this._toasts.filter(t => t.id !== id);
    this.dispatchEvent(new CustomEvent('cg-toaster-dismiss', {
      bubbles: true, composed: true, detail: { id },
    }));
  }

  public clear(): void {
    for (const t of this._toasts) if (t.timer) clearTimeout(t.timer);
    this._toasts = [];
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    for (const t of this._toasts) if (t.timer) clearTimeout(t.timer);
  }

  private _handleAction(toast: ToastEntry): void {
    this.dispatchEvent(new CustomEvent('cg-toaster-action', {
      bubbles: true, composed: true,
      detail: { id: toast.id, actionId: toast.action?.id },
    }));
    this.dismiss(toast.id);
  }

  /**
   * Per-variant icon paths. `default` gets no icon (renders without one).
   * `ai` keeps its sparkle (uses `fill` instead of `stroke`).
   * info/success/warning/error use the same paths as cg-callout for visual
   * consistency across the design system.
   */
  private _iconFor(variant: ToastVariant | undefined) {
    switch (variant) {
      case 'success':
        return svg`<path d="M12 2a10 10 0 100 20 10 10 0 000-20zm-2 10l2 2 4-4" />`;
      case 'warning':
        return svg`<path d="M12 2L2 22h20L12 2zm0 7v4m0 4h.01" />`;
      case 'error':
        return svg`<path d="M12 2a10 10 0 100 20 10 10 0 000-20zm-1 5h2v6h-2zm0 8h2v2h-2z" />`;
      case 'info':
        return svg`<path d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 5a1 1 0 011 1v4a1 1 0 01-2 0V8a1 1 0 011-1zm0 8a1 1 0 110 2 1 1 0 010-2z" />`;
      case 'ai':
        return svg`<path d="M12 2l2.09 6.26L20 10l-5.91 1.74L12 18l-2.09-6.26L4 10l5.91-1.74L12 2z" />`;
      default:
        return null;
    }
  }

  override render() {
    return html`
      <div role="region" aria-live="polite" aria-label="Notifications" style="display: contents;">
        ${this._toasts.map(toast => {
          const iconPath = this._iconFor(toast.variant);
          // `ai` is the only variant using fill; the rest use stroke.
          const useFill = toast.variant === 'ai';
          return html`
          <div class="toast ${toast.variant ?? 'default'}" role="status">
            ${iconPath ? html`
              <svg
                class="toast-icon"
                viewBox="0 0 24 24"
                fill=${useFill ? 'currentColor' : 'none'}
                stroke=${useFill ? 'none' : 'currentColor'}
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
              >${iconPath}</svg>
            ` : nothing}
            <div class="toast-body">
              <div class="toast-title">${toast.title}</div>
              ${toast.description ? html`<div class="toast-desc">${toast.description}</div>` : nothing}
            </div>
            ${toast.action ? html`
              <button class="toast-action" @click=${() => this._handleAction(toast)}>${toast.action.label}</button>
            ` : nothing}
            <button class="toast-close" aria-label="Dismiss" @click=${() => this.dismiss(toast.id)}>×</button>
          </div>
        `;
        })}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cg-toaster': CgToaster;
  }
}
