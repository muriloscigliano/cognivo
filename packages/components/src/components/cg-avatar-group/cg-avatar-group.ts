import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { hostBase, reducedMotion } from '../../styles/index.js';

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
  static override styles = [hostBase, reducedMotion, css`
    .group {
      display: flex;
      align-items: center;
    }

    .avatar {
      position: relative;
      border-radius: var(--cg-border-radius-full);
      border: var(--cg-border-width-100) solid var(--cg-color-surface-base-background);
      background: var(--cg-color-action-secondary-background-default);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      cursor: pointer;
      transition: transform var(--cg-motion-duration-slow) var(--cg-motion-easing-bounce), margin var(--cg-motion-duration-slow) var(--cg-motion-easing-default);
      animation: avatarIn var(--cg-motion-duration-slow) var(--cg-motion-easing-enter) both;
      animation-delay: calc(var(--avatar-index, 0) * 50ms);
    }

    .avatar-inner {
      width: 100%;
      height: 100%;
      border-radius: var(--cg-border-radius-full);
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    @keyframes avatarIn {
      from { opacity: 0; transform: scale(0.8); }
      to { opacity: 1; transform: scale(1); }
    }

    :host([expanded]) .avatar,
    :host([expanded]) .overflow { margin-left: var(--cg-spacing-4) !important; }
    :host([expanded]) .avatar:first-child { margin-left: 0 !important; }

    .avatar:hover {
      z-index: 10;
      transform: scale(1.15) translateY(calc(-1 * var(--cg-spacing-2)));
    }

    .avatar:active {
      transform: scale(var(--cg-interaction-press-scale));
    }

    .avatar:focus-visible {
      outline: none;
      box-shadow:
        0 0 0 2px var(--cg-color-focus-ring-offset),
        0 0 0 4px var(--cg-color-focus-ring);
      z-index: 11;
    }

    .avatar img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .initials {
      font-weight: var(--cg-font-weight-semibold);
      color: var(--cg-color-surface-base-text);
      text-transform: uppercase;
      line-height: 1;
      pointer-events: none;
    }

    /* Status dot */
    .status {
      position: absolute;
      bottom: 0;
      right: 0;
      border-radius: var(--cg-border-radius-full);
      border: var(--cg-border-width-100) solid var(--cg-color-surface-base-background);
    }
    .status.online { background: var(--cg-color-status-success-text-default); }
    .status.offline { background: var(--cg-color-surface-container-outlined); }
    .status.busy { background: var(--cg-color-status-error-text-default); }
    .status.away { background: var(--cg-color-status-warning-text-default); }

    /* Overflow badge */
    .overflow {
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: var(--cg-border-radius-full);
      border: var(--cg-border-width-100) solid var(--cg-color-surface-base-background);
      background: var(--cg-color-action-secondary-background-default);
      color: var(--cg-color-surface-base-text);
      font-weight: var(--cg-font-weight-semibold);
      cursor: pointer;
      flex-shrink: 0;
      transition: transform var(--cg-motion-duration-slow) var(--cg-motion-easing-default), background var(--cg-motion-duration-fast) var(--cg-motion-easing-default);
    }
    .overflow:hover {
      background: var(--cg-color-action-secondary-background-hover);
      transform: scale(1.1);
    }
    .overflow:focus-visible {
      outline: none;
      box-shadow:
        0 0 0 2px var(--cg-color-focus-ring-offset),
        0 0 0 4px var(--cg-color-focus-ring);
    }

    /* Sizes */
    :host([size="sm"]) .avatar, :host([size="sm"]) .overflow { width: var(--cg-spacing-32); height: var(--cg-spacing-32); }
    :host([size="sm"]) .avatar:not(:first-child) { margin-left: calc(-1 * var(--cg-spacing-8)); }
    :host([size="sm"]) .overflow { margin-left: calc(-1 * var(--cg-spacing-8)); font-size: var(--cg-font-size-xs); }
    :host([size="sm"]) .initials { font-size: var(--cg-font-size-xs); }
    :host([size="sm"]) .status { width: var(--cg-spacing-8); height: var(--cg-spacing-8); }

    :host([size="md"]) .avatar, :host([size="md"]) .overflow { width: var(--cg-spacing-40); height: var(--cg-spacing-40); }
    :host([size="md"]) .avatar:not(:first-child) { margin-left: calc(-1 * var(--cg-spacing-12)); }
    :host([size="md"]) .overflow { margin-left: calc(-1 * var(--cg-spacing-12)); font-size: var(--cg-font-size-xs); }
    :host([size="md"]) .initials { font-size: var(--cg-font-size-xs); }
    :host([size="md"]) .status { width: var(--cg-spacing-12); height: var(--cg-spacing-12); }

    :host([size="lg"]) .avatar, :host([size="lg"]) .overflow { width: var(--cg-spacing-48); height: var(--cg-spacing-48); }
    :host([size="lg"]) .avatar:not(:first-child) { margin-left: calc(-1 * var(--cg-spacing-12)); }
    :host([size="lg"]) .overflow { margin-left: calc(-1 * var(--cg-spacing-12)); font-size: var(--cg-font-size-sm); }
    :host([size="lg"]) .initials { font-size: var(--cg-font-size-sm); }
    :host([size="lg"]) .status { width: var(--cg-spacing-12); height: var(--cg-spacing-12); }
  `];

  @property({ type: Array }) avatars: AvatarItem[] = [];
  @property({ type: Number }) maxVisible = 4;
  @property({ reflect: true }) size: 'sm' | 'md' | 'lg' = 'md';
  @property({ type: Boolean, reflect: true }) expanded = false;

  /** Tracks which avatar indices have failed images */
  @state() private _failedImages = new Set<number>();

  private _getInitials(name: string): string {
    return name.split(' ').map(p => p[0] || '').join('').slice(0, 2);
  }

  private _onImgError(index: number) {
    this._failedImages = new Set(this._failedImages).add(index);
  }

  private _onGroupEnter() { this.expanded = true; }
  private _onGroupLeave() { this.expanded = false; }

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
      <div class="group" role="group" aria-label="Avatar group"
        @mouseenter=${this._onGroupEnter}
        @mouseleave=${this._onGroupLeave}>
        ${visible.map((a, i) => html`
          <div class="avatar"
            role="button"
            tabindex="0"
            aria-label=${a.name}
            style="z-index:${visible.length - i}; --avatar-index: ${i}"
            @click=${this._onAvatarClick}
            @keydown=${(e: KeyboardEvent) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); this._onAvatarClick(); } }}>
            <div class="avatar-inner">
              ${a.src && !this._failedImages.has(i) ? html`
                <img src=${a.src} alt=${a.name} loading="lazy" @error=${() => this._onImgError(i)} />
              ` : html`
                <span class="initials">${this._getInitials(a.name)}</span>
              `}
            </div>
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
