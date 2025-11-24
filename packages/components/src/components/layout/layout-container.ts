import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

export interface LayoutContainerConfig {
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  fullHeight?: boolean;
  centered?: boolean;
  padding?: string;
  layout?: 'default' | 'app' | 'dashboard';
}

/**
 * Layout Container
 *
 * Main app container with header/sidebar/content/footer slots
 * Supports multiple layout modes and responsive sizing
 */
@customElement('layout-container')
export class LayoutContainer extends LitElement {
  static override styles = [
    baseStyles,
    css`
      :host {
        display: block;
        width: 100%;
        max-width: var(--container-max-width, 1200px);
        margin: 0 auto;
        padding: var(--container-padding, ${tokens.spacing.lg});
        font-family: ${tokens.fontFamily.primary};
      }

      /* Size variants */
      :host([size='sm']) { --container-max-width: 640px; }
      :host([size='md']) { --container-max-width: 768px; }
      :host([size='lg']) { --container-max-width: 1024px; }
      :host([size='xl']) { --container-max-width: 1280px; }
      :host([size='2xl']) { --container-max-width: 1536px; }
      :host([size='full']) {
        --container-max-width: 100%;
        padding: 0;
      }

      /* Full height mode */
      :host([full-height]) {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
      }

      /* Centered content */
      :host([centered]) {
        display: flex;
        align-items: center;
        justify-content: center;
      }

      /* App layout mode */
      .app-layout {
        display: grid;
        min-height: 100vh;
        grid-template-rows: auto 1fr auto;
        grid-template-columns: 1fr;
        gap: 0;
      }

      .app-layout-header {
        grid-row: 1;
        position: sticky;
        top: 0;
        z-index: 100;
        background: ${tokens.color.grayWhite};
        border-bottom: 1px solid ${tokens.color.gray100};
      }

      .app-layout-main {
        grid-row: 2;
        display: grid;
        grid-template-columns: auto 1fr;
        gap: 0;
        overflow: hidden;
      }

      .app-layout-sidebar {
        grid-column: 1;
        border-right: 1px solid ${tokens.color.gray100};
        background: ${tokens.color.gray50};
      }

      .app-layout-content {
        grid-column: 2;
        overflow: auto;
        padding: ${tokens.spacing.lg};
      }

      .app-layout-footer {
        grid-row: 3;
        border-top: 1px solid ${tokens.color.gray100};
        background: ${tokens.color.gray50};
      }

      /* Dashboard layout mode */
      .dashboard-layout {
        display: grid;
        min-height: 100vh;
        grid-template-rows: auto 1fr;
        grid-template-columns: auto 1fr;
        gap: 0;
      }

      .dashboard-layout-header {
        grid-row: 1;
        grid-column: 1 / -1;
        position: sticky;
        top: 0;
        z-index: 100;
        background: ${tokens.color.grayWhite};
        border-bottom: 1px solid ${tokens.color.gray100};
      }

      .dashboard-layout-sidebar {
        grid-row: 2;
        grid-column: 1;
        border-right: 1px solid ${tokens.color.gray100};
        background: ${tokens.color.gray50};
      }

      .dashboard-layout-content {
        grid-row: 2;
        grid-column: 2;
        overflow: auto;
        padding: ${tokens.spacing.xl};
        background: ${tokens.color.gray50};
      }

      /* Default layout (simple) */
      .default-layout {
        display: block;
      }

      /* Responsive adjustments */
      @media (max-width: 768px) {
        :host {
          padding: var(--container-padding, ${tokens.spacing.md});
        }

        .app-layout-main,
        .dashboard-layout {
          grid-template-columns: 1fr;
        }

        .app-layout-sidebar,
        .dashboard-layout-sidebar {
          display: none;
        }

        .app-layout-content,
        .dashboard-layout-content {
          grid-column: 1;
        }
      }

      @media (max-width: 480px) {
        :host {
          padding: var(--container-padding, ${tokens.spacing.sm});
        }
      }
    `,
  ];

  @property({ type: String, reflect: true })
  size: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full' = 'lg';

  @property({ type: String, reflect: true })
  layout: 'default' | 'app' | 'dashboard' = 'default';

  @property({ type: Boolean, reflect: true, attribute: 'full-height' })
  fullHeight = false;

  @property({ type: Boolean, reflect: true })
  centered = false;

  @property({ type: String })
  padding = '';

  override connectedCallback() {
    super.connectedCallback();
    if (this.padding) {
      this.style.setProperty('--container-padding', this.padding);
    }
  }

  override render() {
    if (this.layout === 'app') {
      return this.renderAppLayout();
    } else if (this.layout === 'dashboard') {
      return this.renderDashboardLayout();
    }
    return this.renderDefaultLayout();
  }

  private renderDefaultLayout() {
    return html`
      <div class="default-layout">
        <slot></slot>
      </div>
    `;
  }

  private renderAppLayout() {
    return html`
      <div class="app-layout">
        <header class="app-layout-header">
          <slot name="header"></slot>
        </header>
        <div class="app-layout-main">
          <aside class="app-layout-sidebar">
            <slot name="sidebar"></slot>
          </aside>
          <main class="app-layout-content">
            <slot></slot>
          </main>
        </div>
        <footer class="app-layout-footer">
          <slot name="footer"></slot>
        </footer>
      </div>
    `;
  }

  private renderDashboardLayout() {
    return html`
      <div class="dashboard-layout">
        <header class="dashboard-layout-header">
          <slot name="header"></slot>
        </header>
        <aside class="dashboard-layout-sidebar">
          <slot name="sidebar"></slot>
        </aside>
        <main class="dashboard-layout-content">
          <slot></slot>
        </main>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'layout-container': LayoutContainer;
  }
}
