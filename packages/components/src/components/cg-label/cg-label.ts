import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { hostBlock, reducedMotion } from '../../styles/index.js';

/**
 * <cg-label> — Form label with required indicator, hint, and error text.
 *
 * Better than OpenUI's Label:
 * - Required asterisk
 * - Hint text (description below label)
 * - Error text (replaces hint when in error state)
 * - htmlFor association
 */
@customElement('cg-label')
export class CgLabel extends LitElement {
  static override styles = [hostBlock, reducedMotion, css`
    :host {
      margin-bottom: var(--cg-spacing-4);
    }

    .label-row {
      display: flex;
      align-items: baseline;
      gap: var(--cg-spacing-4);
    }

    label {
      font-size: var(--cg-font-size-sm);
      font-weight: var(--cg-font-weight-medium);
      color: var(--cg-color-surface-base-text);
      cursor: pointer;
    }

    :host([disabled]) label {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .required {
      color: var(--cg-color-status-error-text-default);
      font-weight: var(--cg-font-weight-bold);
    }

    .hint {
      font-size: var(--cg-font-size-xs);
      color: var(--cg-color-input-text-placeholder);
      margin-top: var(--cg-spacing-2);
      line-height: var(--cg-line-height-snug);
      transition: opacity var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
    }

    .error-text {
      font-size: var(--cg-font-size-xs);
      color: var(--cg-color-status-error-text-default);
      margin-top: var(--cg-spacing-2);
      line-height: var(--cg-line-height-snug);
      transition: opacity var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
    }
  `];

  @property() text = '';
  @property() hint = '';
  @property() error = '';
  @property({ attribute: 'for' }) htmlFor = '';
  @property({ type: Boolean }) required = false;
  @property({ type: Boolean, reflect: true }) disabled = false;

  override render() {
    return html`
      <div class="label-row">
        <label for=${this.htmlFor || nothing}>
          ${this.text}<slot></slot>
          ${this.required ? html`<span class="required" aria-hidden="true"> *</span>` : nothing}
        </label>
      </div>
      ${this.error
        ? html`<div class="error-text" role="alert">${this.error}</div>`
        : this.hint
          ? html`<div class="hint">${this.hint}</div>`
          : nothing
      }
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cg-label': CgLabel;
  }
}
