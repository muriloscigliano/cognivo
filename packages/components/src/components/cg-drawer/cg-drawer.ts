import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * <cg-drawer> — Slide-in side panel.
 *
 * Features:
 * - Slides in from left or right with translateX animation
 * - Backdrop overlay with click-to-close (unless persistent)
 * - Close on Escape
 * - Close X button, slot for content
 * - Smooth 300ms slide transition with spring bounce
 * - Size variants (sm, md, lg, full)
 * - Body scroll lock when open
 * - Focus management
 * - prefers-reduced-motion support
 */
@customElement('cg-drawer')
export class CgDrawer extends LitElement {
  static override styles = css`
    :host {
      display: contents;
      font-family: var(--cg-font-family-primary, 'Inter Variable', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif);
    }

    /* ── Backdrop ── */
    .backdrop {
      position: fixed;
      inset: 0;
      z-index: 9998;
      background: rgba(0, 0, 0, 0.5);
      backdrop-filter: blur(2px);
      -webkit-backdrop-filter: blur(2px);
      opacity: 0;
      pointer-events: none;
      transition: opacity 300ms cubic-bezier(0.4, 0, 0.2, 1);
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
      z-index: 9999;
      display: flex;
      flex-direction: column;
      background: var(--cg-color-surface-raised-background, #1e1e22);
      border: 1px solid var(--cg-color-surface-base-border, #27272a);
      box-shadow:
        0 20px 25px -5px rgba(0, 0, 0, 0.4),
        0 8px 10px -6px rgba(0, 0, 0, 0.3);
      overflow: hidden;
      transition: transform 300ms cubic-bezier(0.34, 1.56, 0.64, 1);
    }

    @media (prefers-reduced-motion: reduce) {
      .backdrop { transition: opacity 100ms ease; }
      .panel { transition: transform 150ms ease; }
    }

    /* ── Side: Left ── */
    :host([side="left"]) .panel {
      left: 0;
      border-left: none;
      border-radius: 0 var(--cg-border-radius-200, 16px) var(--cg-border-radius-200, 16px) 0;
      transform: translateX(-100%);
    }
    :host([side="left"][open]) .panel {
      transform: translateX(0);
    }

    /* ── Side: Right ── */
    :host([side="right"]) .panel {
      right: 0;
      border-right: none;
      border-radius: var(--cg-border-radius-200, 16px) 0 0 var(--cg-border-radius-200, 16px);
      transform: translateX(100%);
    }
    :host([side="right"][open]) .panel {
      transform: translateX(0);
    }

    /* ── Sizes ── */
    :host([size="sm"]) .panel { width: 320px; max-width: 85vw; }
    :host([size="md"]) .panel { width: 480px; max-width: 85vw; }
    :host([size="lg"]) .panel { width: 640px; max-width: 90vw; }
    :host([size="full"]) .panel {
      width: 100vw;
      max-width: 100vw;
      border-radius: 0;
    }

    /* ── Header ── */
    .drawer-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: var(--cg-spacing-16, 16px) var(--cg-spacing-24, 24px);
      border-bottom: 1px solid var(--cg-color-surface-base-border, #27272a);
      flex-shrink: 0;
    }

    .drawer-title {
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
        background-color 100ms cubic-bezier(0, 0, 0.58, 1),
        color 100ms cubic-bezier(0, 0, 0.58, 1),
        transform 250ms cubic-bezier(0.4, 0, 0.2, 1);
    }

    .close-btn:hover {
      background: var(--cg-color-surface-hover-background, rgba(255, 255, 255, 0.06));
      color: var(--cg-color-text-primary, #fafafa);
    }

    .close-btn:active {
      transform: scale(0.97);
    }

    .close-btn:focus-visible {
      box-shadow:
        0 0 0 2px var(--cg-color-surface-base-background, #09090b),
        0 0 0 4px var(--cg-brand-ai-accent, #dfff61);
      outline: none;
    }

    /* ── Body ── */
    .drawer-body {
      flex: 1;
      overflow-y: auto;
      padding: var(--cg-spacing-24, 24px);
      color: var(--cg-color-text-secondary, #a1a1aa);
      font-size: var(--cg-font-size-sm, 14px);
      line-height: 1.6;
    }
  `;

  @property({ type: Boolean, reflect: true }) open = false;
  @property({ type: String, reflect: true }) side: 'left' | 'right' = 'right';
  @property({ type: String, reflect: true }) size: 'sm' | 'md' | 'lg' | 'full' = 'md';
  @property({ type: String }) override title = '';
  @property({ type: Boolean }) closable = true;
  @property({ type: Boolean }) persistent = false;

  private _previousOverflow = '';
  private _keydownHandler = this._handleKeydown.bind(this);

  override updated(changed: Map<string, unknown>) {
    if (changed.has('open')) {
      if (this.open) {
        this._onOpen();
      } else {
        this._onClose();
      }
    }
  }

  private _onOpen() {
    this._previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', this._keydownHandler);
    this.dispatchEvent(new CustomEvent('cg-drawer-open', { bubbles: true, composed: true }));

    // Focus the close button or panel
    this.updateComplete.then(() => {
      const closeBtn = this.shadowRoot?.querySelector('.close-btn') as HTMLElement;
      if (closeBtn) {
        closeBtn.focus();
      }
    });
  }

  private _onClose() {
    document.body.style.overflow = this._previousOverflow;
    document.removeEventListener('keydown', this._keydownHandler);
    this.dispatchEvent(new CustomEvent('cg-drawer-close', { bubbles: true, composed: true }));
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('keydown', this._keydownHandler);
    document.body.style.overflow = this._previousOverflow || '';
  }

  private _handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape' && this.closable) {
      e.preventDefault();
      this._requestClose();
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

  override render() {
    return html`
      <div
        class="backdrop"
        @click="${this._handleBackdropClick}"
        aria-hidden="true"
      ></div>
      <div
        class="panel"
        role="dialog"
        aria-modal="true"
        aria-label="${this.title || 'Side panel'}"
      >
        ${this.title || this.closable ? html`
          <div class="drawer-header">
            <h2 class="drawer-title">${this.title}</h2>
            ${this.closable ? html`
              <button
                class="close-btn"
                aria-label="Close panel"
                @click="${this._requestClose}"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                </svg>
              </button>
            ` : nothing}
          </div>
        ` : nothing}
        <div class="drawer-body">
          <slot></slot>
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
