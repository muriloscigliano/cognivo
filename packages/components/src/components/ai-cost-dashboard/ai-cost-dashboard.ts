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
      animation: fadeSlideIn var(--cg-motion-duration-fast, 200ms) var(--cg-motion-easing-color, cubic-bezier(0, 0, 0.58, 1));
    }
    :host([hidden]) { display: none; }

    .container {
      background: #18181b;
      background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0.03), transparent);
      border: 1px solid #27272a;
      border-radius: 12px;
      padding: 20px;
      color: #fafafa;
      box-shadow: inset 0 1px 0 0 rgba(255, 255, 255, 0.05);
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      margin-bottom: 16px;
    }

    .title {
      font-size: 14px;
      font-weight: 600;
    }

    .period {
      font-size: 11px;
      color: #71717a;
    }

    /* ── Summary cards ── */
    .summary {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 10px;
      margin-bottom: 16px;
    }

    .stat-card {
      background: #09090b;
      border: 1px solid #27272a;
      border-radius: 8px;
      padding: 12px;
    }

    .stat-label {
      font-size: 11px;
      color: #71717a;
      margin-bottom: 4px;
    }

    .stat-value {
      font-size: 18px;
      font-weight: 700;
      color: #dfff61;
    }

    .stat-value.warn { color: #eab308; }
    .stat-value.danger { color: #ef4444; }

    /* ── Budget bar ── */
    .budget-section {
      margin-bottom: 16px;
    }

    .budget-header {
      display: flex;
      justify-content: space-between;
      font-size: 11px;
      color: #71717a;
      margin-bottom: 6px;
    }

    .budget-track {
      height: 8px;
      background: #27272a;
      border-radius: 4px;
      overflow: hidden;
    }

    .budget-fill {
      height: 100%;
      border-radius: 4px;
      background: #dfff61;
      transition: width 300ms ease;
    }
    .budget-fill.warn { background: #eab308; }
    .budget-fill.danger { background: #ef4444; }

    /* ── Model breakdown ── */
    .breakdown-title {
      font-size: 12px;
      font-weight: 600;
      color: #a1a1aa;
      margin-bottom: 8px;
    }

    .model-row {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 6px;
      cursor: pointer;
      padding: 4px 0;
      transition: opacity 120ms ease;
    }
    .model-row:hover { opacity: 0.85; }
    .model-row:focus-visible {
      outline: 2px solid #dfff61;
      outline-offset: 2px;
    }

    .model-name {
      font-size: 12px;
      color: #d4d4d8;
      width: 100px;
      flex-shrink: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .model-bar-track {
      flex: 1;
      height: 6px;
      background: #27272a;
      border-radius: 3px;
      overflow: hidden;
    }

    .model-bar-fill {
      height: 100%;
      border-radius: 3px;
      background: #dfff61;
      transition: width 300ms ease;
    }

    .model-cost {
      font-size: 11px;
      color: #71717a;
      width: 60px;
      text-align: right;
      flex-shrink: 0;
    }

    /* ── Mini trend chart ── */
    .trend-section {
      margin-top: 16px;
    }

    .trend-title {
      font-size: 12px;
      font-weight: 600;
      color: #a1a1aa;
      margin-bottom: 8px;
    }

    .trend-chart {
      display: flex;
      align-items: flex-end;
      gap: 3px;
      height: 48px;
    }

    .trend-bar {
      flex: 1;
      background: #dfff61;
      border-radius: 2px 2px 0 0;
      min-height: 2px;
      transition: height 200ms ease;
      opacity: 0.7;
    }
    .trend-bar:hover {
      opacity: 1;
    }

    .empty-state {
      text-align: center;
      color: #52525b;
      font-size: 13px;
      padding: 32px 0;
    }
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
