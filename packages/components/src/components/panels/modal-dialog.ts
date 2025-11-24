import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

export interface ModalDialogConfig {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  closeOnBackdrop?: boolean;
  closeOnEsc?: boolean;
  showBackdrop?: boolean;
}

@customElement('modal-dialog')
export class ModalDialog extends LitElement {
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
        display: flex;
        align-items: center;
        justify-content: center;
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

      .modal {
        position: relative;
        background: ${tokens.color.grayWhite};
        border-radius: ${tokens.radius.lg};
        box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        display: flex;
        flex-direction: column;
        max-height: 90vh;
        opacity: 0;
        transform: scale(0.95) translateY(-20px);
        transition: opacity ${tokens.transition.default} ease-out, transform ${tokens.transition.default} ease-out;
        width: 90%;
        max-width: 600px;
      }

      :host([open]) .modal {
        opacity: 1;
        transform: scale(1) translateY(0);
      }

      /* Size: Small */
      :host([size="sm"]) .modal {
        max-width: 400px;
      }

      /* Size: Medium (default) */
      :host([size="md"]) .modal,
      :host(:not([size])) .modal {
        max-width: 600px;
      }

      /* Size: Large */
      :host([size="lg"]) .modal {
        max-width: 800px;
      }

      /* Size: Extra Large */
      :host([size="xl"]) .modal {
        max-width: 1024px;
      }

      /* Size: Full */
      :host([size="full"]) .modal {
        max-width: calc(100% - 2rem);
        max-height: calc(100vh - 2rem);
      }

      .modal-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: ${tokens.spacing.lg};
        border-bottom: 1px solid ${tokens.color.gray100};
      }

      .modal-title {
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

      .modal-content {
        flex: 1;
        overflow-y: auto;
        padding: ${tokens.spacing.lg};
      }

      .modal-footer {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: ${tokens.spacing.sm};
        padding: ${tokens.spacing.lg};
        border-top: 1px solid ${tokens.color.gray100};
        background: ${tokens.color.gray50};
      }

      /* Responsive */
      @media (max-width: 640px) {
        .modal {
          width: 95%;
          max-width: 95%;
          max-height: 95vh;
        }

        :host([size="full"]) .modal {
          width: 100%;
          max-width: 100%;
          max-height: 100vh;
          border-radius: 0;
        }
      }
    `
  ];

  @property({ type: Boolean, reflect: true }) open = false;
  @property({ type: String, reflect: true }) size: 'sm' | 'md' | 'lg' | 'xl' | 'full' = 'md';
  @property({ type: String }) title = '';
  @property({ type: Boolean, attribute: 'close-on-backdrop' }) closeOnBackdrop = true;
  @property({ type: Boolean, attribute: 'close-on-esc' }) closeOnEsc = true;
  @property({ type: Boolean, attribute: 'hide-backdrop', reflect: true }) hideBackdrop = false;
  @state() private _focusableElements: HTMLElement[] = [];
  @state() private _previousActiveElement: HTMLElement | null = null;

  override connectedCallback() {
    super.connectedCallback();
    document.addEventListener('keydown', this._handleKeyDown);
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('keydown', this._handleKeyDown);
    this._restoreFocus();
    this._enableBodyScroll();
  }

  override updated(changedProperties: Map<string, any>) {
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
      <div class="modal" role="dialog" aria-modal="true">
        ${this.title ? html`
          <div class="modal-header">
            <div class="modal-title">${this.title}</div>
            <button class="close-button" @click=${this.close} aria-label="Close">
              ×
            </button>
          </div>
        ` : ''}
        <div class="modal-content">
          <slot></slot>
        </div>
        <div class="modal-footer">
          <slot name="footer"></slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'modal-dialog': ModalDialog;
  }
}
