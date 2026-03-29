/**
 * <ai-reveal-animation> — Dramatic card entrance animation wrapper.
 *
 * Wraps any child content via slot. When `visible` becomes true,
 * plays the selected animation type. Dispatches complete event
 * after animation finishes. Respects prefers-reduced-motion.
 */
import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

type RevealType = 'fade' | 'slide-up' | 'scale' | 'flip';

@customElement('ai-reveal-animation')
export class AiRevealAnimation extends LitElement {
  static override styles = css`
    :host {
      transition: color var(--cg-motion-duration-fast, 80ms) var(--cg-motion-easing-color, cubic-bezier(0, 0, 0.58, 1));
      display: block;
    }

    .wrapper {
      opacity: 0;
      will-change: transform, opacity;
    }

    /* ── Initial hidden states ── */
    .wrapper.fade { opacity: 0; }
    .wrapper.slide-up {
      opacity: 0;
      transform: translateY(24px);
    }
    .wrapper.scale {
      opacity: 0;
      transform: scale(0.85);
    }
    .wrapper.flip {
      opacity: 0;
      transform: perspective(600px) rotateX(-15deg);
    }

    /* ── Visible / animated states ── */
    .wrapper.visible.fade {
      animation: reveal-fade var(--_duration) var(--_delay) ease both;
    }
    .wrapper.visible.slide-up {
      animation: reveal-slide-up var(--_duration) var(--_delay) cubic-bezier(0.16, 1, 0.3, 1) both;
    }
    .wrapper.visible.scale {
      animation: reveal-scale var(--_duration) var(--_delay) cubic-bezier(0.16, 1, 0.3, 1) both;
    }
    .wrapper.visible.flip {
      animation: reveal-flip var(--_duration) var(--_delay) cubic-bezier(0.16, 1, 0.3, 1) both;
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
      from { opacity: 0; transform: translateY(24px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    @keyframes reveal-scale {
      from { opacity: 0; transform: scale(0.85); }
      to   { opacity: 1; transform: scale(1); }
    }

    @keyframes reveal-flip {
      from { opacity: 0; transform: perspective(600px) rotateX(-15deg); }
      to   { opacity: 1; transform: perspective(600px) rotateX(0deg); }
    }

    @media (prefers-reduced-motion: reduce) {
      .wrapper,
      .wrapper.visible.fade,
      .wrapper.visible.slide-up,
      .wrapper.visible.scale,
      .wrapper.visible.flip {
        animation: none !important;
        opacity: 1;
        transform: none;
      }
    }
  `;

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
    this.dispatchEvent(new CustomEvent('ai-reveal-complete', {
      bubbles: true, composed: true,
    }));
  };

  private _checkReducedMotion(): boolean {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  override connectedCallback() {
    super.connectedCallback();
    // If reduced motion and visible, mark done immediately
    if (this.visible && this._checkReducedMotion()) {
      this._done = true;
      // Dispatch async so listeners can attach
      requestAnimationFrame(() => {
        this.dispatchEvent(new CustomEvent('ai-reveal-complete', {
          bubbles: true, composed: true,
        }));
      });
    }
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
