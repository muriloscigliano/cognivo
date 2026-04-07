/**
 * @element ai-capture-flow
 * Multi-step capture wizard: upload, preview, processing, and result with step indicator.
 *
 * @example
 * ```html
 * <ai-capture-flow
 *   step="upload"
 *   accept=".pdf,.jpg,.png"
 *   heading="Document Scan"
 * ></ai-capture-flow>
 * ```
 *
 * @fires {CustomEvent<{file: File}>} ai-capture-file - File selected or dropped
 * @fires {CustomEvent} ai-capture-confirm - User confirmed the preview
 * @fires {CustomEvent} ai-capture-retry - User chose to retake/retry
 * @fires {CustomEvent} ai-capture-complete - User clicked Done on the result
 *
 * @cssprop [--cg-brand-ai-accent=#dfff61] - Step dots, progress fill, and primary button color
 */
import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { hostBlock, reducedMotion, fadeSlideInKeyframes } from '../../styles/index.js';

type Step = 'upload' | 'preview' | 'processing' | 'complete' | 'error';
const STEPS: Step[] = ['upload', 'preview', 'processing', 'complete'];

@customElement('ai-capture-flow')
export class AiCaptureFlow extends LitElement {
  static override styles = [hostBlock, reducedMotion, fadeSlideInKeyframes, css`
    :host {
      animation: fadeSlideIn 200ms var(--cg-motion-easing-enter) both;
    }

    .card {
      background: var(--cg-color-surface-cards-background);
      border: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
      border-radius: var(--cg-border-radius-200);
      padding: var(--cg-spacing-16);
    }

    /* ── Title ── */
    .title {
      font-size: var(--cg-font-size-base);
      font-weight: var(--cg-font-weight-bold);
      color: var(--cg-color-surface-base-text);
      margin-bottom: var(--cg-spacing-16);
    }

    /* ── Step indicator ── */
    .steps {
      display: flex;
      align-items: center;
      gap: 0;
      margin-bottom: var(--cg-spacing-16);
    }
    .step-dot {
      width: var(--cg-spacing-24);
      height: var(--cg-spacing-24);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: var(--cg-font-size-xs);
      font-weight: var(--cg-font-weight-bold);
      flex-shrink: 0;
      transition: opacity var(--cg-motion-duration-normal) var(--cg-motion-easing-color);
    }
    .step-dot.done {
      background: var(--cg-color-action-primary-background-default);
      color: var(--cg-color-surface-base-background);
    }
    .step-dot.active {
      background: var(--cg-color-action-primary-background-default);
      color: var(--cg-color-surface-base-background);
    }
    .step-dot.pending {
      background: var(--cg-color-surface-container-background);
      color: var(--cg-color-input-text-placeholder);
    }
    .step-line {
      flex: 1;
      height: 2px;
      background: var(--cg-color-surface-container-background);
      transition: background var(--cg-motion-duration-normal) var(--cg-motion-easing-color);
    }
    .step-line.done { background: var(--cg-color-action-primary-background-default); }

    /* ── Upload zone ── */
    .upload-zone {
      border: 2px dashed var(--cg-color-surface-cards-border);
      border-radius: var(--cg-border-radius-100);
      padding: var(--cg-spacing-24) var(--cg-spacing-16);
      text-align: center;
      cursor: pointer;
      transition: opacity var(--cg-motion-duration-fast) var(--cg-motion-easing-color);
    }
    .upload-zone:hover, .upload-zone.drag-over {
      border-color: var(--cg-color-surface-base-text);
      background: var(--cg-overlay-accent-subtle);
    }
    .upload-zone:focus-visible {
      outline: 2px solid var(--cg-color-accent-border);
      outline-offset: var(--cg-outline-offset-default);
    }
    .upload-icon { font-size: var(--cg-font-size-3xl); margin-bottom: var(--cg-spacing-8); }
    .upload-text {
      font-size: var(--cg-font-size-sm);
      color: var(--cg-color-input-text-placeholder);
      line-height: 1.5;
    }
    .upload-hint {
      font-size: var(--cg-font-size-xs);
      color: var(--cg-color-input-text-placeholder);
      margin-top: var(--cg-spacing-6);
    }
    input[type="file"] { display: none; }

    /* ── Preview ── */
    .preview { text-align: center; }
    .preview-img {
      max-width: 100%;
      max-height: var(240px);
      border-radius: var(--cg-border-radius-100);
      border: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
      margin-bottom: var(--cg-spacing-16);
      object-fit: contain;
    }

    /* ── Progress ── */
    .processing { text-align: center; }
    .progress-label {
      font-size: var(--cg-font-size-sm);
      color: var(--cg-color-input-text-placeholder);
      margin-bottom: var(--cg-spacing-12);
    }
    .progress-bar {
      width: 100%;
      height: var(--cg-spacing-6);
      background: var(--cg-color-surface-container-background);
      border-radius: var(--cg-border-radius-25);
      overflow: hidden;
      margin-bottom: var(--cg-spacing-8);
    }
    .progress-fill {
      height: 100%;
      background: var(--cg-color-action-primary-background-default);
      border-radius: var(--cg-border-radius-25);
      transition: width var(--cg-motion-duration-slow) var(--cg-motion-easing-default);
    }
    .progress-pct {
      font-size: var(--cg-font-size-sm);
      font-weight: var(--cg-font-weight-semibold);
      color: var(--cg-color-surface-base-text);
    }

    /* ── Result ── */
    .result { text-align: center; }
    .result-icon {
      font-size: var(--cg-font-size-2xl);
      margin-bottom: var(--cg-spacing-8);
      color: var(--cg-color-status-success-text-default);
    }
    .result-text {
      font-size: var(--cg-font-size-sm);
      color: var(--cg-color-surface-base-text);
      line-height: 1.5;
      margin-bottom: var(--cg-spacing-16);
      white-space: pre-wrap;
    }

    /* ── Error ── */
    .error-icon { color: var(--cg-color-status-error-text-default); }
    .error-text { color: var(--cg-color-status-error-text-default); }

    /* ── Buttons ── */
    .btn-row {
      display: flex;
      gap: var(--cg-spacing-8);
      justify-content: center;
      margin-top: var(--cg-spacing-16);
    }
    .btn-row button {
      padding: var(--cg-spacing-8) var(--cg-spacing-16);
      border-radius: var(--cg-border-radius-100);
      font-size: var(--cg-font-size-sm);
      font-weight: var(--cg-font-weight-semibold);
      cursor: pointer;
      border: none;
      font-family: inherit;
      transition: filter var(--cg-motion-duration-fast) var(--cg-motion-easing-color), background var(--cg-motion-duration-fast) var(--cg-motion-easing-color);
    }
    .btn-row button:focus-visible {
      outline: 2px solid var(--cg-color-accent-border);
      outline-offset: var(--cg-outline-offset-default);
    }
    .btn-primary {
      background: var(--cg-color-action-primary-background-default);
      color: var(--cg-color-surface-base-background);
    }
    .btn-primary:hover { filter: brightness(0.9); }
    .btn-secondary {
      background: var(--cg-color-surface-container-background);
      color: var(--cg-color-surface-base-text);
      border: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
    }
    .btn-secondary:hover { background: var(--cg-color-surface-cards-border); }
  `];
  @property({ type: String }) step: Step = 'upload';
  @property({ type: String }) accept = '.pdf,.jpg,.png';
  @property({ type: String }) previewUrl = '';
  @property({ type: String }) result = '';
  @property({ type: Number }) progress = 0;
  @property({ type: String }) heading = 'Capture';

  @state() private _dragOver = false;

  private _dispatch(name: string, detail?: unknown) {
    this.dispatchEvent(new CustomEvent(name, { bubbles: true, composed: true, detail }));
  }

  private _onDragOver(e: DragEvent) {
    e.preventDefault();
    this._dragOver = true;
  }

  private _onDragLeave() { this._dragOver = false; }

  private _onDrop(e: DragEvent) {
    e.preventDefault();
    this._dragOver = false;
    const file = e.dataTransfer?.files[0];
    if (file) this._dispatch('ai-capture-file', { file });
  }

  private _onFileInput(e: Event) {
    const input = e.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) this._dispatch('ai-capture-file', { file });
    input.value = '';
  }

  private _triggerFileInput() {
    this.shadowRoot?.querySelector<HTMLInputElement>('#file-input')?.click();
  }

  private _stepIndex(): number {
    if (this.step === 'error') return -1;
    return STEPS.indexOf(this.step);
  }

  private _renderSteps() {
    const current = this._stepIndex();
    const labels = ['Upload', 'Preview', 'Process', 'Done'];
    return html`
      <div class="steps" role="navigation" aria-label="Capture progress">
        ${labels.map((label, i) => {
          const cls = i < current ? 'done' : i === current ? 'active' : 'pending';
          return html`
            ${i > 0 ? html`<div class="step-line ${i <= current ? 'done' : ''}"></div>` : nothing}
            <div class="step-dot ${cls}" aria-label="${label}: ${cls}" title="${label}">
              ${i < current ? '\u2713' : i + 1}
            </div>
          `;
        })}
      </div>
    `;
  }

  private _renderUpload() {
    return html`
      <div
        class="upload-zone ${this._dragOver ? 'drag-over' : ''}"
        role="button"
        tabindex="0"
        aria-label="Upload file"
        @click=${this._triggerFileInput}
        @keydown=${(e: KeyboardEvent) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); this._triggerFileInput(); } }}
        @dragover=${this._onDragOver}
        @dragleave=${this._onDragLeave}
        @drop=${this._onDrop}
      >
        <div class="upload-icon" aria-hidden="true">&#128206;</div>
        <div class="upload-text">Drop file here or click to browse</div>
        <div class="upload-hint">Accepted: ${this.accept}</div>
      </div>
      <input type="file" id="file-input" accept=${this.accept} @change=${this._onFileInput}>
    `;
  }

  private _renderPreview() {
    return html`
      <div class="preview">
        ${this.previewUrl
          ? html`<img class="preview-img" src=${this.previewUrl} alt="File preview">`
          : html`<div class="upload-text">No preview available</div>`}
        <div class="btn-row">
          <button class="btn-secondary" @click=${() => this._dispatch('ai-capture-retry')}>Retake</button>
          <button class="btn-primary" @click=${() => this._dispatch('ai-capture-confirm')}>Confirm</button>
        </div>
      </div>
    `;
  }

  private _renderProcessing() {
    return html`
      <div class="processing">
        <div class="progress-label">Processing...</div>
        <div class="progress-bar" role="progressbar" aria-valuenow=${this.progress} aria-valuemin="0" aria-valuemax="100">
          <div class="progress-fill" style="width:${Math.min(this.progress, 100)}%"></div>
        </div>
        <div class="progress-pct">${Math.round(this.progress)}%</div>
      </div>
    `;
  }

  private _renderComplete() {
    return html`
      <div class="result">
        <div class="result-icon" aria-hidden="true">&#10003;</div>
        <div class="result-text">${this.result || 'Processing complete'}</div>
        <div class="btn-row">
          <button class="btn-primary" @click=${() => this._dispatch('ai-capture-complete')}>Done</button>
        </div>
      </div>
    `;
  }

  private _renderError() {
    return html`
      <div class="result">
        <div class="result-icon error-icon" aria-hidden="true">&#10007;</div>
        <div class="result-text error-text">${this.result || 'An error occurred'}</div>
        <div class="btn-row">
          <button class="btn-secondary" @click=${() => this._dispatch('ai-capture-retry')}>Retry</button>
        </div>
      </div>
    `;
  }

  override render() {
    return html`
      <div class="card" role="region" aria-label="${this.heading}">
        ${this.heading ? html`<div class="title">${this.heading}</div>` : nothing}
        ${this._renderSteps()}
        ${this.step === 'upload' ? this._renderUpload()
          : this.step === 'preview' ? this._renderPreview()
          : this.step === 'processing' ? this._renderProcessing()
          : this.step === 'complete' ? this._renderComplete()
          : this._renderError()}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ai-capture-flow': AiCaptureFlow;
  }
}
