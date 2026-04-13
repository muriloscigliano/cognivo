/**
 * @element ai-presence
 * Overlapping avatar stack showing online users with status dots
 * (online/away/offline). Displays "+N more" overflow badge and
 * tooltips on hover/focus.
 *
 * @example
 * ```html
 * <ai-presence
 *   .users=${[
 *     { name: 'Alice', status: 'online', avatar: '/avatars/alice.jpg' },
 *     { name: 'Bob', status: 'away' }
 *   ]}
 *   max-visible="4"
 * ></ai-presence>
 * ```
 *
 * @prop {PresenceUser[]} users - Array of user objects with name, status, and optional avatar URL
 * @prop {number} maxVisible - Max avatars before showing overflow badge (default 5)
 *
 * @fires {CustomEvent<{user: PresenceUser}>} ai-presence-user-click - When an avatar is clicked
 */
import { LitElement, html, css, nothing } from 'lit';
import { property, state, customElement } from 'lit/decorators.js';
import { hostBase, reducedMotion, fadeSlideInKeyframes } from '../../styles/index.js';

export interface PresenceUser {
  name: string;
  avatar?: string;
  status: 'online' | 'away' | 'offline';
}

@customElement('ai-presence')
export class AiPresence extends LitElement {
  static override styles = [hostBase, reducedMotion, fadeSlideInKeyframes, css`
    :host {
      align-items: center;
      animation: fadeSlideIn var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
    }
    :host([hidden]) { display: none; }

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
      margin-left: calc(-1 * var(--cg-spacing-8);
      z-index: 1;
      transition: transform var(--cg-transition-duration-default) var(--cg-transition-easing-default), z-index 0ms;
    }
    .avatar-wrapper:first-child { margin-left: 0; }
    .avatar-wrapper:hover,
    .avatar-wrapper:focus-within {
      z-index: 10;
      transform: translateY(var(calc(-1 * var(--cg-spacing-2));
    }

    .avatar-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: var(--cg-spacing-32);
      height: var(--cg-spacing-32);
      border-radius: var(--cg-border-radius-full);
      border: var(--cg-border-width-50) solid var(--cg-color-surface-base-background);
      background: var(--cg-color-surface-container-background);
      color: var(--cg-color-surface-base-text);
      font-size: var(--cg-font-size-sm);
      font-weight: var(--cg-font-weight-semibold);
      cursor: pointer;
      padding: 0;
      position: relative;
      overflow: hidden;
    }
    .avatar-btn:focus-visible {
      outline: none;
      box-shadow: 0 0 0 2px var(--cg-color-surface-base-background), 0 0 0 3px var(--cg-overlay-accent-strong);
    }

    .avatar-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: var(--cg-border-radius-full);
    }

    .status-dot {
      position: absolute;
      bottom: 0;
      right: 0;
      width: var(--cg-spacing-8);
      height: var(--cg-spacing-8);
      border-radius: var(--cg-border-radius-full);
      border: var(--cg-border-width-50) solid var(--cg-color-surface-base-background);
      pointer-events: none;
    }
    .status-dot[data-status="online"]  { background: var(--cg-color-status-success-text-default); }
    .status-dot[data-status="away"]    { background: var(--cg-color-status-warning-text-default); }
    .status-dot[data-status="offline"] { background: var(--cg-color-input-text-placeholder); }

    .overflow-badge {
      display: flex;
      align-items: center;
      justify-content: center;
      width: var(--cg-spacing-32);
      height: var(--cg-spacing-32);
      border-radius: var(--cg-border-radius-full);
      border: var(--cg-border-width-50) solid var(--cg-color-surface-base-background);
      background: var(--cg-color-surface-cards-border);
      color: var(--cg-color-surface-base-text);
      font-size: var(--cg-font-size-xs);
      font-weight: var(--cg-font-weight-bold);
      margin-left: calc(-1 * var(--cg-spacing-8);
      cursor: default;
    }

    .tooltip {
      position: absolute;
      bottom: calc(100% + var(--cg-spacing-6);
      left: 50%;
      transform: translateX(-50%);
      background: var(--cg-color-surface-container-background);
      color: var(--cg-color-surface-base-text);
      padding: var(--cg-spacing-4) var(--cg-spacing-8);
      border-radius: var(--cg-border-radius-100);
      font-size: var(--cg-font-size-xs);
      white-space: nowrap;
      pointer-events: none;
      opacity: 0;
      transition: opacity var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
      z-index: 20;
      border: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
    }
    .avatar-wrapper:hover .tooltip,
    .avatar-wrapper:focus-within .tooltip {
      opacity: 1;
    }

    @media (prefers-reduced-motion: reduce) {
      :host { animation: none; }
      .avatar-wrapper { transition: none; }
      .tooltip { transition: none; }
    }
  `];

  @property({ type: Array }) users: PresenceUser[] = [];
  @property({ type: Number, attribute: 'max-visible' }) maxVisible = 5;

  private _getInitials(name: string): string {
    return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
  }

  private _handleUserClick(user: PresenceUser) {
    this.dispatchEvent(new CustomEvent('ai-presence-user-click', {
      detail: { user },
      bubbles: true,
      composed: true,
    }));
  }

  override render() {
    const visible = this.users.slice(0, this.maxVisible);
    const overflow = this.users.length - this.maxVisible;

    return html`
      <div class="container" role="group" aria-label="Online users">
        <div class="avatar-stack">
          ${visible.map(user => html`
            <div class="avatar-wrapper">
              <button
                class="avatar-btn"
                role="listitem"
                aria-label="${user.name} — ${user.status}"
                @click=${() => this._handleUserClick(user)}
              >
                ${user.avatar
                  ? html`<img class="avatar-img" src=${user.avatar} alt="" />`
                  : this._getInitials(user.name)}
                <span class="status-dot" data-status=${user.status}></span>
              </button>
              <span class="tooltip">${user.name}</span>
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
