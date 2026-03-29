/**
 * <ai-prompt-template> — Prompt template editor with variable slots
 *
 * Props: template, variables, editable
 * Events: ai-template-change, ai-template-variable-change
 * Features: Highlights {{variables}} in lime, inline inputs, preview mode
 */
import { LitElement, html, css, nothing } from 'lit';
import { property, state, customElement } from 'lit/decorators.js';

@customElement('ai-prompt-template')
export class AiPromptTemplate extends LitElement {
  static override styles = css`
    :host {
      transition: color var(--cg-motion-duration-fast, 80ms) var(--cg-motion-easing-color, cubic-bezier(0, 0, 0.58, 1));
      display: block;
      font-family: var(--cg-font-family-primary, 'Inter Variable', 'Inter', -apple-system, sans-serif);
    }
    :host([hidden]) { display: none; }

    .container {
      background: #18181b;
      border: 1px solid #27272a;
      border-radius: 12px;
      padding: 20px;
      color: #fafafa;
    }

    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 12px;
    }

    .title {
      font-size: 14px;
      font-weight: 600;
    }

    .mode-toggle {
      display: flex;
      gap: 4px;
    }

    .mode-btn {
      background: transparent;
      border: 1px solid #27272a;
      color: #71717a;
      font-size: 11px;
      padding: 4px 10px;
      border-radius: 6px;
      cursor: pointer;
      transition: all 150ms ease;
    }
    .mode-btn.active {
      background: #dfff61;
      color: #18181b;
      border-color: #dfff61;
      font-weight: 600;
    }
    .mode-btn:hover:not(.active) { border-color: #3f3f46; color: #a1a1aa; }
    .mode-btn:focus-visible {
      outline: 2px solid #dfff61;
      outline-offset: 2px;
    }

    /* ── Template editor area ── */
    .template-area {
      background: #09090b;
      border: 1px solid #27272a;
      border-radius: 8px;
      padding: 16px;
      min-height: 80px;
      font-size: 13px;
      line-height: 1.7;
      color: #d4d4d8;
      white-space: pre-wrap;
      word-break: break-word;
    }

    .template-textarea {
      background: #09090b;
      border: 1px solid #27272a;
      border-radius: 8px;
      padding: 16px;
      min-height: 80px;
      width: 100%;
      box-sizing: border-box;
      font-size: 13px;
      font-family: var(--cg-font-family-mono, 'Fira Code', monospace);
      line-height: 1.7;
      color: #d4d4d8;
      resize: vertical;
    }
    .template-textarea:focus-visible {
      outline: 2px solid #dfff61;
      outline-offset: -2px;
    }

    .var-highlight {
      background: rgba(223, 255, 97, 0.15);
      color: #dfff61;
      padding: 1px 4px;
      border-radius: 3px;
      font-weight: 600;
      font-family: var(--cg-font-family-mono, 'Fira Code', monospace);
      font-size: 12px;
    }

    .var-value {
      color: #22c55e;
      font-weight: 600;
    }

    /* ── Variables panel ── */
    .variables-section {
      margin-top: 14px;
    }

    .variables-title {
      font-size: 12px;
      font-weight: 600;
      color: #a1a1aa;
      margin-bottom: 8px;
    }

    .variable-row {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 6px;
    }

    .var-name {
      font-size: 12px;
      font-weight: 600;
      color: #dfff61;
      font-family: var(--cg-font-family-mono, 'Fira Code', monospace);
      min-width: 100px;
    }

    .var-input {
      flex: 1;
      background: #09090b;
      border: 1px solid #27272a;
      color: #fafafa;
      font-size: 12px;
      padding: 6px 10px;
      border-radius: 6px;
      font-family: inherit;
    }
    .var-input:focus-visible {
      outline: 2px solid #dfff61;
      outline-offset: -2px;
    }
    .var-input:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .empty-state {
      text-align: center;
      color: #52525b;
      font-size: 13px;
      padding: 20px 0;
    }

    @media (prefers-reduced-motion: reduce) {
      .mode-btn { transition: none; }
    }
  `;

  @property({ type: String }) template = '';
  @property({ type: Object }) variables: Record<string, string> = {};
  @property({ type: Boolean }) editable = true;

  @state() private _mode: 'edit' | 'preview' = 'edit';

  private get _templateVars(): string[] {
    const matches = this.template.match(/\{\{(\w+)\}\}/g) || [];
    return [...new Set(matches.map(m => m.replace(/\{\{|\}\}/g, '')))];
  }

  private _renderHighlightedTemplate() {
    const parts: (string | { varName: string })[] = [];
    let remaining = this.template;
    const regex = /\{\{(\w+)\}\}/g;
    let match: RegExpExecArray | null;
    let lastIndex = 0;

    regex.lastIndex = 0;
    while ((match = regex.exec(remaining)) !== null) {
      if (match.index > lastIndex) {
        parts.push(remaining.slice(lastIndex, match.index));
      }
      parts.push({ varName: match[1] });
      lastIndex = regex.lastIndex;
    }
    if (lastIndex < remaining.length) {
      parts.push(remaining.slice(lastIndex));
    }

    return parts.map(p => {
      if (typeof p === 'string') return p;
      if (this._mode === 'preview' && this.variables[p.varName]) {
        return html`<span class="var-value">${this.variables[p.varName]}</span>`;
      }
      return html`<span class="var-highlight">{{${p.varName}}}</span>`;
    });
  }

  private _handleTemplateChange(e: Event) {
    const value = (e.target as HTMLTextAreaElement).value;
    this.dispatchEvent(new CustomEvent('ai-template-change', {
      detail: { template: value },
      bubbles: true,
      composed: true,
    }));
  }

  private _handleVariableChange(varName: string, value: string) {
    this.dispatchEvent(new CustomEvent('ai-template-variable-change', {
      detail: { variable: varName, value },
      bubbles: true,
      composed: true,
    }));
  }

  override render() {
    return html`
      <div class="container" role="region" aria-label="Prompt template editor">
        <div class="header">
          <span class="title">Prompt Template</span>
          <div class="mode-toggle" role="radiogroup" aria-label="View mode">
            <button
              class="mode-btn ${this._mode === 'edit' ? 'active' : ''}"
              role="radio"
              aria-checked=${this._mode === 'edit' ? 'true' : 'false'}
              @click=${() => { this._mode = 'edit'; }}
              tabindex="0"
            >Edit</button>
            <button
              class="mode-btn ${this._mode === 'preview' ? 'active' : ''}"
              role="radio"
              aria-checked=${this._mode === 'preview' ? 'true' : 'false'}
              @click=${() => { this._mode = 'preview'; }}
              tabindex="0"
            >Preview</button>
          </div>
        </div>

        ${this._mode === 'edit' && this.editable ? html`
          <textarea
            class="template-textarea"
            .value=${this.template}
            @input=${this._handleTemplateChange}
            aria-label="Template content"
            rows="4"
          ></textarea>
        ` : html`
          <div class="template-area" role="document" aria-label="Template preview">
            ${this.template ? this._renderHighlightedTemplate() : html`<span class="empty-state">No template defined</span>`}
          </div>
        `}

        ${this._templateVars.length > 0 ? html`
          <div class="variables-section">
            <div class="variables-title">Variables (${this._templateVars.length})</div>
            ${this._templateVars.map(v => html`
              <div class="variable-row">
                <span class="var-name">{{${v}}}</span>
                <input
                  class="var-input"
                  type="text"
                  .value=${this.variables[v] || ''}
                  ?disabled=${!this.editable}
                  placeholder="Enter value..."
                  aria-label="Value for variable ${v}"
                  @input=${(e: Event) => this._handleVariableChange(v, (e.target as HTMLInputElement).value)}
                />
              </div>
            `)}
          </div>
        ` : nothing}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ai-prompt-template': AiPromptTemplate;
  }
}
