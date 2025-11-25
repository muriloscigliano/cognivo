import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

export interface ContentGeneratorOptions {
  tone?: 'professional' | 'casual' | 'formal' | 'friendly';
  length?: 'short' | 'medium' | 'long';
  format?: 'paragraph' | 'bullets' | 'numbered';
}

/**
 * AI Content Generator
 *
 * Generates and refines text content using AI.
 * Supports multiple generation modes, tones, and formats.
 *
 * @element ai-content-generator
 *
 * @fires ai:generate - Fired when generate button is clicked
 * @fires ai:refine - Fired when refine button is clicked
 * @fires ai:content-change - Fired when content changes
 * @fires ai:accept - Fired when content is accepted
 */
@customElement('ai-content-generator')
export class AiContentGenerator extends LitElement {
  static override styles = [
    baseStyles,
    css`
      :host {
        display: block;
        font-family: ${tokens.fontFamily.primary};
      }

      .generator-container {
        background: ${tokens.color.grayWhite};
        border: 1px solid ${tokens.color.gray100};
        border-radius: ${tokens.radius.lg};
        overflow: hidden;
      }

      /* Header */
      .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: ${tokens.spacing.sm} ${tokens.spacing.md};
        background: ${tokens.color.gray50};
        border-bottom: 1px solid ${tokens.color.gray100};
      }

      .title {
        display: flex;
        align-items: center;
        gap: ${tokens.spacing.sm};
        font-size: ${tokens.fontSize.sm};
        font-weight: ${tokens.fontWeight.semibold};
        color: ${tokens.color.gray900};
      }

      .ai-icon {
        width: 20px;
        height: 20px;
        background: ${tokens.color.aiBackground};
        border-radius: ${tokens.radius.sm};
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
      }

      /* Prompt input area */
      .prompt-section {
        padding: ${tokens.spacing.md};
        border-bottom: 1px solid ${tokens.color.gray100};
      }

      .prompt-label {
        font-size: ${tokens.fontSize.xs};
        font-weight: ${tokens.fontWeight.medium};
        color: ${tokens.color.gray500};
        margin-bottom: ${tokens.spacing.xs};
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }

      .prompt-input {
        width: 100%;
        padding: ${tokens.spacing.sm} ${tokens.spacing.md};
        border: 1px solid ${tokens.color.gray200};
        border-radius: ${tokens.radius.md};
        font-size: ${tokens.fontSize.sm};
        font-family: inherit;
        resize: none;
        transition: border-color ${tokens.transition.fast};
      }

      .prompt-input:focus {
        outline: none;
        border-color: ${tokens.color.aiAccent};
      }

      /* Options bar */
      .options-bar {
        display: flex;
        align-items: center;
        gap: ${tokens.spacing.md};
        padding: ${tokens.spacing.sm} ${tokens.spacing.md};
        background: ${tokens.color.gray50};
        border-bottom: 1px solid ${tokens.color.gray100};
        flex-wrap: wrap;
      }

      .option-group {
        display: flex;
        align-items: center;
        gap: ${tokens.spacing.xs};
      }

      .option-label {
        font-size: ${tokens.fontSize.xs};
        color: ${tokens.color.gray500};
      }

      .option-select {
        padding: 4px 8px;
        border: 1px solid ${tokens.color.gray200};
        border-radius: ${tokens.radius.sm};
        font-size: ${tokens.fontSize.xs};
        background: ${tokens.color.grayWhite};
        cursor: pointer;
      }

      .option-select:focus {
        outline: none;
        border-color: ${tokens.color.aiAccent};
      }

      /* Content area */
      .content-section {
        padding: ${tokens.spacing.md};
        min-height: 150px;
      }

      .content-textarea {
        width: 100%;
        min-height: 120px;
        padding: ${tokens.spacing.md};
        border: 1px dashed ${tokens.color.gray200};
        border-radius: ${tokens.radius.md};
        font-size: ${tokens.fontSize.sm};
        font-family: inherit;
        line-height: 1.6;
        resize: vertical;
        transition: all ${tokens.transition.fast};
      }

      .content-textarea:focus {
        outline: none;
        border-style: solid;
        border-color: ${tokens.color.aiAccent};
      }

      .content-textarea.has-content {
        border-style: solid;
      }

      .content-textarea::placeholder {
        color: ${tokens.color.gray400};
      }

      /* Loading state */
      .loading-overlay {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: ${tokens.spacing.xl};
        gap: ${tokens.spacing.md};
        color: ${tokens.color.gray500};
        font-size: ${tokens.fontSize.sm};
      }

      /* Streaming text animation */
      @keyframes blink {
        0%, 100% { opacity: 1; }
        50% { opacity: 0; }
      }

      .streaming-cursor {
        display: inline-block;
        width: 2px;
        height: 1em;
        background: ${tokens.color.aiAccent};
        margin-left: 2px;
        animation: blink 1s infinite;
        vertical-align: text-bottom;
      }

      /* Footer */
      .footer {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: ${tokens.spacing.sm} ${tokens.spacing.md};
        background: ${tokens.color.gray50};
        border-top: 1px solid ${tokens.color.gray100};
      }

      .stats {
        display: flex;
        align-items: center;
        gap: ${tokens.spacing.md};
        font-size: ${tokens.fontSize.xs};
        color: ${tokens.color.gray500};
      }

      .actions {
        display: flex;
        align-items: center;
        gap: ${tokens.spacing.sm};
      }

      .btn {
        display: inline-flex;
        align-items: center;
        gap: ${tokens.spacing.xs};
        padding: ${tokens.spacing.xs} ${tokens.spacing.md};
        border: none;
        border-radius: ${tokens.radius.md};
        font-size: ${tokens.fontSize.sm};
        font-weight: ${tokens.fontWeight.medium};
        cursor: pointer;
        transition: all ${tokens.transition.fast};
      }

      .btn-secondary {
        background: ${tokens.color.grayWhite};
        border: 1px solid ${tokens.color.gray200};
        color: ${tokens.color.gray700};
      }

      .btn-secondary:hover {
        background: ${tokens.color.gray50};
        border-color: ${tokens.color.gray300};
      }

      .btn-primary {
        background: ${tokens.color.aiAccent};
        color: white;
      }

      .btn-primary:hover {
        opacity: 0.9;
      }

      .btn-primary:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }

      .btn-success {
        background: ${tokens.color.success};
        color: white;
      }

      .btn-success:hover {
        opacity: 0.9;
      }

      /* Quick actions */
      .quick-actions {
        display: flex;
        align-items: center;
        gap: ${tokens.spacing.xs};
        padding: ${tokens.spacing.xs} ${tokens.spacing.md};
        border-top: 1px solid ${tokens.color.gray100};
      }

      .quick-action {
        display: inline-flex;
        align-items: center;
        gap: 4px;
        padding: 4px 10px;
        background: ${tokens.color.aiBackground};
        border: 1px solid ${tokens.color.aiBorder};
        border-radius: ${tokens.radius.full};
        font-size: ${tokens.fontSize.xs};
        color: ${tokens.color.aiAccent};
        cursor: pointer;
        transition: all ${tokens.transition.fast};
      }

      .quick-action:hover {
        background: ${tokens.color.aiAccent};
        color: white;
      }
    `
  ];

  @property({ type: String }) prompt = '';
  @property({ type: String }) content = '';
  @property({ type: String }) placeholder = 'Generated content will appear here...';
  @property({ type: Boolean }) loading = false;
  @property({ type: Boolean }) streaming = false;
  @property({ type: Boolean, attribute: 'show-options' }) showOptions = true;
  @property({ type: Boolean, attribute: 'show-quick-actions' }) showQuickActions = true;
  @property({ type: String }) tone: 'professional' | 'casual' | 'formal' | 'friendly' = 'professional';
  @property({ type: String }) length: 'short' | 'medium' | 'long' = 'medium';
  @property({ type: String }) format: 'paragraph' | 'bullets' | 'numbered' = 'paragraph';

  @state() private wordCount = 0;
  @state() private charCount = 0;

  private handlePromptInput(e: InputEvent) {
    const target = e.target as HTMLTextAreaElement;
    this.prompt = target.value;
  }

  private handleContentInput(e: InputEvent) {
    const target = e.target as HTMLTextAreaElement;
    this.content = target.value;
    this.updateStats();

    this.dispatchEvent(new CustomEvent('ai:content-change', {
      detail: { content: this.content },
      bubbles: true,
      composed: true
    }));
  }

  private updateStats() {
    this.charCount = this.content.length;
    this.wordCount = this.content.trim() ? this.content.trim().split(/\s+/).length : 0;
  }

  private handleGenerate() {
    this.dispatchEvent(new CustomEvent('ai:generate', {
      detail: {
        prompt: this.prompt,
        options: {
          tone: this.tone,
          length: this.length,
          format: this.format
        }
      },
      bubbles: true,
      composed: true
    }));
  }

  private handleRefine(action: string) {
    this.dispatchEvent(new CustomEvent('ai:refine', {
      detail: {
        action,
        content: this.content,
        options: {
          tone: this.tone,
          length: this.length,
          format: this.format
        }
      },
      bubbles: true,
      composed: true
    }));
  }

  private handleAccept() {
    this.dispatchEvent(new CustomEvent('ai:accept', {
      detail: { content: this.content },
      bubbles: true,
      composed: true
    }));
  }

  private handleClear() {
    this.content = '';
    this.updateStats();
  }

  override updated(changedProperties: Map<string, unknown>) {
    if (changedProperties.has('content')) {
      this.updateStats();
    }
  }

  override render() {
    return html`
      <div class="generator-container">
        <div class="header">
          <div class="title">
            <div class="ai-icon">✨</div>
            <span>AI Content Generator</span>
          </div>
        </div>

        <div class="prompt-section">
          <div class="prompt-label">What would you like to create?</div>
          <textarea
            class="prompt-input"
            rows="2"
            placeholder="Describe the content you want to generate..."
            .value=${this.prompt}
            @input=${this.handlePromptInput}
          ></textarea>
        </div>

        ${this.showOptions ? html`
          <div class="options-bar">
            <div class="option-group">
              <span class="option-label">Tone:</span>
              <select
                class="option-select"
                .value=${this.tone}
                @change=${(e: Event) => this.tone = (e.target as HTMLSelectElement).value as typeof this.tone}
              >
                <option value="professional">Professional</option>
                <option value="casual">Casual</option>
                <option value="formal">Formal</option>
                <option value="friendly">Friendly</option>
              </select>
            </div>
            <div class="option-group">
              <span class="option-label">Length:</span>
              <select
                class="option-select"
                .value=${this.length}
                @change=${(e: Event) => this.length = (e.target as HTMLSelectElement).value as typeof this.length}
              >
                <option value="short">Short</option>
                <option value="medium">Medium</option>
                <option value="long">Long</option>
              </select>
            </div>
            <div class="option-group">
              <span class="option-label">Format:</span>
              <select
                class="option-select"
                .value=${this.format}
                @change=${(e: Event) => this.format = (e.target as HTMLSelectElement).value as typeof this.format}
              >
                <option value="paragraph">Paragraph</option>
                <option value="bullets">Bullet Points</option>
                <option value="numbered">Numbered List</option>
              </select>
            </div>
          </div>
        ` : null}

        <div class="content-section">
          ${this.loading ? html`
            <div class="loading-overlay">
              <ai-thinking-indicator size="md"></ai-thinking-indicator>
              <span>Generating content...</span>
            </div>
          ` : html`
            <textarea
              class="content-textarea ${this.content ? 'has-content' : ''}"
              placeholder=${this.placeholder}
              .value=${this.content}
              @input=${this.handleContentInput}
            ></textarea>
            ${this.streaming ? html`<span class="streaming-cursor"></span>` : null}
          `}
        </div>

        ${this.content && this.showQuickActions ? html`
          <div class="quick-actions">
            <button class="quick-action" @click=${() => this.handleRefine('shorten')}>
              ✂️ Shorten
            </button>
            <button class="quick-action" @click=${() => this.handleRefine('expand')}>
              📝 Expand
            </button>
            <button class="quick-action" @click=${() => this.handleRefine('rephrase')}>
              🔄 Rephrase
            </button>
            <button class="quick-action" @click=${() => this.handleRefine('simplify')}>
              💡 Simplify
            </button>
            <button class="quick-action" @click=${() => this.handleRefine('formalize')}>
              👔 Formalize
            </button>
          </div>
        ` : null}

        <div class="footer">
          <div class="stats">
            <span>${this.wordCount} words</span>
            <span>${this.charCount} characters</span>
          </div>
          <div class="actions">
            ${this.content ? html`
              <button class="btn btn-secondary" @click=${this.handleClear}>Clear</button>
              <button class="btn btn-success" @click=${this.handleAccept}>Accept</button>
            ` : null}
            <button
              class="btn btn-primary"
              ?disabled=${!this.prompt || this.loading}
              @click=${this.handleGenerate}
            >
              <span>✨</span>
              Generate
            </button>
          </div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ai-content-generator': AiContentGenerator;
  }
}
