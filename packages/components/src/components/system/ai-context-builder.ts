import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

export interface ContextItem {
  id: string;
  type: 'text' | 'file' | 'url' | 'data';
  content: string;
  metadata?: Record<string, any>;
  weight?: number;
}

export interface AIContextData {
  items: ContextItem[];
  systemPrompt?: string;
  temperature?: number;
  maxTokens?: number;
}

@customElement('ai-context-builder')
export class AiContextBuilder extends LitElement {
  static override styles = [
    baseStyles,
    css`
      :host {
        display: block;
        width: 100%;
      }

      .builder-container {
        display: flex;
        flex-direction: column;
        gap: ${tokens.spacing.md};
        padding: ${tokens.spacing.md};
        background: white;
        border: 1px solid ${tokens.color.gray100};
        border-radius: ${tokens.radius.md};
      }

      .builder-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-bottom: ${tokens.spacing.sm};
        border-bottom: 2px solid ${tokens.color.gray100};
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

      .actions {
        display: flex;
        gap: ${tokens.spacing.xs};
      }

      .action-btn {
        padding: 6px 12px;
        background: white;
        border: 1px solid ${tokens.color.gray100};
        border-radius: ${tokens.radius.sm};
        color: ${tokens.color.gray900};
        font-size: ${tokens.fontSize.sm};
        cursor: pointer;
        transition: all ${tokens.transition.fast};
      }

      .action-btn:hover {
        background: ${tokens.color.aiBackground};
        border-color: ${tokens.color.aiAccent};
      }

      .action-btn.primary {
        background: ${tokens.color.aiAccent};
        color: white;
        border-color: ${tokens.color.aiAccent};
      }

      .action-btn.primary:hover {
        background: ${tokens.color.aiGlow};
      }

      .context-items {
        display: flex;
        flex-direction: column;
        gap: ${tokens.spacing.sm};
        max-height: 400px;
        overflow-y: auto;
      }

      .context-item {
        padding: ${tokens.spacing.sm};
        background: ${tokens.color.gray50};
        border: 1px solid ${tokens.color.gray100};
        border-radius: ${tokens.radius.sm};
        display: flex;
        align-items: flex-start;
        gap: ${tokens.spacing.sm};
        transition: all ${tokens.transition.fast};
      }

      .context-item:hover {
        background: ${tokens.color.aiBackground};
        border-color: ${tokens.color.aiAccent};
      }

      .item-icon {
        font-size: 20px;
        flex-shrink: 0;
      }

      .item-content {
        flex: 1;
        min-width: 0;
      }

      .item-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 4px;
      }

      .item-type {
        font-size: ${tokens.fontSize.xs};
        font-weight: ${tokens.fontWeight.semibold};
        color: ${tokens.color.aiAccent};
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }

      .item-weight {
        display: flex;
        align-items: center;
        gap: 4px;
        font-size: ${tokens.fontSize.xs};
        color: ${tokens.color.gray500};
      }

      .weight-bar {
        width: 40px;
        height: 4px;
        background: ${tokens.color.gray100};
        border-radius: 2px;
        overflow: hidden;
      }

      .weight-fill {
        height: 100%;
        background: ${tokens.color.aiAccent};
        transition: width ${tokens.transition.default};
      }

      .item-text {
        font-size: ${tokens.fontSize.sm};
        color: ${tokens.color.gray500};
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }

      .item-actions {
        display: flex;
        gap: 4px;
        flex-shrink: 0;
      }

      .item-btn {
        padding: 4px 8px;
        background: white;
        border: 1px solid ${tokens.color.gray100};
        border-radius: ${tokens.radius.sm};
        color: ${tokens.color.gray500};
        font-size: ${tokens.fontSize.xs};
        cursor: pointer;
        transition: all ${tokens.transition.fast};
      }

      .item-btn:hover {
        border-color: ${tokens.color.danger};
        color: ${tokens.color.danger};
      }

      .add-item-form {
        padding: ${tokens.spacing.md};
        background: ${tokens.color.gray50};
        border-radius: ${tokens.radius.md};
        display: flex;
        flex-direction: column;
        gap: ${tokens.spacing.sm};
      }

      .form-group {
        display: flex;
        flex-direction: column;
        gap: 4px;
      }

      .form-label {
        font-size: ${tokens.fontSize.xs};
        font-weight: ${tokens.fontWeight.semibold};
        color: ${tokens.color.gray900};
      }

      .form-input,
      .form-textarea,
      .form-select {
        padding: ${tokens.spacing.xs} ${tokens.spacing.sm};
        border: 1px solid ${tokens.color.gray100};
        border-radius: ${tokens.radius.sm};
        font-size: ${tokens.fontSize.sm};
        font-family: inherit;
      }

      .form-textarea {
        min-height: 80px;
        resize: vertical;
      }

      .form-actions {
        display: flex;
        gap: ${tokens.spacing.xs};
        justify-content: flex-end;
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

      .stats {
        display: flex;
        gap: ${tokens.spacing.md};
        padding: ${tokens.spacing.sm};
        background: ${tokens.color.aiBackground};
        border-radius: ${tokens.radius.sm};
        font-size: ${tokens.fontSize.xs};
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
    `
  ];

  @property({ type: Array })
  items: ContextItem[] = [];

  @property({ type: String })
  systemPrompt = '';

  @property({ type: Number })
  temperature = 0.7;

  @property({ type: Number })
  maxTokens = 2000;

  @state()
  private showAddForm = false;

  @state()
  private newItem: Partial<ContextItem> = {
    type: 'text',
    content: '',
    weight: 1
  };

  private getItemIcon(type: string): string {
    switch (type) {
      case 'text': return '📝';
      case 'file': return '📄';
      case 'url': return '🔗';
      case 'data': return '📊';
      default: return '📌';
    }
  }

  private addItem() {
    if (!this.newItem.content) return;

    const item: ContextItem = {
      id: `ctx-${Date.now()}`,
      type: this.newItem.type as any || 'text',
      content: this.newItem.content,
      weight: this.newItem.weight || 1,
      metadata: this.newItem.metadata
    };

    this.items = [...this.items, item];
    this.newItem = { type: 'text', content: '', weight: 1 };
    this.showAddForm = false;

    this.dispatchEvent(new CustomEvent('item-added', {
      detail: { item },
      bubbles: true,
      composed: true
    }));
  }

  private removeItem(id: string) {
    this.items = this.items.filter(item => item.id !== id);
    this.dispatchEvent(new CustomEvent('item-removed', {
      detail: { id },
      bubbles: true,
      composed: true
    }));
  }

  private buildContext(): AIContextData {
    return {
      items: this.items,
      systemPrompt: this.systemPrompt,
      temperature: this.temperature,
      maxTokens: this.maxTokens
    };
  }

  private handleBuild() {
    const context = this.buildContext();
    this.dispatchEvent(new CustomEvent('context-built', {
      detail: { context },
      bubbles: true,
      composed: true
    }));
  }

  private getTotalTokens(): number {
    return this.items.reduce((sum, item) => sum + (item.content.length / 4), 0);
  }

  override render() {
    const totalTokens = Math.round(this.getTotalTokens());

    return html`
      <div class="builder-container">
        <div class="builder-header">
          <div class="title">
            <span class="ai-badge">AI</span>
            <span>Context Builder</span>
          </div>
          <div class="actions">
            <button class="action-btn" @click=${() => this.showAddForm = !this.showAddForm}>
              ${this.showAddForm ? 'Cancel' : '+ Add Item'}
            </button>
            <button class="action-btn primary" @click=${this.handleBuild} ?disabled=${this.items.length === 0}>
              Build Context
            </button>
          </div>
        </div>

        ${this.showAddForm ? html`
          <div class="add-item-form">
            <div class="form-group">
              <label class="form-label">Type</label>
              <select
                class="form-select"
                .value=${this.newItem.type || 'text'}
                @change=${(e: Event) => this.newItem = { ...this.newItem, type: (e.target as HTMLSelectElement).value as any }}
              >
                <option value="text">Text</option>
                <option value="file">File</option>
                <option value="url">URL</option>
                <option value="data">Data</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Content</label>
              <textarea
                class="form-textarea"
                placeholder="Enter context content..."
                .value=${this.newItem.content || ''}
                @input=${(e: Event) => this.newItem = { ...this.newItem, content: (e.target as HTMLTextAreaElement).value }}
              ></textarea>
            </div>
            <div class="form-group">
              <label class="form-label">Weight (0-1)</label>
              <input
                type="number"
                class="form-input"
                min="0"
                max="1"
                step="0.1"
                .value=${this.newItem.weight?.toString() || '1'}
                @input=${(e: Event) => this.newItem = { ...this.newItem, weight: parseFloat((e.target as HTMLInputElement).value) }}
              >
            </div>
            <div class="form-actions">
              <button class="action-btn" @click=${() => this.showAddForm = false}>Cancel</button>
              <button class="action-btn primary" @click=${this.addItem}>Add</button>
            </div>
          </div>
        ` : ''}

        <div class="stats">
          <div class="stat">
            <span>Items:</span>
            <span class="stat-value">${this.items.length}</span>
          </div>
          <div class="stat">
            <span>Est. Tokens:</span>
            <span class="stat-value">${totalTokens}</span>
          </div>
          <div class="stat">
            <span>Temperature:</span>
            <span class="stat-value">${this.temperature}</span>
          </div>
        </div>

        ${this.items.length === 0 ? html`
          <div class="empty-state">
            <div class="empty-icon">📋</div>
            <div>No context items added yet</div>
          </div>
        ` : html`
          <div class="context-items">
            ${this.items.map(item => html`
              <div class="context-item">
                <span class="item-icon">${this.getItemIcon(item.type)}</span>
                <div class="item-content">
                  <div class="item-header">
                    <span class="item-type">${item.type}</span>
                    ${item.weight !== undefined ? html`
                      <div class="item-weight">
                        <div class="weight-bar">
                          <div class="weight-fill" style="width: ${item.weight * 100}%"></div>
                        </div>
                        <span>${item.weight.toFixed(1)}</span>
                      </div>
                    ` : ''}
                  </div>
                  <div class="item-text">${item.content}</div>
                </div>
                <div class="item-actions">
                  <button class="item-btn" @click=${() => this.removeItem(item.id)}>Remove</button>
                </div>
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
    'ai-context-builder': AiContextBuilder;
  }
}
