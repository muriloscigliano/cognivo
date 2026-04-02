/**
 * @element ai-timeline
 * Vertical execution timeline showing agent steps with status dots
 * (pending/active/complete/error), duration bars, tool tags, and
 * expandable detail panels. Active steps show a pulse animation.
 *
 * @example
 * ```html
 * <ai-timeline .steps=${[
 *   { label: 'Parse query', status: 'complete', duration: 120, tools: ['tokenizer'] },
 *   { label: 'Retrieve context', status: 'active' },
 *   { label: 'Generate response', status: 'pending' }
 * ]}></ai-timeline>
 * ```
 *
 * @prop {TimelineStep[]} steps - Array of timeline step objects
 * @prop {boolean} compact - Hide details, tools, and duration bars
 *
 * @fires {CustomEvent<{index: number, step: TimelineStep}>} ai-timeline-step-click - When a step is clicked
 */
import { LitElement, html, css, nothing } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { hostBlock, reducedMotion } from '../../styles/index.js';

interface TimelineStep {
  label: string;
  status: 'pending' | 'active' | 'complete' | 'error';
  detail?: string;
  duration?: number; // ms
  tools?: string[];
}

@customElement('ai-timeline')
export class AiTimeline extends LitElement {
  static override styles = [hostBlock, reducedMotion, css`

    .timeline {
      display: flex;
      flex-direction: column;
      gap: 0;
      position: relative;
      box-shadow: inset 0 1px 0 0 rgba(255, 255, 255, 0.05);
      background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0.03), transparent);
    }

    .step {
      display: flex;
      gap: var(--cg-spacing-12, 12px);
      padding: var(--cg-spacing-10, 10px) 0;
      position: relative;
      animation: fadeIn 250ms ease;
      cursor: pointer;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateX(-8px); }
      to { opacity: 1; transform: translateX(0); }
    }

    /* Vertical line */
    .step::before {
      content: '';
      position: absolute;
      left: 11px;
      top: 32px;
      bottom: -2px;
      width: 2px;
      background: linear-gradient(to bottom, var(--cg-gray-700, #3f3f46), var(--cg-gray-800, #27272a));
    }
    .step:last-child::before { display: none; }

    /* Status dot */
    .dot {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      font-size: var(--cg-font-size-xs, 12px);
      font-weight: 700;
      z-index: 1;
      transition: all 200ms;
    }
    .dot.pending {
      background: var(--cg-gray-800, #27272a);
      border: 2px solid var(--cg-gray-700, #3f3f46);
      color: var(--cg-gray-600, #52525b);
    }
    .dot.active {
      background: rgba(223, 255, 97, 0.15);
      border: 2px solid var(--cg-brand-ai-accent, #dfff61);
      color: var(--cg-brand-ai-accent, #dfff61);
      animation: pulse 1.5s ease-in-out infinite;
    }
    .dot.complete {
      background: rgba(34, 197, 94, 0.15);
      border: 2px solid var(--cg-green-400, #4ade80);
      color: var(--cg-green-400, #4ade80);
    }
    .dot.error {
      background: rgba(239, 68, 68, 0.15);
      border: 2px solid var(--cg-red-400, #f87171);
      color: var(--cg-red-400, #f87171);
    }

    @keyframes pulse {
      0%, 100% { box-shadow: 0 0 0 0 rgba(223, 255, 97, 0.2); }
      50% { box-shadow: 0 0 0 6px rgba(223, 255, 97, 0); }
    }

    /* Content */
    .content { flex: 1; min-width: 0; padding-top: 2px; }

    .step-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--cg-spacing-8, 8px);
    }
    .step-label {
      font-size: var(--cg-font-size-sm, 14px);
      font-weight: 600;
      color: var(--cg-color-surface-base-text, #fafafa);
    }
    .step.pending .step-label { color: var(--cg-gray-500, #71717a); }

    .step-duration {
      font-size: var(--cg-font-size-xs, 12px);
      color: var(--cg-gray-500, #71717a);
      font-family: var(--cg-font-family-mono, 'Fira Code', monospace);
    }

    /* Duration bar */
    .duration-bar {
      height: 3px;
      border-radius: 2px;
      background: var(--cg-gray-800, #27272a);
      margin-top: var(--cg-spacing-6, 6px);
      overflow: hidden;
    }
    .duration-fill {
      height: 100%;
      border-radius: 2px;
      transition: width 500ms ease;
    }
    .step.complete .duration-fill { background: var(--cg-green-400, #4ade80); }
    .step.active .duration-fill { background: var(--cg-brand-ai-accent, #dfff61); animation: indeterminate 1.5s linear infinite; }
    .step.error .duration-fill { background: var(--cg-red-400, #f87171); }

    @keyframes indeterminate {
      0% { transform: translateX(-100%); width: 40%; }
      50% { transform: translateX(100%); width: 40%; }
      100% { transform: translateX(300%); width: 40%; }
    }

    /* Tools */
    .tools {
      display: flex;
      gap: var(--cg-spacing-4, 4px);
      margin-top: var(--cg-spacing-6, 6px);
      flex-wrap: wrap;
    }
    .tool-tag {
      font-size: 10px;
      padding: 2px var(--cg-spacing-8, 8px);
      border-radius: var(--cg-border-radius-50, 4px);
      background: var(--cg-gray-800, #27272a);
      color: var(--cg-gray-400, #a1a1aa);
      border: 1px solid var(--cg-gray-700, #3f3f46);
    }

    /* Detail (expandable) */
    .detail {
      margin-top: var(--cg-spacing-8, 8px);
      padding: var(--cg-spacing-10, 10px) var(--cg-spacing-12, 12px);
      background: var(--cg-color-surface-base-background, #09090b);
      border-radius: var(--cg-border-radius-100, 8px);
      font-size: var(--cg-font-size-xs, 12px);
      font-family: var(--cg-font-family-mono, 'Fira Code', monospace);
      color: var(--cg-gray-400, #a1a1aa);
      line-height: 1.5;
      white-space: pre-wrap;
      max-height: 150px;
      overflow-y: auto;
      animation: fadeIn 200ms ease;
    }

    /* Compact */
    :host([compact]) .step { padding: var(--cg-spacing-6, 6px) 0; }
    :host([compact]) .dot { width: 18px; height: 18px; font-size: 9px; }
    :host([compact]) .step-label { font-size: var(--cg-font-size-xs, 12px); }
    :host([compact]) .detail, :host([compact]) .tools, :host([compact]) .duration-bar { display: none; }

    :focus-visible {
      outline: none;
      box-shadow: 0 0 0 2px var(--cg-color-surface-base-background, #09090b), 0 0 0 4px var(--cg-brand-ai-accent, #dfff61);
    }

    /* ── Rounded variants ── */
    :host([rounded="none"]) .timeline { border-radius: 0; }
    :host([rounded="sm"]) .timeline { border-radius: var(--cg-border-radius-50, 4px); }
    :host([rounded="md"]) .timeline { border-radius: var(--cg-border-radius-100, 8px); }
    :host([rounded="lg"]) .timeline { border-radius: var(--cg-border-radius-150, 12px); }
    :host([rounded="full"]) .timeline { border-radius: var(--cg-border-radius-full, 99999px); }
  `];

  @property({ reflect: true }) rounded: 'none' | 'sm' | 'md' | 'lg' | 'full' = 'lg';
  /** Timeline steps */
  @property({ type: Array }) steps: TimelineStep[] = [];

  /** Compact mode */
  @property({ type: Boolean, reflect: true }) compact: boolean = false;

  private _expandedIndex: number = -1;

  private _getIcon(status: string): unknown {
    if (status === 'complete') return html`<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>`;
    if (status === 'error') return html`<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>`;
    if (status === 'active') return html`<svg width="8" height="8" viewBox="0 0 8 8"><circle cx="4" cy="4" r="4" fill="currentColor"/></svg>`;
    return html`<svg width="8" height="8" viewBox="0 0 8 8"><circle cx="4" cy="4" r="3" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>`;
  }

  private _formatDuration(ms?: number): string {
    if (!ms) return '';
    if (ms < 1000) return `${ms}ms`;
    return `${(ms / 1000).toFixed(1)}s`;
  }

  private _handleStepClick(index: number) {
    this._expandedIndex = this._expandedIndex === index ? -1 : index;
    this.requestUpdate();
    this.dispatchEvent(new CustomEvent('ai-timeline-step-click', {
      bubbles: true, composed: true,
      detail: { index, step: this.steps[index] },
    }));
  }

  private _getMaxDuration(): number {
    return Math.max(...this.steps.map(s => s.duration || 0), 1);
  }

  override render() {
    if (this.steps.length === 0) return nothing;

    const maxDuration = this._getMaxDuration();

    return html`
      <div class="timeline" role="list" aria-label="Execution timeline">
        ${this.steps.map((step, i) => html`
          <div class="step ${step.status}" role="listitem"
            aria-current="${step.status === 'active' ? 'step' : nothing}"
            tabindex="0"
            @click=${() => this._handleStepClick(i)}
            @keydown=${(e: KeyboardEvent) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); this._handleStepClick(i); } }}>

            <div class="dot ${step.status}" aria-hidden="true">${this._getIcon(step.status)}</div>

            <div class="content">
              <div class="step-header">
                <span class="step-label">${step.label}</span>
                ${step.duration ? html`<span class="step-duration">${this._formatDuration(step.duration)}</span>` : nothing}
              </div>

              ${step.duration || step.status === 'active' ? html`
                <div class="duration-bar">
                  <div class="duration-fill" style="width: ${step.status === 'active' ? '100' : Math.round((step.duration || 0) / maxDuration * 100)}%"></div>
                </div>
              ` : nothing}

              ${step.tools && step.tools.length > 0 ? html`
                <div class="tools">
                  ${step.tools.map(t => html`<span class="tool-tag">${t}</span>`)}
                </div>
              ` : nothing}

              ${this._expandedIndex === i && step.detail ? html`
                <div class="detail">${step.detail}</div>
              ` : nothing}
            </div>
          </div>
        `)}
      </div>
    `;
  }
}
