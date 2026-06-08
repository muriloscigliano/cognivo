/**
 * @element ai-guardrail
 * Content safety filter display with policy checks, blocked content blur, and override controls.
 *
 * @fires {CustomEvent} ai-guardrail-override - Override clicked
 * @fires {CustomEvent} ai-guardrail-report - Report clicked
 * @fires {CustomEvent} ai-guardrail-reveal - Blocked content revealed/hidden
 */
import { LitElement, html, css, nothing } from 'lit';
import { property, state, customElement } from 'lit/decorators.js';
import { hostBlock, reducedMotion } from '../../styles/index.js';

interface PolicyCheck {
  policy: string;
  passed: boolean;
  reason?: string;
}

@customElement('ai-guardrail')
export class AiGuardrail extends LitElement {
  static override styles = [hostBlock, reducedMotion, css`
    .panel {
      background: var(--cg-color-surface-cards-background);
      border: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
      border-radius: var(--cg-component-card-radius);
      overflow: hidden;
    }

    /* ── Status bar ── */
    .status-bar {
      display: flex; align-items: center; gap: var(--cg-spacing-12);
      padding: var(--cg-spacing-16) var(--cg-spacing-20);
      font-size: var(--cg-font-size-sm); font-weight: var(--cg-font-weight-semibold);
    }
    .status-bar svg { width: var(--cg-spacing-16); height: var(--cg-spacing-16); flex-shrink: 0; }
    .status-bar.safe {
      background: var(--cg-color-status-success-background-default);
      color: var(--cg-color-status-success-text-default);
      border-bottom: var(--cg-border-width-50) solid var(--cg-color-status-success-border-default);
    }
    .status-bar.flagged {
      background: var(--cg-color-status-warning-background-default);
      color: var(--cg-color-status-warning-text-default);
      border-bottom: var(--cg-border-width-50) solid var(--cg-color-status-warning-border-default);
    }
    .status-bar.blocked {
      background: var(--cg-color-status-error-background-default);
      color: var(--cg-color-status-error-text-default);
      border-bottom: var(--cg-border-width-50) solid var(--cg-color-status-error-border-default);
    }

    .status-text { flex: 1; }
    .severity {
      font-size: var(--cg-font-size-xs); font-weight: var(--cg-font-weight-semibold);
      padding: var(--cg-spacing-2) var(--cg-spacing-8); border-radius: var(--cg-border-radius-full);
      text-transform: uppercase; letter-spacing: var(--cg-letter-spacing-wide);
    }
    .severity.low { background: var(--cg-color-status-success-background-default); color: var(--cg-color-status-success-text-default); }
    .severity.medium { background: var(--cg-color-status-warning-background-default); color: var(--cg-color-status-warning-text-default); }
    .severity.high { background: var(--cg-color-status-warning-background-default); color: var(--cg-color-status-warning-text-default); }
    .severity.critical { background: var(--cg-color-status-error-background-default); color: var(--cg-color-status-error-text-default); }

    /* ── Policy checks ── */
    .checks { padding: var(--cg-spacing-16) var(--cg-spacing-20); }
    .checks-label {
      font-size: var(--cg-font-size-xs); font-weight: var(--cg-font-weight-semibold);
      color: var(--cg-color-surface-container-outlined);
      text-transform: uppercase; letter-spacing: var(--cg-letter-spacing-wide);
      margin-bottom: var(--cg-spacing-12);
    }

    .check {
      display: flex; align-items: flex-start; gap: var(--cg-spacing-12);
      padding: var(--cg-spacing-6) 0;
      border-bottom: var(--cg-border-width-50) solid var(--cg-color-surface-cards-divider);
    }
    .check:last-child { border-bottom: none; }

    .check-icon { flex-shrink: 0; margin-top: var(--cg-spacing-2); }
    .check-icon svg { width: var(--cg-spacing-12); height: var(--cg-spacing-12); }
    .check-icon.pass { color: var(--cg-color-status-success-text-default); }
    .check-icon.fail { color: var(--cg-color-status-error-text-default); }

    .check-info { flex: 1; }
    .check-policy { font-size: var(--cg-font-size-sm); color: var(--cg-color-surface-base-text); font-weight: var(--cg-font-weight-medium); }
    .check-reason { font-size: var(--cg-font-size-xs); color: var(--cg-color-surface-container-outlined); margin-top: var(--cg-spacing-2); }

    /* ── Blocked content ── */
    .blocked-section {
      padding: var(--cg-spacing-16) var(--cg-spacing-20);
      border-top: var(--cg-border-width-50) solid var(--cg-color-surface-cards-divider);
    }
    .blocked-label {
      font-size: var(--cg-font-size-xs); font-weight: var(--cg-font-weight-semibold);
      color: var(--cg-color-status-error-text-default);
      text-transform: uppercase; letter-spacing: var(--cg-letter-spacing-wide);
      margin-bottom: var(--cg-spacing-12);
    }
    .blocked-content {
      padding: var(--cg-spacing-12) var(--cg-spacing-16); border-radius: var(--cg-border-radius-100);
      background: var(--cg-color-status-error-background-default);
      border: var(--cg-border-width-50) solid var(--cg-color-status-error-border-default);
      font-size: var(--cg-font-size-sm); color: var(--cg-color-surface-base-text);
      font-family: var(--cg-font-family-mono);
      line-height: var(--cg-line-height-relaxed);
      filter: blur(4px);
      transition: filter var(--cg-transition-duration-default) var(--cg-transition-easing-default);
      cursor: pointer;
    }
    .blocked-content.revealed { filter: none; }
    .blocked-hint {
      font-size: var(--cg-font-size-xs); color: var(--cg-color-surface-container-outlined);
      margin-top: var(--cg-spacing-6); text-align: center;
    }

    /* ── Actions ── */
    .actions {
      padding: var(--cg-spacing-16) var(--cg-spacing-20);
      border-top: var(--cg-border-width-50) solid var(--cg-color-surface-cards-divider);
      display: flex; align-items: center; gap: var(--cg-spacing-12);
    }
    .override-warning {
      font-size: var(--cg-font-size-xs); color: var(--cg-color-surface-container-outlined); flex: 1;
    }

    .btn {
      padding: var(--cg-spacing-6) var(--cg-spacing-12); border-radius: var(--cg-border-radius-100);
      border: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
      background: transparent; color: var(--cg-color-surface-container-outlined);
      font: inherit; font-size: var(--cg-font-size-xs); font-weight: var(--cg-font-weight-medium);
      cursor: pointer;
      transition: border-color var(--cg-transition-duration-fast) var(--cg-transition-easing-default), color var(--cg-transition-duration-fast) var(--cg-transition-easing-default), background var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
    }
    .btn:hover { border-color: var(--cg-color-surface-cards-hover-border); color: var(--cg-color-surface-base-text); }
    .btn:active { transform: scale(var(--cg-interaction-press-scale)); }
    .btn:focus-visible { outline: none; box-shadow: 0 0 0 3px var(--cg-color-focus-ring); }

    .btn.danger {
      border-color: var(--cg-color-status-error-border-default);
      background: var(--cg-color-status-error-background-default);
      color: var(--cg-color-status-error-text-default);
    }
    .btn.danger:hover { background: var(--cg-color-status-error-text-default); color: var(--cg-overlay-dark-text); }

    /* ── Rounded ── */
    :host([rounded="none"]) .panel { border-radius: 0; }
    :host([rounded="sm"]) .panel { border-radius: var(--cg-border-radius-50); }
    :host([rounded="md"]) .panel { border-radius: var(--cg-border-radius-100); }
    :host([rounded="lg"]) .panel { border-radius: var(--cg-component-card-radius); }
  `];

  @property({ reflect: true }) rounded: 'none' | 'sm' | 'md' | 'lg' = 'lg';
  @property() status: 'safe' | 'flagged' | 'blocked' = 'safe';
  @property({ type: Array }) checks: PolicyCheck[] = [];
  @property() blockedContent = '';
  @property({ type: Boolean }) allowOverride = false;
  @property() severityLevel: 'low' | 'medium' | 'high' | 'critical' = 'low';

  @state() private _revealed = false;

  private _getStatusIcon() {
    if (this.status === 'safe') return html`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>`;
    if (this.status === 'flagged') return html`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/></svg>`;
    return html`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6L6 18M6 6l12 12"/></svg>`;
  }

  private _getStatusText(): string {
    if (this.status === 'safe') return 'All safety checks passed';
    if (this.status === 'flagged') return 'Content flagged for review';
    return 'Content blocked by safety filter';
  }

  private _checkIcon(passed: boolean) {
    return passed
      ? html`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>`
      : html`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6L6 18M6 6l12 12"/></svg>`;
  }

  override render() {
    return html`
      <div class="panel" role="alert" aria-live="polite" aria-label="Safety filter: ${this.status}">
        <div class="status-bar ${this.status}">
          ${this._getStatusIcon()}
          <span class="status-text">${this._getStatusText()}</span>
          ${this.status !== 'safe' ? html`<span class="severity ${this.severityLevel}">${this.severityLevel}</span>` : nothing}
        </div>

        ${this.checks.length > 0 ? html`
          <div class="checks">
            <div class="checks-label">Policy Checks (${this.checks.filter(c => c.passed).length}/${this.checks.length} passed)</div>
            ${this.checks.map(c => html`
              <div class="check">
                <span class="check-icon ${c.passed ? 'pass' : 'fail'}">${this._checkIcon(c.passed)}</span>
                <div class="check-info">
                  <div class="check-policy">${c.policy}</div>
                  ${c.reason ? html`<div class="check-reason">${c.reason}</div>` : nothing}
                </div>
              </div>
            `)}
          </div>
        ` : nothing}

        ${this.blockedContent ? html`
          <div class="blocked-section">
            <div class="blocked-label">Blocked Content</div>
            <div class="blocked-content ${this._revealed ? 'revealed' : ''}"
              @click=${() => { this._revealed = !this._revealed; this.dispatchEvent(new CustomEvent('ai-guardrail-reveal', { bubbles: true, composed: true, detail: { revealed: this._revealed } })); }}>
              ${this.blockedContent}
            </div>
            <div class="blocked-hint">${this._revealed ? 'Click to hide' : 'Click to reveal (may contain harmful content)'}</div>
          </div>
        ` : nothing}

        ${(this.allowOverride || this.status !== 'safe') ? html`
          <div class="actions">
            <button class="btn" @click=${() => this.dispatchEvent(new CustomEvent('ai-guardrail-report', { bubbles: true, composed: true, detail: { status: this.status, checks: this.checks } }))}>Report Issue</button>
            ${this.allowOverride ? html`
              <span class="override-warning">Override requires admin approval</span>
              <button class="btn danger" @click=${() => this.dispatchEvent(new CustomEvent('ai-guardrail-override', { bubbles: true, composed: true, detail: { status: this.status, severity: this.severityLevel } }))}>Override</button>
            ` : nothing}
          </div>
        ` : nothing}
      </div>
    `;
  }
}
