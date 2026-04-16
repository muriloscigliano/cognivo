import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { reducedMotion } from '../../styles/index.js';

/**
 * @element cg-sidebar
 * Top-level side navigation panel with collapsible icon-only mode.
 *
 * @example
 * ```html
 * <cg-sidebar collapsible side="left">
 *   <div slot="header">Logo</div>
 *   <nav>...</nav>
 *   <div slot="footer">User</div>
 * </cg-sidebar>
 * ```
 *
 * @slot header - Branding/header area
 * @slot - Navigation content
 * @slot footer - Footer area
 *
 * @fires {CustomEvent<{collapsed: boolean}>} cg-sidebar-toggle
 */
@customElement('cg-sidebar')
export class CgSidebar extends LitElement {
  static override styles = [reducedMotion, css`
    :host {
      display: block;
      width: var(--cg-component-sidebar-width);
      height: 100%;
      font-family: var(--cg-font-family-primary);
      transition: width var(--cg-transition-duration-default) var(--cg-transition-easing-default);
    }

    :host([collapsed]) {
      width: var(--cg-component-sidebar-collapsed-width);
    }

    :host([sticky]) {
      position: sticky;
      top: 0;
      max-height: 100vh;
    }

    .nav {
      display: flex;
      flex-direction: column;
      height: 100%;
      background: var(--cg-color-surface-container-background);
      color: var(--cg-color-surface-container-text);
      border-right: var(--cg-border-width-50) solid var(--cg-color-surface-container-border);
      overflow: hidden;
    }

    :host([side="right"]) .nav {
      border-right: none;
      border-left: var(--cg-border-width-50) solid var(--cg-color-surface-container-border);
    }

    .header,
    .footer {
      padding: var(--cg-component-sidebar-padding-y) var(--cg-component-sidebar-padding-x);
      flex-shrink: 0;
    }

    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--cg-spacing-8);
      border-bottom: var(--cg-border-width-50) solid var(--cg-color-surface-container-border);
    }

    .body {
      flex: 1;
      overflow-y: auto;
      padding: var(--cg-component-sidebar-padding-y) var(--cg-component-sidebar-padding-x);
    }

    .footer {
      border-top: var(--cg-border-width-50) solid var(--cg-color-surface-container-border);
    }

    .footer:empty,
    .header:empty {
      display: none;
    }

    .toggle {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: var(--cg-spacing-32);
      height: var(--cg-spacing-32);
      padding: 0;
      border: none;
      border-radius: var(--cg-border-radius-100);
      background: transparent;
      color: var(--cg-color-surface-container-text);
      cursor: pointer;
      flex-shrink: 0;
      transition:
        background-color var(--cg-transition-duration-fast) var(--cg-transition-easing-default),
        transform var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
    }
    .toggle:hover {
      background: var(--cg-color-action-secondary-background-hover);
    }
    .toggle:active {
      transform: scale(var(--cg-interaction-press-scale));
    }
    .toggle:focus-visible {
      outline: none;
      box-shadow:
        0 0 0 var(--cg-focus-ring-offset) var(--cg-color-focus-ring-offset),
        0 0 0 calc(var(--cg-focus-ring-offset) + var(--cg-focus-ring-width)) var(--cg-color-focus-ring);
    }

    .toggle svg {
      width: var(--cg-icon-size-100);
      height: var(--cg-icon-size-100);
      transition: transform var(--cg-transition-duration-default) var(--cg-transition-easing-default);
    }

    :host([collapsed]) .toggle svg {
      transform: rotate(180deg);
    }

    /* Hide header slot & labels when collapsed */
    :host([collapsed]) .header ::slotted([slot="header"]),
    :host([collapsed]) .footer ::slotted([slot="footer"]) {
      display: none;
    }
    :host([collapsed]) ::slotted(.label),
    :host([collapsed]) ::slotted([data-label]) {
      display: none;
    }
  `];

  @property({ type: Boolean, reflect: true }) collapsed = false;
  @property({ type: Boolean }) collapsible = false;
  @property({ reflect: true }) side: 'left' | 'right' = 'left';
  @property({ type: Boolean, reflect: true }) sticky = false;
  @property() width = '';

  override connectedCallback(): void {
    super.connectedCallback();
    if (this.width) {
      this.style.setProperty('--cg-component-sidebar-width', this.width);
    }
  }

  override updated(changed: Map<string, unknown>) {
    if (changed.has('width') && this.width) {
      this.style.setProperty('--cg-component-sidebar-width', this.width);
    }
  }

  private _toggle() {
    this.collapsed = !this.collapsed;
    this.dispatchEvent(new CustomEvent('cg-sidebar-toggle', {
      detail: { collapsed: this.collapsed },
      bubbles: true,
      composed: true,
    }));
  }

  override render() {
    return html`
      <nav class="nav" role="navigation" aria-label="Primary navigation">
        <div class="header">
          <slot name="header"></slot>
          ${this.collapsible ? html`
            <button
              class="toggle"
              type="button"
              aria-label=${this.collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              aria-expanded=${this.collapsed ? 'false' : 'true'}
              aria-controls="sidebar-body"
              @click=${this._toggle}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M15 18l-6-6 6-6"></path>
              </svg>
            </button>
          ` : nothing}
        </div>
        <div class="body" id="sidebar-body">
          <slot></slot>
        </div>
        <div class="footer">
          <slot name="footer"></slot>
        </div>
      </nav>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cg-sidebar': CgSidebar;
  }
}
