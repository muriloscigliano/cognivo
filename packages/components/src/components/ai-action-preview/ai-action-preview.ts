/**
 * <ai-action-preview> — Confirmation card before executing an AI action.
 *
 * Shows title, severity badge, key-value details, and confirm/cancel
 * buttons. Optional countdown timer for auto-confirm. Pulse animation
 * for critical severity.
 */
import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

type Severity = 'low' | 'medium' | 'high' | 'critical';

@customElement('ai-action-preview')
export class AiActionPreview extends LitElement {
  static override styles = css`
    :host {
      display: block;
      font-family: var(--cg-font-family-primary, 'Inter Variable', 'Inter', -apple-system, sans-serif);
    }

    .card {
      background: var(--cg-color-surface-cards-background, #18181b);
      border: 1px solid var(--cg-color-surface-cards-border, #27272a);
      border-radius: var(--cg-border-radius-200, 12px);
      padding: 20px;
      position: relative;
      overflow: hidden;
    }
    .card.critical {
      border-color: var(--cg-red-400, #f87171);
      animation: pulse-border 2s ease-in-out infinite;
    }

    /* ── Header ── */
    .header {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 16px;
    }
    .title {
      font-size: 16px;
      font-weight: 700;
      color: var(--cg-color-surface-base-text, #fafafa);
      flex: 1;
    }

    /* ── Severity badge ── */
    .severity {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 3px 10px;
      border-radius: 99px;
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }
    .severity.low {
      background: rgba(34, 197, 94, 0.12);
      color: var(--cg-green-400, #4ade80);
    }
    .severity.medium {
      background: rgba(245, 158, 11, 0.12);
      color: var(--cg-yellow-400, #fbbf24);
    }
    .severity.high {
      background: rgba(249, 115, 22, 0.12);
      color: var(--cg-orange-400, #fb923c);
    }
    .severity.critical {
      background: rgba(239, 68, 68, 0.15);
      color: var(--cg-red-400, #f87171);
    }

    /* ── Description ── */
    .description {
      font-size: 14px;
      color: var(--cg-gray-400, #a1a1aa);
      line-height: 1.5;
      margin-bottom: 16px;
    }

    /* ── Details key-value list ── */
    .details {
      display: flex;
      flex-direction: column;
      gap: 8px;
      margin-bottom: 20px;
      padding: 12px;
      background: var(--cg-gray-900, #09090b);
      border-radius: 8px;
    }
    .detail-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 13px;
    }
    .detail-key {
      color: var(--cg-gray-400, #a1a1aa);
      font-weight: 500;
    }
    .detail-value {
      color: var(--cg-color-surface-base-text, #fafafa);
      font-weight: 600;
    }

    /* ── Countdown ── */
    .countdown {
      text-align: center;
      font-size: 12px;
      color: var(--cg-gray-400, #a1a1aa);
      margin-bottom: 12px;
    }
    .countdown-num {
      font-weight: 700;
      color: var(--cg-brand-ai-accent, #dfff61);
    }

    /* ── Actions ── */
    .actions {
      display: flex;
      gap: 10px;
    }
    button {
      flex: 1;
      padding: 10px 16px;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      transition: all 150ms ease;
      border: none;
    }
    button:focus-visible {
      outline: 2px solid var(--cg-brand-ai-accent, #dfff61);
      outline-offset: 2px;
    }
    .btn-cancel {
      background: var(--cg-gray-800, #27272a);
      color: var(--cg-gray-300, #d4d4d8);
      border: 1px solid var(--cg-gray-700, #3f3f46);
    }
    .btn-cancel:hover { background: var(--cg-gray-700, #3f3f46); }
    .btn-confirm {
      background: var(--cg-brand-ai-accent, #dfff61);
      color: #09090b;
    }
    .btn-confirm:hover { filter: brightness(0.9); }
    .btn-confirm.critical {
      background: var(--cg-red-400, #f87171);
      color: #fff;
    }

    @keyframes pulse-border {
      0%, 100% { box-shadow: 0 0 0 0 rgba(248, 113, 113, 0.3); }
      50% { box-shadow: 0 0 0 6px rgba(248, 113, 113, 0); }
    }

    @media (prefers-reduced-motion: reduce) {
      .card.critical { animation: none; }
      button { transition: none; }
    }
  `;

  @property({ type: String }) title = '';
  @property({ type: String }) description = '';
  @property({ type: String }) action = '';
  @property({ type: String }) severity: Severity = 'low';
  @property({ attribute: false }) details: Record<string, string> = {};
  @property({ type: String }) confirmLabel = 'Confirm';
  @property({ type: String }) cancelLabel = 'Cancel';
  @property({ type: Number }) countdown = 0;

  @state() private _remaining = 0;
  private _timer?: ReturnType<typeof setInterval>;

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
    if (this._timer) { clearInterval(this._timer); this._timer = undefined; }
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

  private _handleConfirm() {
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
        aria-label="Action preview: ${this.title}"
        tabindex="0"
      >
        <div class="header">
          <span class="title">${this.title}</span>
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
