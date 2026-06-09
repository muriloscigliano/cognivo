import { LitElement, html, css, nothing, svg } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { hostBlock, reducedMotion, focusRingSingle } from '../../styles/index.js';

/** Per-file upload status driven by the consumer via `setFileStatus()`. */
export type FileStatus = 'idle' | 'uploading' | 'done' | 'error';
export interface FileStatusInfo {
  state: FileStatus;
  /** 0–100 — only used when state === 'uploading' */
  progress?: number;
  /** Optional error message, surfaced when state === 'error' */
  error?: string;
}

/**
 * @element cg-file-input
 * File picker with drag-and-drop, paste-from-clipboard, image thumbnail
 * previews, file-type-aware icons, three sizes (sm | md | lg) plus a compact
 * button-style variant. Live-region announcements + focus management included.
 *
 * Consumers drive per-file upload state via `setFileStatus(file, info)`; the
 * component renders a status pill + progress bar accordingly. The component
 * itself does not perform uploads — it's a UI primitive.
 *
 * @example
 * ```html
 * <cg-file-input label="Upload files" accept=".pdf,.png,.jpg" multiple max-size="5242880"></cg-file-input>
 * <cg-file-input variant="compact" multiple></cg-file-input>
 * <cg-file-input size="lg" accept="image/*" multiple paste></cg-file-input>
 * <cg-file-input capture="environment" accept="image/*"></cg-file-input>
 * ```
 *
 * @fires {CustomEvent<{files: File[]}>} cg-file-change
 * @fires {CustomEvent<{files: File[], reason: string}>} cg-file-reject
 * @fires {CustomEvent<{file: File}>} cg-file-remove
 * @fires {CustomEvent<{}>} cg-file-clear - All files cleared via the bulk action
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

    /* ── Dropzone variant (default) ── */
    .dropzone {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: var(--cg-spacing-12);
      padding: var(--cg-spacing-32) var(--cg-spacing-24);
      background: var(--cg-color-input-background-default);
      border: var(--cg-border-width-100) dashed var(--cg-color-input-border-default);
      border-radius: var(--cg-component-file-input-radius);
      color: var(--cg-color-surface-container-outlined);
      cursor: pointer;
      text-align: center;
      transition:
        border-color var(--cg-transition-duration-default) var(--cg-transition-easing-default),
        background var(--cg-transition-duration-default) var(--cg-transition-easing-default),
        box-shadow var(--cg-transition-duration-default) var(--cg-transition-easing-default);
    }
    :host([size="sm"]) .dropzone { min-height: var(--cg-component-file-input-min-height-sm); padding: var(--cg-spacing-20) var(--cg-spacing-16); gap: var(--cg-spacing-8); }
    :host([size="md"]) .dropzone { min-height: var(--cg-component-file-input-min-height-md); }
    :host([size="lg"]) .dropzone { min-height: var(--cg-component-file-input-min-height-lg); padding: var(--cg-spacing-40) var(--cg-spacing-32); gap: var(--cg-spacing-16); }

    .dropzone:hover:not(.disabled) {
      border-color: var(--cg-color-action-primary-border-default);
      background: var(--cg-overlay-accent-subtle);
    }
    .dropzone.dragging {
      border-style: solid;
      border-color: var(--cg-color-action-primary-border-default);
      background: var(--cg-overlay-accent-light);
      color: var(--cg-color-surface-base-text);
      box-shadow: 0 0 0 var(--cg-spacing-4) var(--cg-overlay-accent-subtle);
    }
    .dropzone:focus-visible {
      outline: none;
      box-shadow:
        0 0 0 var(--cg-focus-ring-offset) var(--cg-color-focus-ring-offset),
        0 0 0 calc(var(--cg-focus-ring-offset) + var(--cg-focus-ring-width)) var(--cg-color-focus-ring);
    }
    .dropzone.disabled { opacity: 0.5; cursor: not-allowed; }

    :host([error]) .dropzone { border-color: var(--cg-color-status-error-border-default); }
    :host([success]) .dropzone { border-color: var(--cg-color-status-success-border-default); }

    .icon {
      color: var(--cg-color-accent-text);
      transition: transform var(--cg-transition-duration-default) var(--cg-transition-easing-spring);
    }
    .dropzone:hover:not(.disabled) .icon {
      transform: translateY(calc(var(--cg-spacing-4) * -1));
    }
    .dropzone.dragging .icon {
      transform: scale(1.15) translateY(calc(var(--cg-spacing-2) * -1));
    }
    .icon svg { width: var(--cg-icon-size-300); height: var(--cg-icon-size-300); }
    :host([size="sm"]) .icon svg { width: var(--cg-icon-size-200); height: var(--cg-icon-size-200); }
    :host([size="lg"]) .icon svg { width: var(--cg-icon-size-400); height: var(--cg-icon-size-400); }

    .title {
      font-size: var(--cg-font-size-sm);
      font-weight: var(--cg-font-weight-medium);
      color: var(--cg-color-surface-base-text);
    }
    :host([size="lg"]) .title { font-size: var(--cg-font-size-base); }
    .subtitle {
      font-size: var(--cg-font-size-xs);
      color: var(--cg-color-surface-container-outlined);
    }
    .subtitles { display: flex; flex-direction: column; gap: var(--cg-spacing-2); }

    /* ── Compact variant — button-style with drag overlay ── */
    .compact {
      display: inline-flex;
      align-items: center;
      gap: var(--cg-spacing-8);
      padding: 0 var(--cg-spacing-16);
      height: var(--cg-component-input-height-md);
      background: var(--cg-color-input-background-default);
      border: var(--cg-border-width-50) solid var(--cg-color-input-border-default);
      border-radius: var(--cg-component-input-radius);
      color: var(--cg-color-surface-base-text);
      font-size: var(--cg-font-size-sm);
      font-weight: var(--cg-font-weight-medium);
      font-family: inherit;
      cursor: pointer;
      transition:
        border-color var(--cg-transition-duration-fast) var(--cg-transition-easing-default),
        background var(--cg-transition-duration-fast) var(--cg-transition-easing-default),
        box-shadow var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
    }
    .compact:hover:not(.disabled) {
      border-color: var(--cg-color-input-border-hover);
      background: var(--cg-color-action-tertiary-background-hover);
    }
    .compact:focus-visible {
      border-color: var(--cg-color-input-border-focus);
      ${focusRingSingle}
    }
    .compact.dragging {
      border-style: dashed;
      border-color: var(--cg-color-action-primary-border-default);
      background: var(--cg-overlay-accent-light);
    }
    .compact.disabled { opacity: 0.5; cursor: not-allowed; }
    .compact-icon { color: var(--cg-color-input-icon-default); display: flex; flex-shrink: 0; }
    .compact-icon svg { width: var(--cg-icon-size-100); height: var(--cg-icon-size-100); }
    .compact-count {
      margin-left: auto;
      padding: var(--cg-spacing-2) var(--cg-spacing-8);
      background: var(--cg-color-action-tertiary-background-hover);
      border-radius: var(--cg-border-radius-full);
      font-size: var(--cg-font-size-xs);
      color: var(--cg-color-surface-container-text);
    }

    /* ── Hidden native input ── */
    input[type="file"] {
      position: absolute;
      opacity: 0;
      width: 0;
      height: 0;
      pointer-events: none;
    }

    /* ── File chip list ── */
    .files {
      display: flex;
      flex-direction: column;
      gap: var(--cg-spacing-8);
      margin-top: var(--cg-spacing-16);
    }
    @keyframes fileChipIn {
      from { opacity: 0; transform: translateY(calc(var(--cg-spacing-4) * -1)); }
      to { opacity: 1; transform: translateY(0); }
    }
    .file {
      display: flex;
      align-items: center;
      gap: var(--cg-spacing-12);
      padding: var(--cg-spacing-8) var(--cg-spacing-12);
      background: var(--cg-color-surface-container-background);
      border: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
      border-radius: var(--cg-border-radius-100);
      animation: fileChipIn var(--cg-transition-duration-default) var(--cg-transition-easing-ease-out);
      transition: border-color var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
    }
    .file:hover {
      border-color: var(--cg-color-input-border-hover);
    }
    .file-thumb {
      flex-shrink: 0;
      width: var(--cg-spacing-32);
      height: var(--cg-spacing-32);
      border-radius: var(--cg-border-radius-50);
      overflow: hidden;
      background: var(--cg-color-surface-cards-background);
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .file-thumb.preview { padding: 0; }
    .file-thumb img { width: 100%; height: 100%; object-fit: cover; display: block; }
    .file-thumb svg { width: var(--cg-icon-size-150); height: var(--cg-icon-size-150); color: var(--cg-color-surface-container-outlined); }
    .file-thumb.image svg { color: var(--cg-color-accent-text); }
    .file-thumb.pdf svg { color: var(--cg-color-status-error-text-default); }
    .file-thumb.doc svg { color: var(--cg-color-status-info-text-default); }
    .file-thumb.media svg { color: var(--cg-color-status-success-text-default); }
    .file-thumb.archive svg { color: var(--cg-color-status-warning-text-default); }
    .file-info { flex: 1; min-width: 0; }
    .file-name {
      display: block;
      font-size: var(--cg-font-size-sm);
      color: var(--cg-color-surface-base-text);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-weight: var(--cg-font-weight-medium);
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
      transition:
        background var(--cg-transition-duration-fast) var(--cg-transition-easing-default),
        color var(--cg-transition-duration-fast) var(--cg-transition-easing-default),
        transform var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
    }
    .file-remove:hover {
      background: var(--cg-color-status-error-background-default);
      color: var(--cg-color-status-error-text-default);
    }
    .file-remove:active {
      transform: scale(var(--cg-interaction-press-scale));
    }

    .helper {
      margin-top: var(--cg-spacing-6);
      font-size: var(--cg-font-size-xs);
      color: var(--cg-color-surface-container-outlined);
    }
    :host([error]) .helper { color: var(--cg-color-status-error-text-default); }

    /* ── Bulk actions toolbar ── */
    .bulk-actions {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: var(--cg-spacing-12);
      margin-bottom: calc(var(--cg-spacing-8) * -1);
    }
    .bulk-count {
      font-size: var(--cg-font-size-xs);
      color: var(--cg-color-surface-container-outlined);
    }
    .bulk-clear {
      display: inline-flex;
      align-items: center;
      gap: var(--cg-spacing-4);
      padding: var(--cg-spacing-4) var(--cg-spacing-8);
      border: none;
      background: transparent;
      color: var(--cg-color-status-error-text-default);
      font-size: var(--cg-font-size-xs);
      font-weight: var(--cg-font-weight-medium);
      font-family: inherit;
      cursor: pointer;
      border-radius: var(--cg-border-radius-50);
      transition: background var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
    }
    .bulk-clear:hover { background: var(--cg-color-status-error-background-default); }
    .bulk-clear:focus-visible {
      outline: none;
      box-shadow:
        0 0 0 var(--cg-focus-ring-offset) var(--cg-color-focus-ring-offset),
        0 0 0 calc(var(--cg-focus-ring-offset) + var(--cg-focus-ring-width)) var(--cg-color-focus-ring);
    }

    /* ── Per-file status pill + progress bar ── */
    .status-pill {
      display: inline-flex;
      align-items: center;
      gap: var(--cg-spacing-4);
      padding: var(--cg-spacing-2) var(--cg-spacing-8);
      border-radius: var(--cg-border-radius-full);
      font-size: var(--cg-font-size-xs);
      font-weight: var(--cg-font-weight-medium);
      flex-shrink: 0;
    }
    .status-pill.uploading {
      background: var(--cg-overlay-accent-light);
      color: var(--cg-color-accent-text);
    }
    .status-pill.done {
      background: var(--cg-color-status-success-background-default);
      color: var(--cg-color-status-success-text-default);
    }
    .status-pill.error {
      background: var(--cg-color-status-error-background-default);
      color: var(--cg-color-status-error-text-default);
    }
    .progress-track {
      height: var(--cg-spacing-2);
      margin-top: var(--cg-spacing-4);
      background: var(--cg-color-surface-container-background);
      border-radius: var(--cg-border-radius-full);
      overflow: hidden;
    }
    .progress-fill {
      height: 100%;
      background: var(--cg-color-accent-text);
      border-radius: var(--cg-border-radius-full);
      transition: width var(--cg-transition-duration-default) var(--cg-transition-easing-ease-out);
    }

    /* ── Visually-hidden live region for screen readers ── */
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
  @property({ reflect: true }) size: 'sm' | 'md' | 'lg' = 'md';
  @property({ reflect: true }) variant: 'dropzone' | 'compact' = 'dropzone';
  /** Mobile camera capture: 'user' (front) or 'environment' (rear). Pass-through to <input>. */
  @property() capture: '' | 'user' | 'environment' = '';
  /** Accept files pasted from the clipboard (Ctrl/Cmd+V) when no editable element is focused. */
  @property({ type: Boolean }) paste = false;

  @state() private _files: File[] = [];
  @state() private _dragging = false;
  @state() private _announcement = '';

  @query('input[type="file"]') private _inputEl!: HTMLInputElement;

  private _previews = new Map<File, string>();
  private _statusMap = new Map<File, FileStatusInfo>();

  private _formatSize(bytes: number): string {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  }

  /** Categorize a file by MIME / extension into one of: image | pdf | doc | media | archive | default. */
  private _fileKind(file: File): 'image' | 'pdf' | 'doc' | 'media' | 'archive' | 'default' {
    const type = file.type;
    const name = file.name.toLowerCase();
    if (type.startsWith('image/')) return 'image';
    if (type === 'application/pdf' || name.endsWith('.pdf')) return 'pdf';
    if (type.startsWith('video/') || type.startsWith('audio/')) return 'media';
    if (/\.(zip|rar|7z|tar|gz|bz2)$/i.test(name)) return 'archive';
    if (/\.(doc|docx|xls|xlsx|ppt|pptx|txt|md|rtf|csv)$/i.test(name) ||
        type.startsWith('text/') ||
        type.includes('word') ||
        type.includes('sheet') ||
        type.includes('presentation')) return 'doc';
    return 'default';
  }

  private _previewFor(file: File): string | null {
    if (!file.type.startsWith('image/')) return null;
    let url = this._previews.get(file);
    if (!url) {
      url = URL.createObjectURL(file);
      this._previews.set(file, url);
    }
    return url;
  }

  private _revokePreview(file: File): void {
    const url = this._previews.get(file);
    if (url) {
      URL.revokeObjectURL(url);
      this._previews.delete(file);
    }
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
      this._announce(`${rejected.length} file${rejected.length === 1 ? '' : 's'} rejected: ${reason}`);
      this.dispatchEvent(new CustomEvent('cg-file-reject', {
        detail: { files: rejected, reason },
        bubbles: true,
        composed: true,
      }));
    }

    if (valid.length > 0) {
      if (this.multiple) {
        this._files = [...this._files, ...valid];
      } else {
        this._files.forEach(f => { this._revokePreview(f); this._statusMap.delete(f); });
        this._files = valid.slice(0, 1);
      }
      this._announce(`${valid.length} file${valid.length === 1 ? '' : 's'} added: ${valid.map(f => f.name).join(', ')}`);
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
    this._revokePreview(file);
    this._statusMap.delete(file);
    const wasLast = this._files.length === 1;
    const nextIdx = idx >= this._files.length - 1 ? idx - 1 : idx;
    this._files = this._files.filter((_, i) => i !== idx);
    this._announce(`Removed ${file.name}`);
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
    // Focus management: move focus to the next remove button, or back to the trigger.
    this.updateComplete.then(() => {
      if (wasLast) {
        const trigger = this.shadowRoot?.querySelector<HTMLElement>('.dropzone, .compact');
        trigger?.focus();
      } else {
        const buttons = this.shadowRoot?.querySelectorAll<HTMLButtonElement>('.file-remove');
        buttons?.[Math.max(0, nextIdx)]?.focus();
      }
    });
  }

  /** Public: clear all selected files. Fires `cg-file-clear` and `cg-file-change`. */
  clearAll(): void {
    if (this._files.length === 0) return;
    this._files.forEach(f => { this._revokePreview(f); this._statusMap.delete(f); });
    const cleared = this._files.length;
    this._files = [];
    this._announce(`Cleared ${cleared} file${cleared === 1 ? '' : 's'}`);
    this._updateFormValue();
    this.dispatchEvent(new CustomEvent('cg-file-clear', { bubbles: true, composed: true, detail: {} }));
    this.dispatchEvent(new CustomEvent('cg-file-change', {
      detail: { files: this._files },
      bubbles: true,
      composed: true,
    }));
    this.updateComplete.then(() => {
      const trigger = this.shadowRoot?.querySelector<HTMLElement>('.dropzone, .compact');
      trigger?.focus();
    });
  }

  /**
   * Public: set the upload status for a given file. Renders a status pill +
   * progress bar inside the corresponding chip. The component does not perform
   * uploads — call this from your upload pipeline.
   */
  setFileStatus(file: File, info: FileStatusInfo): void {
    if (!this._files.includes(file)) return;
    this._statusMap.set(file, info);
    this.requestUpdate();
    if (info.state === 'done') this._announce(`${file.name} uploaded`);
    else if (info.state === 'error') this._announce(`${file.name} failed: ${info.error ?? 'upload error'}`);
  }

  private _announce(message: string): void {
    // Force change so AT re-reads even when same message repeats.
    this._announcement = '';
    requestAnimationFrame(() => { this._announcement = message; });
  }

  private _handlePaste = (e: ClipboardEvent) => {
    if (!this.paste || this.disabled) return;
    // Don't hijack paste when the user is typing in an editable element.
    const active = document.activeElement as HTMLElement | null;
    const inEditable =
      !!active && (
        active.tagName === 'INPUT' ||
        active.tagName === 'TEXTAREA' ||
        active.isContentEditable ||
        // shadow DOM: check the deepest active element
        active.shadowRoot?.activeElement instanceof HTMLElement
      );
    if (inEditable && active !== this) return;
    const files = e.clipboardData?.files;
    if (files && files.length > 0) {
      e.preventDefault();
      this._addFiles(files);
    }
  };

  override connectedCallback(): void {
    super.connectedCallback();
    window.addEventListener('paste', this._handlePaste);
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    window.removeEventListener('paste', this._handlePaste);
    this._previews.forEach(url => URL.revokeObjectURL(url));
    this._previews.clear();
    this._statusMap.clear();
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

  /** Render a category-aware SVG icon for a chip thumbnail. */
  private _renderKindIcon(kind: 'image' | 'pdf' | 'doc' | 'media' | 'archive' | 'default') {
    return svg`
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
        ${kind === 'image' ? svg`
          <rect x="3" y="3" width="18" height="18" rx="2"/>
          <circle cx="8.5" cy="8.5" r="1.5"/>
          <path d="M21 15l-5-5L5 21"/>
        ` : kind === 'pdf' ? svg`
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
          <polyline points="14 2 14 8 20 8"/>
          <text x="8" y="17" font-size="6" font-family="sans-serif" font-weight="700" fill="currentColor" stroke="none">PDF</text>
        ` : kind === 'doc' ? svg`
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
          <polyline points="14 2 14 8 20 8"/>
          <line x1="8" y1="13" x2="16" y2="13"/>
          <line x1="8" y1="17" x2="14" y2="17"/>
        ` : kind === 'media' ? svg`
          <polygon points="5 3 19 12 5 21 5 3" fill="currentColor"/>
        ` : kind === 'archive' ? svg`
          <rect x="3" y="3" width="18" height="18" rx="2"/>
          <line x1="12" y1="3" x2="12" y2="21" stroke-dasharray="2 2"/>
        ` : svg`
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
          <polyline points="14 2 14 8 20 8"/>
        `}
      </svg>
    `;
  }

  private _renderTrigger() {
    if (this.variant === 'compact') {
      const count = this._files.length;
      return html`
        <button
          type="button"
          class="compact ${this._dragging ? 'dragging' : ''} ${this.disabled ? 'disabled' : ''}"
          ?disabled=${this.disabled}
          @click=${this._handleClick}
          @drop=${this._handleDrop}
          @dragenter=${this._handleDragEnter}
          @dragover=${this._handleDragOver}
          @dragleave=${this._handleDragLeave}
        >
          <span class="compact-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/>
            </svg>
          </span>
          <span>${this._dragging ? 'Drop to attach' : (count > 0 ? 'Add more files' : 'Attach files')}</span>
          ${count > 0 ? html`<span class="compact-count">${count}</span>` : nothing}
        </button>
      `;
    }
    return html`
      <div
        class="dropzone ${this._dragging ? 'dragging' : ''} ${this.disabled ? 'disabled' : ''}"
        role="button"
        tabindex=${this.disabled ? '-1' : '0'}
        aria-label=${this.label || 'File upload'}
        aria-disabled=${this.disabled ? 'true' : 'false'}
        @click=${this._handleClick}
        @keydown=${this._handleKeydown}
        @drop=${this._handleDrop}
        @dragenter=${this._handleDragEnter}
        @dragover=${this._handleDragOver}
        @dragleave=${this._handleDragLeave}
      >
        <div class="icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="17 8 12 3 7 8"/>
            <line x1="12" y1="3" x2="12" y2="15"/>
          </svg>
        </div>
        <div class="title">${this.placeholder}</div>
        <div class="subtitles">
          ${this.accept ? html`<div class="subtitle">Accepted: ${this.accept}</div>` : nothing}
          ${this.maxSize > 0 ? html`<div class="subtitle">Max size: ${this._formatSize(this.maxSize)}</div>` : nothing}
        </div>
      </div>
    `;
  }

  override render() {
    const fileCount = this._files.length;
    return html`
      ${this.label ? html`<label>${this.label}</label>` : nothing}
      ${this._renderTrigger()}
      <input
        type="file"
        accept=${this.accept}
        capture=${this.capture || nothing}
        ?multiple=${this.multiple}
        ?disabled=${this.disabled}
        @change=${this._handleChange}
      />
      ${fileCount >= 2 ? html`
        <div class="bulk-actions">
          <span class="bulk-count">${fileCount} files</span>
          <button
            type="button"
            class="bulk-clear"
            @click=${() => this.clearAll()}
          >
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
              <path d="M10.5 3.5l-7 7M3.5 3.5l7 7"/>
            </svg>
            Clear all
          </button>
        </div>
      ` : nothing}
      ${fileCount > 0 ? html`
        <div class="files">
          ${this._files.map((file, idx) => {
            const kind = this._fileKind(file);
            const previewUrl = this._previewFor(file);
            const status = this._statusMap.get(file);
            return html`
              <div class="file">
                <div class="file-thumb ${kind} ${previewUrl ? 'preview' : ''}">
                  ${previewUrl
                    ? html`<img src=${previewUrl} alt="" />`
                    : this._renderKindIcon(kind)}
                </div>
                <div class="file-info">
                  <span class="file-name">${file.name}</span>
                  <span class="file-size">
                    ${this._formatSize(file.size)}
                    ${status?.state === 'error' && status.error ? html` · ${status.error}` : nothing}
                  </span>
                  ${status?.state === 'uploading' ? html`
                    <div class="progress-track" role="progressbar"
                      aria-valuenow=${status.progress ?? 0}
                      aria-valuemin="0"
                      aria-valuemax="100"
                      aria-label=${`Uploading ${file.name}`}
                    >
                      <div class="progress-fill" style="width: ${Math.max(0, Math.min(100, status.progress ?? 0))}%"></div>
                    </div>
                  ` : nothing}
                </div>
                ${status && status.state !== 'idle' ? html`
                  <span class="status-pill ${status.state}">
                    ${status.state === 'uploading'
                      ? `${Math.round(status.progress ?? 0)}%`
                      : status.state === 'done' ? 'Done' : 'Failed'}
                  </span>
                ` : nothing}
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
            `;
          })}
        </div>
      ` : nothing}
      ${this.helper ? html`<div class="helper">${this.helper}</div>` : nothing}
      <div class="sr-only" role="status" aria-live="polite" aria-atomic="true">${this._announcement}</div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cg-file-input': CgFileInput;
  }
}
