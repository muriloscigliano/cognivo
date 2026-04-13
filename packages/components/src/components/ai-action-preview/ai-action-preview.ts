/**
 * @element ai-action-preview
 * Confirmation card for dangerous or irreversible AI actions with severity badge and optional countdown.
 *
 * @example
 * ```html
 * <ai-action-preview
 *   heading="Delete training data"
 *   severity="critical"
 *   .details=${{Dataset: 'prod-v2', Rows: '14,200'}}
 *   countdown="10"
 * ></ai-action-preview>
 * ```
 *
 * @fires {CustomEvent<{action: string, details: Record<string,string>}>} ai-action-confirm - User confirmed
 * @fires {CustomEvent<{action: string}>} ai-action-cancel - User cancelled
 *
 * @cssprop [--cg-brand-ai-accent=#dfff61] - Confirm button and focus ring color
 * @cssprop [--cg-red-400=#f87171] - Critical severity border and pulse
 */
import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { hostBlock, reducedMotion, pulseKeyframes, fadeSlideInKeyframes } from '../../styles/index.js';

type Severity = 'low' | 'medium' | 'high' | 'critical';

@customElement('ai-action-preview')
export class AiActionPreview extends LitElement {
  static override styles = [hostBlock, reducedMotion, pulseKeyframes, fadeSlideInKeyframes, css`
    :host {
      animation: fadeSlideIn var(--cg-motion-duration-normal) var(--cg-motion-easing-enter) both;
    }

    .card {
      background: var(--cg-color-surface-cards-background);
      border: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
      border-radius: var(--cg-border-radius-200);
      padding: var(--cg-spacing-16);
      position: relative;
      overflow: hidden;
    }
    .card.critical {
      border-color: var(--cg-color-status-error-text-default);
      animation: pulse-border 2s ease-in-out infinite;
    }

    /* ── Header ── */
    .header {
      display: flex;
      align-items: center;
      gap: var(--cg-spacing-8);
      margin-bottom: var(--cg-spacing-16);
    }
    .title {
      font-size: var(--cg-font-size-base);
      font-weight: var(--cg-font-weight-bold);
      color: var(--cg-color-surface-base-text);
      flex: 1;
    }

    /* ── Severity badge ── */
    .severity {
      display: inline-flex;
      align-items: center;
      gap: var(--cg-spacing-4);
      padding: var(--cg-spacing-2) var(--cg-spacing-8);
      border-radius: var(--cg-border-radius-full);
      font-size: var(--cg-font-size-xs);
      font-weight: var(--cg-font-weight-bold);
      text-transform: uppercase;
      letter-spacing: var(--cg-letter-spacing-wide);
    }
    .severity.low {
      background: var(--cg-color-status-success-background-default);
      color: var(--cg-color-status-success-text-default);
    }
    .severity.medium {
      background: var(--cg-color-status-warning-background-default);
      color: var(--cg-color-status-warning-text-default);
    }
    .severity.high {
      background: var(--cg-color-status-error-background-default);
      color: var(--cg-color-chart-5);
    }
    .severity.critical {
      background: var(--cg-color-status-error-background-default);
      color: var(--cg-color-status-error-text-default);
    }

    /* ── Description ── */
    .description {
      font-size: var(--cg-font-size-sm);
      color: var(--cg-color-input-text-placeholder);
      line-height: 1.5;
      margin-bottom: var(--cg-spacing-16);
    }

    /* ── Details key-value list ── */
    .details {
      display: flex;
      flex-direction: column;
      gap: var(--cg-spacing-8);
      margin-bottom: var(--cg-spacing-16);
      padding: var(--cg-spacing-12);
      background: var(--cg-color-surface-base-background);
      border-radius: var(--cg-border-radius-100);
    }
    .detail-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: var(--cg-font-size-sm);
    }
    .detail-key {
      color: var(--cg-color-input-text-placeholder);
      font-weight: var(--cg-font-weight-medium);
    }
    .detail-value {
      color: var(--cg-color-surface-base-text);
      font-weight: var(--cg-font-weight-semibold);
    }

    /* ── Countdown ── */
    .countdown {
      text-align: center;
      font-size: var(--cg-font-size-xs);
      color: var(--cg-color-input-text-placeholder);
      margin-bottom: var(--cg-spacing-12);
    }
    .countdown-num {
      font-weight: var(--cg-font-weight-bold);
      color: var(--cg-color-surface-base-text);
    }

    /* ── Actions ── */
    .actions {
      padding-top: var(--cg-spacing-12);
      border-top: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
      display: flex;
      gap: var(--cg-spacing-8);
    }
    button {
      flex: 1;
      padding: var(--cg-spacing-8) var(--cg-spacing-16);
      border-radius: var(--cg-border-radius-100);
      font-size: var(--cg-font-size-sm);
      font-weight: var(--cg-font-weight-semibold);
      cursor: pointer;
      transition: background var(--cg-motion-duration-fast) var(--cg-motion-easing-color),
                  color var(--cg-motion-duration-fast) var(--cg-motion-easing-color),
                  filter var(--cg-motion-duration-fast) var(--cg-motion-easing-color),
                  transform var(--cg-motion-duration-fast) var(--cg-motion-easing-color);
      border: none;
    }
    button:focus-visible {
      outline: none;
      box-shadow: 0 0 0 3px var(--cg-overlay-accent-strong);
    }
    button:active {
      transform: scale(0.97);
    }
    .btn-cancel {
      background: var(--cg-color-surface-container-background);
      color: var(--cg-color-surface-base-text);
      border: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
    }
    .btn-cancel:hover { background: var(--cg-color-surface-cards-border); }
    .btn-confirm {
      background: var(--cg-color-action-primary-background-default);
      color: var(--cg-color-surface-base-background);
    }
    .btn-confirm:hover { filter: brightness(0.9); }
    .btn-confirm.critical {
      background: var(--cg-color-status-error-text-default);
      color: var(--cg-color-surface-base-text);
    }

    @media (prefers-reduced-motion: reduce) {
      .card.critical { animation: none; }
    }

    @keyframes pulse-border {
      0%, 100% { border-color: var(--cg-color-status-error-text-default); }
      50% { border-color: var(--cg-color-status-error-border-default); }
    }
  `];
  @property({ type: String }) heading = '';
  @property({ type: String }) description = '';
  @property({ type: String }) action = '';
  @property({ type: String }) severity: Severity = 'low';
  @property({ attribute: false }) details: Record<string, string> = {};
  @property({ type: String }) confirmLabel = 'Confirm';
  @property({ type: String }) cancelLabel = 'Cancel';
  @property({ type: Number }) countdown = 0;

  @state() private _remaining = 0;
  private _timer?: ReturnType<typeof setInterval> | undefined;

  override connectedCallback() {
    super.connectedCallback();
    this._startCountdown();
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this._clearTimer();
  }

  override updated(changed: Map<string, unknown>) {
    if (changed.has('countdown')) this._startCountdown();
  }

  private _clearTimer() {
    if (this._timer !== undefined) { clearInterval(this._timer); this._timer = undefined; }
  }

  private _startCountdown() {
    this._clearTimer();
    if (this.countdown > 0) {
      this._remaining = this.countdown;
      this._timer = setInterval(() => {
        this._remaining--;
        if (this._remaining <= 0) {
          this._clearTimer();
          this._handleConfirm();
        }
      }, 1000);
    }
  }

  private _confirmed = false;

  private _handleConfirm() {
    if (this._confirmed) return; // Guard double-fire
    this._confirmed = true;
    this._clearTimer();
    this.dispatchEvent(new CustomEvent('ai-action-confirm', {
      bubbles: true, composed: true,
      detail: { action: this.action, details: this.details },
    }));
  }

  private _handleCancel() {
    this._clearTimer();
    this.dispatchEvent(new CustomEvent('ai-action-cancel', {
      bubbles: true, composed: true,
      detail: { action: this.action },
    }));
  }

  private _severityIcon(): string {
    const icons: Record<Severity, string> = {
      low: '\u2713', medium: '\u26A0', high: '\u26A0', critical: '\u2716',
    };
    return icons[this.severity];
  }

  override render() {
    const entries = Object.entries(this.details);
    return html`
      <div
        class="card ${this.severity === 'critical' ? 'critical' : ''}"
        role="alertdialog"
        aria-label="Action preview: ${this.heading}"
        tabindex="0"
      >
        <div class="header">
          <span class="title">${this.heading}</span>
          <span class="severity ${this.severity}" aria-label="Severity: ${this.severity}">
            <span aria-hidden="true">${this._severityIcon()}</span>
            ${this.severity}
          </span>
        </div>

        ${this.description ? html`<div class="description">${this.description}</div>` : nothing}

        ${entries.length > 0 ? html`
          <div class="details" role="list" aria-label="Action details">
            ${entries.map(([k, v]) => html`
              <div class="detail-row" role="listitem">
                <span class="detail-key">${k}</span>
                <span class="detail-value">${v}</span>
              </div>
            `)}
          </div>
        ` : nothing}

        ${this._remaining > 0 ? html`
          <div class="countdown" aria-live="polite">
            Auto-confirming in <span class="countdown-num">${this._remaining}s</span>
          </div>
        ` : nothing}

        <div class="actions">
          <button
            class="btn-cancel"
            @click=${this._handleCancel}
            aria-label="${this.cancelLabel}"
          >${this.cancelLabel}</button>
          <button
            class="btn-confirm ${this.severity === 'critical' ? 'critical' : ''}"
            @click=${this._handleConfirm}
            aria-label="${this.confirmLabel}"
          >${this.confirmLabel}</button>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ai-action-preview': AiActionPreview;
  }
}
