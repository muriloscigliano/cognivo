import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { hostBlock, reducedMotion, fadeSlideInKeyframes } from '../../styles/index.js';

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
  static override styles = [hostBlock, reducedMotion, fadeSlideInKeyframes, css`
    :host {
      animation: fadeSlideIn var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
    }

    :host([hidden]) { display: none; }

    .callout {
      transition:
        background-color var(--cg-transition-duration-default) var(--cg-transition-easing-default),
        border-color var(--cg-transition-duration-default) var(--cg-transition-easing-default),
        color var(--cg-transition-duration-default) var(--cg-transition-easing-default),
        opacity var(--cg-transition-duration-default) var(--cg-transition-easing-default),
        transform var(--cg-transition-duration-default) var(--cg-transition-easing-default);
      display: flex;
      align-items: flex-start;
      gap: var(--cg-spacing-12);
      padding: var(--cg-spacing-12) var(--cg-spacing-16);
      border-radius: var(--cg-border-radius-100);
      background: var(--cg-color-surface-cards-background);
      border: var(--cg-border-width-50) solid var(--cg-color-surface-container-border);
      line-height: var(--cg-line-height-normal);
    }

    /* Variants — tinted surface + colored border for at-a-glance distinction,
       icon + title at full accent strength (no opacity dampening). */
    :host([variant="info"]) .callout { background: var(--cg-color-message-background-info); border-color: var(--cg-color-message-border-info); }
    :host([variant="info"]) .icon { color: var(--cg-color-message-icon-info); }
    :host([variant="info"]) .title { color: var(--cg-color-message-text-info); }

    :host([variant="success"]) .callout { background: var(--cg-color-message-background-success); border-color: var(--cg-color-message-border-success); }
    :host([variant="success"]) .icon { color: var(--cg-color-message-icon-success); }
    :host([variant="success"]) .title { color: var(--cg-color-message-text-success); }

    :host([variant="warning"]) .callout { background: var(--cg-color-message-background-warning); border-color: var(--cg-color-message-border-warning); }
    :host([variant="warning"]) .icon { color: var(--cg-color-message-icon-warning); }
    :host([variant="warning"]) .title { color: var(--cg-color-message-text-warning); }

    :host([variant="danger"]) .callout { background: var(--cg-color-message-background-error); border-color: var(--cg-color-message-border-error); }
    :host([variant="danger"]) .icon { color: var(--cg-color-message-icon-error); }
    :host([variant="danger"]) .title { color: var(--cg-color-message-text-error); }

    :host([variant="neutral"]) .icon,
    :host([variant="neutral"]) .title { color: var(--cg-color-surface-container-text); }

    .icon {
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .icon svg {
      width: var(--cg-icon-size-150);
      height: var(--cg-icon-size-150);
    }

    .content { flex: 1; min-width: 0; }

    .title {
      font-weight: var(--cg-font-weight-medium);
      font-size: var(--cg-font-size-sm);
      line-height: var(--cg-line-height-tight);
      letter-spacing: var(--cg-letter-spacing-tight);
    }

    .title + .description {
      margin-top: var(--cg-spacing-2);
    }

    .description {
      font-size: var(--cg-font-size-sm);
      color: var(--cg-color-surface-base-text);
    }

    ::slotted([slot="action"]) {
      margin-top: var(--cg-spacing-8);
    }

    .dismiss {
      flex-shrink: 0;
      background: none;
      border: none;
      color: currentColor;
      opacity: 0.5;
      cursor: pointer;
      padding: var(--cg-spacing-8);
      border-radius: var(--cg-border-radius-50);
      display: flex;
      transition: opacity var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
    }
    .dismiss:hover { opacity: 0.8; }
    .dismiss:focus-visible {
      outline: none;
      box-shadow: 0 0 0 var(--cg-focus-ring-offset) var(--cg-color-surface-base-background), 0 0 0 calc(var(--cg-focus-ring-offset) + var(--cg-focus-ring-width)) var(--cg-color-focus-ring);
    }
    .dismiss svg { width: var(--cg-spacing-16); height: var(--cg-spacing-16); }

    @keyframes calloutExit {
      from { opacity: 1; transform: translateY(0); }
      to { opacity: 0; transform: translateY(calc(-1 * var(--cg-spacing-8))); }
    }
    .callout.dismissing {
      animation: calloutExit var(--cg-transition-duration-slow) var(--cg-transition-easing-ease-in) forwards;
    }

    /* Rounded variants */
    :host([rounded="none"]) .callout { border-radius: 0; }
    :host([rounded="sm"]) .callout { border-radius: var(--cg-border-radius-50); }
    :host([rounded="md"]) .callout { border-radius: var(--cg-border-radius-100); }
    :host([rounded="lg"]) .callout { border-radius: var(--cg-border-radius-150); }
    :host([rounded="full"]) .callout { border-radius: var(--cg-border-radius-full); }
  `];

  @property({ reflect: true }) variant: 'info' | 'success' | 'warning' | 'danger' | 'neutral' = 'info';
  @property({ reflect: true }) rounded: 'none' | 'sm' | 'md' | 'lg' | 'full' = 'lg';
  @property() override title = '';
  @property() description = '';
  @property({ type: Boolean }) dismissible = false;

  @state() private _dismissed = false;
  @state() private _dismissing = false;

  private _dismissTimer = 0;

  private _iconPaths: Record<string, string> = {
    info: 'M12 2a10 10 0 100 20 10 10 0 000-20zm0 5a1 1 0 011 1v4a1 1 0 01-2 0V8a1 1 0 011-1zm0 8a1 1 0 110 2 1 1 0 010-2z',
    success: 'M12 2a10 10 0 100 20 10 10 0 000-20zm-2 10l2 2 4-4',
    warning: 'M12 2L2 22h20L12 2zm0 7v4m0 4h.01',
    danger: 'M12 2a10 10 0 100 20 10 10 0 000-20zm-1 5h2v6h-2zm0 8h2v2h-2z',
    neutral: 'M12 2a10 10 0 100 20 10 10 0 000-20zm0 5a1 1 0 011 1v4a1 1 0 01-2 0V8a1 1 0 011-1zm0 8a1 1 0 110 2 1 1 0 010-2z',
  };

  override disconnectedCallback() {
    super.disconnectedCallback();
    clearTimeout(this._dismissTimer);
  }

  private _handleKeydown(e: KeyboardEvent) {
    if (this.dismissible && e.key === 'Escape') {
      e.preventDefault();
      this._dismiss();
    }
  }

  private _dismiss() {
    this._dismissing = true;
    this.dispatchEvent(new CustomEvent('cg-callout-dismiss', { bubbles: true, composed: true }));
    this._dismissTimer = window.setTimeout(() => {
      this._dismissed = true;
      this._dismissing = false;
      this.setAttribute('hidden', '');
    }, 250);
  }

  override render() {
    if (this._dismissed && !this._dismissing) return nothing;

    const iconPath = this._iconPaths[this.variant] ?? this._iconPaths.info;
    // role="alert" carries implicit aria-live="assertive"; setting an explicit
    // "polite" on it downgrades urgent callouts. Pair role and aria-live so
    // danger/warning announce assertively and the rest stay polite.
    const isAlert = this.variant === 'danger' || this.variant === 'warning';

    return html`
      <div class="callout ${this._dismissing ? 'dismissing' : ''}" role=${isAlert ? 'alert' : 'note'} aria-live=${isAlert ? 'assertive' : 'polite'} @keydown=${this._handleKeydown}>
        <div class="icon">
          <slot name="icon">
            <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="${iconPath}"></path>
            </svg>
          </slot>
        </div>
        <div class="content">
          ${this.title ? html`<div class="title">${this.title}</div>` : nothing}
          ${this.description ? html`<div class="description">${this.description}</div>` : nothing}
          <slot></slot>
          <slot name="action"></slot>
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
