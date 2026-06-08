import { LitElement, html, css, nothing, svg } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { hostBlock, reducedMotion } from '../../styles/index.js';

/**
 * @element cg-empty-state
 * Empty / no-results / error state with icon, title, description, and actions slot.
 *
 * @example
 * ```html
 * <cg-empty-state variant="search" title="No results" description="Try a different query">
 *   <cg-button slot="actions">Clear filters</cg-button>
 * </cg-empty-state>
 * ```
 *
 * @slot icon - Override the default icon
 * @slot - Extra body content below description
 * @slot actions - Buttons row at the bottom
 */
@customElement('cg-empty-state')
export class CgEmptyState extends LitElement {
  static override styles = [hostBlock, reducedMotion, css`
    :host {
      width: 100%;
    }

    .root {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      gap: var(--cg-spacing-12);
      padding: var(--cg-component-empty-state-padding);
      color: var(--cg-color-surface-container-text);
      font-family: var(--cg-font-family-primary);
    }

    .icon-wrap {
      display: flex;
      align-items: center;
      justify-content: center;
      width: var(--cg-component-empty-state-icon-size);
      height: var(--cg-component-empty-state-icon-size);
      color: var(--cg-color-empty-state-icon);
      margin-bottom: var(--cg-spacing-4);
    }
    .icon-wrap svg {
      width: 100%;
      height: 100%;
    }

    :host([variant="error"]) .icon-wrap { color: var(--cg-color-status-error-text-default); }
    :host([variant="success"]) .icon-wrap { color: var(--cg-color-status-success-text-default); }
    :host([variant="info"]) .icon-wrap { color: var(--cg-color-status-info-text-default); }

    /* AI variant — accent bubble around the icon, AI brand color */
    :host([variant="ai"]) .icon-wrap {
      background: var(--cg-overlay-accent-subtle);
      border: var(--cg-border-width-50) solid var(--cg-overlay-accent-strong);
      border-radius: var(--cg-border-radius-full);
      color: var(--cg-color-accent-text);
      padding: var(--cg-spacing-12);
      box-sizing: border-box;
    }

    .title {
      font-size: var(--cg-font-size-md);
      font-weight: var(--cg-font-weight-semibold);
      color: var(--cg-color-empty-state-text-primary);
      line-height: var(--cg-line-height-snug);
      margin: 0;
    }

    .description {
      font-size: var(--cg-font-size-sm);
      color: var(--cg-color-empty-state-text-secondary);
      line-height: var(--cg-line-height-relaxed);
      margin: 0;
      max-width: 52ch;
    }

    .actions {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
      gap: var(--cg-spacing-12);
      margin-top: var(--cg-spacing-8);
    }
    .actions[hidden] { display: none; }
  `];

  @property({ reflect: true }) variant: 'default' | 'search' | 'error' | 'success' | 'info' | 'ai' = 'default';
  @property() override title = '';
  @property() description = '';
  @property() icon = '';

  // The .actions wrapper always contains a <slot>, so `.actions:empty` never
  // matched — leaving stray margin when no actions are slotted. Track real
  // slotted content and hide the row when there is none.
  @state() private _hasActions = false;

  private _onActionsSlotChange(e: Event) {
    this._hasActions =
      (e.target as HTMLSlotElement).assignedNodes({ flatten: true }).length > 0;
  }

  private _defaultIcon() {
    switch (this.variant) {
      case 'search':
        return svg`
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
          </svg>
        `;
      case 'error':
        return svg`
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
        `;
      case 'success':
        return svg`
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
        `;
      case 'info':
        return svg`
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="16" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12.01" y2="8"></line>
          </svg>
        `;
      case 'ai':
        return svg`
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 3l1.9 4.6L18.5 9.5l-4.6 1.9L12 16l-1.9-4.6L5.5 9.5l4.6-1.9z"></path>
            <path d="M19 14l.9 2.2L22 17l-2.1.8L19 20l-.9-2.2L16 17l2.1-.8z"></path>
          </svg>
        `;
      default:
        return svg`
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="22 12 16 12 14 15 10 15 8 12 2 12"></polyline>
            <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"></path>
          </svg>
        `;
    }
  }

  override render() {
    const role = this.variant === 'error' ? 'alert' : 'status';
    const titleId = this.title ? 'es-title' : undefined;
    const descId = this.description ? 'es-desc' : undefined;
    return html`
      <div
        class="root"
        role=${role}
        aria-labelledby=${titleId ?? nothing}
        aria-describedby=${descId ?? nothing}
      >
        <div class="icon-wrap" aria-hidden="true">
          <slot name="icon">${this._defaultIcon()}</slot>
        </div>
        ${this.title ? html`<h3 id=${titleId!} class="title">${this.title}</h3>` : nothing}
        ${this.description ? html`<p id=${descId!} class="description">${this.description}</p>` : nothing}
        <slot></slot>
        <div class="actions" ?hidden=${!this._hasActions}>
          <slot name="actions" @slotchange=${this._onActionsSlotChange}></slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cg-empty-state': CgEmptyState;
  }
}
