/**
 * @element ai-accessibility-report
 * WCAG compliance report with score circle, severity breakdown, and expandable
 * issue list with optional "How to fix" suggestions per issue. Modeled after
 * Lighthouse / axe DevTools / Accessibility Insights.
 *
 * @example
 * ```html
 * <ai-accessibility-report
 *   .issues=${[{rule:'color-contrast', level:'AA', severity:'error',
 *               description:'Low contrast ratio', fix:'Increase contrast to at least 4.5:1'}]}
 *   score="72"
 *   title="Page Audit"
 * ></ai-accessibility-report>
 * ```
 *
 * @fires {CustomEvent<{issue: A11yIssue, index: number}>} ai-a11y-issue-click - Issue row clicked/expanded
 */
import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { hostBlock, reducedMotion, fadeSlideInKeyframes } from '../../styles/index.js';
import '../cg-card/cg-card.js';
import '../cg-icon/cg-icon.js';

export interface A11yIssue {
  rule: string;
  level: 'A' | 'AA' | 'AAA';
  severity: 'error' | 'warning' | 'info';
  element?: string;
  description: string;
  /** Optional fix suggestion (axe DevTools / Lighthouse pattern) */
  fix?: string;
}

@customElement('ai-accessibility-report')
export class AiAccessibilityReport extends LitElement {
  static override styles = [hostBlock, reducedMotion, fadeSlideInKeyframes, css`
    :host {
      display: block;
      animation: fadeSlideIn var(--cg-transition-duration-default) var(--cg-transition-easing-ease-out) both;
    }
    :host([hidden]) { display: none; }

    .header {
      display: flex;
      align-items: center;
      gap: var(--cg-spacing-16);
      padding-bottom: var(--cg-spacing-12);
      border-bottom: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
      margin-bottom: var(--cg-spacing-16);
    }

    .score-circle {
      position: relative;
      width: var(--cg-spacing-64);
      height: var(--cg-spacing-64);
      flex-shrink: 0;
    }

    .score-circle svg {
      width: var(--cg-spacing-64);
      height: var(--cg-spacing-64);
      transform: rotate(-90deg);
    }

    .score-bg {
      fill: none;
      stroke: var(--cg-color-surface-cards-border);
      stroke-width: 5;
    }

    .score-fg {
      fill: none;
      stroke-width: 5;
      stroke-linecap: round;
      transition: stroke-dashoffset var(--cg-transition-duration-slow) var(--cg-transition-easing-default);
    }

    .score-text {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: var(--cg-font-size-lg);
      font-weight: var(--cg-font-weight-bold);
    }

    .header-info {
      flex: 1;
      min-width: 0;
    }

    .title {
      font-size: var(--cg-font-size-sm);
      font-weight: var(--cg-font-weight-semibold);
      margin: 0 0 var(--cg-spacing-4) 0;
      color: var(--cg-color-surface-base-text);
    }

    .pass-count {
      font-size: var(--cg-font-size-xs);
      color: var(--cg-color-surface-container-outlined);
      margin: 0 0 var(--cg-spacing-6) 0;
    }

    .breakdown {
      display: flex;
      flex-wrap: wrap;
      gap: var(--cg-spacing-12);
      font-size: var(--cg-font-size-xs);
      color: var(--cg-color-surface-container-outlined);
    }

    .breakdown-item {
      display: flex;
      align-items: center;
      gap: var(--cg-spacing-4);
    }

    .sev-dot {
      width: var(--cg-spacing-8);
      height: var(--cg-spacing-8);
      border-radius: var(--cg-border-radius-full);
    }

    .sev-error { background: var(--cg-color-status-error-text-default); }
    .sev-warning { background: var(--cg-color-status-warning-text-default); }
    .sev-info { background: var(--cg-color-status-info-text-default); }

    .issue-list {
      display: flex;
      flex-direction: column;
      gap: var(--cg-spacing-6);
    }

    .issue-item {
      border-radius: var(--cg-border-radius-100);
      border: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
      overflow: hidden;
      transition: border-color var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
    }
    .issue-item:hover {
      border-color: var(--cg-color-surface-cards-hover-border);
    }

    .issue-header {
      display: flex;
      align-items: center;
      gap: var(--cg-spacing-8);
      padding: var(--cg-spacing-8) var(--cg-spacing-12);
      min-height: var(--cg-spacing-40);
      cursor: pointer;
      background: transparent;
      border: none;
      color: inherit;
      width: 100%;
      font-family: inherit;
      font-size: var(--cg-font-size-sm);
      text-align: left;
      transition:
        background-color var(--cg-transition-duration-fast) var(--cg-transition-easing-default),
        transform var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
    }
    .issue-header:hover {
      background: var(--cg-color-surface-cards-hover-background);
    }
    .issue-header:active { transform: scale(var(--cg-interaction-press-scale)); }
    .issue-header:focus-visible {
      outline: none;
      box-shadow: inset 0 0 0 var(--cg-border-width-100) var(--cg-color-focus-ring);
    }

    .sev-icon {
      flex-shrink: 0;
      display: inline-flex;
      align-items: center;
    }
    .sev-icon-error { color: var(--cg-color-status-error-text-default); }
    .sev-icon-warning { color: var(--cg-color-status-warning-text-default); }
    .sev-icon-info { color: var(--cg-color-status-info-text-default); }

    .issue-rule {
      flex: 1;
      font-weight: var(--cg-font-weight-medium);
      color: var(--cg-color-surface-base-text);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .chevron {
      color: var(--cg-color-surface-container-outlined);
      transition: transform var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
    }
    .issue-header[aria-expanded="true"] .chevron {
      transform: rotate(180deg);
    }

    .level-badge {
      display: inline-flex;
      padding: var(--cg-spacing-2) var(--cg-spacing-6);
      border-radius: var(--cg-border-radius-50);
      font-size: var(--cg-font-size-xs);
      font-weight: var(--cg-font-weight-bold);
      flex-shrink: 0;
    }
    .level-A {
      background: var(--cg-color-status-info-background-default);
      color: var(--cg-color-status-info-text-default);
    }
    .level-AA {
      background: var(--cg-color-status-warning-background-default);
      color: var(--cg-color-status-warning-text-default);
    }
    .level-AAA {
      background: var(--cg-overlay-accent-subtle);
      color: var(--cg-color-accent-text);
    }

    .issue-details {
      padding: var(--cg-spacing-8) var(--cg-spacing-12) var(--cg-spacing-12) var(--cg-spacing-32);
      border-top: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
      font-size: var(--cg-font-size-sm);
      display: flex;
      flex-direction: column;
      gap: var(--cg-spacing-8);
    }
    .issue-details[hidden] { display: none; }

    .issue-desc {
      color: var(--cg-color-surface-container-outlined);
      line-height: var(--cg-line-height-normal);
    }

    .issue-element {
      display: inline-block;
      align-self: flex-start;
      padding: var(--cg-spacing-2) var(--cg-spacing-8);
      background: var(--cg-color-surface-cards-background);
      border-radius: var(--cg-border-radius-50);
      font-family: var(--cg-font-family-mono);
      font-size: var(--cg-font-size-xs);
      color: var(--cg-color-surface-base-text);
      word-break: break-all;
    }

    .issue-fix {
      display: flex;
      align-items: flex-start;
      gap: var(--cg-spacing-6);
      padding: var(--cg-spacing-6) var(--cg-spacing-8);
      background: var(--cg-overlay-accent-subtle);
      border: var(--cg-border-width-50) solid var(--cg-overlay-accent-strong);
      border-radius: var(--cg-border-radius-50);
      color: var(--cg-color-surface-base-text);
      line-height: var(--cg-line-height-normal);
    }
    .issue-fix-label {
      font-weight: var(--cg-font-weight-semibold);
      color: var(--cg-color-accent-text);
      flex-shrink: 0;
    }

    .empty {
      text-align: center;
      padding: var(--cg-spacing-24);
      color: var(--cg-color-surface-container-outlined);
      font-size: var(--cg-font-size-sm);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--cg-spacing-8);
    }
    .empty cg-icon {
      color: var(--cg-color-status-success-text-default);
    }
  `];

  @property({ type: Array }) issues: A11yIssue[] = [];
  @property({ type: Number }) score = 0;
  @property({ type: String }) override title = 'Accessibility Report';
  /** Total checks run (for "X of Y passed" display). Defaults to issues.length when 0. */
  @property({ type: Number, attribute: 'total-checks' }) totalChecks = 0;

  @state() private _expanded = new Set<number>();

  private get _errorCount() { return this.issues.filter(i => i.severity === 'error').length; }
  private get _warningCount() { return this.issues.filter(i => i.severity === 'warning').length; }
  private get _infoCount() { return this.issues.filter(i => i.severity === 'info').length; }

  private _getScoreColor(): string {
    if (this.score >= 90) return 'var(--cg-color-status-success-text-default)';
    if (this.score >= 50) return 'var(--cg-color-status-warning-text-default)';
    return 'var(--cg-color-status-error-text-default)';
  }

  private _toggle(idx: number): void {
    const next = new Set(this._expanded);
    if (next.has(idx)) next.delete(idx); else next.add(idx);
    this._expanded = next;
  }

  private _onClick(issue: A11yIssue, idx: number): void {
    this._toggle(idx);
    this.dispatchEvent(new CustomEvent('ai-a11y-issue-click', {
      bubbles: true, composed: true,
      detail: { issue, index: idx },
    }));
  }

  private _sevIcon(severity: string) {
    const map: Record<string, string> = {
      error: 'error',
      warning: 'warning',
      info: 'info',
    };
    const cls = `sev-icon sev-icon-${severity}`;
    return html`<span class=${cls} aria-hidden="true"><cg-icon name="${map[severity] ?? 'info'}" size="sm"></cg-icon></span>`;
  }

  override render() {
    const score = Math.max(0, Math.min(100, this.score));
    const circumference = 2 * Math.PI * 27;
    const offset = circumference - (score / 100) * circumference;
    const scoreColor = this._getScoreColor();
    const total = this.totalChecks > 0 ? this.totalChecks : this.issues.length;
    const passed = Math.max(0, total - this.issues.length);

    return html`
      <cg-card>
        <div class="header">
          <div class="score-circle" role="meter" aria-valuenow=${score}
               aria-valuemin="0" aria-valuemax="100" aria-label="Accessibility score ${score} out of 100">
            <svg viewBox="0 0 64 64" aria-hidden="true">
              <circle class="score-bg" cx="32" cy="32" r="27" />
              <circle class="score-fg" cx="32" cy="32" r="27"
                      stroke="${scoreColor}"
                      stroke-dasharray="${circumference}"
                      stroke-dashoffset="${offset}" />
            </svg>
            <div class="score-text" style="color:${scoreColor}">${score}</div>
          </div>
          <div class="header-info">
            <h3 class="title">${this.title}</h3>
            ${total > 0 ? html`
              <p class="pass-count">${passed} of ${total} checks passed</p>
            ` : nothing}
            <div class="breakdown">
              <span class="breakdown-item">
                <span class="sev-dot sev-error"></span> ${this._errorCount} ${this._errorCount === 1 ? 'error' : 'errors'}
              </span>
              <span class="breakdown-item">
                <span class="sev-dot sev-warning"></span> ${this._warningCount} ${this._warningCount === 1 ? 'warning' : 'warnings'}
              </span>
              <span class="breakdown-item">
                <span class="sev-dot sev-info"></span> ${this._infoCount} info
              </span>
            </div>
          </div>
        </div>
        ${this.issues.length === 0 ? html`
          <div class="empty" role="status">
            <cg-icon name="success" size="lg"></cg-icon>
            <span>No accessibility issues found.</span>
          </div>
        ` : html`
          <div class="issue-list" role="list" aria-label="Accessibility issues">
            ${this.issues.map((issue, i) => html`
              <div class="issue-item" role="listitem">
                <button class="issue-header"
                        @click=${() => this._onClick(issue, i)}
                        aria-expanded=${this._expanded.has(i) ? 'true' : 'false'}
                        aria-controls="issue-details-${i}">
                  ${this._sevIcon(issue.severity)}
                  <span class="issue-rule">${issue.rule}</span>
                  <span class="level-badge level-${issue.level}">WCAG ${issue.level}</span>
                  <cg-icon class="chevron" name="chevron-down" size="xs"></cg-icon>
                </button>
                <div class="issue-details" id="issue-details-${i}" ?hidden=${!this._expanded.has(i)}>
                  ${this._expanded.has(i) ? html`
                    <div class="issue-desc">${issue.description}</div>
                    ${issue.element ? html`
                      <code class="issue-element">${issue.element}</code>
                    ` : nothing}
                    ${issue.fix ? html`
                      <div class="issue-fix">
                        <span class="issue-fix-label">Fix:</span>
                        <span>${issue.fix}</span>
                      </div>
                    ` : nothing}
                  ` : nothing}
                </div>
              </div>
            `)}
          </div>
        `}
      </cg-card>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ai-accessibility-report': AiAccessibilityReport;
  }
}
