import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { hostBlock, reducedMotion } from '../../styles/index.js';
import type { CgRadio } from '../cg-radio/cg-radio.js';

/**
 * @element cg-radio-group
 * Manages a group of `<cg-radio>` elements with WAI-ARIA keyboard navigation.
 *
 * @example
 * ```html
 * <cg-radio-group name="color" value="red" label="Pick a color">
 *   <cg-radio label="Red" value="red"></cg-radio>
 *   <cg-radio label="Blue" value="blue"></cg-radio>
 * </cg-radio-group>
 * ```
 *
 * @slot - Default slot for `<cg-radio>` children
 *
 * @fires {CustomEvent<{value: string}>} cg-change - When the selected value changes
 *
 * @cssprop [--cg-spacing-8=8px] - Gap between radio items (vertical)
 * @cssprop [--cg-spacing-16=16px] - Gap between radio items (horizontal)
 */
@customElement('cg-radio-group')
export class CgRadioGroup extends LitElement {
  static override styles = [hostBlock, reducedMotion, css`
    :host {
      display: block;
    }

    .group {
      display: flex;
      flex-direction: column;
      gap: var(--cg-spacing-8);
    }

    :host([orientation="horizontal"]) .group {
      flex-direction: row;
      gap: var(--cg-spacing-16);
      flex-wrap: wrap;
    }
  `];

  /** Shared name for all child radios */
  @property() name = '';

  /** Currently selected value */
  @property() value = '';

  /** Accessible group label */
  @property() label = '';

  /** Disables all child radios */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /** Layout direction */
  @property({ reflect: true }) orientation: 'vertical' | 'horizontal' = 'vertical';

  private _radios: CgRadio[] = [];

  private _getRadios(): CgRadio[] {
    const slot = this.shadowRoot?.querySelector('slot');
    if (!slot) return [];
    return slot.assignedElements({ flatten: true })
      .filter((el): el is CgRadio => el.tagName === 'CG-RADIO') as CgRadio[];
  }

  private _syncRadios() {
    this._radios = this._getRadios();

    for (const radio of this._radios) {
      if (this.name) radio.name = this.name;
      if (this.disabled) radio.disabled = true;
      radio.checked = radio.value === this.value;
    }

    this._updateTabindex();
  }

  private _updateTabindex() {
    const enabledRadios = this._radios.filter(r => !r.disabled);
    if (enabledRadios.length === 0) return;

    const selected = enabledRadios.find(r => r.checked);
    const focusTarget = selected ?? enabledRadios[0];

    for (const radio of this._radios) {
      radio.tabIndex = radio === focusTarget ? 0 : -1;
    }
  }

  private _handleSlotChange() {
    this._syncRadios();
  }

  private _handleChange(e: Event) {
    const detail = (e as CustomEvent).detail;
    if (!detail) return;

    const newValue = detail.value as string;
    if (newValue === this.value) return;

    this.value = newValue;

    // Deselect all others and update tabindex
    for (const radio of this._radios) {
      radio.checked = radio.value === newValue;
    }
    this._updateTabindex();

    this.dispatchEvent(new CustomEvent('cg-change', {
      detail: { value: newValue },
      bubbles: true,
      composed: true,
    }));
  }

  private _handleKeydown(e: KeyboardEvent) {
    const enabledRadios = this._radios.filter(r => !r.disabled);
    if (enabledRadios.length === 0) return;

    const keys = ['ArrowDown', 'ArrowRight', 'ArrowUp', 'ArrowLeft', 'Home', 'End'];
    if (!keys.includes(e.key)) return;

    e.preventDefault();

    const currentIndex = enabledRadios.findIndex(r => r.checked);
    let nextIndex: number;

    switch (e.key) {
      case 'ArrowDown':
      case 'ArrowRight':
        nextIndex = currentIndex === -1 ? 0 : (currentIndex + 1) % enabledRadios.length;
        break;
      case 'ArrowUp':
      case 'ArrowLeft':
        nextIndex = currentIndex === -1
          ? enabledRadios.length - 1
          : (currentIndex - 1 + enabledRadios.length) % enabledRadios.length;
        break;
      case 'Home':
        nextIndex = 0;
        break;
      case 'End':
        nextIndex = enabledRadios.length - 1;
        break;
      default:
        return;
    }

    const target = enabledRadios[nextIndex];
    if (!target) return;
    this._selectRadio(target);
    target.focus();
  }

  private _selectRadio(radio: CgRadio) {
    if (radio.value === this.value) return;

    this.value = radio.value;

    for (const r of this._radios) {
      r.checked = r === radio;
    }
    this._updateTabindex();

    this.dispatchEvent(new CustomEvent('cg-change', {
      detail: { value: radio.value },
      bubbles: true,
      composed: true,
    }));
  }

  override updated(changed: Map<string, unknown>) {
    if (changed.has('value') || changed.has('name') || changed.has('disabled')) {
      this._syncRadios();
    }
  }

  override render() {
    return html`
      <div
        class="group"
        role="radiogroup"
        aria-label=${this.label || nothing}
        @cg-change=${this._handleChange}
        @keydown=${this._handleKeydown}
      >
        <slot @slotchange=${this._handleSlotChange}></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap { 'cg-radio-group': CgRadioGroup; }
}
