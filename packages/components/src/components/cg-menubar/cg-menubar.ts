import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { hostBlock, reducedMotion } from '../../styles/index.js';

export interface MenubarChildItem {
  label: string;
  shortcut?: string;
  disabled?: boolean;
  danger?: boolean;
  separator?: boolean;
  id?: string;
}

export interface MenubarItem {
  label: string;
  id?: string;
  children: MenubarChildItem[];
}

/**
 * @element cg-menubar
 * App-style horizontal menu bar (File/Edit/View) with dropdown submenus.
 *
 * @fires {CustomEvent<{menu:string,item:string}>} cg-menubar-select
 */
@customElement('cg-menubar')
export class CgMenubar extends LitElement {
  static override styles = [hostBlock, reducedMotion, css`
    :host {
      display: block;
      font-family: var(--cg-font-family-primary);
      color: var(--cg-color-surface-container-text);
    }

    [role="menubar"] {
      display: flex;
      align-items: center;
      gap: var(--cg-spacing-4);
      padding: var(--cg-spacing-6);
      background: var(--cg-color-surface-container-background);
      border: var(--cg-border-width-50) solid var(--cg-color-surface-container-border);
      border-radius: var(--cg-border-radius-100);
    }

    .top-trigger {
      display: inline-flex;
      align-items: center;
      padding: var(--cg-spacing-8) var(--cg-spacing-12);
      background: transparent;
      border: none;
      color: inherit;
      font: inherit;
      font-size: var(--cg-font-size-sm);
      font-weight: var(--cg-font-weight-medium);
      border-radius: var(--cg-border-radius-50);
      cursor: pointer;
      transition: background-color var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
    }
    .top-trigger:hover,
    .top-trigger.open {
      background: var(--cg-color-action-tertiary-background-hover);
    }
    .top-trigger.open {
      color: var(--cg-color-surface-base-text);
    }
    .top-trigger:focus-visible {
      outline: none;
      box-shadow:
        0 0 0 var(--cg-focus-ring-offset) var(--cg-color-focus-ring-offset),
        0 0 0 calc(var(--cg-focus-ring-offset) + var(--cg-focus-ring-width)) var(--cg-color-focus-ring);
    }

    .menu-wrap {
      position: relative;
    }

    .submenu {
      position: absolute;
      top: calc(100% + var(--cg-spacing-6));
      left: 0;
      z-index: var(--cg-z-index-500);
      min-width: var(--cg-spacing-192);
      padding: var(--cg-spacing-6);
      background: var(--cg-color-modal-container-background);
      border: var(--cg-border-width-50) solid var(--cg-color-modal-container-border);
      border-radius: var(--cg-border-radius-150);
      box-shadow: var(--cg-shadow-elevation-xl);
      display: flex;
      flex-direction: column;
      gap: var(--cg-spacing-2);
      transform-origin: top left;
      animation: menubarSubmenuIn var(--cg-transition-duration-default) var(--cg-transition-easing-ease-out);
    }
    @keyframes menubarSubmenuIn {
      from { opacity: 0; transform: scale(0.96) translateY(-4px); }
      to { opacity: 1; transform: scale(1) translateY(0); }
    }

    .submenu-item {
      display: flex;
      align-items: center;
      gap: var(--cg-spacing-12);
      padding: var(--cg-spacing-10) var(--cg-spacing-12);
      background: transparent;
      border: none;
      color: var(--cg-color-surface-container-text);
      font: inherit;
      font-size: var(--cg-font-size-sm);
      line-height: var(--cg-line-height-snug);
      text-align: left;
      border-radius: var(--cg-border-radius-50);
      cursor: pointer;
      width: 100%;
      box-sizing: border-box;
      transition:
        background-color var(--cg-transition-duration-fast) var(--cg-transition-easing-default),
        color var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
    }
    .submenu-item:hover:not(.disabled) {
      background: var(--cg-color-action-tertiary-background-hover);
    }
    .submenu-item.danger {
      color: var(--cg-color-status-error-text-default);
    }
    .submenu-item.disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    .submenu-item:focus-visible {
      outline: none;
      box-shadow:
        0 0 0 var(--cg-focus-ring-offset) var(--cg-color-focus-ring-offset),
        0 0 0 calc(var(--cg-focus-ring-offset) + var(--cg-focus-ring-width)) var(--cg-color-focus-ring);
    }

    .shortcut {
      margin-left: auto;
      font-size: var(--cg-font-size-xs);
      color: var(--cg-color-surface-container-outlined);
    }
    .separator {
      height: var(--cg-border-width-50);
      margin: var(--cg-spacing-6) 0;
      background: var(--cg-color-modal-container-border);
    }
  `];

  @property({ type: Array }) items: MenubarItem[] = [];
  @state() private _openIndex = -1;

  private _outsideHandler = (e: MouseEvent) => {
    if (!e.composedPath().includes(this)) this._openIndex = -1;
  };

  override connectedCallback(): void {
    super.connectedCallback();
    document.addEventListener('click', this._outsideHandler);
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    document.removeEventListener('click', this._outsideHandler);
  }

  private _onTopKeydown(e: KeyboardEvent, idx: number): void {
    const n = this.items.length;
    switch (e.key) {
      case 'ArrowLeft':
        e.preventDefault();
        this._focusTop((idx - 1 + n) % n);
        break;
      case 'ArrowRight':
        e.preventDefault();
        this._focusTop((idx + 1) % n);
        break;
      case 'ArrowDown':
      case 'Enter':
      case ' ':
        e.preventDefault();
        this._openIndex = idx;
        this.updateComplete.then(() => {
          const first = this.shadowRoot?.querySelector<HTMLButtonElement>('.submenu .submenu-item:not(.disabled)');
          first?.focus();
        });
        break;
      case 'Escape':
        e.preventDefault();
        this._openIndex = -1;
        break;
    }
  }

  private _onSubmenuKeydown(e: KeyboardEvent, triggerIdx: number): void {
    if (e.key === 'Escape') {
      e.preventDefault();
      this._openIndex = -1;
      this.updateComplete.then(() => {
        const btns = this.shadowRoot?.querySelectorAll<HTMLButtonElement>('.top-trigger');
        btns?.[triggerIdx]?.focus();
      });
      return;
    }
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      const items = Array.from(
        this.shadowRoot?.querySelectorAll<HTMLButtonElement>('.submenu .submenu-item:not(.disabled)') ?? [],
      );
      if (!items.length) return;
      const current = items.findIndex(el => el === this.shadowRoot?.activeElement);
      const delta = e.key === 'ArrowDown' ? 1 : -1;
      const next = (current + delta + items.length) % items.length;
      items[next]?.focus();
    }
  }

  private _focusTop(idx: number): void {
    this._openIndex = this._openIndex >= 0 ? idx : -1;
    this.updateComplete.then(() => {
      const btns = this.shadowRoot?.querySelectorAll<HTMLButtonElement>('.top-trigger');
      btns?.[idx]?.focus();
    });
  }

  private _selectChild(menu: MenubarItem, child: MenubarChildItem): void {
    if (child.disabled || child.separator) return;
    this.dispatchEvent(new CustomEvent('cg-menubar-select', {
      bubbles: true, composed: true,
      detail: { menu: menu.id ?? menu.label, item: child.id ?? child.label },
    }));
    this._openIndex = -1;
  }

  override render() {
    return html`
      <div role="menubar">
        ${this.items.map((menu, i) => html`
          <div class="menu-wrap">
            <button
              class="top-trigger ${this._openIndex === i ? 'open' : ''}"
              role="menuitem"
              aria-haspopup="menu"
              aria-expanded=${this._openIndex === i ? 'true' : 'false'}
              @click=${(e: MouseEvent) => { e.stopPropagation(); this._openIndex = this._openIndex === i ? -1 : i; }}
              @keydown=${(e: KeyboardEvent) => this._onTopKeydown(e, i)}
            >${menu.label}</button>
            ${this._openIndex === i ? html`
              <div class="submenu" role="menu" aria-label=${menu.label} @keydown=${(e: KeyboardEvent) => this._onSubmenuKeydown(e, i)}>
                ${menu.children.map(child => child.separator
                  ? html`<div class="separator" role="separator"></div>`
                  : html`
                    <button
                      class="submenu-item ${child.disabled ? 'disabled' : ''} ${child.danger ? 'danger' : ''}"
                      role="menuitem"
                      aria-disabled=${child.disabled ? 'true' : 'false'}
                      @click=${() => this._selectChild(menu, child)}
                    >
                      <span>${child.label}</span>
                      ${child.shortcut ? html`<span class="shortcut">${child.shortcut}</span>` : nothing}
                    </button>
                  `)}
              </div>
            ` : nothing}
          </div>
        `)}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cg-menubar': CgMenubar;
  }
}
