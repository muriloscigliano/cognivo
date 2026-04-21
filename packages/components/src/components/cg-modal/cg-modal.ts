import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { spinKeyframes, reducedMotion } from '../../styles/index.js';

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
 * @slot icon - Icon displayed above the title
 * @slot footer - Action buttons area below the body
 *
 * @fires {CustomEvent} cg-modal-open - When the modal opens
 * @fires {CustomEvent} cg-modal-close - When the modal closes
 *
 * @cssprop --cg-color-modal-container-background - Modal background
 * @cssprop --cg-component-modal-radius - Modal border radius
 * @cssprop --cg-transition-easing-ease-out - Open animation easing
 * @cssprop --cg-color-focus-ring - Close button focus ring
 */
@customElement('cg-modal')
export class CgModal extends LitElement {
  static override styles = [spinKeyframes, reducedMotion, css`
    :host {
      transition: color var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
      display: contents;
      font-family: var(--cg-font-family-primary);
    }

    .backdrop {
      position: fixed;
      inset: 0;
      z-index: var(--cg-z-index-500);
      background: var(--cg-color-modal-overlay-background);
      backdrop-filter: blur(16px) saturate(150%);
      -webkit-backdrop-filter: blur(16px) saturate(150%);
      opacity: 0;
      pointer-events: none;
      transition: opacity var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
    }

    :host([open]) .backdrop {
      opacity: 1;
      pointer-events: auto;
    }

    .modal-container {
      position: fixed;
      inset: 0;
      z-index: var(--cg-z-index-top);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: var(--cg-spacing-16);
      pointer-events: none;
    }

    :host([open]) .modal-container {
      pointer-events: auto;
    }

    .modal {
      position: relative;
      isolation: isolate;
      display: flex;
      flex-direction: column;
      max-height: calc(100vh - var(--cg-spacing-48) * 2);
      background: var(--cg-color-modal-container-background);
      border: var(--cg-border-width-50) solid var(--cg-color-modal-container-border);
      border-radius: var(--cg-component-modal-radius);
      box-shadow: var(--cg-elevation-4);
      overflow: hidden;

      /* Animation */
      opacity: 0;
      transform: scale(0.95);
      transition:
        opacity var(--cg-transition-duration-fast) var(--cg-transition-easing-default),
        transform var(--cg-transition-duration-slow) var(--cg-transition-easing-ease-out);
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
      animation: modal-exit var(--cg-transition-duration-fast) var(--cg-transition-easing-ease-in) forwards;
    }
    .backdrop.closing {
      pointer-events: auto;
      animation: backdrop-exit var(--cg-transition-duration-fast) var(--cg-transition-easing-ease-in) forwards;
    }

    @media (prefers-reduced-motion: reduce) {
      .backdrop,
      .modal {
        transition: opacity var(--cg-transition-duration-fast) ease;
      }
      .modal {
        transform: scale(1) !important;
      }
    }

    /* ── Sizes ── */
    :host([size="sm"]) .modal { width: var(--cg-component-modal-width-sm); max-width: 100%; }
    :host([size="md"]) .modal { width: var(--cg-component-modal-width-md); max-width: 100%; }
    :host([size="lg"]) .modal { width: var(--cg-component-modal-width-lg); max-width: 100%; }
    :host([size="xl"]) .modal { width: var(--cg-component-modal-width-xl); max-width: 100%; }

    /* ── Header ── */
    .modal-header {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      padding: var(--cg-spacing-24) var(--cg-spacing-24) var(--cg-spacing-4);
      flex-shrink: 0;
    }

    .modal-header-content {
      display: flex;
      flex-direction: column;
      gap: var(--cg-spacing-12);
      flex: 1;
      min-width: 0;
    }

    .modal-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: var(--cg-spacing-40);
      height: var(--cg-spacing-40);
      border-radius: var(--cg-border-radius-100);
      background: var(--cg-color-action-tertiary-background-hover);
      color: var(--cg-color-action-primary-background-default);
      font-size: var(--cg-icon-size-200);
    }

    .modal-title {
      font-size: var(--cg-font-size-md);
      font-weight: var(--cg-font-weight-semibold);
      color: var(--cg-color-modal-header-text);
      margin: 0;
      line-height: var(--cg-line-height-snug);
    }

    /* When no icon — align title with close button */
    .modal-header-content:not(:has(.modal-icon)) .modal-title {
      padding-top: var(--cg-spacing-4);
    }

    .close-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: var(--cg-spacing-32);
      height: var(--cg-spacing-32);
      border: none;
      border-radius: var(--cg-border-radius-full);
      background: var(--cg-color-action-tertiary-background-hover);
      color: var(--cg-color-surface-container-outlined);
      cursor: pointer;
      font-size: var(--cg-font-size-sm);
      line-height: 1;
      padding: 0;
      flex-shrink: 0;
      transition:
        background-color var(--cg-transition-duration-fast) var(--cg-transition-easing-default),
        color var(--cg-transition-duration-fast) var(--cg-transition-easing-default),
        transform var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
    }

    .close-btn:hover {
      background: var(--cg-color-action-secondary-background-hover);
      color: var(--cg-color-surface-container-text);
    }

    .close-btn:active {
      transform: scale(var(--cg-interaction-press-scale));
    }

    .close-btn:focus-visible {
      box-shadow:
        0 0 0 2px var(--cg-color-focus-ring-offset),
        0 0 0 calc(2px + 2px) var(--cg-color-focus-ring);
      outline: none;
    }

    /* ── Body ── */
    .modal-body {
      position: relative;
      padding: var(--cg-spacing-16) var(--cg-spacing-24) var(--cg-spacing-24);
      overflow-y: auto;
      flex: 1;
      color: var(--cg-color-surface-container-outlined);
      font-size: var(--cg-font-size-sm);
      line-height: var(--cg-line-height-relaxed);
    }

    /* ── Footer ── */
    .modal-footer {
      padding: var(--cg-spacing-12) var(--cg-spacing-24) var(--cg-spacing-24);
      flex-shrink: 0;
    }

    .modal-footer ::slotted(*) {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: var(--cg-spacing-12);
    }

    .modal-footer:empty,
    .modal-footer ::slotted(:empty) {
      display: none;
    }

    /* Hidden state for footer slot check */
    .footer-wrapper {
      display: contents;
    }

    /* Rounded variants */
    :host([rounded="none"]) .modal { border-radius: 0; }
    :host([rounded="sm"]) .modal { border-radius: var(--cg-border-radius-100); }
    :host([rounded="md"]) .modal { border-radius: var(--cg-border-radius-150); }
    :host([rounded="lg"]) .modal { border-radius: var(--cg-component-modal-radius); }
    :host([rounded="full"]) .modal { border-radius: var(--cg-border-radius-full); }

    /* ── Loading overlay ── */
    .modal-loading-overlay {
      position: absolute;
      inset: 0;
      z-index: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: var(--cg-spacing-12);
      background: var(--cg-color-modal-container-background);
      border-radius: inherit;
    }
    .modal-spinner {
      width: var(--cg-spacing-24);
      height: var(--cg-spacing-24);
      border: var(--cg-border-width-100) solid var(--cg-color-surface-base-border);
      border-top-color: var(--cg-color-surface-container-text);
      border-radius: var(--cg-border-radius-full);
      animation: spin var(--cg-transition-duration-slow) linear infinite;
    }
    .modal-loading-text {
      font-size: var(--cg-font-size-sm);
      color: var(--cg-color-surface-container-outlined);
    }

    /* ── Error banner ── */
    .modal-error-banner {
      display: flex;
      align-items: center;
      gap: var(--cg-spacing-8);
      padding: var(--cg-spacing-12) var(--cg-spacing-16);
      margin: 0 var(--cg-spacing-24);
      margin-top: var(--cg-spacing-16);
      background: var(--cg-color-status-error-background-default);
      border: var(--cg-border-width-50) solid var(--cg-color-status-error-border-default);
      border-radius: var(--cg-border-radius-100);
      color: var(--cg-color-status-error-text-default);
      font-size: var(--cg-font-size-sm);
      line-height: var(--cg-line-height-snug);
    }
    .modal-error-icon {
      flex-shrink: 0;
      font-size: var(--cg-font-size-md);
    }
  `];

  @property({ type: Boolean, reflect: true }) open = false;
  @property({ type: String }) override title = '';
  @property({ type: String }) icon = '';
  @property({ type: String, reflect: true }) size: 'sm' | 'md' | 'lg' | 'xl' = 'md';
  @property({ reflect: true }) rounded: 'none' | 'sm' | 'md' | 'lg' | 'full' = 'lg';
  @property({ type: Boolean }) closable = true;
  @property({ type: Boolean }) persistent = false;
  @property({ type: Boolean, reflect: true }) loading = false;
  @property({ type: String }) error = '';

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
    const shadowFocusable = [...root.querySelectorAll<HTMLElement>(selectors)];
    const lightFocusable = [...this.querySelectorAll<HTMLElement>(selectors)];
    this._focusableElements = [...shadowFocusable, ...lightFocusable].filter(el => !el.closest('[hidden]') && el.offsetParent !== null);
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
          aria-label="${this.title ? nothing : 'Dialog'}"
          aria-labelledby="${this.title ? 'modal-title' : nothing}"
          tabindex="-1"
        >
          ${this.title || this.closable || this.icon ? html`
            <div class="modal-header">
              <div class="modal-header-content">
                ${this.icon ? html`
                  <div class="modal-icon">
                    <slot name="icon"><cg-icon name="${this.icon}" size="md"></cg-icon></slot>
                  </div>
                ` : nothing}
                <h2 class="modal-title" id="modal-title">${this.title}</h2>
              </div>
              ${this.closable ? html`
                <button
                  class="close-btn"
                  aria-label="Close dialog"
                  @click="${this._requestClose}"
                >
                  <cg-icon name="x" size="xs"></cg-icon>
                </button>
              ` : nothing}
            </div>
          ` : nothing}

          ${this.error ? html`
            <div class="modal-error-banner" role="alert">
              <cg-icon class="modal-error-icon" name="warning" size="sm" color="danger"></cg-icon>
              <span>${this.error}</span>
            </div>
          ` : nothing}

          <div class="modal-body">
            <slot></slot>
            ${this.loading ? html`
              <div class="modal-loading-overlay" aria-busy="true" aria-label="Loading">
                <span class="modal-spinner"></span>
                <span class="modal-loading-text">Loading...</span>
              </div>
            ` : nothing}
          </div>

          <div class="modal-footer" ?hidden=${!this._hasFooter}>
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
