import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { hostBlock, reducedMotion } from '../../styles/index.js';

export interface NavMenuLink {
  title: string;
  description?: string;
  icon?: string;
  href?: string;
}

export interface NavMenuSection {
  heading?: string;
  links: NavMenuLink[];
}

export interface NavMenuItem {
  label: string;
  id?: string;
  sections: NavMenuSection[];
}

/**
 * @element cg-navigation-menu
 * Horizontal mega-menu with large panel drop-downs grouped by section.
 *
 * @fires {CustomEvent<{menu:string,link:string}>} cg-navigation-menu-select
 */
@customElement('cg-navigation-menu')
export class CgNavigationMenu extends LitElement {
  static override styles = [hostBlock, reducedMotion, css`
    :host {
      display: block;
      font-family: var(--cg-font-family-primary);
      color: var(--cg-color-surface-container-text);
    }

    [role="navigation"] {
      position: relative;
      display: flex;
      align-items: center;
      gap: var(--cg-spacing-6);
    }

    .trigger {
      display: inline-flex;
      align-items: center;
      gap: var(--cg-spacing-4);
      padding: var(--cg-spacing-8) var(--cg-spacing-12);
      background: transparent;
      border: none;
      color: inherit;
      font: inherit;
      font-size: var(--cg-font-size-sm);
      font-weight: var(--cg-font-weight-medium);
      border-radius: var(--cg-border-radius-100);
      cursor: pointer;
      transition: background-color var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
    }
    .trigger:hover,
    .trigger.open {
      background: var(--cg-color-action-tertiary-background-hover);
    }
    .trigger:active { transform: scale(var(--cg-interaction-press-scale)); }
    .trigger:focus-visible {
      outline: none;
      box-shadow:
        0 0 0 var(--cg-focus-ring-offset) var(--cg-color-focus-ring-offset),
        0 0 0 calc(var(--cg-focus-ring-offset) + var(--cg-focus-ring-width)) var(--cg-color-focus-ring);
    }

    /* Caret indicator on triggers — rotates 180° when open. */
    .trigger-caret {
      display: inline-flex;
      width: var(--cg-icon-size-100);
      height: var(--cg-icon-size-100);
      color: var(--cg-color-surface-container-outlined);
      transition:
        transform var(--cg-transition-duration-default) var(--cg-transition-easing-default),
        color var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
    }
    .trigger:hover .trigger-caret,
    .trigger.open .trigger-caret { color: var(--cg-color-surface-base-text); }
    .trigger.open .trigger-caret { transform: rotate(180deg); }

    .panel {
      position: absolute;
      top: calc(100% + var(--cg-spacing-8));
      left: 0;
      z-index: var(--cg-z-index-500);
      min-width: var(--cg-component-navigation-menu-panel-min-width);
      padding: var(--cg-spacing-24);
      background: var(--cg-color-modal-container-background);
      border: var(--cg-border-width-50) solid var(--cg-color-modal-container-border);
      border-radius: var(--cg-border-radius-200);
      box-shadow: var(--cg-shadow-elevation-xl);
      display: grid;
      grid-template-columns: repeat(var(--cg-nm-columns), minmax(0, 1fr));
      gap: var(--cg-spacing-20);
      transform-origin: top;
      animation: navMenuPanelIn var(--cg-transition-duration-default) var(--cg-transition-easing-ease-out);
    }
    @keyframes navMenuPanelIn {
      from { opacity: 0; transform: translateY(calc(-1 * var(--cg-spacing-6))) scale(0.98); }
      to { opacity: 1; transform: translateY(0) scale(1); }
    }

    .section-heading {
      margin: 0 0 var(--cg-spacing-12) var(--cg-spacing-12);
      font-size: var(--cg-font-size-xs);
      font-weight: var(--cg-font-weight-semibold);
      text-transform: uppercase;
      letter-spacing: var(--cg-letter-spacing-wider);
      color: var(--cg-color-surface-container-outlined);
    }

    .link {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: var(--cg-spacing-4);
      padding: var(--cg-spacing-12);
      background: transparent;
      border: none;
      text-align: left;
      color: inherit;
      font: inherit;
      font-size: var(--cg-font-size-sm);
      text-decoration: none;
      border-radius: var(--cg-border-radius-100);
      cursor: pointer;
      transition:
        background-color var(--cg-transition-duration-fast) var(--cg-transition-easing-default),
        transform var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
      width: 100%;
      box-sizing: border-box;
    }
    /* Optional leading icon — stacks above the title (vertical rhythm). */
    .link-icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: var(--cg-spacing-32);
      height: var(--cg-spacing-32);
      margin-bottom: var(--cg-spacing-4);
      background: var(--cg-color-action-tertiary-background-hover);
      border-radius: var(--cg-border-radius-100);
      color: var(--cg-color-accent-text);
      transition: background var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
    }
    .link-icon svg { width: var(--cg-icon-size-100); height: var(--cg-icon-size-100); }
    .link:hover .link-icon { background: var(--cg-color-surface-container-background); }
    .link:hover {
      background: var(--cg-color-action-tertiary-background-hover);
    }
    .link:active {
      transform: scale(var(--cg-interaction-press-scale));
    }
    .link:focus-visible {
      outline: none;
      box-shadow:
        0 0 0 var(--cg-focus-ring-offset) var(--cg-color-focus-ring-offset),
        0 0 0 calc(var(--cg-focus-ring-offset) + var(--cg-focus-ring-width)) var(--cg-color-focus-ring);
    }
    .link-title {
      font-weight: var(--cg-font-weight-medium);
    }
    .link-desc {
      font-size: var(--cg-font-size-xs);
      line-height: var(--cg-line-height-relaxed);
      color: var(--cg-color-surface-container-outlined);
    }
  `];

  @property({ type: Array }) items: NavMenuItem[] = [];
  @property({ type: Number }) openDelay = 80;
  @property({ type: Number }) closeDelay = 120;
  /** Panel grid column count. Default 2. */
  @property({ type: Number }) columns: 1 | 2 | 3 | 4 = 2;

  @state() private _openIndex = -1;
  private _openTimer: number | null = null;
  private _closeTimer: number | null = null;

  private _clearTimers() {
    if (this._openTimer) { clearTimeout(this._openTimer); this._openTimer = null; }
    if (this._closeTimer) { clearTimeout(this._closeTimer); this._closeTimer = null; }
  }

  private _scheduleOpen(i: number): void {
    this._clearTimers();
    this._openTimer = window.setTimeout(() => { this._openIndex = i; }, this.openDelay);
  }

  private _scheduleClose(): void {
    this._clearTimers();
    this._closeTimer = window.setTimeout(() => { this._openIndex = -1; }, this.closeDelay);
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this._clearTimers();
  }

  private _onKeydown(e: KeyboardEvent): void {
    if (e.key === 'Escape' && this._openIndex !== -1) {
      e.preventDefault();
      this._openIndex = -1;
    }
  }

  private _selectLink(menu: NavMenuItem, link: NavMenuLink): void {
    this.dispatchEvent(new CustomEvent('cg-navigation-menu-select', {
      bubbles: true, composed: true,
      detail: { menu: menu.id ?? menu.label, link: link.title, href: link.href },
    }));
    this._openIndex = -1;
  }

  override render() {
    return html`
      <nav role="navigation" @mouseleave=${this._scheduleClose} @keydown=${this._onKeydown}>
        ${this.items.map((menu, i) => html`
          <button
            class="trigger ${this._openIndex === i ? 'open' : ''}"
            aria-haspopup="menu"
            aria-expanded=${this._openIndex === i ? 'true' : 'false'}
            aria-controls="cg-navigation-menu-panel"
            @mouseenter=${() => this._scheduleOpen(i)}
            @focus=${() => { this._openIndex = i; }}
            @click=${() => { this._openIndex = this._openIndex === i ? -1 : i; }}
          >
            <span>${menu.label}</span>
            <span class="trigger-caret" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="6 9 12 15 18 9"/>
              </svg>
            </span>
          </button>
        `)}
        ${this._openIndex >= 0 && this.items[this._openIndex] ? html`
          <div
            id="cg-navigation-menu-panel"
            class="panel"
            role="menu"
            style=${`--cg-nm-columns: ${this.columns};`}
            @mouseenter=${() => { this._clearTimers(); }}
            @mouseleave=${this._scheduleClose}
          >
            ${this.items[this._openIndex]!.sections.map(section => html`
              <div>
                ${section.heading ? html`<h4 class="section-heading">${section.heading}</h4>` : nothing}
                ${section.links.map(link => html`
                  <button class="link" role="menuitem" @click=${() => this._selectLink(this.items[this._openIndex]!, link)}>
                    ${link.icon ? html`<span class="link-icon" aria-hidden="true" .innerHTML=${link.icon}></span>` : nothing}
                    <span class="link-title">${link.title}</span>
                    ${link.description ? html`<span class="link-desc">${link.description}</span>` : nothing}
                  </button>
                `)}
              </div>
            `)}
          </div>
        ` : nothing}
      </nav>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cg-navigation-menu': CgNavigationMenu;
  }
}
