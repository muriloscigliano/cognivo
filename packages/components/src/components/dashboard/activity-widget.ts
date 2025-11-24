import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

/**
 * Activity Item Data
 */
export interface ActivityItem {
  id?: string;
  type: 'info' | 'success' | 'warning' | 'error' | 'custom';
  title: string;
  description?: string;
  timestamp: string;
  icon?: string;
  user?: string;
  avatar?: string;
  actionLabel?: string;
  actionUrl?: string;
}

/**
 * Activity Widget - Activity feed/timeline widget
 *
 * Features:
 * - Vertical timeline layout
 * - Activity type indicators
 * - User avatars
 * - Timestamps with relative time
 * - Action buttons
 * - Infinite scroll support
 */
@customElement('activity-widget')
export class ActivityWidget extends LitElement {
  static override styles = [
    baseStyles,
    css`
      :host {
        display: block;
        background: ${tokens.color.grayWhite};
        border-radius: ${tokens.radius.lg};
        overflow: hidden;
      }

      .activities-container {
        display: flex;
        flex-direction: column;
        padding: ${tokens.spacing.md};
      }

      .activity-item {
        display: flex;
        gap: ${tokens.spacing.md};
        padding: ${tokens.spacing.md} 0;
        position: relative;
      }

      .activity-item:not(:last-child)::after {
        content: '';
        position: absolute;
        left: 15px;
        top: 40px;
        bottom: -16px;
        width: 2px;
        background: ${tokens.color.gray100};
      }

      .activity-indicator {
        flex-shrink: 0;
        width: 32px;
        height: 32px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        background: ${tokens.color.grayWhite};
        border: 2px solid ${tokens.color.gray100};
        font-size: ${tokens.fontSize.sm};
        z-index: 1;
      }

      .activity-indicator[data-type='info'] {
        border-color: ${tokens.color.info};
        background: rgba(59, 130, 246, 0.1);
      }

      .activity-indicator[data-type='success'] {
        border-color: ${tokens.color.success};
        background: rgba(34, 197, 94, 0.1);
      }

      .activity-indicator[data-type='warning'] {
        border-color: ${tokens.color.warning};
        background: rgba(251, 191, 36, 0.1);
      }

      .activity-indicator[data-type='error'] {
        border-color: ${tokens.color.danger};
        background: rgba(239, 68, 68, 0.1);
      }

      .avatar {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        object-fit: cover;
        border: 2px solid ${tokens.color.grayWhite};
        box-shadow: ${tokens.shadow.sm};
      }

      .activity-content {
        flex: 1;
        min-width: 0;
        padding-bottom: ${tokens.spacing.sm};
      }

      .activity-header {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: ${tokens.spacing.sm};
        margin-bottom: ${tokens.spacing.xs};
      }

      .activity-title {
        font-size: ${tokens.fontSize.sm};
        font-weight: ${tokens.fontWeight.semibold};
        color: ${tokens.color.gray900};
        margin: 0;
      }

      .activity-user {
        color: ${tokens.color.primaryMain};
        font-weight: ${tokens.fontWeight.semibold};
      }

      .activity-timestamp {
        font-size: ${tokens.fontSize.xs};
        color: ${tokens.color.gray500};
        white-space: nowrap;
        flex-shrink: 0;
      }

      .activity-description {
        font-size: ${tokens.fontSize.sm};
        color: ${tokens.color.gray500};
        line-height: 1.5;
        margin-top: ${tokens.spacing.xs};
      }

      .activity-action {
        display: inline-flex;
        align-items: center;
        gap: ${tokens.spacing.xs};
        padding: ${tokens.spacing.xs} ${tokens.spacing.sm};
        margin-top: ${tokens.spacing.sm};
        background: transparent;
        border: 1px solid ${tokens.color.gray100};
        border-radius: ${tokens.radius.md};
        color: ${tokens.color.gray900};
        font-size: ${tokens.fontSize.xs};
        text-decoration: none;
        cursor: pointer;
        transition: all ${tokens.transition.fast};
      }

      .activity-action:hover {
        background: ${tokens.color.gray100};
        border-color: ${tokens.color.gray500};
      }

      .empty-state {
        padding: ${tokens.spacing.xxl};
        text-align: center;
        color: ${tokens.color.gray500};
      }

      /* Compact mode */
      :host([compact]) .activity-item {
        padding: ${tokens.spacing.sm} 0;
      }

      :host([compact]) .activity-description {
        font-size: ${tokens.fontSize.xs};
      }
    `
  ];

  @property({ type: Array })
  activities: ActivityItem[] = [];

  @property({ type: Boolean, reflect: true })
  compact = false;

  @property({ type: String })
  emptyText = 'No recent activity';

  private _getActivityIcon(type: string, customIcon?: string): string {
    if (customIcon) return customIcon;

    switch (type) {
      case 'info': return 'ℹ️';
      case 'success': return '✓';
      case 'warning': return '⚠️';
      case 'error': return '✕';
      default: return '•';
    }
  }

  private _formatTimestamp(timestamp: string): string {
    try {
      const date = new Date(timestamp);
      const now = new Date();
      const diff = now.getTime() - date.getTime();

      const seconds = Math.floor(diff / 1000);
      const minutes = Math.floor(diff / 60000);
      const hours = Math.floor(diff / 3600000);
      const days = Math.floor(diff / 86400000);

      if (seconds < 60) return 'Just now';
      if (minutes < 60) return `${minutes}m ago`;
      if (hours < 24) return `${hours}h ago`;
      if (days < 7) return `${days}d ago`;

      return date.toLocaleDateString();
    } catch {
      return timestamp;
    }
  }

  private _handleActionClick(activity: ActivityItem) {
    this.dispatchEvent(new CustomEvent('activity-action', {
      bubbles: true,
      composed: true,
      detail: { activity }
    }));
  }

  override render() {
    if (this.activities.length === 0) {
      return html`
        <div class="empty-state">${this.emptyText}</div>
      `;
    }

    return html`
      <div class="activities-container">
        ${this.activities.map(activity => html`
          <div class="activity-item">
            <div
              class="activity-indicator"
              data-type="${activity.type}"
            >
              ${activity.avatar ? html`
                <img
                  class="avatar"
                  src="${activity.avatar}"
                  alt="${activity.user || 'User'}"
                />
              ` : html`
                ${this._getActivityIcon(activity.type, activity.icon)}
              `}
            </div>

            <div class="activity-content">
              <div class="activity-header">
                <h4 class="activity-title">
                  ${activity.user ? html`
                    <span class="activity-user">${activity.user}</span>
                  ` : ''}
                  ${activity.title}
                </h4>
                <span class="activity-timestamp">
                  ${this._formatTimestamp(activity.timestamp)}
                </span>
              </div>

              ${activity.description ? html`
                <div class="activity-description">
                  ${activity.description}
                </div>
              ` : ''}

              ${activity.actionLabel ? html`
                <a
                  class="activity-action"
                  href="${activity.actionUrl || '#'}"
                  @click=${(e: Event) => {
                    if (!activity.actionUrl || activity.actionUrl === '#') {
                      e.preventDefault();
                      this._handleActionClick(activity);
                    }
                  }}
                >
                  ${activity.actionLabel}
                </a>
              ` : ''}
            </div>
          </div>
        `)}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'activity-widget': ActivityWidget;
  }
}
