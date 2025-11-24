import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

export interface Agent {
  id: string;
  name: string;
  description?: string;
  capabilities?: string[];
  avatar?: string;
  status?: 'online' | 'offline' | 'busy';
  model?: string;
}

@customElement('agent-selector')
export class AgentSelector extends LitElement {
  static override styles = [
    baseStyles,
    css`
      :host {
        display: block;
        font-family: ${tokens.fontFamily.primary};
      }

      .selector-container {
        position: relative;
        width: 100%;
      }

      .selected-agent {
        display: flex;
        align-items: center;
        gap: ${tokens.spacing.sm};
        padding: ${tokens.spacing.sm} ${tokens.spacing.md};
        background: white;
        border: 1px solid ${tokens.color.gray100};
        border-radius: ${tokens.radius.md};
        cursor: pointer;
        transition: all ${tokens.transition.fast};
      }

      .selected-agent:hover {
        border-color: ${tokens.color.aiAccent};
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      }

      .selected-agent.open {
        border-color: ${tokens.color.aiAccent};
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
      }

      .agent-avatar {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        background: ${tokens.color.aiAccent};
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: ${tokens.fontSize.sm};
        font-weight: ${tokens.fontWeight.bold};
        flex-shrink: 0;
      }

      .agent-info {
        flex: 1;
        min-width: 0;
      }

      .agent-name {
        font-size: ${tokens.fontSize.base};
        font-weight: ${tokens.fontWeight.semibold};
        color: ${tokens.color.gray900};
        display: block;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .agent-status {
        font-size: ${tokens.fontSize.xs};
        color: ${tokens.color.gray500};
      }

      .dropdown-icon {
        transition: transform ${tokens.transition.fast};
      }

      .dropdown-icon.open {
        transform: rotate(180deg);
      }

      .dropdown-menu {
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: white;
        border: 1px solid ${tokens.color.aiAccent};
        border-top: none;
        border-bottom-left-radius: ${tokens.radius.md};
        border-bottom-right-radius: ${tokens.radius.md};
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        max-height: 300px;
        overflow-y: auto;
        z-index: 1000;
      }

      .agent-option {
        display: flex;
        align-items: flex-start;
        gap: ${tokens.spacing.sm};
        padding: ${tokens.spacing.md};
        cursor: pointer;
        transition: background ${tokens.transition.fast};
        border-bottom: 1px solid ${tokens.color.gray50};
      }

      .agent-option:last-child {
        border-bottom: none;
      }

      .agent-option:hover {
        background: ${tokens.color.aiBackground};
      }

      .agent-option.selected {
        background: ${tokens.color.aiBackground};
      }

      .option-info {
        flex: 1;
        min-width: 0;
      }

      .option-description {
        font-size: ${tokens.fontSize.xs};
        color: ${tokens.color.gray500};
        margin-top: 4px;
        line-height: ${tokens.lineHeight.normal};
      }

      .capabilities {
        display: flex;
        flex-wrap: wrap;
        gap: 4px;
        margin-top: ${tokens.spacing.xs};
      }

      .capability-badge {
        padding: 2px 8px;
        background: ${tokens.color.gray50};
        border-radius: ${tokens.radius.sm};
        font-size: ${tokens.fontSize.xs};
        color: ${tokens.color.gray500};
      }

      .model-badge {
        padding: 2px 8px;
        background: ${tokens.color.aiBackground};
        border: 1px solid ${tokens.color.aiBorder};
        border-radius: ${tokens.radius.sm};
        font-size: ${tokens.fontSize.xs};
        color: ${tokens.color.aiAccent};
        font-weight: ${tokens.fontWeight.medium};
      }

      .status-indicator {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        position: absolute;
        bottom: 0;
        right: 0;
        border: 2px solid white;
      }

      .status-indicator.online {
        background: ${tokens.color.success};
      }

      .status-indicator.offline {
        background: ${tokens.color.gray500};
      }

      .status-indicator.busy {
        background: ${tokens.color.warning};
      }
    `
  ];

  @property({ type: Array })
  agents: Agent[] = [];

  @property({ type: String })
  selectedAgentId = '';

  @state()
  private isOpen = false;

  private get selectedAgent(): Agent | undefined {
    return this.agents.find(agent => agent.id === this.selectedAgentId);
  }

  private toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  private selectAgent(agent: Agent) {
    this.selectedAgentId = agent.id;
    this.isOpen = false;

    this.dispatchEvent(new CustomEvent('agent-change', {
      detail: agent,
      bubbles: true,
      composed: true
    }));
  }

  private handleClickOutside = (e: MouseEvent) => {
    if (!this.shadowRoot?.contains(e.target as Node)) {
      this.isOpen = false;
    }
  };

  override connectedCallback() {
    super.connectedCallback();
    document.addEventListener('click', this.handleClickOutside);
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('click', this.handleClickOutside);
  }

  private renderAgentAvatar(agent: Agent) {
    return html`
      <div style="position: relative;">
        <div class="agent-avatar">
          ${agent.avatar || agent.name.charAt(0).toUpperCase()}
        </div>
        ${agent.status ? html`
          <div class="status-indicator ${agent.status}"></div>
        ` : ''}
      </div>
    `;
  }

  override render() {
    const selected = this.selectedAgent;

    return html`
      <div class="selector-container">
        <div
          class="selected-agent ${this.isOpen ? 'open' : ''}"
          @click=${this.toggleDropdown}
        >
          ${selected ? html`
            ${this.renderAgentAvatar(selected)}
            <div class="agent-info">
              <span class="agent-name">${selected.name}</span>
              ${selected.model ? html`
                <span class="agent-status">${selected.model}</span>
              ` : ''}
            </div>
          ` : html`
            <div class="agent-info">
              <span class="agent-name">Select an agent</span>
            </div>
          `}
          <svg
            class="dropdown-icon ${this.isOpen ? 'open' : ''}"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/>
          </svg>
        </div>

        ${this.isOpen ? html`
          <div class="dropdown-menu">
            ${this.agents.map(agent => html`
              <div
                class="agent-option ${agent.id === this.selectedAgentId ? 'selected' : ''}"
                @click=${() => this.selectAgent(agent)}
              >
                ${this.renderAgentAvatar(agent)}
                <div class="option-info">
                  <div class="agent-name">${agent.name}</div>
                  ${agent.description ? html`
                    <div class="option-description">${agent.description}</div>
                  ` : ''}
                  ${agent.model ? html`
                    <div class="capabilities">
                      <span class="model-badge">${agent.model}</span>
                    </div>
                  ` : ''}
                  ${agent.capabilities && agent.capabilities.length > 0 ? html`
                    <div class="capabilities">
                      ${agent.capabilities.slice(0, 3).map(cap => html`
                        <span class="capability-badge">${cap}</span>
                      `)}
                    </div>
                  ` : ''}
                </div>
              </div>
            `)}
          </div>
        ` : ''}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'agent-selector': AgentSelector;
  }
}
