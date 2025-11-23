import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

export interface ClusterData {
  name: string;
  count: number;
  items: string[];
  color?: string;
}

@customElement('ai-table-cluster')
export class AiTableCluster extends LitElement {
  static override styles = [
    baseStyles,
    css`
      :host {
        display: block;
        padding: ${tokens.spacing.lg};
        background: ${tokens.color.grayWhite};
        border: 1px solid ${tokens.color.gray200};
        border-radius: ${tokens.radius.lg};
      }

      .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: ${tokens.spacing.md};
      }

      .title {
        font-size: ${tokens.fontSize.lg};
        font-weight: ${tokens.fontWeight.semibold};
        color: ${tokens.color.gray900};
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

      .clusters-container {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: ${tokens.spacing.md};
      }

      .cluster-card {
        padding: ${tokens.spacing.md};
        background: ${tokens.color.gray50};
        border-radius: ${tokens.radius.md};
        border-left: 4px solid ${tokens.color.primaryMain};
        transition: all ${tokens.transition.default};
      }

      .cluster-card:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      }

      .cluster-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: ${tokens.spacing.sm};
      }

      .cluster-name {
        font-size: ${tokens.fontSize.md};
        font-weight: ${tokens.fontWeight.semibold};
        color: ${tokens.color.gray900};
      }

      .cluster-count {
        padding: ${tokens.spacing.xs} ${tokens.spacing.sm};
        background: ${tokens.color.primaryMain};
        color: white;
        border-radius: ${tokens.radius.full};
        font-size: ${tokens.fontSize.xs};
        font-weight: ${tokens.fontWeight.bold};
      }

      .cluster-items {
        display: flex;
        flex-direction: column;
        gap: ${tokens.spacing.xs};
      }

      .cluster-item {
        font-size: ${tokens.fontSize.sm};
        color: ${tokens.color.gray700};
        padding-left: ${tokens.spacing.sm};
      }

      .cluster-item:before {
        content: '•';
        margin-right: ${tokens.spacing.xs};
        color: ${tokens.color.primaryMain};
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
        font-size: ${tokens.fontSize.xxxl};
        margin-bottom: ${tokens.spacing.sm};
      }
    `
  ];

  @property({ type: Array }) data: ClusterData[] = [];
  @property({ type: String }) title = 'Table Clusters';

  override render() {
    if (!this.data || this.data.length === 0) {
      return html`
        <div class="empty-state">
          <div class="empty-icon">📊</div>
          <div class="empty-text">No clusters detected</div>
        </div>
        <slot></slot>
      `;
    }

    return html`
      <div class="header">
        <div class="title">${this.title}</div>
        <div class="ai-badge">
          <span>✨</span>
          <span>AI Clustered</span>
        </div>
      </div>

      <div class="clusters-container">
        ${this.data.map(cluster => html`
          <div
            class="cluster-card"
            style="${cluster.color ? `border-left-color: ${cluster.color}` : ''}"
          >
            <div class="cluster-header">
              <div class="cluster-name">${cluster.name}</div>
              <div class="cluster-count">${cluster.count}</div>
            </div>
            <div class="cluster-items">
              ${cluster.items.slice(0, 5).map(item => html`
                <div class="cluster-item">${item}</div>
              `)}
              ${cluster.items.length > 5 ? html`
                <div class="cluster-item">+${cluster.items.length - 5} more...</div>
              ` : ''}
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
    'ai-table-cluster': AiTableCluster;
  }
}
