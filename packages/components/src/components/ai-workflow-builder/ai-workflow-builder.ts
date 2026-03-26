/**
 * <ai-workflow-builder> — Visual Agent Workflow DAG
 *
 * Define agent workflows as connected steps. Each step has a type,
 * label, status, and connections. Renders as a vertical flow.
 */
import { LitElement, html, css, nothing } from 'lit';
import { property, state, customElement } from 'lit/decorators.js';

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
  static override styles = css`
    :host {
      transition: color 100ms cubic-bezier(0, 0, 0.58, 1); display: block; font-family: var(--cg-font-family-primary, 'Inter Variable', 'Inter', -apple-system, sans-serif); }

    .container {
      background: var(--cg-color-surface-container-background, #18181b);
      border: 1px solid var(--cg-color-surface-container-border, #27272a);
      border-radius: 12px; padding: 20px; overflow: auto;
    }

    .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
    .title { font-size: 14px; font-weight: 700; color: var(--cg-color-surface-base-text, #fafafa); }
    .step-count { font-size: 11px; color: var(--cg-gray-500, #71717a); }

    .flow { display: flex; flex-direction: column; align-items: center; gap: 0; }

    .step-wrapper { display: flex; flex-direction: column; align-items: center; }

    .connector { width: 2px; height: 20px; background: var(--cg-gray-700, #3f3f46); }
    .connector.active { background: var(--cg-brand-ai-accent, #dfff61); }

    .step {
      display: flex; align-items: center; gap: 10px;
      padding: 10px 16px; border-radius: 10px;
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
      width: 28px; height: 28px; border-radius: 8px;
      display: flex; align-items: center; justify-content: center;
      font-size: 12px; flex-shrink: 0;
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

    .step-status { font-size: 12px; flex-shrink: 0; }

    .branch { display: flex; gap: 16px; align-items: flex-start; }
    .branch-line { width: 1px; height: 100%; background: var(--cg-gray-700, #3f3f46); }

    .empty { text-align: center; padding: 32px; color: var(--cg-gray-500, #71717a); font-size: 13px; }

    @media (prefers-reduced-motion: reduce) { .step { transition: none; } }
  `;

  @property({ type: Array }) steps: WorkflowStep[] = [];
  @property({ type: String }) title: string = 'Workflow';

  private _icons: Record<string, string> = { start: '▶', agent: '🤖', tool: '🔧', condition: '◆', end: '⏹' };
  private _statusIcons: Record<string, string> = { complete: '✓', error: '✕', active: '●', pending: '○', skipped: '–' };

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
              <div class="step-icon ${step.type}" aria-hidden="true">${this._icons[step.type] || '•'}</div>
              <div class="step-info">
                <div class="step-type">${step.type}</div>
                <div class="step-label">${step.label}</div>
                ${step.description ? html`<div class="step-desc">${step.description}</div>` : nothing}
              </div>
              <span class="step-status" aria-hidden="true">${this._statusIcons[step.status || 'pending']}</span>
            </div>
          `)}
        </div>
      </div>
    `;
  }
}
