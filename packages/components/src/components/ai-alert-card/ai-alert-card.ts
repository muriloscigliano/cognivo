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
 * @cssprop [--cg-brand-ai-accent=#dfff61] - Focus ring color
 * @cssprop [--cg-red-400=#f87171] - Critical urgency pulse and border
 */
import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { hostBlock, reducedMotion, fadeSlideInKeyframes, pulseKeyframes } from '../../styles/index.js';

type Urgency = 'info' | 'warning' | 'urgent' | 'critical';

@customElement('ai-alert-card')
export class AiAlertCard extends LitElement {
  static override styles = [hostBlock, reducedMotion, fadeSlideInKeyframes, pulseKeyframes, css`
    :host {
      animation: fadeSlideIn var(--cg-motion-duration-fast, 200ms) var(--cg-motion-easing-color, cubic-bezier(0, 0, 0.58, 1));
    }

    .card {
      background: var(--cg-color-surface-cards-background, #18181b);
      background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0.03), transparent);
      border: 1px solid var(--cg-color-surface-cards-border, #27272a);
      border-radius: var(--cg-border-radius-200, 12px);
      padding: 16px 16px 16px 20px;
      display: flex;
      align-items: flex-start;
      gap: 14px;
      position: relative;
      border-left: 4px solid transparent;
      transition: box-shadow 150ms ease, transform 150ms ease;
      box-shadow: inset 0 1px 0 0 rgba(255, 255, 255, 0.05);
    }
    .card:hover {
      box-shadow: var(--cg-elevation-2, 0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -2px rgba(0, 0, 0, 0.2));
      transform: translateY(var(--cg-interaction-hover-lift, -1px));
    }

    /* ── Urgency left border ── */
    .card.info    { border-left-color: var(--cg-blue-400, #60a5fa); }
    .card.warning { border-left-color: var(--cg-yellow-400, #fbbf24); }
    .card.urgent  { border-left-color: var(--cg-orange-400, #fb923c); }
    .card.critical {
      border-left-color: var(--cg-red-400, #f87171);
      animation: pulse-glow 2s ease-in-out infinite;
    }

    /* ── Icon ── */
    .icon {
      font-size: 20px;
      flex-shrink: 0;
      margin-top: 2px;
    }
    .icon.info    { color: var(--cg-blue-400, #60a5fa); }
    .icon.warning { color: var(--cg-yellow-400, #fbbf24); }
    .icon.urgent  { color: var(--cg-orange-400, #fb923c); }
    .icon.critical { color: var(--cg-red-400, #f87171); }

    /* ── Body ── */
    .body { flex: 1; min-width: 0; }

    .header {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 6px;
    }
    .title {
      font-size: 15px;
      font-weight: 700;
      color: var(--cg-color-surface-base-text, #fafafa);
    }
    .deadline {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 2px 8px;
      border-radius: 99px;
      font-size: 11px;
      font-weight: 600;
      background: rgba(255, 255, 255, 0.06);
      color: var(--cg-gray-300, #d4d4d8);
      white-space: nowrap;
    }

    .message {
      font-size: 13px;
      color: var(--cg-gray-400, #a1a1aa);
      line-height: 1.5;
      margin-bottom: 12px;
    }

    /* ── Action button ── */
    .action-btn {
      padding: 8px 16px;
      border-radius: 8px;
      font-size: 13px;
      font-weight: 600;
      border: none;
      cursor: pointer;
      transition: all 150ms ease;
    }
    .action-btn:focus-visible {
      outline: 2px solid var(--cg-brand-ai-accent, #dfff61);
      outline-offset: 2px;
    }
    .action-btn.info {
      background: rgba(96, 165, 250, 0.12);
      color: var(--cg-blue-400, #60a5fa);
    }
    .action-btn.info:hover { background: rgba(96, 165, 250, 0.2); }
    .action-btn.warning {
      background: rgba(245, 158, 11, 0.12);
      color: var(--cg-yellow-400, #fbbf24);
    }
    .action-btn.warning:hover { background: rgba(245, 158, 11, 0.2); }
    .action-btn.urgent {
      background: rgba(249, 115, 22, 0.12);
      color: var(--cg-orange-400, #fb923c);
    }
    .action-btn.urgent:hover { background: rgba(249, 115, 22, 0.2); }
    .action-btn.critical {
      background: var(--cg-red-400, #f87171);
      color: #fff;
    }
    .action-btn.critical:hover { filter: brightness(0.9); }

    /* ── Dismiss ── */
    .dismiss {
      position: absolute;
      top: 12px;
      right: 12px;
      width: 24px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 6px;
      background: none;
      border: none;
      color: var(--cg-gray-500, #71717a);
      cursor: pointer;
      font-size: 14px;
      transition: all 150ms ease;
    }
    .dismiss:hover {
      color: var(--cg-color-surface-base-text, #fafafa);
      background: var(--cg-gray-800, #27272a);
    }
    .dismiss:focus-visible {
      outline: 2px solid var(--cg-brand-ai-accent, #dfff61);
      outline-offset: 2px;
    }

    @keyframes pulse-glow {
      0%, 100% { box-shadow: 0 0 0 0 rgba(248, 113, 113, 0.2); }
      50% { box-shadow: 0 0 0 6px rgba(248, 113, 113, 0); }
    }
      .action-btn, .dismiss { transition: none; }
    }
  `];
  @property({ type: String }) override title = '';
  @property({ type: String }) message = '';
  @property({ type: String }) urgency: Urgency = 'info';
  @property({ type: String }) deadline = '';
  @property({ type: String }) actionLabel = '';
  @property({ type: Boolean }) dismissible = true;

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
    this.dispatchEvent(new CustomEvent('ai-alert-dismiss', {
      bubbles: true, composed: true,
      detail: { title: this.title },
    }));
  }

  override render() {
    return html`
      <div
        class="card ${this.urgency}"
        role="alert"
        aria-label="${this.urgency} alert: ${this.title}"
        tabindex="0"
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
            <button
              class="action-btn ${this.urgency}"
              @click=${this._handleAction}
              aria-label="${this.actionLabel}"
            >${this.actionLabel}</button>
          ` : nothing}
        </div>

        ${this.dismissible ? html`
          <button
            class="dismiss"
            @click=${this._handleDismiss}
            aria-label="Dismiss alert"
          ><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg></button>
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
