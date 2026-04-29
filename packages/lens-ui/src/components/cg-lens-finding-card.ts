import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { Finding } from '@cognivo/lens-core';
import { severityColor, severityLabel } from '../internal/severity-style.js';

/**
 * One finding card in the drawer. Self-contained — no events bubble out
 * except `cg-lens-finding-card:copy` so the parent can show a confirmation.
 *
 * The "Suggested fix" copy button writes a human-readable summary to the
 * clipboard, not raw JSON — designers + content folks will paste this into
 * a ticket or chat, not into code.
 */
@customElement('cg-lens-finding-card')
export class CgLensFindingCard extends LitElement {
  @property({ attribute: false }) finding: Finding | null = null;
  @property({ type: Boolean, reflect: true }) selected = false;

  override render() {
    const f = this.finding;
    if (!f) return null;
    const color = severityColor(f.severity);
    return html`<article class="card" aria-current=${this.selected ? 'true' : nothing}>
      <header class="head">
        <span class="sev" style=${`--sev-color:${color};`} aria-label=${`${severityLabel(f.severity)} severity`}>
          <span class="dot" aria-hidden="true"></span>
          <span class="sev-text">${severityLabel(f.severity)}</span>
        </span>
        <code class="rid">${f.ruleId}</code>
        <span class="confidence" aria-label=${`Confidence ${f.confidence}%`}>${f.confidence}%</span>
      </header>
      <p class="message">${f.message}</p>
      <details class="section">
        <summary>Why</summary>
        <p class="why-body">${f.why}</p>
        ${f.citations.length > 0
          ? html`<p class="citations">
              ${f.citations.map((c) => html`<code class="cite">${c}</code>`)}
            </p>`
          : null}
      </details>
      <details class="section">
        <summary>Suggested fix</summary>
        <p class="fix-body">${this._fixSummary(f)}</p>
        <button type="button" class="copy" @click=${this._copy} aria-label="Copy fix to clipboard">
          Copy
        </button>
      </details>
    </article>`;
  }

  private _fixSummary(f: Finding): string {
    if (!f.fixHint) return 'No deterministic fix available — judgment call.';
    const hint = f.fixHint;
    switch (hint.kind) {
      case 'token-swap':
        return `Replace ${hint.from} with ${hint.to} on the ${hint.property} property. ${hint.reason}`;
      case 'attribute-set':
        return `Set the ${hint.attribute} attribute. ${hint.reason}`;
      case 'css-injection':
        return `Inject CSS: ${hint.declarations}. ${hint.reason}`;
      case 'restructure':
        return `${hint.summary}. ${hint.reason}`;
      case 'copy-edit':
        return `Replace "${hint.original}" with "${hint.suggestion}". ${hint.reason}`;
    }
  }

  private _copy = async (): Promise<void> => {
    const f = this.finding;
    if (!f) return;
    const text = [
      `${f.ruleId} (${severityLabel(f.severity).toLowerCase()}, ${f.confidence}% confidence)`,
      f.message,
      `Why: ${f.why}`,
      `Suggested fix: ${this._fixSummary(f)}`,
      f.citations.length > 0 ? `Citations: ${f.citations.join(', ')}` : null,
    ]
      .filter(Boolean)
      .join('\n');

    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
      }
    } catch {
      // Best-effort — older envs / blocked permissions silently no-op.
    }
    this.dispatchEvent(
      new CustomEvent('cg-lens-finding-card:copy', {
        detail: { findingId: f.id, text },
        bubbles: true,
        composed: true,
      })
    );
  };

  static override styles = css`
    :host {
      display: block;
    }
    :host([selected]) .card {
      box-shadow: 0 0 0 2px var(--cg-color-focus-ring, #3b82f6);
    }
    .card {
      padding: var(--cg-spacing-12, 12px);
      background: var(--cg-color-surface-base-background, #09090b);
      border: var(--cg-border-width-50, 1px) solid var(--cg-color-surface-container-border, #27272a);
      border-radius: var(--cg-border-radius-100, 8px);
      color: var(--cg-color-surface-base-text, #fafafa);
      font-size: var(--cg-font-size-sm, 14px);
      line-height: var(--cg-line-height-normal, 1.5);
    }
    .head {
      display: flex;
      align-items: center;
      gap: var(--cg-spacing-8, 8px);
      flex-wrap: wrap;
      margin-bottom: var(--cg-spacing-8, 8px);
    }
    .sev {
      display: inline-flex;
      align-items: center;
      gap: var(--cg-spacing-4, 4px);
      font-size: var(--cg-font-size-xs, 12px);
      text-transform: uppercase;
      letter-spacing: 0.06em;
      color: var(--sev-color);
    }
    .sev .dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: var(--sev-color);
    }
    .rid {
      font-family: var(--cg-font-family-mono, ui-monospace, monospace);
      font-size: var(--cg-font-size-xs, 12px);
      color: var(--cg-color-surface-base-text-muted, #a1a1aa);
    }
    .confidence {
      margin-left: auto;
      font-size: var(--cg-font-size-xs, 12px);
      color: var(--cg-color-surface-base-text-muted, #a1a1aa);
      font-variant-numeric: tabular-nums;
    }
    .message {
      margin: 0 0 var(--cg-spacing-8, 8px) 0;
    }
    .section {
      margin-top: var(--cg-spacing-8, 8px);
    }
    summary {
      cursor: pointer;
      font-size: var(--cg-font-size-xs, 12px);
      color: var(--cg-color-surface-base-text-muted, #a1a1aa);
    }
    .why-body,
    .fix-body {
      margin: var(--cg-spacing-4, 4px) 0;
      font-size: var(--cg-font-size-xs, 12px);
    }
    .citations {
      display: inline-flex;
      flex-wrap: wrap;
      gap: var(--cg-spacing-4, 4px);
      margin: var(--cg-spacing-4, 4px) 0 0 0;
      font-size: var(--cg-font-size-xs, 12px);
    }
    .cite {
      padding: 1px var(--cg-spacing-4, 4px);
      background: var(--cg-color-surface-container-background, #18181b);
      border-radius: var(--cg-border-radius-50, 4px);
      font-family: var(--cg-font-family-mono, ui-monospace, monospace);
    }
    .copy {
      margin-top: var(--cg-spacing-4, 4px);
      padding: var(--cg-spacing-4, 4px) var(--cg-spacing-8, 8px);
      background: var(--cg-color-action-secondary-background-default, #27272a);
      color: var(--cg-color-action-secondary-text-default, #fafafa);
      border: var(--cg-border-width-50, 1px) solid var(--cg-color-surface-container-border, #3f3f46);
      border-radius: var(--cg-component-button-radius-sm, 6px);
      font-size: var(--cg-font-size-xs, 12px);
      cursor: pointer;
    }
    .copy:hover {
      background: var(--cg-color-action-secondary-background-hover, #3f3f46);
    }
    .copy:focus-visible {
      outline: var(--cg-border-width-100, 2px) solid var(--cg-color-focus-ring, #3b82f6);
      outline-offset: 1px;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'cg-lens-finding-card': CgLensFindingCard;
  }
}
