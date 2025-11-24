import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

export interface LayoutFooterConfig {
  layout?: 'simple' | 'columns' | 'centered';
  bordered?: boolean;
  background?: 'white' | 'gray' | 'dark';
  sticky?: boolean;
  compact?: boolean;
}

/**
 * Layout Footer
 *
 * Footer layout with multiple content sections
 * Supports simple, multi-column, and centered layouts
 */
@customElement('layout-footer')
export class LayoutFooter extends LitElement {
  static override styles = [
    baseStyles,
    css`
      :host {
        display: block;
        width: 100%;
        background: var(--footer-background, ${tokens.color.gray50});
        border-top: var(--footer-border, 1px solid ${tokens.color.gray100});
        padding: var(--footer-padding, ${tokens.spacing.xl} ${tokens.spacing.lg});
        font-family: ${tokens.fontFamily.primary};
      }

      /* Sticky footer */
      :host([sticky]) {
        position: sticky;
        bottom: 0;
        z-index: 50;
      }

      /* Container */
      .footer-container {
        max-width: var(--footer-max-width, 1280px);
        margin: 0 auto;
      }

      /* Simple layout (default) */
      .footer-simple {
        display: flex;
        flex-direction: column;
        gap: ${tokens.spacing.lg};
      }

      .footer-simple .footer-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
        gap: ${tokens.spacing.md};
      }

      .footer-simple .footer-start,
      .footer-simple .footer-end {
        display: flex;
        align-items: center;
        gap: ${tokens.spacing.md};
      }

      /* Columns layout */
      .footer-columns {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: ${tokens.spacing.xl};
        margin-bottom: ${tokens.spacing.lg};
      }

      .footer-bottom {
        margin-top: ${tokens.spacing.lg};
        padding-top: ${tokens.spacing.lg};
        border-top: 1px solid ${tokens.color.gray100};
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
        gap: ${tokens.spacing.md};
        font-size: ${tokens.fontSize.sm};
        color: ${tokens.color.gray500};
      }

      .footer-bottom:empty {
        display: none;
      }

      /* Centered layout */
      .footer-centered {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        gap: ${tokens.spacing.lg};
      }

      .footer-centered .footer-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: ${tokens.spacing.md};
      }

      /* Logo/brand area */
      .footer-brand {
        display: flex;
        flex-direction: column;
        gap: ${tokens.spacing.sm};
      }

      .footer-brand:empty {
        display: none;
      }

      /* Links and sections */
      .footer-section {
        display: flex;
        flex-direction: column;
        gap: ${tokens.spacing.sm};
      }

      .footer-section-title {
        font-weight: ${tokens.fontWeight.semibold};
        font-size: ${tokens.fontSize.sm};
        color: ${tokens.color.gray900};
        margin-bottom: ${tokens.spacing.xs};
      }

      /* Social links */
      .footer-social {
        display: flex;
        gap: ${tokens.spacing.sm};
        align-items: center;
      }

      .footer-social:empty {
        display: none;
      }

      /* Copyright */
      .footer-copyright {
        font-size: ${tokens.fontSize.sm};
        color: ${tokens.color.gray500};
      }

      .footer-copyright:empty {
        display: none;
      }

      /* Background variants */
      :host([background='white']) {
        --footer-background: ${tokens.color.grayWhite};
      }

      :host([background='gray']) {
        --footer-background: ${tokens.color.gray50};
      }

      :host([background='dark']) {
        --footer-background: ${tokens.color.gray900};
        color: ${tokens.color.gray100};
      }

      :host([background='dark']) .footer-bottom {
        border-top-color: rgba(255, 255, 255, 0.1);
      }

      :host([background='dark']) .footer-section-title {
        color: ${tokens.color.grayWhite};
      }

      :host([background='dark']) .footer-copyright,
      :host([background='dark']) .footer-bottom {
        color: ${tokens.color.gray500};
      }

      /* No border */
      :host(:not([bordered])) {
        --footer-border: none;
      }

      /* Compact mode */
      :host([compact]) {
        --footer-padding: ${tokens.spacing.md} ${tokens.spacing.lg};
      }

      /* Responsive adjustments */
      @media (max-width: 992px) {
        .footer-columns {
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: ${tokens.spacing.lg};
        }
      }

      @media (max-width: 768px) {
        :host {
          --footer-padding: ${tokens.spacing.lg} ${tokens.spacing.md};
        }

        .footer-columns {
          grid-template-columns: repeat(2, 1fr);
          gap: ${tokens.spacing.md};
        }

        .footer-simple .footer-content {
          flex-direction: column;
          align-items: flex-start;
        }

        .footer-bottom {
          flex-direction: column;
          align-items: flex-start;
        }
      }

      @media (max-width: 480px) {
        :host {
          --footer-padding: ${tokens.spacing.md} ${tokens.spacing.sm};
        }

        .footer-columns {
          grid-template-columns: 1fr;
        }

        :host([compact]) {
          --footer-padding: ${tokens.spacing.sm};
        }
      }
    `,
  ];

  @property({ type: String, reflect: true })
  layout: 'simple' | 'columns' | 'centered' = 'simple';

  @property({ type: Boolean, reflect: true })
  bordered = true;

  @property({ type: String, reflect: true })
  background: 'white' | 'gray' | 'dark' = 'gray';

  @property({ type: Boolean, reflect: true })
  sticky = false;

  @property({ type: Boolean, reflect: true })
  compact = false;

  override render() {
    if (this.layout === 'columns') {
      return this.renderColumnsLayout();
    } else if (this.layout === 'centered') {
      return this.renderCenteredLayout();
    }
    return this.renderSimpleLayout();
  }

  private renderSimpleLayout() {
    return html`
      <div class="footer-container">
        <div class="footer-simple">
          <div class="footer-content">
            <div class="footer-start">
              <div class="footer-brand">
                <slot name="brand"></slot>
              </div>
              <slot name="links"></slot>
            </div>
            <div class="footer-end">
              <div class="footer-social">
                <slot name="social"></slot>
              </div>
            </div>
          </div>
          <div class="footer-bottom">
            <div class="footer-copyright">
              <slot name="copyright"></slot>
            </div>
            <slot name="legal"></slot>
          </div>
        </div>
      </div>
    `;
  }

  private renderColumnsLayout() {
    return html`
      <div class="footer-container">
        <div class="footer-brand">
          <slot name="brand"></slot>
        </div>
        <div class="footer-columns">
          <div class="footer-section">
            <slot name="column-1"></slot>
          </div>
          <div class="footer-section">
            <slot name="column-2"></slot>
          </div>
          <div class="footer-section">
            <slot name="column-3"></slot>
          </div>
          <div class="footer-section">
            <slot name="column-4"></slot>
          </div>
        </div>
        <div class="footer-bottom">
          <div class="footer-copyright">
            <slot name="copyright"></slot>
          </div>
          <div class="footer-social">
            <slot name="social"></slot>
          </div>
          <slot name="legal"></slot>
        </div>
      </div>
    `;
  }

  private renderCenteredLayout() {
    return html`
      <div class="footer-container">
        <div class="footer-centered">
          <div class="footer-brand">
            <slot name="brand"></slot>
          </div>
          <div class="footer-content">
            <slot name="links"></slot>
          </div>
          <div class="footer-social">
            <slot name="social"></slot>
          </div>
          <div class="footer-copyright">
            <slot name="copyright"></slot>
          </div>
          <slot name="legal"></slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'layout-footer': LayoutFooter;
  }
}
