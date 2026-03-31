import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

/**
 * @element cg-modal
 * Modal dialog with backdrop blur, scale animation, focus trap, and scroll lock.
 *
 * @example
 * ```html
 * <cg-modal title="Confirm" open size="sm">
 *   <p>Are you sure?</p>
 *   <div slot="footer"><cg-button>OK</cg-button></div>
 * </cg-modal>
 * ```
 *
 * @slot - Default slot for modal body content
 * @slot footer - Action buttons area below the body
 *
 * @fires {CustomEvent} cg-modal-open - When the modal opens
 * @fires {CustomEvent} cg-modal-close - When the modal closes
 *
 * @cssprop [--cg-color-surface-raised-background=#1e1e22] - Modal background
 * @cssprop [--cg-border-radius-200=16px] - Modal border radius
 * @cssprop [--cg-motion-easing-bounce=cubic-bezier(0.34,1.56,0.64,1)] - Open animation
 * @cssprop [--cg-brand-ai-accent=#dfff61] - Close button focus ring
 */
@customElement('cg-modal')
export class CgModal extends LitElement {
  static override styles = css`
    :host {
      transition: color var(--cg-motion-duration-fast, 80ms) var(--cg-motion-easing-color, cubic-bezier(0, 0, 0.58, 1));
      display: contents;
      font-family: var(--cg-font-family-primary, 'Inter Variable', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif);
    }

    .backdrop {
      position: fixed;
      inset: 0;
      z-index: 9998;
      background: rgba(0, 0, 0, 0.6);
      backdrop-filter: blur(4px);
      -webkit-backdrop-filter: blur(4px);
      opacity: 0;
      pointer-events: none;
      transition: opacity var(--cg-motion-duration-slow, 200ms) var(--cg-motion-easing-default, cubic-bezier(0.4, 0, 0.2, 1));
    }

    :host([open]) .backdrop {
      opacity: 1;
      pointer-events: auto;
    }

    .modal-container {
      position: fixed;
      inset: 0;
      z-index: 9999;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: var(--cg-spacing-16, 16px);
      pointer-events: none;
    }

    :host([open]) .modal-container {
      pointer-events: auto;
    }

    .modal {
      position: relative;
      display: flex;
      flex-direction: column;
      max-height: calc(100vh - 64px);
      background: var(--cg-color-surface-raised-background, #1e1e22);
      border: 1px solid var(--cg-color-surface-base-border, #27272a);
      border-radius: var(--cg-border-radius-200, 16px);
      box-shadow:
        0 20px 25px -5px rgba(0, 0, 0, 0.4),
        0 8px 10px -6px rgba(0, 0, 0, 0.3);
      overflow: hidden;

      /* Animation */
      opacity: 0;
      transform: scale(0.95);
      transition:
        opacity var(--cg-motion-duration-slow, 200ms) var(--cg-motion-easing-default, cubic-bezier(0.4, 0, 0.2, 1)),
        transform 250ms var(--cg-motion-easing-bounce, cubic-bezier(0.34, 1.56, 0.64, 1));
    }

    :host([open]) .modal {
      opacity: 1;
      transform: scale(1);
    }

    /* ── Closing animation ── */
    @keyframes modal-exit {
      from { opacity: 1; transform: scale(1); }
      to { opacity: 0; transform: scale(0.95); }
    }
    @keyframes backdrop-exit {
      from { opacity: 1; }
      to { opacity: 0; }
    }
    .modal.closing {
      animation: modal-exit 150ms var(--cg-motion-easing-exit, cubic-bezier(0.4, 0, 1, 1)) forwards;
    }
    .backdrop.closing {
      pointer-events: auto;
      animation: backdrop-exit 150ms var(--cg-motion-easing-exit, cubic-bezier(0.4, 0, 1, 1)) forwards;
    }

    @media (prefers-reduced-motion: reduce) {
      .backdrop,
      .modal {
        transition: opacity 100ms ease;
      }
      .modal {
        transform: scale(1) !important;
      }
    }

    /* ── Sizes ── */
    :host([size="sm"]) .modal { width: 400px; max-width: 100%; }
    :host([size="md"]) .modal { width: 560px; max-width: 100%; }
    :host([size="lg"]) .modal { width: 720px; max-width: 100%; }
    :host([size="xl"]) .modal { width: 960px; max-width: 100%; }

    /* ── Header ── */
    .modal-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: var(--cg-spacing-16, 16px) var(--cg-spacing-24, 24px);
      border-bottom: 1px solid var(--cg-color-surface-base-border, #27272a);
      flex-shrink: 0;
    }

    .modal-title {
      font-size: var(--cg-font-size-lg, 18px);
      font-weight: var(--cg-font-weight-semibold, 600);
      color: var(--cg-color-text-primary, #fafafa);
      margin: 0;
      line-height: 1.3;
    }

    .close-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      border: none;
      border-radius: var(--cg-border-radius-100, 8px);
      background: transparent;
      color: var(--cg-color-text-secondary, #a1a1aa);
      cursor: pointer;
      font-size: 18px;
      line-height: 1;
      padding: 0;
      flex-shrink: 0;
      transition:
        background-color var(--cg-motion-duration-fast, 80ms) var(--cg-motion-easing-color, cubic-bezier(0, 0, 0.58, 1)),
        color var(--cg-motion-duration-fast, 80ms) var(--cg-motion-easing-color, cubic-bezier(0, 0, 0.58, 1)),
        transform var(--cg-motion-duration-slow, 250ms) var(--cg-motion-easing-default, cubic-bezier(0.4, 0, 0.2, 1));
    }

    .close-btn:hover {
      background: var(--cg-color-surface-hover-background, rgba(255, 255, 255, 0.06));
      color: var(--cg-color-text-primary, #fafafa);
    }

    .close-btn:active {
      transform: scale(var(--cg-interaction-press-scale, 0.97));
    }

    .close-btn:focus-visible {
      box-shadow:
        0 0 0 2px var(--cg-color-surface-base-background, #09090b),
        0 0 0 4px var(--cg-brand-ai-accent, #dfff61);
      outline: none;
    }

    /* ── Body ── */
    .modal-body {
      padding: var(--cg-spacing-24, 24px);
      overflow-y: auto;
      flex: 1;
      color: var(--cg-color-text-secondary, #a1a1aa);
      font-size: var(--cg-font-size-sm, 14px);
      line-height: 1.6;
    }

    /* ── Footer ── */
    .modal-footer {
      padding: var(--cg-spacing-16, 16px) var(--cg-spacing-24, 24px);
      border-top: 1px solid var(--cg-color-surface-base-border, #27272a);
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: var(--cg-spacing-8, 8px);
      flex-shrink: 0;
    }

    .modal-footer:empty,
    .modal-footer ::slotted(:empty) {
      display: none;
    }

    /* Hidden state for footer slot check */
    .footer-wrapper {
      display: contents;
    }
  `;

  @property({ type: Boolean, reflect: true }) open = false;
  @property({ type: String }) override title = '';
  @property({ type: String, reflect: true }) size: 'sm' | 'md' | 'lg' | 'xl' = 'md';
  @property({ type: Boolean }) closable = true;
  @property({ type: Boolean }) persistent = false;

  @state() private _hasFooter = false;
  @state() private _closing = false;

  private _previousOverflow = '';
  private _focusableElements: HTMLElement[] = [];
  private _previousFocus: HTMLElement | null = null;

  override disconnectedCallback() {
    super.disconnectedCallback();
    // Always restore body scroll if destroyed while open
    if (this.open) {
      document.body.style.overflow = this._previousOverflow || '';
    }
    this._focusableElements = [];
  }

  override updated(changed: Map<string, unknown>) {
    if (changed.has('open')) {
      if (this.open) {
        this._onOpen();
      } else {
        if (changed.get('open') === true) {
          this._closing = true;
          setTimeout(() => { this._closing = false; }, 150);
        }
        this._onClose();
      }
    }
  }

  private _onOpen() {
    this._previousFocus = document.activeElement as HTMLElement;
    this._previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    this.dispatchEvent(new CustomEvent('cg-modal-open', { bubbles: true, composed: true }));

    // Focus first focusable element
    this.updateComplete.then(() => {
      this._updateFocusableElements();
      if (this._focusableElements.length > 0) {
        this._focusableElements[0]!.focus();
      } else {
        const modal = this.shadowRoot?.querySelector('.modal') as HTMLElement;
        modal?.focus();
      }
    });
  }

  private _onClose() {
    document.body.style.overflow = this._previousOverflow;
    this.dispatchEvent(new CustomEvent('cg-modal-close', { bubbles: true, composed: true }));

    if (this._previousFocus) {
      this._previousFocus.focus();
      this._previousFocus = null;
    }
  }

  private _updateFocusableElements() {
    const root = this.shadowRoot;
    if (!root) return;
    const selectors = 'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
    this._focusableElements = [...root.querySelectorAll<HTMLElement>(selectors)];
  }

  private _handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape' && this.closable) {
      e.preventDefault();
      this._requestClose();
      return;
    }

    if (e.key === 'Tab') {
      this._updateFocusableElements();
      const focusable = this._focusableElements;
      if (focusable.length === 0) {
        e.preventDefault();
        return;
      }

      const first = focusable[0]!;
      const last = focusable[focusable.length - 1]!;

      if (e.shiftKey) {
        if (document.activeElement === first || this.shadowRoot?.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last || this.shadowRoot?.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
  }

  private _handleBackdropClick() {
    if (!this.persistent && this.closable) {
      this._requestClose();
    }
  }

  private _requestClose() {
    this.open = false;
  }

  private _handleFooterSlotChange(e: Event) {
    const slot = e.target as HTMLSlotElement;
    this._hasFooter = slot.assignedNodes({ flatten: true }).length > 0;
  }

  override render() {
    return html`
      <div
        class="backdrop ${this._closing ? 'closing' : ''}"
        @click="${this._handleBackdropClick}"
        aria-hidden="true"
      ></div>
      <div
        class="modal-container"
        @keydown="${this._handleKeydown}"
      >
        <div
          class="modal ${this._closing ? 'closing' : ''}"
          role="dialog"
          aria-modal="true"
          aria-label="${this.title || 'Dialog'}"
          tabindex="-1"
        >
          ${this.title || this.closable ? html`
            <div class="modal-header">
              <h2 class="modal-title">${this.title}</h2>
              ${this.closable ? html`
                <button
                  class="close-btn"
                  aria-label="Close dialog"
                  @click="${this._requestClose}"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                  </svg>
                </button>
              ` : nothing}
            </div>
          ` : nothing}

          <div class="modal-body">
            <slot></slot>
          </div>

          <div class="modal-footer" style="${this._hasFooter ? '' : 'display:none'}">
            <slot name="footer" @slotchange="${this._handleFooterSlotChange}"></slot>
          </div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cg-modal': CgModal;
  }
}
