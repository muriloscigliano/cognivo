/**
 * @element ai-test-runner
 * AI evaluation test results panel built from design-system primitives
 * (cg-card, cg-text, cg-button). Pass/fail/running/pending status icons,
 * duration, optional scores, expandable expected/actual details, summary bar,
 * combined pass/fail progress bar, and a "Run All" CTA.
 *
 * @example
 * ```html
 * <ai-test-runner title="Eval Suite" .tests=${[
 *   { name: 'Summarization accuracy', status: 'pass', duration: 340, score: 92 },
 *   { name: 'Hallucination check', status: 'fail', duration: 210,
 *     expected: 'No hallucinations', actual: 'Found 2 claims' }
 * ]}></ai-test-runner>
 * ```
 *
 * @prop {TestEntry[]} tests - Test entries
 * @prop {string} title - Panel header title (default 'Test Results')
 *
 * @fires {CustomEvent<{tests: string[]}>} ai-test-run - "Run All" clicked
 * @fires {CustomEvent<{index: number, test: TestEntry}>} ai-test-click - Test row toggled
 */
import { LitElement, html, css, nothing, svg } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { hostBlock, reducedMotion, spinKeyframes, fadeSlideInKeyframes } from '../../styles/index.js';
import '../cg-card/cg-card.js';
import '../cg-text/cg-text.js';
import '../cg-button/cg-button.js';

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
      display: block;
      animation: fadeSlideIn var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
    }
    :host([hidden]) { display: none; }

    cg-card { display: block; }

    .header-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--cg-spacing-12);
      width: 100%;
    }

    .summary-bar {
      display: flex;
      gap: var(--cg-spacing-16);
      margin-bottom: var(--cg-spacing-8);
    }
    .summary-item {
      display: inline-flex;
      align-items: center;
      gap: var(--cg-spacing-6);
    }
    .dot {
      width: var(--cg-spacing-8);
      height: var(--cg-spacing-8);
      border-radius: var(--cg-border-radius-full);
    }
    .dot-pass    { background: var(--cg-color-status-success-text-default); }
    .dot-fail    { background: var(--cg-color-status-error-text-default); }
    .dot-running { background: var(--cg-color-status-warning-text-default); }
    .dot-pending { background: var(--cg-color-surface-container-outlined); }

    .progress-bar {
      height: var(--cg-spacing-4);
      border-radius: var(--cg-border-radius-full);
      background: var(--cg-color-surface-cards-border);
      margin-bottom: var(--cg-spacing-12);
      overflow: hidden;
      display: flex;
    }
    .progress-pass {
      background: var(--cg-color-status-success-text-default);
      height: 100%;
      transition: width var(--cg-transition-duration-slow) var(--cg-transition-easing-default);
    }
    .progress-fail {
      background: var(--cg-color-status-error-text-default);
      height: 100%;
      transition: width var(--cg-transition-duration-slow) var(--cg-transition-easing-default);
    }

    .test-list {
      display: flex;
      flex-direction: column;
      gap: 0;
    }

    .test-item {
      border-radius: var(--cg-border-radius-100);
      overflow: hidden;
    }
    .test-item + .test-item {
      border-top: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
      border-radius: 0;
    }

    .test-header {
      display: flex;
      align-items: center;
      gap: var(--cg-spacing-12);
      padding: var(--cg-spacing-12);
      cursor: pointer;
      background: transparent;
      border: none;
      color: inherit;
      width: 100%;
      font-family: inherit;
      text-align: left;
      min-height: var(--cg-spacing-48);
      transition:
        background var(--cg-transition-duration-fast) var(--cg-transition-easing-default),
        transform var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
    }
    .test-header:hover {
      background: var(--cg-color-action-secondary-background-hover);
    }
    .test-header:active { transform: scale(var(--cg-interaction-press-scale)); }
    .test-header:focus-visible {
      outline: none;
      box-shadow: inset 0 0 0 var(--cg-border-width-300) var(--cg-overlay-accent-strong);
    }

    .test-header-static { cursor: default; }

    .empty-state {
      padding: var(--cg-spacing-16);
      text-align: center;
    }

    .status-icon {
      flex-shrink: 0;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: var(--cg-spacing-16);
      height: var(--cg-spacing-16);
    }
    .status-icon svg { width: 100%; height: 100%; }
    .status-icon.pass    { color: var(--cg-color-status-success-text-default); }
    .status-icon.fail    { color: var(--cg-color-status-error-text-default); }
    .status-icon.pending { color: var(--cg-color-surface-container-outlined); }

    .test-name {
      flex: 1;
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .test-meta {
      flex-shrink: 0;
      display: inline-flex;
      align-items: center;
      gap: var(--cg-spacing-12);
      font-variant-numeric: tabular-nums;
    }

    .test-details {
      padding: var(--cg-spacing-8) var(--cg-spacing-12) var(--cg-spacing-12) var(--cg-spacing-32);
      border-top: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
      font-family: var(--cg-font-family-mono);
      background: var(--cg-color-code-background);
    }
    .detail-row {
      display: flex;
      gap: var(--cg-spacing-8);
      margin-bottom: var(--cg-spacing-4);
    }
    .detail-label {
      min-width: var(--cg-spacing-64);
    }
    .detail-expected { color: var(--cg-color-status-success-text-default); }
    .detail-actual   { color: var(--cg-color-status-error-text-default); }

    .spinner {
      display: inline-block;
      width: var(--cg-spacing-16);
      height: var(--cg-spacing-16);
      border: var(--cg-border-width-100) solid var(--cg-color-status-warning-text-default);
      border-top-color: transparent;
      border-radius: var(--cg-border-radius-full);
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

  private _statusIcon(status: TestEntry['status']) {
    if (status === 'pass') {
      return html`<span class="status-icon pass" aria-label="Passed">${svg`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`}</span>`;
    }
    if (status === 'fail') {
      return html`<span class="status-icon fail" aria-label="Failed">${svg`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>`}</span>`;
    }
    if (status === 'running') {
      return html`<span class="spinner" role="status" aria-label="Running"></span>`;
    }
    return html`<span class="status-icon pending" aria-label="Pending">${svg`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/></svg>`}</span>`;
  }

  override render() {
    const total = this.tests.length || 1;
    const passP = (this._passCount / total) * 100;
    const failP = (this._failCount / total) * 100;

    return html`
      <cg-card variant="outlined" padding="md" rounded="lg">
        <div slot="header" class="header-row">
          <cg-text as="h3" size="sm" weight="semibold">${this.title}</cg-text>
          <cg-button variant="primary" size="sm" @click=${this._runAll} aria-label="Run all tests">
            Run All
          </cg-button>
        </div>

        <div class="summary-bar" role="group" aria-label="Test summary">
          <span class="summary-item">
            <span class="dot dot-pass" aria-hidden="true"></span>
            <cg-text size="xs" color="muted">${this._passCount} passed</cg-text>
          </span>
          <span class="summary-item">
            <span class="dot dot-fail" aria-hidden="true"></span>
            <cg-text size="xs" color="muted">${this._failCount} failed</cg-text>
          </span>
          ${this._runningCount ? html`
            <span class="summary-item">
              <span class="dot dot-running" aria-hidden="true"></span>
              <cg-text size="xs" color="muted">${this._runningCount} running</cg-text>
            </span>
          ` : nothing}
          ${this._pendingCount ? html`
            <span class="summary-item">
              <span class="dot dot-pending" aria-hidden="true"></span>
              <cg-text size="xs" color="muted">${this._pendingCount} pending</cg-text>
            </span>
          ` : nothing}
        </div>

        <div class="progress-bar" aria-hidden="true">
          <div class="progress-pass" style="width:${passP}%"></div>
          <div class="progress-fail" style="width:${failP}%"></div>
        </div>

        ${this.tests.length === 0 ? html`
          <div class="empty-state">
            <cg-text size="sm" color="muted">No tests yet — press Run All to start the suite.</cg-text>
          </div>
        ` : html`
        <div class="test-list" role="list" aria-label="Tests">
          ${this.tests.map((t, i) => {
            const hasDetails = !!(t.expected || t.actual);
            const meta = html`
              ${this._statusIcon(t.status)}
              <cg-text class="test-name" size="sm">${t.name}</cg-text>
              <div class="test-meta">
                ${t.score != null ? html`<cg-text size="xs" weight="semibold">${t.score}%</cg-text>` : nothing}
                ${t.duration != null ? html`<cg-text size="xs" color="muted">${t.duration}ms</cg-text>` : nothing}
              </div>
            `;
            return html`
            <div class="test-item" role="listitem">
              ${hasDetails ? html`
                <button
                  class="test-header"
                  @click=${() => this._toggle(i)}
                  aria-expanded=${this._expanded.has(i)}
                  aria-controls="test-details-${i}"
                >
                  ${meta}
                </button>
              ` : html`
                <div class="test-header test-header-static">
                  ${meta}
                </div>
              `}
              ${this._expanded.has(i) && hasDetails ? html`
                <div class="test-details" id="test-details-${i}">
                  ${t.expected ? html`
                    <div class="detail-row">
                      <cg-text class="detail-label" size="xs" color="muted">Expected:</cg-text>
                      <cg-text size="xs" class="detail-expected">${t.expected}</cg-text>
                    </div>
                  ` : nothing}
                  ${t.actual ? html`
                    <div class="detail-row">
                      <cg-text class="detail-label" size="xs" color="muted">Actual:</cg-text>
                      <cg-text size="xs" class="detail-actual">${t.actual}</cg-text>
                    </div>
                  ` : nothing}
                </div>
              ` : nothing}
            </div>
          `;
          })}
        </div>
        `}
      </cg-card>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ai-test-runner': AiTestRunner;
  }
}
