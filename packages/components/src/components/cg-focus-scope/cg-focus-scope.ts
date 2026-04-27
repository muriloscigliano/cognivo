import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { FocusTrap } from '../../utils/focus-trap.js';

/**
 * @element cg-focus-scope
 * Headless behavior primitive that traps Tab-focus within itself when
 * `active`. Renders no chrome (`display: contents`) — children render as
 * if the wrapper weren't there.
 *
 * Escape is intentionally NOT handled here: parent containers (dialogs,
 * sheets, drawers) own dismiss semantics. Wire your own keydown listener
 * if you need Escape to deactivate.
 *
 * @example
 * ```html
 * <cg-focus-scope ?active=${this.dialogOpen}>
 *   <button>First</button>
 *   <input />
 *   <button>Last</button>
 * </cg-focus-scope>
 * ```
 *
 * @slot - Children inside the focus trap.
 */
@customElement('cg-focus-scope')
export class CgFocusScope extends LitElement {
  static override styles = css`
    :host { display: contents; }
  `;

  @property({ type: Boolean, reflect: true }) active = false;
  @property({ type: Boolean, attribute: 'return-focus' }) returnFocus = true;

  private _trap = new FocusTrap();

  override connectedCallback(): void {
    super.connectedCallback();
    // If the element is moved or re-attached while `active` is still true,
    // restore the trap — `updated()` only fires on property change so it
    // won't re-engage on its own.
    if (this.active) {
      this._trap.activate(this, {
        returnFocus: this.returnFocus,
        handleEscape: false,
      });
    }
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this._trap.deactivate();
  }

  override updated(changed: Map<string, unknown>): void {
    if (changed.has('active')) {
      if (this.active) {
        this._trap.activate(this, {
          returnFocus: this.returnFocus,
          handleEscape: false,
        });
      } else {
        this._trap.deactivate();
      }
    }
  }

  override render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cg-focus-scope': CgFocusScope;
  }
}
