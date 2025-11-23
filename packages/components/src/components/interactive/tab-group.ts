import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

export interface Tab {
  id: string;
  label: string;
  icon?: string;
  disabled?: boolean;
}

@customElement('tab-group')
export class TabGroup extends LitElement {
  static override styles = [
    baseStyles,
    css`
      :host {
        display: block;
      }

      .tab-list {
        display: flex;
        border-bottom: 2px solid ${tokens.color.gray200};
        gap: ${tokens.spacing.xs};
      }

      .tab {
        padding: ${tokens.spacing.md} ${tokens.spacing.lg};
        background: none;
        border: none;
        border-bottom: 2px solid transparent;
        margin-bottom: -2px;
        color: ${tokens.color.gray600};
        font-size: ${tokens.fontSize.md};
        font-weight: ${tokens.fontWeight.medium};
        cursor: pointer;
        transition: all ${tokens.transition.default};
        display: flex;
        align-items: center;
        gap: ${tokens.spacing.xs};
      }

      .tab:hover:not(:disabled) {
        color: ${tokens.color.gray900};
        background: ${tokens.color.gray50};
      }

      .tab.active {
        color: ${tokens.color.primaryMain};
        border-bottom-color: ${tokens.color.primaryMain};
      }

      .tab:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }

      .tab-content {
        padding: ${tokens.spacing.lg};
      }
    `,
  ];

  @property({ type: Array }) tabs: Tab[] = [];
  @property({ type: String }) activeTab = '';

  override connectedCallback() {
    super.connectedCallback();
    if (!this.activeTab && this.tabs.length > 0) {
      this.activeTab = this.tabs[0].id;
    }
  }

  private _handleTabClick(tab: Tab) {
    if (!tab.disabled) {
      this.activeTab = tab.id;
      this.dispatchEvent(
        new CustomEvent('tab-change', {
          bubbles: true,
          composed: true,
          detail: { tabId: tab.id },
        })
      );
    }
  }

  override render() {
    return html`
      <div role="tablist" class="tab-list">
        ${this.tabs.map(
          (tab) => html`
            <button
              role="tab"
              class="tab ${tab.id === this.activeTab ? 'active' : ''}"
              ?disabled="${tab.disabled}"
              @click="${() => this._handleTabClick(tab)}"
              aria-selected="${tab.id === this.activeTab}"
            >
              ${tab.icon ? html`<span>${tab.icon}</span>` : ''}
              ${tab.label}
            </button>
          `
        )}
      </div>
      <div class="tab-content">
        <slot name="${this.activeTab}"></slot>
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'tab-group': TabGroup;
  }
}
