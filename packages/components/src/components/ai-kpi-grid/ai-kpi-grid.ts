/**
 * @element ai-kpi-grid
 * Dashboard card displaying multiple KPI metrics in a configurable grid.
 * Each cell shows label, value, trend arrow, and optional icon.
 * Includes a loading skeleton state.
 *
 * @example
 * ```html
 * <ai-kpi-grid
 *   title="Performance"
 *   columns="3"
 *   .kpis=${[{ label: 'Revenue', value: '$12.4K', delta: '+8.2%', trend: 'up' }]}
 * ></ai-kpi-grid>
 * ```
 *
 * @prop {string} title - Card header title
 * @prop {KpiItem[]} kpis - Array of KPI items with label, value, delta, trend, icon
 * @prop {number} columns - Number of grid columns (default 2)
 * @prop {boolean} loading - Show skeleton loading state
 *
 * @fires {CustomEvent<{label: string, value: string}>} ai-kpi-click - When a KPI cell is clicked
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
      animation: fadeSlideIn var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
    }

    .card {
      background: var(--cg-color-surface-cards-background);
      border: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
      border-radius: var(--cg-component-card-radius);
    }

    .card-title {
      font-size: var(--cg-font-size-xs);
      font-weight: var(--cg-font-weight-medium);
      color: var(--cg-color-input-text-placeholder);
      padding: var(--cg-spacing-16) var(--cg-spacing-20) var(--cg-spacing-8);
      text-transform: uppercase;
      letter-spacing: var(--cg-letter-spacing-wide);
    }

    /* Inset grid container */
    .grid {
      display: grid;
      margin: 0 var(--cg-spacing-12) var(--cg-spacing-12);
      background: var(--cg-overlay-dark-subtle);
      border: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
      border-radius: var(--cg-border-radius-125);
      overflow: hidden;
    }

    /* ── KPI cell ── */
    .kpi {
      padding: var(--cg-spacing-16) var(--cg-spacing-20);
      cursor: pointer;
      transition: background-color var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
      /* Borders via box-shadow trick — inner dividers only, no doubling */
      box-shadow:
        inset calc(-1 * var(--cg-border-width-50)) 0 0 var(--cg-color-surface-cards-border),
        inset 0 calc(-1 * var(--cg-border-width-50)) 0 var(--cg-color-surface-cards-border);
    }
    .kpi:hover { background: var(--cg-color-action-secondary-background-hover); }
    .kpi:focus-visible {
      outline: none;
      box-shadow: inset 0 0 0 var(--cg-border-width-100) var(--cg-overlay-accent-strong);
    }
    /* Single column — no right border, just bottom */
    :host([columns="1"]) .kpi {
      box-shadow: inset 0 calc(-1 * var(--cg-border-width-50)) 0 var(--cg-color-surface-cards-border);
    }
    :host([columns="1"]) .kpi:last-child { box-shadow: none; }


    .kpi-label {
      font-size: var(--cg-font-size-xs);
      font-weight: var(--cg-font-weight-medium);
      color: var(--cg-color-input-text-placeholder);
      margin-bottom: var(--cg-spacing-4);
    }

    .kpi-value {
      font-size: var(--cg-font-size-xl);
      font-weight: var(--cg-font-weight-semibold);
      color: var(--cg-color-surface-base-text);
      line-height: var(--cg-line-height-tight);
      letter-spacing: var(--cg-letter-spacing-tight);
      margin-bottom: var(--cg-spacing-4);
    }

    .kpi-delta {
      display: inline-flex;
      align-items: center;
      gap: var(--cg-spacing-4);
      font-size: var(--cg-font-size-xs);
      font-weight: var(--cg-font-weight-medium);
    }
    .kpi-delta.up { color: var(--cg-color-status-success-text-default); }
    .kpi-delta.down { color: var(--cg-color-status-error-text-default); }
    .kpi-delta.neutral { color: var(--cg-color-input-text-placeholder); }

    /* ── Loading skeleton ── */
    .skeleton-cell {
      padding: var(--cg-spacing-16) var(--cg-spacing-20);
    }
    .skel-line {
      border-radius: var(--cg-border-radius-50);
      background: linear-gradient(
        90deg,
        var(--cg-color-surface-container-background) 25%,
        var(--cg-color-surface-cards-border) 50%,
        var(--cg-color-surface-container-background) 75%
      );
      background-size: 200% 100%;
      animation: shimmer 1.5s linear infinite;
    }
    .skel-label { width: 60%; height: var(--cg-spacing-8); margin-bottom: var(--cg-spacing-8); }
    .skel-value { width: 50%; height: var(--cg-spacing-20); margin-bottom: var(--cg-spacing-6); }
    .skel-delta { width: 40%; height: var(--cg-spacing-8); }

  `];
  @property({ type: String }) override title = '';
  @property({ attribute: false }) kpis: KpiItem[] = [];
  @property({ type: Number, reflect: true }) columns = 2;
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
              <div class="kpi-label">${kpi.label}</div>
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
