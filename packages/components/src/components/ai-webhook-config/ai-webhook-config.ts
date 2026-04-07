/**
 * @element ai-webhook-config
 * Webhook endpoint management panel. Lists configured webhooks with URL,
 * event tags, on/off toggle, test and delete actions. Includes an "Add
 * Webhook" form with URL input and event selection chips.
 *
 * @example
 * ```html
 * <ai-webhook-config
 *   .webhooks=${[{ id: 'wh1', url: 'https://example.com/hook', events: ['model.complete'], active: true }]}
 *   .availableEvents=${['model.complete', 'model.error', 'usage.limit']}
 * ></ai-webhook-config>
 * ```
 *
 * @prop {WebhookEntry[]} webhooks - Array of configured webhook entries
 * @prop {string[]} availableEvents - Event types available for subscription
 *
 * @fires {CustomEvent<{url: string, events: string[]}>} ai-webhook-create - When a new webhook is created
 * @fires {CustomEvent<{id: string, active: boolean}>} ai-webhook-toggle - When a webhook is toggled on/off
 * @fires {CustomEvent<{id: string}>} ai-webhook-delete - When a webhook is deleted
 * @fires {CustomEvent<{id: string, url: string}>} ai-webhook-test - When a webhook test is triggered
 */
import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { hostBlock, reducedMotion, fadeSlideInKeyframes } from '../../styles/index.js';

export interface WebhookEntry {
  id: string;
  url: string;
  events: string[];
  active: boolean;
  lastTriggered?: string;
}

@customElement('ai-webhook-config')
export class AiWebhookConfig extends LitElement {
  static override styles = [hostBlock, reducedMotion, fadeSlideInKeyframes, css`
    :host {
      background: var(--cg-color-surface-base);
      color: var(--cg-color-surface-base-text);
      border: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
      border-radius: var(--cg-border-radius-150);
      padding: var(--cg-spacing-16);
      animation: fadeSlideIn var(--cg-motion-duration-fast) var(--cg-motion-easing-color);
    }
    :host([hidden]) { display: none; }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: var(--cg-spacing-12);
      border-bottom: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
      margin-bottom: var(--cg-spacing-12);
    }

    h3 {
      font-size: var(--cg-font-size-sm);
      font-weight: var(--cg-font-weight-semibold);
      margin: 0;
    }

    .add-btn {
      background: var(--cg-color-action-primary-background-default);
      color: var(--cg-color-surface-container-background);
      border: none;
      border-radius: var(--cg-border-radius-100);
      padding: var(--cg-spacing-6) var(--cg-spacing-12);
      font-size: var(--cg-font-size-xs);
      font-weight: var(--cg-font-weight-semibold);
      cursor: pointer;
      font-family: inherit;
      transition: filter var(--cg-motion-duration-fast) var(--cg-motion-easing-color), transform var(--cg-motion-duration-fast) var(--cg-motion-easing-color);
    }
    .add-btn:hover {
      filter: brightness(1.1);
      transform: translateY(calc(-1 * var(--cg-spacing-1));
    }

    .add-btn:focus-visible {
      outline: 2px solid var(--cg-color-accent-border);
      outline-offset: var(--cg-outline-offset-default);
    }

    .form {
      display: flex;
      flex-direction: column;
      gap: var(--cg-spacing-8);
      padding: var(--cg-spacing-12);
      background: var(--cg-color-surface-overlay);
      border-radius: var(--cg-border-radius-100);
      margin-bottom: var(--cg-spacing-12);
    }

    .form-row {
      display: flex;
      gap: var(--cg-spacing-8);
    }

    input[type="url"] {
      flex: 1;
      background: var(--cg-color-surface-base);
      border: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
      border-radius: var(--cg-border-radius-50);
      padding: var(--cg-spacing-6) var(--cg-spacing-8);
      color: var(--cg-color-surface-base-text);
      font-size: var(--cg-font-size-sm);
      font-family: var(--cg-font-family-mono);
    }

    input[type="url"]:focus-visible {
      outline: 2px solid var(--cg-color-accent-border);
      outline-offset: -2px;
    }

    .events-select {
      display: flex;
      flex-wrap: wrap;
      gap: var(--cg-spacing-4);
    }

    .event-chip {
      display: inline-flex;
      align-items: center;
      gap: var(--cg-spacing-4);
      padding: var(--cg-spacing-3) var(--cg-spacing-8);
      background: transparent;
      border: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
      border-radius: var(--cg-border-radius-full);
      font-size: var(--cg-font-size-xs);
      color: var(--cg-color-input-text-placeholder);
      cursor: pointer;
      font-family: inherit;
    }

    .event-chip:focus-visible {
      outline: 2px solid var(--cg-color-accent-border);
      outline-offset: var(--cg-outline-offset-default);
    }

    .event-chip[aria-pressed="true"] {
      background: var(--cg-overlay-accent-strong);
      border-color: var(--cg-color-surface-base-text);
      color: var(--cg-color-surface-base-text);
    }

    .form-actions {
      display: flex;
      gap: var(--cg-spacing-8);
      justify-content: flex-end;
    }

    .btn-sm {
      background: transparent;
      border: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
      border-radius: var(--cg-border-radius-50);
      padding: var(--cg-spacing-4) var(--cg-spacing-8);
      font-size: var(--cg-font-size-xs);
      color: var(--cg-color-input-text-placeholder);
      cursor: pointer;
      font-family: inherit;
      transition: opacity var(--cg-motion-duration-fast) var(--cg-motion-easing-color);
    }
    .btn-sm:hover {
      border-color: var(--cg-color-surface-base-text);
      color: var(--cg-color-surface-base-text);
      transform: translateY(calc(-1 * var(--cg-spacing-1));
    }

    .btn-sm:focus-visible {
      outline: 2px solid var(--cg-color-accent-border);
      outline-offset: var(--cg-outline-offset-default);
    }

    .btn-sm.primary {
      background: var(--cg-color-action-primary-background-default);
      color: var(--cg-color-surface-container-background);
      border-color: var(--cg-color-surface-base-text);
      font-weight: var(--cg-font-weight-semibold);
    }
    .btn-sm.primary:hover {
      filter: brightness(1.1);
    }

    .webhook-list {
      display: flex;
      flex-direction: column;
      gap: var(--cg-spacing-8);
    }

    .webhook-item {
      padding: var(--cg-spacing-12);
      background: var(--cg-color-surface-overlay);
      border-radius: var(--cg-border-radius-100);
      border: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
    }

    .webhook-top {
      display: flex;
      align-items: center;
      gap: var(--cg-spacing-8);
      margin-bottom: var(--cg-spacing-6);
    }

    .webhook-url {
      flex: 1;
      font-family: var(--cg-font-family-mono);
      font-size: var(--cg-font-size-xs);
      color: var(--cg-color-surface-base-text);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .toggle-switch {
      position: relative;
      display: inline-block;
      width: var(--cg-spacing-32);
      height: var(--cg-spacing-16);
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
      background: var(--cg-color-surface-base);
      border-radius: var(--cg-border-radius-full);
      border: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
      cursor: pointer;
      transition: background var(--cg-motion-duration-fast) var(--cg-motion-easing-color);
    }

    .toggle-track::after {
      content: '';
      position: absolute;
      width: var(--cg-spacing-12);
      height: var(--cg-spacing-12);
      border-radius: 50%;
      background: var(--cg-color-input-text-placeholder);
      top: var(--cg-spacing-2);
      left: var(--cg-spacing-2);
      transition: transform var(--cg-motion-duration-fast) var(--cg-motion-easing-color), background var(--cg-motion-duration-fast) var(--cg-motion-easing-color);
    }

    .toggle-switch input:checked + .toggle-track {
      background: var(--cg-overlay-accent-strong);
      border-color: var(--cg-color-surface-base-text);
    }

    .toggle-switch input:checked + .toggle-track::after {
      transform: translateX(var(--cg-spacing-12);
      background: var(--cg-color-action-primary-background-default);
    }

    .toggle-switch input:focus-visible + .toggle-track {
      outline: 2px solid var(--cg-color-accent-border);
      outline-offset: var(--cg-outline-offset-default);
    }

    .webhook-events {
      display: flex;
      flex-wrap: wrap;
      gap: var(--cg-spacing-4);
      margin-bottom: var(--cg-spacing-6);
    }

    .event-tag {
      padding: var(--cg-spacing-2) var(--cg-spacing-6);
      background: var(--cg-overlay-accent-medium);
      border-radius: var(--cg-border-radius-50);
      font-size: var(--cg-font-size-xs);
      color: var(--cg-color-surface-base-text);
    }

    .webhook-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .last-triggered {
      font-size: var(--cg-font-size-xs);
      color: var(--cg-color-input-text-placeholder);
    }

    .webhook-actions {
      display: flex;
      gap: var(--cg-spacing-4);
    }

    .btn-sm.danger {
      color: var(--cg-color-status-error-text);
      border-color: var(--cg-color-status-error-text);
    }
    .btn-sm.danger:hover {
      background: var(--cg-color-status-error-background-default);
    }

    .empty {
      text-align: center;
      padding: var(--cg-spacing-24);
      color: var(--cg-color-input-text-placeholder);
      font-size: var(--cg-font-size-sm);
    }

  `];

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
                  <button class="btn-sm danger" @click=${() => this._onDelete(wh)}
                          aria-label="Delete webhook" tabindex="0">Delete</button>
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
