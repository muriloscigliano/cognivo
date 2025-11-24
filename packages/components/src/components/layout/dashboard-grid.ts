import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

export interface DashboardGridConfig {
  columns?: number;
  minCardWidth?: string;
  gap?: string;
  dense?: boolean;
  responsive?: boolean;
}

/**
 * Dashboard Grid
 *
 * Responsive dashboard grid layout with automatic card placement
 * Supports multiple column configurations and responsive breakpoints
 */
@customElement('dashboard-grid')
export class DashboardGrid extends LitElement {
  static override styles = [
    baseStyles,
    css`
      :host {
        display: grid;
        grid-template-columns: var(--grid-columns, repeat(auto-fit, minmax(var(--min-card-width, 320px), 1fr)));
        gap: var(--grid-gap, ${tokens.spacing.lg});
        padding: var(--grid-padding, ${tokens.spacing.lg});
        width: 100%;
        font-family: ${tokens.fontFamily.primary};
      }

      /* Dense layout - reduces gaps */
      :host([dense]) {
        --grid-gap: ${tokens.spacing.md};
        --grid-padding: ${tokens.spacing.md};
      }

      /* Fixed column layouts */
      :host([columns='1']) {
        grid-template-columns: 1fr;
      }

      :host([columns='2']) {
        grid-template-columns: repeat(2, 1fr);
      }

      :host([columns='3']) {
        grid-template-columns: repeat(3, 1fr);
      }

      :host([columns='4']) {
        grid-template-columns: repeat(4, 1fr);
      }

      :host([columns='5']) {
        grid-template-columns: repeat(5, 1fr);
      }

      :host([columns='6']) {
        grid-template-columns: repeat(6, 1fr);
      }

      /* Auto-fill mode - fills available space */
      :host([auto-fill]) {
        grid-template-columns: repeat(auto-fill, minmax(var(--min-card-width, 320px), 1fr));
      }

      /* Auto-fit mode - fits to available space (default) */
      :host([auto-fit]) {
        grid-template-columns: repeat(auto-fit, minmax(var(--min-card-width, 320px), 1fr));
      }

      /* Responsive breakpoints */
      @media (max-width: 1200px) {
        :host([responsive]) {
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        }

        :host([responsive][columns='4']),
        :host([responsive][columns='5']),
        :host([responsive][columns='6']) {
          grid-template-columns: repeat(3, 1fr);
        }
      }

      @media (max-width: 992px) {
        :host([responsive]) {
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          --grid-gap: ${tokens.spacing.md};
        }

        :host([responsive][columns='3']),
        :host([responsive][columns='4']),
        :host([responsive][columns='5']),
        :host([responsive][columns='6']) {
          grid-template-columns: repeat(2, 1fr);
        }
      }

      @media (max-width: 768px) {
        :host {
          --grid-padding: ${tokens.spacing.md};
        }

        :host([responsive]) {
          grid-template-columns: 1fr;
          --grid-gap: ${tokens.spacing.md};
        }

        :host([responsive][columns]) {
          grid-template-columns: 1fr;
        }
      }

      @media (max-width: 480px) {
        :host {
          --grid-padding: ${tokens.spacing.sm};
          --grid-gap: ${tokens.spacing.sm};
        }
      }

      /* Grid items can span multiple columns/rows */
      ::slotted([data-span-2]) {
        grid-column: span 2;
      }

      ::slotted([data-span-3]) {
        grid-column: span 3;
      }

      ::slotted([data-span-4]) {
        grid-column: span 4;
      }

      ::slotted([data-row-span-2]) {
        grid-row: span 2;
      }

      ::slotted([data-row-span-3]) {
        grid-row: span 3;
      }

      /* Responsive span adjustments */
      @media (max-width: 768px) {
        ::slotted([data-span-2]),
        ::slotted([data-span-3]),
        ::slotted([data-span-4]) {
          grid-column: span 1;
        }
      }
    `,
  ];

  @property({ type: Number, reflect: true })
  columns?: number;

  @property({ type: String, attribute: 'min-card-width' })
  minCardWidth = '320px';

  @property({ type: String })
  gap = '';

  @property({ type: String })
  padding = '';

  @property({ type: Boolean, reflect: true })
  dense = false;

  @property({ type: Boolean, reflect: true })
  responsive = true;

  @property({ type: Boolean, reflect: true, attribute: 'auto-fill' })
  autoFill = false;

  @property({ type: Boolean, reflect: true, attribute: 'auto-fit' })
  autoFit = false;

  override connectedCallback() {
    super.connectedCallback();

    if (this.minCardWidth) {
      this.style.setProperty('--min-card-width', this.minCardWidth);
    }

    if (this.gap) {
      this.style.setProperty('--grid-gap', this.gap);
    }

    if (this.padding) {
      this.style.setProperty('--grid-padding', this.padding);
    }
  }

  override render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dashboard-grid': DashboardGrid;
  }
}
