import { LitElement, html, css, nothing } from 'lit';
import { property } from 'lit/decorators.js';
import { customElement } from '../../utils/define.js';
import { hostBase, reducedMotion } from '../../styles/index.js';

/**
 * <cg-link> — Styled anchor element with variants.
 *
 * Features:
 * - Hover underline animation (width grows from center)
 * - External link icon with target=_blank
 * - Color variants: default, accent, muted, underline
 * - Disabled state, size variants
 * - Focus-visible ring, proper ARIA
 */
@customElement('cg-link')
export class CgLink extends LitElement {
  static override styles = [hostBase, reducedMotion, css`
    a {
      display: inline-flex;
      align-items: center;
      gap: var(--cg-spacing-4);
      text-decoration: none;
      position: relative;
      cursor: pointer;
      font-weight: var(--cg-font-weight-medium);
      transition: color var(--cg-transition-duration-state) var(--cg-transition-easing-ease-out);
    }

    /* Underline on hover and keyboard focus — fades in, nothing moves. */
    a::after {
      content: '';
      position: absolute;
      bottom: calc(-1 * var(--cg-border-width-50));
      left: 0;
      width: 100%;
      height: var(--cg-border-width-50);
      background: currentColor;
      opacity: 0;
      transition: opacity var(--cg-transition-duration-state) var(--cg-transition-easing-ease-out);
    }
    a:focus-visible::after { opacity: 1; }
    /* Hover (devices that hover): text to near-black (never accent), underline. */
    @media (hover: hover) {
      a:hover::after { opacity: 1; }
      a:hover,
      :host([variant]) a:hover { color: var(--cg-color-state-text); }
    }

    /* Focus ring — dual layer */
    a:focus-visible {
      outline: none;
      border-radius: var(--cg-border-radius-50);
      box-shadow:
        0 0 0 var(--cg-border-width-100) var(--cg-color-surface-base-background),
        0 0 0 calc(var(--cg-border-width-100) * 2) var(--cg-color-focus-ring);
    }

    /* Sizes */
    :host([size="sm"]) a { font-size: var(--cg-font-size-xs); }
    :host([size="md"]) a { font-size: var(--cg-font-size-sm); }
    :host([size="lg"]) a { font-size: var(--cg-font-size-base); }

    /* Variant: default */
    :host([variant="default"]) a { color: var(--cg-color-surface-base-text); }

    /* Variant: accent — uses the brand accent color */
    :host([variant="accent"]) a { color: var(--cg-color-accent-text); }
    :host([variant="accent"]) a::after { background: var(--cg-color-accent-text); }

    /* Variant: muted */
    :host([variant="muted"]) a { color: var(--cg-color-input-text-placeholder); }

    /* Variant: underline — always show underline */
    :host([variant="underline"]) a { color: var(--cg-color-surface-base-text); text-decoration: underline; text-underline-offset: var(--cg-spacing-2); text-decoration-skip-ink: auto; }
    :host([variant="underline"]) a::after { display: none; }

    /* Disabled */
    :host([disabled]) a {
      opacity: var(--cg-opacity-40);
      pointer-events: none;
      cursor: not-allowed;
    }
    :host([disabled]) a::after { display: none; }

    /* External icon */
    .external-icon {
      display: inline-flex;
      flex-shrink: 0;
      width: 0.85em;
      height: 0.85em;
    }
    .external-icon svg {
      width: 100%;
      height: 100%;
    }
  `];

  @property() href = '';
  @property({ reflect: true }) variant: 'default' | 'accent' | 'muted' | 'underline' = 'default';
  @property({ type: Boolean }) external = false;
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ reflect: true }) size: 'sm' | 'md' | 'lg' = 'md';

  private _onClick(e: MouseEvent) {
    if (this.disabled) {
      e.preventDefault();
      return;
    }
    this.dispatchEvent(new CustomEvent('cg-link-click', { bubbles: true, composed: true }));
  }

  override render() {
    return html`
      <a
        href=${this.href || nothing}
        target=${this.external ? '_blank' : nothing}
        rel=${this.external ? 'noopener noreferrer' : nothing}
        aria-disabled=${this.disabled ? 'true' : nothing}
        tabindex=${this.disabled ? -1 : 0}
        @click=${this._onClick}
      >
        <slot></slot>
        ${this.external ? html`
          <span class="external-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
              <polyline points="15 3 21 3 21 9"/>
              <line x1="10" y1="14" x2="21" y2="3"/>
            </svg>
          </span>
        ` : nothing}
      </a>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cg-link': CgLink;
  }
}
