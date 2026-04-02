/**
 * @element ai-avatar
 * User or agent avatar with image/initials fallback, status indicator dot, and type-colored ring.
 *
 * @example
 * ```html
 * <ai-avatar name="Jane Doe" src="/avatars/jane.jpg" size="lg" status="online" type="user"></ai-avatar>
 * <ai-avatar name="Claude" type="agent" status="busy"></ai-avatar>
 * ```
 *
 * @fires {CustomEvent<{name: string, type: string}>} ai-avatar-click - Avatar clicked
 *
 * @cssprop [--cg-color-accent=#dfff61] - Agent ring and focus outline color
 * @cssprop [--cg-color-surface=#27272a] - Inner circle background for initials
 */
import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { hostBase, reducedMotion, shimmerKeyframes, fadeSlideInKeyframes } from '../../styles/index.js';

@customElement('ai-avatar')
export class AiAvatar extends LitElement {
  static override styles = [hostBase, reducedMotion, shimmerKeyframes, fadeSlideInKeyframes, css`
    :host {
      animation: fadeSlideIn 200ms var(--cg-motion-easing-enter, cubic-bezier(0, 0, 0.2, 1)) both;
    }
    :host([hidden]) { display: none; }

    .avatar {
      position: relative;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      overflow: visible;
      cursor: pointer;
      background: none;
      border: none;
      padding: 0;
    }
    .avatar:focus-visible {
      outline: 2px solid var(--cg-color-accent, #dfff61);
      outline-offset: 3px;
      border-radius: 50%;
    }

    .ring {
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      border: 2px solid var(--cg-color-border, #27272a);
    }
    :host([type="agent"]) .ring { border-color: var(--cg-color-accent, #dfff61); }
    :host([type="user"]) .ring { border-color: var(--cg-color-status-info-text-default, #3b82f6); }
    :host([type="system"]) .ring { border-color: var(--cg-gray-500, #71717a); }

    .inner {
      border-radius: 50%;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--cg-color-surface, #27272a);
      background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0.03), transparent);
      color: var(--cg-color-text-primary, #fafafa);
      font-weight: 600;
      box-shadow: inset 0 1px 0 0 rgba(255, 255, 255, 0.05);
    }

    /* Sizes */
    :host([size="sm"]) .ring { width: 28px; height: 28px; }
    :host([size="sm"]) .inner { width: 22px; height: 22px; font-size: 10px; }
    :host([size="md"]) .ring,
    :host(:not([size])) .ring { width: 40px; height: 40px; }
    :host([size="md"]) .inner,
    :host(:not([size])) .inner { width: 34px; height: 34px; font-size: 13px; }
    :host([size="lg"]) .ring { width: 56px; height: 56px; }
    :host([size="lg"]) .inner { width: 48px; height: 48px; font-size: 18px; }

    .inner img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }

    /* Status dot */
    .status-dot {
      position: absolute;
      bottom: 0;
      right: 0;
      border-radius: 50%;
      border: 2px solid var(--cg-color-surface, #18181b);
    }
    :host([size="sm"]) .status-dot { width: 8px; height: 8px; }
    :host([size="md"]) .status-dot,
    :host(:not([size])) .status-dot { width: 10px; height: 10px; }
    :host([size="lg"]) .status-dot { width: 14px; height: 14px; }

    .status-dot[data-status="online"] { background: var(--cg-color-status-success-text-default, #22c55e); }
    .status-dot[data-status="away"] { background: #eab308; }
    .status-dot[data-status="busy"] { background: var(--cg-color-status-error-text-default, #ef4444); }
    .status-dot[data-status="offline"] { background: var(--cg-gray-600, #52525b); }

    /* Loading skeleton */
    .skeleton {
      background: linear-gradient(90deg, var(--cg-color-surface-container-border, #27272a) 25%, var(--cg-gray-700, #3f3f46) 50%, var(--cg-color-surface-container-border, #27272a) 75%);
      background-size: 200% 100%;
      animation: shimmer 1.5s infinite;
    }
    }
  `];
  @property({ type: String }) src = '';
  @property({ type: String }) name = '';
  @property({ type: String, reflect: true }) size: 'sm' | 'md' | 'lg' = 'md';
  @property({ type: String, reflect: true }) status: 'online' | 'away' | 'offline' | 'busy' | '' = '';
  @property({ type: String, reflect: true }) type: 'user' | 'agent' | 'system' = 'user';

  @state() private _imgLoaded = false;
  @state() private _imgError = false;

  private get _initials(): string {
    return this.name
      .split(/\s+/)
      .slice(0, 2)
      .map(w => w[0] || '')
      .join('')
      .toUpperCase();
  }

  private _handleClick(): void {
    this.dispatchEvent(new CustomEvent('ai-avatar-click', {
      detail: { name: this.name, type: this.type },
      bubbles: true,
      composed: true,
    }));
  }

  private _onImgLoad(): void {
    this._imgLoaded = true;
  }

  private _onImgError(): void {
    this._imgError = true;
  }

  override updated(changed: Map<string, unknown>): void {
    if (changed.has('src')) {
      this._imgLoaded = false;
      this._imgError = false;
    }
  }

  override render() {
    const showImage = this.src && !this._imgError;
    const isLoading = showImage && !this._imgLoaded;

    return html`
      <button
        class="avatar"
        role="img"
        tabindex="0"
        aria-label=${this.name || 'Avatar'}
        @click=${this._handleClick}
      >
        <div class="ring">
          <div class="inner ${isLoading ? 'skeleton' : ''}">
            ${showImage
              ? html`<img
                  src=${this.src}
                  alt=${this.name}
                  @load=${this._onImgLoad}
                  @error=${this._onImgError}
                />`
              : html`${this._initials}`
            }
          </div>
        </div>
        ${this.status
          ? html`<span class="status-dot" data-status=${this.status} aria-label=${`Status: ${this.status}`}></span>`
          : nothing
        }
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ai-avatar': AiAvatar;
  }
}
