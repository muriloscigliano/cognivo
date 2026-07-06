/**
 * @element ai-avatar
 * @deprecated Use `<cg-avatar type="agent">` directly. This element is now a thin
 * forwarding shim around `cg-avatar` for backwards compatibility and will be
 * removed in v0.6.0.
 *
 * Migration:
 * ```html
 * <!-- Before -->
 * <ai-avatar name="Claude" type="agent" status="busy"></ai-avatar>
 *
 * <!-- After -->
 * <cg-avatar name="Claude" type="agent" status="busy"></cg-avatar>
 * ```
 *
 * @fires {CustomEvent<{name: string, type: string}>} ai-avatar-click - Avatar clicked (legacy event, preserved)
 */
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { hostBase, reducedMotion } from '../../styles/index.js';
import '../cg-avatar/cg-avatar.js';

let warned = false;

@customElement('ai-avatar')
export class AiAvatar extends LitElement {
  static override styles = [hostBase, reducedMotion, css`
    :host {
      display: inline-block;
      cursor: pointer;
      transition: transform var(--cg-transition-duration-default) var(--cg-transition-easing-default);
    }
    :host([hidden]) { display: none; }
    :host(:hover) { transform: scale(1.02); }
    :host(:active) { transform: scale(var(--cg-interaction-press-scale)); }
    :host(:focus-visible) {
      outline: none;
      box-shadow:
        0 0 0 var(--cg-focus-ring-offset) var(--cg-color-focus-ring-offset),
        0 0 0 calc(var(--cg-focus-ring-offset) + var(--cg-focus-ring-width)) var(--cg-color-focus-ring);
      border-radius: var(--cg-border-radius-full);
    }
    @media (prefers-reduced-motion: reduce) {
      :host { transition-duration: 0.01ms; }
      :host(:hover), :host(:active) { transform: none; }
    }
  `];

  @property({ type: String }) src = '';
  @property({ type: String }) name = '';
  @property({ type: String, reflect: true }) size: 'sm' | 'md' | 'lg' = 'md';
  @property({ type: String, reflect: true }) status: 'online' | 'away' | 'offline' | 'busy' | '' = '';
  @property({ type: String, reflect: true }) type: 'user' | 'agent' | 'system' = 'user';

  override connectedCallback() {
    super.connectedCallback();
    if (!this.hasAttribute('tabindex')) this.tabIndex = 0;
    if (!this.hasAttribute('role')) this.setAttribute('role', 'button');
    this.addEventListener('click', this._handleClick);
    this.addEventListener('keydown', this._handleKeydown);
    if (!warned) {
      warned = true;
      // eslint-disable-next-line no-console
      console.warn(
        '[cognivo] <ai-avatar> is deprecated. Use <cg-avatar type="agent"> directly. ' +
          'This shim will be removed in v0.6.0.',
      );
    }
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('click', this._handleClick);
    this.removeEventListener('keydown', this._handleKeydown);
  }

  private _handleClick = () => {
    this.dispatchEvent(new CustomEvent('ai-avatar-click', {
      detail: { name: this.name, type: this.type },
      bubbles: true,
      composed: true,
    }));
  };

  private _handleKeydown = (e: KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this._handleClick();
    }
  };

  override render() {
    return html`
      <cg-avatar
        src=${ifDefined(this.src || undefined)}
        name=${this.name}
        size=${this.size}
        type=${this.type}
        status=${ifDefined(this.status || undefined)}
      ></cg-avatar>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ai-avatar': AiAvatar;
  }
}
