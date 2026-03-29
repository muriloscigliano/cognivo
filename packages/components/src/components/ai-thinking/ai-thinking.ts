/**
 * <ai-thinking> — Full AI Loading System
 *
 * 3 variants: dots (default), spinner, skeleton
 * 3 sizes: sm (inline), md (block), lg (full-width)
 * Stages: cycle through status messages ("Connecting...", "Analyzing...")
 * Tools: show tool call badges with status (loading/complete/error)
 * Cancel: optional cancel button
 * Progress: optional determinate progress bar (0-100)
 * Delay: 200ms default delay before showing (no flash for fast responses)
 */
import { LitElement, html, css, nothing } from 'lit';
import { property, state, customElement } from 'lit/decorators.js';

interface ToolCall {
  name: string;
  status: 'loading' | 'complete' | 'error';
  result?: string;
}

@customElement('ai-thinking')
export class AiThinking extends LitElement {
  static override styles = css`
    :host {
      transition: color var(--cg-motion-duration-fast, 80ms) var(--cg-motion-easing-color, cubic-bezier(0, 0, 0.58, 1));
      display: inline-flex;
      font-family: var(--cg-font-family-primary, 'Inter Variable', 'Inter', -apple-system, sans-serif);
    }
    :host([size="md"]), :host([size="lg"]) {
      display: flex;
    }
    :host([hidden]) { display: none; }

    /* ── Container ── */
    .container {
      display: flex;
      align-items: center;
      gap: 8px;
      width: 100%;
    }
    :host([size="lg"]) .container {
      flex-direction: column;
      align-items: stretch;
      gap: 12px;
    }

    /* ── Spinner icon ── */
    .icon {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: linear-gradient(135deg, var(--cg-brand-ai-accent, #dfff61), var(--cg-brand-ai-highlight, #e2ff70));
      display: flex;
      align-items: center;
      justify-content: center;
      animation: spin 1.2s linear infinite;
      flex-shrink: 0;
    }
    :host([size="sm"]) .icon { width: 16px; height: 16px; }
    :host([size="lg"]) .icon { width: 28px; height: 28px; }
    .icon::after {
      content: '';
      width: 8px;
      height: 8px;
      background: var(--cg-color-surface-base-background, #09090b);
      border-radius: 50%;
    }
    :host([size="sm"]) .icon::after { width: 6px; height: 6px; }
    :host([size="lg"]) .icon::after { width: 12px; height: 12px; }

    /* ── Text ── */
    .text {
      font-size: var(--cg-font-size-sm, 14px);
      font-weight: var(--cg-font-weight-medium, 500);
      color: var(--cg-color-surface-base-text, #fafafa);
      white-space: nowrap;
    }
    :host([size="sm"]) .text { font-size: 12px; }
    :host([size="lg"]) .text { font-size: 16px; }

    /* ── Dots variant ── */
    .dots {
      display: inline-flex;
      gap: 3px;
      margin-left: 2px;
    }
    .dot {
      width: 4px;
      height: 4px;
      border-radius: 50%;
      background: var(--cg-brand-ai-accent, #dfff61);
      animation: pulse 1.4s ease-in-out infinite;
    }
    .dot:nth-child(2) { animation-delay: 0.2s; }
    .dot:nth-child(3) { animation-delay: 0.4s; }

    /* ── Spinner variant (ring) ── */
    .ring {
      width: 20px;
      height: 20px;
      border: 2px solid rgba(223, 255, 97, 0.2);
      border-top-color: var(--cg-brand-ai-accent, #dfff61);
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
      flex-shrink: 0;
    }
    :host([size="sm"]) .ring { width: 14px; height: 14px; border-width: 1.5px; }
    :host([size="lg"]) .ring { width: 28px; height: 28px; border-width: 3px; }

    /* ── Skeleton variant ── */
    .skeleton {
      display: flex;
      flex-direction: column;
      gap: 8px;
      width: 100%;
    }
    .skeleton-line {
      height: 12px;
      border-radius: 6px;
      background: linear-gradient(90deg, var(--cg-gray-800, #27272a) 25%, var(--cg-gray-700, #3f3f46) 50%, var(--cg-gray-800, #27272a) 75%);
      background-size: 200% 100%;
      animation: shimmer 1.5s linear infinite;
    }
    .skeleton-line:nth-child(1) { width: 85%; }
    .skeleton-line:nth-child(2) { width: 70%; }
    .skeleton-line:nth-child(3) { width: 55%; }
    :host([size="sm"]) .skeleton-line { height: 8px; }
    :host([size="lg"]) .skeleton-line { height: 16px; border-radius: 8px; }

    /* ── Progress bar ── */
    .progress-bar {
      width: 100%;
      height: 3px;
      background: var(--cg-gray-800, #27272a);
      border-radius: 2px;
      overflow: hidden;
    }
    .progress-fill {
      height: 100%;
      background: var(--cg-brand-ai-accent, #dfff61);
      border-radius: 2px;
      transition: width 300ms ease;
    }

    /* ── Tools ── */
    .tools {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
    }
    .tool {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      padding: 3px 10px;
      font-size: 11px;
      font-weight: 600;
      border-radius: 6px;
      background: var(--cg-gray-800, #27272a);
      color: var(--cg-gray-400, #a1a1aa);
      border: 1px solid var(--cg-gray-700, #3f3f46);
      animation: fadeIn 200ms ease;
    }
    .tool .tool-icon {
      width: 12px;
      height: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .tool.loading .tool-icon {
      animation: spin 0.8s linear infinite;
    }
    .tool.complete { color: var(--cg-green-400, #4ade80); border-color: rgba(34, 197, 94, 0.2); }
    .tool.error { color: var(--cg-red-400, #f87171); border-color: rgba(239, 68, 68, 0.2); }

    /* ── Cancel button ── */
    .cancel {
      background: none;
      border: 1px solid var(--cg-gray-700, #3f3f46);
      color: var(--cg-gray-400, #a1a1aa);
      border-radius: 6px;
      padding: 2px 10px;
      font-size: 11px;
      font-weight: 600;
      cursor: pointer;
      transition: all 150ms ease;
      margin-left: auto;
      flex-shrink: 0;
    }
    .cancel:hover {
      color: var(--cg-red-400, #f87171);
      border-color: rgba(239, 68, 68, 0.3);
      background: rgba(239, 68, 68, 0.08);
    }
    .cancel:focus-visible {
      outline: 2px solid var(--cg-brand-ai-accent, #dfff61);
      outline-offset: 2px;
    }

    /* ── Shimmer text effect ── */
    .shimmer .text {
      background: linear-gradient(
        90deg,
        var(--cg-color-surface-base-text, #fafafa) 25%,
        var(--cg-brand-ai-accent, #dfff61) 50%,
        var(--cg-color-surface-base-text, #fafafa) 75%
      );
      background-size: 200% 100%;
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      animation: shimmer 2s linear infinite;
    }

    /* ── Keyframes ── */
    @keyframes pulse {
      0%, 80%, 100% { opacity: 0.3; transform: scale(0.8); }
      40% { opacity: 1; transform: scale(1.1); }
    }
    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    @keyframes shimmer {
      0% { background-position: 200% 0; }
      100% { background-position: -200% 0; }
    }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(4px); }
      to { opacity: 1; transform: translateY(0); }
    }

    @media (prefers-reduced-motion: reduce) {
      .icon, .ring, .tool.loading .tool-icon { animation: none; }
      .dot { animation: none; opacity: 0.6; }
      .skeleton-line { animation: none; background: var(--cg-gray-800, #27272a); }
      .shimmer .text { animation: none; -webkit-text-fill-color: var(--cg-brand-ai-accent, #dfff61); }
      .progress-fill { transition: none; }
    }
  `;

  /** Display text */
  @property({ type: String }) text: string = 'Thinking';

  /** Variant: dots (default), spinner, skeleton */
  @property({ type: String, reflect: true }) variant: 'dots' | 'spinner' | 'skeleton' = 'dots';

  /** Size: sm (inline), md (block), lg (full-width) */
  @property({ type: String, reflect: true }) size: 'sm' | 'md' | 'lg' = 'md';

  /** Enable shimmer text effect */
  @property({ type: Boolean }) shimmer: boolean = false;

  /** Stages — cycle through these messages */
  @property({ type: Array }) stages: string[] = [];

  /** Show cancel button */
  @property({ type: Boolean }) cancelable: boolean = false;

  /** Tool call indicators */
  @property({ type: Array }) tools: ToolCall[] = [];

  /** Determinate progress (0-100). -1 = indeterminate */
  @property({ type: Number }) progress: number = -1;

  /** Delay in ms before showing (default 200) */
  @property({ type: Number }) delay: number = 200;

  @state() private _visible: boolean = false;
  @state() private _stageIndex: number = 0;
  private _delayTimer?: ReturnType<typeof setTimeout>;
  private _stageTimer?: ReturnType<typeof setInterval>;

  override connectedCallback() {
    super.connectedCallback();
    if (this.delay > 0) {
      this._visible = false;
      this._delayTimer = setTimeout(() => { this._visible = true; }, this.delay);
    } else {
      this._visible = true;
    }
    this._startStages();
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    if (this._delayTimer) clearTimeout(this._delayTimer);
    if (this._stageTimer) clearInterval(this._stageTimer);
  }

  override updated(changed: Map<string, unknown>) {
    if (changed.has('stages')) {
      this._stageIndex = 0;
      this._startStages();
    }
  }

  private _startStages() {
    if (this._stageTimer) clearInterval(this._stageTimer);
    if (this.stages.length > 1) {
      this._stageTimer = setInterval(() => {
        this._stageIndex = (this._stageIndex + 1) % this.stages.length;
        this.dispatchEvent(new CustomEvent('ai-thinking-stage-change', {
          bubbles: true, composed: true,
          detail: { stage: this.stages[this._stageIndex], index: this._stageIndex },
        }));
      }, 2500);
    }
  }

  private _handleCancel() {
    this.dispatchEvent(new CustomEvent('ai-thinking-cancel', {
      bubbles: true, composed: true,
    }));
  }

  private get _displayText(): string {
    if (this.stages.length > 0) return this.stages[this._stageIndex];
    return this.text;
  }

  private _humanizeTool(name: string): string {
    const map: Record<string, string> = {
      web_search: 'Searching the web',
      code_execution: 'Running code',
      database: 'Querying database',
      file_search: 'Searching files',
      calculator: 'Calculating',
      image_generation: 'Generating image',
    };
    return map[name] || name.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  }

  private _renderToolIcon(status: string) {
    if (status === 'complete') return html`<span>✓</span>`;
    if (status === 'error') return html`<span>✕</span>`;
    return html`<span style="width:10px;height:10px;border:1.5px solid currentColor;border-top-color:transparent;border-radius:50%;display:block;"></span>`;
  }

  private _renderIndicator() {
    if (this.variant === 'skeleton') {
      return html`
        <div class="skeleton">
          <div class="skeleton-line"></div>
          <div class="skeleton-line"></div>
          <div class="skeleton-line"></div>
        </div>
      `;
    }
    if (this.variant === 'spinner') {
      return html`<div class="ring" aria-hidden="true"></div>`;
    }
    // Default: dots
    return html`<div class="icon" aria-hidden="true"></div>`;
  }

  override render() {
    if (!this._visible) return nothing;

    const showText = this.variant !== 'skeleton';
    const showDots = this.variant === 'dots';

    return html`
      <div class="container ${this.shimmer ? 'shimmer' : ''}" role="status" aria-live="polite" aria-label="${this._displayText}">

        ${this._renderIndicator()}

        ${showText ? html`
          <span class="text">${this._displayText}</span>
          ${showDots ? html`
            <span class="dots" aria-hidden="true">
              <span class="dot"></span>
              <span class="dot"></span>
              <span class="dot"></span>
            </span>
          ` : nothing}
        ` : nothing}

        ${this.cancelable ? html`
          <button class="cancel" @click=${this._handleCancel} aria-label="Cancel">Cancel</button>
        ` : nothing}

        ${this.progress >= 0 ? html`
          <div class="progress-bar" role="progressbar" aria-valuenow="${this.progress}" aria-valuemin="0" aria-valuemax="100">
            <div class="progress-fill" style="width: ${Math.min(this.progress, 100)}%"></div>
          </div>
        ` : nothing}

        ${this.tools.length > 0 ? html`
          <div class="tools">
            ${this.tools.map(t => html`
              <div class="tool ${t.status}">
                <span class="tool-icon">${this._renderToolIcon(t.status)}</span>
                <span>${this._humanizeTool(t.name)}</span>
              </div>
            `)}
          </div>
        ` : nothing}
      </div>
    `;
  }
}
