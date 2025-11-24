import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';
import type { Agent } from './agent-selector.js';
import type { MessageData } from './chat-message.js';

@customElement('multi-agent-chat')
export class MultiAgentChat extends LitElement {
  static override styles = [
    baseStyles,
    css`
      :host {
        display: flex;
        flex-direction: column;
        height: 100%;
        font-family: ${tokens.fontFamily.primary};
      }

      .multi-agent-container {
        display: flex;
        flex-direction: column;
        height: 100%;
        background: white;
      }

      .agents-bar {
        display: flex;
        align-items: center;
        gap: ${tokens.spacing.sm};
        padding: ${tokens.spacing.sm} ${tokens.spacing.md};
        background: ${tokens.color.gray50};
        border-bottom: 1px solid ${tokens.color.gray100};
        overflow-x: auto;
      }

      .agents-label {
        font-size: ${tokens.fontSize.xs};
        font-weight: ${tokens.fontWeight.semibold};
        color: ${tokens.color.gray500};
        text-transform: uppercase;
        letter-spacing: 0.5px;
        white-space: nowrap;
      }

      .agent-chip {
        display: flex;
        align-items: center;
        gap: 6px;
        padding: 6px ${tokens.spacing.sm};
        background: white;
        border: 1px solid ${tokens.color.gray100};
        border-radius: ${tokens.radius.full};
        font-size: ${tokens.fontSize.xs};
        cursor: pointer;
        transition: all ${tokens.transition.fast};
        white-space: nowrap;
      }

      .agent-chip:hover {
        border-color: ${tokens.color.aiAccent};
        background: ${tokens.color.aiBackground};
      }

      .agent-chip.active {
        background: ${tokens.color.aiAccent};
        color: white;
        border-color: ${tokens.color.aiAccent};
      }

      .agent-chip-avatar {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: ${tokens.color.aiAccent};
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 10px;
        font-weight: ${tokens.fontWeight.bold};
        color: white;
      }

      .agent-chip.active .agent-chip-avatar {
        background: white;
        color: ${tokens.color.aiAccent};
      }

      .chat-area {
        flex: 1;
        display: flex;
        flex-direction: column;
        overflow: hidden;
      }

      .current-agent-info {
        padding: ${tokens.spacing.sm} ${tokens.spacing.md};
        background: ${tokens.color.aiBackground};
        border-bottom: 1px solid ${tokens.color.aiBorder};
        display: flex;
        align-items: center;
        gap: ${tokens.spacing.sm};
      }

      .agent-info-text {
        flex: 1;
      }

      .agent-name {
        font-size: ${tokens.fontSize.sm};
        font-weight: ${tokens.fontWeight.semibold};
        color: ${tokens.color.gray900};
      }

      .agent-description {
        font-size: ${tokens.fontSize.xs};
        color: ${tokens.color.gray500};
      }

      .messages-container {
        flex: 1;
        overflow: hidden;
      }

      .input-container {
        border-top: 1px solid ${tokens.color.gray100};
      }

      /* Compact mode */
      :host([compact]) .agents-bar {
        padding: ${tokens.spacing.xs} ${tokens.spacing.sm};
      }

      :host([compact]) .current-agent-info {
        display: none;
      }
    `
  ];

  @property({ type: Array })
  agents: Agent[] = [];

  @property({ type: Array })
  messages: MessageData[] = [];

  @property({ type: String })
  selectedAgentId = '';

  @property({ type: Boolean, reflect: true })
  compact = false;

  @property({ type: Boolean })
  showAgentBar = true;

  @property({ type: Boolean })
  showAgentInfo = true;

  @state()
  private activeAgents: Set<string> = new Set();

  private get selectedAgent(): Agent | undefined {
    return this.agents.find(a => a.id === this.selectedAgentId);
  }

  private handleAgentSelect(agentId: string) {
    this.selectedAgentId = agentId;
    this.activeAgents.add(agentId);
    this.requestUpdate();

    this.dispatchEvent(new CustomEvent('agent-select', {
      detail: this.agents.find(a => a.id === agentId),
      bubbles: true,
      composed: true
    }));
  }

  private isAgentActive(agentId: string): boolean {
    return this.selectedAgentId === agentId;
  }

  override render() {
    const currentAgent = this.selectedAgent;

    return html`
      <div class="multi-agent-container">
        ${this.showAgentBar && this.agents.length > 0 ? html`
          <div class="agents-bar">
            <span class="agents-label">Agents</span>
            ${this.agents.map(agent => html`
              <div
                class="agent-chip ${this.isAgentActive(agent.id) ? 'active' : ''}"
                @click=${() => this.handleAgentSelect(agent.id)}
              >
                <div class="agent-chip-avatar">
                  ${agent.avatar || agent.name.charAt(0).toUpperCase()}
                </div>
                <span>${agent.name}</span>
              </div>
            `)}
          </div>
        ` : ''}

        ${this.showAgentInfo && currentAgent && !this.compact ? html`
          <div class="current-agent-info">
            <agent-avatar
              name="${currentAgent.name}"
              src="${currentAgent.avatar || ''}"
              status="${currentAgent.status || 'none'}"
              size="small"
            ></agent-avatar>
            <div class="agent-info-text">
              <div class="agent-name">${currentAgent.name}</div>
              ${currentAgent.description ? html`
                <div class="agent-description">${currentAgent.description}</div>
              ` : ''}
            </div>
          </div>
        ` : ''}

        <div class="chat-area">
          <div class="messages-container">
            <message-list .messages=${this.messages}></message-list>
          </div>

          <div class="input-container">
            <chat-input
              placeholder="${currentAgent ? `Message ${currentAgent.name}...` : 'Select an agent to start chatting'}"
              ?disabled=${!this.selectedAgentId}
            ></chat-input>
          </div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'multi-agent-chat': MultiAgentChat;
  }
}
