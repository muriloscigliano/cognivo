/**
 * @element ai-changelog
 * Timeline-style version history feed with type badges, expandable details, and rollback buttons.
 *
 * @example
 * ```html
 * <ai-changelog .entries=${[
 *   {version:'v2.1', date:'2024-03-15', type:'model', changes:'Upgraded to GPT-4o', author:'ops'},
 *   {version:'v2.0', date:'2024-03-01', type:'prompt', changes:'Revised system prompt'}
 * ]}></ai-changelog>
 * ```
 *
 * @fires {CustomEvent<{version, type, date}>} ai-changelog-entry-click - Entry card clicked
 * @fires {CustomEvent<{version, type}>} ai-changelog-rollback - Rollback button clicked
 */
import { LitElement, html, css, nothing } from 'lit';
import { property, state, customElement } from 'lit/decorators.js';
import { hostBlock, reducedMotion, fadeSlideInKeyframes } from '../../styles/index.js';

interface ChangelogEntry {
  version: string;
  date: string;
  author?: string;
  changes: string;
  type: 'model' | 'prompt' | 'config' | 'data';
}

const TYPE_CSS_CLASS: Record<string, string> = {
  model: 'type-model',
  prompt: 'type-prompt',
  config: 'type-config',
  data: 'type-data',
};

@customElement('ai-changelog')
export class AiChangelog extends LitElement {
  static override styles = [hostBlock, reducedMotion, fadeSlideInKeyframes, css`
    :host {
      animation: fadeSlideIn var(--cg-transition-duration-default) var(--cg-transition-easing-ease-out) both;
    }
    :host([hidden]) { display: none; }

    .container {
      background: var(--cg-color-surface-container-background);
      border: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
      border-radius: var(--cg-border-radius-150);
      padding: var(--cg-spacing-16);
      color: var(--cg-color-surface-base-text);
    }

    .header {
      font-size: var(--cg-font-size-sm);
      font-weight: var(--cg-font-weight-semibold);
      margin-bottom: var(--cg-spacing-16);
    }

    .timeline {
      position: relative;
      padding-left: var(--cg-spacing-20);
    }

    .timeline::before {
      content: '';
      position: absolute;
      left: var(--cg-spacing-6);
      top: var(--cg-spacing-4);
      bottom: var(--cg-spacing-4);
      width: var(--cg-spacing-2);
      background: var(--cg-color-surface-cards-border);
    }

    .entry {
      position: relative;
      margin-bottom: var(--cg-spacing-12);
    }

    .entry-dot {
      position: absolute;
      left: calc(-1 * var(--cg-spacing-20));
      top: var(--cg-spacing-6);
      width: var(--cg-spacing-8);
      height: var(--cg-spacing-8);
      border-radius: 50%;
      background: var(--cg-color-surface-cards-border);
      border: var(--cg-border-width-100) solid var(--cg-color-surface-container-background);
      z-index: 1;
    }

    .entry-card {
      background: var(--cg-color-surface-base-background);
      border: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
      border-radius: var(--cg-border-radius-100);
      padding: var(--cg-spacing-12);
    }

    .entry-top {
      display: flex;
      align-items: center;
      gap: var(--cg-spacing-8);
      flex-wrap: wrap;
    }

    .version {
      appearance: none;
      background: transparent;
      border: none;
      padding: 0;
      font-family: inherit;
      font-size: var(--cg-font-size-sm);
      font-weight: var(--cg-font-weight-bold);
      color: var(--cg-color-surface-base-text);
      cursor: pointer;
      transition: color var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
    }
    .version:hover { color: var(--cg-color-action-primary-background-default); }
    .version:active { transform: scale(var(--cg-interaction-press-scale)); }
    .version:focus-visible {
      outline: var(--cg-border-width-100) solid var(--cg-color-focus-ring);
      outline-offset: var(--cg-outline-offset-default);
    }

    .type-badge {
      font-size: var(--cg-font-size-xs);
      font-weight: var(--cg-font-weight-bold);
      text-transform: uppercase;
      letter-spacing: var(--cg-letter-spacing-wide);
      padding: var(--cg-spacing-2) var(--cg-spacing-8);
      border-radius: var(--cg-border-radius-50);
    }
    .type-badge.type-model {
      background: var(--cg-color-status-info-background-default);
      color: var(--cg-color-status-info-text-default);
    }
    .type-badge.type-prompt {
      background: var(--cg-overlay-accent-subtle);
      color: var(--cg-color-surface-base-text);
    }
    .type-badge.type-config {
      background: var(--cg-color-status-warning-background-default);
      color: var(--cg-color-status-warning-text-default);
    }
    .type-badge.type-data {
      background: var(--cg-color-status-success-background-default);
      color: var(--cg-color-status-success-text-default);
    }

    .entry-dot.type-model { background: var(--cg-color-status-info-text-default); }
    .entry-dot.type-prompt { background: var(--cg-color-action-primary-background-default); }
    .entry-dot.type-config { background: var(--cg-color-status-warning-text-default); }
    .entry-dot.type-data { background: var(--cg-color-status-success-text-default); }

    .entry-meta {
      display: flex;
      gap: var(--cg-spacing-8);
      font-size: var(--cg-font-size-xs);
      color: var(--cg-color-input-text-placeholder);
      margin-top: var(--cg-spacing-4);
    }

    .changes-preview {
      font-size: var(--cg-font-size-sm);
      color: var(--cg-color-input-text-placeholder);
      margin-top: var(--cg-spacing-6);
      line-height: var(--cg-line-height-normal);
      overflow: hidden;
      max-height: var(--cg-spacing-40);
      transition: max-height var(--cg-transition-duration-default) var(--cg-transition-easing-default);
    }
    .changes-preview.expanded {
      max-height: var(--_ai-changelog-expanded-max-height, 500px);
    }

    .expand-toggle {
      background: transparent;
      border: none;
      color: var(--cg-color-input-text-placeholder);
      font-size: var(--cg-font-size-xs);
      cursor: pointer;
      padding: var(--cg-spacing-4) 0;
      margin-top: var(--cg-spacing-4);
      transition: color var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
    }
    .expand-toggle:hover { color: var(--cg-color-surface-base-text); }
    .expand-toggle:focus-visible {
      outline: var(--cg-border-width-100) solid var(--cg-color-focus-ring);
      outline-offset: var(--cg-outline-offset-default);
    }

    .entry-actions {
      display: flex;
      justify-content: flex-end;
      margin-top: var(--cg-spacing-8);
    }

    .rollback-btn {
      background: transparent;
      border: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);
      color: var(--cg-color-input-text-placeholder);
      font-size: var(--cg-font-size-xs);
      font-weight: var(--cg-font-weight-semibold);
      padding: var(--cg-spacing-4) var(--cg-spacing-8);
      border-radius: var(--cg-border-radius-100);
      cursor: pointer;
      transition: border-color var(--cg-transition-duration-default) var(--cg-transition-easing-default), color var(--cg-transition-duration-default) var(--cg-transition-easing-default);
    }
    .rollback-btn:active { transform: scale(var(--cg-interaction-press-scale)); }
    .rollback-btn:hover {
      border-color: var(--cg-color-status-warning-text-default);
      color: var(--cg-color-status-warning-text-default);
    }
    .rollback-btn:focus-visible {
      outline: var(--cg-border-width-100) solid var(--cg-color-focus-ring);
      outline-offset: var(--cg-outline-offset-default);
    }

    .empty-state {
      text-align: center;
      color: var(--cg-color-empty-state-text-secondary);
      font-size: var(--cg-font-size-sm);
      padding: var(--cg-spacing-24) 0;
    }
  `];
  @property({ type: Array }) entries: ChangelogEntry[] = [];

  @state() private _expandedSet = new Set<string>();

  private _toggle(id: string) {
    if (this._expandedSet.has(id)) {
      this._expandedSet.delete(id);
    } else {
      this._expandedSet.add(id);
    }
    this.requestUpdate();
  }

  private _handleClick(entry: ChangelogEntry) {
    this.dispatchEvent(new CustomEvent('ai-changelog-entry-click', {
      detail: { version: entry.version, type: entry.type, date: entry.date },
      bubbles: true,
      composed: true,
    }));
  }

  private _handleRollback(e: Event, entry: ChangelogEntry) {
    e.stopPropagation();
    this.dispatchEvent(new CustomEvent('ai-changelog-rollback', {
      detail: { version: entry.version, type: entry.type },
      bubbles: true,
      composed: true,
    }));
  }

  override render() {
    if (!this.entries.length) {
      return html`<div class="container"><div class="empty-state" role="status">No changelog entries</div></div>`;
    }

    return html`
      <div class="container" role="region" aria-label="Changelog">
        <div class="header">Changelog</div>

        <div class="timeline" role="list" aria-label="Version history">
          ${this.entries.map((entry, i) => {
            const id = `${entry.version}-${i}`;
            const expanded = this._expandedSet.has(id);
            const typeCls = TYPE_CSS_CLASS[entry.type] || TYPE_CSS_CLASS.config;

            return html`
              <div class="entry" role="listitem">
                <div class="entry-dot ${typeCls}" aria-hidden="true"></div>
                <div class="entry-card">
                  <div class="entry-top">
                    <button
                      class="version"
                      @click=${() => this._handleClick(entry)}
                      aria-label="Version ${entry.version}, ${entry.type} change on ${entry.date}"
                    >${entry.version}</button>
                    <span
                      class="type-badge ${typeCls}"
                    >${entry.type}</span>
                  </div>

                  <div class="entry-meta">
                    <span>${entry.date}</span>
                    ${entry.author ? html`<span>${entry.author}</span>` : nothing}
                  </div>

                  <div class="changes-preview ${expanded ? 'expanded' : ''}">
                    ${entry.changes}
                  </div>

                  <button
                    class="expand-toggle"
                    @click=${() => this._toggle(id)}
                    aria-expanded=${expanded ? 'true' : 'false'}
                    aria-label=${expanded ? 'Collapse details' : 'Expand details'}
                  >${expanded ? 'Show less' : 'Show more'}</button>

                  <div class="entry-actions">
                    <button
                      class="rollback-btn"
                      @click=${(e: Event) => this._handleRollback(e, entry)}
                      aria-label="Rollback to version ${entry.version}"
                    >Rollback</button>
                  </div>
                </div>
              </div>
            `;
          })}
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ai-changelog': AiChangelog;
  }
}
