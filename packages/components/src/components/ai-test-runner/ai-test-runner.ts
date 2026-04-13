/**
 * @element ai-test-runner
 * AI evaluation test results panel. Displays a list of tests with
 * pass/fail/running/pending status icons, duration, optional scores,
 * expandable expected/actual details, summary bar, and a "Run All" button.
 *
 * @example
 * ```html
 * <ai-test-runner title="Eval Suite" .tests=${[
 *   { name: 'Summarization accuracy', status: 'pass', duration: 340, score: 92 },
 *   { name: 'Hallucination check', status: 'fail', duration: 210, expected: 'No hallucinations', actual: 'Found 2 claims' }
 * ]}></ai-test-runner>
 * ```
 *
 * @prop {TestEntry[]} tests - Array of test entries with name, status, duration, score, expected, actual
 * @prop {string} title - Panel header title (default 'Test Results')
 *
 * @fires {CustomEvent<{tests: string[]}>} ai-test-run - When "Run All" is clicked
 * @fires {CustomEvent<{index: number, test: TestEntry}>} ai-test-click - When a test row is toggled
 */
import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { hostBlock, reducedMotion, spinKeyframes, fadeSlideInKeyframes } from '../../styles/index.js';

export interface TestEntry {
  name: string;
  status: 'pass' | 'fail' | 'running' | 'pending';
  duration?: number;
  expected?: string;
  actual?: string;
  score?: number;
}

@customElement('ai-test-runner')
export class AiTestRunner extends LitElement {
  static override styles = [hostBlock, reducedMotion, spinKeyframes, fadeSlideInKeyframes, css`
    :host {
      background: var(--cg-color-surface-base);
      color: var(--cg-color-surface-base-text);
      border: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
      border-radius: var(--cg-border-radius-150);
      padding: var(--cg-spacing-16);
      animation: fadeSlideIn var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
    }
    :host([hidden]) { display: none; }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: var(--cg-spacing-12);
      border-bottom: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
      margin-bottom: var(--cg-spacing-12);
    }

    .title {
      font-size: var(--cg-font-size-sm);
      font-weight: var(--cg-font-weight-semibold);
      margin: 0;
    }

    .run-btn {
      display: inline-flex;
      align-items: center;
      gap: var(--cg-spacing-4);
      background: var(--cg-color-action-primary-background-default);
      color: var(--cg-color-surface-container-background);
      border: none;
      border-radius: var(--cg-border-radius-100);
      padding: var(--cg-spacing-6) var(--cg-spacing-12);
      font-size: var(--cg-font-size-xs);
      font-weight: var(--cg-font-weight-semibold);
      cursor: pointer;
      font-family: inherit;
    }

    .run-btn:active { transform: scale(var(--cg-interaction-press-scale)); }
    .run-btn:focus-visible {
      outline: none;
      box-shadow: 0 0 0 3px var(--cg-overlay-accent-strong);
    }

    .summary-bar {
      display: flex;
      gap: var(--cg-spacing-12);
      margin-bottom: var(--cg-spacing-12);
      font-size: var(--cg-font-size-xs);
    }

    .summary-item {
      display: flex;
      align-items: center;
      gap: var(--cg-spacing-4);
    }

    .dot {
      width: var(--cg-spacing-8);
      height: var(--cg-spacing-8);
      border-radius: 50%;
    }

    .dot-pass { background: var(--cg-color-status-success-text); }
    .dot-fail { background: var(--cg-color-status-error-text); }
    .dot-running { background: var(--cg-color-status-warning-text); }
    .dot-pending { background: var(--cg-color-input-text-placeholder); }

    .progress-bar {
      height: var(--cg-spacing-4);
      border-radius: var(--cg-border-radius-25);
      background: var(--cg-color-surface-overlay);
      margin-bottom: var(--cg-spacing-12);
      overflow: hidden;
      display: flex;
    }

    .progress-pass {
      background: var(--cg-color-status-success-text);
      height: 100%;
      transition: width var(--cg-transition-duration-slow) var(--cg-transition-easing-default);
    }

    .progress-fail {
      background: var(--cg-color-status-error-text);
      height: 100%;
      transition: width var(--cg-transition-duration-slow) var(--cg-transition-easing-default);
    }

    .test-list {
      display: flex;
      flex-direction: column;
      gap: var(--cg-spacing-4);
    }

    .test-item {
      border-radius: var(--cg-border-radius-100);
      border: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
      overflow: hidden;
    }

    .test-header {
      display: flex;
      align-items: center;
      gap: var(--cg-spacing-8);
      padding: var(--cg-spacing-8) var(--cg-spacing-12);
      cursor: pointer;
      background: transparent;
      border: none;
      color: inherit;
      width: 100%;
      font-family: inherit;
      font-size: var(--cg-font-size-sm);
      text-align: left;
    }

    .test-header:hover {
      background: var(--cg-color-surface-cards-hover-background);
    }

    .test-header:focus-visible {
      outline: none;
      box-shadow: inset 0 0 0 2px var(--cg-overlay-accent-strong);
    }

    .status-icon {
      flex-shrink: 0;
      font-size: var(--cg-font-size-sm);
    }

    .icon-pass { color: var(--cg-color-status-success-text); }
    .icon-fail { color: var(--cg-color-status-error-text); }
    .icon-running { color: var(--cg-color-status-warning-text); }
    .icon-pending { color: var(--cg-color-input-text-placeholder); }

    .test-name {
      flex: 1;
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .test-duration {
      font-size: var(--cg-font-size-xs);
      color: var(--cg-color-input-text-placeholder);
      flex-shrink: 0;
    }

    .test-score {
      font-size: var(--cg-font-size-xs);
      color: var(--cg-color-surface-base-text);
      font-weight: var(--cg-font-weight-semibold);
      flex-shrink: 0;
    }

    .test-details {
      padding: var(--cg-spacing-8) var(--cg-spacing-12) var(--cg-spacing-12) var(--cg-spacing-32);
      border-top: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
      font-size: var(--cg-font-size-xs);
      font-family: var(--cg-font-family-mono);
    }

    .detail-row {
      display: flex;
      gap: var(--cg-spacing-8);
      margin-bottom: var(--cg-spacing-4);
    }

    .detail-label {
      color: var(--cg-color-input-text-placeholder);
      min-width: 64px;
    }

    .detail-expected { color: var(--cg-color-status-success-text); }
    .detail-actual { color: var(--cg-color-status-error-text); }

    .spinner {
      display: inline-block;
      width: 14px;
      height: 14px;
      border: var(--cg-border-width-100) solid var(--cg-color-status-warning-text);
      border-top-color: transparent;
      border-radius: 50%;
      animation: spin var(--cg-transition-duration-slow) linear infinite;
    }

  `];

  @property({ type: Array }) tests: TestEntry[] = [];
  @property({ type: String }) override title = 'Test Results';

  @state() private _expanded = new Set<number>();

  private get _passCount() { return this.tests.filter(t => t.status === 'pass').length; }
  private get _failCount() { return this.tests.filter(t => t.status === 'fail').length; }
  private get _runningCount() { return this.tests.filter(t => t.status === 'running').length; }
  private get _pendingCount() { return this.tests.filter(t => t.status === 'pending').length; }

  private _toggle(idx: number): void {
    const next = new Set(this._expanded);
    if (next.has(idx)) next.delete(idx); else next.add(idx);
    this._expanded = next;
    this.dispatchEvent(new CustomEvent('ai-test-click', {
      bubbles: true, composed: true,
      detail: { index: idx, test: this.tests[idx] },
    }));
  }

  private _runAll(): void {
    this.dispatchEvent(new CustomEvent('ai-test-run', {
      bubbles: true, composed: true,
      detail: { tests: this.tests.map(t => t.name) },
    }));
  }

  private _statusIcon(status: string) {
    switch (status) {
      case 'pass': return html`<span class="status-icon icon-pass" aria-label="Passed">&#x2714;</span>`;
      case 'fail': return html`<span class="status-icon icon-fail" aria-label="Failed">&#x2718;</span>`;
      case 'running': return html`<span class="spinner" role="status" aria-label="Running"></span>`;
      default: return html`<span class="status-icon icon-pending" aria-label="Pending">&#x25CB;</span>`;
    }
  }

  override render() {
    const total = this.tests.length || 1;
    const passP = (this._passCount / total) * 100;
    const failP = (this._failCount / total) * 100;

    return html`
      <div class="header">
        <h3 class="title">${this.title}</h3>
        <button class="run-btn" @click=${this._runAll}
                aria-label="Run all tests" tabindex="0">
          &#x25B6; Run All
        </button>
      </div>
      <div class="summary-bar" role="status" aria-label="Test summary">
        <span class="summary-item"><span class="dot dot-pass"></span>${this._passCount} passed</span>
        <span class="summary-item"><span class="dot dot-fail"></span>${this._failCount} failed</span>
        ${this._runningCount ? html`<span class="summary-item"><span class="dot dot-running"></span>${this._runningCount} running</span>` : nothing}
        ${this._pendingCount ? html`<span class="summary-item"><span class="dot dot-pending"></span>${this._pendingCount} pending</span>` : nothing}
      </div>
      <div class="progress-bar" aria-hidden="true">
        <div class="progress-pass" style="width:${passP}%"></div>
        <div class="progress-fail" style="width:${failP}%"></div>
      </div>
      <div class="test-list" role="list" aria-label="Tests">
        ${this.tests.map((t, i) => html`
          <div class="test-item" role="listitem">
            <button class="test-header" @click=${() => this._toggle(i)}
                    aria-expanded=${this._expanded.has(i)}
                    tabindex="0">
              ${this._statusIcon(t.status)}
              <span class="test-name">${t.name}</span>
              ${t.score != null ? html`<span class="test-score">${t.score}%</span>` : nothing}
              ${t.duration != null ? html`<span class="test-duration">${t.duration}ms</span>` : nothing}
            </button>
            ${this._expanded.has(i) && (t.expected || t.actual) ? html`
              <div class="test-details">
                ${t.expected ? html`
                  <div class="detail-row">
                    <span class="detail-label">Expected:</span>
                    <span class="detail-expected">${t.expected}</span>
                  </div>
                ` : nothing}
                ${t.actual ? html`
                  <div class="detail-row">
                    <span class="detail-label">Actual:</span>
                    <span class="detail-actual">${t.actual}</span>
                  </div>
                ` : nothing}
              </div>
            ` : nothing}
          </div>
        `)}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ai-test-runner': AiTestRunner;
  }
}
