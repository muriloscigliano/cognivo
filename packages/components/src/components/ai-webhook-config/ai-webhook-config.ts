/**
 * <ai-webhook-config> — Webhook endpoint configuration panel.
 *
 * Props: webhooks, availableEvents
 * Events: ai-webhook-create, ai-webhook-toggle, ai-webhook-delete, ai-webhook-test
 * Features: Webhook list with URL, event tags, toggle on/off, delete, "Test" button, add new webhook form
 */
import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

export interface WebhookEntry {
  id: string;
  url: string;
  events: string[];
  active: boolean;
  lastTriggered?: string;
}

@customElement('ai-webhook-config')
export class AiWebhookConfig extends LitElement {
  static override styles = css`
    :host {
      display: block;
      font-family: var(--cg-font-family-primary, 'Inter Variable', 'Inter', -apple-system, sans-serif);
      background: var(--cg-color-surface-base, #18181b);
      color: var(--cg-color-surface-base-text, #fafafa);
      border: 1px solid var(--cg-color-border-default, #27272a);
      border-radius: var(--cg-radius-lg, 12px);
      padding: var(--cg-spacing-16, 16px);
    }
    :host([hidden]) { display: none; }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: var(--cg-spacing-12, 12px);
    }

    h3 {
      font-size: var(--cg-font-size-sm, 14px);
      font-weight: var(--cg-font-weight-semibold, 600);
      margin: 0;
    }

    .add-btn {
      background: var(--cg-color-accent, #dfff61);
      color: #18181b;
      border: none;
      border-radius: var(--cg-radius-md, 8px);
      padding: 6px 12px;
      font-size: var(--cg-font-size-xs, 12px);
      font-weight: var(--cg-font-weight-semibold, 600);
      cursor: pointer;
      font-family: inherit;
    }

    .add-btn:focus-visible {
      outline: 2px solid var(--cg-color-accent, #dfff61);
      outline-offset: 2px;
    }

    .form {
      display: flex;
      flex-direction: column;
      gap: 8px;
      padding: var(--cg-spacing-12, 12px);
      background: var(--cg-color-surface-overlay, #27272a);
      border-radius: var(--cg-radius-md, 8px);
      margin-bottom: var(--cg-spacing-12, 12px);
    }

    .form-row {
      display: flex;
      gap: 8px;
    }

    input[type="url"] {
      flex: 1;
      background: var(--cg-color-surface-base, #18181b);
      border: 1px solid var(--cg-color-border-default, #3f3f46);
      border-radius: var(--cg-radius-sm, 4px);
      padding: 6px 10px;
      color: var(--cg-color-surface-base-text, #fafafa);
      font-size: var(--cg-font-size-sm, 14px);
      font-family: var(--cg-font-family-mono, 'JetBrains Mono', monospace);
    }

    input[type="url"]:focus-visible {
      outline: 2px solid var(--cg-color-accent, #dfff61);
      outline-offset: -2px;
    }

    .events-select {
      display: flex;
      flex-wrap: wrap;
      gap: 4px;
    }

    .event-chip {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 3px 8px;
      background: transparent;
      border: 1px solid var(--cg-color-border-default, #3f3f46);
      border-radius: var(--cg-radius-full, 9999px);
      font-size: 10px;
      color: var(--cg-color-text-secondary, #a1a1aa);
      cursor: pointer;
      font-family: inherit;
    }

    .event-chip:focus-visible {
      outline: 2px solid var(--cg-color-accent, #dfff61);
      outline-offset: 2px;
    }

    .event-chip[aria-pressed="true"] {
      background: rgba(223, 255, 97, 0.15);
      border-color: var(--cg-color-accent, #dfff61);
      color: var(--cg-color-accent, #dfff61);
    }

    .form-actions {
      display: flex;
      gap: 8px;
      justify-content: flex-end;
    }

    .btn-sm {
      background: transparent;
      border: 1px solid var(--cg-color-border-default, #3f3f46);
      border-radius: var(--cg-radius-sm, 4px);
      padding: 4px 10px;
      font-size: var(--cg-font-size-xs, 12px);
      color: var(--cg-color-text-secondary, #a1a1aa);
      cursor: pointer;
      font-family: inherit;
    }

    .btn-sm:focus-visible {
      outline: 2px solid var(--cg-color-accent, #dfff61);
      outline-offset: 2px;
    }

    .btn-sm.primary {
      background: var(--cg-color-accent, #dfff61);
      color: #18181b;
      border-color: var(--cg-color-accent, #dfff61);
      font-weight: var(--cg-font-weight-semibold, 600);
    }

    .webhook-list {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .webhook-item {
      padding: var(--cg-spacing-12, 12px);
      background: var(--cg-color-surface-overlay, #27272a);
      border-radius: var(--cg-radius-md, 8px);
      border: 1px solid var(--cg-color-border-default, #27272a);
    }

    .webhook-top {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 6px;
    }

    .webhook-url {
      flex: 1;
      font-family: var(--cg-font-family-mono, 'JetBrains Mono', monospace);
      font-size: var(--cg-font-size-xs, 12px);
      color: var(--cg-color-surface-base-text, #fafafa);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .toggle-switch {
      position: relative;
      display: inline-block;
      width: 32px;
      height: 18px;
      flex-shrink: 0;
    }

    .toggle-switch input {
      opacity: 0;
      width: 0;
      height: 0;
      position: absolute;
    }

    .toggle-track {
      position: absolute;
      inset: 0;
      background: var(--cg-color-surface-base, #18181b);
      border-radius: 9px;
      border: 1px solid var(--cg-color-border-default, #3f3f46);
      cursor: pointer;
      transition: background 0.15s ease;
    }

    .toggle-track::after {
      content: '';
      position: absolute;
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: #71717a;
      top: 2px;
      left: 2px;
      transition: transform 0.15s ease, background 0.15s ease;
    }

    .toggle-switch input:checked + .toggle-track {
      background: rgba(223, 255, 97, 0.2);
      border-color: var(--cg-color-accent, #dfff61);
    }

    .toggle-switch input:checked + .toggle-track::after {
      transform: translateX(14px);
      background: var(--cg-color-accent, #dfff61);
    }

    .toggle-switch input:focus-visible + .toggle-track {
      outline: 2px solid var(--cg-color-accent, #dfff61);
      outline-offset: 2px;
    }

    .webhook-events {
      display: flex;
      flex-wrap: wrap;
      gap: 4px;
      margin-bottom: 6px;
    }

    .event-tag {
      padding: 2px 6px;
      background: rgba(223, 255, 97, 0.1);
      border-radius: var(--cg-radius-sm, 4px);
      font-size: 10px;
      color: var(--cg-color-accent, #dfff61);
    }

    .webhook-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .last-triggered {
      font-size: 10px;
      color: var(--cg-color-text-tertiary, #71717a);
    }

    .webhook-actions {
      display: flex;
      gap: 4px;
    }

    .empty {
      text-align: center;
      padding: 24px;
      color: var(--cg-color-text-tertiary, #71717a);
      font-size: var(--cg-font-size-sm, 14px);
    }

    @media (prefers-reduced-motion: reduce) {
      .toggle-track, .toggle-track::after { transition: none; }
    }
  `;

  @property({ type: Array }) webhooks: WebhookEntry[] = [];
  @property({ type: Array }) availableEvents: string[] = [];

  @state() private _showForm = false;
  @state() private _newUrl = '';
  @state() private _selectedEvents = new Set<string>();

  private _toggleForm(): void {
    this._showForm = !this._showForm;
    this._newUrl = '';
    this._selectedEvents = new Set();
  }

  private _toggleEvent(evt: string): void {
    const next = new Set(this._selectedEvents);
    if (next.has(evt)) next.delete(evt); else next.add(evt);
    this._selectedEvents = next;
  }

  private _onCreate(): void {
    if (!this._newUrl) return;
    this.dispatchEvent(new CustomEvent('ai-webhook-create', {
      bubbles: true, composed: true,
      detail: { url: this._newUrl, events: [...this._selectedEvents] },
    }));
    this._toggleForm();
  }

  private _onToggle(wh: WebhookEntry): void {
    this.dispatchEvent(new CustomEvent('ai-webhook-toggle', {
      bubbles: true, composed: true,
      detail: { id: wh.id, active: !wh.active },
    }));
  }

  private _onDelete(wh: WebhookEntry): void {
    this.dispatchEvent(new CustomEvent('ai-webhook-delete', {
      bubbles: true, composed: true,
      detail: { id: wh.id },
    }));
  }

  private _onTest(wh: WebhookEntry): void {
    this.dispatchEvent(new CustomEvent('ai-webhook-test', {
      bubbles: true, composed: true,
      detail: { id: wh.id, url: wh.url },
    }));
  }

  override render() {
    return html`
      <div class="header">
        <h3>Webhooks</h3>
        <button class="add-btn" @click=${this._toggleForm}
                aria-label="${this._showForm ? 'Cancel' : 'Add webhook'}"
                tabindex="0">
          ${this._showForm ? 'Cancel' : '+ Add Webhook'}
        </button>
      </div>
      ${this._showForm ? html`
        <div class="form" role="form" aria-label="New webhook form">
          <div class="form-row">
            <input type="url" placeholder="https://example.com/webhook"
                   .value=${this._newUrl}
                   @input=${(e: Event) => { this._newUrl = (e.target as HTMLInputElement).value; }}
                   aria-label="Webhook URL" tabindex="0" />
          </div>
          <div class="events-select" role="group" aria-label="Select events">
            ${this.availableEvents.map(evt => html`
              <button class="event-chip"
                      aria-pressed=${this._selectedEvents.has(evt) ? 'true' : 'false'}
                      @click=${() => this._toggleEvent(evt)}
                      tabindex="0">
                ${evt}
              </button>
            `)}
          </div>
          <div class="form-actions">
            <button class="btn-sm" @click=${this._toggleForm} tabindex="0">Cancel</button>
            <button class="btn-sm primary" @click=${this._onCreate} tabindex="0">Create</button>
          </div>
        </div>
      ` : nothing}
      ${this.webhooks.length === 0 ? html`
        <div class="empty" role="status">No webhooks configured.</div>
      ` : html`
        <div class="webhook-list" role="list" aria-label="Configured webhooks">
          ${this.webhooks.map(wh => html`
            <div class="webhook-item" role="listitem">
              <div class="webhook-top">
                <span class="webhook-url">${wh.url}</span>
                <label class="toggle-switch">
                  <input type="checkbox" .checked=${wh.active}
                         @change=${() => this._onToggle(wh)}
                         aria-label="Toggle webhook ${wh.url}" />
                  <span class="toggle-track"></span>
                </label>
              </div>
              <div class="webhook-events">
                ${wh.events.map(e => html`<span class="event-tag">${e}</span>`)}
              </div>
              <div class="webhook-footer">
                <span class="last-triggered">
                  ${wh.lastTriggered ? `Last triggered: ${wh.lastTriggered}` : 'Never triggered'}
                </span>
                <div class="webhook-actions">
                  <button class="btn-sm" @click=${() => this._onTest(wh)}
                          aria-label="Test webhook" tabindex="0">Test</button>
                  <button class="btn-sm" @click=${() => this._onDelete(wh)}
                          aria-label="Delete webhook" tabindex="0"
                          style="color:#f87171;border-color:#f87171">Delete</button>
                </div>
              </div>
            </div>
          `)}
        </div>
      `}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ai-webhook-config': AiWebhookConfig;
  }
}
