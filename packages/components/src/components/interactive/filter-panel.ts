import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

@customElement('filter-panel')
export class FilterPanel extends LitElement {
  static override styles = [
    baseStyles,
    css`
      :host {
        display: block;
        background: ${tokens.color.gray50};
        padding: ${tokens.spacing.lg};
        border-radius: ${tokens.radius.md};
      }

      .panel-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: ${tokens.spacing.md};
      }

      .panel-title {
        font-size: ${tokens.fontSize.md};
        font-weight: ${tokens.fontWeight.semibold};
      }

      .clear-btn {
        padding: ${tokens.spacing.xs} ${tokens.spacing.sm};
        background: none;
        border: 1px solid ${tokens.color.gray100};
        border-radius: ${tokens.radius.sm};
        cursor: pointer;
        font-size: ${tokens.fontSize.sm};
      }

      .filters-content {
        display: flex;
        flex-direction: column;
        gap: ${tokens.spacing.md};
      }
    `,
  ];

  @property({ type: String }) title = 'Filters';

  private _handleClear() {
    this.dispatchEvent(new CustomEvent('clear-filters'));
  }

  override render() {
    return html`
      <div class="panel-header">
        <div class="panel-title">${this.title}</div>
        <button class="clear-btn" @click="${this._handleClear}">Clear All</button>
      </div>
      <div class="filters-content">
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'filter-panel': FilterPanel;
  }
}
