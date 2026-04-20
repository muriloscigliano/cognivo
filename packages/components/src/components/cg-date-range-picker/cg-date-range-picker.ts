import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { hostBlock, reducedMotion } from '../../styles/index.js';
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
 * @fires {CustomEvent<{from: string, to: string}>} cg-date-range-change
 */
@customElement('cg-date-range-picker')
export class CgDateRangePicker extends LitElement {
  static formAssociated = true;
  private _internals: ElementInternals | undefined;

  constructor() {
    super();
    if ('attachInternals' in this) {
      this._internals = this.attachInternals();
    }
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
      display: flex;
      align-items: center;
      gap: var(--cg-spacing-8);
      height: var(--cg-component-input-height-md);
      padding: 0 var(--cg-spacing-12);
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

    .trigger:hover:not(.disabled) {
      border-color: var(--cg-color-input-border-hover);
    }

    .trigger.open,
    .trigger:focus-visible {
      border-color: var(--cg-color-input-border-focus);
      box-shadow:
        0 0 0 var(--cg-focus-ring-offset) var(--cg-color-focus-ring-offset),
        0 0 0 calc(var(--cg-focus-ring-offset) + var(--cg-focus-ring-width)) var(--cg-color-focus-ring);
    }

    .trigger.disabled {
      opacity: 0.5;
      pointer-events: none;
      background: var(--cg-color-input-background-disabled);
    }

    .trigger.invalid {
      border-color: var(--cg-color-status-error-border-default);
    }
    .trigger.invalid:focus-visible,
    .trigger.invalid.open {
      border-color: var(--cg-color-status-error-border-default);
      box-shadow:
        0 0 0 var(--cg-focus-ring-offset) var(--cg-color-focus-ring-offset),
        0 0 0 calc(var(--cg-focus-ring-offset) + var(--cg-focus-ring-width)) var(--cg-color-status-error-border-default);
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
    }
    .segment.empty { color: var(--cg-color-input-text-placeholder); }

    .arrow {
      flex-shrink: 0;
      color: var(--cg-color-input-icon-default);
      display: flex;
      align-items: center;
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
      padding: var(--cg-spacing-12);
      background: var(--cg-color-modal-container-background);
      border: var(--cg-border-width-50) solid var(--cg-color-input-border-default);
      border-radius: var(--cg-component-input-radius);
      opacity: 0;
      transform: translateY(calc(-1 * var(--cg-spacing-4))) scale(0.98);
      pointer-events: none;
      transition:
        opacity var(--cg-transition-duration-fast) var(--cg-transition-easing-default),
        transform var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
    }
    .dropdown.open {
      opacity: 1;
      transform: translateY(0) scale(1);
      pointer-events: auto;
    }
  `];

  @property() label = '';
  @property() from = '';
  @property() to = '';
  @property() min = '';
  @property() max = '';
  @property() placeholder = 'Select date range';
  @property() format = 'MMM dd, yyyy';
  @property({ type: Boolean }) disabled = false;
  @property({ type: Boolean, reflect: true }) open = false;
  @property() error = '';

  @state() private _pendingTo = '';

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
    if (this.disabled) return;
    this.open = !this.open;
  }

  private _close() {
    this.open = false;
  }

  private _formatDisplay(iso: string): string {
    if (!iso) return '';
    const d = new Date(iso + 'T00:00:00');
    if (isNaN(d.getTime())) return '';
    return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
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
    if (e.key === 'Escape') { this._close(); return; }
    if (e.key === 'Enter' || e.key === ' ') {
      if (!this.open) { e.preventDefault(); this._toggle(); }
    }
  }

  override render() {
    const fromText = this._formatDisplay(this.from);
    const toText = this._formatDisplay(this.to);
    return html`
      ${this.label ? html`<label class="label">${this.label}</label>` : nothing}
      <div
        class="trigger ${this.open ? 'open' : ''} ${this.disabled ? 'disabled' : ''} ${this.error ? 'invalid' : ''}"
        role="combobox"
        tabindex=${this.disabled ? '-1' : '0'}
        aria-expanded=${this.open ? 'true' : 'false'}
        aria-haspopup="dialog"
        aria-controls="cg-drp-dropdown"
        aria-label=${this.label || 'Date range picker'}
        aria-invalid=${this.error ? 'true' : nothing}
        aria-describedby=${this.error ? 'cg-drp-error' : nothing}
        @click=${this._toggle}
        @keydown=${this._handleKeydown}
      >
        <span class="segment ${fromText ? '' : 'empty'}">${fromText || this.placeholder}</span>
        <span class="arrow" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </span>
        <span class="segment ${toText ? '' : 'empty'}">${toText || 'End date'}</span>
      </div>

      <div id="cg-drp-dropdown" class="dropdown ${this.open ? 'open' : ''}" role="dialog" aria-label="Date range calendar">
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
      ${this._pendingTo ? nothing : nothing}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cg-date-range-picker': CgDateRangePicker;
  }
}
