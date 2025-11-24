import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

@customElement('list-item')
export class ListItem extends LitElement {
  static override styles = [
    baseStyles,
    css`
      :host {
        display: flex;
        align-items: center;
        gap: ${tokens.spacing.md};
        padding: ${tokens.spacing.md} ${tokens.spacing.lg};
        border-bottom: 1px solid ${tokens.color.gray100};
        transition: background ${tokens.transition.default};
        cursor: default;
      }

      :host([clickable]) {
        cursor: pointer;
      }

      :host([clickable]:hover) {
        background: ${tokens.color.gray50};
      }

      :host([active]) {
        background: ${tokens.color.primaryLight};
        border-left: 3px solid ${tokens.color.primaryMain};
      }

      :host([disabled]) {
        opacity: 0.5;
        cursor: not-allowed;
      }

      .content {
        flex: 1;
        min-width: 0;
        display: flex;
        flex-direction: column;
        gap: ${tokens.spacing.xs};
      }

      .actions {
        flex-shrink: 0;
        display: flex;
        gap: ${tokens.spacing.sm};
        align-items: center;
      }

      .prefix {
        flex-shrink: 0;
      }
    `,
  ];

  @property({ type: Boolean }) clickable = false;
  @property({ type: Boolean }) active = false;
  @property({ type: Boolean }) disabled = false;

  private _handleClick(e: Event) {
    if (this.disabled) {
      e.preventDefault();
      return;
    }

    this.dispatchEvent(
      new CustomEvent('item-click', {
        bubbles: true,
        composed: true,
        detail: { item: this },
      })
    );
  }

  override render() {
    return html`
      <div class="prefix" @click="${this._handleClick}">
        <slot name="prefix"></slot>
      </div>
      <div class="content" @click="${this._handleClick}">
        <slot></slot>
      </div>
      <div class="actions">
        <slot name="actions"></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'list-item': ListItem;
  }
}
