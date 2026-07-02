import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { hostBlock, reducedMotion } from '../../styles/index.js';

/**
 * <cg-separator> — Visual divider, horizontal or vertical.
 *
 * Features beyond OpenUI's Separator:
 * - Label attribute (text in the middle of the line)
 * - Vertical orientation
 * - Semantic spacing variants
 */
@customElement('cg-separator')
export class CgSeparator extends LitElement {
  static override styles = [hostBlock, reducedMotion, css`
    :host {
      display: flex;
      align-items: center;
      gap: var(--cg-spacing-12);
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
      background: var(--cg-color-surface-base-divider);
    }

    /* Gradient variant — fades at edges */
    :host([variant="gradient"]) .line {
      background: linear-gradient(to right, transparent, var(--cg-color-surface-base-divider) 20%, var(--cg-color-surface-base-divider) 80%, transparent);
    }

    :host([orientation="horizontal"]) .line {
      height: var(--cg-border-width-50);
      min-width: var(--cg-spacing-16);
    }

    :host([orientation="vertical"]) .line {
      width: var(--cg-border-width-50);
      min-height: var(--cg-spacing-16);
    }
    :host([variant="gradient"][orientation="vertical"]) .line {
      background: linear-gradient(to bottom, transparent, var(--cg-color-surface-base-divider) 20%, var(--cg-color-surface-base-divider) 80%, transparent);
    }

    /* Spacing variants */
    :host([spacing="none"]) { margin: 0; }
    :host([spacing="sm"]) { margin: var(--cg-spacing-8) 0; }
    :host([spacing="md"]) { margin: var(--cg-spacing-16) 0; }
    :host([spacing="lg"]) { margin: var(--cg-spacing-24) 0; }

    :host([orientation="vertical"][spacing="sm"]) { margin: 0 var(--cg-spacing-8); }
    :host([orientation="vertical"][spacing="md"]) { margin: 0 var(--cg-spacing-16); }
    :host([orientation="vertical"][spacing="lg"]) { margin: 0 var(--cg-spacing-24); }

    .label {
      font-size: var(--cg-font-size-xs);
      font-weight: var(--cg-font-weight-medium);
      color: var(--cg-color-surface-container-outlined);
      white-space: nowrap;
      text-transform: uppercase;
      letter-spacing: var(--cg-letter-spacing-wide);
    }
  `];

  @property({ reflect: true }) variant: 'solid' | 'gradient' = 'solid';
  @property({ reflect: true }) orientation: 'horizontal' | 'vertical' = 'horizontal';
  @property({ reflect: true }) spacing: 'none' | 'sm' | 'md' | 'lg' = 'none';
  @property() label = '';

  override render() {
    if (this.label) {
      return html`
        <div class="line" role="presentation" aria-hidden="true"></div>
        <span class="label">${this.label}</span>
        <div class="line" role="presentation" aria-hidden="true"></div>
      `;
    }
    return html`<div class="line" role="separator" aria-orientation="${this.orientation}"></div>`;
  }

  override updated(changed: Map<string, unknown>) {
    if (changed.has('label') || changed.has('orientation')) {
      if (this.label) {
        this.setAttribute('role', 'separator');
        this.setAttribute('aria-orientation', this.orientation);
      } else if (this.getAttribute('role') === 'separator') {
        // Only remove what this component set — never clobber a
        // consumer-supplied role on the host.
        this.removeAttribute('role');
        this.removeAttribute('aria-orientation');
      }
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cg-separator': CgSeparator;
  }
}
