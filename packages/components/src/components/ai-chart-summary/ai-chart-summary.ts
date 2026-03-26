/**
 * <ai-chart-summary> — Interactive Insight Overlay
 *
 * Confidence score, interactive trend clicks, drill-down links,
 * insight type badges, time range, refresh, loading, compact mode.
 */
import { LitElement, html, css, nothing } from 'lit';
import { property, state, customElement } from 'lit/decorators.js';

interface Trend {
  label: string;
  direction: 'up' | 'down' | 'neutral';
  value: string;
}

@customElement('ai-chart-summary')
export class AiChartSummary extends LitElement {
  static override styles = css`
    :host {
      transition: color 100ms cubic-bezier(0, 0, 0.58, 1);
      animation: fadeSlideIn 200ms cubic-bezier(0, 0, 0.58, 1);
      display: block;
      font-family: var(--cg-font-family-primary, 'Inter Variable', 'Inter', -apple-system, sans-serif);
    }

    .summary {
      background: var(--cg-color-surface-container-background, #18181b);
      border: 1px solid var(--cg-color-surface-container-border, #27272a);
      border-radius: 12px;
      padding: 14px 16px;
      animation: slideUp 300ms ease;
    }

    @keyframes slideUp {
      from { opacity: 0; transform: translateY(8px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .header {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 10px;
    }

    .ai-dot {
      width: 18px;
      height: 18px;
      background: linear-gradient(135deg, var(--cg-brand-ai-accent, #dfff61), var(--cg-brand-ai-highlight, #e2ff70));
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 9px;
      font-weight: 800;
      color: #000;
      flex-shrink: 0;
    }

    .label {
      font-size: 11px;
      font-weight: 700;
      color: var(--cg-brand-ai-accent, #dfff61);
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .type-badge {
      font-size: 10px;
      padding: 1px 8px;
      border-radius: 4px;
      font-weight: 700;
      text-transform: uppercase;
    }
    .type-badge.summary { background: rgba(59, 130, 246, 0.12); color: #60a5fa; }
    .type-badge.anomaly { background: rgba(239, 68, 68, 0.12); color: #f87171; }
    .type-badge.forecast { background: rgba(223, 255, 97, 0.12); color: #dfff61; }
    .type-badge.comparison { background: rgba(139, 92, 246, 0.12); color: #a78bfa; }

    .time-range {
      font-size: 10px;
      color: var(--cg-gray-500, #71717a);
      margin-left: auto;
    }

    .header-actions { display: flex; gap: 4px; margin-left: auto; }
    .icon-btn {
      background: none;
      border: 1px solid var(--cg-gray-700, #3f3f46);
      color: var(--cg-gray-500, #71717a);
      border-radius: 6px;
      width: 24px;
      height: 24px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      transition: all 150ms;
      padding: 0;
    }
    .icon-btn:hover { color: var(--cg-brand-ai-accent, #dfff61); border-color: rgba(223, 255, 97, 0.3); }

    .text {
      font-size: 14px;
      color: var(--cg-color-surface-base-text, #fafafa);
      line-height: 1.5;
      margin-bottom: 10px;
    }

    .trends {
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
    }

    .trend {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      font-size: 12px;
      font-weight: 600;
      cursor: pointer;
      padding: 3px 10px;
      border-radius: 6px;
      transition: all 150ms;
      border: 1px solid transparent;
    }
    .trend:hover {
      background: rgba(255, 255, 255, 0.04);
      border-color: var(--cg-gray-700, #3f3f46);
    }
    .trend.up { color: var(--cg-green-400, #4ade80); }
    .trend.down { color: var(--cg-red-400, #f87171); }
    .trend.neutral { color: var(--cg-gray-500, #71717a); }

    .trend-icon { font-size: 14px; }

    .collapsed .text, .collapsed .trends { display: none; }

    .toggle {
      background: none;
      border: none;
      color: var(--cg-gray-500, #71717a);
      cursor: pointer;
      font-size: 11px;
      padding: 0;
      font-family: inherit;
    }
    .toggle:hover { color: var(--cg-brand-ai-accent, #dfff61); }

    /* Compact mode */
    :host([compact]) .summary { padding: 8px 14px; }
    :host([compact]) .text { display: none; }
    :host([compact]) .trends { gap: 8px; }

    /* Loading */
    .loading-bar {
      height: 8px;
      border-radius: 4px;
      background: linear-gradient(90deg, var(--cg-gray-800, #27272a) 25%, var(--cg-gray-700, #3f3f46) 50%, var(--cg-gray-800, #27272a) 75%);
      background-size: 200% 100%;
      animation: shimmer 1.5s linear infinite;
      margin-bottom: 8px;
    }
    .loading-bar:nth-child(1) { width: 80%; }
    .loading-bar:nth-child(2) { width: 50%; }

    @keyframes shimmer {
      0% { background-position: 200% 0; }
      100% { background-position: -200% 0; }
    }

    @media (prefers-reduced-motion: reduce) {
      .summary, .loading-bar { animation: none; }
    }
  

    :focus-visible {
      outline: none;
      box-shadow: 0 0 0 2px var(--cg-color-surface-base-background, #09090b), 0 0 0 4px var(--cg-brand-ai-accent, #dfff61);
    }
  
    @keyframes fadeSlideIn {
      from { opacity: 0; transform: translateY(4px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `;

  @property({ type: String }) summary: string = '';
  @property({ type: Array }) trends: Trend[] = [];
  @property({ type: Boolean }) collapsible: boolean = false;
  @property({ type: Number }) confidence: number = 0;
  @property({ type: String }) type: 'summary' | 'anomaly' | 'forecast' | 'comparison' = 'summary';
  @property({ type: Boolean, reflect: true }) compact: boolean = false;
  @property({ type: Boolean }) loading: boolean = false;
  @property({ type: String }) timeRange: string = '';

  @state() private _collapsed: boolean = false;

  private _toggle() {
    this._collapsed = !this._collapsed;
    this.dispatchEvent(new CustomEvent('ai-summary-toggle', { bubbles: true, composed: true, detail: { collapsed: this._collapsed } }));
  }

  private _handleTrendClick(trend: Trend) {
    this.dispatchEvent(new CustomEvent('ai-summary-trend-click', {
      bubbles: true, composed: true,
      detail: { label: trend.label, direction: trend.direction, value: trend.value },
    }));
  }

  private _handleRefresh() {
    this.dispatchEvent(new CustomEvent('ai-summary-refresh', { bubbles: true, composed: true }));
  }

  override render() {
    if (this.loading) {
      return html`
        <div class="summary">
          <div class="header">
            <div class="ai-dot" aria-hidden="true">AI</div>
            <span class="label">AI Insight</span>
          </div>
          <div class="loading-bar"></div>
          <div class="loading-bar"></div>
        </div>
      `;
    }

    if (!this.summary) return nothing;

    return html`
      <div class="summary ${this._collapsed ? 'collapsed' : ''}" role="complementary" aria-label="AI chart summary">
        <div class="header">
          <div class="ai-dot" aria-hidden="true">AI</div>
          <span class="label">AI Insight</span>
          ${this.type !== 'summary' ? html`<span class="type-badge ${this.type}">${this.type}</span>` : nothing}
          ${this.confidence > 0 ? html`<ai-badge score="${this.confidence}" size="sm"></ai-badge>` : nothing}
          ${this.timeRange ? html`<span class="time-range">${this.timeRange}</span>` : nothing}

          <div class="header-actions">
            <button class="icon-btn" @click=${this._handleRefresh} title="Refresh" aria-label="Refresh insight">↻</button>
            ${this.collapsible ? html`
              <button class="icon-btn" @click=${this._toggle}
                aria-expanded="${!this._collapsed}" aria-label="${this._collapsed ? 'Show' : 'Hide'} insight">
                ${this._collapsed ? '▼' : '▲'}
              </button>
            ` : nothing}
          </div>
        </div>

        <div class="text">${this.summary}</div>

        ${this.trends.length > 0 ? html`
          <div class="trends">
            ${this.trends.map(t => html`
              <span class="trend ${t.direction}" @click=${() => this._handleTrendClick(t)}
                role="button" tabindex="0" aria-label="${t.label}: ${t.value} (${t.direction})">
                <span class="trend-icon" aria-hidden="true">
                  ${t.direction === 'up' ? '↑' : t.direction === 'down' ? '↓' : '→'}
                </span>
                ${t.label}: ${t.value}
              </span>
            `)}
          </div>
        ` : nothing}
      </div>
    `;
  }
}
