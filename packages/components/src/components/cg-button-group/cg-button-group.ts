import { LitElement, html, css } from 'lit';
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

    /* Attached mode — buttons share borders */
    :host([attached]) {
      gap: 0;
    }
    :host([attached]) ::slotted(*) {
      border-radius: 0;
      margin-left: -1px;
    }
    :host([attached]) ::slotted(*:first-child) {
      margin-left: 0;
      border-radius: var(--cg-border-radius-150) 0 0 var(--cg-border-radius-150);
    }
    :host([attached]) ::slotted(*:last-child) {
      border-radius: 0 var(--cg-border-radius-150) var(--cg-border-radius-150) 0;
    }
    :host([attached]) ::slotted(*:only-child) {
      border-radius: var(--cg-border-radius-150);
      margin-left: 0;
    }

    /* Attached vertical */
    :host([attached][direction="column"]) ::slotted(*) {
      margin-left: 0;
      margin-top: -1px;
    }
    :host([attached][direction="column"]) ::slotted(*:first-child) {
      margin-top: 0;
      border-radius: var(--cg-border-radius-150) var(--cg-border-radius-150) 0 0;
    }
    :host([attached][direction="column"]) ::slotted(*:last-child) {
      border-radius: 0 0 var(--cg-border-radius-150) var(--cg-border-radius-150);
    }
  `];

  @property({ reflect: true }) direction: 'row' | 'column' = 'row';
  @property({ reflect: true }) gap: 'none' | 'xs' | 'sm' | 'md' = 'sm';
  @property({ reflect: true }) align: 'start' | 'center' | 'end' | 'stretch' = 'start';
  @property({ type: Boolean, reflect: true }) attached = false;

  override render() {
    return html`<div role="group"><slot></slot></div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap { 'cg-button-group': CgButtonGroup; }
}
