import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

/**
 * <cg-tooltip> — Hover/focus tooltip with arrow.
 *
 * Features:
 * - Shows on hover/focus after configurable delay
 * - CSS arrow pointing to trigger element
 * - Fade+scale animation (150ms)
 * - Positioned relative to trigger
 * - role="tooltip", auto-hides on mouse leave
 * - Wraps child content via slot
 * - prefers-reduced-motion support
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

    :host([_visible]) .tooltip {
      opacity: 1;
      transform: scale(1);
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
    :host([position="top"]) .tooltip {
      bottom: 100%;
      left: 50%;
      transform-origin: bottom center;
      margin-bottom: 8px;
    }
    :host([position="top"][_visible]) .tooltip {
      transform: scale(1) translateX(-50%);
    }
    :host([position="top"]) .tooltip:not([style]) {
      transform: scale(0.92) translateX(-50%);
    }
    :host([position="top"]) .arrow {
      bottom: -4px;
      left: 50%;
      margin-left: -4px;
    }

    /* ── Bottom position ── */
    :host([position="bottom"]) .tooltip {
      top: 100%;
      left: 50%;
      transform-origin: top center;
      margin-top: 8px;
    }
    :host([position="bottom"][_visible]) .tooltip {
      transform: scale(1) translateX(-50%);
    }
    :host([position="bottom"]) .tooltip:not([style]) {
      transform: scale(0.92) translateX(-50%);
    }
    :host([position="bottom"]) .arrow {
      top: -4px;
      left: 50%;
      margin-left: -4px;
    }

    /* ── Left position ── */
    :host([position="left"]) .tooltip {
      right: 100%;
      top: 50%;
      transform-origin: right center;
      margin-right: 8px;
    }
    :host([position="left"][_visible]) .tooltip {
      transform: scale(1) translateY(-50%);
    }
    :host([position="left"]) .tooltip:not([style]) {
      transform: scale(0.92) translateY(-50%);
    }
    :host([position="left"]) .arrow {
      right: -4px;
      top: 50%;
      margin-top: -4px;
    }

    /* ── Right position ── */
    :host([position="right"]) .tooltip {
      left: 100%;
      top: 50%;
      transform-origin: left center;
      margin-left: 8px;
    }
    :host([position="right"][_visible]) .tooltip {
      transform: scale(1) translateY(-50%);
    }
    :host([position="right"]) .tooltip:not([style]) {
      transform: scale(0.92) translateY(-50%);
    }
    :host([position="right"]) .arrow {
      left: -4px;
      top: 50%;
      margin-top: -4px;
    }
  `;

  @property({ type: String }) content = '';
  @property({ type: String, reflect: true }) position: 'top' | 'bottom' | 'left' | 'right' = 'top';
  @property({ type: Number }) delay = 300;
  @property({ type: Boolean }) disabled = false;

  @state()
  @property({ type: Boolean, reflect: true, attribute: '_visible' })
  private _visible = false;

  private _showTimeout: ReturnType<typeof setTimeout> | null = null;
  private _tooltipId = `tooltip-${Math.random().toString(36).slice(2, 9)}`;

  private _show() {
    if (this.disabled || !this.content) return;
    this._showTimeout = setTimeout(() => {
      this._visible = true;
    }, this.delay);
  }

  private _hide() {
    if (this._showTimeout) {
      clearTimeout(this._showTimeout);
      this._showTimeout = null;
    }
    this._visible = false;
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    if (this._showTimeout) {
      clearTimeout(this._showTimeout);
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
        class="tooltip"
        id="${this._tooltipId}"
        role="tooltip"
        aria-hidden="${!this._visible}"
      >
        <span class="arrow"></span>
        ${this.content}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cg-tooltip': CgTooltip;
  }
}
