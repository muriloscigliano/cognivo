/**
 * @element ai-action-receipt
 * Receipt for an agent action that already executed: what ran, what it touched,
 * and the SPECIFIC compensating affordance for this action (not a global undo).
 * Status is labelled with text, never color alone (WCAG 1.4.1). Compensation
 * copy never claims the action "never happened" — a voided invoice still exists.
 *
 * @fires {CustomEvent<void>} ai-action-compensate — user asked to run the
 *   compensating action for this receipt.
 */
import { LitElement, html, css, nothing } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { hostBlock, reducedMotion } from '../../styles/index.js';

@customElement('ai-action-receipt')
export class AiActionReceipt extends LitElement {
  static override styles = [hostBlock, reducedMotion, css`
    :host { display: block; }

    .receipt {
      background: var(--cg-color-surface-cards-background);
      border: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
      border-radius: var(--cg-component-card-radius);
      padding: var(--cg-spacing-16);
      display: flex;
      flex-direction: column;
      gap: var(--cg-spacing-8);
    }

    .summary {
      font-size: var(--cg-font-size-sm);
      font-weight: var(--cg-font-weight-medium);
      color: var(--cg-color-surface-base-text);
    }

    .status {
      font-size: var(--cg-font-size-xs);
      font-weight: var(--cg-font-weight-semibold);
      text-transform: uppercase;
      letter-spacing: var(--cg-letter-spacing-wide);
    }
    .status.executed { color: var(--cg-color-status-info-text-default); }
    .status.failed { color: var(--cg-color-status-error-text-default); }

    .touched, .error, .note {
      font-size: var(--cg-font-size-xs);
      color: var(--cg-color-input-text-placeholder);
    }
    .error { color: var(--cg-color-status-error-text-default); }

    button.compensate {
      align-self: flex-start;
      font: inherit;
      font-size: var(--cg-font-size-xs);
      color: var(--cg-color-action-primary-text-default);
      background: transparent;
      border: var(--cg-border-width-50) solid var(--cg-color-action-primary-border-default);
      border-radius: var(--cg-component-card-radius);
      padding: var(--cg-spacing-4) var(--cg-spacing-8);
      cursor: pointer;
      transition: background-color var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
    }
    button.compensate:focus-visible {
      outline: var(--cg-border-width-100) solid var(--cg-color-action-primary-border-focus);
      outline-offset: var(--cg-spacing-2);
    }
  `];

  @property({ type: String }) summary = '';
  @property({ attribute: false }) touched: string[] = [];
  @property({ type: String }) status: 'executed' | 'failed' = 'executed';
  @property({ type: String }) error = '';
  /** When set, a compensation button with this label is shown. */
  @property({ type: String }) compensationLabel = '';

  private _compensate() {
    this.dispatchEvent(new CustomEvent('ai-action-compensate', { bubbles: true, composed: true }));
  }

  override render() {
    return html`
      <div class="receipt" role="group" aria-label="Action receipt">
        <div class="summary">${this.summary}</div>
        <div class="status ${this.status}">${this.status === 'failed' ? 'Failed' : 'Executed'}</div>
        ${this.touched.length
          ? html`<div class="touched">Touched: ${this.touched.join(', ')}</div>`
          : nothing}
        ${this.status === 'failed' && this.error
          ? html`<div class="error">${this.error}</div>`
          : nothing}
        ${this.compensationLabel
          ? html`
            <button class="compensate" type="button" @click=${this._compensate}>
              ${this.compensationLabel}
            </button>
            <div class="note">This reverses the effect; it does not erase the record.</div>
          `
          : nothing}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ai-action-receipt': AiActionReceipt;
  }
}
