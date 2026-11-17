import { LitElement, html, css, nothing, type PropertyValues } from 'lit';
import { property, state } from 'lit/decorators.js';
import { customElement } from '../../utils/define.js';
import { formInternals } from '../../utils/form-internals.js';
import { messageFor, setValueMissing, type ValidationMessages, reportFormValidity } from '../../utils/validation.js';
import { hostBlock, reducedMotion } from '../../styles/index.js';
import { defineMessages, Messages } from '../../utils/messages.js';

const MESSAGES = defineMessages('cg-date-time-picker', {
  placeholder: 'Select date & time',
  label: 'Date and time picker',
  dialog: 'Date and time selector',
  previousMonth: 'Previous month',
  nextMonth: 'Next month',
  time: 'Time',
  hour: 'Hr',
  minute: 'Min',
  am: 'AM',
  pm: 'PM',
  /** Accessible names of the hour and minute lists. */
  hours: 'Hours',
  minutes: 'Minutes',
});

const pad = (n: number) => String(n).padStart(2, '0');
const VALUE = /^(\d{4}-\d{2}-\d{2})(?:T(\d{2}:\d{2})(?::\d{2}(?:\.\d+)?)?(Z|[+-]\d{2}:?\d{2})?)?$/;

/** Wall-clock parts of an instant in a time zone. */
function wallParts(ms: number, timeZone: string): { date: string; time: string; utc: number } {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone, hourCycle: 'h23', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit',
  }).formatToParts(ms);
  const g = (t: string) => Number(parts.find((p) => p.type === t)!.value);
  const utc = Date.UTC(g('year'), g('month') - 1, g('day'), g('hour'), g('minute'), g('second'));
  return { date: `${g('year')}-${pad(g('month'))}-${pad(g('day'))}`, time: `${pad(g('hour'))}:${pad(g('minute'))}`, utc };
}

/**
 * The instant (ms) of a wall-clock date + time in a time zone (DST-aware),
 * the same way every time (Temporal's "compatible"):
 * - a wall time that happens twice (the clocks go back) is the EARLIER
 *   instant — the offset before the change (New York 01:30 on 2026-11-01 is
 *   -04:00);
 * - a wall time that never happens (the clocks go forward) moves forward by
 *   the gap — read with the offset before the change (New York 02:30 on
 *   2026-03-08 is 03:30 -04:00; London 01:30 on 2026-03-29 is 02:30 +01:00).
 */
function zonedInstant(date: string, time: string, timeZone: string): number {
  const [y, mo, d] = date.split('-').map(Number);
  const [h, mi] = time.split(':').map(Number);
  const wall = Date.UTC(y!, mo! - 1, d!, h!, mi!);
  const offset = (ms: number) => wallParts(ms, timeZone).utc - Math.floor(ms / 1000) * 1000;
  // The offsets a day either side cover any one transition.
  const before = offset(wall - 864e5);
  const fits = [before, offset(wall + 864e5)].map((o) => wall - o).filter((ms) => wallParts(ms, timeZone).utc === wall);
  return fits.length ? Math.min(...fits) : wall - before;
}

/** "+hh:mm" / "-hh:mm" offset of a time zone at an instant. */
function offsetString(ms: number, timeZone: string): string {
  const mins = Math.round((wallParts(ms, timeZone).utc - Math.floor(ms / 1000) * 1000) / 60000);
  const a = Math.abs(mins);
  return `${mins < 0 ? '-' : '+'}${pad(Math.floor(a / 60))}:${pad(a % 60)}`;
}

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
 * For dated steps: a form field (`name`, `required`, reset, FormData, the
 * in-place invalid state of cg-input). `time-zone` (IANA, e.g.
 * `America/Sao_Paulo`) says which zone the wall time is in: the value then
 * carries that zone's offset for the date (`2027-01-31T09:00:00-03:00`,
 * daylight saving included), an instant with an offset (`…Z`, `…+01:00`) is
 * shown as wall time in the zone, and the trigger names the zone in a
 * compact muted suffix: "Jan 31, 2027, 9:00 AM GMT−3" in the page's locale
 * (`lang`). The trigger is as wide as its content, up to its container; the
 * date and time are never cut (the zone suffix gives way first). Without
 * `time-zone` the browser's zone is shown and a value without an offset
 * stays as written (`2027-01-31T09:00`).
 *
 * Daylight saving: a value with an offset keeps its instant until the user
 * edits it (the second 01:30 of a fall-back night stays the second). A wall
 * time the user picks (or a value without an offset) that happens twice
 * takes the earlier offset; one that never happens moves forward by the gap
 * (New York 02:30 on 2026-03-08 → 03:30 -04:00) — the same rule every time.
 * `min` / `max` are instants (time and offset count; a date alone is that
 * whole day in the zone): outside them the field is rangeUnderflow /
 * rangeOverflow, and days wholly outside are disabled (still reachable with
 * the arrows, not pickable). "Today" is the zone's today.
 *
 * Keyboard: Enter / Space / ArrowDown on the trigger opens the calendar on
 * the selected day (or today); the arrows move by day / week, Page Up /
 * Page Down by month, Home / End to the week's start / end, Enter picks the
 * day; the hour and minute lists move with ArrowUp / ArrowDown; Escape
 * closes and returns to the trigger.
 *
 * @fires {CustomEvent<{value: string, date: string, time: string}>} cg-change - When date or time changes
 */
@customElement('cg-date-time-picker')
export class CgDateTimePicker extends LitElement {
  static formAssociated = true;
  private _internals: ElementInternals | undefined;

  constructor() {
    super();
    this._internals = formInternals(this, () => this._trigger?.focus());
  }

  static override styles = [hostBlock, reducedMotion, css`
    :host { position: relative; }

    .label {
      font-size: var(--cg-font-size-xs);
      color: var(--cg-color-surface-container-text);
      margin-bottom: var(--cg-component-input-label-gap);
      font-weight: var(--cg-font-weight-medium);
    }

    /* ── Trigger ── */
    /* As wide as its content (date, time, zone), up to the container. */
    .trigger {
      box-sizing: border-box;
      display: flex;
      width: max-content;
      max-width: 100%;
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
    .trigger:focus-visible { border-color: var(--cg-color-input-border-focus); box-shadow: 0 0 0 var(--cg-border-width-300) var(--cg-color-state-focus-halo); }
    .trigger.open { border-color: var(--cg-color-input-border-focus); box-shadow: 0 0 0 var(--cg-border-width-300) var(--cg-color-state-focus-halo); }
    .trigger.disabled { opacity: var(--cg-opacity-40); pointer-events: none; background: var(--cg-color-input-background-disabled); border-color: var(--cg-color-input-border-disabled); }

    :host(:is([error],[data-invalid])) .trigger { border-color: var(--cg-color-input-border-error); }
    :host(:is([error],[data-invalid])) .trigger:focus-visible,
    :host(:is([error],[data-invalid])) .trigger.open { border-color: var(--cg-color-status-error-text-default); box-shadow: 0 0 0 3px var(--cg-shadow-focus-error); }
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
      color: var(--cg-color-input-text-placeholder); /* a neutral field icon (input-icon-default is an accent) */
      flex-shrink: 0;
      width: var(--cg-spacing-40);
      align-self: stretch;
      background: var(--cg-overlay-dark-subtle);
      border-right: var(--cg-border-width-50) solid var(--cg-color-input-border-default);
      border-radius: var(--cg-component-input-radius) 0 0 var(--cg-component-input-radius);
      margin-left: calc(-1 * var(--cg-spacing-4));
    }
    .trigger-icon svg { width: var(--cg-icon-size-100); height: var(--cg-icon-size-100); }
    /* The shown text stacks over a hidden sizer (a sample date and time with
       the zone), so the trigger is as wide empty as filled. */
    .trigger-body {
      flex: 1; min-width: 0; overflow: hidden; white-space: nowrap;
      display: grid; grid-template-columns: minmax(0, 1fr); align-items: center;
      padding: 0 var(--cg-spacing-12);
    }
    .trigger-body > * { grid-area: 1 / 1; min-width: 0; }
    .trigger-sizer { visibility: hidden; display: flex; align-items: baseline; gap: var(--cg-spacing-6); }
    /* A value: the zone suffix is whole or not shown — when it does not fit it
       wraps to a second, clipped line (the name and tooltip still carry it);
       then the date and time end in an ellipsis. */
    .trigger-text.value { display: flex; flex-wrap: wrap; align-items: baseline; column-gap: var(--cg-spacing-6); height: 1lh; overflow: hidden; }
    .trigger-value { flex: 0 1 auto; min-width: 0; overflow: hidden; text-overflow: ellipsis; }
    .trigger-zone, .sizer-zone { flex: none; font-size: var(--cg-font-size-xs); color: var(--cg-color-input-text-placeholder); }
    .trigger-text.placeholder { overflow: hidden; text-overflow: ellipsis; color: var(--cg-color-input-text-placeholder); }

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
      visibility: hidden;
      transform: translateY(calc(-1 * var(--cg-spacing-4))) scale(0.98);
      pointer-events: none;
      transition:
        opacity var(--cg-transition-duration-fast) var(--cg-transition-easing-default),
        transform var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
    }
    .dropdown.open { opacity: 1; visibility: visible; transform: translateY(0) scale(1); pointer-events: auto; }

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
    .cal-day:hover:not(.selected) { background: var(--cg-color-action-secondary-background-hover); }
    .cal-day:active { transform: scale(var(--cg-interaction-press-scale)); }
    .cal-day.today { border: var(--cg-border-width-50) solid var(--cg-color-input-border-focus); font-weight: var(--cg-font-weight-semibold); }
    .cal-day.selected { background: var(--cg-color-selected-background); color: var(--cg-color-selected-text); font-weight: var(--cg-font-weight-semibold); }
    .cal-day.outside { color: var(--cg-color-input-text-placeholder); opacity: 0.5; }
    .cal-day.disabled-day { opacity: var(--cg-opacity-40); pointer-events: none; }
    .cal-day:focus-visible { outline: none; box-shadow: 0 0 0 2px var(--cg-color-state-focus-halo); }

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
    .time-option:hover:not(.selected) { background: var(--cg-color-action-secondary-background-hover); }
    .time-option:active { transform: scale(var(--cg-interaction-press-scale)); }
    .time-option.selected { background: var(--cg-color-selected-background); color: var(--cg-color-selected-text); font-weight: var(--cg-font-weight-semibold); }
    .time-option:focus-visible { outline: none; box-shadow: 0 0 0 2px var(--cg-color-state-focus-halo); }

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
      background: var(--cg-color-selected-background);
      color: var(--cg-color-selected-text);
      border-color: var(--cg-color-current-indicator);
    }

    /* ── Helper ── */
    .helper {
      font-size: var(--cg-font-size-xs); color: var(--cg-color-input-text-placeholder);
      padding: var(--cg-spacing-4) 0 0;
    }
    :host(:is([error],[data-invalid])) .helper { color: var(--cg-color-status-error-text-default); }
    :host([success]) .helper { color: var(--cg-color-status-success-text-default); }
  `];

  /** Per-element text overrides (JSON attribute); see `setMessages()`. */
  @property({ type: Object }) messages: Partial<typeof MESSAGES> | null = null;

  private i18n = new Messages(this, MESSAGES);

  @property() label = '';
  /** `YYYY-MM-DDTHH:mm` (wall time), or with seconds and an offset. */
  @property() value = '';
  @property({ reflect: true }) name = ''; // reflected: FormData keys a form-associated element by its name ATTRIBUTE
  @property({ type: Boolean }) required = false;
  /** IANA time zone of the wall time (e.g. `America/Sao_Paulo`); default: the browser's. */
  @property({ attribute: 'time-zone' }) timeZone = '';
  /** Per-element validation texts (see cg-input). */
  @property({ type: Object, attribute: 'validation-messages' }) validationMessages: ValidationMessages | null = null;
  @property() placeholder?: string;
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
  /** The validation message shown after an `invalid` event, until valid again. */
  @state() private _invalid = '';
  /** Disabled by an ancestor `<fieldset disabled>`. */
  @state() private _formDisabled = false;
  /** The calendar day that holds the keyboard focus (roving tab stop). */
  @state() private _focusDate = '';

  private get _trigger(): HTMLElement | null { return this.renderRoot?.querySelector?.<HTMLElement>('.trigger') ?? null; }
  private get _disabled(): boolean { return this.disabled || this._formDisabled; }
  /** The zone the wall time is in. */
  private get _zone(): string { return this.timeZone || Intl.DateTimeFormat().resolvedOptions().timeZone; }

  // ── Form association ──
  get validity(): ValidityState | undefined { return this._internals?.validity; }
  get validationMessage(): string { return this._internals?.validationMessage ?? ''; }
  get willValidate(): boolean { return this._internals?.willValidate ?? false; }
  checkValidity(): boolean { return this._internals?.checkValidity() ?? true; }
  reportValidity(): boolean { return this._internals ? reportFormValidity(this._internals) : true; }
  formDisabledCallback(disabled: boolean): void { this._formDisabled = disabled; }
  formResetCallback(): void { this.value = this.getAttribute('value') ?? ''; }
  formStateRestoreCallback(state: string): void { this.value = state; }

  /** The submitted value: with a time zone (or an offset given), the instant as wall time + the
   *  zone's offset at that instant — an offset value keeps its instant (the second 01:30 of a
   *  fall-back night stays the second) until the user edits it. */
  private get _formValue(): string {
    const { date, time, zoned, at } = this._parsed;
    if (!date) return '';
    if (!time) return date;
    if (!(this.timeZone || zoned)) return `${date}T${time}`;
    return this._stamp(at!);
  }
  /** An instant as `YYYY-MM-DDTHH:mm:00±hh:mm` in the zone. */
  private _stamp(at: number): string {
    const w = wallParts(at, this._zone);
    return `${w.date}T${w.time}:00${offsetString(at, this._zone)}`;
  }

  /** `min` / `max` as instants (time and offset included); a date alone is that whole day. */
  private _bound(value: string, end: boolean): number | undefined {
    const b = this._parse(value);
    if (!b.date) return undefined;
    if (b.at !== undefined) return b.at;
    const [y, m, d] = b.date.split('-').map(Number);
    return end ? zonedInstant(new Date(Date.UTC(y!, m! - 1, d! + 1)).toISOString().slice(0, 10), '00:00', this._zone) - 1 : zonedInstant(b.date, '00:00', this._zone);
  }

  override updated(changed: PropertyValues) {
    super.updated(changed);
    if (changed.has('value') || changed.has('timeZone')) this._internals?.setFormValue(this._formValue);
    // Validity: valueMissing, else the instant against min / max.
    const { at, date } = this._parsed;
    const point = at ?? (date ? zonedInstant(date, '00:00', this._zone) : undefined);
    const min = this._bound(this.min, false);
    const max = this._bound(this.max, true);
    const key = point === undefined ? '' : min !== undefined && point < min ? 'rangeUnderflow' : max !== undefined && point > max ? 'rangeOverflow' : '';
    if (key && !(this.required && !this.value)) {
      // The browser's own wording for the bound ("Value must be … or later"), from a
      // datetime-local probe in wall time one minute past it (both 01:30s of a
      // fall-back night read alike, so the value itself cannot be the probe's).
      const probe = document.createElement('input');
      probe.type = 'datetime-local';
      const wall = (ms: number) => { const w = wallParts(ms, this._zone); return `${w.date}T${w.time}`; };
      const bound = key === 'rangeUnderflow' ? min! : max!;
      probe[key === 'rangeUnderflow' ? 'min' : 'max'] = wall(bound);
      probe.value = wall(bound + (key === 'rangeUnderflow' ? -6e4 : 6e4));
      this._internals?.setValidity({ [key]: true }, messageFor(key, this.validationMessages, probe.validationMessage), this._trigger ?? undefined);
    } else {
      setValueMissing(this._internals, this.required && !this.value, this.validationMessages, 'text', this._trigger);
    }
    if (this._invalid) this._invalid = this.validationMessage;
    this.toggleAttribute('data-invalid', !!this._invalid);
  }
  @state() private _viewYear = new Date().getFullYear();
  @state() private _viewMonth = new Date().getMonth();
  @state() private _selectedHour = -1;
  @state() private _selectedMinute = -1;
  @state() private _period: 'AM' | 'PM' = 'AM';

  /** Short weekday names (Sunday first) in the element's locale. */
  private get _weekdays(): string[] {
    const fmt = new Intl.DateTimeFormat(this.i18n.locale, { weekday: 'short' });
    const first = this._firstDay;
    return Array.from({ length: 7 }, (_, i) => fmt.format(new Date(2023, 0, 1 + ((i + first) % 7)))); // 2023-01-01 was a Sunday
  }
  /** Long month names in the element's locale. */
  private get _monthNames(): string[] {
    const fmt = new Intl.DateTimeFormat(this.i18n.locale, { month: 'long' });
    return Array.from({ length: 12 }, (_, i) => fmt.format(new Date(2023, i, 1)));
  }

  // ── Parsing ──
  /** Wall date / time in the zone; `zoned` when the value was an instant with an offset. */
  private get _parsed(): { date: string; time: string; zoned: boolean; at?: number | undefined } {
    return this._parse(this.value);
  }
  /** A value, `min` or `max`: its wall date / time in the zone and, with a time, its instant
   *  (`at`) — the given instant when it has an offset, else the wall time read in the zone. */
  private _parse(value: string): { date: string; time: string; zoned: boolean; at?: number | undefined } {
    const m = VALUE.exec(value);
    if (!m) return { date: '', time: '', zoned: false };
    if (m[2] && m[3]) {
      const at = Date.parse(value);
      if (!Number.isNaN(at)) return { ...wallParts(at, this._zone), zoned: true, at };
    }
    const time = m[2] ?? '';
    return { date: m[1]!, time, zoned: false, at: time ? zonedInstant(m[1]!, time, this._zone) : undefined };
  }
  /** Today's date in the zone. */
  private get _today(): string { return wallParts(Date.now(), this._zone).date; }
  private get _date(): string { return this._parsed.date; }
  private get _time(): string { return this._parsed.time; }
  /** Write a new wall date + time back, keeping the value's form (offset or not). */
  private _setWall(date: string, time: string) {
    const zoned = !!this.timeZone || this._parsed.zoned;
    // An edit resolves the wall time in the zone (zonedInstant: earlier offset / forward over a gap).
    this.value = zoned ? this._stamp(zonedInstant(date, time, this._zone)) : `${date}T${time}`;
  }

  private _toggle() {
    if (this._disabled) return;
    this._open = !this._open;
    if (this._open) {
      this._focusDate = this._date || this._today;
      const [y, m] = this._focusDate.split('-').map(Number);
      this._viewYear = y!;
      this._viewMonth = m! - 1;
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
  private _close(refocus = false) {
    this._open = false;
    if (refocus) void this.updateComplete.then(() => this._trigger?.focus());
  }

  /** Focus the calendar day that holds the tab stop (after the view renders). */
  private _focusDay() {
    // Retried for a few frames: the reduced-motion style gives every element a
    // near-zero transition, so a just-opened panel's children can still be
    // visibility: hidden (not focusable) for a frame or two.
    void this.updateComplete.then(() => {
      let tries = 0;
      const attempt = () => {
        const day = this.renderRoot.querySelector<HTMLElement>('.cal-day[tabindex="0"]');
        day?.focus();
        if (day && (this.renderRoot as ShadowRoot).activeElement !== day && this._open && tries++ < 10) requestAnimationFrame(attempt);
      };
      attempt();
    });
  }

  /** Calendar grid keys: arrows (day / week), Page Up / Down (month), Home / End (week). */
  private _onDayKey(e: KeyboardEvent) {
    const [y, m, d] = this._focusDate.split('-').map(Number);
    const at = new Date(y!, m! - 1, d!);
    const dow = (at.getDay() - this._firstDay + 7) % 7;
    const step: Record<string, () => void> = {
      ArrowLeft: () => at.setDate(at.getDate() - 1),
      ArrowRight: () => at.setDate(at.getDate() + 1),
      ArrowUp: () => at.setDate(at.getDate() - 7),
      ArrowDown: () => at.setDate(at.getDate() + 7),
      Home: () => at.setDate(at.getDate() - dow),
      End: () => at.setDate(at.getDate() + (6 - dow)),
      PageUp: () => at.setMonth(at.getMonth() - 1, Math.min(d!, new Date(at.getFullYear(), at.getMonth(), 0).getDate())),
      PageDown: () => at.setMonth(at.getMonth() + 1, Math.min(d!, new Date(at.getFullYear(), at.getMonth() + 2, 0).getDate())),
    };
    const move = step[e.key];
    if (!move) return;
    e.preventDefault();
    move();
    this._focusDate = `${at.getFullYear()}-${pad(at.getMonth() + 1)}-${pad(at.getDate())}`;
    this._viewYear = at.getFullYear();
    this._viewMonth = at.getMonth();
    this._focusDay();
  }

  /** Hour / minute list keys: ArrowUp / ArrowDown pick the previous / next option. */
  private _onListKey(e: KeyboardEvent, values: number[], current: number, pick: (v: number) => void) {
    if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return;
    e.preventDefault();
    const i = values.indexOf(current);
    const down = e.key === 'ArrowDown';
    // Nothing picked yet: Down lands on the first option, Up on the last.
    const next = values[i < 0 ? (down ? 0 : values.length - 1) : Math.min(values.length - 1, Math.max(0, i + (down ? 1 : -1)))]!;
    pick(next);
    const list = e.currentTarget as HTMLElement;
    void this.updateComplete.then(() => {
      const opt = list.querySelector<HTMLElement>('[aria-selected="true"]');
      opt?.focus();
      opt?.scrollIntoView({ block: 'nearest' });
    });
  }

  /** First day of the week in the element's locale (0 = Sunday). */
  private get _firstDay(): number {
    try {
      const loc = new Intl.Locale(this.i18n.locale) as Intl.Locale & { getWeekInfo?: () => { firstDay: number }; weekInfo?: { firstDay: number } };
      const first = (loc.getWeekInfo?.() ?? loc.weekInfo)?.firstDay;
      return first ? first % 7 : 0;
    } catch {
      return 0;
    }
  }

  // ── Calendar ──
  private _prevMonth() { if (this._viewMonth === 0) { this._viewMonth = 11; this._viewYear--; } else { this._viewMonth--; } }
  private _nextMonth() { if (this._viewMonth === 11) { this._viewMonth = 0; this._viewYear++; } else { this._viewMonth++; } }

  private _selectDay(year: number, month: number, day: number) {
    const date = `${year}-${pad(month + 1)}-${pad(day)}`;
    const time = this._time && this._selectedHour < 0 ? this._time : this._buildTimeString();
    this._focusDate = date;
    this._setWall(date, time);
    this._emit();
  }

  /** A day wholly before `min` or after `max` (compared as instants in the zone). */
  private _isDisabledDate(y: number, m: number, d: number): boolean {
    const s = `${y}-${pad(m + 1)}-${pad(d)}`;
    const min = this._bound(this.min, false);
    const max = this._bound(this.max, true);
    return (min !== undefined && s < wallParts(min, this._zone).date) || (max !== undefined && s > wallParts(max, this._zone).date);
  }

  private _getDays() {
    const year = this._viewYear;
    const month = this._viewMonth;
    const firstDay = (new Date(year, month, 1).getDay() - this._firstDay + 7) % 7;
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrev = new Date(year, month, 0).getDate();
    const todayStr = this._today;

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
    if (this._selectedHour < 0 && this._selectedMinute < 0) return;
    if (this._selectedHour < 0) this._selectedHour = this.use12h ? 12 : 0;
    if (this._selectedMinute < 0) this._selectedMinute = 0;
    this._setWall(this._date || this._today, this._buildTimeString());
    this._emit();
  }

  private _emit() {
    this.dispatchEvent(new CustomEvent('cg-change', {
      detail: { value: this.value, date: this._date, time: this._time },
      bubbles: true, composed: true,
    }));
  }

  // ── Display ──
  /** "Jan 31, 2027, 9:00 AM" and the zone "GMT−3" in the element's locale; the date alone without a time. */
  private _formatDisplay(): { text: string; zone?: string | undefined } {
    const { date, time, at } = this._parsed;
    if (!date) return { text: '' };
    if (!time || at === undefined) return { text: new Date(`${date}T00:00:00`).toLocaleDateString(this.i18n.locale, { month: 'short', day: 'numeric', year: 'numeric' }) };
    return this._formatInstant(at);
  }

  /** "Jan 31, 2027, 9:00 AM" and its zone "GMT−3" (a real minus sign) in the page's locale. */
  private _formatInstant(at: number): { text: string; zone?: string | undefined } {
    const locale = this.i18n.locale;
    const zone = this._zone;
    const text = new Intl.DateTimeFormat(locale, {
      month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit', timeZone: zone, ...(this.use12h ? { hour12: true } : {}),
    }).format(at);
    const name = new Intl.DateTimeFormat(locale, { timeZone: zone, timeZoneName: 'shortOffset' }).formatToParts(at).find((p) => p.type === 'timeZoneName')?.value;
    return { text, zone: name?.replace('-', '\u2212') };
  }

  /** A wide sample value (two-digit day and hour) that sizes the trigger, empty or filled. */
  private _sample() {
    return this._formatInstant(zonedInstant(`${new Date().getFullYear()}-09-28`, '12:58', this._zone));
  }

  private _handleClickOutside = (e: Event) => { if (!e.composedPath().includes(this)) this._close(); };
  private _handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape') {
      // An open popup consumes its Escape, so an enclosing drawer or dialog stays open.
      if (this._open) { e.preventDefault(); e.stopPropagation(); this._close(true); }
      return;
    }
    if ((e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') && !this._open) {
      e.preventDefault();
      this._toggle();
      this._focusDay();
    }
  }

  override connectedCallback() { super.connectedCallback(); document.addEventListener('click', this._handleClickOutside); }
  override disconnectedCallback() { super.disconnectedCallback(); document.removeEventListener('click', this._handleClickOutside); }

  override render() {
    const { text: display, zone } = this._formatDisplay();
    const full = display ? [display, zone].filter(Boolean).join(' ') : '';
    const sample = this._sample();
    const days = this._getDays();
    const hours = this._getHours();
    const minutes = this._getMinutes();
    const dayName = new Intl.DateTimeFormat(this.i18n.locale, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
    const help = this._invalid || this.helper;
    const hourStop = hours.includes(this._selectedHour) ? this._selectedHour : hours[0];
    const minuteStop = minutes.includes(this._selectedMinute) ? this._selectedMinute : minutes[0];

    return html`
      ${this.label ? html`<div class="label">${this.label}</div>` : nothing}
      <div
        class="trigger ${this._open ? 'open' : ''} ${this._disabled ? 'disabled' : ''}"
        tabindex=${this._disabled ? '-1' : '0'}
        role="combobox"
        aria-expanded=${this._open}
        aria-disabled=${this._disabled ? 'true' : nothing}
        aria-invalid=${this.error || this._invalid ? 'true' : nothing}
        aria-required=${this.required ? 'true' : nothing}
        aria-describedby=${this._invalid || this.helper ? 'helper' : nothing}
        aria-haspopup="dialog"
        aria-label=${[this.label || this.i18n.t('label'), full].filter(Boolean).join(', ')}
        title=${full || nothing}
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
        <span class="trigger-body">
          <span class="trigger-sizer" aria-hidden="true">${sample.text} ${sample.zone ? html`<span class="sizer-zone">${sample.zone}</span>` : nothing}</span>
          ${display
            ? html`<span class="trigger-text value"><span class="trigger-value">${display}</span> ${zone ? html`<span class="trigger-zone">${zone}</span>` : nothing}</span>`
            : html`<span class="trigger-text placeholder">${this.placeholder ?? this.i18n.t('placeholder')}</span>`}
        </span>
      </div>

      <div class="dropdown ${this._open ? 'open' : ''}" role="dialog" aria-label=${this.i18n.t('dialog')} @keydown=${this._handleKeydown}>
        <div class="dropdown-inner">
          <!-- Calendar -->
          <div class="cal-side">
            <div class="cal-header">
              <button type="button" class="cal-btn" @click=${this._prevMonth} aria-label=${this.i18n.t('previousMonth')}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M15 18l-6-6 6-6"></path></svg>
              </button>
              <span class="cal-title">${this._monthNames[this._viewMonth]} ${this._viewYear}</span>
              <button type="button" class="cal-btn" @click=${this._nextMonth} aria-label=${this.i18n.t('nextMonth')}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M9 18l6-6-6-6"></path></svg>
              </button>
            </div>
            <div class="cal-weekdays">${this._weekdays.map(d => html`<span class="cal-weekday">${d}</span>`)}</div>
            <div class="cal-days" @keydown=${this._onDayKey}>
              ${days.map(d => {
                const iso = `${d.year}-${pad(d.month + 1)}-${pad(d.day)}`;
                return html`
                <button type="button" class="cal-day ${d.today ? 'today' : ''} ${d.selected ? 'selected' : ''} ${d.outside ? 'outside' : ''} ${d.disabled ? 'disabled-day' : ''}"
                  tabindex=${iso === this._focusDate ? '0' : '-1'}
                  @click=${(e: Event) => { e.stopPropagation(); if (!d.disabled) this._selectDay(d.year, d.month, d.day); }}
                  aria-disabled=${d.disabled ? 'true' : nothing} aria-label=${dayName.format(new Date(d.year, d.month, d.day))}
                  aria-pressed=${d.selected ? 'true' : 'false'} aria-current=${d.today ? 'date' : nothing}
                >${d.day}</button>
              `;
              })}
            </div>
          </div>

          <div class="panel-divider"></div>

          <!-- Time -->
          <div class="time-side">
            <span class="time-side-label">${this.i18n.t('time')}</span>
            <div class="time-columns">
              <div class="time-column">
                <span class="time-column-label">${this.i18n.t('hour')}</span>
                <div class="time-scroll" role="listbox" aria-label=${this.i18n.t('hours')}
                  @keydown=${(e: KeyboardEvent) => this._onListKey(e, hours, this._selectedHour, (h) => this._selectHour(h))}>
                  ${hours.map(h => html`
                    <button type="button" role="option" class="time-option ${this._selectedHour === h ? 'selected' : ''}"
                      tabindex=${h === hourStop ? '0' : '-1'}
                      @click=${(e: Event) => { e.stopPropagation(); this._selectHour(h); }}
                      aria-selected=${this._selectedHour === h ? 'true' : 'false'}
                    >${this.use12h ? h : String(h).padStart(2, '0')}</button>
                  `)}
                </div>
              </div>
              <div class="time-col-divider"></div>
              <div class="time-column">
                <span class="time-column-label">${this.i18n.t('minute')}</span>
                <div class="time-scroll" role="listbox" aria-label=${this.i18n.t('minutes')}
                  @keydown=${(e: KeyboardEvent) => this._onListKey(e, minutes, this._selectedMinute, (m) => this._selectMinute(m))}>
                  ${minutes.map(m => html`
                    <button type="button" role="option" class="time-option ${this._selectedMinute === m ? 'selected' : ''}"
                      tabindex=${m === minuteStop ? '0' : '-1'}
                      @click=${(e: Event) => { e.stopPropagation(); this._selectMinute(m); }}
                      aria-selected=${this._selectedMinute === m ? 'true' : 'false'}
                    >${String(m).padStart(2, '0')}</button>
                  `)}
                </div>
              </div>
              ${this.use12h ? html`
                <div class="period-toggle">
                  <button type="button" class="period-btn ${this._period === 'AM' ? 'active' : ''}" aria-pressed=${this._period === 'AM'} @click=${(e: Event) => { e.stopPropagation(); this._setPeriod('AM'); }}>${this.i18n.t('am')}</button>
                  <button type="button" class="period-btn ${this._period === 'PM' ? 'active' : ''}" aria-pressed=${this._period === 'PM'} @click=${(e: Event) => { e.stopPropagation(); this._setPeriod('PM'); }}>${this.i18n.t('pm')}</button>
                </div>
              ` : nothing}
            </div>
          </div>
        </div>
      </div>
      ${help ? html`<div class="helper" id="helper">${help}</div>` : nothing}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap { 'cg-date-time-picker': CgDateTimePicker; }
}
