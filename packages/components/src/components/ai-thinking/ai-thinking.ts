/**
 * @element ai-thinking
 * AI loading indicator with dots, spinner, or skeleton variants.
 * Card materializes in with slide-up + fade. Animations loop continuously.
 *
 * @fires ai-thinking-cancel - When cancel button is clicked
 * @fires {CustomEvent<{stage: string, index: number}>} ai-thinking-stage-change - When stage cycles
 */
import { LitElement, html, css, nothing } from 'lit';
import { property, state, customElement } from 'lit/decorators.js';
import { hostBlock, reducedMotion } from '../../styles/index.js';

interface ToolCall {
  name: string;
  status: 'loading' | 'complete' | 'error';
  result?: string;
}

@customElement('ai-thinking')
export class AiThinking extends LitElement {
  static override styles = [hostBlock, reducedMotion, css`
    :host([hidden]) { display: none; }

    /* ── Materialize entrance ── */
    .container {
      display: flex;
      align-items: center;
      gap: var(--cg-spacing-16);
      width: 100%;
      background: var(--cg-color-surface-cards-background);
      border: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
      border-radius: var(--cg-component-card-radius);
      padding: var(--cg-spacing-16) var(--cg-spacing-20);
      animation: materialize 0.7s cubic-bezier(0.16, 1, 0.3, 1) both;
    }
    :host([size="sm"]) .container {
      padding: var(--cg-spacing-12) var(--cg-spacing-16);
      gap: var(--cg-spacing-12);
    }
    :host([size="lg"]) .container {
      flex-direction: column;
      align-items: stretch;
      gap: var(--cg-spacing-16);
      padding: var(--cg-spacing-20) var(--cg-spacing-24);
    }

    @keyframes materialize {
      from { opacity: 0; transform: translateY(var(--cg-spacing-24)); }
      to { opacity: 1; transform: translateY(0); }
    }

    /* ── Text ── */
    .text {
      font-size: var(--cg-font-size-sm);
      font-weight: var(--cg-font-weight-medium);
      color: var(--cg-color-surface-container-outlined);
      white-space: nowrap;
    }
    :host([size="sm"]) .text { font-size: var(--cg-font-size-xs); }
    :host([size="lg"]) .text { font-size: var(--cg-font-size-base); }

    /* ── Shimmer variant — standalone text, no container ── */
    :host([variant="shimmer"]) .container {
      background: transparent;
      border: none;
      padding: 0;
      animation: none;
    }

    /* ── Shimmer text effect — continuous ── */
    .shimmer .text,
    :host([variant="shimmer"]) .text {
      background: linear-gradient(
        110deg,
        var(--cg-color-surface-container-outlined) 35%,
        var(--cg-color-surface-base-text) 50%,
        var(--cg-color-surface-container-outlined) 65%
      );
      background-size: 300% 100%;
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      animation: textSweep 1.8s ease-in-out infinite;
    }

    @keyframes textSweep {
      0% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }

    /* ── Dots variant — 3 pulsing dots after text ── */
    .dots {
      display: inline-flex;
      gap: var(--cg-spacing-4);
      align-items: center;
    }
    .dot {
      width: var(--cg-spacing-4);
      height: var(--cg-spacing-4);
      border-radius: var(--cg-border-radius-full);
      background: var(--cg-color-action-primary-background-default);
      animation: dotPulse 1.4s ease-in-out infinite;
    }
    .dot:nth-child(2) { animation-delay: 0.16s; }
    .dot:nth-child(3) { animation-delay: 0.32s; }

    @keyframes dotPulse {
      0%, 80%, 100% { opacity: 0.25; transform: scale(0.75); }
      40% { opacity: 1; transform: scale(1); }
    }

    /* ── Spinner variant (ring) ── */
    .ring {
      width: var(--cg-spacing-16);
      height: var(--cg-spacing-16);
      border: var(--cg-border-width-100) solid var(--cg-color-loading-spinner-secondary);
      border-top-color: var(--cg-color-loading-spinner-primary);
      border-radius: var(--cg-border-radius-full);
      animation: spin 0.8s linear infinite;
      flex-shrink: 0;
    }
    :host([size="sm"]) .ring { width: var(--cg-spacing-12); height: var(--cg-spacing-12); }
    :host([size="lg"]) .ring { width: var(--cg-spacing-20); height: var(--cg-spacing-20); }

    @keyframes spin { to { transform: rotate(360deg); } }

    /* ── Skeleton variant ── */
    .skeleton {
      display: flex;
      flex-direction: column;
      gap: var(--cg-spacing-12);
      width: 100%;
    }
    .skeleton-line {
      height: var(--cg-spacing-12);
      border-radius: var(--cg-border-radius-50);
      background: var(--cg-color-surface-cards-border);
      position: relative;
      overflow: hidden;
    }
    .skeleton-line::after {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(90deg, transparent 25%, var(--cg-overlay-dark-light) 50%, transparent 75%);
      background-size: 200% 100%;
      animation: shimmer 1.5s linear infinite;
    }
    .skeleton-line:nth-child(1) { width: 85%; }
    .skeleton-line:nth-child(2) { width: 70%; }
    .skeleton-line:nth-child(3) { width: 55%; }
    :host([size="sm"]) .skeleton-line { height: var(--cg-spacing-8); }
    :host([size="lg"]) .skeleton-line { height: var(--cg-spacing-16); }

    @keyframes shimmer {
      0% { background-position: 200% 0; }
      100% { background-position: -200% 0; }
    }

    /* ── Progress bar ── */
    .progress-bar {
      width: 100%;
      height: var(--cg-spacing-4);
      background: var(--cg-color-surface-cards-border);
      border-radius: var(--cg-border-radius-full);
      overflow: hidden;
    }
    .progress-fill {
      height: 100%;
      background: var(--cg-color-action-primary-background-default);
      border-radius: var(--cg-border-radius-full);
      transition: width var(--cg-motion-duration-slow) var(--cg-motion-easing-default);
    }

    /* ── Tools ── */
    .tools {
      display: flex;
      flex-wrap: wrap;
      gap: var(--cg-spacing-8);
    }
    .tool {
      display: inline-flex;
      align-items: center;
      gap: var(--cg-spacing-8);
      padding: var(--cg-spacing-4) var(--cg-spacing-8);
      font-size: var(--cg-font-size-xs);
      font-weight: var(--cg-font-weight-medium);
      border-radius: var(--cg-border-radius-100);
      background: var(--cg-color-surface-cards-background);
      color: var(--cg-color-surface-container-outlined);
      border: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
      animation: materialize var(--cg-motion-duration-slow) var(--cg-motion-easing-enter) both;
    }
    .tool-icon {
      width: var(--cg-spacing-12);
      height: var(--cg-spacing-12);
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .tool.loading .tool-icon { animation: spin 0.8s linear infinite; }
    .tool.complete { color: var(--cg-color-status-success-text-default); border-color: var(--cg-color-status-success-border-default); }
    .tool.error { color: var(--cg-color-status-error-text-default); border-color: var(--cg-color-status-error-border-default); }

    /* ── Cancel button ── */
    .cancel {
      background: transparent;
      border: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
      color: var(--cg-color-surface-container-outlined);
      border-radius: var(--cg-border-radius-100);
      padding: var(--cg-spacing-6) var(--cg-spacing-16);
      font-size: var(--cg-font-size-xs);
      font-weight: var(--cg-font-weight-medium);
      cursor: pointer;
      font-family: inherit;
      transition: color var(--cg-motion-duration-fast) var(--cg-motion-easing-default), border-color var(--cg-motion-duration-fast) var(--cg-motion-easing-default), background var(--cg-motion-duration-fast) var(--cg-motion-easing-default);
      margin-left: auto;
      flex-shrink: 0;
    }
    .cancel:hover {
      color: var(--cg-color-status-error-text-default);
      border-color: var(--cg-color-status-error-text-default);
      background: var(--cg-color-status-error-background-default);
    }
    .cancel:focus-visible {
      outline: none;
      box-shadow: 0 0 0 3px var(--cg-overlay-accent-strong);
    }

    @media (prefers-reduced-motion: reduce) {
      .container { animation: none; }
      .dot, .ring, .skeleton-line::after, .tool.loading .tool-icon { animation: none; }
      .shimmer .text { animation: none; -webkit-text-fill-color: currentColor; }
      .dot { opacity: 0.6; }
    }
  `];

  @property({ type: String }) text = 'Thinking';
  @property({ type: String, reflect: true }) variant: 'dots' | 'spinner' | 'skeleton' | 'shimmer' = 'dots';
  @property({ type: String, reflect: true }) size: 'sm' | 'md' | 'lg' = 'md';
  @property({ type: Boolean }) shimmer = false;
  @property({ type: Array }) stages: string[] = [];
  @property({ type: Boolean }) cancelable = false;
  @property({ type: Array }) tools: ToolCall[] = [];
  @property({ type: Number }) progress = -1;
  @property({ type: Number }) delay = 200;

  @state() private _visible = false;
  @state() private _stageIndex = 0;
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
    this.dispatchEvent(new CustomEvent('ai-thinking-cancel', { bubbles: true, composed: true }));
  }

  private get _displayText(): string {
    if (this.stages.length > 0) return this.stages[this._stageIndex]!;
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
    if (status === 'complete') return html`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>`;
    if (status === 'error') return html`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>`;
    return html`<span style="width:100%;height:100%;border:1.5px solid currentColor;border-top-color:transparent;border-radius:50%;display:block;"></span>`;
  }

  override render() {
    if (!this._visible) return nothing;

    return html`
      <div class="container ${this.shimmer ? 'shimmer' : ''}" role="status" aria-live="polite" aria-label="${this._displayText}">

        ${this.variant === 'skeleton' ? html`
          <div class="skeleton">
            <div class="skeleton-line"></div>
            <div class="skeleton-line"></div>
            <div class="skeleton-line"></div>
          </div>
        ` : nothing}

        ${this.variant === 'spinner' ? html`
          <div class="ring" aria-hidden="true"></div>
          <span class="text">${this._displayText}</span>
        ` : nothing}

        ${this.variant === 'shimmer' ? html`
          <span class="text">${this._displayText}</span>
        ` : nothing}

        ${this.variant === 'dots' ? html`
          <span class="text">${this._displayText}</span>
          <span class="dots" aria-hidden="true">
            <span class="dot"></span>
            <span class="dot"></span>
            <span class="dot"></span>
          </span>
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
