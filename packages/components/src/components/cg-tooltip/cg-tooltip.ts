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
 * @cssprop --cg-color-tooltip-background - Tooltip background
 * @cssprop --cg-font-size-xs - Tooltip font size (12px)
 * @cssprop --cg-component-tooltip-radius - Tooltip border radius
 * @cssprop --cg-transition-duration-slow - Fade+scale animation duration (250ms)
 */
@customElement('cg-tooltip')
export class CgTooltip extends LitElement {
  static override styles = css`
    :host {
      transition: color var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
      display: inline-block;
      position: relative;
      font-family: var(--cg-font-family-primary);
    }

    .trigger-wrap {
      display: inline-flex;
    }

    .tooltip {
      position: absolute;
      z-index: 10000;
      padding: var(--cg-spacing-6) var(--cg-spacing-12);
      background: var(--cg-color-tooltip-background);
      color: var(--cg-color-tooltip-text);
      font-size: var(--cg-font-size-xs);
      font-weight: var(--cg-font-weight-medium);
      line-height: var(--cg-line-height-snug);
      border-radius: var(--cg-component-tooltip-radius);
      border: var(--cg-border-width-50) solid var(--cg-color-surface-tooltip-border);
      white-space: nowrap;
      max-width: 280px;
      pointer-events: none;

      /* Animation — fade+scale with pop */
      opacity: 0;
      transform: scale(0.92);
      transition:
        opacity var(--cg-transition-duration-fast) var(--cg-transition-easing-default),
        transform var(--cg-transition-duration-slow) cubic-bezier(0.34, 1.56, 0.64, 1);
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
      animation: tooltip-exit var(--cg-transition-duration-fast) var(--cg-transition-easing-ease-in) forwards;
    }

    @media (prefers-reduced-motion: reduce) {
      .tooltip {
        transition: opacity var(--cg-transition-duration-fast) ease;
        transform: scale(1) !important;
      }
    }

    /* ── Arrow ── */
    .arrow {
      position: absolute;
      width: var(--cg-spacing-8);
      height: var(--cg-spacing-8);
      background: var(--cg-color-tooltip-arrow);
      transform: rotate(45deg);
    }

    /* ── Top position (default) ── */
    :host([_effective-position="top"]) .tooltip {
      bottom: 100%;
      left: 50%;
      transform-origin: bottom center;
      margin-bottom: var(--cg-spacing-8);
    }
    :host([_effective-position="top"][_visible]) .tooltip {
      transform: scale(1) translateX(-50%);
    }
    :host([_effective-position="top"]) .tooltip:not([style]) {
      transform: scale(0.92) translateX(-50%);
    }
    :host([_effective-position="top"]) .arrow {
      bottom: calc(var(--cg-spacing-4) * -1);
      left: 50%;
      margin-left: calc(var(--cg-spacing-4) * -1);
    }

    /* ── Bottom position ── */
    :host([_effective-position="bottom"]) .tooltip {
      top: 100%;
      left: 50%;
      transform-origin: top center;
      margin-top: var(--cg-spacing-8);
    }
    :host([_effective-position="bottom"][_visible]) .tooltip {
      transform: scale(1) translateX(-50%);
    }
    :host([_effective-position="bottom"]) .tooltip:not([style]) {
      transform: scale(0.92) translateX(-50%);
    }
    :host([_effective-position="bottom"]) .arrow {
      top: calc(var(--cg-spacing-4) * -1);
      left: 50%;
      margin-left: calc(var(--cg-spacing-4) * -1);
    }

    /* ── Left position ── */
    :host([_effective-position="left"]) .tooltip {
      right: 100%;
      top: 50%;
      transform-origin: right center;
      margin-right: var(--cg-spacing-8);
    }
    :host([_effective-position="left"][_visible]) .tooltip {
      transform: scale(1) translateY(-50%);
    }
    :host([_effective-position="left"]) .tooltip:not([style]) {
      transform: scale(0.92) translateY(-50%);
    }
    :host([_effective-position="left"]) .arrow {
      right: calc(var(--cg-spacing-4) * -1);
      top: 50%;
      margin-top: calc(var(--cg-spacing-4) * -1);
    }

    /* ── Right position ── */
    :host([_effective-position="right"]) .tooltip {
      left: 100%;
      top: 50%;
      transform-origin: left center;
      margin-left: var(--cg-spacing-8);
    }
    :host([_effective-position="right"][_visible]) .tooltip {
      transform: scale(1) translateY(-50%);
    }
    :host([_effective-position="right"]) .tooltip:not([style]) {
      transform: scale(0.92) translateY(-50%);
    }
    :host([_effective-position="right"]) .arrow {
      left: calc(var(--cg-spacing-4) * -1);
      top: 50%;
      margin-top: calc(var(--cg-spacing-4) * -1);
    }

    /* ── Variant: error ── */
    :host([variant="error"]) .tooltip {
      background: var(--cg-color-status-error-background-default);
      border: var(--cg-border-width-50) solid var(--cg-color-status-error-border-default);
      color: var(--cg-color-status-error-text-default);
    }
    :host([variant="error"]) .arrow {
      background: var(--cg-color-status-error-background-default);
    }

    /* ── Variant: success ── */
    :host([variant="success"]) .tooltip {
      background: var(--cg-color-status-success-background-default);
      border: var(--cg-border-width-50) solid var(--cg-color-status-success-border-default);
      color: var(--cg-color-status-success-text-default);
    }
    :host([variant="success"]) .arrow {
      background: var(--cg-color-status-success-background-default);
    }

    /* Rounded variants */
    :host([rounded="none"]) .tooltip { border-radius: 0; }
    :host([rounded="sm"]) .tooltip { border-radius: var(--cg-border-radius-50); }
    :host([rounded="md"]) .tooltip { border-radius: var(--cg-component-tooltip-radius); }
    :host([rounded="lg"]) .tooltip { border-radius: var(--cg-border-radius-150); }
    :host([rounded="full"]) .tooltip { border-radius: var(--cg-border-radius-full); }
  `;

  @property({ type: String }) content = '';
  @property({ reflect: true }) rounded: 'none' | 'sm' | 'md' | 'lg' | 'full' = 'md';
  @property({ type: String, reflect: true }) variant: 'default' | 'error' | 'success' = 'default';
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
  private _escapeHandler = this._handleEscape.bind(this);

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
      document.addEventListener('keydown', this._escapeHandler);
      // Adjust position after layout is calculated
      requestAnimationFrame(() => {
        this._adjustPosition();
      });
    }, this.delay);
  }

  private _handleEscape(e: KeyboardEvent) {
    if (e.key === 'Escape') {
      this._hide();
    }
  }

  private _hide() {
    if (this._showTimeout) {
      clearTimeout(this._showTimeout);
      this._showTimeout = null;
    }
    if (!this._visible) return;
    document.removeEventListener('keydown', this._escapeHandler);
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
    document.removeEventListener('keydown', this._escapeHandler);
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
