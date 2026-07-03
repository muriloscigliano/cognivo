import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { hostBlock, reducedMotion } from '../../styles/index.js';

/**
 * @element cg-center
 * Centers its content on both axes, with an optional max-width for
 * constraining readable content blocks.
 *
 * @example
 * ```html
 * <cg-center full>
 *   <cg-spinner></cg-spinner>
 * </cg-center>
 * ```
 *
 * @example Constrained content column
 * ```html
 * <cg-center max-width="640px" inline>
 *   <cg-markdown>…</cg-markdown>
 * </cg-center>
 * ```
 *
 * @slot - Content to center.
 */
@customElement('cg-center')
export class CgCenter extends LitElement {
  static override styles = [hostBlock, reducedMotion, css`
    :host {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
    }

    /* Inline-only: center horizontally, keep normal block flow vertically */
    :host([inline]) {
      display: block;
    }
    :host([inline]) .content {
      margin-inline: auto;
    }

    :host([full]) { min-height: 100%; }

    .content {
      display: flex;
      flex-direction: column;
      align-items: center;
      max-width: var(--_cg-center-max, none);
      width: 100%;
    }

    /* Gap — same scale as cg-stack */
    :host([gap="none"]) .content { gap: 0; }
    :host([gap="xs"]) .content { gap: var(--cg-spacing-4); }
    :host([gap="sm"]) .content { gap: var(--cg-spacing-8); }
    :host([gap="md"]) .content { gap: var(--cg-spacing-16); }
    :host([gap="lg"]) .content { gap: var(--cg-spacing-24); }
    :host([gap="xl"]) .content { gap: var(--cg-spacing-32); }
    :host([gap="2xl"]) .content { gap: var(--cg-spacing-48); }
  `];

  @property({ type: Boolean, reflect: true }) inline = false;
  @property({ attribute: 'max-width', reflect: true }) maxWidth = '';
  @property({ type: Boolean, reflect: true }) full = false;
  @property({ reflect: true }) gap: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' = 'none';

  override updated(changed: Map<string, unknown>): void {
    if (changed.has('maxWidth')) {
      this.style.setProperty('--_cg-center-max', this.maxWidth || 'none');
    }
  }

  override render() {
    return html`<div class="content"><slot></slot></div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cg-center': CgCenter;
  }
}
