/**
 * @element ai-notification-center
 * Grouped notification inbox for AI events. Displays notifications
 * organized by type, with unread badges, mark-all-read, and
 * individual dismiss actions.
 *
 * @example
 * ```html
 * <ai-notification-center .notifications=${[
 *   { id: '1', title: 'Model updated', message: 'GPT-4 Turbo is now available', type: 'system', timestamp: '2 min ago' }
 * ]} maxVisible="20"></ai-notification-center>
 * ```
 *
 * @prop {Notification[]} notifications - Array of notification objects
 * @prop {number} maxVisible - Max notifications to render (default 50)
 *
 * @fires {CustomEvent<{id: string, notification: object}>} ai-notification-click - When a notification is clicked
 * @fires {CustomEvent<{id: string}>} ai-notification-dismiss - When a notification is dismissed
 * @fires ai-notification-read-all - When "Mark all read" is clicked
 */
import { LitElement, html, css, nothing } from 'lit';
import { property, state, customElement } from 'lit/decorators.js';
import { hostBlock, reducedMotion, fadeSlideInKeyframes } from '../../styles/index.js';

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
  static override styles = [hostBlock, reducedMotion, fadeSlideInKeyframes, css`
    :host {
      animation: fadeSlideIn var(--cg-motion-duration-fast, 200ms) var(--cg-motion-easing-color, cubic-bezier(0, 0, 0.58, 1));
    }
    :host([hidden]) { display: none; }

    .container {
      background: var(--cg-color-surface-container-background, #18181b);
      border: 1px solid var(--cg-color-surface-container-border, #27272a);
      border-radius: 12px;
      padding: 16px;
      color: var(--cg-color-surface-base-text, #fafafa);
      max-height: 480px;
      overflow-y: auto;
      box-shadow: var(--cg-elevation-2, 0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -2px rgba(0, 0, 0, 0.2)), inset 0 1px 0 0 rgba(255, 255, 255, 0.05);
      background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0.03), transparent);
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
      background: var(--cg-brand-ai-accent, #dfff61);
      color: var(--cg-color-surface-container-background, #18181b);
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
      color: var(--cg-gray-500, #71717a);
      font-size: 11px;
      cursor: pointer;
      padding: 4px 8px;
      border-radius: 4px;
      transition: color 150ms ease;
    }
    .mark-all-btn:hover { color: var(--cg-brand-ai-accent, #dfff61); }
    .mark-all-btn:focus-visible {
      outline: 2px solid var(--cg-brand-ai-accent, #dfff61);
      outline-offset: 2px;
    }

    .group-label {
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--cg-gray-600, #52525b);
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
      outline: 2px solid var(--cg-brand-ai-accent, #dfff61);
      outline-offset: -2px;
    }

    .notification.unread { background: rgba(223, 255, 97, 0.06); }

    .unread-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: var(--cg-brand-ai-accent, #dfff61);
      flex-shrink: 0;
      margin-top: 6px;
    }

    .notif-body { flex: 1; min-width: 0; }

    .notif-title {
      font-size: 13px;
      font-weight: 600;
      color: var(--cg-color-surface-base-text, #fafafa);
      margin-bottom: 2px;
    }
    .notification.unread .notif-title { color: var(--cg-brand-ai-accent, #dfff61); }

    .notif-message {
      font-size: 12px;
      color: var(--cg-gray-400, #a1a1aa);
      line-height: 1.4;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .notif-time {
      font-size: 10px;
      color: var(--cg-gray-600, #52525b);
      margin-top: 4px;
    }

    .dismiss-btn {
      background: transparent;
      border: none;
      color: var(--cg-gray-600, #52525b);
      font-size: 14px;
      cursor: pointer;
      padding: 2px 4px;
      border-radius: 4px;
      flex-shrink: 0;
      line-height: 1;
      transition: color 150ms ease;
    }
    .dismiss-btn:hover { color: var(--cg-color-status-error-text-default, #ef4444); }
    .dismiss-btn:focus-visible {
      outline: 2px solid var(--cg-brand-ai-accent, #dfff61);
      outline-offset: 2px;
    }

    .empty-state {
      text-align: center;
      color: var(--cg-gray-600, #52525b);
      font-size: 13px;
      padding: 32px 0;
    }

    /* ── Rounded variants ── */
    :host([rounded="none"]) .container { border-radius: 0; }
    :host([rounded="sm"]) .container { border-radius: var(--cg-border-radius-50, 4px); }
    :host([rounded="md"]) .container { border-radius: var(--cg-border-radius-100, 8px); }
    :host([rounded="lg"]) .container { border-radius: var(--cg-border-radius-150, 12px); }
    :host([rounded="full"]) .container { border-radius: var(--cg-border-radius-full, 99999px); }
  `];

  @property({ reflect: true }) rounded: 'none' | 'sm' | 'md' | 'lg' | 'full' = 'lg';
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
