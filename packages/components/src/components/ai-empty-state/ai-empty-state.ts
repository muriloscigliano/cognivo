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
import { hostBlock, reducedMotion, fadeSlideInKeyframes } from '../../styles/index.js';

@customElement('ai-empty-state')
export class AiEmptyState extends LitElement {
  static override styles = [hostBlock, reducedMotion, fadeSlideInKeyframes, css`
    :host {
      animation: fadeSlideIn var(--cg-transition-duration-fast) var(--cg-transition-easing-ease-out) both;
    }
    :host([hidden]) { display: none; }

    .container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: var(--cg-spacing-24);
      width: 100%;
      max-width: var(320px);
      margin: 0 auto;
    }

    .icon-wrapper {
      width: var(--cg-spacing-48);
      height: var(--cg-spacing-48);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: var(--cg-spacing-16);
      font-size: var(--cg-font-size-2xl);
      transition: transform var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
    }

    .icon-wrapper:hover {
      transform: scale(1.05);
    }

    /* ── Variant: default ── */
    :host([variant="default"]) .icon-wrapper {
      background: var(--cg-color-surface-container-background);
      border: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
    }

    /* ── Variant: error ── */
    :host([variant="error"]) .icon-wrapper {
      background: var(--cg-color-status-error-background-default);
      border: var(--cg-border-width-50) solid var(--cg-color-status-error-border-default);
    }
    :host([variant="error"]) .title {
      color: var(--cg-color-status-error-border-default);
    }

    /* ── Variant: search ── */
    :host([variant="search"]) .icon-wrapper {
      background: var(--cg-color-status-warning-background-default);
      border: var(--cg-border-width-50) solid var(--cg-color-status-warning-border-default);
    }

    /* ── Variant: ai ── */
    :host([variant="ai"]) .icon-wrapper {
      background: var(--cg-overlay-accent-subtle);
      border: var(--cg-border-width-50) solid var(--cg-overlay-accent-strong);
    }
    :host([variant="ai"]) .title {
      color: var(--cg-color-surface-base-text);
    }

    .title {
      color: var(--cg-color-surface-base-text);
      font-size: var(--cg-font-size-lg);
      font-weight: var(--cg-font-weight-bold);
      margin: 0 0 var(--cg-spacing-8);
    }

    .description {
      color: var(--cg-color-input-text-placeholder);
      font-size: var(--cg-font-size-sm);
      line-height: 1.6;
      margin: 0 0 var(--cg-spacing-24);
      max-width: var(280px);
    }

    .action-btn {
      padding: var(--cg-spacing-8) var(--cg-spacing-24);
      border-radius: var(--cg-border-radius-100);
      border: none;
      font-size: var(--cg-font-size-sm);
      font-weight: var(--cg-font-weight-semibold);
      cursor: pointer;
      font-family: inherit;
      transition: filter var(--cg-transition-duration-fast) var(--cg-transition-easing-default), transform var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
    }

    /* Default action style */
    :host([variant="default"]) .action-btn {
      background: var(--cg-color-action-primary-background-default);
      color: var(--cg-color-surface-container-background);
    }

    :host([variant="error"]) .action-btn {
      background: var(--cg-color-status-error-text-default);
      color: var(--cg-color-surface-base-text);
    }

    :host([variant="search"]) .action-btn {
      background: var(--cg-color-surface-container-background);
      color: var(--cg-color-surface-base-text);
      border: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
    }

    :host([variant="ai"]) .action-btn {
      background: var(--cg-color-action-primary-background-default);
      color: var(--cg-color-surface-container-background);
    }

    .action-btn:hover { filter: brightness(1.1); }
    .action-btn:active { transform: scale(var(--cg-interaction-press-scale)); }
    .action-btn:focus-visible {
      outline: 2px solid var(--cg-overlay-accent-strong);
      outline-offset: var(--cg-outline-offset-default);
    }

    /* ── Slot for custom content ── */
    .extra {
      margin-top: var(--cg-spacing-16);
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
