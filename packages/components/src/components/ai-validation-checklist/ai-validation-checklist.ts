/**
 * @element ai-validation-checklist
 * Data validation checklist with status icons, progress bar, run button, and summary stats.
 *
 * @example
 * ```html
 * <ai-validation-checklist
 *   title="Data Quality"
 *   .checks=${[{id:'1',label:'Schema valid',status:'pass'},{id:'2',label:'No nulls',status:'fail'}]}
 * ></ai-validation-checklist>
 * ```
 *
 * @fires {CustomEvent<{checks}>} ai-validation-run - Run all validations
 * @fires {CustomEvent<{passed, failed, warnings, total}>} ai-validation-complete - All checks finished
 * @fires {CustomEvent<{id, label, status}>} ai-validation-item-click - Check item clicked
 */
import { LitElement, html, css, nothing } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { hostBlock, reducedMotion, spinKeyframes, fadeSlideInKeyframes } from '../../styles/index.js';

export interface ValidationCheck {
  id: string;
  label: string;
  description?: string;
  status: 'pending' | 'running' | 'pass' | 'fail' | 'warning' | 'skipped';
}

@customElement('ai-validation-checklist')
export class AiValidationChecklist extends LitElement {
  static override styles = [hostBlock, reducedMotion, spinKeyframes, fadeSlideInKeyframes, css`
    :host {
      animation: fadeSlideIn 200ms var(--cg-transition-easing-ease-out) both;
    }
    :host([hidden]) { display: none; }

    .container {
      background: var(--cg-color-surface-cards-background);
      border: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
      border-radius: var(--cg-border-radius-200);
      padding: var(--cg-spacing-20);
      color: var(--cg-color-surface-base-text);
    }

    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: var(--cg-spacing-16);
    }

    .title {
      font-size: var(--cg-font-size-base);
      font-weight: var(--cg-font-weight-semibold);
    }

    .run-btn {
      background: var(--cg-color-action-primary-background-default);
      color: var(--cg-color-action-primary-text-default);
      border: none;
      font-size: var(--cg-font-size-xs);
      font-weight: var(--cg-font-weight-bold);
      padding: var(--cg-spacing-6) var(--cg-spacing-16);
      border-radius: var(--cg-border-radius-full);
      cursor: pointer;
      transition: filter var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
    }
    .run-btn:hover:not(:disabled) { filter: brightness(0.9); }
    .run-btn:active:not(:disabled) { filter: brightness(0.85); }
    .run-btn:focus-visible {
      outline: none;
      box-shadow: 0 0 0 3px var(--cg-overlay-accent-strong);
    }
    .run-btn:disabled {
      background: var(--cg-color-action-primary-background-disable);
      color: var(--cg-color-action-primary-text-disable);
      cursor: not-allowed;
    }

    /* ── Progress bar ── */
    .progress-track {
      height: var(--cg-spacing-4);
      background: var(--cg-color-surface-cards-divider);
      border-radius: var(--cg-border-radius-50);
      overflow: hidden;
      margin-bottom: var(--cg-spacing-16);
    }

    .progress-fill {
      height: 100%;
      background: var(--cg-color-action-primary-background-default);
      border-radius: var(--cg-border-radius-50);
      transition: width var(--cg-transition-duration-slow) var(--cg-transition-easing-default);
    }

    /* ── Check list ── */
    .check-list {
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      flex-direction: column;
      gap: var(--cg-spacing-4);
    }

    .check-item {
      display: flex;
      align-items: flex-start;
      gap: var(--cg-spacing-8);
      padding: var(--cg-spacing-8) var(--cg-spacing-12);
      border-radius: var(--cg-border-radius-100);
      cursor: pointer;
      transition: background var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
    }
    .check-item:hover {
      background: var(--cg-color-surface-cards-hover-background);
    }
    .check-item:active {
      background: var(--cg-color-surface-cards-active-background);
    }
    .check-item:focus-visible {
      outline: none;
      box-shadow: 0 0 0 3px var(--cg-overlay-accent-strong);
    }

    .status-icon {
      flex-shrink: 0;
      width: var(--cg-spacing-20);
      height: var(--cg-spacing-20);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: var(--cg-font-size-sm);
      line-height: 1;
      margin-top: var(--cg-spacing-1);
    }

    .status-icon.pass { color: var(--cg-color-status-success-text-default); }
    .status-icon.fail { color: var(--cg-color-status-error-text-default); }
    .status-icon.warning { color: var(--cg-color-status-warning-text-default); }
    .status-icon.pending { color: var(--cg-color-input-text-placeholder); }
    .status-icon.skipped { color: var(--cg-color-input-text-placeholder); }
    .status-icon.running { color: var(--cg-color-status-info-text-default); }

    .spinner {
      width: var(--cg-spacing-12);
      height: var(--cg-spacing-12);
      border: var(--cg-border-width-50) solid var(--cg-color-surface-cards-divider);
      border-top-color: var(--cg-color-status-info-text-default);
      border-radius: var(--cg-border-radius-full);
      animation: spin 0.8s linear infinite;
    }

    .check-content {
      flex: 1;
      min-width: 0;
    }

    .check-label {
      font-size: var(--cg-font-size-sm);
      font-weight: var(--cg-font-weight-medium);
    }

    .check-desc {
      font-size: var(--cg-font-size-xs);
      color: var(--cg-color-input-text-placeholder);
      margin-top: var(--cg-spacing-2);
    }

    .empty-state {
      color: var(--cg-color-input-text-placeholder);
      font-size: var(--cg-font-size-sm);
      text-align: center;
      padding: var(--cg-spacing-16) 0;
      margin: 0;
    }

    /* ── Divider ── */
    .divider {
      height: var(--cg-border-width-50);
      background: var(--cg-color-surface-cards-divider);
      margin: var(--cg-spacing-16) 0;
    }

    /* ── Summary ── */
    .summary {
      display: flex;
      gap: var(--cg-spacing-16);
      flex-wrap: wrap;
    }

    .summary-item {
      font-size: var(--cg-font-size-xs);
      display: flex;
      align-items: center;
      gap: var(--cg-spacing-6);
    }

    .summary-dot {
      width: var(--cg-spacing-8);
      height: var(--cg-spacing-8);
      border-radius: var(--cg-border-radius-full);
    }
    .summary-dot.pass { background: var(--cg-color-status-success-text-default); }
    .summary-dot.fail { background: var(--cg-color-status-error-text-default); }
    .summary-dot.warning { background: var(--cg-color-status-warning-text-default); }
    .summary-dot.pending { background: var(--cg-color-input-text-placeholder); }

    .summary-count {
      font-weight: var(--cg-font-weight-bold);
      color: var(--cg-color-surface-base-text);
    }

    .summary-label {
      color: var(--cg-color-input-text-placeholder);
    }

    @media (prefers-reduced-motion: reduce) {
      .spinner { animation: none !important; border-top-color: var(--cg-color-status-info-text-default); }
    }
  `];

  @property({ attribute: false }) checks: ValidationCheck[] = [];
  @property({ type: String }) override title = 'Validation';
  @property({ type: Boolean }) autoRun = false;
  @property({ type: Boolean }) loading = false;

  private get _stats() {
    const passed = this.checks.filter(c => c.status === 'pass').length;
    const failed = this.checks.filter(c => c.status === 'fail').length;
    const warnings = this.checks.filter(c => c.status === 'warning').length;
    const running = this.checks.filter(c => c.status === 'running').length;
    const pending = this.checks.filter(c => c.status === 'pending').length;
    const done = this.checks.length - pending - running;
    const percent = this.checks.length > 0 ? Math.round((done / this.checks.length) * 100) : 0;
    return { passed, failed, warnings, running, pending, done, percent };
  }

  private _onRun() {
    this.dispatchEvent(new CustomEvent('ai-validation-run', {
      detail: { checks: this.checks },
      bubbles: true, composed: true,
    }));
  }

  private _onItemClick(check: ValidationCheck) {
    this.dispatchEvent(new CustomEvent('ai-validation-item-click', {
      detail: { id: check.id, label: check.label, status: check.status },
      bubbles: true, composed: true,
    }));
  }

  private _statusIcon(status: ValidationCheck['status']) {
    switch (status) {
      case 'pass': return html`<span class="status-icon pass" aria-label="Passed">&#10003;</span>`;
      case 'fail': return html`<span class="status-icon fail" aria-label="Failed">&#10007;</span>`;
      case 'warning': return html`<span class="status-icon warning" aria-label="Warning">&#9888;</span>`;
      case 'running': return html`<span class="status-icon running" aria-label="Running"><span class="spinner"></span></span>`;
      case 'skipped': return html`<span class="status-icon skipped" aria-label="Skipped">&mdash;</span>`;
      default: return html`<span class="status-icon pending" aria-label="Pending">&#9679;</span>`;
    }
  }

  override render() {
    const s = this._stats;
    const isRunning = s.running > 0 || this.loading;

    return html`
      <div class="container" role="region" aria-label="${this.title}">
        <div class="header">
          <span class="title">${this.title}</span>
          <button
            class="run-btn"
            ?disabled=${isRunning}
            @click=${this._onRun}
            aria-label="Run validations"
          >${isRunning ? 'Running...' : 'Run All'}</button>
        </div>

        <div class="progress-track" role="progressbar" aria-valuenow=${s.percent} aria-valuemin="0" aria-valuemax="100" aria-label="Validation progress">
          <div class="progress-fill" style="width:${s.percent}%"></div>
        </div>

        ${this.checks.length === 0
          ? html`<p class="empty-state">No validations configured</p>`
          : html`
            <ul class="check-list">
              ${this.checks.map(check => html`
                <li
                  class="check-item"
                  role="button"
                  tabindex="0"
                  aria-label="${check.label}, ${check.status}"
                  @click=${() => this._onItemClick(check)}
                  @keydown=${(e: KeyboardEvent) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); this._onItemClick(check); } }}
                >
                  ${this._statusIcon(check.status)}
                  <div class="check-content">
                    <div class="check-label">${check.label}</div>
                    ${check.description ? html`<div class="check-desc">${check.description}</div>` : nothing}
                  </div>
                </li>
              `)}
            </ul>
          `}

        ${this.checks.length > 0 ? html`
          <div class="divider"></div>
          <div class="summary">
            <div class="summary-item">
              <span class="summary-dot pass"></span>
              <span class="summary-count">${s.passed}</span>
              <span class="summary-label">passed</span>
            </div>
            <div class="summary-item">
              <span class="summary-dot fail"></span>
              <span class="summary-count">${s.failed}</span>
              <span class="summary-label">failed</span>
            </div>
            <div class="summary-item">
              <span class="summary-dot warning"></span>
              <span class="summary-count">${s.warnings}</span>
              <span class="summary-label">warnings</span>
            </div>
            ${s.percent < 100 && (this.checks.length - s.passed - s.failed - s.warnings) > 0 ? html`
              <div class="summary-item">
                <span class="summary-dot pending"></span>
                <span class="summary-count">${this.checks.length - s.passed - s.failed - s.warnings}</span>
                <span class="summary-label">remaining</span>
              </div>
            ` : nothing}
          </div>
        ` : nothing}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ai-validation-checklist': AiValidationChecklist;
  }
}
