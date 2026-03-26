import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';

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
  static override styles = css`
    :host {
      transition: color 100ms cubic-bezier(0, 0, 0.58, 1);
      display: block;
      font-family: var(--cg-font-family-primary, 'Inter Variable', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif);
      margin-bottom: var(--cg-spacing-4, 4px);
    }

    .label-row {
      display: flex;
      align-items: baseline;
      gap: var(--cg-spacing-4, 4px);
    }

    label {
      font-size: var(--cg-font-size-sm, 14px);
      font-weight: var(--cg-font-weight-medium, 500);
      color: var(--cg-color-surface-base-text, #fafafa);
      cursor: pointer;
    }

    :host([disabled]) label {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .required {
      color: var(--cg-text-danger, #ef4444);
      font-weight: var(--cg-font-weight-bold, 700);
    }

    .hint {
      font-size: var(--cg-font-size-xs, 12px);
      color: var(--cg-gray-500, #71717a);
      margin-top: 2px;
      line-height: 1.4;
    }

    .error-text {
      font-size: var(--cg-font-size-xs, 12px);
      color: var(--cg-text-danger, #ef4444);
      margin-top: 2px;
      line-height: 1.4;
    }
  `;

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
