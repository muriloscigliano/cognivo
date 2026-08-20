/**
 * @element ai-thinking-orb
 * Dotted thought-orb status indicator for AI agents. Renders a deterministic
 * dot field on a plain 2D canvas (no WebGL, no filters) with nine named agent
 * states. Pauses automatically when offscreen or when the tab is hidden, and
 * renders a single static frame under prefers-reduced-motion.
 *
 * Engages the Zeigarnik effect: a visibly in-progress orb keeps the agent's
 * open task present in the user's mind and makes waiting feel purposeful.
 *
 * @example
 * ```html
 * <ai-thinking-orb state="searching" size="md"></ai-thinking-orb>
 * ```
 *
 * @cssprop [--cg-color-surface-base-text] - Dot color (resolved at draw time)
 */
import { LitElement, html, css } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { hostBase } from '../../styles/index.js';
import {
  ORB_STATES,
  ORB_STATE_LABELS,
  computeOrbDots,
  drawOrbFrame,
  type OrbState,
} from '../../utils/orb-renderer.js';

const SIZE_PX: Record<'sm' | 'md' | 'lg', number> = { sm: 20, md: 40, lg: 64 };
const MAX_DPR = 2;

@customElement('ai-thinking-orb')
export class AiThinkingOrb extends LitElement {
  static override styles = [hostBase, css`
    :host {
      display: inline-flex;
      vertical-align: middle;
      line-height: 0;
    }

    canvas {
      display: block;
    }
  `];

  // ─── Public API ─────────────────────────────────────────────────────────────

  /** Agent activity state; unknown values fall back to `thinking`. */
  @property({ reflect: true }) state: OrbState = 'thinking';

  /** sm = 20px inline, md = 40px, lg = 64px avatar. */
  @property({ reflect: true }) size: 'sm' | 'md' | 'lg' = 'md';

  /** Multiplier on the preset animation speed. */
  @property({ type: Number }) speed = 1;

  /** Freeze the animation on the current frame. */
  @property({ type: Boolean, reflect: true }) paused = false;

  /** Overrides the per-state accessible label. */
  @property() label = '';

  /** Canvas edge length in CSS pixels for the current size. */
  get pixelSize(): number {
    return SIZE_PX[this.size] ?? SIZE_PX.md;
  }

  // ─── Internals ──────────────────────────────────────────────────────────────

  @query('canvas') private _canvas?: HTMLCanvasElement;

  private _rafHandle: number | null = null;
  private _clock = 0;
  private _lastTick: number | null = null;
  private _offscreen = false;
  private _dotColor = '';
  private _io: IntersectionObserver | null = null;
  private _themeObserver: MutationObserver | null = null;
  private _canvasDpr = 0;
  private _reducedMotionQuery: MediaQueryList | null = null;
  private _colorSchemeQuery: MediaQueryList | null = null;
  private _onVisibility = (): void => this._syncLoop();
  private _onReducedMotionChange = (): void => {
    this._syncLoop();
    this._drawStaticFrame();
  };
  private _onColorSchemeChange = (): void => {
    this._dotColor = '';
    this._drawStaticFrame();
  };

  // ─── Lifecycle ──────────────────────────────────────────────────────────────

  override connectedCallback(): void {
    super.connectedCallback();
    document.addEventListener('visibilitychange', this._onVisibility);
    if (typeof IntersectionObserver !== 'undefined') {
      this._io = new IntersectionObserver((entries) => {
        const entry = entries[entries.length - 1];
        if (entry) {
          this._offscreen = !entry.isIntersecting;
          this._syncLoop();
        }
      });
      this._io.observe(this);
    }
    if (typeof MutationObserver !== 'undefined') {
      this._themeObserver = new MutationObserver(() => {
        this._dotColor = '';
        this._drawStaticFrame();
      });
      this._themeObserver.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['data-theme', 'class'],
      });
    }
    if (typeof window.matchMedia === 'function') {
      this._reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      this._reducedMotionQuery.addEventListener?.('change', this._onReducedMotionChange);
      this._colorSchemeQuery = window.matchMedia('(prefers-color-scheme: dark)');
      this._colorSchemeQuery.addEventListener?.('change', this._onColorSchemeChange);
    }
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    document.removeEventListener('visibilitychange', this._onVisibility);
    this._io?.disconnect();
    this._io = null;
    this._themeObserver?.disconnect();
    this._themeObserver = null;
    this._reducedMotionQuery?.removeEventListener?.('change', this._onReducedMotionChange);
    this._reducedMotionQuery = null;
    this._colorSchemeQuery?.removeEventListener?.('change', this._onColorSchemeChange);
    this._colorSchemeQuery = null;
    this._stopLoop();
  }

  override updated(changed: Map<string, unknown>): void {
    if (changed.has('size')) {
      this._resizeCanvas();
    }
    this._syncLoop();
    if (changed.has('state') || changed.has('size')) {
      this._drawStaticFrame();
    }
  }

  // ─── Animation loop ─────────────────────────────────────────────────────────

  private get _effectiveState(): OrbState {
    return (ORB_STATES as readonly string[]).includes(this.state) ? this.state : 'thinking';
  }

  private get _reducedMotion(): boolean {
    return typeof window.matchMedia === 'function'
      && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  private _shouldRun(): boolean {
    return this.isConnected
      && !this.paused
      && !this._offscreen
      && document.visibilityState !== 'hidden'
      && !this._reducedMotion;
  }

  private _syncLoop(): void {
    if (this._shouldRun()) {
      this._startLoop();
    } else {
      this._stopLoop();
    }
  }

  private _startLoop(): void {
    if (this._rafHandle !== null) return;
    this._lastTick = null;
    this._rafHandle = requestAnimationFrame(this._tick);
  }

  private _stopLoop(): void {
    if (this._rafHandle !== null) {
      cancelAnimationFrame(this._rafHandle);
      this._rafHandle = null;
    }
    this._lastTick = null;
  }

  private _tick = (now: number): void => {
    this._rafHandle = null;
    if (!this._shouldRun()) return;
    if (this._lastTick !== null) {
      this._clock += ((now - this._lastTick) / 1000) * this.speed;
    }
    this._lastTick = now;
    this._draw(this._clock);
    this._rafHandle = requestAnimationFrame(this._tick);
  };

  // ─── Drawing ────────────────────────────────────────────────────────────────

  private _resolveDotColor(): string {
    if (!this._dotColor) {
      const styles = getComputedStyle(this);
      this._dotColor = styles.getPropertyValue('--cg-color-surface-base-text').trim()
        || styles.color
        || 'currentColor';
    }
    return this._dotColor;
  }

  private _draw(t: number): void {
    const canvas = this._canvas;
    const ctx = canvas?.getContext?.('2d');
    if (!canvas || !ctx) return;
    const dpr = Math.min(
      MAX_DPR,
      typeof devicePixelRatio === 'number' ? devicePixelRatio : 1,
    );
    // Window dragged between displays: re-scale the backing store.
    if (dpr !== this._canvasDpr) this._resizeCanvas();
    const dots = computeOrbDots(this._effectiveState, t, this.pixelSize);
    drawOrbFrame(ctx, dots, this._resolveDotColor(), dpr);
  }

  /** One frame for the paused / reduced-motion / state-change cases. */
  private _drawStaticFrame(): void {
    if (this._rafHandle === null) {
      this._draw(this._clock);
    }
  }

  private _resizeCanvas(): void {
    const canvas = this._canvas;
    if (!canvas) return;
    const dpr = Math.min(
      MAX_DPR,
      typeof devicePixelRatio === 'number' ? devicePixelRatio : 1,
    );
    canvas.width = this.pixelSize * dpr;
    canvas.height = this.pixelSize * dpr;
    canvas.style.width = `${this.pixelSize}px`;
    canvas.style.height = `${this.pixelSize}px`;
    this._canvasDpr = dpr;
  }

  // ─── Render ─────────────────────────────────────────────────────────────────

  override render() {
    const ariaLabel = this.label || ORB_STATE_LABELS[this._effectiveState];
    return html`
      <canvas
        role="img"
        aria-label=${ariaLabel}
        width=${this.pixelSize}
        height=${this.pixelSize}
      ></canvas>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ai-thinking-orb': AiThinkingOrb;
  }
}
