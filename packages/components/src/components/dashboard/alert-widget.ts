import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

/**
 * Alert Item Data
 */
export interface AlertItem {
  id?: string;
  message: string;
  title?: string;
  priority: 'critical' | 'high' | 'medium' | 'low' | 'info';
  timestamp?: string;
  read?: boolean;
  dismissible?: boolean;
  actionLabel?: string;
  actionUrl?: string;
}

/**
 * Alert Widget - Alert/notification widget with priority levels
 *
 * Features:
 * - Multiple alert priority levels (critical, high, medium, low, info)
 * - Color-coded alerts
 * - Dismissible alerts
 * - Timestamp display
 * - Action buttons
 * - Read/unread states
 */
@customElement('alert-widget')
export class AlertWidget extends LitElement {
  static override styles = [
    baseStyles,
    css`
      :host {
        display: block;
        background: ${tokens.color.grayWhite};
        border-radius: ${tokens.radius.lg};
        overflow: hidden;
      }

      .alerts-container {
        display: flex;
        flex-direction: column;
        gap: 0;
      }

      .alert-item {
        display: flex;
        align-items: flex-start;
        gap: ${tokens.spacing.md};
        padding: ${tokens.spacing.md} ${tokens.spacing.lg};
        border-left: 4px solid transparent;
        border-bottom: 1px solid ${tokens.color.gray100};
        background: ${tokens.color.grayWhite};
        transition: all ${tokens.transition.fast};
        position: relative;
      }

      .alert-item:last-child {
        border-bottom: none;
      }

      .alert-item:hover {
        background: ${tokens.color.gray50};
      }

      .alert-item[data-read='true'] {
        opacity: 0.7;
      }

      /* Priority colors */
      .alert-item[data-priority='critical'] {
        border-left-color: ${tokens.color.danger};
        background: rgba(239, 68, 68, 0.05);
      }

      .alert-item[data-priority='high'] {
        border-left-color: ${tokens.color.warning};
        background: rgba(251, 191, 36, 0.05);
      }

      .alert-item[data-priority='medium'] {
        border-left-color: ${tokens.color.info};
        background: rgba(59, 130, 246, 0.05);
      }

      .alert-item[data-priority='low'] {
        border-left-color: ${tokens.color.gray500};
      }

      .alert-item[data-priority='info'] {
        border-left-color: ${tokens.color.primaryMain};
        background: rgba(99, 102, 241, 0.05);
      }

      .alert-icon {
        font-size: ${tokens.fontSize.xl};
        flex-shrink: 0;
        margin-top: ${tokens.spacing.xxs};
      }

      .alert-content {
        flex: 1;
        min-width: 0;
        display: flex;
        flex-direction: column;
        gap: ${tokens.spacing.xs};
      }

      .alert-header {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: ${tokens.spacing.sm};
      }

      .alert-title {
        font-size: ${tokens.fontSize.sm};
        font-weight: ${tokens.fontWeight.semibold};
        color: ${tokens.color.gray900};
        margin: 0;
      }

      .alert-message {
        font-size: ${tokens.fontSize.sm};
        color: ${tokens.color.gray900};
        line-height: 1.5;
      }

      .alert-footer {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: ${tokens.spacing.md};
        margin-top: ${tokens.spacing.xs};
      }

      .alert-timestamp {
        font-size: ${tokens.fontSize.xs};
        color: ${tokens.color.gray500};
      }

      .alert-action {
        display: inline-flex;
        align-items: center;
        gap: ${tokens.spacing.xs};
        padding: ${tokens.spacing.xs} ${tokens.spacing.sm};
        background: transparent;
        border: 1px solid ${tokens.color.primaryMain};
        border-radius: ${tokens.radius.md};
        color: ${tokens.color.primaryMain};
        font-size: ${tokens.fontSize.xs};
        font-weight: ${tokens.fontWeight.medium};
        text-decoration: none;
        cursor: pointer;
        transition: all ${tokens.transition.fast};
      }

      .alert-action:hover {
        background: ${tokens.color.primaryMain};
        color: ${tokens.color.grayWhite};
      }

      .dismiss-btn {
        padding: ${tokens.spacing.xs};
        background: transparent;
        border: none;
        color: ${tokens.color.gray500};
        cursor: pointer;
        border-radius: ${tokens.radius.sm};
        transition: all ${tokens.transition.fast};
        font-size: ${tokens.fontSize.md};
        line-height: 1;
      }

      .dismiss-btn:hover {
        background: ${tokens.color.gray100};
        color: ${tokens.color.gray900};
      }

      .priority-badge {
        display: inline-flex;
        align-items: center;
        padding: ${tokens.spacing.xxs} ${tokens.spacing.xs};
        border-radius: ${tokens.radius.sm};
        font-size: ${tokens.fontSize.xxs};
        font-weight: ${tokens.fontWeight.semibold};
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }

      .priority-badge[data-priority='critical'] {
        background: ${tokens.color.danger};
        color: ${tokens.color.grayWhite};
      }

      .priority-badge[data-priority='high'] {
        background: ${tokens.color.warning};
        color: ${tokens.color.gray900};
      }

      .priority-badge[data-priority='medium'] {
        background: ${tokens.color.info};
        color: ${tokens.color.grayWhite};
      }

      .priority-badge[data-priority='low'] {
        background: ${tokens.color.gray100};
        color: ${tokens.color.gray900};
      }

      .priority-badge[data-priority='info'] {
        background: ${tokens.color.primaryMain};
        color: ${tokens.color.grayWhite};
      }

      .empty-state {
        padding: ${tokens.spacing.xxl};
        text-align: center;
        color: ${tokens.color.gray500};
      }
    `
  ];

  @property({ type: Array })
  alerts: AlertItem[] = [];

  @property({ type: Boolean })
  showBadges = true;

  private _getAlertIcon(priority: string): string {
    switch (priority) {
      case 'critical': return '🔴';
      case 'high': return '⚠️';
      case 'medium': return 'ℹ️';
      case 'low': return '📌';
      case 'info': return '💡';
      default: return 'ℹ️';
    }
  }

  private _handleDismiss(alert: AlertItem) {
    this.dispatchEvent(new CustomEvent('alert-dismiss', {
      bubbles: true,
      composed: true,
      detail: { alert }
    }));
  }

  private _handleAction(alert: AlertItem) {
    this.dispatchEvent(new CustomEvent('alert-action', {
      bubbles: true,
      composed: true,
      detail: { alert }
    }));
  }

  private _formatTimestamp(timestamp?: string): string {
    if (!timestamp) return '';

    try {
      const date = new Date(timestamp);
      const now = new Date();
      const diff = now.getTime() - date.getTime();

      const minutes = Math.floor(diff / 60000);
      const hours = Math.floor(diff / 3600000);
      const days = Math.floor(diff / 86400000);

      if (minutes < 1) return 'Just now';
      if (minutes < 60) return `${minutes}m ago`;
      if (hours < 24) return `${hours}h ago`;
      if (days < 7) return `${days}d ago`;

      return date.toLocaleDateString();
    } catch {
      return timestamp;
    }
  }

  override render() {
    if (this.alerts.length === 0) {
      return html`
        <div class="empty-state">
          No alerts
        </div>
      `;
    }

    return html`
      <div class="alerts-container">
        ${this.alerts.map(alert => html`
          <div
            class="alert-item"
            data-priority="${alert.priority}"
            data-read="${alert.read || false}"
          >
            <div class="alert-icon">${this._getAlertIcon(alert.priority)}</div>

            <div class="alert-content">
              <div class="alert-header">
                <div>
                  ${alert.title ? html`
                    <h4 class="alert-title">${alert.title}</h4>
                  ` : ''}
                  ${this.showBadges ? html`
                    <span class="priority-badge" data-priority="${alert.priority}">
                      ${alert.priority}
                    </span>
                  ` : ''}
                </div>
                ${alert.dismissible ? html`
                  <button
                    class="dismiss-btn"
                    @click=${() => this._handleDismiss(alert)}
                    title="Dismiss"
                  >
                    ✕
                  </button>
                ` : ''}
              </div>

              <div class="alert-message">${alert.message}</div>

              <div class="alert-footer">
                ${alert.timestamp ? html`
                  <span class="alert-timestamp">
                    ${this._formatTimestamp(alert.timestamp)}
                  </span>
                ` : ''}

                ${alert.actionLabel ? html`
                  <a
                    class="alert-action"
                    href="${alert.actionUrl || '#'}"
                    @click=${(e: Event) => {
                      if (!alert.actionUrl || alert.actionUrl === '#') {
                        e.preventDefault();
                        this._handleAction(alert);
                      }
                    }}
                  >
                    ${alert.actionLabel}
                  </a>
                ` : ''}
              </div>
            </div>
          </div>
        `)}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'alert-widget': AlertWidget;
  }
}
