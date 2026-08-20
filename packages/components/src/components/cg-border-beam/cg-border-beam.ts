/**
 * @element cg-border-beam
 * Animated border effect wrapper — a beam of light travels around the edge of
 * the slotted content. Three variants: `beam` (traveling arc), `line` (thin
 * fast arc), `pulse` (breathing perimeter ring driven by the shared pulse
 * loop). Purely decorative: pointer-events pass through and reduced-motion
 * collapses to a static highlight.
 *
 * @example
 * ```html
 * <cg-border-beam variant="beam">
 *   <cg-card>Highlighted card</cg-card>
 * </cg-border-beam>
 * ```
 *
 * @fires {CustomEvent} cg-border-beam-activate - When `active` becomes true
 * @fires {CustomEvent} cg-border-beam-deactivate - When `active` becomes false
 *
 * @slot - The content to wrap with the beam ring.
 *
 * @cssprop [--cg-component-border-beam-color] - Beam color (defaults to primary action color)
 * @cssprop [--cg-component-border-beam-width] - Ring thickness
 * @cssprop [--cg-component-border-beam-radius] - Ring corner radius
 */
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { hostBlock, reducedMotion } from '../../styles/index.js';
import { subscribePulse } from '../../utils/pulse-driver.js';

/** beam/line default durations live in CSS (:host); only pulse is JS-driven. */
const PULSE_DEFAULT_PERIOD_MS = 2000;

// @property inside a shadow-DOM stylesheet is ignored by every engine
// (w3c/csswg-drafts#10541), so the animated angle must be registered
// document-wide from JS. Where registerProperty is unavailable the beam
// degrades to a static arc (the :host fallback below keeps it valid CSS).
try {
  if (typeof CSS !== 'undefined' && 'registerProperty' in CSS) {
    CSS.registerProperty({
      name: '--cg-beam-angle',
      syntax: '<angle>',
      initialValue: '0deg',
      inherits: false,
    });
  }
} catch {
  // Already registered by another copy of this module.
}

@customElement('cg-border-beam')
export class CgBorderBeam extends LitElement {
  static override styles = [hostBlock, reducedMotion, css`
    :host {
      display: inline-block;
      position: relative;
      --cg-beam-intensity: 1;
      --cg-beam-pulse: 1;
      --cg-beam-duration: 4000ms;
      /* Fallback for engines without CSS.registerProperty: static arc. */
      --cg-beam-angle: 0deg;
    }

    :host([variant='line']) {
      --cg-beam-duration: 2500ms;
    }

    .content {
      position: relative;
    }

    /* ── Beam ring ── */
    .beam {
      position: absolute;
      inset: 0;
      pointer-events: none;
      border-radius: var(--cg-component-border-beam-radius);
      padding: var(--cg-component-border-beam-width);
      opacity: var(--cg-beam-intensity);
      /* Show only the ring: two opaque masks XORed leave the padding band.
         Masks consume alpha only — the keyword must be a literal so a missing
         token stylesheet can't invalidate the whole mask. */
      -webkit-mask:
        linear-gradient(black 0 0) content-box,
        linear-gradient(black 0 0);
      mask:
        linear-gradient(black 0 0) content-box,
        linear-gradient(black 0 0);
      -webkit-mask-composite: xor;
      mask-composite: exclude;
      transition: opacity var(--cg-transition-duration-slow) var(--cg-transition-easing-default);
    }

    :host([variant='beam']) .beam {
      background: conic-gradient(
        from var(--cg-beam-angle),
        transparent 0%,
        var(--cg-component-border-beam-color) 12%,
        transparent 24%
      );
      animation: beam-rotate var(--cg-beam-duration) linear infinite;
    }

    :host([variant='line']) .beam {
      background: conic-gradient(
        from var(--cg-beam-angle),
        transparent 0%,
        var(--cg-component-border-beam-color) 4%,
        transparent 8%
      );
      animation: beam-rotate var(--cg-beam-duration) linear infinite;
    }

    :host([variant='pulse']) .beam {
      /* Whole-perimeter ring; brightness driven by the shared pulse loop. */
      background: var(--cg-component-border-beam-color);
      opacity: calc(var(--cg-beam-intensity) * var(--cg-beam-pulse));
      animation: none;
    }

    @keyframes beam-rotate {
      to {
        --cg-beam-angle: 360deg;
      }
    }

    /* After the variant rules and with matching specificity so idle always
       wins (the pulse variant rule also sets opacity). */
    :host .beam.idle {
      animation-play-state: paused;
      opacity: 0;
    }

    /* Static highlight instead of motion. */
    @media (prefers-reduced-motion: reduce) {
      .beam {
        animation: none;
      }
      :host([variant='beam']) .beam,
      :host([variant='line']) .beam {
        background: conic-gradient(
          from 0deg,
          transparent 0%,
          var(--cg-component-border-beam-color) 12%,
          transparent 24%
        );
      }
    }
  `];

  // ─── Public API ─────────────────────────────────────────────────────────────

  /** Visual variant of the traveling effect. */
  @property({ reflect: true }) variant: 'beam' | 'line' | 'pulse' = 'beam';

  /** Whether the effect is running. */
  @property({ type: Boolean, reflect: true }) active = true;

  /** Beam brightness, clamped to [0, 1]. */
  @property({ type: Number }) intensity = 1;

  /** Full revolution / pulse cycle in milliseconds. Falls back per variant. */
  @property({ type: Number }) duration?: number;

  /** Ring corner radius in px. Falls back to --cg-component-border-beam-radius. */
  @property({ type: Number }) radius?: number;

  private _unsubscribePulse: (() => void) | null = null;
  private _pulsePeriod = 0;
  private _reducedMotionQuery: MediaQueryList | null = null;
  private _onReducedMotionChange = (): void => this._syncPulseSubscription();

  // ─── Lifecycle ──────────────────────────────────────────────────────────────

  override connectedCallback(): void {
    super.connectedCallback();
    if (typeof window.matchMedia === 'function') {
      this._reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      this._reducedMotionQuery.addEventListener?.('change', this._onReducedMotionChange);
    }
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this._reducedMotionQuery?.removeEventListener?.('change', this._onReducedMotionChange);
    this._reducedMotionQuery = null;
    this._teardownPulse();
  }

  override updated(changed: Map<string, unknown>): void {
    if (changed.has('intensity')) {
      const clamped = Math.min(1, Math.max(0, this.intensity));
      this.style.setProperty('--cg-beam-intensity', String(clamped));
    }
    if (changed.has('duration')) {
      if (this.duration === undefined) {
        this.style.removeProperty('--cg-beam-duration');
      } else {
        this.style.setProperty('--cg-beam-duration', `${this.duration}ms`);
      }
    }
    if (changed.has('radius')) {
      if (this.radius === undefined) {
        this.style.removeProperty('--cg-component-border-beam-radius');
      } else {
        this.style.setProperty('--cg-component-border-beam-radius', `${this.radius}px`);
      }
    }
    if (changed.has('active') && changed.get('active') !== undefined) {
      this.dispatchEvent(new CustomEvent(
        this.active ? 'cg-border-beam-activate' : 'cg-border-beam-deactivate',
        { bubbles: true, composed: true },
      ));
    }
    if (changed.has('active') || changed.has('variant') || changed.has('duration')) {
      this._syncPulseSubscription();
    }
  }

  // ─── Private ────────────────────────────────────────────────────────────────

  private get _reducedMotion(): boolean {
    return typeof window.matchMedia === 'function'
      && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  private _syncPulseSubscription(): void {
    const shouldPulse = this.isConnected
      && this.active
      && this.variant === 'pulse'
      && !this._reducedMotion;
    if (shouldPulse && this._unsubscribePulse && this._pulsePeriod !== this._targetPeriod()) {
      this._teardownPulse();
    }
    if (shouldPulse && !this._unsubscribePulse) {
      const period = this._targetPeriod();
      this._pulsePeriod = period;
      this._unsubscribePulse = subscribePulse(period, (phase) => {
        // Breathe between 0.35 and 1 with a smooth cosine curve.
        const level = 0.675 + 0.325 * Math.cos(phase * Math.PI * 2);
        this.style.setProperty('--cg-beam-pulse', level.toFixed(3));
      });
    } else if (!shouldPulse) {
      this._teardownPulse();
    }
  }

  private _targetPeriod(): number {
    return this.duration ?? PULSE_DEFAULT_PERIOD_MS;
  }

  private _teardownPulse(): void {
    this._unsubscribePulse?.();
    this._unsubscribePulse = null;
    // Don't leave the ring frozen mid-breath (or visible while idle).
    this.style.removeProperty('--cg-beam-pulse');
  }

  // ─── Render ─────────────────────────────────────────────────────────────────

  override render() {
    return html`
      <div class="beam ${this.active ? '' : 'idle'}" aria-hidden="true"></div>
      <div class="content"><slot></slot></div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cg-border-beam': CgBorderBeam;
  }
}
