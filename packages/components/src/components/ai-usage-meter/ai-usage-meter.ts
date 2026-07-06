/**
 * @element ai-usage-meter
 * Quota / rate-limit ring meter built from design-system primitives (cg-card, cg-text, cg-button).
 * Step color thresholds at 75% (warning) and 90% (danger), animated count-up on mount,
 * relative countdown for sub-24h resets, threshold-crossing aria-live announcements,
 * and a compact 24px chip variant for in-IDE/nav-bar usage indicators.
 *
 * @example
 * ```html
 * <ai-usage-meter used="8500" limit="10000" label="API Calls" unit="requests"
 *   reset-date="2026-05-01T00:00:00Z"></ai-usage-meter>
 * ```
 *
 * @prop {number} used - Current usage count
 * @prop {number} limit - Maximum quota (default 100)
 * @prop {string} label - Metric label (default 'Usage')
 * @prop {string} unit - Unit label (default 'requests')
 * @prop {string} resetDate - ISO date / human string for when quota resets
 * @prop {'default'|'compact'|'lg'} size - Layout variant (compact = 24px chip, lg = 144px hero ring)
 *
 * @slot cta - Override for the upgrade CTA (rendered only when usage ≥ 80%)
 *
 * @fires ai-usage-upgrade - Upgrade CTA clicked
 * @fires {CustomEvent<{tier: 'normal'|'warning'|'danger'}>} ai-usage-threshold - Crossed a threshold
 */
import { LitElement, html, css, nothing } from 'lit';
import { property, state, customElement } from 'lit/decorators.js';
import { hostBase, reducedMotion, fadeSlideInKeyframes } from '../../styles/index.js';
import '../cg-card/cg-card.js';
import '../cg-text/cg-text.js';
import '../cg-button/cg-button.js';

type Tier = 'normal' | 'warning' | 'danger';

@customElement('ai-usage-meter')
export class AiUsageMeter extends LitElement {
  static override styles = [hostBase, reducedMotion, fadeSlideInKeyframes, css`
    :host {
      animation: fadeSlideIn var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
      display: inline-block;
    }
    :host([hidden]) { display: none; }

    /* ── Default layout: ring centered, info + CTA below ── */
    .meter {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--cg-spacing-12);
      min-width: var(--cg-spacing-192);
    }

    .ring-wrapper {
      position: relative;
      width: var(--cg-spacing-96);
      height: var(--cg-spacing-96);
    }
    svg.ring {
      transform: rotate(-90deg);
      width: 100%;
      height: 100%;
      overflow: visible; /* allow danger pulse glow to extend past viewBox */
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
      transition:
        stroke-dashoffset var(--cg-transition-duration-slow) var(--cg-transition-easing-ease-out),
        stroke var(--cg-transition-duration-slow) var(--cg-transition-easing-default);
    }
    .ring-fill.normal  { stroke: var(--cg-color-action-primary-background-default); }
    .ring-fill.warning { stroke: var(--cg-color-status-warning-text-default); }
    .ring-fill.danger  { stroke: var(--cg-color-status-error-text-default); }

    /* Pulse on danger tier (>90% usage) — subtle attention draw */
    @keyframes usage-pulse {
      0%, 100% { filter: drop-shadow(0 0 0 transparent); opacity: 1; }
      50%      { filter: drop-shadow(0 0 var(--cg-spacing-8) var(--cg-color-status-error-text-default)); opacity: 0.85; }
    }
    .ring-fill.danger {
      animation: usage-pulse 2s var(--cg-transition-easing-ease-out) infinite;
    }

    .ring-text {
      position: absolute;
      inset: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: var(--cg-spacing-2);
    }

    .info {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      gap: var(--cg-spacing-4);
    }

    .cta-wrap { width: 100%; display: flex; justify-content: center; }

    /* ── Compact variant: 24px chip for nav-bars / IDE status bars ── */
    :host([size="compact"]) .meter {
      flex-direction: row;
      gap: var(--cg-spacing-8);
      min-width: 0;
      align-items: center;
    }
    :host([size="compact"]) .ring-wrapper {
      width: var(--cg-spacing-24);
      height: var(--cg-spacing-24);
    }
    :host([size="compact"]) .ring-bg,
    :host([size="compact"]) .ring-fill { stroke-width: 3; }
    :host([size="compact"]) .ring-text,
    :host([size="compact"]) .info,
    :host([size="compact"]) .cta-wrap { display: none; }

    /* ── Large variant: 144px hero ring for billing/quota pages ── */
    :host([size="lg"]) .ring-wrapper {
      width: var(--cg-spacing-128);
      height: var(--cg-spacing-128);
    }
    :host([size="lg"]) .ring-bg,
    :host([size="lg"]) .ring-fill { stroke-width: 6; }
    :host([size="lg"]) .meter { min-width: var(--cg-spacing-256); gap: var(--cg-spacing-16); }

    /* sr-only live region */
    .sr-only {
      position: absolute;
      width: 1px; height: 1px;
      padding: 0; margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border: 0;
    }
  `];

  @property({ type: Number }) used = 0;
  @property({ type: Number }) limit = 100;
  @property({ type: String }) label = 'Usage';
  @property({ type: String }) unit = 'requests';
  @property({ type: String, attribute: 'reset-date' }) resetDate = '';
  @property({ reflect: true }) size: 'default' | 'compact' | 'lg' = 'default';

  @state() private _animatedPct = 0;
  @state() private _animatedUsed = 0;
  @state() private _resetText = '';
  @state() private _announcement = '';

  private _lastTier: Tier | null = null;
  private _animFrame: number | null = null;
  private _countdownInterval: number | null = null;

  override connectedCallback() {
    super.connectedCallback();
    this._startCountUp();
    this._updateResetText();
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    if (this._animFrame) cancelAnimationFrame(this._animFrame);
    if (this._countdownInterval) clearInterval(this._countdownInterval);
  }

  override updated(changed: Map<string, unknown>) {
    if (changed.has('used') || changed.has('limit')) {
      this._startCountUp();
      this._maybeAnnounceThreshold();
    }
    if (changed.has('resetDate')) {
      this._updateResetText();
    }
  }

  private _startCountUp() {
    if (this._animFrame) cancelAnimationFrame(this._animFrame);
    const targetPct = this._targetPct();
    const targetUsed = this.used;
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      this._animatedPct = targetPct;
      this._animatedUsed = targetUsed;
      return;
    }
    const duration = 700;
    const startPct = this._animatedPct;
    const startUsed = this._animatedUsed;
    const start = performance.now();
    const ease = (t: number) => 1 - Math.pow(1 - t, 3);
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const k = ease(t);
      this._animatedPct = startPct + (targetPct - startPct) * k;
      this._animatedUsed = Math.round(startUsed + (targetUsed - startUsed) * k);
      if (t < 1) this._animFrame = requestAnimationFrame(tick);
    };
    this._animFrame = requestAnimationFrame(tick);
  }

  private _targetPct(): number {
    return this.limit > 0 ? Math.min(100, (this.used / this.limit) * 100) : 0;
  }

  private _tier(pct: number): Tier {
    if (pct >= 90) return 'danger';
    if (pct >= 75) return 'warning';
    return 'normal';
  }

  private _maybeAnnounceThreshold() {
    const tier = this._tier(this._targetPct());
    if (this._lastTier && tier !== this._lastTier) {
      const msg: Record<Tier, string> = {
        normal: `${this.label} usage back below 75%.`,
        warning: `${this.label} usage above 75%.`,
        danger: `${this.label} usage above 90% — approaching limit.`,
      };
      this._announcement = msg[tier];
      this.dispatchEvent(new CustomEvent('ai-usage-threshold', {
        detail: { tier },
        bubbles: true, composed: true,
      }));
    }
    this._lastTier = tier;
  }

  private _updateResetText() {
    if (this._countdownInterval) {
      clearInterval(this._countdownInterval);
      this._countdownInterval = null;
    }
    if (!this.resetDate) {
      this._resetText = '';
      return;
    }
    const ts = Date.parse(this.resetDate);
    if (Number.isNaN(ts)) {
      this._resetText = `Resets ${this.resetDate}`;
      return;
    }
    const tick = () => {
      const diffMs = ts - Date.now();
      if (diffMs <= 0) {
        this._resetText = 'Resetting…';
        return;
      }
      const oneDay = 24 * 60 * 60 * 1000;
      if (diffMs >= oneDay) {
        this._resetText = `Resets ${new Date(ts).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}`;
      } else {
        const h = Math.floor(diffMs / 3600000);
        const m = Math.floor((diffMs % 3600000) / 60000);
        this._resetText = h > 0 ? `Resets in ${h}h ${m}m` : `Resets in ${m}m`;
      }
    };
    tick();
    if (ts - Date.now() < 24 * 60 * 60 * 1000) {
      this._countdownInterval = window.setInterval(tick, 30000);
    }
  }

  private _emit(name: string) {
    this.dispatchEvent(new CustomEvent(name, { bubbles: true, composed: true }));
  }

  override render() {
    const targetPct = this._targetPct();
    const displayPct = Math.round(this._animatedPct);
    const tier = this._tier(targetPct);
    const radius = 42;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (this._animatedPct / 100) * circumference;
    const valueText = `${this.used.toLocaleString()} of ${this.limit.toLocaleString()} ${this.unit}, ${Math.round(targetPct)} percent`;
    const showCta = targetPct >= 80;

    const ring = html`
      <div class="ring-wrapper"
        role="progressbar"
        aria-label="${this.label}"
        aria-valuemin="0"
        aria-valuemax=${Math.max(this.limit, this.used, 1)}
        aria-valuenow=${this.used}
        aria-valuetext=${valueText}
      >
        <svg class="ring" viewBox="0 0 100 100" aria-hidden="true">
          <circle class="ring-bg" cx="50" cy="50" r=${radius} />
          <circle
            class="ring-fill ${tier}"
            cx="50" cy="50" r=${radius}
            stroke-dasharray=${circumference}
            stroke-dashoffset=${offset}
          />
        </svg>
        <div class="ring-text">
          <cg-text size="${this.size === 'lg' ? '2xl' : 'xl'}" weight="bold">${displayPct}%</cg-text>
          <cg-text size="xs" color="muted" style="text-transform:uppercase;letter-spacing:var(--cg-letter-spacing-wide);">used</cg-text>
        </div>
      </div>
    `;

    const meterBody = html`
      <div class="sr-only" aria-live="polite" aria-atomic="true">${this._announcement}</div>
      <div class="meter">
        ${ring}
        <div class="info">
          <cg-text size="sm" weight="semibold">${this.label}</cg-text>
          <cg-text size="xs" color="muted">${this._animatedUsed.toLocaleString()} / ${this.limit.toLocaleString()} ${this.unit}</cg-text>
          ${this._resetText ? html`<cg-text size="xs" color="muted">${this._resetText}</cg-text>` : nothing}
        </div>
        ${showCta ? html`
          <div class="cta-wrap">
            <slot name="cta">
              <cg-button variant="primary" size="sm" @click=${() => this._emit('ai-usage-upgrade')}>
                Upgrade Plan
              </cg-button>
            </slot>
          </div>
        ` : nothing}
      </div>
    `;

    if (this.size === 'compact') {
      return html`${meterBody}`;
    }

    // Use cg-card with design-system defaults (variant="elevated", padding="md",
    // rounded="lg" all resolve to the cg-card defaults). This gives the standard
    // surface-cards-background + elevation-1 shadow + radius-200 from the system.
    return html`
      <cg-card>
        ${meterBody}
      </cg-card>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ai-usage-meter': AiUsageMeter;
  }
}
