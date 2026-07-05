import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { hostBlock, reducedMotion } from '../../styles/index.js';

/**
 * <cg-stack> — Flex layout container for composing child components.
 *
 * Features:
 * - direction / gap / align / justify / wrap / full attributes
 * - token-driven gap scale (none|xs|sm|md|lg|xl|2xl)
 */
@customElement('cg-stack')
export class CgStack extends LitElement {
  static override styles = [hostBlock, reducedMotion, css`
    :host {
      display: flex;
      flex-direction: column;
      gap: var(--cg-spacing-16);
    }

    /* Direction */
    :host([direction="row"]) { flex-direction: row; }
    :host([direction="column"]) { flex-direction: column; }
    :host([direction="row-reverse"]) { flex-direction: row-reverse; }
    :host([direction="column-reverse"]) { flex-direction: column-reverse; }

    /* Gap */
    :host([gap="none"]) { gap: 0; }
    :host([gap="xs"]) { gap: var(--cg-spacing-4); }
    :host([gap="sm"]) { gap: var(--cg-spacing-8); }
    :host([gap="md"]) { gap: var(--cg-spacing-16); }
    :host([gap="lg"]) { gap: var(--cg-spacing-24); }
    :host([gap="xl"]) { gap: var(--cg-spacing-32); }
    :host([gap="2xl"]) { gap: var(--cg-spacing-48); }

    /* Align */
    :host([align="start"]) { align-items: flex-start; }
    :host([align="center"]) { align-items: center; }
    :host([align="end"]) { align-items: flex-end; }
    :host([align="stretch"]) { align-items: stretch; }
    :host([align="baseline"]) { align-items: baseline; }

    /* Justify */
    :host([justify="start"]) { justify-content: flex-start; }
    :host([justify="center"]) { justify-content: center; }
    :host([justify="end"]) { justify-content: flex-end; }
    :host([justify="between"]) { justify-content: space-between; }
    :host([justify="around"]) { justify-content: space-around; }
    :host([justify="evenly"]) { justify-content: space-evenly; }

    /* Wrap */
    :host([wrap="wrap"]) { flex-wrap: wrap; }
    :host([wrap="reverse"]) { flex-wrap: wrap-reverse; }

    /* Full width */
    :host([full]) { width: 100%; }
  `];

  @property({ reflect: true }) direction: 'row' | 'column' | 'row-reverse' | 'column-reverse' = 'column';
  @property({ reflect: true }) gap: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' = 'md';
  @property({ reflect: true }) align: 'start' | 'center' | 'end' | 'stretch' | 'baseline' = 'stretch';
  @property({ reflect: true }) justify: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly' = 'start';
  @property({ reflect: true }) wrap: 'none' | 'wrap' | 'reverse' = 'none';
  @property({ type: Boolean, reflect: true }) full = false;

  override render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cg-stack': CgStack;
  }
}
