import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { provide, createContext } from '@lit/context';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

export interface AIContext {
  isEnabled: boolean;
  modelName?: string;
  apiKey?: string;
  features?: string[];
  settings?: Record<string, any>;
}

// Create a context for AI provider
export const aiContext = createContext<AIContext>(Symbol('ai-context'));

@customElement('ai-provider')
export class AiProvider extends LitElement {
  static override styles = [
    baseStyles,
    css`
      :host {
        display: block;
      }

      .provider-container {
        position: relative;
      }

      .provider-overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 100, 255, 0.05);
        border: 2px dashed ${tokens.color.aiAccent};
        border-radius: ${tokens.radius.md};
        display: flex;
        align-items: center;
        justify-content: center;
        pointer-events: none;
        opacity: 0;
        transition: opacity ${tokens.transition.default};
      }

      :host([debug]) .provider-overlay {
        opacity: 1;
      }

      .provider-badge {
        padding: ${tokens.spacing.xs} ${tokens.spacing.sm};
        background: ${tokens.color.aiAccent};
        color: white;
        border-radius: ${tokens.radius.sm};
        font-size: ${tokens.fontSize.xs};
        font-weight: ${tokens.fontWeight.semibold};
        display: flex;
        align-items: center;
        gap: ${tokens.spacing.xs};
      }

      .ai-icon {
        animation: rotate 3s linear infinite;
      }

      @keyframes rotate {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }

      .context-info {
        position: fixed;
        bottom: ${tokens.spacing.md};
        right: ${tokens.spacing.md};
        padding: ${tokens.spacing.sm} ${tokens.spacing.md};
        background: white;
        border: 1px solid ${tokens.color.aiAccent};
        border-radius: ${tokens.radius.md};
        box-shadow: 0 4px 12px rgba(0, 100, 255, 0.2);
        font-size: ${tokens.fontSize.xs};
        z-index: 9999;
        max-width: 300px;
      }

      .context-header {
        font-weight: ${tokens.fontWeight.semibold};
        color: ${tokens.color.aiAccent};
        margin-bottom: ${tokens.spacing.xs};
        display: flex;
        align-items: center;
        gap: ${tokens.spacing.xs};
      }

      .context-details {
        display: flex;
        flex-direction: column;
        gap: 4px;
        color: ${tokens.color.gray500};
      }

      .context-row {
        display: flex;
        justify-content: space-between;
        gap: ${tokens.spacing.sm};
      }

      .context-label {
        font-weight: ${tokens.fontWeight.medium};
      }

      .context-value {
        color: ${tokens.color.gray900};
      }

      .features-list {
        margin-top: ${tokens.spacing.xs};
        padding-left: ${tokens.spacing.sm};
        list-style: none;
      }

      .features-list li::before {
        content: '✓ ';
        color: ${tokens.color.success};
        margin-right: 4px;
      }
    `
  ];

  @provide({ context: aiContext })
  @property({ type: Object })
  context: AIContext = {
    isEnabled: true,
    features: []
  };

  @property({ type: Boolean, reflect: true })
  debug = false;

  @property({ type: Boolean })
  showInfo = false;

  @state()
  private connectedComponents = 0;

  override connectedCallback() {
    super.connectedCallback();
    this.dispatchEvent(new CustomEvent('ai-provider-ready', {
      detail: { context: this.context },
      bubbles: true,
      composed: true
    }));
  }

  updateContext(updates: Partial<AIContext>) {
    this.context = { ...this.context, ...updates };
    this.dispatchEvent(new CustomEvent('ai-context-updated', {
      detail: { context: this.context },
      bubbles: true,
      composed: true
    }));
  }

  enableFeature(feature: string) {
    const features = this.context.features || [];
    if (!features.includes(feature)) {
      this.updateContext({
        features: [...features, feature]
      });
    }
  }

  disableFeature(feature: string) {
    const features = this.context.features || [];
    this.updateContext({
      features: features.filter(f => f !== feature)
    });
  }

  isFeatureEnabled(feature: string): boolean {
    return this.context.features?.includes(feature) || false;
  }

  override render() {
    return html`
      <div class="provider-container">
        ${this.debug ? html`
          <div class="provider-overlay">
            <div class="provider-badge">
              <span class="ai-icon">🤖</span>
              <span>AI Provider Active</span>
            </div>
          </div>
        ` : ''}

        <slot></slot>

        ${this.showInfo ? html`
          <div class="context-info">
            <div class="context-header">
              <span>🤖</span>
              <span>AI Context</span>
            </div>
            <div class="context-details">
              <div class="context-row">
                <span class="context-label">Status:</span>
                <span class="context-value">${this.context.isEnabled ? 'Enabled' : 'Disabled'}</span>
              </div>
              ${this.context.modelName ? html`
                <div class="context-row">
                  <span class="context-label">Model:</span>
                  <span class="context-value">${this.context.modelName}</span>
                </div>
              ` : ''}
              ${this.context.features && this.context.features.length > 0 ? html`
                <div>
                  <span class="context-label">Features:</span>
                  <ul class="features-list">
                    ${this.context.features.map(feature => html`<li>${feature}</li>`)}
                  </ul>
                </div>
              ` : ''}
            </div>
          </div>
        ` : ''}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ai-provider': AiProvider;
  }
}
