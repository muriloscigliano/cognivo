/**
 * @element ai-workflow-builder
 * Visual agent workflow rendered as a vertical DAG (directed acyclic graph).
 * Each step displays a type icon (start/agent/tool/condition/end), label,
 * description, and status with connecting lines between steps.
 *
 * @example
 * ```html
 * <ai-workflow-builder heading="Support Agent" .steps=${[
 *   { id: '1', label: 'Receive Query', type: 'start', status: 'complete' },
 *   { id: '2', label: 'Classify Intent', type: 'agent', status: 'active', description: 'Using GPT-4' },
 *   { id: '3', label: 'Search KB', type: 'tool', status: 'pending', next: ['4'] },
 *   { id: '4', label: 'Respond', type: 'end', status: 'pending' }
 * ]}></ai-workflow-builder>
 * ```
 *
 * @prop {WorkflowStep[]} steps - Array of workflow step objects
 * @prop {string} heading - Workflow header title (default 'Workflow')
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
      animation: fadeSlideIn var(--cg-motion-duration-fast) var(--cg-motion-easing-color);
    }

    .container {
      background: var(--cg-color-surface-cards-background);
      border: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
      border-radius: var(--cg-border-radius-150); padding: var(--cg-spacing-16); overflow: auto;
    }

    .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--cg-spacing-16); }
    .title { font-size: var(--cg-font-size-sm); font-weight: var(--cg-font-weight-bold); color: var(--cg-color-surface-base-text); }
    .step-count { font-size: var(--cg-font-size-xs); color: var(--cg-color-input-text-placeholder); }

    .flow { display: flex; flex-direction: column; align-items: center; gap: 0; }

    .step-wrapper { display: flex; flex-direction: column; align-items: center; }

    .connector { width: var(--cg-spacing-2); height: var(--cg-spacing-20); background: var(--cg-color-surface-cards-border); }
    .connector.active { background: var(--cg-color-action-primary-background-default); }

    .step {
      display: flex; align-items: center; gap: var(--cg-spacing-8);
      padding: var(--cg-spacing-8) var(--cg-spacing-16); border-radius: var(--cg-border-radius-100);
      border: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
      background: var(--cg-color-surface-base-background);
      min-width: var(--cg-spacing-96); cursor: pointer; transition: border-color var(--cg-motion-duration-fast) var(--cg-motion-easing-color), background var(--cg-motion-duration-fast) var(--cg-motion-easing-color);
    }
    .step:hover { border-color: var(--cg-color-input-border-hover); }
    .step:focus-visible { outline: none; box-shadow: 0 0 0 3px var(--cg-overlay-accent-strong); outline-offset: var(--cg-outline-offset-default); }
    .step.active { border-color: var(--cg-color-surface-base-text); background: var(--cg-overlay-accent-subtle); }
    .step.complete { border-color: var(--cg-color-status-success-text-default); }
    .step.error { border-color: var(--cg-color-status-error-text-default); }
    .step.skipped { opacity: 0.5; }

    .step-icon {
      width: var(--cg-spacing-24); height: var(--cg-spacing-24); border-radius: var(--cg-border-radius-100);
      display: flex; align-items: center; justify-content: center;
      font-size: var(--cg-font-size-xs); flex-shrink: 0;
    }
    .step-icon.start { background: var(--cg-color-status-success-background-default); color: var(--cg-color-status-success-text); }
    .step-icon.agent { background: var(--cg-overlay-accent-light); color: var(--cg-color-surface-base-text); }
    .step-icon.tool { background: var(--cg-color-status-info-background-default); color: var(--cg-color-status-info-text); }
    .step-icon.condition { background: var(--cg-color-status-warning-background-default); color: var(--cg-color-status-warning-text); }
    .step-icon.end { background: var(--cg-color-surface-container-background); color: var(--cg-color-input-text-placeholder); }

    .step-info { flex: 1; min-width: 0; }
    .step-label { font-size: var(--cg-font-size-sm); font-weight: var(--cg-font-weight-semibold); color: var(--cg-color-surface-base-text); }
    .step-desc { font-size: var(--cg-font-size-xs); color: var(--cg-color-input-text-placeholder); margin-top: var(--cg-spacing-2); }
    .step-type { font-size: var(--cg-font-size-xs); font-weight: var(--cg-font-weight-bold); text-transform: uppercase; letter-spacing: 0.05em; color: var(--cg-color-input-text-placeholder); }

    .step-status { font-size: var(--cg-font-size-xs); flex-shrink: 0; }

    .branch { display: flex; gap: var(--cg-spacing-16); align-items: flex-start; }
    .branch-line { width: var(--cg-spacing-1); height: 100%; background: var(--cg-color-surface-cards-border); }

    .empty { text-align: center; padding: var(--cg-spacing-32); color: var(--cg-color-input-text-placeholder); font-size: var(--cg-font-size-sm); }

    /* ── Rounded variants ── */
    :host([rounded="none"]) .container { border-radius: 0; }
    :host([rounded="sm"]) .container { border-radius: var(--cg-border-radius-50); }
    :host([rounded="md"]) .container { border-radius: var(--cg-border-radius-100); }
    :host([rounded="lg"]) .container { border-radius: var(--cg-border-radius-150); }
    :host([rounded="full"]) .container { border-radius: var(--cg-border-radius-full); }
  `];

  @property({ reflect: true }) rounded: 'none' | 'sm' | 'md' | 'lg' | 'full' = 'lg';
  @property({ type: Array }) steps: WorkflowStep[] = [];
  @property({ type: String }) heading: string = 'Workflow';

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
      <div class="container" role="figure" aria-label="${this.heading}">
        <div class="header">
          <span class="title">${this.heading}</span>
          <span class="step-count">${this.steps.length} steps</span>
        </div>
        <div class="flow" role="list">
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
