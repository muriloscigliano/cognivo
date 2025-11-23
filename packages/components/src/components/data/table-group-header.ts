import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

@customElement('table-group-header')
export class TableGroupHeader extends LitElement {
  static override styles = [
    baseStyles,
    css`
      :host {
        display: table-row;
        background: ${tokens.color.gray100};
        font-weight: ${tokens.fontWeight.semibold};
        color: ${tokens.color.gray800};
      }

      .group-cell {
        padding: ${tokens.spacing.md} ${tokens.spacing.lg};
        font-size: ${tokens.fontSize.md};
        border-top: 2px solid ${tokens.color.gray300};
        border-bottom: 1px solid ${tokens.color.gray300};
      }

      .group-count {
        font-size: ${tokens.fontSize.sm};
        color: ${tokens.color.gray600};
        font-weight: ${tokens.fontWeight.normal};
        margin-left: ${tokens.spacing.sm};
      }
    `,
  ];

  @property({ type: String }) label = '';
  @property({ type: Number }) count = 0;
  @property({ type: Number }) colspan = 1;

  override render() {
    return html`
      <td class="group-cell" colspan="${this.colspan}">
        ${this.label} ${this.count > 0 ? html`<span class="group-count">(${this.count})</span>` : ''}
        <slot></slot>
      </td>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'table-group-header': TableGroupHeader;
  }
}
