import { LitElement, html, css, nothing } from 'lit';
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
 *   label="View period"
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
 * @attr {string} label - Accessible name for the radiogroup. Always provide one.
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
      border: var(--cg-border-width-50) solid var(--cg-color-action-secondary-border-default);
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
      box-sizing: border-box;
      background: var(--cg-color-surface-container-background);
      border: var(--cg-border-width-50) solid var(--cg-color-action-secondary-border-default);
      border-radius: calc(var(--cg-component-segmented-control-radius) - var(--cg-component-segmented-control-padding));
      transition:
        transform var(--cg-transition-duration-default) var(--cg-transition-easing-ease-in-out),
        width var(--cg-transition-duration-default) var(--cg-transition-easing-ease-in-out);
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
      transition:
        color var(--cg-transition-duration-fast) var(--cg-transition-easing-default),
        transform var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
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
        0 0 0 var(--cg-focus-ring-offset) var(--cg-color-focus-ring-offset),
        0 0 0 calc(var(--cg-focus-ring-offset) + var(--cg-focus-ring-width)) var(--cg-color-focus-ring);
    }
    .segment:disabled {
      opacity: var(--cg-opacity-50);
      cursor: not-allowed;
    }
    .segment:active:not(:disabled) {
      transform: scale(var(--cg-interaction-press-scale));
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
  @property({ reflect: true }) name = '';
  /** Accessible name for the radiogroup (e.g. "View period"). Strongly recommended. */
  @property() label = '';
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
    const indicator = this.shadowRoot?.querySelector<HTMLElement>('.indicator');
    if (!indicator) return;
    const activeIdx = this.options.findIndex(o => o.value === this.value);
    if (activeIdx < 0) {
      // No active option: hide the indicator so its border doesn't render as a sliver at left:0.
      indicator.style.visibility = 'hidden';
      return;
    }
    const segments = this.shadowRoot?.querySelectorAll<HTMLElement>('.segment');
    const seg = segments?.[activeIdx];
    if (!seg) return;
    indicator.style.visibility = 'visible';
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
    let current = this.options.findIndex(o => o.value === this.value);
    // No selection yet: navigate relative to the first enabled option (roving-focus seed).
    if (current < 0) current = this.options.findIndex(o => !o.disabled);
    if (current < 0) return;
    let next = current;
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp' || e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      const dir = e.key === 'ArrowLeft' || e.key === 'ArrowUp' ? -1 : 1;
      // Scan for the next enabled option, skipping disabled segments (WAI-ARIA radio-group pattern).
      for (let i = 1; i <= this.options.length; i++) {
        const idx = (current + dir * i + this.options.length) % this.options.length;
        const candidate = this.options[idx];
        if (candidate && !candidate.disabled) {
          next = idx;
          break;
        }
      }
    } else if (e.key === 'Home') {
      e.preventDefault();
      const idx = this.options.findIndex(o => !o.disabled);
      if (idx >= 0) next = idx;
    } else if (e.key === 'End') {
      e.preventDefault();
      for (let i = this.options.length - 1; i >= 0; i--) {
        const candidate = this.options[i];
        if (candidate && !candidate.disabled) {
          next = i;
          break;
        }
      }
    }
    if (next !== current) {
      const option = this.options[next];
      if (option && !option.disabled) {
        this._select(option);
        // Roving tabindex: focus the newly-selected segment so Tab tracking stays consistent.
        this.updateComplete.then(() => {
          const segments = this.shadowRoot?.querySelectorAll<HTMLElement>('.segment');
          segments?.[next]?.focus();
        });
      }
    }
  }

  override render() {
    const activeIdx = this.options.findIndex(o => o.value === this.value);
    // Roving tabindex: when nothing is selected, seed focus on the first enabled segment
    // so the control stays keyboard-reachable.
    const focusIdx = activeIdx >= 0 ? activeIdx : this.options.findIndex(o => !o.disabled);
    return html`
      <div class="track" role="radiogroup" aria-label=${this.label || nothing} aria-disabled=${this.disabled ? 'true' : 'false'} @keydown=${this._handleKeydown}>
        <span class="indicator"></span>
        ${this.options.map((option, i) => html`
          <button
            type="button"
            class="segment"
            role="radio"
            aria-checked=${option.value === this.value ? 'true' : 'false'}
            tabindex=${i === focusIdx ? '0' : '-1'}
            ?disabled=${option.disabled || this.disabled}
            @click=${() => this._select(option)}
          >${option.icon ? html`<cg-icon name=${option.icon}></cg-icon>` : nothing}${option.label}</button>
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
