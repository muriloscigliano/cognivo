/**
 * <ai-analytics-chart> — Multi-series time-series SVG line chart for AI metrics.
 *
 * Props: series, title, yLabel, height
 * Events: ai-analytics-point-hover
 * Features: Multiple colored lines, X/Y axis labels, hover tooltip, responsive width, legend
 */
import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { hostBlock, reducedMotion } from '../../styles/index.js';

export interface AnalyticsSeries {
  name: string;
  color: string;
  data: { x: string; y: number }[];
}

interface HoverPoint {
  seriesName: string;
  color: string;
  x: string;
  y: number;
  px: number;
  py: number;
}

@customElement('ai-analytics-chart')
export class AiAnalyticsChart extends LitElement {
  static override styles = [hostBlock, reducedMotion, css`
    :host {
      background: var(--cg-color-surface-base, #18181b);
      color: var(--cg-color-surface-base-text, #fafafa);
      border: 1px solid var(--cg-color-border-default, #27272a);
      border-radius: var(--cg-radius-lg, 12px);
      padding: var(--cg-spacing-16, 16px);
    }
    :host([hidden]) { display: none; }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: var(--cg-spacing-12, 12px);
    }

    .title {
      font-size: var(--cg-font-size-sm, 14px);
      font-weight: var(--cg-font-weight-semibold, 600);
      color: var(--cg-color-surface-base-text, #fafafa);
      margin: 0;
    }

    .legend {
      display: flex;
      gap: var(--cg-spacing-12, 12px);
      flex-wrap: wrap;
    }

    .legend-item {
      display: flex;
      align-items: center;
      gap: 4px;
      font-size: var(--cg-font-size-xs, 12px);
      color: var(--cg-color-text-secondary, #a1a1aa);
    }

    .legend-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      flex-shrink: 0;
    }

    .chart-wrap {
      position: relative;
      width: 100%;
    }

    svg {
      display: block;
      width: 100%;
      overflow: visible;
    }

    .axis-label {
      font-size: 10px;
      fill: var(--cg-color-text-tertiary, #71717a);
    }

    .grid-line {
      stroke: var(--cg-color-border-default, #27272a);
      stroke-width: 0.5;
    }

    .data-line {
      fill: none;
      stroke-width: 2;
      stroke-linecap: round;
      stroke-linejoin: round;
    }

    .hit-area {
      fill: transparent;
      stroke: transparent;
      stroke-width: 12;
      cursor: pointer;
    }

    .tooltip {
      position: absolute;
      background: var(--cg-color-surface-overlay, #27272a);
      border: 1px solid var(--cg-color-border-default, #3f3f46);
      border-radius: var(--cg-radius-md, 8px);
      padding: 6px 10px;
      font-size: var(--cg-font-size-xs, 12px);
      pointer-events: none;
      z-index: 10;
      white-space: nowrap;
      transform: translate(-50%, -100%);
      margin-top: -8px;
    }

    .tooltip-label {
      color: var(--cg-color-text-secondary, #a1a1aa);
      margin-bottom: 2px;
    }

    .tooltip-value {
      font-weight: var(--cg-font-weight-semibold, 600);
    }

    .y-label {
      font-size: 10px;
      fill: var(--cg-color-text-tertiary, #71717a);
    }
    }
  

    :focus-visible {
      outline: none;
      box-shadow: 0 0 0 2px var(--cg-color-surface-base-background, #09090b), 0 0 0 4px var(--cg-brand-ai-accent, #dfff61);
    }
  `];
  @property({ type: Array }) series: AnalyticsSeries[] = [];
  @property({ type: String }) title = '';
  @property({ type: String }) yLabel = '';
  @property({ type: Number }) height = 200;

  @state() private _hover: HoverPoint | null = null;
  @state() private _width = 400;

  private _ro?: ResizeObserver;

  override connectedCallback(): void {
    super.connectedCallback();
    this._ro = new ResizeObserver((entries) => {
      for (const e of entries) {
        this._width = e.contentRect.width - 32;
      }
    });
    this._ro.observe(this);
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this._ro?.disconnect();
  }

  private get _margin() {
    return { top: 10, right: 16, bottom: 28, left: this.yLabel ? 48 : 40 };
  }

  private get _allY(): number[] {
    return this.series.flatMap(s => s.data.map(d => d.y));
  }

  private get _allX(): string[] {
    const set = new Set<string>();
    this.series.forEach(s => s.data.forEach(d => set.add(d.x)));
    return [...set].sort();
  }

  private get _yMin() { return Math.min(0, ...this._allY); }
  private get _yMax() { return Math.max(1, ...this._allY); }

  private _scaleX(x: string): number {
    const xs = this._allX;
    const idx = xs.indexOf(x);
    const m = this._margin;
    const w = this._width - m.left - m.right;
    return m.left + (xs.length > 1 ? (idx / (xs.length - 1)) * w : w / 2);
  }

  private _scaleY(y: number): number {
    const m = this._margin;
    const h = this.height - m.top - m.bottom;
    const range = this._yMax - this._yMin || 1;
    return m.top + h - ((y - this._yMin) / range) * h;
  }

  private _buildPath(data: { x: string; y: number }[]): string {
    return data.map((d, i) => {
      const px = this._scaleX(d.x);
      const py = this._scaleY(d.y);
      return `${i === 0 ? 'M' : 'L'}${px},${py}`;
    }).join(' ');
  }

  private _onPointHover(series: AnalyticsSeries, idx: number, e: MouseEvent): void {
    const d = series.data[idx];
    if (!d) return;
    const svgRect = (e.currentTarget as SVGElement).closest('svg')?.getBoundingClientRect();
    if (!svgRect) return;
    this._hover = {
      seriesName: series.name,
      color: series.color,
      x: d.x,
      y: d.y,
      px: this._scaleX(d.x),
      py: this._scaleY(d.y),
    };
    this.dispatchEvent(new CustomEvent('ai-analytics-point-hover', {
      bubbles: true, composed: true,
      detail: { series: series.name, x: d.x, y: d.y },
    }));
  }

  private _onMouseLeave(): void {
    this._hover = null;
  }

  override render() {
    const m = this._margin;
    const xs = this._allX;
    const yTicks = 5;
    const yRange = this._yMax - this._yMin || 1;
    const h = this.height;
    const ih = h - m.top - m.bottom;

    return html`
      ${this.title || this.series.length ? html`
        <div class="header">
          ${this.title ? html`<h3 class="title">${this.title}</h3>` : nothing}
          <div class="legend" role="list" aria-label="Chart legend">
            ${this.series.map(s => html`
              <span class="legend-item" role="listitem">
                <span class="legend-dot" style="background:${s.color}"></span>
                ${s.name}
              </span>
            `)}
          </div>
        </div>
      ` : nothing}
      <div class="chart-wrap" @mouseleave=${this._onMouseLeave}>
        <svg viewBox="0 0 ${this._width} ${h}" aria-label="${this.title || 'Analytics chart'}"
             role="img" tabindex="0">
          ${this.yLabel ? html`
            <text class="y-label" x="4" y="${m.top + ih / 2}"
                  transform="rotate(-90, 12, ${m.top + ih / 2})"
                  text-anchor="middle">${this.yLabel}</text>
          ` : nothing}
          ${Array.from({ length: yTicks }, (_, i) => {
            const val = this._yMin + (yRange * i) / (yTicks - 1);
            const y = this._scaleY(val);
            return html`
              <line class="grid-line" x1="${m.left}" x2="${this._width - m.right}" y1="${y}" y2="${y}" />
              <text class="axis-label" x="${m.left - 6}" y="${y + 3}" text-anchor="end">
                ${Math.round(val * 10) / 10}
              </text>
            `;
          })}
          ${xs.length <= 12 ? xs.map((x, i) => html`
            <text class="axis-label" x="${this._scaleX(x)}" y="${h - 4}" text-anchor="middle">
              ${x}
            </text>
          `) : xs.filter((_, i) => i % Math.ceil(xs.length / 8) === 0).map(x => html`
            <text class="axis-label" x="${this._scaleX(x)}" y="${h - 4}" text-anchor="middle">
              ${x}
            </text>
          `)}
          ${this.series.map(s => html`
            <path class="data-line" d="${this._buildPath(s.data)}" stroke="${s.color}" />
            <path class="hit-area" d="${this._buildPath(s.data)}" />
            ${s.data.map((d, idx) => html`
              <circle cx="${this._scaleX(d.x)}" cy="${this._scaleY(d.y)}" r="3"
                      fill="${s.color}" opacity="${this._hover?.x === d.x && this._hover?.seriesName === s.name ? 1 : 0}"
                      @mouseenter=${(e: MouseEvent) => this._onPointHover(s, idx, e)} />
              <circle cx="${this._scaleX(d.x)}" cy="${this._scaleY(d.y)}" r="10"
                      fill="transparent" style="cursor:pointer"
                      @mouseenter=${(e: MouseEvent) => this._onPointHover(s, idx, e)} />
            `)}
          `)}
        </svg>
        ${this._hover ? html`
          <div class="tooltip" style="left:${this._hover.px}px;top:${this._hover.py}px">
            <div class="tooltip-label">${this._hover.x}</div>
            <div class="tooltip-value" style="color:${this._hover.color}">
              ${this._hover.seriesName}: ${this._hover.y}
            </div>
          </div>
        ` : nothing}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ai-analytics-chart': AiAnalyticsChart;
  }
}
