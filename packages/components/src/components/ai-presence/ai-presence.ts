/**
 * @element ai-presence
 * Overlapping avatar stack showing live user presence. Built on top of <cg-avatar>
 * (handles initials/image/status-dot/sizes) with bespoke overlap stack, hover-lift,
 * tooltip with status + last-seen, "+N more" overflow badge, and skeleton state.
 *
 * @example
 * ```html
 * <ai-presence
 *   size="md"
 *   .users=${[
 *     { name: 'Alice', status: 'online', avatar: '/avatars/alice.jpg' },
 *     { name: 'Bob', status: 'away', lastSeen: '5m ago' },
 *     { name: 'Carol', status: 'busy' }
 *   ]}
 *   max-visible="4"
 * ></ai-presence>
 * ```
 *
 * @prop {PresenceUser[]} users - User objects (name, status, optional avatar + lastSeen)
 * @prop {number} maxVisible - Max avatars before overflow badge (default 5)
 * @prop {boolean} loading - Render skeleton placeholders
 * @prop {"sm" | "md" | "lg"} size - Avatar size (default md)
 *
 * @fires {CustomEvent<{user: PresenceUser}>} ai-presence-user-click - Avatar clicked
 */
import { LitElement, html, css, nothing } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { hostBase, reducedMotion, fadeSlideInKeyframes } from '../../styles/index.js';
import '../cg-avatar/cg-avatar.js';

export type PresenceStatus = 'online' | 'away' | 'busy' | 'offline';
export type PresenceSize = 'sm' | 'md' | 'lg';

export interface PresenceUser {
  name: string;
  avatar?: string;
  status: PresenceStatus;
  /** Optional last-seen text shown in the tooltip (e.g. "5m ago") */
  lastSeen?: string;
}

const STATUS_LABEL: Record<PresenceStatus, string> = {
  online: 'Active',
  away: 'Away',
  busy: 'Do not disturb',
  offline: 'Offline',
};

@customElement('ai-presence')
export class AiPresence extends LitElement {
  static override styles = [hostBase, reducedMotion, fadeSlideInKeyframes, css`
    :host {
      align-items: center;
      animation: fadeSlideIn var(--cg-transition-duration-fast) var(--cg-transition-easing-default);

      /* Per-size variables (defaults to md) */
      --_avatar-size: var(--cg-spacing-32);
      --_overlap: var(--cg-spacing-8);
    }
    :host([hidden]) { display: none; }
    :host([size="sm"]) {
      --_avatar-size: var(--cg-spacing-24);
      --_overlap: var(--cg-spacing-6);
    }
    :host([size="lg"]) {
      --_avatar-size: var(--cg-spacing-40);
      --_overlap: var(--cg-spacing-12);
    }

    .container {
      display: flex;
      align-items: center;
    }
    .avatar-stack {
      display: flex;
      align-items: center;
    }

    .avatar-wrapper {
      position: relative;
      margin-left: calc(-1 * var(--_overlap));
      z-index: 1;
      transition: transform var(--cg-transition-duration-default) var(--cg-transition-easing-ease-out);
    }
    .avatar-wrapper:first-child { margin-left: 0; }
    .avatar-wrapper:hover,
    .avatar-wrapper:focus-within {
      z-index: 10;
      transform: translateY(calc(-1 * var(--cg-spacing-4)));
    }

    /* Outline ring around each avatar so they read as separate even when overlapping */
    .avatar-btn {
      display: inline-block;
      border-radius: var(--cg-border-radius-full);
      border: var(--cg-border-width-50) solid var(--cg-color-surface-base-background);
      background: transparent;
      padding: 0;
      cursor: pointer;
      transition: transform var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
    }
    .avatar-btn:active { transform: scale(var(--cg-interaction-press-scale)); }
    .avatar-btn:focus-visible {
      outline: none;
      box-shadow:
        0 0 0 var(--cg-focus-ring-offset) var(--cg-color-focus-ring-offset),
        0 0 0 calc(var(--cg-focus-ring-offset) + var(--cg-focus-ring-width)) var(--cg-color-focus-ring);
    }

    /* ── Overflow ── */
    .overflow-badge {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: var(--_avatar-size);
      height: var(--_avatar-size);
      border-radius: var(--cg-border-radius-full);
      border: var(--cg-border-width-50) solid var(--cg-color-surface-base-background);
      background: var(--cg-color-action-tertiary-background-hover);
      color: var(--cg-color-surface-base-text);
      font-size: var(--cg-font-size-xs);
      font-weight: var(--cg-font-weight-bold);
      margin-left: calc(-1 * var(--_overlap));
      cursor: default;
    }

    /* ── Tooltip (bespoke — multi-line beats cg-tooltip's single-string content) ── */
    .tooltip {
      position: absolute;
      bottom: calc(100% + var(--cg-spacing-8));
      left: 50%;
      transform: translateX(-50%) translateY(var(--cg-spacing-2));
      background: var(--cg-color-surface-tooltip-background);
      color: var(--cg-color-surface-tooltip-text);
      padding: var(--cg-spacing-6) var(--cg-spacing-12);
      border-radius: var(--cg-border-radius-100);
      font-size: var(--cg-font-size-xs);
      line-height: var(--cg-line-height-snug);
      max-width: var(--cg-spacing-256);
      pointer-events: none;
      opacity: 0;
      transition:
        opacity var(--cg-transition-duration-fast) var(--cg-transition-easing-default),
        transform var(--cg-transition-duration-fast) var(--cg-transition-easing-ease-out);
      z-index: 20;
      border: var(--cg-border-width-50) solid var(--cg-color-surface-tooltip-border);
      box-shadow: var(--cg-elevation-2);
      white-space: nowrap;
    }
    .tooltip::after {
      content: '';
      position: absolute;
      top: 100%;
      left: 50%;
      width: var(--cg-spacing-8);
      height: var(--cg-spacing-8);
      transform: translateX(-50%) translateY(-50%) rotate(45deg);
      background: var(--cg-color-surface-tooltip-background);
      border-right: var(--cg-border-width-50) solid var(--cg-color-surface-tooltip-border);
      border-bottom: var(--cg-border-width-50) solid var(--cg-color-surface-tooltip-border);
    }
    .tooltip-name {
      font-weight: var(--cg-font-weight-semibold);
      display: block;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .tooltip-meta {
      display: block;
      margin-top: var(--cg-spacing-2);
      color: var(--cg-color-surface-tooltip-text);
    }
    .avatar-wrapper:hover .tooltip,
    .avatar-wrapper:focus-within .tooltip {
      opacity: 1;
      transform: translateX(-50%) translateY(0);
    }

    /* ── Skeleton ── */
    @keyframes presence-shimmer {
      0%   { background-position: -100% 0, 0 0; }
      100% { background-position:  200% 0, 0 0; }
    }
    .skeleton {
      display: inline-block;
      width: var(--_avatar-size);
      height: var(--_avatar-size);
      border-radius: var(--cg-border-radius-full);
      border: var(--cg-border-width-50) solid var(--cg-color-surface-base-background);
      margin-left: calc(-1 * var(--_overlap));
      flex-shrink: 0;
      background:
        linear-gradient(
          90deg,
          transparent 0%,
          var(--cg-overlay-white-strong) 50%,
          transparent 100%
        ),
        var(--cg-color-action-tertiary-background-hover);
      background-size: 50% 100%, 100% 100%;
      background-repeat: no-repeat, no-repeat;
      animation: presence-shimmer 1.5s var(--cg-transition-easing-linear) infinite;
    }
    .skeleton:first-child { margin-left: 0; }

    /* ── Empty state ── */
    .empty {
      color: var(--cg-color-surface-container-outlined);
      font-size: var(--cg-font-size-xs);
    }

    @media (prefers-reduced-motion: reduce) {
      :host { animation: none; }
      .avatar-wrapper { transition: none; }
      .avatar-btn { transition: none; }
      .tooltip { transition: none; transform: translateX(-50%); }
      .avatar-wrapper:hover .tooltip,
      .avatar-wrapper:focus-within .tooltip { transform: translateX(-50%); }
      .skeleton { animation: none; }
    }
  `];

  @property({ type: Array }) users: PresenceUser[] = [];
  @property({ type: Number, attribute: 'max-visible' }) maxVisible = 5;
  @property({ type: Boolean, reflect: true }) loading = false;
  @property({ type: String, reflect: true }) size: PresenceSize = 'md';

  private _handleUserClick(user: PresenceUser) {
    this.dispatchEvent(new CustomEvent('ai-presence-user-click', {
      detail: { user },
      bubbles: true, composed: true,
    }));
  }

  private _avatarSize(): 'sm' | 'md' | 'lg' {
    return this.size; // matches cg-avatar's size scale
  }

  private _renderTooltip(user: PresenceUser) {
    const statusText = STATUS_LABEL[user.status];
    const meta = user.lastSeen ? `${statusText} • ${user.lastSeen}` : statusText;
    return html`
      <span class="tooltip" aria-hidden="true">
        <span class="tooltip-name">${user.name}</span>
        <span class="tooltip-meta">${meta}</span>
      </span>
    `;
  }

  override render() {
    if (this.loading) {
      const placeholders = Math.min(this.maxVisible, 4);
      return html`
        <div class="container" aria-busy="true" aria-label="Loading presence">
          <div class="avatar-stack">
            ${Array.from({ length: placeholders }).map(() => html`<span class="skeleton"></span>`)}
          </div>
        </div>
      `;
    }

    if (this.users.length === 0) {
      return html`
        <div class="container" role="group" aria-label="Active users" aria-live="polite">
          <span class="empty">No active users</span>
        </div>
      `;
    }

    const visible = this.users.slice(0, this.maxVisible);
    const overflow = this.users.length - this.maxVisible;
    const avSize = this._avatarSize();

    return html`
      <div class="container" role="group" aria-label="Active users" aria-live="polite">
        <div class="avatar-stack">
          ${visible.map(user => html`
            <div class="avatar-wrapper">
              <button
                class="avatar-btn"
                aria-label="${user.name}, ${STATUS_LABEL[user.status]}${user.lastSeen ? `, last seen ${user.lastSeen}` : ''}"
                @click=${() => this._handleUserClick(user)}
              >
                <cg-avatar
                  size=${avSize}
                  shape="circle"
                  name=${user.name}
                  src=${user.avatar ?? ''}
                  status=${user.status}
                ></cg-avatar>
              </button>
              ${this._renderTooltip(user)}
            </div>
          `)}
          ${overflow > 0
            ? html`<span class="overflow-badge" aria-label="${overflow} more users">+${overflow}</span>`
            : nothing}
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ai-presence': AiPresence;
  }
}
