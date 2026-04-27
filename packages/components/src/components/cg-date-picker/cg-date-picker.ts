import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { hostBlock, reducedMotion } from '../../styles/index.js';
import '../cg-calendar/cg-calendar.js';

/**
 * @element cg-date-picker
 * Date picker trigger that opens a single-mode cg-calendar in a floating popover.
 *
 * @example
 * ```html
 * <cg-date-picker label="Start date" placeholder="Pick a date"></cg-date-picker>
 * <cg-date-picker label="Birthday" value="2000-01-15" min="1900-01-01" max="2025-12-31"></cg-date-picker>
 * ```
 *
 * @fires {CustomEvent<{value: string}>} cg-change - When a date is selected
 */
@customElement('cg-date-picker')
export class CgDatePicker extends LitElement {
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
    .trigger:focus-visible,
    .trigger.open {
      border-color: var(--cg-color-input-border-focus);
      box-shadow: 0 0 0 3px var(--cg-overlay-accent-strong);
    }
    .trigger.disabled { opacity: 0.5; pointer-events: none; background: var(--cg-color-input-background-disabled); border-color: var(--cg-color-input-border-disabled); }

    :host([error]) .trigger { border-color: var(--cg-color-input-border-error); }
    :host([error]) .trigger:focus-visible,
    :host([error]) .trigger.open { border-color: var(--cg-color-status-error-text-default); box-shadow: 0 0 0 3px var(--cg-shadow-focus-error); }
    :host([success]) .trigger { border-color: var(--cg-color-input-icon-success); }
    :host([success]) .trigger:focus-visible,
    :host([success]) .trigger.open { border-color: var(--cg-color-status-success-text-default); box-shadow: 0 0 0 3px var(--cg-shadow-focus-success); }

    /* Size */
    :host([size="lg"]) .trigger { height: var(--cg-component-input-height-lg); padding: 0 var(--cg-spacing-4); font-size: var(--cg-font-size-base); }

    /* Rounded */
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

    /* ── Popover (positioning + animation only — cg-calendar owns the visual chrome) ── */
    .popover {
      position: absolute;
      top: 100%;
      left: 0;
      z-index: var(--cg-z-index-200);
      margin-top: var(--cg-spacing-4);
      border-radius: var(--cg-component-calendar-radius);
      box-shadow: var(--cg-shadow-elevation-xl);
      opacity: 0;
      transform: translateY(calc(-1 * var(--cg-spacing-4))) scale(0.98);
      pointer-events: none;
      transition:
        opacity var(--cg-transition-duration-fast) var(--cg-transition-easing-default),
        transform var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
    }
    .popover.open {
      opacity: 1;
      transform: translateY(0) scale(1);
      pointer-events: auto;
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
  @property() placeholder = 'Select date';
  @property() name = '';
  @property() helper = '';
  @property() min = '';
  @property() max = '';
  @property({ reflect: true }) size: 'md' | 'lg' = 'md';
  @property({ reflect: true }) rounded: 'none' | 'sm' | 'md' | 'lg' = 'lg';
  @property({ type: Boolean }) disabled = false;
  @property({ type: Boolean, reflect: true }) error = false;
  @property({ type: Boolean, reflect: true }) success = false;

  @state() private _open = false;

  private _toggle() {
    if (this.disabled) return;
    this._open = !this._open;
  }

  private _close() { this._open = false; }

  private _onCalendarChange(e: Event) {
    const ev = e as CustomEvent<{ value: string }>;
    e.stopPropagation();
    this.value = ev.detail.value || '';
    this._close();
    this.dispatchEvent(new CustomEvent('cg-change', { detail: { value: this.value }, bubbles: true, composed: true }));
  }

  private _formatDisplay(): string {
    if (!this.value) return '';
    const d = new Date(this.value + 'T00:00:00');
    if (isNaN(d.getTime())) return '';
    return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
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

  override connectedCallback() {
    super.connectedCallback();
    document.addEventListener('click', this._handleClickOutside);
  }
  override disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('click', this._handleClickOutside);
  }

  override render() {
    const display = this._formatDisplay();

    return html`
      ${this.label ? html`<div class="label">${this.label}</div>` : nothing}
      <div
        class="trigger ${this._open ? 'open' : ''} ${this.disabled ? 'disabled' : ''}"
        tabindex=${this.disabled ? '-1' : '0'}
        role="combobox"
        aria-expanded=${this._open}
        aria-haspopup="dialog"
        aria-label=${this.label || 'Date picker'}
        @click=${this._toggle}
        @keydown=${this._handleKeydown}
      >
        <span class="trigger-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
        </span>
        <span class="trigger-text ${!display ? 'placeholder' : ''}">
          ${display || this.placeholder}
        </span>
      </div>

      <div class="popover ${this._open ? 'open' : ''}" role="dialog" aria-label="Calendar">
        <cg-calendar
          mode="single"
          .value=${this.value}
          .min=${this.min}
          .max=${this.max}
          @cg-calendar-change=${this._onCalendarChange}
        ></cg-calendar>
      </div>
      ${this.helper ? html`<div class="helper">${this.helper}</div>` : nothing}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap { 'cg-date-picker': CgDatePicker; }
}
