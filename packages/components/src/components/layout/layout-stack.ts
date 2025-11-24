import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

export interface LayoutStackConfig {
  direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  gap?: string | 'none' | 'sm' | 'md' | 'lg' | 'xl';
  align?: 'start' | 'center' | 'end' | 'stretch' | 'baseline';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  wrap?: boolean | 'wrap' | 'nowrap' | 'wrap-reverse';
  inline?: boolean;
  responsive?: boolean;
}

/**
 * Layout Stack
 *
 * Vertical/horizontal stack layout with full Flexbox control
 * Supports gap, alignment, justification, and wrapping
 */
@customElement('layout-stack')
export class LayoutStack extends LitElement {
  static override styles = [
    baseStyles,
    css`
      :host {
        display: var(--stack-display, flex);
        flex-direction: var(--stack-direction, column);
        flex-wrap: var(--stack-wrap, nowrap);
        gap: var(--stack-gap, ${tokens.spacing.md});
        align-items: var(--stack-align, stretch);
        justify-content: var(--stack-justify, flex-start);
        font-family: ${tokens.fontFamily.primary};
      }

      /* Inline display */
      :host([inline]) {
        --stack-display: inline-flex;
      }

      /* Direction variants */
      :host([direction='row']) {
        --stack-direction: row;
      }

      :host([direction='column']) {
        --stack-direction: column;
      }

      :host([direction='row-reverse']) {
        --stack-direction: row-reverse;
      }

      :host([direction='column-reverse']) {
        --stack-direction: column-reverse;
      }

      /* Align items variants */
      :host([align='start']) {
        --stack-align: flex-start;
      }

      :host([align='center']) {
        --stack-align: center;
      }

      :host([align='end']) {
        --stack-align: flex-end;
      }

      :host([align='stretch']) {
        --stack-align: stretch;
      }

      :host([align='baseline']) {
        --stack-align: baseline;
      }

      /* Justify content variants */
      :host([justify='start']) {
        --stack-justify: flex-start;
      }

      :host([justify='center']) {
        --stack-justify: center;
      }

      :host([justify='end']) {
        --stack-justify: flex-end;
      }

      :host([justify='between']) {
        --stack-justify: space-between;
      }

      :host([justify='around']) {
        --stack-justify: space-around;
      }

      :host([justify='evenly']) {
        --stack-justify: space-evenly;
      }

      /* Wrap variants */
      :host([wrap]) {
        --stack-wrap: wrap;
      }

      :host([wrap='wrap']) {
        --stack-wrap: wrap;
      }

      :host([wrap='nowrap']) {
        --stack-wrap: nowrap;
      }

      :host([wrap='wrap-reverse']) {
        --stack-wrap: wrap-reverse;
      }

      /* Gap size variants */
      :host([gap='none']) {
        --stack-gap: 0;
      }

      :host([gap='sm']) {
        --stack-gap: ${tokens.spacing.sm};
      }

      :host([gap='md']) {
        --stack-gap: ${tokens.spacing.md};
      }

      :host([gap='lg']) {
        --stack-gap: ${tokens.spacing.lg};
      }

      :host([gap='xl']) {
        --stack-gap: ${tokens.spacing.xl};
      }

      /* Divider support */
      :host([divider]) ::slotted(*:not(:last-child))::after {
        content: '';
        display: block;
        margin-top: var(--stack-gap, ${tokens.spacing.md});
      }

      :host([divider][direction='row']) ::slotted(*:not(:last-child))::after {
        display: none;
      }

      :host([divider]) ::slotted(*:not(:last-child)) {
        border-bottom: 1px solid ${tokens.color.gray100};
        padding-bottom: var(--stack-gap, ${tokens.spacing.md});
      }

      :host([divider][direction='row']) ::slotted(*:not(:last-child)) {
        border-bottom: none;
        border-right: 1px solid ${tokens.color.gray100};
        padding-bottom: 0;
        padding-right: var(--stack-gap, ${tokens.spacing.md});
      }

      /* Full width/height */
      :host([full-width]) {
        width: 100%;
      }

      :host([full-height]) {
        height: 100%;
      }

      /* Flex item controls */
      ::slotted([data-flex='1']) {
        flex: 1;
      }

      ::slotted([data-flex='auto']) {
        flex: auto;
      }

      ::slotted([data-flex='none']) {
        flex: none;
      }

      ::slotted([data-shrink='0']) {
        flex-shrink: 0;
      }

      ::slotted([data-grow='0']) {
        flex-grow: 0;
      }

      ::slotted([data-grow='1']) {
        flex-grow: 1;
      }

      /* Responsive behavior */
      @media (max-width: 768px) {
        :host([responsive]) {
          --stack-gap: ${tokens.spacing.sm};
        }

        :host([responsive][direction='row']) {
          --stack-direction: column;
        }

        :host([responsive][direction='row-reverse']) {
          --stack-direction: column-reverse;
        }
      }

      @media (max-width: 480px) {
        :host {
          --stack-gap: ${tokens.spacing.sm};
        }
      }
    `,
  ];

  @property({ type: String, reflect: true })
  direction: 'row' | 'column' | 'row-reverse' | 'column-reverse' = 'column';

  @property({ type: String, reflect: true })
  align: 'start' | 'center' | 'end' | 'stretch' | 'baseline' = 'stretch';

  @property({ type: String, reflect: true })
  justify: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly' = 'start';

  @property({ type: String })
  gap: string | 'none' | 'sm' | 'md' | 'lg' | 'xl' = 'md';

  @property({ type: String, reflect: true })
  wrap: boolean | 'wrap' | 'nowrap' | 'wrap-reverse' = false;

  @property({ type: Boolean, reflect: true })
  inline = false;

  @property({ type: Boolean, reflect: true })
  responsive = false;

  @property({ type: Boolean, reflect: true })
  divider = false;

  @property({ type: Boolean, reflect: true, attribute: 'full-width' })
  fullWidth = false;

  @property({ type: Boolean, reflect: true, attribute: 'full-height' })
  fullHeight = false;

  override connectedCallback() {
    super.connectedCallback();

    // Set custom gap if not using preset
    if (this.gap && !['none', 'sm', 'md', 'lg', 'xl'].includes(this.gap)) {
      this.style.setProperty('--stack-gap', this.gap);
    }
  }

  override render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'layout-stack': LayoutStack;
  }
}
