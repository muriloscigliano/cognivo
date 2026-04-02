/**
 * @element ai-embedding-viz
 * 2D SVG scatter plot for visualizing vector embeddings with color-coded clusters and hover tooltips.
 *
 * @example
 * ```html
 * <ai-embedding-viz
 *   .points=${[
 *     {x:0.2, y:0.8, label:'cat', cluster:'animals'},
 *     {x:0.7, y:0.3, label:'car', cluster:'vehicles'}
 *   ]}
 *   title="Semantic Clusters"
 *   showLabels
 * ></ai-embedding-viz>
 * ```
 *
 * @fires {CustomEvent<{point: EmbeddingPoint}>} ai-embedding-point-click - Point clicked
 */
import { LitElement, html, css, nothing, svg } from 'lit';
import { property, state, customElement } from 'lit/decorators.js';
import { hostBlock, reducedMotion, fadeSlideInKeyframes } from '../../styles/index.js';

interface EmbeddingPoint {
  x: number;
  y: number;
  label: string;
  cluster?: string;
  color?: string;
}

const CLUSTER_COLORS = [
  '#dfff61', '#3b82f6', '#f472b6', '#22c55e', '#eab308',
  '#a78bfa', '#f97316', '#06b6d4', '#ef4444', '#84cc16',
];

@customElement('ai-embedding-viz')
export class AiEmbeddingViz extends LitElement {
  static override styles = [hostBlock, reducedMotion, fadeSlideInKeyframes, css`
    :host {
      animation: fadeSlideIn 200ms var(--cg-motion-easing-enter, cubic-bezier(0, 0, 0.2, 1)) both;
    }
    :host([hidden]) { display: none; }

    .container {
      background: var(--cg-color-surface-container-background, #18181b);
      border: 1px solid var(--cg-color-surface-container-border, #27272a);
      border-radius: 12px;
      padding: 20px;
      color: var(--cg-color-surface-base-text, #fafafa);
      box-shadow: inset 0 1px 0 0 rgba(255, 255, 255, 0.05);
      background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0.03), transparent);
    }

    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 12px;
    }

    .title {
      font-size: 14px;
      font-weight: 600;
    }

    .point-count {
      font-size: 11px;
      color: var(--cg-gray-500, #71717a);
    }

    .chart-area {
      position: relative;
      background: var(--cg-color-surface-base-background, #09090b);
      border: 1px solid var(--cg-color-surface-container-border, #27272a);
      border-radius: 8px;
      overflow: hidden;
    }

    svg {
      display: block;
      width: 100%;
      height: 300px;
    }

    .point {
      cursor: pointer;
      transition: r 120ms ease;
    }
    .point:hover { r: 7; }
    .point:focus-visible {
      outline: 2px solid var(--cg-brand-ai-accent, #dfff61);
      outline-offset: 2px;
    }

    .point-label {
      font-size: 9px;
      fill: var(--cg-gray-400, #a1a1aa);
      pointer-events: none;
    }

    .tooltip {
      position: absolute;
      background: #09090b;
      border: 1px solid var(--cg-gray-700, #3f3f46);
      color: #e4e4e7;
      font-size: 11px;
      padding: 6px 10px;
      border-radius: 6px;
      white-space: nowrap;
      pointer-events: none;
      z-index: 10;
      box-shadow: var(--cg-elevation-2, 0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -2px rgba(0, 0, 0, 0.2));
      transform: translate(-50%, -100%);
      margin-top: -10px;
    }

    .legend {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      margin-top: 10px;
    }

    .legend-item {
      display: flex;
      align-items: center;
      gap: 4px;
      font-size: 11px;
      color: var(--cg-gray-400, #a1a1aa);
    }

    .legend-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
    }

    .empty-state {
      text-align: center;
      color: var(--cg-gray-600, #52525b);
      font-size: 13px;
      padding: 32px 0;
    }

    .axis-label {
      font-size: 9px;
      fill: var(--cg-gray-600, #52525b);
    }
    }
  `];
  @property({ type: Array }) points: EmbeddingPoint[] = [];
  @property({ type: String }) override title = 'Embedding Visualization';
  @property({ type: Boolean }) showLabels = false;

  @state() private _hovered: EmbeddingPoint | null = null;
  @state() private _tooltipX = 0;
  @state() private _tooltipY = 0;

  private _clusterColorMap = new Map<string, string>();

  private _getColor(point: EmbeddingPoint): string {
    if (point.color) return point.color;
    if (!point.cluster) return '#dfff61';

    if (!this._clusterColorMap.has(point.cluster)) {
      const idx = this._clusterColorMap.size % CLUSTER_COLORS.length;
      this._clusterColorMap.set(point.cluster, CLUSTER_COLORS[idx]!);
    }
    return this._clusterColorMap.get(point.cluster)!;
  }

  private _normalize(): { nx: number; ny: number; point: EmbeddingPoint }[] {
    if (!this.points.length) return [];
    const margin = 30;
    const w = 500 - margin * 2;
    const h = 300 - margin * 2;

    const xs = this.points.map(p => p.x);
    const ys = this.points.map(p => p.y);
    const minX = Math.min(...xs);
    const maxX = Math.max(...xs);
    const minY = Math.min(...ys);
    const maxY = Math.max(...ys);
    const rangeX = maxX - minX || 1;
    const rangeY = maxY - minY || 1;

    return this.points.map(p => ({
      nx: margin + ((p.x - minX) / rangeX) * w,
      ny: margin + ((p.y - minY) / rangeY) * h,
      point: p,
    }));
  }

  private get _clusters(): string[] {
    const s = new Set<string>();
    for (const p of this.points) {
      if (p.cluster) s.add(p.cluster);
    }
    return [...s];
  }

  private _handlePointClick(point: EmbeddingPoint) {
    this.dispatchEvent(new CustomEvent('ai-embedding-point-click', {
      detail: { label: point.label, x: point.x, y: point.y, cluster: point.cluster },
      bubbles: true,
      composed: true,
    }));
  }

  private _handleHover(e: MouseEvent, point: EmbeddingPoint) {
    const rect = (e.currentTarget as SVGElement).closest('.chart-area')?.getBoundingClientRect();
    if (rect) {
      this._tooltipX = e.clientX - rect.left;
      this._tooltipY = e.clientY - rect.top;
    }
    this._hovered = point;
  }

  override render() {
    if (!this.points.length) {
      return html`<div class="container"><div class="empty-state">No embedding data</div></div>`;
    }

    const normalized = this._normalize();
    this._clusterColorMap.clear();

    return html`
      <div class="container" role="region" aria-label="${this.title}">
        <div class="header">
          <span class="title">${this.title}</span>
          <span class="point-count">${this.points.length} points</span>
        </div>

        <div class="chart-area">
          <svg viewBox="0 0 500 300" role="img" aria-label="Scatter plot of ${this.points.length} embedding points">
            ${normalized.map(({ nx, ny, point }, i) => svg`
              <circle
                class="point"
                cx=${nx}
                cy=${ny}
                r="5"
                fill=${this._getColor(point)}
                opacity="0.8"
                tabindex="0"
                role="button"
                aria-label="${point.label}${point.cluster ? `, cluster: ${point.cluster}` : ''}"
                @click=${() => this._handlePointClick(point)}
                @mouseenter=${(e: MouseEvent) => this._handleHover(e, point)}
                @mouseleave=${() => { this._hovered = null; }}
                @keydown=${(e: KeyboardEvent) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); this._handlePointClick(point); } }}
              />
              ${this.showLabels ? svg`
                <text class="point-label" x=${nx + 8} y=${ny + 3}>${point.label}</text>
              ` : nothing}
            `)}
          </svg>

          ${this._hovered ? html`
            <div class="tooltip" style="left:${this._tooltipX}px;top:${this._tooltipY}px">
              ${this._hovered.label}${this._hovered.cluster ? ` (${this._hovered.cluster})` : ''}
            </div>
          ` : nothing}
        </div>

        ${this._clusters.length > 0 ? html`
          <div class="legend" role="list" aria-label="Cluster legend">
            ${this._clusters.map(c => {
              const color = this._getColor({ x: 0, y: 0, label: '', cluster: c });
              return html`
                <div class="legend-item" role="listitem">
                  <div class="legend-dot" style="background:${color}"></div>
                  ${c}
                </div>
              `;
            })}
          </div>
        ` : nothing}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ai-embedding-viz': AiEmbeddingViz;
  }
}
