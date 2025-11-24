import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

export interface ToolbarAction {
  id: string;
  label: string;
  icon: string;
  disabled?: boolean;
}

/**
 * Canvas Toolbar Component
 *
 * Toolbar for canvas actions and tools
 *
 * @element canvas-toolbar
 *
 * @attr {Array} actions - Array of toolbar actions
 * @attr {string} position - Toolbar position: 'top', 'bottom', 'left', 'right'
 *
 * @fires action-click - Fired when an action is clicked
 *
 * @example
 * ```html
 * <canvas-toolbar
 *   .actions="${actions}"
 *   position="top"
 *   @action-click="${handleAction}"
 * ></canvas-toolbar>
 * ```
 */
@customElement('canvas-toolbar')
export class CanvasToolbar extends LitElement {
  static override styles = [
    baseStyles,
    css`
      :host {
        display: flex;
        background: ${tokens.color.grayWhite};
        border: 1px solid ${tokens.color.gray300};
        border-radius: ${tokens.radius.md};
        padding: ${tokens.spacing.xs};
        gap: ${tokens.spacing.xs};
        box-shadow: ${tokens.shadow.md};
      }

      :host([position="top"]),
      :host([position="bottom"]) {
        flex-direction: row;
      }

      :host([position="left"]),
      :host([position="right"]) {
        flex-direction: column;
      }

      .toolbar-button {
        min-width: 40px;
        height: 40px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 2px;
        padding: ${tokens.spacing.xs};
        border: none;
        background: ${tokens.color.grayWhite};
        border-radius: ${tokens.radius.sm};
        cursor: pointer;
        transition: all ${tokens.transition.default};
        font-family: ${tokens.fontFamily.primary};
      }

      .toolbar-button:hover:not(:disabled) {
        background: ${tokens.color.gray50};
      }

      .toolbar-button:active:not(:disabled) {
        transform: scale(0.95);
      }

      .toolbar-button:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }

      .button-icon {
        font-size: ${tokens.fontSize.lg};
        color: ${tokens.color.gray900};
      }

      .button-label {
        font-size: ${tokens.fontSize.xs};
        color: ${tokens.color.gray700};
        white-space: nowrap;
      }

      .divider {
        width: 1px;
        background: ${tokens.color.gray200};
        margin: 0 ${tokens.spacing.xs};
      }

      :host([position="left"]) .divider,
      :host([position="right"]) .divider {
        width: auto;
        height: 1px;
        margin: ${tokens.spacing.xs} 0;
      }
    `,
  ];

  @property({ type: Array })
  actions: ToolbarAction[] = [
    { id: 'select', label: 'Select', icon: '⌖' },
    { id: 'pan', label: 'Pan', icon: '✋' },
    { id: 'zoom', label: 'Zoom', icon: '🔍' },
    { id: 'undo', label: 'Undo', icon: '↶' },
    { id: 'redo', label: 'Redo', icon: '↷' },
  ];

  @property({ type: String, reflect: true })
  position: 'top' | 'bottom' | 'left' | 'right' = 'top';

  private handleActionClick(action: ToolbarAction) {
    if (action.disabled) return;

    this.dispatchEvent(
      new CustomEvent('action-click', {
        detail: { action },
      })
    );
  }

  override render() {
    return html`
      ${this.actions.map((action, index) => html`
        ${index > 0 && action.id === 'divider' ? html`<div class="divider"></div>` : ''}
        ${action.id !== 'divider' ? html`
          <button
            class="toolbar-button"
            ?disabled="${action.disabled}"
            @click="${() => this.handleActionClick(action)}"
            title="${action.label}"
          >
            <span class="button-icon">${action.icon}</span>
            <span class="button-label">${action.label}</span>
          </button>
        ` : ''}
      `)}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'canvas-toolbar': CanvasToolbar;
  }
}
