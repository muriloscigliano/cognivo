import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

export interface AnomalyData {
  severity: 'low' | 'medium' | 'high' | 'critical';
  type?: string;
  description?: string;
  timestamp?: string;
}

@customElement('anomaly-badge')
export class AnomalyBadge extends LitElement {
  static override styles = [
    baseStyles,
    css`
      :host {
        display: inline-flex;
        align-items: center;
        gap: ${tokens.spacing.xs};
        padding: 4px 10px;
        border-radius: ${tokens.radius.full};
        font-size: ${tokens.fontSize.xs};
        font-weight: ${tokens.fontWeight.medium};
        border: 1px solid;
        transition: all ${tokens.transition.default};
      }

      :host([severity='low']) {
        background: rgba(59, 130, 246, 0.1);
        border-color: ${tokens.color.info};
        color: ${tokens.color.info};
      }

      :host([severity='medium']) {
        background: rgba(234, 179, 8, 0.1);
        border-color: ${tokens.color.warning};
        color: ${tokens.color.warning};
      }

      :host([severity='high']) {
        background: rgba(249, 115, 22, 0.1);
        border-color: #f97316;
        color: #f97316;
      }

      :host([severity='critical']) {
        background: rgba(239, 68, 68, 0.1);
        border-color: ${tokens.color.danger};
        color: ${tokens.color.danger};
        animation: pulse-critical 2s ease-in-out infinite;
      }

      @keyframes pulse-critical {
        0%, 100% {
          box-shadow: 0 0 0 rgba(239, 68, 68, 0);
        }
        50% {
          box-shadow: 0 0 12px rgba(239, 68, 68, 0.4);
        }
      }

      :host(:hover) {
        transform: translateY(-1px);
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
      }

      .badge-content {
        display: flex;
        align-items: center;
        gap: 6px;
      }

      .warning-icon {
        font-size: 14px;
        animation: warning-pulse 1.5s ease-in-out infinite;
      }

      @keyframes warning-pulse {
        0%, 100% {
          transform: scale(1);
        }
        50% {
          transform: scale(1.2);
        }
      }

      :host([severity='low']) .warning-icon,
      :host([severity='medium']) .warning-icon {
        animation: none;
      }

      .text {
        display: flex;
        flex-direction: column;
        gap: 2px;
      }

      .type {
        font-weight: ${tokens.fontWeight.bold};
        text-transform: capitalize;
      }

      .description {
        font-size: 10px;
        opacity: 0.9;
        max-width: 200px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .ai-indicator {
        width: 14px;
        height: 14px;
        background: ${tokens.color.aiAccent};
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 9px;
        color: white;
      }

      .severity-dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: currentColor;
        animation: dot-blink 2s ease-in-out infinite;
      }

      @keyframes dot-blink {
        0%, 100% {
          opacity: 1;
        }
        50% {
          opacity: 0.4;
        }
      }

      :host([compact]) .description {
        display: none;
      }

      :host([compact]) .text {
        gap: 0;
      }

      :host([size='small']) {
        padding: 2px 6px;
        font-size: 10px;
      }

      :host([size='small']) .warning-icon {
        font-size: 11px;
      }

      :host([size='large']) {
        padding: 6px 14px;
        font-size: ${tokens.fontSize.sm};
      }

      :host([size='large']) .warning-icon {
        font-size: 16px;
      }
    `
  ];

  @property({ type: String, reflect: true })
  severity: 'low' | 'medium' | 'high' | 'critical' = 'low';

  @property({ type: String })
  type = 'Anomaly';

  @property({ type: String })
  description = '';

  @property({ type: String })
  timestamp = '';

  @property({ type: Boolean, reflect: true })
  compact = false;

  @property({ type: String, reflect: true })
  size: 'small' | 'medium' | 'large' = 'medium';

  @property({ type: Boolean })
  showAi = true;

  private getSeverityIcon(): string {
    switch (this.severity) {
      case 'low':
        return 'ℹ️';
      case 'medium':
        return '⚠️';
      case 'high':
        return '⚡';
      case 'critical':
        return '🚨';
      default:
        return '⚠️';
    }
  }

  private handleClick() {
    this.dispatchEvent(new CustomEvent('anomaly-click', {
      detail: {
        severity: this.severity,
        type: this.type,
        description: this.description,
        timestamp: this.timestamp
      },
      bubbles: true,
      composed: true
    }));
  }

  override render() {
    return html`
      <div class="badge-content" @click=${this.handleClick}>
        ${this.showAi ? html`
          <div class="ai-indicator" title="AI-detected anomaly">🤖</div>
        ` : ''}
        <span class="warning-icon">${this.getSeverityIcon()}</span>
        <div class="text">
          <span class="type">${this.type}</span>
          ${this.description && !this.compact ? html`
            <span class="description" title="${this.description}">${this.description}</span>
          ` : ''}
        </div>
        <div class="severity-dot"></div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'anomaly-badge': AnomalyBadge;
  }
}
