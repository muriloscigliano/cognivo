import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
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
      font-family: var(--cg-font-family-primary);
    }

    form {
      display: flex;
      flex-direction: column;
    }

    /* All slotted children stretch to full width */
    ::slotted(*) {
      width: 100%;
    }

    :host([gap="sm"]) form { gap: var(--cg-spacing-8); }
    :host([gap="md"]) form { gap: var(--cg-spacing-16); }
    :host([gap="lg"]) form { gap: var(--cg-spacing-24); }

    :host([loading]) form {
      opacity: 0.6;
      pointer-events: none;
    }

    .error-summary {
      padding: var(--cg-spacing-12);
      background: var(--cg-color-status-error-background-default);
      border: var(--cg-border-width-50) solid var(--cg-color-status-error-border-default);
      border-radius: var(--cg-border-radius-100);
      color: var(--cg-color-status-error-text-default);
      font-size: var(--cg-font-size-sm);
      line-height: var(--cg-line-height-normal);
    }

    .error-summary ul {
      margin: var(--cg-spacing-4) 0 0;
      padding-left: var(--cg-spacing-16);
    }
    .error-summary li {
      margin: var(--cg-spacing-2) 0;
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

  /** Programmatic reset — clears inputs via native form reset and slotted custom elements. */
  reset() {
    const form = this.shadowRoot?.querySelector('form');
    form?.reset();

    // Reset slotted form-associated custom elements via formResetCallback
    const slot = this.shadowRoot?.querySelector('slot');
    const slotted = slot?.assignedElements({ flatten: true }) ?? [];
    for (const el of slotted) {
      if (typeof (el as any).formResetCallback === 'function') {
        (el as any).formResetCallback();
      }
      // Also check nested children (e.g., wrapper divs containing custom elements)
      el.querySelectorAll('*').forEach((child: Element) => {
        if (typeof (child as any).formResetCallback === 'function') {
          (child as any).formResetCallback();
        }
      });
    }

    this.dispatchEvent(new CustomEvent('cg-reset', { bubbles: true, composed: true }));
  }

  override render() {
    return html`
      <form
        @submit=${this._handleSubmit}
        novalidate
        aria-busy=${this.loading ? 'true' : 'false'}
      >
        ${this.errors.length > 0 ? html`
          <div class="error-summary" role="alert" aria-labelledby="cg-form-error-heading">
            <strong id="cg-form-error-heading" role="heading" aria-level="2">Please fix the following:</strong>
            <ul>${this.errors.map(e => html`<li>${e}</li>`)}</ul>
          </div>
        ` : nothing}
        <slot></slot>
      </form>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap { 'cg-form': CgForm; }
}
