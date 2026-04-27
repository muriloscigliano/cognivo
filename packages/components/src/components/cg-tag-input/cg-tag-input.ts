import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { hostBlock, reducedMotion } from '../../styles/index.js';

/**
 * @element cg-tag-input
 * Chip-based multi-value input. Type + Enter/comma to add tags.
 *
 * @example
 * ```html
 * <cg-tag-input label="Tags" placeholder="Add a tag..." max="10"></cg-tag-input>
 * ```
 *
 * @fires {CustomEvent<{value: string[], tag: string}>} cg-tag-add
 * @fires {CustomEvent<{value: string[], tag: string}>} cg-tag-remove
 * @fires {CustomEvent<{value: string[]}>} cg-tag-change
 */
@customElement('cg-tag-input')
export class CgTagInput extends LitElement {
  static override styles = [hostBlock, reducedMotion, css`
    :host { display: block; }

    label {
      display: block;
      margin-bottom: var(--cg-spacing-6);
      font-size: var(--cg-font-size-sm);
      font-weight: var(--cg-font-weight-medium);
      color: var(--cg-color-surface-base-text);
    }

    .container {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: var(--cg-component-tag-input-gap);
      min-height: var(--cg-component-tag-input-min-height);
      padding: var(--cg-spacing-8) var(--cg-spacing-12);
      background: var(--cg-color-input-background-default);
      border: var(--cg-border-width-50) solid var(--cg-color-input-border-default);
      border-radius: var(--cg-component-tag-input-radius);
      cursor: text;
      transition:
        border-color var(--cg-transition-duration-fast) var(--cg-transition-easing-default),
        box-shadow var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
    }

    /* ── Size: lg ── */
    :host([size="lg"]) .container {
      min-height: var(--cg-component-input-height-lg);
      padding: var(--cg-spacing-12) var(--cg-spacing-16);
      gap: var(--cg-spacing-8);
    }
    .container:hover { border-color: var(--cg-color-input-border-hover); }
    .container.focused {
      border-color: var(--cg-color-input-border-focus);
      box-shadow: 0 0 0 3px var(--cg-overlay-accent-strong);
    }

    :host([error]) .container { border-color: var(--cg-color-status-error-border-default); }
    :host([error]) .container.focused {
      border-color: var(--cg-color-status-error-text-default);
      box-shadow: 0 0 0 3px var(--cg-shadow-focus-error);
    }
    :host([success]) .container { border-color: var(--cg-color-status-success-border-default); }
    :host([success]) .container.focused {
      border-color: var(--cg-color-status-success-text-default);
      box-shadow: 0 0 0 3px var(--cg-shadow-focus-success);
    }
    :host([disabled]) .container { opacity: 0.6; pointer-events: none; }

    .tag {
      display: inline-flex;
      align-items: center;
      gap: var(--cg-spacing-4);
      padding: var(--cg-spacing-6) var(--cg-spacing-6) var(--cg-spacing-6) var(--cg-spacing-12);
      background: var(--cg-color-action-secondary-background-default);
      border: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
      border-radius: var(--cg-border-radius-full);
      font-size: var(--cg-font-size-xs);
      font-weight: var(--cg-font-weight-medium);
      line-height: 1;
      color: var(--cg-color-surface-base-text);
      animation: tagIn var(--cg-transition-duration-default) var(--cg-transition-easing-spring);
      transition:
        background-color var(--cg-transition-duration-fast) var(--cg-transition-easing-default),
        border-color var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
    }
    .tag:hover {
      background: var(--cg-color-action-secondary-background-hover);
      border-color: var(--cg-color-input-border-hover);
    }
    :host([size="lg"]) .tag {
      padding: var(--cg-spacing-8) var(--cg-spacing-8) var(--cg-spacing-8) var(--cg-spacing-16);
      gap: var(--cg-spacing-6);
      font-size: var(--cg-font-size-sm);
    }
    :host([size="lg"]) .tag-remove {
      width: var(--cg-spacing-24);
      height: var(--cg-spacing-24);
    }
    @keyframes tagIn {
      from { opacity: 0; transform: scale(0.8); }
      to { opacity: 1; transform: scale(1); }
    }
    .tag-remove:active {
      transform: scale(var(--cg-interaction-press-scale));
    }
    .tag-remove {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: var(--cg-spacing-20);
      height: var(--cg-spacing-20);
      border: none;
      background: none;
      color: inherit;
      cursor: pointer;
      border-radius: var(--cg-border-radius-full);
      opacity: 0.6;
      transition:
        opacity var(--cg-transition-duration-fast) var(--cg-transition-easing-default),
        background var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
    }
    .tag-remove:hover {
      opacity: 1;
      background: var(--cg-color-action-tertiary-background-hover);
    }

    input {
      flex: 1;
      min-width: var(--cg-spacing-80);
      height: var(--cg-spacing-24);
      line-height: var(--cg-spacing-24);
      padding: 0;
      border: none;
      outline: none;
      background: none;
      color: var(--cg-color-input-text-default);
      font-family: inherit;
      font-size: var(--cg-font-size-sm);
    }
    :host([size="lg"]) input {
      height: var(--cg-spacing-32);
      line-height: var(--cg-spacing-32);
      font-size: var(--cg-font-size-base);
    }
    input::placeholder { color: var(--cg-color-input-text-placeholder); }

    .helper {
      margin-top: var(--cg-spacing-6);
      font-size: var(--cg-font-size-xs);
      color: var(--cg-color-surface-container-outlined);
    }
    :host([error]) .helper { color: var(--cg-color-status-error-text-default); }

    /* Visually-hidden live region for screen readers */
    .sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border: 0;
    }
  `];

  static formAssociated = true;
  private _internals?: ElementInternals;

  constructor() {
    super();
    if (typeof this.attachInternals === 'function') {
      this._internals = this.attachInternals();
    }
  }

  @property({ type: Array }) value: string[] = [];
  @property() label = '';
  @property() placeholder = '';
  @property() helper = '';
  @property() name = '';
  @property() delimiter = ',';
  @property({ type: Number }) max = 0;
  @property({ type: Boolean, attribute: 'allow-duplicates' }) allowDuplicates = false;
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ type: Boolean, reflect: true }) error = false;
  @property({ type: Boolean, reflect: true }) success = false;
  @property({ reflect: true }) size: 'md' | 'lg' = 'md';

  @state() private _inputValue = '';
  @state() private _focused = false;
  @state() private _announcement = '';

  @query('input') private _inputEl!: HTMLInputElement;

  override updated(changed: Map<string, unknown>): void {
    if (changed.has('value')) {
      this._internals?.setFormValue(this.value.join(','));
    }
  }

  private _addTag(tag: string): void {
    tag = tag.trim();
    if (!tag) return;
    if (!this.allowDuplicates && this.value.includes(tag)) {
      this._announce(`Tag "${tag}" already exists`);
      return;
    }
    if (this.max > 0 && this.value.length >= this.max) {
      this._announce(`Maximum of ${this.max} tags reached`);
      return;
    }
    this.value = [...this.value, tag];
    this._inputValue = '';
    this._announce(`Added tag ${tag}`);
    this.dispatchEvent(new CustomEvent('cg-tag-add', {
      detail: { value: this.value, tag },
      bubbles: true,
      composed: true,
    }));
    this.dispatchEvent(new CustomEvent('cg-tag-change', {
      detail: { value: this.value },
      bubbles: true,
      composed: true,
    }));
  }

  private _removeTag(idx: number): void {
    const tag = this.value[idx];
    if (!tag) return;
    this.value = this.value.filter((_, i) => i !== idx);
    this._announce(`Removed tag ${tag}`);
    this.dispatchEvent(new CustomEvent('cg-tag-remove', {
      detail: { value: this.value, tag },
      bubbles: true,
      composed: true,
    }));
    this.dispatchEvent(new CustomEvent('cg-tag-change', {
      detail: { value: this.value },
      bubbles: true,
      composed: true,
    }));
  }

  private _announce(message: string): void {
    this._announcement = '';
    requestAnimationFrame(() => { this._announcement = message; });
  }

  private _handleInput(e: Event): void {
    this._inputValue = (e.target as HTMLInputElement).value;
  }

  private _handleKeydown(e: KeyboardEvent): void {
    if (e.key === 'Enter' || e.key === this.delimiter) {
      e.preventDefault();
      this._addTag(this._inputValue);
    } else if (e.key === 'Backspace' && this._inputValue === '' && this.value.length > 0) {
      e.preventDefault();
      this._removeTag(this.value.length - 1);
    } else if (e.key === 'Escape') {
      this._inputValue = '';
    }
  }

  private _handleContainerClick(): void {
    this._inputEl?.focus();
  }

  override render() {
    return html`
      ${this.label ? html`<label>${this.label}</label>` : nothing}
      <div
        class="container ${this._focused ? 'focused' : ''}"
        @click=${this._handleContainerClick}
      >
        ${this.value.map((tag, idx) => html`
          <span class="tag">
            ${tag}
            <button
              class="tag-remove"
              type="button"
              aria-label=${`Remove ${tag}`}
              @click=${(e: Event) => { e.stopPropagation(); this._removeTag(idx); }}
            >
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round">
                <path d="M7.5 2.5L2.5 7.5M2.5 2.5l5 5"/>
              </svg>
            </button>
          </span>
        `)}
        <input
          type="text"
          .value=${this._inputValue}
          placeholder=${this.value.length === 0 ? this.placeholder : ''}
          ?disabled=${this.disabled}
          @input=${this._handleInput}
          @keydown=${this._handleKeydown}
          @focus=${() => this._focused = true}
          @blur=${() => this._focused = false}
        />
      </div>
      ${this.helper ? html`<div class="helper">${this.helper}</div>` : nothing}
      <div class="sr-only" role="status" aria-live="polite" aria-atomic="true">${this._announcement}</div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cg-tag-input': CgTagInput;
  }
}
