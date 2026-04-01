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
      background: var(--cg-color-surface-base, #18181b);
      color: var(--cg-color-surface-base-text, #fafafa);
      border: 1px solid var(--cg-color-border-default, #27272a);
      border-radius: var(--cg-radius-lg, 12px);
      padding: var(--cg-spacing-16, 16px);
      box-shadow: inset 0 1px 0 0 rgba(255, 255, 255, 0.05);
      background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0.03), transparent);
      animation: fadeSlideIn var(--cg-motion-duration-fast, 200ms) var(--cg-motion-easing-color, cubic-bezier(0, 0, 0.58, 1));
    }
    :host([hidden]) { display: none; }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: var(--cg-spacing-12, 12px);
    }

    .title {
      font-size: var(--cg-font-size-sm, 14px);
      font-weight: var(--cg-font-weight-semibold, 600);
      margin: 0;
    }

    .run-btn {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      background: var(--cg-color-accent, #dfff61);
      color: #18181b;
      border: none;
      border-radius: var(--cg-radius-md, 8px);
      padding: 6px 14px;
      font-size: var(--cg-font-size-xs, 12px);
      font-weight: var(--cg-font-weight-semibold, 600);
      cursor: pointer;
      font-family: inherit;
    }

    .run-btn:focus-visible {
      outline: 2px solid var(--cg-color-accent, #dfff61);
      outline-offset: 2px;
    }

    .summary-bar {
      display: flex;
      gap: var(--cg-spacing-12, 12px);
      margin-bottom: var(--cg-spacing-12, 12px);
      font-size: var(--cg-font-size-xs, 12px);
    }

    .summary-item {
      display: flex;
      align-items: center;
      gap: 4px;
    }

    .dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
    }

    .dot-pass { background: #4ade80; }
    .dot-fail { background: #f87171; }
    .dot-running { background: #facc15; }
    .dot-pending { background: #71717a; }

    .progress-bar {
      height: 4px;
      border-radius: 2px;
      background: var(--cg-color-surface-overlay, #27272a);
      margin-bottom: var(--cg-spacing-12, 12px);
      overflow: hidden;
      display: flex;
    }

    .progress-pass {
      background: #4ade80;
      height: 100%;
      transition: width 0.3s ease;
    }

    .progress-fail {
      background: #f87171;
      height: 100%;
      transition: width 0.3s ease;
    }

    .test-list {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .test-item {
      border-radius: var(--cg-radius-md, 8px);
      border: 1px solid var(--cg-color-border-default, #27272a);
      overflow: hidden;
    }

    .test-header {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px 12px;
      cursor: pointer;
      background: transparent;
      border: none;
      color: inherit;
      width: 100%;
      font-family: inherit;
      font-size: var(--cg-font-size-sm, 14px);
      text-align: left;
    }

    .test-header:hover {
      background: var(--cg-color-surface-hover, #27272a);
    }

    .test-header:focus-visible {
      outline: 2px solid var(--cg-color-accent, #dfff61);
      outline-offset: -2px;
    }

    .status-icon {
      flex-shrink: 0;
      font-size: 14px;
    }

    .icon-pass { color: #4ade80; }
    .icon-fail { color: #f87171; }
    .icon-running { color: #facc15; }
    .icon-pending { color: #71717a; }

    .test-name {
      flex: 1;
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .test-duration {
      font-size: var(--cg-font-size-xs, 12px);
      color: var(--cg-color-text-tertiary, #71717a);
      flex-shrink: 0;
    }

    .test-score {
      font-size: var(--cg-font-size-xs, 12px);
      color: var(--cg-color-accent, #dfff61);
      font-weight: var(--cg-font-weight-semibold, 600);
      flex-shrink: 0;
    }

    .test-details {
      padding: 8px 12px 12px 32px;
      border-top: 1px solid var(--cg-color-border-default, #27272a);
      font-size: var(--cg-font-size-xs, 12px);
      font-family: var(--cg-font-family-mono, 'JetBrains Mono', monospace);
    }

    .detail-row {
      display: flex;
      gap: 8px;
      margin-bottom: 4px;
    }

    .detail-label {
      color: var(--cg-color-text-tertiary, #71717a);
      min-width: 64px;
    }

    .detail-expected { color: #4ade80; }
    .detail-actual { color: #f87171; }

    .spinner {
      display: inline-block;
      width: 14px;
      height: 14px;
      border: 2px solid #facc15;
      border-top-color: transparent;
      border-radius: 50%;
      animation: spin 0.6s linear infinite;
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
