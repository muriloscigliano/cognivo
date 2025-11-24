import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

export interface AiAnomalyData {
  title: string;
  description: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  deviation: number;
  timestamp?: string;
  confidence?: number;
}

@customElement('ai-anomaly-card')
export class AiAnomalyCard extends LitElement {
  static override styles = [
    baseStyles,
    css`
      :host {
        display: block;
        padding: ${tokens.spacing.lg};
        background: ${tokens.color.grayWhite};
        border: 1px solid ${tokens.color.gray100};
        border-radius: ${tokens.radius.lg};
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        transition: all ${tokens.transition.default};
      }

      :host(:hover) {
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      }

      .header {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        margin-bottom: ${tokens.spacing.md};
        gap: ${tokens.spacing.sm};
      }

      .header-content {
        flex: 1;
      }

      .title {
        font-size: ${tokens.fontSize.lg};
        font-weight: ${tokens.fontWeight.semibold};
        color: ${tokens.color.gray900};
        margin-bottom: ${tokens.spacing.xs};
      }

      .timestamp {
        font-size: ${tokens.fontSize.xs};
        color: ${tokens.color.gray500};
      }

      .severity-badge {
        padding: ${tokens.spacing.xs} ${tokens.spacing.sm};
        border-radius: ${tokens.radius.full};
        font-size: ${tokens.fontSize.xs};
        font-weight: ${tokens.fontWeight.semibold};
        text-transform: uppercase;
        white-space: nowrap;
        display: flex;
        align-items: center;
        gap: ${tokens.spacing.xs};
      }

      .severity-badge.critical {
        background: ${tokens.color.danger};
        color: white;
        animation: pulse 2s ease-in-out infinite;
      }

      .severity-badge.high {
        background: ${tokens.color.danger};
        color: ${tokens.color.danger};
      }

      .severity-badge.medium {
        background: ${tokens.color.warning};
        color: ${tokens.color.warning};
      }

      .severity-badge.low {
        background: ${tokens.color.gray100};
        color: ${tokens.color.gray900};
      }

      @keyframes pulse {
        0%, 100% {
          opacity: 1;
        }
        50% {
          opacity: 0.7;
        }
      }

      .description {
        font-size: ${tokens.fontSize.md};
        color: ${tokens.color.gray900};
        line-height: 1.5;
        margin-bottom: ${tokens.spacing.md};
      }

      .metrics {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: ${tokens.spacing.md};
        padding: ${tokens.spacing.md};
        background: ${tokens.color.gray50};
        border-radius: ${tokens.radius.md};
        margin-bottom: ${tokens.spacing.md};
      }

      .metric {
        display: flex;
        flex-direction: column;
        gap: ${tokens.spacing.xs};
      }

      .metric-label {
        font-size: ${tokens.fontSize.xs};
        color: ${tokens.color.gray500};
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }

      .metric-value {
        font-size: ${tokens.fontSize.xl};
        font-weight: ${tokens.fontWeight.bold};
        color: ${tokens.color.gray900};
      }

      .metric-value.deviation {
        color: ${tokens.color.danger};
      }

      .ai-section {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-top: ${tokens.spacing.md};
        border-top: 1px solid ${tokens.color.gray100};
      }

      .ai-badge {
        display: inline-flex;
        align-items: center;
        gap: ${tokens.spacing.xs};
        padding: ${tokens.spacing.xs} ${tokens.spacing.sm};
        background: linear-gradient(135deg, ${tokens.color.primaryMain} 0%, ${tokens.color.primaryDark} 100%);
        color: white;
        border-radius: ${tokens.radius.full};
        font-size: ${tokens.fontSize.xs};
        font-weight: ${tokens.fontWeight.medium};
      }

      .confidence {
        font-size: ${tokens.fontSize.sm};
        color: ${tokens.color.gray500};
        font-weight: ${tokens.fontWeight.medium};
      }

      .empty-state {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: ${tokens.spacing.xl};
        color: ${tokens.color.gray500};
        text-align: center;
      }

      .empty-icon {
        font-size: ${tokens.fontSize['3xl']};
        margin-bottom: ${tokens.spacing.sm};
      }
    `
  ];

  @property({ type: Object }) data: AiAnomalyData | null = null;

  private _getSeverityIcon(severity: string): string {
    switch (severity) {
      case 'critical':
        return '🔴';
      case 'high':
        return '🟠';
      case 'medium':
        return '🟡';
      case 'low':
        return '🟢';
      default:
        return '⚪';
    }
  }

  override render() {
    if (!this.data) {
      return html`
        <div class="empty-state">
          <div class="empty-icon">🔍</div>
          <div class="empty-text">No anomalies detected</div>
        </div>
        <slot></slot>
      `;
    }

    return html`
      <div class="header">
        <div class="header-content">
          <div class="title">${this.data.title}</div>
          ${this.data.timestamp ? html`
            <div class="timestamp">${this.data.timestamp}</div>
          ` : ''}
        </div>
        <div class="severity-badge ${this.data.severity}">
          <span>${this._getSeverityIcon(this.data.severity)}</span>
          <span>${this.data.severity}</span>
        </div>
      </div>

      <div class="description">${this.data.description}</div>

      <div class="metrics">
        <div class="metric">
          <div class="metric-label">Deviation</div>
          <div class="metric-value deviation">
            ${this.data.deviation > 0 ? '+' : ''}${this.data.deviation.toFixed(1)}%
          </div>
        </div>
        <div class="metric">
          <div class="metric-label">Severity</div>
          <div class="metric-value">${this.data.severity}</div>
        </div>
      </div>

      <div class="ai-section">
        <div class="ai-badge">
          <span>✨</span>
          <span>AI Detected</span>
        </div>
        ${this.data.confidence ? html`
          <div class="confidence">
            ${Math.round(this.data.confidence * 100)}% confidence
          </div>
        ` : ''}
      </div>

      <slot></slot>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ai-anomaly-card': AiAnomalyCard;
  }
}
