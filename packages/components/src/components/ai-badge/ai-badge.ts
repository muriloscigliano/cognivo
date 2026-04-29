/**
 * @element ai-badge
 * @deprecated Use `<ai-confidence-badge>` directly. The element was renamed to better
 * reflect that it visualizes AI model *confidence scores*, not generic status labels
 * (see `<cg-badge>` for status pills). This shim wraps the new element and re-fires
 * events under the legacy name; it will be removed in v0.6.0.
 *
 * Migration:
 * ```html
 * <!-- Before -->
 * <ai-badge score="0.92" size="sm"></ai-badge>
 *
 * <!-- After -->
 * <ai-confidence-badge score="0.92" size="sm"></ai-confidence-badge>
 * ```
 *
 * @fires {CustomEvent<{score: number, level: string}>} ai-badge-click - Badge clicked (legacy event, preserved)
 */
import { LitElement, html, css } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { hostBase } from '../../styles/index.js';
import '../ai-confidence-badge/ai-confidence-badge.js';

let warned = false;

@customElement('ai-badge')
export class AiBadge extends LitElement {
  static override styles = [hostBase, css`:host { display: inline-block; }`];

  @property({ type: Number }) score: number = 0.85;
  @property({ type: Boolean }) showPercentage: boolean = true;
  @property({ type: String, reflect: true }) size: 'sm' | 'md' | 'lg' = 'md';
  @property({ type: String }) explanation: string = '';
  @property({ type: Array }) history: number[] = [];
  @property({ type: Number }) highThreshold: number = 0.8;
  @property({ type: Number }) lowThreshold: number = 0.5;

  override connectedCallback() {
    super.connectedCallback();
    if (!warned) {
      warned = true;
      // eslint-disable-next-line no-console
      console.warn(
        '[cognivo] <ai-badge> is deprecated. Use <ai-confidence-badge> directly. ' +
          'This shim will be removed in v0.6.0.',
      );
    }
  }

  private _onInnerClick = (e: Event) => {
    const detail = (e as CustomEvent).detail;
    this.dispatchEvent(new CustomEvent('ai-badge-click', {
      bubbles: true, composed: true, detail,
    }));
  };

  override render() {
    return html`
      <ai-confidence-badge
        .score=${this.score}
        .showPercentage=${this.showPercentage}
        size=${this.size}
        .explanation=${this.explanation}
        .history=${this.history}
        .highThreshold=${this.highThreshold}
        .lowThreshold=${this.lowThreshold}
        @ai-confidence-badge-click=${this._onInnerClick}
      ></ai-confidence-badge>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ai-badge': AiBadge;
  }
}
