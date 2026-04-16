/**
 * @element ai-file-upload
 * AI-themed thin wrapper around `<cg-file-input>`. Delegates drag-drop, validation,
 * and file list rendering to the foundation component; adds AI-flavored defaults
 * and re-dispatches events under the `ai-file-*` namespace for backwards compat.
 *
 * @example
 * ```html
 * <ai-file-upload
 *   accept=".pdf,.csv"
 *   max-size="5242880"
 *   multiple
 *   label="Drop training data here"
 * ></ai-file-upload>
 * ```
 *
 * @fires {CustomEvent<{files: File[]}>} ai-file-select - Files selected or dropped
 * @fires {CustomEvent<{error: string, files: File[]}>} ai-file-error - File validation failed
 */
import { LitElement, html, css } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { hostBlock, reducedMotion, fadeSlideInKeyframes } from '../../styles/index.js';
import '../cg-file-input/cg-file-input.js';

@customElement('ai-file-upload')
export class AiFileUpload extends LitElement {
  static override styles = [hostBlock, reducedMotion, fadeSlideInKeyframes, css`
    :host {
      display: block;
      animation: fadeSlideIn var(--cg-transition-duration-default) var(--cg-transition-easing-ease-out) both;
    }
    :host([hidden]) { display: none; }
  `];

  @property({ type: String }) accept = '';
  @property({ type: Number, attribute: 'max-size' }) maxSize = 10485760; // 10MB
  @property({ type: Boolean }) multiple = false;
  @property({ type: String }) label = 'Drop training data here';
  @property({ type: Boolean, reflect: true }) disabled = false;

  private _onChange = (e: Event) => {
    const detail = (e as CustomEvent<{ files: File[] }>).detail;
    this.dispatchEvent(new CustomEvent('ai-file-select', {
      detail: { files: detail.files },
      bubbles: true,
      composed: true,
    }));
  };

  private _onReject = (e: Event) => {
    const detail = (e as CustomEvent<{ files: File[]; reason: string }>).detail;
    this.dispatchEvent(new CustomEvent('ai-file-error', {
      detail: { error: detail.reason, files: detail.files },
      bubbles: true,
      composed: true,
    }));
  };

  override render() {
    return html`
      <cg-file-input
        accept=${this.accept}
        ?multiple=${this.multiple}
        label=${this.label}
        max-size=${this.maxSize}
        ?disabled=${this.disabled}
        @cg-file-change=${this._onChange}
        @cg-file-reject=${this._onReject}
      ></cg-file-input>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ai-file-upload': AiFileUpload;
  }
}
