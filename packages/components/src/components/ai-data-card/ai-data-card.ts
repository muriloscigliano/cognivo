/**
 * @element ai-data-card
 * Compact key-value data card with typed formatting, header badge, footer actions, and loading skeleton.
 *
 * @example
 * ```html
 * <ai-data-card
 *   title="Invoice #4821"
 *   icon="[receipt icon]"
 *   headerStatus="success" headerStatusLabel="Paid"
 *   .fields=${[
 *     {label:'Amount', value:'$1,240.00', type:'currency'},
 *     {label:'Status', value:'Completed', type:'status', status:'success'}
 *   ]}
 *   .actions=${[{id:'view', label:'View Details', variant:'primary'}]}
 * ></ai-data-card>
 * ```
 *
 * @fires {CustomEvent<{actionId, actionLabel}>} ai-data-card-action - Footer action clicked
 *
 * @cssprop [--cg-brand-ai-accent=#dfff61] - Primary button, link, and currency text color
 */
import { LitElement, html, css, nothing } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { hostBlock, reducedMotion, fadeSlideInKeyframes, shimmerKeyframes } from '../../styles/index.js';
import '../cg-button/cg-button.js';
import '../cg-badge/cg-badge.js';
import '../cg-icon/cg-icon.js';

interface DataField {
  label: string;
  value: string | number;
  type?: 'text' | 'currency' | 'date' | 'status' | 'badge' | 'link' | 'number' | 'percent';
  status?: 'success' | 'warning' | 'error' | 'info' | 'neutral';
  url?: string;
  copyable?: boolean;
}

interface CardAction {
  id: string;
  label: string;
  variant?: 'primary' | 'secondary' | 'danger';
  icon?: string;
  disabled?: boolean;
}

@customElement('ai-data-card')
export class AiDataCard extends LitElement {
  static override styles = [hostBlock, reducedMotion, fadeSlideInKeyframes, shimmerKeyframes, css`
    :host {
      animation: fadeSlideIn var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
    }

    .card {
      background: var(--cg-color-surface-cards-background);
      border: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
      border-radius: var(--cg-component-card-radius);
      overflow: hidden;
      font-family: var(--cg-font-family-primary);
    }

    /* ── Header ── */
    .header {
      display: flex;
      align-items: center;
      gap: var(--cg-spacing-12);
      padding: var(--cg-spacing-20) var(--cg-spacing-20) var(--cg-spacing-16);
    }
    .header-info {
      flex: 1;
      min-width: 0;
    }
    .header-title {
      font-size: var(--cg-font-size-sm);
      font-weight: var(--cg-font-weight-semibold);
      color: var(--cg-color-surface-base-text);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .header-subtitle {
      font-size: var(--cg-font-size-xs);
      color: var(--cg-color-input-text-placeholder);
      margin-top: var(--cg-spacing-2);
    }

    /* ── Rows (table-style inset) ── */
    .rows {
      margin: 0 var(--cg-spacing-12);
      background: var(--cg-overlay-dark-subtle);
      border: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
      border-radius: var(--cg-border-radius-100);
      overflow: hidden;
    }
    .row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: var(--cg-spacing-12) var(--cg-spacing-16);
      border-bottom: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
    }
    .row:last-child {
      border-bottom: none;
    }

    .row-label {
      font-size: var(--cg-font-size-sm);
      color: var(--cg-color-input-text-placeholder);
      flex-shrink: 0;
      min-width: 100px;
    }
    .row-value {
      font-size: var(--cg-font-size-sm);
      color: var(--cg-color-surface-base-text);
      text-align: right;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: var(--cg-spacing-6);
    }

    /* ── Value types ── */
    .val-currency {
      color: var(--cg-color-surface-base-text);
      font-weight: var(--cg-font-weight-semibold);
    }
    .val-number {
      color: var(--cg-color-surface-base-text);
    }
    .val-percent {
      font-weight: var(--cg-font-weight-semibold);
    }
    .val-date {
      color: var(--cg-color-surface-base-text);
    }
    .val-link {
      color: var(--cg-color-surface-base-text);
      text-decoration: none;
      cursor: pointer;
      transition: color var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
    }
    .val-link:hover {
      text-decoration: underline;
    }


    /* Copy button (positioned inline) */
    .copy-wrap { flex-shrink: 0; }

    /* ── Footer ── */
    .footer {
      display: flex;
      flex-direction: column;
      gap: var(--cg-spacing-8);
      padding: var(--cg-spacing-16) var(--cg-spacing-12);
    }

    /* ── Compact mode ── */
    :host([compact]) .header { padding: var(--cg-spacing-8) var(--cg-spacing-12); }
    :host([compact]) .header-icon { width: var(--cg-spacing-24); height: var(--cg-spacing-24); font-size: var(--cg-font-size-xs); }
    :host([compact]) .header-title { font-size: var(--cg-font-size-xs); }
    :host([compact]) .rows { margin: 0 var(--cg-spacing-4); }
    :host([compact]) .row { padding: var(--cg-spacing-8) var(--cg-spacing-12); }
    :host([compact]) .row-label { min-width: 80px; }
    :host([compact]) .row-value { font-size: var(--cg-font-size-xs); }
    :host([compact]) .footer { padding: var(--cg-spacing-8) var(--cg-spacing-12); }

    /* ── Highlighted / selected ── */
    .card.highlighted {
      border-color: var(--cg-color-surface-base-text);
    }

    /* ── Loading skeleton ── */
    .skeleton .skel {
      border-radius: var(--cg-border-radius-100);
      background: linear-gradient(90deg, var(--cg-color-surface-container-background) 25%, var(--cg-color-surface-container-border) 50%, var(--cg-color-surface-container-background) 75%);
      background-size: 200% 100%;
      animation: shimmer 1.5s linear infinite;
    }
    .skel-header { display: flex; gap: var(--cg-spacing-8); padding: var(--cg-spacing-12) var(--cg-spacing-16); border-bottom: var(--cg-border-width-50) solid var(--cg-color-surface-container-background); }
    .skel-icon { width: var(--cg-spacing-32); height: var(--cg-spacing-32); border-radius: var(--cg-border-radius-100); }
    .skel-lines { flex: 1; display: flex; flex-direction: column; gap: var(--cg-spacing-6); justify-content: center; }
    .skel-line-lg { height: var(--cg-spacing-12); width: 60%; }
    .skel-line-sm { height: var(--cg-spacing-8); width: 35%; }
    .skel-row { display: flex; justify-content: space-between; padding: var(--cg-spacing-12) var(--cg-spacing-16); border-bottom: var(--cg-border-width-50) solid var(--cg-color-surface-container-background); }
    .skel-row:last-child { border-bottom: none; }
    .skel-label { height: var(--cg-spacing-8); width: 30%; }
    .skel-value { height: var(--cg-spacing-8); width: 40%; }

    /* ── Empty state ── */
    .empty {
      padding: var(--cg-spacing-24);
      text-align: center;
      color: var(--cg-color-input-text-placeholder);
      font-size: var(--cg-font-size-sm);
    }

  `];
  /** Card title */
  @property({ type: String }) override title: string = '';

  /** Subtitle text */
  @property({ type: String }) subtitle: string = '';

  /** Header icon (emoji or text) */
  @property({ type: String }) icon: string = '';

  /** Header status badge */
  @property({ type: String }) headerStatus: '' | 'success' | 'warning' | 'error' | 'info' | 'neutral' = '';

  /** Header status label */
  @property({ type: String }) headerStatusLabel: string = '';

  /** Data fields (key-value rows) */
  @property({ type: Array }) fields: DataField[] = [];

  /** Action buttons in footer */
  @property({ type: Array }) actions: CardAction[] = [];

  /** Compact display mode */
  @property({ type: Boolean, reflect: true }) compact: boolean = false;

  /** Loading skeleton */
  @property({ type: Boolean }) loading: boolean = false;

  /** Highlighted border */
  @property({ type: Boolean }) highlighted: boolean = false;

  private _copiedField: string | null = null;
  private _copyTimer?: ReturnType<typeof setTimeout>;

  override disconnectedCallback() {
    super.disconnectedCallback();
    if (this._copyTimer) clearTimeout(this._copyTimer);
  }

  private _sanitizeUrl(url: string): string {
    const trimmed = url.trim().toLowerCase();
    if (trimmed.startsWith('javascript:') || trimmed.startsWith('data:') || trimmed.startsWith('vbscript:')) return '#';
    return url;
  }

  private _handleAction(action: CardAction) {
    if (action.disabled) return;
    this.dispatchEvent(new CustomEvent('ai-data-card-action', {
      bubbles: true, composed: true,
      detail: { actionId: action.id, actionLabel: action.label },
    }));
  }

  private async _handleCopy(field: DataField) {
    const text = String(field.value);
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(text);
      } else {
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
      }
      this._copiedField = field.label;
      this.requestUpdate();
      if (this._copyTimer) clearTimeout(this._copyTimer);
      this._copyTimer = setTimeout(() => { this._copiedField = null; this.requestUpdate(); }, 2000);
    } catch { /* silently fail */ }
  }

  private _renderValue(field: DataField) {
    const val = String(field.value);
    const status = field.status || 'neutral';

    switch (field.type) {
      case 'currency':
        return html`<span class="val-currency">${val}</span>`;
      case 'number':
        return html`<span class="val-number">${val}</span>`;
      case 'percent': {
        const num = Number(field.value);
        const pColor = isNaN(num) ? 'var(--cg-color-input-text-placeholder)' : num >= 0 ? 'var(--cg-color-status-success-text-default)' : 'var(--cg-color-status-error-text-default)';
        return html`<span class="val-percent" style="color: ${pColor};">${val}</span>`;
      }
      case 'date':
        return html`<span class="val-date">${val}</span>`;
      case 'status':
        return html`<cg-badge variant="${status === 'error' ? 'danger' : status}" label="${val}" size="sm"></cg-badge>`;
      case 'badge':
        return html`<cg-badge variant="${status === 'error' ? 'danger' : status}" label="${val}" size="sm"></cg-badge>`;
      case 'link':
        return html`<a class="val-link" href="${this._sanitizeUrl(field.url || '#')}" target="_blank" rel="noopener noreferrer">${val}</a>`;
      default:
        return html`<span>${val}</span>`;
    }
  }

  override render() {
    if (this.loading) {
      return html`
        <div class="card skeleton" role="status" aria-label="Loading data">
          <div class="skel-header">
            <div class="skel skel-icon"></div>
            <div class="skel-lines">
              <div class="skel skel-line-lg"></div>
              <div class="skel skel-line-sm"></div>
            </div>
          </div>
          ${[1, 2, 3, 4].map(() => html`
            <div class="skel-row">
              <div class="skel skel-label"></div>
              <div class="skel skel-value"></div>
            </div>
          `)}
        </div>
      `;
    }

    if (this.fields.length === 0 && !this.title) {
      return html`<div class="card"><div class="empty">No data to display</div></div>`;
    }

    return html`
      <div class="card ${this.highlighted ? 'highlighted' : ''}"
        role="region" aria-label="${this.title || 'Data card'}">

        ${this.title ? html`
          <div class="header">
            <div class="header-info">
              <div class="header-title">${this.title}</div>
              ${this.subtitle ? html`<div class="header-subtitle">${this.subtitle}</div>` : nothing}
            </div>
            ${this.headerStatus && this.headerStatusLabel ? html`
              <cg-badge variant="${this.headerStatus === 'error' ? 'danger' : this.headerStatus}" label="${this.headerStatusLabel}" size="sm"></cg-badge>
            ` : nothing}
          </div>
        ` : nothing}

        ${this.fields.length > 0 ? html`
          <div class="rows" role="list">
            ${this.fields.map(field => html`
              <div class="row"
                role="listitem"
                aria-label="${field.label}: ${field.value}">
                <span class="row-label">${field.label}</span>
                <span class="row-value">
                  ${this._renderValue(field)}
                  ${field.copyable ? html`
                    <span class="copy-wrap">
                      <cg-button variant="tertiary" size="sm"
                        status=${this._copiedField === field.label ? 'success' : 'idle'}
                        label="${this._copiedField === field.label ? 'Copied!' : `Copy ${field.label}`}"
                        @click=${(e: Event) => { e.stopPropagation(); this._handleCopy(field); }}>
                        <cg-icon name=${this._copiedField === field.label ? 'check' : 'copy'} size="xs"></cg-icon>
                      </cg-button>
                    </span>
                  ` : nothing}
                </span>
              </div>
            `)}
          </div>
        ` : nothing}

        ${this.actions.length > 0 ? html`
          <div class="footer">
            ${this.actions.map(action => html`
              <cg-button
                variant=${action.variant === 'danger' ? 'tertiary' : action.variant === 'primary' ? 'primary' : 'secondary'}
                size="sm"
                full
                type=${action.variant === 'danger' ? 'danger' : 'normal'}
                ?disabled=${action.disabled}
                @click=${() => this._handleAction(action)}>
                ${action.label}
              </cg-button>
            `)}
          </div>
        ` : nothing}
      </div>
    `;
  }
}
