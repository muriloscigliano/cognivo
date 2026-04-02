/**
 * @element ai-workflow-builder
 * Visual agent workflow rendered as a vertical DAG (directed acyclic graph).
 * Each step displays a type icon (start/agent/tool/condition/end), label,
 * description, and status with connecting lines between steps.
 *
 * @example
 * ```html
 * <ai-workflow-builder title="Support Agent" .steps=${[
 *   { id: '1', label: 'Receive Query', type: 'start', status: 'complete' },
 *   { id: '2', label: 'Classify Intent', type: 'agent', status: 'active', description: 'Using GPT-4' },
 *   { id: '3', label: 'Search KB', type: 'tool', status: 'pending', next: ['4'] },
 *   { id: '4', label: 'Respond', type: 'end', status: 'pending' }
 * ]}></ai-workflow-builder>
 * ```
 *
 * @prop {WorkflowStep[]} steps - Array of workflow step objects
 * @prop {string} title - Workflow header title (default 'Workflow')
 *
 * @fires {CustomEvent<{id: string, label: string, type: string, status: string}>} ai-workflow-step-click - When a step is clicked
 */
import { LitElement, html, css, nothing } from 'lit';
import { property, state, customElement } from 'lit/decorators.js';
import { hostBlock, reducedMotion, fadeSlideInKeyframes } from '../../styles/index.js';

interface WorkflowStep {
  id: string;
  label: string;
  type: 'start' | 'agent' | 'tool' | 'condition' | 'end';
  status?: 'pending' | 'active' | 'complete' | 'error' | 'skipped';
  description?: string;
  next?: string[]; // IDs of next steps
}

@customElement('ai-workflow-builder')
export class AiWorkflowBuilder extends LitElement {
  static override styles = [hostBlock, reducedMotion, fadeSlideInKeyframes, css`
    :host {
      animation: fadeSlideIn var(--cg-motion-duration-fast, 200ms) var(--cg-motion-easing-color, cubic-bezier(0, 0, 0.58, 1));
    }

    .container {
      background: var(--cg-color-surface-container-background, #18181b);
      border: 1px solid var(--cg-color-surface-container-border, #27272a);
      border-radius: var(--cg-border-radius-150, 12px); padding: var(--cg-spacing-16, 16px); overflow: auto;
      box-shadow: inset 0 1px 0 0 rgba(255, 255, 255, 0.05);
      background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0.03), transparent);
    }

    .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--cg-spacing-16, 16px); }
    .title { font-size: 14px; font-weight: 700; color: var(--cg-color-surface-base-text, #fafafa); }
    .step-count { font-size: 11px; color: var(--cg-gray-500, #71717a); }

    .flow { display: flex; flex-direction: column; align-items: center; gap: 0; }

    .step-wrapper { display: flex; flex-direction: column; align-items: center; }

    .connector { width: 2px; height: 20px; background: var(--cg-gray-700, #3f3f46); }
    .connector.active { background: var(--cg-brand-ai-accent, #dfff61); }

    .step {
      display: flex; align-items: center; gap: var(--cg-spacing-8, 8px);
      padding: var(--cg-spacing-8, 8px) var(--cg-spacing-16, 16px); border-radius: var(--cg-border-radius-100, 8px);
      border: 1px solid var(--cg-gray-700, #3f3f46);
      background: var(--cg-color-surface-base-background, #09090b);
      min-width: 200px; cursor: pointer; transition: all 150ms;
    }
    .step:hover { border-color: var(--cg-gray-600, #52525b); }
    .step:focus-visible { outline: 2px solid var(--cg-brand-ai-accent, #dfff61); outline-offset: 2px; }
    .step.active { border-color: var(--cg-brand-ai-accent, #dfff61); background: rgba(223, 255, 97, 0.04); }
    .step.complete { border-color: var(--cg-green-400, #4ade80); }
    .step.error { border-color: var(--cg-red-400, #f87171); }
    .step.skipped { opacity: 0.5; }

    .step-icon {
      width: 28px; height: 28px; border-radius: var(--cg-border-radius-100, 8px);
      display: flex; align-items: center; justify-content: center;
      font-size: var(--cg-font-size-xs, 12px); flex-shrink: 0;
    }
    .step-icon.start { background: rgba(34, 197, 94, 0.12); color: #4ade80; }
    .step-icon.agent { background: rgba(223, 255, 97, 0.12); color: #dfff61; }
    .step-icon.tool { background: rgba(59, 130, 246, 0.12); color: #60a5fa; }
    .step-icon.condition { background: rgba(245, 158, 11, 0.12); color: #fbbf24; }
    .step-icon.end { background: rgba(139, 92, 246, 0.12); color: #a78bfa; }

    .step-info { flex: 1; min-width: 0; }
    .step-label { font-size: 13px; font-weight: 600; color: var(--cg-color-surface-base-text, #fafafa); }
    .step-desc { font-size: 11px; color: var(--cg-gray-500, #71717a); margin-top: 2px; }
    .step-type { font-size: 9px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: var(--cg-gray-500, #71717a); }

    .step-status { font-size: var(--cg-font-size-xs, 12px); flex-shrink: 0; }

    .branch { display: flex; gap: var(--cg-spacing-16, 16px); align-items: flex-start; }
    .branch-line { width: 1px; height: 100%; background: var(--cg-gray-700, #3f3f46); }

    .empty { text-align: center; padding: 32px; color: var(--cg-gray-500, #71717a); font-size: 13px; }

    /* ── Rounded variants ── */
    :host([rounded="none"]) .container { border-radius: 0; }
    :host([rounded="sm"]) .container { border-radius: var(--cg-border-radius-50, 4px); }
    :host([rounded="md"]) .container { border-radius: var(--cg-border-radius-100, 8px); }
    :host([rounded="lg"]) .container { border-radius: var(--cg-border-radius-150, 12px); }
    :host([rounded="full"]) .container { border-radius: var(--cg-border-radius-full, 99999px); }
  `];

  @property({ reflect: true }) rounded: 'none' | 'sm' | 'md' | 'lg' | 'full' = 'lg';
  @property({ type: Array }) steps: WorkflowStep[] = [];
  @property({ type: String }) override title: string = 'Workflow';

  private _getTypeIcon(type: string): unknown {
    if (type === 'start') return html`<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>`;
    if (type === 'agent') return html`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="8" width="18" height="12" rx="3"/><circle cx="9" cy="14" r="1.5"/><circle cx="15" cy="14" r="1.5"/><path d="M12 2v4M8 8V6a4 4 0 018 0v2"/></svg>`;
    if (type === 'tool') return html`<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/></svg>`;
    if (type === 'condition') return html`<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l10 10-10 10L2 12z"/></svg>`;
    if (type === 'end') return html`<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="6" width="12" height="12" rx="1"/></svg>`;
    return html`<svg width="8" height="8" viewBox="0 0 8 8"><circle cx="4" cy="4" r="4" fill="currentColor"/></svg>`;
  }
  private _getStatusIcon(status: string): unknown {
    if (status === 'complete') return html`<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>`;
    if (status === 'error') return html`<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>`;
    if (status === 'active') return html`<svg width="8" height="8" viewBox="0 0 8 8"><circle cx="4" cy="4" r="4" fill="currentColor"/></svg>`;
    if (status === 'pending') return html`<svg width="8" height="8" viewBox="0 0 8 8"><circle cx="4" cy="4" r="3" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>`;
    return html`<span>--</span>`;
  }

  private _handleStepClick(step: WorkflowStep) {
    this.dispatchEvent(new CustomEvent('ai-workflow-step-click', {
      bubbles: true, composed: true,
      detail: { id: step.id, label: step.label, type: step.type, status: step.status },
    }));
  }

  override render() {
    if (this.steps.length === 0) return html`<div class="container"><div class="empty">No workflow defined</div></div>`;

    return html`
      <div class="container" role="figure" aria-label="${this.title}">
        <div class="header">
          <span class="title">${this.title}</span>
          <span class="step-count">${this.steps.length} steps</span>
        </div>
        <div class="flow">
          ${this.steps.map((step, i) => html`
            ${i > 0 ? html`<div class="connector ${step.status === 'active' || step.status === 'complete' ? 'active' : ''}"></div>` : nothing}
            <div class="step ${step.status || 'pending'}" tabindex="0" role="listitem"
              @click=${() => this._handleStepClick(step)}
              @keydown=${(e: KeyboardEvent) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); this._handleStepClick(step); } }}>
              <div class="step-icon ${step.type}" aria-hidden="true">${this._getTypeIcon(step.type)}</div>
              <div class="step-info">
                <div class="step-type">${step.type}</div>
                <div class="step-label">${step.label}</div>
                ${step.description ? html`<div class="step-desc">${step.description}</div>` : nothing}
              </div>
              <span class="step-status" aria-hidden="true">${this._getStatusIcon(step.status || 'pending')}</span>
            </div>
          `)}
        </div>
      </div>
    `;
  }
}
