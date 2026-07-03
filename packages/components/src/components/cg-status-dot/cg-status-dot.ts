import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { hostBase, reducedMotion } from '../../styles/index.js';

export type CgStatusDotStatus =
  | 'online' | 'away' | 'busy' | 'offline'
  | 'success' | 'warning' | 'error' | 'info' | 'neutral';

/**
 * @element cg-status-dot
 * A small colored dot indicating status/presence, with an optional pulse
 * animation and accessible label.
 *
 * @example
 * ```html
 * <cg-status-dot status="online" label="Online"></cg-status-dot>
 * ```
 *
 * @example Decorative dot next to text
 * ```html
 * <cg-status-dot status="busy" pulse></cg-status-dot> <span>Busy</span>
 * ```
 */
@customElement('cg-status-dot')
export class CgStatusDot extends LitElement {
  static override styles = [hostBase, reducedMotion, css`
    :host {
      display: inline-block;
      vertical-align: middle;
      line-height: 0;
    }

    .dot {
      display: inline-block;
      width: var(--_cg-dot-size, 8px);
      height: var(--_cg-dot-size, 8px);
      border-radius: var(--cg-border-radius-full);
      background: var(--_cg-dot-color, var(--cg-color-surface-base-icon));
      position: relative;
    }

    /* Sizes */
    :host([size="sm"]) .dot { --_cg-dot-size: var(--cg-spacing-6); }
    :host([size="md"]) .dot { --_cg-dot-size: var(--cg-spacing-8); }
    :host([size="lg"]) .dot { --_cg-dot-size: var(--cg-spacing-12); }

    /* Status → semantic color */
    :host([status="online"]) .dot,
    :host([status="success"]) .dot { --_cg-dot-color: var(--cg-color-status-success-text-default); }
    :host([status="away"]) .dot,
    :host([status="warning"]) .dot { --_cg-dot-color: var(--cg-color-status-warning-text-default); }
    :host([status="busy"]) .dot,
    :host([status="error"]) .dot { --_cg-dot-color: var(--cg-color-status-error-text-default); }
    :host([status="info"]) .dot { --_cg-dot-color: var(--cg-color-status-info-text-default); }
    :host([status="offline"]) .dot,
    :host([status="neutral"]) .dot { --_cg-dot-color: var(--cg-color-surface-base-icon); }

    /* Pulse ring */
    :host([pulse]) .dot::after {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: var(--cg-border-radius-full);
      background: inherit;
      animation: cg-dot-pulse var(--cg-transition-duration-slow) var(--cg-transition-easing-default) infinite;
    }

    @keyframes cg-dot-pulse {
      0% { transform: scale(1); opacity: 0.6; }
      100% { transform: scale(2.4); opacity: 0; }
    }
  `];

  @property({ reflect: true }) status: CgStatusDotStatus = 'neutral';
  @property({ reflect: true }) size: 'sm' | 'md' | 'lg' = 'md';
  @property({ type: Boolean, reflect: true }) pulse = false;
  @property() label = '';

  override render() {
    return html`
      <span
        class="dot"
        role=${this.label ? 'status' : nothing}
        aria-label=${this.label || nothing}
        aria-hidden=${this.label ? nothing : 'true'}
      ></span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cg-status-dot': CgStatusDot;
  }
}
