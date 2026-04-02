/**
 * @element ai-model-comparison
 * Side-by-side comparison table for AI models. Renders metrics as rows
 * with color-coded score bars, highlights the best score per metric,
 * and includes cost tier and context window info.
 *
 * @example
 * ```html
 * <ai-model-comparison .models=${[
 *   { name: 'GPT-4', provider: 'OpenAI', scores: { reasoning: 92, coding: 88 }, costTier: '$$$', contextWindow: 128000 },
 *   { name: 'Claude 3', provider: 'Anthropic', scores: { reasoning: 95, coding: 91 }, costTier: '$$', contextWindow: 200000 }
 * ]}></ai-model-comparison>
 * ```
 *
 * @prop {ComparisonModel[]} models - Array of models with name, provider, scores, costTier, contextWindow
 *
 * @fires {CustomEvent<{model: ComparisonModel}>} ai-comparison-select - When a model's Select button is clicked
 */
import { LitElement, html, css, nothing } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { hostBlock, reducedMotion, fadeSlideInKeyframes } from '../../styles/index.js';

export interface ComparisonModel {
  name: string;
  provider: string;
  scores: Record<string, number>;
  costTier: string;
  contextWindow: number;
}

@customElement('ai-model-comparison')
export class AiModelComparison extends LitElement {
  static override styles = [hostBlock, reducedMotion, fadeSlideInKeyframes, css`
    :host {
      animation: fadeSlideIn 200ms var(--cg-motion-easing-enter, cubic-bezier(0, 0, 0.2, 1)) both;
    }
    :host([hidden]) { display: none; }

    .wrapper {
      overflow-x: auto;
      border: 1px solid var(--cg-color-border-primary, #27272a);
      border-radius: var(--cg-border-radius-150, 12px);
      background: var(--cg-color-bg-primary, #18181b);
      box-shadow: inset 0 1px 0 0 rgba(255, 255, 255, 0.05);
      background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0.03), transparent);
    }

    table {
      width: 100%;
      border-collapse: collapse;
      font-size: var(--cg-font-size-sm, 14px);
    }

    th, td {
      padding: var(--cg-spacing-8, 8px) var(--cg-spacing-12, 12px);
      text-align: left;
      border-bottom: 1px solid var(--cg-color-border-primary, #27272a);
    }

    th {
      color: var(--cg-color-text-secondary, #a1a1aa);
      font-size: var(--cg-font-size-xs, 12px);
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
      font-size: var(--cg-font-size-sm, 14px);
    }

    .model-provider {
      color: var(--cg-color-text-secondary, #a1a1aa);
      font-size: var(--cg-font-size-xs, 12px);
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
      gap: var(--cg-spacing-4, 4px);
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
    .score-bar-fill.low    { background: var(--cg-color-status-error-text-default, #ef4444); }
    .score-bar-fill.mid    { background: #eab308; }
    .score-bar-fill.high   { background: var(--cg-color-status-success-text-default, #22c55e); }
    .score-bar-fill.best   { background: var(--cg-brand-ai-accent, #dfff61); }

    .score-value {
      font-size: var(--cg-font-size-xs, 12px);
      font-weight: 600;
      color: var(--cg-color-text-primary, #fafafa);
    }
    .score-value.best {
      color: var(--cg-brand-ai-accent, #dfff61);
    }

    .meta-cell {
      text-align: center;
      color: var(--cg-color-text-secondary, #a1a1aa);
      font-size: var(--cg-font-size-xs, 12px);
    }

    .cost-badge {
      display: inline-block;
      padding: 2px var(--cg-spacing-8, 8px);
      border-radius: var(--cg-border-radius-50, 4px);
      font-size: var(--cg-font-size-xs, 12px);
      font-weight: 700;
      background: var(--cg-color-bg-secondary, #27272a);
      border: 1px solid var(--cg-color-border-primary, #3f3f46);
      color: var(--cg-color-text-primary, #fafafa);
    }

    .select-btn {
      display: block;
      margin: 4px auto 0;
      padding: var(--cg-spacing-6, 6px) var(--cg-spacing-16, 16px);
      border-radius: var(--cg-border-radius-100, 8px);
      border: 1px solid var(--cg-color-border-primary, #3f3f46);
      background: transparent;
      color: var(--cg-color-text-primary, #fafafa);
      font-size: var(--cg-font-size-xs, 12px);
      font-weight: 600;
      cursor: pointer;
      font-family: inherit;
      transition: background 150ms ease;
    }
    .select-btn:hover {
      background: var(--cg-brand-ai-accent, #dfff61);
      color: var(--cg-color-surface-container-background, #18181b);
      border-color: var(--cg-brand-ai-accent, #dfff61);
    }
    .select-btn:focus-visible {
      outline: 2px solid var(--cg-brand-ai-accent, #dfff61);
      outline-offset: 2px;
    }
      .select-btn { transition: none; }
    }
  `];
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
