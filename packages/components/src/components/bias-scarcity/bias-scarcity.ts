import { LitElement, html, css, nothing, svg } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { hostBase, reducedMotion } from '../../styles/index.js';

/**
 * @element bias-scarcity
 * Urgency / scarcity indicator (time-based countdown, stock count, popularity).
 * Escalates visually when thresholds are crossed. Widely used by Booking,
 * Amazon, ticketing sites to trigger loss-aversion / FOMO.
 *
 * @example
 * ```html
 * <bias-scarcity type="stock" remaining="2" threshold="5" pulse></bias-scarcity>
 * <bias-scarcity type="time" deadline="2026-05-01T00:00:00Z"></bias-scarcity>
 * ```
 *
 * @cssprop --cg-component-bias-scarcity-radius
 * @cssprop --cg-component-bias-scarcity-padding
 */
@customElement('bias-scarcity')
export class BiasScarcity extends LitElement {
  static biasId = 'scarcity-bias' as const;

  static override styles = [hostBase, reducedMotion, css`
    :host { align-items: center; }

    .pill {
      display: inline-flex;
      align-items: center;
      gap: var(--cg-component-bias-scarcity-gap);
      padding: var(--cg-component-bias-scarcity-padding) var(--cg-spacing-12);
      border-radius: var(--cg-component-bias-scarcity-radius);
      font-size: var(--cg-font-size-sm);
      font-weight: var(--cg-font-weight-medium);
      background: var(--cg-color-status-info-background-default);
      color: var(--cg-color-status-info-text-default);
      border: var(--cg-border-width-50) solid var(--cg-color-status-info-border-default);
      transition: background-color var(--cg-transition-duration-fast) var(--cg-transition-easing-default), color var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
    }

    :host([data-critical]) .pill {
      background: var(--cg-color-status-error-background-default);
      color: var(--cg-color-status-error-text-default);
      border-color: var(--cg-color-status-error-border-default);
    }

    :host([data-warning]) .pill {
      background: var(--cg-color-status-warning-background-default);
      color: var(--cg-color-status-warning-text-default);
      border-color: var(--cg-color-status-warning-border-default);
    }

    .icon { width: var(--cg-icon-size-100); height: var(--cg-icon-size-100); flex-shrink: 0; }

    .dot {
      width: var(--cg-spacing-8);
      height: var(--cg-spacing-8);
      border-radius: var(--cg-border-radius-full);
      background: currentColor;
      flex-shrink: 0;
    }

    @keyframes biasScarcityPulse {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.55; transform: scale(1.25); }
    }
    :host([pulse]) .dot {
      animation: biasScarcityPulse 1.4s ease-in-out infinite;
    }
  `];

  @property() type: 'time' | 'stock' | 'popularity' = 'stock';
  @property() deadline = '';
  @property({ type: Number }) remaining = 0;
  @property({ type: Number }) threshold = 10;
  @property({ type: Boolean, reflect: true }) pulse = false;

  @state() private _label = '';

  private _timer = 0;

  override connectedCallback() {
    super.connectedCallback();
    this._tick();
    // Refresh every 30s for time-type countdowns — enough to keep "Ends in Xh Ym" live.
    this._timer = window.setInterval(() => this._tick(), 30_000);
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    if (this._timer) { clearInterval(this._timer); this._timer = 0; }
  }

  override updated(changed: Map<string, unknown>) {
    if (changed.has('type') || changed.has('deadline') || changed.has('remaining') || changed.has('threshold')) {
      this._tick();
    }
  }

  private _tick() {
    let critical = false;
    let warning = false;
    let label = '';

    if (this.type === 'time' && this.deadline) {
      const end = Date.parse(this.deadline);
      if (!Number.isNaN(end)) {
        const diff = end - Date.now();
        label = diff <= 0 ? 'Ended' : `Ends in ${this._formatDuration(diff)}`;
        critical = diff > 0 && diff < 3_600_000; // < 1h
        warning = diff >= 3_600_000 && diff < 24 * 3_600_000; // < 24h
      }
    } else if (this.type === 'stock') {
      label = `Only ${this.remaining} left`;
      critical = this.remaining > 0 && this.remaining < 3;
      warning = this.remaining >= 3 && this.remaining < this.threshold;
    } else if (this.type === 'popularity') {
      label = `Viewed ${this.remaining} times today`;
      warning = this.remaining >= this.threshold;
    }

    this.toggleAttribute('data-critical', critical);
    this.toggleAttribute('data-warning', warning && !critical);
    this._label = label;
  }

  private _formatDuration(ms: number): string {
    const totalMinutes = Math.floor(ms / 60_000);
    const days = Math.floor(totalMinutes / (60 * 24));
    const hours = Math.floor((totalMinutes - days * 60 * 24) / 60);
    const minutes = totalMinutes - days * 60 * 24 - hours * 60;
    if (days > 0) return `${days}d ${hours}h`;
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
  }

  override render() {
    const iconSvg = this.type === 'time'
      ? svg`<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"></circle><path d="M12 7v5l3 2"></path></svg>`
      : this.type === 'stock'
      ? svg`<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 7h16M4 7l2 12h12l2-12"></path></svg>`
      : svg`<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"></path><circle cx="12" cy="12" r="3"></circle></svg>`;

    return html`
      <span class="pill" role="status" aria-live=${this.type === 'time' ? 'polite' : 'off'} aria-label=${this._label}>
        ${this.pulse ? html`<span class="dot" aria-hidden="true"></span>` : iconSvg}
        <span class="text">${this._label}</span>
        <slot></slot>
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bias-scarcity': BiasScarcity;
  }
}
