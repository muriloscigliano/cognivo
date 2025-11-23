import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

@customElement('category-card')
export class CategoryCard extends LitElement {
  static override styles = [
    baseStyles,
    css`
      :host {
        display: block;
        background: ${tokens.color.grayWhite};
        border: 1px solid ${tokens.color.gray200};
        border-radius: ${tokens.radius.lg};
        overflow: hidden;
        transition: all ${tokens.transition.default};
      }

      :host(:hover) {
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        transform: translateY(-2px);
      }

      .card-header {
        padding: ${tokens.spacing.lg};
        background: linear-gradient(135deg, ${tokens.color.primaryMain}, ${tokens.color.primaryDark});
        color: ${tokens.color.grayWhite};
      }

      .icon {
        width: 48px;
        height: 48px;
        background: rgba(255, 255, 255, 0.2);
        border-radius: ${tokens.radius.md};
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: ${tokens.fontSize.xl};
        margin-bottom: ${tokens.spacing.md};
      }

      .title {
        font-size: ${tokens.fontSize.lg};
        font-weight: ${tokens.fontWeight.semibold};
        margin-bottom: ${tokens.spacing.xs};
      }

      .count {
        font-size: ${tokens.fontSize.xl};
        font-weight: ${tokens.fontWeight.bold};
        opacity: 0.9;
      }

      .card-body {
        padding: ${tokens.spacing.lg};
      }

      .description {
        color: ${tokens.color.gray600};
        font-size: ${tokens.fontSize.sm};
        line-height: ${tokens.lineHeight.relaxed};
        margin-bottom: ${tokens.spacing.md};
      }

      .stats {
        display: flex;
        gap: ${tokens.spacing.lg};
        padding-top: ${tokens.spacing.md};
        border-top: 1px solid ${tokens.color.gray200};
      }

      .stat {
        flex: 1;
      }

      .stat-label {
        font-size: ${tokens.fontSize.xs};
        color: ${tokens.color.gray500};
        margin-bottom: ${tokens.spacing.xs};
      }

      .stat-value {
        font-size: ${tokens.fontSize.md};
        font-weight: ${tokens.fontWeight.semibold};
        color: ${tokens.color.gray900};
      }
    `,
  ];

  @property({ type: String }) title = '';
  @property({ type: Number }) count = 0;
  @property({ type: String }) description = '';
  @property({ type: String }) icon = '📁';
  @property({ type: String }) color = tokens.color.primaryMain;

  override render() {
    return html`
      <div class="card-header" style="background: linear-gradient(135deg, ${this.color}, ${this.color}dd)">
        <div class="icon">${this.icon}</div>
        <div class="title">${this.title}</div>
        <div class="count">${this.count}</div>
      </div>
      <div class="card-body">
        ${this.description ? html`<div class="description">${this.description}</div>` : ''}
        <slot></slot>
        <div class="stats">
          <slot name="stats"></slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'category-card': CategoryCard;
  }
}
