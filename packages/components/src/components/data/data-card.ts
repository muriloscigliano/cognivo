import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

/**
 * Data Card Component
 *
 * Beautiful card for displaying metrics and data with optional icon
 *
 * @element data-card
 *
 * @attr {string} title - Card title
 * @attr {string} value - Main value to display
 * @attr {string} subtitle - Optional subtitle
 * @attr {string} icon - Optional icon (emoji or text)
 * @attr {string} variant - Color variant: 'default' | 'primary' | 'success' | 'warning' | 'danger'
 *
 * @example
 * ```html
 * <data-card
 *   title="Total Users"
 *   value="1,234"
 *   subtitle="+12% from last month"
 *   icon="👥"
 *   variant="primary"
 * ></data-card>
 * ```
 */
@customElement('data-card')
export class DataCard extends LitElement {
  static override styles = [
    baseStyles,
    css`
      :host {
        display: block;
        background: ${tokens.color.grayWhite};
        border-radius: ${tokens.radius.lg};
        padding: ${tokens.spacing.lg};
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        transition: all ${tokens.transition.default};
      }

      :host(:hover) {
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        transform: translateY(-2px);
      }

      .card-container {
        display: flex;
        flex-direction: column;
        gap: ${tokens.spacing.sm};
      }

      .header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
      }

      .title {
        font-family: ${tokens.fontFamily.primary};
        font-size: ${tokens.fontSize.sm};
        font-weight: ${tokens.fontWeight.medium};
        color: ${tokens.color.gray500};
        margin: 0;
      }

      .icon {
        font-size: ${tokens.fontSize.xl};
        line-height: 1;
      }

      .value {
        font-family: ${tokens.fontFamily.display};
        font-size: ${tokens.fontSize['2xl']};
        font-weight: ${tokens.fontWeight.bold};
        color: var(--card-color, ${tokens.color.gray900});
        margin: 0;
        line-height: 1.2;
      }

      .subtitle {
        font-family: ${tokens.fontFamily.primary};
        font-size: ${tokens.fontSize.xs};
        color: ${tokens.color.gray500};
        margin: 0;
      }

      /* Variants */
      :host([variant='primary']) {
        --card-color: ${tokens.color.primaryMain};
        border-left: 4px solid ${tokens.color.primaryMain};
      }

      :host([variant='success']) {
        --card-color: ${tokens.color.success};
        border-left: 4px solid ${tokens.color.success};
      }

      :host([variant='warning']) {
        --card-color: ${tokens.color.warning};
        border-left: 4px solid ${tokens.color.warning};
      }

      :host([variant='danger']) {
        --card-color: ${tokens.color.danger};
        border-left: 4px solid ${tokens.color.danger};
      }

      ::slotted(*) {
        margin-top: ${tokens.spacing.sm};
      }
    `,
  ];

  @property({ type: String })
  override title = '';

  @property({ type: String })
  value = '';

  @property({ type: String })
  subtitle = '';

  @property({ type: String })
  icon = '';

  @property({ type: String, reflect: true })
  variant: 'default' | 'primary' | 'success' | 'warning' | 'danger' = 'default';

  override render() {
    return html`
      <div class="card-container">
        <div class="header">
          ${this.title ? html`<h3 class="title">${this.title}</h3>` : null}
          ${this.icon ? html`<div class="icon">${this.icon}</div>` : null}
        </div>

        ${this.value ? html`<div class="value">${this.value}</div>` : null}
        ${this.subtitle ? html`<div class="subtitle">${this.subtitle}</div>` : null}

        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'data-card': DataCard;
  }
}
