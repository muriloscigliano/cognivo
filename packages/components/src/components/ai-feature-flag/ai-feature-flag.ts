/**
 * @element ai-feature-flag
 * Feature flag management panel with toggle switches, environment badges, search, and enable/disable grouping.
 *
 * @example
 * ```html
 * <ai-feature-flag
 *   environment="staging"
 *   .flags=${[
 *     {id:'rag', name:'RAG Pipeline', enabled:true, description:'Vector search retrieval'},
 *     {id:'streaming', name:'Streaming', enabled:false}
 *   ]}
 * ></ai-feature-flag>
 * ```
 *
 * @fires {CustomEvent<{id: string, enabled: boolean}>} ai-flag-toggle - Flag toggled on/off
 * @fires {CustomEvent<{id: string}>} ai-flag-click - Flag row clicked
 */
import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { hostBlock, reducedMotion, fadeSlideInKeyframes } from '../../styles/index.js';

export interface FeatureFlag {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  environment?: string;
}

@customElement('ai-feature-flag')
export class AiFeatureFlag extends LitElement {
  static override styles = [hostBlock, reducedMotion, fadeSlideInKeyframes, css`
    :host {
      background: var(--cg-color-surface-base);
      color: var(--cg-color-surface-base-text);
      border: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
      border-radius: var(--cg-border-radius-150);
      padding: var(--cg-spacing-16);
      animation: fadeSlideIn 200ms var(--cg-motion-easing-enter) both;
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

    .env-badge {
      padding: var(--cg-spacing-2) var(--cg-spacing-8);
      border-radius: var(--cg-border-radius-full);
      font-size: var(--cg-font-size-xs);
      font-weight: var(--cg-font-weight-semibold);
      text-transform: uppercase;
      letter-spacing: 0.05em;
      background: var(--cg-overlay-accent-subtle);
      color: var(--cg-color-surface-base-text);
    }

    .search-bar {
      margin-bottom: var(--cg-spacing-12);
    }

    .search-input {
      width: 100%;
      background: var(--cg-color-surface-overlay);
      border: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
      border-radius: var(--cg-border-radius-100);
      padding: var(--cg-spacing-8) var(--cg-spacing-12);
      color: var(--cg-color-surface-base-text);
      font-size: var(--cg-font-size-sm);
      font-family: inherit;
      box-sizing: border-box;
    }

    .search-input::placeholder {
      color: var(--cg-color-input-text-placeholder);
    }

    .search-input:focus-visible {
      outline: 2px solid var(--cg-color-accent-border);
      outline-offset: -2px;
    }

    .group-label {
      font-size: var(--cg-font-size-xs);
      font-weight: var(--cg-font-weight-semibold);
      color: var(--cg-color-input-text-placeholder);
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin: var(--cg-spacing-12) 0 var(--cg-spacing-6) 0;
    }

    .flag-list {
      display: flex;
      flex-direction: column;
      gap: var(--cg-spacing-4);
    }

    .flag-item {
      display: flex;
      align-items: center;
      gap: var(--cg-spacing-12);
      padding: var(--cg-spacing-8) var(--cg-spacing-12);
      background: var(--cg-color-surface-overlay);
      border-radius: var(--cg-border-radius-100);
      border: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
      cursor: pointer;
    }

    .flag-item:hover {
      border-color: var(--cg-color-surface-cards-border);
    }
    .flag-item:active {
      transform: scale(var(--cg-interaction-press-scale));
    }

    .flag-item:focus-visible {
      outline: 2px solid var(--cg-color-accent-border);
      outline-offset: var(--cg-outline-offset-default);
    }

    .flag-info {
      flex: 1;
      min-width: 0;
    }

    .flag-name {
      font-size: var(--cg-font-size-sm);
      font-weight: var(--cg-font-weight-medium);
      margin-bottom: var(--cg-spacing-2);
    }

    .flag-desc {
      font-size: var(--cg-font-size-xs);
      color: var(--cg-color-input-text-placeholder);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .flag-env {
      padding: var(--cg-spacing-2) var(--cg-spacing-6);
      border-radius: var(--cg-border-radius-50);
      font-size: var(--cg-font-size-xs);
      background: var(--cg-overlay-dark-subtle);
      color: var(--cg-color-input-text-placeholder);
      flex-shrink: 0;
    }

    .toggle-switch {
      position: relative;
      display: inline-block;
      width: var(--cg-spacing-32);
      height: var(--cg-spacing-20);
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
      background: var(--cg-overlay-accent-medium);
      border-color: var(--cg-color-surface-base-text);
    }

    .toggle-switch input:checked + .toggle-track::after {
      transform: translateX(var(--cg-spacing-16));
      background: var(--cg-color-action-primary-background-default);
    }

    .toggle-switch input:focus-visible + .toggle-track {
      outline: 2px solid var(--cg-color-accent-border);
      outline-offset: var(--cg-outline-offset-default);
    }

    .count {
      font-size: var(--cg-font-size-xs);
      color: var(--cg-color-input-text-placeholder);
      margin-top: var(--cg-spacing-12);
      text-align: center;
    }

    .empty {
      text-align: center;
      padding: var(--cg-spacing-24);
      color: var(--cg-color-input-text-placeholder);
      font-size: var(--cg-font-size-sm);
    }

    /* ── Rounded variants ── */
    :host([rounded="none"]) { border-radius: 0; }
    :host([rounded="sm"]) { border-radius: var(--cg-border-radius-50); }
    :host([rounded="md"]) { border-radius: var(--cg-border-radius-100); }
    :host([rounded="lg"]) { border-radius: var(--cg-border-radius-150); }
    :host([rounded="full"]) { border-radius: var(--cg-border-radius-full); }
  `];
  @property({ reflect: true }) rounded: 'none' | 'sm' | 'md' | 'lg' | 'full' = 'lg';
  @property({ type: Array }) flags: FeatureFlag[] = [];
  @property({ type: String }) environment = 'production';

  @state() private _search = '';

  private get _filtered(): FeatureFlag[] {
    const q = this._search.toLowerCase();
    return this.flags.filter(f =>
      f.name.toLowerCase().includes(q) || f.description.toLowerCase().includes(q)
    );
  }

  private get _enabled(): FeatureFlag[] {
    return this._filtered.filter(f => f.enabled);
  }

  private get _disabled(): FeatureFlag[] {
    return this._filtered.filter(f => !f.enabled);
  }

  private _onSearch(e: Event): void {
    this._search = (e.target as HTMLInputElement).value;
  }

  private _onToggle(flag: FeatureFlag, e: Event): void {
    e.stopPropagation();
    this.dispatchEvent(new CustomEvent('ai-flag-toggle', {
      bubbles: true, composed: true,
      detail: { id: flag.id, name: flag.name, enabled: !flag.enabled },
    }));
  }

  private _onClick(flag: FeatureFlag): void {
    this.dispatchEvent(new CustomEvent('ai-flag-click', {
      bubbles: true, composed: true,
      detail: { id: flag.id, name: flag.name },
    }));
  }

  private _renderFlag(flag: FeatureFlag) {
    return html`
      <div class="flag-item" role="listitem" tabindex="0"
           @click=${() => this._onClick(flag)}
           @keydown=${(e: KeyboardEvent) => { if (e.key === 'Enter') this._onClick(flag); }}>
        <div class="flag-info">
          <div class="flag-name">${flag.name}</div>
          <div class="flag-desc">${flag.description}</div>
        </div>
        ${flag.environment ? html`<span class="flag-env">${flag.environment}</span>` : nothing}
        <label class="toggle-switch" @click=${(e: Event) => e.stopPropagation()}>
          <input type="checkbox" .checked=${flag.enabled}
                 @change=${(e: Event) => this._onToggle(flag, e)}
                 aria-label="Toggle ${flag.name}" />
          <span class="toggle-track"></span>
        </label>
      </div>
    `;
  }

  override render() {
    return html`
      <div class="header">
        <h3>Feature Flags</h3>
        <span class="env-badge">${this.environment}</span>
      </div>
      <div class="search-bar">
        <input class="search-input" type="text"
               placeholder="Search flags..."
               .value=${this._search}
               @input=${this._onSearch}
               aria-label="Search feature flags"
               tabindex="0" />
      </div>
      ${this._filtered.length === 0 ? html`
        <div class="empty" role="status">No flags found.</div>
      ` : html`
        ${this._enabled.length ? html`
          <div class="group-label">Enabled (${this._enabled.length})</div>
          <div class="flag-list" role="list" aria-label="Enabled flags">
            ${this._enabled.map(f => this._renderFlag(f))}
          </div>
        ` : nothing}
        ${this._disabled.length ? html`
          <div class="group-label">Disabled (${this._disabled.length})</div>
          <div class="flag-list" role="list" aria-label="Disabled flags">
            ${this._disabled.map(f => this._renderFlag(f))}
          </div>
        ` : nothing}
        <div class="count">${this._filtered.length} of ${this.flags.length} flags</div>
      `}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ai-feature-flag': AiFeatureFlag;
  }
}
