import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

export interface LayoutSectionConfig {
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  spacing?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  background?: 'transparent' | 'white' | 'gray';
  bordered?: boolean;
  centered?: boolean;
  maxWidth?: string;
}

/**
 * Layout Section
 *
 * Content section with configurable padding, spacing, and background
 * Supports centered content and max-width constraints
 */
@customElement('layout-section')
export class LayoutSection extends LitElement {
  static override styles = [
    baseStyles,
    css`
      :host {
        display: block;
        padding: var(--section-padding, ${tokens.spacing.xl} 0);
        font-family: ${tokens.fontFamily.primary};
      }

      .section-container {
        width: 100%;
        max-width: var(--section-max-width, none);
        margin: 0 auto;
      }

      /* Padding variants */
      :host([padding='none']) {
        --section-padding: 0;
      }

      :host([padding='sm']) {
        --section-padding: ${tokens.spacing.md} 0;
      }

      :host([padding='md']) {
        --section-padding: ${tokens.spacing.lg} 0;
      }

      :host([padding='lg']) {
        --section-padding: ${tokens.spacing.xl} 0;
      }

      :host([padding='xl']) {
        --section-padding: calc(${tokens.spacing.xl} * 2) 0;
      }

      /* Horizontal padding */
      :host([h-padding='sm']) {
        padding-left: ${tokens.spacing.md};
        padding-right: ${tokens.spacing.md};
      }

      :host([h-padding='md']) {
        padding-left: ${tokens.spacing.lg};
        padding-right: ${tokens.spacing.lg};
      }

      :host([h-padding='lg']) {
        padding-left: ${tokens.spacing.xl};
        padding-right: ${tokens.spacing.xl};
      }

      /* Spacing between children */
      :host([spacing='none']) .section-container {
        --section-spacing: 0;
      }

      :host([spacing='sm']) .section-container {
        --section-spacing: ${tokens.spacing.sm};
      }

      :host([spacing='md']) .section-container {
        --section-spacing: ${tokens.spacing.md};
      }

      :host([spacing='lg']) .section-container {
        --section-spacing: ${tokens.spacing.lg};
      }

      :host([spacing='xl']) .section-container {
        --section-spacing: ${tokens.spacing.xl};
      }

      .section-container.with-spacing {
        display: flex;
        flex-direction: column;
        gap: var(--section-spacing, ${tokens.spacing.md});
      }

      /* Background variants */
      :host([background='white']) {
        background: ${tokens.color.grayWhite};
      }

      :host([background='gray']) {
        background: ${tokens.color.gray50};
      }

      :host([background='primary']) {
        background: ${tokens.color.primaryLight};
        color: ${tokens.color.primaryDark};
      }

      /* Bordered section */
      :host([bordered]) {
        border-top: 1px solid ${tokens.color.gray100};
        border-bottom: 1px solid ${tokens.color.gray100};
      }

      :host([bordered='top']) {
        border-top: 1px solid ${tokens.color.gray100};
      }

      :host([bordered='bottom']) {
        border-bottom: 1px solid ${tokens.color.gray100};
      }

      /* Centered content */
      :host([centered]) .section-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
      }

      /* Full width mode */
      :host([full-width]) .section-container {
        max-width: none;
      }

      /* Max width presets */
      :host([max-width='sm']) {
        --section-max-width: 640px;
      }

      :host([max-width='md']) {
        --section-max-width: 768px;
      }

      :host([max-width='lg']) {
        --section-max-width: 1024px;
      }

      :host([max-width='xl']) {
        --section-max-width: 1280px;
      }

      :host([max-width='2xl']) {
        --section-max-width: 1536px;
      }

      /* Header slot */
      .section-header {
        margin-bottom: ${tokens.spacing.lg};
      }

      .section-header:empty {
        display: none;
      }

      /* Footer slot */
      .section-footer {
        margin-top: ${tokens.spacing.lg};
      }

      .section-footer:empty {
        display: none;
      }

      /* Responsive adjustments */
      @media (max-width: 768px) {
        :host {
          padding: var(--section-padding, ${tokens.spacing.lg} 0);
        }

        :host([padding='xl']) {
          --section-padding: ${tokens.spacing.xl} 0;
        }

        :host([h-padding='lg']) {
          padding-left: ${tokens.spacing.lg};
          padding-right: ${tokens.spacing.lg};
        }
      }

      @media (max-width: 480px) {
        :host {
          padding: var(--section-padding, ${tokens.spacing.md} 0);
        }

        :host([h-padding='md']),
        :host([h-padding='lg']) {
          padding-left: ${tokens.spacing.md};
          padding-right: ${tokens.spacing.md};
        }

        .section-header {
          margin-bottom: ${tokens.spacing.md};
        }

        .section-footer {
          margin-top: ${tokens.spacing.md};
        }
      }
    `,
  ];

  @property({ type: String, reflect: true })
  padding: 'none' | 'sm' | 'md' | 'lg' | 'xl' = 'lg';

  @property({ type: String, reflect: true, attribute: 'h-padding' })
  hPadding: 'none' | 'sm' | 'md' | 'lg' = 'none';

  @property({ type: String, reflect: true })
  spacing: 'none' | 'sm' | 'md' | 'lg' | 'xl' = 'none';

  @property({ type: String, reflect: true })
  background: 'transparent' | 'white' | 'gray' | 'primary' = 'transparent';

  @property({ type: String, reflect: true })
  bordered: boolean | 'top' | 'bottom' = false;

  @property({ type: Boolean, reflect: true })
  centered = false;

  @property({ type: String, reflect: true, attribute: 'max-width' })
  maxWidth: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '' = '';

  @property({ type: Boolean, reflect: true, attribute: 'full-width' })
  fullWidth = false;

  override connectedCallback() {
    super.connectedCallback();
    if (this.maxWidth && !['sm', 'md', 'lg', 'xl', '2xl'].includes(this.maxWidth)) {
      this.style.setProperty('--section-max-width', this.maxWidth);
    }
  }

  override render() {
    const hasSpacing = this.spacing !== 'none';

    return html`
      <div class="section-container ${hasSpacing ? 'with-spacing' : ''}">
        <div class="section-header">
          <slot name="header"></slot>
        </div>
        <slot></slot>
        <div class="section-footer">
          <slot name="footer"></slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'layout-section': LayoutSection;
  }
}
