/**
 * @element ai-analytics-chart
 * Responsive multi-series SVG line chart with axis labels, legend, and hover tooltips.
 *
 * @example
 * ```html
 * <ai-analytics-chart
 *   title="Latency (ms)"
 *   yLabel="ms"
 *   .series=${[{name:'p50', color:'#4ade80', data:[{x:'Mon',y:120},{x:'Tue',y:98}]}]}
 * ></ai-analytics-chart>
 * ```
 *
 * @fires {CustomEvent<{series: string, x: string, y: number}>} ai-analytics-point-hover - Data point hovered
 *
 * @cssprop [--cg-color-surface-cards-background] - Chart card background
 * @cssprop [--cg-color-surface-cards-border] - Card border + grid line color
 */
import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { hostBlock, reducedMotion, fadeSlideInKeyframes } from '../../styles/index.js';

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
  static override styles = [hostBlock, reducedMotion, fadeSlideInKeyframes, css`
    :host {
      display: block;
      background: var(--cg-color-surface-cards-background);
      color: var(--cg-color-surface-base-text);
      border: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
      border-radius: var(--cg-border-radius-150);
      padding: var(--cg-spacing-20);
      box-shadow: var(--cg-elevation-1);
      animation: fadeSlideIn var(--cg-transition-duration-fast) var(--cg-transition-easing-ease-out) both;
    }
    :host([hidden]) { display: none; }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      padding-bottom: var(--cg-spacing-12);
      border-bottom: var(--cg-border-width-50) solid var(--cg-color-surface-cards-divider);
      margin-bottom: var(--cg-spacing-12);
    }

    .title {
      font-size: var(--cg-font-size-sm);
      font-weight: var(--cg-font-weight-semibold);
      color: var(--cg-color-surface-base-text);
      margin: 0;
    }

    .legend {
      display: flex;
      gap: var(--cg-spacing-12);
      flex-wrap: wrap;
    }

    .legend-item {
      display: flex;
      align-items: center;
      gap: var(--cg-spacing-4);
      font-size: var(--cg-font-size-xs);
      color: var(--cg-color-input-text-placeholder);
    }

    .legend-dot {
      width: var(--cg-spacing-8);
      height: var(--cg-spacing-8);
      border-radius: var(--cg-border-radius-full);
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
      font-size: var(--cg-font-size-xs);
      fill: var(--cg-color-input-text-placeholder);
    }

    .grid-line {
      stroke: var(--cg-color-surface-cards-divider);
      stroke-width: 0.5;
    }

    .data-line {
      fill: none;
      stroke-width: 2;
      stroke-linecap: round;
      stroke-linejoin: round;
    }

    .data-point {
      transition: opacity var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
    }

    .hit-area {
      fill: transparent;
      stroke: transparent;
      stroke-width: 12;
      cursor: pointer;
    }

    .tooltip {
      position: absolute;
      background: var(--cg-color-surface-cards-emphasis);
      border: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
      border-radius: var(--cg-border-radius-100);
      box-shadow: var(--cg-elevation-2);
      padding: var(--cg-spacing-6) var(--cg-spacing-8);
      font-size: var(--cg-font-size-xs);
      pointer-events: none;
      z-index: 10;
      white-space: nowrap;
      transform: translate(-50%, -100%);
      margin-top: calc(-1 * var(--cg-spacing-8));
    }

    .tooltip-label {
      color: var(--cg-color-input-text-placeholder);
      margin-bottom: var(--cg-spacing-2);
    }

    .tooltip-value {
      font-weight: var(--cg-font-weight-semibold);
    }

    .y-label {
      font-size: var(--cg-font-size-xs);
      fill: var(--cg-color-input-text-placeholder);
    }

    :focus-visible {
      outline: none;
      box-shadow: 0 0 0 3px var(--cg-overlay-accent-strong);
    }
  `];
  @property({ type: Array }) series: AnalyticsSeries[] = [];
  @property({ type: String }) override title = '';
  @property({ type: String }) yLabel = '';
  @property({ type: Number }) height = 200;

  @state() private _hover: HoverPoint | null = null;
  @state() private _width = 400;

  private _ro?: ResizeObserver;

  override connectedCallback(): void {
    super.connectedCallback();
    this._ro = new ResizeObserver((entries) => {
      for (const e of entries) {
        // contentRect already excludes the host's padding, so we use it directly.
        this._width = e.contentRect.width;
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
              <circle class="data-point" cx="${this._scaleX(d.x)}" cy="${this._scaleY(d.y)}" r="3"
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
