import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

@customElement('stat-text')
export class StatText extends LitElement {
  static override styles = [
    baseStyles,
    css`
      :host {
        display: inline-flex;
        flex-direction: column;
        gap: ${tokens.spacing.xs};
      }

      .label {
        font-size: ${tokens.fontSize.sm};
        font-weight: ${tokens.fontWeight.medium};
        color: ${tokens.color.gray500};
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }

      .value {
        font-size: ${tokens.fontSize.xl};
        font-weight: ${tokens.fontWeight.semibold};
        color: ${tokens.color.gray900};
      }

      .description {
        font-size: ${tokens.fontSize.sm};
        color: ${tokens.color.gray500};
        line-height: ${tokens.lineHeight.relaxed};
      }

      :host([inline]) {
        flex-direction: row;
        align-items: baseline;
        gap: ${tokens.spacing.sm};
      }

      :host([inline]) .label::after {
        content: ':';
      }
    `,
  ];

  @property({ type: String }) label = '';
  @property({ type: String }) value = '';
  @property({ type: String }) description = '';
  @property({ type: Boolean }) inline = false;

  override render() {
    return html`
      ${this.label ? html`<div class="label">${this.label}</div>` : ''}
      <div class="value">${this.value}<slot></slot></div>
      ${this.description ? html`<div class="description">${this.description}</div>` : ''}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'stat-text': StatText;
  }
}
