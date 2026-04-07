/**
 * @element ai-personalization-dash
 * User personalization dashboard with preference sliders, segments, and reset.
 *
 * @fires {CustomEvent<{id: string, value: number}>} ai-personalization-change
 * @fires {CustomEvent} ai-personalization-reset
 */
import { LitElement, html, css, nothing } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { hostBlock, reducedMotion } from '../../styles/index.js';

export interface Preference {
  id: string;
  label: string;
  value: number;
  min?: number;
  max?: number;
  description?: string;
}

export interface Segment {
  id: string;
  label: string;
  active?: boolean;
}

@customElement('ai-personalization-dash')
export class AiPersonalizationDash extends LitElement {
  static override styles = [hostBlock, reducedMotion, css`
    .panel {
      background: var(--cg-color-surface-cards-background);
      border: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
      border-radius: var(--cg-border-radius-150);
      overflow: hidden;
    }

    /* ── Profile ── */
    .profile {
      display: flex; align-items: center; gap: var(--cg-spacing-12);
      padding: var(--cg-spacing-16) var(--cg-spacing-20);
    }
    .profile-avatar {
      width: var(--cg-spacing-32); height: var(--cg-spacing-32);
      border-radius: var(--cg-border-radius-full);
      background: var(--cg-overlay-accent-light);
      color: var(--cg-color-action-primary-background-default);
      display: flex; align-items: center; justify-content: center;
      font-size: var(--cg-font-size-sm); font-weight: var(--cg-font-weight-semibold);
      flex-shrink: 0;
    }
    .profile-info { display: flex; flex-direction: column; gap: var(--cg-spacing-2); }
    .profile-name { font-size: var(--cg-font-size-sm); font-weight: var(--cg-font-weight-semibold); color: var(--cg-color-surface-base-text); }
    .profile-updated { font-size: var(--cg-font-size-xs); color: var(--cg-color-surface-container-outlined); }

    /* ── Sections ── */
    .section { padding: var(--cg-spacing-16) var(--cg-spacing-20); }
    .section-title {
      font-size: var(--cg-font-size-xs); font-weight: var(--cg-font-weight-semibold);
      color: var(--cg-color-surface-container-outlined);
      text-transform: uppercase; letter-spacing: var(--cg-letter-spacing-wide);
      margin-bottom: var(--cg-spacing-12);
    }

    /* ── Preference items ── */
    .pref-list { display: flex; flex-direction: column; gap: var(--cg-spacing-16); }
    .pref-item { display: flex; flex-direction: column; gap: var(--cg-spacing-4); }
    .pref-header { display: flex; align-items: center; justify-content: space-between; }
    .pref-label { font-size: var(--cg-font-size-sm); font-weight: var(--cg-font-weight-medium); color: var(--cg-color-surface-base-text); }
    .pref-desc { font-size: var(--cg-font-size-xs); color: var(--cg-color-surface-container-outlined); }

    /* ── Segments ── */
    .segments { display: flex; flex-wrap: wrap; gap: var(--cg-spacing-6); }
    .seg {
      display: inline-flex; align-items: center; gap: var(--cg-spacing-6);
      padding: var(--cg-spacing-4) var(--cg-spacing-12);
      border-radius: var(--cg-border-radius-full);
      font-size: var(--cg-font-size-xs); font-weight: var(--cg-font-weight-medium);
      border: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
      color: var(--cg-color-surface-container-outlined);
      background: transparent;
    }
    .seg.active {
      border-color: var(--cg-color-action-primary-background-default);
      color: var(--cg-color-action-primary-background-default);
      background: var(--cg-overlay-accent-subtle);
    }
    .seg-dot {
      width: var(--cg-spacing-6); height: var(--cg-spacing-6);
      border-radius: var(--cg-border-radius-full);
      background: currentColor;
    }

    /* ── Footer ── */
    .footer {
      padding: var(--cg-spacing-16) var(--cg-spacing-20);
      display: flex; justify-content: flex-end;
    }

    /* ── Rounded ── */
    :host([rounded="none"]) .panel { border-radius: 0; }
    :host([rounded="sm"]) .panel { border-radius: var(--cg-border-radius-50); }
    :host([rounded="md"]) .panel { border-radius: var(--cg-border-radius-100); }
    :host([rounded="lg"]) .panel { border-radius: var(--cg-border-radius-150); }
  `];

  @property({ reflect: true }) rounded: 'none' | 'sm' | 'md' | 'lg' = 'lg';
  @property({ type: Array }) preferences: Preference[] = [];
  @property({ type: Array }) segments: Segment[] = [];
  @property() userName = '';
  @property() lastUpdated = '';
  @property({ type: Boolean }) showReset = false;

  private _handleSliderChange(id: string, e: Event) {
    const value = (e as CustomEvent).detail?.value;
    if (value !== undefined) {
      this.dispatchEvent(new CustomEvent('ai-personalization-change', {
        bubbles: true, composed: true, detail: { id, value },
      }));
    }
  }

  private _handleReset() {
    this.dispatchEvent(new CustomEvent('ai-personalization-reset', { bubbles: true, composed: true }));
  }

  override render() {
    return html`
      <div class="panel">
        <div class="profile">
          <div class="profile-avatar">${this.userName.charAt(0).toUpperCase() || '?'}</div>
          <div class="profile-info">
            <span class="profile-name">${this.userName || 'User'}</span>
            ${this.lastUpdated ? html`<span class="profile-updated">Updated ${this.lastUpdated}</span>` : nothing}
          </div>
        </div>

        ${this.preferences.length > 0 ? html`
          <div class="section">
            <div class="section-title">Preferences</div>
            <div class="pref-list">
              ${this.preferences.map(p => html`
                <div class="pref-item">
                  <cg-slider
                    label="${p.label}"
                    value="${p.value}"
                    min="${p.min ?? 0}"
                    max="${p.max ?? 100}"
                    showValue
                    .showTooltip=${false}
                    .showRange=${false}
                    @cg-change=${(e: Event) => this._handleSliderChange(p.id, e)}
                  ></cg-slider>
                  ${p.description ? html`<span class="pref-desc">${p.description}</span>` : nothing}
                </div>
              `)}
            </div>
          </div>
        ` : nothing}

        ${this.segments.length > 0 ? html`
          <div class="section">
            <div class="section-title">Segments</div>
            <div class="segments">
              ${this.segments.map(s => html`
                <span class="seg ${s.active ? 'active' : ''}">
                  <span class="seg-dot"></span>
                  ${s.label}
                </span>
              `)}
            </div>
          </div>
        ` : nothing}

        ${this.showReset ? html`
          <div class="footer">
            <cg-button variant="secondary" size="sm" @click=${this._handleReset}>Reset to Defaults</cg-button>
          </div>
        ` : nothing}
      </div>
    `;
  }
}
