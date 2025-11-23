import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

export interface AIMetrics {
  modelName?: string;
  tokensUsed?: number;
  processingTime?: number;
  confidence?: number;
  temperature?: number;
  maxTokens?: number;
}

export interface AILogEntry {
  timestamp: string;
  level: 'info' | 'warning' | 'error' | 'debug';
  message: string;
  details?: any;
}

@customElement('ai-debug-panel')
export class AiDebugPanel extends LitElement {
  static override styles = [
    baseStyles,
    css`
      :host {
        display: block;
        width: 100%;
      }

      .debug-panel {
        background: ${tokens.color.gray900};
        color: ${tokens.color.gray50};
        border-radius: ${tokens.radius.md};
        overflow: hidden;
        font-family: ${tokens.fontFamily.mono};
      }

      .panel-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: ${tokens.spacing.sm} ${tokens.spacing.md};
        background: rgba(0, 0, 0, 0.3);
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      }

      .panel-title {
        display: flex;
        align-items: center;
        gap: ${tokens.spacing.xs};
        font-size: ${tokens.fontSize.sm};
        font-weight: ${tokens.fontWeight.semibold};
      }

      .ai-indicator {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: ${tokens.color.success};
        animation: pulse-indicator 2s ease-in-out infinite;
      }

      @keyframes pulse-indicator {
        0%, 100% {
          opacity: 1;
        }
        50% {
          opacity: 0.4;
        }
      }

      .panel-controls {
        display: flex;
        gap: ${tokens.spacing.xs};
      }

      .control-btn {
        padding: 4px 8px;
        background: rgba(255, 255, 255, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: ${tokens.radius.sm};
        color: white;
        font-size: ${tokens.fontSize.xs};
        cursor: pointer;
        transition: all ${tokens.transition.fast};
      }

      .control-btn:hover {
        background: rgba(255, 255, 255, 0.2);
      }

      .control-btn.active {
        background: ${tokens.color.aiAccent};
        border-color: ${tokens.color.aiAccent};
      }

      .panel-content {
        padding: ${tokens.spacing.md};
        max-height: 500px;
        overflow-y: auto;
      }

      .tabs {
        display: flex;
        gap: ${tokens.spacing.xs};
        margin-bottom: ${tokens.spacing.md};
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      }

      .tab {
        padding: ${tokens.spacing.xs} ${tokens.spacing.sm};
        background: transparent;
        border: none;
        color: ${tokens.color.gray500};
        font-size: ${tokens.fontSize.sm};
        cursor: pointer;
        border-bottom: 2px solid transparent;
        transition: all ${tokens.transition.fast};
      }

      .tab:hover {
        color: ${tokens.color.gray50};
      }

      .tab.active {
        color: ${tokens.color.aiAccent};
        border-bottom-color: ${tokens.color.aiAccent};
      }

      .metrics-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: ${tokens.spacing.md};
      }

      .metric-card {
        padding: ${tokens.spacing.sm};
        background: rgba(255, 255, 255, 0.05);
        border-radius: ${tokens.radius.sm};
        border: 1px solid rgba(255, 255, 255, 0.1);
      }

      .metric-label {
        font-size: ${tokens.fontSize.xs};
        color: ${tokens.color.gray500};
        margin-bottom: 4px;
      }

      .metric-value {
        font-size: ${tokens.fontSize.lg};
        font-weight: ${tokens.fontWeight.bold};
        color: ${tokens.color.aiAccent};
      }

      .logs-container {
        display: flex;
        flex-direction: column;
        gap: ${tokens.spacing.xs};
        max-height: 400px;
        overflow-y: auto;
      }

      .log-entry {
        padding: ${tokens.spacing.xs} ${tokens.spacing.sm};
        background: rgba(255, 255, 255, 0.03);
        border-left: 3px solid;
        border-radius: ${tokens.radius.sm};
        font-size: ${tokens.fontSize.xs};
        line-height: ${tokens.lineHeight.relaxed};
      }

      .log-entry.info {
        border-left-color: ${tokens.color.info};
      }

      .log-entry.warning {
        border-left-color: ${tokens.color.warning};
      }

      .log-entry.error {
        border-left-color: ${tokens.color.danger};
      }

      .log-entry.debug {
        border-left-color: ${tokens.color.gray500};
      }

      .log-timestamp {
        color: ${tokens.color.gray500};
        margin-right: ${tokens.spacing.xs};
      }

      .log-level {
        font-weight: ${tokens.fontWeight.semibold};
        margin-right: ${tokens.spacing.xs};
        text-transform: uppercase;
      }

      .log-message {
        color: ${tokens.color.gray50};
      }

      .log-details {
        margin-top: ${tokens.spacing.xs};
        padding: ${tokens.spacing.xs};
        background: rgba(0, 0, 0, 0.3);
        border-radius: ${tokens.radius.sm};
        font-size: 11px;
        color: ${tokens.color.gray500};
        overflow-x: auto;
      }

      .json-viewer {
        padding: ${tokens.spacing.sm};
        background: rgba(0, 0, 0, 0.3);
        border-radius: ${tokens.radius.sm};
        overflow-x: auto;
      }

      .json-key {
        color: ${tokens.color.aiAccent};
      }

      .json-string {
        color: ${tokens.color.success};
      }

      .json-number {
        color: ${tokens.color.warning};
      }

      :host([collapsed]) .panel-content {
        display: none;
      }
    `
  ];

  @property({ type: Object })
  metrics: AIMetrics = {};

  @property({ type: Array })
  logs: AILogEntry[] = [];

  @property({ type: Boolean, reflect: true })
  collapsed = false;

  @state()
  private activeTab: 'metrics' | 'logs' | 'raw' = 'metrics';

  private toggleCollapse() {
    this.collapsed = !this.collapsed;
  }

  private clearLogs() {
    this.logs = [];
    this.dispatchEvent(new CustomEvent('logs-cleared', {
      bubbles: true,
      composed: true
    }));
  }

  private formatJSON(obj: any): string {
    return JSON.stringify(obj, null, 2);
  }

  override render() {
    return html`
      <div class="debug-panel">
        <div class="panel-header">
          <div class="panel-title">
            <div class="ai-indicator"></div>
            <span>AI Debug Panel</span>
          </div>
          <div class="panel-controls">
            <button class="control-btn" @click=${this.clearLogs}>Clear Logs</button>
            <button class="control-btn ${this.collapsed ? '' : 'active'}" @click=${this.toggleCollapse}>
              ${this.collapsed ? '▼' : '▲'}
            </button>
          </div>
        </div>

        <div class="panel-content">
          <div class="tabs">
            <button
              class="tab ${this.activeTab === 'metrics' ? 'active' : ''}"
              @click=${() => this.activeTab = 'metrics'}
            >Metrics</button>
            <button
              class="tab ${this.activeTab === 'logs' ? 'active' : ''}"
              @click=${() => this.activeTab = 'logs'}
            >Logs (${this.logs.length})</button>
            <button
              class="tab ${this.activeTab === 'raw' ? 'active' : ''}"
              @click=${() => this.activeTab = 'raw'}
            >Raw Data</button>
          </div>

          ${this.activeTab === 'metrics' ? html`
            <div class="metrics-grid">
              ${this.metrics.modelName ? html`
                <div class="metric-card">
                  <div class="metric-label">Model</div>
                  <div class="metric-value">${this.metrics.modelName}</div>
                </div>
              ` : ''}
              ${this.metrics.tokensUsed !== undefined ? html`
                <div class="metric-card">
                  <div class="metric-label">Tokens Used</div>
                  <div class="metric-value">${this.metrics.tokensUsed}</div>
                </div>
              ` : ''}
              ${this.metrics.processingTime !== undefined ? html`
                <div class="metric-card">
                  <div class="metric-label">Processing Time</div>
                  <div class="metric-value">${this.metrics.processingTime}ms</div>
                </div>
              ` : ''}
              ${this.metrics.confidence !== undefined ? html`
                <div class="metric-card">
                  <div class="metric-label">Confidence</div>
                  <div class="metric-value">${Math.round(this.metrics.confidence * 100)}%</div>
                </div>
              ` : ''}
              ${this.metrics.temperature !== undefined ? html`
                <div class="metric-card">
                  <div class="metric-label">Temperature</div>
                  <div class="metric-value">${this.metrics.temperature}</div>
                </div>
              ` : ''}
              ${this.metrics.maxTokens !== undefined ? html`
                <div class="metric-card">
                  <div class="metric-label">Max Tokens</div>
                  <div class="metric-value">${this.metrics.maxTokens}</div>
                </div>
              ` : ''}
            </div>
          ` : ''}

          ${this.activeTab === 'logs' ? html`
            <div class="logs-container">
              ${this.logs.length === 0 ? html`
                <div style="text-align: center; padding: ${tokens.spacing.xl}; color: ${tokens.color.gray500};">
                  No logs available
                </div>
              ` : this.logs.map(log => html`
                <div class="log-entry ${log.level}">
                  <span class="log-timestamp">${log.timestamp}</span>
                  <span class="log-level">[${log.level}]</span>
                  <span class="log-message">${log.message}</span>
                  ${log.details ? html`
                    <div class="log-details">
                      <pre>${this.formatJSON(log.details)}</pre>
                    </div>
                  ` : ''}
                </div>
              `)}
            </div>
          ` : ''}

          ${this.activeTab === 'raw' ? html`
            <div class="json-viewer">
              <pre>${this.formatJSON({ metrics: this.metrics, logs: this.logs })}</pre>
            </div>
          ` : ''}
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ai-debug-panel': AiDebugPanel;
  }
}
