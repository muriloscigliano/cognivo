import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

export interface SidePanelConfig {
  side?: 'left' | 'right';
  width?: string;
  closeOnBackdrop?: boolean;
  closeOnEsc?: boolean;
  showBackdrop?: boolean;
}

@customElement('side-panel')
export class SidePanel extends LitElement {
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
        background: ${tokens.color.grayWhite};
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
        display: flex;
        flex-direction: column;
        overflow: hidden;
        transition: transform ${tokens.transition.default} ease-in-out;
        width: var(--panel-width, 400px);
      }

      /* Side: Left (default) */
      :host([side="left"]) .panel,
      :host(:not([side])) .panel {
        left: 0;
        transform: translateX(-100%);
      }

      :host([side="left"][open]) .panel,
      :host(:not([side])[open]) .panel {
        transform: translateX(0);
      }

      /* Side: Right */
      :host([side="right"]) .panel {
        right: 0;
        transform: translateX(100%);
      }

      :host([side="right"][open]) .panel {
        transform: translateX(0);
      }

      .panel-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: ${tokens.spacing.lg};
        border-bottom: 1px solid ${tokens.color.gray100};
        background: ${tokens.color.gray50};
      }

      .panel-title {
        font-size: ${tokens.fontSize.xl};
        font-weight: ${tokens.fontWeight.semibold};
        color: ${tokens.color.gray900};
      }

      .close-button {
        background: none;
        border: none;
        cursor: pointer;
        padding: ${tokens.spacing.xs};
        color: ${tokens.color.gray500};
        font-size: ${tokens.fontSize['2xl']};
        line-height: 1;
        transition: all ${tokens.transition.fast};
        border-radius: ${tokens.radius.sm};
      }

      .close-button:hover {
        color: ${tokens.color.gray900};
        background: ${tokens.color.gray100};
      }

      .panel-content {
        flex: 1;
        overflow-y: auto;
        padding: ${tokens.spacing.lg};
      }

      .panel-footer {
        padding: ${tokens.spacing.lg};
        border-top: 1px solid ${tokens.color.gray100};
        background: ${tokens.color.gray50};
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
  @property({ type: String, reflect: true }) side: 'left' | 'right' = 'left';
  @property({ type: String }) width: string = '400px';
  @property({ type: String }) override title: string = '';
  @property({ type: Boolean, attribute: 'close-on-backdrop' }) closeOnBackdrop = true;
  @property({ type: Boolean, attribute: 'close-on-esc' }) closeOnEsc = true;
  @property({ type: Boolean, attribute: 'hide-backdrop', reflect: true }) hideBackdrop = false;
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
        ${this.title ? html`
          <div class="panel-header">
            <div class="panel-title">${this.title}</div>
            <button class="close-button" @click=${this.close} aria-label="Close">
              ×
            </button>
          </div>
        ` : ''}
        <div class="panel-content">
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
    'side-panel': SidePanel;
  }
}
