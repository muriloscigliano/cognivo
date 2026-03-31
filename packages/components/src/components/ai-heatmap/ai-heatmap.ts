/**
 * <ai-heatmap> — Matrix Heatmap Chart
 *
 * Color-coded grid for confusion matrices, correlation tables,
 * feature importance grids. Pure SVG, no dependencies.
 */
import { LitElement, html, css, svg, nothing } from 'lit';
import { property, state, customElement } from 'lit/decorators.js';
import { hostBlock, reducedMotion } from '../../styles/index.js';

@customElement('ai-heatmap')
export class AiHeatmap extends LitElement {
  static override styles = [hostBlock, reducedMotion, css`
    

    .container {
      background: var(--cg-color-surface-container-background, #18181b);
      border: 1px solid var(--cg-color-surface-container-border, #27272a);
      border-radius: 12px;
      padding: 16px;
      overflow: auto;
    }

    .title {
      font-size: 14px;
      font-weight: 600;
      color: var(--cg-color-surface-base-text, #fafafa);
      margin-bottom: 12px;
    }

    svg { display: block; }

    .cell {
      cursor: pointer;
      transition: opacity 150ms;
    }
    .cell:hover { opacity: 0.85; stroke: var(--cg-color-surface-base-text, #fafafa); stroke-width: 1.5; }
    .cell:focus-visible { outline: 2px solid var(--cg-brand-ai-accent, #dfff61); outline-offset: 1px; }

    .cell-text {
      font-family: var(--cg-font-family-mono, 'Fira Code', monospace);
      pointer-events: none;
    }

    .axis-label {
      font-size: 11px;
      fill: var(--cg-gray-400, #a1a1aa);
    }

    /* Tooltip */
    .tooltip {
      position: absolute;
      background: var(--cg-gray-800, #27272a);
      border: 1px solid var(--cg-gray-700, #3f3f46);
      border-radius: 6px;
      padding: 6px 10px;
      font-size: 11px;
      color: var(--cg-color-surface-base-text, #fafafa);
      pointer-events: none;
      z-index: 10;
      white-space: nowrap;
      box-shadow: var(--cg-elevation-2, 0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -2px rgba(0, 0, 0, 0.2));
    }
    .tooltip-row { display: block; }
    .tooltip-value { font-weight: 700; color: var(--cg-brand-ai-accent, #dfff61); }

    /* Legend */
    .legend {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-top: 10px;
      font-size: 10px;
      color: var(--cg-gray-500, #71717a);
    }
    .legend-bar {
      height: 8px;
      width: 80px;
      border-radius: 4px;
    }

    .empty {
      text-align: center;
      padding: 32px;
      color: var(--cg-gray-500, #71717a);
      font-size: 13px;
    }
    }
  `];
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

  private _getColor(value: number): string {
    if (this.colorScale === 'diverging') {
      // Diverging: red (negative) → dark neutral (zero) → green (positive)
      const absMax = Math.max(Math.abs(this._min), Math.abs(this._max));
      if (absMax === 0) return '#27272a';
      const t = Math.max(-1, Math.min(1, value / absMax)); // clamp -1 to 1
      if (t < 0) {
        // Negative: neutral (#27272a) → red (#f87171)
        const s = -t; // 0 to 1
        const r = Math.round(39 + (248 - 39) * s);
        const g = Math.round(39 + (113 - 39) * s);
        const b = Math.round(42 + (113 - 42) * s);
        return `rgb(${r}, ${g}, ${b})`;
      }
      // Positive: neutral (#27272a) → green (#4ade80)
      const r = Math.round(39 + (74 - 39) * t);
      const g = Math.round(39 + (222 - 39) * t);
      const b = Math.round(42 + (128 - 42) * t);
      return `rgb(${r}, ${g}, ${b})`;
    }

    // Sequential: dark → lime
    const range = this._max - this._min || 1;
    const t = (value - this._min) / range;
    const r = Math.round(39 + (223 - 39) * t);
    const g = Math.round(39 + (255 - 39) * t);
    const b = Math.round(46 + (97 - 46) * t);
    return `rgb(${r}, ${g}, ${b})`;
  }

  private _getTextColor(value: number): string {
    const range = this._max - this._min || 1;
    const t = (value - this._min) / range;
    return t > 0.6 ? '#000' : '#fafafa';
  }

  private _handleCellClick(row: number, col: number) {
    this.dispatchEvent(new CustomEvent('ai-heatmap-cell-click', {
      bubbles: true, composed: true,
      detail: {
        row, col,
        rowLabel: this.rowLabels[row] || `Row ${row}`,
        colLabel: this.colLabels[col] || `Col ${col}`,
        value: this.data[row][col],
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
      value: this.data[row][col],
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
      <div class="container" style="position: relative;">
        ${this.title ? html`<div class="title">${this.title}</div>` : nothing}

        <svg width="${svgW}" height="${svgH}" role="grid" aria-label="${this.title || 'Heatmap'}">
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

        <div class="legend">
          <span>${this._min}</span>
          <div class="legend-bar" style="background: linear-gradient(90deg, ${this._getColor(this._min)}, ${this._getColor(this._max)});"></div>
          <span>${this._max}</span>
        </div>
      </div>
    `;
  }
}
