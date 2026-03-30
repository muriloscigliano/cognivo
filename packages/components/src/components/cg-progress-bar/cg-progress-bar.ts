import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { hostBlock, reducedMotion } from '../../styles/index.js';

/**
 * <cg-progress-bar> — Linear progress bar with label.
 *
 * Features:
 * - Smooth width transition on value change
 * - Indeterminate animation (sliding gradient)
 * - Color variants (default, success, warning, danger)
 * - Size variants (sm, md, lg)
 * - Optional label + percentage display
 * - Striped pattern + animated stripes
 * - ARIA progressbar role
 * - prefers-reduced-motion support
 */
@customElement('cg-progress-bar')
export class CgProgressBar extends LitElement {
  static override styles = [hostBlock, reducedMotion, css`
    :host {
      width: 100%;
    }

    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: var(--cg-spacing-4, 4px);
    }

    .label {
      font-size: var(--cg-font-size-xs, 12px);
      font-weight: var(--cg-font-weight-medium, 500);
      color: var(--cg-color-text-secondary, #a1a1aa);
      line-height: 1.4;
    }

    .value-text {
      font-size: var(--cg-font-size-xs, 12px);
      font-weight: var(--cg-font-weight-semibold, 600);
      color: var(--cg-color-text-primary, #fafafa);
      font-variant-numeric: tabular-nums;
    }

    /* ── Track ── */
    .track {
      width: 100%;
      background: var(--cg-color-surface-base-border, #27272a);
      border-radius: 999px;
      overflow: hidden;
      position: relative;
    }

    /* Sizes */
    :host([size="sm"]) .track { height: 4px; }
    :host([size="md"]) .track { height: 8px; }
    :host([size="lg"]) .track { height: 12px; }

    /* ── Fill bar ── */
    .fill {
      height: 100%;
      border-radius: 999px;
      transition: width var(--cg-motion-duration-slow, 500ms) var(--cg-motion-easing-default, cubic-bezier(0.4, 0, 0.2, 1));
      position: relative;
      overflow: hidden;
    }
    }

    /* ── Variant colors ── */
    :host([variant="default"]) .fill {
      background: var(--cg-brand-ai-accent, #dfff61);
    }
    :host([variant="success"]) .fill {
      background: var(--cg-color-status-success-text-default, #22c55e);
    }
    :host([variant="warning"]) .fill {
      background: var(--cg-color-status-warning-text-default, #f59e0b);
    }
    :host([variant="danger"]) .fill {
      background: var(--cg-color-status-error-text-default, #ef4444);
    }

    /* ── Striped pattern ── */
    :host([striped]) .fill::after {
      content: '';
      position: absolute;
      inset: 0;
      background-image: linear-gradient(
        45deg,
        rgba(255, 255, 255, 0.15) 25%,
        transparent 25%,
        transparent 50%,
        rgba(255, 255, 255, 0.15) 50%,
        rgba(255, 255, 255, 0.15) 75%,
        transparent 75%,
        transparent
      );
      background-size: 20px 20px;
    }

    /* ── Animated stripes ── */
    :host([animated]) .fill::after {
      animation: stripe-move 1s linear infinite;
    }
    }

    @keyframes stripe-move {
      from { background-position: 0 0; }
      to { background-position: 20px 0; }
    }

    /* ── Indeterminate ── */
    :host([indeterminate]) .fill {
      width: 40% !important;
      animation: indeterminate-slide 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    }
    }

    @keyframes indeterminate-slide {
      0% { transform: translateX(-100%); }
      50% { transform: translateX(150%); }
      100% { transform: translateX(-100%); }
    }

    @keyframes indeterminate-pulse {
      0%, 100% { opacity: 0.4; }
      50% { opacity: 1; }
    }
  `];

  @property({ type: Number }) value = 0;
  @property({ type: String }) label = '';
  @property({ type: Boolean }) showValue = false;
  @property({ type: String, reflect: true }) variant: 'default' | 'success' | 'warning' | 'danger' = 'default';
  @property({ type: Boolean, reflect: true }) indeterminate = false;
  @property({ type: String, reflect: true }) size: 'sm' | 'md' | 'lg' = 'md';
  @property({ type: Boolean, reflect: true }) striped = false;
  @property({ type: Boolean, reflect: true }) animated = false;

  private get _clampedValue(): number {
    return Math.max(0, Math.min(100, this.value));
  }

  override render() {
    const showHeader = this.label || (this.showValue && !this.indeterminate);

    return html`
      ${showHeader ? html`
        <div class="header">
          ${this.label ? html`<span class="label">${this.label}</span>` : nothing}
          ${this.showValue && !this.indeterminate ? html`
            <span class="value-text">${this._clampedValue}%</span>
          ` : nothing}
        </div>
      ` : nothing}
      <div
        class="track"
        role="progressbar"
        aria-valuenow="${this.indeterminate ? nothing : this._clampedValue}"
        aria-valuemin="0"
        aria-valuemax="100"
        aria-label="${this.label || 'Progress'}"
        aria-busy="${this.indeterminate}"
      >
        <div
          class="fill"
          style="${this.indeterminate ? '' : `width: ${this._clampedValue}%`}"
        ></div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cg-progress-bar': CgProgressBar;
  }
}
