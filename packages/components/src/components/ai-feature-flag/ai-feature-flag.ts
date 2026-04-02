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
      background: var(--cg-color-surface-base, #18181b);
      color: var(--cg-color-surface-base-text, #fafafa);
      border: 1px solid var(--cg-color-border-default, #27272a);
      border-radius: var(--cg-radius-lg, 12px);
      padding: var(--cg-spacing-16, 16px);
      box-shadow: var(--cg-elevation-1, 0 1px 3px rgba(0,0,0,0.3), 0 1px 2px rgba(0,0,0,0.2)), inset 0 1px 0 0 rgba(255, 255, 255, 0.05);
      background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0.03), transparent);
      animation: fadeSlideIn 200ms var(--cg-motion-easing-enter, cubic-bezier(0, 0, 0.2, 1)) both;
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

    .env-badge {
      padding: 2px 8px;
      border-radius: var(--cg-radius-full, 9999px);
      font-size: 10px;
      font-weight: var(--cg-font-weight-semibold, 600);
      text-transform: uppercase;
      letter-spacing: 0.05em;
      background: rgba(223, 255, 97, 0.1);
      color: var(--cg-color-accent, #dfff61);
    }

    .search-bar {
      margin-bottom: var(--cg-spacing-12, 12px);
    }

    .search-input {
      width: 100%;
      background: var(--cg-color-surface-overlay, #27272a);
      border: 1px solid var(--cg-color-border-default, #3f3f46);
      border-radius: var(--cg-radius-md, 8px);
      padding: 8px 12px;
      color: var(--cg-color-surface-base-text, #fafafa);
      font-size: var(--cg-font-size-sm, 14px);
      font-family: inherit;
      box-sizing: border-box;
    }

    .search-input::placeholder {
      color: var(--cg-color-text-tertiary, #71717a);
    }

    .search-input:focus-visible {
      outline: 2px solid var(--cg-color-accent, #dfff61);
      outline-offset: -2px;
    }

    .group-label {
      font-size: var(--cg-font-size-xs, 12px);
      font-weight: var(--cg-font-weight-semibold, 600);
      color: var(--cg-color-text-tertiary, #71717a);
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin: 12px 0 6px 0;
    }

    .flag-list {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .flag-item {
      display: flex;
      align-items: center;
      gap: var(--cg-spacing-12, 12px);
      padding: 10px 12px;
      background: var(--cg-color-surface-overlay, #27272a);
      border-radius: var(--cg-radius-md, 8px);
      border: 1px solid var(--cg-color-border-default, #27272a);
      cursor: pointer;
    }

    .flag-item:hover {
      border-color: var(--cg-color-border-default, #3f3f46);
    }

    .flag-item:focus-visible {
      outline: 2px solid var(--cg-color-accent, #dfff61);
      outline-offset: 2px;
    }

    .flag-info {
      flex: 1;
      min-width: 0;
    }

    .flag-name {
      font-size: var(--cg-font-size-sm, 14px);
      font-weight: var(--cg-font-weight-medium, 500);
      margin-bottom: 2px;
    }

    .flag-desc {
      font-size: var(--cg-font-size-xs, 12px);
      color: var(--cg-color-text-secondary, #a1a1aa);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .flag-env {
      padding: 2px 6px;
      border-radius: var(--cg-radius-sm, 4px);
      font-size: 10px;
      background: rgba(255, 255, 255, 0.06);
      color: var(--cg-color-text-tertiary, #71717a);
      flex-shrink: 0;
    }

    .toggle-switch {
      position: relative;
      display: inline-block;
      width: 36px;
      height: 20px;
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
      border-radius: 10px;
      border: 1px solid var(--cg-color-border-default, #3f3f46);
      cursor: pointer;
      transition: background 0.15s ease;
    }

    .toggle-track::after {
      content: '';
      position: absolute;
      width: 14px;
      height: 14px;
      border-radius: 50%;
      background: var(--cg-gray-500, #71717a);
      top: 2px;
      left: 2px;
      transition: transform 0.15s ease, background 0.15s ease;
    }

    .toggle-switch input:checked + .toggle-track {
      background: rgba(223, 255, 97, 0.2);
      border-color: var(--cg-color-accent, #dfff61);
    }

    .toggle-switch input:checked + .toggle-track::after {
      transform: translateX(16px);
      background: var(--cg-color-accent, #dfff61);
    }

    .toggle-switch input:focus-visible + .toggle-track {
      outline: 2px solid var(--cg-color-accent, #dfff61);
      outline-offset: 2px;
    }

    .count {
      font-size: var(--cg-font-size-xs, 12px);
      color: var(--cg-color-text-tertiary, #71717a);
      margin-top: var(--cg-spacing-12, 12px);
      text-align: center;
    }

    .empty {
      text-align: center;
      padding: 24px;
      color: var(--cg-color-text-tertiary, #71717a);
      font-size: var(--cg-font-size-sm, 14px);
    }
    }

    /* ── Rounded variants ── */
    :host([rounded="none"]) { border-radius: 0; }
    :host([rounded="sm"]) { border-radius: var(--cg-border-radius-50, 4px); }
    :host([rounded="md"]) { border-radius: var(--cg-border-radius-100, 8px); }
    :host([rounded="lg"]) { border-radius: var(--cg-border-radius-150, 12px); }
    :host([rounded="full"]) { border-radius: var(--cg-border-radius-full, 99999px); }
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
