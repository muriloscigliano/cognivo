import { LitElement, html, css, svg, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { hostBlock, reducedMotion, focusRingDual } from '../../styles/index.js';
import { FocusTrap } from '../../utils/focus-trap.js';

export interface CgLightboxImage {
  src: string;
  alt?: string;
  caption?: string;
}

/**
 * @element cg-lightbox
 * Fullscreen image viewer with prev/next navigation, keyboard control,
 * focus trap, and scroll lock. Pairs with cg-image-gallery.
 *
 * @example
 * ```html
 * <cg-lightbox open></cg-lightbox>
 * <script>
 *   lb.images = [{ src: '/a.jpg', alt: 'A', caption: 'First' }];
 * </script>
 * ```
 *
 * @fires {CustomEvent} cg-lightbox-open
 * @fires {CustomEvent} cg-lightbox-close
 * @fires {CustomEvent<{index: number}>} cg-lightbox-change
 */
@customElement('cg-lightbox')
export class CgLightbox extends LitElement {
  static override styles = [hostBlock, reducedMotion, css`
    :host { display: contents; }

    .backdrop {
      position: fixed;
      inset: 0;
      z-index: var(--cg-z-index-500);
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--cg-color-modal-overlay-background);
      backdrop-filter: blur(var(--cg-blur-backdrop)) saturate(150%);
      -webkit-backdrop-filter: blur(var(--cg-blur-backdrop)) saturate(150%);
    }

    .stage {
      position: relative;
      max-width: 92vw;
      max-height: 92vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--cg-spacing-12);
    }

    img {
      max-width: 92vw;
      max-height: 80vh;
      object-fit: contain;
      border-radius: var(--cg-border-radius-150);
      box-shadow: var(--cg-shadow-lg);
    }

    figcaption {
      color: var(--cg-color-surface-cards-text);
      font-family: var(--cg-font-family-primary);
      font-size: var(--cg-font-size-sm);
      text-align: center;
    }

    .ctrl {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      /* 44px = WCAG 2.5.5 / iOS minimum touch target. Raw px matches the
         system convention (cg-checkbox min-height:44px); 44 is not on the
         spacing scale. */
      width: 44px;
      height: 44px;
      padding: 0;
      border-radius: var(--cg-border-radius-full);
      background: var(--cg-color-surface-cards-background);
      border: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
      color: var(--cg-color-surface-cards-text);
      cursor: pointer;
      transition:
        transform var(--cg-transition-duration-fast) var(--cg-transition-easing-default),
        border-color var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
    }
    .ctrl:hover { border-color: var(--cg-color-action-primary-border-default); }
    .ctrl:active { transform: scale(var(--cg-interaction-press-scale)); }
    .ctrl:focus-visible { ${focusRingDual} }
    .ctrl svg { width: var(--cg-spacing-20); height: var(--cg-spacing-20); }

    .close { position: absolute; top: calc(-1 * var(--cg-spacing-48)); right: 0; }
    .nav { position: absolute; top: 50%; transform: translateY(-50%); }
    .nav.prev { left: calc(-1 * var(--cg-spacing-56)); }
    .nav.next { right: calc(-1 * var(--cg-spacing-56)); }
    .nav:active { transform: translateY(-50%) scale(var(--cg-interaction-press-scale)); }

    /* On narrow viewports the stage fills ~92vw, so nav buttons positioned
       outside the stage clip off-screen. Pull them just inside the edges. */
    @media (max-width: 640px) {
      .nav.prev { left: var(--cg-spacing-8); }
      .nav.next { right: var(--cg-spacing-8); }
    }

    .counter {
      color: var(--cg-color-surface-cards-text);
      font-family: var(--cg-font-family-primary);
      font-size: var(--cg-font-size-sm);
      opacity: 0.8;
    }
  `];

  @property({ type: Boolean, reflect: true }) open = false;
  @property({ attribute: false }) images: CgLightboxImage[] = [];
  @property({ type: Number, reflect: true }) index = 0;
  @property({ type: Boolean }) closable = true;

  private _focusTrap = new FocusTrap();
  private _previousOverflow = '';

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    if (this.open) document.body.style.overflow = this._previousOverflow || '';
    this._focusTrap.deactivate();
  }

  override willUpdate(changed: Map<string, unknown>): void {
    // Clamp before render so we never set a reactive property in updated().
    if (changed.has('index') || changed.has('images')) {
      this._clampIndex();
    }
  }

  override updated(changed: Map<string, unknown>): void {
    if (changed.has('open')) {
      // First render with open=false is not a close.
      if (changed.get('open') === undefined && !this.open) return;
      if (this.open) this._onOpen();
      else this._onClose(changed.get('open') === true);
    }
  }

  private _clampIndex(): void {
    const max = Math.max(0, this.images.length - 1);
    if (this.index > max) this.index = max;
    if (this.index < 0) this.index = 0;
  }

  private _onOpen(): void {
    this._previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    this.dispatchEvent(new CustomEvent('cg-lightbox-open', { bubbles: true, composed: true }));
    // Activate the trap after the overlay renders.
    requestAnimationFrame(() => {
      const stage = this.shadowRoot?.querySelector<HTMLElement>('.stage');
      if (stage) {
        this._focusTrap.activate(stage, {
          returnFocus: true,
          handleEscape: this.closable,
          onEscape: () => this._requestClose(),
          // Focus the dialog itself so opening always lands inside the trap,
          // even with zero interactive controls (single image + closable=false).
          // Controls remain reachable via Tab.
          initialFocus: stage,
        });
      }
    });
  }

  private _onClose(wasOpen: boolean): void {
    document.body.style.overflow = this._previousOverflow;
    this._focusTrap.deactivate();
    if (wasOpen) {
      this.dispatchEvent(new CustomEvent('cg-lightbox-close', { bubbles: true, composed: true }));
    }
  }

  private _requestClose(): void {
    if (!this.closable) return;
    this.open = false;
  }

  private _go(delta: number): void {
    if (this.images.length < 2) return;
    const n = this.images.length;
    this.index = (this.index + delta + n) % n;
    this.dispatchEvent(new CustomEvent('cg-lightbox-change', {
      detail: { index: this.index },
      bubbles: true,
      composed: true,
    }));
  }

  private _onKeydown(e: KeyboardEvent): void {
    if (e.key === 'ArrowRight') { e.preventDefault(); this._go(1); }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); this._go(-1); }
    // Escape is handled by the FocusTrap onEscape.
  }

  private _onBackdropClick(e: MouseEvent): void {
    if (e.target === e.currentTarget) this._requestClose();
  }

  override render() {
    if (!this.open) return nothing;
    const current = this.images[this.index];
    const many = this.images.length > 1;

    return html`
      <div class="backdrop" @click=${this._onBackdropClick} @keydown=${this._onKeydown}>
        <figure
          class="stage"
          role="dialog"
          aria-modal="true"
          tabindex="-1"
          aria-label=${current?.caption || current?.alt || 'Image viewer'}
        >
          ${this.closable ? html`
            <button class="ctrl close" type="button" aria-label="Close" @click=${this._requestClose}>
              ${svg`<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`}
            </button>` : nothing}

          ${many ? html`
            <button class="ctrl nav prev" type="button" aria-label="Previous image" @click=${() => this._go(-1)}>
              ${svg`<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M15 6l-6 6 6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`}
            </button>` : nothing}

          ${current
            ? html`<img src=${current.src} alt=${current.alt || ''} />`
            : html`<figcaption>No images</figcaption>`}

          ${many ? html`
            <button class="ctrl nav next" type="button" aria-label="Next image" @click=${() => this._go(1)}>
              ${svg`<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M9 6l6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`}
            </button>` : nothing}

          ${current?.caption ? html`<figcaption>${current.caption}</figcaption>` : nothing}
          ${many ? html`<span class="counter">${this.index + 1} / ${this.images.length}</span>` : nothing}
        </figure>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cg-lightbox': CgLightbox;
  }
}
