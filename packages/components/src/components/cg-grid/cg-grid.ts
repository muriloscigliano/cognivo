import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { hostBlock, reducedMotion } from '../../styles/index.js';

/**
 * @element cg-grid
 * CSS-grid layout primitive with declarative columns, gap, and alignment.
 * Shares cg-stack's gap vocabulary.
 *
 * @example
 * ```html
 * <cg-grid columns="3" gap="md">
 *   <cg-card>1</cg-card>
 *   <cg-card>2</cg-card>
 *   <cg-card>3</cg-card>
 * </cg-grid>
 * ```
 *
 * @example Responsive auto-fill
 * ```html
 * <cg-grid min-column="200px" gap="lg"> … </cg-grid>
 * ```
 *
 * @slot - Grid children.
 */
@customElement('cg-grid')
export class CgGrid extends LitElement {
  static override styles = [hostBlock, reducedMotion, css`
    :host {
      display: grid;
      gap: var(--cg-spacing-16);
      grid-template-columns: repeat(var(--_cg-grid-columns, 1), minmax(0, 1fr));
    }

    /* Responsive auto-fill wins when min-column is set */
    :host([min-column]) {
      grid-template-columns: repeat(auto-fill, minmax(var(--_cg-grid-min, 0), 1fr));
    }

    /* Gap — same scale as cg-stack */
    :host([gap="none"]) { gap: 0; }
    :host([gap="xs"]) { gap: var(--cg-spacing-4); }
    :host([gap="sm"]) { gap: var(--cg-spacing-8); }
    :host([gap="md"]) { gap: var(--cg-spacing-16); }
    :host([gap="lg"]) { gap: var(--cg-spacing-24); }
    :host([gap="xl"]) { gap: var(--cg-spacing-32); }
    :host([gap="2xl"]) { gap: var(--cg-spacing-48); }

    /* Align items (block axis) */
    :host([align="start"]) { align-items: start; }
    :host([align="center"]) { align-items: center; }
    :host([align="end"]) { align-items: end; }
    :host([align="stretch"]) { align-items: stretch; }

    /* Justify items (inline axis) */
    :host([justify="start"]) { justify-items: start; }
    :host([justify="center"]) { justify-items: center; }
    :host([justify="end"]) { justify-items: end; }
    :host([justify="stretch"]) { justify-items: stretch; }

    :host([full]) { width: 100%; }
  `];

  @property({ type: Number, reflect: true }) columns = 1;
  @property({ attribute: 'min-column', reflect: true }) minColumn = '';
  @property({ reflect: true }) gap: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' = 'md';
  @property({ reflect: true }) align: 'start' | 'center' | 'end' | 'stretch' = 'stretch';
  @property({ reflect: true }) justify: 'start' | 'center' | 'end' | 'stretch' = 'stretch';
  @property({ type: Boolean, reflect: true }) full = false;

  override updated(changed: Map<string, unknown>): void {
    if (changed.has('columns')) {
      this.style.setProperty('--_cg-grid-columns', String(Math.max(1, this.columns)));
    }
    if (changed.has('minColumn')) {
      this.style.setProperty('--_cg-grid-min', this.minColumn || '0');
    }
  }

  override render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cg-grid': CgGrid;
  }
}
