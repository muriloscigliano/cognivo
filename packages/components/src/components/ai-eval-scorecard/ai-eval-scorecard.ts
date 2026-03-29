/**
 * <ai-eval-scorecard> — LLM Evaluation Display
 *
 * Shows quality scores: relevance, coherence, safety, hallucination.
 * Overall grade A-F. Comparison deltas. Expandable explanations.
 */
import { LitElement, html, css, nothing } from 'lit';
import { property, state, customElement } from 'lit/decorators.js';

interface EvalScore {
  metric: string;
  value: number;
  max?: number;
  explanation?: string;
}

@customElement('ai-eval-scorecard')
export class AiEvalScorecard extends LitElement {
  static override styles = css`
    :host {
      transition: color var(--cg-motion-duration-fast, 80ms) var(--cg-motion-easing-color, cubic-bezier(0, 0, 0.58, 1));
      animation: fadeSlideIn var(--cg-motion-duration-fast, 200ms) var(--cg-motion-easing-color, cubic-bezier(0, 0, 0.58, 1));
      display: block;
      font-family: var(--cg-font-family-primary, 'Inter Variable', 'Inter', -apple-system, sans-serif);
    }

    .card {
      background: var(--cg-color-surface-container-background, #18181b);
      border: 1px solid var(--cg-color-surface-container-border, #27272a);
      border-radius: 12px;
      overflow: hidden;
    }

    .header {
      display: flex; align-items: center; justify-content: space-between;
      padding: 12px 16px;
      border-bottom: 1px solid var(--cg-gray-800, #27272a);
    }
    .header-title {
      font-size: 12px; font-weight: 700; color: var(--cg-gray-400, #a1a1aa);
      text-transform: uppercase; letter-spacing: 0.05em;
    }

    .grade {
      font-size: 18px; font-weight: 800; padding: 2px 12px; border-radius: 6px;
    }
    .grade.A { background: rgba(34, 197, 94, 0.12); color: #4ade80; }
    .grade.B { background: rgba(34, 197, 94, 0.08); color: #86efac; }
    .grade.C { background: rgba(245, 158, 11, 0.12); color: #fbbf24; }
    .grade.D { background: rgba(249, 115, 22, 0.12); color: #fb923c; }
    .grade.F { background: rgba(239, 68, 68, 0.12); color: #f87171; }

    .scores { padding: 12px 16px; }

    .score-row {
      display: flex; align-items: center; gap: 12px;
      padding: 8px 0;
      border-bottom: 1px solid var(--cg-gray-800, #27272a);
      cursor: pointer;
      transition: background 100ms;
    }
    .score-row:last-child { border-bottom: none; }
    .score-row:hover { background: rgba(255, 255, 255, 0.02); }

    .score-label {
      width: 100px; flex-shrink: 0;
      font-size: 12px; font-weight: 600; color: var(--cg-gray-400, #a1a1aa);
    }

    .score-bar-track {
      flex: 1; height: 6px; border-radius: 3px;
      background: var(--cg-gray-800, #27272a); overflow: hidden;
    }
    .score-bar-fill {
      height: 100%; border-radius: 3px;
      transition: width var(--cg-motion-duration-slow, 500ms) var(--cg-motion-easing-default, cubic-bezier(0.4, 0, 0.2, 1));
    }

    .score-value {
      width: 40px; text-align: right; flex-shrink: 0;
      font-size: 13px; font-weight: 700;
      font-family: var(--cg-font-family-mono, 'Fira Code', monospace);
    }

    .score-delta {
      width: 40px; text-align: right; flex-shrink: 0;
      font-size: 10px; font-weight: 700;
    }
    .delta-up { color: var(--cg-green-400, #4ade80); }
    .delta-down { color: var(--cg-red-400, #f87171); }

    .explanation {
      padding: 6px 0 6px 112px;
      font-size: 11px; color: var(--cg-gray-500, #71717a);
      line-height: 1.4;
      animation: fadeIn 150ms ease;
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    .empty { padding: 32px; text-align: center; color: var(--cg-gray-500, #71717a); font-size: 13px; }

    @media (prefers-reduced-motion: reduce) {
      .score-bar-fill, .score-row { transition: none; }
      .explanation { animation: none; }
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

  @property({ type: Array }) scores: EvalScore[] = [];
  @property({ type: String }) grade: string = '';
  @property({ type: Object }) comparison: Record<string, number> | null = null;

  @state() private _expandedMetric: string = '';

  private _getBarColor(value: number, max: number = 100): string {
    const pct = value / max;
    if (pct >= 0.8) return '#4ade80';
    if (pct >= 0.6) return '#fbbf24';
    if (pct >= 0.4) return '#fb923c';
    return '#f87171';
  }

  private _getValueColor(value: number, max: number = 100): string {
    return this._getBarColor(value, max);
  }

  private _handleMetricClick(metric: string) {
    this._expandedMetric = this._expandedMetric === metric ? '' : metric;
    this.dispatchEvent(new CustomEvent('ai-eval-metric-click', {
      bubbles: true, composed: true,
      detail: { metric },
    }));
  }

  override render() {
    if (this.scores.length === 0) {
      return html`<div class="card"><div class="empty">No evaluation data</div></div>`;
    }

    return html`
      <div class="card" role="figure" aria-label="Evaluation scorecard${this.grade ? ': Grade ' + this.grade : ''}">
        <div class="header">
          <span class="header-title">Evaluation</span>
          ${this.grade ? html`<span class="grade ${this.grade}">${this.grade}</span>` : nothing}
        </div>

        <div class="scores">
          ${this.scores.map(s => {
            const max = s.max || 100;
            const pct = (s.value / max) * 100;
            const delta = this.comparison?.[s.metric];

            return html`
              <div>
                <div class="score-row" @click=${() => this._handleMetricClick(s.metric)}
                  tabindex="0" role="button"
                  @keydown=${(e: KeyboardEvent) => { if (e.key === 'Enter') this._handleMetricClick(s.metric); }}>
                  <span class="score-label">${s.metric}</span>
                  <div class="score-bar-track">
                    <div class="score-bar-fill" style="width: ${pct}%; background: ${this._getBarColor(s.value, max)};"></div>
                  </div>
                  <span class="score-value" style="color: ${this._getValueColor(s.value, max)};">${s.value}</span>
                  ${delta !== undefined ? html`
                    <span class="score-delta ${delta >= 0 ? 'delta-up' : 'delta-down'}">
                      ${delta >= 0 ? '+' : ''}${delta}
                    </span>
                  ` : nothing}
                </div>
                ${this._expandedMetric === s.metric && s.explanation ? html`
                  <div class="explanation">${s.explanation}</div>
                ` : nothing}
              </div>
            `;
          })}
        </div>
      </div>
    `;
  }
}
