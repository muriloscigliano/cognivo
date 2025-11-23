import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

/**
 * Widget Configuration
 */
export interface WidgetConfig {
  title?: string;
  collapsible?: boolean;
  closable?: boolean;
  refreshable?: boolean;
  expandable?: boolean;
}

/**
 * Dashboard Widget - Base widget container with header/body/footer slots
 *
 * Features:
 * - Composable header, body, and footer slots
 * - Expand/collapse functionality
 * - Loading and error states
 * - Drag handle for reordering
 * - Resize indicators
 * - Widget actions (refresh, settings, close)
 */
@customElement('dashboard-widget')
export class DashboardWidget extends LitElement {
  static override styles = [
    baseStyles,
    css`
      :host {
        display: flex;
        flex-direction: column;
        background: ${tokens.color.grayWhite};
        border: 1px solid ${tokens.color.gray200};
        border-radius: ${tokens.radius.lg};
        box-shadow: ${tokens.shadow.sm};
        overflow: hidden;
        transition: all ${tokens.transition.base};
        position: relative;
      }

      :host(:hover) {
        box-shadow: ${tokens.shadow.md};
        border-color: ${tokens.color.gray300};
      }

      :host([collapsed]) {
        .widget-body,
        .widget-footer {
          display: none;
        }
      }

      :host([expanded]) {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 90vw;
        height: 90vh;
        z-index: 1000;
        max-width: none;
      }

      :host([loading]) {
        pointer-events: none;
      }

      :host([error]) {
        border-color: ${tokens.color.error};
      }

      /* Drag handle */
      :host([draggable]) .drag-handle {
        display: flex;
      }

      .drag-handle {
        display: none;
        position: absolute;
        top: ${tokens.spacing.sm};
        left: ${tokens.spacing.sm};
        cursor: grab;
        color: ${tokens.color.gray400};
        font-size: ${tokens.font.size.sm};
        padding: ${tokens.spacing.xs};
        border-radius: ${tokens.radius.sm};
        transition: all ${tokens.transition.fast};
      }

      .drag-handle:hover {
        color: ${tokens.color.gray600};
        background: ${tokens.color.gray100};
      }

      .drag-handle:active {
        cursor: grabbing;
      }

      /* Resize indicators */
      :host([resizable]) .resize-handle {
        display: block;
      }

      .resize-handle {
        display: none;
        position: absolute;
        bottom: 0;
        right: 0;
        width: 16px;
        height: 16px;
        cursor: nwse-resize;
        background: linear-gradient(
          135deg,
          transparent 50%,
          ${tokens.color.gray300} 50%
        );
        border-bottom-right-radius: ${tokens.radius.lg};
      }

      /* Widget sections */
      .widget-header {
        flex-shrink: 0;
      }

      .widget-body {
        flex: 1;
        min-height: 0;
      }

      .widget-footer {
        flex-shrink: 0;
      }

      /* Loading overlay */
      .loading-overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(255, 255, 255, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10;
      }

      .spinner {
        width: 40px;
        height: 40px;
        border: 3px solid ${tokens.color.gray200};
        border-top-color: ${tokens.color.primary};
        border-radius: 50%;
        animation: spin 1s linear infinite;
      }

      @keyframes spin {
        to { transform: rotate(360deg); }
      }

      /* Error state */
      .error-message {
        padding: ${tokens.spacing.md};
        background: ${tokens.color.errorLight};
        color: ${tokens.color.error};
        border-radius: ${tokens.radius.md};
        margin: ${tokens.spacing.md};
        font-size: ${tokens.font.size.sm};
        display: flex;
        align-items: center;
        gap: ${tokens.spacing.sm};
      }

      /* Expanded backdrop */
      .backdrop {
        display: none;
      }

      :host([expanded]) .backdrop {
        display: block;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        z-index: 999;
      }

      /* Empty state */
      .empty-content {
        padding: ${tokens.spacing.xl};
        text-align: center;
        color: ${tokens.color.gray400};
        font-size: ${tokens.font.size.sm};
      }
    `
  ];

  @property({ type: Boolean, reflect: true })
  collapsed = false;

  @property({ type: Boolean, reflect: true })
  expanded = false;

  @property({ type: Boolean, reflect: true })
  loading = false;

  @property({ type: Boolean, reflect: true })
  error = false;

  @property({ type: String })
  errorMessage = '';

  @property({ type: Boolean, reflect: true })
  draggable = false;

  @property({ type: Boolean, reflect: true })
  resizable = false;

  @state()
  private _hasHeader = false;

  @state()
  private _hasBody = false;

  @state()
  private _hasFooter = false;

  private _handleSlotChange(slotName: string) {
    return (e: Event) => {
      const slot = e.target as HTMLSlotElement;
      const hasContent = slot.assignedNodes({ flatten: true }).some(
        node => node.nodeType === Node.ELEMENT_NODE
      );

      switch(slotName) {
        case 'header':
          this._hasHeader = hasContent;
          break;
        case 'body':
          this._hasBody = hasContent;
          break;
        case 'footer':
          this._hasFooter = hasContent;
          break;
      }
      this.requestUpdate();
    };
  }

  private _handleBackdropClick() {
    if (this.expanded) {
      this.expanded = false;
      this.dispatchEvent(new CustomEvent('widget-collapse', {
        bubbles: true,
        composed: true
      }));
    }
  }

  override render() {
    return html`
      ${this.expanded ? html`
        <div class="backdrop" @click=${this._handleBackdropClick}></div>
      ` : ''}

      ${this.draggable ? html`
        <div class="drag-handle" title="Drag to reorder">⋮⋮</div>
      ` : ''}

      <div class="widget-header">
        <slot
          name="header"
          @slotchange=${this._handleSlotChange('header')}
        ></slot>
      </div>

      <div class="widget-body">
        <slot
          name="body"
          @slotchange=${this._handleSlotChange('body')}
        >
          ${!this._hasBody ? html`
            <div class="empty-content">No content</div>
          ` : ''}
        </slot>
      </div>

      ${this._hasFooter ? html`
        <div class="widget-footer">
          <slot
            name="footer"
            @slotchange=${this._handleSlotChange('footer')}
          ></slot>
        </div>
      ` : ''}

      ${this.loading ? html`
        <div class="loading-overlay">
          <div class="spinner"></div>
        </div>
      ` : ''}

      ${this.error && this.errorMessage ? html`
        <div class="error-message">
          <span>⚠️</span>
          <span>${this.errorMessage}</span>
        </div>
      ` : ''}

      ${this.resizable ? html`
        <div class="resize-handle"></div>
      ` : ''}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dashboard-widget': DashboardWidget;
  }
}
