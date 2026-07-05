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
 * @cssprop --cg-color-action-primary-background-default - Confirm button fill
 * @cssprop --cg-color-status-error-text-default - Critical border, pulse, and critical confirm fill
 */
import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { hostBlock, reducedMotion, pulseKeyframes, fadeSlideInKeyframes } from '../../styles/index.js';

type Severity = 'low' | 'medium' | 'high' | 'critical';

@customElement('ai-action-preview')
export class AiActionPreview extends LitElement {
  static override styles = [hostBlock, reducedMotion, pulseKeyframes, fadeSlideInKeyframes, css`
    :host {
      animation: fadeSlideIn var(--cg-transition-duration-default) var(--cg-transition-easing-ease-out) both;
    }

    .card {
      background: var(--cg-color-surface-cards-background);
      border: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
      border-radius: var(--cg-component-card-radius);
      padding: var(--cg-component-card-padding-md);
      position: relative;
      overflow: hidden;
    }
    .card.critical {
      border-color: var(--cg-color-status-error-text-default);
      animation: pulse-border var(--cg-transition-duration-slow) var(--cg-transition-easing-ease-in-out) infinite;
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
      color: var(--cg-color-status-error-text-default);
    }
    .severity.critical {
      background: var(--cg-color-status-error-text-default);
      color: var(--cg-color-status-error-text-inverse);
    }

    /* ── Description ── */
    .description {
      font-size: var(--cg-font-size-sm);
      color: var(--cg-color-input-text-placeholder);
      line-height: var(--cg-line-height-normal);
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
      min-height: var(--cg-component-button-height-md);
      padding: var(--cg-spacing-8) var(--cg-spacing-16);
      border-radius: var(--cg-component-button-radius-md);
      font-size: var(--cg-font-size-sm);
      font-weight: var(--cg-font-weight-semibold);
      cursor: pointer;
      transition: background var(--cg-transition-duration-fast) var(--cg-transition-easing-default),
                  color var(--cg-transition-duration-fast) var(--cg-transition-easing-default),
                  transform var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
      border: none;
    }
    button:focus-visible {
      outline: none;
      box-shadow: 0 0 0 var(--cg-focus-ring-offset) var(--cg-color-focus-ring-offset),
                  0 0 0 calc(var(--cg-focus-ring-offset) + var(--cg-focus-ring-width)) var(--cg-color-focus-ring);
    }
    button:active {
      transform: scale(var(--cg-interaction-press-scale));
    }
    button:disabled {
      cursor: not-allowed;
    }
    .btn-cancel {
      background: var(--cg-color-surface-container-background);
      color: var(--cg-color-surface-base-text);
      border: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
    }
    .btn-cancel:hover:not(:disabled) { background: var(--cg-color-surface-cards-hover-background); }
    .btn-cancel:disabled {
      background: var(--cg-color-surface-cards-disable-background);
      color: var(--cg-color-surface-cards-disable-text);
      border-color: var(--cg-color-surface-cards-disable-border);
    }
    .btn-confirm {
      background: var(--cg-color-action-primary-background-default);
      color: var(--cg-color-action-primary-text-default);
    }
    .btn-confirm:hover:not(:disabled) { background: var(--cg-color-action-primary-background-hover); }
    .btn-confirm.critical {
      background: var(--cg-color-status-error-text-default);
      color: var(--cg-color-status-error-text-inverse);
    }
    .btn-confirm.critical:hover:not(:disabled) { background: var(--cg-color-status-error-background-hover-strong); }
    .btn-confirm:disabled {
      background: var(--cg-color-action-primary-background-disable);
      color: var(--cg-color-action-primary-text-disable);
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
  @state() private _confirmed = false;
  private _timer?: ReturnType<typeof setInterval> | undefined;
  private _paused = false;

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
    this._paused = false;
    if (this.countdown > 0 && !this._confirmed) {
      this._remaining = this.countdown;
      this._startTicking();
    }
  }

  private _startTicking() {
    this._timer = setInterval(() => {
      this._remaining--;
      if (this._remaining <= 0) {
        this._clearTimer();
        this._handleConfirm();
      }
    }, 1000);
  }

  /** Pause the auto-confirm countdown while the user is engaging (WCAG 2.2.1). */
  private _pauseCountdown = () => {
    if (this._timer !== undefined) {
      this._clearTimer();
      this._paused = true;
    }
  };

  private _resumeCountdown = () => {
    if (this._paused && !this._confirmed && this._remaining > 0) {
      this._paused = false;
      this._startTicking();
    }
  };

  private _handleKeydown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') this._handleCancel();
  };

  protected override firstUpdated() {
    // alertdialog contract: place initial focus on the least-destructive action.
    this.renderRoot.querySelector<HTMLButtonElement>('.btn-cancel')?.focus();
  }

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
    if (this._confirmed) return; // Confirm already fired — don't emit contradictory events
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
        aria-labelledby="ap-title"
        aria-describedby="ap-desc"
        @keydown=${this._handleKeydown}
        @focusin=${this._pauseCountdown}
        @focusout=${this._resumeCountdown}
        @mouseenter=${this._pauseCountdown}
        @mouseleave=${this._resumeCountdown}
      >
        <div class="header">
          <span class="title" id="ap-title">${this.heading}</span>
          <span class="severity ${this.severity}" aria-label="Severity: ${this.severity}">
            <span aria-hidden="true">${this._severityIcon()}</span>
            ${this.severity}
          </span>
        </div>

        ${this.description ? html`<div class="description" id="ap-desc">${this.description}</div>` : nothing}

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
          <div class="countdown" role="timer" aria-label="Auto-confirm countdown">
            Auto-confirming in <span class="countdown-num">${this._remaining}s</span>
          </div>
        ` : nothing}

        <div class="actions">
          <button
            class="btn-cancel"
            @click=${this._handleCancel}
            ?disabled=${this._confirmed}
          >${this.cancelLabel}</button>
          <button
            class="btn-confirm ${this.severity === 'critical' ? 'critical' : ''}"
            @click=${this._handleConfirm}
            ?disabled=${this._confirmed}
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
