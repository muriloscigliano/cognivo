/**
 * @element ai-consent-manager
 * Consent management with grouped toggles, required items, and Accept/Reject/Save actions.
 *
 * @fires {CustomEvent<{id: string, checked: boolean}>} ai-consent-change
 * @fires {CustomEvent<{consents: Record<string, boolean>}>} ai-consent-save
 */
import { LitElement, html, css, nothing } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { hostBlock, reducedMotion } from '../../styles/index.js';

export interface ConsentItem {
  id: string;
  label: string;
  description: string;
  required?: boolean;
  checked?: boolean;
  category?: string;
}

@customElement('ai-consent-manager')
export class AiConsentManager extends LitElement {
  static override styles = [hostBlock, reducedMotion, css`
    .panel {
      background: var(--cg-color-surface-cards-background);
      border: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
      border-radius: var(--cg-border-radius-150);
      overflow: hidden;
    }

    .header {
      display: flex; align-items: center; gap: var(--cg-spacing-8);
      padding: var(--cg-spacing-16) var(--cg-spacing-20);
    }
    .header-icon {
      width: var(--cg-spacing-20); height: var(--cg-spacing-20);
      color: var(--cg-color-surface-base-text); flex-shrink: 0;
    }
    .header-title {
      font-size: var(--cg-font-size-sm); font-weight: var(--cg-font-weight-semibold);
      color: var(--cg-color-surface-base-text);
    }

    .category-label {
      font-size: var(--cg-font-size-xs); font-weight: var(--cg-font-weight-semibold);
      color: var(--cg-color-surface-container-outlined);
      text-transform: uppercase; letter-spacing: var(--cg-letter-spacing-wide);
      padding: var(--cg-spacing-12) var(--cg-spacing-20) var(--cg-spacing-4);
    }

    .items { padding: var(--cg-spacing-8) var(--cg-spacing-20); }

    .item {
      display: flex; align-items: flex-start; gap: var(--cg-spacing-12);
      padding: var(--cg-spacing-12) 0;
    }

    .item-content { flex: 1; min-width: 0; }
    .item-label {
      font-size: var(--cg-font-size-sm); font-weight: var(--cg-font-weight-medium);
      color: var(--cg-color-surface-base-text);
      display: flex; align-items: center; gap: var(--cg-spacing-6);
    }
    .item-description {
      font-size: var(--cg-font-size-sm);
      color: var(--cg-color-surface-container-outlined);
      line-height: var(--cg-line-height-snug);
      margin-top: var(--cg-spacing-2);
    }

    /* ── Switch alignment ── */
    .item cg-switch {
      flex-shrink: 0;
      margin-top: var(--cg-spacing-2);
    }

    /* ── Footer ── */
    .footer {
      display: flex; align-items: center; gap: var(--cg-spacing-8);
      padding: var(--cg-spacing-12) var(--cg-spacing-20) var(--cg-spacing-16);
      flex-wrap: wrap;
    }
    .footer-spacer { flex: 1; }

    /* ── Rounded ── */
    :host([rounded="none"]) .panel { border-radius: 0; }
    :host([rounded="sm"]) .panel { border-radius: var(--cg-border-radius-50); }
    :host([rounded="md"]) .panel { border-radius: var(--cg-border-radius-100); }
    :host([rounded="lg"]) .panel { border-radius: var(--cg-border-radius-150); }

  `];

  @property({ type: Array }) consents: ConsentItem[] = [];
  @property({ reflect: true }) rounded: 'none' | 'sm' | 'md' | 'lg' = 'lg';
  @property() override title = 'Consent Settings';
  @property() acceptAllLabel = 'Accept All';
  @property() rejectAllLabel = 'Reject All';
  @property() saveLabel = 'Save Preferences';

  private _toggleConsent(id: string, required: boolean) {
    if (required) return;
    this.consents = this.consents.map(c => c.id === id ? { ...c, checked: !c.checked } : c);
    const item = this.consents.find(c => c.id === id);
    this.dispatchEvent(new CustomEvent('ai-consent-change', { bubbles: true, composed: true, detail: { id, checked: item?.checked ?? false } }));
    this.requestUpdate();
  }

  private _acceptAll() {
    this.consents = this.consents.map(c => ({ ...c, checked: true }));
    this.requestUpdate();
    this._save();
  }

  private _rejectAll() {
    this.consents = this.consents.map(c => c.required ? c : { ...c, checked: false });
    this.requestUpdate();
    this._save();
  }

  private _save() {
    const result: Record<string, boolean> = {};
    for (const c of this.consents) result[c.id] = c.checked ?? false;
    this.dispatchEvent(new CustomEvent('ai-consent-save', { bubbles: true, composed: true, detail: { consents: result } }));
  }

  private _getCategories(): string[] {
    return [...new Set(this.consents.map(c => c.category || ''))];
  }

  private _renderItem(c: ConsentItem) {
    return html`
      <div class="item">
        <div class="item-content">
          <div class="item-label">
            ${c.label}
            ${c.required ? html`<cg-badge label="Required" variant="warning" size="sm"></cg-badge>` : nothing}
          </div>
          <div class="item-description">${c.description}</div>
        </div>
        <cg-switch
          ?checked=${c.checked || c.required}
          ?disabled=${c.required}
          @cg-change=${() => this._toggleConsent(c.id, !!c.required)}
        ></cg-switch>
      </div>
    `;
  }

  override render() {
    if (!this.consents.length) return nothing;
    const categories = this._getCategories();
    const hasCategories = categories.length > 1 || (categories.length === 1 && categories[0] !== '');

    return html`
      <div class="panel" role="region" aria-label="${this.title}">
        <div class="header">
          <svg class="header-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          <span class="header-title">${this.title}</span>
        </div>

        ${hasCategories
          ? categories.map(cat => html`
              ${cat ? html`<div class="category-label">${cat}</div>` : nothing}
              <div class="items">${this.consents.filter(c => (c.category || '') === cat).map(c => this._renderItem(c))}</div>
            `)
          : html`<div class="items">${this.consents.map(c => this._renderItem(c))}</div>`}

        <div class="footer">
          <cg-button variant="tertiary" size="sm" @click=${this._rejectAll}>${this.rejectAllLabel}</cg-button>
          <cg-button variant="secondary" size="sm" @click=${this._acceptAll}>${this.acceptAllLabel}</cg-button>
          <span class="footer-spacer"></span>
          <cg-button variant="primary" size="sm" @click=${this._save}>${this.saveLabel}</cg-button>
        </div>
      </div>
    `;
  }
}
