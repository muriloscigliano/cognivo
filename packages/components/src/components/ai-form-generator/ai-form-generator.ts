/**
 * @element ai-form-generator
 * Dynamic form from AI-generated JSON schema using Cognivo design system components.
 *
 * @fires {CustomEvent<{values}>} ai-form-submit
 * @fires {CustomEvent<{name, value, values}>} ai-form-change
 * @fires {CustomEvent<{valid, errors}>} ai-form-validate
 */
import { LitElement, html, css, nothing } from 'lit';
import { property, state, customElement } from 'lit/decorators.js';
import { hostBlock, reducedMotion } from '../../styles/index.js';
import '../cg-input/cg-input.js';
import '../cg-textarea/cg-textarea.js';
import '../cg-select/cg-select.js';
import '../cg-checkbox/cg-checkbox.js';
import '../cg-button/cg-button.js';

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
  static override styles = [hostBlock, reducedMotion, css`
    :host { display: block; }

    .form {
      background: var(--cg-color-surface-cards-background);
      border: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
      border-radius: var(--cg-component-card-radius);
      overflow: hidden;
    }

    .form-header {
      padding: var(--cg-spacing-20) var(--cg-spacing-24) var(--cg-spacing-12);
    }
    .form-title {
      font-size: var(--cg-font-size-sm);
      font-weight: var(--cg-font-weight-semibold);
      color: var(--cg-color-surface-base-text);
    }
    .form-desc {
      font-size: var(--cg-font-size-xs);
      color: var(--cg-color-input-text-placeholder);
      margin-top: var(--cg-spacing-4);
    }

    .form-body {
      padding: var(--cg-spacing-8) var(--cg-spacing-24) var(--cg-spacing-16);
      display: flex;
      flex-direction: column;
      gap: var(--cg-spacing-16);
      overflow: hidden;
    }
    .form-body > * {
      min-width: 0;
    }

    .section-label {
      font-size: var(--cg-font-size-xs);
      font-weight: var(--cg-font-weight-medium);
      color: var(--cg-color-input-text-placeholder);
      text-transform: uppercase;
      letter-spacing: var(--cg-letter-spacing-wide);
      padding-top: var(--cg-spacing-8);
    }

    .form-footer {
      padding: var(--cg-spacing-16) var(--cg-spacing-24);
    }

    .loading-overlay {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: var(--cg-spacing-48);
      color: var(--cg-color-input-text-placeholder);
    }

    .empty {
      padding: var(--cg-spacing-32);
      text-align: center;
      color: var(--cg-color-input-text-placeholder);
      font-size: var(--cg-font-size-sm);
    }
  `];

  @property({ type: Object }) schema: FormSchema | null = null;
  @property({ type: Object }) values: Record<string, unknown> = {};
  @property({ type: Boolean }) loading = false;

  @state() private _values: Record<string, unknown> = {};
  @state() private _errors: Record<string, string> = {};

  override updated(changed: Map<string, unknown>) {
    if (changed.has('schema') && this.schema) {
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
          if (!new RegExp(f.pattern).test(String(val))) errors[f.name] = 'Invalid format';
        } catch { /* skip */ }
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
        <cg-checkbox
          label="${field.label}"
          ?checked=${!!val}
          @cg-change=${(e: CustomEvent) => this._setValue(field.name, e.detail.checked)}
        ></cg-checkbox>
      `;
    }

    if (field.type === 'select') {
      return html`
        <cg-select
          label="${field.label}"
          placeholder="${field.placeholder || 'Select...'}"
          .value=${String(val)}
          .options=${(field.options || []).map(o => ({ value: o.value, label: o.label }))}
          ?error=${!!err}
          @cg-change=${(e: CustomEvent) => this._setValue(field.name, e.detail.value)}
        ></cg-select>
        ${err ? html`<cg-label error="${err}"></cg-label>` : nothing}
      `;
    }

    if (field.type === 'textarea') {
      return html`
        <cg-textarea
          label="${field.label}"
          placeholder="${field.placeholder || ''}"
          .value=${String(val)}
          ?error=${!!err}
          helper="${err || ''}"
          @cg-input=${(e: CustomEvent) => this._setValue(field.name, e.detail.value)}
        ></cg-textarea>
      `;
    }

    return html`
      <cg-input
        label="${field.label}"
        type="${field.type}"
        placeholder="${field.placeholder || ''}"
        .value=${String(val)}
        ?error=${!!err}
        ?required=${field.required}
        helper="${err || ''}"
        @cg-input=${(e: CustomEvent) => this._setValue(field.name, e.detail.value)}
      ></cg-input>
    `;
  }

  override render() {
    if (this.loading) {
      return html`<div class="form"><div class="loading-overlay"><ai-thinking text="Generating form" delay="0"></ai-thinking></div></div>`;
    }

    if (!this.schema || this.schema.fields.length === 0) {
      return html`<div class="form"><div class="empty">No form schema provided</div></div>`;
    }

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
            <div class="form-title">${this.schema.title}</div>
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
          <cg-button variant="primary" full @cg-click=${this._handleSubmit}>
            ${this.schema.submitLabel || 'Submit'}
          </cg-button>
        </div>
      </div>
    `;
  }
}
