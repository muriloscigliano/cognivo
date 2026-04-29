/**
 * @element ai-sidebar
 * @deprecated Use `<ai-app-sidebar>` directly. The element was renamed to clarify
 * its role as the AI app shell sidebar (data-driven via `sections` prop), distinct
 * from the slot-based `<cg-sidebar>` foundation. This shim wraps the new element
 * and re-fires events under the legacy name; it will be removed in v0.6.0.
 *
 * Migration:
 * ```html
 * <!-- Before -->
 * <ai-sidebar active-id="chat" .sections=${sections}></ai-sidebar>
 *
 * <!-- After -->
 * <ai-app-sidebar active-id="chat" .sections=${sections}></ai-app-sidebar>
 * ```
 *
 * @fires {CustomEvent<{id: string, label: string}>} ai-sidebar-item-click - Item clicked (legacy event, preserved)
 * @fires {CustomEvent<{collapsed: boolean}>} ai-sidebar-collapse - Collapse toggled (legacy event, preserved)
 */
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { hostBlock } from '../../styles/index.js';
import '../ai-app-sidebar/ai-app-sidebar.js';
import type { SidebarSection } from '../ai-app-sidebar/ai-app-sidebar.js';

let warned = false;

@customElement('ai-sidebar')
export class AiSidebar extends LitElement {
  static override styles = [hostBlock, css`:host { display: block; height: 100%; }`];

  @property({ type: Array }) sections: SidebarSection[] = [];
  @property({ type: Boolean, reflect: true }) collapsed = false;
  @property({ type: String, attribute: 'active-id' }) activeId = '';

  override connectedCallback() {
    super.connectedCallback();
    if (!warned) {
      warned = true;
      // eslint-disable-next-line no-console
      console.warn(
        '[cognivo] <ai-sidebar> is deprecated. Use <ai-app-sidebar> directly. ' +
          'This shim will be removed in v0.6.0.',
      );
    }
  }

  private _onItemClick = (e: Event) => {
    this.dispatchEvent(new CustomEvent('ai-sidebar-item-click', {
      detail: (e as CustomEvent).detail, bubbles: true, composed: true,
    }));
  };

  private _onCollapse = (e: Event) => {
    this.collapsed = (e as CustomEvent).detail.collapsed;
    this.dispatchEvent(new CustomEvent('ai-sidebar-collapse', {
      detail: (e as CustomEvent).detail, bubbles: true, composed: true,
    }));
  };

  override render() {
    return html`
      <ai-app-sidebar
        .sections=${this.sections}
        ?collapsed=${this.collapsed}
        active-id=${this.activeId}
        @ai-app-sidebar-item-click=${this._onItemClick}
        @ai-app-sidebar-collapse=${this._onCollapse}
      ></ai-app-sidebar>
    `;
  }
}

export type { SidebarSection, SidebarItem } from '../ai-app-sidebar/ai-app-sidebar.js';

declare global {
  interface HTMLElementTagNameMap {
    'ai-sidebar': AiSidebar;
  }
}
