import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';

export interface AvatarItem {
  src?: string;
  name: string;
  status?: 'online' | 'offline' | 'busy' | 'away';
}

/**
 * <cg-avatar-group> — Overlapping avatar stack with overflow badge.
 *
 * Features:
 * - Overlapping circles with negative margin
 * - "+N more" overflow badge
 * - Status dots (online/offline/busy/away)
 * - Initials fallback, image error fallback
 * - Hover to spread apart, size variants
 * - Click events on overflow
 */
@customElement('cg-avatar-group')
export class CgAvatarGroup extends LitElement {
  static override styles = css`
    :host {
      transition: color var(--cg-motion-duration-fast, 80ms) var(--cg-motion-easing-color, cubic-bezier(0, 0, 0.58, 1));
      display: inline-flex;
      font-family: var(--cg-font-family-primary, 'Inter Variable', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif);
    }

    .group {
      display: flex;
      align-items: center;
    }

    .avatar {
      position: relative;
      border-radius: var(--cg-border-radius-full, 99999px);
      border: 2px solid var(--cg-color-surface-base-background, #09090b);
      background: var(--cg-color-action-secondary-background-default, #27272a);
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      flex-shrink: 0;
      cursor: pointer;
      transition: transform var(--cg-motion-duration-slow, 200ms) var(--cg-motion-easing-default, cubic-bezier(0.4, 0, 0.2, 1)), margin var(--cg-motion-duration-slow, 200ms) var(--cg-motion-easing-default, cubic-bezier(0.4, 0, 0.2, 1));
    }

    .group:hover .avatar { margin-left: 0 !important; }
    .group:hover .avatar:first-child { margin-left: 0 !important; }

    .avatar:hover {
      z-index: 10;
      transform: scale(1.1) translateY(-2px);
    }

    .avatar:focus-visible {
      outline: none;
      box-shadow:
        0 0 0 2px var(--cg-color-surface-base-background, #09090b),
        0 0 0 4px var(--cg-brand-ai-accent, #dfff61);
      z-index: 11;
    }

    .avatar img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: var(--cg-border-radius-full, 99999px);
    }

    .initials {
      font-weight: var(--cg-font-weight-semibold, 600);
      color: var(--cg-color-surface-base-text, #fafafa);
      text-transform: uppercase;
      line-height: 1;
      pointer-events: none;
    }

    /* Status dot */
    .status {
      position: absolute;
      bottom: 0;
      right: 0;
      border-radius: var(--cg-border-radius-full, 99999px);
      border: 2px solid var(--cg-color-surface-base-background, #09090b);
    }
    .status.online { background: var(--cg-green-500, #22c55e); }
    .status.offline { background: var(--cg-gray-500, #71717a); }
    .status.busy { background: var(--cg-red-500, #ef4444); }
    .status.away { background: var(--cg-yellow-500, #f59e0b); }

    /* Overflow badge */
    .overflow {
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: var(--cg-border-radius-full, 99999px);
      border: 2px solid var(--cg-color-surface-base-background, #09090b);
      background: var(--cg-color-action-secondary-background-default, #27272a);
      color: var(--cg-color-surface-base-text, #fafafa);
      font-weight: var(--cg-font-weight-semibold, 600);
      cursor: pointer;
      flex-shrink: 0;
      transition: transform var(--cg-motion-duration-slow, 200ms) var(--cg-motion-easing-default, cubic-bezier(0.4, 0, 0.2, 1)), background 100ms ease;
    }
    .overflow:hover {
      background: var(--cg-color-action-secondary-background-hover, #3f3f46);
      transform: scale(1.1);
    }
    .overflow:focus-visible {
      outline: none;
      box-shadow:
        0 0 0 2px var(--cg-color-surface-base-background, #09090b),
        0 0 0 4px var(--cg-brand-ai-accent, #dfff61);
    }

    /* Sizes */
    :host([size="sm"]) .avatar, :host([size="sm"]) .overflow { width: 28px; height: 28px; }
    :host([size="sm"]) .avatar:not(:first-child) { margin-left: -8px; }
    :host([size="sm"]) .overflow { margin-left: -8px; font-size: 0.6rem; }
    :host([size="sm"]) .initials { font-size: 0.6rem; }
    :host([size="sm"]) .status { width: 8px; height: 8px; }

    :host([size="md"]) .avatar, :host([size="md"]) .overflow { width: 38px; height: 38px; }
    :host([size="md"]) .avatar:not(:first-child) { margin-left: -10px; }
    :host([size="md"]) .overflow { margin-left: -10px; font-size: var(--cg-font-size-xs, 12px); }
    :host([size="md"]) .initials { font-size: var(--cg-font-size-xs, 12px); }
    :host([size="md"]) .status { width: 10px; height: 10px; }

    :host([size="lg"]) .avatar, :host([size="lg"]) .overflow { width: 48px; height: 48px; }
    :host([size="lg"]) .avatar:not(:first-child) { margin-left: -12px; }
    :host([size="lg"]) .overflow { margin-left: -12px; font-size: var(--cg-font-size-sm, 14px); }
    :host([size="lg"]) .initials { font-size: var(--cg-font-size-sm, 14px); }
    :host([size="lg"]) .status { width: 12px; height: 12px; }

    @media (prefers-reduced-motion: reduce) {
      .avatar, .overflow { transition: none; }
      .group:hover .avatar { margin-left: revert !important; }
    }
  `;

  @property({ type: Array }) avatars: AvatarItem[] = [];
  @property({ type: Number }) maxVisible = 4;
  @property({ reflect: true }) size: 'sm' | 'md' | 'lg' = 'md';

  private _getInitials(name: string): string {
    return name.split(' ').map(p => p[0] || '').join('').slice(0, 2);
  }

  private _onImgError(e: Event) {
    (e.target as HTMLImageElement).style.display = 'none';
    const parent = (e.target as HTMLElement).parentElement;
    const fallback = parent?.querySelector('.initials') as HTMLElement | null;
    if (fallback) fallback.style.display = 'flex';
  }

  private _onAvatarClick() {
    this.dispatchEvent(new CustomEvent('cg-avatar-group-click', { bubbles: true, composed: true }));
  }

  private _onOverflowClick() {
    this.dispatchEvent(new CustomEvent('cg-avatar-group-overflow-click', { bubbles: true, composed: true }));
  }

  override render() {
    const visible = this.avatars.slice(0, this.maxVisible);
    const overflow = this.avatars.length - this.maxVisible;

    return html`
      <div class="group" role="group" aria-label="Avatar group">
        ${visible.map((a, i) => html`
          <div class="avatar"
            role="button"
            tabindex="0"
            aria-label=${a.name}
            style="z-index:${visible.length - i}"
            @click=${this._onAvatarClick}
            @keydown=${(e: KeyboardEvent) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); this._onAvatarClick(); } }}>
            ${a.src ? html`
              <img src=${a.src} alt=${a.name} loading="lazy" @error=${this._onImgError} />
              <span class="initials" style="display:none">${this._getInitials(a.name)}</span>
            ` : html`
              <span class="initials">${this._getInitials(a.name)}</span>
            `}
            ${a.status ? html`<span class="status ${a.status}"></span>` : nothing}
          </div>
        `)}
        ${overflow > 0 ? html`
          <button class="overflow"
            aria-label="${overflow} more avatars"
            style="z-index:0"
            @click=${this._onOverflowClick}>
            +${overflow}
          </button>
        ` : nothing}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cg-avatar-group': CgAvatarGroup;
  }
}
