import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { hostBlock, reducedMotion } from '../../styles/index.js';
import { applyFloatingPosition, autoUpdate, type Placement } from '../../utils/floating.js';
import { bindOutsideClick } from '../../utils/outside-click.js';
import { FocusTrap } from '../../utils/focus-trap.js';

/**
 * @element cg-popover
 * Floating content container with click/hover triggers, smart placement, and focus management.
 *
 * @example
 * ```html
 * <cg-popover placement="bottom-start" trigger="click">
 *   <cg-button>Filters</cg-button>
 *   <div slot="content">Filter panel content</div>
 * </cg-popover>
 * ```
 *
 * @slot - Trigger element
 * @slot content - Popover content
 *
 * @fires {CustomEvent} cg-popover-open - When the popover opens
 * @fires {CustomEvent} cg-popover-close - When the popover closes
 */
@customElement('cg-popover')
export class CgPopover extends LitElement {
  static override styles = [hostBlock, reducedMotion, css`
    :host {
      display: inline-block;
      position: relative;
    }

    .trigger {
      display: inline-flex;
      cursor: pointer;
    }

    .popover {
      position: fixed;
      z-index: var(--cg-z-index-500);
      min-width: var(--cg-spacing-160);
      max-width: var(--cg-component-popover-max-width);
      padding: var(--cg-component-popover-padding);
      background: var(--cg-color-surface-popover-background);
      border: var(--cg-border-width-50) solid var(--cg-color-surface-popover-border);
      border-radius: var(--cg-component-popover-radius);
      color: var(--cg-color-surface-popover-text);
      box-shadow: var(--cg-shadow-elevation-xl);
      opacity: 0;
      transform: scale(0.96) translateY(4px);
      pointer-events: none;
      transition:
        opacity var(--cg-transition-duration-fast) var(--cg-transition-easing-default),
        transform var(--cg-transition-duration-default) var(--cg-transition-easing-ease-out);
    }

    :host([open]) .popover {
      opacity: 1;
      transform: scale(1) translateY(0);
      pointer-events: auto;
    }

    /* Transform origin based on placement side */
    .popover[data-side="top"] { transform-origin: bottom; }
    .popover[data-side="bottom"] { transform-origin: top; }
    .popover[data-side="left"] { transform-origin: right; }
    .popover[data-side="right"] { transform-origin: left; }

    /* Size variants */
    :host([size="sm"]) .popover { max-width: var(--cg-spacing-256); }
    :host([size="md"]) .popover { max-width: var(--cg-component-popover-max-width); }
    :host([size="lg"]) .popover { max-width: var(--cg-spacing-480); }

    /* Rounded variants */
    :host([rounded="none"]) .popover { border-radius: var(--cg-border-radius-none); }
    :host([rounded="sm"]) .popover { border-radius: var(--cg-border-radius-50); }
    :host([rounded="md"]) .popover { border-radius: var(--cg-border-radius-100); }
    :host([rounded="lg"]) .popover { border-radius: var(--cg-border-radius-150); }
    :host([rounded="full"]) .popover { border-radius: var(--cg-border-radius-full); }

    /* Arrow */
    .arrow {
      position: absolute;
      width: var(--cg-component-popover-arrow-size);
      height: var(--cg-component-popover-arrow-size);
      background: var(--cg-color-surface-popover-background);
      border: var(--cg-border-width-50) solid var(--cg-color-surface-popover-border);
      transform: rotate(45deg);
      pointer-events: none;
    }
    .arrow[data-side="top"] {
      bottom: calc(var(--cg-component-popover-arrow-size) / -2 - var(--cg-border-width-50));
      border-top: none;
      border-left: none;
    }
    .arrow[data-side="bottom"] {
      top: calc(var(--cg-component-popover-arrow-size) / -2 - var(--cg-border-width-50));
      border-bottom: none;
      border-right: none;
    }
    .arrow[data-side="left"] {
      right: calc(var(--cg-component-popover-arrow-size) / -2 - var(--cg-border-width-50));
      border-left: none;
      border-bottom: none;
    }
    .arrow[data-side="right"] {
      left: calc(var(--cg-component-popover-arrow-size) / -2 - var(--cg-border-width-50));
      border-right: none;
      border-top: none;
    }
  `];

  @property({ type: Boolean, reflect: true }) open = false;
  @property() placement: Placement = 'bottom';
  @property({ type: Number }) offset = 8;
  @property({ type: Boolean }) arrow = true;
  @property() trigger: 'click' | 'hover' | 'manual' = 'click';
  @property({ type: Boolean }) closable = true;
  @property({ reflect: true }) size: 'sm' | 'md' | 'lg' = 'md';
  @property({ reflect: true }) rounded: 'none' | 'sm' | 'md' | 'lg' | 'full' = 'md';

  @state() private _actualSide: 'top' | 'bottom' | 'left' | 'right' = 'bottom';
  @state() private _arrowOffset = 0;

  @query('.popover') private _popoverEl!: HTMLElement;
  @query('.trigger') private _triggerEl!: HTMLElement;

  private _focusTrap = new FocusTrap();
  private _cleanupAutoUpdate: (() => void) | null = null;
  private _disposeOutsideClick: (() => void) | null = null;

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this._cleanupAutoUpdate?.();
    this._disposeOutsideClick?.();
    this._disposeOutsideClick = null;
    this._focusTrap.deactivate();
  }

  override updated(changed: Map<string, unknown>): void {
    if (changed.has('open')) {
      if (this.open) this._onOpen();
      else this._onClose();
    }
  }

  private _onOpen(): void {
    this.dispatchEvent(new CustomEvent('cg-popover-open', { bubbles: true, composed: true }));

    // Start auto-positioning
    requestAnimationFrame(() => {
      if (!this._triggerEl || !this._popoverEl) return;
      this._cleanupAutoUpdate = autoUpdate(this._triggerEl, this._popoverEl, () => this._updatePosition());
    });

    // Outside click to close
    if (this.closable) {
      this._disposeOutsideClick?.();
      this._disposeOutsideClick = bindOutsideClick(this, () => { this.open = false; });
    }

    // Focus trap
    requestAnimationFrame(() => {
      if (this._popoverEl) {
        this._focusTrap.activate(this._popoverEl, {
          onEscape: this.closable ? () => { this.open = false; } : undefined,
        });
      }
    });
  }

  private _onClose(): void {
    this.dispatchEvent(new CustomEvent('cg-popover-close', { bubbles: true, composed: true }));
    this._cleanupAutoUpdate?.();
    this._cleanupAutoUpdate = null;
    this._disposeOutsideClick?.();
    this._disposeOutsideClick = null;
    this._focusTrap.deactivate();
  }

  private _updatePosition(): void {
    if (!this._triggerEl || !this._popoverEl) return;
    const triggerRect = this._triggerEl.getBoundingClientRect();
    const result = applyFloatingPosition(this._triggerEl, this._popoverEl, {
      placement: this.placement, offset: this.offset, flip: true, shift: true,
    });
    this._actualSide = result.placement.split('-')[0] as 'top' | 'bottom' | 'left' | 'right';

    // Compute arrow offset
    const isVertical = this._actualSide === 'top' || this._actualSide === 'bottom';
    if (isVertical) {
      const triggerCenter = triggerRect.left + triggerRect.width / 2;
      this._arrowOffset = triggerCenter - result.x;
    } else {
      const triggerCenter = triggerRect.top + triggerRect.height / 2;
      this._arrowOffset = triggerCenter - result.y;
    }
  }

  private _handleTriggerClick(): void {
    if (this.trigger !== 'click') return;
    this.open = !this.open;
  }

  private _handleTriggerMouseEnter(): void {
    if (this.trigger !== 'hover') return;
    this.open = true;
  }

  private _handleTriggerMouseLeave(): void {
    if (this.trigger !== 'hover') return;
    this.open = false;
  }

  override render() {
    const isVertical = this._actualSide === 'top' || this._actualSide === 'bottom';
    const arrowStyle = isVertical
      ? `left: ${this._arrowOffset}px; margin-left: calc(var(--cg-component-popover-arrow-size) / -2);`
      : `top: ${this._arrowOffset}px; margin-top: calc(var(--cg-component-popover-arrow-size) / -2);`;

    return html`
      <div
        class="trigger"
        @click=${this._handleTriggerClick}
        @mouseenter=${this._handleTriggerMouseEnter}
        @mouseleave=${this._handleTriggerMouseLeave}
        aria-haspopup="dialog"
        aria-expanded=${this.open ? 'true' : 'false'}
      >
        <slot></slot>
      </div>
      <div
        class="popover"
        role="dialog"
        aria-modal="false"
        data-side=${this._actualSide}
      >
        ${this.arrow ? html`<span class="arrow" data-side=${this._actualSide} style=${arrowStyle}></span>` : nothing}
        <slot name="content"></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cg-popover': CgPopover;
  }
}
