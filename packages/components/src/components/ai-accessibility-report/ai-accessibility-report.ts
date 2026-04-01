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
      background: var(--cg-color-surface-base, #18181b);
      background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0.03), transparent);
      color: var(--cg-color-surface-base-text, #fafafa);
      border: 1px solid var(--cg-color-border-default, #27272a);
      border-radius: var(--cg-radius-lg, 12px);
      padding: var(--cg-spacing-16, 16px);
      box-shadow: inset 0 1px 0 0 rgba(255, 255, 255, 0.05);
      animation: fadeSlideIn 200ms var(--cg-motion-easing-enter, cubic-bezier(0, 0, 0.2, 1)) both;
    }
    :host([hidden]) { display: none; }

    .header {
      display: flex;
      align-items: center;
      gap: var(--cg-spacing-16, 16px);
      margin-bottom: var(--cg-spacing-16, 16px);
    }

    .score-circle {
      position: relative;
      width: 64px;
      height: 64px;
      flex-shrink: 0;
    }

    .score-circle svg {
      width: 64px;
      height: 64px;
      transform: rotate(-90deg);
    }

    .score-bg {
      fill: none;
      stroke: var(--cg-color-surface-overlay, #27272a);
      stroke-width: 5;
    }

    .score-fg {
      fill: none;
      stroke-width: 5;
      stroke-linecap: round;
      transition: stroke-dashoffset 0.5s ease;
    }

    .score-text {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: var(--cg-font-size-lg, 18px);
      font-weight: var(--cg-font-weight-bold, 700);
    }

    .header-info {
      flex: 1;
    }

    .title {
      font-size: var(--cg-font-size-sm, 14px);
      font-weight: var(--cg-font-weight-semibold, 600);
      margin: 0 0 4px 0;
    }

    .breakdown {
      display: flex;
      gap: var(--cg-spacing-12, 12px);
      font-size: var(--cg-font-size-xs, 12px);
    }

    .breakdown-item {
      display: flex;
      align-items: center;
      gap: 4px;
    }

    .sev-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
    }

    .sev-error { background: #f87171; }
    .sev-warning { background: #facc15; }
    .sev-info { background: #60a5fa; }

    .issue-list {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .issue-item {
      border-radius: var(--cg-radius-md, 8px);
      border: 1px solid var(--cg-color-border-default, #27272a);
      overflow: hidden;
    }

    .issue-header {
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

    .issue-header:hover {
      background: var(--cg-color-surface-hover, #27272a);
    }

    .issue-header:focus-visible {
      outline: 2px solid var(--cg-color-accent, #dfff61);
      outline-offset: -2px;
    }

    .sev-icon {
      flex-shrink: 0;
      font-size: 14px;
    }

    .sev-icon-error { color: #f87171; }
    .sev-icon-warning { color: #facc15; }
    .sev-icon-info { color: #60a5fa; }

    .issue-rule {
      flex: 1;
      font-weight: var(--cg-font-weight-medium, 500);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .level-badge {
      display: inline-flex;
      padding: 2px 6px;
      border-radius: var(--cg-radius-sm, 4px);
      font-size: 10px;
      font-weight: var(--cg-font-weight-bold, 700);
      flex-shrink: 0;
    }

    .level-A {
      background: rgba(96, 165, 250, 0.15);
      color: #60a5fa;
    }

    .level-AA {
      background: rgba(250, 204, 21, 0.15);
      color: #facc15;
    }

    .level-AAA {
      background: rgba(192, 132, 252, 0.15);
      color: #c084fc;
    }

    .issue-details {
      padding: 8px 12px 12px 32px;
      border-top: 1px solid var(--cg-color-border-default, #27272a);
      font-size: var(--cg-font-size-xs, 12px);
    }

    .issue-desc {
      color: var(--cg-color-text-secondary, #a1a1aa);
      line-height: 1.5;
      margin-bottom: 6px;
    }

    .issue-element {
      display: inline-block;
      padding: 2px 8px;
      background: var(--cg-color-surface-overlay, #27272a);
      border-radius: var(--cg-radius-sm, 4px);
      font-family: var(--cg-font-family-mono, 'JetBrains Mono', monospace);
      font-size: 11px;
      color: var(--cg-color-accent, #dfff61);
      word-break: break-all;
    }

    .empty {
      text-align: center;
      padding: 24px;
      color: var(--cg-color-text-tertiary, #71717a);
      font-size: var(--cg-font-size-sm, 14px);
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
    if (this.score >= 90) return '#4ade80';
    if (this.score >= 70) return '#facc15';
    if (this.score >= 50) return '#fb923c';
    return '#f87171';
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
