import { LitElement, html, css } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { hostBlock, reducedMotion } from '../../styles/index.js';
import { computePosition, autoUpdate, type Placement } from '../../utils/floating.js';

/**
 * @element cg-hover-card
 * Rich hover preview with configurable open/close delays. Useful for user cards,
 * link previews, or any content that benefits from non-intrusive hover.
 *
 * @example
 * ```html
 * <cg-hover-card placement="top">
 *   <a href="#">@alice</a>
 *   <div slot="content">
 *     <strong>Alice Johnson</strong>
 *     <p>Senior Engineer</p>
 *   </div>
 * </cg-hover-card>
 * ```
 *
 * @slot - Trigger element
 * @slot content - Hover card content
 *
 * @fires {CustomEvent} cg-hover-card-open
 * @fires {CustomEvent} cg-hover-card-close
 */
@customElement('cg-hover-card')
export class CgHoverCard extends LitElement {
  static override styles = [hostBlock, reducedMotion, css`
    :host {
      display: inline-block;
      position: relative;
    }

    .trigger {
      display: inline-flex;
    }

    .card {
      position: fixed;
      z-index: var(--cg-z-index-500);
      width: var(--cg-component-hover-card-width);
      padding: var(--cg-component-hover-card-padding);
      background: var(--cg-color-modal-container-background);
      border: var(--cg-border-width-50) solid var(--cg-color-action-secondary-border-default);
      border-radius: var(--cg-component-hover-card-radius);
      color: var(--cg-color-surface-container-text);
      /* Hover-card sits between popover (sm) and modal (xl) on the elevation scale.
         Lg gives it presence without feeling weighty — matches GitHub/Linear/Vercel norms. */
      box-shadow: var(--cg-shadow-elevation-lg);
      opacity: 0;
      transform: scale(0.94) translateY(var(--cg-spacing-6));
      pointer-events: none;
      will-change: transform, opacity;
      transition:
        opacity var(--cg-transition-duration-fast) var(--cg-transition-easing-default),
        transform var(--cg-transition-duration-default) var(--cg-transition-easing-spring);
    }

    :host([open]) .card {
      opacity: 1;
      transform: scale(1) translateY(0);
      pointer-events: auto;
    }

    /* Stagger the inner content slightly behind the card chrome so the entrance
       reads as "card lands, then content settles in" — feels premium without
       being slow. */
    .card ::slotted(*) {
      opacity: 0;
      transform: translateY(var(--cg-spacing-2));
      transition:
        opacity var(--cg-transition-duration-default) var(--cg-transition-easing-default) 60ms,
        transform var(--cg-transition-duration-default) var(--cg-transition-easing-ease-out) 60ms;
    }
    :host([open]) .card ::slotted(*) {
      opacity: 1;
      transform: translateY(0);
    }

    /* Subtle border highlight on hover of the trigger — telegraphs that the
       trigger has a richer interaction beyond a normal link. */
    .trigger:hover ::slotted(*) {
      filter: brightness(1.05);
    }
  `];

  @property({ type: Boolean, reflect: true }) open = false;
  @property() placement: Placement = 'top';
  @property({ type: Number }) offset = 12;
  @property({ type: Number, attribute: 'open-delay' }) openDelay = 700;
  @property({ type: Number, attribute: 'close-delay' }) closeDelay = 300;

  @query('.card') private _cardEl!: HTMLElement;
  @query('.trigger') private _triggerEl!: HTMLElement;

  private _openTimer: number | null = null;
  private _closeTimer: number | null = null;
  private _cleanupAutoUpdate: (() => void) | null = null;

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    if (this._openTimer) clearTimeout(this._openTimer);
    if (this._closeTimer) clearTimeout(this._closeTimer);
    this._cleanupAutoUpdate?.();
  }

  override updated(changed: Map<string, unknown>): void {
    if (changed.has('open')) {
      if (this.open) {
        this.dispatchEvent(new CustomEvent('cg-hover-card-open', { bubbles: true, composed: true }));
        requestAnimationFrame(() => {
          if (this._triggerEl && this._cardEl) {
            this._cleanupAutoUpdate = autoUpdate(this._triggerEl, this._cardEl, () => this._updatePosition());
          }
        });
      } else {
        this.dispatchEvent(new CustomEvent('cg-hover-card-close', { bubbles: true, composed: true }));
        this._cleanupAutoUpdate?.();
        this._cleanupAutoUpdate = null;
      }
    }
  }

  private _updatePosition(): void {
    if (!this._triggerEl || !this._cardEl) return;
    const triggerRect = this._triggerEl.getBoundingClientRect();
    const cardRect = this._cardEl.getBoundingClientRect();
    const result = computePosition(
      { top: triggerRect.top, left: triggerRect.left, width: triggerRect.width, height: triggerRect.height },
      { width: cardRect.width, height: cardRect.height },
      { placement: this.placement, offset: this.offset, flip: true, shift: true }
    );
    this._cardEl.style.top = `${result.y}px`;
    this._cardEl.style.left = `${result.x}px`;
  }

  private _scheduleOpen(): void {
    if (this._closeTimer) { clearTimeout(this._closeTimer); this._closeTimer = null; }
    if (this.open) return;
    this._openTimer = window.setTimeout(() => { this.open = true; }, this.openDelay);
  }

  private _scheduleClose(): void {
    if (this._openTimer) { clearTimeout(this._openTimer); this._openTimer = null; }
    if (!this.open) return;
    this._closeTimer = window.setTimeout(() => { this.open = false; }, this.closeDelay);
  }

  private _onKeydown = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && this.open) {
      this.open = false;
    }
  };

  override render() {
    return html`
      <div
        class="trigger"
        @mouseenter=${this._scheduleOpen}
        @mouseleave=${this._scheduleClose}
        @focusin=${this._scheduleOpen}
        @focusout=${this._scheduleClose}
        @keydown=${this._onKeydown}
      >
        <slot></slot>
      </div>
      <div
        class="card"
        role="dialog"
        aria-modal="false"
        ?inert=${!this.open}
        @mouseenter=${this._scheduleOpen}
        @mouseleave=${this._scheduleClose}
        @keydown=${this._onKeydown}
      >
        <slot name="content"></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cg-hover-card': CgHoverCard;
  }
}
