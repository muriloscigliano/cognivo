/**
 * <ai-presence> — Who's Online Indicator
 *
 * Overlapping avatar circles with status dots.
 * "+N more" badge when exceeding maxVisible.
 * Tooltip on hover/focus for each user.
 * Keyboard accessible with Tab navigation.
 */
import { LitElement, html, css, nothing } from 'lit';
import { property, state, customElement } from 'lit/decorators.js';

export interface PresenceUser {
  name: string;
  avatar?: string;
  status: 'online' | 'away' | 'offline';
}

@customElement('ai-presence')
export class AiPresence extends LitElement {
  static override styles = css`
    :host {
      display: inline-flex;
      align-items: center;
      font-family: var(--cg-font-family-primary, 'Inter Variable', 'Inter', -apple-system, sans-serif);
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
      margin-left: -8px;
      z-index: 1;
      transition: transform 200ms ease, z-index 0ms;
    }
    .avatar-wrapper:first-child { margin-left: 0; }
    .avatar-wrapper:hover,
    .avatar-wrapper:focus-within {
      z-index: 10;
      transform: translateY(-2px);
    }

    .avatar-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 36px;
      height: 36px;
      border-radius: 50%;
      border: 2px solid var(--cg-color-bg-primary, #18181b);
      background: var(--cg-color-bg-secondary, #27272a);
      color: var(--cg-color-text-primary, #fafafa);
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      padding: 0;
      position: relative;
      overflow: hidden;
    }
    .avatar-btn:focus-visible {
      outline: 2px solid var(--cg-brand-ai-accent, #dfff61);
      outline-offset: 2px;
    }

    .avatar-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 50%;
    }

    .status-dot {
      position: absolute;
      bottom: 0;
      right: 0;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      border: 2px solid var(--cg-color-bg-primary, #18181b);
      pointer-events: none;
    }
    .status-dot[data-status="online"]  { background: #22c55e; }
    .status-dot[data-status="away"]    { background: #eab308; }
    .status-dot[data-status="offline"] { background: #71717a; }

    .overflow-badge {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 36px;
      height: 36px;
      border-radius: 50%;
      border: 2px solid var(--cg-color-bg-primary, #18181b);
      background: var(--cg-color-border-primary, #27272a);
      color: var(--cg-color-text-primary, #fafafa);
      font-size: 11px;
      font-weight: 700;
      margin-left: -8px;
      cursor: default;
    }

    .tooltip {
      position: absolute;
      bottom: calc(100% + 6px);
      left: 50%;
      transform: translateX(-50%);
      background: var(--cg-color-bg-secondary, #27272a);
      color: var(--cg-color-text-primary, #fafafa);
      padding: 4px 10px;
      border-radius: 6px;
      font-size: 12px;
      white-space: nowrap;
      pointer-events: none;
      opacity: 0;
      transition: opacity 150ms ease;
      z-index: 20;
      border: 1px solid var(--cg-color-border-primary, #3f3f46);
    }
    .avatar-wrapper:hover .tooltip,
    .avatar-wrapper:focus-within .tooltip {
      opacity: 1;
    }

    @media (prefers-reduced-motion: reduce) {
      .avatar-wrapper { transition: none; }
      .tooltip { transition: none; }
    }
  `;

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
