/**
 * @element ai-agent-card
 * Status card for multi-agent orchestration showing name, role, live status, task, and handoff chain.
 *
 * @example
 * ```html
 * <ai-agent-card
 *   name="Researcher"
 *   role="Data Analyst"
 *   status="thinking"
 *   task="Querying vector store..."
 *   .capabilities=${['search','summarize']}
 * ></ai-agent-card>
 * ```
 *
 * @fires {CustomEvent<{name: string, role: string, status: string}>} ai-agent-select - Card clicked
 * @fires {CustomEvent<{name: string}>} ai-agent-pause - Pause button clicked
 * @fires {CustomEvent<{name: string}>} ai-agent-cancel - Cancel button clicked
 *
 * @cssprop [--cg-brand-ai-accent=#dfff61] - Active border and thinking dot color
 */
import { LitElement, html, css, nothing } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { hostBlock, reducedMotion, fadeSlideInKeyframes, pulseKeyframes } from '../../styles/index.js';

@customElement('ai-agent-card')
export class AiAgentCard extends LitElement {
  static override styles = [hostBlock, reducedMotion, fadeSlideInKeyframes, pulseKeyframes, css`
    :host {
      animation: fadeSlideIn var(--cg-motion-duration-fast, 200ms) var(--cg-motion-easing-color, cubic-bezier(0, 0, 0.58, 1));
    }

    .card {
      background: var(--cg-color-surface-container-background, #18181b);
      background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0.03), transparent);
      border: 1px solid var(--cg-color-surface-container-border, #27272a);
      border-radius: var(--cg-border-radius-150, 12px);
      padding: var(--cg-spacing-16, 16px);
      transition: all 150ms;
      cursor: pointer;
      position: relative;
      box-shadow: var(--cg-elevation-1, 0 1px 3px rgba(0,0,0,0.3), 0 1px 2px rgba(0,0,0,0.2)), inset 0 1px 0 0 rgba(255, 255, 255, 0.05);
    }
    .card:hover { border-color: var(--cg-gray-600, #52525b); box-shadow: var(--cg-elevation-2, 0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -2px rgba(0, 0, 0, 0.2)); transform: translateY(var(--cg-interaction-hover-lift, -1px)); }
    .card:focus-visible { outline: 2px solid var(--cg-brand-ai-accent, #dfff61); outline-offset: 2px; }
    .card.active { border-color: var(--cg-brand-ai-accent, #dfff61); }

    /* Header */
    .header {
      display: flex; align-items: center; gap: var(--cg-spacing-10, 10px);
      padding-bottom: var(--cg-spacing-12, 12px); margin-bottom: var(--cg-spacing-12, 12px);
      border-bottom: 1px solid var(--cg-color-surface-container-border, #27272a);
    }

    .avatar {
      width: 36px; height: 36px; border-radius: var(--cg-border-radius-100, 8px);
      display: flex; align-items: center; justify-content: center;
      font-size: var(--cg-font-size-base, 16px); flex-shrink: 0;
      background: var(--cg-gray-800, #27272a);
    }

    .info { flex: 1; min-width: 0; }
    .name { font-size: var(--cg-font-size-sm, 14px); font-weight: 700; color: var(--cg-color-surface-base-text, #fafafa); }
    .role {
      font-size: var(--cg-font-size-xs, 12px); font-weight: 600; color: var(--cg-gray-500, #71717a);
      text-transform: uppercase; letter-spacing: 0.05em;
    }

    /* Status */
    .status-row { display: flex; align-items: center; gap: var(--cg-spacing-6, 6px); margin-bottom: var(--cg-spacing-8, 8px); }
    .status-dot {
      width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0;
    }
    .status-dot.idle { background: var(--cg-gray-600, #52525b); }
    .status-dot.thinking { background: var(--cg-brand-ai-accent, #dfff61); animation: pulse 1.5s ease-in-out infinite; }
    .status-dot.acting { background: var(--cg-color-status-info-text-default, #60a5fa); animation: pulse 1.5s ease-in-out infinite; }
    .status-dot.done { background: var(--cg-green-400, #4ade80); }
    .status-dot.error { background: var(--cg-red-400, #f87171); }

    .status-label { font-size: 12px; font-weight: 600; color: var(--cg-gray-400, #a1a1aa); text-transform: capitalize; }
    .status-label.thinking { color: var(--cg-brand-ai-accent, #dfff61); }
    .status-label.acting { color: var(--cg-color-status-info-text-default, #60a5fa); }
    .status-label.done { color: var(--cg-green-400, #4ade80); }
    .status-label.error { color: var(--cg-red-400, #f87171); }

    /* Task */
    .task {
      font-size: var(--cg-font-size-sm, 14px); color: var(--cg-color-surface-base-text, #fafafa);
      line-height: 1.4; margin-bottom: var(--cg-spacing-10, 10px);
      display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
    }

    /* Handoff chain */
    .handoff {
      display: flex; align-items: center; gap: var(--cg-spacing-4, 4px); margin-bottom: var(--cg-spacing-10, 10px);
      font-size: var(--cg-font-size-xs, 12px); color: var(--cg-gray-500, #71717a);
    }
    .handoff-step { padding: 2px 8px; border-radius: 4px; background: var(--cg-gray-800, #27272a); }
    .handoff-step.current { background: rgba(223, 255, 97, 0.1); color: var(--cg-brand-ai-accent, #dfff61); font-weight: 700; }
    .handoff-arrow { color: var(--cg-gray-700, #3f3f46); }

    /* Capabilities */
    .caps { display: flex; gap: var(--cg-spacing-4, 4px); flex-wrap: wrap; }
    .cap {
      font-size: 10px; padding: 2px var(--cg-spacing-8, 8px); border-radius: var(--cg-border-radius-50, 4px);
      background: var(--cg-gray-800, #27272a); color: var(--cg-gray-400, #a1a1aa);
      font-weight: 600;
    }

    /* Actions */
    .actions {
      display: flex; gap: var(--cg-spacing-4, 4px); position: absolute; top: 12px; right: 12px;
      opacity: 0; transition: opacity 150ms;
    }
    .card:hover .actions { opacity: 1; }
    .action-btn {
      width: 24px; height: 24px; border-radius: var(--cg-border-radius-100, 8px);
      background: var(--cg-gray-800, #27272a); border: 1px solid var(--cg-gray-700, #3f3f46);
      color: var(--cg-gray-400, #a1a1aa); cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      font-size: var(--cg-font-size-xs, 12px); padding: 0; transition: all 150ms;
    }
    .action-btn:hover { color: var(--cg-color-surface-base-text, #fafafa); background: var(--cg-gray-700, #3f3f46); }
    .action-btn:focus-visible { outline: 2px solid var(--cg-brand-ai-accent, #dfff61); outline-offset: 2px; }
    }

    /* ── Rounded variants ── */
    :host([rounded="none"]) .card { border-radius: 0; }
    :host([rounded="sm"]) .card { border-radius: var(--cg-border-radius-50, 4px); }
    :host([rounded="md"]) .card { border-radius: var(--cg-border-radius-100, 8px); }
    :host([rounded="lg"]) .card { border-radius: var(--cg-border-radius-150, 12px); }
    :host([rounded="full"]) .card { border-radius: var(--cg-border-radius-full, 99999px); }
  `];
  @property({ reflect: true }) rounded: 'none' | 'sm' | 'md' | 'lg' | 'full' = 'lg';
  @property({ type: String }) name: string = 'Agent';
  @property({ type: String }) override role: string = '';
  @property({ type: String }) status: 'idle' | 'thinking' | 'acting' | 'done' | 'error' = 'idle';
  @property({ type: String }) task: string = '';
  @property({ type: Array }) handoffChain: string[] = [];
  @property({ type: Array }) capabilities: string[] = [];
  @property({ type: String }) avatar: string = '';

  private _handleClick() {
    this.dispatchEvent(new CustomEvent('ai-agent-select', {
      bubbles: true, composed: true,
      detail: { name: this.name, role: this.role, status: this.status },
    }));
  }

  private _handlePause(e: Event) {
    e.stopPropagation();
    this.dispatchEvent(new CustomEvent('ai-agent-pause', { bubbles: true, composed: true, detail: { name: this.name } }));
  }

  private _handleCancel(e: Event) {
    e.stopPropagation();
    this.dispatchEvent(new CustomEvent('ai-agent-cancel', { bubbles: true, composed: true, detail: { name: this.name } }));
  }

  override render() {
    const isActive = this.status === 'thinking' || this.status === 'acting';

    return html`
      <div class="card ${isActive ? 'active' : ''}" role="article" tabindex="0"
        aria-label="${this.name} — ${this.status}"
        @click=${this._handleClick}
        @keydown=${(e: KeyboardEvent) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); this._handleClick(); } }}>

        ${isActive ? html`
          <div class="actions">
            <button class="action-btn" @click=${this._handlePause} title="Pause" aria-label="Pause agent"><svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/></svg></button>
            <button class="action-btn" @click=${this._handleCancel} title="Cancel" aria-label="Cancel agent"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg></button>
          </div>
        ` : nothing}

        <div class="header">
          <div class="avatar" aria-hidden="true">${this.avatar || html`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="8" width="18" height="12" rx="3"/><circle cx="9" cy="14" r="1.5"/><circle cx="15" cy="14" r="1.5"/><path d="M12 2v4M8 8V6a4 4 0 018 0v2"/></svg>`}</div>
          <div class="info">
            <div class="name">${this.name}</div>
            ${this.role ? html`<div class="role">${this.role}</div>` : nothing}
          </div>
        </div>

        <div class="status-row">
          <div class="status-dot ${this.status}"></div>
          <span class="status-label ${this.status}">${this.status}</span>
        </div>

        ${this.task ? html`<div class="task">${this.task}</div>` : nothing}

        ${this.handoffChain.length > 0 ? html`
          <div class="handoff">
            ${this.handoffChain.map((step, i) => html`
              ${i > 0 ? html`<span class="handoff-arrow"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14m-7-7l7 7-7 7"/></svg></span>` : nothing}
              <span class="handoff-step ${i === this.handoffChain.length - 1 ? 'current' : ''}">${step}</span>
            `)}
          </div>
        ` : nothing}

        ${this.capabilities.length > 0 ? html`
          <div class="caps">
            ${this.capabilities.map(c => html`<span class="cap">${c}</span>`)}
          </div>
        ` : nothing}
      </div>
    `;
  }
}
