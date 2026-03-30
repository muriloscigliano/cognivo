import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { hostBlock, reducedMotion } from '../../styles/index.js';

/**
 * <cg-form> — Form container with submit handling, loading state, and field gap control.
 *
 * Features:
 * - Prevents default submit, emits cg-submit with form name
 * - Loading state disables submit
 * - Configurable gap between fields
 * - Reset method
 * - Keyboard submit on Enter
 */
@customElement('cg-form')
export class CgForm extends LitElement {
  static override styles = [hostBlock, reducedMotion, css`
    :host {
      display: block;
      font-family: var(--cg-font-family-primary, 'Inter Variable', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif);
    }

    form {
      display: flex;
      flex-direction: column;
    }

    :host([gap="sm"]) form { gap: var(--cg-spacing-8, 8px); }
    :host([gap="md"]) form { gap: var(--cg-spacing-16, 16px); }
    :host([gap="lg"]) form { gap: var(--cg-spacing-24, 24px); }

    :host([loading]) form {
      opacity: 0.6;
      pointer-events: none;
    }

    .error-summary {
      padding: var(--cg-spacing-12, 12px);
      background: var(--cg-color-status-error-background-default, rgba(239, 68, 68, 0.12));
      border: 1px solid var(--cg-color-status-error-border-default, rgba(239, 68, 68, 0.25));
      border-radius: var(--cg-border-radius-150, 12px);
      color: var(--cg-text-danger, #ef4444);
      font-size: var(--cg-font-size-sm, 14px);
      line-height: 1.4;
    }

    .error-summary ul {
      margin: var(--cg-spacing-4, 4px) 0 0;
      padding-left: var(--cg-spacing-16, 16px);
    }
    .error-summary li {
      margin: 2px 0;
    }
  `];

  /** Form name identifier. */
  @property() name = '';

  /** Gap between form fields. */
  @property({ reflect: true }) gap: 'sm' | 'md' | 'lg' = 'md';

  /** Loading state — disables interactions. */
  @property({ type: Boolean, reflect: true }) loading = false;

  /** List of error messages to show in summary. */
  @property({ type: Array }) errors: string[] = [];

  private _handleSubmit(e: Event) {
    e.preventDefault();
    if (this.loading) return;
    this.dispatchEvent(new CustomEvent('cg-submit', {
      detail: { name: this.name },
      bubbles: true,
      composed: true,
    }));
  }

  /** Programmatic reset — clears inputs via native form reset. */
  reset() {
    const form = this.shadowRoot?.querySelector('form');
    form?.reset();
    this.dispatchEvent(new CustomEvent('cg-reset', { bubbles: true, composed: true }));
  }

  override render() {
    return html`
      ${this.errors.length > 0 ? html`
        <div class="error-summary" role="alert">
          <strong>Please fix the following:</strong>
          <ul>${this.errors.map(e => html`<li>${e}</li>`)}</ul>
        </div>
      ` : nothing}
      <form
        @submit=${this._handleSubmit}
        novalidate
        aria-busy=${this.loading ? 'true' : 'false'}
      >
        <slot></slot>
      </form>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap { 'cg-form': CgForm; }
}
