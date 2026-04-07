/**
 * @element ai-token-tracker
 * LLM token usage and cost display with compact (inline badge) and
 * detailed (card with metrics grid) modes. Shows input/output tokens,
 * cost, latency bar, model badge, and optional budget progress bar.
 *
 * @example
 * ```html
 * <ai-token-tracker mode="compact" inputTokens="1200" outputTokens="340" cost="0.0042" latency="890"></ai-token-tracker>
 * <ai-token-tracker mode="detailed" inputTokens="1200" outputTokens="340" cost="0.0042"
 *   latency="890" model="gpt-4" budget="1.00"></ai-token-tracker>
 * ```
 *
 * @prop {number} inputTokens - Input token count
 * @prop {number} outputTokens - Output token count
 * @prop {number} cost - Cost in dollars
 * @prop {number} latency - Response latency in ms
 * @prop {string} model - Model name for the badge
 * @prop {number} budget - Max cost budget (shows progress bar when > 0)
 * @prop {'compact'|'detailed'} mode - Display mode (default 'compact')
 *
 * @fires {CustomEvent} ai-token-click - When the compact badge is clicked
 */
import { LitElement, html, css, nothing } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { hostBlock, reducedMotion, fadeSlideInKeyframes } from '../../styles/index.js';

@customElement('ai-token-tracker')
export class AiTokenTracker extends LitElement {
  static override styles = [hostBlock, reducedMotion, fadeSlideInKeyframes, css`
    :host {
      animation: fadeSlideIn var(--cg-motion-duration-fast) var(--cg-motion-easing-color);
    }

    /* Compact mode */
    .compact {
      display: inline-flex;
      align-items: center;
      gap: var(--cg-spacing-8);
      padding: var(--cg-spacing-4) var(--cg-spacing-12);
      border-radius: var(--cg-border-radius-100);
      background: var(--cg-color-surface-container-background);
      border: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
      font-size: var(--cg-font-size-xs);
      font-family: var(--cg-font-family-mono);
      color: var(--cg-color-input-text-placeholder);
      cursor: pointer;
      transition: border-color var(--cg-motion-duration-fast) var(--cg-motion-easing-default), transform var(--cg-motion-duration-fast) var(--cg-motion-easing-default);
    }
    .compact:hover { border-color: var(--cg-color-input-border-hover); }
    .compact:active { transform: scale(var(--cg-interaction-press-scale)); }
    .compact .sep { color: var(--cg-color-surface-cards-border); }
    .compact .tokens { color: var(--cg-color-surface-base-text); font-weight: var(--cg-font-weight-bold); }
    .compact .cost-val { color: var(--cg-color-status-success-text-default); }
    .compact .latency-val { color: var(--cg-color-input-text-placeholder); }

    /* Detailed mode */
    .detailed {
      padding: var(--cg-spacing-20);
      background: var(--cg-color-surface-cards-background);
      border: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
      border-radius: var(--cg-component-card-radius);
      min-width: 320px;
    }

    .detail-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: var(--cg-spacing-16);
    }
    .detail-title {
      font-size: var(--cg-font-size-xs);
      font-weight: var(--cg-font-weight-medium);
      color: var(--cg-color-input-text-placeholder);
      text-transform: uppercase;
      letter-spacing: var(--cg-letter-spacing-wide);
    }
    .model-badge {
      font-size: var(--cg-font-size-xs);
      padding: var(--cg-spacing-2) var(--cg-spacing-8);
      border-radius: var(--cg-border-radius-full);
      background: var(--cg-overlay-accent-subtle);
      color: var(--cg-color-surface-base-text);
      font-weight: var(--cg-font-weight-medium);
    }

    .metrics {
      display: flex;
      margin-bottom: var(--cg-spacing-16);
    }
    .metric {
      display: flex;
      flex-direction: column;
      gap: var(--cg-spacing-2);
      padding: 0 var(--cg-spacing-16);
      border-right: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
    }
    .metric:first-child { padding-left: 0; }
    .metric:last-child { border-right: none; padding-right: 0; }
    .metric-label {
      font-size: var(--cg-font-size-xs);
      color: var(--cg-color-input-text-placeholder);
      font-weight: var(--cg-font-weight-medium);
    }
    .metric-value {
      font-size: var(--cg-font-size-lg);
      font-weight: var(--cg-font-weight-semibold);
      font-family: var(--cg-font-family-mono);
      color: var(--cg-color-surface-base-text);
      letter-spacing: var(--cg-letter-spacing-tight);
    }
    .metric-value.green { color: var(--cg-color-status-success-text-default); }

    /* Budget */
    .budget {
      padding-top: var(--cg-spacing-12);
      border-top: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
    }
    .budget-header {
      display: flex;
      justify-content: space-between;
      font-size: var(--cg-font-size-xs);
      margin-bottom: var(--cg-spacing-6);
    }
    .budget-label { color: var(--cg-color-input-text-placeholder); }
    .budget-value { color: var(--cg-color-surface-base-text); font-weight: var(--cg-font-weight-semibold); }
    .budget-bar {
      height: var(--cg-spacing-6);
      border-radius: var(--cg-spacing-4);
      background: var(--cg-color-surface-container-background);
      overflow: hidden;
    }
    .budget-fill {
      height: 100%;
      border-radius: var(--cg-spacing-4);
      transition: width var(--cg-motion-duration-slow) var(--cg-motion-easing-default);
    }
    .budget-fill.ok { background: var(--cg-color-status-success-text-default); }
    .budget-fill.warning { background: var(--cg-color-status-warning-text-default); }
    .budget-fill.danger { background: var(--cg-color-status-error-text-default); }

    :focus-visible {
      outline: none;
      box-shadow: 0 0 0 3px var(--cg-overlay-accent-strong);
    }
  `];

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
            <span class="metric-value">${this.inputTokens.toLocaleString()}</span>
          </div>
          <div class="metric">
            <span class="metric-label">Output</span>
            <span class="metric-value">${this.outputTokens.toLocaleString()}</span>
          </div>
          <div class="metric">
            <span class="metric-label">Cost</span>
            <span class="metric-value green">${this._costStr}</span>
          </div>
          <div class="metric">
            <span class="metric-label">Latency</span>
            <span class="metric-value">${this._latencyStr}</span>
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
