import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

export interface ModalSheetConfig {
  height?: 'sm' | 'md' | 'lg' | 'full';
  closeOnBackdrop?: boolean;
  closeOnEsc?: boolean;
  showBackdrop?: boolean;
  snapPoints?: string[];
}

@customElement('modal-sheet')
export class ModalSheet extends LitElement {
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

      .sheet {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        background: ${tokens.color.grayWhite};
        border-top-left-radius: ${tokens.radius.lg};
        border-top-right-radius: ${tokens.radius.lg};
        box-shadow: 0 -10px 15px -3px rgba(0, 0, 0, 0.1), 0 -4px 6px -2px rgba(0, 0, 0, 0.05);
        display: flex;
        flex-direction: column;
        max-height: 90vh;
        transform: translateY(100%);
        transition: transform ${tokens.transition.default} ease-in-out;
      }

      :host([open]) .sheet {
        transform: translateY(0);
      }

      /* Height variants */
      :host([height="sm"]) .sheet {
        max-height: 30vh;
      }

      :host([height="md"]) .sheet,
      :host(:not([height])) .sheet {
        max-height: 50vh;
      }

      :host([height="lg"]) .sheet {
        max-height: 75vh;
      }

      :host([height="full"]) .sheet {
        max-height: 95vh;
      }

      .sheet-handle {
        display: flex;
        justify-content: center;
        padding: ${tokens.spacing.sm} 0;
        cursor: grab;
      }

      .sheet-handle:active {
        cursor: grabbing;
      }

      .handle-bar {
        width: 40px;
        height: 4px;
        background: ${tokens.color.gray100};
        border-radius: ${tokens.radius.full};
      }

      .sheet-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: ${tokens.spacing.md} ${tokens.spacing.lg};
        border-bottom: 1px solid ${tokens.color.gray100};
      }

      .sheet-title {
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

      .sheet-content {
        flex: 1;
        overflow-y: auto;
        padding: ${tokens.spacing.lg};
      }

      .sheet-footer {
        padding: ${tokens.spacing.lg};
        border-top: 1px solid ${tokens.color.gray100};
        background: ${tokens.color.gray50};
      }

      /* Mobile optimizations */
      @media (max-width: 640px) {
        .sheet {
          border-radius: ${tokens.radius.lg} ${tokens.radius.lg} 0 0;
        }
      }

      /* Desktop: center like a modal */
      @media (min-width: 641px) {
        :host {
          display: none;
          align-items: flex-end;
          justify-content: center;
        }

        :host([open]) {
          display: flex;
        }

        .sheet {
          position: relative;
          max-width: 600px;
          width: 90%;
          margin: 2rem auto;
        }
      }
    `
  ];

  @property({ type: Boolean, reflect: true }) open = false;
  @property({ type: String, reflect: true }) height: 'sm' | 'md' | 'lg' | 'full' = 'md';
  @property({ type: String }) override title: string = '';
  @property({ type: Boolean, attribute: 'close-on-backdrop' }) closeOnBackdrop = true;
  @property({ type: Boolean, attribute: 'close-on-esc' }) closeOnEsc = true;
  @property({ type: Boolean, attribute: 'hide-backdrop', reflect: true }) hideBackdrop = false;
  @property({ type: Boolean, attribute: 'show-handle' }) showHandle = true;
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

  private _handleHandleClick = () => {
    this.close();
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
      <div class="sheet" role="dialog" aria-modal="true">
        ${this.showHandle ? html`
          <div class="sheet-handle" @click=${this._handleHandleClick}>
            <div class="handle-bar"></div>
          </div>
        ` : ''}
        ${this.title ? html`
          <div class="sheet-header">
            <div class="sheet-title">${this.title}</div>
            <button class="close-button" @click=${this.close} aria-label="Close">
              ×
            </button>
          </div>
        ` : ''}
        <div class="sheet-content">
          <slot></slot>
        </div>
        <div class="sheet-footer">
          <slot name="footer"></slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'modal-sheet': ModalSheet;
  }
}
