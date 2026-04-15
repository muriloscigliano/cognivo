import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { FocusTrap } from '../../utils/focus-trap.js';

/**
 * @element cg-focus-scope
 * Behavior primitive that traps Tab-focus within itself when `active`.
 *
 * @slot - Children inside the focus trap.
 */
@customElement('cg-focus-scope')
export class CgFocusScope extends LitElement {
  static override styles = css`
    :host { display: contents; }
  `;

  @property({ type: Boolean, reflect: true }) active = false;
  @property({ type: Boolean }) loop = true;
  @property({ type: Boolean, attribute: 'return-focus' }) returnFocus = true;

  private _trap = new FocusTrap();

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
