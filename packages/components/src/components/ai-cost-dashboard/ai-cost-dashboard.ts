/**
 * @element ai-cost-dashboard
 * Aggregate AI cost dashboard with summary cards, budget bar, per-model breakdown, and daily trend chart.
 *
 * @example
 * ```html
 * <ai-cost-dashboard
 *   .entries=${[{date:'2024-03-15', model:'gpt-4o', inputTokens:50000, outputTokens:12000, cost:0.42}]}
 *   budget="50"
 *   period="March 2024"
 * ></ai-cost-dashboard>
 * ```
 *
 * @fires {CustomEvent<{model: string, cost: number}>} ai-cost-entry-click - Model row clicked
 */
import { LitElement, html, css, nothing } from 'lit';
import { property, state, customElement } from 'lit/decorators.js';
import { hostBlock, reducedMotion, fadeSlideInKeyframes } from '../../styles/index.js';

interface CostEntry {
  date: string;
  model: string;
  inputTokens: number;
  outputTokens: number;
  cost: number;
}

@customElement('ai-cost-dashboard')
export class AiCostDashboard extends LitElement {
  static override styles = [hostBlock, reducedMotion, fadeSlideInKeyframes, css`
    :host {
      animation: fadeSlideIn var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
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
      justify-content: space-between;
      align-items: baseline;
      padding-bottom: var(--cg-spacing-16);
      margin-bottom: var(--cg-spacing-16);
      border-bottom: var(--cg-border-width-50) solid var(--cg-color-surface-cards-divider);
    }

    .title {
      font-size: var(--cg-font-size-base);
      font-weight: var(--cg-font-weight-bold);
    }

    .period {
      font-size: var(--cg-font-size-xs);
      color: var(--cg-color-input-text-placeholder);
    }

    /* ── Summary cards ── */
    .summary {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: var(--cg-spacing-8);
      margin-bottom: var(--cg-spacing-16);
    }

    .stat-card {
      background: var(--cg-color-surface-base-background);
      border: var(--cg-border-width-50) solid var(--cg-color-surface-cards-divider);
      border-radius: var(--cg-border-radius-100);
      padding: var(--cg-spacing-12);
    }

    .stat-label {
      font-size: var(--cg-font-size-xs);
      color: var(--cg-color-input-text-placeholder);
      margin-bottom: var(--cg-spacing-4);
    }

    .stat-value {
      font-size: var(--cg-font-size-lg);
      font-weight: var(--cg-font-weight-bold);
      color: var(--cg-color-surface-base-text);
    }

    .stat-value.warn { color: var(--cg-color-status-warning-text-default); }
    .stat-value.danger { color: var(--cg-color-status-error-text-default); }

    /* ── Budget bar ── */
    .budget-section {
      margin-bottom: var(--cg-spacing-16);
    }

    .budget-header {
      display: flex;
      justify-content: space-between;
      font-size: var(--cg-font-size-xs);
      color: var(--cg-color-input-text-placeholder);
      margin-bottom: var(--cg-spacing-6);
    }

    .budget-track {
      height: var(--cg-spacing-8);
      background: var(--cg-color-surface-cards-divider);
      border-radius: var(--cg-border-radius-100);
      overflow: hidden;
    }

    .budget-fill {
      height: 100%;
      border-radius: var(--cg-border-radius-100);
      background: var(--cg-color-action-primary-background-default);
      transition: width var(--cg-transition-duration-slow) var(--cg-transition-easing-default);
    }
    .budget-fill.warn { background: var(--cg-color-status-warning-text-default); }
    .budget-fill.danger { background: var(--cg-color-status-error-text-default); }

    /* ── Model breakdown ── */
    .breakdown-title {
      font-size: var(--cg-font-size-xs);
      font-weight: var(--cg-font-weight-semibold);
      color: var(--cg-color-input-text-placeholder);
      margin-bottom: var(--cg-spacing-12);
      padding-top: var(--cg-spacing-16);
      border-top: var(--cg-border-width-50) solid var(--cg-color-surface-cards-divider);
      text-transform: uppercase;
      letter-spacing: var(--cg-letter-spacing-wide);
    }

    .model-row {
      display: flex;
      align-items: center;
      gap: var(--cg-spacing-8);
      cursor: pointer;
      padding: var(--cg-spacing-8) 0;
      border-bottom: var(--cg-border-width-50) solid var(--cg-color-surface-cards-divider);
      transition: opacity var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
    }
    .model-row:last-of-type { border-bottom: none; }
    .model-row:hover { opacity: 0.85; }
    .model-row:active { transform: scale(var(--cg-interaction-press-scale)); }
    .model-row:focus-visible {
      outline: none;
      box-shadow: 0 0 0 3px var(--cg-overlay-accent-strong);
    }

    .model-name {
      font-size: var(--cg-font-size-xs);
      color: var(--cg-color-surface-base-text);
      min-width: var(--cg-spacing-96);
      flex-shrink: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .model-bar-track {
      flex: 1;
      height: var(--cg-spacing-6);
      background: var(--cg-color-surface-cards-divider);
      border-radius: var(--cg-border-radius-100);
      overflow: hidden;
    }

    .model-bar-fill {
      height: 100%;
      border-radius: var(--cg-border-radius-100);
      background: var(--cg-color-action-primary-background-default);
      transition: width var(--cg-transition-duration-slow) var(--cg-transition-easing-default);
    }

    .model-cost {
      font-size: var(--cg-font-size-xs);
      color: var(--cg-color-input-text-placeholder);
      min-width: var(--cg-spacing-56);
      text-align: right;
      flex-shrink: 0;
    }

    /* ── Mini trend chart ── */
    .trend-section {
      margin-top: var(--cg-spacing-16);
      padding-top: var(--cg-spacing-16);
      border-top: var(--cg-border-width-50) solid var(--cg-color-surface-cards-divider);
    }

    .trend-title {
      font-size: var(--cg-font-size-xs);
      font-weight: var(--cg-font-weight-semibold);
      color: var(--cg-color-input-text-placeholder);
      margin-bottom: var(--cg-spacing-12);
      text-transform: uppercase;
      letter-spacing: var(--cg-letter-spacing-wide);
    }

    .trend-chart {
      display: flex;
      align-items: flex-end;
      gap: var(--cg-spacing-3);
      height: var(--cg-spacing-48);
    }

    .trend-bar {
      flex: 1;
      background: var(--cg-color-action-primary-background-default);
      border-radius: var(--cg-border-radius-50) var(--cg-border-radius-50) 0 0;
      min-height: var(--cg-spacing-2);
      transition: height var(--cg-transition-duration-default) var(--cg-transition-easing-default);
      opacity: 0.7;
    }
    .trend-bar:hover {
      opacity: 1;
    }

    .empty-state {
      text-align: center;
      color: var(--cg-color-input-border-hover);
      font-size: var(--cg-font-size-sm);
      padding: var(--cg-spacing-24) 0;
    }
  `];
  @property({ type: Array }) entries: CostEntry[] = [];
  @property({ type: Number }) budget = 0;
  @property({ type: String }) period = '';

  private get _totalCost(): number {
    return this.entries.reduce((sum, e) => sum + e.cost, 0);
  }

  private get _totalTokens(): number {
    return this.entries.reduce((sum, e) => sum + e.inputTokens + e.outputTokens, 0);
  }

  private get _modelBreakdown(): { model: string; cost: number }[] {
    const map = new Map<string, number>();
    for (const e of this.entries) {
      map.set(e.model, (map.get(e.model) || 0) + e.cost);
    }
    return [...map.entries()]
      .map(([model, cost]) => ({ model, cost }))
      .sort((a, b) => b.cost - a.cost);
  }

  private get _dailyTrend(): { date: string; cost: number }[] {
    const map = new Map<string, number>();
    for (const e of this.entries) {
      map.set(e.date, (map.get(e.date) || 0) + e.cost);
    }
    return [...map.entries()]
      .map(([date, cost]) => ({ date, cost }))
      .sort((a, b) => a.date.localeCompare(b.date));
  }

  private _budgetPercent(): number {
    if (this.budget <= 0) return 0;
    return Math.min((this._totalCost / this.budget) * 100, 100);
  }

  private _handleEntryClick(detail: Record<string, unknown>) {
    this.dispatchEvent(new CustomEvent('ai-cost-entry-click', {
      detail,
      bubbles: true,
      composed: true,
    }));
  }

  override render() {
    if (!this.entries.length) {
      return html`<div class="container"><div class="empty-state">No cost data available</div></div>`;
    }

    const bp = this._budgetPercent();
    const budgetClass = bp > 90 ? 'danger' : bp > 70 ? 'warn' : '';
    const maxModelCost = Math.max(...this._modelBreakdown.map(m => m.cost), 0.01);
    const trend = this._dailyTrend;
    const maxDailyCost = Math.max(...trend.map(t => t.cost), 0.01);

    return html`
      <div class="container" role="region" aria-label="AI cost dashboard">
        <div class="header">
          <span class="title">Cost Overview</span>
          ${this.period ? html`<span class="period">${this.period}</span>` : nothing}
        </div>

        <div class="summary">
          <div class="stat-card">
            <div class="stat-label">Total Cost</div>
            <div class="stat-value ${budgetClass}">$${this._totalCost.toFixed(2)}</div>
          </div>
          <div class="stat-card">
            <div class="stat-label">Total Tokens</div>
            <div class="stat-value">${this._totalTokens.toLocaleString()}</div>
          </div>
          <div class="stat-card">
            <div class="stat-label">Models Used</div>
            <div class="stat-value">${this._modelBreakdown.length}</div>
          </div>
        </div>

        ${this.budget > 0 ? html`
          <div class="budget-section">
            <div class="budget-header">
              <span>Budget: $${this.budget.toFixed(2)}</span>
              <span>${bp.toFixed(0)}% used</span>
            </div>
            <div class="budget-track" role="progressbar" aria-valuenow=${bp} aria-valuemin="0" aria-valuemax="100" aria-label="Budget usage">
              <div class="budget-fill ${budgetClass}" style="width:${bp}%"></div>
            </div>
          </div>
        ` : nothing}

        <div class="breakdown-title">Per-Model Breakdown</div>
        ${this._modelBreakdown.map(m => html`
          <div
            class="model-row"
            role="button"
            tabindex="0"
            aria-label="${m.model}: $${m.cost.toFixed(2)}"
            @click=${() => this._handleEntryClick({ model: m.model, cost: m.cost })}
            @keydown=${(e: KeyboardEvent) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); this._handleEntryClick({ model: m.model, cost: m.cost }); } }}
          >
            <span class="model-name">${m.model}</span>
            <div class="model-bar-track">
              <div class="model-bar-fill" style="width:${(m.cost / maxModelCost * 100).toFixed(1)}%"></div>
            </div>
            <span class="model-cost">$${m.cost.toFixed(2)}</span>
          </div>
        `)}

        ${trend.length > 1 ? html`
          <div class="trend-section">
            <div class="trend-title">Daily Trend</div>
            <div class="trend-chart" role="img" aria-label="Daily cost trend chart">
              ${trend.map(t => html`
                <div
                  class="trend-bar"
                  style="height:${Math.max((t.cost / maxDailyCost * 100), 4)}%"
                  title="${t.date}: $${t.cost.toFixed(2)}"
                ></div>
              `)}
            </div>
          </div>
        ` : nothing}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ai-cost-dashboard': AiCostDashboard;
  }
}
