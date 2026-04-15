import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { hostBlock, reducedMotion } from '../../styles/index.js';

/**
 * @element cg-file-input
 * File picker with drag-and-drop, size/type validation, and file chip display.
 *
 * @example
 * ```html
 * <cg-file-input label="Upload files" accept=".pdf,.png,.jpg" multiple max-size="5242880"></cg-file-input>
 * ```
 *
 * @fires {CustomEvent<{files: File[]}>} cg-file-change
 * @fires {CustomEvent<{files: File[], reason: string}>} cg-file-reject
 * @fires {CustomEvent<{file: File}>} cg-file-remove
 */
@customElement('cg-file-input')
export class CgFileInput extends LitElement {
  static override styles = [hostBlock, reducedMotion, css`
    :host { display: block; }

    label {
      display: block;
      margin-bottom: var(--cg-spacing-6);
      font-size: var(--cg-font-size-sm);
      font-weight: var(--cg-font-weight-medium);
      color: var(--cg-color-surface-base-text);
    }

    .dropzone {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: var(--cg-spacing-12);
      min-height: var(--cg-component-file-input-min-height);
      padding: var(--cg-spacing-32) var(--cg-spacing-24);
      background: var(--cg-color-input-background-default);
      border: var(--cg-border-width-100) dashed var(--cg-color-input-border-default);
      border-radius: var(--cg-component-file-input-radius);
      color: var(--cg-color-surface-container-outlined);
      cursor: pointer;
      text-align: center;
      transition:
        border-color var(--cg-transition-duration-fast) var(--cg-transition-easing-default),
        background var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
    }
    .dropzone:hover:not(.disabled) {
      border-color: var(--cg-color-action-primary-background-default);
      background: var(--cg-overlay-accent-subtle);
    }
    .dropzone.dragging {
      border-color: var(--cg-color-action-primary-background-default);
      background: var(--cg-overlay-accent-light);
      color: var(--cg-color-surface-base-text);
    }
    .dropzone:focus-visible {
      outline: none;
      box-shadow:
        0 0 0 2px var(--cg-color-focus-ring-offset),
        0 0 0 4px var(--cg-color-focus-ring);
    }
    .dropzone.disabled { opacity: 0.5; cursor: not-allowed; }

    :host([error]) .dropzone { border-color: var(--cg-color-status-error-border-default); }
    :host([success]) .dropzone { border-color: var(--cg-color-status-success-border-default); }

    .icon {
      color: var(--cg-color-action-primary-background-default);
      transition: transform var(--cg-transition-duration-default) var(--cg-transition-easing-default);
    }
    .dropzone:hover:not(.disabled) .icon {
      transform: translateY(-4px);
    }
    .dropzone.dragging .icon {
      transform: scale(1.15) translateY(-2px);
    }
    @keyframes dropzonePulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.02); }
    }
    .dropzone.dragging {
      animation: dropzonePulse 1s ease-in-out infinite;
    }
    .title {
      font-size: var(--cg-font-size-sm);
      font-weight: var(--cg-font-weight-medium);
      color: var(--cg-color-surface-base-text);
    }
    .subtitle {
      font-size: var(--cg-font-size-xs);
      color: var(--cg-color-surface-container-outlined);
    }

    input[type="file"] {
      position: absolute;
      opacity: 0;
      width: 0;
      height: 0;
      pointer-events: none;
    }

    .files {
      display: flex;
      flex-direction: column;
      gap: var(--cg-spacing-8);
      margin-top: var(--cg-spacing-16);
    }
    .file {
      display: flex;
      align-items: center;
      gap: var(--cg-spacing-12);
      padding: var(--cg-spacing-12) var(--cg-spacing-16);
      background: var(--cg-color-surface-container-background);
      border: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
      border-radius: var(--cg-border-radius-100);
      transition: border-color var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
    }
    .file:hover {
      border-color: var(--cg-color-input-border-hover);
    }
    .file-icon { color: var(--cg-color-surface-container-outlined); flex-shrink: 0; }
    .file-info { flex: 1; min-width: 0; }
    .file-name {
      display: block;
      font-size: var(--cg-font-size-sm);
      color: var(--cg-color-surface-base-text);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .file-size {
      display: block;
      font-size: var(--cg-font-size-xs);
      color: var(--cg-color-surface-container-outlined);
    }
    .file-remove {
      display: flex;
      align-items: center;
      justify-content: center;
      width: var(--cg-spacing-32);
      height: var(--cg-spacing-32);
      border: none;
      background: none;
      color: var(--cg-color-surface-container-outlined);
      cursor: pointer;
      border-radius: var(--cg-border-radius-full);
      transition: background var(--cg-transition-duration-fast) var(--cg-transition-easing-default), color var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
    }
    .file-remove:hover {
      background: var(--cg-color-status-error-background-default);
      color: var(--cg-color-status-error-text-default);
    }

    .helper {
      margin-top: var(--cg-spacing-6);
      font-size: var(--cg-font-size-xs);
      color: var(--cg-color-surface-container-outlined);
    }
    :host([error]) .helper { color: var(--cg-color-status-error-text-default); }
  `];

  static formAssociated = true;
  private _internals?: ElementInternals;

  constructor() {
    super();
    if (typeof this.attachInternals === 'function') {
      this._internals = this.attachInternals();
    }
  }

  @property() label = '';
  @property() placeholder = 'Drop files here or click to browse';
  @property() helper = '';
  @property() accept = '';
  @property() name = '';
  @property({ type: Boolean }) multiple = false;
  @property({ type: Number, attribute: 'max-size' }) maxSize = 0;
  @property({ type: Number, attribute: 'max-files' }) maxFiles = 0;
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ type: Boolean, reflect: true }) error = false;
  @property({ type: Boolean, reflect: true }) success = false;

  @state() private _files: File[] = [];
  @state() private _dragging = false;

  @query('input[type="file"]') private _inputEl!: HTMLInputElement;

  private _formatSize(bytes: number): string {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  }

  private _validateFiles(files: File[]): { valid: File[]; rejected: File[]; reason: string } {
    const valid: File[] = [];
    const rejected: File[] = [];
    let reason = '';
    for (const file of files) {
      if (this.maxSize > 0 && file.size > this.maxSize) {
        rejected.push(file);
        reason = `File exceeds ${this._formatSize(this.maxSize)}`;
        continue;
      }
      valid.push(file);
    }
    if (this.maxFiles > 0 && this._files.length + valid.length > this.maxFiles) {
      const allowed = this.maxFiles - this._files.length;
      rejected.push(...valid.slice(allowed));
      valid.splice(allowed);
      reason = `Maximum ${this.maxFiles} files allowed`;
    }
    return { valid, rejected, reason };
  }

  private _addFiles(incomingFiles: FileList | null): void {
    if (!incomingFiles) return;
    const arr = Array.from(incomingFiles);
    const { valid, rejected, reason } = this._validateFiles(arr);

    if (rejected.length > 0) {
      this.dispatchEvent(new CustomEvent('cg-file-reject', {
        detail: { files: rejected, reason },
        bubbles: true,
        composed: true,
      }));
    }

    if (valid.length > 0) {
      this._files = this.multiple ? [...this._files, ...valid] : valid.slice(0, 1);
      this._updateFormValue();
      this.dispatchEvent(new CustomEvent('cg-file-change', {
        detail: { files: this._files },
        bubbles: true,
        composed: true,
      }));
    }
  }

  private _updateFormValue(): void {
    if (!this._internals) return;
    const formData = new FormData();
    for (const file of this._files) {
      formData.append(this.name || 'files', file);
    }
    this._internals.setFormValue(formData);
  }

  private _removeFile(idx: number): void {
    const file = this._files[idx];
    if (!file) return;
    this._files = this._files.filter((_, i) => i !== idx);
    this._updateFormValue();
    this.dispatchEvent(new CustomEvent('cg-file-remove', {
      detail: { file },
      bubbles: true,
      composed: true,
    }));
    this.dispatchEvent(new CustomEvent('cg-file-change', {
      detail: { files: this._files },
      bubbles: true,
      composed: true,
    }));
  }

  private _handleChange(e: Event): void {
    this._addFiles((e.target as HTMLInputElement).files);
  }

  private _dragCounter = 0;

  private _handleDrop(e: DragEvent): void {
    e.preventDefault();
    this._dragging = false;
    this._dragCounter = 0;
    if (this.disabled) return;
    this._addFiles(e.dataTransfer?.files ?? null);
  }

  private _handleDragEnter(e: DragEvent): void {
    e.preventDefault();
    if (this.disabled) return;
    this._dragCounter++;
    this._dragging = true;
  }

  private _handleDragOver(e: DragEvent): void {
    e.preventDefault();
  }

  private _handleDragLeave(): void {
    this._dragCounter = Math.max(0, this._dragCounter - 1);
    if (this._dragCounter === 0) this._dragging = false;
  }

  private _handleClick(): void {
    if (this.disabled) return;
    this._inputEl?.click();
  }

  private _handleKeydown(e: KeyboardEvent): void {
    if (this.disabled) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this._inputEl?.click();
    }
  }

  override render() {
    return html`
      ${this.label ? html`<label>${this.label}</label>` : nothing}
      <div
        class="dropzone ${this._dragging ? 'dragging' : ''} ${this.disabled ? 'disabled' : ''}"
        role="button"
        tabindex=${this.disabled ? '-1' : '0'}
        aria-label=${this.label || 'File upload'}
        @click=${this._handleClick}
        @keydown=${this._handleKeydown}
        @drop=${this._handleDrop}
        @dragenter=${this._handleDragEnter}
        @dragover=${this._handleDragOver}
        @dragleave=${this._handleDragLeave}
      >
        <div class="icon">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="17 8 12 3 7 8"/>
            <line x1="12" y1="3" x2="12" y2="15"/>
          </svg>
        </div>
        <div class="title">${this.placeholder}</div>
        ${this.accept ? html`<div class="subtitle">Accepted: ${this.accept}</div>` : nothing}
        ${this.maxSize > 0 ? html`<div class="subtitle">Max size: ${this._formatSize(this.maxSize)}</div>` : nothing}
        <input
          type="file"
          accept=${this.accept}
          ?multiple=${this.multiple}
          ?disabled=${this.disabled}
          @change=${this._handleChange}
        />
      </div>
      ${this._files.length > 0 ? html`
        <div class="files">
          ${this._files.map((file, idx) => html`
            <div class="file">
              <div class="file-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14 2 14 8 20 8"/>
                </svg>
              </div>
              <div class="file-info">
                <span class="file-name">${file.name}</span>
                <span class="file-size">${this._formatSize(file.size)}</span>
              </div>
              <button
                type="button"
                class="file-remove"
                aria-label=${`Remove ${file.name}`}
                @click=${() => this._removeFile(idx)}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round">
                  <path d="M10.5 3.5l-7 7M3.5 3.5l7 7"/>
                </svg>
              </button>
            </div>
          `)}
        </div>
      ` : nothing}
      ${this.helper ? html`<div class="helper">${this.helper}</div>` : nothing}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cg-file-input': CgFileInput;
  }
}
