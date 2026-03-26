/**
 * <ai-model-comparison> — Full Comparison Table of Model Capabilities
 *
 * Table with models as columns, metrics as rows.
 * Color-coded scores, highlight best per row.
 * Click to select a model.
 * Keyboard accessible with proper table semantics.
 */
import { LitElement, html, css, nothing } from 'lit';
import { property, customElement } from 'lit/decorators.js';

export interface ComparisonModel {
  name: string;
  provider: string;
  scores: Record<string, number>;
  costTier: string;
  contextWindow: number;
}

@customElement('ai-model-comparison')
export class AiModelComparison extends LitElement {
  static override styles = css`
    :host {
      display: block;
      font-family: var(--cg-font-family-primary, 'Inter Variable', 'Inter', -apple-system, sans-serif);
    }
    :host([hidden]) { display: none; }

    .wrapper {
      overflow-x: auto;
      border: 1px solid var(--cg-color-border-primary, #27272a);
      border-radius: 12px;
      background: var(--cg-color-bg-primary, #18181b);
    }

    table {
      width: 100%;
      border-collapse: collapse;
      font-size: 13px;
    }

    th, td {
      padding: 10px 14px;
      text-align: left;
      border-bottom: 1px solid var(--cg-color-border-primary, #27272a);
    }

    th {
      color: var(--cg-color-text-secondary, #a1a1aa);
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      position: sticky;
      top: 0;
      background: var(--cg-color-bg-secondary, #27272a);
    }

    .model-header {
      text-align: center;
      min-width: 120px;
    }

    .model-name {
      color: var(--cg-color-text-primary, #fafafa);
      font-weight: 700;
      font-size: 13px;
    }

    .model-provider {
      color: var(--cg-color-text-secondary, #a1a1aa);
      font-size: 11px;
    }

    .metric-label {
      color: var(--cg-color-text-primary, #fafafa);
      font-weight: 600;
      white-space: nowrap;
    }

    .score-cell {
      text-align: center;
      font-variant-numeric: tabular-nums;
    }

    .score-bar-wrapper {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
    }

    .score-bar-track {
      width: 60px;
      height: 6px;
      background: var(--cg-color-border-primary, #3f3f46);
      border-radius: 3px;
      overflow: hidden;
    }

    .score-bar-fill {
      height: 100%;
      border-radius: 3px;
      transition: width 300ms ease;
    }
    .score-bar-fill.low    { background: #ef4444; }
    .score-bar-fill.mid    { background: #eab308; }
    .score-bar-fill.high   { background: #22c55e; }
    .score-bar-fill.best   { background: var(--cg-brand-ai-accent, #dfff61); }

    .score-value {
      font-size: 12px;
      font-weight: 600;
      color: var(--cg-color-text-primary, #fafafa);
    }
    .score-value.best {
      color: var(--cg-brand-ai-accent, #dfff61);
    }

    .meta-cell {
      text-align: center;
      color: var(--cg-color-text-secondary, #a1a1aa);
      font-size: 12px;
    }

    .cost-badge {
      display: inline-block;
      padding: 2px 8px;
      border-radius: 4px;
      font-size: 11px;
      font-weight: 700;
      background: var(--cg-color-bg-secondary, #27272a);
      border: 1px solid var(--cg-color-border-primary, #3f3f46);
      color: var(--cg-color-text-primary, #fafafa);
    }

    .select-btn {
      display: block;
      margin: 4px auto 0;
      padding: 6px 16px;
      border-radius: 6px;
      border: 1px solid var(--cg-color-border-primary, #3f3f46);
      background: transparent;
      color: var(--cg-color-text-primary, #fafafa);
      font-size: 12px;
      font-weight: 600;
      cursor: pointer;
      font-family: inherit;
      transition: background 150ms ease;
    }
    .select-btn:hover {
      background: var(--cg-brand-ai-accent, #dfff61);
      color: #18181b;
      border-color: var(--cg-brand-ai-accent, #dfff61);
    }
    .select-btn:focus-visible {
      outline: 2px solid var(--cg-brand-ai-accent, #dfff61);
      outline-offset: 2px;
    }

    @media (prefers-reduced-motion: reduce) {
      .score-bar-fill { transition: none; }
      .select-btn { transition: none; }
    }
  `;

  @property({ type: Array }) models: ComparisonModel[] = [];

  private _getMetrics(): string[] {
    const set = new Set<string>();
    for (const m of this.models) {
      for (const k of Object.keys(m.scores)) set.add(k);
    }
    return Array.from(set);
  }

  private _bestScore(metric: string): number {
    return Math.max(...this.models.map(m => m.scores[metric] ?? 0));
  }

  private _scoreTier(score: number, best: number): string {
    if (score === best) return 'best';
    if (score >= 80) return 'high';
    if (score >= 50) return 'mid';
    return 'low';
  }

  private _formatCtx(n: number): string {
    if (n >= 1000000) return `${(n / 1000000).toFixed(0)}M`;
    if (n >= 1000) return `${(n / 1000).toFixed(0)}K`;
    return `${n}`;
  }

  private _select(model: ComparisonModel) {
    this.dispatchEvent(new CustomEvent('ai-comparison-select', {
      detail: { model },
      bubbles: true, composed: true,
    }));
  }

  override render() {
    if (!this.models.length) return nothing;
    const metrics = this._getMetrics();

    return html`
      <div class="wrapper" role="region" aria-label="Model comparison table">
        <table role="table">
          <thead>
            <tr>
              <th></th>
              ${this.models.map(m => html`
                <th class="model-header">
                  <div class="model-name">${m.name}</div>
                  <div class="model-provider">${m.provider}</div>
                </th>
              `)}
            </tr>
          </thead>
          <tbody>
            ${metrics.map(metric => {
              const best = this._bestScore(metric);
              return html`
                <tr>
                  <td class="metric-label">${metric}</td>
                  ${this.models.map(m => {
                    const score = m.scores[metric] ?? 0;
                    const tier = this._scoreTier(score, best);
                    return html`
                      <td class="score-cell">
                        <div class="score-bar-wrapper">
                          <span class="score-value ${tier === 'best' ? 'best' : ''}">${score}</span>
                          <div class="score-bar-track">
                            <div class="score-bar-fill ${tier}" style="width: ${score}%"></div>
                          </div>
                        </div>
                      </td>
                    `;
                  })}
                </tr>
              `;
            })}
            <tr>
              <td class="metric-label">Cost Tier</td>
              ${this.models.map(m => html`
                <td class="meta-cell"><span class="cost-badge">${m.costTier}</span></td>
              `)}
            </tr>
            <tr>
              <td class="metric-label">Context Window</td>
              ${this.models.map(m => html`
                <td class="meta-cell">${this._formatCtx(m.contextWindow)}</td>
              `)}
            </tr>
            <tr>
              <td></td>
              ${this.models.map(m => html`
                <td class="meta-cell">
                  <button class="select-btn" aria-label="Select ${m.name}" @click=${() => this._select(m)}>
                    Select
                  </button>
                </td>
              `)}
            </tr>
          </tbody>
        </table>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ai-model-comparison': AiModelComparison;
  }
}
