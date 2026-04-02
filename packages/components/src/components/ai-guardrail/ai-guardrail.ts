/**
 * @element ai-guardrail
 * Content safety filter display with policy check list, blocked content, and optional override controls.
 *
 * @example
 * ```html
 * <ai-guardrail
 *   status="flagged"
 *   severityLevel="medium"
 *   .checks=${[{policy:'PII Detection', passed:false, detail:'Email address found'}]}
 *   allowOverride
 * ></ai-guardrail>
 * ```
 *
 * @fires {CustomEvent} ai-guardrail-override - Override button clicked
 * @fires {CustomEvent} ai-guardrail-report - Report button clicked
 * @fires {CustomEvent} ai-guardrail-reveal - Blocked content revealed
 *
 * @cssprop [--cg-brand-ai-accent=#dfff61] - Safe status accent
 */
import { LitElement, html, css, nothing } from 'lit';
import { property, state, customElement } from 'lit/decorators.js';
import { hostBlock, reducedMotion, fadeSlideInKeyframes } from '../../styles/index.js';

interface PolicyCheck {
  policy: string;
  passed: boolean;
  reason?: string;
}

@customElement('ai-guardrail')
export class AiGuardrail extends LitElement {
  static override styles = [hostBlock, reducedMotion, fadeSlideInKeyframes, css`
    :host {
      animation: fadeSlideIn var(--cg-motion-duration-fast, 200ms) var(--cg-motion-easing-color, cubic-bezier(0, 0, 0.58, 1));
    }

    .panel {
      background: var(--cg-color-surface-container-background, #18181b);
      border: 1px solid var(--cg-color-surface-container-border, #27272a);
      border-radius: 12px;
      overflow: hidden;
      box-shadow: inset 0 1px 0 0 rgba(255, 255, 255, 0.05);
      background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0.03), transparent);
    }

    /* Status bar */
    .status-bar {
      display: flex; align-items: center; gap: 10px;
      padding: 12px 16px;
      font-size: 13px; font-weight: 600;
    }
    .status-bar.safe { background: rgba(34, 197, 94, 0.08); color: var(--cg-green-400, #4ade80); border-bottom: 1px solid rgba(34, 197, 94, 0.15); }
    .status-bar.flagged { background: rgba(245, 158, 11, 0.08); color: var(--cg-yellow-400, #fbbf24); border-bottom: 1px solid rgba(245, 158, 11, 0.15); }
    .status-bar.blocked { background: rgba(239, 68, 68, 0.08); color: var(--cg-red-400, #f87171); border-bottom: 1px solid rgba(239, 68, 68, 0.15); }

    .status-icon { font-size: 16px; }
    .status-text { flex: 1; }
    .severity {
      font-size: 10px; font-weight: 700; padding: 2px 8px; border-radius: 4px;
      text-transform: uppercase;
    }
    .severity.low { background: rgba(34, 197, 94, 0.12); color: var(--cg-color-status-success-text-default, #4ade80); }
    .severity.medium { background: rgba(245, 158, 11, 0.12); color: #fbbf24; }
    .severity.high { background: rgba(249, 115, 22, 0.12); color: #fb923c; }
    .severity.critical { background: rgba(239, 68, 68, 0.12); color: #f87171; }

    /* Policy checks */
    .checks { padding: 12px 16px; }
    .checks-label {
      font-size: 11px; font-weight: 700; color: var(--cg-gray-400, #a1a1aa);
      text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 8px;
    }

    .check {
      display: flex; align-items: flex-start; gap: 8px;
      padding: 6px 0;
      border-bottom: 1px solid var(--cg-gray-800, #27272a);
    }
    .check:last-child { border-bottom: none; }

    .check-icon { font-size: 13px; flex-shrink: 0; margin-top: 1px; }
    .check-icon.pass { color: var(--cg-green-400, #4ade80); }
    .check-icon.fail { color: var(--cg-red-400, #f87171); }

    .check-info { flex: 1; }
    .check-policy { font-size: 13px; color: var(--cg-color-surface-base-text, #fafafa); font-weight: 500; }
    .check-reason { font-size: 11px; color: var(--cg-gray-500, #71717a); margin-top: 2px; }

    /* Blocked content */
    .blocked-section {
      padding: 12px 16px;
      border-top: 1px solid var(--cg-gray-800, #27272a);
    }
    .blocked-label {
      font-size: 11px; font-weight: 700; color: var(--cg-red-400, #f87171);
      text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 8px;
    }
    .blocked-content {
      padding: 10px 12px; border-radius: 8px;
      background: rgba(239, 68, 68, 0.06);
      border: 1px solid rgba(239, 68, 68, 0.15);
      font-size: 12px; color: var(--cg-gray-400, #a1a1aa);
      font-family: var(--cg-font-family-mono, 'Fira Code', monospace);
      line-height: 1.5;
      filter: blur(3px);
      transition: filter 200ms;
      cursor: pointer;
    }
    .blocked-content.revealed { filter: none; }
    .blocked-hint {
      font-size: 11px; color: var(--cg-gray-500, #71717a);
      margin-top: 6px; text-align: center;
    }

    /* Override */
    .override-section {
      padding: 12px 16px;
      border-top: 1px solid var(--cg-gray-800, #27272a);
      display: flex; align-items: center; gap: 8px;
    }
    .override-btn {
      padding: 5px 14px; border-radius: 6px;
      border: 1px solid rgba(239, 68, 68, 0.3);
      background: rgba(239, 68, 68, 0.08);
      color: var(--cg-red-400, #f87171);
      font: inherit; font-size: 11px; font-weight: 700;
      cursor: pointer; transition: all 150ms;
    }
    .override-btn:hover { background: rgba(239, 68, 68, 0.15); }
    .override-warning {
      font-size: 11px; color: var(--cg-gray-500, #71717a); flex: 1;
    }
    .report-btn {
      padding: 5px 14px; border-radius: 6px;
      border: 1px solid var(--cg-gray-700, #3f3f46);
      background: none; color: var(--cg-gray-400, #a1a1aa);
      font: inherit; font-size: 11px; font-weight: 600;
      cursor: pointer; transition: all 150ms;
    }
    .report-btn:hover { border-color: var(--cg-gray-600, #52525b); color: var(--cg-color-surface-base-text, #fafafa); }
    }
  

    :focus-visible {
      outline: none;
      box-shadow: 0 0 0 2px var(--cg-color-surface-base-background, #09090b), 0 0 0 4px var(--cg-brand-ai-accent, #dfff61);
    }

    /* ── Rounded variants ── */
    :host([rounded="none"]) .panel { border-radius: 0; }
    :host([rounded="sm"]) .panel { border-radius: var(--cg-border-radius-50, 4px); }
    :host([rounded="md"]) .panel { border-radius: var(--cg-border-radius-100, 8px); }
    :host([rounded="lg"]) .panel { border-radius: var(--cg-border-radius-150, 12px); }
    :host([rounded="full"]) .panel { border-radius: var(--cg-border-radius-full, 99999px); }
  `];
  @property({ reflect: true }) rounded: 'none' | 'sm' | 'md' | 'lg' | 'full' = 'lg';
  @property({ type: String }) status: 'safe' | 'flagged' | 'blocked' = 'safe';
  @property({ type: Array }) checks: PolicyCheck[] = [];
  @property({ type: String }) blockedContent: string = '';
  @property({ type: Boolean }) allowOverride: boolean = false;
  @property({ type: String }) severityLevel: 'low' | 'medium' | 'high' | 'critical' = 'low';

  @state() private _revealed: boolean = false;

  private _getStatusIcon(): unknown {
    if (this.status === 'safe') return html`<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>`;
    if (this.status === 'flagged') return html`<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/></svg>`;
    return html`<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>`;
  }

  private _getStatusText(): string {
    if (this.status === 'safe') return 'All safety checks passed';
    if (this.status === 'flagged') return 'Content flagged for review';
    return 'Content blocked by safety filter';
  }

  private _handleOverride() {
    this.dispatchEvent(new CustomEvent('ai-guardrail-override', {
      bubbles: true, composed: true,
      detail: { status: this.status, severity: this.severityLevel },
    }));
  }

  private _handleReport() {
    this.dispatchEvent(new CustomEvent('ai-guardrail-report', {
      bubbles: true, composed: true,
      detail: { status: this.status, checks: this.checks },
    }));
  }

  override render() {
    return html`
      <div class="panel" role="alert" aria-live="polite" aria-atomic="true" aria-label="Safety filter: ${this.status}">
        <div class="status-bar ${this.status}">
          <span class="status-icon">${this._getStatusIcon()}</span>
          <span class="status-text">${this._getStatusText()}</span>
          ${this.status !== 'safe' ? html`<span class="severity ${this.severityLevel}">${this.severityLevel}</span>` : nothing}
        </div>

        ${this.checks.length > 0 ? html`
          <div class="checks">
            <div class="checks-label">Policy Checks (${this.checks.filter(c => c.passed).length}/${this.checks.length} passed)</div>
            ${this.checks.map(c => html`
              <div class="check">
                <span class="check-icon ${c.passed ? 'pass' : 'fail'}">${c.passed ? html`<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>` : html`<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>`}</span>
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
              @click=${() => {
                this._revealed = !this._revealed;
                this.dispatchEvent(new CustomEvent('ai-guardrail-reveal', {
                  bubbles: true, composed: true,
                  detail: { revealed: this._revealed },
                }));
              }}>${this.blockedContent}</div>
            <div class="blocked-hint">${this._revealed ? 'Click to hide' : 'Click to reveal (content may be harmful)'}</div>
          </div>
        ` : nothing}

        ${(this.allowOverride || this.status !== 'safe') ? html`
          <div class="override-section">
            <button class="report-btn" @click=${this._handleReport}>Report Issue</button>
            ${this.allowOverride ? html`
              <span class="override-warning">Override requires admin approval</span>
              <button class="override-btn" @click=${this._handleOverride}>Override</button>
            ` : nothing}
          </div>
        ` : nothing}
      </div>
    `;
  }
}
