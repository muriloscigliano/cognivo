import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { hostBlock, reducedMotion } from '../../styles/index.js';

/**
 * <cg-carousel> — Scrollable content carousel with snap, autoplay, and multi-column.
 *
 * @example
 * ```html
 * <cg-carousel columns="1" autoplay loop>
 *   <div>Slide 1</div>
 *   <div>Slide 2</div>
 *   <div>Slide 3</div>
 * </cg-carousel>
 * ```
 *
 * @slot - Carousel slides
 *
 * @fires {CustomEvent<{index: number}>} cg-slide-click - When a slide is clicked
 *
 * @cssprop --cg-spacing-16 - Gap between slides
 * @cssprop --cg-color-action-primary-background-default - Active dot color
 */
@customElement('cg-carousel')
export class CgCarousel extends LitElement {
  static override styles = [hostBlock, reducedMotion, css`
    :host {
      position: relative;
      display: block;
    }

    .track-wrapper {
      overflow: hidden;
      border-radius: var(--cg-border-radius-150);
    }

    .track {
      display: flex;
      overflow-x: auto;
      scroll-snap-type: x mandatory;
      scrollbar-width: none;
      gap: var(--cg-spacing-16);
      scroll-behavior: smooth;
      -webkit-overflow-scrolling: touch;
    }
    .track::-webkit-scrollbar { display: none; }

    ::slotted(*) {
      scroll-snap-align: start;
      flex-shrink: 0;
    }

    /* ── Column sizing ── */
    :host([columns="1"]) ::slotted(*) { width: 100%; }
    :host([columns="2"]) ::slotted(*) { width: calc(50% - var(--cg-spacing-8)); }
    :host([columns="3"]) ::slotted(*) { width: calc(33.333% - var(--cg-spacing-12)); }
    :host([columns="4"]) ::slotted(*) { width: calc(25% - var(--cg-spacing-12)); }

    /* Peek — show sliver of next slide */
    :host([peek]) .track {
      padding-right: var(--cg-spacing-48);
    }

    /* ── Navigation arrows ── */
    .nav-btn {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      z-index: 2;
      width: var(--cg-spacing-40);
      height: var(--cg-spacing-40);
      border-radius: var(--cg-border-radius-full);
      border: var(--cg-border-width-50) solid var(--cg-color-surface-container-border);
      background: var(--cg-color-surface-container-background);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0;
      opacity: 0;
      color: var(--cg-color-surface-container-outlined);
      box-shadow:
        0 var(--cg-shadow-sm-y) var(--cg-shadow-sm-blur) var(--cg-shadow-sm-spread) rgba(0, 0, 0, 0.08);
      transition:
        opacity var(--cg-transition-duration-fast) var(--cg-transition-easing-default),
        background-color var(--cg-transition-duration-fast) var(--cg-transition-easing-default),
        transform var(--cg-transition-duration-fast) var(--cg-transition-easing-default),
        color var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
    }
    :host(:hover) .nav-btn:not(:disabled) { opacity: 1; }

    .nav-btn:hover {
      background: var(--cg-color-action-tertiary-background-hover);
      color: var(--cg-color-surface-container-text);
      transform: translateY(-50%) scale(1.05);
    }
    .nav-btn:active {
      transform: translateY(-50%) scale(var(--cg-interaction-press-scale));
    }
    .nav-btn:focus-visible {
      outline: none;
      box-shadow: 0 0 0 3px var(--cg-overlay-accent-strong);
      opacity: 1;
    }
    .nav-btn:disabled { opacity: 0 !important; cursor: default; }

    .nav-prev { left: calc(var(--cg-spacing-12) * -1); }
    .nav-next { right: calc(var(--cg-spacing-12) * -1); }

    /* ── Dot indicators ── */
    .dots {
      display: flex;
      justify-content: center;
      gap: var(--cg-spacing-6);
      margin-top: var(--cg-spacing-12);
    }
    .dot {
      width: var(--cg-spacing-8);
      height: var(--cg-spacing-8);
      border-radius: var(--cg-border-radius-full);
      background: var(--cg-color-surface-container-border);
      border: none;
      cursor: pointer;
      padding: 0;
      transition:
        background-color var(--cg-transition-duration-fast) var(--cg-transition-easing-default),
        width var(--cg-transition-duration-fast) cubic-bezier(0.34, 1.56, 0.64, 1);
    }
    .dot:hover { background: var(--cg-color-surface-container-outlined); }
    .dot.active {
      background: var(--cg-color-action-primary-background-default);
      width: var(--cg-spacing-24);
      border-radius: var(--cg-border-radius-50);
    }
    .dot:focus-visible {
      outline: none;
      box-shadow: 0 0 0 3px var(--cg-overlay-accent-strong);
    }

    /* Reduced motion */
    @media (prefers-reduced-motion: reduce) {
      .track { scroll-behavior: auto !important; }
      .dot { transition: background-color var(--cg-transition-duration-fast) ease; }
    }
  `];

  @property({ type: Boolean }) showDots = true;
  @property({ type: Boolean }) showArrows = true;
  @property({ type: Number, reflect: true }) columns = 1;
  @property({ type: Boolean, reflect: true }) peek = false;
  @property({ type: Boolean }) loop = false;
  @property({ type: Boolean }) autoplay = false;
  @property({ type: Number }) interval = 4000;

  @state() private _current = 0;
  @state() private _total = 0;

  @query('.track') private _track!: HTMLElement;

  private _autoplayTimer: ReturnType<typeof setInterval> | null = null;
  private _paused = false;

  override firstUpdated() {
    const slot = this.shadowRoot!.querySelector('slot');
    if (slot) {
      const update = () => { this._total = slot.assignedElements().length; };
      slot.addEventListener('slotchange', update);
      update();
    }

    this._track?.addEventListener('scroll', this._handleScroll, { passive: true });
    this._startAutoplay();
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this._track?.removeEventListener('scroll', this._handleScroll);
    this._stopAutoplay();
  }

  private _startAutoplay() {
    if (!this.autoplay) return;
    this._stopAutoplay();
    this._autoplayTimer = setInterval(() => {
      if (this._paused) return;
      if (this._current >= this._total - 1) {
        if (this.loop) this._goTo(0);
      } else {
        this._next();
      }
    }, this.interval);
  }

  private _stopAutoplay() {
    if (this._autoplayTimer) {
      clearInterval(this._autoplayTimer);
      this._autoplayTimer = null;
    }
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

  private _prev() {
    if (this._current <= 0 && this.loop) {
      this._goTo(this._total - 1);
    } else {
      this._goTo(Math.max(0, this._current - 1));
    }
  }

  private _next() {
    if (this._current >= this._total - 1 && this.loop) {
      this._goTo(0);
    } else {
      this._goTo(Math.min(this._total - 1, this._current + 1));
    }
  }

  private _handleSlideClick(e: Event) {
    const slot = this._track?.querySelector('slot');
    const items = slot?.assignedElements() as HTMLElement[] | undefined;
    if (!items) return;
    const target = e.target as HTMLElement;
    const index = items.findIndex(el => el === target || el.contains(target));
    if (index >= 0) {
      this.dispatchEvent(new CustomEvent('cg-slide-click', {
        detail: { index },
        bubbles: true,
        composed: true,
      }));
    }
  }

  private _handleKeydown(e: KeyboardEvent) {
    if (e.key === 'ArrowLeft') { e.preventDefault(); this._prev(); }
    if (e.key === 'ArrowRight') { e.preventDefault(); this._next(); }
  }

  override render() {
    const atStart = this._current === 0 && !this.loop;
    const atEnd = this._current >= this._total - 1 && !this.loop;

    return html`
      <div
        class="track-wrapper"
        tabindex="0"
        @keydown=${this._handleKeydown}
        @mouseenter=${() => { this._paused = true; }}
        @mouseleave=${() => { this._paused = false; }}
        role="region"
        aria-label="Carousel"
        aria-roledescription="carousel"
        aria-live="polite"
      >
        <div class="track" @click=${this._handleSlideClick}><slot></slot></div>
      </div>

      ${this.showArrows && this._total > 1 ? html`
        <button class="nav-btn nav-prev" @click=${this._prev} ?disabled=${atStart} aria-label="Previous slide">
          <cg-icon name="chevron-left" size="sm"></cg-icon>
        </button>
        <button class="nav-btn nav-next" @click=${this._next} ?disabled=${atEnd} aria-label="Next slide">
          <cg-icon name="chevron-right" size="sm"></cg-icon>
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
