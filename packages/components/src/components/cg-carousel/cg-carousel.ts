import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';

/**
 * <cg-carousel> — Scrollable content carousel.
 *
 * Features:
 * - Prev/Next arrow buttons with auto-hide when at boundary
 * - Dot indicators with active state
 * - Keyboard navigation (Arrow keys)
 * - Touch/swipe support (native scroll snap)
 * - Scroll position tracking
 * - Responsive item sizing
 */
@customElement('cg-carousel')
export class CgCarousel extends LitElement {
  static override styles = css`
    :host {
      transition: color 100ms cubic-bezier(0, 0, 0.58, 1);
      display: block;
      font-family: var(--cg-font-family-primary, 'Inter Variable', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif);
      position: relative;
    }

    .track-wrapper {
      overflow: hidden;
      border-radius: var(--cg-border-radius-150, 12px);
    }

    .track {
      display: flex;
      overflow-x: auto;
      scroll-snap-type: x mandatory;
      scrollbar-width: none;
      gap: var(--cg-spacing-16, 16px);
      scroll-behavior: smooth;
      -webkit-overflow-scrolling: touch;
    }
    .track::-webkit-scrollbar { display: none; }

    ::slotted(*) {
      scroll-snap-align: start;
      flex-shrink: 0;
      min-width: 80%;
    }

    /* Navigation arrows */
    .nav-btn {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      z-index: 2;
      width: 40px;
      height: 40px;
      border-radius: var(--cg-border-radius-full, 99999px);
      border: 1px solid var(--cg-color-surface-container-border, #27272a);
      background: var(--cg-color-surface-container-background, #18181b);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: var(--cg-shadow-md-x, 0px) var(--cg-shadow-md-y, 4px) var(--cg-shadow-md-blur, 12px) var(--cg-shadow-md-spread, 0px) var(--cg-shadow-md-Color, #000000);
      transition: all var(--cg-motion-duration-normal, 150ms) ease;
      padding: 0;
      opacity: 0;
    }
    :host(:hover) .nav-btn { opacity: 1; }
    .nav-btn:hover {
      box-shadow: var(--cg-shadow-lg-x, 0px) var(--cg-shadow-lg-y, 8px) var(--cg-shadow-lg-blur, 24px) var(--cg-shadow-lg-spread, 0px) var(--cg-shadow-lg-Color, #616161);
      background: var(--cg-color-surface-container-background, #18181b);
    }
    .nav-btn:focus-visible {
      outline: 2px solid var(--cg-focus-ring-color, #c8e650);
      outline-offset: 2px;
      opacity: 1;
    }
    .nav-btn:active { transform: translateY(-50%) scale(0.95); }
    .nav-btn:disabled { opacity: 0 !important; cursor: default; }
    .nav-btn svg { width: 18px; height: 18px; color: var(--cg-gray-600, #52525b); }

    .nav-prev { left: -12px; }
    .nav-next { right: -12px; }

    /* Dot indicators */
    .dots {
      display: flex;
      justify-content: center;
      gap: 6px;
      margin-top: var(--cg-spacing-12, 12px);
    }
    .dot {
      width: 8px;
      height: 8px;
      border-radius: var(--cg-border-radius-full, 99999px);
      background: var(--cg-gray-300, #d4d4d8);
      border: none;
      cursor: pointer;
      padding: 0;
      transition: all var(--cg-motion-duration-slow, 250ms) ease;
    }
    .dot:hover { background: var(--cg-gray-400, #a1a1aa); }
    .dot.active {
      background: var(--cg-focus-ring-color, #c8e650);
      width: 24px;
      border-radius: 4px;
    }
    .dot:focus-visible {
      outline: 2px solid var(--cg-focus-ring-color, #c8e650);
      outline-offset: 2px;
    }

    @media (prefers-reduced-motion: reduce) {
      .track { scroll-behavior: auto; }
      .nav-btn, .dot { transition: none; }
    }
  `;

  @property({ type: Boolean }) showDots = true;
  @property({ type: Boolean }) showArrows = true;

  @state() private _current = 0;
  @state() private _total = 0;

  @query('.track') private _track!: HTMLElement;

  override firstUpdated() {
    const slot = this.shadowRoot!.querySelector('slot');
    if (slot) {
      const update = () => { this._total = slot.assignedElements().length; };
      slot.addEventListener('slotchange', update);
      update();
    }

    // Track scroll position to update current index
    this._track?.addEventListener('scroll', this._handleScroll, { passive: true });
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this._track?.removeEventListener('scroll', this._handleScroll);
  }

  private _handleScroll = () => {
    if (!this._track || this._total === 0) return;
    const scrollLeft = this._track.scrollLeft;
    const itemWidth = this._track.scrollWidth / this._total;
    const idx = Math.round(scrollLeft / itemWidth);
    if (idx !== this._current) {
      this._current = Math.max(0, Math.min(idx, this._total - 1));
    }
  };

  private _goTo(index: number) {
    const items = this._track.querySelector('slot')?.assignedElements() as HTMLElement[] | undefined;
    if (!items || !items[index]) return;
    items[index]!.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
    this._current = index;
  }

  private _prev() { this._goTo(Math.max(0, this._current - 1)); }
  private _next() { this._goTo(Math.min(this._total - 1, this._current + 1)); }

  private _handleKeydown(e: KeyboardEvent) {
    if (e.key === 'ArrowLeft') { e.preventDefault(); this._prev(); }
    if (e.key === 'ArrowRight') { e.preventDefault(); this._next(); }
  }

  override render() {
    const atStart = this._current === 0;
    const atEnd = this._current >= this._total - 1;

    return html`
      <div class="track-wrapper" tabindex="0" @keydown=${this._handleKeydown} role="region" aria-label="Carousel" aria-roledescription="carousel">
        <div class="track"><slot></slot></div>
      </div>

      ${this.showArrows && this._total > 1 ? html`
        <button class="nav-btn nav-prev" @click=${this._prev} ?disabled=${atStart} aria-label="Previous slide">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M15 18l-6-6 6-6"></path></svg>
        </button>
        <button class="nav-btn nav-next" @click=${this._next} ?disabled=${atEnd} aria-label="Next slide">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M9 18l6-6-6-6"></path></svg>
        </button>
      ` : nothing}

      ${this.showDots && this._total > 1 ? html`
        <div class="dots" role="tablist" aria-label="Slide indicators">
          ${Array.from({ length: this._total }, (_, i) => html`
            <button
              class="dot ${i === this._current ? 'active' : ''}"
              role="tab"
              aria-selected=${i === this._current}
              aria-label="Slide ${i + 1}"
              @click=${() => this._goTo(i)}
            ></button>
          `)}
        </div>
      ` : nothing}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap { 'cg-carousel': CgCarousel; }
}
