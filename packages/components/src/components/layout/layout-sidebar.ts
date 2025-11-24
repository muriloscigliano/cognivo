import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

export interface LayoutSidebarConfig {
  position?: 'left' | 'right';
  width?: string;
  collapsible?: boolean;
  collapsed?: boolean;
  resizable?: boolean;
  minWidth?: string;
  maxWidth?: string;
}

/**
 * Layout Sidebar
 *
 * Collapsible sidebar layout with resize support
 * Supports left/right positioning and responsive behavior
 */
@customElement('layout-sidebar')
export class LayoutSidebar extends LitElement {
  static override styles = [
    baseStyles,
    css`
      :host {
        display: flex;
        gap: var(--sidebar-gap, ${tokens.spacing.lg});
        height: 100%;
        font-family: ${tokens.fontFamily.primary};
      }

      :host([position='right']) {
        flex-direction: row-reverse;
      }

      .sidebar {
        width: var(--sidebar-width, 250px);
        min-width: var(--sidebar-min-width, 200px);
        max-width: var(--sidebar-max-width, 400px);
        flex-shrink: 0;
        display: flex;
        flex-direction: column;
        background: ${tokens.color.gray50};
        border-right: 1px solid ${tokens.color.gray100};
        position: relative;
        transition: width ${tokens.transition.default} ease-in-out,
                    transform ${tokens.transition.default} ease-in-out;
        overflow: hidden;
      }

      :host([position='right']) .sidebar {
        border-right: none;
        border-left: 1px solid ${tokens.color.gray100};
      }

      .sidebar-content {
        flex: 1;
        overflow-y: auto;
        overflow-x: hidden;
      }

      /* Collapsed state */
      :host([collapsed]) .sidebar {
        width: 60px;
        min-width: 60px;
      }

      :host([collapsed]) .sidebar-content {
        opacity: 0;
        pointer-events: none;
      }

      /* Toggle button */
      .toggle-button {
        position: absolute;
        top: ${tokens.spacing.md};
        right: ${tokens.spacing.sm};
        background: ${tokens.color.grayWhite};
        border: 1px solid ${tokens.color.gray100};
        border-radius: ${tokens.radius.md};
        width: 32px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: background ${tokens.transition.fast};
        z-index: 10;
      }

      :host([position='right']) .toggle-button {
        right: auto;
        left: ${tokens.spacing.sm};
      }

      .toggle-button:hover {
        background: ${tokens.color.gray50};
      }

      .toggle-button::before {
        content: '◀';
        font-size: 12px;
        color: ${tokens.color.gray500};
      }

      :host([collapsed]) .toggle-button::before {
        content: '▶';
      }

      :host([position='right']) .toggle-button::before {
        content: '▶';
      }

      :host([position='right'][collapsed]) .toggle-button::before {
        content: '◀';
      }

      /* Resize handle */
      .resize-handle {
        position: absolute;
        top: 0;
        right: -4px;
        width: 8px;
        height: 100%;
        cursor: col-resize;
        z-index: 20;
        background: transparent;
        transition: background ${tokens.transition.fast};
      }

      :host([position='right']) .resize-handle {
        right: auto;
        left: -4px;
      }

      .resize-handle:hover,
      .resize-handle.resizing {
        background: ${tokens.color.primaryMain};
        opacity: 0.3;
      }

      .resize-handle::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 2px;
        height: 40px;
        background: ${tokens.color.gray100};
        border-radius: 1px;
      }

      /* Main content */
      .main {
        flex: 1;
        min-width: 0;
        overflow: auto;
      }

      /* Hide resize handle when collapsed or not resizable */
      :host([collapsed]) .resize-handle,
      :host(:not([resizable])) .resize-handle {
        display: none;
      }

      /* Hide toggle button when not collapsible */
      :host(:not([collapsible])) .toggle-button {
        display: none;
      }

      /* Responsive behavior */
      @media (max-width: 992px) {
        :host {
          gap: ${tokens.spacing.md};
        }

        .sidebar {
          --sidebar-width: 220px;
        }
      }

      @media (max-width: 768px) {
        :host {
          flex-direction: column;
          gap: 0;
        }

        :host([position='right']) {
          flex-direction: column;
        }

        .sidebar {
          width: 100% !important;
          max-width: 100%;
          min-width: 100%;
          border-right: none;
          border-left: none;
          border-bottom: 1px solid ${tokens.color.gray100};
        }

        .resize-handle {
          display: none;
        }

        :host([collapsed]) .sidebar {
          height: 0;
          min-height: 0;
          border: none;
          padding: 0;
        }
      }
    `,
  ];

  @property({ type: String, reflect: true })
  position: 'left' | 'right' = 'left';

  @property({ type: String })
  width = '250px';

  @property({ type: String, attribute: 'min-width' })
  minWidth = '200px';

  @property({ type: String, attribute: 'max-width' })
  maxWidth = '400px';

  @property({ type: Boolean, reflect: true })
  collapsible = false;

  @property({ type: Boolean, reflect: true })
  collapsed = false;

  @property({ type: Boolean, reflect: true })
  resizable = false;

  @state()
  private isResizing = false;

  @state()
  private resizeStartX = 0;

  @state()
  private resizeStartWidth = 0;

  override connectedCallback() {
    super.connectedCallback();
    this.style.setProperty('--sidebar-width', this.width);
    this.style.setProperty('--sidebar-min-width', this.minWidth);
    this.style.setProperty('--sidebar-max-width', this.maxWidth);
  }

  private handleToggle() {
    this.collapsed = !this.collapsed;
    this.dispatchEvent(new CustomEvent('sidebar-toggle', {
      detail: { collapsed: this.collapsed },
      bubbles: true,
      composed: true,
    }));
  }

  private handleResizeStart(e: MouseEvent) {
    if (!this.resizable) return;

    this.isResizing = true;
    this.resizeStartX = e.clientX;
    const sidebar = this.shadowRoot?.querySelector('.sidebar') as HTMLElement;
    this.resizeStartWidth = sidebar.offsetWidth;

    document.addEventListener('mousemove', this.handleResizeMove);
    document.addEventListener('mouseup', this.handleResizeEnd);

    e.preventDefault();
  }

  private handleResizeMove = (e: MouseEvent) => {
    if (!this.isResizing) return;

    const deltaX = this.position === 'left'
      ? e.clientX - this.resizeStartX
      : this.resizeStartX - e.clientX;

    let newWidth = this.resizeStartWidth + deltaX;

    const minWidth = parseInt(this.minWidth);
    const maxWidth = parseInt(this.maxWidth);
    newWidth = Math.max(minWidth, Math.min(maxWidth, newWidth));

    this.style.setProperty('--sidebar-width', `${newWidth}px`);
  };

  private handleResizeEnd = () => {
    this.isResizing = false;
    document.removeEventListener('mousemove', this.handleResizeMove);
    document.removeEventListener('mouseup', this.handleResizeEnd);

    const currentWidth = getComputedStyle(this).getPropertyValue('--sidebar-width');
    this.dispatchEvent(new CustomEvent('sidebar-resize', {
      detail: { width: currentWidth },
      bubbles: true,
      composed: true,
    }));
  };

  override render() {
    const sidebar = html`
      <aside class="sidebar">
        ${this.collapsible ? html`
          <button
            class="toggle-button"
            @click=${this.handleToggle}
            aria-label=${this.collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          ></button>
        ` : ''}
        ${this.resizable ? html`
          <div
            class="resize-handle ${this.isResizing ? 'resizing' : ''}"
            @mousedown=${this.handleResizeStart}
          ></div>
        ` : ''}
        <div class="sidebar-content">
          <slot name="sidebar"></slot>
        </div>
      </aside>
    `;

    const main = html`
      <main class="main">
        <slot></slot>
      </main>
    `;

    return this.position === 'left'
      ? html`${sidebar}${main}`
      : html`${main}${sidebar}`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'layout-sidebar': LayoutSidebar;
  }
}
