import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

@customElement('ai-table-toolbar')
export class AiTableToolbar extends LitElement {
  static override styles = [
    baseStyles,
    css`
      :host {
        display: block;
        padding: ${tokens.spacing.md};
        background: ${tokens.color.grayWhite};
        border: 1px solid ${tokens.color.gray100};
        border-radius: ${tokens.radius.md};
      }

      .toolbar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: ${tokens.spacing.md};
      }

      .toolbar-group {
        display: flex;
        align-items: center;
        gap: ${tokens.spacing.sm};
      }

      .toolbar-button {
        display: flex;
        align-items: center;
        gap: ${tokens.spacing.xs};
        padding: ${tokens.spacing.sm} ${tokens.spacing.md};
        background: ${tokens.color.gray100};
        border: 1px solid ${tokens.color.gray100};
        border-radius: ${tokens.radius.md};
        font-size: ${tokens.fontSize.sm};
        color: ${tokens.color.gray900};
        cursor: pointer;
        transition: all ${tokens.transition.default};
      }

      .toolbar-button:hover {
        background: ${tokens.color.gray100};
        border-color: ${tokens.color.gray100};
      }

      .toolbar-button.ai-button {
        background: linear-gradient(135deg, ${tokens.color.primaryMain} 0%, ${tokens.color.primaryDark} 100%);
        color: white;
        border-color: ${tokens.color.primaryMain};
      }

      .toolbar-button.ai-button:hover {
        transform: translateY(-1px);
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }

      .button-icon {
        font-size: ${tokens.fontSize.md};
      }

      .ai-badge {
        display: inline-flex;
        align-items: center;
        gap: ${tokens.spacing.xs};
        padding: ${tokens.spacing.xs} ${tokens.spacing.sm};
        background: ${tokens.color.primaryLight};
        color: ${tokens.color.primaryDark};
        border-radius: ${tokens.radius.full};
        font-size: ${tokens.fontSize.xs};
        font-weight: ${tokens.fontWeight.medium};
      }
    `
  ];

  @property({ type: Boolean, attribute: 'show-ai-features' }) showAiFeatures = true;

  override render() {
    return html`
      <div class="toolbar">
        <div class="toolbar-group">
          <button class="toolbar-button">
            <span class="button-icon">🔍</span>
            <span>Search</span>
          </button>
          <button class="toolbar-button">
            <span class="button-icon">🔽</span>
            <span>Filter</span>
          </button>
          <button class="toolbar-button">
            <span class="button-icon">↕</span>
            <span>Sort</span>
          </button>
        </div>

        ${this.showAiFeatures ? html`
          <div class="toolbar-group">
            <div class="ai-badge">
              <span>✨</span>
              <span>AI Tools</span>
            </div>
            <button class="toolbar-button ai-button">
              <span class="button-icon">🏷️</span>
              <span>Auto-Tag</span>
            </button>
            <button class="toolbar-button ai-button">
              <span class="button-icon">📊</span>
              <span>Cluster</span>
            </button>
            <button class="toolbar-button ai-button">
              <span class="button-icon">⚠</span>
              <span>Find Anomalies</span>
            </button>
          </div>
        ` : ''}
      </div>

      <slot></slot>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ai-table-toolbar': AiTableToolbar;
  }
}
