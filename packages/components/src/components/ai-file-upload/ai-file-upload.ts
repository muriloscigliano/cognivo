/**
 * @element ai-file-upload
 * Drag-and-drop file upload zone with accept filter, size limit, file list, and remove controls.
 *
 * @example
 * ```html
 * <ai-file-upload
 *   accept=".pdf,.csv"
 *   max-size="5242880"
 *   multiple
 *   label="Drop training data here"
 * ></ai-file-upload>
 * ```
 *
 * @fires {CustomEvent<{files: UploadedFile[]}>} ai-file-select - Files selected or dropped
 * @fires {CustomEvent<{error: string}>} ai-file-error - File validation failed (size/type)
 *
 * @cssprop [--cg-brand-ai-accent=#dfff61] - Drop zone hover border and focus ring
 */
import { LitElement, html, css, nothing } from 'lit';
import { property, state, customElement } from 'lit/decorators.js';
import { hostBlock, reducedMotion, fadeSlideInKeyframes } from '../../styles/index.js';

interface UploadedFile {
  name: string;
  size: number;
  type: string;
  file: File;
}

@customElement('ai-file-upload')
export class AiFileUpload extends LitElement {
  static override styles = [hostBlock, reducedMotion, fadeSlideInKeyframes, css`
    :host {
      animation: fadeSlideIn var(--cg-motion-duration-normal) var(--cg-motion-easing-enter) both;
    }
    :host([hidden]) { display: none; }

    .dropzone {
      border: 2px dashed var(--cg-color-surface-cards-border);
      border-radius: var(--cg-border-radius-150);
      padding: var(--cg-spacing-24);
      text-align: center;
      cursor: pointer;
      transition: border-color var(--cg-motion-duration-normal) var(--cg-motion-easing-color), background var(--cg-motion-duration-normal) var(--cg-motion-easing-color);
      background: transparent;
    }
    .dropzone:hover,
    .dropzone.dragover {
      border-color: var(--cg-color-surface-base-text);
      background: var(--cg-overlay-accent-subtle);
    }
    .dropzone:active { transform: scale(var(--cg-interaction-press-scale)); transition: transform var(--cg-motion-duration-fast) var(--cg-motion-easing-color); }
    .dropzone:focus-visible {
      outline: none; box-shadow: 0 0 0 3px var(--cg-overlay-accent-strong);
      outline-offset: var(--cg-outline-offset-default);
    }

    /* ── Disabled state ── */
    :host([disabled]) .dropzone {
      opacity: 0.4;
      cursor: not-allowed;
      pointer-events: none;
    }

    /* ── Upload progress ── */
    .progress-bar {
      height: var(--cg-spacing-4);
      background: var(--cg-color-surface-cards-divider);
      border-radius: var(--cg-border-radius-50);
      margin-top: var(--cg-spacing-12);
      overflow: hidden;
    }
    .progress-fill {
      height: 100%;
      background: var(--cg-color-action-primary-background-default);
      border-radius: var(--cg-border-radius-50);
      transition: width var(--cg-motion-duration-normal) var(--cg-motion-easing-color);
    }

    .drop-icon { font-size: var(--cg-spacing-32); margin-bottom: var(--cg-spacing-8); }

    .drop-label {
      color: var(--cg-color-surface-base-text);
      font-size: var(--cg-font-size-sm);
      font-weight: var(--cg-font-weight-semibold);
      margin-bottom: var(--cg-spacing-4);
    }

    .drop-hint {
      color: var(--cg-color-input-text-placeholder);
      font-size: var(--cg-font-size-xs);
    }

    input[type="file"] { display: none; }

    .file-list {
      margin-top: var(--cg-spacing-12);
      display: flex;
      flex-direction: column;
      gap: var(--cg-spacing-6);
    }

    .file-item {
      display: flex;
      align-items: center;
      gap: var(--cg-spacing-8);
      padding: var(--cg-spacing-8) var(--cg-spacing-12);
      background: var(--cg-color-surface-cards-background);
      border-radius: var(--cg-border-radius-100);
      border: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
    }

    .file-icon { font-size: var(--cg-font-size-base); flex-shrink: 0; }

    .file-info {
      flex: 1;
      min-width: 0;
    }

    .file-name {
      color: var(--cg-color-surface-base-text);
      font-size: var(--cg-font-size-sm);
      font-weight: var(--cg-font-weight-medium);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .file-meta {
      color: var(--cg-color-input-text-placeholder);
      font-size: var(--cg-font-size-xs);
    }

    .remove-btn {
      background: none;
      border: none;
      color: var(--cg-color-input-text-placeholder);
      cursor: pointer;
      padding: var(--cg-spacing-4);
      border-radius: var(--cg-border-radius-50);
      font-size: var(--cg-font-size-sm);
      line-height: 1;
      transition: color var(--cg-motion-duration-fast) var(--cg-motion-easing-default);
    }
    .remove-btn:hover { color: var(--cg-color-status-error-text-default); }
    .remove-btn:focus-visible {
      outline: none;
      box-shadow: 0 0 0 3px var(--cg-overlay-accent-strong);
    }

    .error-msg {
      color: var(--cg-color-status-error-text-default);
      font-size: var(--cg-font-size-xs);
      margin-top: var(--cg-spacing-8);
    }
  `];
  @property({ type: String }) accept = '';
  @property({ type: Number, attribute: 'max-size' }) maxSize = 10485760; // 10MB
  @property({ type: Boolean }) multiple = false;
  @property({ type: String }) label = 'Drop files here or click to browse';
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ type: Number }) progress = -1;

  @state() private _files: UploadedFile[] = [];
  @state() private _dragover = false;
  @state() private _error = '';

  private _formatSize(bytes: number): string {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / 1048576).toFixed(1)} MB`;
  }

  private _handleDragOver(e: DragEvent) {
    e.preventDefault();
    this._dragover = true;
  }

  private _handleDragLeave() {
    this._dragover = false;
  }

  private _handleDrop(e: DragEvent) {
    e.preventDefault();
    this._dragover = false;
    if (e.dataTransfer?.files) {
      this._processFiles(e.dataTransfer.files);
    }
  }

  private _handleClick() {
    if (this.disabled) return;
    this.shadowRoot?.querySelector<HTMLInputElement>('input[type="file"]')?.click();
  }

  private _handleInputChange(e: Event) {
    const input = e.target as HTMLInputElement;
    if (input.files) {
      this._processFiles(input.files);
      input.value = '';
    }
  }

  private _processFiles(fileList: FileList) {
    this._error = '';
    const newFiles: UploadedFile[] = [];
    for (const file of Array.from(fileList)) {
      if (file.size > this.maxSize) {
        this._error = `"${file.name}" exceeds max size of ${this._formatSize(this.maxSize)}`;
        this.dispatchEvent(new CustomEvent('ai-file-error', {
          detail: { error: this._error, file },
          bubbles: true, composed: true,
        }));
        continue;
      }
      newFiles.push({ name: file.name, size: file.size, type: file.type, file });
    }
    this._files = this.multiple ? [...this._files, ...newFiles] : newFiles.slice(0, 1);
    if (this._files.length) {
      this.dispatchEvent(new CustomEvent('ai-file-select', {
        detail: { files: this._files.map(f => f.file) },
        bubbles: true, composed: true,
      }));
    }
  }

  private _removeFile(index: number) {
    this._files = this._files.filter((_, i) => i !== index);
    this.dispatchEvent(new CustomEvent('ai-file-select', {
      detail: { files: this._files.map(f => f.file) },
      bubbles: true, composed: true,
    }));
  }

  override render() {
    return html`
      <div
        class="dropzone ${this._dragover ? 'dragover' : ''}"
        role="button"
        tabindex="0"
        aria-label=${this.label}
        @dragover=${this._handleDragOver}
        @dragleave=${this._handleDragLeave}
        @drop=${this._handleDrop}
        @click=${this._handleClick}
        @keydown=${(e: KeyboardEvent) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); this._handleClick(); } }}
      >
        <div class="drop-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z"/></svg></div>
        <div class="drop-label">${this.label}</div>
        <div class="drop-hint">
          ${this.accept ? `Accepted: ${this.accept}` : 'Any file type'}
          · Max ${this._formatSize(this.maxSize)}
        </div>
      </div>
      <input
        type="file"
        accept=${this.accept || nothing}
        ?multiple=${this.multiple}
        @change=${this._handleInputChange}
      />
      ${this.progress >= 0 ? html`
        <div class="progress-bar" role="progressbar" aria-valuenow=${this.progress} aria-valuemin="0" aria-valuemax="100" aria-label="Upload progress">
          <div class="progress-fill" style="width: ${Math.min(100, Math.max(0, this.progress))}%"></div>
        </div>
      ` : nothing}
      ${this._error ? html`<div class="error-msg" role="alert">${this._error}</div>` : nothing}
      ${this._files.length ? html`
        <div class="file-list" role="list" aria-label="Selected files">
          ${this._files.map((f, i) => html`
            <div class="file-item" role="listitem">
              <span class="file-icon"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg></span>
              <div class="file-info">
                <div class="file-name">${f.name}</div>
                <div class="file-meta">${f.type || 'unknown'} · ${this._formatSize(f.size)}</div>
              </div>
              <button class="remove-btn" aria-label="Remove ${f.name}" @click=${() => this._removeFile(i)}><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg></button>
            </div>
          `)}
        </div>
      ` : nothing}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ai-file-upload': AiFileUpload;
  }
}
