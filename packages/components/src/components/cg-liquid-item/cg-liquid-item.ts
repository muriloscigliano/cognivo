/**
 * @element cg-liquid-item
 * A DIRECT child of <cg-liquid> (a positioned wrapper in between would skew
 * the silhouette coordinates). Registers itself with the nearest group so the
 * silhouette layer mirrors it as a goo blob. `effect="morph"` gives the blob
 * a gentle breathing undulation; `effect="move"` translates the item with a
 * spring (compiled to a CSS linear() easing) while the blob trails behind.
 *
 * @example
 * ```html
 * <cg-liquid-item effect="move" x="80" y="0" transition="bouncy">
 *   <cg-icon name="drop"></cg-icon>
 * </cg-liquid-item>
 * ```
 *
 * @slot - The crisp content rendered above the liquid silhouette.
 */
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { hostBase, reducedMotion } from '../../styles/index.js';
import { springToLinearEasing, type SpringPreset } from '../../utils/spring.js';
import type { CgLiquid } from '../cg-liquid/cg-liquid.js';

@customElement('cg-liquid-item')
export class CgLiquidItem extends LitElement {
  static override styles = [hostBase, reducedMotion, css`
    :host {
      display: inline-block;
      position: relative;
    }
  `];

  // ─── Public API ─────────────────────────────────────────────────────────────

  /** morph = breathing blob in place; move = spring-driven translation. */
  @property({ reflect: true }) effect: 'morph' | 'move' = 'morph';

  /** Target X offset in px (move effect). */
  @property({ type: Number }) x = 0;

  /** Target Y offset in px (move effect). */
  @property({ type: Number }) y = 0;

  /** Target scale (move effect). */
  @property({ type: Number }) scale = 1;

  /** Spring preset for move transitions. */
  @property({ reflect: true }) transition: SpringPreset = 'smooth';

  /** Blob corner radius in px; defaults to a pill shape from the item size. */
  @property({ type: Number }) radius?: number;

  // ─── Internals ──────────────────────────────────────────────────────────────

  private _group: CgLiquid | null = null;

  override connectedCallback(): void {
    super.connectedCallback();
    this._group = this.closest('cg-liquid');
    this._group?._registerItem(this);
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this._group?._unregisterItem(this);
    this._group = null;
  }

  override updated(changed: Map<string, unknown>): void {
    if (this.effect === 'move'
      && (changed.has('x') || changed.has('y') || changed.has('scale')
        || changed.has('effect') || changed.has('transition'))) {
      // The shared reducedMotion stylesheet can't reach host inline styles,
      // so the spring must be suppressed here explicitly.
      const reduced = typeof window.matchMedia === 'function'
        && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduced) {
        this.style.transition = 'none';
      } else {
        const { easing, durationMs } = springToLinearEasing(this.transition);
        this.style.transition = `transform ${durationMs}ms ${easing}`;
      }
      this.style.transform = `translate(${this.x}px, ${this.y}px) scale(${this.scale})`;
    }
    if (changed.has('effect') && this.effect === 'morph') {
      this.style.removeProperty('transition');
      this.style.removeProperty('transform');
    }
    this._group?._itemChanged();
  }

  // ─── Render ─────────────────────────────────────────────────────────────────

  override render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cg-liquid-item': CgLiquidItem;
  }
}
