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
      animation: fadeSlideIn 200ms var(--cg-transition-easing-ease-out) both;
    }
    :host([hidden]) { display: none; }

    .wrapper {
      overflow-x: auto;
      border: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
      border-radius: var(--cg-border-radius-150);
      background: var(--cg-color-surface-base-background);
    }

    /* ── Rounded variants ── */
    :host([rounded="none"]) .wrapper { border-radius: 0; }
    :host([rounded="sm"]) .wrapper { border-radius: var(--cg-border-radius-50); }
    :host([rounded="md"]) .wrapper { border-radius: var(--cg-border-radius-100); }
    :host([rounded="lg"]) .wrapper { border-radius: var(--cg-border-radius-150); }
    :host([rounded="full"]) .wrapper { border-radius: var(--cg-border-radius-full); }

    table {
      width: 100%;
      border-collapse: collapse;
      font-size: var(--cg-font-size-sm);
    }

    th, td {
      padding: var(--cg-spacing-8) var(--cg-spacing-12);
      text-align: left;
      border-bottom: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
    }

    tr:hover { background: var(--cg-overlay-dark-subtle); }

    th {
      color: var(--cg-color-input-text-placeholder);
      font-size: var(--cg-font-size-xs);
      font-weight: var(--cg-font-weight-bold);
      text-transform: uppercase;
      letter-spacing: var(--cg-letter-spacing-wide);
      position: sticky;
      top: 0;
      background: var(--cg-color-surface-container-background);
    }

    .model-header {
      text-align: center;
      min-width: var(--cg-spacing-96);
    }

    .model-name {
      color: var(--cg-color-surface-base-text);
      font-weight: var(--cg-font-weight-bold);
      font-size: var(--cg-font-size-sm);
    }

    .model-provider {
      color: var(--cg-color-input-text-placeholder);
      font-size: var(--cg-font-size-xs);
    }

    .metric-label {
      color: var(--cg-color-surface-base-text);
      font-weight: var(--cg-font-weight-semibold);
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
      gap: var(--cg-spacing-4);
    }

    .score-bar-track {
      width: var(--cg-spacing-64);
      height: var(--cg-spacing-6);
      background: var(--cg-color-surface-cards-border);
      border-radius: var(--cg-border-radius-50);
      overflow: hidden;
    }

    .score-bar-fill {
      height: 100%;
      border-radius: var(--cg-border-radius-50);
      transition: width var(--cg-transition-duration-slow) var(--cg-transition-easing-default);
    }
    .score-bar-fill.low    { background: var(--cg-color-status-error-text-default); }
    .score-bar-fill.mid    { background: var(--cg-color-status-warning-text); }
    .score-bar-fill.high   { background: var(--cg-color-status-success-text-default); }
    .score-bar-fill.best   { background: var(--cg-color-action-primary-background-default); }

    .score-value {
      font-size: var(--cg-font-size-xs);
      font-weight: var(--cg-font-weight-semibold);
      color: var(--cg-color-surface-base-text);
    }
    .score-value.best {
      color: var(--cg-color-surface-base-text);
    }

    .meta-cell {
      text-align: center;
      color: var(--cg-color-input-text-placeholder);
      font-size: var(--cg-font-size-xs);
    }

    .cost-badge {
      display: inline-block;
      padding: var(--cg-spacing-2) var(--cg-spacing-8);
      border-radius: var(--cg-border-radius-50);
      font-size: var(--cg-font-size-xs);
      font-weight: var(--cg-font-weight-bold);
      background: var(--cg-color-surface-container-background);
      border: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
      color: var(--cg-color-surface-base-text);
    }

    .select-btn {
      display: block;
      margin: var(--cg-spacing-4) auto 0;
      padding: var(--cg-spacing-6) var(--cg-spacing-16);
      border-radius: var(--cg-border-radius-100);
      border: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
      background: transparent;
      color: var(--cg-color-surface-base-text);
      font-size: var(--cg-font-size-xs);
      font-weight: var(--cg-font-weight-semibold);
      cursor: pointer;
      font-family: inherit;
      transition: background var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
    }
    .select-btn:hover {
      background: var(--cg-color-action-primary-background-default);
      color: var(--cg-color-surface-container-background);
      border-color: var(--cg-color-surface-base-text);
    }
    .select-btn:focus-visible {
      outline: 2px solid var(--cg-overlay-accent-strong);
      outline-offset: var(--cg-outline-offset-default);
    }
  `];
  @property({ reflect: true }) rounded: 'none' | 'sm' | 'md' | 'lg' | 'full' = 'lg';
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
