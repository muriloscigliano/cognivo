/**
 * <cg-generative-ui> — Drop-in Lit element for generative UI rendering.
 *
 * Accepts a raw response string (from an LLM), a Library, and streaming state.
 * Automatically parses and renders the result as Web Components.
 *
 * Usage:
 *   <cg-generative-ui
 *     .response=${llmText}
 *     .library=${myLibrary}
 *     .isStreaming=${true}
 *   ></cg-generative-ui>
 *
 * Works in: vanilla HTML, React (via adapter-react), Vue (via adapter-vue), Angular, etc.
 */

import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import {
  createParser,
  createStreamingParser,
  validateTokenUsage,
  type Library,
  type ParseResult,
  type StreamParser,
  type ActionEvent,
  type TokenViolation,
} from '@cognivo/gen-ui';
import { LitRenderer } from './lit-renderer.js';

@customElement('cg-generative-ui')
export class CgGenerativeUi extends LitElement {
  static override styles = css`
    :host {
      display: block;
    }
    .gen-ui-container {
      width: 100%;
    }
    .gen-ui-error {
      color: var(--cg-color-text-danger, #dc2626);
      padding: var(--cg-spacing-sm, 8px);
      border: 1px solid var(--cg-color-border-danger, #fca5a5);
      border-radius: var(--cg-radius-sm, 4px);
      font-size: var(--cg-font-size-body-sm, 0.875rem);
    }
    .gen-ui-empty {
      color: var(--cg-color-text-muted, #9ca3af);
      padding: var(--cg-spacing-md, 16px);
      text-align: center;
      font-style: italic;
    }
  `;

  /** Raw LLM response text (component-lang format). */
  @property({ type: String })
  response: string | null = null;

  /** Component library definition. */
  @property({ attribute: false })
  library: Library | null = null;

  /** Whether the LLM is still streaming. */
  @property({ type: Boolean })
  isStreaming = false;

  /** Current parse result (read-only, for inspection). */
  @state()
  private _parseResult: ParseResult | null = null;

  /** Token violations found in the generated output. */
  @state()
  private _tokenViolations: TokenViolation[] = [];

  private _renderer: LitRenderer | null = null;
  private _streamParser: StreamParser | null = null;
  private _lastResponse = '';

  /**
   * Get the current parse result for external inspection.
   */
  get parseResult(): ParseResult | null {
    return this._parseResult;
  }

  /**
   * Get token violations found in the generated output.
   */
  get tokenViolations(): TokenViolation[] {
    return this._tokenViolations;
  }

  override updated(changed: Map<string, unknown>): void {
    if (changed.has('library') && this.library) {
      this._renderer = new LitRenderer(this.library);
      this._streamParser = null;
      this._lastResponse = '';
    }

    if ((changed.has('response') || changed.has('isStreaming')) && this.library) {
      this._processResponse();
    }
  }

  private _processResponse(): void {
    if (!this.library || !this._renderer) return;

    const container = this.shadowRoot?.querySelector('.gen-ui-container') as HTMLElement;
    if (!container) return;

    if (!this.response) {
      this._parseResult = null;
      this._tokenViolations = [];
      this._renderer.destroy();
      return;
    }

    let result: ParseResult;

    if (this.isStreaming) {
      // Use streaming parser for incremental updates
      if (!this._streamParser) {
        this._streamParser = createStreamingParser(this.library.toJSONSchema());
        this._lastResponse = '';
      }

      // Push only the new chunk
      const newChunk = this.response.slice(this._lastResponse.length);
      if (newChunk) {
        result = this._streamParser.push(newChunk);
        this._lastResponse = this.response;
      } else {
        result = this._streamParser.getResult();
      }
    } else {
      // One-shot parse
      const parser = createParser(this.library.toJSONSchema());
      result = parser.parse(this.response);
      this._streamParser = null;
      this._lastResponse = '';
    }

    this._parseResult = result;

    // Validate token usage
    this._tokenViolations = validateTokenUsage(result.root);

    // Dispatch token violations if any
    if (this._tokenViolations.length > 0) {
      this.dispatchEvent(
        new CustomEvent('token-violations', {
          detail: { violations: this._tokenViolations },
          bubbles: true,
          composed: true,
        }),
      );
    }

    // Dispatch parse result
    this.dispatchEvent(
      new CustomEvent('parse-result', {
        detail: { result },
        bubbles: true,
        composed: true,
      }),
    );

    // Render
    if (this._parseResult === null || this._renderer === null) return;

    if (container.children.length === 0) {
      this._renderer.render(result, container);
    } else {
      this._renderer.update(result);
    }
  }

  override render() {
    return html`<div class="gen-ui-container"></div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cg-generative-ui': CgGenerativeUi;
  }
}
