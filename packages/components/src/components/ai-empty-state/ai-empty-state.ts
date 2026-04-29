/**
 * @element ai-empty-state
 * @deprecated Use `<cg-empty-state variant="ai">` directly. This element is now a thin
 * forwarding shim around `cg-empty-state` for backwards compatibility and will be
 * removed in v0.6.0.
 *
 * Migration:
 * ```html
 * <!-- Before -->
 * <ai-empty-state variant="ai" title="No insights" action-label="Run">…</ai-empty-state>
 *
 * <!-- After -->
 * <cg-empty-state variant="ai" title="No insights">
 *   <cg-button slot="actions">Run</cg-button>
 * </cg-empty-state>
 * ```
 *
 * @fires {CustomEvent} ai-empty-action - Action button clicked (legacy event, preserved)
 */
import { LitElement, html, css, nothing } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { hostBlock } from '../../styles/index.js';
import '../cg-empty-state/cg-empty-state.js';
import '../cg-button/cg-button.js';

let warned = false;

@customElement('ai-empty-state')
export class AiEmptyState extends LitElement {
  static override styles = [hostBlock, css`:host([hidden]) { display: none; }`];

  @property({ type: String }) icon = '';
  @property({ type: String }) override title = 'Nothing here yet';
  @property({ type: String }) description = '';
  @property({ type: String, attribute: 'action-label' }) actionLabel = '';
  @property({ type: String, reflect: true }) variant: 'default' | 'error' | 'search' | 'ai' = 'default';

  override connectedCallback() {
    super.connectedCallback();
    if (!warned) {
      warned = true;
      // eslint-disable-next-line no-console
      console.warn(
        '[cognivo] <ai-empty-state> is deprecated. Use <cg-empty-state variant="ai"> directly. ' +
          'This shim will be removed in v0.6.0.',
      );
    }
  }

  private _handleAction = () => {
    this.dispatchEvent(new CustomEvent('ai-empty-action', { bubbles: true, composed: true }));
  };

  override render() {
    return html`
      <cg-empty-state
        variant=${this.variant}
        title=${this.title}
        description=${this.description}
      >
        ${this.icon
          ? html`<span slot="icon">${unsafeHTML(this.icon)}</span>`
          : nothing}
        ${this.actionLabel
          ? html`<cg-button slot="actions" variant="primary" @click=${this._handleAction}>${this.actionLabel}</cg-button>`
          : nothing}
      </cg-empty-state>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ai-empty-state': AiEmptyState;
  }
}
