import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

export interface AIIntent {
  id: string;
  name: string;
  description: string;
  patterns: string[];
  handler?: (params: any) => void | Promise<void>;
  confidence?: number;
  category?: string;
  enabled?: boolean;
}

export interface IntentMatch {
  intent: AIIntent;
  confidence: number;
  parameters?: Record<string, any>;
}

@customElement('ai-intent-registry')
export class AiIntentRegistry extends LitElement {
  static override styles = [
    baseStyles,
    css`
      :host {
        display: block;
        width: 100%;
      }

      .registry-container {
        display: flex;
        flex-direction: column;
        gap: ${tokens.spacing.md};
      }

      .registry-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: ${tokens.spacing.sm} ${tokens.spacing.md};
        background: ${tokens.color.gray50};
        border-radius: ${tokens.radius.md};
        border: 1px solid ${tokens.color.gray100};
      }

      .title {
        font-size: ${tokens.fontSize.lg};
        font-weight: ${tokens.fontWeight.semibold};
        color: ${tokens.color.gray900};
        display: flex;
        align-items: center;
        gap: ${tokens.spacing.xs};
      }

      .ai-badge {
        padding: 3px 8px;
        background: ${tokens.color.aiBackground};
        color: ${tokens.color.aiAccent};
        border-radius: ${tokens.radius.sm};
        font-size: 11px;
        font-weight: ${tokens.fontWeight.semibold};
      }

      .stats {
        display: flex;
        gap: ${tokens.spacing.md};
        font-size: ${tokens.fontSize.sm};
        color: ${tokens.color.gray500};
      }

      .stat {
        display: flex;
        align-items: center;
        gap: 4px;
      }

      .stat-value {
        font-weight: ${tokens.fontWeight.semibold};
        color: ${tokens.color.aiAccent};
      }

      .categories {
        display: flex;
        gap: ${tokens.spacing.xs};
        flex-wrap: wrap;
      }

      .category-chip {
        padding: 4px 12px;
        background: white;
        border: 1px solid ${tokens.color.gray100};
        border-radius: ${tokens.radius.full};
        font-size: ${tokens.fontSize.xs};
        cursor: pointer;
        transition: all ${tokens.transition.fast};
      }

      .category-chip:hover {
        border-color: ${tokens.color.aiAccent};
      }

      .category-chip.active {
        background: ${tokens.color.aiAccent};
        color: white;
        border-color: ${tokens.color.aiAccent};
      }

      .intents-list {
        display: flex;
        flex-direction: column;
        gap: ${tokens.spacing.sm};
      }

      .intent-card {
        padding: ${tokens.spacing.md};
        background: white;
        border: 1px solid ${tokens.color.gray100};
        border-radius: ${tokens.radius.md};
        transition: all ${tokens.transition.default};
      }

      .intent-card:hover {
        border-color: ${tokens.color.aiAccent};
        box-shadow: 0 2px 8px rgba(0, 100, 255, 0.1);
      }

      .intent-card.disabled {
        opacity: 0.5;
      }

      .intent-header {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        margin-bottom: ${tokens.spacing.xs};
      }

      .intent-info {
        flex: 1;
      }

      .intent-name {
        font-size: ${tokens.fontSize.base};
        font-weight: ${tokens.fontWeight.semibold};
        color: ${tokens.color.gray900};
        margin-bottom: 4px;
      }

      .intent-description {
        font-size: ${tokens.fontSize.sm};
        color: ${tokens.color.gray500};
        line-height: ${tokens.lineHeight.relaxed};
      }

      .intent-controls {
        display: flex;
        align-items: center;
        gap: ${tokens.spacing.xs};
      }

      .toggle-switch {
        position: relative;
        width: 40px;
        height: 20px;
        background: ${tokens.color.gray100};
        border-radius: ${tokens.radius.full};
        cursor: pointer;
        transition: background ${tokens.transition.default};
      }

      .toggle-switch.active {
        background: ${tokens.color.success};
      }

      .toggle-switch::after {
        content: '';
        position: absolute;
        top: 2px;
        left: 2px;
        width: 16px;
        height: 16px;
        background: white;
        border-radius: 50%;
        transition: transform ${tokens.transition.default};
      }

      .toggle-switch.active::after {
        transform: translateX(20px);
      }

      .confidence-indicator {
        display: flex;
        align-items: center;
        gap: 4px;
        font-size: ${tokens.fontSize.xs};
        color: ${tokens.color.gray500};
      }

      .confidence-bar {
        width: 60px;
        height: 4px;
        background: ${tokens.color.gray100};
        border-radius: 2px;
        overflow: hidden;
      }

      .confidence-fill {
        height: 100%;
        background: ${tokens.color.success};
        transition: width ${tokens.transition.default};
      }

      .patterns-section {
        margin-top: ${tokens.spacing.sm};
        padding: ${tokens.spacing.sm};
        background: ${tokens.color.gray50};
        border-radius: ${tokens.radius.sm};
      }

      .patterns-title {
        font-size: ${tokens.fontSize.xs};
        font-weight: ${tokens.fontWeight.semibold};
        color: ${tokens.color.gray900};
        margin-bottom: 4px;
      }

      .patterns-list {
        display: flex;
        flex-wrap: wrap;
        gap: ${tokens.spacing.xs};
      }

      .pattern-chip {
        padding: 2px 8px;
        background: white;
        border: 1px solid ${tokens.color.gray100};
        border-radius: ${tokens.radius.sm};
        font-size: ${tokens.fontSize.xs};
        font-family: ${tokens.fontFamily.mono};
        color: ${tokens.color.gray500};
      }

      .empty-state {
        padding: ${tokens.spacing.xl};
        text-align: center;
        color: ${tokens.color.gray500};
      }

      .empty-icon {
        font-size: 48px;
        margin-bottom: ${tokens.spacing.sm};
      }

      .test-input {
        padding: ${tokens.spacing.sm} ${tokens.spacing.md};
        background: white;
        border: 1px solid ${tokens.color.gray100};
        border-radius: ${tokens.radius.md};
        display: flex;
        gap: ${tokens.spacing.sm};
      }

      .test-field {
        flex: 1;
        padding: ${tokens.spacing.xs} ${tokens.spacing.sm};
        border: 1px solid ${tokens.color.gray100};
        border-radius: ${tokens.radius.sm};
        font-size: ${tokens.fontSize.sm};
      }

      .test-btn {
        padding: ${tokens.spacing.xs} ${tokens.spacing.md};
        background: ${tokens.color.aiAccent};
        color: white;
        border: none;
        border-radius: ${tokens.radius.sm};
        font-size: ${tokens.fontSize.sm};
        cursor: pointer;
        transition: all ${tokens.transition.fast};
      }

      .test-btn:hover {
        background: ${tokens.color.aiGlow};
      }
    `
  ];

  @property({ type: Array })
  intents: AIIntent[] = [];

  @state()
  private selectedCategory: string | null = null;

  @state()
  private testInput = '';

  private getCategories(): string[] {
    const categories = new Set<string>();
    this.intents.forEach(intent => {
      if (intent.category) categories.add(intent.category);
    });
    return Array.from(categories);
  }

  private getFilteredIntents(): AIIntent[] {
    if (!this.selectedCategory) return this.intents;
    return this.intents.filter(intent => intent.category === this.selectedCategory);
  }

  private getEnabledCount(): number {
    return this.intents.filter(intent => intent.enabled !== false).length;
  }

  registerIntent(intent: AIIntent) {
    if (this.intents.some(i => i.id === intent.id)) {
      console.warn(`Intent with id "${intent.id}" already registered`);
      return;
    }
    this.intents = [...this.intents, { ...intent, enabled: intent.enabled !== false }];
    this.dispatchEvent(new CustomEvent('intent-registered', {
      detail: { intent },
      bubbles: true,
      composed: true
    }));
  }

  unregisterIntent(id: string) {
    this.intents = this.intents.filter(intent => intent.id !== id);
    this.dispatchEvent(new CustomEvent('intent-unregistered', {
      detail: { id },
      bubbles: true,
      composed: true
    }));
  }

  toggleIntent(id: string) {
    this.intents = this.intents.map(intent =>
      intent.id === id ? { ...intent, enabled: !intent.enabled } : intent
    );
    this.dispatchEvent(new CustomEvent('intent-toggled', {
      detail: { id, enabled: this.intents.find(i => i.id === id)?.enabled },
      bubbles: true,
      composed: true
    }));
  }

  matchIntent(input: string): IntentMatch | null {
    const enabledIntents = this.intents.filter(intent => intent.enabled !== false);

    for (const intent of enabledIntents) {
      for (const pattern of intent.patterns) {
        const regex = new RegExp(pattern, 'i');
        if (regex.test(input)) {
          return {
            intent,
            confidence: intent.confidence || 0.8,
            parameters: {}
          };
        }
      }
    }

    return null;
  }

  private handleTest() {
    if (!this.testInput) return;

    const match = this.matchIntent(this.testInput);
    this.dispatchEvent(new CustomEvent('intent-matched', {
      detail: { input: this.testInput, match },
      bubbles: true,
      composed: true
    }));

    this.testInput = '';
  }

  override render() {
    const categories = this.getCategories();
    const filteredIntents = this.getFilteredIntents();
    const enabledCount = this.getEnabledCount();

    return html`
      <div class="registry-container">
        <div class="registry-header">
          <div class="title">
            <span class="ai-badge">AI</span>
            <span>Intent Registry</span>
          </div>
          <div class="stats">
            <div class="stat">
              <span>Total:</span>
              <span class="stat-value">${this.intents.length}</span>
            </div>
            <div class="stat">
              <span>Enabled:</span>
              <span class="stat-value">${enabledCount}</span>
            </div>
          </div>
        </div>

        <div class="test-input">
          <input
            type="text"
            class="test-field"
            placeholder="Test intent matching..."
            .value=${this.testInput}
            @input=${(e: Event) => this.testInput = (e.target as HTMLInputElement).value}
            @keypress=${(e: KeyboardEvent) => e.key === 'Enter' && this.handleTest()}
          >
          <button class="test-btn" @click=${this.handleTest}>Test</button>
        </div>

        ${categories.length > 0 ? html`
          <div class="categories">
            <div
              class="category-chip ${this.selectedCategory === null ? 'active' : ''}"
              @click=${() => this.selectedCategory = null}
            >All</div>
            ${categories.map(category => html`
              <div
                class="category-chip ${this.selectedCategory === category ? 'active' : ''}"
                @click=${() => this.selectedCategory = category}
              >${category}</div>
            `)}
          </div>
        ` : ''}

        ${filteredIntents.length === 0 ? html`
          <div class="empty-state">
            <div class="empty-icon">🎯</div>
            <div>No intents registered</div>
          </div>
        ` : html`
          <div class="intents-list">
            ${filteredIntents.map(intent => html`
              <div class="intent-card ${intent.enabled === false ? 'disabled' : ''}">
                <div class="intent-header">
                  <div class="intent-info">
                    <div class="intent-name">${intent.name}</div>
                    <div class="intent-description">${intent.description}</div>
                  </div>
                  <div class="intent-controls">
                    ${intent.confidence !== undefined ? html`
                      <div class="confidence-indicator">
                        <div class="confidence-bar">
                          <div class="confidence-fill" style="width: ${intent.confidence * 100}%"></div>
                        </div>
                        <span>${Math.round(intent.confidence * 100)}%</span>
                      </div>
                    ` : ''}
                    <div
                      class="toggle-switch ${intent.enabled !== false ? 'active' : ''}"
                      @click=${() => this.toggleIntent(intent.id)}
                    ></div>
                  </div>
                </div>
                ${intent.patterns.length > 0 ? html`
                  <div class="patterns-section">
                    <div class="patterns-title">Patterns (${intent.patterns.length})</div>
                    <div class="patterns-list">
                      ${intent.patterns.map(pattern => html`
                        <div class="pattern-chip">${pattern}</div>
                      `)}
                    </div>
                  </div>
                ` : ''}
              </div>
            `)}
          </div>
        `}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ai-intent-registry': AiIntentRegistry;
  }
}
