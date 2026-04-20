/**
 * @element ai-heatmap
 * SVG matrix heatmap for confusion matrices, correlations, or feature importance with hover tooltips.
 *
 * @example
 * ```html
 * <ai-heatmap
 *   title="Confusion Matrix"
 *   .data=${[[45,5],[3,47]]}
 *   .rowLabels=${['Cat','Dog']}
 *   .colLabels=${['Pred Cat','Pred Dog']}
 *   colorScale="sequential"
 *   showValues
 * ></ai-heatmap>
 * ```
 *
 * @fires {CustomEvent<{row, col, value}>} ai-heatmap-cell-click - Cell clicked
 */
import { LitElement, html, css, svg, nothing } from 'lit';
import { property, state, customElement } from 'lit/decorators.js';
import { hostBlock, reducedMotion, fadeSlideInKeyframes } from '../../styles/index.js';

@customElement('ai-heatmap')
export class AiHeatmap extends LitElement {
  static override styles = [hostBlock, reducedMotion, fadeSlideInKeyframes, css`
    :host {
      animation: fadeSlideIn var(--cg-transition-duration-fast) var(--cg-transition-easing-ease-out) both;
    }

    .container {
      background: var(--cg-color-surface-cards-background);
      border: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
      border-radius: var(--cg-border-radius-150);
      padding: var(--cg-spacing-16);
      overflow: auto;
      position: relative;
    }

    .title {
      font-size: var(--cg-font-size-sm);
      font-weight: var(--cg-font-weight-semibold);
      color: var(--cg-color-surface-base-text);
      margin-bottom: var(--cg-spacing-12);
    }

    svg { display: block; }

    .cell {
      cursor: pointer;
      transition: opacity var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
    }
    .cell:hover { opacity: 0.85; stroke: var(--cg-color-surface-base-text); stroke-width: 1.5; }
    .cell:focus-visible {
      outline: none;
      stroke: var(--cg-color-focus-ring);
      stroke-width: 2;
    }

    .cell-text {
      font-family: var(--cg-font-family-mono);
      pointer-events: none;
    }

    .axis-label {
      font-size: var(--cg-font-size-xs);
      fill: var(--cg-color-input-text-placeholder);
    }

    /* Tooltip */
    .tooltip {
      position: absolute;
      background: var(--cg-color-surface-container-background);
      border: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
      border-radius: var(--cg-border-radius-100);
      padding: var(--cg-spacing-6) var(--cg-spacing-8);
      font-size: var(--cg-font-size-xs);
      color: var(--cg-color-surface-base-text);
      pointer-events: none;
      z-index: 10;
      white-space: nowrap;
    }
    .tooltip-row { display: block; }
    .tooltip-value { font-weight: var(--cg-font-weight-bold); color: var(--cg-color-surface-base-text); }

    /* Legend */
    .legend {
      display: flex;
      align-items: center;
      gap: var(--cg-spacing-8);
      margin-top: var(--cg-spacing-12);
      font-size: var(--cg-font-size-xs);
      color: var(--cg-color-input-text-placeholder);
    }
    .legend-bar {
      height: var(--cg-spacing-8);
      width: var(--cg-spacing-80);
      border-radius: var(--cg-border-radius-50);
    }

    .empty {
      text-align: center;
      padding: var(--cg-spacing-24);
      color: var(--cg-color-input-text-placeholder);
      font-size: var(--cg-font-size-sm);
    }

    /* ── Rounded variants ── */
    :host([rounded="none"]) .container { border-radius: 0; }
    :host([rounded="sm"]) .container { border-radius: var(--cg-border-radius-50); }
    :host([rounded="md"]) .container { border-radius: var(--cg-border-radius-100); }
    :host([rounded="lg"]) .container { border-radius: var(--cg-border-radius-150); }
  `];

  @property({ reflect: true }) rounded: 'none' | 'sm' | 'md' | 'lg' = 'lg';
  /** 2D data array (rows × cols) */
  @property({ type: Array }) data: number[][] = [];
  /** Row labels */
  @property({ type: Array }) rowLabels: string[] = [];
  /** Column labels */
  @property({ type: Array }) colLabels: string[] = [];
  /** Color scale: sequential (min→max) or diverging (neg→zero→pos) */
  @property({ type: String }) colorScale: 'sequential' | 'diverging' = 'sequential';
  /** Show values in cells */
  @property({ type: Boolean }) showValues: boolean = true;
  /** Title */
  @property({ type: String }) override title: string = '';

  @state() private _tooltip: { x: number; y: number; row: string; col: string; value: number } | null = null;

  private _cellSize = 40;
  private _labelMarginLeft = 80;
  private _labelMarginTop = 40;

  private get _flatValues(): number[] {
    return this.data.flat();
  }

  private get _min(): number { return Math.min(...this._flatValues); }
  private get _max(): number { return Math.max(...this._flatValues); }

  /**
   * Compute cell fill color algorithmically.
   * Uses hardcoded RGB values because heatmap gradients must be computed per-value —
   * CSS custom properties can't be interpolated numerically in JS.
   * Dark neutral: rgb(39,39,42) matches --cg-gray-800 (#27272a).
   */
  private _getColor(value: number): string {
    if (this.colorScale === 'diverging') {
      const absMax = Math.max(Math.abs(this._min), Math.abs(this._max));
      if (absMax === 0) return 'rgb(39, 39, 42)';
      const t = Math.max(-1, Math.min(1, value / absMax));
      if (t < 0) {
        const s = -t;
        const r = Math.round(39 + (248 - 39) * s);
        const g = Math.round(39 + (113 - 39) * s);
        const b = Math.round(42 + (113 - 42) * s);
        return `rgb(${r}, ${g}, ${b})`;
      }
      const r = Math.round(39 + (74 - 39) * t);
      const g = Math.round(39 + (222 - 39) * t);
      const b = Math.round(42 + (128 - 42) * t);
      return `rgb(${r}, ${g}, ${b})`;
    }

    // Sequential: dark → lime (matches --cg-brand-ai-accent range)
    const range = this._max - this._min || 1;
    const t = (value - this._min) / range;
    const r = Math.round(39 + (223 - 39) * t);
    const g = Math.round(39 + (255 - 39) * t);
    const b = Math.round(46 + (97 - 46) * t);
    return `rgb(${r}, ${g}, ${b})`;
  }

  /** Contrast text color — dark on bright cells, light on dark cells. */
  private _getTextColor(value: number): string {
    const range = this._max - this._min || 1;
    const t = (value - this._min) / range;
    return t > 0.6 ? 'rgb(0, 0, 0)' : 'rgb(250, 250, 250)';
  }

  private _handleCellClick(row: number, col: number) {
    this.dispatchEvent(new CustomEvent('ai-heatmap-cell-click', {
      bubbles: true, composed: true,
      detail: {
        row, col,
        rowLabel: this.rowLabels[row] || `Row ${row}`,
        colLabel: this.colLabels[col] || `Col ${col}`,
        value: this.data[row]![col]!,
      },
    }));
  }

  private _handleCellHover(e: MouseEvent, row: number, col: number) {
    const rect = (e.target as SVGElement).getBoundingClientRect();
    const hostRect = this.getBoundingClientRect();
    this._tooltip = {
      x: rect.left - hostRect.left + rect.width / 2,
      y: rect.top - hostRect.top - 8,
      row: this.rowLabels[row] || `Row ${row}`,
      col: this.colLabels[col] || `Col ${col}`,
      value: this.data[row]![col]!,
    };
  }

  private _handleCellLeave() { this._tooltip = null; }

  override render() {
    if (this.data.length === 0) {
      return html`<div class="container"><div class="empty">No data provided</div></div>`;
    }

    const rows = this.data.length;
    const cols = this.data[0]?.length || 0;
    const cs = this._cellSize;
    const ml = this._labelMarginLeft;
    const mt = this._labelMarginTop;
    const svgW = ml + cols * cs;
    const svgH = mt + rows * cs;

    return html`
      <div class="container">
        ${this.title ? html`<div class="title">${this.title}</div>` : nothing}

        <svg width="${svgW}" height="${svgH}" role="grid" aria-label=${`${this.title || 'Heatmap'}: ${this.data.length} rows by ${this.data[0]?.length ?? 0} columns`}>
          <!-- Column labels -->
          ${this.colLabels.map((label, i) => svg`
            <text class="axis-label" x="${ml + i * cs + cs / 2}" y="${mt - 8}"
              text-anchor="middle" font-size="10">${label}</text>
          `)}

          <!-- Row labels -->
          ${this.rowLabels.map((label, i) => svg`
            <text class="axis-label" x="${ml - 8}" y="${mt + i * cs + cs / 2 + 4}"
              text-anchor="end" font-size="10">${label}</text>
          `)}

          <!-- Cells -->
          ${this.data.map((row, ri) => row.map((val, ci) => svg`
            <rect class="cell" tabindex="0" role="gridcell"
              aria-label="${this.rowLabels[ri] || `Row ${ri}`}, ${this.colLabels[ci] || `Col ${ci}`}: ${val}"
              x="${ml + ci * cs}" y="${mt + ri * cs}"
              width="${cs - 1}" height="${cs - 1}" rx="3"
              fill="${this._getColor(val)}"
              @click=${() => this._handleCellClick(ri, ci)}
              @mouseenter=${(e: MouseEvent) => this._handleCellHover(e, ri, ci)}
              @mouseleave=${this._handleCellLeave}
              @keydown=${(e: KeyboardEvent) => { if (e.key === 'Enter') this._handleCellClick(ri, ci); }}
            ></rect>
            ${this.showValues ? svg`
              <text class="cell-text" x="${ml + ci * cs + cs / 2}" y="${mt + ri * cs + cs / 2 + 4}"
                text-anchor="middle" font-size="10" fill="${this._getTextColor(val)}">${typeof val === 'number' && !Number.isInteger(val) ? val.toFixed(1) : val}</text>
            ` : nothing}
          `))}
        </svg>

        ${this._tooltip ? html`
          <div class="tooltip" style="left: ${this._tooltip.x}px; top: ${this._tooltip.y}px; transform: translateX(-50%) translateY(-100%);">
            <span class="tooltip-row">${this._tooltip.row} × ${this._tooltip.col}</span>
            <span class="tooltip-value">${this._tooltip.value}</span>
          </div>
        ` : nothing}

        <div class="legend" aria-hidden="true">
          <span>${this._min}</span>
          <div class="legend-bar" style="background: linear-gradient(90deg, ${this._getColor(this._min)}, ${this._getColor(this._max)});"></div>
          <span>${this._max}</span>
        </div>
      </div>
    `;
  }
}
