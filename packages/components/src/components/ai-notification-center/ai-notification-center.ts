/**
 * @element ai-notification-center
 * Notification inbox built from design-system primitives (cg-card, cg-text, cg-button).
 * Date-bucketed grouping (Today / Yesterday / This week / Earlier), left-accent unread style,
 * pulse on new arrivals, positive empty state, sr-live unread announcer.
 *
 * @example
 * ```html
 * <ai-notification-center .notifications=${[
 *   { id: '1', title: 'Model updated', message: 'GPT-4 Turbo is now available',
 *     type: 'system', timestamp: Date.now() - 2 * 60 * 1000 }
 * ]}></ai-notification-center>
 * ```
 *
 * @prop {Notification[]} notifications - Notification objects (timestamp = ms epoch or ISO/string)
 * @prop {number} maxVisible - Max notifications to render (default 50)
 *
 * @slot empty - Override the default "You're all caught up" empty state
 *
 * @fires {CustomEvent<{id: string, notification: object}>} ai-notification-click
 * @fires {CustomEvent<{id: string}>} ai-notification-dismiss
 * @fires ai-notification-read-all
 */
import { LitElement, html, css, nothing } from 'lit';
import { property, state, customElement } from 'lit/decorators.js';
import { hostBlock, reducedMotion, fadeSlideInKeyframes } from '../../styles/index.js';
import '../cg-card/cg-card.js';
import '../cg-text/cg-text.js';
import '../cg-button/cg-button.js';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: string;
  timestamp: string | number;
  read?: boolean;
}

const DAY_MS = 24 * 60 * 60 * 1000;

@customElement('ai-notification-center')
export class AiNotificationCenter extends LitElement {
  static override styles = [hostBlock, reducedMotion, fadeSlideInKeyframes, css`
    :host {
      animation: fadeSlideIn var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
      display: block;
    }
    :host([hidden]) { display: none; }

    cg-card { display: block; max-height: 480px; overflow-y: auto; }

    /* sr-only live region */
    .sr-only {
      position: absolute;
      width: 1px; height: 1px;
      padding: 0; margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border: 0;
    }

    /* ── Header ── */
    .header-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--cg-spacing-12);
      width: 100%;
    }
    .header-left {
      display: inline-flex;
      align-items: center;
      gap: var(--cg-spacing-8);
    }

    .unread-badge {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-width: var(--cg-spacing-16);
      padding: var(--cg-spacing-2) var(--cg-spacing-8);
      border-radius: var(--cg-border-radius-full);
      background: var(--cg-color-action-primary-background-default);
      color: var(--cg-color-action-primary-text-default);
      font-size: var(--cg-font-size-xs);
      font-weight: var(--cg-font-weight-bold);
      font-variant-numeric: tabular-nums;
    }

    /* ── Date group label ── */
    .group-label {
      padding: var(--cg-spacing-12) 0 var(--cg-spacing-4);
      text-transform: uppercase;
      letter-spacing: var(--cg-letter-spacing-wide);
    }
    .group-label:first-child { padding-top: 0; }

    /* ── Notification row ── */
    .notification {
      display: flex;
      align-items: flex-start;
      gap: var(--cg-spacing-12);
      padding: var(--cg-spacing-12);
      min-height: var(--cg-spacing-48);
      border-radius: var(--cg-border-radius-100);
      cursor: pointer;
      border: none;
      background: transparent;
      width: 100%;
      text-align: left;
      font-family: inherit;
      color: inherit;
      position: relative;
      transition:
        background var(--cg-transition-duration-fast) var(--cg-transition-easing-default),
        transform var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
    }
    .notification + .notification {
      border-top: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
      border-radius: 0;
    }
    .notification:hover {
      background: var(--cg-color-action-secondary-background-hover);
    }
    .notification:active { transform: scale(var(--cg-interaction-press-scale)); }
    .notification:focus-visible {
      outline: none;
      box-shadow: 0 0 0 var(--cg-border-width-300) var(--cg-color-focus-ring);
    }

    /* Left-accent unread indicator (replaces dot + bg) */
    .notification.unread::before {
      content: '';
      position: absolute;
      left: 0; top: var(--cg-spacing-12); bottom: var(--cg-spacing-12);
      width: var(--cg-border-width-100);
      background: var(--cg-color-action-primary-background-default);
      border-radius: var(--cg-border-radius-full);
    }

    /* Just-arrived pulse */
    @keyframes arrivalPulse {
      0%   { background: var(--cg-color-action-primary-background-default); opacity: 0.12; }
      100% { background: transparent; opacity: 0; }
    }
    .notification[data-just-arrived]::after {
      content: '';
      position: absolute;
      inset: 0;
      pointer-events: none;
      border-radius: inherit;
      animation: arrivalPulse 1.2s var(--cg-transition-easing-ease-out) both;
    }
    @media (prefers-reduced-motion: reduce) {
      .notification[data-just-arrived]::after { animation: none; }
    }

    .notif-body {
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;
      gap: var(--cg-spacing-2);
    }
    .notification.unread .notif-body cg-text[data-role="title"] {
      font-weight: var(--cg-font-weight-semibold);
    }

    .notif-message {
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      white-space: normal;
    }

    /* ── Dismiss icon button ── */
    .dismiss-btn {
      flex-shrink: 0;
      background: transparent;
      border: none;
      color: var(--cg-color-surface-container-outlined);
      cursor: pointer;
      padding: var(--cg-spacing-4);
      border-radius: var(--cg-border-radius-50);
      line-height: 1;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      transition:
        color var(--cg-transition-duration-fast) var(--cg-transition-easing-default),
        background var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
    }
    .dismiss-btn:hover {
      color: var(--cg-color-status-error-text-default);
      background: var(--cg-color-action-secondary-background-hover);
    }
    .dismiss-btn:active { transform: scale(var(--cg-interaction-press-scale)); }
    .dismiss-btn:focus-visible {
      outline: none;
      box-shadow: 0 0 0 var(--cg-border-width-300) var(--cg-color-focus-ring);
    }

    /* ── Empty state ── */
    .empty {
      text-align: center;
      padding: var(--cg-spacing-32) var(--cg-spacing-16);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--cg-spacing-8);
    }
    .empty-icon {
      color: var(--cg-color-status-success-text-default);
      width: var(--cg-spacing-32);
      height: var(--cg-spacing-32);
    }
  `];

  @property({ reflect: true }) rounded: 'none' | 'sm' | 'md' | 'lg' | 'full' = 'lg';
  @property({ type: Array }) notifications: Notification[] = [];
  @property({ type: Number, attribute: 'max-visible' }) maxVisible = 50;

  @state() private _justArrivedIds = new Set<string>();
  private _seenIds = new Set<string>();

  override updated(changed: Map<string, unknown>) {
    if (changed.has('notifications')) {
      const currentIds = new Set(this.notifications.map(n => n.id));
      // Only mark as "just arrived" if we've already initialized (not first render)
      if (this._seenIds.size > 0) {
        for (const id of currentIds) {
          if (!this._seenIds.has(id)) this._justArrivedIds.add(id);
        }
        if (this._justArrivedIds.size > 0) {
          // Clear pulse after animation
          window.setTimeout(() => {
            this._justArrivedIds.clear();
            this.requestUpdate();
          }, 1300);
        }
      }
      this._seenIds = currentIds;
    }
  }

  private get _unreadCount(): number {
    return this.notifications.filter(n => !n.read).length;
  }

  private _toMs(ts: string | number): number {
    if (typeof ts === 'number') return ts;
    const n = Date.parse(ts);
    return Number.isNaN(n) ? 0 : n;
  }

  private _bucketFor(ts: number): string {
    if (!ts) return 'Earlier';
    const now = Date.now();
    const startOfToday = new Date(); startOfToday.setHours(0, 0, 0, 0);
    if (ts >= startOfToday.getTime()) return 'Today';
    if (ts >= startOfToday.getTime() - DAY_MS) return 'Yesterday';
    if (ts >= now - 7 * DAY_MS) return 'This week';
    return 'Earlier';
  }

  private get _grouped(): Array<[string, Notification[]]> {
    const order = ['Today', 'Yesterday', 'This week', 'Earlier'];
    const map = new Map<string, Notification[]>();
    const visible = [...this.notifications]
      .sort((a, b) => this._toMs(b.timestamp) - this._toMs(a.timestamp))
      .slice(0, this.maxVisible);
    for (const n of visible) {
      const bucket = this._bucketFor(this._toMs(n.timestamp));
      if (!map.has(bucket)) map.set(bucket, []);
      map.get(bucket)!.push(n);
    }
    return order.filter(k => map.has(k)).map(k => [k, map.get(k)!]);
  }

  private _formatTime(ts: string | number): string {
    const ms = this._toMs(ts);
    if (!ms) return String(ts);
    const diff = Date.now() - ms;
    if (diff < 60_000) return 'Just now';
    if (diff < 3_600_000) return `${Math.floor(diff / 60_000)}m ago`;
    if (diff < 86_400_000) return `${Math.floor(diff / 3_600_000)}h ago`;
    return new Date(ms).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
  }

  private _handleClick(notification: Notification) {
    this.dispatchEvent(new CustomEvent('ai-notification-click', {
      detail: { id: notification.id, notification },
      bubbles: true, composed: true,
    }));
  }

  private _handleDismiss(e: Event, notification: Notification) {
    e.stopPropagation();
    this.dispatchEvent(new CustomEvent('ai-notification-dismiss', {
      detail: { id: notification.id },
      bubbles: true, composed: true,
    }));
  }

  private _handleReadAll() {
    this.dispatchEvent(new CustomEvent('ai-notification-read-all', {
      bubbles: true, composed: true,
    }));
  }

  override render() {
    const groups = this._grouped;
    const unread = this._unreadCount;

    return html`
      <cg-card variant="outlined" padding="md" rounded=${this.rounded} role="region" aria-label="Notification center">
        <div class="sr-only" aria-live="polite" aria-atomic="true">
          ${unread > 0 ? `${unread} unread notifications` : 'No unread notifications'}
        </div>

        <div slot="header" class="header-row">
          <div class="header-left">
            <cg-text size="sm" weight="semibold">Notifications</cg-text>
            ${unread > 0 ? html`<span class="unread-badge" aria-label="${unread} unread">${unread}</span>` : nothing}
          </div>
          ${unread > 0 ? html`
            <cg-button variant="tertiary" size="sm" @click=${this._handleReadAll}>Mark all read</cg-button>
          ` : nothing}
        </div>

        ${this.notifications.length === 0 ? html`
          <slot name="empty">
            <div class="empty">
              <svg class="empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              <cg-text size="sm" weight="semibold">You're all caught up</cg-text>
              <cg-text size="xs" color="muted">New notifications will appear here.</cg-text>
            </div>
          </slot>
        ` : nothing}

        ${groups.map(([bucket, items]) => html`
          <cg-text class="group-label" size="xs" weight="bold" color="muted" role="heading" aria-level="3">${bucket}</cg-text>
          <div role="list" aria-label="${bucket} notifications">
            ${items.map(n => html`
              <button
                class="notification ${n.read ? '' : 'unread'}"
                role="listitem"
                aria-label="${n.title}${n.read ? '' : ' (unread)'}"
                ?data-just-arrived=${this._justArrivedIds.has(n.id)}
                @click=${() => this._handleClick(n)}
              >
                <div class="notif-body">
                  <cg-text data-role="title" size="sm" weight="medium">${n.title}</cg-text>
                  <cg-text class="notif-message" size="xs" color="muted">${n.message}</cg-text>
                  <cg-text size="xs" color="muted">${this._formatTime(n.timestamp)}</cg-text>
                </div>
                <button
                  class="dismiss-btn"
                  aria-label="Dismiss: ${n.title}"
                  @click=${(e: Event) => this._handleDismiss(e, n)}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
                </button>
              </button>
            `)}
          </div>
        `)}
      </cg-card>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ai-notification-center': AiNotificationCenter;
  }
}
