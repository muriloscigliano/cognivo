import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { hostBase, reducedMotion } from '../../styles/index.js';

export interface SegmentOption {
  label: string;
  value: string;
  icon?: string;
  disabled?: boolean;
}

/**
 * @element cg-segmented-control
 * iOS-style pill selector with animated indicator. Single value selection.
 *
 * @example
 * ```html
 * <cg-segmented-control
 *   value="day"
 *   .options=${[
 *     { label: 'Day', value: 'day' },
 *     { label: 'Week', value: 'week' },
 *     { label: 'Month', value: 'month' },
 *   ]}
 * ></cg-segmented-control>
 * ```
 *
 * @fires {CustomEvent<{value: string}>} cg-segmented-change
 */
@customElement('cg-segmented-control')
export class CgSegmentedControl extends LitElement {
  static override styles = [hostBase, reducedMotion, css`
    :host {
      display: inline-flex;
    }

    .track {
      display: inline-flex;
      position: relative;
      padding: var(--cg-component-segmented-control-padding);
      background: var(--cg-color-action-secondary-background-default);
      border-radius: var(--cg-component-segmented-control-radius);
      gap: var(--cg-spacing-2);
    }
    :host([full]) .track {
      display: flex;
      width: 100%;
    }

    .indicator {
      position: absolute;
      top: var(--cg-component-segmented-control-padding);
      left: 0;
      height: calc(100% - 2 * var(--cg-component-segmented-control-padding));
      background: var(--cg-color-surface-cards-background);
      border-radius: calc(var(--cg-component-segmented-control-radius) - var(--cg-component-segmented-control-padding));
      box-shadow: var(--cg-shadow-elevation-sm);
      transition:
        transform var(--cg-transition-duration-default) var(--cg-transition-easing-ease-in-out),
        width var(--cg-transition-duration-default) var(--cg-transition-easing-ease-in-out),
        box-shadow var(--cg-transition-duration-default) var(--cg-transition-easing-default);
      pointer-events: none;
    }

    .segment {
      position: relative;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: var(--cg-spacing-6);
      height: calc(var(--cg-component-segmented-control-height-md) - 2 * var(--cg-component-segmented-control-padding));
      padding: 0 var(--cg-spacing-16);
      border: none;
      background: transparent;
      color: var(--cg-color-surface-container-outlined);
      font-family: inherit;
      font-size: var(--cg-font-size-sm);
      font-weight: var(--cg-font-weight-medium);
      cursor: pointer;
      transition: color var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
      z-index: 1;
      border-radius: inherit;
      flex: 1;
    }
    .segment:hover:not(:disabled) {
      color: var(--cg-color-surface-base-text);
    }
    .segment[aria-checked="true"] {
      color: var(--cg-color-surface-base-text);
    }
    .segment:focus-visible {
      outline: none;
      box-shadow:
        0 0 0 2px var(--cg-color-focus-ring-offset),
        0 0 0 4px var(--cg-color-focus-ring);
    }
    .segment:disabled {
      opacity: 0.45;
      cursor: not-allowed;
    }

    /* Sizes */
    :host([size="sm"]) .segment {
      height: calc(var(--cg-component-segmented-control-height-sm) - 2 * var(--cg-component-segmented-control-padding));
      padding: 0 var(--cg-spacing-12);
      font-size: var(--cg-font-size-xs);
    }
    :host([size="lg"]) .segment {
      height: calc(var(--cg-component-segmented-control-height-lg) - 2 * var(--cg-component-segmented-control-padding));
      padding: 0 var(--cg-spacing-20);
      font-size: var(--cg-font-size-base);
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

  @property({ type: Array }) options: SegmentOption[] = [];
  @property() value = '';
  @property() name = '';
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ reflect: true }) size: 'sm' | 'md' | 'lg' = 'md';
  @property({ type: Boolean, reflect: true }) full = false;

  private _resizeObserver: ResizeObserver | null = null;

  override connectedCallback(): void {
    super.connectedCallback();
    // Re-compute indicator when container resizes (e.g. full width on mobile)
    this._resizeObserver = new ResizeObserver(() => this._updateIndicator());
    requestAnimationFrame(() => {
      const track = this.shadowRoot?.querySelector('.track');
      if (track && this._resizeObserver) this._resizeObserver.observe(track);
    });
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this._resizeObserver?.disconnect();
    this._resizeObserver = null;
  }

  override updated(changed: Map<string, unknown>): void {
    if (changed.has('value')) {
      this._internals?.setFormValue(this.value);
    }
    if (changed.has('value') || changed.has('options') || changed.has('size')) {
      // Wait for DOM to settle before measuring
      requestAnimationFrame(() => this._updateIndicator());
    }
  }

  override firstUpdated(): void {
    requestAnimationFrame(() => this._updateIndicator());
  }

  private _updateIndicator(): void {
    const activeIdx = this.options.findIndex(o => o.value === this.value);
    if (activeIdx < 0) return;
    const segments = this.shadowRoot?.querySelectorAll<HTMLElement>('.segment');
    const indicator = this.shadowRoot?.querySelector<HTMLElement>('.indicator');
    if (!segments || !indicator || !segments[activeIdx]) return;
    const seg = segments[activeIdx];
    indicator.style.width = `${seg.offsetWidth}px`;
    indicator.style.transform = `translateX(${seg.offsetLeft}px)`;
  }

  private _select(option: SegmentOption): void {
    if (option.disabled || this.disabled) return;
    this.value = option.value;
    this.dispatchEvent(new CustomEvent('cg-segmented-change', {
      detail: { value: option.value },
      bubbles: true,
      composed: true,
    }));
  }

  private _handleKeydown(e: KeyboardEvent): void {
    if (this.disabled) return;
    const current = this.options.findIndex(o => o.value === this.value);
    if (current < 0) return;
    let next = current;
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      next = (current - 1 + this.options.length) % this.options.length;
    } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      next = (current + 1) % this.options.length;
    } else if (e.key === 'Home') {
      e.preventDefault();
      next = 0;
    } else if (e.key === 'End') {
      e.preventDefault();
      next = this.options.length - 1;
    }
    if (next !== current) {
      const option = this.options[next];
      if (option && !option.disabled) this._select(option);
    }
  }

  override render() {
    return html`
      <div class="track" role="radiogroup" aria-disabled=${this.disabled ? 'true' : 'false'} @keydown=${this._handleKeydown}>
        <span class="indicator"></span>
        ${this.options.map(option => html`
          <button
            type="button"
            class="segment"
            role="radio"
            aria-checked=${option.value === this.value ? 'true' : 'false'}
            ?disabled=${option.disabled || this.disabled}
            @click=${() => this._select(option)}
          >${option.label}</button>
        `)}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cg-segmented-control': CgSegmentedControl;
  }
}
