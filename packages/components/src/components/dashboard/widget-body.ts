import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

/**
 * Widget Body - Widget body container with scrolling support
 *
 * Features:
 * - Automatic scrolling for overflow content
 * - Padding control
 * - Max height control
 * - Loading state
 * - Empty state
 */
@customElement('widget-body')
export class WidgetBody extends LitElement {
  static override styles = [
    baseStyles,
    css`
      :host {
        display: block;
        padding: var(--widget-body-padding, ${tokens.spacing.lg});
        background: ${tokens.color.grayWhite};
        overflow-y: auto;
        overflow-x: hidden;
        position: relative;
        min-height: 100px;
      }

      :host([scrollable]) {
        max-height: var(--widget-body-max-height, 400px);
      }

      :host([no-padding]) {
        padding: 0;
      }

      /* Custom scrollbar */
      :host::-webkit-scrollbar {
        width: 8px;
      }

      :host::-webkit-scrollbar-track {
        background: ${tokens.color.gray100};
        border-radius: ${tokens.radius.sm};
      }

      :host::-webkit-scrollbar-thumb {
        background: ${tokens.color.gray500};
        border-radius: ${tokens.radius.sm};
      }

      :host::-webkit-scrollbar-thumb:hover {
        background: ${tokens.color.gray500};
      }

      /* Loading state */
      :host([loading]) {
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 200px;
      }

      .loading-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: ${tokens.spacing.md};
        color: ${tokens.color.gray500};
      }

      .spinner {
        width: 40px;
        height: 40px;
        border: 3px solid ${tokens.color.gray100};
        border-top-color: ${tokens.color.primaryMain};
        border-radius: 50%;
        animation: spin 1s linear infinite;
      }

      @keyframes spin {
        to { transform: rotate(360deg); }
      }

      /* Empty state */
      .empty-state {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: ${tokens.spacing.xxl};
        color: ${tokens.color.gray500};
        text-align: center;
        min-height: 200px;
      }

      .empty-icon {
        font-size: 3rem;
        margin-bottom: ${tokens.spacing.md};
        opacity: 0.5;
      }

      .empty-text {
        font-size: ${tokens.fontSize.md};
        margin-bottom: ${tokens.spacing.xs};
      }

      .empty-hint {
        font-size: ${tokens.fontSize.sm};
        color: ${tokens.color.gray500};
      }

      /* Fade in/out for content transitions */
      .content {
        animation: fadeIn 0.3s ease-in;
      }

      @keyframes fadeIn {
        from {
          opacity: 0;
          transform: translateY(10px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
    `
  ];

  @property({ type: Boolean, reflect: true })
  scrollable = false;

  @property({ type: Boolean, reflect: true })
  loading = false;

  @property({ type: Boolean, reflect: true, attribute: 'no-padding' })
  noPadding = false;

  @property({ type: String })
  maxHeight = '';

  @property({ type: String })
  padding = '';

  @property({ type: String })
  emptyText = 'No data available';

  @property({ type: String })
  emptyHint = '';

  @property({ type: String })
  loadingText = 'Loading...';

  @state()
  private _hasContent = false;

  override connectedCallback() {
    super.connectedCallback();
    if (this.maxHeight) {
      this.style.setProperty('--widget-body-max-height', this.maxHeight);
    }
    if (this.padding) {
      this.style.setProperty('--widget-body-padding', this.padding);
    }
  }

  override firstUpdated() {
    this._checkContent();
  }

  private _checkContent() {
    const slot = this.shadowRoot?.querySelector('slot');
    const hasNodes = slot?.assignedNodes({ flatten: true }).some(
      node => node.nodeType === Node.ELEMENT_NODE ||
      (node.nodeType === Node.TEXT_NODE && node.textContent?.trim())
    );
    this._hasContent = hasNodes || false;
  }

  private _handleSlotChange() {
    this._checkContent();
  }

  override render() {
    if (this.loading) {
      return html`
        <div class="loading-content">
          <div class="spinner"></div>
          ${this.loadingText ? html`
            <div>${this.loadingText}</div>
          ` : ''}
        </div>
      `;
    }

    return html`
      <div class="content">
        <slot @slotchange=${this._handleSlotChange}></slot>
        ${!this._hasContent ? html`
          <div class="empty-state">
            <div class="empty-icon">📭</div>
            <div class="empty-text">${this.emptyText}</div>
            ${this.emptyHint ? html`
              <div class="empty-hint">${this.emptyHint}</div>
            ` : ''}
          </div>
        ` : ''}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'widget-body': WidgetBody;
  }
}
