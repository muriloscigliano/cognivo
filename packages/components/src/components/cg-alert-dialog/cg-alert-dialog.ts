import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { hostBlock, reducedMotion } from '../../styles/index.js';
import { FocusTrap } from '../../utils/focus-trap.js';

/**
 * @element cg-alert-dialog
 * Destructive confirmation dialog with alertdialog ARIA role. Uses danger styling
 * for destructive actions and focuses cancel button by default for safety.
 *
 * @example
 * ```html
 * <cg-alert-dialog
 *   open
 *   title="Delete project?"
 *   description="This action cannot be undone."
 *   destructive
 *   confirm-label="Delete"
 * ></cg-alert-dialog>
 * ```
 *
 * @slot - Optional body content (overrides description)
 * @slot icon - Optional icon
 * @slot actions - Override default action buttons
 *
 * @fires {CustomEvent} cg-alert-confirm
 * @fires {CustomEvent} cg-alert-cancel
 * @fires {CustomEvent} cg-alert-open
 * @fires {CustomEvent} cg-alert-close
 */
@customElement('cg-alert-dialog')
export class CgAlertDialog extends LitElement {
  static override styles = [hostBlock, reducedMotion, css`
    :host {
      display: contents;
    }

    .backdrop {
      position: fixed;
      inset: 0;
      z-index: var(--cg-z-index-500);
      background: var(--cg-color-modal-overlay-background);
      backdrop-filter: blur(var(--cg-blur-backdrop, 4px));
      opacity: 0;
      pointer-events: none;
      transition: opacity var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
    }
    :host([open]) .backdrop {
      opacity: 1;
      pointer-events: auto;
    }

    .dialog {
      position: fixed;
      top: 50%;
      left: 50%;
      z-index: var(--cg-z-index-top);
      width: calc(100% - var(--cg-spacing-32));
      max-width: var(--cg-component-alert-dialog-width);
      padding: var(--cg-spacing-24);
      background: var(--cg-color-modal-container-background);
      border: var(--cg-border-width-50) solid var(--cg-color-modal-container-border);
      border-radius: var(--cg-component-alert-dialog-radius);
      box-shadow: var(--cg-shadow-elevation-xl);
      opacity: 0;
      transform: translate(-50%, -48%) scale(0.96);
      pointer-events: none;
      transition:
        opacity var(--cg-transition-duration-fast) var(--cg-transition-easing-default),
        transform var(--cg-transition-duration-default) var(--cg-transition-easing-ease-out);
    }
    :host([open]) .dialog {
      opacity: 1;
      transform: translate(-50%, -50%) scale(1);
      pointer-events: auto;
    }

    .header {
      display: flex;
      align-items: flex-start;
      gap: var(--cg-spacing-16);
      margin-bottom: var(--cg-spacing-16);
    }
    .icon-wrap {
      flex-shrink: 0;
      width: var(--cg-spacing-40);
      height: var(--cg-spacing-40);
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: var(--cg-border-radius-full);
      background: var(--cg-color-surface-container-background);
      color: var(--cg-color-surface-base-text);
    }
    :host([destructive]) .icon-wrap {
      background: var(--cg-color-status-error-background-default);
      color: var(--cg-color-status-error-text-default);
    }

    .title {
      font-size: var(--cg-font-size-base);
      font-weight: var(--cg-font-weight-semibold);
      color: var(--cg-color-surface-base-text);
      margin: 0 0 var(--cg-spacing-4);
      line-height: var(--cg-line-height-snug);
    }
    .description {
      font-size: var(--cg-font-size-sm);
      color: var(--cg-color-surface-container-outlined);
      margin: 0;
      line-height: var(--cg-line-height-relaxed);
    }

    .body {
      margin: var(--cg-spacing-16) 0;
      font-size: var(--cg-font-size-sm);
      color: var(--cg-color-surface-base-text);
    }

    .actions {
      display: flex;
      justify-content: flex-end;
      gap: var(--cg-spacing-8);
      margin-top: var(--cg-spacing-24);
    }
  `];

  @property({ type: Boolean, reflect: true }) open = false;
  @property() override title = '';
  @property() description = '';
  @property({ attribute: 'confirm-label' }) confirmLabel = 'Confirm';
  @property({ attribute: 'cancel-label' }) cancelLabel = 'Cancel';
  @property({ type: Boolean, reflect: true }) destructive = false;
  @property({ type: Boolean, reflect: true }) loading = false;
  @property({ type: Boolean }) closable = false;

  @query('.dialog') private _dialogEl!: HTMLElement;

  private _focusTrap = new FocusTrap();
  private _previousOverflow = '';

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this._focusTrap.deactivate();
    document.body.style.overflow = this._previousOverflow;
  }

  override updated(changed: Map<string, unknown>): void {
    if (changed.has('open')) {
      if (this.open) this._onOpen();
      else this._onClose();
    }
  }

  private _onOpen(): void {
    this._previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    this.dispatchEvent(new CustomEvent('cg-alert-open', { bubbles: true, composed: true }));

    requestAnimationFrame(() => {
      if (this._dialogEl) {
        // Focus cancel button by default for safety
        const cancelBtn = this._dialogEl.querySelector<HTMLButtonElement>('[data-cancel]');
        this._focusTrap.activate(this._dialogEl, {
          initialFocus: cancelBtn ?? null,
          handleEscape: this.closable,
          onEscape: this.closable ? () => this._cancel() : undefined,
        });
      }
    });
  }

  private _onClose(): void {
    document.body.style.overflow = this._previousOverflow;
    this._focusTrap.deactivate();
    this.dispatchEvent(new CustomEvent('cg-alert-close', { bubbles: true, composed: true }));
  }

  private _confirm(): void {
    this.dispatchEvent(new CustomEvent('cg-alert-confirm', { bubbles: true, composed: true }));
    if (!this.loading) this.open = false;
  }

  private _cancel(): void {
    this.dispatchEvent(new CustomEvent('cg-alert-cancel', { bubbles: true, composed: true }));
    this.open = false;
  }

  override render() {
    return html`
      <div class="backdrop" @click=${() => this.closable && this._cancel()}></div>
      <div
        class="dialog"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="alert-title"
        aria-describedby="alert-description"
        ?hidden=${!this.open}
      >
        <div class="header">
          <slot name="icon">
            ${this.destructive ? html`
              <div class="icon-wrap">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M12 9v4M12 17h.01"/>
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                </svg>
              </div>
            ` : nothing}
          </slot>
          <div style="flex: 1;">
            ${this.title ? html`<h2 id="alert-title" class="title">${this.title}</h2>` : nothing}
            ${this.description ? html`<p id="alert-description" class="description">${this.description}</p>` : nothing}
          </div>
        </div>
        <div class="body"><slot></slot></div>
        <div class="actions">
          <slot name="actions">
            <cg-button
              variant="secondary"
              size="md"
              data-cancel
              @click=${this._cancel}
              ?disabled=${this.loading}
            >${this.cancelLabel}</cg-button>
            <cg-button
              variant="${this.destructive ? 'danger' : 'primary'}"
              size="md"
              data-confirm
              @click=${this._confirm}
              ?loading=${this.loading}
            >${this.confirmLabel}</cg-button>
          </slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cg-alert-dialog': CgAlertDialog;
  }
}
