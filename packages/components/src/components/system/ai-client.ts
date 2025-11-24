import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

export interface AIClientConfig {
  apiKey?: string;
  endpoint?: string;
  model?: string;
  temperature?: number;
  maxTokens?: number;
}

export interface AIRequest {
  prompt: string;
  context?: any;
  options?: Partial<AIClientConfig>;
}

export interface AIResponse {
  content: string;
  confidence?: number;
  tokensUsed?: number;
  processingTime?: number;
  sources?: any[];
}

@customElement('ai-client')
export class AiClient extends LitElement {
  static override styles = [
    baseStyles,
    css`
      :host {
        display: block;
      }

      .client-container {
        display: flex;
        flex-direction: column;
        gap: ${tokens.spacing.md};
      }

      .status-bar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: ${tokens.spacing.sm} ${tokens.spacing.md};
        background: ${tokens.color.gray50};
        border-radius: ${tokens.radius.md};
        border: 1px solid ${tokens.color.gray100};
      }

      .status-section {
        display: flex;
        align-items: center;
        gap: ${tokens.spacing.sm};
      }

      .status-indicator {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        transition: all ${tokens.transition.default};
      }

      .status-indicator.connected {
        background: ${tokens.color.success};
        box-shadow: 0 0 8px ${tokens.color.success};
      }

      .status-indicator.disconnected {
        background: ${tokens.color.gray500};
      }

      .status-indicator.error {
        background: ${tokens.color.danger};
        box-shadow: 0 0 8px ${tokens.color.danger};
      }

      .status-indicator.processing {
        background: ${tokens.color.aiAccent};
        animation: pulse-processing 1s ease-in-out infinite;
      }

      @keyframes pulse-processing {
        0%, 100% {
          opacity: 1;
          transform: scale(1);
        }
        50% {
          opacity: 0.6;
          transform: scale(1.2);
        }
      }

      .status-text {
        font-size: ${tokens.fontSize.sm};
        font-weight: ${tokens.fontWeight.medium};
        color: ${tokens.color.gray900};
      }

      .model-info {
        font-size: ${tokens.fontSize.xs};
        color: ${tokens.color.gray500};
      }

      .actions {
        display: flex;
        gap: ${tokens.spacing.xs};
      }

      .action-btn {
        padding: 4px 12px;
        background: white;
        border: 1px solid ${tokens.color.gray100};
        border-radius: ${tokens.radius.sm};
        color: ${tokens.color.gray900};
        font-size: ${tokens.fontSize.xs};
        cursor: pointer;
        transition: all ${tokens.transition.fast};
      }

      .action-btn:hover {
        background: ${tokens.color.gray50};
        border-color: ${tokens.color.aiAccent};
      }

      .action-btn:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }

      .request-queue {
        padding: ${tokens.spacing.sm};
        background: white;
        border: 1px solid ${tokens.color.gray100};
        border-radius: ${tokens.radius.md};
      }

      .queue-header {
        font-size: ${tokens.fontSize.sm};
        font-weight: ${tokens.fontWeight.semibold};
        color: ${tokens.color.gray900};
        margin-bottom: ${tokens.spacing.xs};
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      .queue-count {
        font-size: ${tokens.fontSize.xs};
        color: ${tokens.color.gray500};
        background: ${tokens.color.gray100};
        padding: 2px 6px;
        border-radius: ${tokens.radius.sm};
      }

      .queue-items {
        display: flex;
        flex-direction: column;
        gap: ${tokens.spacing.xs};
      }

      .queue-item {
        padding: ${tokens.spacing.xs} ${tokens.spacing.sm};
        background: ${tokens.color.gray50};
        border-radius: ${tokens.radius.sm};
        font-size: ${tokens.fontSize.xs};
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      .queue-item-text {
        color: ${tokens.color.gray500};
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        flex: 1;
      }

      .queue-item-status {
        font-weight: ${tokens.fontWeight.medium};
        color: ${tokens.color.aiAccent};
      }

      .error-message {
        padding: ${tokens.spacing.sm};
        background: rgba(239, 68, 68, 0.1);
        border: 1px solid ${tokens.color.danger};
        border-radius: ${tokens.radius.md};
        color: ${tokens.color.danger};
        font-size: ${tokens.fontSize.sm};
      }
    `
  ];

  @property({ type: Object })
  config: AIClientConfig = {};

  @property({ type: String })
  status: 'connected' | 'disconnected' | 'error' | 'processing' = 'disconnected';

  @property({ type: Array })
  requestQueue: AIRequest[] = [];

  @property({ type: String })
  errorMessage = '';

  @state()
  private lastResponse?: AIResponse;

  async sendRequest(request: AIRequest): Promise<AIResponse> {
    this.status = 'processing';
    this.requestQueue = [...this.requestQueue, request];
    this.dispatchEvent(new CustomEvent('request-start', {
      detail: { request },
      bubbles: true,
      composed: true
    }));

    // Simulate AI request (in real implementation, this would call an actual API)
    return new Promise((resolve) => {
      setTimeout(() => {
        const response: AIResponse = {
          content: 'AI response placeholder',
          confidence: 0.85,
          tokensUsed: 150,
          processingTime: 1200
        };

        this.lastResponse = response;
        this.status = 'connected';
        this.requestQueue = this.requestQueue.slice(1);

        this.dispatchEvent(new CustomEvent('request-complete', {
          detail: { request, response },
          bubbles: true,
          composed: true
        }));

        resolve(response);
      }, 1000);
    });
  }

  connect() {
    this.status = 'connected';
    this.errorMessage = '';
    this.dispatchEvent(new CustomEvent('client-connected', {
      bubbles: true,
      composed: true
    }));
  }

  disconnect() {
    this.status = 'disconnected';
    this.dispatchEvent(new CustomEvent('client-disconnected', {
      bubbles: true,
      composed: true
    }));
  }

  clearQueue() {
    this.requestQueue = [];
    this.dispatchEvent(new CustomEvent('queue-cleared', {
      bubbles: true,
      composed: true
    }));
  }

  override render() {
    return html`
      <div class="client-container">
        <div class="status-bar">
          <div class="status-section">
            <div class="status-indicator ${this.status}"></div>
            <div>
              <div class="status-text">
                ${this.status === 'connected' ? 'Connected' :
                  this.status === 'processing' ? 'Processing...' :
                  this.status === 'error' ? 'Error' : 'Disconnected'}
              </div>
              ${this.config.model ? html`
                <div class="model-info">Model: ${this.config.model}</div>
              ` : ''}
            </div>
          </div>
          <div class="actions">
            <button
              class="action-btn"
              @click=${this.connect}
              ?disabled=${this.status === 'connected' || this.status === 'processing'}
            >Connect</button>
            <button
              class="action-btn"
              @click=${this.disconnect}
              ?disabled=${this.status === 'disconnected'}
            >Disconnect</button>
          </div>
        </div>

        ${this.errorMessage ? html`
          <div class="error-message">${this.errorMessage}</div>
        ` : ''}

        ${this.requestQueue.length > 0 ? html`
          <div class="request-queue">
            <div class="queue-header">
              <span>Request Queue</span>
              <span class="queue-count">${this.requestQueue.length}</span>
            </div>
            <div class="queue-items">
              ${this.requestQueue.map((req, index) => html`
                <div class="queue-item">
                  <span class="queue-item-text">${req.prompt.substring(0, 50)}...</span>
                  <span class="queue-item-status">${index === 0 ? 'Processing' : 'Queued'}</span>
                </div>
              `)}
            </div>
          </div>
        ` : ''}

        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ai-client': AiClient;
  }
}
