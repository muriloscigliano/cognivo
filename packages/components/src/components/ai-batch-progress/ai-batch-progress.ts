/**
 * @element ai-batch-progress
 * Batch job progress tracker with segmented success/fail bar, stats, and pause/cancel/retry controls.
 *
 * @example
 * ```html
 * <ai-batch-progress
 *   total="500" completed="312" failed="8"
 *   title="Embedding Generation"
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
      animation: fadeSlideIn 200ms var(--cg-motion-easing-enter, cubic-bezier(0, 0, 0.2, 1)) both;
    }
    :host([hidden]) { display: none; }

    .container {
      background: var(--cg-color-surface-container-background, #18181b);
      background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0.03), transparent);
      border: 1px solid var(--cg-color-surface-container-border, #27272a);
      border-radius: 12px;
      padding: 20px;
      color: var(--cg-color-surface-base-text, #fafafa);
      box-shadow: inset 0 1px 0 0 rgba(255, 255, 255, 0.05);
    }

    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 14px;
    }

    .title {
      font-size: 14px;
      font-weight: 600;
    }

    .status-badge {
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      padding: 3px 10px;
      border-radius: 6px;
    }
    .status-badge.running {
      background: rgba(59, 130, 246, 0.15);
      color: var(--cg-color-status-info-text-default, #3b82f6);
    }
    .status-badge.complete {
      background: rgba(34, 197, 94, 0.15);
      color: var(--cg-color-status-success-text-default, #22c55e);
    }
    .status-badge.failed {
      background: rgba(239, 68, 68, 0.15);
      color: var(--cg-color-status-error-text-default, #ef4444);
    }
    .status-badge.paused {
      background: rgba(234, 179, 8, 0.15);
      color: #eab308;
    }

    /* ── Stats row ── */
    .stats {
      display: flex;
      gap: 16px;
      margin-bottom: 12px;
    }

    .stat {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .stat-label {
      font-size: 11px;
      color: var(--cg-gray-500, #71717a);
    }

    .stat-value {
      font-size: 16px;
      font-weight: 700;
    }
    .stat-value.success { color: var(--cg-color-status-success-text-default, #22c55e); }
    .stat-value.fail { color: var(--cg-color-status-error-text-default, #ef4444); }
    .stat-value.pending { color: var(--cg-gray-400, #a1a1aa); }

    /* ── Progress bar ── */
    .progress-section {
      margin-bottom: 14px;
    }

    .progress-header {
      display: flex;
      justify-content: space-between;
      font-size: 11px;
      color: var(--cg-gray-500, #71717a);
      margin-bottom: 6px;
    }

    .progress-percent {
      font-weight: 700;
      color: var(--cg-brand-ai-accent, #dfff61);
    }

    .progress-track {
      height: 10px;
      background: var(--cg-color-surface-container-border, #27272a);
      border-radius: 5px;
      overflow: hidden;
      display: flex;
    }

    .progress-success {
      height: 100%;
      background: var(--cg-color-status-success-text-default, #22c55e);
      transition: width 300ms ease;
    }

    .progress-fail {
      height: 100%;
      background: var(--cg-color-status-error-text-default, #ef4444);
      transition: width 300ms ease;
    }

    /* ── Pulse animation for running ── */
    .pulse-dot {
      display: inline-block;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: var(--cg-color-status-info-text-default, #3b82f6);
      margin-right: 6px;
      animation: pulse 1.5s infinite;
    }

    .eta {
      font-size: 11px;
      color: var(--cg-gray-600, #52525b);
      margin-top: 6px;
    }

    /* ── Actions ── */
    .actions {
      display: flex;
      gap: 8px;
      margin-top: 16px;
      padding-top: 14px;
      border-top: 1px solid var(--cg-color-surface-container-border, #27272a);
    }

    .action-btn {
      background: transparent;
      border: 1px solid var(--cg-color-surface-container-border, #27272a);
      color: var(--cg-gray-400, #a1a1aa);
      font-size: 12px;
      font-weight: 600;
      padding: 7px 14px;
      border-radius: 8px;
      cursor: pointer;
      transition: all 150ms ease;
    }
    .action-btn:hover {
      border-color: var(--cg-gray-700, #3f3f46);
      color: var(--cg-color-surface-base-text, #fafafa);
    }
    .action-btn:focus-visible {
      outline: 2px solid var(--cg-brand-ai-accent, #dfff61);
      outline-offset: 2px;
    }

    .action-btn.pause:hover { border-color: #eab308; color: #eab308; }
    .action-btn.cancel:hover { border-color: var(--cg-color-status-error-text-default, #ef4444); color: var(--cg-color-status-error-text-default, #ef4444); }
    .action-btn.retry {
      background: var(--cg-brand-ai-accent, #dfff61);
      color: var(--cg-color-surface-container-background, #18181b);
      border-color: var(--cg-brand-ai-accent, #dfff61);
    }
    .action-btn.retry:hover { filter: brightness(0.9); }
      .pulse-dot { animation: none; }
    }
  `];
  @property({ type: Number }) total = 0;
  @property({ type: Number }) completed = 0;
  @property({ type: Number }) failed = 0;
  @property({ type: String }) override title = 'Batch Job';
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
      <div class="container" role="region" aria-label="${this.title} progress">
        <div class="header">
          <span class="title">
            ${this.status === 'running' ? html`<span class="pulse-dot" aria-hidden="true"></span>` : nothing}
            ${this.title}
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
            <span style="font-size:12px;color:var(--cg-color-status-success-text-default, #22c55e);">All items processed</span>
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
