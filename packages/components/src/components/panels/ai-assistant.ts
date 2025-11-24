import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

export interface AiAssistantConfig {
  side?: 'left' | 'right';
  width?: string;
  closeOnBackdrop?: boolean;
  closeOnEsc?: boolean;
  showBackdrop?: boolean;
}

@customElement('ai-assistant')
export class AiAssistant extends LitElement {
  static override styles = [
    baseStyles,
    css`
      :host {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 1000;
        pointer-events: none;
      }

      :host([open]) {
        display: block;
        pointer-events: auto;
      }

      .backdrop {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        opacity: 0;
        transition: opacity ${tokens.transition.default} ease-in-out;
      }

      :host([open]) .backdrop {
        opacity: 1;
      }

      :host([hide-backdrop]) .backdrop {
        display: none;
      }

      .panel {
        position: absolute;
        top: 0;
        bottom: 0;
        background: linear-gradient(to bottom, ${tokens.color.grayWhite} 0%, ${tokens.color.gray50} 100%);
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
        display: flex;
        flex-direction: column;
        overflow: hidden;
        transition: transform ${tokens.transition.default} ease-in-out;
        width: var(--panel-width, 380px);
      }

      /* Side: Right (default for AI assistant) */
      :host([side="right"]) .panel,
      :host(:not([side])) .panel {
        right: 0;
        transform: translateX(100%);
      }

      :host([side="right"][open]) .panel,
      :host(:not([side])[open]) .panel {
        transform: translateX(0);
      }

      /* Side: Left */
      :host([side="left"]) .panel {
        left: 0;
        transform: translateX(-100%);
      }

      :host([side="left"][open]) .panel {
        transform: translateX(0);
      }

      .panel-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: ${tokens.spacing.lg};
        background: linear-gradient(135deg, ${tokens.color.primaryMain} 0%, ${tokens.color.primaryDark} 100%);
        color: white;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }

      .header-content {
        display: flex;
        align-items: center;
        gap: ${tokens.spacing.sm};
      }

      .ai-icon {
        font-size: ${tokens.fontSize['2xl']};
      }

      .panel-title {
        font-size: ${tokens.fontSize.xl};
        font-weight: ${tokens.fontWeight.semibold};
      }

      .ai-badge {
        display: inline-flex;
        align-items: center;
        gap: ${tokens.spacing.xs};
        padding: 2px ${tokens.spacing.xs};
        background: rgba(255, 255, 255, 0.2);
        border-radius: ${tokens.radius.full};
        font-size: ${tokens.fontSize.xs};
        font-weight: ${tokens.fontWeight.medium};
      }

      .close-button {
        background: rgba(255, 255, 255, 0.2);
        border: none;
        cursor: pointer;
        padding: ${tokens.spacing.xs};
        color: white;
        font-size: ${tokens.fontSize['2xl']};
        line-height: 1;
        transition: all ${tokens.transition.fast};
        border-radius: ${tokens.radius.sm};
      }

      .close-button:hover {
        background: rgba(255, 255, 255, 0.3);
      }

      .panel-content {
        flex: 1;
        overflow-y: auto;
        padding: ${tokens.spacing.lg};
        background: ${tokens.color.grayWhite};
      }

      .panel-footer {
        padding: ${tokens.spacing.lg};
        border-top: 1px solid ${tokens.color.gray100};
        background: ${tokens.color.gray50};
        box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.05);
      }

      .ai-status {
        display: flex;
        align-items: center;
        gap: ${tokens.spacing.xs};
        padding: ${tokens.spacing.sm};
        background: ${tokens.color.aiBackground};
        border-radius: ${tokens.radius.sm};
        font-size: ${tokens.fontSize.sm};
        color: ${tokens.color.primaryDark};
        margin-bottom: ${tokens.spacing.md};
      }

      .status-dot {
        width: 8px;
        height: 8px;
        background: ${tokens.color.primaryMain};
        border-radius: 50%;
        animation: pulse 2s ease-in-out infinite;
      }

      @keyframes pulse {
        0%, 100% {
          opacity: 1;
        }
        50% {
          opacity: 0.5;
        }
      }

      /* Responsive width */
      @media (max-width: 640px) {
        .panel {
          width: 100% !important;
          max-width: 100%;
        }
      }
    `
  ];

  @property({ type: Boolean, reflect: true }) open = false;
  @property({ type: String, reflect: true }) side: 'left' | 'right' = 'right';
  @property({ type: String }) width = '380px';
  @property({ type: String }) title = 'AI Assistant';
  @property({ type: Boolean, attribute: 'close-on-backdrop' }) closeOnBackdrop = true;
  @property({ type: Boolean, attribute: 'close-on-esc' }) closeOnEsc = true;
  @property({ type: Boolean, attribute: 'hide-backdrop', reflect: true }) hideBackdrop = false;
  @property({ type: String }) status = 'Ready to help';
  @state() private _focusableElements: HTMLElement[] = [];
  @state() private _previousActiveElement: HTMLElement | null = null;

  override connectedCallback() {
    super.connectedCallback();
    document.addEventListener('keydown', this._handleKeyDown);
    this.style.setProperty('--panel-width', this.width);
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('keydown', this._handleKeyDown);
    this._restoreFocus();
    this._enableBodyScroll();
  }

  override updated(changedProperties: Map<string, any>) {
    if (changedProperties.has('width')) {
      this.style.setProperty('--panel-width', this.width);
    }

    if (changedProperties.has('open')) {
      if (this.open) {
        this._previousActiveElement = document.activeElement as HTMLElement;
        this._disableBodyScroll();
        this._setupFocusTrap();
        this._focusFirstElement();
      } else {
        this._restoreFocus();
        this._enableBodyScroll();
      }
    }
  }

  private _handleKeyDown = (e: KeyboardEvent) => {
    if (!this.open) return;

    if (e.key === 'Escape' && this.closeOnEsc) {
      e.preventDefault();
      this.close();
    }

    if (e.key === 'Tab') {
      this._handleTabKey(e);
    }
  };

  private _handleTabKey(e: KeyboardEvent) {
    if (this._focusableElements.length === 0) return;

    const firstElement = this._focusableElements[0];
    const lastElement = this._focusableElements[this._focusableElements.length - 1];

    if (e.shiftKey) {
      if (document.activeElement === firstElement) {
        e.preventDefault();
        lastElement?.focus();
      }
    } else {
      if (document.activeElement === lastElement) {
        e.preventDefault();
        firstElement?.focus();
      }
    }
  }

  private _setupFocusTrap() {
    const focusableSelectors = [
      'button:not([disabled])',
      'a[href]',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      '[tabindex]:not([tabindex="-1"])'
    ];

    const elements = this.shadowRoot?.querySelectorAll(focusableSelectors.join(','));
    this._focusableElements = Array.from(elements || []) as HTMLElement[];
  }

  private _focusFirstElement() {
    setTimeout(() => {
      if (this._focusableElements.length > 0) {
        this._focusableElements[0]?.focus();
      }
    }, 100);
  }

  private _restoreFocus() {
    this._previousActiveElement?.focus();
    this._previousActiveElement = null;
  }

  private _disableBodyScroll() {
    document.body.style.overflow = 'hidden';
  }

  private _enableBodyScroll() {
    document.body.style.overflow = '';
  }

  private _handleBackdropClick = (e: MouseEvent) => {
    if (this.closeOnBackdrop && e.target === e.currentTarget) {
      this.close();
    }
  };

  public close() {
    this.open = false;
    this.dispatchEvent(new CustomEvent('close', { bubbles: true, composed: true }));
  }

  public show() {
    this.open = true;
    this.dispatchEvent(new CustomEvent('open', { bubbles: true, composed: true }));
  }

  override render() {
    return html`
      <div class="backdrop" @click=${this._handleBackdropClick}></div>
      <div class="panel">
        <div class="panel-header">
          <div class="header-content">
            <div class="ai-icon">🤖</div>
            <div>
              <div class="panel-title">${this.title}</div>
              <div class="ai-badge">
                <span>✨</span>
                <span>AI Powered</span>
              </div>
            </div>
          </div>
          <button class="close-button" @click=${this.close} aria-label="Close">
            ×
          </button>
        </div>
        <div class="panel-content">
          ${this.status ? html`
            <div class="ai-status">
              <span class="status-dot"></span>
              <span>${this.status}</span>
            </div>
          ` : ''}
          <slot></slot>
        </div>
        <div class="panel-footer">
          <slot name="footer"></slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ai-assistant': AiAssistant;
  }
}
