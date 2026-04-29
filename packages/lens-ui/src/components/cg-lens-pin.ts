import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { Severity } from '@cognivo/lens-core';
import { severityColor, severityLabel } from '../internal/severity-style.js';
import type { ViewportRect } from '../internal/viewport-rect.js';

/**
 * One pin marker positioned at the finding's element rect. Click + Enter +
 * Space all emit `cg-lens-pin:select` carrying the finding id.
 *
 * v0.1: anchored at the rect's top-left corner (DevTools-familiar). The pin
 * has two layers — a soft outline rect tracing the finding's bounds, plus a
 * small dot at the corner with the severity color and a count badge if
 * multiple findings target the same node.
 */
@customElement('cg-lens-pin')
export class CgLensPin extends LitElement {
  /** First finding for this node — drives id, severity, message. */
  @property({ attribute: false }) findingId = '';
  @property({ attribute: false }) severity: Severity = 'consider';
  @property({ attribute: false }) message = '';
  @property({ attribute: false }) viewportRect: ViewportRect = {
    top: 0,
    left: 0,
    width: 0,
    height: 0,
  };
  /** When > 1, render a count badge — multiple findings on this node. */
  @property({ type: Number }) groupCount = 1;
  @property({ type: Boolean, reflect: true }) selected = false;

  override render() {
    const { top, left, width, height } = this.viewportRect;
    const color = severityColor(this.severity);
    const labelBase = `${severityLabel(this.severity)} finding: ${this.message}`;
    const label = this.groupCount > 1 ? `${labelBase} (+${this.groupCount - 1} more)` : labelBase;
    return html`
      <button
        class="pin"
        type="button"
        tabindex="0"
        aria-label=${label}
        aria-pressed=${this.selected ? 'true' : 'false'}
        style=${`top:${top}px;left:${left}px;width:${width}px;height:${height}px;--pin-color:${color};`}
        @click=${this._emitSelect}
        @keydown=${this._onKeyDown}
      >
        <span class="dot" aria-hidden="true">
          ${this.groupCount > 1
            ? html`<span class="badge">${this.groupCount}</span>`
            : null}
        </span>
      </button>
    `;
  }

  private _onKeyDown = (e: KeyboardEvent): void => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this._emitSelect();
    }
  };

  private _emitSelect = (): void => {
    this.dispatchEvent(
      new CustomEvent('cg-lens-pin:select', {
        detail: { findingId: this.findingId },
        bubbles: true,
        composed: true,
      })
    );
  };

  static override styles = css`
    :host {
      position: absolute;
      pointer-events: none;
    }
    .pin {
      position: fixed;
      pointer-events: auto;
      box-sizing: border-box;
      padding: 0;
      margin: 0;
      background: transparent;
      border: var(--cg-border-width-100, 2px) solid var(--pin-color);
      border-radius: var(--cg-border-radius-50, 4px);
      cursor: pointer;
      transition: box-shadow var(--cg-transition-duration-fast, 100ms) ease;
    }
    .pin:hover,
    :host([selected]) .pin {
      box-shadow: 0 0 0 2px var(--pin-color);
    }
    .pin:focus-visible {
      outline: var(--cg-border-width-100, 2px) solid var(--cg-color-focus-ring, #3b82f6);
      outline-offset: 2px;
    }
    .dot {
      position: absolute;
      top: -6px;
      left: -6px;
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: var(--pin-color);
      box-shadow: 0 0 0 2px var(--cg-color-surface-base-background, #09090b);
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }
    .badge {
      position: absolute;
      top: -10px;
      left: 100%;
      margin-left: 2px;
      min-width: 16px;
      height: 16px;
      padding: 0 4px;
      border-radius: 8px;
      background: var(--pin-color);
      color: var(--cg-color-surface-base-background, #09090b);
      font-size: 10px;
      font-weight: var(--cg-font-weight-semibold, 600);
      line-height: 16px;
      text-align: center;
    }
    @media (prefers-reduced-motion: reduce) {
      .pin {
        transition: none;
      }
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'cg-lens-pin': CgLensPin;
  }
}
