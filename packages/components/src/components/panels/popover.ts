import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

export interface PopoverConfig {
  placement?: 'top' | 'right' | 'bottom' | 'left';
  showArrow?: boolean;
  closeOnBackdrop?: boolean;
  closeOnEsc?: boolean;
  offset?: number;
}

@customElement('popover')
export class Popover extends LitElement {
  static override styles = [
    baseStyles,
    css`
      :host {
        display: none;
        position: fixed;
        z-index: 1000;
      }

      :host([open]) {
        display: block;
      }

      .backdrop {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
      }

      .popover {
        position: relative;
        background: ${tokens.color.grayWhite};
        border-radius: ${tokens.radius.md};
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
        padding: ${tokens.spacing.md};
        max-width: 320px;
        opacity: 0;
        transform: scale(0.95);
        transition: opacity ${tokens.transition.fast} ease-out, transform ${tokens.transition.fast} ease-out;
      }

      :host([open]) .popover {
        opacity: 1;
        transform: scale(1);
      }

      .arrow {
        position: absolute;
        width: 12px;
        height: 12px;
        background: ${tokens.color.grayWhite};
        transform: rotate(45deg);
        box-shadow: -2px -2px 4px rgba(0, 0, 0, 0.05);
      }

      /* Placement: Top */
      :host([placement="top"]) .arrow {
        bottom: -6px;
        left: 50%;
        margin-left: -6px;
        box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.05);
      }

      /* Placement: Right */
      :host([placement="right"]) .arrow {
        left: -6px;
        top: 50%;
        margin-top: -6px;
        box-shadow: -2px 2px 4px rgba(0, 0, 0, 0.05);
      }

      /* Placement: Bottom (default) */
      :host([placement="bottom"]) .arrow,
      :host(:not([placement])) .arrow {
        top: -6px;
        left: 50%;
        margin-left: -6px;
      }

      /* Placement: Left */
      :host([placement="left"]) .arrow {
        right: -6px;
        top: 50%;
        margin-top: -6px;
        box-shadow: 2px -2px 4px rgba(0, 0, 0, 0.05);
      }

      :host([hide-arrow]) .arrow {
        display: none;
      }

      .popover-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: ${tokens.spacing.sm};
        padding-bottom: ${tokens.spacing.sm};
        border-bottom: 1px solid ${tokens.color.gray100};
      }

      .popover-title {
        font-size: ${tokens.fontSize.md};
        font-weight: ${tokens.fontWeight.semibold};
        color: ${tokens.color.gray900};
      }

      .close-button {
        background: none;
        border: none;
        cursor: pointer;
        padding: ${tokens.spacing.xs};
        color: ${tokens.color.gray500};
        font-size: ${tokens.fontSize.lg};
        line-height: 1;
        transition: color ${tokens.transition.fast};
      }

      .close-button:hover {
        color: ${tokens.color.gray900};
      }

      .popover-content {
        color: ${tokens.color.gray900};
        font-size: ${tokens.fontSize.sm};
        line-height: ${tokens.lineHeight.relaxed};
      }

      .popover-footer {
        margin-top: ${tokens.spacing.sm};
        padding-top: ${tokens.spacing.sm};
        border-top: 1px solid ${tokens.color.gray100};
      }
    `
  ];

  @property({ type: Boolean, reflect: true }) open = false;
  @property({ type: String, reflect: true }) placement: 'top' | 'right' | 'bottom' | 'left' = 'bottom';
  @property({ type: String }) title = '';
  @property({ type: Number }) offset = 8;
  @property({ type: Boolean, attribute: 'close-on-backdrop' }) closeOnBackdrop = true;
  @property({ type: Boolean, attribute: 'close-on-esc' }) closeOnEsc = true;
  @property({ type: Boolean, attribute: 'hide-arrow', reflect: true }) hideArrow = false;
  @property({ type: String }) anchorId = '';
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
  }

  override updated(changedProperties: Map<string, any>) {
    if (changedProperties.has('open')) {
      if (this.open) {
        this._previousActiveElement = document.activeElement as HTMLElement;
        this._setupFocusTrap();
        this._focusFirstElement();
        this._positionPopover();
      } else {
        this._restoreFocus();
      }
    }
  }

  private _positionPopover() {
    if (!this.anchorId) return;

    const anchor = document.getElementById(this.anchorId);
    if (!anchor) return;

    const anchorRect = anchor.getBoundingClientRect();
    const popoverRect = this.shadowRoot?.querySelector('.popover')?.getBoundingClientRect();
    if (!popoverRect) return;

    let top = 0;
    let left = 0;

    switch (this.placement) {
      case 'top':
        top = anchorRect.top - popoverRect.height - this.offset;
        left = anchorRect.left + (anchorRect.width - popoverRect.width) / 2;
        break;
      case 'right':
        top = anchorRect.top + (anchorRect.height - popoverRect.height) / 2;
        left = anchorRect.right + this.offset;
        break;
      case 'bottom':
        top = anchorRect.bottom + this.offset;
        left = anchorRect.left + (anchorRect.width - popoverRect.width) / 2;
        break;
      case 'left':
        top = anchorRect.top + (anchorRect.height - popoverRect.height) / 2;
        left = anchorRect.left - popoverRect.width - this.offset;
        break;
    }

    this.style.top = `${top}px`;
    this.style.left = `${left}px`;
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

  private _handleBackdropClick = () => {
    if (this.closeOnBackdrop) {
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
      <div class="popover">
        ${!this.hideArrow ? html`<div class="arrow"></div>` : ''}
        ${this.title ? html`
          <div class="popover-header">
            <div class="popover-title">${this.title}</div>
            <button class="close-button" @click=${this.close} aria-label="Close">
              ×
            </button>
          </div>
        ` : ''}
        <div class="popover-content">
          <slot></slot>
        </div>
        <div class="popover-footer">
          <slot name="footer"></slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'popover': Popover;
  }
}
