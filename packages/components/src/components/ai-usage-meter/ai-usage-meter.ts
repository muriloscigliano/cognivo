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
      animation: fadeSlideIn var(--cg-motion-duration-fast, 200ms) var(--cg-motion-easing-color, cubic-bezier(0, 0, 0.58, 1));
    }
    :host([hidden]) { display: none; }

    .meter {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 12px;
      padding: 20px;
      background: var(--cg-color-bg-primary, #18181b);
      border: 1px solid var(--cg-color-border-primary, #27272a);
      border-radius: 16px;
      min-width: 180px;
      box-shadow: inset 0 1px 0 0 rgba(255, 255, 255, 0.05);
      background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0.03), transparent);
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
      stroke: var(--cg-color-border-primary, #3f3f46);
      stroke-width: 8;
    }

    .ring-fill {
      fill: none;
      stroke-width: 8;
      stroke-linecap: round;
      transition: stroke-dashoffset 500ms ease, stroke 300ms ease;
    }
    .ring-fill.normal  { stroke: var(--cg-brand-ai-accent, #dfff61); }
    .ring-fill.warning { stroke: #eab308; }
    .ring-fill.danger  { stroke: var(--cg-color-status-error-text-default, #ef4444); }

    .ring-text {
      position: absolute;
      inset: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    .pct {
      font-size: 22px;
      font-weight: 800;
      color: var(--cg-color-text-primary, #fafafa);
      font-variant-numeric: tabular-nums;
    }

    .pct-label {
      font-size: 10px;
      color: var(--cg-color-text-secondary, #a1a1aa);
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .info {
      text-align: center;
    }

    .label {
      color: var(--cg-color-text-primary, #fafafa);
      font-size: 14px;
      font-weight: 600;
      margin-bottom: 4px;
    }

    .detail {
      color: var(--cg-color-text-secondary, #a1a1aa);
      font-size: 12px;
      font-variant-numeric: tabular-nums;
    }

    .reset {
      color: var(--cg-color-text-secondary, #a1a1aa);
      font-size: 11px;
      margin-top: 2px;
    }

    .upgrade-btn {
      padding: 8px 20px;
      border-radius: 8px;
      border: none;
      background: var(--cg-brand-ai-accent, #dfff61);
      color: var(--cg-color-surface-container-background, #18181b);
      font-size: 13px;
      font-weight: 700;
      cursor: pointer;
      font-family: inherit;
      transition: filter 150ms ease;
    }
    .upgrade-btn:hover { filter: brightness(1.1); }
    .upgrade-btn:focus-visible {
      outline: 2px solid var(--cg-brand-ai-accent, #dfff61);
      outline-offset: 2px;
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
