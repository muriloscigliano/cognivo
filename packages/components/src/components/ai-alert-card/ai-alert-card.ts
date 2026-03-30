/**
 * <ai-alert-card> — Priority alert with urgency, deadline, and action button.
 *
 * Colored left border by urgency, icon per urgency level, deadline badge,
 * action button, dismiss X, pulse animation for critical.
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
      border: 1px solid var(--cg-color-surface-cards-border, #27272a);
      border-radius: var(--cg-border-radius-200, 12px);
      padding: 16px 16px 16px 20px;
      display: flex;
      align-items: flex-start;
      gap: 14px;
      position: relative;
      border-left: 4px solid transparent;
      transition: box-shadow 150ms ease, transform 150ms ease;
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
  @property({ type: String }) title = '';
  @property({ type: String }) message = '';
  @property({ type: String }) urgency: Urgency = 'info';
  @property({ type: String }) deadline = '';
  @property({ type: String }) actionLabel = '';
  @property({ type: Boolean }) dismissible = true;

  private _urgencyIcon(): string {
    const icons: Record<Urgency, string> = {
      info: '\u2139',       // ℹ
      warning: '\u26A0',    // ⚠
      urgent: '\u26A1',     // ⚡
      critical: '\u2716',   // ✖
    };
    return icons[this.urgency];
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
                <span aria-hidden="true">&#9200;</span>
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
          >&#10005;</button>
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
