import { LitElement, html, css, nothing, svg } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { hostBlock, reducedMotion } from '../../styles/index.js';

/** Data point for cg-chart */
export interface ChartSeries {
  label: string;
  value: number;
  color?: string;
}

/** Default palette — hex colors that work directly in SVG fill/stroke attributes */
const PALETTE = [
  '#dfff61', '#14b8a6', '#22c55e', '#f59e0b',
  '#f97316', '#ec4899', '#8b5cf6', '#ef4444',
];

@customElement('cg-chart')
export class CgChart extends LitElement {
  static override styles = [hostBlock, reducedMotion, css`
    :host { display: block; }

    .wrap { position: relative; }
    .wrap.contained {
      background: var(--cg-color-surface-cards-background);
      border: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
      border-radius: var(--cg-component-card-radius);
      padding: var(--cg-spacing-20);
    }

    .header { margin-bottom: var(--cg-spacing-12); }
    .title {
      font-size: var(--cg-font-size-sm);
      font-weight: var(--cg-font-weight-semibold);
      color: var(--cg-color-surface-base-text);
    }
    .subtitle {
      font-size: var(--cg-font-size-xs);
      color: var(--cg-color-input-text-placeholder);
      margin-top: var(--cg-spacing-2);
    }

    .svg-wrap { position: relative; }
    svg { display: block; width: 100%; }

    /* ── Entrance animations ── */
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    @keyframes lineTrace {
      from { stroke-dashoffset: var(--dash); }
      to { stroke-dashoffset: 0; }
    }

    .anim-line {
      stroke-dasharray: var(--dash);
      stroke-dashoffset: var(--dash);
      animation: lineTrace 900ms cubic-bezier(0.4, 0, 1, 1) forwards;
    }
    .anim-dot {
      animation: fadeIn 200ms cubic-bezier(0.4, 0, 1, 1) both;
    }
    .anim-slice {
      animation: fadeIn 400ms cubic-bezier(0.4, 0, 1, 1) both;
    }
    .anim-legend {
      animation: fadeIn 200ms cubic-bezier(0.4, 0, 1, 1) both;
    }

    /* Tooltip */
    .tip {
      position: absolute;
      background: var(--cg-color-surface-container-background);
      color: var(--cg-color-surface-base-text);
      border: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
      padding: var(--cg-spacing-4) var(--cg-spacing-8);
      border-radius: var(--cg-border-radius-50);
      font-size: var(--cg-font-size-xs);
      font-weight: var(--cg-font-weight-medium);
      pointer-events: none;
      white-space: nowrap;
      transform: translate(-50%, -100%);
      margin-top: -8px;
      z-index: 10;
      display: none;
    }
    .tip.show { display: block; }

    /* Legend */
    .legend {
      display: flex; flex-wrap: wrap; gap: var(--cg-spacing-12);
      margin-top: var(--cg-spacing-16); padding-top: var(--cg-spacing-12);
      border-top: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
    }
    .legend-item {
      display: inline-flex; align-items: center; gap: var(--cg-spacing-4);
      font-size: var(--cg-font-size-xs); color: var(--cg-color-input-text-placeholder);
    }
    .legend-dot {
      width: var(--cg-spacing-8); height: var(--cg-spacing-8);
      border-radius: var(--cg-border-radius-full); flex-shrink: 0;
    }
    .legend-val {
      font-weight: var(--cg-font-weight-semibold);
      color: var(--cg-color-surface-base-text);
    }

    .empty {
      display: flex; align-items: center; justify-content: center;
      color: var(--cg-color-input-text-placeholder);
      font-size: var(--cg-font-size-sm); min-height: 120px;
    }
  `];

  @property({ type: Array }) data: ChartSeries[] = [];
  @property() type: 'bar' | 'horizontal-bar' | 'line' | 'area' | 'pie' | 'donut' = 'bar';
  @property() override title = '';
  @property() subtitle = '';
  @property({ type: Number }) height = 200;
  @property({ type: Boolean }) showLegend = true;
  @property({ type: Boolean }) showValues = true;
  /** Wrap chart in a card container */
  @property({ type: Boolean }) contained = false;
  @property({ type: Boolean }) showGrid = true;
  @property() emptyText = 'No data';

  @state() private _tipX = 0;
  @state() private _tipY = 0;
  @state() private _tipText = '';
  @state() private _tipShow = false;

  // Resolved theme colors for SVG — pulled from CSS custom properties at runtime
  private _grid = '';
  private _axis = '';
  private _text = '';
  private _bg = '';
  private _resolved = false;

  private _resolve() {
    if (this._resolved) return;
    const s = getComputedStyle(this);
    this._grid = s.getPropertyValue('--cg-color-chart-grid').trim() || s.getPropertyValue('--cg-color-border-default').trim();
    this._axis = s.getPropertyValue('--cg-color-chart-axis').trim() || s.getPropertyValue('--cg-color-text-muted').trim();
    this._text = s.getPropertyValue('--cg-color-surface-base-text').trim() || s.getPropertyValue('--cg-color-text-default').trim();
    this._bg = s.getPropertyValue('--cg-color-surface-container-background').trim() || s.getPropertyValue('--cg-color-surface-base').trim();
    for (let i = 0; i < 8; i++) {
      const v = s.getPropertyValue(`--cg-color-chart-${i + 1}`).trim();
      if (v) PALETTE[i] = v;
    }
    this._resolved = true;
  }

  override firstUpdated() {
    this._resolve();
    this.requestUpdate();
  }

  private _animId = 0;
  private _animated = false;

  override updated(changed: Map<string, unknown>) {
    if (!this._animated && this.data.length > 0) {
      this._animated = true;
      this._animateBars();
    }
    if (changed.has('data') || changed.has('type')) {
      this._animated = false;
      cancelAnimationFrame(this._animId);
      // Re-animate on next frame after render
      requestAnimationFrame(() => {
        this._animated = true;
        this._animateBars();
      });
    }
  }

  private _easeOut(t: number) { return 1 - (1 - t) * (1 - t); }

  private _animateBars() {
    const bars = this.shadowRoot?.querySelectorAll<SVGRectElement>('.bar-anim');
    const hbars = this.shadowRoot?.querySelectorAll<SVGRectElement>('.hbar-anim');
    const vals = this.shadowRoot?.querySelectorAll<SVGElement>('.val-anim');
    if (!bars?.length && !hbars?.length) return;

    const dur = 500;
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;

      bars?.forEach(rect => {
        const delay = Number(rect.dataset.delay) || 0;
        const t = Math.min(1, Math.max(0, (elapsed - delay) / dur));
        const p = this._easeOut(t);
        const targetH = Number(rect.dataset.h);
        const targetY = Number(rect.dataset.y);
        const baseY = targetY + targetH;
        const h = targetH * p;
        rect.setAttribute('height', String(h));
        rect.setAttribute('y', String(baseY - h));
      });

      hbars?.forEach(rect => {
        const delay = Number(rect.dataset.delay) || 0;
        const t = Math.min(1, Math.max(0, (elapsed - delay) / dur));
        const p = this._easeOut(t);
        const targetW = Number(rect.dataset.w);
        rect.setAttribute('width', String(targetW * p));
      });

      vals?.forEach(el => {
        const delay = Number(el.dataset.delay) || 0;
        const t = Math.min(1, Math.max(0, (elapsed - delay) / 200));
        el.setAttribute('opacity', String(t));
      });

      const maxDelay = Math.max(
        ...[...bars || []].map(r => Number(r.dataset.delay) || 0),
        ...[...hbars || []].map(r => Number(r.dataset.delay) || 0),
        ...[...vals || []].map(r => Number(r.dataset.delay) || 0),
      );
      if (elapsed < maxDelay + dur + 200) {
        this._animId = requestAnimationFrame(tick);
      }
    };

    this._animId = requestAnimationFrame(tick);
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    cancelAnimationFrame(this._animId);
  }

  private _color(i: number, d: ChartSeries) { return d.color || PALETTE[i % PALETTE.length]!; }

  private _fmt(v: number) {
    if (Math.abs(v) >= 1e6) return (v / 1e6).toFixed(1) + 'M';
    if (Math.abs(v) >= 1e3) return (v / 1e3).toFixed(1) + 'K';
    return v % 1 === 0 ? String(v) : v.toFixed(1);
  }

  private _tip(e: MouseEvent, label: string, value: number) {
    const r = (e.currentTarget as Element).closest('.svg-wrap')!.getBoundingClientRect();
    this._tipX = e.clientX - r.left;
    this._tipY = e.clientY - r.top;
    this._tipText = `${label}: ${this._fmt(value)}`;
    this._tipShow = true;
  }
  private _untip() { this._tipShow = false; }

  // ═══ BAR ═══
  private _bar() {
    const { data, height: H } = this;
    const W = 400, T = 20, R = 16, B = 28, L = 44;
    const pw = W - L - R, ph = H - T - B;
    const max = Math.max(...data.map(d => d.value), 1);
    const n = data.length;
    const bw = (pw / n) * 0.6;
    const step = pw / n;

    return svg`
      ${this.showGrid ? [0.25, 0.5, 0.75, 1].map(p => {
        const y = T + ph - ph * p;
        return svg`
          <line x1="${L}" y1="${y}" x2="${W - R}" y2="${y}" stroke="${this._grid}" stroke-width="0.5" stroke-dasharray="3,3" />
          <text x="${L - 6}" y="${y + 4}" text-anchor="end" fill="${this._axis}" font-size="10">${this._fmt(max * p)}</text>
        `;
      }) : nothing}
      ${data.map((d, i) => {
        const bh = (d.value / max) * ph;
        const x = L + i * step + (step - bw) / 2;
        const yFinal = T + ph - bh;
        const yBase = T + ph;
        const c = this._color(i, d);
        return svg`
          <rect class="bar-anim" x="${x}" y="${yBase}" width="${bw}" height="0" rx="4" fill="${c}" style="cursor:pointer"
            data-y="${yFinal}" data-h="${bh}" data-delay="${i * 50}"
            @mouseenter=${(e: MouseEvent) => this._tip(e, d.label, d.value)}
            @mouseleave=${this._untip} />
          ${this.showValues ? svg`<text class="val-anim" x="${x + bw / 2}" y="${yFinal - 6}" text-anchor="middle" fill="${this._text}" font-size="10" font-weight="600" opacity="0" data-delay="${i * 50 + 300}">${this._fmt(d.value)}</text>` : nothing}
          <text x="${x + bw / 2}" y="${H - 6}" text-anchor="middle" fill="${this._axis}" font-size="10">${d.label}</text>
        `;
      })}
    `;
  }

  // ═══ HORIZONTAL BAR ═══
  private _hbar() {
    const { data } = this;
    const W = 400, lW = 72, gap = 8, bH = 28;
    const H = data.length * (bH + gap);
    const max = Math.max(...data.map(d => d.value), 1);

    return svg`
      ${data.map((d, i) => {
        const y = i * (bH + gap);
        const bW = (d.value / max) * (W - lW - 60);
        const c = this._color(i, d);
        return svg`
          <text x="${lW - 6}" y="${y + bH / 2 + 4}" text-anchor="end" fill="${this._axis}" font-size="11">${d.label}</text>
          <rect class="hbar-anim" x="${lW}" y="${y}" width="0" height="${bH}" rx="4" fill="${c}" style="cursor:pointer"
            data-w="${bW}" data-delay="${i * 50}"
            @mouseenter=${(e: MouseEvent) => this._tip(e, d.label, d.value)}
            @mouseleave=${this._untip} />
          <text class="val-anim" x="${lW + bW + 8}" y="${y + bH / 2 + 4}" fill="${this._text}" font-size="11" font-weight="600" opacity="0" data-delay="${i * 50 + 300}">${this._fmt(d.value)}</text>
        `;
      })}
    `;
  }

  // ═══ LINE / AREA ═══
  private _line(area: boolean) {
    const { data, height: H } = this;
    const W = 400, T = 12, R = 16, B = 28, L = 44;
    const pw = W - L - R, ph = H - T - B;
    const max = Math.max(...data.map(d => d.value), 1);
    const c = this._color(0, data[0]!);

    const pts = data.map((d, i) => ({
      x: L + (i / Math.max(data.length - 1, 1)) * pw,
      y: T + ph - (d.value / max) * ph,
    }));
    const line = pts.map((p, i) => `${i ? 'L' : 'M'}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');
    const areaD = `${line} L${pts.at(-1)!.x.toFixed(1)},${(T + ph).toFixed(1)} L${pts[0]!.x.toFixed(1)},${(T + ph).toFixed(1)} Z`;

    return svg`
      ${this.showGrid ? [0.25, 0.5, 0.75, 1].map(p => {
        const y = T + ph - ph * p;
        return svg`
          <line x1="${L}" y1="${y}" x2="${W - R}" y2="${y}" stroke="${this._grid}" stroke-width="0.5" stroke-dasharray="3,3" />
          <text x="${L - 6}" y="${y + 4}" text-anchor="end" fill="${this._axis}" font-size="10">${this._fmt(max * p)}</text>
        `;
      }) : nothing}
      ${area ? svg`<path d="${areaD}" fill="${c}" opacity="0.2" />` : nothing}
      <path class="anim-line" d="${line}" fill="none" stroke="${c}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="--dash:2000" />
      ${pts.map((p, i) => svg`
        <circle class="anim-dot" cx="${p.x}" cy="${p.y}" r="4" fill="${c}" stroke="${this._bg}" stroke-width="2" style="cursor:pointer; animation-delay:${400 + i * 50}ms"
          @mouseenter=${(e: MouseEvent) => this._tip(e, data[i]!.label, data[i]!.value)}
          @mouseleave=${this._untip} />
      `)}
      ${data.map((d, i) => svg`
        <text x="${pts[i]!.x}" y="${H - 6}" text-anchor="middle" fill="${this._axis}" font-size="10">${d.label}</text>
      `)}
    `;
  }

  // ═══ PIE / DONUT ═══
  private _pie(donut: boolean) {
    const { data } = this;
    const total = data.reduce((s, d) => s + d.value, 0) || 1;
    const sz = Math.min(this.height, 240);
    const r = sz * 0.4;
    const cx = sz / 2, cy = sz / 2;
    const rad = (a: number) => a * Math.PI / 180;
    let ang = -90;

    const slices = data.map((d, i) => {
      const sw = (d.value / total) * 360;
      const end = ang + sw;
      const lg = sw > 180 ? 1 : 0;
      const x1 = cx + r * Math.cos(rad(ang));
      const y1 = cy + r * Math.sin(rad(ang));
      const x2 = cx + r * Math.cos(rad(end));
      const y2 = cy + r * Math.sin(rad(end));
      const mid = ang + sw / 2;
      const lr = r * (donut ? 1.2 : 0.6);
      const lx = cx + lr * Math.cos(rad(mid));
      const ly = cy + lr * Math.sin(rad(mid));
      const pct = Math.round((d.value / total) * 100);
      const c = this._color(i, d);
      const p = `M${cx},${cy} L${x1.toFixed(1)},${y1.toFixed(1)} A${r},${r} 0 ${lg} 1 ${x2.toFixed(1)},${y2.toFixed(1)} Z`;
      ang = end;

      return svg`
        <path class="anim-slice" d="${p}" fill="${c}" style="cursor:pointer; animation-delay:${i * 60}ms"
          @mouseenter=${(e: MouseEvent) => this._tip(e, d.label, d.value)}
          @mouseleave=${this._untip} />
        ${pct >= 5 ? svg`<text x="${lx}" y="${ly}" text-anchor="middle" dominant-baseline="central" fill="${donut ? this._axis : this._text}" font-size="10" font-weight="600">${pct}%</text>` : nothing}
      `;
    });

    return svg`
      ${slices}
      ${donut ? svg`
        <circle cx="${cx}" cy="${cy}" r="${r * 0.55}" fill="${this._bg}" />
        <text x="${cx}" y="${cy - 4}" text-anchor="middle" fill="${this._text}" font-size="16" font-weight="700">${this._fmt(total)}</text>
        <text x="${cx}" y="${cy + 12}" text-anchor="middle" fill="${this._axis}" font-size="9">Total</text>
      ` : nothing}
    `;
  }

  private _svgHeight() {
    if (this.type === 'horizontal-bar') return this.data.length * 36;
    if (this.type === 'pie' || this.type === 'donut') return Math.min(this.height, 240);
    return this.height;
  }

  private _svgWidth() {
    if (this.type === 'pie' || this.type === 'donut') return Math.min(this.height, 240);
    return 400;
  }

  override render() {
    if (!this.data.length) return html`<div class="wrap ${this.contained ? 'contained' : ''}"><div class="empty">${this.emptyText}</div></div>`;

    const vw = this._svgWidth();
    const vh = this._svgHeight();
    const isPie = this.type === 'pie' || this.type === 'donut';

    let chartSvg;
    switch (this.type) {
      case 'bar': chartSvg = this._bar(); break;
      case 'horizontal-bar': chartSvg = this._hbar(); break;
      case 'line': chartSvg = this._line(false); break;
      case 'area': chartSvg = this._line(true); break;
      case 'pie': chartSvg = this._pie(false); break;
      case 'donut': chartSvg = this._pie(true); break;
    }

    return html`
      <div class="wrap ${this.contained ? 'contained' : ''}">
        ${this.title || this.subtitle ? html`
          <div class="header">
            ${this.title ? html`<div class="title">${this.title}</div>` : nothing}
            ${this.subtitle ? html`<div class="subtitle">${this.subtitle}</div>` : nothing}
          </div>
        ` : nothing}

        <div class="svg-wrap">
          <svg viewBox="0 0 ${vw} ${vh}" style="${isPie ? `max-width:${vw}px; margin:0 auto;` : ''}">
            ${chartSvg}
          </svg>
          <div class="tip ${this._tipShow ? 'show' : ''}" style="left:${this._tipX}px;top:${this._tipY}px;">
            ${this._tipText}
          </div>
        </div>

        ${this.showLegend ? html`
          <div class="legend">
            ${this.data.map((d, i) => html`
              <span class="legend-item anim-legend" style="animation-delay:${300 + i * 40}ms">
                <span class="legend-dot" style="background:${this._color(i, d)}"></span>
                <span>${d.label}</span>
                <span class="legend-val">${this._fmt(d.value)}</span>
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
