import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { hostBase, reducedMotion } from '../../styles/index.js';

/**
 * <cg-button-group> — Groups buttons with optional attached mode.
 *
 * Features:
 * - Row or column direction
 * - Attached mode (no gap, shared border radius)
 * - Gap size control
 * - Alignment (start/center/end/stretch)
 * - ARIA group role
 */
@customElement('cg-button-group')
export class CgButtonGroup extends LitElement {
  static override styles = [hostBase, reducedMotion, css`
    div[role="group"] {
      display: flex;
    }

    /* Direction */
    :host([direction="row"]) div[role="group"] { flex-direction: row; }
    :host([direction="column"]) div[role="group"] { flex-direction: column; width: 100%; }

    /* Gap */
    :host([gap="none"]) div[role="group"] { gap: 0; }
    :host([gap="xs"]) div[role="group"] { gap: var(--cg-spacing-4); }
    :host([gap="sm"]) div[role="group"] { gap: var(--cg-spacing-8); }
    :host([gap="md"]) div[role="group"] { gap: var(--cg-spacing-12); }

    /* Alignment */
    :host([align="start"]) div[role="group"] { justify-content: flex-start; }
    :host([align="center"]) div[role="group"] { justify-content: center; }
    :host([align="end"]) div[role="group"] { justify-content: flex-end; }
    :host([align="stretch"]) ::slotted(*) { flex: 1; }

    /* Attached mode — buttons share borders. The gap must be zeroed on the
       flex CONTAINER (the div), not the host (not a flex parent), or the
       gap-attribute rule above keeps an 8px gap and buttons aren't attached. */
    :host([attached]) div[role="group"] {
      gap: 0;
    }
    :host([attached]) ::slotted(*) {
      border-radius: 0;
      margin-left: calc(-1 * var(--cg-border-width-50));
    }
    /* Lift the hovered/focused button so its border + focus ring aren't
       clipped under the next sibling (the -1px overlap stacks later siblings
       on top). position:relative is required for z-index on flex children. */
    :host([attached]) ::slotted(*:hover),
    :host([attached]) ::slotted(*:focus),
    :host([attached]) ::slotted(*:focus-within) {
      position: relative;
      z-index: 1;
    }
    :host([attached]) ::slotted(*:first-child) {
      margin-left: 0;
      border-radius: var(--cg-component-button-radius-md) 0 0 var(--cg-component-button-radius-md);
    }
    :host([attached]) ::slotted(*:last-child) {
      border-radius: 0 var(--cg-component-button-radius-md) var(--cg-component-button-radius-md) 0;
    }
    :host([attached]) ::slotted(*:only-child) {
      border-radius: var(--cg-component-button-radius-md);
      margin-left: 0;
    }

    /* Attached vertical */
    :host([attached][direction="column"]) ::slotted(*) {
      margin-left: 0;
      margin-top: calc(-1 * var(--cg-border-width-50));
    }
    :host([attached][direction="column"]) ::slotted(*:first-child) {
      margin-top: 0;
      border-radius: var(--cg-component-button-radius-md) var(--cg-component-button-radius-md) 0 0;
    }
    :host([attached][direction="column"]) ::slotted(*:last-child) {
      border-radius: 0 0 var(--cg-component-button-radius-md) var(--cg-component-button-radius-md);
    }
  `];

  @property({ reflect: true }) direction: 'row' | 'column' = 'row';
  @property({ reflect: true }) gap: 'none' | 'xs' | 'sm' | 'md' = 'sm';
  @property({ reflect: true }) align: 'start' | 'center' | 'end' | 'stretch' = 'start';
  @property({ type: Boolean, reflect: true }) attached = false;
  /** Accessible name for the group landmark (e.g. "Text alignment"). */
  @property() label?: string;

  override render() {
    return html`<div role="group" aria-label=${this.label ? this.label : nothing}><slot></slot></div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap { 'cg-button-group': CgButtonGroup; }
}
