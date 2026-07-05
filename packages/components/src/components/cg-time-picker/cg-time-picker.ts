import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { hostBlock, reducedMotion } from '../../styles/index.js';

/**
 * @element cg-time-picker
 * Time picker with hour/minute grid dropdown, following cg-input/cg-select/cg-date-picker styling.
 *
 * @example
 * ```html
 * <cg-time-picker label="Start time" placeholder="Pick a time"></cg-time-picker>
 * <cg-time-picker label="Meeting" value="14:30" step="15"></cg-time-picker>
 * ```
 *
 * @fires {CustomEvent<{value: string}>} cg-change - When a time is selected
 */
@customElement('cg-time-picker')
export class CgTimePicker extends LitElement {
  static override styles = [hostBlock, reducedMotion, css`
    :host { position: relative; }

    /* ── Trigger ── */
    .trigger {
      display: flex;
      align-items: center;
      gap: 0;
      padding: 0 var(--cg-spacing-4);
      height: var(--cg-component-input-height-md);
      border: var(--cg-border-width-50) solid var(--cg-color-input-border-default);
      border-radius: var(--cg-component-input-radius);
      background: var(--cg-color-input-background-default);
      color: var(--cg-color-input-text-default);
      font: inherit;
      font-size: var(--cg-font-size-sm);
      cursor: pointer;
      outline: none;
      transition:
        border-color var(--cg-transition-duration-fast) var(--cg-transition-easing-default),
        box-shadow var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
    }
    .trigger:hover:not(.disabled) { border-color: var(--cg-color-input-border-hover); }
    .trigger:focus-visible { border-color: var(--cg-color-input-border-focus); box-shadow: 0 0 0 3px var(--cg-overlay-accent-strong); }
    .trigger.open { border-color: var(--cg-color-input-border-focus); box-shadow: 0 0 0 3px var(--cg-overlay-accent-strong); }
    .trigger.disabled { opacity: 0.5; pointer-events: none; background: var(--cg-color-input-background-disabled); border-color: var(--cg-color-input-border-disabled); }

    :host([error]) .trigger { border-color: var(--cg-color-input-border-error); }
    :host([error]) .trigger:focus-visible,
    :host([error]) .trigger.open { border-color: var(--cg-color-status-error-text-default); box-shadow: 0 0 0 3px var(--cg-shadow-focus-error); }
    :host([success]) .trigger { border-color: var(--cg-color-status-success-border-default); }
    :host([success]) .trigger:focus-visible,
    :host([success]) .trigger.open { border-color: var(--cg-color-status-success-text-default); box-shadow: 0 0 0 3px var(--cg-shadow-focus-success); }

    /* Size */
    :host([size="lg"]) .trigger { height: var(--cg-component-input-height-lg); padding: 0 var(--cg-spacing-4); font-size: var(--cg-font-size-base); }

    /* Rounded */
    :host([rounded="none"]) .trigger { border-radius: 0; }
    :host([rounded="sm"]) .trigger { border-radius: var(--cg-border-radius-50); }
    :host([rounded="md"]) .trigger { border-radius: var(--cg-border-radius-100); }
    :host([rounded="lg"]) .trigger { border-radius: var(--cg-component-input-radius); }

    /* ── Icon panel ── */
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
    .trigger-text {
      flex: 1;
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      padding: 0 var(--cg-spacing-12);
    }
    .placeholder { color: var(--cg-color-input-text-placeholder); }

    .label {
      font-size: var(--cg-font-size-xs);
      color: var(--cg-color-surface-container-text);
      margin-bottom: var(--cg-spacing-4);
      font-weight: var(--cg-font-weight-medium);
    }

    /* ── Dropdown ── */
    .dropdown {
      position: absolute;
      top: 100%;
      left: 0;
      z-index: var(--cg-z-index-200);
      min-width: var(--cg-spacing-256);
      margin-top: var(--cg-spacing-4);
      padding: var(--cg-spacing-16);
      background: var(--cg-color-modal-container-background);
      border: var(--cg-border-width-50) solid var(--cg-color-input-border-default);
      border-radius: var(--cg-component-input-radius);
      box-shadow: var(--cg-shadow-elevation-xl);
      opacity: 0;
      visibility: hidden;
      transform: translateY(calc(-1 * var(--cg-spacing-4))) scale(0.98);
      pointer-events: none;
      transition:
        opacity var(--cg-transition-duration-fast) var(--cg-transition-easing-default),
        transform var(--cg-transition-duration-fast) var(--cg-transition-easing-default),
        visibility var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
    }
    .dropdown.open {
      opacity: 1;
      visibility: visible;
      transform: translateY(0) scale(1);
      pointer-events: auto;
    }

    /* ── Time columns ── */
    .time-columns {
      display: flex;
      gap: var(--cg-spacing-8);
    }

    .time-column {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .time-column-label {
      font-size: var(--cg-font-size-xs);
      font-weight: var(--cg-font-weight-medium);
      color: var(--cg-color-input-text-placeholder);
      margin-bottom: var(--cg-spacing-8);
      text-transform: uppercase;
      letter-spacing: var(--cg-letter-spacing-wide);
    }
    .time-scroll {
      display: flex;
      flex-direction: column;
      gap: var(--cg-spacing-2);
      max-height: var(--cg-component-combobox-listbox-max-height);
      overflow-y: auto;
      width: 100%;
      scrollbar-width: thin;
      scrollbar-color: var(--cg-color-input-border-default) transparent;
    }

    .time-option {
      display: flex;
      align-items: center;
      justify-content: center;
      height: var(--cg-spacing-32);
      border: none;
      background: transparent;
      color: var(--cg-color-surface-base-text);
      font-size: var(--cg-font-size-sm);
      font-family: inherit;
      font-variant-numeric: tabular-nums;
      border-radius: var(--cg-border-radius-50);
      cursor: pointer;
      transition:
        background-color var(--cg-transition-duration-fast) var(--cg-transition-easing-default),
        color var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
    }
    .time-option:hover { background: var(--cg-color-action-secondary-background-hover); }
    .time-option:active { transform: scale(var(--cg-interaction-press-scale)); }
    .time-option.selected {
      background: var(--cg-color-action-primary-background-default);
      color: var(--cg-color-action-primary-text-default);
      font-weight: var(--cg-font-weight-semibold);
    }
    .time-option.selected:hover {
      background: var(--cg-color-action-primary-background-default);
    }
    .time-option:focus-visible {
      outline: none;
      box-shadow: 0 0 0 2px var(--cg-overlay-accent-strong);
    }

    /* ── Period toggle (AM/PM) ── */
    .period-toggle {
      display: flex;
      flex-direction: column;
      gap: var(--cg-spacing-4);
      align-items: center;
      padding-top: var(--cg-spacing-24);
    }
    .period-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: var(--cg-spacing-48);
      height: var(--cg-spacing-32);
      border: var(--cg-border-width-50) solid var(--cg-color-input-border-default);
      background: transparent;
      color: var(--cg-color-surface-container-text);
      font-size: var(--cg-font-size-xs);
      font-family: inherit;
      font-weight: var(--cg-font-weight-medium);
      border-radius: var(--cg-border-radius-50);
      cursor: pointer;
      transition:
        background-color var(--cg-transition-duration-fast) var(--cg-transition-easing-default),
        border-color var(--cg-transition-duration-fast) var(--cg-transition-easing-default),
        color var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
    }
    .period-btn:hover { border-color: var(--cg-color-input-border-hover); }
    .period-btn:active { transform: scale(var(--cg-interaction-press-scale)); }
    .period-btn:focus-visible {
      outline: none;
      box-shadow: 0 0 0 2px var(--cg-overlay-accent-strong);
    }
    .period-btn.active {
      background: var(--cg-color-action-primary-background-default);
      color: var(--cg-color-action-primary-text-default);
      border-color: var(--cg-color-action-primary-border-default);
    }

    /* ── Divider ── */
    .time-divider {
      width: var(--cg-border-width-50);
      align-self: stretch;
      background: var(--cg-color-input-border-default);
      margin: var(--cg-spacing-24) 0 0;
    }

    /* ── Helper ── */
    .helper {
      font-size: var(--cg-font-size-xs);
      color: var(--cg-color-input-text-placeholder);
      padding: var(--cg-spacing-4) 0 0;
    }
    :host([error]) .helper { color: var(--cg-color-status-error-text-default); }
    :host([success]) .helper { color: var(--cg-color-status-success-text-default); }
  `];

  @property() label = '';
  @property() value = '';
  @property() placeholder = 'Select time';
  @property() name = '';
  @property() helper = '';
  @property({ reflect: true }) size: 'md' | 'lg' = 'md';
  @property({ reflect: true }) rounded: 'none' | 'sm' | 'md' | 'lg' = 'lg';
  @property({ type: Boolean }) disabled = false;
  @property({ type: Boolean, reflect: true }) error = false;
  @property({ type: Boolean, reflect: true }) success = false;
  /** Use 12-hour format with AM/PM toggle */
  @property({ type: Boolean }) use12h = false;
  /** Minute step interval (1, 5, 10, 15, 30) */
  @property({ type: Number }) step = 5;

  @state() private _open = false;
  @state() private _selectedHour = -1;
  @state() private _selectedMinute = -1;
  @state() private _period: 'AM' | 'PM' = 'AM';

  private _toggle() {
    if (this.disabled) return;
    this._open = !this._open;
    if (this._open && this.value) {
      this._parseValue();
    }
  }

  private _close() { this._open = false; }

  private _parseValue() {
    if (!this.value) return;
    const [h, m] = this.value.split(':').map(Number);
    if (this.use12h) {
      this._period = h! >= 12 ? 'PM' : 'AM';
      this._selectedHour = h! === 0 ? 12 : h! > 12 ? h! - 12 : h!;
    } else {
      this._selectedHour = h!;
    }
    this._selectedMinute = m!;
  }

  private _selectHour(h: number) {
    this._selectedHour = h;
    this._emitValue();
  }

  private _selectMinute(m: number) {
    this._selectedMinute = m;
    this._emitValue();
  }

  private _setPeriod(p: 'AM' | 'PM') {
    this._period = p;
    if (this._selectedHour >= 0) this._emitValue();
  }

  private _emitValue() {
    if (this._selectedHour < 0 || this._selectedMinute < 0) return;

    let h = this._selectedHour;
    if (this.use12h) {
      if (this._period === 'AM' && h === 12) h = 0;
      else if (this._period === 'PM' && h !== 12) h += 12;
    }

    this.value = `${String(h).padStart(2, '0')}:${String(this._selectedMinute).padStart(2, '0')}`;
    this.dispatchEvent(new CustomEvent('cg-change', { detail: { value: this.value }, bubbles: true, composed: true }));
  }

  private _formatDisplay(): string {
    if (!this.value) return '';
    const [h, m] = this.value.split(':').map(Number);
    if (this.use12h) {
      const period = h! >= 12 ? 'PM' : 'AM';
      const h12 = h! === 0 ? 12 : h! > 12 ? h! - 12 : h!;
      return `${h12}:${String(m).padStart(2, '0')} ${period}`;
    }
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
  }

  private _getHours(): number[] {
    if (this.use12h) return Array.from({ length: 12 }, (_, i) => i + 1);
    return Array.from({ length: 24 }, (_, i) => i);
  }

  private _getMinutes(): number[] {
    const s = Math.max(1, Math.min(30, this.step));
    return Array.from({ length: Math.ceil(60 / s) }, (_, i) => i * s);
  }

  private _handleClickOutside = (e: Event) => {
    if (!e.composedPath().includes(this)) this._close();
  };

  private _handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape') { this._close(); return; }
    if (e.key === 'Enter' || e.key === ' ') {
      if (!this._open) { e.preventDefault(); this._toggle(); }
    }
  }

  override connectedCallback() { super.connectedCallback(); document.addEventListener('click', this._handleClickOutside); }
  override disconnectedCallback() { super.disconnectedCallback(); document.removeEventListener('click', this._handleClickOutside); }

  override render() {
    const display = this._formatDisplay();
    const hours = this._getHours();
    const minutes = this._getMinutes();

    return html`
      ${this.label ? html`<div class="label">${this.label}</div>` : nothing}
      <div
        class="trigger ${this._open ? 'open' : ''} ${this.disabled ? 'disabled' : ''}"
        tabindex=${this.disabled ? '-1' : '0'}
        role="combobox"
        aria-expanded=${this._open}
        aria-haspopup="dialog"
        aria-controls="cg-tp-popover"
        aria-label=${this.label || 'Time picker'}
        @click=${this._toggle}
        @keydown=${this._handleKeydown}
      >
        <span class="trigger-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
          </svg>
        </span>
        <span class="trigger-text ${!display ? 'placeholder' : ''}">
          ${display || this.placeholder}
        </span>
      </div>

      <div class="dropdown ${this._open ? 'open' : ''}" id="cg-tp-popover" role="dialog" aria-label="Time selector">
        <div class="time-columns">
          <div class="time-column">
            <span class="time-column-label">Hour</span>
            <div class="time-scroll">
              ${hours.map(h => html`
                <button
                  class="time-option ${this._selectedHour === h ? 'selected' : ''}"
                  @click=${(e: Event) => { e.stopPropagation(); this._selectHour(h); }}
                  aria-label="${h} hours"
                  aria-pressed=${this._selectedHour === h ? 'true' : 'false'}
                >${this.use12h ? h : String(h).padStart(2, '0')}</button>
              `)}
            </div>
          </div>

          <div class="time-divider"></div>

          <div class="time-column">
            <span class="time-column-label">Min</span>
            <div class="time-scroll">
              ${minutes.map(m => html`
                <button
                  class="time-option ${this._selectedMinute === m ? 'selected' : ''}"
                  @click=${(e: Event) => { e.stopPropagation(); this._selectMinute(m); }}
                  aria-label="${m} minutes"
                  aria-pressed=${this._selectedMinute === m ? 'true' : 'false'}
                >${String(m).padStart(2, '0')}</button>
              `)}
            </div>
          </div>

          ${this.use12h ? html`
            <div class="period-toggle">
              <button class="period-btn ${this._period === 'AM' ? 'active' : ''}" aria-pressed=${this._period === 'AM' ? 'true' : 'false'} @click=${(e: Event) => { e.stopPropagation(); this._setPeriod('AM'); }}>AM</button>
              <button class="period-btn ${this._period === 'PM' ? 'active' : ''}" aria-pressed=${this._period === 'PM' ? 'true' : 'false'} @click=${(e: Event) => { e.stopPropagation(); this._setPeriod('PM'); }}>PM</button>
            </div>
          ` : nothing}
        </div>
      </div>
      ${this.helper ? html`<div class="helper">${this.helper}</div>` : nothing}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap { 'cg-time-picker': CgTimePicker; }
}
