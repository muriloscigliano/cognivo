/**
 * <ai-agent-card> — Multi-Agent Status Card
 *
 * Shows agent name, role, status (idle/thinking/acting/done/error),
 * current task, handoff chain, capabilities. For multi-agent orchestration UIs.
 */
import { LitElement, html, css, nothing } from 'lit';
import { property, customElement } from 'lit/decorators.js';

@customElement('ai-agent-card')
export class AiAgentCard extends LitElement {
  static override styles = css`
    :host {
      transition: color 100ms cubic-bezier(0, 0, 0.58, 1);
      animation: fadeSlideIn 200ms cubic-bezier(0, 0, 0.58, 1);
      display: block;
      font-family: var(--cg-font-family-primary, 'Inter Variable', 'Inter', -apple-system, sans-serif);
    }

    .card {
      background: var(--cg-color-surface-container-background, #18181b);
      border: 1px solid var(--cg-color-surface-container-border, #27272a);
      border-radius: 12px;
      padding: 16px;
      transition: all 150ms;
      cursor: pointer;
      position: relative;
    }
    .card:hover { border-color: var(--cg-gray-600, #52525b); box-shadow: 0 2px 8px rgba(0,0,0,0.2); }
    .card:focus-visible { outline: 2px solid var(--cg-brand-ai-accent, #dfff61); outline-offset: 2px; }
    .card.active { border-color: var(--cg-brand-ai-accent, #dfff61); }

    /* Header */
    .header { display: flex; align-items: center; gap: 10px; margin-bottom: 10px; }

    .avatar {
      width: 36px; height: 36px; border-radius: 10px;
      display: flex; align-items: center; justify-content: center;
      font-size: 16px; flex-shrink: 0;
      background: var(--cg-gray-800, #27272a);
    }

    .info { flex: 1; min-width: 0; }
    .name { font-size: 14px; font-weight: 700; color: var(--cg-color-surface-base-text, #fafafa); }
    .role {
      font-size: 11px; font-weight: 600; color: var(--cg-gray-500, #71717a);
      text-transform: uppercase; letter-spacing: 0.05em;
    }

    /* Status */
    .status-row { display: flex; align-items: center; gap: 6px; margin-bottom: 8px; }
    .status-dot {
      width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0;
    }
    .status-dot.idle { background: var(--cg-gray-600, #52525b); }
    .status-dot.thinking { background: var(--cg-brand-ai-accent, #dfff61); animation: pulse 1.5s ease-in-out infinite; }
    .status-dot.acting { background: #60a5fa; animation: pulse 1.5s ease-in-out infinite; }
    .status-dot.done { background: var(--cg-green-400, #4ade80); }
    .status-dot.error { background: var(--cg-red-400, #f87171); }

    @keyframes pulse {
      0%, 100% { opacity: 1; box-shadow: 0 0 0 0 currentColor; }
      50% { opacity: 0.7; box-shadow: 0 0 0 4px transparent; }
    }

    .status-label { font-size: 12px; font-weight: 600; color: var(--cg-gray-400, #a1a1aa); text-transform: capitalize; }
    .status-label.thinking { color: var(--cg-brand-ai-accent, #dfff61); }
    .status-label.acting { color: #60a5fa; }
    .status-label.done { color: var(--cg-green-400, #4ade80); }
    .status-label.error { color: var(--cg-red-400, #f87171); }

    /* Task */
    .task {
      font-size: 13px; color: var(--cg-color-surface-base-text, #fafafa);
      line-height: 1.4; margin-bottom: 10px;
      display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
    }

    /* Handoff chain */
    .handoff {
      display: flex; align-items: center; gap: 4px; margin-bottom: 10px;
      font-size: 11px; color: var(--cg-gray-500, #71717a);
    }
    .handoff-step { padding: 2px 8px; border-radius: 4px; background: var(--cg-gray-800, #27272a); }
    .handoff-step.current { background: rgba(223, 255, 97, 0.1); color: var(--cg-brand-ai-accent, #dfff61); font-weight: 700; }
    .handoff-arrow { color: var(--cg-gray-700, #3f3f46); }

    /* Capabilities */
    .caps { display: flex; gap: 4px; flex-wrap: wrap; }
    .cap {
      font-size: 10px; padding: 2px 8px; border-radius: 4px;
      background: var(--cg-gray-800, #27272a); color: var(--cg-gray-400, #a1a1aa);
      font-weight: 600;
    }

    /* Actions */
    .actions {
      display: flex; gap: 4px; position: absolute; top: 12px; right: 12px;
      opacity: 0; transition: opacity 150ms;
    }
    .card:hover .actions { opacity: 1; }
    .action-btn {
      width: 24px; height: 24px; border-radius: 6px;
      background: var(--cg-gray-800, #27272a); border: 1px solid var(--cg-gray-700, #3f3f46);
      color: var(--cg-gray-400, #a1a1aa); cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      font-size: 11px; padding: 0; transition: all 150ms;
    }
    .action-btn:hover { color: var(--cg-color-surface-base-text, #fafafa); background: var(--cg-gray-700, #3f3f46); }
    .action-btn:focus-visible { outline: 2px solid var(--cg-brand-ai-accent, #dfff61); outline-offset: 2px; }

    @media (prefers-reduced-motion: reduce) {
      .status-dot, .card, .action-btn { animation: none; transition: none; }
    }
  
    @keyframes fadeSlideIn {
      from { opacity: 0; transform: translateY(4px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `;

  @property({ type: String }) name: string = 'Agent';
  @property({ type: String }) role: string = '';
  @property({ type: String }) status: 'idle' | 'thinking' | 'acting' | 'done' | 'error' = 'idle';
  @property({ type: String }) task: string = '';
  @property({ type: Array }) handoffChain: string[] = [];
  @property({ type: Array }) capabilities: string[] = [];
  @property({ type: String }) avatar: string = '🤖';

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
            <button class="action-btn" @click=${this._handlePause} title="Pause" aria-label="Pause agent">⏸</button>
            <button class="action-btn" @click=${this._handleCancel} title="Cancel" aria-label="Cancel agent">✕</button>
          </div>
        ` : nothing}

        <div class="header">
          <div class="avatar" aria-hidden="true">${this.avatar}</div>
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
              ${i > 0 ? html`<span class="handoff-arrow">→</span>` : nothing}
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
