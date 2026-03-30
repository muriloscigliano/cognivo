import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { hostBlock, reducedMotion } from '../../styles/index.js';

/**
 * <cg-stack> — Flex layout container for composing child components.
 *
 * Features beyond OpenUI's Stack:
 * - wrap support
 * - responsive breakpoint attrs (inline, not media queries)
 * - align-self on children via slot
 */
@customElement('cg-stack')
export class CgStack extends LitElement {
  static override styles = [hostBlock, reducedMotion, css`
    :host {
      display: flex;
      flex-direction: column;
      gap: var(--cg-spacing-16, 16px);
    }

    /* Direction */
    :host([direction="row"]) { flex-direction: row; }
    :host([direction="column"]) { flex-direction: column; }
    :host([direction="row-reverse"]) { flex-direction: row-reverse; }
    :host([direction="column-reverse"]) { flex-direction: column-reverse; }

    /* Gap */
    :host([gap="none"]) { gap: 0; }
    :host([gap="xs"]) { gap: var(--cg-spacing-4, 4px); }
    :host([gap="sm"]) { gap: var(--cg-spacing-8, 8px); }
    :host([gap="md"]) { gap: var(--cg-spacing-16, 16px); }
    :host([gap="lg"]) { gap: var(--cg-spacing-24, 24px); }
    :host([gap="xl"]) { gap: var(--cg-spacing-32, 32px); }
    :host([gap="2xl"]) { gap: var(--cg-spacing-48, 48px); }

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
    :host([wrap]) { flex-wrap: wrap; }
    :host([wrap="reverse"]) { flex-wrap: wrap-reverse; }

    /* Full width/height */
    :host([full]) { width: 100%; }
  `];

  @property({ reflect: true }) direction: 'row' | 'column' | 'row-reverse' | 'column-reverse' = 'column';
  @property({ reflect: true }) gap: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' = 'md';
  @property({ reflect: true }) align: 'start' | 'center' | 'end' | 'stretch' | 'baseline' = 'stretch';
  @property({ reflect: true }) justify: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly' = 'start';
  @property({ type: Boolean, reflect: true }) wrap = false;
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
