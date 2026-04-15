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
      position: relative;
      font-family: var(--cg-font-family-primary);
      color: var(--cg-color-surface-container-text);
    }

    [role="navigation"] {
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
    .trigger:focus-visible {
      outline: none;
      box-shadow:
        0 0 0 var(--cg-focus-ring-offset) var(--cg-color-focus-ring-offset),
        0 0 0 calc(var(--cg-focus-ring-offset) + var(--cg-focus-ring-width)) var(--cg-color-focus-ring);
    }

    .panel {
      position: absolute;
      top: calc(100% + var(--cg-spacing-8));
      left: 0;
      z-index: var(--cg-z-index-500);
      min-width: var(--cg-component-navigation-menu-panel-min-width, 480px);
      padding: var(--cg-spacing-24);
      background: var(--cg-color-modal-container-background);
      border: var(--cg-border-width-50) solid var(--cg-color-modal-container-border);
      border-radius: var(--cg-border-radius-200);
      box-shadow: var(--cg-shadow-elevation-xl);
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: var(--cg-spacing-20);
      transform-origin: top;
      animation: navMenuPanelIn var(--cg-transition-duration-default) var(--cg-transition-easing-ease-out);
    }
    @keyframes navMenuPanelIn {
      from { opacity: 0; transform: translateY(-6px) scale(0.98); }
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
    .link:hover {
      background: var(--cg-color-action-tertiary-background-hover);
    }
    .link:active {
      transform: scale(var(--cg-interaction-press-scale));
    }
    .link-desc {
      line-height: var(--cg-line-height-relaxed);
    }
    .link-title {
      font-weight: var(--cg-font-weight-medium);
    }
    .link-desc {
      font-size: var(--cg-font-size-xs);
      color: var(--cg-color-surface-container-outlined);
    }
  `];

  @property({ type: Array }) items: NavMenuItem[] = [];
  @property({ type: Number }) openDelay = 80;
  @property({ type: Number }) closeDelay = 120;

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
            @mouseenter=${() => this._scheduleOpen(i)}
            @focus=${() => { this._openIndex = i; }}
            @click=${() => { this._openIndex = this._openIndex === i ? -1 : i; }}
          >
            ${menu.label}
          </button>
        `)}
        ${this._openIndex >= 0 && this.items[this._openIndex] ? html`
          <div
            class="panel"
            role="menu"
            @mouseenter=${() => { this._clearTimers(); }}
            @mouseleave=${this._scheduleClose}
          >
            ${this.items[this._openIndex]!.sections.map(section => html`
              <div>
                ${section.heading ? html`<h4 class="section-heading">${section.heading}</h4>` : nothing}
                ${section.links.map(link => html`
                  <button class="link" role="menuitem" @click=${() => this._selectLink(this.items[this._openIndex]!, link)}>
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
