import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

@customElement('agent-avatar')
export class AgentAvatar extends LitElement {
  static override styles = [
    baseStyles,
    css`
      :host {
        display: inline-flex;
        font-family: ${tokens.fontFamily.primary};
      }

      .avatar-container {
        position: relative;
        display: inline-flex;
      }

      .avatar {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: ${tokens.color.aiAccent};
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: ${tokens.fontSize.base};
        font-weight: ${tokens.fontWeight.bold};
        overflow: hidden;
        position: relative;
      }

      .avatar img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .status-indicator {
        position: absolute;
        bottom: 0;
        right: 0;
        width: 12px;
        height: 12px;
        border-radius: 50%;
        border: 2px solid white;
        box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1);
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

      .status-indicator.away {
        background: ${tokens.color.warning};
      }

      /* Pulse animation for online status */
      .status-indicator.online.pulse {
        animation: statusPulse 2s ease-in-out infinite;
      }

      @keyframes statusPulse {
        0%, 100% {
          box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.7);
        }
        50% {
          box-shadow: 0 0 0 4px rgba(34, 197, 94, 0);
        }
      }

      /* Size variants */
      :host([size='small']) .avatar {
        width: 24px;
        height: 24px;
        font-size: ${tokens.fontSize.xs};
      }

      :host([size='small']) .status-indicator {
        width: 8px;
        height: 8px;
        border-width: 1.5px;
      }

      :host([size='large']) .avatar {
        width: 56px;
        height: 56px;
        font-size: ${tokens.fontSize.lg};
      }

      :host([size='large']) .status-indicator {
        width: 16px;
        height: 16px;
        border-width: 3px;
      }

      /* Shape variants */
      :host([shape='square']) .avatar {
        border-radius: ${tokens.radius.md};
      }

      :host([shape='rounded']) .avatar {
        border-radius: ${tokens.radius.lg};
      }

      /* Border variant */
      :host([bordered]) .avatar {
        border: 2px solid ${tokens.color.gray100};
      }

      /* AI glow effect */
      :host([glow]) .avatar {
        box-shadow: 0 0 20px ${tokens.color.aiGlow};
      }

      /* Typing indicator */
      .typing-indicator {
        position: absolute;
        top: -4px;
        right: -4px;
        background: white;
        border-radius: 12px;
        padding: 4px 8px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
        display: flex;
        gap: 3px;
      }

      .typing-dot {
        width: 4px;
        height: 4px;
        border-radius: 50%;
        background: ${tokens.color.aiAccent};
        animation: typingBounce 1.4s ease-in-out infinite;
      }

      .typing-dot:nth-child(1) { animation-delay: 0s; }
      .typing-dot:nth-child(2) { animation-delay: 0.2s; }
      .typing-dot:nth-child(3) { animation-delay: 0.4s; }

      @keyframes typingBounce {
        0%, 60%, 100% { transform: translateY(0); }
        30% { transform: translateY(-4px); }
      }
    `
  ];

  @property({ type: String })
  name = 'AI';

  @property({ type: String })
  src = '';

  @property({ type: String })
  status: 'online' | 'offline' | 'busy' | 'away' | 'none' = 'none';

  @property({ type: String, reflect: true })
  size: 'small' | 'medium' | 'large' = 'medium';

  @property({ type: String, reflect: true })
  shape: 'circle' | 'square' | 'rounded' = 'circle';

  @property({ type: Boolean, reflect: true })
  bordered = false;

  @property({ type: Boolean, reflect: true })
  glow = false;

  @property({ type: Boolean })
  statusPulse = true;

  @property({ type: Boolean })
  typing = false;

  @property({ type: String })
  backgroundColor = '';

  private getInitials(): string {
    return this.name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }

  override render() {
    const style = this.backgroundColor
      ? `background: ${this.backgroundColor};`
      : '';

    return html`
      <div class="avatar-container">
        <div class="avatar" style="${style}">
          ${this.src
            ? html`<img src="${this.src}" alt="${this.name}" />`
            : this.getInitials()
          }
        </div>

        ${this.status !== 'none' ? html`
          <div class="status-indicator ${this.status} ${this.statusPulse && this.status === 'online' ? 'pulse' : ''}"></div>
        ` : ''}

        ${this.typing ? html`
          <div class="typing-indicator">
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
          </div>
        ` : ''}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'agent-avatar': AgentAvatar;
  }
}
