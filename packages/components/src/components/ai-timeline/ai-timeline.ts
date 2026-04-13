/**
 * @element ai-timeline
 * Vertical execution timeline for AI agents. Shows steps with status indicators,
 * duration bars, tool tags, token metadata, nested sub-steps, and expandable details.
 *
 * @fires {CustomEvent<{index: number, step: TimelineStep}>} ai-timeline-step-click - When a step is clicked
 */
import { LitElement, html, css, nothing } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { hostBlock, reducedMotion } from '../../styles/index.js';

export interface TimelineStep {
  label: string;
  status: 'pending' | 'active' | 'complete' | 'error';
  type?: 'llm' | 'tool' | 'retrieval' | 'human' | 'default';
  detail?: string;
  duration?: number;
  tools?: string[];
  tokens?: { input?: number; output?: number };
  children?: TimelineStep[];
}

@customElement('ai-timeline')
export class AiTimeline extends LitElement {
  static override styles = [hostBlock, reducedMotion, css`
    .timeline {
      display: flex;
      flex-direction: column;
    }

    /* ── Step row ── */
    .step {
      display: flex;
      gap: var(--cg-spacing-16);
      padding: var(--cg-spacing-16);
      position: relative;
      cursor: pointer;
      border-radius: var(--cg-border-radius-100);
      transition: background var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
      animation: stepIn var(--cg-transition-duration-slow) var(--cg-transition-easing-ease-out) both;
      animation-delay: calc(var(--step-index, 0) * 50ms);
    }
    .step:hover { background: var(--cg-overlay-dark-subtle); }

    @keyframes stepIn {
      from { opacity: 0; transform: translateX(calc(-1 * var(--cg-spacing-6))); }
      to { opacity: 1; transform: translateX(0); }
    }

    /* ── Connecting line ── */
    .line-col {
      display: flex;
      flex-direction: column;
      align-items: center;
      flex-shrink: 0;
      width: var(--cg-spacing-24);
    }

    .dot {
      width: var(--cg-spacing-24);
      height: var(--cg-spacing-24);
      border-radius: var(--cg-border-radius-full);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    .dot svg {
      width: var(--cg-spacing-12);
      height: var(--cg-spacing-12);
    }

    .line {
      flex: 1;
      width: var(--cg-border-width-50);
      background: var(--cg-color-surface-base-divider);
      min-height: var(--cg-spacing-8);
    }
    .step:last-child .line { display: none; }
    .step.complete .line {
      background: var(--cg-color-status-success-text-default);
      opacity: 0.25;
    }

    /* ── Dot states ── */
    .dot.pending {
      background: var(--cg-color-surface-cards-background);
      border: var(--cg-border-width-100) solid var(--cg-color-surface-cards-border);
      color: var(--cg-color-surface-container-outlined);
    }
    .dot.active {
      background: var(--cg-overlay-accent-strong);
      border: var(--cg-border-width-100) solid var(--cg-color-action-primary-background-default);
      color: var(--cg-color-action-primary-background-default);
      box-shadow: 0 0 0 3px var(--cg-overlay-accent-strong);
      animation: ringPulse 2s ease-in-out infinite;
    }
    .dot.complete {
      background: var(--cg-color-status-success-background-default);
      border: var(--cg-border-width-100) solid var(--cg-color-status-success-text-default);
      color: var(--cg-color-status-success-text-default);
    }
    .dot.complete svg {
      animation: checkPop var(--cg-transition-duration-slow) var(--cg-transition-easing-ease-out) both;
    }
    .dot.error {
      background: var(--cg-color-status-error-background-default);
      border: var(--cg-border-width-100) solid var(--cg-color-status-error-text-default);
      color: var(--cg-color-status-error-text-default);
    }

    @keyframes ringPulse {
      0%, 100% { box-shadow: 0 0 0 3px var(--cg-overlay-accent-strong); }
      50% { box-shadow: 0 0 0 6px transparent; }
    }
    @keyframes checkPop {
      from { transform: scale(0); }
      50% { transform: scale(1.2); }
      to { transform: scale(1); }
    }

    /* ── Content ── */
    .content {
      flex: 1;
      min-width: 0;
      padding-top: var(--cg-spacing-2);
      padding-bottom: var(--cg-spacing-12);
    }

    .step-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--cg-spacing-12);
    }
    .step-label {
      font-size: var(--cg-font-size-sm);
      font-weight: var(--cg-font-weight-medium);
      color: var(--cg-color-surface-base-text);
      line-height: var(--cg-line-height-snug);
    }
    .step.pending .step-label {
      color: var(--cg-color-surface-container-outlined);
      opacity: 0.5;
    }
    .step.complete .step-label {
      color: var(--cg-color-surface-container-outlined);
    }
    .step.error .step-label {
      color: var(--cg-color-status-error-text-default);
    }
    .step.active .step-label {
      background: linear-gradient(110deg, var(--cg-color-surface-base-text) 35%, var(--cg-color-action-primary-background-default) 50%, var(--cg-color-surface-base-text) 65%);
      background-size: 300% 100%;
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      animation: textSweep 1.8s var(--cg-transition-easing-default) infinite;
    }
    @keyframes textSweep {
      0% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }

    .step-duration {
      font-size: var(--cg-font-size-xs);
      color: var(--cg-color-surface-container-outlined);
      font-family: var(--cg-font-family-mono);
      white-space: nowrap;
    }

    /* ── Duration bar ── */
    .duration-bar {
      height: var(--cg-spacing-4);
      border-radius: var(--cg-border-radius-full);
      background: var(--cg-color-surface-cards-border);
      margin-top: var(--cg-spacing-8);
      overflow: hidden;
    }
    .duration-fill {
      height: 100%;
      border-radius: var(--cg-border-radius-full);
      transition: width var(--cg-transition-duration-slow) var(--cg-transition-easing-default);
    }
    .step.complete .duration-fill { background: var(--cg-color-status-success-text-default); opacity: 0.6; }
    .step.active .duration-fill { background: var(--cg-color-action-primary-background-default); animation: indeterminate 1.5s linear infinite; }
    .step.error .duration-fill { background: var(--cg-color-status-error-text-default); opacity: 0.6; }

    @keyframes indeterminate {
      0% { transform: translateX(-100%); width: 40%; }
      50% { transform: translateX(100%); width: 40%; }
      100% { transform: translateX(300%); width: 40%; }
    }

    /* ── Token metadata ── */
    .meta {
      display: flex;
      gap: var(--cg-spacing-16);
      margin-top: var(--cg-spacing-8);
      font-size: var(--cg-font-size-xs);
      font-family: var(--cg-font-family-mono);
      color: var(--cg-color-surface-container-outlined);
    }
    .meta-item {
      display: inline-flex;
      align-items: center;
      gap: var(--cg-spacing-4);
    }
    .meta-label { opacity: 0.6; }

    /* ── Tool tags ── */
    .tools {
      display: flex;
      gap: var(--cg-spacing-8);
      margin-top: var(--cg-spacing-8);
      flex-wrap: wrap;
    }
    .tool-tag {
      font-size: var(--cg-font-size-xs);
      padding: var(--cg-spacing-2) var(--cg-spacing-8);
      border-radius: var(--cg-border-radius-full);
      background: var(--cg-color-surface-cards-background);
      color: var(--cg-color-surface-container-outlined);
      border: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
      font-family: var(--cg-font-family-mono);
    }

    /* ── Detail panel ── */
    .detail {
      margin-top: var(--cg-spacing-12);
      padding: var(--cg-spacing-12) var(--cg-spacing-16);
      background: var(--cg-color-surface-base-background);
      border: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
      border-radius: var(--cg-border-radius-100);
      font-size: var(--cg-font-size-xs);
      font-family: var(--cg-font-family-mono);
      color: var(--cg-color-surface-container-outlined);
      line-height: var(--cg-line-height-relaxed);
      white-space: pre-wrap;
      max-height: var(--cg-spacing-96);
      overflow-y: auto;
    }

    /* ── Nested children ── */
    .children {
      margin-top: var(--cg-spacing-8);
    }
    .children .step {
      padding: var(--cg-spacing-4) var(--cg-spacing-4);
      animation: none;
    }
    .children .dot { width: var(--cg-spacing-16); height: var(--cg-spacing-16); }
    .children .dot svg { width: var(--cg-spacing-8); height: var(--cg-spacing-8); }
    .children .line { min-height: var(--cg-spacing-4); }
    .children .step-label { font-size: var(--cg-font-size-xs); }
    .children .line-col { width: var(--cg-spacing-16); }
    .children .content { padding-bottom: var(--cg-spacing-2); }

    /* ── Compact ── */
    :host([compact]) .step { padding: var(--cg-spacing-4) var(--cg-spacing-6); }
    :host([compact]) .dot { width: var(--cg-spacing-16); height: var(--cg-spacing-16); }
    :host([compact]) .dot svg { width: var(--cg-spacing-8); height: var(--cg-spacing-8); }
    :host([compact]) .line-col { width: var(--cg-spacing-16); }
    :host([compact]) .step-label { font-size: var(--cg-font-size-xs); }
    :host([compact]) .detail,
    :host([compact]) .tools,
    :host([compact]) .meta,
    :host([compact]) .children,
    :host([compact]) .duration-bar { display: none; }

    .step:focus-visible {
      outline: none;
      box-shadow: inset 0 0 0 2px var(--cg-overlay-accent-strong);
    }

    @media (prefers-reduced-motion: reduce) {
      .step { animation: none; }
      .dot.active { animation: none; box-shadow: 0 0 0 3px var(--cg-overlay-accent-strong); }
      .dot.complete svg { animation: none; }
      .step.active .duration-fill { animation: none; width: 50%; }
      .step.active .step-label { animation: none; -webkit-text-fill-color: currentColor; }
    }
  `];

  @property({ type: Array }) steps: TimelineStep[] = [];
  @property({ type: Boolean, reflect: true }) compact = false;

  private _expandedIndex = -1;

  private _getIcon(status: string) {
    if (status === 'complete') return html`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>`;
    if (status === 'error') return html`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6L6 18M6 6l12 12"/></svg>`;
    if (status === 'active') return html`<svg viewBox="0 0 8 8"><circle cx="4" cy="4" r="3" fill="currentColor"/></svg>`;
    return html`<svg viewBox="0 0 8 8"><circle cx="4" cy="4" r="2.5" fill="none" stroke="currentColor" stroke-width="1"/></svg>`;
  }

  private _formatDuration(ms?: number): string {
    if (!ms) return '';
    if (ms < 1000) return `${ms}ms`;
    return `${(ms / 1000).toFixed(1)}s`;
  }

  private _formatTokens(n: number): string {
    if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
    return String(n);
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

  private _renderStep(step: TimelineStep, isLast: boolean) {
    return html`
      <div class="line-col">
        <div class="dot ${step.status}" aria-hidden="true">${this._getIcon(step.status)}</div>
        ${!isLast ? html`<div class="line"></div>` : nothing}
      </div>
    `;
  }

  override render() {
    if (this.steps.length === 0) return nothing;
    const maxDuration = this._getMaxDuration();

    return html`
      <div class="timeline" role="list" aria-label="Execution timeline">
        ${this.steps.map((step, i) => html`
          <div class="step ${step.status}" role="listitem" style="--step-index: ${i}"
            aria-current="${step.status === 'active' ? 'step' : nothing}"
            tabindex="0"
            @click=${() => this._handleStepClick(i)}
            @keydown=${(e: KeyboardEvent) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); this._handleStepClick(i); } }}>

            ${this._renderStep(step, i === this.steps.length - 1)}

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

              ${step.tokens ? html`
                <div class="meta">
                  ${step.tokens.input ? html`<span class="meta-item"><span class="meta-label">in</span> ${this._formatTokens(step.tokens.input)}</span>` : nothing}
                  ${step.tokens.output ? html`<span class="meta-item"><span class="meta-label">out</span> ${this._formatTokens(step.tokens.output)}</span>` : nothing}
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

              ${step.children && step.children.length > 0 ? html`
                <div class="children">
                  ${step.children.map((child, ci) => html`
                    <div class="step ${child.status}">
                      ${this._renderStep(child, ci === step.children!.length - 1)}
                      <div class="content">
                        <div class="step-header">
                          <span class="step-label">${child.label}</span>
                          ${child.duration ? html`<span class="step-duration">${this._formatDuration(child.duration)}</span>` : nothing}
                        </div>
                      </div>
                    </div>
                  `)}
                </div>
              ` : nothing}
            </div>
          </div>
        `)}
      </div>
    `;
  }
}
