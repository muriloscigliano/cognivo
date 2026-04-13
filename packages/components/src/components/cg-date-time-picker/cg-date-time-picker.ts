import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { hostBlock, reducedMotion } from '../../styles/index.js';

/**
 * @element cg-date-time-picker
 * Single-trigger date+time picker. One dropdown with calendar and time columns side by side.
 *
 * @example
 * ```html
 * <cg-date-time-picker label="Event start"></cg-date-time-picker>
 * <cg-date-time-picker label="Deadline" value="2026-04-06T14:30" use12h></cg-date-time-picker>
 * ```
 *
 * @fires {CustomEvent<{value: string, date: string, time: string}>} cg-change - When date or time changes
 */
@customElement('cg-date-time-picker')
export class CgDateTimePicker extends LitElement {
  static override styles = [hostBlock, reducedMotion, css`
    :host { position: relative; }

    .label {
      font-size: var(--cg-font-size-xs);
      color: var(--cg-color-surface-container-text);
      margin-bottom: var(--cg-spacing-4);
      font-weight: var(--cg-font-weight-medium);
    }

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
    :host([success]) .trigger { border-color: var(--cg-color-input-icon-success); }
    :host([success]) .trigger:focus-visible,
    :host([success]) .trigger.open { border-color: var(--cg-color-status-success-text-default); box-shadow: 0 0 0 3px var(--cg-shadow-focus-success); }

    :host([size="lg"]) .trigger { height: var(--cg-component-input-height-lg); padding: 0 var(--cg-spacing-4); font-size: var(--cg-font-size-base); }

    :host([rounded="none"]) .trigger { border-radius: 0; }
    :host([rounded="sm"]) .trigger { border-radius: var(--cg-border-radius-50); }
    :host([rounded="md"]) .trigger { border-radius: var(--cg-border-radius-100); }
    :host([rounded="lg"]) .trigger { border-radius: var(--cg-component-input-radius); }

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
    .trigger-icon svg { width: var(--cg-icon-size-100); height: var(--cg-icon-size-100); }
    .trigger-text {
      flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
      padding: 0 var(--cg-spacing-12);
    }
    .placeholder { color: var(--cg-color-input-text-placeholder); }

    /* ── Dropdown ── */
    .dropdown {
      position: absolute;
      top: 100%;
      left: 0;
      z-index: var(--cg-z-index-200);
      margin-top: var(--cg-spacing-4);
      padding: var(--cg-spacing-16);
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
    .dropdown.open { opacity: 1; transform: translateY(0) scale(1); pointer-events: auto; }

    .dropdown-inner {
      display: flex;
      gap: var(--cg-spacing-16);
    }

    /* ── Calendar side ── */
    .cal-side { min-width: 252px; }

    .cal-header {
      display: flex; align-items: center; justify-content: space-between;
      margin-bottom: var(--cg-spacing-12);
    }
    .cal-title {
      font-size: var(--cg-font-size-sm); font-weight: var(--cg-font-weight-semibold);
      color: var(--cg-color-surface-base-text);
    }
    .cal-nav { display: flex; align-items: center; gap: var(--cg-spacing-4); }
    .cal-btn {
      display: flex; align-items: center; justify-content: center;
      width: var(--cg-spacing-32); height: var(--cg-spacing-32);
      border: none; background: transparent; color: var(--cg-color-surface-container-text);
      border-radius: var(--cg-border-radius-50); cursor: pointer;
      transition: background-color var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
    }
    .cal-btn:hover { background: var(--cg-color-action-secondary-background-hover); }
    .cal-btn:active { transform: scale(var(--cg-interaction-press-scale)); }
    .cal-btn svg { width: var(--cg-icon-size-100); height: var(--cg-icon-size-100); }

    .cal-weekdays { display: grid; grid-template-columns: repeat(7, 1fr); margin-bottom: var(--cg-spacing-4); }
    .cal-weekday {
      font-size: var(--cg-font-size-xs); font-weight: var(--cg-font-weight-medium);
      color: var(--cg-color-input-text-placeholder); text-align: center; padding: var(--cg-spacing-4) 0;
    }

    .cal-days { display: grid; grid-template-columns: repeat(7, 1fr); gap: var(--cg-spacing-2); }
    .cal-day {
      display: flex; align-items: center; justify-content: center;
      width: var(--cg-spacing-32); height: var(--cg-spacing-32); margin: 0 auto;
      border: none; background: transparent; color: var(--cg-color-surface-base-text);
      font-size: var(--cg-font-size-xs); font-family: inherit;
      border-radius: var(--cg-border-radius-50); cursor: pointer;
      transition:
        background-color var(--cg-transition-duration-fast) var(--cg-transition-easing-default),
        color var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
    }
    .cal-day:hover { background: var(--cg-color-action-secondary-background-hover); }
    .cal-day:active { transform: scale(var(--cg-interaction-press-scale)); }
    .cal-day.today { border: var(--cg-border-width-50) solid var(--cg-color-input-border-focus); font-weight: var(--cg-font-weight-semibold); }
    .cal-day.selected { background: var(--cg-color-action-primary-background-default); color: var(--cg-color-action-primary-text-default); font-weight: var(--cg-font-weight-semibold); }
    .cal-day.selected:hover { background: var(--cg-color-action-primary-background-default); }
    .cal-day.outside { color: var(--cg-color-input-text-placeholder); opacity: 0.5; }
    .cal-day.disabled-day { opacity: 0.3; pointer-events: none; }
    .cal-day:focus-visible { outline: none; box-shadow: 0 0 0 2px var(--cg-overlay-accent-strong); }

    /* ── Divider ── */
    .panel-divider {
      width: var(--cg-border-width-50);
      background: var(--cg-color-input-border-default);
      align-self: stretch;
    }

    /* ── Time side ── */
    .time-side { min-width: 100px; display: flex; flex-direction: column; }
    .time-side-label {
      font-size: var(--cg-font-size-xs); font-weight: var(--cg-font-weight-semibold);
      color: var(--cg-color-surface-base-text); margin-bottom: var(--cg-spacing-12);
    }
    .time-columns { display: flex; gap: var(--cg-spacing-8); flex: 1; }

    .time-column { flex: 1; display: flex; flex-direction: column; align-items: center; }
    .time-column-label {
      font-size: var(--cg-font-size-xs); font-weight: var(--cg-font-weight-medium);
      color: var(--cg-color-input-text-placeholder); margin-bottom: var(--cg-spacing-8);
      text-transform: uppercase; letter-spacing: var(--cg-letter-spacing-wide);
    }
    .time-scroll {
      display: flex; flex-direction: column; gap: var(--cg-spacing-2);
      max-height: 200px; overflow-y: auto; width: 100%;
      scrollbar-width: thin; scrollbar-color: var(--cg-color-input-border-default) transparent;
    }
    .time-option {
      display: flex; align-items: center; justify-content: center;
      height: var(--cg-spacing-32); border: none; background: transparent;
      color: var(--cg-color-surface-base-text); font-size: var(--cg-font-size-sm);
      font-family: inherit; font-variant-numeric: tabular-nums;
      border-radius: var(--cg-border-radius-50); cursor: pointer;
      transition:
        background-color var(--cg-transition-duration-fast) var(--cg-transition-easing-default),
        color var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
    }
    .time-option:hover { background: var(--cg-color-action-secondary-background-hover); }
    .time-option:active { transform: scale(var(--cg-interaction-press-scale)); }
    .time-option.selected { background: var(--cg-color-action-primary-background-default); color: var(--cg-color-action-primary-text-default); font-weight: var(--cg-font-weight-semibold); }
    .time-option.selected:hover { background: var(--cg-color-action-primary-background-default); }
    .time-option:focus-visible { outline: none; box-shadow: 0 0 0 2px var(--cg-overlay-accent-strong); }

    .time-col-divider {
      width: var(--cg-border-width-50); background: var(--cg-color-input-border-default);
      align-self: stretch; margin-top: var(--cg-spacing-24);
    }

    .period-toggle {
      display: flex; flex-direction: column; gap: var(--cg-spacing-4);
      align-items: center; padding-top: var(--cg-spacing-24);
    }
    .period-btn {
      display: flex; align-items: center; justify-content: center;
      width: var(--cg-spacing-48); height: var(--cg-spacing-32);
      border: var(--cg-border-width-50) solid var(--cg-color-input-border-default);
      background: transparent; color: var(--cg-color-surface-container-text);
      font-size: var(--cg-font-size-xs); font-family: inherit; font-weight: var(--cg-font-weight-medium);
      border-radius: var(--cg-border-radius-50); cursor: pointer;
      transition:
        background-color var(--cg-transition-duration-fast) var(--cg-transition-easing-default),
        border-color var(--cg-transition-duration-fast) var(--cg-transition-easing-default),
        color var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
    }
    .period-btn:hover { border-color: var(--cg-color-input-border-hover); }
    .period-btn.active {
      background: var(--cg-color-action-primary-background-default);
      color: var(--cg-color-action-primary-text-default);
      border-color: var(--cg-color-action-primary-background-default);
    }

    /* ── Helper ── */
    .helper {
      font-size: var(--cg-font-size-xs); color: var(--cg-color-input-text-placeholder);
      padding: var(--cg-spacing-4) 0 0;
    }
    :host([error]) .helper { color: var(--cg-color-status-error-text-default); }
    :host([success]) .helper { color: var(--cg-color-status-success-text-default); }
  `];

  @property() label = '';
  @property() value = '';
  @property() placeholder = 'Select date & time';
  @property() helper = '';
  @property() min = '';
  @property() max = '';
  @property({ reflect: true }) size: 'md' | 'lg' = 'md';
  @property({ reflect: true }) rounded: 'none' | 'sm' | 'md' | 'lg' = 'lg';
  @property({ type: Boolean }) disabled = false;
  @property({ type: Boolean, reflect: true }) error = false;
  @property({ type: Boolean, reflect: true }) success = false;
  @property({ type: Boolean }) use12h = false;
  @property({ type: Number }) step = 5;

  @state() private _open = false;
  @state() private _viewYear = new Date().getFullYear();
  @state() private _viewMonth = new Date().getMonth();
  @state() private _selectedHour = -1;
  @state() private _selectedMinute = -1;
  @state() private _period: 'AM' | 'PM' = 'AM';

  private _weekdays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  private _monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  // ── Parsing ──
  private get _date(): string {
    if (!this.value) return '';
    return this.value.split('T')[0] ?? '';
  }
  private get _time(): string {
    if (!this.value || !this.value.includes('T')) return '';
    return this.value.split('T')[1] ?? '';
  }

  private _toggle() {
    if (this.disabled) return;
    this._open = !this._open;
    if (this._open) {
      if (this._date) {
        const d = new Date(this._date + 'T00:00:00');
        this._viewYear = d.getFullYear();
        this._viewMonth = d.getMonth();
      }
      if (this._time) {
        const [h, m] = this._time.split(':').map(Number);
        if (this.use12h) {
          this._period = h! >= 12 ? 'PM' : 'AM';
          this._selectedHour = h! === 0 ? 12 : h! > 12 ? h! - 12 : h!;
        } else {
          this._selectedHour = h!;
        }
        this._selectedMinute = m!;
      }
    }
  }
  private _close() { this._open = false; }

  // ── Calendar ──
  private _prevMonth() { if (this._viewMonth === 0) { this._viewMonth = 11; this._viewYear--; } else { this._viewMonth--; } }
  private _nextMonth() { if (this._viewMonth === 11) { this._viewMonth = 0; this._viewYear++; } else { this._viewMonth++; } }

  private _selectDay(year: number, month: number, day: number) {
    const date = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const time = this._buildTimeString();
    this.value = `${date}T${time}`;
    this._emit();
  }

  private _isDisabledDate(y: number, m: number, d: number): boolean {
    const s = `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    if (this.min && s < this.min.split('T')[0]!) return true;
    if (this.max && s > this.max.split('T')[0]!) return true;
    return false;
  }

  private _getDays() {
    const year = this._viewYear;
    const month = this._viewMonth;
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrev = new Date(year, month, 0).getDate();
    const today = new Date();
    const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

    const days: { day: number; month: number; year: number; outside: boolean; today: boolean; selected: boolean; disabled: boolean }[] = [];

    for (let i = firstDay - 1; i >= 0; i--) {
      const d = daysInPrev - i; const pm = month === 0 ? 11 : month - 1; const py = month === 0 ? year - 1 : year;
      const ds = `${py}-${String(pm + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      days.push({ day: d, month: pm, year: py, outside: true, today: ds === todayStr, selected: this._date === ds, disabled: this._isDisabledDate(py, pm, d) });
    }
    for (let d = 1; d <= daysInMonth; d++) {
      const ds = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      days.push({ day: d, month, year, outside: false, today: ds === todayStr, selected: this._date === ds, disabled: this._isDisabledDate(year, month, d) });
    }
    const remaining = 42 - days.length;
    for (let d = 1; d <= remaining; d++) {
      const nm = month === 11 ? 0 : month + 1; const ny = month === 11 ? year + 1 : year;
      const ds = `${ny}-${String(nm + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      days.push({ day: d, month: nm, year: ny, outside: true, today: ds === todayStr, selected: this._date === ds, disabled: this._isDisabledDate(ny, nm, d) });
    }
    return days;
  }

  // ── Time ──
  private _getHours(): number[] {
    return this.use12h ? Array.from({ length: 12 }, (_, i) => i + 1) : Array.from({ length: 24 }, (_, i) => i);
  }
  private _getMinutes(): number[] {
    const s = Math.max(1, Math.min(30, this.step));
    return Array.from({ length: Math.ceil(60 / s) }, (_, i) => i * s);
  }

  private _selectHour(h: number) { this._selectedHour = h; this._updateTimeInValue(); }
  private _selectMinute(m: number) { this._selectedMinute = m; this._updateTimeInValue(); }
  private _setPeriod(p: 'AM' | 'PM') { this._period = p; if (this._selectedHour >= 0) this._updateTimeInValue(); }

  private _buildTimeString(): string {
    if (this._selectedHour < 0 || this._selectedMinute < 0) return '00:00';
    let h = this._selectedHour;
    if (this.use12h) {
      if (this._period === 'AM' && h === 12) h = 0;
      else if (this._period === 'PM' && h !== 12) h += 12;
    }
    return `${String(h).padStart(2, '0')}:${String(this._selectedMinute).padStart(2, '0')}`;
  }

  private _updateTimeInValue() {
    if (this._selectedHour < 0 || this._selectedMinute < 0) return;
    const date = this._date || new Date().toISOString().slice(0, 10);
    const time = this._buildTimeString();
    this.value = `${date}T${time}`;
    this._emit();
  }

  private _emit() {
    this.dispatchEvent(new CustomEvent('cg-change', {
      detail: { value: this.value, date: this._date, time: this._time },
      bubbles: true, composed: true,
    }));
  }

  // ── Display ──
  private _formatDisplay(): string {
    if (!this.value) return '';
    const parts: string[] = [];
    if (this._date) {
      const d = new Date(this._date + 'T00:00:00');
      parts.push(d.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }));
    }
    if (this._time) {
      const [h, m] = this._time.split(':').map(Number);
      if (this.use12h) {
        const period = h! >= 12 ? 'PM' : 'AM';
        const h12 = h! === 0 ? 12 : h! > 12 ? h! - 12 : h!;
        parts.push(`${h12}:${String(m).padStart(2, '0')} ${period}`);
      } else {
        parts.push(`${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`);
      }
    }
    return parts.join(', ');
  }

  private _handleClickOutside = (e: Event) => { if (!e.composedPath().includes(this)) this._close(); };
  private _handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape') { this._close(); return; }
    if ((e.key === 'Enter' || e.key === ' ') && !this._open) { e.preventDefault(); this._toggle(); }
  }

  override connectedCallback() { super.connectedCallback(); document.addEventListener('click', this._handleClickOutside); }
  override disconnectedCallback() { super.disconnectedCallback(); document.removeEventListener('click', this._handleClickOutside); }

  override render() {
    const display = this._formatDisplay();
    const days = this._getDays();
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
        aria-label=${this.label || 'Date and time picker'}
        @click=${this._toggle}
        @keydown=${this._handleKeydown}
      >
        <span class="trigger-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
            <circle cx="16" cy="16" r="2.5"></circle>
            <polyline points="16 14.5 16 16 17 16.5"></polyline>
          </svg>
        </span>
        <span class="trigger-text ${!display ? 'placeholder' : ''}">${display || this.placeholder}</span>
      </div>

      <div class="dropdown ${this._open ? 'open' : ''}" role="dialog" aria-label="Date and time selector">
        <div class="dropdown-inner">
          <!-- Calendar -->
          <div class="cal-side">
            <div class="cal-header">
              <button class="cal-btn" @click=${this._prevMonth} aria-label="Previous month">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M15 18l-6-6 6-6"></path></svg>
              </button>
              <span class="cal-title">${this._monthNames[this._viewMonth]} ${this._viewYear}</span>
              <button class="cal-btn" @click=${this._nextMonth} aria-label="Next month">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M9 18l6-6-6-6"></path></svg>
              </button>
            </div>
            <div class="cal-weekdays">${this._weekdays.map(d => html`<span class="cal-weekday">${d}</span>`)}</div>
            <div class="cal-days">
              ${days.map(d => html`
                <button class="cal-day ${d.today ? 'today' : ''} ${d.selected ? 'selected' : ''} ${d.outside ? 'outside' : ''} ${d.disabled ? 'disabled-day' : ''}"
                  @click=${(e: Event) => { e.stopPropagation(); this._selectDay(d.year, d.month, d.day); }}
                  ?disabled=${d.disabled} aria-label="${d.day} ${this._monthNames[d.month]} ${d.year}" aria-selected=${d.selected ? 'true' : 'false'}
                >${d.day}</button>
              `)}
            </div>
          </div>

          <div class="panel-divider"></div>

          <!-- Time -->
          <div class="time-side">
            <span class="time-side-label">Time</span>
            <div class="time-columns">
              <div class="time-column">
                <span class="time-column-label">Hr</span>
                <div class="time-scroll">
                  ${hours.map(h => html`
                    <button class="time-option ${this._selectedHour === h ? 'selected' : ''}"
                      @click=${(e: Event) => { e.stopPropagation(); this._selectHour(h); }}
                      aria-selected=${this._selectedHour === h ? 'true' : 'false'}
                    >${this.use12h ? h : String(h).padStart(2, '0')}</button>
                  `)}
                </div>
              </div>
              <div class="time-col-divider"></div>
              <div class="time-column">
                <span class="time-column-label">Min</span>
                <div class="time-scroll">
                  ${minutes.map(m => html`
                    <button class="time-option ${this._selectedMinute === m ? 'selected' : ''}"
                      @click=${(e: Event) => { e.stopPropagation(); this._selectMinute(m); }}
                      aria-selected=${this._selectedMinute === m ? 'true' : 'false'}
                    >${String(m).padStart(2, '0')}</button>
                  `)}
                </div>
              </div>
              ${this.use12h ? html`
                <div class="period-toggle">
                  <button class="period-btn ${this._period === 'AM' ? 'active' : ''}" @click=${(e: Event) => { e.stopPropagation(); this._setPeriod('AM'); }}>AM</button>
                  <button class="period-btn ${this._period === 'PM' ? 'active' : ''}" @click=${(e: Event) => { e.stopPropagation(); this._setPeriod('PM'); }}>PM</button>
                </div>
              ` : nothing}
            </div>
          </div>
        </div>
      </div>
      ${this.helper ? html`<div class="helper">${this.helper}</div>` : nothing}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap { 'cg-date-time-picker': CgDateTimePicker; }
}
