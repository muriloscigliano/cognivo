import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

@customElement('kpi-number')
export class KpiNumber extends LitElement {
  static override styles = [
    baseStyles,
    css`
      :host {
        display: inline-flex;
        align-items: baseline;
        gap: ${tokens.spacing.xs};
        font-size: ${tokens.fontSize['3xl']};
        font-weight: ${tokens.fontWeight.bold};
        color: ${tokens.color.gray900};
        line-height: 1;
      }

      .prefix {
        font-size: ${tokens.fontSize.lg};
        font-weight: ${tokens.fontWeight.medium};
        color: ${tokens.color.gray500};
      }

      .suffix {
        font-size: ${tokens.fontSize.lg};
        font-weight: ${tokens.fontWeight.medium};
        color: ${tokens.color.gray500};
      }

      :host([size='small']) {
        font-size: ${tokens.fontSize.xl};
      }

      :host([size='medium']) {
        font-size: ${tokens.fontSize['2xl']};
      }

      :host([size='large']) {
        font-size: ${tokens.fontSize['3xl']};
      }

      :host([variant='success']) {
        color: ${tokens.color.success};
      }

      :host([variant='warning']) {
        color: ${tokens.color.warning};
      }

      :host([variant='danger']) {
        color: ${tokens.color.danger};
      }
    `,
  ];

  @property({ type: String }) value = '';
  @property({ type: String }) override prefix = '';
  @property({ type: String }) suffix = '';
  @property({ type: String, reflect: true }) size: 'small' | 'medium' | 'large' = 'large';
  @property({ type: String, reflect: true }) variant: 'default' | 'success' | 'warning' | 'danger' = 'default';

  override render() {
    return html`
      ${this.prefix ? html`<span class="prefix">${this.prefix}</span>` : ''}
      <span class="value">${this.value}<slot></slot></span>
      ${this.suffix ? html`<span class="suffix">${this.suffix}</span>` : ''}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'kpi-number': KpiNumber;
  }
}
