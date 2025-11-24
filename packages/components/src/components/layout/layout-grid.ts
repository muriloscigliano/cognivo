import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

export interface LayoutGridConfig {
  cols?: string | number;
  rows?: string | number;
  gap?: string;
  rowGap?: string;
  columnGap?: string;
  alignItems?: 'start' | 'center' | 'end' | 'stretch';
  justifyItems?: 'start' | 'center' | 'end' | 'stretch';
  dense?: boolean;
  responsive?: boolean;
}

/**
 * Layout Grid
 *
 * Advanced responsive grid layout with configurable columns, rows, and gaps
 * Supports CSS Grid with full control over alignment and flow
 */
@customElement('layout-grid')
export class LayoutGrid extends LitElement {
  static override styles = [
    baseStyles,
    css`
      :host {
        display: grid;
        grid-template-columns: var(--grid-columns, repeat(auto-fit, minmax(300px, 1fr)));
        grid-template-rows: var(--grid-rows, auto);
        gap: var(--grid-gap, ${tokens.spacing.lg});
        column-gap: var(--grid-column-gap, var(--grid-gap, ${tokens.spacing.lg}));
        row-gap: var(--grid-row-gap, var(--grid-gap, ${tokens.spacing.lg}));
        width: 100%;
        align-items: var(--grid-align-items, stretch);
        justify-items: var(--grid-justify-items, stretch);
        font-family: ${tokens.fontFamily.primary};
      }

      /* Fixed column layouts */
      :host([cols='1']) {
        grid-template-columns: 1fr;
      }

      :host([cols='2']) {
        grid-template-columns: repeat(2, 1fr);
      }

      :host([cols='3']) {
        grid-template-columns: repeat(3, 1fr);
      }

      :host([cols='4']) {
        grid-template-columns: repeat(4, 1fr);
      }

      :host([cols='5']) {
        grid-template-columns: repeat(5, 1fr);
      }

      :host([cols='6']) {
        grid-template-columns: repeat(6, 1fr);
      }

      :host([cols='8']) {
        grid-template-columns: repeat(8, 1fr);
      }

      :host([cols='12']) {
        grid-template-columns: repeat(12, 1fr);
      }

      /* Auto-fit and auto-fill */
      :host([cols='auto-fit']) {
        grid-template-columns: repeat(auto-fit, minmax(var(--min-column-width, 250px), 1fr));
      }

      :host([cols='auto-fill']) {
        grid-template-columns: repeat(auto-fill, minmax(var(--min-column-width, 250px), 1fr));
      }

      /* Fixed row layouts */
      :host([rows='1']) {
        grid-template-rows: auto;
      }

      :host([rows='2']) {
        grid-template-rows: repeat(2, auto);
      }

      :host([rows='3']) {
        grid-template-rows: repeat(3, auto);
      }

      :host([rows='4']) {
        grid-template-rows: repeat(4, auto);
      }

      /* Dense packing */
      :host([dense]) {
        grid-auto-flow: dense;
      }

      /* Alignment */
      :host([align-items='start']) {
        --grid-align-items: start;
      }

      :host([align-items='center']) {
        --grid-align-items: center;
      }

      :host([align-items='end']) {
        --grid-align-items: end;
      }

      :host([align-items='stretch']) {
        --grid-align-items: stretch;
      }

      :host([justify-items='start']) {
        --grid-justify-items: start;
      }

      :host([justify-items='center']) {
        --grid-justify-items: center;
      }

      :host([justify-items='end']) {
        --grid-justify-items: end;
      }

      :host([justify-items='stretch']) {
        --grid-justify-items: stretch;
      }

      /* Gap sizes */
      :host([gap='none']) {
        --grid-gap: 0;
      }

      :host([gap='sm']) {
        --grid-gap: ${tokens.spacing.sm};
      }

      :host([gap='md']) {
        --grid-gap: ${tokens.spacing.md};
      }

      :host([gap='lg']) {
        --grid-gap: ${tokens.spacing.lg};
      }

      :host([gap='xl']) {
        --grid-gap: ${tokens.spacing.xl};
      }

      /* Grid item spanning */
      ::slotted([data-col-span='2']) {
        grid-column: span 2;
      }

      ::slotted([data-col-span='3']) {
        grid-column: span 3;
      }

      ::slotted([data-col-span='4']) {
        grid-column: span 4;
      }

      ::slotted([data-col-span='6']) {
        grid-column: span 6;
      }

      ::slotted([data-col-span='full']) {
        grid-column: 1 / -1;
      }

      ::slotted([data-row-span='2']) {
        grid-row: span 2;
      }

      ::slotted([data-row-span='3']) {
        grid-row: span 3;
      }

      ::slotted([data-row-span='4']) {
        grid-row: span 4;
      }

      /* Responsive breakpoints */
      @media (max-width: 1200px) {
        :host([responsive]) {
          --min-column-width: 280px;
        }

        :host([responsive][cols='6']),
        :host([responsive][cols='8']),
        :host([responsive][cols='12']) {
          grid-template-columns: repeat(4, 1fr);
        }

        :host([responsive][cols='5']) {
          grid-template-columns: repeat(3, 1fr);
        }
      }

      @media (max-width: 992px) {
        :host([responsive]) {
          --min-column-width: 250px;
          --grid-gap: ${tokens.spacing.md};
        }

        :host([responsive][cols='4']),
        :host([responsive][cols='5']),
        :host([responsive][cols='6']),
        :host([responsive][cols='8']),
        :host([responsive][cols='12']) {
          grid-template-columns: repeat(3, 1fr);
        }
      }

      @media (max-width: 768px) {
        :host([responsive]) {
          grid-template-columns: repeat(2, 1fr);
        }

        :host([responsive][cols]) {
          grid-template-columns: repeat(2, 1fr);
        }

        ::slotted([data-col-span='3']),
        ::slotted([data-col-span='4']),
        ::slotted([data-col-span='6']) {
          grid-column: span 2;
        }
      }

      @media (max-width: 480px) {
        :host {
          --grid-gap: ${tokens.spacing.sm};
        }

        :host([responsive]) {
          grid-template-columns: 1fr;
        }

        :host([responsive][cols]) {
          grid-template-columns: 1fr;
        }

        ::slotted([data-col-span]) {
          grid-column: span 1;
        }
      }
    `,
  ];

  @property({ type: String, reflect: true })
  cols: string | number = 'auto-fit';

  @property({ type: String, reflect: true })
  rows: string | number = 'auto';

  @property({ type: String })
  gap = '';

  @property({ type: String, attribute: 'row-gap' })
  rowGap = '';

  @property({ type: String, attribute: 'column-gap' })
  columnGap = '';

  @property({ type: String, attribute: 'min-column-width' })
  minColumnWidth = '300px';

  @property({ type: String, reflect: true, attribute: 'align-items' })
  alignItems: 'start' | 'center' | 'end' | 'stretch' = 'stretch';

  @property({ type: String, reflect: true, attribute: 'justify-items' })
  justifyItems: 'start' | 'center' | 'end' | 'stretch' = 'stretch';

  @property({ type: Boolean, reflect: true })
  dense = false;

  @property({ type: Boolean, reflect: true })
  responsive = true;

  override connectedCallback() {
    super.connectedCallback();

    if (this.gap) {
      this.style.setProperty('--grid-gap', this.gap);
    }

    if (this.rowGap) {
      this.style.setProperty('--grid-row-gap', this.rowGap);
    }

    if (this.columnGap) {
      this.style.setProperty('--grid-column-gap', this.columnGap);
    }

    if (this.minColumnWidth) {
      this.style.setProperty('--min-column-width', this.minColumnWidth);
    }

    // Handle custom column/row templates
    if (this.cols && !['auto-fit', 'auto-fill', '1', '2', '3', '4', '5', '6', '8', '12'].includes(String(this.cols))) {
      this.style.setProperty('--grid-columns', String(this.cols));
    }

    if (this.rows && !['auto', '1', '2', '3', '4'].includes(String(this.rows))) {
      this.style.setProperty('--grid-rows', String(this.rows));
    }
  }

  override render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'layout-grid': LayoutGrid;
  }
}
