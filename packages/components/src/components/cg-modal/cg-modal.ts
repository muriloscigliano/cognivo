import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { spinKeyframes, reducedMotion } from '../../styles/index.js';
import { FocusTrap } from '../../utils/focus-trap.js';

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
      display: contents;
      font-family: var(--cg-font-family-primary);
    }

    .backdrop {
      position: fixed;
      inset: 0;
      z-index: var(--cg-z-index-500);
      background: var(--cg-color-modal-overlay-background);
      backdrop-filter: blur(var(--cg-blur-backdrop)) saturate(150%);
      -webkit-backdrop-filter: blur(var(--cg-blur-backdrop)) saturate(150%);
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
        transition: opacity var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
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
      background: var(--cg-color-accent-background);
      color: var(--cg-color-accent-text);
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
      background: var(--cg-color-action-tertiary-background-default);
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
      background: var(--cg-color-action-tertiary-background-hover);
      color: var(--cg-color-surface-container-text);
    }

    .close-btn:active {
      background: var(--cg-color-action-tertiary-background-active);
      transform: scale(var(--cg-interaction-press-scale));
    }

    .close-btn:focus-visible {
      box-shadow:
        0 0 0 var(--cg-focus-ring-offset) var(--cg-color-focus-ring-offset),
        0 0 0 calc(var(--cg-focus-ring-offset) + var(--cg-focus-ring-width)) var(--cg-color-focus-ring);
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
  private _focusTrap = new FocusTrap();

  override disconnectedCallback() {
    super.disconnectedCallback();
    // Always restore body scroll if destroyed while open
    if (this.open) {
      document.body.style.overflow = this._previousOverflow || '';
    }
    this._focusTrap.deactivate();
  }

  override updated(changed: Map<string, unknown>) {
    if (changed.has('open')) {
      // First render with open=false is NOT a close — don't fire a spurious
      // cg-modal-close or clobber document.body.style.overflow on mount.
      if (changed.get('open') === undefined && !this.open) return;
      if (this.open) {
        this._onOpen();
      } else {
        if (changed.get('open') === true) {
          this._closing = true;
          // Clear when the exit animation actually ends; the timeout stays
          // only as a reduced-motion / detached-node fallback.
          const modal = this.shadowRoot?.querySelector('.modal');
          modal?.addEventListener('animationend', () => { this._closing = false; }, { once: true });
          setTimeout(() => { this._closing = false; }, 300);
        }
        this._onClose();
      }
    }
  }

  private _onOpen() {
    this._previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    this.dispatchEvent(new CustomEvent('cg-modal-open', { bubbles: true, composed: true }));

    const container = this.shadowRoot?.querySelector<HTMLElement>('.modal-container');
    if (container) {
      this._focusTrap.activate(container, {
        returnFocus: true,
        handleEscape: this.closable,
        onEscape: () => this._requestClose(),
      });
    }
  }

  private _onClose() {
    document.body.style.overflow = this._previousOverflow;
    this._focusTrap.deactivate();
    this.dispatchEvent(new CustomEvent('cg-modal-close', { bubbles: true, composed: true }));
  }

  private _handleBackdropClick() {
    if (!this.persistent && this.closable) {
      this._requestClose();
    }
  }

  /** The container covers the backdrop (higher z-index), so outside-clicks
   *  land here — only dismiss when the click is on the container itself. */
  private _handleContainerClick(e: MouseEvent) {
    if (e.target === e.currentTarget) this._handleBackdropClick();
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
        aria-hidden="true"
      ></div>
      <div class="modal-container" @click="${this._handleContainerClick}">
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
                ${this.title ? html`<h2 class="modal-title" id="modal-title">${this.title}</h2>` : nothing}
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

          <div class="modal-body" aria-busy="${this.loading ? 'true' : nothing}">
            <slot></slot>
            ${this.loading ? html`
              <div class="modal-loading-overlay" role="status" aria-live="polite">
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
