import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';

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
  static override styles = css`
    :host {
      transition: color var(--cg-motion-duration-fast, 80ms) var(--cg-motion-easing-color, cubic-bezier(0, 0, 0.58, 1));
      display: inline-flex;
      font-family: var(--cg-font-family-primary, 'Inter Variable', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif);
    }

    a {
      display: inline-flex;
      align-items: center;
      gap: var(--cg-spacing-4, 4px);
      text-decoration: none;
      position: relative;
      cursor: pointer;
      font-weight: var(--cg-font-weight-medium, 500);
      transition: color 150ms ease;
    }

    /* Underline animation — grows from center */
    a::after {
      content: '';
      position: absolute;
      bottom: -1px;
      left: 50%;
      width: 0;
      height: 1px;
      background: currentColor;
      transition: width var(--cg-motion-duration-slow, 200ms) var(--cg-motion-easing-default, cubic-bezier(0.4, 0, 0.2, 1)), left var(--cg-motion-duration-slow, 200ms) var(--cg-motion-easing-default, cubic-bezier(0.4, 0, 0.2, 1));
    }
    a:hover::after {
      left: 0;
      width: 100%;
    }

    /* Focus ring — dual layer */
    a:focus-visible {
      outline: none;
      border-radius: var(--cg-border-radius-50, 4px);
      box-shadow:
        0 0 0 2px var(--cg-color-surface-base-background, #09090b),
        0 0 0 4px var(--cg-brand-ai-accent, #dfff61);
    }

    /* Sizes */
    :host([size="sm"]) a { font-size: var(--cg-font-size-xs, 12px); }
    :host([size="md"]) a { font-size: var(--cg-font-size-sm, 14px); }
    :host([size="lg"]) a { font-size: var(--cg-font-size-base, 16px); }

    /* Variant: default */
    :host([variant="default"]) a { color: var(--cg-color-surface-base-text, #fafafa); }
    :host([variant="default"]) a:hover { color: var(--cg-brand-ai-accent, #dfff61); }

    /* Variant: accent */
    :host([variant="accent"]) a { color: var(--cg-brand-ai-accent, #dfff61); }
    :host([variant="accent"]) a:hover { color: var(--cg-text-accent, #e5ff6b); }

    /* Variant: muted */
    :host([variant="muted"]) a { color: var(--cg-color-input-text-placeholder, #71717a); }
    :host([variant="muted"]) a:hover { color: var(--cg-color-surface-base-text, #fafafa); }

    /* Variant: underline — always show underline */
    :host([variant="underline"]) a { color: var(--cg-color-surface-base-text, #fafafa); text-decoration: underline; text-underline-offset: 3px; }
    :host([variant="underline"]) a::after { display: none; }
    :host([variant="underline"]) a:hover { color: var(--cg-brand-ai-accent, #dfff61); }

    /* Disabled */
    :host([disabled]) a {
      opacity: 0.5;
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

    @media (prefers-reduced-motion: reduce) {
      a, a::after { transition: none; }
    }
  `;

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
