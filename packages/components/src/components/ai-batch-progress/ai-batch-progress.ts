/**
 * @element ai-batch-progress
 * Batch job progress tracker with segmented success/fail bar, stats, and pause/cancel/retry controls.
 *
 * @example
 * ```html
 * <ai-batch-progress
 *   total="500" completed="312" failed="8"
 *   heading="Embedding Generation"
 *   status="running"
 * ></ai-batch-progress>
 * ```
 *
 * @fires {CustomEvent<{total, completed, failed, status}>} ai-batch-pause - Pause clicked
 * @fires {CustomEvent<{total, completed, failed, status}>} ai-batch-cancel - Cancel clicked
 * @fires {CustomEvent<{total, completed, failed, status}>} ai-batch-retry - Retry/Resume clicked
 *
 * @cssprop [--cg-brand-ai-accent=#dfff61] - Accent for percentage text
 */
import { LitElement, html, css, nothing } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { hostBlock, reducedMotion, pulseKeyframes, fadeSlideInKeyframes } from '../../styles/index.js';

@customElement('ai-batch-progress')
export class AiBatchProgress extends LitElement {
  static override styles = [hostBlock, reducedMotion, pulseKeyframes, fadeSlideInKeyframes, css`
    :host {
      animation: fadeSlideIn 200ms var(--cg-motion-easing-enter) both;
    }
    :host([hidden]) { display: none; }

    .container {
      background: var(--cg-color-surface-container-background);
      border: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
      border-radius: var(--cg-border-radius-150);
      padding: var(--cg-spacing-16);
      color: var(--cg-color-surface-base-text);
    }

    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: var(--cg-spacing-12);
    }

    .title {
      font-size: var(--cg-font-size-sm);
      font-weight: var(--cg-font-weight-semibold);
    }

    .status-badge {
      font-size: var(--cg-font-size-xs);
      font-weight: var(--cg-font-weight-bold);
      text-transform: uppercase;
      letter-spacing: 0.05em;
      padding: var(--cg-spacing-3) var(--cg-spacing-8);
      border-radius: var(--cg-border-radius-100);
    }
    .status-badge.running {
      background: var(--cg-color-status-info-background-default);
      color: var(--cg-color-status-info-text-default);
    }
    .status-badge.complete {
      background: var(--cg-color-status-success-background-default);
      color: var(--cg-color-status-success-text-default);
    }
    .status-badge.failed {
      background: var(--cg-color-status-error-background-default);
      color: var(--cg-color-status-error-text-default);
    }
    .status-badge.paused {
      background: var(--cg-color-status-warning-background-default);
      color: var(--cg-color-status-warning-text);
    }

    /* ── Stats row ── */
    .stats {
      display: flex;
      gap: var(--cg-spacing-16);
      margin-bottom: var(--cg-spacing-12);
    }

    .stat {
      display: flex;
      flex-direction: column;
      gap: var(--cg-spacing-2);
    }

    .stat-label {
      font-size: var(--cg-font-size-xs);
      color: var(--cg-color-input-text-placeholder);
    }

    .stat-value {
      font-size: var(--cg-font-size-base);
      font-weight: var(--cg-font-weight-bold);
    }
    .stat-value.success { color: var(--cg-color-status-success-text-default); }
    .stat-value.fail { color: var(--cg-color-status-error-text-default); }
    .stat-value.pending { color: var(--cg-color-input-text-placeholder); }

    /* ── Progress bar ── */
    .progress-section {
      margin-bottom: var(--cg-spacing-12);
    }

    .progress-header {
      display: flex;
      justify-content: space-between;
      font-size: var(--cg-font-size-xs);
      color: var(--cg-color-input-text-placeholder);
      margin-bottom: var(--cg-spacing-6);
    }

    .progress-percent {
      font-weight: var(--cg-font-weight-bold);
      color: var(--cg-color-surface-base-text);
    }

    .progress-track {
      height: 10px;
      background: var(--cg-color-surface-cards-border);
      border-radius: var(--cg-border-radius-50);
      overflow: hidden;
      display: flex;
    }

    .progress-success {
      height: 100%;
      background: var(--cg-color-status-success-text-default);
      transition: width var(--cg-motion-duration-slow) var(--cg-motion-easing-default);
    }

    .progress-fail {
      height: 100%;
      background: var(--cg-color-status-error-text-default);
      transition: width var(--cg-motion-duration-slow) var(--cg-motion-easing-default);
    }

    /* ── Pulse animation for running ── */
    .pulse-dot {
      display: inline-block;
      width: var(--cg-spacing-8);
      height: var(--cg-spacing-8);
      border-radius: 50%;
      background: var(--cg-color-status-info-text-default);
      margin-right: var(--cg-spacing-6);
      animation: pulse 1.5s infinite;
    }

    .eta {
      font-size: var(--cg-font-size-xs);
      color: var(--cg-color-input-border-hover);
      margin-top: var(--cg-spacing-6);
    }

    /* ── Actions ── */
    .actions {
      display: flex;
      gap: var(--cg-spacing-8);
      margin-top: var(--cg-spacing-16);
      padding-top: var(--cg-spacing-12);
      border-top: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
    }

    .action-btn {
      background: transparent;
      border: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
      color: var(--cg-color-input-text-placeholder);
      font-size: var(--cg-font-size-xs);
      font-weight: var(--cg-font-weight-semibold);
      padding: var(--cg-spacing-8) var(--cg-spacing-12);
      border-radius: var(--cg-border-radius-100);
      cursor: pointer;
      transition: border-color var(--cg-motion-duration-fast) var(--cg-motion-easing-color), color var(--cg-motion-duration-fast) var(--cg-motion-easing-color), background var(--cg-motion-duration-fast) var(--cg-motion-easing-color);
    }
    .action-btn:hover {
      border-color: var(--cg-color-surface-cards-border);
      color: var(--cg-color-surface-base-text);
    }
    .action-btn:focus-visible {
      outline: 2px solid var(--cg-color-accent-border);
      outline-offset: var(--cg-outline-offset-default);
    }

    .action-btn.pause:hover { border-color: var(--cg-color-status-warning-text); color: var(--cg-color-status-warning-text); }
    .action-btn.cancel:hover { border-color: var(--cg-color-status-error-text-default); color: var(--cg-color-status-error-text-default); }
    .action-btn.retry {
      background: var(--cg-color-action-primary-background-default);
      color: var(--cg-color-surface-container-background);
      border-color: var(--cg-color-surface-base-text);
    }
    .action-btn.retry:hover { filter: brightness(0.9); }

    .complete-text {
      font-size: var(--cg-font-size-xs);
      color: var(--cg-color-status-success-text-default);
    }

    /* Reduced motion: stop pulse animation, show static dot */
    @media (prefers-reduced-motion: reduce) {
      .pulse-dot {
        animation: none !important;
        opacity: 1;
      }
    }
  `];
  @property({ type: Number }) total = 0;
  @property({ type: Number }) completed = 0;
  @property({ type: Number }) failed = 0;
  @property({ type: String }) heading = 'Batch Job';
  @property({ type: String }) status: 'running' | 'complete' | 'failed' | 'paused' = 'running';

  private get _pending(): number {
    return Math.max(0, this.total - this.completed - this.failed);
  }

  private get _percent(): number {
    if (this.total <= 0) return 0;
    return Math.round(((this.completed + this.failed) / this.total) * 100);
  }

  private get _successPercent(): number {
    if (this.total <= 0) return 0;
    return (this.completed / this.total) * 100;
  }

  private get _failPercent(): number {
    if (this.total <= 0) return 0;
    return (this.failed / this.total) * 100;
  }

  private _dispatch(eventName: string) {
    this.dispatchEvent(new CustomEvent(eventName, {
      detail: { total: this.total, completed: this.completed, failed: this.failed, status: this.status },
      bubbles: true,
      composed: true,
    }));
  }

  override render() {
    return html`
      <div class="container" role="region" aria-label="${this.heading} progress">
        <div class="header">
          <span class="title">
            ${this.status === 'running' ? html`<span class="pulse-dot" aria-hidden="true"></span>` : nothing}
            ${this.heading}
          </span>
          <span class="status-badge ${this.status}">${this.status}</span>
        </div>

        <div class="stats">
          <div class="stat">
            <span class="stat-label">Completed</span>
            <span class="stat-value success">${this.completed}</span>
          </div>
          <div class="stat">
            <span class="stat-label">Failed</span>
            <span class="stat-value fail">${this.failed}</span>
          </div>
          <div class="stat">
            <span class="stat-label">Pending</span>
            <span class="stat-value pending">${this._pending}</span>
          </div>
          <div class="stat">
            <span class="stat-label">Total</span>
            <span class="stat-value">${this.total}</span>
          </div>
        </div>

        <div class="progress-section">
          <div class="progress-header">
            <span>Progress</span>
            <span class="progress-percent">${this._percent}%</span>
          </div>
          <div
            class="progress-track"
            role="progressbar"
            aria-valuenow=${this._percent}
            aria-valuemin="0"
            aria-valuemax="100"
            aria-label="Batch progress: ${this._percent}%"
          >
            <div class="progress-success" style="width:${this._successPercent}%"></div>
            <div class="progress-fail" style="width:${this._failPercent}%"></div>
          </div>
          ${this.status === 'running' && this._pending > 0 ? html`
            <div class="eta">
              ~${this._pending} items remaining
            </div>
          ` : nothing}
        </div>

        <div class="actions">
          ${this.status === 'running' ? html`
            <button
              class="action-btn pause"
              @click=${() => this._dispatch('ai-batch-pause')}
              aria-label="Pause batch job"
              tabindex="0"
            >Pause</button>
            <button
              class="action-btn cancel"
              @click=${() => this._dispatch('ai-batch-cancel')}
              aria-label="Cancel batch job"
              tabindex="0"
            >Cancel</button>
          ` : nothing}
          ${this.status === 'paused' ? html`
            <button
              class="action-btn retry"
              @click=${() => this._dispatch('ai-batch-retry')}
              aria-label="Resume batch job"
              tabindex="0"
            >Resume</button>
            <button
              class="action-btn cancel"
              @click=${() => this._dispatch('ai-batch-cancel')}
              aria-label="Cancel batch job"
              tabindex="0"
            >Cancel</button>
          ` : nothing}
          ${this.status === 'failed' ? html`
            <button
              class="action-btn retry"
              @click=${() => this._dispatch('ai-batch-retry')}
              aria-label="Retry failed items"
              tabindex="0"
            >Retry Failed</button>
          ` : nothing}
          ${this.status === 'complete' ? html`
            <span class="complete-text">All items processed</span>
          ` : nothing}
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ai-batch-progress': AiBatchProgress;
  }
}
