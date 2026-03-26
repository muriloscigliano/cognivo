import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';

/**
 * <cg-chart> — Pure SVG chart component. No external deps.
 *
 * Types: bar, horizontal-bar, line, area, pie, donut
 * Features: tooltip on hover, axis labels, grid lines, responsive,
 *           animated entrance, value labels on bars, percentage on pie
 */

export interface ChartSeries { label: string; value: number; color?: string; }

/** Token names for chart palette — resolved at runtime via getComputedStyle */
const PALETTE_TOKENS = [
  '--cg-color-chart-1',
  '--cg-color-chart-2',
  '--cg-color-chart-3',
  '--cg-color-chart-4',
  '--cg-color-chart-5',
  '--cg-color-chart-6',
  '--cg-color-chart-7',
  '--cg-color-chart-8',
];

@customElement('cg-chart')
export class CgChart extends LitElement {
  static override styles = css`
    :host {
      transition: color 100ms cubic-bezier(0, 0, 0.58, 1);
      display: block;
      font-family: var(--cg-font-family-primary, 'Inter Variable', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif);
    }

    .chart-container {
      position: relative;
    }

    .title {
      font-size: var(--cg-font-size-sm, 14px);
      font-weight: var(--cg-font-weight-semibold, 600);
      color: var(--cg-color-surface-base-text, #fafafa);
      margin-bottom: var(--cg-spacing-12, 12px);
    }

    .subtitle {
      font-size: var(--cg-font-size-xs, 12px);
      color: var(--cg-color-chart-axis, #52525b);
      margin-top: -8px;
      margin-bottom: var(--cg-spacing-12, 12px);
    }

    svg {
      width: 100%;
      overflow: visible;
      font-family: inherit;
    }

    /* Bar hover */
    .bar-rect {
      transition: opacity var(--cg-motion-duration-normal, 150ms) ease;
      cursor: pointer;
    }
    .bar-rect:hover {
      opacity: 0.8;
      filter: brightness(1.05);
    }

    /* Pie/Donut hover */
    .pie-slice {
      transition: transform var(--cg-motion-duration-normal, 150ms) ease, filter 0.15s ease;
      cursor: pointer;
      transform-origin: center;
    }
    .pie-slice:hover {
      filter: brightness(1.1) drop-shadow(0 2px 4px var(--cg-overlay-dark-medium, rgba(0, 0, 0, 0.3))))))))));
    }

    /* Line dots */
    .line-dot {
      transition: r 0.12s ease;
      cursor: pointer;
    }
    .line-dot:hover {
      r: 5;
    }

    /* Grid lines */
    .grid-line {
      stroke: var(--cg-color-chart-grid, #27272a);
      stroke-width: 0.5;
      stroke-dasharray: 3 3;
    }

    /* Axis text */
    .axis-label {
      font-size: 10px;
      fill: var(--cg-color-chart-axis, #52525b);
    }
    .axis-value {
      font-size: 9px;
      fill: var(--cg-color-chart-axis, #52525b);
    }

    /* Value label on bars */
    .bar-value {
      font-size: 9px;
      font-weight: 600;
      fill: var(--cg-color-surface-base-text, #fafafa);
    }

    /* Tooltip */
    .tooltip {
      position: absolute;
      background: var(--cg-gray-800, #27272a);
      color: var(--cg-gray-white, #ffffff);
      padding: 6px 10px;
      border-radius: var(--cg-border-radius-150, 12px);
      font-size: var(--cg-font-size-xs, 12px);
      font-weight: 500;
      pointer-events: none;
      white-space: nowrap;
      transform: translate(-50%, -100%);
      margin-top: -8px;
      box-shadow: 0 4px 12px var(--cg-overlay-dark-medium, rgba(0, 0, 0, 0.3)))))))));
      z-index: 10;
      opacity: 0;
      transition: opacity var(--cg-motion-duration-normal, 150ms) ease;
    }
    .tooltip.visible { opacity: 1; }
    .tooltip::after {
      content: '';
      position: absolute;
      bottom: -4px;
      left: 50%;
      transform: translateX(-50%);
      border: 4px solid transparent;
      border-top-color: var(--cg-gray-800, #27272a);
    }

    /* Legend */
    .legend {
      display: flex;
      flex-wrap: wrap;
      gap: var(--cg-spacing-12, 12px);
      margin-top: var(--cg-spacing-12, 12px);
      justify-content: center;
    }
    .legend-item {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: var(--cg-font-size-xs, 12px);
      color: var(--cg-color-chart-axis, #52525b);
      cursor: default;
    }
    .legend-dot {
      width: 10px;
      height: 10px;
      border-radius: 3px;
      flex-shrink: 0;
    }
    .legend-value {
      font-weight: var(--cg-font-weight-semibold, 600);
      color: var(--cg-color-surface-base-text, #fafafa);
    }

    /* Empty state */
    .empty {
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--cg-color-chart-axis, #52525b);
      font-size: var(--cg-font-size-sm, 14px);
      min-height: 120px;
    }

    /* Entrance animation */
    @keyframes growUp {
      from { transform: scaleY(0); }
      to { transform: scaleY(1); }
    }
    .bar-rect {
      animation: growUp 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) both;
      transform-origin: bottom;
    }
    .bar-rect:nth-child(2) { animation-delay: 0.05s; }
    .bar-rect:nth-child(3) { animation-delay: 0.1s; }
    .bar-rect:nth-child(4) { animation-delay: 0.15s; }
    .bar-rect:nth-child(5) { animation-delay: 0.2s; }
    .bar-rect:nth-child(6) { animation-delay: 0.25s; }

    @keyframes drawLine {
      from { stroke-dashoffset: 1000; }
      to { stroke-dashoffset: 0; }
    }
    .line-path {
      stroke-dasharray: 1000;
      animation: drawLine 1s ease-out forwards;
    }

    @media (prefers-reduced-motion: reduce) {
      .bar-rect, .line-path { animation: none; }
      .pie-slice, .bar-rect, .line-dot { transition: none; }
    }
  `;

  @property({ type: Array }) data: ChartSeries[] = [];
  @property() type: 'bar' | 'horizontal-bar' | 'line' | 'area' | 'pie' | 'donut' = 'bar';
  @property() title = '';
  @property() subtitle = '';
  @property({ type: Number }) height = 240;
  @property({ type: Boolean }) showLegend = true;
  @property({ type: Boolean }) showValues = true;
  @property({ type: Boolean }) showGrid = true;
  @property() emptyText = 'No data available';

  @state() private _tooltip = { visible: false, x: 0, y: 0, text: '' };

  /** Resolved palette colors from CSS custom properties */
  private _resolvedPalette: string[] = [];

  private _resolvePalette(): string[] {
    if (this._resolvedPalette.length > 0) return this._resolvedPalette;
    const styles = getComputedStyle(this);
    this._resolvedPalette = PALETTE_TOKENS.map(token =>
      styles.getPropertyValue(token).trim() || token
    );
    return this._resolvedPalette;
  }

  override connectedCallback() {
    super.connectedCallback();
    // Reset resolved palette so it re-reads tokens on reconnect
    this._resolvedPalette = [];
  }

  override updated() {
    // Clear cache so palette is re-resolved when properties change
    this._resolvedPalette = [];
  }

  private _color(i: number, d: ChartSeries): string {
    if (d.color) return d.color;
    const palette = this._resolvePalette();
    return palette[i % palette.length]!;
  }

  private _showTooltip(e: MouseEvent, label: string, value: number) {
    const rect = (e.currentTarget as SVGElement).closest('svg')!.getBoundingClientRect();
    this._tooltip = {
      visible: true,
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      text: `${label}: ${this._formatValue(value)}`,
    };
  }

  private _hideTooltip() {
    this._tooltip = { ...this._tooltip, visible: false };
  }

  private _formatValue(v: number): string {
    if (Math.abs(v) >= 1_000_000) return (v / 1_000_000).toFixed(1) + 'M';
    if (Math.abs(v) >= 1_000) return (v / 1_000).toFixed(1) + 'K';
    return v % 1 === 0 ? String(v) : v.toFixed(1);
  }

  // ── Bar Chart ─────────────────────────────────────────────────────────────

  private _renderBar() {
    const pad = { top: 8, right: 8, bottom: 28, left: 40 };
    const max = Math.max(...this.data.map(d => d.value), 1);
    const w = 300;
    const h = this.height;
    const plotW = w - pad.left - pad.right;
    const plotH = h - pad.top - pad.bottom;
    const barW = (plotW / this.data.length) * 0.65;
    const gap = (plotW / this.data.length) * 0.35;

    // Grid lines (4 lines)
    const gridLines = [0.25, 0.5, 0.75, 1].map(pct => {
      const y = pad.top + plotH - plotH * pct;
      return html`
        <line class="grid-line" x1=${pad.left} y1=${y} x2=${w - pad.right} y2=${y} />
        <text class="axis-value" x=${pad.left - 4} y=${y + 3} text-anchor="end">${this._formatValue(max * pct)}</text>
      `;
    });

    return html`
      <svg viewBox="0 0 ${w} ${h}" height=${h}>
        ${this.showGrid ? gridLines : nothing}
        ${this.data.map((d, i) => {
          const barH = (d.value / max) * plotH;
          const x = pad.left + i * (plotW / this.data.length) + gap / 2;
          const y = pad.top + plotH - barH;
          return html`
            <rect class="bar-rect" x=${x} y=${y} width=${barW} height=${barH} rx="3" fill=${this._color(i, d)}
              @mouseenter=${(e: MouseEvent) => this._showTooltip(e, d.label, d.value)}
              @mouseleave=${this._hideTooltip}>
            </rect>
            ${this.showValues ? html`<text class="bar-value" x=${x + barW / 2} y=${y - 4} text-anchor="middle">${this._formatValue(d.value)}</text>` : nothing}
            <text class="axis-label" x=${x + barW / 2} y=${h - 4} text-anchor="middle">${d.label}</text>
          `;
        })}
      </svg>
    `;
  }

  // ── Line / Area Chart ─────────────────────────────────────────────────────

  private _renderLineArea(fill: boolean) {
    const pad = { top: 8, right: 16, bottom: 28, left: 40 };
    const max = Math.max(...this.data.map(d => d.value), 1);
    const w = 300;
    const h = this.height;
    const plotW = w - pad.left - pad.right;
    const plotH = h - pad.top - pad.bottom;

    const points = this.data.map((d, i) => ({
      x: pad.left + (i / Math.max(this.data.length - 1, 1)) * plotW,
      y: pad.top + plotH - (d.value / max) * plotH,
    }));

    const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
    const areaPath = `${linePath} L ${points[points.length - 1]!.x} ${pad.top + plotH} L ${points[0]!.x} ${pad.top + plotH} Z`;

    const gridLines = [0.25, 0.5, 0.75, 1].map(pct => {
      const y = pad.top + plotH - plotH * pct;
      return html`
        <line class="grid-line" x1=${pad.left} y1=${y} x2=${w - pad.right} y2=${y} />
        <text class="axis-value" x=${pad.left - 4} y=${y + 3} text-anchor="end">${this._formatValue(max * pct)}</text>
      `;
    });

    const lineColor = this._color(0, this.data[0]!);

    return html`
      <svg viewBox="0 0 ${w} ${h}" height=${h}>
        ${this.showGrid ? gridLines : nothing}
        ${fill ? html`<path d=${areaPath} fill="${lineColor}" opacity="0.1" />` : nothing}
        <path class="line-path" d=${linePath} fill="none" stroke="${lineColor}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
        ${points.map((p, i) => html`
          <circle class="line-dot" cx=${p.x} cy=${p.y} r="3.5" fill="${lineColor}" stroke="var(--cg-color-surface-container-background, #18181b)" stroke-width="2"
            @mouseenter=${(e: MouseEvent) => this._showTooltip(e, this.data[i]!.label, this.data[i]!.value)}
            @mouseleave=${this._hideTooltip} />
        `)}
        ${this.data.map((d, i) => html`
          <text class="axis-label" x=${points[i]!.x} y=${h - 4} text-anchor="middle">${d.label}</text>
        `)}
      </svg>
    `;
  }

  // ── Pie / Donut Chart ─────────────────────────────────────────────────────

  private _renderPie(donut = false) {
    const total = this.data.reduce((s, d) => s + d.value, 0) || 1;
    const size = Math.min(this.height, 260);
    const r = size * 0.38;
    const cx = size / 2, cy = size / 2;
    let angle = -90;

    const slices = this.data.map((d, i) => {
      const sweep = (d.value / total) * 360;
      const endAngle = angle + sweep;
      const mid = angle + sweep / 2;
      const large = sweep > 180 ? 1 : 0;
      const rad = (a: number) => (a * Math.PI) / 180;

      const x1 = cx + r * Math.cos(rad(angle));
      const y1 = cy + r * Math.sin(rad(angle));
      const x2 = cx + r * Math.cos(rad(endAngle));
      const y2 = cy + r * Math.sin(rad(endAngle));

      // Label position
      const labelR = r * (donut ? 1.25 : 0.65);
      const lx = cx + labelR * Math.cos(rad(mid));
      const ly = cy + labelR * Math.sin(rad(mid));

      const pct = Math.round((d.value / total) * 100);
      const path = `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2} Z`;

      angle = endAngle;

      return html`
        <path class="pie-slice" d=${path} fill=${this._color(i, d)}
          @mouseenter=${(e: MouseEvent) => this._showTooltip(e, d.label, d.value)}
          @mouseleave=${this._hideTooltip} />
        ${pct >= 5 ? html`
          <text x=${lx} y=${ly} text-anchor="middle" dominant-baseline="central"
            fill="${donut ? 'var(--cg-color-chart-axis, #52525b)' : 'var(--cg-gray-white, #ffffff)'}" font-size="10" font-weight="600">${pct}%</text>
        ` : nothing}
      `;
    });

    const innerR = r * 0.55;

    return html`
      <svg viewBox="0 0 ${size} ${size}" height=${size} style="max-width: ${size}px; margin: 0 auto; display: block;">
        ${slices}
        ${donut ? html`
          <circle cx=${cx} cy=${cy} r=${innerR} fill="var(--cg-color-surface-container-background, #18181b)" />
          <text x=${cx} y=${cy - 6} text-anchor="middle" font-size="18" font-weight="700" fill="var(--cg-color-surface-base-text, #fafafa)">${this._formatValue(total)}</text>
          <text x=${cx} y=${cy + 10} text-anchor="middle" font-size="9" fill="var(--cg-color-chart-axis, #52525b)">${'Total'}</text>
        ` : nothing}
      </svg>
    `;
  }

  // ── Horizontal Bar ────────────────────────────────────────────────────────

  private _renderHorizontalBar() {
    const max = Math.max(...this.data.map(d => d.value), 1);
    const barH = 28;
    const gap = 8;
    const labelW = 80;
    const h = this.data.length * (barH + gap);
    const w = 300;

    return html`
      <svg viewBox="0 0 ${w} ${h}" height=${h}>
        ${this.data.map((d, i) => {
          const y = i * (barH + gap);
          const barW = ((d.value / max) * (w - labelW - 50));
          return html`
            <text class="axis-label" x=${labelW - 4} y=${y + barH / 2 + 4} text-anchor="end" font-size="11">${d.label}</text>
            <rect class="bar-rect" x=${labelW} y=${y} width=${barW} height=${barH} rx="4" fill=${this._color(i, d)}
              @mouseenter=${(e: MouseEvent) => this._showTooltip(e, d.label, d.value)}
              @mouseleave=${this._hideTooltip} />
            <text class="bar-value" x=${labelW + barW + 6} y=${y + barH / 2 + 4} font-size="11">${this._formatValue(d.value)}</text>
          `;
        })}
      </svg>
    `;
  }

  override render() {
    if (this.data.length === 0) {
      return html`<div class="empty">${this.emptyText}</div>`;
    }

    return html`
      <div class="chart-container">
        ${this.title ? html`<div class="title">${this.title}</div>` : nothing}
        ${this.subtitle ? html`<div class="subtitle">${this.subtitle}</div>` : nothing}

        <div style="position: relative;">
          ${this.type === 'bar' ? this._renderBar() : nothing}
          ${this.type === 'horizontal-bar' ? this._renderHorizontalBar() : nothing}
          ${this.type === 'line' ? this._renderLineArea(false) : nothing}
          ${this.type === 'area' ? this._renderLineArea(true) : nothing}
          ${this.type === 'pie' ? this._renderPie(false) : nothing}
          ${this.type === 'donut' ? this._renderPie(true) : nothing}

          <div class="tooltip ${this._tooltip.visible ? 'visible' : ''}"
            style="left: ${this._tooltip.x}px; top: ${this._tooltip.y}px;">
            ${this._tooltip.text}
          </div>
        </div>

        ${this.showLegend ? html`
          <div class="legend">
            ${this.data.map((d, i) => html`
              <span class="legend-item">
                <span class="legend-dot" style="background: ${this._color(i, d)}"></span>
                <span>${d.label}</span>
                <span class="legend-value">${this._formatValue(d.value)}</span>
              </span>
            `)}
          </div>
        ` : nothing}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap { 'cg-chart': CgChart; }
}
