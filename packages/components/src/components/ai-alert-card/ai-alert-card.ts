/**
 * @element ai-alert-card
 * Priority alert card with urgency-colored border, deadline badge, action button, and dismissal.
 *
 * @example
 * ```html
 * <ai-alert-card
 *   title="Token budget exceeded"
 *   urgency="urgent"
 *   message="Context window is at 98% capacity."
 *   deadline="2h remaining"
 *   actionLabel="Truncate"
 * ></ai-alert-card>
 * ```
 *
 * @fires {CustomEvent<{title: string, urgency: string}>} ai-alert-action - Action button clicked
 * @fires {CustomEvent<{title: string}>} ai-alert-dismiss - Dismiss button clicked
 *
 * @cssprop --cg-color-status-error-text-default - Critical urgency pulse and border
 * @cssprop --cg-color-focus-ring - Focus ring color
 */
import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { hostBlock, reducedMotion, fadeSlideInKeyframes, pulseKeyframes } from '../../styles/index.js';

type Urgency = 'info' | 'warning' | 'urgent' | 'critical';

@customElement('ai-alert-card')
export class AiAlertCard extends LitElement {
  static override styles = [hostBlock, reducedMotion, fadeSlideInKeyframes, pulseKeyframes, css`
    :host {
      animation: fadeSlideIn var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
    }

    .card {
      background: var(--cg-color-surface-cards-background);
      border: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
      border-radius: var(--cg-border-radius-200);
      padding: var(--cg-spacing-16) var(--cg-spacing-16) var(--cg-spacing-16) var(--cg-spacing-20);
      display: flex;
      align-items: flex-start;
      gap: var(--cg-spacing-12);
      position: relative;
      border-left: var(--cg-border-width-200) solid transparent;
      transition:
        box-shadow var(--cg-transition-duration-fast) var(--cg-transition-easing-default),
        transform var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
    }
    .card:hover {
      transform: translateY(-1px);
      box-shadow: var(--cg-elevation-2);
    }

    /* ── Urgency left border ── */
    .card.info    { border-left-color: var(--cg-color-status-info-text-default); }
    .card.warning { border-left-color: var(--cg-color-status-warning-text-default); }
    .card.urgent  { border-left-color: var(--cg-color-status-error-border-default); }
    .card:focus-visible {
      outline: none;
      box-shadow:
        0 0 0 2px var(--cg-color-surface-base-background),
        0 0 0 3px var(--cg-overlay-accent-strong);
    }
    .card.critical {
      border-left-color: var(--cg-color-status-error-text-default);
      animation: pulse-glow var(--cg-transition-duration-slower) var(--cg-transition-easing-default) infinite;
    }

    /* ── Dismiss exit ── */
    @keyframes alertExit {
      from { opacity: 1; transform: translateY(0); }
      to { opacity: 0; transform: translateY(-8px) scale(0.97); }
    }
    .card.dismissing {
      animation: alertExit var(--cg-transition-duration-default) var(--cg-transition-easing-ease-in) forwards;
      pointer-events: none;
    }

    /* ── Icon ── */
    .icon {
      font-size: var(--cg-font-size-xl);
      flex-shrink: 0;
      margin-top: var(--cg-spacing-2);
    }
    .icon.info    { color: var(--cg-color-status-info-text-default); }
    .icon.warning { color: var(--cg-color-status-warning-text-default); }
    .icon.urgent  { color: var(--cg-color-status-error-border-default); }
    .icon.critical { color: var(--cg-color-status-error-text-default); }

    /* ── Body ── */
    .body { flex: 1; min-width: 0; }

    .header {
      display: flex;
      align-items: center;
      gap: var(--cg-spacing-8);
      margin-bottom: var(--cg-spacing-6);
    }
    .title {
      font-size: var(--cg-font-size-base);
      font-weight: var(--cg-font-weight-bold);
      color: var(--cg-color-surface-base-text);
    }
    .deadline {
      display: inline-flex;
      align-items: center;
      gap: var(--cg-spacing-4);
      padding: var(--cg-spacing-2) var(--cg-spacing-8);
      border-radius: var(--cg-border-radius-full);
      font-size: var(--cg-font-size-xs);
      font-weight: var(--cg-font-weight-semibold);
      background: var(--cg-overlay-dark-subtle);
      color: var(--cg-color-surface-base-text);
      white-space: nowrap;
    }

    .message {
      font-size: var(--cg-font-size-sm);
      color: var(--cg-color-input-text-placeholder);
      line-height: var(--cg-line-height-normal);
      padding-bottom: var(--cg-spacing-12);
      margin-bottom: var(--cg-spacing-12);
      border-bottom: var(--cg-border-width-50) solid var(--cg-color-surface-cards-divider);
    }

    /* ── Dismiss (positioned cg-button) ── */
    .dismiss {
      position: absolute;
      top: var(--cg-spacing-8);
      right: var(--cg-spacing-8);
    }

    @media (prefers-reduced-motion: reduce) {
      .card:hover { transform: none; }
      .card.critical { animation: none; }
      .card.dismissing { animation: none; opacity: 0; }
    }

    @keyframes pulse-glow {
      0%, 100% { border-left-color: var(--cg-color-status-error-text-default); }
      50% { border-left-color: var(--cg-color-status-error-border-default); }
    }

    /* ── Rounded variants ── */
    :host([rounded="none"]) .card { border-radius: 0; }
    :host([rounded="sm"]) .card { border-radius: var(--cg-border-radius-50); }
    :host([rounded="md"]) .card { border-radius: var(--cg-border-radius-100); }
    :host([rounded="lg"]) .card { border-radius: var(--cg-border-radius-200); }
    :host([rounded="full"]) .card { border-radius: var(--cg-border-radius-full); }
  `];

  @property({ reflect: true }) rounded: 'none' | 'sm' | 'md' | 'lg' | 'full' = 'lg';
  @property({ type: String }) override title = '';
  @property({ type: String }) message = '';
  @property({ type: String }) urgency: Urgency = 'info';
  @property({ type: String }) deadline = '';
  @property({ type: String }) actionLabel = '';
  @property({ type: Boolean }) dismissible = true;

  @state() private _dismissing = false;

  private _urgencyIcon(): unknown {
    if (this.urgency === 'info') return html`<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4m0-4h.01"/></svg>`;
    if (this.urgency === 'warning') return html`<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/></svg>`;
    if (this.urgency === 'urgent') return html`<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>`;
    return html`<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>`;
  }

  private _handleAction() {
    this.dispatchEvent(new CustomEvent('ai-alert-action', {
      bubbles: true, composed: true,
      detail: { title: this.title, urgency: this.urgency },
    }));
  }

  private _handleDismiss() {
    this._dismissing = true;
    this.dispatchEvent(new CustomEvent('ai-alert-dismiss', {
      bubbles: true, composed: true,
      detail: { title: this.title },
    }));
    setTimeout(() => { this._dismissing = false; this.remove(); }, 250);
  }

  private _handleKeyDown(e: KeyboardEvent) {
    if (e.key === 'Escape' && this.dismissible) {
      e.preventDefault();
      this._handleDismiss();
    }
  }

  override render() {
    return html`
      <div
        class="card ${this.urgency} ${this._dismissing ? 'dismissing' : ''}"
        role="alert"
        aria-label="${this.urgency} alert: ${this.title}"
        tabindex="0"
        @keydown=${this._handleKeyDown}
      >
        <span class="icon ${this.urgency}" aria-hidden="true">${this._urgencyIcon()}</span>

        <div class="body">
          <div class="header">
            <span class="title">${this.title}</span>
            ${this.deadline ? html`
              <span class="deadline" aria-label="Deadline: ${this.deadline}">
                <span aria-hidden="true"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg></span>
                ${this.deadline}
              </span>
            ` : nothing}
          </div>

          ${this.message ? html`<div class="message">${this.message}</div>` : nothing}

          ${this.actionLabel ? html`
            <cg-button
              variant=${this.urgency === 'critical' ? 'primary' : 'secondary'}
              size="sm"
              type=${this.urgency === 'urgent' || this.urgency === 'critical' ? 'danger' : 'normal'}
              @click=${this._handleAction}
              label="${this.actionLabel}"
            >${this.actionLabel}</cg-button>
          ` : nothing}
        </div>

        ${this.dismissible ? html`
          <cg-button
            class="dismiss"
            variant="tertiary"
            size="sm"
            rounded="full"
            label="Dismiss alert"
            @click=${this._handleDismiss}
          ><cg-icon name="close" size="xs"></cg-icon></cg-button>
        ` : nothing}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ai-alert-card': AiAlertCard;
  }
}
