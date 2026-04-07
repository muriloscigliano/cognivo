/**
 * @element ai-usage-meter
 * Circular SVG progress ring displaying API usage against a quota limit.
 * Color shifts to warning (80%) and danger (95%) tiers. Shows an "Upgrade
 * Plan" button when usage exceeds 80%.
 *
 * @example
 * ```html
 * <ai-usage-meter used="8500" limit="10000" label="API Calls" unit="requests"
 *   reset-date="Apr 1"></ai-usage-meter>
 * ```
 *
 * @prop {number} used - Current usage count
 * @prop {number} limit - Maximum quota (default 100)
 * @prop {string} label - Metric label (default 'Usage')
 * @prop {string} unit - Unit label (default 'requests')
 * @prop {string} resetDate - When the quota resets (e.g. 'Apr 1')
 *
 * @fires ai-usage-upgrade - When the "Upgrade Plan" button is clicked
 */
import { LitElement, html, css, nothing } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { hostBase, reducedMotion, fadeSlideInKeyframes } from '../../styles/index.js';

@customElement('ai-usage-meter')
export class AiUsageMeter extends LitElement {
  static override styles = [hostBase, reducedMotion, fadeSlideInKeyframes, css`
    :host {
      animation: fadeSlideIn var(--cg-motion-duration-fast) var(--cg-motion-easing-color);
    }
    :host([hidden]) { display: none; }

    .meter {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--cg-spacing-12);
      padding: var(--cg-spacing-16);
      background: var(--cg-color-surface-base-background);
      border: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
      border-radius: var(--cg-border-radius-150);
      min-width: 180px;
    }

    .ring-wrapper {
      position: relative;
      width: 100px;
      height: 100px;
    }

    svg {
      transform: rotate(-90deg);
      width: 100px;
      height: 100px;
    }

    .ring-bg {
      fill: none;
      stroke: var(--cg-color-surface-cards-border);
      stroke-width: 8;
    }

    .ring-fill {
      fill: none;
      stroke-width: 8;
      stroke-linecap: round;
      transition: stroke-dashoffset var(--cg-motion-duration-slow) var(--cg-motion-easing-default), stroke var(--cg-motion-duration-slow) var(--cg-motion-easing-default);
    }
    .ring-fill.normal  { stroke: var(--cg-color-surface-base-text); }
    .ring-fill.warning { stroke: var(--cg-color-status-warning-text); }
    .ring-fill.danger  { stroke: var(--cg-color-status-error-text-default); }

    .ring-text {
      position: absolute;
      inset: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    .pct {
      font-size: var(--cg-font-size-xl);
      font-weight: var(--cg-font-weight-extrabold);
      color: var(--cg-color-surface-base-text);
      font-variant-numeric: tabular-nums;
    }

    .pct-label {
      font-size: var(--cg-font-size-xs);
      color: var(--cg-color-input-text-placeholder);
      text-transform: uppercase;
      letter-spacing: var(--cg-letter-spacing-wide);
    }

    .info {
      text-align: center;
    }

    .label {
      color: var(--cg-color-surface-base-text);
      font-size: var(--cg-font-size-sm);
      font-weight: var(--cg-font-weight-semibold);
      margin-bottom: var(--cg-spacing-4);
    }

    .detail {
      color: var(--cg-color-input-text-placeholder);
      font-size: var(--cg-font-size-xs);
      font-variant-numeric: tabular-nums;
    }

    .reset {
      color: var(--cg-color-input-text-placeholder);
      font-size: var(--cg-font-size-xs);
      margin-top: var(--cg-spacing-2);
    }

    .upgrade-btn {
      padding: var(--cg-spacing-8) var(--cg-spacing-16);
      border-radius: var(--cg-border-radius-100);
      border: none;
      background: var(--cg-color-action-primary-background-default);
      color: var(--cg-color-surface-container-background);
      font-size: var(--cg-font-size-sm);
      font-weight: var(--cg-font-weight-bold);
      cursor: pointer;
      font-family: inherit;
      transition: filter var(--cg-motion-duration-normal) var(--cg-motion-easing-default);
    }
    .upgrade-btn:hover { filter: brightness(1.1); }
    .upgrade-btn:active { transform: scale(var(--cg-interaction-press-scale)); }
    .upgrade-btn:focus-visible {
      outline: none;
      box-shadow: 0 0 0 3px var(--cg-overlay-accent-strong);
    }

  `];

  @property({ type: Number }) used = 0;
  @property({ type: Number }) limit = 100;
  @property({ type: String }) label = 'Usage';
  @property({ type: String }) unit = 'requests';
  @property({ type: String, attribute: 'reset-date' }) resetDate = '';

  private _emit(name: string) {
    this.dispatchEvent(new CustomEvent(name, { bubbles: true, composed: true }));
  }

  override render() {
    const pct = this.limit > 0 ? Math.min(100, Math.round((this.used / this.limit) * 100)) : 0;
    const tier = pct >= 95 ? 'danger' : pct >= 80 ? 'warning' : 'normal';
    const radius = 42;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (pct / 100) * circumference;

    return html`
      <div class="meter" role="meter" aria-label="${this.label}: ${pct}% used"
           aria-valuemin="0" aria-valuemax=${this.limit} aria-valuenow=${this.used}>
        <div class="ring-wrapper">
          <svg viewBox="0 0 100 100" aria-hidden="true">
            <circle class="ring-bg" cx="50" cy="50" r=${radius} />
            <circle
              class="ring-fill ${tier}"
              cx="50" cy="50" r=${radius}
              stroke-dasharray=${circumference}
              stroke-dashoffset=${offset}
            />
          </svg>
          <div class="ring-text">
            <span class="pct">${pct}%</span>
            <span class="pct-label">used</span>
          </div>
        </div>

        <div class="info">
          <div class="label">${this.label}</div>
          <div class="detail">${this.used.toLocaleString()} / ${this.limit.toLocaleString()} ${this.unit}</div>
          ${this.resetDate ? html`<div class="reset">Resets ${this.resetDate}</div>` : nothing}
        </div>

        ${pct >= 80 ? html`
          <button class="upgrade-btn" @click=${() => this._emit('ai-usage-upgrade')}>
            Upgrade Plan
          </button>
        ` : nothing}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ai-usage-meter': AiUsageMeter;
  }
}
