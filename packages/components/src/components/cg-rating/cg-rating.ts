import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { hostBase, reducedMotion } from '../../styles/index.js';

/**
 * @element cg-rating
 * Star rating input with keyboard navigation, half-star precision, and clear.
 *
 * @example
 * ```html
 * <cg-rating value="4" max="5"></cg-rating>
 * <cg-rating value="3.5" precision="0.5"></cg-rating>
 * ```
 *
 * @fires {CustomEvent<{value: number}>} cg-rating-change
 */
@customElement('cg-rating')
export class CgRating extends LitElement {
  static override styles = [hostBase, reducedMotion, css`
    :host {
      display: inline-flex;
    }

    .rating {
      display: inline-flex;
      align-items: center;
      gap: var(--cg-component-rating-gap);
      outline: none;
    }

    .star {
      position: relative;
      width: var(--cg-component-rating-size-md);
      height: var(--cg-component-rating-size-md);
      cursor: pointer;
      color: var(--cg-color-surface-container-outlined);
      transition:
        color var(--cg-transition-duration-fast) var(--cg-transition-easing-default),
        transform var(--cg-transition-duration-fast) var(--cg-transition-easing-spring);
    }
    .star:hover { transform: scale(1.15); }
    .star:active { transform: scale(var(--cg-interaction-press-scale)); }
    .star[data-filled="full"] { color: var(--cg-color-status-warning-text-default); }
    .star[data-filled="half"] { color: var(--cg-color-status-warning-text-default); }

    .star svg { width: 100%; height: 100%; }

    .star .half {
      position: absolute;
      top: 0;
      left: 0;
      width: 50%;
      height: 100%;
      overflow: hidden;
    }
    .star .half svg { width: 200%; }

    /* Sizes */
    :host([size="sm"]) .star {
      width: var(--cg-component-rating-size-sm);
      height: var(--cg-component-rating-size-sm);
    }
    :host([size="lg"]) .star {
      width: var(--cg-component-rating-size-lg);
      height: var(--cg-component-rating-size-lg);
    }

    :host([readonly]) .star { cursor: default; }
    :host([readonly]) .star:hover { transform: none; }
    :host([disabled]) .rating { opacity: var(--cg-opacity-50); pointer-events: none; }

    .rating:focus-visible {
      outline: none;
      box-shadow:
        0 0 0 var(--cg-focus-ring-offset) var(--cg-color-focus-ring-offset),
        0 0 0 calc(var(--cg-focus-ring-offset) + var(--cg-focus-ring-width)) var(--cg-color-focus-ring);
      border-radius: var(--cg-border-radius-50);
    }
  `];

  static formAssociated = true;
  private _internals?: ElementInternals;

  constructor() {
    super();
    if (typeof this.attachInternals === 'function') {
      this._internals = this.attachInternals();
    }
  }

  @property({ type: Number }) value = 0;
  @property({ type: Number }) max = 5;
  @property({ type: Number }) precision: 0.5 | 1 = 1;
  @property({ type: Boolean, reflect: true }) readonly = false;
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ reflect: true }) size: 'sm' | 'md' | 'lg' = 'md';
  @property() name = '';

  @state() private _hoverValue = 0;

  override updated(changed: Map<string, unknown>): void {
    if (changed.has('value')) {
      this._internals?.setFormValue(String(this.value));
    }
  }

  private _displayValue(): number {
    return this._hoverValue || this.value;
  }

  private _getFillType(starIndex: number): 'full' | 'half' | 'empty' {
    const display = this._displayValue();
    const starValue = starIndex + 1;
    if (display >= starValue) return 'full';
    if (display >= starValue - 0.5 && this.precision === 0.5) return 'half';
    return 'empty';
  }

  private _handleClick(starIndex: number, e: MouseEvent): void {
    if (this.readonly || this.disabled) return;
    let newValue = starIndex + 1;
    if (this.precision === 0.5) {
      const target = e.currentTarget as HTMLElement;
      const rect = target.getBoundingClientRect();
      const half = e.clientX - rect.left < rect.width / 2;
      if (half) newValue = starIndex + 0.5;
    }
    // Clear on click of same value
    if (newValue === this.value) newValue = 0;
    this.value = newValue;
    this.dispatchEvent(new CustomEvent('cg-rating-change', {
      detail: { value: newValue },
      bubbles: true,
      composed: true,
    }));
  }

  private _handleMouseMove(starIndex: number, e: MouseEvent): void {
    if (this.readonly || this.disabled) return;
    if (this.precision === 0.5) {
      const target = e.currentTarget as HTMLElement;
      const rect = target.getBoundingClientRect();
      const half = e.clientX - rect.left < rect.width / 2;
      this._hoverValue = starIndex + (half ? 0.5 : 1);
    } else {
      this._hoverValue = starIndex + 1;
    }
  }

  private _handleMouseLeave(): void {
    this._hoverValue = 0;
  }

  private _handleKeydown(e: KeyboardEvent): void {
    if (this.readonly || this.disabled) return;
    const step = this.precision;
    let newValue = this.value;
    if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
      e.preventDefault();
      newValue = Math.min(this.max, this.value + step);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
      e.preventDefault();
      newValue = Math.max(0, this.value - step);
    } else if (e.key === 'Home') {
      e.preventDefault();
      newValue = 0;
    } else if (e.key === 'End') {
      e.preventDefault();
      newValue = this.max;
    } else {
      return;
    }
    if (newValue !== this.value) {
      this.value = newValue;
      this.dispatchEvent(new CustomEvent('cg-rating-change', {
        detail: { value: newValue },
        bubbles: true,
        composed: true,
      }));
    }
  }

  override render() {
    const starPath = 'M12 2l2.5 7.5h7.5l-6 4.5 2.5 7.5-6.5-4.5-6.5 4.5 2.5-7.5-6-4.5h7.5z';
    return html`
      <div
        class="rating"
        role="slider"
        tabindex=${this.disabled ? '-1' : '0'}
        aria-label="Rating"
        aria-valuenow=${this.value}
        aria-valuemin="0"
        aria-valuemax=${this.max}
        aria-valuetext=${`${this.value} of ${this.max} stars`}
        aria-disabled=${this.disabled ? 'true' : nothing}
        aria-readonly=${this.readonly ? 'true' : nothing}
        @keydown=${this._handleKeydown}
        @mouseleave=${this._handleMouseLeave}
      >
        ${Array.from({ length: this.max }, (_, i) => {
          const fill = this._getFillType(i);
          return html`
            <div
              class="star"
              data-filled=${fill}
              aria-hidden="true"
              @click=${(e: MouseEvent) => this._handleClick(i, e)}
              @mousemove=${(e: MouseEvent) => this._handleMouseMove(i, e)}
            >
              <svg viewBox="0 0 24 24" fill=${fill === 'full' ? 'currentColor' : 'none'} stroke="currentColor" stroke-width="1.5" stroke-linejoin="round">
                <path d=${starPath}/>
              </svg>
              ${fill === 'half' ? html`
                <div class="half">
                  <svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round">
                    <path d=${starPath}/>
                  </svg>
                </div>
              ` : nothing}
            </div>
          `;
        })}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cg-rating': CgRating;
  }
}
