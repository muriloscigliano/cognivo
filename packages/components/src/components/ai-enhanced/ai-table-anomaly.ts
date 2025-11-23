import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

export interface TableAnomalyData {
  row: number;
  column: string;
  value: string;
  expected: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  description: string;
}

@customElement('ai-table-anomaly')
export class AiTableAnomaly extends LitElement {
  static override styles = [
    baseStyles,
    css`
      :host {
        display: block;
        padding: ${tokens.spacing.md};
        background: ${tokens.color.grayWhite};
        border: 1px solid ${tokens.color.dangerLight};
        border-radius: ${tokens.radius.md};
      }

      .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: ${tokens.spacing.md};
      }

      .title {
        font-size: ${tokens.fontSize.md};
        font-weight: ${tokens.fontWeight.semibold};
        color: ${tokens.color.gray900};
        display: flex;
        align-items: center;
        gap: ${tokens.spacing.sm};
      }

      .warning-icon {
        font-size: ${tokens.fontSize.lg};
      }

      .ai-badge {
        display: inline-flex;
        align-items: center;
        gap: ${tokens.spacing.xs};
        padding: ${tokens.spacing.xs} ${tokens.spacing.sm};
        background: linear-gradient(135deg, ${tokens.color.dangerMain} 0%, ${tokens.color.dangerDark} 100%);
        color: white;
        border-radius: ${tokens.radius.full};
        font-size: ${tokens.fontSize.xs};
        font-weight: ${tokens.fontWeight.medium};
      }

      .anomalies-list {
        display: flex;
        flex-direction: column;
        gap: ${tokens.spacing.sm};
      }

      .anomaly-item {
        padding: ${tokens.spacing.md};
        background: ${tokens.color.gray50};
        border-radius: ${tokens.radius.md};
        border-left: 3px solid ${tokens.color.dangerMain};
      }

      .anomaly-item.critical {
        border-left-color: ${tokens.color.dangerMain};
        background: ${tokens.color.dangerLight}15;
      }

      .anomaly-item.high {
        border-left-color: ${tokens.color.warningDark};
      }

      .anomaly-item.medium {
        border-left-color: ${tokens.color.warningMain};
      }

      .anomaly-item.low {
        border-left-color: ${tokens.color.gray400};
      }

      .anomaly-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: ${tokens.spacing.sm};
      }

      .anomaly-location {
        font-size: ${tokens.fontSize.sm};
        font-weight: ${tokens.fontWeight.semibold};
        color: ${tokens.color.gray900};
      }

      .severity-badge {
        padding: ${tokens.spacing.xs} ${tokens.spacing.sm};
        border-radius: ${tokens.radius.full};
        font-size: ${tokens.fontSize.xs};
        font-weight: ${tokens.fontWeight.semibold};
        text-transform: uppercase;
      }

      .severity-badge.critical {
        background: ${tokens.color.dangerMain};
        color: white;
      }

      .severity-badge.high {
        background: ${tokens.color.dangerLight};
        color: ${tokens.color.dangerDark};
      }

      .severity-badge.medium {
        background: ${tokens.color.warningLight};
        color: ${tokens.color.warningDark};
      }

      .severity-badge.low {
        background: ${tokens.color.gray200};
        color: ${tokens.color.gray700};
      }

      .anomaly-description {
        font-size: ${tokens.fontSize.sm};
        color: ${tokens.color.gray700};
        line-height: 1.5;
        margin-bottom: ${tokens.spacing.sm};
      }

      .value-comparison {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: ${tokens.spacing.md};
        padding: ${tokens.spacing.sm};
        background: white;
        border-radius: ${tokens.radius.sm};
      }

      .value-item {
        font-size: ${tokens.fontSize.xs};
      }

      .value-label {
        color: ${tokens.color.gray600};
        margin-bottom: ${tokens.spacing.xs};
      }

      .value-text {
        font-weight: ${tokens.fontWeight.semibold};
        color: ${tokens.color.gray900};
      }

      .empty-state {
        text-align: center;
        padding: ${tokens.spacing.lg};
        color: ${tokens.color.successMain};
      }

      .empty-icon {
        font-size: ${tokens.fontSize.xxxl};
        margin-bottom: ${tokens.spacing.sm};
      }
    `
  ];

  @property({ type: Array }) data: TableAnomalyData[] = [];

  override render() {
    if (!this.data || this.data.length === 0) {
      return html`
        <div class="empty-state">
          <div class="empty-icon">✓</div>
          <div>No anomalies detected</div>
        </div>
        <slot></slot>
      `;
    }

    return html`
      <div class="header">
        <div class="title">
          <span class="warning-icon">⚠</span>
          <span>Detected Anomalies (${this.data.length})</span>
        </div>
        <div class="ai-badge">
          <span>✨</span>
          <span>AI</span>
        </div>
      </div>

      <div class="anomalies-list">
        ${this.data.map(anomaly => html`
          <div class="anomaly-item ${anomaly.severity}">
            <div class="anomaly-header">
              <div class="anomaly-location">
                Row ${anomaly.row} • ${anomaly.column}
              </div>
              <div class="severity-badge ${anomaly.severity}">
                ${anomaly.severity}
              </div>
            </div>

            <div class="anomaly-description">${anomaly.description}</div>

            <div class="value-comparison">
              <div class="value-item">
                <div class="value-label">Found Value</div>
                <div class="value-text">${anomaly.value}</div>
              </div>
              <div class="value-item">
                <div class="value-label">Expected Range</div>
                <div class="value-text">${anomaly.expected}</div>
              </div>
            </div>
          </div>
        `)}
      </div>

      <slot></slot>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ai-table-anomaly': AiTableAnomaly;
  }
}
