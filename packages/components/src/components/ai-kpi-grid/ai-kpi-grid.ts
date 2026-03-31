/**
 * <ai-kpi-grid> — Multiple KPIs in one card.
 *
 * Grid layout (configurable columns), each KPI shows label, value,
 * trend arrow + delta, optional icon. Loading skeleton state.
 * Card wrapper with title.
 */
import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { hostBlock, reducedMotion, fadeSlideInKeyframes, shimmerKeyframes } from '../../styles/index.js';

interface KpiItem {
  label: string;
  value: string;
  delta?: string;
  trend?: 'up' | 'down' | 'neutral';
  icon?: string;
}

@customElement('ai-kpi-grid')
export class AiKpiGrid extends LitElement {
  static override styles = [hostBlock, reducedMotion, fadeSlideInKeyframes, shimmerKeyframes, css`
    :host {
      animation: fadeSlideIn var(--cg-motion-duration-fast, 200ms) var(--cg-motion-easing-color, cubic-bezier(0, 0, 0.58, 1));
    }

    .card {
      background: var(--cg-color-surface-cards-background, #18181b);
      border: 1px solid var(--cg-color-surface-cards-border, #27272a);
      border-radius: var(--cg-border-radius-200, 12px);
      padding: 20px;
    }

    .card-title {
      font-size: 14px;
      font-weight: 600;
      color: var(--cg-gray-400, #a1a1aa);
      margin-bottom: 16px;
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }

    .grid {
      display: grid;
      gap: 16px;
    }

    /* ── KPI cell ── */
    .kpi {
      padding: 14px;
      background: var(--cg-gray-900, #09090b);
      border-radius: 10px;
      cursor: pointer;
      transition: all 150ms ease;
      border: 1px solid transparent;
    }
    .kpi:hover {
      border-color: var(--cg-gray-700, #3f3f46);
      background: var(--cg-gray-800, #27272a);
    }
    .kpi:focus-visible {
      outline: 2px solid var(--cg-brand-ai-accent, #dfff61);
      outline-offset: 2px;
    }

    .kpi-top {
      display: flex;
      align-items: center;
      gap: 6px;
      margin-bottom: 8px;
    }
    .kpi-icon {
      font-size: 16px;
      flex-shrink: 0;
    }
    .kpi-label {
      font-size: 12px;
      font-weight: 500;
      color: var(--cg-gray-400, #a1a1aa);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .kpi-value {
      font-size: 24px;
      font-weight: 700;
      color: var(--cg-color-surface-base-text, #fafafa);
      line-height: 1.2;
      margin-bottom: 4px;
    }

    .kpi-delta {
      display: inline-flex;
      align-items: center;
      gap: 3px;
      font-size: 12px;
      font-weight: 600;
    }
    .kpi-delta.up { color: var(--cg-green-400, #4ade80); }
    .kpi-delta.down { color: var(--cg-red-400, #f87171); }
    .kpi-delta.neutral { color: var(--cg-gray-400, #a1a1aa); }

    .arrow { font-size: 11px; }

    /* ── Loading skeleton ── */
    .skeleton-cell {
      padding: 14px;
      background: var(--cg-gray-900, #09090b);
      border-radius: 10px;
    }
    .skel-line {
      border-radius: 4px;
      background: linear-gradient(
        90deg,
        var(--cg-gray-800, #27272a) 25%,
        var(--cg-gray-700, #3f3f46) 50%,
        var(--cg-gray-800, #27272a) 75%
      );
      background-size: 200% 100%;
      animation: shimmer 1.5s linear infinite;
    }
    .skel-label { width: 60%; height: 10px; margin-bottom: 10px; }
    .skel-value { width: 50%; height: 22px; margin-bottom: 6px; }
    .skel-delta { width: 40%; height: 10px; }
      .skel-line { animation: none; background: var(--cg-gray-800, #27272a); }
    }
  `];
  @property({ type: String }) override title = '';
  @property({ attribute: false }) kpis: KpiItem[] = [];
  @property({ type: Number }) columns = 2;
  @property({ type: Boolean }) loading = false;

  private _handleKpiClick(kpi: KpiItem) {
    this.dispatchEvent(new CustomEvent('ai-kpi-click', {
      bubbles: true, composed: true,
      detail: { label: kpi.label, value: kpi.value },
    }));
  }

  private _trendArrow(trend?: string): string {
    if (trend === 'up') return '\u2191';
    if (trend === 'down') return '\u2193';
    return '\u2192';
  }

  private _renderSkeleton() {
    const cells = Array.from({ length: this.columns * 2 });
    return cells.map(() => html`
      <div class="skeleton-cell" aria-hidden="true">
        <div class="skel-line skel-label"></div>
        <div class="skel-line skel-value"></div>
        <div class="skel-line skel-delta"></div>
      </div>
    `);
  }

  override render() {
    return html`
      <div class="card" role="region" aria-label="${this.title || 'KPI Grid'}">
        ${this.title ? html`<div class="card-title">${this.title}</div>` : nothing}
        <div class="grid" style="grid-template-columns: repeat(${this.columns}, 1fr)">
          ${this.loading ? this._renderSkeleton() : this.kpis.map(kpi => html`
            <div
              class="kpi"
              role="button"
              tabindex="0"
              aria-label="${kpi.label}: ${kpi.value}${kpi.delta ? `, ${kpi.delta}` : ''}"
              @click=${() => this._handleKpiClick(kpi)}
              @keydown=${(e: KeyboardEvent) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); this._handleKpiClick(kpi); } }}
            >
              <div class="kpi-top">
                ${kpi.icon ? html`<span class="kpi-icon" aria-hidden="true">${kpi.icon}</span>` : nothing}
                <span class="kpi-label">${kpi.label}</span>
              </div>
              <div class="kpi-value">${kpi.value}</div>
              ${kpi.delta ? html`
                <span class="kpi-delta ${kpi.trend || 'neutral'}">
                  <span class="arrow" aria-hidden="true">${this._trendArrow(kpi.trend)}</span>
                  ${kpi.delta}
                </span>
              ` : nothing}
            </div>
          `)}
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ai-kpi-grid': AiKpiGrid;
  }
}
