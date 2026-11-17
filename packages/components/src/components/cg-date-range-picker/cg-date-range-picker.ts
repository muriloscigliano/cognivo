import { LitElement, html, css, nothing } from 'lit';
import { property, state } from 'lit/decorators.js';
import { customElement } from '../../utils/define.js';
import { formInternals } from '../../utils/form-internals.js';
import { hostBlock, reducedMotion } from '../../styles/index.js';
import { defineMessages, Messages } from '../../utils/messages.js';

const MESSAGES = defineMessages('cg-date-range-picker', {
  placeholder: 'Select date range',
  endPlaceholder: 'End date',
  label: 'Date range picker',
  calendar: 'Date range calendar',
  /** Built-in presets (`presets` keys). */
  last7: 'Last 7 days',
  last30: 'Last 30 days',
  last90: 'Last 90 days',
  last12m: 'Last 12 months',
  ytd: 'Year to date',
  presets: 'Presets',
});

/** A preset range: a built-in key or an explicit range with its label. */
export type DateRangePreset = '7d' | '30d' | '90d' | '12m' | 'ytd' | { label: string; from: string; to: string };

const isoDay = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
import '../cg-calendar/cg-calendar.js';

/**
 * @element cg-date-range-picker
 * Dual-input date range picker that opens a range-mode cg-calendar.
 *
 * @example
 * ```html
 * <cg-date-range-picker label="Dates" from="2026-04-01" to="2026-04-10"></cg-date-range-picker>
 * ```
 *
 * `variant="pill"`: the toolbar form — a 36 px full pill (no visible
 * label; `label` names it) reading "Oct 19 – Nov 17" (the year only when the
 * range is not in this year) with a chevron. `presets` (built-in keys `7d`,
 * `30d`, `90d`, `12m`, `ytd`, or `{ label, from, to }`) sit beside the
 * calendar and apply at once; the matching one is pressed. Picking both ends
 * in the calendar applies too — no "Show" button.
 *
 * @fires {CustomEvent<{from: string, to: string}>} cg-date-range-change
 */
@customElement('cg-date-range-picker')
export class CgDateRangePicker extends LitElement {
  static formAssociated = true;
  private _internals: ElementInternals | undefined;

  constructor() {
    super();
    this._internals = formInternals(this);
  }

  static override styles = [hostBlock, reducedMotion, css`
    :host { position: relative; font-family: var(--cg-font-family-primary); }

    .label {
      font-size: var(--cg-font-size-xs);
      color: var(--cg-color-surface-container-text);
      margin-bottom: var(--cg-spacing-4);
      font-weight: var(--cg-font-weight-medium);
      display: block;
    }

    .trigger {
      box-sizing: border-box;
      display: flex;
      align-items: center;
      gap: 0;
      height: var(--cg-component-input-height-md);
      padding: 0 var(--cg-spacing-4);
      border: var(--cg-border-width-50) solid var(--cg-color-input-border-default);
      border-radius: var(--cg-component-input-radius);
      background: var(--cg-color-input-background-default);
      color: var(--cg-color-input-text-default);
      font-size: var(--cg-font-size-sm);
      cursor: pointer;
      outline: none;
      transition:
        border-color var(--cg-transition-duration-fast) var(--cg-transition-easing-default),
        box-shadow var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
    }
    .trigger-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--cg-color-input-icon-default);
      flex-shrink: 0;
      width: var(--cg-spacing-40);
      align-self: stretch;
      background: var(--cg-overlay-dark-subtle);
      border-right: var(--cg-border-width-50) solid var(--cg-color-input-border-default);
      border-radius: var(--cg-component-input-radius) 0 0 var(--cg-component-input-radius);
      margin-left: calc(-1 * var(--cg-spacing-4));
    }
    .trigger-icon svg {
      width: var(--cg-icon-size-100);
      height: var(--cg-icon-size-100);
    }

    .trigger:hover:not(.disabled) {
      border-color: var(--cg-color-input-border-hover);
    }

    .trigger.open,
    .trigger:focus-visible {
      border-color: var(--cg-color-input-border-focus);
      box-shadow: 0 0 0 var(--cg-border-width-300) var(--cg-color-state-focus-halo);
    }

    .trigger.disabled {
      opacity: var(--cg-opacity-40);
      pointer-events: none;
      background: var(--cg-color-input-background-disabled);
    }

    .trigger.invalid {
      border-color: var(--cg-color-status-error-border-default);
    }
    .trigger.invalid:focus-visible,
    .trigger.invalid.open {
      border-color: var(--cg-color-status-error-text-default);
      box-shadow: 0 0 0 3px var(--cg-shadow-focus-error);
    }

    .error-message {
      display: block;
      margin-top: var(--cg-spacing-4);
      font-size: var(--cg-font-size-xs);
      color: var(--cg-color-status-error-text-default);
    }

    .segment {
      flex: 1;
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      padding: 0 var(--cg-spacing-12);
    }
    .segment.empty { color: var(--cg-color-input-text-placeholder); }

    .arrow {
      flex-shrink: 0;
      color: var(--cg-color-input-text-placeholder);
      display: flex;
      align-items: center;
      padding: 0 var(--cg-spacing-2);
    }
    .arrow svg {
      width: var(--cg-icon-size-100);
      height: var(--cg-icon-size-100);
    }

    .dropdown {
      position: absolute;
      top: 100%;
      left: 0;
      z-index: var(--cg-z-index-200);
      margin-top: var(--cg-spacing-4);
      border-radius: var(--cg-component-calendar-radius);
      box-shadow: var(--cg-shadow-elevation-xl);
      opacity: 0;
      visibility: hidden;
      transform: translateY(calc(-1 * var(--cg-spacing-4))) scale(0.98);
      pointer-events: none;
      transition:
        opacity var(--cg-transition-duration-fast) var(--cg-transition-easing-default),
        transform var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
    }
    .dropdown.open {
      opacity: 1;
      visibility: visible;
      transform: translateY(0) scale(1);
      pointer-events: auto;
    }
    .dropdown.has-presets {
      display: flex;
      align-items: flex-start;
      gap: var(--cg-spacing-8);
      padding: var(--cg-spacing-8);
      background: var(--cg-color-modal-container-background);
      border: var(--cg-border-width-50) solid var(--cg-color-surface-hairline);
    }
    .presets {
      display: flex;
      flex-direction: column;
      gap: var(--cg-spacing-2);
      min-width: max-content;
    }
    .preset {
      display: flex;
      align-items: center;
      height: var(--cg-component-button-height-sm);
      padding: 0 var(--cg-spacing-12);
      border: 0;
      border-radius: var(--cg-border-radius-50);
      background: none;
      color: var(--cg-color-surface-container-text);
      font-size: var(--cg-font-size-13);
      text-align: start;
      white-space: nowrap;
      cursor: pointer;
    }
    .preset:hover { background: var(--cg-color-state-hover); color: var(--cg-color-state-text); }
    .preset[aria-pressed="true"] { background: var(--cg-color-state-selected); color: var(--cg-color-state-text); font-weight: var(--cg-font-weight-medium); }
    .preset:focus-visible { outline: none; box-shadow: 0 0 0 var(--cg-focus-ring-width) var(--cg-color-focus-ring); }

    /* ── Pill (toolbar) ── */
    :host([variant="pill"]) { display: inline-block; }
    :host([variant="pill"]) .trigger {
      height: var(--cg-component-button-height-md);
      padding: 0 var(--cg-spacing-12) 0 var(--cg-spacing-16);
      gap: var(--cg-spacing-6);
      border-radius: var(--cg-border-radius-full);
      font-weight: var(--cg-font-weight-medium);
      white-space: nowrap;
    }
    .pill-text { font-variant-numeric: tabular-nums; }
    .pill-text.empty { color: var(--cg-color-input-text-placeholder); }
    .chevron { display: flex; color: var(--cg-color-input-text-placeholder); }
    .chevron svg { width: var(--cg-icon-size-100); height: var(--cg-icon-size-100); }
  `];

  /** Per-element text overrides (JSON attribute); see `setMessages()`. */
  @property({ type: Object }) messages: Partial<typeof MESSAGES> | null = null;

  private i18n = new Messages(this, MESSAGES);

  @property() label = '';
  @property() from = '';
  @property() to = '';
  @property() min = '';
  @property() max = '';
  @property() placeholder?: string;
  /** Placeholder for the end-date segment (overridable / i18n-able). */
  @property({ attribute: 'end-placeholder' }) endPlaceholder?: string;
  @property() format = 'MMM dd, yyyy';
  @property({ type: Boolean }) disabled = false;
  /** Disabled by an ancestor `<fieldset disabled>` or the own attribute
   *  (formDisabledCallback), so a fieldset disables this field as it does a native one. */
  @state() private _formDisabled = false;
  private get _effectivelyDisabled(): boolean { return this.disabled || this._formDisabled; }
  formDisabledCallback(disabled: boolean): void { this._formDisabled = disabled; }
  @property({ type: Boolean, reflect: true }) open = false;
  @property() error = '';
  /** `field` (default): a labelled field with two segments. `pill`: the 36 px toolbar pill. */
  @property({ reflect: true }) variant: 'field' | 'pill' = 'field';
  /** Ranges beside the calendar that apply at once: built-in keys or `{ label, from, to }`. */
  @property({ type: Array }) presets: DateRangePreset[] = [];

  /** A preset's label and range (built-ins are relative to today). */
  private _preset(p: DateRangePreset): { label: string; from: string; to: string } {
    if (typeof p === 'object') return p;
    const today = new Date();
    const back = (days: number) => isoDay(new Date(today.getFullYear(), today.getMonth(), today.getDate() - days));
    const to = isoDay(today);
    switch (p) {
      case '7d': return { label: this.i18n.t('last7'), from: back(6), to };
      case '30d': return { label: this.i18n.t('last30'), from: back(29), to };
      case '90d': return { label: this.i18n.t('last90'), from: back(89), to };
      case '12m': return { label: this.i18n.t('last12m'), from: isoDay(new Date(today.getFullYear() - 1, today.getMonth(), today.getDate() + 1)), to };
      default: return { label: this.i18n.t('ytd'), from: `${today.getFullYear()}-01-01`, to };
    }
  }

  private _applyPreset(p: { from: string; to: string }) {
    this.from = p.from;
    this.to = p.to;
    this.dispatchEvent(new CustomEvent('cg-date-range-change', { detail: { from: this.from, to: this.to }, bubbles: true, composed: true }));
    this._close();
    void this.updateComplete.then(() => this.renderRoot.querySelector<HTMLElement>('.trigger')?.focus());
  }

  /** "Oct 19 – Nov 17"; with the years when the range is not all in this year. */
  private _pillText(): string {
    if (!this.from && !this.to) return '';
    const year = new Date().getFullYear();
    const years = [this.from, this.to].filter(Boolean).map((v) => Number(v.slice(0, 4)));
    const withYear = years.some((y) => y !== year);
    const fmt = (iso: string) => {
      const d = new Date(`${iso}T00:00:00`);
      return Number.isNaN(d.getTime()) ? '' : d.toLocaleDateString(this.i18n.locale, withYear ? { month: 'short', day: 'numeric', year: 'numeric' } : { month: 'short', day: 'numeric' });
    };
    return [fmt(this.from), fmt(this.to)].filter(Boolean).join(' – ');
  }

  override updated(changed: Map<string, unknown>) {
    if (changed.has('from') || changed.has('to')) {
      this._syncFormValue();
    }
  }

  private _syncFormValue() {
    if (!this._internals) return;
    const fd = new FormData();
    if (this.from) fd.append('from', this.from);
    if (this.to) fd.append('to', this.to);
    this._internals.setFormValue(fd);
  }

  private _toggle() {
    if (this._effectivelyDisabled) return;
    this.open = !this.open;
  }

  private _close() {
    this.open = false;
  }

  private _formatDisplay(iso: string): string {
    if (!iso) return '';
    const d = new Date(iso + 'T00:00:00');
    if (isNaN(d.getTime())) return '';
    return d.toLocaleDateString(this.i18n.locale, { year: 'numeric', month: 'short', day: 'numeric' });
  }

  private _onCalendarChange(e: Event) {
    const ev = e as CustomEvent<{ value: string; rangeEnd?: string }>;
    e.stopPropagation();
    const { value, rangeEnd } = ev.detail;
    this.from = value || '';
    this.to = rangeEnd || '';

    if (this.from && this.to) {
      this.dispatchEvent(new CustomEvent('cg-date-range-change', {
        detail: { from: this.from, to: this.to },
        bubbles: true,
        composed: true,
      }));
      // Close after both picked
      setTimeout(() => { this.open = false; }, 120);
    }
  }

  private _handleClickOutside = (e: Event) => {
    if (!e.composedPath().includes(this)) this._close();
  };

  override connectedCallback() {
    super.connectedCallback();
    document.addEventListener('click', this._handleClickOutside);
  }
  override disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('click', this._handleClickOutside);
  }

  private _handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape') {
      // An open popup consumes its Escape, so an enclosing drawer or dialog stays open.
      if (this.open) { e.preventDefault(); e.stopPropagation(); this._close(); }
      return;
    }
    if (e.key === 'Enter' || e.key === ' ') {
      if (!this.open) { e.preventDefault(); this._toggle(); }
    }
  }

  override render() {
    const fromText = this._formatDisplay(this.from);
    const toText = this._formatDisplay(this.to);
    const pill = this.variant === 'pill';
    const pillText = pill ? this._pillText() : '';
    const presets = this.presets.map((p) => this._preset(p));
    return html`
      ${this.label && !pill ? html`<label class="label">${this.label}</label>` : nothing}
      <div
        class="trigger ${this.open ? 'open' : ''} ${this._effectivelyDisabled ? 'disabled' : ''} ${this.error ? 'invalid' : ''}"
        role="combobox"
        tabindex=${this._effectivelyDisabled ? '-1' : '0'}
        aria-expanded=${this.open ? 'true' : 'false'}
        aria-disabled=${this._effectivelyDisabled ? 'true' : nothing}
        aria-haspopup="dialog"
        aria-controls="cg-drp-dropdown"
        aria-label=${this.label || this.i18n.t('label')}
        aria-invalid=${this.error ? 'true' : nothing}
        aria-describedby=${this.error ? 'cg-drp-error' : nothing}
        @click=${this._toggle}
        @keydown=${this._handleKeydown}
      >
        ${pill ? html`
        <span class="pill-text ${pillText ? '' : 'empty'}">${pillText || (this.placeholder ?? this.i18n.t('placeholder'))}</span>
        <span class="chevron" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>
        </span>` : html`
        <span class="trigger-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
        </span>
        <span class="segment ${fromText ? '' : 'empty'}">${fromText || (this.placeholder ?? this.i18n.t('placeholder'))}</span>
        <span class="arrow" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M9 6l6 6-6 6"/>
          </svg>
        </span>
        <span class="segment ${toText ? '' : 'empty'}">${toText || (this.endPlaceholder ?? this.i18n.t('endPlaceholder'))}</span>`}
      </div>

      <div id="cg-drp-dropdown" class="dropdown ${this.open ? 'open' : ''} ${presets.length ? 'has-presets' : ''}" role="dialog" aria-label=${this.i18n.t('calendar')}>
        ${presets.length ? html`<div class="presets" role="group" aria-label=${this.i18n.t('presets')}>
          ${presets.map((p) => html`<button type="button" class="preset" aria-pressed=${p.from === this.from && p.to === this.to ? 'true' : 'false'}
            @click=${(e: Event) => { e.stopPropagation(); this._applyPreset(p); }}>${p.label}</button>`)}
        </div>` : nothing}
        <cg-calendar
          mode="range"
          .value=${this.from}
          .rangeEnd=${this.to}
          .min=${this.min}
          .max=${this.max}
          @cg-calendar-change=${this._onCalendarChange}
        ></cg-calendar>
      </div>
      ${this.error ? html`<span id="cg-drp-error" class="error-message" role="alert">${this.error}</span>` : nothing}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cg-date-range-picker': CgDateRangePicker;
  }
}
