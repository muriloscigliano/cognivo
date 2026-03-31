import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { hostBlock, reducedMotion } from '../../styles/index.js';

/**
 * <cg-separator> — Visual divider, horizontal or vertical.
 *
 * Features beyond OpenUI's Separator:
 * - Label slot (text in the middle of the line)
 * - Vertical orientation
 * - Semantic spacing variants
 */
@customElement('cg-separator')
export class CgSeparator extends LitElement {
  static override styles = [hostBlock, reducedMotion, css`
    :host {
      display: flex;
      align-items: center;
      gap: var(--cg-spacing-12, 12px);
    }

    :host([orientation="horizontal"]) {
      flex-direction: row;
      width: 100%;
    }

    :host([orientation="vertical"]) {
      flex-direction: column;
      height: 100%;
      width: auto;
    }

    .line {
      flex: 1;
      background: linear-gradient(to right, transparent, var(--cg-gray-700, #3f3f46) 20%, var(--cg-gray-700, #3f3f46) 80%, transparent);
    }

    :host([orientation="horizontal"]) .line {
      height: 1px;
      min-width: 16px;
    }

    :host([orientation="vertical"]) .line {
      width: 1px;
      min-height: 16px;
      background: linear-gradient(to bottom, transparent, var(--cg-gray-700, #3f3f46) 20%, var(--cg-gray-700, #3f3f46) 80%, transparent);
    }

    /* Spacing variants */
    :host([spacing="none"]) { margin: 0; }
    :host([spacing="sm"]) { margin: var(--cg-spacing-8, 8px) 0; }
    :host([spacing="md"]) { margin: var(--cg-spacing-16, 16px) 0; }
    :host([spacing="lg"]) { margin: var(--cg-spacing-24, 24px) 0; }

    :host([orientation="vertical"][spacing="sm"]) { margin: 0 var(--cg-spacing-8, 8px); }
    :host([orientation="vertical"][spacing="md"]) { margin: 0 var(--cg-spacing-16, 16px); }
    :host([orientation="vertical"][spacing="lg"]) { margin: 0 var(--cg-spacing-24, 24px); }

    .label {
      font-size: var(--cg-font-size-xs, 12px);
      font-weight: var(--cg-font-weight-medium, 500);
      color: var(--cg-gray-500, #71717a);
      white-space: nowrap;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
  `];

  @property({ reflect: true }) orientation: 'horizontal' | 'vertical' = 'horizontal';
  @property({ reflect: true }) spacing: 'none' | 'sm' | 'md' | 'lg' = 'none';
  @property() label = '';

  override render() {
    if (this.label) {
      return html`
        <div class="line"></div>
        <span class="label">${this.label}</span>
        <div class="line"></div>
      `;
    }
    return html`<div class="line" role="separator" aria-orientation="${this.orientation}"></div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cg-separator': CgSeparator;
  }
}
