/**
 * @element ai-tool-indicator
 * Displays LLM tool/function call progress with humanized names,
 * spinner/check/error status icons, and expandable result panels.
 * Supports compact inline mode for embedding in chat messages.
 *
 * @example
 * ```html
 * <ai-tool-indicator .tools=${[
 *   { name: 'web_search', status: 'complete', result: 'Found 3 relevant pages' },
 *   { name: 'code_execution', status: 'loading' }
 * ]}></ai-tool-indicator>
 * ```
 *
 * @prop {ToolCall[]} tools - Array of tool calls with name, status, and optional result
 * @prop {boolean} compact - Inline compact display mode
 *
 * @fires {CustomEvent<{index: number, tool: ToolCall}>} ai-tool-click - When a tool row is clicked
 */
import { LitElement, html, css, nothing } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { hostBlock, reducedMotion, spinKeyframes } from '../../styles/index.js';

interface ToolCall {
  name: string;
  status: 'loading' | 'complete' | 'error';
  result?: string;
}

@customElement('ai-tool-indicator')
export class AiToolIndicator extends LitElement {
  static override styles = [hostBlock, reducedMotion, spinKeyframes, css`

    .tools {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .tool {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 6px 12px;
      border-radius: 8px;
      background: var(--cg-color-surface-container-background, #18181b);
      border: 1px solid var(--cg-color-surface-container-border, #27272a);
      font-size: 12px;
      font-weight: 500;
      color: var(--cg-gray-400, #a1a1aa);
      animation: slideIn 200ms ease;
      cursor: pointer;
      transition: all 150ms;
      box-shadow: inset 0 1px 0 0 rgba(255, 255, 255, 0.05);
      background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0.03), transparent);
    }
    .tool:hover {
      border-color: var(--cg-gray-600, #52525b);
    }

    @keyframes slideIn {
      from { opacity: 0; transform: translateX(-8px); }
      to { opacity: 1; transform: translateX(0); }
    }

    /* Status icon */
    .status-icon {
      width: 16px;
      height: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    /* Spinner */
    .spinner {
      width: 12px;
      height: 12px;
      border: 1.5px solid rgba(223, 255, 97, 0.2);
      border-top-color: var(--cg-brand-ai-accent, #dfff61);
      border-radius: 50%;
      animation: spin 0.7s linear infinite;
    }
    .check { color: var(--cg-green-400, #4ade80); font-size: 14px; }
    .error-icon { color: var(--cg-red-400, #f87171); font-size: 14px; }

    /* Tool icon */
    .tool-icon {
      width: 14px;
      height: 14px;
      color: var(--cg-gray-500, #71717a);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .tool-name {
      flex: 1;
    }
    .tool.complete .tool-name { color: var(--cg-color-surface-base-text, #fafafa); }
    .tool.error .tool-name { color: var(--cg-red-400, #f87171); }

    .duration {
      font-size: 10px;
      color: var(--cg-gray-600, #52525b);
    }

    /* Expanded result */
    .result {
      margin-top: 6px;
      padding: 8px 10px;
      background: var(--cg-color-surface-base-background, #09090b);
      border-radius: 6px;
      font-size: 11px;
      font-family: var(--cg-font-family-mono, 'Fira Code', monospace);
      color: var(--cg-gray-400, #a1a1aa);
      line-height: 1.4;
      white-space: pre-wrap;
      max-height: 120px;
      overflow-y: auto;
    }

    /* Compact mode */
    :host([compact]) .tools { flex-direction: row; flex-wrap: wrap; }
    :host([compact]) .tool { padding: 3px 10px; font-size: 11px; }
    :host([compact]) .result { display: none; }

    :focus-visible {
      outline: none;
      box-shadow: 0 0 0 2px var(--cg-color-surface-base-background, #09090b), 0 0 0 4px var(--cg-brand-ai-accent, #dfff61);
    }
  `];

  /** Tool calls array */
  @property({ type: Array }) tools: ToolCall[] = [];

  /** Compact inline mode */
  @property({ type: Boolean, reflect: true }) compact: boolean = false;

  private _expandedIndex: number = -1;

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
    if (map[name]) return map[name];
    return name.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
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
    if (status === 'complete') return html`<span class="check"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg></span>`;
    if (status === 'error') return html`<span class="error-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg></span>`;
    return html`<div class="spinner"></div>`;
  }

  private _renderToolIcon() {
    return html`
      <div class="tool-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/>
        </svg>
      </div>
    `;
  }

  override render() {
    if (this.tools.length === 0) return nothing;

    return html`
      <div class="tools" role="status" aria-label="Tool calls in progress">
        ${this.tools.map((t, i) => html`
          <div class="tool ${t.status}" @click=${() => this._handleClick(i)}
            role="button" tabindex="0"
            @keydown=${(e: KeyboardEvent) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); this._handleClick(i); } }}>
            <div class="status-icon">${this._renderStatusIcon(t.status)}</div>
            ${this._renderToolIcon()}
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
