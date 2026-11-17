import { LitElement, html, css } from 'lit';
import { property } from 'lit/decorators.js';
import { customElement } from '../../utils/define.js';
import { hostBlock, reducedMotion } from '../../styles/index.js';

/**
 * @element cg-action-bar
 * A sticky action bar: it sticks to the bottom of its scroll container (the
 * panel, an editor) so Save is always in reach, with a status on the left
 * ("Unsaved changes") and the actions on the right.
 *
 * Place it as the last child of the scrolling element. The status is a
 * polite live region: changing `status` is announced. Panel surface, a
 * hairline on top, at least `--cg-component-action-bar-height` (56 px) tall;
 * slotted `cg-button`s are the 36 px default.
 *
 * @example
 * ```html
 * <form class="editor">
 *   …fields…
 *   <cg-action-bar status="Unsaved changes">
 *     <cg-button slot="actions" variant="secondary">Discard</cg-button>
 *     <cg-button slot="actions" type="submit">Save</cg-button>
 *   </cg-action-bar>
 * </form>
 * ```
 *
 * @slot actions - Buttons at the end of the bar (the primary action last)
 * @slot - Extra content after the status (a reason a button is disabled)
 *
 * @cssprop --cg-component-action-bar-height - Minimum height (56px)
 */
@customElement('cg-action-bar')
export class CgActionBar extends LitElement {
  static override styles = [hostBlock, reducedMotion, css`
    :host {
      position: sticky;
      bottom: 0;
      z-index: var(--cg-z-index-100);
    }
    .bar {
      display: flex;
      align-items: center;
      gap: var(--cg-spacing-12);
      box-sizing: border-box;
      min-height: var(--cg-component-action-bar-height);
      padding: var(--cg-spacing-8) var(--cg-spacing-16);
      background: var(--cg-color-surface-panel-background);
      border-top: var(--cg-border-width-50) solid var(--cg-color-surface-hairline);
    }
    .status {
      flex: 1 1 auto;
      min-width: 0;
      font-size: var(--cg-font-size-13);
      color: var(--cg-color-on-surface-container-default);
    }
    .actions {
      display: flex;
      align-items: center;
      gap: var(--cg-spacing-8);
      flex-shrink: 0;
      margin-inline-start: auto;
    }
  `];

  /** Status text on the left ("Unsaved changes"); announced politely when it changes. */
  @property() status = '';

  override render() {
    return html`
      <div class="bar">
        <div class="status" role="status">${this.status}<slot></slot></div>
        <div class="actions"><slot name="actions"></slot></div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cg-action-bar': CgActionBar;
  }
}
