import { LitElement, html, css, nothing } from 'lit';
import { property, state } from 'lit/decorators.js';
import { customElement } from '../../utils/define.js';
import { formInternals } from '../../utils/form-internals.js';
import { hostBase, reducedMotion } from '../../styles/index.js';

export interface SegmentOption {
  label: string;
  value: string;
  icon?: string;
  disabled?: boolean;
  /** Accessible name when it should say more than the visible label. Start it
   *  with the visible text (WCAG 2.5.3 label in name): "12m" → "12m, last 12 months". */
  ariaLabel?: string;
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
 * Options never wrap or shrink below their label; when the space is too
 * narrow the track scrolls sideways (the host never grows past its container)
 * and setting `value` scrolls the selected option into view.
 *
 * @fires {CustomEvent<{value: string}>} cg-segmented-change
 * @attr {string} label - Accessible name for the radiogroup. Always provide one.
 */
@customElement('cg-segmented-control')
export class CgSegmentedControl extends LitElement {
  static override styles = [hostBase, reducedMotion, css`
    :host {
      display: inline-flex;
      max-width: 100%;
    }

    .track {
      display: inline-flex;
      position: relative;
      box-sizing: border-box;
      max-width: 100%;
      overflow-x: auto;
      scrollbar-width: none;
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
      background: var(--cg-color-state-pill-background);
      border: var(--cg-border-width-50) solid var(--cg-color-state-pill-border);
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
      /* Track height minus the padding and the border on both sides: md 32 → 26 px options, inset 3 px. */
      height: calc(var(--cg-component-segmented-control-height-md) - 2 * (var(--cg-component-segmented-control-padding) + var(--cg-border-width-50)));
      padding: 0 var(--cg-spacing-12);
      border: none;
      background: transparent;
      color: var(--cg-color-surface-container-outlined);
      font-family: inherit;
      font-size: var(--cg-font-size-sm);
      font-weight: var(--cg-font-weight-medium);
      cursor: pointer;
      transition: color var(--cg-transition-duration-state) var(--cg-transition-easing-ease-out);
      z-index: 1;
      border-radius: inherit;
      /* Grow to share a wide track, never shrink below the label, never wrap. */
      flex: 1 0 auto;
      white-space: nowrap;
    }
    @media (hover: hover) {
      .segment:hover:not(:disabled) {
        color: var(--cg-color-state-text);
      }
    }
    .segment[aria-checked="true"] {
      color: var(--cg-color-state-text);
    }
    .segment:focus-visible {
      outline: none;
      box-shadow:
        0 0 0 var(--cg-focus-ring-offset) var(--cg-color-focus-ring-offset),
        0 0 0 calc(var(--cg-focus-ring-offset) + var(--cg-focus-ring-width)) var(--cg-color-focus-ring);
    }
    .segment:disabled {
      opacity: var(--cg-opacity-40);
      cursor: not-allowed;
    }

    /* Sizes */
    :host([size="sm"]) .segment {
      height: calc(var(--cg-component-segmented-control-height-sm) - 2 * (var(--cg-component-segmented-control-padding) + var(--cg-border-width-50)));
      padding: 0 var(--cg-spacing-12);
      font-size: var(--cg-font-size-xs);
    }
    :host([size="lg"]) .segment {
      height: calc(var(--cg-component-segmented-control-height-lg) - 2 * (var(--cg-component-segmented-control-padding) + var(--cg-border-width-50)));
      padding: 0 var(--cg-spacing-20);
      font-size: var(--cg-font-size-base);
    }
  `];

  static formAssociated = true;
  private _internals: ElementInternals | undefined;

  constructor() {
    super();
    this._internals = formInternals(this);
  }

  @property({ type: Array }) options: SegmentOption[] = [];
  @property() value = '';
  @property({ reflect: true }) name = '';
  /** Accessible name for the radiogroup (e.g. "View period"). Strongly recommended. */
  @property() label = '';
  @property({ type: Boolean, reflect: true }) disabled = false;
  /** Disabled by an ancestor `<fieldset disabled>` or the own attribute
   *  (formDisabledCallback), so a fieldset disables this field as it does a native one. */
  @state() private _formDisabled = false;
  private get _effectivelyDisabled(): boolean { return this.disabled || this._formDisabled; }
  formDisabledCallback(disabled: boolean): void { this._formDisabled = disabled; }
  @property({ reflect: true }) size: 'sm' | 'md' | 'lg' = 'md';
  @property({ type: Boolean, reflect: true }) full = false;

  private _resizeObserver: ResizeObserver | null = null;

  override connectedCallback(): void {
    super.connectedCallback();
    // Re-compute indicator when container resizes (e.g. full width on mobile).
    // Feature-detected: jsdom has no ResizeObserver.
    if (typeof ResizeObserver === 'function') this._resizeObserver = new ResizeObserver(() => this._updateIndicator());
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
      requestAnimationFrame(() => {
        this._updateIndicator();
        if (changed.has('value') || changed.has('options')) this._revealSelected();
      });
    }
  }

  /** A narrow (scrolling) track brings the selected option into view —
   *  sideways only, inside the track (scrollIntoView could scroll the page). */
  private _revealSelected(): void {
    const seg = this.shadowRoot?.querySelector<HTMLElement>('.segment[aria-checked="true"]');
    const track = seg?.parentElement;
    if (!seg || !track) return;
    // Keep the track's own padding around it.
    const pad = parseFloat(getComputedStyle(track).paddingLeft) || 0;
    const left = seg.offsetLeft - pad;
    const right = seg.offsetLeft + seg.offsetWidth + pad;
    if (left < track.scrollLeft) track.scrollLeft = left;
    else if (right > track.scrollLeft + track.clientWidth) track.scrollLeft = right - track.clientWidth;
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
    if (option.disabled || this._effectivelyDisabled) return;
    this.value = option.value;
    this.dispatchEvent(new CustomEvent('cg-segmented-change', {
      detail: { value: option.value },
      bubbles: true,
      composed: true,
    }));
  }

  private _handleKeydown(e: KeyboardEvent): void {
    if (this._effectivelyDisabled) return;
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
      <div class="track" role="radiogroup" aria-label=${this.label || nothing} aria-disabled=${this._effectivelyDisabled ? 'true' : 'false'} @keydown=${this._handleKeydown}>
        <span class="indicator"></span>
        ${this.options.map((option, i) => html`
          <button
            type="button"
            class="segment"
            role="radio"
            aria-checked=${option.value === this.value ? 'true' : 'false'}
            aria-label=${option.ariaLabel || nothing}
            tabindex=${i === focusIdx ? '0' : '-1'}
            ?disabled=${option.disabled || this._effectivelyDisabled}
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
