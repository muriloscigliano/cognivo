/**
 * @element ai-agent-card
 * Status card for multi-agent orchestration — shows agent name, role, live status badge,
 * current task, handoff chain, capability chips, and pause/cancel controls.
 *
 * Uses cg-badge for status, cg-chip for capabilities, cg-button for actions.
 *
 * @example
 * ```html
 * <ai-agent-card
 *   name="Researcher"
 *   role="Data Analyst"
 *   status="thinking"
 *   task="Querying vector store for Q4 revenue data..."
 *   .capabilities=${['search','summarize','code']}
 *   .handoffChain=${['Planner','Researcher','Coder']}
 * ></ai-agent-card>
 * ```
 *
 * @fires {CustomEvent<{name}>} ai-agent-pause - Pause button clicked
 * @fires {CustomEvent<{name}>} ai-agent-cancel - Cancel button clicked
 */
import { LitElement, html, css, nothing } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { hostBlock, reducedMotion, fadeSlideInKeyframes, pulseKeyframes } from '../../styles/index.js';

type AgentStatus = 'idle' | 'thinking' | 'acting' | 'done' | 'error';

const STATUS_BADGE_MAP: Record<AgentStatus, string> = {
  idle: 'neutral',
  thinking: 'accent',
  acting: 'info',
  done: 'success',
  error: 'danger',
};

@customElement('ai-agent-card')
export class AiAgentCard extends LitElement {
  static override styles = [hostBlock, reducedMotion, fadeSlideInKeyframes, pulseKeyframes, css`
    :host {
      animation: fadeSlideIn var(--cg-motion-duration-fast) var(--cg-motion-easing-enter) both;
    }

    /* ── Card ── */
    .card {
      background: var(--cg-color-surface-cards-background);
      border: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
      border-radius: var(--cg-border-radius-200);
      padding: var(--cg-spacing-20);
      position: relative;
      overflow: hidden;
      transition:
        border-color var(--cg-motion-duration-fast) var(--cg-motion-easing-default),
        box-shadow var(--cg-motion-duration-fast) var(--cg-motion-easing-default);
    }
    .card:hover {
      border-color: var(--cg-color-surface-cards-hover-border);
    }

    /* Left accent per state */
    .card.active {
      border-left: var(--cg-border-width-200) solid var(--cg-color-action-primary-background-default);
    }
    .card.error-state {
      border-left: var(--cg-border-width-200) solid var(--cg-color-status-error-text-default);
    }
    .card.done-state {
      border-left: var(--cg-border-width-200) solid var(--cg-color-status-success-text-default);
    }

    /* Shimmer on active */
    @keyframes shimmerSlide {
      from { transform: translateX(-100%); }
      to { transform: translateX(200%); }
    }
    .card.active::before {
      content: '';
      position: absolute;
      top: 0; left: 0; right: 0;
      height: var(--cg-spacing-2);
      background: linear-gradient(90deg, transparent, var(--cg-color-action-primary-background-default), transparent);
      animation: shimmerSlide 2s var(--cg-motion-easing-default) infinite;
    }
    .card.error-state::before {
      background: linear-gradient(90deg, transparent, var(--cg-color-status-error-text-default), transparent);
    }

    /* ── Header: name + role | badge ── */
    .header {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: var(--cg-spacing-12);
      margin-bottom: var(--cg-spacing-16);
    }

    .identity { flex: 1; min-width: 0; }
    .name {
      font-size: var(--cg-font-size-base);
      font-weight: var(--cg-font-weight-bold);
      color: var(--cg-color-surface-base-text);
      line-height: var(--cg-line-height-tight);
    }
    .role {
      font-size: var(--cg-font-size-xs);
      font-weight: var(--cg-font-weight-semibold);
      color: var(--cg-color-input-text-placeholder);
      text-transform: uppercase;
      letter-spacing: var(--cg-letter-spacing-wide);
      margin-top: var(--cg-spacing-4);
    }

    .header-badge { flex-shrink: 0; }

    /* ── Actions ── */
    .actions {
      display: flex;
      gap: var(--cg-spacing-4);
      position: absolute;
      top: var(--cg-spacing-12);
      right: var(--cg-spacing-12);
    }

    /* ── Body ── */
    .body {
      display: flex;
      flex-direction: column;
      gap: var(--cg-spacing-12);
      padding-top: var(--cg-spacing-12);
      border-top: var(--cg-border-width-50) solid var(--cg-color-surface-cards-divider);
    }

    .task {
      font-size: var(--cg-font-size-sm);
      color: var(--cg-color-surface-base-text);
      line-height: var(--cg-line-height-relaxed);
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    /* ── Handoff chain ── */
    .handoff {
      display: flex;
      align-items: center;
      gap: var(--cg-spacing-6);
      flex-wrap: wrap;
      font-size: var(--cg-font-size-xs);
      color: var(--cg-color-input-text-placeholder);
    }
    .handoff-step {
      padding: var(--cg-spacing-4) var(--cg-spacing-8);
      border-radius: var(--cg-border-radius-50);
      background: var(--cg-color-surface-container-background);
      white-space: nowrap;
      font-weight: var(--cg-font-weight-medium);
    }
    .handoff-step.current {
      background: var(--cg-overlay-accent-subtle);
      color: var(--cg-color-surface-base-text);
      font-weight: var(--cg-font-weight-bold);
    }
    .handoff-step.past {
      opacity: 0.6;
    }
    .handoff-arrow {
      color: var(--cg-color-surface-cards-border);
      flex-shrink: 0;
      display: flex;
    }

    /* ── Capabilities ── */
    .caps {
      display: flex;
      gap: var(--cg-spacing-6);
      flex-wrap: wrap;
    }

    /* ── Reduced motion ── */
    @media (prefers-reduced-motion: reduce) {
      .card.active::before { animation: none; display: none; }
    }

    /* ── Rounded variants ── */
    :host([rounded="none"]) .card { border-radius: 0; }
    :host([rounded="sm"]) .card { border-radius: var(--cg-border-radius-50); }
    :host([rounded="md"]) .card { border-radius: var(--cg-border-radius-100); }
    :host([rounded="lg"]) .card { border-radius: var(--cg-border-radius-200); }
    :host([rounded="full"]) .card { border-radius: var(--cg-border-radius-full); }
  `];

  @property({ reflect: true }) rounded: 'none' | 'sm' | 'md' | 'lg' | 'full' = 'lg';
  @property({ type: String }) name: string = 'Agent';
  @property({ type: String }) override role: string = '';
  @property({ type: String }) status: AgentStatus = 'idle';
  @property({ type: String }) task: string = '';
  @property({ type: Array }) handoffChain: string[] = [];
  @property({ type: Array }) capabilities: string[] = [];

  private _handlePause(e: Event) {
    e.stopPropagation();
    this.dispatchEvent(new CustomEvent('ai-agent-pause', { bubbles: true, composed: true, detail: { name: this.name } }));
  }

  private _handleCancel(e: Event) {
    e.stopPropagation();
    this.dispatchEvent(new CustomEvent('ai-agent-cancel', { bubbles: true, composed: true, detail: { name: this.name } }));
  }

  private _currentStepIndex(): number {
    return this.handoffChain.length > 0 ? this.handoffChain.length - 1 : -1;
  }

  override render() {
    const isActive = this.status === 'thinking' || this.status === 'acting';
    const currentIdx = this._currentStepIndex();
    const badgeVariant = STATUS_BADGE_MAP[this.status];
    const showDot = isActive;

    const cardClasses = [
      'card',
      isActive ? 'active' : '',
      this.status === 'error' ? 'error-state' : '',
      this.status === 'done' ? 'done-state' : '',
    ].filter(Boolean).join(' ');

    return html`
      <div class="${cardClasses}" role="article"
        aria-label="${this.name} agent — ${this.status}${this.task ? `: ${this.task}` : ''}">

        ${isActive ? html`
          <div class="actions">
            <cg-button variant="tertiary" size="sm" rounded="full" label="Pause agent" @click=${this._handlePause}>
              <cg-icon name="pause" size="xs"></cg-icon>
            </cg-button>
            <cg-button variant="tertiary" size="sm" rounded="full" label="Cancel agent" @click=${this._handleCancel}>
              <cg-icon name="close" size="xs"></cg-icon>
            </cg-button>
          </div>
        ` : nothing}

        <div class="header">
          <div class="identity">
            <div class="name">${this.name}</div>
            ${this.role ? html`<div class="role">${this.role}</div>` : nothing}
          </div>
          <div class="header-badge">
            <cg-badge variant=${badgeVariant} label=${this.status} size="sm" rounded="full" ?dot=${showDot}></cg-badge>
          </div>
        </div>

        ${this.task || this.handoffChain.length > 0 || this.capabilities.length > 0 ? html`
          <div class="body">
            ${this.task ? html`<div class="task">${this.task}</div>` : nothing}

            ${this.handoffChain.length > 0 ? html`
              <div class="handoff" aria-label="Handoff: ${this.handoffChain.join(' → ')}">
                ${this.handoffChain.map((step, i) => html`
                  ${i > 0 ? html`<span class="handoff-arrow" aria-hidden="true">→</span>` : nothing}
                  <span class="handoff-step ${i === currentIdx ? 'current' : i < currentIdx ? 'past' : ''}">${step}</span>
                `)}
              </div>
            ` : nothing}

            ${this.capabilities.length > 0 ? html`
              <div class="caps" aria-label="Capabilities: ${this.capabilities.join(', ')}">
                ${this.capabilities.map(c => html`
                  <cg-chip label=${c} variant="default" size="sm"></cg-chip>
                `)}
              </div>
            ` : nothing}
          </div>
        ` : nothing}
      </div>
    `;
  }
}
