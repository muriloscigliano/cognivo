import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

/**
 * Widget Action
 */
export interface WidgetAction {
  icon: string;
  label: string;
  action: string;
  disabled?: boolean;
}

/**
 * Widget Header - Widget header with title, icon, and actions
 *
 * Features:
 * - Title with optional icon
 * - Action buttons (refresh, settings, expand, close)
 * - Subtitle support
 * - Badge/indicator support
 * - Collapsible trigger
 */
@customElement('widget-header')
export class WidgetHeader extends LitElement {
  static override styles = [
    baseStyles,
    css`
      :host {
        display: flex;
        align-items: center;
        gap: ${tokens.spacing.md};
        padding: ${tokens.spacing.md} ${tokens.spacing.lg};
        border-bottom: 1px solid ${tokens.color.gray100};
        background: ${tokens.color.gray50};
        border-top-left-radius: ${tokens.radius.lg};
        border-top-right-radius: ${tokens.radius.lg};
      }

      .header-left {
        display: flex;
        align-items: center;
        gap: ${tokens.spacing.sm};
        flex: 1;
        min-width: 0;
      }

      .icon {
        font-size: ${tokens.fontSize.xl};
        flex-shrink: 0;
      }

      .title-area {
        display: flex;
        flex-direction: column;
        gap: ${tokens.spacing.xxs};
        min-width: 0;
        flex: 1;
      }

      .title {
        font-size: ${tokens.fontSize.md};
        font-weight: ${tokens.fontWeight.semibold};
        color: ${tokens.color.gray900};
        margin: 0;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .subtitle {
        font-size: ${tokens.fontSize.xs};
        color: ${tokens.color.gray500};
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .badge {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: ${tokens.spacing.xxs} ${tokens.spacing.xs};
        background: ${tokens.color.primaryMain};
        color: ${tokens.color.grayWhite};
        border-radius: ${tokens.radius.full};
        font-size: ${tokens.fontSize.xs};
        font-weight: ${tokens.fontWeight.medium};
        margin-left: ${tokens.spacing.xs};
        flex-shrink: 0;
      }

      .badge[data-variant='success'] {
        background: ${tokens.color.success};
      }

      .badge[data-variant='warning'] {
        background: ${tokens.color.warning};
      }

      .badge[data-variant='error'] {
        background: ${tokens.color.danger};
      }

      .actions {
        display: flex;
        align-items: center;
        gap: ${tokens.spacing.xs};
        flex-shrink: 0;
      }

      .action-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 32px;
        height: 32px;
        border: none;
        background: transparent;
        border-radius: ${tokens.radius.md};
        color: ${tokens.color.gray500};
        cursor: pointer;
        transition: all ${tokens.transition.fast};
        font-size: ${tokens.fontSize.md};
      }

      .action-btn:hover {
        background: ${tokens.color.gray100};
        color: ${tokens.color.gray900};
      }

      .action-btn:active {
        transform: scale(0.95);
      }

      .action-btn:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }

      .action-btn:disabled:hover {
        background: transparent;
      }

      /* Slot fallback */
      .slot-wrapper {
        display: contents;
      }
    `
  ];

  @property({ type: String })
  title = '';

  @property({ type: String })
  subtitle = '';

  @property({ type: String })
  icon = '';

  @property({ type: String })
  badge = '';

  @property({ type: String })
  badgeVariant: 'primary' | 'success' | 'warning' | 'error' = 'primary';

  @property({ type: Boolean })
  refreshable = false;

  @property({ type: Boolean })
  expandable = false;

  @property({ type: Boolean })
  collapsible = false;

  @property({ type: Boolean })
  closable = false;

  @property({ type: Boolean })
  settingsable = false;

  @state()
  private _collapsed = false;

  @state()
  private _expanded = false;

  private _handleRefresh() {
    this.dispatchEvent(new CustomEvent('widget-refresh', {
      bubbles: true,
      composed: true
    }));
  }

  private _handleSettings() {
    this.dispatchEvent(new CustomEvent('widget-settings', {
      bubbles: true,
      composed: true
    }));
  }

  private _handleExpand() {
    this._expanded = !this._expanded;
    this.dispatchEvent(new CustomEvent('widget-expand', {
      bubbles: true,
      composed: true,
      detail: { expanded: this._expanded }
    }));
  }

  private _handleCollapse() {
    this._collapsed = !this._collapsed;
    this.dispatchEvent(new CustomEvent('widget-collapse', {
      bubbles: true,
      composed: true,
      detail: { collapsed: this._collapsed }
    }));
  }

  private _handleClose() {
    this.dispatchEvent(new CustomEvent('widget-close', {
      bubbles: true,
      composed: true
    }));
  }

  override render() {
    return html`
      <div class="header-left">
        ${this.icon ? html`
          <span class="icon">${this.icon}</span>
        ` : ''}

        <div class="title-area">
          ${this.title ? html`
            <h3 class="title">
              ${this.title}
              ${this.badge ? html`
                <span class="badge" data-variant="${this.badgeVariant}">
                  ${this.badge}
                </span>
              ` : ''}
            </h3>
          ` : ''}

          ${this.subtitle ? html`
            <div class="subtitle">${this.subtitle}</div>
          ` : ''}
        </div>

        <div class="slot-wrapper">
          <slot></slot>
        </div>
      </div>

      <div class="actions">
        <slot name="actions"></slot>

        ${this.refreshable ? html`
          <button
            class="action-btn"
            @click=${this._handleRefresh}
            title="Refresh"
          >
            🔄
          </button>
        ` : ''}

        ${this.settingsable ? html`
          <button
            class="action-btn"
            @click=${this._handleSettings}
            title="Settings"
          >
            ⚙️
          </button>
        ` : ''}

        ${this.collapsible ? html`
          <button
            class="action-btn"
            @click=${this._handleCollapse}
            title="${this._collapsed ? 'Expand' : 'Collapse'}"
          >
            ${this._collapsed ? '▼' : '▲'}
          </button>
        ` : ''}

        ${this.expandable ? html`
          <button
            class="action-btn"
            @click=${this._handleExpand}
            title="${this._expanded ? 'Minimize' : 'Maximize'}"
          >
            ${this._expanded ? '🗗' : '🗖'}
          </button>
        ` : ''}

        ${this.closable ? html`
          <button
            class="action-btn"
            @click=${this._handleClose}
            title="Close"
          >
            ✕
          </button>
        ` : ''}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'widget-header': WidgetHeader;
  }
}
