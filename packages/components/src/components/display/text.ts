import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

@customElement('cg-text')
export class CgText extends LitElement {
  static override styles = [
    baseStyles,
    css`
host { display: inline; font-family: ${tokens.fontFamily.primary}; font-size: var(--text-size, ${tokens.fontSize.base}); color: var(--text-color, ${tokens.color.gray900}); }
    :host([size='xs']) { --text-size: ${tokens.fontSize.xs}; }
    :host([size='sm']) { --text-size: ${tokens.fontSize.sm}; }
    :host([size='md']) { --text-size: ${tokens.fontSize.md}; }
    :host([size='lg']) { --text-size: ${tokens.fontSize.lg}; }
    :host([variant='secondary']) { --text-color: ${tokens.color.gray500}; }
    :host([variant='muted']) { --text-color: ${tokens.color.gray500}; opacity: 0.7; }`,
  ];
  @property({ type: String, reflect: true }) size = 'base';
  @property({ type: String, reflect: true }) variant = 'primary';
  override render() { return html`<slot></slot>`; }
}
declare global { interface HTMLElementTagNameMap { 'cg-text': CgText; } }
