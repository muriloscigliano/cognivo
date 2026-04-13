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
      animation: fadeSlideIn var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
    }
    :host([hidden]) { display: none; }

    .container {
      background: var(--cg-color-surface-cards-background);
      border: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
      border-radius: var(--cg-border-radius-150);
      padding: var(--cg-spacing-16);
      color: var(--cg-color-surface-base-text);
      max-height: 480px;
      overflow-y: auto;
    }

    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-bottom: var(--cg-spacing-12);
      margin-bottom: var(--cg-spacing-12);
      border-bottom: var(--cg-border-width-50) solid var(--cg-color-surface-cards-divider);
    }

    .header-left {
      display: flex;
      align-items: center;
      gap: var(--cg-spacing-8);
    }

    .title {
      font-size: var(--cg-font-size-sm);
      font-weight: var(--cg-font-weight-semibold);
    }

    .unread-badge {
      background: var(--cg-color-action-primary-background-default);
      color: var(--cg-color-surface-container-background);
      font-size: var(--cg-font-size-xs);
      font-weight: var(--cg-font-weight-bold);
      padding: var(--cg-spacing-2) var(--cg-spacing-8);
      border-radius: var(--cg-border-radius-100);
      min-width: 16px;
      text-align: center;
    }

    .mark-all-btn {
      background: transparent;
      border: none;
      color: var(--cg-color-input-text-placeholder);
      font-size: var(--cg-font-size-xs);
      cursor: pointer;
      padding: var(--cg-spacing-4) var(--cg-spacing-8);
      border-radius: var(--cg-border-radius-50);
      transition: color var(--cg-transition-duration-default) var(--cg-transition-easing-default);
    }
    .mark-all-btn:hover { color: var(--cg-color-surface-base-text); }
    .mark-all-btn:focus-visible {
      outline: 2px solid var(--cg-overlay-accent-strong);
      outline-offset: var(--cg-outline-offset-default);
    }

    .group-label {
      font-size: var(--cg-font-size-xs);
      font-weight: var(--cg-font-weight-bold);
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--cg-color-input-text-placeholder);
      padding: var(--cg-spacing-8) 0 var(--cg-spacing-4);
    }

    .notification {
      display: flex;
      align-items: flex-start;
      gap: var(--cg-spacing-8);
      padding: var(--cg-spacing-8) var(--cg-spacing-12);
      border-radius: var(--cg-border-radius-100);
      margin-bottom: var(--cg-spacing-2);
      border-bottom: var(--cg-border-width-50) solid var(--cg-color-surface-cards-divider);
      cursor: pointer;
      transition: background var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
      position: relative;
    }
    .notification:hover { background: var(--cg-overlay-accent-subtle); }
    .notification:focus-visible {
      outline: 2px solid var(--cg-overlay-accent-strong);
      outline-offset: -2px;
    }

    .notification.unread { background: var(--cg-overlay-accent-subtle); }

    .unread-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: var(--cg-color-action-primary-background-default);
      flex-shrink: 0;
      margin-top: var(--cg-spacing-6);
    }

    .notif-body { flex: 1; min-width: 0; }

    .notif-title {
      font-size: var(--cg-font-size-sm);
      font-weight: var(--cg-font-weight-semibold);
      color: var(--cg-color-surface-base-text);
      margin-bottom: var(--cg-spacing-2);
    }
    .notification.unread .notif-title { color: var(--cg-color-surface-base-text); }

    .notif-message {
      font-size: var(--cg-font-size-xs);
      color: var(--cg-color-input-text-placeholder);
      line-height: 1.4;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .notif-time {
      font-size: var(--cg-font-size-xs);
      color: var(--cg-color-input-text-placeholder);
      margin-top: var(--cg-spacing-4);
    }

    .dismiss-btn {
      background: transparent;
      border: none;
      color: var(--cg-color-input-text-placeholder);
      font-size: var(--cg-font-size-sm);
      cursor: pointer;
      padding: var(--cg-spacing-2) var(--cg-spacing-4);
      border-radius: var(--cg-border-radius-50);
      flex-shrink: 0;
      line-height: 1;
      transition: color var(--cg-transition-duration-default) var(--cg-transition-easing-default);
    }
    .dismiss-btn:hover { color: var(--cg-color-status-error-text-default); }
    .dismiss-btn:focus-visible {
      outline: 2px solid var(--cg-overlay-accent-strong);
      outline-offset: var(--cg-outline-offset-default);
    }

    .empty-state {
      text-align: center;
      color: var(--cg-color-input-text-placeholder);
      font-size: var(--cg-font-size-sm);
      padding: var(--cg-spacing-24) 0;
    }

    /* ── Rounded variants ── */
    :host([rounded="none"]) .container { border-radius: 0; }
    :host([rounded="sm"]) .container { border-radius: var(--cg-border-radius-50); }
    :host([rounded="md"]) .container { border-radius: var(--cg-border-radius-100); }
    :host([rounded="lg"]) .container { border-radius: var(--cg-border-radius-150); }
    :host([rounded="full"]) .container { border-radius: var(--cg-border-radius-full); }
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
        <div class="sr-live" role="status" aria-live="polite" aria-atomic="true" style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;">
          ${this._unreadCount > 0 ? `${this._unreadCount} unread notifications` : 'No unread notifications'}
        </div>
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
