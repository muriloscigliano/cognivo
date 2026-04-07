/**
 * @element ai-tool-indicator
 * Displays LLM tool/function call progress with humanized names,
 * spinner/check/error icons, and expandable result panels.
 *
 * @fires {CustomEvent<{index: number, tool: ToolCall}>} ai-tool-click - When a tool row is clicked
 */
import { LitElement, html, css, nothing } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { hostBlock, reducedMotion } from '../../styles/index.js';

interface ToolCall {
  name: string;
  status: 'loading' | 'complete' | 'error';
  result?: string;
}

@customElement('ai-tool-indicator')
export class AiToolIndicator extends LitElement {
  static override styles = [hostBlock, reducedMotion, css`
    .tools {
      display: flex;
      flex-direction: column;
      gap: var(--cg-spacing-8);
    }

    .tool {
      display: flex;
      align-items: center;
      gap: var(--cg-spacing-12);
      padding: var(--cg-spacing-16) var(--cg-spacing-20);
      border-radius: var(--cg-border-radius-100);
      background: var(--cg-color-surface-cards-background);
      border: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
      font-size: var(--cg-font-size-xs);
      font-weight: var(--cg-font-weight-medium);
      color: var(--cg-color-surface-container-outlined);
      cursor: pointer;
      transition: border-color var(--cg-motion-duration-fast) var(--cg-motion-easing-default), background var(--cg-motion-duration-fast) var(--cg-motion-easing-default);
      animation: slideIn var(--cg-motion-duration-normal) var(--cg-motion-easing-enter) both;
      animation-delay: calc(var(--tool-index, 0) * 60ms);
    }
    .tool:hover {
      border-color: var(--cg-color-surface-cards-hover-border);
      background: var(--cg-color-surface-cards-hover-background);
    }

    @keyframes slideIn {
      from { opacity: 0; transform: translateX(calc(-1 * var(--cg-spacing-8))); }
      to { opacity: 1; transform: translateX(0); }
    }

    /* Status icon */
    .status-icon {
      width: var(--cg-spacing-16);
      height: var(--cg-spacing-16);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    /* Spinner */
    .spinner {
      width: var(--cg-spacing-12);
      height: var(--cg-spacing-12);
      border: var(--cg-border-width-100) solid var(--cg-color-loading-spinner-secondary);
      border-top-color: var(--cg-color-loading-spinner-primary);
      border-radius: var(--cg-border-radius-full);
      animation: spin 0.8s linear infinite;
    }
    @keyframes spin { to { transform: rotate(360deg); } }

    .check svg, .error-icon svg {
      width: var(--cg-spacing-12);
      height: var(--cg-spacing-12);
    }
    .check { color: var(--cg-color-status-success-text-default); display: flex; }
    .error-icon { color: var(--cg-color-status-error-text-default); display: flex; }

    /* Tool name */
    .tool-name { flex: 1; }
    .tool.complete .tool-name { color: var(--cg-color-surface-base-text); }
    .tool.error .tool-name { color: var(--cg-color-status-error-text-default); }

    /* Loading shimmer on tool name */
    .tool.loading .tool-name {
      background: linear-gradient(110deg, var(--cg-color-surface-container-outlined) 35%, var(--cg-color-surface-base-text) 50%, var(--cg-color-surface-container-outlined) 65%);
      background-size: 300% 100%;
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      animation: textSweep 1.8s var(--cg-motion-easing-default) infinite;
    }
    @keyframes textSweep {
      0% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }

    /* Expanded result */
    .result {
      margin-top: var(--cg-spacing-4);
      padding: var(--cg-spacing-12) var(--cg-spacing-16);
      background: var(--cg-color-surface-base-background);
      border-radius: var(--cg-border-radius-100);
      border: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
      font-size: var(--cg-font-size-xs);
      font-family: var(--cg-font-family-mono);
      color: var(--cg-color-surface-container-outlined);
      line-height: var(--cg-line-height-relaxed);
      white-space: pre-wrap;
      max-height: 200px;
      overflow-y: auto;
    }

    /* Compact mode */
    :host([compact]) .tools { flex-direction: row; flex-wrap: wrap; }
    :host([compact]) .tool { padding: var(--cg-spacing-6) var(--cg-spacing-12); }
    :host([compact]) .result { display: none; }

    .tool:focus-visible {
      outline: none;
      box-shadow: 0 0 0 3px var(--cg-overlay-accent-strong);
    }

    @media (prefers-reduced-motion: reduce) {
      .spinner { animation: none; }
      .tool { animation: none; }
      .tool.loading .tool-name { animation: none; -webkit-text-fill-color: currentColor; }
    }
  `];

  @property({ type: Array }) tools: ToolCall[] = [];
  @property({ type: Boolean, reflect: true }) compact = false;

  private _expandedIndex = -1;

  private _humanize(name: string): string {
    const map: Record<string, string> = {
      web_search: 'Searching the web',
      search: 'Searching',
      code_execution: 'Running code',
      code_interpreter: 'Running code',
      database: 'Querying database',
      database_query: 'Querying database',
      file_search: 'Searching files',
      file_read: 'Reading file',
      calculator: 'Calculating',
      image_generation: 'Generating image',
      browser: 'Browsing',
      retrieval: 'Retrieving data',
      api_call: 'Calling API',
    };
    return map[name] || name.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  }

  private _handleClick(index: number) {
    this._expandedIndex = this._expandedIndex === index ? -1 : index;
    this.requestUpdate();
    this.dispatchEvent(new CustomEvent('ai-tool-click', {
      bubbles: true, composed: true,
      detail: { index, tool: this.tools[index] },
    }));
  }

  private _renderStatusIcon(status: string) {
    if (status === 'complete') return html`<span class="check"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg></span>`;
    if (status === 'error') return html`<span class="error-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6L6 18M6 6l12 12"/></svg></span>`;
    return html`<div class="spinner"></div>`;
  }

  override render() {
    if (this.tools.length === 0) return nothing;

    return html`
      <div class="tools" role="status" aria-label="Tool calls">
        ${this.tools.map((t, i) => html`
          <div class="tool ${t.status}" style="--tool-index: ${i}"
            role="button" tabindex="0"
            aria-label="${this._humanize(t.name)} — ${t.status}"
            @click=${() => this._handleClick(i)}
            @keydown=${(e: KeyboardEvent) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); this._handleClick(i); } }}>
            <span class="status-icon">${this._renderStatusIcon(t.status)}</span>
            <span class="tool-name">${this._humanize(t.name)}</span>
          </div>
          ${!this.compact && this._expandedIndex === i && t.result ? html`
            <div class="result">${t.result}</div>
          ` : nothing}
        `)}
      </div>
    `;
  }
}
