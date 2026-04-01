/**
 * @element ai-capture-flow
 * Multi-step capture wizard: upload, preview, processing, and result with step indicator.
 *
 * @example
 * ```html
 * <ai-capture-flow
 *   step="upload"
 *   accept=".pdf,.jpg,.png"
 *   title="Document Scan"
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
      animation: fadeSlideIn 200ms var(--cg-motion-easing-enter, cubic-bezier(0, 0, 0.2, 1)) both;
    }

    .card {
      background: var(--cg-color-surface-cards-background, #18181b);
      background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0.03), transparent);
      border: 1px solid var(--cg-color-surface-cards-border, #27272a);
      border-radius: var(--cg-border-radius-200, 12px);
      padding: 20px;
      box-shadow: inset 0 1px 0 0 rgba(255, 255, 255, 0.05);
    }

    /* ── Title ── */
    .title {
      font-size: 16px;
      font-weight: 700;
      color: var(--cg-color-surface-base-text, #fafafa);
      margin-bottom: 16px;
    }

    /* ── Step indicator ── */
    .steps {
      display: flex;
      align-items: center;
      gap: 0;
      margin-bottom: 20px;
    }
    .step-dot {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 11px;
      font-weight: 700;
      flex-shrink: 0;
      transition: all 200ms ease;
    }
    .step-dot.done {
      background: var(--cg-brand-ai-accent, #dfff61);
      color: #09090b;
    }
    .step-dot.active {
      background: var(--cg-brand-ai-accent, #dfff61);
      color: #09090b;
      box-shadow: 0 0 0 3px rgba(223, 255, 97, 0.25);
    }
    .step-dot.pending {
      background: var(--cg-gray-800, #27272a);
      color: var(--cg-gray-500, #71717a);
    }
    .step-line {
      flex: 1;
      height: 2px;
      background: var(--cg-gray-800, #27272a);
      transition: background 200ms ease;
    }
    .step-line.done { background: var(--cg-brand-ai-accent, #dfff61); }

    /* ── Upload zone ── */
    .upload-zone {
      border: 2px dashed var(--cg-gray-700, #3f3f46);
      border-radius: 10px;
      padding: 40px 20px;
      text-align: center;
      cursor: pointer;
      transition: all 150ms ease;
    }
    .upload-zone:hover, .upload-zone.drag-over {
      border-color: var(--cg-brand-ai-accent, #dfff61);
      background: rgba(223, 255, 97, 0.04);
    }
    .upload-zone:focus-visible {
      outline: 2px solid var(--cg-brand-ai-accent, #dfff61);
      outline-offset: 2px;
    }
    .upload-icon { font-size: 32px; margin-bottom: 8px; }
    .upload-text {
      font-size: 14px;
      color: var(--cg-gray-400, #a1a1aa);
      line-height: 1.5;
    }
    .upload-hint {
      font-size: 12px;
      color: var(--cg-gray-500, #71717a);
      margin-top: 6px;
    }
    input[type="file"] { display: none; }

    /* ── Preview ── */
    .preview { text-align: center; }
    .preview-img {
      max-width: 100%;
      max-height: 240px;
      border-radius: 8px;
      border: 1px solid var(--cg-gray-700, #3f3f46);
      margin-bottom: 16px;
      object-fit: contain;
    }

    /* ── Progress ── */
    .processing { text-align: center; }
    .progress-label {
      font-size: 14px;
      color: var(--cg-gray-400, #a1a1aa);
      margin-bottom: 12px;
    }
    .progress-bar {
      width: 100%;
      height: 6px;
      background: var(--cg-gray-800, #27272a);
      border-radius: 3px;
      overflow: hidden;
      margin-bottom: 8px;
    }
    .progress-fill {
      height: 100%;
      background: var(--cg-brand-ai-accent, #dfff61);
      border-radius: 3px;
      transition: width 300ms ease;
    }
    .progress-pct {
      font-size: 13px;
      font-weight: 600;
      color: var(--cg-brand-ai-accent, #dfff61);
    }

    /* ── Result ── */
    .result { text-align: center; }
    .result-icon {
      font-size: 36px;
      margin-bottom: 8px;
      color: var(--cg-green-400, #4ade80);
    }
    .result-text {
      font-size: 14px;
      color: var(--cg-color-surface-base-text, #fafafa);
      line-height: 1.5;
      margin-bottom: 16px;
      white-space: pre-wrap;
    }

    /* ── Error ── */
    .error-icon { color: var(--cg-red-400, #f87171); }
    .error-text { color: var(--cg-red-400, #f87171); }

    /* ── Buttons ── */
    .btn-row {
      display: flex;
      gap: 10px;
      justify-content: center;
      margin-top: 16px;
    }
    button {
      padding: 10px 20px;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      border: none;
      transition: all 150ms ease;
    }
    button:focus-visible {
      outline: 2px solid var(--cg-brand-ai-accent, #dfff61);
      outline-offset: 2px;
    }
    .btn-primary {
      background: var(--cg-brand-ai-accent, #dfff61);
      color: #09090b;
    }
    .btn-primary:hover { filter: brightness(0.9); }
    .btn-secondary {
      background: var(--cg-gray-800, #27272a);
      color: var(--cg-gray-300, #d4d4d8);
      border: 1px solid var(--cg-gray-700, #3f3f46);
    }
    .btn-secondary:hover { background: var(--cg-gray-700, #3f3f46); }
    }
  `];
  @property({ type: String }) step: Step = 'upload';
  @property({ type: String }) accept = '.pdf,.jpg,.png';
  @property({ type: String }) previewUrl = '';
  @property({ type: String }) result = '';
  @property({ type: Number }) progress = 0;
  @property({ type: String }) override title = 'Capture';

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
      <div class="card" role="region" aria-label="${this.title}">
        ${this.title ? html`<div class="title">${this.title}</div>` : nothing}
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
