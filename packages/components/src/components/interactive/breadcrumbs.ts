import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: string;
}

@customElement('breadcrumbs')
export class Breadcrumbs extends LitElement {
  static override styles = [
    baseStyles,
    css`
      :host {
        display: block;
      }

      .breadcrumbs-container {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: ${tokens.spacing.xs};
        font-size: ${tokens.fontSize.sm};
      }

      .breadcrumb-item {
        display: flex;
        align-items: center;
        gap: ${tokens.spacing.xs};
        color: ${tokens.color.gray500};
        text-decoration: none;
        transition: color ${tokens.transition.default};
      }

      .breadcrumb-item.link {
        cursor: pointer;
      }

      .breadcrumb-item.link:hover {
        color: ${tokens.color.primaryMain};
      }

      .breadcrumb-item.active {
        color: ${tokens.color.gray900};
        font-weight: ${tokens.fontWeight.medium};
      }

      .separator {
        color: ${tokens.color.gray500};
        user-select: none;
      }

      .icon {
        display: flex;
        align-items: center;
      }
    `,
  ];

  @property({ type: Array }) items: BreadcrumbItem[] = [];
  @property({ type: String }) separator = '/';

  private _handleClick(item: BreadcrumbItem, index: number) {
    if (item.href || index < this.items.length - 1) {
      this.dispatchEvent(
        new CustomEvent('breadcrumb-click', {
          bubbles: true,
          composed: true,
          detail: { item, index },
        })
      );
    }
  }

  override render() {
    return html`
      <nav class="breadcrumbs-container" aria-label="Breadcrumb">
        ${this.items.map(
          (item, index) => html`
            ${index > 0 ? html`<span class="separator">${this.separator}</span>` : ''}
            <a
              class="breadcrumb-item ${item.href || index < this.items.length - 1 ? 'link' : ''} ${index === this.items.length - 1 ? 'active' : ''}"
              href="${item.href || '#'}"
              @click="${(e: Event) => {
                if (!item.href) e.preventDefault();
                this._handleClick(item, index);
              }}"
            >
              ${item.icon ? html`<span class="icon">${item.icon}</span>` : ''}
              ${item.label}
            </a>
          `
        )}
      </nav>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'breadcrumbs': Breadcrumbs;
  }
}
