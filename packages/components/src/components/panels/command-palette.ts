import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

export interface CommandPaletteConfig {
  placeholder?: string;
  closeOnBackdrop?: boolean;
  closeOnEsc?: boolean;
  showBackdrop?: boolean;
}

@customElement('command-palette')
export class CommandPalette extends LitElement {
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
        align-items: flex-start;
        justify-content: center;
        padding-top: 15vh;
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

      .palette {
        position: relative;
        background: ${tokens.color.grayWhite};
        border-radius: ${tokens.radius.lg};
        box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        display: flex;
        flex-direction: column;
        width: 90%;
        max-width: 640px;
        max-height: 60vh;
        opacity: 0;
        transform: scale(0.95) translateY(-20px);
        transition: opacity ${tokens.transition.fast} ease-out, transform ${tokens.transition.fast} ease-out;
      }

      :host([open]) .palette {
        opacity: 1;
        transform: scale(1) translateY(0);
      }

      .search-container {
        display: flex;
        align-items: center;
        gap: ${tokens.spacing.sm};
        padding: ${tokens.spacing.md} ${tokens.spacing.lg};
        border-bottom: 1px solid ${tokens.color.gray100};
      }

      .search-icon {
        color: ${tokens.color.gray500};
        font-size: ${tokens.fontSize.lg};
      }

      .search-input {
        flex: 1;
        border: none;
        outline: none;
        font-size: ${tokens.fontSize.md};
        color: ${tokens.color.gray900};
        background: transparent;
        font-family: ${tokens.fontFamily.primary};
      }

      .search-input::placeholder {
        color: ${tokens.color.gray500};
      }

      .keyboard-hint {
        display: flex;
        align-items: center;
        gap: ${tokens.spacing.xs};
        font-size: ${tokens.fontSize.xs};
        color: ${tokens.color.gray500};
      }

      .kbd {
        padding: 2px ${tokens.spacing.xs};
        background: ${tokens.color.gray100};
        border: 1px solid ${tokens.color.gray200};
        border-radius: ${tokens.radius.sm};
        font-size: ${tokens.fontSize.xs};
        font-family: ${tokens.fontFamily.mono};
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
      }

      .palette-content {
        flex: 1;
        overflow-y: auto;
        padding: ${tokens.spacing.sm};
      }

      .palette-footer {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: ${tokens.spacing.sm} ${tokens.spacing.lg};
        border-top: 1px solid ${tokens.color.gray100};
        background: ${tokens.color.gray50};
        font-size: ${tokens.fontSize.xs};
        color: ${tokens.color.gray500};
      }

      .footer-shortcuts {
        display: flex;
        gap: ${tokens.spacing.md};
      }

      .shortcut {
        display: flex;
        align-items: center;
        gap: ${tokens.spacing.xs};
      }

      .empty-state {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: ${tokens.spacing.xl};
        color: ${tokens.color.gray500};
        text-align: center;
      }

      .empty-icon {
        font-size: ${tokens.fontSize['3xl']};
        margin-bottom: ${tokens.spacing.sm};
      }

      .empty-text {
        font-size: ${tokens.fontSize.sm};
      }

      /* Custom scrollbar */
      .palette-content::-webkit-scrollbar {
        width: 8px;
      }

      .palette-content::-webkit-scrollbar-track {
        background: ${tokens.color.gray50};
      }

      .palette-content::-webkit-scrollbar-thumb {
        background: ${tokens.color.gray300};
        border-radius: ${tokens.radius.full};
      }

      .palette-content::-webkit-scrollbar-thumb:hover {
        background: ${tokens.color.gray400};
      }

      /* Responsive */
      @media (max-width: 640px) {
        :host([open]) {
          padding-top: 10vh;
        }

        .palette {
          width: 95%;
          max-height: 70vh;
        }

        .keyboard-hint {
          display: none;
        }
      }
    `
  ];

  @property({ type: Boolean, reflect: true }) open = false;
  @property({ type: String }) placeholder = 'Type a command or search...';
  @property({ type: Boolean, attribute: 'close-on-backdrop' }) closeOnBackdrop = true;
  @property({ type: Boolean, attribute: 'close-on-esc' }) closeOnEsc = true;
  @property({ type: Boolean, attribute: 'hide-backdrop', reflect: true }) hideBackdrop = false;
  @property({ type: Boolean, attribute: 'show-shortcuts' }) showShortcuts = true;
  @state() private _searchValue = '';
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
        this._focusSearchInput();
        this._searchValue = '';
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

  private _focusSearchInput() {
    setTimeout(() => {
      const input = this.shadowRoot?.querySelector('.search-input') as HTMLInputElement;
      input?.focus();
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

  private _handleSearchInput = (e: Event) => {
    const input = e.target as HTMLInputElement;
    this._searchValue = input.value;
    this.dispatchEvent(new CustomEvent('search', {
      detail: { value: this._searchValue },
      bubbles: true,
      composed: true
    }));
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
      <div class="palette" role="dialog" aria-modal="true" aria-label="Command palette">
        <div class="search-container">
          <span class="search-icon">🔍</span>
          <input
            type="text"
            class="search-input"
            placeholder=${this.placeholder}
            .value=${this._searchValue}
            @input=${this._handleSearchInput}
            aria-label="Search commands"
          />
          <div class="keyboard-hint">
            <span class="kbd">ESC</span>
            <span>to close</span>
          </div>
        </div>
        <div class="palette-content">
          <slot>
            <div class="empty-state">
              <div class="empty-icon">⌘</div>
              <div class="empty-text">Start typing to search commands...</div>
            </div>
          </slot>
        </div>
        ${this.showShortcuts ? html`
          <div class="palette-footer">
            <div class="footer-shortcuts">
              <div class="shortcut">
                <span class="kbd">↑</span>
                <span class="kbd">↓</span>
                <span>to navigate</span>
              </div>
              <div class="shortcut">
                <span class="kbd">↵</span>
                <span>to select</span>
              </div>
            </div>
          </div>
        ` : ''}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'command-palette': CommandPalette;
  }
}
