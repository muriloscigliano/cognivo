/**
 * @element cg-liquid
 * Liquid/gooey effect group. Renders an SVG silhouette layer behind its
 * slotted <cg-liquid-item> children — one blob per item — and applies the
 * classic goo filter (gaussian blur → alpha contrast) ONLY to that layer,
 * so blobs visually merge while the real content on top stays crisp.
 *
 * @example
 * ```html
 * <cg-liquid blur="8">
 *   <cg-liquid-item>●</cg-liquid-item>
 *   <cg-liquid-item effect="move" x="60">●</cg-liquid-item>
 * </cg-liquid>
 * ```
 *
 * @slot - cg-liquid-item children (plus any static content).
 *
 * @cssprop [--cg-component-liquid-fill] - Liquid surface color (defaults to the card surface)
 */
import { LitElement, html, svg, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { hostBlock, reducedMotion } from '../../styles/index.js';
import type { CgLiquidItem } from '../cg-liquid-item/cg-liquid-item.js';
import { springToLinearEasing } from '../../utils/spring.js';

/** The silhouette trails the content slightly for the liquid drag feel. */
const BLOB_TRAIL_FACTOR = 1.25;

@customElement('cg-liquid')
export class CgLiquid extends LitElement {
  static override styles = [hostBlock, reducedMotion, css`
    :host {
      display: block;
      position: relative;
      /* Slow breathing cycle for morph blobs, derived from the motion scale. */
      --cg-liquid-morph-duration: calc(var(--cg-transition-duration-slow) * 8);
    }

    .goo {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      overflow: visible;
      pointer-events: none;
    }

    .goo[hidden] {
      display: none;
    }

    .content {
      position: relative;
    }

    .blob {
      transform-box: fill-box;
      transform-origin: center;
    }

    .blob.morph {
      animation: blob-morph var(--cg-liquid-morph-duration) var(--cg-transition-easing-ease-in-out) infinite alternate;
    }

    @keyframes blob-morph {
      from { transform: scale(1, 1); }
      to { transform: scale(1.08, 0.92); }
    }
  `];

  // ─── Public API ─────────────────────────────────────────────────────────────

  /** Goo blur sigma in px — higher merges blobs from farther apart. Attribute: `blur`. */
  @property({ type: Number, attribute: 'blur' }) blurRadius = 6;

  /** Alpha contrast slope — higher gives a crisper liquid edge. */
  @property({ type: Number }) contrast = 18;

  /** Liquid surface color; defaults to the card surface token. */
  @property() fill = '';

  // ─── Internals ──────────────────────────────────────────────────────────────

  @state() private _items: CgLiquidItem[] = [];

  private _resizeObserver: ResizeObserver | null = null;

  override connectedCallback(): void {
    super.connectedCallback();
    if (typeof ResizeObserver !== 'undefined') {
      this._resizeObserver = new ResizeObserver(() => this.requestUpdate());
      this._resizeObserver.observe(this);
    }
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this._resizeObserver?.disconnect();
    this._resizeObserver = null;
  }

  /** @internal Called by cg-liquid-item on connect. */
  _registerItem(item: CgLiquidItem): void {
    if (!this._items.includes(item)) {
      this._items = [...this._items, item];
      this._resizeObserver?.observe(item);
    }
  }

  /** @internal Called by cg-liquid-item on disconnect. */
  _unregisterItem(item: CgLiquidItem): void {
    this._items = this._items.filter((existing) => existing !== item);
    this._resizeObserver?.unobserve(item);
  }

  /** @internal Called by cg-liquid-item when its geometry props change. */
  _itemChanged(): void {
    this.requestUpdate();
  }

  // ─── Render ─────────────────────────────────────────────────────────────────

  private _blob(item: CgLiquidItem) {
    const width = item.offsetWidth;
    const height = item.offsetHeight;
    const rx = item.radius ?? Math.min(width, height) / 2;
    const fill = this.fill || 'var(--cg-component-liquid-fill)';
    const isMorph = item.effect === 'morph';

    // fill lives in style, not the presentation attribute — var() substitution
    // in SVG presentation attributes is a cross-browser interop gap.
    let style = `fill: ${fill};`;
    if (item.effect === 'move') {
      const { easing, durationMs } = springToLinearEasing(item.transition);
      const trailMs = Math.round(durationMs * BLOB_TRAIL_FACTOR);
      style += ` transform: translate(${item.x}px, ${item.y}px) scale(${item.scale});`
        + ` transition: transform ${trailMs}ms ${easing};`;
    }

    return svg`<rect
      class="blob ${isMorph ? 'morph' : ''}"
      x=${item.offsetLeft}
      y=${item.offsetTop}
      width=${width}
      height=${height}
      rx=${rx}
      style=${style}
    ></rect>`;
  }

  override render() {
    const alphaOffset = -(this.contrast / 2 - 1);
    return html`
      <svg class="goo" aria-hidden="true" ?hidden=${this._items.length === 0}>
        <defs>
          <filter id="cg-goo" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation=${this.blurRadius} result="blur"></feGaussianBlur>
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 ${this.contrast} ${alphaOffset}"
              result="goo"
            ></feColorMatrix>
          </filter>
        </defs>
        <g filter="url(#cg-goo)">
          ${this._items.map((item) => this._blob(item))}
        </g>
      </svg>
      <div class="content"><slot></slot></div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cg-liquid': CgLiquid;
  }
}
