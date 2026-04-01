/**
 * @element ai-empty-state
 * Centered empty state placeholder with icon, title, description, and optional action button.
 *
 * @example
 * ```html
 * <ai-empty-state
 *   variant="ai"
 *   title="No insights yet"
 *   description="Run an analysis to generate AI insights."
 *   action-label="Start Analysis"
 * ></ai-empty-state>
 * ```
 *
 * @fires {CustomEvent} ai-empty-action - Action button clicked
 *
 * @cssprop [--cg-brand-ai-accent=#dfff61] - Action button and AI variant accent
 */
import { LitElement, html, css, nothing } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { hostBlock, reducedMotion } from '../../styles/index.js';

@customElement('ai-empty-state')
export class AiEmptyState extends LitElement {
  static override styles = [hostBlock, reducedMotion, css`
    
    :host([hidden]) { display: none; }

    .container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 48px 24px;
      width: 100%;
      max-width: 400px;
      margin: 0 auto;
    }

    .icon-wrapper {
      width: 72px;
      height: 72px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 20px;
      font-size: 32px;
      transition: transform 200ms ease;
    }

    /* ── Variant: default ── */
    :host([variant="default"]) .icon-wrapper,
    :host(:not([variant])) .icon-wrapper {
      background: var(--cg-color-bg-secondary, #27272a);
      border: 1px solid var(--cg-color-border-primary, #3f3f46);
    }

    /* ── Variant: error ── */
    :host([variant="error"]) .icon-wrapper {
      background: rgba(239, 68, 68, 0.1);
      border: 1px solid rgba(239, 68, 68, 0.3);
    }
    :host([variant="error"]) .title {
      color: #fca5a5;
    }

    /* ── Variant: search ── */
    :host([variant="search"]) .icon-wrapper {
      background: rgba(234, 179, 8, 0.1);
      border: 1px solid rgba(234, 179, 8, 0.3);
    }

    /* ── Variant: ai ── */
    :host([variant="ai"]) .icon-wrapper {
      background: rgba(223, 255, 97, 0.08);
      border: 1px solid rgba(223, 255, 97, 0.25);
    }
    :host([variant="ai"]) .title {
      color: var(--cg-brand-ai-accent, #dfff61);
    }

    .title {
      color: var(--cg-color-text-primary, #fafafa);
      font-size: 18px;
      font-weight: 700;
      margin: 0 0 8px;
    }

    .description {
      color: var(--cg-color-text-secondary, #a1a1aa);
      font-size: 14px;
      line-height: 1.6;
      margin: 0 0 24px;
      max-width: 320px;
    }

    .action-btn {
      padding: 10px 24px;
      border-radius: 8px;
      border: none;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      font-family: inherit;
      transition: filter 150ms ease, transform 100ms ease;
    }

    /* Default action style */
    :host([variant="default"]) .action-btn,
    :host(:not([variant])) .action-btn {
      background: var(--cg-brand-ai-accent, #dfff61);
      color: #18181b;
    }

    :host([variant="error"]) .action-btn {
      background: #ef4444;
      color: #fafafa;
    }

    :host([variant="search"]) .action-btn {
      background: var(--cg-color-bg-secondary, #27272a);
      color: var(--cg-color-text-primary, #fafafa);
      border: 1px solid var(--cg-color-border-primary, #3f3f46);
    }

    :host([variant="ai"]) .action-btn {
      background: var(--cg-brand-ai-accent, #dfff61);
      color: #18181b;
    }

    .action-btn:hover { filter: brightness(1.1); }
    .action-btn:active { transform: scale(var(--cg-interaction-press-scale, 0.97)); }
    .action-btn:focus-visible {
      outline: 2px solid var(--cg-brand-ai-accent, #dfff61);
      outline-offset: 2px;
    }

    /* ── Slot for custom content ── */
    .extra {
      margin-top: 16px;
    }
      .action-btn { transition: none; }
    }
  `];
  @property({ type: String }) icon = '';
  @property({ type: String }) override title = 'Nothing here yet';
  @property({ type: String }) description = '';
  @property({ type: String, attribute: 'action-label' }) actionLabel = '';
  @property({ type: String, reflect: true }) variant: 'default' | 'error' | 'search' | 'ai' = 'default';

  private _handleAction() {
    this.dispatchEvent(new CustomEvent('ai-empty-action', {
      bubbles: true,
      composed: true,
    }));
  }

  override render() {
    return html`
      <div class="container" role="status" aria-label="${this.title}">
        <div class="icon-wrapper" aria-hidden="true">
          ${this.icon || html`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 8h20M6 12h4m-4 4h8"/></svg>`}
        </div>
        <h3 class="title">${this.title}</h3>
        ${this.description
          ? html`<p class="description">${this.description}</p>`
          : nothing}
        ${this.actionLabel
          ? html`<button class="action-btn" @click=${this._handleAction}>${this.actionLabel}</button>`
          : nothing}
        <div class="extra">
          <slot></slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ai-empty-state': AiEmptyState;
  }
}
