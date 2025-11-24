import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

/**
 * Footer Link
 */
export interface FooterLink {
  label: string;
  href?: string;
  action?: string;
  icon?: string;
}

/**
 * Widget Footer - Widget footer with actions and links
 *
 * Features:
 * - Action buttons
 * - Navigation links
 * - Metadata display
 * - Timestamp/update info
 */
@customElement('widget-footer')
export class WidgetFooter extends LitElement {
  static override styles = [
    baseStyles,
    css`
      :host {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: ${tokens.spacing.md};
        padding: ${tokens.spacing.md} ${tokens.spacing.lg};
        background: ${tokens.color.gray50};
        border-top: 1px solid ${tokens.color.gray100};
        border-bottom-left-radius: ${tokens.radius.lg};
        border-bottom-right-radius: ${tokens.radius.lg};
        font-size: ${tokens.fontSize.sm};
      }

      :host([align='left']) {
        justify-content: flex-start;
      }

      :host([align='center']) {
        justify-content: center;
      }

      :host([align='right']) {
        justify-content: flex-end;
      }

      .footer-left {
        display: flex;
        align-items: center;
        gap: ${tokens.spacing.sm};
        flex: 1;
      }

      .footer-right {
        display: flex;
        align-items: center;
        gap: ${tokens.spacing.sm};
        flex-shrink: 0;
      }

      .links {
        display: flex;
        align-items: center;
        gap: ${tokens.spacing.md};
        flex-wrap: wrap;
      }

      .link {
        display: inline-flex;
        align-items: center;
        gap: ${tokens.spacing.xs};
        color: ${tokens.color.primaryMain};
        text-decoration: none;
        cursor: pointer;
        transition: all ${tokens.transition.fast};
        font-weight: ${tokens.fontWeight.medium};
      }

      .link:hover {
        color: ${tokens.color.primaryDark};
        text-decoration: underline;
      }

      .metadata {
        display: flex;
        align-items: center;
        gap: ${tokens.spacing.sm};
        color: ${tokens.color.gray500};
        font-size: ${tokens.fontSize.xs};
      }

      .metadata-item {
        display: flex;
        align-items: center;
        gap: ${tokens.spacing.xxs};
      }

      .metadata-divider {
        color: ${tokens.color.gray500};
      }

      .actions {
        display: flex;
        align-items: center;
        gap: ${tokens.spacing.xs};
      }

      .action-btn {
        padding: ${tokens.spacing.xs} ${tokens.spacing.sm};
        background: transparent;
        border: 1px solid ${tokens.color.gray100};
        border-radius: ${tokens.radius.md};
        color: ${tokens.color.gray900};
        cursor: pointer;
        transition: all ${tokens.transition.fast};
        font-size: ${tokens.fontSize.xs};
        font-weight: ${tokens.fontWeight.medium};
        display: inline-flex;
        align-items: center;
        gap: ${tokens.spacing.xs};
      }

      .action-btn:hover {
        background: ${tokens.color.gray100};
        border-color: ${tokens.color.gray500};
      }

      .action-btn[data-variant='primary'] {
        background: ${tokens.color.primaryMain};
        border-color: ${tokens.color.primaryMain};
        color: ${tokens.color.grayWhite};
      }

      .action-btn[data-variant='primary']:hover {
        background: ${tokens.color.primaryDark};
        border-color: ${tokens.color.primaryDark};
      }

      .timestamp {
        color: ${tokens.color.gray500};
        font-size: ${tokens.fontSize.xs};
        font-style: italic;
      }
    `
  ];

  @property({ type: String, reflect: true })
  align: 'left' | 'center' | 'right' | 'between' = 'between';

  @property({ type: Array })
  links: FooterLink[] = [];

  @property({ type: String })
  timestamp = '';

  @property({ type: String })
  metadata = '';

  private _handleLinkClick(link: FooterLink) {
    return (e: Event) => {
      if (link.action) {
        e.preventDefault();
        this.dispatchEvent(new CustomEvent('footer-action', {
          bubbles: true,
          composed: true,
          detail: { action: link.action }
        }));
      }
    };
  }

  private _renderLinks() {
    if (this.links.length === 0) return '';

    return html`
      <div class="links">
        ${this.links.map((link, index) => html`
          ${index > 0 ? html`<span class="metadata-divider">•</span>` : ''}
          <a
            class="link"
            href="${link.href || '#'}"
            @click=${this._handleLinkClick(link)}
          >
            ${link.icon ? html`<span>${link.icon}</span>` : ''}
            ${link.label}
          </a>
        `)}
      </div>
    `;
  }

  private _renderMetadata() {
    if (!this.metadata && !this.timestamp) return '';

    return html`
      <div class="metadata">
        ${this.metadata ? html`
          <span class="metadata-item">${this.metadata}</span>
        ` : ''}
        ${this.metadata && this.timestamp ? html`
          <span class="metadata-divider">•</span>
        ` : ''}
        ${this.timestamp ? html`
          <span class="timestamp">${this.timestamp}</span>
        ` : ''}
      </div>
    `;
  }

  override render() {
    return html`
      <div class="footer-left">
        ${this._renderLinks()}
        <slot name="left"></slot>
      </div>

      <div class="footer-right">
        <slot name="actions"></slot>
        ${this._renderMetadata()}
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'widget-footer': WidgetFooter;
  }
}
