import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

export interface FlyoutMenuConfig {
  position?: 'top' | 'right' | 'bottom' | 'left';
  size?: 'sm' | 'md' | 'lg';
  closeOnBackdrop?: boolean;
  closeOnEsc?: boolean;
  showBackdrop?: boolean;
}

@customElement('flyout-menu')
export class FlyoutMenu extends LitElement {
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
        background: ${tokens.color.grayWhite};
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        display: flex;
        flex-direction: column;
        overflow: hidden;
        transition: transform ${tokens.transition.default} ease-in-out;
      }

      /* Position: Top */
      :host([position="top"]) .panel {
        top: 0;
        left: 0;
        right: 0;
        border-bottom-left-radius: ${tokens.radius.lg};
        border-bottom-right-radius: ${tokens.radius.lg};
        transform: translateY(-100%);
      }

      :host([position="top"][open]) .panel {
        transform: translateY(0);
      }

      /* Position: Right */
      :host([position="right"]) .panel {
        top: 0;
        right: 0;
        bottom: 0;
        border-top-left-radius: ${tokens.radius.lg};
        border-bottom-left-radius: ${tokens.radius.lg};
        transform: translateX(100%);
      }

      :host([position="right"][open]) .panel {
        transform: translateX(0);
      }

      /* Position: Bottom */
      :host([position="bottom"]) .panel,
      :host(:not([position])) .panel {
        bottom: 0;
        left: 0;
        right: 0;
        border-top-left-radius: ${tokens.radius.lg};
        border-top-right-radius: ${tokens.radius.lg};
        transform: translateY(100%);
      }

      :host([position="bottom"][open]) .panel,
      :host(:not([position])[open]) .panel {
        transform: translateY(0);
      }

      /* Position: Left */
      :host([position="left"]) .panel {
        top: 0;
        left: 0;
        bottom: 0;
        border-top-right-radius: ${tokens.radius.lg};
        border-bottom-right-radius: ${tokens.radius.lg};
        transform: translateX(-100%);
      }

      :host([position="left"][open]) .panel {
        transform: translateX(0);
      }

      /* Size: Small */
      :host([size="sm"][position="top"]) .panel,
      :host([size="sm"][position="bottom"]) .panel {
        max-height: 200px;
      }

      :host([size="sm"][position="left"]) .panel,
      :host([size="sm"][position="right"]) .panel {
        max-width: 250px;
      }

      /* Size: Medium (default) */
      :host([size="md"][position="top"]) .panel,
      :host([size="md"][position="bottom"]) .panel,
      :host(:not([size])[position="top"]) .panel,
      :host(:not([size])[position="bottom"]) .panel {
        max-height: 350px;
      }

      :host([size="md"][position="left"]) .panel,
      :host([size="md"][position="right"]) .panel,
      :host(:not([size])[position="left"]) .panel,
      :host(:not([size])[position="right"]) .panel {
        max-width: 400px;
      }

      /* Size: Large */
      :host([size="lg"][position="top"]) .panel,
      :host([size="lg"][position="bottom"]) .panel {
        max-height: 500px;
      }

      :host([size="lg"][position="left"]) .panel,
      :host([size="lg"][position="right"]) .panel {
        max-width: 600px;
      }

      .panel-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: ${tokens.spacing.md};
        border-bottom: 1px solid ${tokens.color.gray100};
      }

      .panel-title {
        font-size: ${tokens.fontSize.lg};
        font-weight: ${tokens.fontWeight.semibold};
        color: ${tokens.color.gray900};
      }

      .close-button {
        background: none;
        border: none;
        cursor: pointer;
        padding: ${tokens.spacing.xs};
        color: ${tokens.color.gray500};
        font-size: ${tokens.fontSize.xl};
        line-height: 1;
        transition: color ${tokens.transition.fast};
      }

      .close-button:hover {
        color: ${tokens.color.gray900};
      }

      .panel-content {
        flex: 1;
        overflow-y: auto;
        padding: ${tokens.spacing.md};
      }

      .panel-footer {
        padding: ${tokens.spacing.md};
        border-top: 1px solid ${tokens.color.gray100};
      }
    `
  ];

  @property({ type: Boolean, reflect: true }) open = false;
  @property({ type: String, reflect: true }) position: 'top' | 'right' | 'bottom' | 'left' = 'bottom';
  @property({ type: String, reflect: true }) size: 'sm' | 'md' | 'lg' = 'md';
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
    'flyout-menu': FlyoutMenu;
  }
}
