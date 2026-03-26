/**
 * <ai-token-tracker> — Cost & Usage Display
 *
 * Compact or detailed view of LLM token usage, cost, latency.
 * Budget progress bar. Session aggregation.
 */
import { LitElement, html, css, nothing } from 'lit';
import { property, customElement } from 'lit/decorators.js';

@customElement('ai-token-tracker')
export class AiTokenTracker extends LitElement {
  static override styles = css`
    :host {
      display: block;
      font-family: var(--cg-font-family-primary, 'Inter Variable', 'Inter', -apple-system, sans-serif);
    }

    /* Compact mode */
    .compact {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 4px 12px;
      border-radius: 6px;
      background: var(--cg-color-surface-container-background, #18181b);
      border: 1px solid var(--cg-color-surface-container-border, #27272a);
      font-size: 11px;
      font-family: var(--cg-font-family-mono, 'Fira Code', monospace);
      color: var(--cg-gray-400, #a1a1aa);
      cursor: pointer;
      transition: all 150ms;
    }
    .compact:hover { border-color: var(--cg-gray-600, #52525b); }
    .compact .sep { color: var(--cg-gray-700, #3f3f46); }
    .compact .tokens { color: var(--cg-brand-ai-accent, #dfff61); font-weight: 700; }
    .compact .cost-val { color: var(--cg-green-400, #4ade80); }
    .compact .latency-val { color: var(--cg-gray-500, #71717a); }

    /* Detailed mode */
    .detailed {
      padding: 14px 16px;
      background: var(--cg-color-surface-container-background, #18181b);
      border: 1px solid var(--cg-color-surface-container-border, #27272a);
      border-radius: 10px;
    }

    .detail-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;
    }
    .detail-title {
      font-size: 12px;
      font-weight: 700;
      color: var(--cg-gray-400, #a1a1aa);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .model-badge {
      font-size: 10px;
      padding: 2px 8px;
      border-radius: 4px;
      background: rgba(223, 255, 97, 0.1);
      color: var(--cg-brand-ai-accent, #dfff61);
      font-weight: 700;
    }

    .metrics {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
      gap: 12px;
      margin-bottom: 12px;
    }
    .metric {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }
    .metric-label {
      font-size: 10px;
      color: var(--cg-gray-500, #71717a);
      font-weight: 600;
      text-transform: uppercase;
    }
    .metric-value {
      font-size: 16px;
      font-weight: 700;
      font-family: var(--cg-font-family-mono, 'Fira Code', monospace);
      color: var(--cg-color-surface-base-text, #fafafa);
    }
    .metric-value.accent { color: var(--cg-brand-ai-accent, #dfff61); }
    .metric-value.green { color: var(--cg-green-400, #4ade80); }

    /* Latency bar */
    .latency-bar {
      height: 4px;
      border-radius: 2px;
      background: var(--cg-gray-800, #27272a);
      overflow: hidden;
      margin-top: 4px;
    }
    .latency-fill {
      height: 100%;
      border-radius: 2px;
      transition: width 300ms ease;
    }
    .latency-fill.fast { background: var(--cg-green-400, #4ade80); }
    .latency-fill.medium { background: var(--cg-yellow-400, #fbbf24); }
    .latency-fill.slow { background: var(--cg-red-400, #f87171); }

    /* Budget */
    .budget {
      margin-top: 10px;
      padding-top: 10px;
      border-top: 1px solid var(--cg-gray-800, #27272a);
    }
    .budget-header {
      display: flex;
      justify-content: space-between;
      font-size: 11px;
      margin-bottom: 6px;
    }
    .budget-label { color: var(--cg-gray-500, #71717a); }
    .budget-value { color: var(--cg-color-surface-base-text, #fafafa); font-weight: 600; }
    .budget-bar {
      height: 6px;
      border-radius: 3px;
      background: var(--cg-gray-800, #27272a);
      overflow: hidden;
    }
    .budget-fill {
      height: 100%;
      border-radius: 3px;
      transition: width 300ms ease;
    }
    .budget-fill.ok { background: var(--cg-green-400, #4ade80); }
    .budget-fill.warning { background: var(--cg-yellow-400, #fbbf24); }
    .budget-fill.danger { background: var(--cg-red-400, #f87171); }

    @media (prefers-reduced-motion: reduce) {
      .latency-fill, .budget-fill, .compact { transition: none; }
    }
  `;

  @property({ type: Number }) inputTokens: number = 0;
  @property({ type: Number }) outputTokens: number = 0;
  @property({ type: Number }) cost: number = 0;
  @property({ type: Number }) latency: number = 0; // ms
  @property({ type: String }) model: string = '';
  @property({ type: Number }) budget: number = 0; // max cost
  @property({ type: String }) mode: 'compact' | 'detailed' = 'compact';

  private get _totalTokens() { return this.inputTokens + this.outputTokens; }
  private get _costStr() { return this.cost > 0 ? `$${this.cost.toFixed(4)}` : '$0'; }
  private get _latencyStr() {
    if (this.latency < 1000) return `${this.latency}ms`;
    return `${(this.latency / 1000).toFixed(1)}s`;
  }
  private get _latencyClass() {
    if (this.latency < 1000) return 'fast';
    if (this.latency < 3000) return 'medium';
    return 'slow';
  }
  private get _budgetPct() {
    if (this.budget <= 0) return 0;
    return Math.min((this.cost / this.budget) * 100, 100);
  }
  private get _budgetClass() {
    const pct = this._budgetPct;
    if (pct < 60) return 'ok';
    if (pct < 85) return 'warning';
    return 'danger';
  }

  private _handleClick() {
    this.dispatchEvent(new CustomEvent('ai-token-click', {
      bubbles: true, composed: true,
      detail: { inputTokens: this.inputTokens, outputTokens: this.outputTokens, cost: this.cost, latency: this.latency, model: this.model },
    }));
  }

  override render() {
    if (this.mode === 'compact') {
      return html`
        <div class="compact" role="status" aria-live="polite" aria-label="Token usage: ${this._totalTokens} tokens, ${this._costStr}, ${this._latencyStr}"
          @click=${this._handleClick}>
          <span class="tokens">${this._totalTokens.toLocaleString()}</span> tokens
          <span class="sep">·</span>
          <span class="cost-val">${this._costStr}</span>
          <span class="sep">·</span>
          <span class="latency-val">${this._latencyStr}</span>
        </div>
      `;
    }

    return html`
      <div class="detailed" role="status" aria-live="polite" aria-label="Token usage details">
        <div class="detail-header">
          <span class="detail-title">Usage</span>
          ${this.model ? html`<span class="model-badge">${this.model}</span>` : nothing}
        </div>

        <div class="metrics">
          <div class="metric">
            <span class="metric-label">Input</span>
            <span class="metric-value accent">${this.inputTokens.toLocaleString()}</span>
          </div>
          <div class="metric">
            <span class="metric-label">Output</span>
            <span class="metric-value accent">${this.outputTokens.toLocaleString()}</span>
          </div>
          <div class="metric">
            <span class="metric-label">Cost</span>
            <span class="metric-value green">${this._costStr}</span>
          </div>
          <div class="metric">
            <span class="metric-label">Latency</span>
            <span class="metric-value">${this._latencyStr}</span>
            <div class="latency-bar">
              <div class="latency-fill ${this._latencyClass}" style="width: ${Math.min(this.latency / 5000, 100)}%"></div>
            </div>
          </div>
        </div>

        ${this.budget > 0 ? html`
          <div class="budget">
            <div class="budget-header">
              <span class="budget-label">Budget</span>
              <span class="budget-value">${this._costStr} / $${this.budget.toFixed(2)}</span>
            </div>
            <div class="budget-bar">
              <div class="budget-fill ${this._budgetClass}" style="width: ${this._budgetPct}%"></div>
            </div>
          </div>
        ` : nothing}
      </div>
    `;
  }
}
