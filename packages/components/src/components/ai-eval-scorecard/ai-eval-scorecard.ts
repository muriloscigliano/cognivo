/**
 * @element ai-eval-scorecard
 * LLM evaluation scorecard with metric rows, grade badge, deltas, and expandable explanations.
 *
 * @fires {CustomEvent<{metric: string}>} ai-eval-metric-click
 */
import { LitElement, html, css, nothing } from 'lit';
import { property, state, customElement } from 'lit/decorators.js';
import { hostBlock, reducedMotion } from '../../styles/index.js';

export interface EvalScore {
  metric: string;
  value: number;
  max?: number;
  explanation?: string;
}

@customElement('ai-eval-scorecard')
export class AiEvalScorecard extends LitElement {
  static override styles = [hostBlock, reducedMotion, css`
    :host {
      min-width: 320px;
    }

    .card {
      background: var(--cg-color-surface-cards-background);
      border: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
      border-radius: var(--cg-border-radius-150);
      overflow: hidden;
    }

    /* ── Header ── */
    .header {
      display: flex; align-items: center; justify-content: space-between;
      padding: var(--cg-spacing-20) var(--cg-spacing-24);
    }
    .header-left {
      display: flex; flex-direction: column; gap: var(--cg-spacing-2);
    }
    .header-title {
      font-size: var(--cg-font-size-sm); font-weight: var(--cg-font-weight-semibold);
      color: var(--cg-color-surface-base-text);
    }
    .header-subtitle {
      font-size: var(--cg-font-size-xs);
      color: var(--cg-color-surface-container-text);
    }

    /* Grade — small filled dot + letter */
    .grade-badge {
      display: inline-flex; align-items: center; gap: var(--cg-spacing-6);
      font-size: var(--cg-font-size-sm); font-weight: var(--cg-font-weight-bold);
      font-family: var(--cg-font-family-mono);
      flex-shrink: 0;
    }
    .grade-dot {
      width: var(--cg-spacing-8); height: var(--cg-spacing-8);
      border-radius: var(--cg-border-radius-full);
    }
    .grade-badge.A .grade-dot, .grade-badge.B .grade-dot { background: var(--cg-color-status-success-text-default); }
    .grade-badge.C .grade-dot, .grade-badge.D .grade-dot { background: var(--cg-color-status-warning-text-default); }
    .grade-badge.F .grade-dot { background: var(--cg-color-status-error-text-default); }
    .grade-badge.A, .grade-badge.B { color: var(--cg-color-status-success-text-default); }
    .grade-badge.C, .grade-badge.D { color: var(--cg-color-status-warning-text-default); }
    .grade-badge.F { color: var(--cg-color-status-error-text-default); }

    /* ── Metric list ── */
    .scores {
      padding: var(--cg-spacing-4) var(--cg-spacing-16) var(--cg-spacing-16);
    }

    .metric {
      padding: var(--cg-spacing-16) var(--cg-spacing-12);
      border-radius: var(--cg-border-radius-100);
      border: var(--cg-border-width-50) solid transparent;
      cursor: pointer;
      transition: background var(--cg-transition-duration-fast) var(--cg-transition-easing-default), border-color var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
    }
    .metric:hover { background: var(--cg-overlay-dark-subtle); border-color: var(--cg-color-surface-cards-border); }
    .metric:focus-visible { outline: none; box-shadow: 0 0 0 3px var(--cg-color-focus-ring); }

    /* Top row: label + value + delta */
    .metric-top {
      display: flex; align-items: center; gap: var(--cg-spacing-12);
      margin-bottom: var(--cg-spacing-8);
    }
    .metric-label {
      flex: 1;
      font-size: var(--cg-font-size-sm); font-weight: var(--cg-font-weight-medium);
      color: var(--cg-color-surface-base-text);
    }
    .metric-value {
      font-size: var(--cg-font-size-sm); font-weight: var(--cg-font-weight-semibold);
      font-family: var(--cg-font-family-mono);
      color: var(--cg-color-surface-base-text);
    }
    .metric-delta {
      font-size: var(--cg-font-size-xs); font-weight: var(--cg-font-weight-medium);
      font-family: var(--cg-font-family-mono);
    }
    .delta-up { color: var(--cg-color-status-success-text-default); }
    .delta-down { color: var(--cg-color-status-error-text-default); }

    /* Bar underneath */
    .metric-bar {
      height: var(--cg-spacing-4); border-radius: var(--cg-border-radius-full);
      background: var(--cg-color-surface-cards-border); overflow: hidden;
    }
    .metric-fill {
      height: 100%; border-radius: var(--cg-border-radius-full);
      background: var(--cg-color-action-primary-background-default);
      opacity: 0.6;
      transition: width var(--cg-transition-duration-slow) var(--cg-transition-easing-default);
    }

    /* Explanation */
    .metric-explanation {
      margin-top: var(--cg-spacing-8);
      font-size: var(--cg-font-size-xs);
      color: var(--cg-color-surface-container-text);
      line-height: var(--cg-line-height-snug);
    }

    .empty {
      padding: var(--cg-spacing-48) var(--cg-spacing-24);
      text-align: center; color: var(--cg-color-surface-container-text);
      font-size: var(--cg-font-size-sm);
    }

    /* ── Rounded ── */
    :host([rounded="none"]) .card { border-radius: 0; }
    :host([rounded="sm"]) .card { border-radius: var(--cg-border-radius-50); }
    :host([rounded="md"]) .card { border-radius: var(--cg-border-radius-100); }
    :host([rounded="lg"]) .card { border-radius: var(--cg-border-radius-150); }
  `];

  @property({ reflect: true }) rounded: 'none' | 'sm' | 'md' | 'lg' = 'lg';
  @property({ type: Array }) scores: EvalScore[] = [];
  @property() grade = '';
  @property() override title = 'Evaluation';
  @property({ type: Object }) comparison: Record<string, number> | null = null;

  @state() private _expandedMetric = '';

  private _avgScore(): number {
    if (!this.scores.length) return 0;
    return Math.round(this.scores.reduce((s, sc) => s + (sc.value / (sc.max || 100)) * 100, 0) / this.scores.length);
  }

  override render() {
    if (!this.scores.length) return html`<div class="card"><div class="empty">No evaluation data</div></div>`;

    return html`
      <div class="card" role="figure" aria-label="${this.title}${this.grade ? ': ' + this.grade : ''}">
        <div class="header">
          <div class="header-left">
            <span class="header-title">${this.title}</span>
            <span class="header-subtitle">${this.scores.length} metrics · ${this._avgScore()}% avg</span>
          </div>
          ${this.grade ? html`<span class="grade-badge ${this.grade.charAt(0)}"><span class="grade-dot"></span>${this.grade}</span>` : nothing}
        </div>

        <div class="scores">
          ${this.scores.map(s => {
            const max = s.max || 100;
            const pct = Math.min((s.value / max) * 100, 100);
            const delta = this.comparison?.[s.metric];

            return html`
              <div class="metric" tabindex="0" role="button"
                @click=${() => { this._expandedMetric = this._expandedMetric === s.metric ? '' : s.metric; this.dispatchEvent(new CustomEvent('ai-eval-metric-click', { bubbles: true, composed: true, detail: { metric: s.metric } })); }}
                @keydown=${(e: KeyboardEvent) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); this._expandedMetric = this._expandedMetric === s.metric ? '' : s.metric; } }}>
                <div class="metric-top">
                  <span class="metric-label">${s.metric}</span>
                  <span class="metric-value">${s.value}</span>
                  ${delta !== undefined ? html`
                    <span class="metric-delta ${delta >= 0 ? 'delta-up' : 'delta-down'}">${delta >= 0 ? '+' : ''}${delta}</span>
                  ` : nothing}
                </div>
                <div class="metric-bar">
                  <div class="metric-fill" style="width: ${pct}%"></div>
                </div>
                ${this._expandedMetric === s.metric && s.explanation ? html`
                  <div class="metric-explanation">${s.explanation}</div>
                ` : nothing}
              </div>
            `;
          })}
        </div>
      </div>
    `;
  }
}
