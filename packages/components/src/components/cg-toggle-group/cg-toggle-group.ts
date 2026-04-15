import { LitElement, html, css } from 'lit';
import { customElement, property, queryAssignedElements } from 'lit/decorators.js';
import { hostBase, reducedMotion } from '../../styles/index.js';
import type { CgToggle } from '../cg-toggle/cg-toggle.js';

/**
 * @element cg-toggle-group
 * Group of cg-toggle elements with single or multiple selection.
 *
 * @example
 * ```html
 * <cg-toggle-group type="single" value="left">
 *   <cg-toggle value="left">Left</cg-toggle>
 *   <cg-toggle value="center">Center</cg-toggle>
 *   <cg-toggle value="right">Right</cg-toggle>
 * </cg-toggle-group>
 * ```
 *
 * @slot - cg-toggle elements
 *
 * @fires {CustomEvent<{value: string | string[]}>} cg-toggle-group-change
 */
@customElement('cg-toggle-group')
export class CgToggleGroup extends LitElement {
  static override styles = [hostBase, reducedMotion, css`
    :host {
      display: inline-flex;
      gap: var(--cg-spacing-4);
    }
    :host([orientation="vertical"]) {
      flex-direction: column;
    }

    /* Connected pill mode: when variant=outline, flush-join neighbors */
    :host([variant="outline"]) {
      gap: 0;
    }
    :host([variant="outline"]) ::slotted(cg-toggle:not(:first-child)) {
      margin-left: calc(-1 * var(--cg-border-width-50));
    }
    :host([variant="outline"][orientation="vertical"]) ::slotted(cg-toggle:not(:first-child)) {
      margin-left: 0;
      margin-top: calc(-1 * var(--cg-border-width-50));
    }
  `];

  @property() type: 'single' | 'multiple' = 'single';
  @property() value: string | string[] = '';
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ reflect: true }) orientation: 'horizontal' | 'vertical' = 'horizontal';
  @property({ reflect: true }) size: 'sm' | 'md' | 'lg' = 'md';
  @property({ reflect: true }) variant: 'ghost' | 'outline' | 'solid' = 'ghost';

  @queryAssignedElements({ flatten: true }) private _toggles!: CgToggle[];

  override connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener('cg-toggle-change', this._onToggleChange as EventListener);
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeEventListener('cg-toggle-change', this._onToggleChange as EventListener);
  }

  override updated(changed: Map<string, unknown>): void {
    // Only sync when relevant props change (avoids infinite loops)
    if (!changed.has('value') && !changed.has('size') && !changed.has('variant') && !changed.has('disabled') && !changed.has('type')) return;

    const toggles = this._toggles;
    for (const toggle of toggles) {
      toggle.size = this.size;
      toggle.variant = this.variant;
      if (this.disabled) toggle.disabled = true;

      if (this.type === 'single') {
        toggle.pressed = toggle.value === this.value;
      } else {
        const values = Array.isArray(this.value) ? this.value : [this.value];
        toggle.pressed = values.includes(toggle.value);
      }
    }
  }

  private _onToggleChange = (e: Event): void => {
    const target = e.target as CgToggle;
    if (!target || !('pressed' in target)) return;

    if (this.type === 'single') {
      // Only one can be pressed
      if (target.pressed) {
        this.value = target.value;
        // Deselect siblings
        for (const t of this._toggles) {
          if (t !== target) t.pressed = false;
        }
      } else {
        this.value = '';
      }
    } else {
      // Multiple selection
      const current = Array.isArray(this.value) ? [...this.value] : [];
      if (target.pressed) {
        if (!current.includes(target.value)) current.push(target.value);
      } else {
        const idx = current.indexOf(target.value);
        if (idx >= 0) current.splice(idx, 1);
      }
      this.value = current;
    }

    this.dispatchEvent(new CustomEvent('cg-toggle-group-change', {
      detail: { value: this.value },
      bubbles: true,
      composed: true,
    }));
  };

  override render() {
    return html`
      <div role=${this.type === 'multiple' ? 'toolbar' : 'group'}>
        <slot @slotchange=${() => this.requestUpdate()}></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cg-toggle-group': CgToggleGroup;
  }
}
