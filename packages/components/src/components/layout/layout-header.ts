import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

export interface LayoutHeaderConfig {
  sticky?: boolean;
  bordered?: boolean;
  shadow?: boolean;
  centered?: boolean;
  height?: 'sm' | 'md' | 'lg';
  background?: 'white' | 'gray' | 'transparent';
}

/**
 * Layout Header
 *
 * Header layout with logo, navigation, and actions slots
 * Supports sticky positioning and multiple styling options
 */
@customElement('layout-header')
export class LayoutHeader extends LitElement {
  static override styles = [
    baseStyles,
    css`
      :host {
        display: block;
        width: 100%;
        background: var(--header-background, ${tokens.color.grayWhite});
        border-bottom: var(--header-border, 1px solid ${tokens.color.gray100});
        font-family: ${tokens.fontFamily.primary};
        z-index: 100;
      }

      /* Sticky positioning */
      :host([sticky]) {
        position: sticky;
        top: 0;
      }

      /* Shadow */
      :host([shadow]) {
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      }

      .header-container {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: var(--header-padding, ${tokens.spacing.md} ${tokens.spacing.lg});
        max-width: var(--header-max-width, none);
        margin: 0 auto;
        gap: ${tokens.spacing.lg};
        height: var(--header-height, auto);
      }

      /* Header sections */
      .header-start {
        display: flex;
        align-items: center;
        gap: ${tokens.spacing.lg};
        flex-shrink: 0;
      }

      .header-logo {
        display: flex;
        align-items: center;
        gap: ${tokens.spacing.sm};
      }

      .header-logo:empty {
        display: none;
      }

      .header-center {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: ${tokens.spacing.md};
      }

      .header-center:empty {
        display: none;
      }

      .header-end {
        display: flex;
        align-items: center;
        gap: ${tokens.spacing.md};
        flex-shrink: 0;
      }

      .header-end:empty {
        display: none;
      }

      /* Height variants */
      :host([height='sm']) {
        --header-height: 48px;
        --header-padding: ${tokens.spacing.sm} ${tokens.spacing.md};
      }

      :host([height='md']) {
        --header-height: 64px;
        --header-padding: ${tokens.spacing.md} ${tokens.spacing.lg};
      }

      :host([height='lg']) {
        --header-height: 80px;
        --header-padding: ${tokens.spacing.lg} ${tokens.spacing.xl};
      }

      /* Background variants */
      :host([background='white']) {
        --header-background: ${tokens.color.grayWhite};
      }

      :host([background='gray']) {
        --header-background: ${tokens.color.gray50};
      }

      :host([background='transparent']) {
        --header-background: transparent;
        --header-border: none;
      }

      :host([background='primary']) {
        --header-background: ${tokens.color.primaryMain};
        --header-border: none;
        color: white;
      }

      /* No border */
      :host(:not([bordered])) {
        --header-border: none;
      }

      /* Centered content */
      :host([centered]) .header-container {
        max-width: 1280px;
      }

      /* Mobile nav toggle */
      .mobile-toggle {
        display: none;
      }

      /* Responsive behavior */
      @media (max-width: 992px) {
        .header-container {
          gap: ${tokens.spacing.md};
        }

        .header-start,
        .header-end {
          gap: ${tokens.spacing.sm};
        }
      }

      @media (max-width: 768px) {
        :host {
          --header-padding: ${tokens.spacing.sm} ${tokens.spacing.md};
        }

        .header-container {
          gap: ${tokens.spacing.sm};
        }

        .header-center {
          display: none;
        }

        .mobile-toggle {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border: none;
          background: transparent;
          cursor: pointer;
          border-radius: ${tokens.radius.md};
          transition: background ${tokens.transition.fast};
        }

        .mobile-toggle:hover {
          background: ${tokens.color.gray50};
        }

        .mobile-toggle::before {
          content: '☰';
          font-size: 20px;
          color: ${tokens.color.gray900};
        }

        :host([background='primary']) .mobile-toggle::before {
          color: white;
        }

        /* Show mobile menu slot when active */
        .mobile-menu {
          display: none;
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          background: ${tokens.color.grayWhite};
          border-bottom: 1px solid ${tokens.color.gray100};
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          padding: ${tokens.spacing.md};
        }

        :host([mobile-menu-open]) .mobile-menu {
          display: block;
        }
      }

      @media (max-width: 480px) {
        :host {
          --header-padding: ${tokens.spacing.xs} ${tokens.spacing.sm};
        }

        .header-start,
        .header-end {
          gap: ${tokens.spacing.xs};
        }
      }
    `,
  ];

  @property({ type: Boolean, reflect: true })
  sticky = false;

  @property({ type: Boolean, reflect: true })
  bordered = true;

  @property({ type: Boolean, reflect: true })
  shadow = false;

  @property({ type: Boolean, reflect: true })
  centered = false;

  @property({ type: String, reflect: true })
  height: 'sm' | 'md' | 'lg' = 'md';

  @property({ type: String, reflect: true })
  background: 'white' | 'gray' | 'transparent' | 'primary' = 'white';

  @property({ type: Boolean, reflect: true, attribute: 'mobile-menu-open' })
  mobileMenuOpen = false;

  private handleMobileToggle() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
    this.dispatchEvent(new CustomEvent('mobile-menu-toggle', {
      detail: { open: this.mobileMenuOpen },
      bubbles: true,
      composed: true,
    }));
  }

  override render() {
    return html`
      <div class="header-container">
        <div class="header-start">
          <button class="mobile-toggle" @click=${this.handleMobileToggle}></button>
          <div class="header-logo">
            <slot name="logo"></slot>
          </div>
          <slot name="nav"></slot>
        </div>

        <div class="header-center">
          <slot name="center"></slot>
        </div>

        <div class="header-end">
          <slot name="actions"></slot>
        </div>
      </div>

      <div class="mobile-menu">
        <slot name="mobile-menu"></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'layout-header': LayoutHeader;
  }
}
