import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

@customElement('category-chip')
export class CategoryChip extends LitElement {
  static override styles = [
    baseStyles,
    css`
      :host {
        display: inline-flex;
        align-items: center;
        gap: ${tokens.spacing.xs};
        padding: ${tokens.spacing.xs} ${tokens.spacing.md};
        border-radius: ${tokens.radius.sm};
        font-size: ${tokens.fontSize.sm};
        font-weight: ${tokens.fontWeight.medium};
        background: ${tokens.color.gray100};
        color: ${tokens.color.gray800};
        border: 1px solid ${tokens.color.gray200};
        transition: all ${tokens.transition.default};
        cursor: default;
      }

      :host(:hover) {
        background: ${tokens.color.gray200};
      }

      :host([clickable]) {
        cursor: pointer;
      }

      :host([clickable]:hover) {
        border-color: ${tokens.color.primaryMain};
        color: ${tokens.color.primaryMain};
      }

      :host([selected]) {
        background: ${tokens.color.primaryLight};
        color: ${tokens.color.primaryMain};
        border-color: ${tokens.color.primaryMain};
      }

      .icon {
        display: flex;
        align-items: center;
        font-size: ${tokens.fontSize.md};
      }

      .remove-btn {
        margin-left: ${tokens.spacing.xs};
        padding: 0;
        background: none;
        border: none;
        color: inherit;
        opacity: 0.6;
        cursor: pointer;
        display: flex;
        align-items: center;
        transition: opacity ${tokens.transition.default};
      }

      .remove-btn:hover {
        opacity: 1;
      }
    `,
  ];

  @property({ type: String }) icon = '';
  @property({ type: Boolean }) clickable = false;
  @property({ type: Boolean }) selected = false;
  @property({ type: Boolean }) removable = false;

  private _handleRemove(e: Event) {
    e.stopPropagation();
    this.dispatchEvent(
      new CustomEvent('remove', {
        bubbles: true,
        composed: true,
      })
    );
  }

  override render() {
    return html`
      ${this.icon ? html`<span class="icon">${this.icon}</span>` : ''}
      <slot></slot>
      ${this.removable
        ? html`
            <button class="remove-btn" @click="${this._handleRemove}" aria-label="Remove">✕</button>
          `
        : ''}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'category-chip': CategoryChip;
  }
}
