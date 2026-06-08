/**
 * @element ai-scenario-panel
 * What-if scenario comparison panel. Clean list with probability, outcome, and status.
 *
 * @fires {CustomEvent<{id: string}>} ai-scenario-select
 * @fires {CustomEvent<{id: string}>} ai-scenario-run
 */
import { LitElement, html, css, nothing } from 'lit';
import { property, state, customElement } from 'lit/decorators.js';
import { hostBlock, reducedMotion } from '../../styles/index.js';

interface Scenario {
  id: string;
  label: string;
  description?: string;
  probability?: number;
  outcome?: string;
  status?: 'idle' | 'running' | 'complete' | 'error';
}

@customElement('ai-scenario-panel')
export class AiScenarioPanel extends LitElement {
  static override styles = [hostBlock, reducedMotion, css`
    :host { display: block; }

    .panel {
      background: var(--cg-color-surface-cards-background);
      border: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
      border-radius: var(--cg-component-card-radius);
      overflow: hidden;
    }

    .header {
      display: flex;
      align-items: center;
      gap: var(--cg-spacing-8);
      padding: var(--cg-spacing-20) var(--cg-spacing-20) var(--cg-spacing-12);
    }
    .header-title {
      font-size: var(--cg-font-size-sm);
      font-weight: var(--cg-font-weight-semibold);
      color: var(--cg-color-surface-base-text);
    }

    /* Scenarios list */
    .scenarios {
      margin: 0 var(--cg-spacing-12) var(--cg-spacing-12);
      background: var(--cg-overlay-dark-subtle);
      border: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
      border-radius: var(--cg-border-radius-125);
      overflow: hidden;
    }

    .scenario {
      display: flex;
      align-items: center;
      gap: var(--cg-spacing-12);
      padding: var(--cg-spacing-16) var(--cg-spacing-16);
      border-bottom: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
      cursor: pointer;
      transition: background-color var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
    }
    .scenario:last-child { border-bottom: none; }
    .scenario:hover { background: var(--cg-color-action-secondary-background-hover); }
    .scenario.active {
      background: var(--cg-overlay-dark-subtle);
    }
    .scenario:focus-visible {
      outline: none;
      box-shadow: inset 0 0 0 var(--cg-outline-width-default) var(--cg-overlay-accent-strong);
    }

    .scenario-info { flex: 1; min-width: 0; }
    .scenario-label {
      font-size: var(--cg-font-size-sm);
      font-weight: var(--cg-font-weight-medium);
      color: var(--cg-color-surface-base-text);
    }
    .scenario-desc {
      font-size: var(--cg-font-size-xs);
      color: var(--cg-color-input-text-placeholder);
      margin-top: var(--cg-spacing-2);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    /* Right side metrics */
    .scenario-metrics {
      display: flex;
      align-items: center;
      gap: var(--cg-spacing-16);
      flex-shrink: 0;
    }
    .metric {
      text-align: right;
    }
    .metric-val {
      font-size: var(--cg-font-size-sm);
      font-weight: var(--cg-font-weight-semibold);
      font-family: var(--cg-font-family-mono);
      color: var(--cg-color-surface-base-text);
    }
    .metric-label {
      font-size: var(--cg-font-size-xs);
      color: var(--cg-color-input-text-placeholder);
    }

    /* Status dot */
    .status-dot {
      width: var(--cg-spacing-8);
      height: var(--cg-spacing-8);
      border-radius: var(--cg-border-radius-full);
      flex-shrink: 0;
    }
    .status-dot.idle { background: var(--cg-color-input-text-placeholder); }
    .status-dot.running { background: var(--cg-color-status-warning-text-default); }
    .status-dot.complete { background: var(--cg-color-status-success-text-default); }
    .status-dot.error { background: var(--cg-color-status-error-text-default); }

    /* Footer */
    .footer {
      padding: var(--cg-spacing-12);
    }

    .empty {
      padding: var(--cg-spacing-32) var(--cg-spacing-20);
      text-align: center;
      color: var(--cg-color-input-text-placeholder);
      font-size: var(--cg-font-size-sm);
    }
  `];

  @property({ type: Array }) scenarios: Scenario[] = [];
  @property() activeScenario = '';
  @property({ type: Boolean }) loading = false;

  private _select(id: string) {
    this.activeScenario = id;
    this.dispatchEvent(new CustomEvent('ai-scenario-select', { bubbles: true, composed: true, detail: { id } }));
  }

  override render() {
    if (this.loading) {
      return html`<div class="panel"><div class="empty">Loading scenarios...</div></div>`;
    }

    if (!this.scenarios.length) {
      return html`<div class="panel"><div class="empty">No scenarios available.</div></div>`;
    }

    return html`
      <div class="panel" role="listbox" aria-label="Scenarios">
        <div class="header">
          <span class="header-title">Scenarios</span>
        </div>
        <div class="scenarios">
          ${this.scenarios.map(s => html`
            <div class="scenario ${s.id === this.activeScenario ? 'active' : ''}"
              role="option" tabindex="0"
              aria-selected="${s.id === this.activeScenario}"
              @click=${() => this._select(s.id)}
              @keydown=${(e: KeyboardEvent) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); this._select(s.id); } }}>
              <span class="status-dot ${s.status || 'idle'}"></span>
              <div class="scenario-info">
                <div class="scenario-label">${s.label}</div>
                ${s.description ? html`<div class="scenario-desc">${s.description}</div>` : nothing}
              </div>
              <div class="scenario-metrics">
                ${s.probability != null ? html`
                  <div class="metric">
                    <div class="metric-val">${Math.round(s.probability * 100)}%</div>
                    <div class="metric-label">Prob</div>
                  </div>
                ` : nothing}
                ${s.outcome ? html`
                  <div class="metric">
                    <div class="metric-val">${s.outcome}</div>
                    <div class="metric-label">Outcome</div>
                  </div>
                ` : nothing}
              </div>
            </div>
          `)}
        </div>
      </div>
    `;
  }
}
