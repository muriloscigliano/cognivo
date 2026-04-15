import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { hostBlock, reducedMotion } from '../../styles/index.js';

/**
 * @element cg-calendar
 * Full month calendar view with single/range/multiple selection modes,
 * keyboard navigation, and min/max bounds.
 *
 * @example
 * ```html
 * <cg-calendar value="2026-04-15"></cg-calendar>
 * <cg-calendar mode="range" value="2026-04-10" range-end="2026-04-20"></cg-calendar>
 * ```
 *
 * @fires {CustomEvent<{value: string, rangeEnd?: string}>} cg-calendar-change
 */
@customElement('cg-calendar')
export class CgCalendar extends LitElement {
  static override styles = [hostBlock, reducedMotion, css`
    :host { display: inline-block; }

    .calendar {
      padding: var(--cg-spacing-16);
      background: var(--cg-color-surface-cards-background);
      border: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
      border-radius: var(--cg-component-calendar-radius);
    }

    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: var(--cg-spacing-12);
    }
    .nav-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: var(--cg-spacing-32);
      height: var(--cg-spacing-32);
      border: none;
      background: transparent;
      color: var(--cg-color-surface-base-text);
      cursor: pointer;
      border-radius: var(--cg-border-radius-100);
      transition:
        background-color var(--cg-transition-duration-fast) var(--cg-transition-easing-default),
        transform var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
    }
    .nav-btn:hover { background: var(--cg-color-action-tertiary-background-hover); }
    .nav-btn:focus-visible {
      outline: none;
      box-shadow:
        0 0 0 2px var(--cg-color-focus-ring-offset),
        0 0 0 4px var(--cg-color-focus-ring);
    }

    .month-year {
      font-size: var(--cg-font-size-sm);
      font-weight: var(--cg-font-weight-semibold);
      color: var(--cg-color-surface-base-text);
    }

    .weekdays {
      display: grid;
      grid-template-columns: repeat(7, var(--cg-component-calendar-cell-size));
      gap: var(--cg-spacing-2);
      margin-bottom: var(--cg-spacing-8);
    }
    .weekday {
      display: flex;
      align-items: center;
      justify-content: center;
      height: var(--cg-spacing-32);
      font-size: var(--cg-font-size-xs);
      font-weight: var(--cg-font-weight-medium);
      color: var(--cg-color-surface-container-outlined);
    }

    .days {
      display: grid;
      grid-template-columns: repeat(7, var(--cg-component-calendar-cell-size));
      gap: var(--cg-spacing-2);
    }
    .day {
      display: flex;
      align-items: center;
      justify-content: center;
      width: var(--cg-component-calendar-cell-size);
      height: var(--cg-component-calendar-cell-size);
      border: none;
      background: transparent;
      color: var(--cg-color-surface-base-text);
      font-size: var(--cg-font-size-sm);
      cursor: pointer;
      border-radius: var(--cg-border-radius-full);
      transition:
        background-color var(--cg-transition-duration-fast) var(--cg-transition-easing-default),
        color var(--cg-transition-duration-fast) var(--cg-transition-easing-default),
        transform var(--cg-transition-duration-fast) var(--cg-transition-easing-default),
        box-shadow var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
    }
    .day:hover:not(:disabled) {
      background: var(--cg-color-action-tertiary-background-hover);
    }
    .day:active:not(:disabled) {
      transform: scale(0.92);
    }
    .nav-btn:active { transform: scale(0.92); }
    .day:focus-visible {
      outline: none;
      box-shadow:
        0 0 0 2px var(--cg-color-focus-ring-offset),
        0 0 0 4px var(--cg-color-focus-ring);
    }
    .day.outside {
      color: var(--cg-color-surface-container-outlined);
      opacity: 0.5;
    }
    .day.today:not(.selected):not(.range-start):not(.range-end) {
      box-shadow: inset 0 0 0 var(--cg-border-width-50) var(--cg-color-action-primary-background-default);
      color: var(--cg-color-action-primary-background-default);
      font-weight: var(--cg-font-weight-semibold);
    }
    .day.selected {
      background: var(--cg-color-action-primary-background-default);
      color: var(--cg-color-action-primary-text-default);
      font-weight: var(--cg-font-weight-semibold);
    }
    .day.in-range {
      background: var(--cg-overlay-accent-light);
      border-radius: 0;
    }
    .day.range-start {
      background: var(--cg-color-action-primary-background-default);
      color: var(--cg-color-action-primary-text-default);
      border-radius: var(--cg-border-radius-100) 0 0 var(--cg-border-radius-100);
    }
    .day.range-end {
      background: var(--cg-color-action-primary-background-default);
      color: var(--cg-color-action-primary-text-default);
      border-radius: 0 var(--cg-border-radius-100) var(--cg-border-radius-100) 0;
    }
    .day:disabled {
      opacity: 0.3;
      cursor: not-allowed;
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

  @property() value = '';
  @property({ attribute: 'range-end' }) rangeEnd = '';
  @property() mode: 'single' | 'range' | 'multiple' = 'single';
  @property() min = '';
  @property() max = '';
  @property({ type: Number, attribute: 'week-starts-on' }) weekStartsOn: 0 | 1 = 0;
  @property() name = '';

  @state() private _displayYear = new Date().getFullYear();
  @state() private _displayMonth = new Date().getMonth();

  override connectedCallback(): void {
    super.connectedCallback();
    if (this.value) {
      const d = this._parseDate(this.value);
      if (d) {
        this._displayYear = d.getFullYear();
        this._displayMonth = d.getMonth();
      }
    }
  }

  override updated(changed: Map<string, unknown>): void {
    if (changed.has('value')) {
      this._internals?.setFormValue(this.value);
      // Jump to the month containing the new value
      if (this.value) {
        const d = this._parseDate(this.value);
        if (d) {
          this._displayYear = d.getFullYear();
          this._displayMonth = d.getMonth();
        }
      }
    }
  }

  private _parseDate(iso: string): Date | null {
    if (!iso) return null;
    const parts = iso.split('-');
    if (parts.length !== 3) return null;
    const year = parseInt(parts[0]!, 10);
    const month = parseInt(parts[1]!, 10) - 1;
    const day = parseInt(parts[2]!, 10);
    if (isNaN(year) || isNaN(month) || isNaN(day)) return null;
    return new Date(year, month, day);
  }

  private _formatISO(date: Date): string {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }

  private _getDaysInMonth(year: number, month: number): number {
    return new Date(year, month + 1, 0).getDate();
  }

  private _getFirstDayOfWeek(year: number, month: number): number {
    const day = new Date(year, month, 1).getDay();
    return (day - this.weekStartsOn + 7) % 7;
  }

  private _isToday(date: Date): boolean {
    const today = new Date();
    return date.getFullYear() === today.getFullYear() &&
           date.getMonth() === today.getMonth() &&
           date.getDate() === today.getDate();
  }

  private _isSameDay(a: Date, b: Date): boolean {
    return a.getFullYear() === b.getFullYear() &&
           a.getMonth() === b.getMonth() &&
           a.getDate() === b.getDate();
  }

  private _isDisabled(date: Date): boolean {
    if (this.min) {
      const min = this._parseDate(this.min);
      if (min && date < min) return true;
    }
    if (this.max) {
      const max = this._parseDate(this.max);
      if (max && date > max) return true;
    }
    return false;
  }

  private _prevMonth(): void {
    if (this._displayMonth === 0) {
      this._displayMonth = 11;
      this._displayYear--;
    } else {
      this._displayMonth--;
    }
  }

  private _nextMonth(): void {
    if (this._displayMonth === 11) {
      this._displayMonth = 0;
      this._displayYear++;
    } else {
      this._displayMonth++;
    }
  }

  private _onGridKeydown(e: KeyboardEvent): void {
    const target = e.target as HTMLElement;
    if (!target || !target.classList.contains('day')) return;
    const buttons = Array.from(
      this.shadowRoot?.querySelectorAll<HTMLButtonElement>('.day:not(:disabled)') ?? [],
    );
    const idx = buttons.indexOf(target as HTMLButtonElement);
    if (idx < 0) return;
    let next = idx;
    switch (e.key) {
      case 'ArrowLeft': next = Math.max(0, idx - 1); break;
      case 'ArrowRight': next = Math.min(buttons.length - 1, idx + 1); break;
      case 'ArrowUp': next = Math.max(0, idx - 7); break;
      case 'ArrowDown': next = Math.min(buttons.length - 1, idx + 7); break;
      case 'Home': next = 0; break;
      case 'End': next = buttons.length - 1; break;
      case 'PageUp': e.preventDefault(); this._prevMonth(); return;
      case 'PageDown': e.preventDefault(); this._nextMonth(); return;
      default: return;
    }
    e.preventDefault();
    buttons[next]?.focus();
  }

  private _selectDate(date: Date): void {
    if (this._isDisabled(date)) return;
    const iso = this._formatISO(date);

    if (this.mode === 'range') {
      if (!this.value || (this.value && this.rangeEnd)) {
        // Start new range
        this.value = iso;
        this.rangeEnd = '';
      } else {
        // Complete range
        const start = this._parseDate(this.value);
        if (start && date < start) {
          this.rangeEnd = this.value;
          this.value = iso;
        } else {
          this.rangeEnd = iso;
        }
      }
    } else {
      this.value = iso;
    }

    this.dispatchEvent(new CustomEvent('cg-calendar-change', {
      detail: { value: this.value, rangeEnd: this.rangeEnd },
      bubbles: true,
      composed: true,
    }));
  }

  private _getWeekdayNames(): string[] {
    const names = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    if (this.weekStartsOn === 1) {
      return [...names.slice(1), names[0]!];
    }
    return names;
  }

  private _getMonthName(): string {
    return new Date(this._displayYear, this._displayMonth, 1).toLocaleString('default', { month: 'long' });
  }

  private _getDayClasses(date: Date, isOutside: boolean): string {
    const classes = ['day'];
    if (isOutside) classes.push('outside');
    if (this._isToday(date)) classes.push('today');

    const selected = this._parseDate(this.value);
    const rangeEnd = this._parseDate(this.rangeEnd);

    if (this.mode === 'range') {
      if (selected && this._isSameDay(date, selected)) {
        classes.push(rangeEnd ? 'range-start' : 'selected');
      } else if (rangeEnd && this._isSameDay(date, rangeEnd)) {
        classes.push('range-end');
      } else if (selected && rangeEnd && date > selected && date < rangeEnd) {
        classes.push('in-range');
      }
    } else {
      if (selected && this._isSameDay(date, selected)) classes.push('selected');
    }

    return classes.join(' ');
  }

  override render() {
    const daysInMonth = this._getDaysInMonth(this._displayYear, this._displayMonth);
    const firstDayOffset = this._getFirstDayOfWeek(this._displayYear, this._displayMonth);
    const prevDaysInMonth = this._getDaysInMonth(this._displayYear, this._displayMonth - 1);

    const cells: Array<{ date: Date; outside: boolean }> = [];

    // Previous month outside days
    for (let i = firstDayOffset - 1; i >= 0; i--) {
      const date = new Date(this._displayYear, this._displayMonth - 1, prevDaysInMonth - i);
      cells.push({ date, outside: true });
    }

    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(this._displayYear, this._displayMonth, i);
      cells.push({ date, outside: false });
    }

    // Next month outside days (fill to 42 cells = 6 rows)
    while (cells.length < 42) {
      const lastDate = cells[cells.length - 1]!.date;
      const date = new Date(lastDate.getFullYear(), lastDate.getMonth(), lastDate.getDate() + 1);
      cells.push({ date, outside: true });
    }

    return html`
      <div class="calendar" role="grid" aria-label=${`${this._getMonthName()} ${this._displayYear}`}>
        <div class="header">
          <button class="nav-btn" type="button" aria-label="Previous month" @click=${this._prevMonth}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M9 3L5 7l4 4"/>
            </svg>
          </button>
          <div class="month-year">${this._getMonthName()} ${this._displayYear}</div>
          <button class="nav-btn" type="button" aria-label="Next month" @click=${this._nextMonth}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M5 3l4 4-4 4"/>
            </svg>
          </button>
        </div>
        <div class="weekdays">
          ${this._getWeekdayNames().map(name => html`<div class="weekday">${name}</div>`)}
        </div>
        <div class="days" @keydown=${this._onGridKeydown}>
          ${cells.map(cell => html`
            <button
              class=${this._getDayClasses(cell.date, cell.outside)}
              role="gridcell"
              aria-selected=${this._parseDate(this.value) && this._isSameDay(cell.date, this._parseDate(this.value)!) ? 'true' : 'false'}
              ?disabled=${this._isDisabled(cell.date)}
              @click=${() => this._selectDate(cell.date)}
            >${cell.date.getDate()}</button>
          `)}
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cg-calendar': CgCalendar;
  }
}
