import { LitElement, html, css, nothing, svg } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { hostBase, reducedMotion } from '../../styles/index.js';

/**
 * @element cg-avatar
 * Image with initials fallback and optional status indicator.
 *
 * @example
 * ```html
 * <cg-avatar src="/u.jpg" name="Ada Lovelace" size="md" status="online"></cg-avatar>
 * <cg-avatar name="Grace Hopper" size="lg" shape="square"></cg-avatar>
 * ```
 *
 * @slot fallback - Override fallback content
 */
@customElement('cg-avatar')
export class CgAvatar extends LitElement {
  static override styles = [hostBase, reducedMotion, css`
    :host {
      display: inline-block;
      position: relative;
      flex-shrink: 0;
    }

    .avatar {
      position: relative;
      width: 100%;
      height: 100%;
      aspect-ratio: 1 / 1;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--cg-color-action-secondary-background-default);
      color: var(--cg-color-action-secondary-text-default);
      overflow: hidden;
      border-radius: var(--cg-border-radius-full);
      font-weight: var(--cg-font-weight-semibold);
      text-transform: uppercase;
      line-height: 1;
      user-select: none;
    }

    :host([shape="square"]) .avatar {
      border-radius: var(--cg-border-radius-150);
    }

    .avatar img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }

    .fallback-icon {
      width: 60%;
      height: 60%;
      color: var(--cg-color-surface-container-outlined);
    }

    /* ── Sizes ── */
    :host([size="xs"]) { width: var(--cg-component-avatar-size-xs); height: var(--cg-component-avatar-size-xs); }
    :host([size="xs"]) .avatar { font-size: var(--cg-font-size-xs); }

    :host([size="sm"]) { width: var(--cg-component-avatar-size-sm); height: var(--cg-component-avatar-size-sm); }
    :host([size="sm"]) .avatar { font-size: var(--cg-font-size-xs); }

    :host([size="md"]) { width: var(--cg-component-avatar-size-md); height: var(--cg-component-avatar-size-md); }
    :host([size="md"]) .avatar { font-size: var(--cg-font-size-sm); }

    :host([size="lg"]) { width: var(--cg-component-avatar-size-lg); height: var(--cg-component-avatar-size-lg); }
    :host([size="lg"]) .avatar { font-size: var(--cg-font-size-base); }

    :host([size="xl"]) { width: var(--cg-component-avatar-size-xl); height: var(--cg-component-avatar-size-xl); }
    :host([size="xl"]) .avatar { font-size: var(--cg-font-size-lg); }

    /* ── Status dot ── */
    .status {
      position: absolute;
      bottom: 0;
      right: 0;
      width: var(--cg-component-avatar-status-dot-size);
      height: var(--cg-component-avatar-status-dot-size);
      border-radius: var(--cg-border-radius-full);
      border: var(--cg-border-width-100) solid var(--cg-color-surface-base-background);
      box-sizing: border-box;
    }
    :host([size="xs"]) .status,
    :host([size="sm"]) .status {
      width: var(--cg-spacing-8);
      height: var(--cg-spacing-8);
    }

    .status.online { background: var(--cg-color-status-success-text-default); }
    .status.offline {
      background: var(--cg-color-surface-base-background);
      border-color: var(--cg-color-surface-container-outlined);
    }
    .status.away { background: var(--cg-color-status-warning-text-default); }
    .status.busy { background: var(--cg-color-status-error-text-default); }

    /* ── Type ring (AI-app variant) ── */
    :host([type="agent"]) .avatar {
      box-shadow: 0 0 0 var(--cg-border-width-100) var(--cg-color-accent-text);
    }
    :host([type="user"]) .avatar {
      box-shadow: 0 0 0 var(--cg-border-width-100) var(--cg-color-status-info-text-default);
    }
    :host([type="system"]) .avatar {
      box-shadow: 0 0 0 var(--cg-border-width-100) var(--cg-color-surface-container-outlined);
    }
  `];

  @property() src = '';
  @property() alt = '';
  @property() name = '';
  @property({ reflect: true }) size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'md';
  @property({ reflect: true }) shape: 'circle' | 'square' = 'circle';
  @property({ reflect: true }) status: 'online' | 'offline' | 'away' | 'busy' | null = null;
  @property({ reflect: true }) type: 'user' | 'agent' | 'system' | null = null;
  @property({ attribute: 'fallback-icon' }) fallbackIcon = '';

  @state() private _imgFailed = false;

  private _getInitials(name: string): string {
    if (!name) return '';
    return name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map(p => p[0] || '')
      .join('')
      .toUpperCase();
  }

  private _onError() {
    this._imgFailed = true;
  }

  private _onLoad() {
    this._imgFailed = false;
  }

  override render() {
    const initials = this._getInitials(this.name);
    const hasImage = this.src && !this._imgFailed;
    // Fold type (role) and status (presence) into the accessible name — both
    // are otherwise conveyed by color alone (ring / dot), invisible to AT.
    const typePrefix = this.type ? `${this.type} ` : '';
    const statusSuffix = this.status ? `, ${this.status}` : '';
    const label = `${typePrefix}${this.alt || this.name || 'Avatar'}${statusSuffix}`;

    const userIcon = svg`
      <svg class="fallback-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
        <circle cx="12" cy="7" r="4"></circle>
      </svg>
    `;

    return html`
      <div class="avatar" role="img" aria-label=${label}>
        ${hasImage ? html`
          <img
            src=${this.src}
            alt=${this.alt || this.name || ''}
            @error=${this._onError}
            @load=${this._onLoad}
          />
        ` : initials ? html`<span class="initials">${initials}</span>`
          : html`<slot name="fallback">${userIcon}</slot>`}
      </div>
      ${this.status ? html`<span class="status ${this.status}" aria-hidden="true"></span>` : nothing}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cg-avatar': CgAvatar;
  }
}
