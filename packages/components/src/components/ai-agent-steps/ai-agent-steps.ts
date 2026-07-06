import { LitElement, html, css, nothing } from 'lit';
import type { PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { hostBlock, reducedMotion } from '../../styles/index.js';

/** Step definition for ai-agent-steps. */
export interface AgentStep {
  label: string;
  status: 'pending' | 'loading' | 'complete' | 'error';
  detail?: string;
}

/** Screen-reader status text per step state. */
const STATUS_TEXT: Record<AgentStep['status'], string> = {
  pending: 'pending',
  loading: 'in progress',
  complete: 'complete',
  error: 'failed',
};

/**
 * <ai-agent-steps> — Live task feed showing AI agent operations in progress.
 *
 * @example
 * ```html
 * <ai-agent-steps
 *   .steps=${[
 *     { label: 'Searching the web', status: 'complete' },
 *     { label: 'Reading 3 results', status: 'complete' },
 *     { label: 'Analyzing content', status: 'loading' },
 *     { label: 'Generating summary', status: 'pending' },
 *   ]}
 * ></ai-agent-steps>
 * ```
 *
 * @fires {CustomEvent<{index: number}>} ai-step-click - When a completed step is clicked
 */
@customElement('ai-agent-steps')
export class AiAgentSteps extends LitElement {
  static override styles = [hostBlock, reducedMotion, css`
    :host {
      display: block;
    }

    .steps {
      display: flex;
      flex-direction: column;
      gap: var(--cg-spacing-2);
    }

    /* ── Step row ── */
    .step {
      display: flex;
      align-items: flex-start;
      gap: var(--cg-spacing-12);
      padding: var(--cg-spacing-12) var(--cg-spacing-16);
      border-radius: var(--cg-border-radius-100);
      /* backwards (not both): a forwards fill would pin transform and defeat :active press scale */
      animation: stepIn var(--cg-transition-duration-slow) var(--cg-transition-easing-ease-out) backwards;
      animation-delay: calc(var(--step-index, 0) * 60ms);
    }

    /* Complete steps are clickable — expose the affordance */
    .step.complete {
      cursor: pointer;
    }
    .step.complete:hover {
      background: var(--cg-color-surface-cards-hover-background);
    }
    .step.complete:active {
      transform: scale(var(--cg-interaction-press-scale));
    }

    @keyframes stepIn {
      from { opacity: 0; transform: translateX(calc(-1 * var(--cg-spacing-8))); }
      to { opacity: 1; transform: translateX(0); }
    }

    /* ── Status icon ── */
    .status-icon {
      width: var(--cg-spacing-20);
      height: var(--cg-spacing-20);
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: var(--cg-spacing-1);
    }

    /* Pending — empty circle */
    .status-icon.pending {
      color: var(--cg-color-surface-container-outlined);
    }
    .status-icon.pending svg {
      width: var(--cg-spacing-16);
      height: var(--cg-spacing-16);
      opacity: 0.4;
    }

    /* Loading — spinning ring */
    .status-icon.loading {
      color: var(--cg-color-ai-thinking-text);
    }
    .status-icon.loading .spinner {
      width: var(--cg-spacing-16);
      height: var(--cg-spacing-16);
      border: var(--cg-border-width-100) solid var(--cg-color-loading-spinner-secondary);
      border-top-color: var(--cg-color-loading-spinner-primary);
      border-radius: var(--cg-border-radius-full);
      animation: spin 0.8s linear infinite;
    }

    /* Complete — checkmark */
    .status-icon.complete {
      color: var(--cg-color-ai-complete-text);
    }
    .status-icon.complete svg {
      width: var(--cg-spacing-16);
      height: var(--cg-spacing-16);
      animation: checkPop var(--cg-transition-duration-slow) var(--cg-transition-easing-ease-out) both;
    }

    @keyframes checkPop {
      from { transform: scale(0); }
      50% { transform: scale(1.2); }
      to { transform: scale(1); }
    }

    /* Error — X icon */
    .status-icon.error {
      color: var(--cg-color-ai-error-text);
    }
    .status-icon.error svg {
      width: var(--cg-spacing-16);
      height: var(--cg-spacing-16);
    }

    /* ── Step text ── */
    .step-body {
      flex: 1;
      min-width: 0;
      padding-top: var(--cg-spacing-2);
    }

    .step-label {
      display: block;
      font-size: var(--cg-font-size-sm);
      font-weight: var(--cg-font-weight-medium);
      line-height: var(--cg-line-height-snug);
    }

    /* Status-based label colors */
    .step.pending .step-label {
      color: var(--cg-color-surface-container-outlined);
      opacity: 0.5;
    }
    .step.loading .step-label {
      color: var(--cg-color-surface-base-text);
    }
    .step.complete .step-label {
      color: var(--cg-color-surface-container-outlined);
    }
    .step.error .step-label {
      color: var(--cg-color-ai-error-text);
    }

    .step-detail {
      display: block;
      font-size: var(--cg-font-size-xs);
      color: var(--cg-color-surface-container-outlined);
      line-height: var(--cg-line-height-snug);
      margin-top: var(--cg-spacing-2);
    }

    /* Loading step shimmer on label */
    .step.loading .step-label {
      background: linear-gradient(
        110deg,
        var(--cg-color-surface-base-text) 35%,
        var(--cg-color-ai-streaming-text) 50%,
        var(--cg-color-surface-base-text) 65%
      );
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

    /* ── Connecting line between steps ── */
    .step:not(:last-child) {
      position: relative;
    }
    .step:not(:last-child)::after {
      content: '';
      position: absolute;
      left: calc(var(--cg-spacing-16) + var(--cg-spacing-20) / 2);
      top: var(--cg-spacing-32);
      bottom: calc(-1 * var(--cg-spacing-2));
      width: var(--cg-border-width-50);
      background: var(--cg-color-surface-base-divider);
    }
    .step.complete:not(:last-child)::after {
      background: var(--cg-color-ai-complete-text);
      opacity: 0.3;
    }

    /* ── Contained variant ── */
    :host([contained]) {
      border: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
      border-radius: var(--cg-component-card-radius);
      background: var(--cg-color-surface-cards-background);
      padding: var(--cg-spacing-16);
    }

    /* ── Visually-hidden text / live region for screen readers ── */
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

    @keyframes spin { to { transform: rotate(360deg); } }

    @media (prefers-reduced-motion: reduce) {
      .step { animation: none; }
      .status-icon.loading .spinner { animation: none; }
      .status-icon.complete svg { animation: none; }
      .step.loading .step-label { animation: none; -webkit-text-fill-color: currentColor; }
    }
  `];

  /** Steps array — each with label, status, and optional detail */
  @property({ type: Array }) steps: AgentStep[] = [];

  /** Wrap in a card container */
  @property({ type: Boolean, reflect: true }) contained = false;

  @state() private _announcement = '';

  override willUpdate(changed: PropertyValues<this>) {
    if (!changed.has('steps')) return;
    const prev = changed.get('steps') as AgentStep[] | undefined;
    if (!prev) return;
    for (let i = 0; i < this.steps.length; i++) {
      const oldStatus = prev[i]?.status;
      const newStatus = this.steps[i]!.status;
      if (oldStatus === newStatus) continue;
      if (newStatus === 'complete') this._announce(`${this.steps[i]!.label} complete`);
      else if (newStatus === 'error') this._announce(`${this.steps[i]!.label} failed`);
    }
  }

  private _announce(message: string): void {
    // Force change so AT re-reads even when the same message repeats.
    this._announcement = '';
    requestAnimationFrame(() => { this._announcement = message; });
  }

  private _handleStepClick(index: number) {
    if (this.steps[index]?.status === 'complete') {
      this.dispatchEvent(new CustomEvent('ai-step-click', {
        detail: { index },
        bubbles: true,
        composed: true,
      }));
    }
  }

  private _renderStatusIcon(status: string) {
    switch (status) {
      case 'complete':
        return html`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>`;
      case 'error':
        return html`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6L6 18M6 6l12 12"/></svg>`;
      case 'loading':
        return html`<div class="spinner"></div>`;
      default: // pending
        return html`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="8"/></svg>`;
    }
  }

  override render() {
    if (this.steps.length === 0) return nothing;

    return html`
      <div class="steps" role="list" aria-label="Agent steps">
        ${this.steps.map((step, i) => html`
          <div
            class="step ${step.status}"
            role="listitem"
            style="--step-index: ${i}"
            @click=${() => this._handleStepClick(i)}
          >
            <span class="status-icon ${step.status}" aria-hidden="true">
              ${this._renderStatusIcon(step.status)}
            </span>
            <div class="step-body">
              <span class="step-label">${step.label}</span>
              <span class="sr-only">${STATUS_TEXT[step.status]}</span>
              ${step.detail ? html`<span class="step-detail">${step.detail}</span>` : nothing}
            </div>
          </div>
        `)}
      </div>
      <div class="sr-only" role="status" aria-live="polite" aria-atomic="true">${this._announcement}</div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap { 'ai-agent-steps': AiAgentSteps; }
}
