import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { spinKeyframes, reducedMotion } from '../../styles/index.js';

/**
 * @element cg-drawer
 * Slide-in side panel with backdrop, focus trap, and scroll lock.
 *
 * @example
 * ```html
 * <cg-drawer title="Settings" side="right" size="md" open>
 *   <p>Drawer content here.</p>
 * </cg-drawer>
 * ```
 *
 * @slot - Default slot for drawer body content
 * @slot footer - Action buttons area below the body
 *
 * @fires {CustomEvent} cg-drawer-open - When the drawer opens
 * @fires {CustomEvent} cg-drawer-close - When the drawer closes
 * @fires {CustomEvent} cg-drawer-back - When the back button is clicked
 *
 * @cssprop --cg-color-modal-container-background - Panel background
 * @cssprop --cg-border-radius-200 - Panel border radius (28px)
 * @cssprop --cg-transition-easing-ease-out - Slide spring easing
 * @cssprop --cg-color-focus-ring - Close button focus ring
 */
@customElement('cg-drawer')
export class CgDrawer extends LitElement {
  static override styles = [spinKeyframes, reducedMotion, css`
    :host {
      transition: color var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
      display: contents;
      font-family: var(--cg-font-family-primary);
    }

    /* ── Backdrop ── */
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

    /* ── Panel ── */
    .panel {
      position: fixed;
      top: 0;
      bottom: 0;
      z-index: var(--cg-z-index-top);
      display: flex;
      flex-direction: column;
      background: var(--cg-color-modal-container-background);
      border: var(--cg-border-width-50) solid var(--cg-color-modal-container-border);
      box-shadow: var(--cg-elevation-5);
      overflow: hidden;
      transition: transform var(--cg-transition-duration-slow) var(--cg-transition-easing-default);
    }

    @media (prefers-reduced-motion: reduce) {
      .backdrop { transition: opacity var(--cg-transition-duration-fast) ease; }
      .panel { transition: transform var(--cg-transition-duration-fast) ease; }
    }

    /* ── Side: Left ── */
    :host([side="left"]) .panel {
      left: 0;
      border-left: none;
      border-radius: 0 var(--cg-component-drawer-radius) var(--cg-component-drawer-radius) 0;
      transform: translateX(-100%);
    }
    :host([side="left"][open]) .panel {
      transform: translateX(0);
    }

    /* ── Side: Right ── */
    :host([side="right"]) .panel {
      right: 0;
      border-right: none;
      border-radius: var(--cg-component-drawer-radius) 0 0 var(--cg-component-drawer-radius);
      transform: translateX(100%);
    }
    :host([side="right"][open]) .panel {
      transform: translateX(0);
    }

    /* ── Closing animation ── */
    @keyframes drawer-exit-left {
      from { transform: translateX(0); }
      to { transform: translateX(-100%); }
    }
    @keyframes drawer-exit-right {
      from { transform: translateX(0); }
      to { transform: translateX(100%); }
    }
    @keyframes backdrop-exit {
      from { opacity: 1; }
      to { opacity: 0; }
    }
    :host([side="left"]) .panel.closing {
      animation: drawer-exit-left var(--cg-transition-duration-fast) var(--cg-transition-easing-ease-in) forwards;
    }
    :host([side="right"]) .panel.closing {
      animation: drawer-exit-right var(--cg-transition-duration-fast) var(--cg-transition-easing-ease-in) forwards;
    }
    .backdrop.closing {
      pointer-events: auto;
      animation: backdrop-exit var(--cg-transition-duration-fast) var(--cg-transition-easing-ease-in) forwards;
    }

    /* ── Sizes ── */
    :host([size="sm"]) .panel { width: var(--cg-component-drawer-width-sm); max-width: 85vw; }
    :host([size="md"]) .panel { width: var(--cg-component-drawer-width-md); max-width: 85vw; }
    :host([size="lg"]) .panel { width: var(--cg-component-drawer-width-lg); max-width: 90vw; }
    :host([size="full"]) .panel {
      width: 100vw;
      max-width: 100vw;
      border-radius: 0;
    }

    /* ── Header ── */
    .drawer-header {
      display: flex;
      align-items: center;
      gap: var(--cg-spacing-12);
      padding: var(--cg-spacing-20) var(--cg-spacing-24);
      flex-shrink: 0;
    }

    .drawer-header-left {
      display: flex;
      align-items: center;
      gap: var(--cg-spacing-12);
      flex: 1;
      min-width: 0;
    }

    .drawer-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      color: var(--cg-color-action-primary-background-default);
    }

    .drawer-title {
      font-size: var(--cg-font-size-md);
      font-weight: var(--cg-font-weight-semibold);
      color: var(--cg-color-modal-header-text);
      margin: 0;
      line-height: var(--cg-line-height-snug);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
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

    /* Back button — same style as close btn */
    .back-btn {
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
      padding: 0;
      flex-shrink: 0;
      transition:
        background-color var(--cg-transition-duration-fast) var(--cg-transition-easing-default),
        color var(--cg-transition-duration-fast) var(--cg-transition-easing-default),
        transform var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
    }
    .back-btn:hover {
      background: var(--cg-color-action-secondary-background-hover);
      color: var(--cg-color-surface-container-text);
    }
    .back-btn:active {
      transform: scale(var(--cg-interaction-press-scale));
    }
    .back-btn:focus-visible {
      box-shadow:
        0 0 0 2px var(--cg-color-focus-ring-offset),
        0 0 0 calc(2px + 2px) var(--cg-color-focus-ring);
      outline: none;
    }

    /* ── Body ── */
    .drawer-body {
      position: relative;
      flex: 1;
      overflow-y: auto;
      padding: var(--cg-spacing-4) var(--cg-spacing-24) var(--cg-spacing-24);
      color: var(--cg-color-surface-container-outlined);
      font-size: var(--cg-font-size-sm);
      line-height: var(--cg-line-height-relaxed);
    }

    /* ── Footer ── */
    .drawer-footer {
      padding: var(--cg-spacing-16) var(--cg-spacing-24);
      border-top: var(--cg-border-width-50) solid var(--cg-color-modal-container-border);
      flex-shrink: 0;
    }
    .drawer-footer ::slotted(*) {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: var(--cg-spacing-12);
    }
    .drawer-footer:empty,
    .drawer-footer ::slotted(:empty) {
      display: none;
    }

    /* Rounded variants */
    :host([rounded="none"][side="left"]) .panel { border-radius: 0; }
    :host([rounded="none"][side="right"]) .panel { border-radius: 0; }
    :host([rounded="sm"][side="left"]) .panel { border-radius: 0 var(--cg-border-radius-50) var(--cg-border-radius-50) 0; }
    :host([rounded="sm"][side="right"]) .panel { border-radius: var(--cg-border-radius-50) 0 0 var(--cg-border-radius-50); }
    :host([rounded="md"][side="left"]) .panel { border-radius: 0 var(--cg-border-radius-100) var(--cg-border-radius-100) 0; }
    :host([rounded="md"][side="right"]) .panel { border-radius: var(--cg-border-radius-100) 0 0 var(--cg-border-radius-100); }
    :host([rounded="lg"][side="left"]) .panel { border-radius: 0 var(--cg-component-drawer-radius) var(--cg-component-drawer-radius) 0; }
    :host([rounded="lg"][side="right"]) .panel { border-radius: var(--cg-component-drawer-radius) 0 0 var(--cg-component-drawer-radius); }
    :host([rounded="full"][side="left"]) .panel { border-radius: 0 var(--cg-border-radius-full) var(--cg-border-radius-full) 0; }
    :host([rounded="full"][side="right"]) .panel { border-radius: var(--cg-border-radius-full) 0 0 var(--cg-border-radius-full); }

    /* ── Loading overlay ── */
    .drawer-loading-overlay {
      position: absolute;
      inset: 0;
      z-index: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: var(--cg-spacing-12);
      background: var(--cg-color-modal-container-background);
    }
    .drawer-spinner {
      width: var(--cg-spacing-24);
      height: var(--cg-spacing-24);
      border: var(--cg-border-width-100) solid var(--cg-color-surface-base-border);
      border-top-color: var(--cg-color-surface-container-text);
      border-radius: var(--cg-border-radius-full);
      animation: spin var(--cg-transition-duration-slow) linear infinite;
    }
    .drawer-loading-text {
      font-size: var(--cg-font-size-sm);
      color: var(--cg-color-surface-container-outlined);
    }

    /* ── Error banner ── */
    .drawer-error-banner {
      display: flex;
      align-items: center;
      gap: var(--cg-spacing-8);
      padding: var(--cg-spacing-12) var(--cg-spacing-16);
      margin: 0 var(--cg-spacing-24);
      background: var(--cg-color-status-error-background-default);
      border: var(--cg-border-width-50) solid var(--cg-color-status-error-border-default);
      border-radius: var(--cg-border-radius-100);
      color: var(--cg-color-status-error-text-default);
      font-size: var(--cg-font-size-sm);
      line-height: var(--cg-line-height-snug);
    }
    .drawer-error-icon {
      flex-shrink: 0;
    }
  `];

  @property({ type: Boolean, reflect: true }) open = false;
  @property({ type: String, reflect: true }) side: 'left' | 'right' = 'right';
  @property({ type: String, reflect: true }) size: 'sm' | 'md' | 'lg' | 'full' = 'md';
  @property({ reflect: true }) rounded: 'none' | 'sm' | 'md' | 'lg' | 'full' = 'lg';
  @property({ type: String }) override title = '';
  @property({ type: String }) icon = '';
  @property({ type: Boolean }) back = false;
  @property({ type: Boolean }) closable = true;
  @property({ type: Boolean }) persistent = false;
  @property({ type: Boolean, reflect: true }) loading = false;
  @property({ type: String }) error = '';

  @state() private _hasFooter = false;
  @state() private _closing = false;

  private _previousOverflow = '';
  private _previousFocus: HTMLElement | null = null;
  private _keydownHandler = this._handleKeydown.bind(this);

  override updated(changed: Map<string, unknown>) {
    if (changed.has('open')) {
      if (this.open) {
        this._onOpen();
      } else {
        if (changed.get('open') === true) {
          this._closing = true;
          setTimeout(() => { this._closing = false; }, 200);
        }
        this._onClose();
      }
    }
  }

  private _onOpen() {
    this._previousFocus = document.activeElement as HTMLElement;
    this._previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', this._keydownHandler);
    this.dispatchEvent(new CustomEvent('cg-drawer-open', { bubbles: true, composed: true }));

    // Focus the first focusable element inside the panel (close button as fallback)
    this.updateComplete.then(() => {
      const root = this.shadowRoot;
      if (!root) return;
      const selectors = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
      const shadowFocusable = [...(root.querySelectorAll<HTMLElement>(selectors) || [])];
      const lightFocusable = [...this.querySelectorAll<HTMLElement>(selectors)];
      const focusable = [...shadowFocusable, ...lightFocusable].filter(el => !el.closest('[hidden]') && el.offsetParent !== null);
      if (focusable.length > 0) {
        focusable[0]!.focus();
      } else {
        const panel = root.querySelector('.panel') as HTMLElement;
        panel?.focus();
      }
    });
  }

  private _onClose() {
    document.body.style.overflow = this._previousOverflow;
    document.removeEventListener('keydown', this._keydownHandler);
    this._previousFocus?.focus();
    this._previousFocus = null;
    this.dispatchEvent(new CustomEvent('cg-drawer-close', { bubbles: true, composed: true }));
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('keydown', this._keydownHandler);
    // Only restore if we actually locked it
    if (this.open) {
      document.body.style.overflow = this._previousOverflow || '';
    }
  }

  private _handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape' && this.closable) {
      e.preventDefault();
      this._requestClose();
      return;
    }

    if (e.key === 'Tab') {
      this._trapFocus(e);
    }
  }

  private _trapFocus(e: KeyboardEvent) {
    const root = this.shadowRoot;
    if (!root) return;

    const selectors = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
    const shadowFocusable = [...(root.querySelectorAll<HTMLElement>(selectors) || [])];
    const lightFocusable = [...this.querySelectorAll<HTMLElement>(selectors)];
    const focusable = [...shadowFocusable, ...lightFocusable].filter(el => !el.closest('[hidden]') && el.offsetParent !== null);
    if (focusable.length === 0) {
      e.preventDefault();
      return;
    }

    const first = focusable[0]!;
    const last = focusable[focusable.length - 1]!;

    const active = root.activeElement ?? document.activeElement;

    if (e.shiftKey) {
      if (active === first) {
        e.preventDefault();
        last.focus();
      }
    } else {
      if (active === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }

  private _handleBack() {
    this.dispatchEvent(new CustomEvent('cg-drawer-back', { bubbles: true, composed: true }));
  }

  private _handleFooterSlotChange(e: Event) {
    const slot = e.target as HTMLSlotElement;
    this._hasFooter = slot.assignedNodes({ flatten: true }).length > 0;
  }

  private _handleBackdropClick() {
    if (!this.persistent && this.closable) {
      this._requestClose();
    }
  }

  private _requestClose() {
    this.open = false;
  }

  override render() {
    return html`
      <div
        class="backdrop ${this._closing ? 'closing' : ''}"
        @click="${this._handleBackdropClick}"
        aria-hidden="true"
      ></div>
      <div
        class="panel ${this._closing ? 'closing' : ''}"
        role="dialog"
        aria-modal="true"
        aria-label="${this.title ? nothing : 'Side panel'}"
        aria-labelledby="${this.title ? 'drawer-title' : nothing}"
        tabindex="-1"
      >
        ${this.title || this.closable || this.back ? html`
          <div class="drawer-header">
            <div class="drawer-header-left">
              ${this.back ? html`
                <button class="back-btn" aria-label="Go back" @click="${this._handleBack}">
                  <cg-icon name="chevron-left" size="sm"></cg-icon>
                </button>
              ` : nothing}
              ${this.icon ? html`
                <span class="drawer-icon"><cg-icon name="${this.icon}" size="md"></cg-icon></span>
              ` : nothing}
              <h2 class="drawer-title" id="drawer-title">${this.title}</h2>
            </div>
            ${this.closable ? html`
              <button
                class="close-btn"
                aria-label="Close panel"
                @click="${this._requestClose}"
              >
                <cg-icon name="x" size="xs"></cg-icon>
              </button>
            ` : nothing}
          </div>
        ` : nothing}

        ${this.error ? html`
          <div class="drawer-error-banner" role="alert">
            <cg-icon class="drawer-error-icon" name="warning" size="sm" color="danger"></cg-icon>
            <span>${this.error}</span>
          </div>
        ` : nothing}

        <div class="drawer-body">
          <slot></slot>
          ${this.loading ? html`
            <div class="drawer-loading-overlay" aria-busy="true" aria-label="Loading">
              <span class="drawer-spinner"></span>
              <span class="drawer-loading-text">Loading...</span>
            </div>
          ` : nothing}
        </div>

        <div class="drawer-footer" ?hidden=${!this._hasFooter}>
          <slot name="footer" @slotchange="${this._handleFooterSlotChange}"></slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cg-drawer': CgDrawer;
  }
}
