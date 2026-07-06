/**
 * @element ai-reveal-animation
 * Entrance animation wrapper that reveals slotted content with fade,
 * slide-up, scale, or flip animations. Respects prefers-reduced-motion
 * and dispatches a completion event.
 *
 * @example
 * ```html
 * <ai-reveal-animation type="slide-up" delay="200" duration="500" visible>
 *   <ai-result-panel title="Results"></ai-result-panel>
 * </ai-reveal-animation>
 * ```
 *
 * @prop {'fade'|'slide-up'|'scale'|'flip'} type - Animation type (default 'fade')
 * @prop {number} delay - Delay before animation starts in ms (default 0)
 * @prop {number} duration - Animation duration in ms (default 400)
 * @prop {boolean} visible - Trigger the reveal animation
 *
 * @fires ai-reveal-complete - When the animation finishes
 *
 * @slot - Content to reveal
 */
import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { hostBlock, reducedMotion } from '../../styles/index.js';

type RevealType = 'fade' | 'slide-up' | 'scale' | 'flip';

@customElement('ai-reveal-animation')
export class AiRevealAnimation extends LitElement {
  static override styles = [hostBlock, reducedMotion, css`

    .wrapper {
      opacity: 0;
      will-change: transform, opacity;
      /* Motion geometry constants (not spatial/color tokens) — hoisted to
         avoid drift between initial state and keyframe. */
      --_scale-start: 0.85;
      --_flip-persp: 600px;
      --_flip-rot: -15deg;
    }

    /* ── Initial hidden states ── */
    .wrapper.fade { opacity: 0; }
    .wrapper.slide-up {
      opacity: 0;
      transform: translateY(var(--cg-spacing-24));
    }
    .wrapper.scale {
      opacity: 0;
      transform: scale(var(--_scale-start));
    }
    .wrapper.flip {
      opacity: 0;
      transform: perspective(var(--_flip-persp)) rotateX(var(--_flip-rot));
    }

    /* ── Visible / animated states ── */
    .wrapper.visible.fade {
      animation: reveal-fade var(--_duration) var(--_delay) ease both;
    }
    .wrapper.visible.slide-up {
      animation: reveal-slide-up var(--_duration) var(--_delay) var(--cg-transition-easing-materialize) both;
    }
    .wrapper.visible.scale {
      animation: reveal-scale var(--_duration) var(--_delay) var(--cg-transition-easing-materialize) both;
    }
    .wrapper.visible.flip {
      animation: reveal-flip var(--_duration) var(--_delay) var(--cg-transition-easing-materialize) both;
    }

    /* ── Completed ── */
    .wrapper.done {
      opacity: 1;
      transform: none;
      animation: none;
    }

    @keyframes reveal-fade {
      from { opacity: 0; }
      to   { opacity: 1; }
    }

    @keyframes reveal-slide-up {
      from { opacity: 0; transform: translateY(var(--cg-spacing-24)); }
      to   { opacity: 1; transform: translateY(0); }
    }

    @keyframes reveal-scale {
      from { opacity: 0; transform: scale(var(--_scale-start)); }
      to   { opacity: 1; transform: scale(1); }
    }

    @keyframes reveal-flip {
      from { opacity: 0; transform: perspective(var(--_flip-persp)) rotateX(var(--_flip-rot)); }
      to   { opacity: 1; transform: perspective(var(--_flip-persp)) rotateX(0deg); }
    }

  `];

  /** Animation type */
  @property({ type: String }) type: RevealType = 'fade';

  /** Delay before animation starts (ms) */
  @property({ type: Number }) delay = 0;

  /** Animation duration (ms) */
  @property({ type: Number }) duration = 400;

  /** Trigger visibility / animation */
  @property({ type: Boolean }) visible = false;

  @state() private _done = false;
  private _animAbort?: AbortController;

  override disconnectedCallback() {
    super.disconnectedCallback();
    this._animAbort?.abort();
  }

  override updated(changed: Map<string, unknown>) {
    if (changed.has('visible') && this.visible) {
      this._done = false;
      // Clean up previous listener
      this._animAbort?.abort();
      // Under reduced motion the shared style only shortens the animation to
      // 0.01ms, which is not a guaranteed animationend across engines. Complete
      // synchronously here (single source of truth for both connect-visible and
      // toggle-later cases) so content reaches its final state and the event fires.
      if (this._checkReducedMotion()) {
        this._done = true;
        requestAnimationFrame(() => {
          this.dispatchEvent(new CustomEvent('ai-reveal-complete', {
            bubbles: true, composed: true,
          }));
        });
        return;
      }
      this._animAbort = new AbortController();
      const wrapper = this.shadowRoot?.querySelector('.wrapper');
      if (wrapper) {
        wrapper.addEventListener('animationend', this._onAnimEnd, { once: true, signal: this._animAbort.signal });
      }
    }
    if (changed.has('visible') && !this.visible) {
      this._done = false;
      this._animAbort?.abort();
    }
  }

  private _onAnimEnd = () => {
    this._done = true;
    // Release will-change after animation completes
    const wrapper = this.shadowRoot?.querySelector('.wrapper') as HTMLElement | null;
    if (wrapper) {
      wrapper.style.willChange = 'auto';
    }
    this.dispatchEvent(new CustomEvent('ai-reveal-complete', {
      bubbles: true, composed: true,
    }));
  };

  private _checkReducedMotion(): boolean {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  override render() {
    const classes = [
      'wrapper',
      this.type,
      this.visible ? 'visible' : '',
      this._done ? 'done' : '',
    ].filter(Boolean).join(' ');

    return html`
      <div
        class=${classes}
        style="--_duration: ${this.duration}ms; --_delay: ${this.delay}ms;"
        role="presentation"
        aria-hidden=${!this.visible && !this._done ? 'true' : 'false'}
      >
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ai-reveal-animation': AiRevealAnimation;
  }
}
