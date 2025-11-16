import { css as g, LitElement as u, html as e } from "lit";
import { n, b as h, a as v, t as m } from "./base-Ce59O1a4.js";
import "./ai-thinking-indicator-C6Kc-o9X.js";
import "./ai-confidence-badge-ANAt5vzm.js";
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function l(t) {
  return n({ ...t, state: !0, attribute: !1 });
}
class b extends CustomEvent {
  constructor(i) {
    super("ai:invoke", {
      detail: i,
      bubbles: !0,
      composed: !0
    });
  }
}
class f extends CustomEvent {
  constructor(i) {
    super("ai:result", {
      detail: i,
      bubbles: !0,
      composed: !0
    });
  }
}
class y extends CustomEvent {
  constructor(i) {
    super("ai:error", {
      detail: i,
      bubbles: !0,
      composed: !0
    });
  }
}
var x = Object.defineProperty, w = Object.getOwnPropertyDescriptor, r = (t, i, c, o) => {
  for (var s = o > 1 ? void 0 : o ? w(i, c) : i, d = t.length - 1, p; d >= 0; d--)
    (p = t[d]) && (s = (o ? p(i, c, s) : p(s)) || s);
  return o && s && x(i, c, s), s;
};
let a = class extends u {
  constructor() {
    super(...arguments), this.title = "", this.aiActions = [], this.data = [], this.meta = {}, this.result = null, this.loading = !1, this.error = null, this.activeIntent = null;
  }
  /**
   * Run an AI intent
   */
  async runIntent(t) {
    if (!this.aiClient) {
      this.error = new Error("No AI client provided. Set the aiClient property.");
      return;
    }
    if (!this.loading) {
      this.loading = !0, this.error = null, this.activeIntent = t, this.dispatchEvent(
        new b({
          intent: t,
          context: { dataset: this.data, meta: this.meta }
        })
      );
      try {
        const i = await this.aiClient.runIntent(t, {
          dataset: this.data,
          meta: this.meta
        });
        this.result = i, this.dispatchEvent(
          new f({
            intent: t,
            result: i
          })
        );
      } catch (i) {
        this.error = i, this.dispatchEvent(
          new y({
            intent: t,
            error: i
          })
        );
      } finally {
        this.loading = !1;
      }
    }
  }
  /**
   * Get label for intent
   */
  getIntentLabel(t) {
    return {
      explain: "Explain",
      forecast: "Forecast",
      detect_anomaly: "Detect Anomalies",
      summarize: "Summarize",
      classify: "Classify",
      optimize: "Optimize",
      compare: "Compare",
      cluster: "Cluster"
    }[t] || t;
  }
  render() {
    return e`
      <div class="card">
        ${this.title ? e`
              <div class="card-header">
                <h3 class="card-title">${this.title}</h3>
              </div>
            ` : null}

        <div class="card-content">
          <!-- Data content slot -->
          <slot></slot>

          <!-- AI Actions -->
          ${this.aiActions.length > 0 ? e`
                <div class="ai-actions">
                  ${this.aiActions.map(
      (t) => e`
                      <button
                        class="ai-button"
                        @click=${() => this.runIntent(t)}
                        ?disabled=${this.loading}
                      >
                        ✨ ${this.getIntentLabel(t)}
                      </button>
                    `
    )}
                </div>
              ` : null}

          <!-- Loading State -->
          ${this.loading ? e`
                <div class="loading-state">
                  <ai-thinking-indicator size="md"></ai-thinking-indicator>
                  <span>AI is analyzing...</span>
                </div>
              ` : null}

          <!-- Error State -->
          ${this.error ? e`
                <div class="error-state">
                  <strong>Error:</strong> ${this.error.message}
                </div>
              ` : null}

          <!-- AI Result -->
          ${this.result && !this.loading ? e`
                <div class="ai-result">
                  <slot name="ai-result" .result=${this.result}>
                    <div class="ai-result-header">
                      <span class="ai-result-title">AI Insights</span>
                      ${this.result.confidence ? e`
                            <ai-confidence-badge
                              score=${this.result.confidence}
                              show-percentage
                            ></ai-confidence-badge>
                          ` : null}
                    </div>

                    ${this.result.explanation ? e`<p class="ai-explanation">${this.result.explanation}</p>` : null}

                    ${this.result.bullets && this.result.bullets.length > 0 ? e`
                          <ul class="ai-bullets">
                            ${this.result.bullets.map((t) => e`<li>${t}</li>`)}
                          </ul>
                        ` : null}

                    ${this.result.drivers && this.result.drivers.length > 0 ? e`
                          <div class="ai-drivers">
                            <strong>Key Drivers:</strong>
                            ${this.result.drivers.map(
      (t) => e`
                                <div class="driver">
                                  <span class="driver-factor">${t.factor}</span>
                                  <span class="driver-impact">
                                    ${t.impact > 0 ? "+" : ""}${t.impact}% impact
                                  </span>
                                </div>
                              `
    )}
                          </div>
                        ` : null}
                  </slot>
                </div>
              ` : null}
        </div>
      </div>
    `;
  }
};
a.styles = [
  h,
  v,
  g`
      :host {
        display: block;
        background: inherit;
        border-radius: var(--cg-Border-radius-150);
        border-left: 4px solid inherit;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        overflow: hidden;
        transition: box-shadow inherit;
      }

      :host(:hover) {
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      }

      .card-header {
        padding: var(--cg-spacing-16);
        border-bottom: 1px solid var(--cg-gray-100);
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: var(--cg-spacing-16);
      }

      .card-title {
        font-size: var(--cg-font-size-lg);
        font-weight: inherit;
        color: inherit;
        margin: 0;
      }

      .card-content {
        padding: var(--cg-spacing-16);
      }

      .ai-actions {
        display: flex;
        gap: var(--cg-spacing-8);
        flex-wrap: wrap;
      }

      .ai-button {
        display: inline-flex;
        align-items: center;
        gap: var(--cg-spacing-4);
        padding: var(--cg-spacing-4) var(--cg-spacing-16);
        background: inherit;
        border: 1px solid inherit;
        border-radius: var(--cg-Border-radius-100);
        color: inherit;
        font-size: var(--cg-font-size-sm);
        font-weight: inherit;
        cursor: pointer;
        transition: all inherit;
      }

      .ai-button:hover {
        background: inherit;
        color: white;
        transform: translateY(-1px);
      }

      .ai-button:active {
        transform: translateY(0);
      }

      .ai-button:disabled {
        opacity: 0.5;
        cursor: not-allowed;
        transform: none;
      }

      .ai-result {
        margin-top: var(--cg-spacing-16);
        padding: var(--cg-spacing-16);
        background: inherit;
        border: 1px solid inherit;
        border-radius: var(--cg-Border-radius-100);
        animation: fadeIn 0.3s ease-in-out;
      }

      .ai-result-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: var(--cg-spacing-8);
      }

      .ai-result-title {
        font-size: var(--cg-font-size-md);
        font-weight: inherit;
        color: inherit;
      }

      .ai-explanation {
        margin: var(--cg-spacing-8) 0;
        color: inherit;
        line-height: 1.6;
      }

      .ai-bullets {
        list-style: none;
        padding: 0;
        margin: var(--cg-spacing-8) 0;
      }

      .ai-bullets li {
        padding: var(--cg-spacing-4) 0;
        padding-left: var(--cg-spacing-16);
        position: relative;
      }

      .ai-bullets li::before {
        content: '•';
        position: absolute;
        left: 0;
        color: inherit;
        font-weight: bold;
      }

      .ai-drivers {
        margin-top: var(--cg-spacing-16);
      }

      .driver {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: var(--cg-spacing-4);
        margin: var(--cg-spacing-4) 0;
        background: white;
        border-radius: var(--cg-Border-radius-50);
      }

      .driver-factor {
        font-weight: inherit;
      }

      .driver-impact {
        display: flex;
        align-items: center;
        gap: var(--cg-spacing-4);
        font-size: var(--cg-font-size-sm);
        color: var(--cg-gray-500);
      }

      .loading-state {
        display: flex;
        align-items: center;
        gap: var(--cg-spacing-8);
        padding: var(--cg-spacing-16);
        color: var(--cg-gray-500);
      }

      .error-state {
        padding: var(--cg-spacing-16);
        background: inherit;
        color: white;
        border-radius: var(--cg-Border-radius-100);
        margin-top: var(--cg-spacing-16);
      }

      /* Dark theme support */
      :host([data-theme='dark']) {
        background: inherit;
      }

      :host([data-theme='dark']) .card-title,
      :host([data-theme='dark']) .ai-result-title,
      :host([data-theme='dark']) .ai-explanation {
        color: inherit;
      }
    `
];
r([
  n({ type: String })
], a.prototype, "title", 2);
r([
  n({ type: Array, attribute: "ai-actions" })
], a.prototype, "aiActions", 2);
r([
  n({ type: Array })
], a.prototype, "data", 2);
r([
  n({ type: Object })
], a.prototype, "meta", 2);
r([
  n({ attribute: !1 })
], a.prototype, "aiClient", 2);
r([
  l()
], a.prototype, "result", 2);
r([
  l()
], a.prototype, "loading", 2);
r([
  l()
], a.prototype, "error", 2);
r([
  l()
], a.prototype, "activeIntent", 2);
a = r([
  m("ai-insight-card")
], a);
export {
  a as A,
  l as r
};
//# sourceMappingURL=ai-insight-card-D9F-7e77.js.map
