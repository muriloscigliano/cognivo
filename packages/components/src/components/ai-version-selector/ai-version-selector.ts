/**
 * @element ai-version-selector
 * Radio-group version picker for AI models with status badges
 * (active/canary/deprecated), rollout percentage sliders,
 * "Promote to 100%" buttons, and deprecation warnings.
 *
 * @example
 * ```html
 * <ai-version-selector selected="v2" .versions=${[
 *   { id: 'v2', label: 'v2.1-stable', status: 'active', rolloutPercent: 100, date: 'Mar 15' },
 *   { id: 'v3', label: 'v3.0-canary', status: 'canary', rolloutPercent: 10, date: 'Mar 28' }
 * ]}></ai-version-selector>
 * ```
 *
 * @prop {VersionEntry[]} versions - Array of version entries
 * @prop {string} selected - Currently selected version ID
 *
 * @fires {CustomEvent<{id: string, label: string}>} ai-version-select - When a version is selected
 * @fires {CustomEvent<{id: string, rolloutPercent: number}>} ai-version-rollout-change - When rollout slider or promote button changes
 */
import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { hostBlock, reducedMotion, fadeSlideInKeyframes } from '../../styles/index.js';

export interface VersionEntry {
  id: string;
  label: string;
  status: 'active' | 'canary' | 'deprecated';
  rolloutPercent?: number;
  date: string;
}

@customElement('ai-version-selector')
export class AiVersionSelector extends LitElement {
  static override styles = [hostBlock, reducedMotion, fadeSlideInKeyframes, css`
    :host {
      background: var(--cg-color-surface-base);
      color: var(--cg-color-surface-base-text);
      border: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
      border-radius: var(--cg-border-radius-150);
      padding: var(--cg-spacing-16);
      animation: fadeSlideIn var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
    }
    :host([hidden]) { display: none; }

    .title {
      font-size: var(--cg-font-size-sm);
      font-weight: var(--cg-font-weight-semibold);
      margin: 0 0 var(--cg-spacing-12) 0;
    }

    .version-list {
      display: flex;
      flex-direction: column;
      gap: var(--cg-spacing-8);
    }

    .version-item {
      display: flex;
      flex-direction: column;
      gap: var(--cg-spacing-8);
      padding: var(--cg-spacing-12);
      background: var(--cg-color-surface-overlay);
      border-radius: var(--cg-border-radius-100);
      border: var(--cg-border-width-100) solid transparent;
      cursor: pointer;
      transition: border-color var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
    }

    .version-item:hover {
      border-color: var(--cg-color-surface-cards-border);
    }

    .version-item[aria-selected="true"] {
      border-color: var(--cg-color-surface-base-text);
    }

    .version-item:focus-visible {
      outline: 2px solid var(--cg-overlay-accent-strong);
      outline-offset: var(--cg-outline-offset-default);
    }

    .version-top {
      display: flex;
      align-items: center;
      gap: var(--cg-spacing-8);
    }

    .radio-dot {
      width: var(--cg-spacing-16);
      height: var(--cg-spacing-16);
      border-radius: 50%;
      border: var(--cg-border-width-100) solid var(--cg-color-surface-cards-border);
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .version-item[aria-selected="true"] .radio-dot {
      border-color: var(--cg-color-surface-base-text);
    }

    .radio-inner {
      width: var(--cg-spacing-8);
      height: var(--cg-spacing-8);
      border-radius: 50%;
      background: var(--cg-color-action-primary-background-default);
      display: none;
    }

    .version-item[aria-selected="true"] .radio-inner {
      display: block;
    }

    .version-label {
      flex: 1;
      font-size: var(--cg-font-size-sm);
      font-weight: var(--cg-font-weight-medium);
    }

    .version-date {
      font-size: var(--cg-font-size-xs);
      color: var(--cg-color-input-text-placeholder);
    }

    .status-badge {
      display: inline-flex;
      padding: var(--cg-spacing-2) var(--cg-spacing-8);
      border-radius: var(--cg-border-radius-full);
      font-size: var(--cg-font-size-xs);
      font-weight: var(--cg-font-weight-semibold);
      text-transform: uppercase;
      letter-spacing: 0.05em;
      flex-shrink: 0;
    }

    .status-active {
      background: var(--cg-color-status-success-background-default);
      color: var(--cg-color-status-success-text-default);
    }

    .status-canary {
      background: var(--cg-color-status-warning-background-default);
      color: var(--cg-color-status-warning-text);
    }

    .status-deprecated {
      background: var(--cg-color-status-error-background-default);
      color: var(--cg-color-status-error-text);
    }

    .deprecation-warning {
      display: flex;
      align-items: center;
      gap: var(--cg-spacing-6);
      font-size: var(--cg-font-size-xs);
      color: var(--cg-color-status-error-text);
      padding: var(--cg-spacing-4) var(--cg-spacing-8);
      background: var(--cg-color-status-error-background-default);
      border-radius: var(--cg-border-radius-50);
    }

    .rollout-row {
      display: flex;
      align-items: center;
      gap: var(--cg-spacing-8);
    }

    .rollout-label {
      font-size: var(--cg-font-size-xs);
      color: var(--cg-color-input-text-placeholder);
      min-width: var(--cg-spacing-56);
    }

    input[type="range"] {
      flex: 1;
      -webkit-appearance: none;
      appearance: none;
      height: var(--cg-spacing-4);
      background: var(--cg-color-surface-base);
      border-radius: var(--cg-spacing-2);
      outline: none;
    }

    input[type="range"]::-webkit-slider-thumb {
      -webkit-appearance: none;
      width: var(--cg-spacing-12);
      height: var(--cg-spacing-12);
      border-radius: 50%;
      background: var(--cg-color-action-primary-background-default);
      cursor: pointer;
    }

    input[type="range"]:focus-visible {
      outline: 2px solid var(--cg-overlay-accent-strong);
      outline-offset: var(--cg-spacing-4);
      border-radius: var(--cg-spacing-2);
    }

    .rollout-value {
      font-size: var(--cg-font-size-xs);
      font-weight: var(--cg-font-weight-semibold);
      color: var(--cg-color-surface-base-text);
      min-width: var(--cg-spacing-32);
      text-align: right;
    }

    .promote-btn {
      background: transparent;
      border: var(--cg-border-width-50) solid var(--cg-overlay-accent-strong);
      color: var(--cg-color-surface-base-text);
      border-radius: var(--cg-border-radius-50);
      padding: var(--cg-spacing-3) var(--cg-spacing-8);
      font-size: var(--cg-font-size-xs);
      font-weight: var(--cg-font-weight-semibold);
      cursor: pointer;
      font-family: inherit;
      flex-shrink: 0;
    }

    .promote-btn:focus-visible {
      outline: 2px solid var(--cg-overlay-accent-strong);
      outline-offset: var(--cg-outline-offset-default);
    }

    .promote-btn:hover {
      background: var(--cg-overlay-accent-subtle);
    }
    .promote-btn:active {
      transform: scale(var(--cg-interaction-press-scale));
    }

    /* ── Rounded variants ── */
    :host([rounded="none"]) { border-radius: 0; }
    :host([rounded="sm"]) { border-radius: var(--cg-border-radius-50); }
    :host([rounded="md"]) { border-radius: var(--cg-border-radius-100); }
    :host([rounded="lg"]) { border-radius: var(--cg-border-radius-150); }
    :host([rounded="full"]) { border-radius: var(--cg-border-radius-full); }
  `];

  @property({ reflect: true }) rounded: 'none' | 'sm' | 'md' | 'lg' | 'full' = 'lg';
  @property({ type: Array }) versions: VersionEntry[] = [];
  @property({ type: String }) selected = '';

  private _onSelect(v: VersionEntry): void {
    this.dispatchEvent(new CustomEvent('ai-version-select', {
      bubbles: true, composed: true,
      detail: { id: v.id, label: v.label },
    }));
  }

  private _onRolloutChange(v: VersionEntry, e: Event): void {
    const value = Number((e.target as HTMLInputElement).value);
    this.dispatchEvent(new CustomEvent('ai-version-rollout-change', {
      bubbles: true, composed: true,
      detail: { id: v.id, rolloutPercent: value },
    }));
  }

  private _onPromote(v: VersionEntry, e: Event): void {
    e.stopPropagation();
    this.dispatchEvent(new CustomEvent('ai-version-rollout-change', {
      bubbles: true, composed: true,
      detail: { id: v.id, rolloutPercent: 100 },
    }));
  }

  override render() {
    return html`
      <h3 class="title">Model Versions</h3>
      <div class="version-list" role="radiogroup" aria-label="Select model version">
        ${this.versions.map(v => {
          const isSelected = v.id === this.selected;
          return html`
            <div class="version-item" role="radio"
                 aria-selected=${isSelected ? 'true' : 'false'}
                 aria-label="${v.label} ${v.status}"
                 tabindex="0"
                 @click=${() => this._onSelect(v)}
                 @keydown=${(e: KeyboardEvent) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); this._onSelect(v); } }}>
              <div class="version-top">
                <span class="radio-dot"><span class="radio-inner"></span></span>
                <span class="version-label">${v.label}</span>
                <span class="status-badge status-${v.status}">${v.status}</span>
                <span class="version-date">${v.date}</span>
              </div>
              ${v.status === 'deprecated' ? html`
                <div class="deprecation-warning" role="alert">
                  &#x26A0; This version is deprecated. Consider migrating.
                </div>
              ` : nothing}
              ${v.rolloutPercent != null && v.status !== 'deprecated' ? html`
                <div class="rollout-row">
                  <span class="rollout-label">Rollout</span>
                  <input type="range" min="0" max="100" .value=${String(v.rolloutPercent)}
                         @input=${(e: Event) => this._onRolloutChange(v, e)}
                         @click=${(e: Event) => e.stopPropagation()}
                         aria-label="Rollout percentage for ${v.label}" />
                  <span class="rollout-value">${v.rolloutPercent}%</span>
                  ${v.rolloutPercent < 100 ? html`
                    <button class="promote-btn" @click=${(e: Event) => this._onPromote(v, e)}
                            tabindex="0" aria-label="Promote ${v.label} to 100%">
                      Promote to 100%
                    </button>
                  ` : nothing}
                </div>
              ` : nothing}
            </div>
          `;
        })}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ai-version-selector': AiVersionSelector;
  }
}
