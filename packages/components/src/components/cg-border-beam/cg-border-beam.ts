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

const VARIANT_DEFAULT_DURATION_MS: Record<string, number> = {
  beam: 4000,
  line: 2500,
  pulse: 2000,
};

@customElement('cg-border-beam')
export class CgBorderBeam extends LitElement {
  static override styles = [hostBlock, reducedMotion, css`
    :host {
      display: inline-block;
      position: relative;
    }

    @property --cg-beam-angle {
      syntax: '<angle>';
      initial-value: 0deg;
      inherits: false;
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
      opacity: var(--cg-beam-intensity, 1);
      /* Show only the ring: two opaque masks XORed leave the padding band. */
      -webkit-mask:
        linear-gradient(var(--cg-color-surface-base-text) 0 0) content-box,
        linear-gradient(var(--cg-color-surface-base-text) 0 0);
      mask:
        linear-gradient(var(--cg-color-surface-base-text) 0 0) content-box,
        linear-gradient(var(--cg-color-surface-base-text) 0 0);
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
      animation: beam-rotate var(--cg-beam-duration, 4000ms) linear infinite;
    }

    :host([variant='line']) .beam {
      background: conic-gradient(
        from var(--cg-beam-angle),
        transparent 0%,
        var(--cg-component-border-beam-color) 4%,
        transparent 8%
      );
      animation: beam-rotate var(--cg-beam-duration, 2500ms) linear infinite;
    }

    :host([variant='pulse']) .beam {
      /* Whole-perimeter ring; brightness driven by the shared pulse loop. */
      background: var(--cg-component-border-beam-color);
      opacity: calc(var(--cg-beam-intensity, 1) * var(--cg-beam-pulse, 1));
      animation: none;
    }

    @keyframes beam-rotate {
      to {
        --cg-beam-angle: 360deg;
      }
    }

    .beam.idle {
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

  // ─── Lifecycle ──────────────────────────────────────────────────────────────

  override disconnectedCallback(): void {
    super.disconnectedCallback();
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
    if (changed.has('active') || changed.has('variant')) {
      this._syncPulseSubscription();
    }
  }

  // ─── Private ────────────────────────────────────────────────────────────────

  private _syncPulseSubscription(): void {
    const shouldPulse = this.isConnected && this.active && this.variant === 'pulse';
    if (shouldPulse && !this._unsubscribePulse) {
      const period = this.duration ?? VARIANT_DEFAULT_DURATION_MS['pulse']!;
      this._unsubscribePulse = subscribePulse(period, (phase) => {
        // Breathe between 0.35 and 1 with a smooth cosine curve.
        const level = 0.675 + 0.325 * Math.cos(phase * Math.PI * 2);
        this.style.setProperty('--cg-beam-pulse', level.toFixed(3));
      });
    } else if (!shouldPulse) {
      this._teardownPulse();
    }
  }

  private _teardownPulse(): void {
    this._unsubscribePulse?.();
    this._unsubscribePulse = null;
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
