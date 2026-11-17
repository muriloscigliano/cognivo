import { LitElement, html, css, nothing, svg } from 'lit';
import { property, state } from 'lit/decorators.js';
import { customElement } from '../../utils/define.js';
import { hostBlock, reducedMotion } from '../../styles/index.js';
import { defineMessages, Messages } from '../../utils/messages.js';

const MESSAGES = defineMessages('cg-chart', {
  label: 'Chart',
  empty: 'No data',
  total: 'Total',
  /** Column headers of the visually hidden data table. */
  category: 'Label',
  value: 'Value',
});

/** Data point for cg-chart */
export interface ChartSeries {
  label: string;
  value: number;
  color?: string;
}

/** Series colour i (categorical marks): the chart palette tokens, live with the theme. */
const paletteColor = (i: number) => `var(--cg-color-chart-${(i % 10) + 1}-background)`;
/** The one series colour of a time series (auto bars, lines). */
const SERIES = 'var(--cg-color-chart-1-background)';
const SERIES_LINE = 'var(--cg-color-chart-1-stroke)';

/** Points up to which `type="auto"` draws bars (sparse counts read better as bars than as a spiky line). */
const AUTO_BAR_MAX = 30;

/**
 * @element cg-chart
 * Bar, line, area, pie and donut charts; `type="auto"` for a time series.
 *
 * Reading the chart: one dashed grid line at the maximum with its value
 * (12 px, muted) — `show-grid` off hides it; a crosshair and a small
 * tooltip card (label and value) follow the pointer over bar, line, area and
 * auto charts, and the arrow keys (Home / End, Escape) move it on the
 * focused chart; a tap reads the point (or the pie slice) under the finger.
 * The reading is announced from a polite live region that is always there;
 * a visually hidden table (caption = title) holds every label and value.
 * Colours are tokens (`--cg-color-chart-N-*`), so a theme
 * switch repaints the marks; `ChartSeries.color` still overrides.
 *
 * `type="auto"`: bars in one series colour for up to 30 points, a line
 * above that; x labels are thinned to about six; no legend.
 *
 * Values: `format` takes `Intl.NumberFormat` options (JSON attribute or
 * property), e.g. `{ "style": "currency", "currency": "BRL" }`, and applies
 * them to the max label, value labels, the tooltip, the legend, the
 * announcement and the data table, in `locale` (default: the nearest `lang`).
 * Without `format`, marks show compact numbers (1.2K) in `locale` and the
 * tooltip, the chart's name and the table the full locale number. A value
 * label that would collide with its neighbour or leave the chart switches to
 * compact notation (and is dropped if it still collides); the tooltip and
 * the table keep the full value. An invalid `format` or `locale` falls back
 * to the default formatter with a console warning — the chart still draws.
 *
 * No data, or only zeros: the card keeps its shape (`height`) and shows
 * `empty-text` (title) and `empty-description` (one muted line) at the
 * bottom — no flat line at zero.
 *
 * @example
 * ```html
 * <cg-chart type="auto" title="Sign-ups" .data=${days} empty-text="No activity yet"></cg-chart>
 * ```
 */
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

    /* SVG marks paint with tokens (live with the theme). */
    .grid { stroke: var(--cg-color-surface-hairline); stroke-width: 1; stroke-dasharray: 3 3; vector-effect: non-scaling-stroke; }
    .axis { fill: var(--cg-color-on-surface-container-default); }
    .val { fill: var(--cg-color-state-text); }
    .dot { stroke: var(--cg-color-surface-panel-background); }
    .hole { fill: var(--cg-color-surface-panel-background); }
    .crosshair { stroke: var(--cg-color-state-text); stroke-width: 1; vector-effect: non-scaling-stroke; opacity: 0.4; }
    svg:focus { outline: none; }
    svg:focus-visible { outline: var(--cg-focus-ring-width) solid var(--cg-color-focus-ring); outline-offset: var(--cg-focus-ring-offset); border-radius: var(--cg-border-radius-50); }
    .max-label {
      position: absolute;
      left: 0;
      transform: translateY(-100%);
      padding-bottom: var(--cg-spacing-2);
      font-size: var(--cg-font-size-xs);
      color: var(--cg-color-on-surface-container-default);
      font-variant-numeric: tabular-nums;
      pointer-events: none;
    }
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
      animation: lineTrace 900ms var(--cg-transition-easing-ease-out) forwards;
    }
    .anim-dot {
      animation: fadeIn 200ms var(--cg-transition-easing-ease-out) both;
    }
    .anim-slice {
      animation: fadeIn 400ms var(--cg-transition-easing-ease-out) both;
    }
    .anim-legend {
      animation: fadeIn 200ms var(--cg-transition-easing-ease-out) both;
    }

    /* Tooltip card: the label (muted) over the value. */
    .tip {
      position: absolute;
      display: none;
      flex-direction: column;
      gap: var(--cg-spacing-2);
      background: var(--cg-color-surface-panel-background);
      color: var(--cg-color-state-text);
      border: var(--cg-border-width-50) solid var(--cg-color-surface-hairline);
      box-shadow: var(--cg-shadow-elevation-sm);
      padding: var(--cg-spacing-6) var(--cg-spacing-8);
      border-radius: var(--cg-border-radius-50);
      pointer-events: none;
      white-space: nowrap;
      transform: translate(-50%, calc(-100% - var(--cg-spacing-8)));
      z-index: 10;
    }
    .tip.show { display: flex; }
    /* The reading's live region and the data table: read, not seen. Always
       rendered (never display: none), so the first reading is announced. */
    .sr {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip-path: inset(50%);
      white-space: nowrap;
      border: 0;
    }
    .tip-label { font-size: var(--cg-font-size-xs); color: var(--cg-color-on-surface-container-default); }
    .tip-value { font-size: var(--cg-font-size-sm); font-weight: var(--cg-font-weight-medium); font-variant-numeric: tabular-nums; }

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

    /* Empty: the chart's space stays; title and one line at the bottom. */
    .empty {
      display: flex; flex-direction: column; justify-content: flex-end; gap: var(--cg-spacing-2);
      box-sizing: border-box;
    }
    .empty-title { font-size: var(--cg-font-size-sm); font-weight: var(--cg-font-weight-medium); color: var(--cg-color-state-text); }
    .empty-desc { font-size: var(--cg-font-size-13); color: var(--cg-color-on-surface-container-default); }
  `];

  /** Per-element text overrides (JSON attribute); see `setMessages()`. */
  @property({ type: Object }) messages: Partial<typeof MESSAGES> | null = null;
  private i18n = new Messages(this, MESSAGES);

  @property({ type: Array }) data: ChartSeries[] = [];
  @property() type: 'bar' | 'horizontal-bar' | 'line' | 'area' | 'pie' | 'donut' | 'auto' = 'bar';
  @property() override title = '';
  @property() subtitle = '';
  @property({ type: Number }) height = 200;
  @property({ type: Boolean }) showLegend = true;
  @property({ type: Boolean }) showValues = true;
  /** Wrap chart in a card container */
  @property({ type: Boolean }) contained = false;
  @property({ type: Boolean }) showGrid = true;
  /** `Intl.NumberFormat` options for every value shown (e.g. currency). */
  @property({ type: Object }) format: Intl.NumberFormatOptions | null = null;
  /** BCP 47 locale for values; defaults to the nearest `lang`. */
  @property() locale = '';
  /** Empty-state title; defaults to the `empty` message. */
  @property({ attribute: 'empty-text' }) emptyText?: string;
  /** Empty-state line under the title. */
  @property({ attribute: 'empty-description' }) emptyDescription = '';

  @state() private _tipX = 0;
  @state() private _tipY = 0;
  @state() private _tipShow = false;
  /** The point under the crosshair (bar / line / area / auto), or -1. */
  @state() private _active = -1;
  /** Plot geometry of the last render, for the crosshair. */
  private _plot = { L: 0, R: 0, T: 0, ph: 0, W: 400, H: 200, xs: [] as number[] };

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
    if (typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches) {
      // Reduced motion: the marks at their final size at once.
      this.shadowRoot?.querySelectorAll<SVGRectElement>('.bar-anim').forEach((r) => { r.setAttribute('height', r.dataset.h!); r.setAttribute('y', r.dataset.y!); });
      this.shadowRoot?.querySelectorAll<SVGRectElement>('.hbar-anim').forEach((r) => r.setAttribute('width', r.dataset.w!));
      this.shadowRoot?.querySelectorAll<SVGElement>('.val-anim').forEach((el) => el.setAttribute('opacity', '1'));
      return;
    }
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

  private _color(i: number, d: ChartSeries) { return d.color || paletteColor(i); }

  /** Bars for a short time series, a line for a long one. */
  private get _kind(): Exclude<CgChart['type'], 'auto'> | 'auto-bar' | 'auto-line' {
    if (this.type !== 'auto') return this.type;
    return this.data.length <= AUTO_BAR_MAX ? 'auto-bar' : 'auto-line';
  }

  /** The dashed grid line at the maximum (the value is an HTML label over it). */
  private _maxLine(L: number, R: number, T: number, W: number) {
    return this.showGrid ? svg`<line class="grid" x1="${L}" y1="${T}" x2="${W - R}" y2="${T}" />` : nothing;
  }

  /** x labels: every one, or about six (and the last) for a time series. */
  private _showLabel(i: number) {
    if (this.type !== 'auto') return true;
    const n = this.data.length;
    const stride = Math.max(1, Math.ceil(n / 6));
    return i % stride === 0 || i === n - 1;
  }

  private _pointAt(e: PointerEvent): number {
    const svgEl = (e.currentTarget as Element).querySelector('svg');
    if (!svgEl) return -1;
    const r = svgEl.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * this._plot.W;
    const { xs } = this._plot;
    if (!xs.length) return -1;
    let best = 0;
    for (let i = 1; i < xs.length; i++) if (Math.abs(xs[i]! - x) < Math.abs(xs[best]! - x)) best = i;
    return best;
  }

  private _onMove(e: PointerEvent) {
    if (!this._plot.xs.length) return;
    this._setActive(this._pointAt(e));
  }

  private _setActive(i: number) {
    this._active = i;
    if (i < 0) { this._tipShow = false; return; }
    const d = this.data[i]!;
    const { xs, W, H, T } = this._plot;
    this._tipX = (xs[i]! / W) * 100;
    this._tipY = (T / H) * 100;
    this._tipLabel = d.label;
    this._tipValue = this._full(d.value);
    this._tipShow = true;
  }
  @state() private _tipLabel = '';
  @state() private _tipValue = '';

  private _onKey(e: KeyboardEvent) {
    const n = this._plot.xs.length;
    if (!n) return;
    const keys: Record<string, number> = { ArrowRight: Math.min(n - 1, this._active + 1), ArrowLeft: Math.max(0, this._active - 1), Home: 0, End: n - 1, Escape: -1 };
    if (!(e.key in keys)) return;
    e.preventDefault();
    this._setActive(keys[e.key]!);
  }

  private _nf?: { key: string; full: Intl.NumberFormat; compact: Intl.NumberFormat; formatted: boolean };
  /**
   * The number formatters for `format` / `locale` (cached per pair). An
   * invalid locale or format (Intl throws) never blanks the chart: it falls
   * back to the page language / the default formatter, with one warning.
   */
  private _numbers() {
    const loc = this.locale || this.i18n.locale;
    const key = JSON.stringify([this.format, loc]);
    if (this._nf?.key === key) return this._nf;
    const warn = (what: string, err: unknown) =>
      console.warn(`[cognivo] <cg-chart> ignores an invalid ${what} and uses the default: ${(err as Error).message}`);
    let locale: string | undefined = loc;
    try { Intl.NumberFormat.supportedLocalesOf(loc); } catch (err) {
      warn(`locale "${loc}"`, err);
      locale = this.locale && this.locale !== this.i18n.locale ? this.i18n.locale : undefined;
      try { if (locale) Intl.NumberFormat.supportedLocalesOf(locale); } catch { locale = undefined; }
    }
    let opts = this.format ?? undefined;
    try { new Intl.NumberFormat(locale, opts); } catch (err) { warn('format', err); opts = undefined; }
    const full = new Intl.NumberFormat(locale, opts);
    let compact: Intl.NumberFormat;
    try { compact = new Intl.NumberFormat(locale, { ...opts, notation: 'compact', minimumFractionDigits: 0, maximumFractionDigits: 1 }); } catch { compact = full; }
    this._nf = { key, full, compact, formatted: !!opts };
    return this._nf;
  }

  /** The full value: tooltip, live reading, the chart's name, the data table. */
  private _full(v: number) { return this._numbers().full.format(v); }

  /** A value on a mark: `format` in full, else compact (1.2K) in the locale. */
  private _fmt(v: number) {
    const nf = this._numbers();
    return (nf.formatted ? nf.full : nf.compact).format(v);
  }

  /** Estimated SVG text width (viewBox units) — generous, so a fit is a real fit. */
  private _textW(s: string, size: number) { return s.length * size * 0.62; }

  /**
   * Value labels for bars centred at `xs` in slots `step` wide: in full when
   * each fits its slot, else compact; then, left to right, any label that
   * would still touch the one before it (or leave the chart) is dropped.
   */
  private _barLabels(values: number[], xs: number[], step: number, size: number, W: number): Array<{ text: string; x: number } | null> {
    const nf = this._numbers();
    let texts = values.map((v) => this._fmt(v));
    if (texts.some((t) => this._textW(t, size) > step - 2)) texts = values.map((v) => nf.compact.format(v));
    let prevRight = -Infinity;
    return texts.map((text, i) => {
      const w = this._textW(text, size);
      const x = Math.min(Math.max(xs[i]!, w / 2), W - w / 2);
      if (x - w / 2 < prevRight + 2) return null;
      prevRight = x + w / 2;
      return { text, x };
    });
  }

  /** Pie / donut / horizontal bars: a tooltip at the pointer (no crosshair). */
  private _tip(e: MouseEvent, label: string, value: number) {
    const r = (e.currentTarget as Element).closest('.svg-wrap')!.getBoundingClientRect();
    this._tipX = ((e.clientX - r.left) / r.width) * 100;
    this._tipY = ((e.clientY - r.top) / r.height) * 100;
    this._tipLabel = label;
    this._tipValue = this._full(value);
    this._tipShow = true;
  }
  private _untip() { this._tipShow = false; }

  // ═══ BAR ═══
  private _bar(series = false) {
    const { data, height: H } = this;
    const W = 400, T = 20, R = 16, B = 28, L = series ? 8 : 16;
    const pw = W - L - R, ph = H - T - B;
    const max = Math.max(...data.map(d => d.value), 1);
    const n = data.length;
    const bw = (pw / n) * 0.6;
    const step = pw / n;
    this._plot = { L, R, T, ph, W, H, xs: data.map((_, i) => L + i * step + step / 2) };
    const values = this.showValues && !series;
    const labels = values ? this._barLabels(data.map((d) => d.value), this._plot.xs, step, 10, W) : [];

    return svg`
      ${this._maxLine(L, R, T, W)}
      ${data.map((d, i) => {
        const bh = (d.value / max) * ph;
        const x = L + i * step + (step - bw) / 2;
        const yFinal = T + ph - bh;
        const yBase = T + ph;
        const c = series ? d.color || SERIES : this._color(i, d);
        return svg`
          <rect class="bar bar-anim" x="${x}" y="${yBase}" width="${bw}" height="0" rx="${Math.min(4, bw / 3)}" style="fill:${c}"
            data-y="${yFinal}" data-h="${bh}" data-delay="${i * 50}" />
          ${labels[i] ? svg`<text class="val val-anim" x="${labels[i]!.x}" y="${yFinal - 6}" text-anchor="middle" font-size="10" font-weight="600" opacity="0" data-delay="${i * 50 + 300}">${labels[i]!.text}</text>` : nothing}
          ${this._showLabel(i) ? svg`<text class="axis" x="${x + bw / 2}" y="${H - 6}" text-anchor="middle" font-size="10">${d.label}</text>` : nothing}
        `;
      })}
    `;
  }

  // ═══ HORIZONTAL BAR ═══
  private _hbar() {
    const { data } = this;
    const W = 400, lW = 72, gap = 8, bH = 28;
    const max = Math.max(...data.map(d => d.value), 1);
    // Value labels in full when the widest fits the 52-unit room right of the
    // longest bar; else compact, and the bars give way to the widest label.
    let texts = data.map((d) => this._fmt(d.value));
    const widest = (t: string[]) => Math.max(...t.map((s) => this._textW(s, 11)));
    let room = 52;
    if (widest(texts) > room) {
      texts = data.map((d) => this._numbers().compact.format(d.value));
      room = Math.max(room, widest(texts));
    }
    const barMax = W - lW - gap - room;

    return svg`
      ${data.map((d, i) => {
        const y = i * (bH + gap);
        const bW = (d.value / max) * barMax;
        const c = this._color(i, d);
        return svg`
          <text class="axis" x="${lW - 6}" y="${y + bH / 2 + 4}" text-anchor="end" font-size="11">${d.label}</text>
          <rect class="hbar-anim" x="${lW}" y="${y}" width="0" height="${bH}" rx="4" style="fill:${c}; cursor:pointer"
            data-w="${bW}" data-delay="${i * 50}"
            @mouseenter=${(e: MouseEvent) => this._tip(e, d.label, d.value)}
            @click=${(e: MouseEvent) => this._tip(e, d.label, d.value)}
            @mouseleave=${this._untip} />
          <text class="val val-anim" x="${lW + bW + 8}" y="${y + bH / 2 + 4}" font-size="11" font-weight="600" opacity="0" data-delay="${i * 50 + 300}">${texts[i]}</text>
        `;
      })}
    `;
  }

  // ═══ LINE / AREA ═══
  private _line(area: boolean, series = false) {
    const { data, height: H } = this;
    const W = 400, T = 20, R = 16, B = 28, L = series ? 8 : 16;
    const pw = W - L - R, ph = H - T - B;
    const max = Math.max(...data.map(d => d.value), 1);
    const c = data[0]!.color || (series ? SERIES_LINE : this._color(0, data[0]!));

    const pts = data.map((d, i) => ({
      x: L + (i / Math.max(data.length - 1, 1)) * pw,
      y: T + ph - (d.value / max) * ph,
    }));
    const line = pts.map((p, i) => `${i ? 'L' : 'M'}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');
    const areaD = `${line} L${pts.at(-1)!.x.toFixed(1)},${(T + ph).toFixed(1)} L${pts[0]!.x.toFixed(1)},${(T + ph).toFixed(1)} Z`;
    this._plot = { L, R, T, ph, W, H, xs: pts.map((p) => p.x) };
    // A long series draws no dots (they would crowd); the crosshair marks the reading.
    const dots = !series;

    return svg`
      ${this._maxLine(L, R, T, W)}
      ${area || series ? svg`<path d="${areaD}" style="fill:${c}" opacity="0.12" />` : nothing}
      <path class="series-line anim-line" d="${line}" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="stroke:${c}; --dash:2000" />
      ${dots ? pts.map((p, i) => svg`
        <circle class="dot anim-dot" cx="${p.x}" cy="${p.y}" r="4" stroke-width="2" style="fill:${c}; animation-delay:${400 + i * 50}ms" />
      `) : nothing}
      ${this._active >= 0 && this._active < pts.length ? svg`<circle class="dot" cx="${pts[this._active]!.x}" cy="${pts[this._active]!.y}" r="4" stroke-width="2" style="fill:${c}" />` : nothing}
      ${data.map((d, i) => this._showLabel(i) ? svg`
        <text class="axis" x="${pts[i]!.x}" y="${H - 6}" text-anchor="middle" font-size="10">${d.label}</text>
      ` : nothing)}
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
        <path class="anim-slice" d="${p}" style="fill:${c}; cursor:pointer; animation-delay:${i * 60}ms"
          @mouseenter=${(e: MouseEvent) => this._tip(e, d.label, d.value)}
          @click=${(e: MouseEvent) => this._tip(e, d.label, d.value)}
          @mouseleave=${this._untip} />
        ${pct >= 5 ? svg`<text class=${donut ? 'axis' : 'val'} x="${lx}" y="${ly}" text-anchor="middle" dominant-baseline="central" font-size="10" font-weight="600">${pct}%</text>` : nothing}
      `;
    });

    return svg`
      ${slices}
      ${donut ? svg`
        <circle class="hole" cx="${cx}" cy="${cy}" r="${r * 0.55}" />
        <text class="val" x="${cx}" y="${cy - 4}" text-anchor="middle" font-size="16" font-weight="700">${this._fmt(total)}</text>
        <text class="axis" x="${cx}" y="${cy + 12}" text-anchor="middle" font-size="9">${this.i18n.t('total')}</text>
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
    const header = this.title || this.subtitle ? html`
          <div class="header">
            ${this.title ? html`<div class="title">${this.title}</div>` : nothing}
            ${this.subtitle ? html`<div class="subtitle">${this.subtitle}</div>` : nothing}
          </div>
        ` : nothing;
    // No data, or only zeros: keep the chart's space, say so at the bottom.
    if (!this.data.length || this.data.every((d) => !d.value)) {
      this._plot = { ...this._plot, xs: [] };
      return html`<div class="wrap ${this.contained ? 'contained' : ''}">${header}<div class="empty" role="status" style="min-height:${this.height}px">
        <span class="empty-title">${this.emptyText ?? this.i18n.t('empty')}</span>
        ${this.emptyDescription ? html`<span class="empty-desc">${this.emptyDescription}</span>` : nothing}
      </div></div>`;
    }

    const vw = this._svgWidth();
    const vh = this._svgHeight();
    const isPie = this.type === 'pie' || this.type === 'donut';
    const kind = this._kind;
    this._plot = { ...this._plot, xs: [] };

    let chartSvg;
    switch (kind) {
      case 'bar': chartSvg = this._bar(); break;
      case 'auto-bar': chartSvg = this._bar(true); break;
      case 'horizontal-bar': chartSvg = this._hbar(); break;
      case 'line': chartSvg = this._line(false); break;
      case 'area': chartSvg = this._line(true); break;
      case 'auto-line': chartSvg = this._line(true, true); break;
      case 'pie': chartSvg = this._pie(false); break;
      case 'donut': chartSvg = this._pie(true); break;
    }
    const { xs, H, T, ph } = this._plot;
    const reading = xs.length > 0;
    const max = Math.max(...this.data.map((d) => d.value), 1);

    return html`
      <div class="wrap ${this.contained ? 'contained' : ''}">
        ${header}

        <div class="svg-wrap" @pointermove=${reading ? this._onMove : nothing} @pointerdown=${reading ? this._onMove : nothing}
          @pointerleave=${reading ? (e: PointerEvent) => { if (e.pointerType !== 'touch') this._setActive(-1); } : nothing}>
          <svg
            role="img"
            tabindex=${reading ? '0' : nothing}
            aria-label=${`${this.title || this.i18n.t('label')}: ${this.data.map((d) => `${d.label} ${this._full(d.value)}`).join(', ')}`}
            viewBox="0 0 ${vw} ${vh}"
            style="${isPie ? `max-width:${vw}px; margin:0 auto;` : ''}"
            @keydown=${reading ? this._onKey : nothing}
            @blur=${reading ? () => this._setActive(-1) : nothing}
          >
            ${chartSvg}
            ${reading && this._active >= 0 ? svg`<line class="crosshair" x1="${xs[this._active]}" y1="${T}" x2="${xs[this._active]}" y2="${T + ph}" />` : nothing}
          </svg>
          ${reading && this.showGrid ? html`<span class="max-label" aria-hidden="true" style="top:${(T / H) * 100}%">${this._fmt(max)}</span>` : nothing}
          <div class="tip ${this._tipShow ? 'show' : ''}" style="left:${this._tipX}%;top:${this._tipY}%;" aria-hidden="true">
            <span class="tip-label">${this._tipLabel}</span>
            <span class="tip-value">${this._tipValue}</span>
          </div>
          <div class="sr" aria-live="polite">${this._tipShow ? `${this._tipLabel}: ${this._tipValue}` : ''}</div>
        </div>
        <div class="sr"><table>
          <caption>${this.title || this.i18n.t('label')}</caption>
          <thead><tr><th scope="col">${this.i18n.t('category')}</th><th scope="col">${this.i18n.t('value')}</th></tr></thead>
          <tbody>${this.data.map((d) => html`<tr><th scope="row">${d.label}</th><td>${this._full(d.value)}</td></tr>`)}</tbody>
        </table></div>

        ${this.showLegend && this.type !== 'auto' ? html`
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
