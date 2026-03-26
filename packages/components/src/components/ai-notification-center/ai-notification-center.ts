/**
 * <ai-notification-center> — Grouped notification inbox for AI events
 *
 * Props: notifications, maxVisible
 * Events: ai-notification-click, ai-notification-dismiss, ai-notification-read-all
 * Features: Grouped by type, unread badge, mark all as read, dismiss, empty state
 */
import { LitElement, html, css, nothing } from 'lit';
import { property, state, customElement } from 'lit/decorators.js';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: string;
  timestamp: string;
  read?: boolean;
}

@customElement('ai-notification-center')
export class AiNotificationCenter extends LitElement {
  static override styles = css`
    :host {
      display: block;
      font-family: var(--cg-font-family-primary, 'Inter Variable', 'Inter', -apple-system, sans-serif);
    }
    :host([hidden]) { display: none; }

    .container {
      background: #18181b;
      border: 1px solid #27272a;
      border-radius: 12px;
      padding: 16px;
      color: #fafafa;
      max-height: 480px;
      overflow-y: auto;
    }

    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 12px;
    }

    .header-left {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .title {
      font-size: 14px;
      font-weight: 600;
    }

    .unread-badge {
      background: #dfff61;
      color: #18181b;
      font-size: 10px;
      font-weight: 700;
      padding: 2px 7px;
      border-radius: 10px;
      min-width: 16px;
      text-align: center;
    }

    .mark-all-btn {
      background: transparent;
      border: none;
      color: #71717a;
      font-size: 11px;
      cursor: pointer;
      padding: 4px 8px;
      border-radius: 4px;
      transition: color 150ms ease;
    }
    .mark-all-btn:hover { color: #dfff61; }
    .mark-all-btn:focus-visible {
      outline: 2px solid #dfff61;
      outline-offset: 2px;
    }

    .group-label {
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: #52525b;
      padding: 8px 0 4px;
    }

    .notification {
      display: flex;
      align-items: flex-start;
      gap: 10px;
      padding: 10px 12px;
      border-radius: 8px;
      margin-bottom: 4px;
      cursor: pointer;
      transition: background 120ms ease;
      position: relative;
    }
    .notification:hover { background: rgba(223, 255, 97, 0.04); }
    .notification:focus-visible {
      outline: 2px solid #dfff61;
      outline-offset: -2px;
    }

    .notification.unread { background: rgba(223, 255, 97, 0.06); }

    .unread-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #dfff61;
      flex-shrink: 0;
      margin-top: 6px;
    }

    .notif-body { flex: 1; min-width: 0; }

    .notif-title {
      font-size: 13px;
      font-weight: 600;
      color: #fafafa;
      margin-bottom: 2px;
    }
    .notification.unread .notif-title { color: #dfff61; }

    .notif-message {
      font-size: 12px;
      color: #a1a1aa;
      line-height: 1.4;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .notif-time {
      font-size: 10px;
      color: #52525b;
      margin-top: 4px;
    }

    .dismiss-btn {
      background: transparent;
      border: none;
      color: #52525b;
      font-size: 14px;
      cursor: pointer;
      padding: 2px 4px;
      border-radius: 4px;
      flex-shrink: 0;
      line-height: 1;
      transition: color 150ms ease;
    }
    .dismiss-btn:hover { color: #ef4444; }
    .dismiss-btn:focus-visible {
      outline: 2px solid #dfff61;
      outline-offset: 2px;
    }

    .empty-state {
      text-align: center;
      color: #52525b;
      font-size: 13px;
      padding: 32px 0;
    }

    @media (prefers-reduced-motion: reduce) {
      .notification, .mark-all-btn, .dismiss-btn { transition: none; }
    }
  `;

  @property({ type: Array }) notifications: Notification[] = [];
  @property({ type: Number }) maxVisible = 50;

  private get _unreadCount(): number {
    return this.notifications.filter(n => !n.read).length;
  }

  private get _grouped(): Map<string, Notification[]> {
    const map = new Map<string, Notification[]>();
    const visible = this.notifications.slice(0, this.maxVisible);
    for (const n of visible) {
      const group = map.get(n.type) || [];
      group.push(n);
      map.set(n.type, group);
    }
    return map;
  }

  private _handleClick(notification: Notification) {
    this.dispatchEvent(new CustomEvent('ai-notification-click', {
      detail: { id: notification.id, notification },
      bubbles: true,
      composed: true,
    }));
  }

  private _handleDismiss(e: Event, notification: Notification) {
    e.stopPropagation();
    this.dispatchEvent(new CustomEvent('ai-notification-dismiss', {
      detail: { id: notification.id },
      bubbles: true,
      composed: true,
    }));
  }

  private _handleReadAll() {
    this.dispatchEvent(new CustomEvent('ai-notification-read-all', {
      bubbles: true,
      composed: true,
    }));
  }

  override render() {
    const grouped = this._grouped;

    return html`
      <div class="container" role="region" aria-label="Notification center">
        <div class="header">
          <div class="header-left">
            <span class="title">Notifications</span>
            ${this._unreadCount > 0 ? html`
              <span class="unread-badge" aria-label="${this._unreadCount} unread">${this._unreadCount}</span>
            ` : nothing}
          </div>
          ${this._unreadCount > 0 ? html`
            <button class="mark-all-btn" @click=${this._handleReadAll} tabindex="0" aria-label="Mark all as read">
              Mark all read
            </button>
          ` : nothing}
        </div>

        ${this.notifications.length === 0 ? html`
          <div class="empty-state" role="status">No notifications</div>
        ` : nothing}

        ${[...grouped.entries()].map(([type, items]) => html`
          <div class="group-label" role="heading" aria-level="3">${type}</div>
          <div role="list" aria-label="${type} notifications">
            ${items.map(n => html`
              <div
                class="notification ${n.read ? '' : 'unread'}"
                role="listitem"
                tabindex="0"
                aria-label="${n.title}${n.read ? '' : ' (unread)'}"
                @click=${() => this._handleClick(n)}
                @keydown=${(e: KeyboardEvent) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); this._handleClick(n); } }}
              >
                ${!n.read ? html`<div class="unread-dot" aria-hidden="true"></div>` : nothing}
                <div class="notif-body">
                  <div class="notif-title">${n.title}</div>
                  <div class="notif-message">${n.message}</div>
                  <div class="notif-time">${n.timestamp}</div>
                </div>
                <button
                  class="dismiss-btn"
                  @click=${(e: Event) => this._handleDismiss(e, n)}
                  aria-label="Dismiss notification: ${n.title}"
                  tabindex="0"
                >\u00D7</button>
              </div>
            `)}
          </div>
        `)}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ai-notification-center': AiNotificationCenter;
  }
}
