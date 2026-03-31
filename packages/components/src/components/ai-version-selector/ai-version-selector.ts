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
import { hostBlock, reducedMotion } from '../../styles/index.js';

export interface VersionEntry {
  id: string;
  label: string;
  status: 'active' | 'canary' | 'deprecated';
  rolloutPercent?: number;
  date: string;
}

@customElement('ai-version-selector')
export class AiVersionSelector extends LitElement {
  static override styles = [hostBlock, reducedMotion, css`
    :host {
      background: var(--cg-color-surface-base, #18181b);
      color: var(--cg-color-surface-base-text, #fafafa);
      border: 1px solid var(--cg-color-border-default, #27272a);
      border-radius: var(--cg-radius-lg, 12px);
      padding: var(--cg-spacing-16, 16px);
    }
    :host([hidden]) { display: none; }

    .title {
      font-size: var(--cg-font-size-sm, 14px);
      font-weight: var(--cg-font-weight-semibold, 600);
      margin: 0 0 12px 0;
    }

    .version-list {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .version-item {
      display: flex;
      flex-direction: column;
      gap: 8px;
      padding: var(--cg-spacing-12, 12px);
      background: var(--cg-color-surface-overlay, #27272a);
      border-radius: var(--cg-radius-md, 8px);
      border: 2px solid transparent;
      cursor: pointer;
      transition: border-color 0.15s ease;
    }

    .version-item:hover {
      border-color: var(--cg-color-border-default, #3f3f46);
    }

    .version-item[aria-selected="true"] {
      border-color: var(--cg-color-accent, #dfff61);
    }

    .version-item:focus-visible {
      outline: 2px solid var(--cg-color-accent, #dfff61);
      outline-offset: 2px;
    }

    .version-top {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .radio-dot {
      width: 16px;
      height: 16px;
      border-radius: 50%;
      border: 2px solid var(--cg-color-border-default, #3f3f46);
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .version-item[aria-selected="true"] .radio-dot {
      border-color: var(--cg-color-accent, #dfff61);
    }

    .radio-inner {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: var(--cg-color-accent, #dfff61);
      display: none;
    }

    .version-item[aria-selected="true"] .radio-inner {
      display: block;
    }

    .version-label {
      flex: 1;
      font-size: var(--cg-font-size-sm, 14px);
      font-weight: var(--cg-font-weight-medium, 500);
    }

    .version-date {
      font-size: var(--cg-font-size-xs, 12px);
      color: var(--cg-color-text-tertiary, #71717a);
    }

    .status-badge {
      display: inline-flex;
      padding: 2px 8px;
      border-radius: var(--cg-radius-full, 9999px);
      font-size: 10px;
      font-weight: var(--cg-font-weight-semibold, 600);
      text-transform: uppercase;
      letter-spacing: 0.05em;
      flex-shrink: 0;
    }

    .status-active {
      background: rgba(34, 197, 94, 0.15);
      color: #4ade80;
    }

    .status-canary {
      background: rgba(250, 204, 21, 0.15);
      color: #facc15;
    }

    .status-deprecated {
      background: rgba(239, 68, 68, 0.15);
      color: #f87171;
    }

    .deprecation-warning {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: var(--cg-font-size-xs, 12px);
      color: #f87171;
      padding: 4px 8px;
      background: rgba(239, 68, 68, 0.08);
      border-radius: var(--cg-radius-sm, 4px);
    }

    .rollout-row {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .rollout-label {
      font-size: var(--cg-font-size-xs, 12px);
      color: var(--cg-color-text-secondary, #a1a1aa);
      min-width: 56px;
    }

    input[type="range"] {
      flex: 1;
      -webkit-appearance: none;
      appearance: none;
      height: 4px;
      background: var(--cg-color-surface-base, #18181b);
      border-radius: 2px;
      outline: none;
    }

    input[type="range"]::-webkit-slider-thumb {
      -webkit-appearance: none;
      width: 14px;
      height: 14px;
      border-radius: 50%;
      background: var(--cg-color-accent, #dfff61);
      cursor: pointer;
    }

    input[type="range"]:focus-visible {
      outline: 2px solid var(--cg-color-accent, #dfff61);
      outline-offset: 4px;
      border-radius: 2px;
    }

    .rollout-value {
      font-size: var(--cg-font-size-xs, 12px);
      font-weight: var(--cg-font-weight-semibold, 600);
      color: var(--cg-color-accent, #dfff61);
      min-width: 32px;
      text-align: right;
    }

    .promote-btn {
      background: transparent;
      border: 1px solid var(--cg-color-accent, #dfff61);
      color: var(--cg-color-accent, #dfff61);
      border-radius: var(--cg-radius-sm, 4px);
      padding: 3px 8px;
      font-size: 10px;
      font-weight: var(--cg-font-weight-semibold, 600);
      cursor: pointer;
      font-family: inherit;
      flex-shrink: 0;
    }

    .promote-btn:focus-visible {
      outline: 2px solid var(--cg-color-accent, #dfff61);
      outline-offset: 2px;
    }

    .promote-btn:hover {
      background: rgba(223, 255, 97, 0.1);
    }

  `];

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
