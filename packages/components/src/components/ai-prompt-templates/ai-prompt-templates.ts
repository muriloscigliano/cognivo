import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

export interface TemplateVariable {
  name: string;
  placeholder: string;
  description?: string;
  type?: 'text' | 'select' | 'number';
  options?: string[];
  default?: string;
  required?: boolean;
}

export interface PromptTemplate {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  category?: string;
  template: string;
  variables: TemplateVariable[];
  example?: string;
}

/**
 * AI Prompt Templates
 *
 * Shape of AI Pattern: Wayfinder > Templates
 *
 * Structured templates that can be filled by the user or pre-filled by AI.
 * Solves the blank canvas dilemma with clues for how to prompt.
 *
 * @element ai-prompt-templates
 *
 * @fires ai:template-select - Fired when a template is selected
 * @fires ai:template-submit - Fired when template is submitted with values
 * @fires ai:template-preview - Fired when preview is generated
 */
@customElement('ai-prompt-templates')
export class AiPromptTemplates extends LitElement {
  static override styles = [
    baseStyles,
    css`
      :host {
        display: block;
        font-family: ${tokens.fontFamily.primary};
      }

      .container {
        background: ${tokens.color.grayWhite};
        border: 1px solid ${tokens.color.gray100};
        border-radius: ${tokens.radius.xl};
        overflow: hidden;
      }

      /* Header */
      .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: ${tokens.spacing.md} ${tokens.spacing.lg};
        border-bottom: 1px solid ${tokens.color.gray100};
        background: ${tokens.color.gray50};
      }

      .header-left {
        display: flex;
        align-items: center;
        gap: ${tokens.spacing.sm};
      }

      .title {
        font-size: ${tokens.fontSize.md};
        font-weight: ${tokens.fontWeight.semibold};
        color: ${tokens.color.gray900};
      }

      .ai-badge {
        display: inline-flex;
        align-items: center;
        gap: 4px;
        padding: 3px 8px;
        background: ${tokens.color.aiBackground};
        border: 1px solid ${tokens.color.aiBorder};
        border-radius: ${tokens.radius.full};
        font-size: 10px;
        font-weight: ${tokens.fontWeight.semibold};
        color: ${tokens.color.aiAccent};
      }

      /* Template list */
      .template-list {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        gap: ${tokens.spacing.sm};
        padding: ${tokens.spacing.md};
      }

      .template-card {
        display: flex;
        flex-direction: column;
        gap: ${tokens.spacing.xs};
        padding: ${tokens.spacing.md};
        background: ${tokens.color.grayWhite};
        border: 1px solid ${tokens.color.gray100};
        border-radius: ${tokens.radius.lg};
        cursor: pointer;
        transition: all ${tokens.transition.fast};
      }

      .template-card:hover {
        border-color: ${tokens.color.aiAccent};
        background: ${tokens.color.aiBackground};
      }

      .template-card.selected {
        border-color: ${tokens.color.aiAccent};
        background: ${tokens.color.aiBackground};
        box-shadow: 0 0 0 2px ${tokens.color.aiBorder};
      }

      .template-icon {
        font-size: 24px;
        margin-bottom: ${tokens.spacing.xs};
      }

      .template-name {
        font-size: ${tokens.fontSize.sm};
        font-weight: ${tokens.fontWeight.semibold};
        color: ${tokens.color.gray900};
      }

      .template-description {
        font-size: ${tokens.fontSize.xs};
        color: ${tokens.color.gray500};
        line-height: 1.4;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }

      .template-category {
        font-size: 10px;
        color: ${tokens.color.gray400};
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }

      /* Form section */
      .form-section {
        padding: ${tokens.spacing.lg};
        border-top: 1px solid ${tokens.color.gray100};
        display: none;
      }

      .form-section.active {
        display: block;
      }

      .form-header {
        display: flex;
        align-items: center;
        gap: ${tokens.spacing.sm};
        margin-bottom: ${tokens.spacing.md};
      }

      .form-title {
        font-size: ${tokens.fontSize.md};
        font-weight: ${tokens.fontWeight.semibold};
        color: ${tokens.color.gray900};
      }

      .back-btn {
        display: inline-flex;
        align-items: center;
        gap: 4px;
        padding: 4px 8px;
        background: none;
        border: none;
        border-radius: ${tokens.radius.sm};
        font-size: ${tokens.fontSize.xs};
        color: ${tokens.color.gray500};
        cursor: pointer;
        transition: all ${tokens.transition.fast};
      }

      .back-btn:hover {
        background: ${tokens.color.gray100};
        color: ${tokens.color.gray700};
      }

      /* Form fields */
      .form-fields {
        display: flex;
        flex-direction: column;
        gap: ${tokens.spacing.md};
      }

      .field {
        display: flex;
        flex-direction: column;
        gap: ${tokens.spacing.xs};
      }

      .field-label {
        display: flex;
        align-items: center;
        gap: ${tokens.spacing.xs};
        font-size: ${tokens.fontSize.sm};
        font-weight: ${tokens.fontWeight.medium};
        color: ${tokens.color.gray700};
      }

      .required {
        color: #ef4444;
      }

      .field-description {
        font-size: ${tokens.fontSize.xs};
        color: ${tokens.color.gray500};
      }

      .field-input {
        padding: ${tokens.spacing.sm} ${tokens.spacing.md};
        border: 1px solid ${tokens.color.gray200};
        border-radius: ${tokens.radius.md};
        font-size: ${tokens.fontSize.sm};
        font-family: inherit;
        transition: all ${tokens.transition.fast};
      }

      .field-input:focus {
        outline: none;
        border-color: ${tokens.color.aiAccent};
        box-shadow: 0 0 0 2px ${tokens.color.aiBackground};
      }

      .field-select {
        padding: ${tokens.spacing.sm} ${tokens.spacing.md};
        border: 1px solid ${tokens.color.gray200};
        border-radius: ${tokens.radius.md};
        font-size: ${tokens.fontSize.sm};
        font-family: inherit;
        background: ${tokens.color.grayWhite};
        cursor: pointer;
      }

      /* Preview section */
      .preview-section {
        margin-top: ${tokens.spacing.lg};
        padding: ${tokens.spacing.md};
        background: ${tokens.color.gray50};
        border: 1px solid ${tokens.color.gray100};
        border-radius: ${tokens.radius.md};
      }

      .preview-label {
        display: flex;
        align-items: center;
        gap: ${tokens.spacing.xs};
        font-size: ${tokens.fontSize.xs};
        font-weight: ${tokens.fontWeight.semibold};
        color: ${tokens.color.gray500};
        text-transform: uppercase;
        letter-spacing: 0.05em;
        margin-bottom: ${tokens.spacing.sm};
      }

      .preview-content {
        font-size: ${tokens.fontSize.sm};
        color: ${tokens.color.gray700};
        line-height: 1.6;
        white-space: pre-wrap;
      }

      .variable-highlight {
        background: ${tokens.color.aiBackground};
        color: ${tokens.color.aiAccent};
        padding: 2px 6px;
        border-radius: ${tokens.radius.sm};
        font-weight: ${tokens.fontWeight.medium};
      }

      /* Actions */
      .actions {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: ${tokens.spacing.sm};
        margin-top: ${tokens.spacing.lg};
        padding-top: ${tokens.spacing.md};
        border-top: 1px solid ${tokens.color.gray100};
      }

      .btn {
        display: inline-flex;
        align-items: center;
        gap: ${tokens.spacing.xs};
        padding: ${tokens.spacing.sm} ${tokens.spacing.lg};
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

      /* Empty state */
      .empty-state {
        padding: ${tokens.spacing.xl};
        text-align: center;
        color: ${tokens.color.gray500};
      }
    `
  ];

  @property({ type: Array }) templates: PromptTemplate[] = [];
  @property({ type: String }) title = 'Prompt Templates';

  @state() private selectedTemplate: PromptTemplate | null = null;
  @state() private variableValues: Record<string, string> = {};

  private handleTemplateSelect(template: PromptTemplate) {
    this.selectedTemplate = template;
    this.variableValues = {};

    // Initialize default values
    template.variables.forEach(v => {
      if (v.default) {
        this.variableValues[v.name] = v.default;
      }
    });

    this.dispatchEvent(new CustomEvent('ai:template-select', {
      detail: { template },
      bubbles: true,
      composed: true
    }));
  }

  private handleBack() {
    this.selectedTemplate = null;
    this.variableValues = {};
  }

  private handleVariableChange(name: string, value: string) {
    this.variableValues = { ...this.variableValues, [name]: value };
    this.requestUpdate();
  }

  private generatePrompt(): string {
    if (!this.selectedTemplate) return '';

    let prompt = this.selectedTemplate.template;

    Object.entries(this.variableValues).forEach(([name, value]) => {
      const regex = new RegExp(`\\{\\{${name}\\}\\}`, 'g');
      prompt = prompt.replace(regex, value || `[${name}]`);
    });

    return prompt;
  }

  private isFormValid(): boolean {
    if (!this.selectedTemplate) return false;

    return this.selectedTemplate.variables
      .filter(v => v.required)
      .every(v => this.variableValues[v.name]?.trim());
  }

  private handleSubmit() {
    if (!this.selectedTemplate || !this.isFormValid()) return;

    const prompt = this.generatePrompt();

    this.dispatchEvent(new CustomEvent('ai:template-submit', {
      detail: {
        template: this.selectedTemplate,
        values: this.variableValues,
        prompt
      },
      bubbles: true,
      composed: true
    }));
  }

  private renderPreview(): string {
    if (!this.selectedTemplate) return '';

    let preview = this.selectedTemplate.template;

    this.selectedTemplate.variables.forEach(v => {
      const value = this.variableValues[v.name];
      const regex = new RegExp(`\\{\\{${v.name}\\}\\}`, 'g');

      if (value) {
        preview = preview.replace(regex, value);
      } else {
        preview = preview.replace(regex, `<span class="variable-highlight">${v.placeholder}</span>`);
      }
    });

    return preview;
  }

  override render() {
    return html`
      <div class="container">
        <div class="header">
          <div class="header-left">
            <span class="title">${this.title}</span>
            <span class="ai-badge">
              <span>✨</span>
              <span>AI</span>
            </span>
          </div>
        </div>

        ${!this.selectedTemplate ? html`
          <div class="template-list">
            ${this.templates.length > 0 ? this.templates.map(template => html`
              <div
                class="template-card"
                @click=${() => this.handleTemplateSelect(template)}
              >
                ${template.icon ? html`<div class="template-icon">${template.icon}</div>` : null}
                <div class="template-name">${template.name}</div>
                ${template.description ? html`
                  <div class="template-description">${template.description}</div>
                ` : null}
                ${template.category ? html`
                  <div class="template-category">${template.category}</div>
                ` : null}
              </div>
            `) : html`
              <div class="empty-state" style="grid-column: 1 / -1;">
                No templates available
              </div>
            `}
          </div>
        ` : html`
          <div class="form-section active">
            <div class="form-header">
              <button class="back-btn" @click=${this.handleBack}>
                ← Back
              </button>
              <span class="form-title">${this.selectedTemplate.name}</span>
            </div>

            <div class="form-fields">
              ${this.selectedTemplate.variables.map(variable => html`
                <div class="field">
                  <label class="field-label">
                    ${variable.name}
                    ${variable.required ? html`<span class="required">*</span>` : null}
                  </label>
                  ${variable.description ? html`
                    <span class="field-description">${variable.description}</span>
                  ` : null}

                  ${variable.type === 'select' && variable.options ? html`
                    <select
                      class="field-select"
                      .value=${this.variableValues[variable.name] || ''}
                      @change=${(e: Event) => this.handleVariableChange(variable.name, (e.target as HTMLSelectElement).value)}
                    >
                      <option value="">${variable.placeholder}</option>
                      ${variable.options.map(opt => html`
                        <option value=${opt}>${opt}</option>
                      `)}
                    </select>
                  ` : html`
                    <input
                      type=${variable.type === 'number' ? 'number' : 'text'}
                      class="field-input"
                      placeholder=${variable.placeholder}
                      .value=${this.variableValues[variable.name] || ''}
                      @input=${(e: Event) => this.handleVariableChange(variable.name, (e.target as HTMLInputElement).value)}
                    />
                  `}
                </div>
              `)}
            </div>

            <div class="preview-section">
              <div class="preview-label">
                <span>👁️</span>
                <span>Preview</span>
              </div>
              <div class="preview-content" .innerHTML=${this.renderPreview()}></div>
            </div>

            <div class="actions">
              <button class="btn btn-secondary" @click=${this.handleBack}>Cancel</button>
              <button
                class="btn btn-primary"
                ?disabled=${!this.isFormValid()}
                @click=${this.handleSubmit}
              >
                <span>✨</span>
                Use this prompt
              </button>
            </div>
          </div>
        `}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ai-prompt-templates': AiPromptTemplates;
  }
}
