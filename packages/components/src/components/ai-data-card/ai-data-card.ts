/**
 * <ai-data-card> — Compact Inline Data Display
 *
 * A mini key-value table for embedding in chat messages, tool results,
 * insight cards. Shows structured data like invoices, orders, summaries.
 *
 * Features:
 * - Key-value rows with optional type formatting (currency, date, status, badge)
 * - Header with title, icon, and optional action button
 * - Status row with color-coded dot
 * - Footer with optional action buttons
 * - Compact and expanded modes
 * - Loading skeleton
 * - Clickable rows
 * - Dark-first, fully accessible
 */
import { LitElement, html, css, nothing } from 'lit';
import { property, customElement } from 'lit/decorators.js';

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
  static override styles = css`
    :host {
      transition: color 100ms cubic-bezier(0, 0, 0.58, 1);
      animation: fadeSlideIn 200ms cubic-bezier(0, 0, 0.58, 1);
      display: block;
      font-family: var(--cg-font-family-primary, 'Inter Variable', 'Inter', -apple-system, sans-serif);
    }

    .card {
      background: var(--cg-color-surface-container-background, #18181b);
      border: 1px solid var(--cg-color-surface-container-border, #27272a);
      border-radius: 12px;
      overflow: hidden;
      transition: border-color 150ms;
    }
    .card:hover {
      border-color: var(--cg-gray-600, #52525b);
    }

    /* ── Header ── */
    .header {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 12px 16px;
      border-bottom: 1px solid var(--cg-gray-800, #27272a);
    }
    .header-icon {
      width: 32px;
      height: 32px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      flex-shrink: 0;
      background: rgba(223, 255, 97, 0.08);
    }
    .header-info {
      flex: 1;
      min-width: 0;
    }
    .header-title {
      font-size: 14px;
      font-weight: 700;
      color: var(--cg-color-surface-base-text, #fafafa);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .header-subtitle {
      font-size: 11px;
      color: var(--cg-gray-500, #71717a);
      margin-top: 1px;
    }
    .header-badge {
      font-size: 10px;
      font-weight: 700;
      padding: 2px 8px;
      border-radius: 4px;
      flex-shrink: 0;
      text-transform: uppercase;
    }
    .header-badge.success { background: rgba(34, 197, 94, 0.12); color: #4ade80; }
    .header-badge.warning { background: rgba(245, 158, 11, 0.12); color: #fbbf24; }
    .header-badge.error { background: rgba(239, 68, 68, 0.12); color: #f87171; }
    .header-badge.info { background: rgba(59, 130, 246, 0.12); color: #60a5fa; }
    .header-badge.neutral { background: var(--cg-gray-800, #27272a); color: var(--cg-gray-400, #a1a1aa); }

    /* ── Rows ── */
    .rows {
      padding: 0;
    }
    .row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 8px 16px;
      border-bottom: 1px solid var(--cg-gray-800, #27272a);
      transition: background 100ms;
      min-height: 36px;
    }
    .row:last-child {
      border-bottom: none;
    }
    .row:hover {
      background: rgba(255, 255, 255, 0.02);
    }
    .row.clickable {
      cursor: pointer;
    }
    .row.clickable:focus-visible {
      outline: 2px solid var(--cg-brand-ai-accent, #dfff61);
      outline-offset: -2px;
    }

    .row-label {
      font-size: 12px;
      color: var(--cg-gray-400, #a1a1aa);
      font-weight: 500;
      flex-shrink: 0;
      min-width: 80px;
    }
    .row-value {
      font-size: 13px;
      font-weight: 600;
      color: var(--cg-color-surface-base-text, #fafafa);
      text-align: right;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    /* ── Value types ── */
    .val-currency {
      font-family: var(--cg-font-family-mono, 'Fira Code', monospace);
      font-weight: 700;
      color: var(--cg-brand-ai-accent, #dfff61);
    }
    .val-number {
      font-family: var(--cg-font-family-mono, 'Fira Code', monospace);
      color: var(--cg-color-surface-base-text, #fafafa);
    }
    .val-percent {
      font-family: var(--cg-font-family-mono, 'Fira Code', monospace);
    }
    .val-date {
      color: var(--cg-gray-300, #d4d4d8);
    }
    .val-link {
      color: var(--cg-brand-ai-accent, #dfff61);
      text-decoration: none;
      cursor: pointer;
    }
    .val-link:hover {
      text-decoration: underline;
    }

    /* Status dot */
    .status-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      flex-shrink: 0;
    }
    .status-dot.success { background: #4ade80; }
    .status-dot.warning { background: #fbbf24; }
    .status-dot.error { background: #f87171; }
    .status-dot.info { background: #60a5fa; }
    .status-dot.neutral { background: var(--cg-gray-500, #71717a); }

    /* Badge value */
    .val-badge {
      font-size: 10px;
      font-weight: 700;
      padding: 2px 8px;
      border-radius: 4px;
    }
    .val-badge.success { background: rgba(34, 197, 94, 0.12); color: #4ade80; }
    .val-badge.warning { background: rgba(245, 158, 11, 0.12); color: #fbbf24; }
    .val-badge.error { background: rgba(239, 68, 68, 0.12); color: #f87171; }
    .val-badge.info { background: rgba(59, 130, 246, 0.12); color: #60a5fa; }
    .val-badge.neutral { background: var(--cg-gray-800, #27272a); color: var(--cg-gray-400, #a1a1aa); }

    /* Copy button */
    .copy-btn {
      background: none;
      border: none;
      color: var(--cg-gray-600, #52525b);
      cursor: pointer;
      padding: 2px;
      font-size: 11px;
      transition: color 150ms;
      flex-shrink: 0;
    }
    .copy-btn:hover { color: var(--cg-brand-ai-accent, #dfff61); }
    .copy-btn.copied { color: #4ade80; }

    /* ── Footer ── */
    .footer {
      display: flex;
      gap: 8px;
      padding: 10px 16px;
      border-top: 1px solid var(--cg-gray-800, #27272a);
    }
    .action-btn {
      flex: 1;
      padding: 7px 14px;
      border-radius: 8px;
      border: 1px solid var(--cg-gray-700, #3f3f46);
      background: none;
      color: var(--cg-gray-300, #d4d4d8);
      font: inherit;
      font-size: 12px;
      font-weight: 600;
      cursor: pointer;
      transition: all 150ms;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 5px;
    }
    .action-btn:hover {
      border-color: var(--cg-gray-600, #52525b);
      background: rgba(255, 255, 255, 0.03);
    }
    .action-btn:focus-visible {
      outline: 2px solid var(--cg-brand-ai-accent, #dfff61);
      outline-offset: 2px;
    }
    .action-btn:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }
    .action-btn.primary {
      background: var(--cg-brand-ai-accent, #dfff61);
      color: #000;
      border-color: transparent;
    }
    .action-btn.primary:hover { filter: brightness(1.1); }
    .action-btn.danger {
      border-color: rgba(239, 68, 68, 0.3);
      color: #f87171;
    }
    .action-btn.danger:hover { background: rgba(239, 68, 68, 0.08); }
    .action-btn .btn-icon { font-size: 13px; }

    /* ── Compact mode ── */
    :host([compact]) .header { padding: 8px 12px; }
    :host([compact]) .header-icon { width: 24px; height: 24px; font-size: 12px; border-radius: 6px; }
    :host([compact]) .header-title { font-size: 12px; }
    :host([compact]) .row { padding: 5px 12px; min-height: 28px; }
    :host([compact]) .row-label { font-size: 11px; min-width: 60px; }
    :host([compact]) .row-value { font-size: 12px; }
    :host([compact]) .footer { padding: 8px 12px; }
    :host([compact]) .action-btn { padding: 5px 10px; font-size: 11px; }

    /* ── Highlighted / selected ── */
    .card.highlighted {
      border-color: var(--cg-brand-ai-accent, #dfff61);
      box-shadow: 0 0 0 1px rgba(223, 255, 97, 0.1);
    }

    /* ── Loading skeleton ── */
    .skeleton .skel {
      border-radius: 6px;
      background: linear-gradient(90deg, var(--cg-gray-800, #27272a) 25%, var(--cg-gray-700, #3f3f46) 50%, var(--cg-gray-800, #27272a) 75%);
      background-size: 200% 100%;
      animation: shimmer 1.5s linear infinite;
    }
    .skel-header { display: flex; gap: 10px; padding: 12px 16px; border-bottom: 1px solid var(--cg-gray-800, #27272a); }
    .skel-icon { width: 32px; height: 32px; border-radius: 8px; }
    .skel-lines { flex: 1; display: flex; flex-direction: column; gap: 6px; justify-content: center; }
    .skel-line-lg { height: 12px; width: 60%; }
    .skel-line-sm { height: 8px; width: 35%; }
    .skel-row { display: flex; justify-content: space-between; padding: 10px 16px; border-bottom: 1px solid var(--cg-gray-800, #27272a); }
    .skel-row:last-child { border-bottom: none; }
    .skel-label { height: 10px; width: 30%; }
    .skel-value { height: 10px; width: 40%; }

    @keyframes shimmer {
      0% { background-position: 200% 0; }
      100% { background-position: -200% 0; }
    }

    /* ── Empty state ── */
    .empty {
      padding: 24px;
      text-align: center;
      color: var(--cg-gray-500, #71717a);
      font-size: 12px;
    }

    @media (prefers-reduced-motion: reduce) {
      .card, .row, .action-btn, .copy-btn { transition: none; }
      .skeleton .skel { animation: none; background: var(--cg-gray-800, #27272a); }
    }
  
    @keyframes fadeSlideIn {
      from { opacity: 0; transform: translateY(4px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `;

  /** Card title */
  @property({ type: String }) title: string = '';

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

  private _handleRowClick(field: DataField) {
    this.dispatchEvent(new CustomEvent('ai-data-card-row-click', {
      bubbles: true, composed: true,
      detail: { label: field.label, value: field.value, type: field.type },
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
        const pColor = isNaN(num) ? 'var(--cg-gray-400, #a1a1aa)' : num >= 0 ? '#4ade80' : '#f87171';
        return html`<span class="val-percent" style="color: ${pColor};">${val}</span>`;
      }
      case 'date':
        return html`<span class="val-date">${val}</span>`;
      case 'status':
        return html`<span class="status-dot ${status}" aria-hidden="true"></span><span>${val}</span>`;
      case 'badge':
        return html`<span class="val-badge ${status}">${val}</span>`;
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
            ${this.icon ? html`<div class="header-icon" aria-hidden="true">${this.icon}</div>` : nothing}
            <div class="header-info">
              <div class="header-title">${this.title}</div>
              ${this.subtitle ? html`<div class="header-subtitle">${this.subtitle}</div>` : nothing}
            </div>
            ${this.headerStatus && this.headerStatusLabel ? html`
              <span class="header-badge ${this.headerStatus}">${this.headerStatusLabel}</span>
            ` : nothing}
          </div>
        ` : nothing}

        ${this.fields.length > 0 ? html`
          <div class="rows" role="list">
            ${this.fields.map(field => html`
              <div class="row ${field.copyable || field.url ? 'clickable' : ''}"
                role="listitem"
                tabindex="${field.copyable || field.url ? '0' : '-1'}"
                aria-label="${field.label}: ${field.value}"
                @click=${() => this._handleRowClick(field)}
                @keydown=${(e: KeyboardEvent) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); this._handleRowClick(field); } }}>
                <span class="row-label">${field.label}</span>
                <span class="row-value">
                  ${this._renderValue(field)}
                  ${field.copyable ? html`
                    <button class="copy-btn ${this._copiedField === field.label ? 'copied' : ''}"
                      @click=${(e: Event) => { e.stopPropagation(); this._handleCopy(field); }}
                      aria-label="Copy ${field.label}"
                      title="${this._copiedField === field.label ? 'Copied!' : 'Copy'}">
                      ${this._copiedField === field.label ? '✓' : '📋'}
                    </button>
                  ` : nothing}
                </span>
              </div>
            `)}
          </div>
        ` : nothing}

        ${this.actions.length > 0 ? html`
          <div class="footer">
            ${this.actions.map(action => html`
              <button class="action-btn ${action.variant || 'secondary'}"
                ?disabled=${action.disabled}
                aria-label="${action.label}"
                @click=${() => this._handleAction(action)}>
                ${action.icon ? html`<span class="btn-icon" aria-hidden="true">${action.icon}</span>` : nothing}
                ${action.label}
              </button>
            `)}
          </div>
        ` : nothing}
      </div>
    `;
  }
}
