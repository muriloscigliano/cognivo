/**
 * @element ai-accessibility-report
 * WCAG compliance report with score circle, severity breakdown, and expandable issue list.
 *
 * @example
 * ```html
 * <ai-accessibility-report
 *   .issues=${[{rule:'color-contrast', level:'AA', severity:'error', description:'Low contrast ratio'}]}
 *   score="72"
 *   title="Page Audit"
 * ></ai-accessibility-report>
 * ```
 *
 * @fires {CustomEvent<{issue: A11yIssue, index: number}>} ai-a11y-issue-click - Issue row clicked/expanded
 *
 * @cssprop [--cg-color-accent=#dfff61] - Focus ring and accent color
 * @cssprop [--cg-color-surface-base=#18181b] - Card background
 */
import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { hostBlock, reducedMotion, fadeSlideInKeyframes } from '../../styles/index.js';

export interface A11yIssue {
  rule: string;
  level: 'A' | 'AA' | 'AAA';
  severity: 'error' | 'warning' | 'info';
  element?: string;
  description: string;
}

@customElement('ai-accessibility-report')
export class AiAccessibilityReport extends LitElement {
  static override styles = [hostBlock, reducedMotion, fadeSlideInKeyframes, css`
    :host {
      background: var(--cg-color-surface-base);
      color: var(--cg-color-surface-base-text);
      border: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
      border-radius: var(--cg-border-radius-150);
      padding: var(--cg-spacing-16);
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
      width: var(--_ai-a11y-score-size, 64px);
      height: var(--_ai-a11y-score-size, 64px);
      flex-shrink: 0;
    }

    .score-circle svg {
      width: var(--_ai-a11y-score-size, 64px);
      height: var(--_ai-a11y-score-size, 64px);
      transform: rotate(-90deg);
    }

    .score-bg {
      fill: none;
      stroke: var(--cg-color-surface-overlay);
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
    }

    .title {
      font-size: var(--cg-font-size-sm);
      font-weight: var(--cg-font-weight-semibold);
      margin: 0 0 var(--cg-spacing-4) 0;
    }

    .breakdown {
      display: flex;
      gap: var(--cg-spacing-12);
      font-size: var(--cg-font-size-xs);
    }

    .breakdown-item {
      display: flex;
      align-items: center;
      gap: var(--cg-spacing-4);
    }

    .sev-dot {
      width: var(--cg-spacing-8);
      height: var(--cg-spacing-8);
      border-radius: 50%;
    }

    .sev-error { background: var(--cg-color-status-error-text-default); }
    .sev-warning { background: var(--cg-color-status-warning-text); }
    .sev-info { background: var(--cg-color-status-info-text); }

    .issue-list {
      display: flex;
      flex-direction: column;
      gap: var(--cg-spacing-4);
    }

    .issue-item {
      border-radius: var(--cg-border-radius-100);
      border: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
      overflow: hidden;
    }

    .issue-header {
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

    .issue-header:hover {
      background: var(--cg-color-surface-cards-hover-background);
    }

    .issue-header:active { transform: scale(var(--cg-interaction-press-scale)); }
    .issue-header:focus-visible {
      outline: none;
      box-shadow: inset 0 0 0 2px var(--cg-overlay-accent-strong);
    }

    .sev-icon {
      flex-shrink: 0;
      font-size: var(--cg-font-size-sm);
    }

    .sev-icon-error { color: var(--cg-color-status-error-text-default); }
    .sev-icon-warning { color: var(--cg-color-status-warning-text); }
    .sev-icon-info { color: var(--cg-color-status-info-text); }

    .issue-rule {
      flex: 1;
      font-weight: var(--cg-font-weight-medium);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
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
      color: var(--cg-color-status-info-text);
    }

    .level-AA {
      background: var(--cg-color-status-warning-background-default);
      color: var(--cg-color-status-warning-text);
    }

    .level-AAA {
      background: var(--cg-overlay-accent-subtle);
      color: var(--cg-color-surface-base-text);
    }

    .issue-details {
      padding: var(--cg-spacing-8) var(--cg-spacing-12) var(--cg-spacing-12) var(--cg-spacing-32);
      border-top: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
      font-size: var(--cg-font-size-xs);
    }

    .issue-desc {
      color: var(--cg-color-input-text-placeholder);
      line-height: 1.5;
      margin-bottom: var(--cg-spacing-6);
    }

    .issue-element {
      display: inline-block;
      padding: var(--cg-spacing-2) var(--cg-spacing-8);
      background: var(--cg-color-surface-overlay);
      border-radius: var(--cg-border-radius-50);
      font-family: var(--cg-font-family-mono);
      font-size: var(--cg-font-size-xs);
      color: var(--cg-color-surface-base-text);
      word-break: break-all;
    }

    .empty {
      text-align: center;
      padding: var(--cg-spacing-24);
      color: var(--cg-color-input-text-placeholder);
      font-size: var(--cg-font-size-sm);
    }

  `];

  @property({ type: Array }) issues: A11yIssue[] = [];
  @property({ type: Number }) score = 0;
  @property({ type: String }) override title = 'Accessibility Report';

  @state() private _expanded = new Set<number>();

  private get _errorCount() { return this.issues.filter(i => i.severity === 'error').length; }
  private get _warningCount() { return this.issues.filter(i => i.severity === 'warning').length; }
  private get _infoCount() { return this.issues.filter(i => i.severity === 'info').length; }

  private _getScoreColor(): string {
    if (this.score >= 90) return 'var(--cg-color-status-success-text)';
    if (this.score >= 70) return 'var(--cg-color-status-warning-text)';
    if (this.score >= 50) return 'var(--cg-color-status-warning-text-default)';
    return 'var(--cg-color-status-error-text)';
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
    switch (severity) {
      case 'error': return html`<span class="sev-icon sev-icon-error" aria-label="Error">&#x2718;</span>`;
      case 'warning': return html`<span class="sev-icon sev-icon-warning" aria-label="Warning">&#x26A0;</span>`;
      default: return html`<span class="sev-icon sev-icon-info" aria-label="Info">&#x2139;</span>`;
    }
  }

  override render() {
    const circumference = 2 * Math.PI * 27;
    const offset = circumference - (this.score / 100) * circumference;
    const scoreColor = this._getScoreColor();

    return html`
      <div class="header">
        <div class="score-circle" role="meter" aria-valuenow=${this.score}
             aria-valuemin="0" aria-valuemax="100" aria-label="Accessibility score ${this.score}%">
          <svg viewBox="0 0 64 64">
            <circle class="score-bg" cx="32" cy="32" r="27" />
            <circle class="score-fg" cx="32" cy="32" r="27"
                    stroke="${scoreColor}"
                    stroke-dasharray="${circumference}"
                    stroke-dashoffset="${offset}" />
          </svg>
          <div class="score-text" style="color:${scoreColor}">${this.score}</div>
        </div>
        <div class="header-info">
          <h3 class="title">${this.title}</h3>
          <div class="breakdown">
            <span class="breakdown-item">
              <span class="sev-dot sev-error"></span> ${this._errorCount} errors
            </span>
            <span class="breakdown-item">
              <span class="sev-dot sev-warning"></span> ${this._warningCount} warnings
            </span>
            <span class="breakdown-item">
              <span class="sev-dot sev-info"></span> ${this._infoCount} info
            </span>
          </div>
        </div>
      </div>
      ${this.issues.length === 0 ? html`
        <div class="empty" role="status">No accessibility issues found.</div>
      ` : html`
        <div class="issue-list" role="list" aria-label="Accessibility issues">
          ${this.issues.map((issue, i) => html`
            <div class="issue-item" role="listitem">
              <button class="issue-header"
                      @click=${() => this._onClick(issue, i)}
                      aria-expanded=${this._expanded.has(i) ? 'true' : 'false'}
                      tabindex="0">
                ${this._sevIcon(issue.severity)}
                <span class="issue-rule">${issue.rule}</span>
                <span class="level-badge level-${issue.level}">WCAG ${issue.level}</span>
              </button>
              ${this._expanded.has(i) ? html`
                <div class="issue-details">
                  <div class="issue-desc">${issue.description}</div>
                  ${issue.element ? html`
                    <span class="issue-element">${issue.element}</span>
                  ` : nothing}
                </div>
              ` : nothing}
            </div>
          `)}
        </div>
      `}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ai-accessibility-report': AiAccessibilityReport;
  }
}
