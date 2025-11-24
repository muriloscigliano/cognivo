import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

/**
 * Graph Label Component
 *
 * Text label for graph elements
 *
 * @element graph-label
 */
@customElement('graph-label')
export class GraphLabel extends LitElement {
  static override styles = [
    baseStyles,
    css`
      :host {
        display: inline-block;
        font-family: ${tokens.fontFamily.primary};
        font-size: ${tokens.fontSize.sm};
        color: ${tokens.color.gray900};
        background: ${tokens.color.grayWhite};
        padding: ${tokens.spacing.xs} ${tokens.spacing.sm};
        border-radius: ${tokens.radius.sm};
        box-shadow: ${tokens.shadow.sm};
      }
    `,
  ];

  @property({ type: String })
  text = '';

  override render() {
    return html`${this.text}<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'graph-label': GraphLabel;
  }
}
