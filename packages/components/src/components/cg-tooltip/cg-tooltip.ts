import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

/**
 * @element cg-tooltip
 * Hover/focus tooltip with arrow, viewport-aware positioning, and fade+scale animation.
 *
 * @example
 * ```html
 * <cg-tooltip content="Save your work" position="top">
 *   <cg-button>Save</cg-button>
 * </cg-tooltip>
 * <cg-tooltip position="bottom">
 *   <cg-button>Rich</cg-button>
 *   <div slot="content"><strong>Bold</strong> tooltip</div>
 * </cg-tooltip>
 * ```
 *
 * @slot - Default slot for the trigger element
 * @slot content - Rich HTML tooltip content (alternative to `content` property)
 *
 * @cssprop [--cg-color-surface-overlay-background=#27272a] - Tooltip background
 * @cssprop [--cg-font-size-xs=12px] - Tooltip font size
 * @cssprop [--cg-border-radius-100=8px] - Tooltip border radius
 * @cssprop [--cg-motion-duration-slow=150ms] - Fade+scale animation duration
 */
@customElement('cg-tooltip')
export class CgTooltip extends LitElement {
  static override styles = css`
    :host {
      transition: color var(--cg-motion-duration-fast, 80ms) var(--cg-motion-easing-color, cubic-bezier(0, 0, 0.58, 1));
      display: inline-block;
      position: relative;
      font-family: var(--cg-font-family-primary, 'Inter Variable', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif);
    }

    .trigger-wrap {
      display: inline-flex;
    }

    .tooltip {
      position: absolute;
      z-index: 10000;
      padding: 6px 10px;
      background: var(--cg-color-surface-overlay-background, #27272a);
      color: var(--cg-color-text-primary, #fafafa);
      font-size: var(--cg-font-size-xs, 12px);
      font-weight: var(--cg-font-weight-medium, 500);
      line-height: var(--cg-line-height-snug, 1.375);
      border-radius: var(--cg-border-radius-100, 8px);
      white-space: nowrap;
      max-width: 280px;
      pointer-events: none;
      box-shadow:
        0 4px 6px -1px rgba(0, 0, 0, 0.3),
        0 2px 4px -2px rgba(0, 0, 0, 0.2);

      /* Animation — fade+scale */
      opacity: 0;
      transform: scale(0.92);
      transition:
        opacity var(--cg-motion-duration-slow, 150ms) var(--cg-motion-easing-default, cubic-bezier(0.4, 0, 0.2, 1)),
        transform var(--cg-motion-duration-slow, 150ms) var(--cg-motion-easing-default, cubic-bezier(0.4, 0, 0.2, 1));
    }

    /* Rich content slot may contain block elements */
    .tooltip-content ::slotted(*) {
      white-space: normal;
    }

    :host([_visible]) .tooltip {
      opacity: 1;
      transform: scale(1);
    }

    /* ── Closing animation ── */
    @keyframes tooltip-exit {
      from { opacity: 1; transform: scale(1); }
      to { opacity: 0; transform: scale(0.92); }
    }
    .tooltip.closing {
      animation: tooltip-exit 100ms var(--cg-motion-easing-exit, cubic-bezier(0.4, 0, 1, 1)) forwards;
    }

    @media (prefers-reduced-motion: reduce) {
      .tooltip {
        transition: opacity 80ms ease;
        transform: scale(1) !important;
      }
    }

    /* ── Arrow ── */
    .arrow {
      position: absolute;
      width: 8px;
      height: 8px;
      background: var(--cg-color-surface-overlay-background, #27272a);
      transform: rotate(45deg);
    }

    /* ── Top position (default) ── */
    :host([_effective-position="top"]) .tooltip {
      bottom: 100%;
      left: 50%;
      transform-origin: bottom center;
      margin-bottom: 8px;
    }
    :host([_effective-position="top"][_visible]) .tooltip {
      transform: scale(1) translateX(-50%);
    }
    :host([_effective-position="top"]) .tooltip:not([style]) {
      transform: scale(0.92) translateX(-50%);
    }
    :host([_effective-position="top"]) .arrow {
      bottom: -4px;
      left: 50%;
      margin-left: -4px;
    }

    /* ── Bottom position ── */
    :host([_effective-position="bottom"]) .tooltip {
      top: 100%;
      left: 50%;
      transform-origin: top center;
      margin-top: 8px;
    }
    :host([_effective-position="bottom"][_visible]) .tooltip {
      transform: scale(1) translateX(-50%);
    }
    :host([_effective-position="bottom"]) .tooltip:not([style]) {
      transform: scale(0.92) translateX(-50%);
    }
    :host([_effective-position="bottom"]) .arrow {
      top: -4px;
      left: 50%;
      margin-left: -4px;
    }

    /* ── Left position ── */
    :host([_effective-position="left"]) .tooltip {
      right: 100%;
      top: 50%;
      transform-origin: right center;
      margin-right: 8px;
    }
    :host([_effective-position="left"][_visible]) .tooltip {
      transform: scale(1) translateY(-50%);
    }
    :host([_effective-position="left"]) .tooltip:not([style]) {
      transform: scale(0.92) translateY(-50%);
    }
    :host([_effective-position="left"]) .arrow {
      right: -4px;
      top: 50%;
      margin-top: -4px;
    }

    /* ── Right position ── */
    :host([_effective-position="right"]) .tooltip {
      left: 100%;
      top: 50%;
      transform-origin: left center;
      margin-left: 8px;
    }
    :host([_effective-position="right"][_visible]) .tooltip {
      transform: scale(1) translateY(-50%);
    }
    :host([_effective-position="right"]) .tooltip:not([style]) {
      transform: scale(0.92) translateY(-50%);
    }
    :host([_effective-position="right"]) .arrow {
      left: -4px;
      top: 50%;
      margin-top: -4px;
    }
  `;

  @property({ type: String }) content = '';
  @property({ type: String, reflect: true }) position: 'top' | 'bottom' | 'left' | 'right' = 'top';
  @property({ type: Number }) delay = 300;
  @property({ type: Boolean }) disabled = false;

  @property({ type: Boolean, reflect: true, attribute: '_visible' })
  private _visible = false;

  @state() private _closing = false;

  /** Effective position after viewport edge detection (may differ from `position` prop). */
  @property({ type: String, reflect: true, attribute: '_effective-position' })
  private _effectivePosition: 'top' | 'bottom' | 'left' | 'right' = 'top';

  private _showTimeout: ReturnType<typeof setTimeout> | null = null;
  private _hideTimeout: ReturnType<typeof setTimeout> | null = null;
  private _tooltipId = `tooltip-${Math.random().toString(36).slice(2, 9)}`;

  /** Check if the tooltip has rich slot content (named "content" slot). */
  private get _hasContent(): boolean {
    return !!this.content || !!this.querySelector('[slot="content"]');
  }

  /**
   * Adjusts the effective position based on viewport edge detection.
   * Called after the tooltip becomes visible so we can measure its bounding rect.
   */
  private _adjustPosition() {
    const tooltipEl = this.shadowRoot?.querySelector('.tooltip') as HTMLElement | null;
    if (!tooltipEl) return;

    const rect = tooltipEl.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    let adjusted = this.position;

    if (this.position === 'top' && rect.top < 0) {
      adjusted = 'bottom';
    } else if (this.position === 'bottom' && rect.bottom > vh) {
      adjusted = 'top';
    } else if (this.position === 'left' && rect.left < 0) {
      adjusted = 'right';
    } else if (this.position === 'right' && rect.right > vw) {
      adjusted = 'left';
    }

    if (adjusted !== this._effectivePosition) {
      this._effectivePosition = adjusted;
    }
  }

  private _show() {
    if (this.disabled || !this._hasContent) return;
    if (this._hideTimeout) {
      clearTimeout(this._hideTimeout);
      this._hideTimeout = null;
      this._closing = false;
    }
    // Reset effective position to the declared position before showing
    this._effectivePosition = this.position;
    this._showTimeout = setTimeout(() => {
      this._visible = true;
      // Adjust position after layout is calculated
      requestAnimationFrame(() => {
        this._adjustPosition();
      });
    }, this.delay);
  }

  private _hide() {
    if (this._showTimeout) {
      clearTimeout(this._showTimeout);
      this._showTimeout = null;
    }
    if (!this._visible) return;
    this._closing = true;
    this._hideTimeout = setTimeout(() => {
      this._closing = false;
      this._visible = false;
      // Reset effective position when hidden
      this._effectivePosition = this.position;
    }, 100);
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    if (this._showTimeout) {
      clearTimeout(this._showTimeout);
    }
    if (this._hideTimeout) {
      clearTimeout(this._hideTimeout);
    }
  }

  override render() {
    return html`
      <div
        class="trigger-wrap"
        @mouseenter="${this._show}"
        @mouseleave="${this._hide}"
        @focusin="${this._show}"
        @focusout="${this._hide}"
        aria-describedby="${this._tooltipId}"
      >
        <slot></slot>
      </div>
      <div
        class="tooltip ${this._closing ? 'closing' : ''}"
        id="${this._tooltipId}"
        role="tooltip"
        aria-hidden=${!this._visible ? 'true' : nothing}
      >
        <span class="arrow"></span>
        <span class="tooltip-content">
          <slot name="content">${this.content}</slot>
        </span>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cg-tooltip': CgTooltip;
  }
}
