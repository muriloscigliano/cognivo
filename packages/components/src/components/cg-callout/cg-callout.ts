import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

/**
 * <cg-callout> — Alert/notice with semantic variants.
 *
 * Better than OpenUI's Callout:
 * - Dismissible
 * - Icon auto-selected by variant (or custom via slot)
 * - Action slot (button)
 * - 5 semantic variants
 */
@customElement('cg-callout')
export class CgCallout extends LitElement {
  static override styles = css`
    :host {
      transition: color 100ms cubic-bezier(0, 0, 0.58, 1);
      animation: fadeSlideIn 200ms cubic-bezier(0, 0, 0.58, 1);
      display: block;
      font-family: var(--cg-font-family-primary, 'Inter Variable', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif);
    }

    :host([hidden]) { display: none; }

    .callout {
      transition: border-color 200ms cubic-bezier(0, 0, 0.58, 1),
                  box-shadow 200ms cubic-bezier(0, 0, 0.58, 1);
      display: flex;
      gap: var(--cg-spacing-12, 12px);
      padding: var(--cg-spacing-12, 12px) var(--cg-spacing-16, 16px);
      border-radius: var(--cg-border-radius-150, 12px);
      border: 1px solid;
      line-height: 1.5;
    }

    /* Variants */
    :host([variant="info"]) .callout {
      background: var(--cg-color-message-background-info, rgba(59, 130, 246, 0.12));
      border-color: var(--cg-color-message-border-info, rgba(59, 130, 246, 0.25));
      color: var(--cg-color-message-text-info, #60a5fa);
    }
    :host([variant="success"]) .callout {
      background: var(--cg-color-message-background-success, rgba(34, 197, 94, 0.12));
      border-color: var(--cg-color-message-border-success, rgba(34, 197, 94, 0.25));
      color: var(--cg-color-message-text-success, #4ade80);
    }
    :host([variant="warning"]) .callout {
      background: var(--cg-color-message-background-warning, rgba(245, 158, 11, 0.12));
      border-color: var(--cg-color-message-border-warning, rgba(245, 158, 11, 0.25));
      color: var(--cg-color-message-text-warning, #fbbf24);
    }
    :host([variant="danger"]) .callout {
      background: var(--cg-color-message-background-error, rgba(239, 68, 68, 0.12));
      border-color: var(--cg-color-message-border-error, rgba(239, 68, 68, 0.25));
      color: var(--cg-color-message-text-error, #f87171);
    }
    :host([variant="neutral"]) .callout {
      background: var(--cg-color-surface-container-background, #18181b);
      border-color: var(--cg-color-surface-base-border, #27272a);
      color: var(--cg-color-surface-base-text, #fafafa);
    }

    .icon {
      flex-shrink: 0;
      width: 20px;
      height: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 1px;
    }
    .icon svg {
      width: 18px;
      height: 18px;
    }

    .content { flex: 1; min-width: 0; }

    .title {
      font-weight: var(--cg-font-weight-semibold, 600);
      font-size: var(--cg-font-size-sm, 14px);
      margin-bottom: 2px;
    }

    .description {
      font-size: var(--cg-font-size-sm, 14px);
      opacity: 0.9;
    }

    .actions {
      margin-top: var(--cg-spacing-8, 8px);
    }

    .dismiss {
      flex-shrink: 0;
      background: none;
      border: none;
      color: currentColor;
      opacity: 0.5;
      cursor: pointer;
      padding: 2px;
      border-radius: 4px;
      display: flex;
      transition: opacity var(--cg-transition-duration-fast, 100ms);
    }
    .dismiss:hover { opacity: 0.8; }
    .dismiss:focus-visible { outline: 2px solid currentColor; outline-offset: 1px; }
    .dismiss svg { width: 16px; height: 16px; }
  

    @media (prefers-reduced-motion: reduce) {
      * { transition: none !important; animation: none !important; }
    }
  
    @keyframes fadeSlideIn {
      from { opacity: 0; transform: translateY(4px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `;

  @property({ reflect: true }) variant: 'info' | 'success' | 'warning' | 'danger' | 'neutral' = 'info';
  @property() title = '';
  @property() description = '';
  @property({ type: Boolean }) dismissible = false;

  @state() private _dismissed = false;

  private _iconPaths: Record<string, string> = {
    info: 'M12 2a10 10 0 100 20 10 10 0 000-20zm0 5a1 1 0 011 1v4a1 1 0 01-2 0V8a1 1 0 011-1zm0 8a1 1 0 110 2 1 1 0 010-2z',
    success: 'M12 2a10 10 0 100 20 10 10 0 000-20zm-2 10l2 2 4-4',
    warning: 'M12 2L2 22h20L12 2zm0 7v4m0 4h.01',
    danger: 'M12 2a10 10 0 100 20 10 10 0 000-20zm-1 5h2v6h-2zm0 8h2v2h-2z',
    neutral: 'M12 2a10 10 0 100 20 10 10 0 000-20zm0 5a1 1 0 011 1v4a1 1 0 01-2 0V8a1 1 0 011-1zm0 8a1 1 0 110 2 1 1 0 010-2z',
  };

  private _dismiss() {
    this._dismissed = true;
    this.setAttribute('hidden', '');
    this.dispatchEvent(new CustomEvent('cg-callout-dismiss', { bubbles: true, composed: true }));
  }

  override render() {
    if (this._dismissed) return nothing;

    const iconPath = this._iconPaths[this.variant] ?? this._iconPaths.info;

    return html`
      <div class="callout" role="alert">
        <div class="icon">
          <slot name="icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="${iconPath}"></path>
            </svg>
          </slot>
        </div>
        <div class="content">
          ${this.title ? html`<div class="title">${this.title}</div>` : nothing}
          ${this.description ? html`<div class="description">${this.description}</div>` : nothing}
          <slot></slot>
          <div class="actions"><slot name="action"></slot></div>
        </div>
        ${this.dismissible ? html`
          <button class="dismiss" @click=${this._dismiss} aria-label="Dismiss">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
              <path d="M18 6L6 18M6 6l12 12"></path>
            </svg>
          </button>
        ` : nothing}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cg-callout': CgCallout;
  }
}
