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
      background: var(--cg-color-surface-popover-background);
      border: var(--cg-border-width-50) solid var(--cg-color-surface-popover-border);
      border-radius: var(--cg-component-hover-card-radius);
      color: var(--cg-color-surface-popover-text);
      box-shadow: var(--cg-shadow-elevation-xl);
      opacity: 0;
      transform: scale(0.96) translateY(4px);
      pointer-events: none;
      transition:
        opacity var(--cg-transition-duration-fast) var(--cg-transition-easing-default),
        transform var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
    }

    :host([open]) .card {
      opacity: 1;
      transform: scale(1) translateY(0);
      pointer-events: auto;
    }
  `];

  @property({ type: Boolean, reflect: true }) open = false;
  @property() placement: Placement = 'top';
  @property({ type: Number }) offset = 8;
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

  override render() {
    return html`
      <div
        class="trigger"
        @mouseenter=${this._scheduleOpen}
        @mouseleave=${this._scheduleClose}
        @focusin=${this._scheduleOpen}
        @focusout=${this._scheduleClose}
      >
        <slot></slot>
      </div>
      <div
        class="card"
        role="tooltip"
        ?hidden=${!this.open}
        @mouseenter=${this._scheduleOpen}
        @mouseleave=${this._scheduleClose}
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
