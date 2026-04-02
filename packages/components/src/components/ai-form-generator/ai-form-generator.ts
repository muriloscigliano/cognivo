/**
 * @element ai-form-generator
 * Dynamic form rendered from a JSON schema with field validation, ideal for LLM-generated forms.
 *
 * @example
 * ```html
 * <ai-form-generator
 *   .schema=${{title:'Feedback', fields:[
 *     {name:'rating', type:'number', label:'Rating', min:1, max:5, required:true},
 *     {name:'comment', type:'textarea', label:'Comment'}
 *   ]}}
 * ></ai-form-generator>
 * ```
 *
 * @fires {CustomEvent<{name, value, values}>} ai-form-change - Field value changed
 * @fires {CustomEvent<{valid, errors}>} ai-form-validate - Validation result after submit attempt
 * @fires {CustomEvent<{values}>} ai-form-submit - Form submitted with all values
 *
 * @cssprop [--cg-brand-ai-accent=#dfff61] - Submit button and focus ring color
 */
import { LitElement, html, css, nothing } from 'lit';
import { property, state, customElement } from 'lit/decorators.js';
import { hostBlock, reducedMotion, fadeSlideInKeyframes } from '../../styles/index.js';

interface FormField {
  name: string;
  type: 'text' | 'email' | 'number' | 'select' | 'checkbox' | 'textarea' | 'date';
  label: string;
  placeholder?: string;
  required?: boolean;
  options?: { value: string; label: string }[];
  min?: number;
  max?: number;
  pattern?: string;
  section?: string;
  default?: string | number | boolean;
}

interface FormSchema {
  title?: string;
  description?: string;
  fields: FormField[];
  submitLabel?: string;
}

@customElement('ai-form-generator')
export class AiFormGenerator extends LitElement {
  static override styles = [hostBlock, reducedMotion, fadeSlideInKeyframes, css`
    :host {
      animation: fadeSlideIn 200ms var(--cg-motion-easing-enter, cubic-bezier(0, 0, 0.2, 1)) both;
    }

    .form {
      background: var(--cg-color-surface-container-background, #18181b);
      border: 1px solid var(--cg-color-surface-container-border, #27272a);
      border-radius: var(--cg-border-radius-150, 12px);
      overflow: hidden;
      box-shadow: inset 0 1px 0 0 rgba(255, 255, 255, 0.05);
      background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0.03), transparent);
    }

    .form-header {
      padding: var(--cg-spacing-12, 12px) var(--cg-spacing-16, 16px);
      border-bottom: 1px solid var(--cg-gray-800, #27272a);
    }
    .form-title { font-size: 16px; font-weight: 700; color: var(--cg-color-surface-base-text, #fafafa); }
    .form-desc { font-size: 12px; color: var(--cg-gray-500, #71717a); margin-top: 4px; }

    .form-body { padding: var(--cg-spacing-16, 16px); display: flex; flex-direction: column; gap: var(--cg-spacing-12, 12px); }

    /* Section */
    .section-label {
      font-size: 11px; font-weight: 700; color: var(--cg-gray-400, #a1a1aa);
      text-transform: uppercase; letter-spacing: 0.05em;
      padding-top: 8px; margin-bottom: -4px;
    }

    /* Field */
    .field { display: flex; flex-direction: column; gap: var(--cg-spacing-4, 4px); }
    .field-label {
      font-size: 12px; font-weight: 600; color: var(--cg-gray-300, #d4d4d8);
    }
    .field-label .required { color: var(--cg-red-400, #f87171); margin-left: 2px; }

    input, select, textarea {
      padding: var(--cg-spacing-8, 8px) var(--cg-spacing-12, 12px); border-radius: var(--cg-border-radius-100, 8px);
      border: 1px solid var(--cg-gray-700, #3f3f46);
      background: var(--cg-color-surface-base-background, #09090b);
      color: var(--cg-color-surface-base-text, #fafafa);
      font: inherit; font-size: var(--cg-font-size-sm, 14px); outline: none;
      transition: border-color 150ms;
    }
    input:focus, select:focus, textarea:focus { border-color: var(--cg-brand-ai-accent, #dfff61); }
    input::placeholder, textarea::placeholder { color: var(--cg-gray-600, #52525b); }
    input.error, select.error, textarea.error { border-color: var(--cg-red-400, #f87171); }
    textarea { min-height: 80px; resize: vertical; }
    select { cursor: pointer; }

    /* Checkbox */
    .checkbox-row {
      display: flex; align-items: center; gap: var(--cg-spacing-8, 8px);
      cursor: pointer;
    }
    .checkbox-row input[type="checkbox"] {
      width: 16px; height: 16px; cursor: pointer;
      accent-color: var(--cg-brand-ai-accent, #dfff61);
    }
    .checkbox-label { font-size: 13px; color: var(--cg-color-surface-base-text, #fafafa); }

    .field-error { font-size: 11px; color: var(--cg-red-400, #f87171); }

    /* Footer */
    .form-footer {
      padding: var(--cg-spacing-12, 12px) var(--cg-spacing-16, 16px);
      border-top: 1px solid var(--cg-gray-800, #27272a);
      display: flex; justify-content: flex-end; gap: var(--cg-spacing-8, 8px);
    }
    .submit-btn {
      padding: var(--cg-spacing-8, 8px) var(--cg-spacing-16, 16px); border-radius: var(--cg-border-radius-100, 8px); border: none;
      background: var(--cg-brand-ai-accent, #dfff61);
      color: #000; font: inherit; font-size: var(--cg-font-size-sm, 14px); font-weight: 700;
      cursor: pointer; transition: all 150ms;
    }
    .submit-btn:hover { filter: brightness(1.1); }
    .submit-btn:disabled { opacity: 0.4; cursor: not-allowed; }

    /* Loading */
    .loading-overlay {
      display: flex; align-items: center; justify-content: center;
      padding: 40px; color: var(--cg-gray-500, #71717a);
    }

    .ai-badge {
      display: inline-flex; align-items: center; gap: var(--cg-spacing-4, 4px);
      font-size: 10px; font-weight: 700; padding: 2px var(--cg-spacing-8, 8px); border-radius: var(--cg-border-radius-50, 4px);
      background: rgba(223, 255, 97, 0.08); color: var(--cg-brand-ai-accent, #dfff61);
      margin-left: 8px;
    }

    .empty { padding: 32px; text-align: center; color: var(--cg-gray-500, #71717a); font-size: 13px; }
    }
  

    :focus-visible {
      outline: none;
      box-shadow: 0 0 0 2px var(--cg-color-surface-base-background, #09090b), 0 0 0 4px var(--cg-brand-ai-accent, #dfff61);
    }
  `];
  @property({ type: Object }) schema: FormSchema | null = null;
  @property({ type: Object }) values: Record<string, unknown> = {};
  @property({ type: Boolean }) loading: boolean = false;

  @state() private _values: Record<string, unknown> = {};
  @state() private _errors: Record<string, string> = {};

  override updated(changed: Map<string, unknown>) {
    if (changed.has('schema') && this.schema) {
      // Init defaults
      const vals: Record<string, unknown> = { ...this.values };
      for (const f of this.schema.fields) {
        if (vals[f.name] === undefined && f.default !== undefined) vals[f.name] = f.default;
      }
      this._values = vals;
      this._errors = {};
    }
    if (changed.has('values')) {
      this._values = { ...this.values };
    }
  }

  private _setValue(name: string, value: unknown) {
    this._values = { ...this._values, [name]: value };
    // Clear error on edit
    if (this._errors[name]) {
      const errs = { ...this._errors };
      delete errs[name];
      this._errors = errs;
    }
    this.dispatchEvent(new CustomEvent('ai-form-change', {
      bubbles: true, composed: true,
      detail: { name, value, values: this._values },
    }));
  }

  private _validate(): boolean {
    if (!this.schema) return false;
    const errors: Record<string, string> = {};

    for (const f of this.schema.fields) {
      const val = this._values[f.name];
      if (f.required && (val === undefined || val === '' || val === null)) {
        errors[f.name] = `${f.label} is required`;
      }
      if (f.type === 'number' && val !== undefined && val !== '') {
        const num = Number(val);
        if (isNaN(num)) errors[f.name] = 'Must be a number';
        else if (f.min !== undefined && num < f.min) errors[f.name] = `Minimum: ${f.min}`;
        else if (f.max !== undefined && num > f.max) errors[f.name] = `Maximum: ${f.max}`;
      }
      if (f.pattern && val) {
        try {
          if (!new RegExp(f.pattern).test(String(val))) {
            errors[f.name] = 'Invalid format';
          }
        } catch {
          // Invalid regex pattern — skip validation
        }
      }
    }

    this._errors = errors;
    this.dispatchEvent(new CustomEvent('ai-form-validate', {
      bubbles: true, composed: true,
      detail: { valid: Object.keys(errors).length === 0, errors },
    }));
    return Object.keys(errors).length === 0;
  }

  private _handleSubmit() {
    if (!this._validate()) return;
    this.dispatchEvent(new CustomEvent('ai-form-submit', {
      bubbles: true, composed: true,
      detail: { values: { ...this._values } },
    }));
  }

  private _renderField(field: FormField) {
    const val = this._values[field.name] ?? '';
    const err = this._errors[field.name];

    if (field.type === 'checkbox') {
      return html`
        <div class="field">
          <label class="checkbox-row">
            <input type="checkbox" .checked=${!!val}
              @change=${(e: Event) => this._setValue(field.name, (e.target as HTMLInputElement).checked)} />
            <span class="checkbox-label">${field.label}</span>
          </label>
          ${err ? html`<span class="field-error">${err}</span>` : nothing}
        </div>
      `;
    }

    if (field.type === 'select') {
      return html`
        <div class="field">
          <label class="field-label">${field.label}${field.required ? html`<span class="required">*</span>` : nothing}</label>
          <select class="${err ? 'error' : ''}" .value=${String(val)}
            aria-invalid="${err ? 'true' : 'false'}"
            @change=${(e: Event) => this._setValue(field.name, (e.target as HTMLSelectElement).value)}>
            <option value="">${field.placeholder || 'Select...'}</option>
            ${(field.options || []).map(o => html`<option value="${o.value}" ?selected=${val === o.value}>${o.label}</option>`)}
          </select>
          ${err ? html`<span class="field-error">${err}</span>` : nothing}
        </div>
      `;
    }

    if (field.type === 'textarea') {
      return html`
        <div class="field">
          <label class="field-label">${field.label}${field.required ? html`<span class="required">*</span>` : nothing}</label>
          <textarea class="${err ? 'error' : ''}" .value=${String(val)}
            placeholder="${field.placeholder || ''}"
            @input=${(e: Event) => this._setValue(field.name, (e.target as HTMLTextAreaElement).value)}></textarea>
          ${err ? html`<span class="field-error">${err}</span>` : nothing}
        </div>
      `;
    }

    return html`
      <div class="field">
        <label class="field-label">${field.label}${field.required ? html`<span class="required">*</span>` : nothing}</label>
        <input type="${field.type}" class="${err ? 'error' : ''}" .value=${String(val)}
          placeholder="${field.placeholder || ''}"
          aria-invalid="${err ? 'true' : 'false'}"
          @input=${(e: Event) => this._setValue(field.name, (e.target as HTMLInputElement).value)} />
        ${err ? html`<span class="field-error">${err}</span>` : nothing}
      </div>
    `;
  }

  override render() {
    if (this.loading) {
      return html`<div class="form"><div class="loading-overlay"><ai-thinking text="Generating form" delay="0"></ai-thinking></div></div>`;
    }

    if (!this.schema || this.schema.fields.length === 0) {
      return html`<div class="form"><div class="empty">No form schema provided</div></div>`;
    }

    // Group by section
    const sections = new Map<string, FormField[]>();
    for (const f of this.schema.fields) {
      const sec = f.section || '';
      if (!sections.has(sec)) sections.set(sec, []);
      sections.get(sec)!.push(f);
    }

    return html`
      <div class="form" role="form" aria-label="${this.schema.title || 'AI-generated form'}">
        ${this.schema.title ? html`
          <div class="form-header">
            <div class="form-title">${this.schema.title}<span class="ai-badge">AI Generated</span></div>
            ${this.schema.description ? html`<div class="form-desc">${this.schema.description}</div>` : nothing}
          </div>
        ` : nothing}

        <div class="form-body">
          ${[...sections.entries()].map(([section, fields]) => html`
            ${section ? html`<div class="section-label">${section}</div>` : nothing}
            ${fields.map(f => this._renderField(f))}
          `)}
        </div>

        <div class="form-footer">
          <button class="submit-btn" @click=${this._handleSubmit}>
            ${this.schema.submitLabel || 'Submit'}
          </button>
        </div>
      </div>
    `;
  }
}
