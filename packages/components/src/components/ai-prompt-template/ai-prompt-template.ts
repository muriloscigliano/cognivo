/**
 * @element ai-prompt-template
 * Prompt template editor with {{variable}} highlighting, inline variable
 * inputs, and edit/preview toggle. Variables are auto-detected from the
 * template string and rendered as editable fields.
 *
 * @example
 * ```html
 * <ai-prompt-template
 *   template="Summarize {{topic}} for a {{audience}} audience."
 *   .variables=${{ topic: 'quantum computing', audience: 'beginner' }}
 *   editable
 * ></ai-prompt-template>
 * ```
 *
 * @prop {string} template - Template string with {{variable}} placeholders
 * @prop {Record<string, string>} variables - Variable name-to-value map
 * @prop {boolean} editable - Allow editing the template and variables (default true)
 *
 * @fires {CustomEvent<{template: string}>} ai-template-change - When the template text changes
 * @fires {CustomEvent<{variable: string, value: string}>} ai-template-variable-change - When a variable value changes
 */
import { LitElement, html, css, nothing } from 'lit';
import { property, state, customElement } from 'lit/decorators.js';
import { hostBlock, reducedMotion, fadeSlideInKeyframes } from '../../styles/index.js';

@customElement('ai-prompt-template')
export class AiPromptTemplate extends LitElement {
  static override styles = [hostBlock, reducedMotion, fadeSlideInKeyframes, css`
    :host {
      animation: fadeSlideIn var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
    }
    :host([hidden]) { display: none; }

    .container {
      background: var(--cg-color-surface-container-background);
      border: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
      border-radius: var(--cg-border-radius-150);
      padding: var(--cg-spacing-16);
      color: var(--cg-color-surface-base-text);
    }

    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: var(--cg-spacing-12);
    }

    .title {
      font-size: var(--cg-font-size-sm);
      font-weight: var(--cg-font-weight-semibold);
    }

    .mode-toggle {
      display: flex;
      gap: var(--cg-spacing-4);
    }

    .mode-btn {
      background: transparent;
      border: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
      color: var(--cg-color-input-text-placeholder);
      font-size: var(--cg-font-size-xs);
      padding: var(--cg-spacing-4) var(--cg-spacing-8);
      border-radius: var(--cg-border-radius-100);
      cursor: pointer;
      transition: border-color var(--cg-transition-duration-fast) var(--cg-transition-easing-default), color var(--cg-transition-duration-fast) var(--cg-transition-easing-default), background var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
    }
    .mode-btn:active { transform: scale(var(--cg-interaction-press-scale)); }
    .mode-btn.active {
      background: var(--cg-color-action-primary-background-default);
      color: var(--cg-color-surface-container-background);
      border-color: var(--cg-color-surface-base-text);
      font-weight: var(--cg-font-weight-semibold);
    }
    .mode-btn:hover:not(.active) { border-color: var(--cg-color-surface-cards-border); color: var(--cg-color-input-text-placeholder); }
    .mode-btn:focus-visible {
      outline: none;
      box-shadow: 0 0 0 3px var(--cg-overlay-accent-strong);
    }

    /* ── Template editor area ── */
    .template-area {
      background: var(--cg-color-surface-base-background);
      border: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
      border-radius: var(--cg-border-radius-100);
      padding: var(--cg-spacing-16);
      min-height: 80px;
      font-size: var(--cg-font-size-sm);
      line-height: 1.7;
      color: var(--cg-color-input-text-placeholder);
      white-space: pre-wrap;
      word-break: break-word;
    }

    .template-textarea {
      background: var(--cg-color-surface-base-background);
      border: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
      border-radius: var(--cg-border-radius-100);
      padding: var(--cg-spacing-16);
      min-height: 80px;
      width: 100%;
      box-sizing: border-box;
      font-size: var(--cg-font-size-sm);
      font-family: var(--cg-font-family-mono);
      line-height: 1.7;
      color: var(--cg-color-input-text-placeholder);
      resize: vertical;
    }
    .template-textarea:focus-visible {
      outline: 2px solid var(--cg-overlay-accent-strong);
      outline-offset: -2px;
    }

    .var-highlight {
      background: var(--cg-overlay-accent-subtle);
      color: var(--cg-color-surface-base-text);
      padding: var(--cg-spacing-1) var(--cg-spacing-4);
      border-radius: var(--cg-border-radius-50);
      font-weight: var(--cg-font-weight-semibold);
      font-family: var(--cg-font-family-mono);
      font-size: var(--cg-font-size-xs);
    }

    .var-value {
      color: var(--cg-color-status-success-text-default);
      font-weight: var(--cg-font-weight-semibold);
    }

    /* ── Variables panel ── */
    .variables-section {
      margin-top: var(--cg-spacing-12);
    }

    .variables-title {
      font-size: var(--cg-font-size-xs);
      font-weight: var(--cg-font-weight-semibold);
      color: var(--cg-color-input-text-placeholder);
      margin-bottom: var(--cg-spacing-8);
    }

    .variable-row {
      display: flex;
      align-items: center;
      gap: var(--cg-spacing-8);
      margin-bottom: var(--cg-spacing-6);
    }

    .var-name {
      font-size: var(--cg-font-size-xs);
      font-weight: var(--cg-font-weight-semibold);
      color: var(--cg-color-surface-base-text);
      font-family: var(--cg-font-family-mono);
      min-width: var(--cg-spacing-96);
    }

    .var-input {
      flex: 1;
      background: var(--cg-color-surface-base-background);
      border: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
      color: var(--cg-color-surface-base-text);
      font-size: var(--cg-font-size-xs);
      padding: var(--cg-spacing-6) var(--cg-spacing-8);
      border-radius: var(--cg-border-radius-100);
      font-family: inherit;
    }
    .var-input:focus-visible {
      outline: 2px solid var(--cg-overlay-accent-strong);
      outline-offset: -2px;
    }
    .var-input:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .empty-state {
      text-align: center;
      color: var(--cg-color-input-border-hover);
      font-size: var(--cg-font-size-sm);
      padding: var(--cg-spacing-16) 0;
    }

    /* ── Rounded variants ── */
    :host([rounded="none"]) .container { border-radius: 0; }
    :host([rounded="sm"]) .container { border-radius: var(--cg-border-radius-50); }
    :host([rounded="md"]) .container { border-radius: var(--cg-border-radius-100); }
    :host([rounded="lg"]) .container { border-radius: var(--cg-border-radius-150); }
    :host([rounded="full"]) .container { border-radius: var(--cg-border-radius-full); }
  `];

  @property({ reflect: true }) rounded: 'none' | 'sm' | 'md' | 'lg' | 'full' = 'lg';
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
      parts.push({ varName: match[1]! });
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
