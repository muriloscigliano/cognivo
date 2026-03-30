/**
 * <ai-file-upload> — Drag-Drop File Upload for AI Processing
 *
 * Dashed border drop zone with file list.
 * Supports accept filter, max size, multiple files.
 * Remove button per file, drop highlight state.
 * Keyboard accessible, no innerHTML with user content.
 */
import { LitElement, html, css, nothing } from 'lit';
import { property, state, customElement } from 'lit/decorators.js';
import { hostBlock, reducedMotion } from '../../styles/index.js';

interface UploadedFile {
  name: string;
  size: number;
  type: string;
  file: File;
}

@customElement('ai-file-upload')
export class AiFileUpload extends LitElement {
  static override styles = [hostBlock, reducedMotion, css`
    
    :host([hidden]) { display: none; }

    .dropzone {
      border: 2px dashed var(--cg-color-border-primary, #27272a);
      border-radius: 12px;
      padding: 32px;
      text-align: center;
      cursor: pointer;
      transition: border-color 200ms ease, background 200ms ease;
      background: transparent;
    }
    .dropzone:hover,
    .dropzone.dragover {
      border-color: var(--cg-brand-ai-accent, #dfff61);
      background: rgba(223, 255, 97, 0.05);
    }
    .dropzone:focus-visible {
      outline: 2px solid var(--cg-brand-ai-accent, #dfff61);
      outline-offset: 2px;
    }

    .drop-icon { font-size: 32px; margin-bottom: 8px; }

    .drop-label {
      color: var(--cg-color-text-primary, #fafafa);
      font-size: 14px;
      font-weight: 600;
      margin-bottom: 4px;
    }

    .drop-hint {
      color: var(--cg-color-text-secondary, #a1a1aa);
      font-size: 12px;
    }

    input[type="file"] { display: none; }

    .file-list {
      margin-top: 12px;
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .file-item {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 8px 12px;
      background: var(--cg-color-bg-secondary, #27272a);
      border-radius: 8px;
      border: 1px solid var(--cg-color-border-primary, #3f3f46);
    }

    .file-icon { font-size: 16px; flex-shrink: 0; }

    .file-info {
      flex: 1;
      min-width: 0;
    }

    .file-name {
      color: var(--cg-color-text-primary, #fafafa);
      font-size: 13px;
      font-weight: 500;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .file-meta {
      color: var(--cg-color-text-secondary, #a1a1aa);
      font-size: 11px;
    }

    .remove-btn {
      background: none;
      border: none;
      color: var(--cg-color-text-secondary, #a1a1aa);
      cursor: pointer;
      padding: 4px;
      border-radius: 4px;
      font-size: 16px;
      line-height: 1;
    }
    .remove-btn:hover { color: #ef4444; }
    .remove-btn:focus-visible {
      outline: 2px solid var(--cg-brand-ai-accent, #dfff61);
      outline-offset: 2px;
    }

    .error-msg {
      color: #ef4444;
      font-size: 12px;
      margin-top: 8px;
    }
    }
  `];
  @property({ type: String }) accept = '';
  @property({ type: Number, attribute: 'max-size' }) maxSize = 10485760; // 10MB
  @property({ type: Boolean }) multiple = false;
  @property({ type: String }) label = 'Drop files here or click to browse';

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
        <div class="drop-icon">📁</div>
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
      ${this._error ? html`<div class="error-msg" role="alert">${this._error}</div>` : nothing}
      ${this._files.length ? html`
        <div class="file-list" role="list" aria-label="Selected files">
          ${this._files.map((f, i) => html`
            <div class="file-item" role="listitem">
              <span class="file-icon">📄</span>
              <div class="file-info">
                <div class="file-name">${f.name}</div>
                <div class="file-meta">${f.type || 'unknown'} · ${this._formatSize(f.size)}</div>
              </div>
              <button class="remove-btn" aria-label="Remove ${f.name}" @click=${() => this._removeFile(i)}>✕</button>
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
