import "@cognivo/tokens";
import { A as vt } from "./ai-thinking-indicator-C6Kc-o9X.js";
import { e as H, Z as I, a as V, i as N, t as U, T as W } from "./ai-confidence-badge-ANAt5vzm.js";
import { A as wt } from "./ai-confidence-badge-ANAt5vzm.js";
import { r as B } from "./ai-insight-card-D9F-7e77.js";
import { A as kt } from "./ai-insight-card-D9F-7e77.js";
import { css as L, LitElement as E, html as d, svg as x } from "lit";
import { b as M, n as l, t as T, a as K } from "./base-Ce59O1a4.js";
var Z = Object.defineProperty, q = Object.getOwnPropertyDescriptor, z = (t, r, a, o) => {
  for (var i = o > 1 ? void 0 : o ? q(r, a) : r, n = t.length - 1, s; n >= 0; n--)
    (s = t[n]) && (i = (o ? s(r, a, i) : s(i)) || i);
  return o && i && Z(r, a, i), i;
};
let w = class extends E {
  constructor() {
    super(...arguments), this.action = "explain", this.size = "md", this.variant = "primary", this.disabled = !1, this.loading = !1, this.icon = "", this.tooltip = "";
  }
  /**
   * Get default icon for intent
   */
  getDefaultIcon() {
    return {
      explain: "💡",
      summarize: "📝",
      forecast: "📊",
      detect_anomaly: "🔍",
      classify: "🏷️",
      optimize: "⚡",
      compare: "⚖️",
      cluster: "🗂️"
    }[this.action] || "✨";
  }
  /**
   * Get default tooltip for intent
   */
  getDefaultTooltip() {
    return {
      explain: "Get AI explanation of data trends",
      summarize: "Summarize data into key points",
      forecast: "Predict future values",
      detect_anomaly: "Find unusual patterns or outliers",
      classify: "Auto-categorize or label items",
      optimize: "Suggest improvements or optimizations",
      compare: "Compare datasets or time periods",
      cluster: "Group similar items together"
    }[this.action] || "Trigger AI action";
  }
  /**
   * Handle button click
   */
  handleClick(t) {
    if (this.disabled || this.loading) {
      t.preventDefault();
      return;
    }
    this.dispatchEvent(
      new CustomEvent("ai:action-triggered", {
        detail: {
          action: this.action,
          timestamp: Date.now()
        },
        bubbles: !0,
        composed: !0
      })
    );
  }
  /**
   * Handle keyboard events
   */
  handleKeyDown(t) {
    (t.key === "Enter" || t.key === " ") && (t.preventDefault(), this.handleClick(t));
  }
  render() {
    const t = this.icon || this.getDefaultIcon(), r = this.tooltip || this.getDefaultTooltip(), a = {
      [this.variant]: !0,
      loading: this.loading
    };
    return d`
      <button
        class=${H(a)}
        ?disabled=${this.disabled}
        @click=${this.handleClick}
        @keydown=${this.handleKeyDown}
        title=${r}
        aria-label=${r}
        aria-busy=${this.loading}
        type="button"
      >
        ${t ? d`<span class="icon">${t}</span>` : null}
        <span class="label"><slot></slot></span>
        ${this.loading ? d`<span class="sr-only">Processing...</span>` : null}
      </button>
    `;
  }
};
w.styles = [
  M,
  L`
      :host {
        display: inline-block;
      }

      button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: var(--cg-spacing-4);
        padding: var(--button-padding, 8px 16px);
        font-family: inherit;
        font-size: var(--button-font-size, var(--cg-font-size-sm));
        font-weight: inherit;
        line-height: 1.5;
        border: 1px solid transparent;
        border-radius: var(--cg-Border-radius-100);
        cursor: pointer;
        transition: all inherit;
        user-select: none;
        position: relative;
        overflow: hidden;
      }

      /* Focus styles for accessibility */
      button:focus-visible {
        outline: 2px solid inherit;
        outline-offset: 2px;
      }

      /* Primary variant (default) */
      .primary {
        background: inherit;
        color: white;
        border-color: inherit;
      }

      .primary:hover:not(:disabled) {
        background: inherit;
        filter: brightness(1.1);
        box-shadow: 0 4px 12px rgba(139, 92, 246, 0.3);
      }

      .primary:active:not(:disabled) {
        transform: translateY(1px);
      }

      /* Secondary variant */
      .secondary {
        background: transparent;
        color: inherit;
        border-color: inherit;
      }

      .secondary:hover:not(:disabled) {
        background: inherit10;
        border-color: inherit;
      }

      .secondary:active:not(:disabled) {
        background: inherit20;
      }

      /* Ghost variant */
      .ghost {
        background: transparent;
        color: inherit;
        border-color: transparent;
      }

      .ghost:hover:not(:disabled) {
        background: inherit10;
      }

      .ghost:active:not(:disabled) {
        background: inherit20;
      }

      /* Disabled state */
      button:disabled {
        opacity: 0.5;
        cursor: not-allowed;
        filter: grayscale(0.3);
      }

      /* Loading state */
      .loading {
        position: relative;
        color: transparent;
        pointer-events: none;
      }

      .loading::after {
        content: '';
        position: absolute;
        width: 16px;
        height: 16px;
        top: 50%;
        left: 50%;
        margin-left: -8px;
        margin-top: -8px;
        border: 2px solid currentColor;
        border-radius: 50%;
        border-top-color: transparent;
        animation: spin 0.6s linear infinite;
        color: white;
      }

      .secondary.loading::after,
      .ghost.loading::after {
        color: inherit;
      }

      @keyframes spin {
        to {
          transform: rotate(360deg);
        }
      }

      /* Size variants */
      :host([size='sm']) {
        --button-padding: 6px 12px;
        --button-font-size: inherit;
      }

      :host([size='md']) {
        --button-padding: 8px 16px;
        --button-font-size: var(--cg-font-size-sm);
      }

      :host([size='lg']) {
        --button-padding: 12px 24px;
        --button-font-size: inherit;
      }

      /* Icon */
      .icon {
        display: inline-flex;
        align-items: center;
        font-size: 1.2em;
      }

      /* Tooltip (native title attribute used for now) */
      .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border-width: 0;
      }
    `
];
z([
  l({ type: String })
], w.prototype, "action", 2);
z([
  l({ type: String, reflect: !0 })
], w.prototype, "size", 2);
z([
  l({ type: String, reflect: !0 })
], w.prototype, "variant", 2);
z([
  l({ type: Boolean, reflect: !0 })
], w.prototype, "disabled", 2);
z([
  l({ type: Boolean, reflect: !0 })
], w.prototype, "loading", 2);
z([
  l({ type: String })
], w.prototype, "icon", 2);
z([
  l({ type: String })
], w.prototype, "tooltip", 2);
w = z([
  T("ai-action-button")
], w);
var Q = Object.defineProperty, J = Object.getOwnPropertyDescriptor, C = (t, r, a, o) => {
  for (var i = o > 1 ? void 0 : o ? J(r, a) : r, n = t.length - 1, s; n >= 0; n--)
    (s = t[n]) && (i = (o ? s(r, a, i) : s(i)) || i);
  return o && i && Q(r, a, i), i;
};
let $ = class extends E {
  constructor() {
    super(...arguments), this.confidence = 0, this.dismissible = !1, this.collapsed = !1, this.title = "", this.timestamp = "", this.variant = "default", this.isExpanded = !0;
  }
  connectedCallback() {
    super.connectedCallback(), this.isExpanded = !this.collapsed;
  }
  /**
   * Toggle panel expanded/collapsed
   */
  togglePanel() {
    this.isExpanded = !this.isExpanded, this.collapsed = !this.isExpanded, this.dispatchEvent(
      new CustomEvent("ai:panel-toggled", {
        detail: {
          expanded: this.isExpanded,
          timestamp: Date.now()
        },
        bubbles: !0,
        composed: !0
      })
    );
  }
  /**
   * Dismiss panel
   */
  dismissPanel() {
    this.dispatchEvent(
      new CustomEvent("ai:panel-dismissed", {
        detail: {
          timestamp: Date.now()
        },
        bubbles: !0,
        composed: !0
      })
    ), this.style.display = "none";
  }
  /**
   * Get relative time string
   */
  getRelativeTime() {
    if (!this.timestamp) return "";
    const t = Date.now(), r = new Date(this.timestamp).getTime(), a = t - r, o = Math.floor(a / 1e3), i = Math.floor(o / 60), n = Math.floor(i / 60), s = Math.floor(n / 24);
    return s > 0 ? `${s}d ago` : n > 0 ? `${n}h ago` : i > 0 ? `${i}m ago` : o > 0 ? `${o}s ago` : "just now";
  }
  render() {
    const t = this.confidence > 0, r = this.timestamp !== "";
    return d`
      <div class="panel">
        <!-- Header -->
        <div class="panel-header">
          <div class="header-left">
            ${this.title ? d`
                  <h3 class="header-title">
                    ${this.title}
                    ${t ? d`
                          <ai-confidence-badge
                            score=${this.confidence}
                            size="sm"
                            show-percentage
                          ></ai-confidence-badge>
                        ` : null}
                  </h3>
                ` : null}
            ${r || t ? d`
                  <div class="header-meta">
                    ${r ? d`
                          <span class="timestamp">
                            <span>🕐</span>
                            <span>${this.getRelativeTime()}</span>
                          </span>
                        ` : null}
                    <slot name="header"></slot>
                  </div>
                ` : null}
          </div>

          <div class="header-actions">
            <button
              class="action-button toggle"
              @click=${this.togglePanel}
              title=${this.isExpanded ? "Collapse" : "Expand"}
              aria-label=${this.isExpanded ? "Collapse panel" : "Expand panel"}
            >
              ${this.isExpanded ? "−" : "+"}
            </button>

            ${this.dismissible ? d`
                  <button
                    class="action-button dismiss"
                    @click=${this.dismissPanel}
                    title="Dismiss"
                    aria-label="Dismiss panel"
                  >
                    ×
                  </button>
                ` : null}
          </div>
        </div>

        <!-- Content -->
        ${this.isExpanded ? d`
              <div class="panel-content">
                <slot></slot>
              </div>

              ${this.querySelector('[slot="footer"]') ? d`
                    <div class="panel-footer">
                      <slot name="footer"></slot>
                    </div>
                  ` : null}
            ` : null}
      </div>
    `;
  }
};
$.styles = [
  M,
  K,
  L`
      :host {
        display: block;
        background: var(--panel-background, inherit);
        border: 1px solid var(--panel-border, var(--cg-gray-100));
        border-radius: var(--cg-Border-radius-150);
        overflow: hidden;
        transition: all inherit;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
      }

      :host([variant='success']) {
        border-color: inherit;
        background: var(--success-bg, #f0fdf4);
      }

      :host([variant='warning']) {
        border-color: inherit;
        background: var(--warning-bg, #fffbeb);
      }

      :host([variant='error']) {
        border-color: inherit;
        background: var(--error-bg, #fef2f2);
      }

      :host([collapsed]) .panel-content {
        display: none;
      }

      /* Header */
      .panel-header {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        padding: var(--cg-spacing-16) var(--cg-spacing-24);
        gap: var(--cg-spacing-16);
        border-bottom: 1px solid var(--panel-border, var(--cg-gray-100));
        background: var(--header-bg, transparent);
      }

      :host([collapsed]) .panel-header {
        border-bottom: none;
      }

      .header-left {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: var(--cg-spacing-4);
      }

      .header-title {
        display: flex;
        align-items: center;
        gap: var(--cg-spacing-8);
        font-family: inherit;
        font-size: var(--cg-font-size-md);
        font-weight: inherit;
        color: inherit;
        margin: 0;
      }

      .header-meta {
        display: flex;
        align-items: center;
        gap: var(--cg-spacing-16);
        font-size: inherit;
        color: var(--cg-gray-500);
      }

      .timestamp {
        display: flex;
        align-items: center;
        gap: 4px;
      }

      .header-actions {
        display: flex;
        align-items: center;
        gap: var(--cg-spacing-4);
        flex-shrink: 0;
      }

      /* Action buttons */
      .action-button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 32px;
        height: 32px;
        border: 1px solid var(--cg-gray-100);
        background: transparent;
        border-radius: var(--cg-Border-radius-100);
        cursor: pointer;
        transition: all inherit;
        color: var(--cg-gray-500);
        font-size: 16px;
        padding: 0;
      }

      .action-button:hover {
        background: inherit;
        border-color: var(--cg-gray-500);
        color: inherit;
      }

      .action-button:active {
        transform: translateY(1px);
      }

      .action-button.dismiss {
        color: inherit;
      }

      .action-button.dismiss:hover {
        background: #fef2f2;
        border-color: inherit;
      }

      /* Content */
      .panel-content {
        padding: var(--cg-spacing-24);
        animation: fadeIn 0.2s ease-in-out;
      }

      .panel-content ::slotted(*) {
        margin: 0;
      }

      .panel-content ::slotted(* + *) {
        margin-top: var(--cg-spacing-16);
      }

      .panel-content ::slotted(h3) {
        font-family: inherit;
        font-size: inherit;
        font-weight: inherit;
        color: inherit;
        margin-bottom: var(--cg-spacing-8);
      }

      .panel-content ::slotted(p) {
        font-size: var(--cg-font-size-sm);
        line-height: inherit;
        color: var(--cg-gray-500);
      }

      .panel-content ::slotted(ul),
      .panel-content ::slotted(ol) {
        padding-left: 20px;
        font-size: var(--cg-font-size-sm);
        color: var(--cg-gray-500);
      }

      .panel-content ::slotted(li) {
        line-height: inherit;
        margin-top: var(--cg-spacing-4);
      }

      /* Footer */
      .panel-footer {
        border-top: 1px solid var(--panel-border, var(--cg-gray-100));
        padding: var(--cg-spacing-16) var(--cg-spacing-24);
        background: var(--footer-bg, inherit);
      }

      .panel-footer ::slotted(*) {
        margin: 0;
      }

      /* Collapsible section */
      details {
        margin-top: var(--cg-spacing-16);
      }

      summary {
        cursor: pointer;
        font-weight: inherit;
        color: inherit;
        list-style: none;
        display: flex;
        align-items: center;
        gap: var(--cg-spacing-4);
        padding: var(--cg-spacing-8);
        border-radius: var(--cg-Border-radius-50);
        transition: all inherit;
      }

      summary:hover {
        background: inherit;
      }

      summary::before {
        content: '▶';
        display: inline-block;
        transition: transform inherit;
      }

      details[open] summary::before {
        transform: rotate(90deg);
      }

      /* Responsive */
      @media (max-width: 640px) {
        .panel-header,
        .panel-content,
        .panel-footer {
          padding: var(--cg-spacing-16);
        }

        .header-title {
          font-size: inherit;
        }
      }

      /* Dark mode support */
      @media (prefers-color-scheme: dark) {
        :host {
          background: #1f2937;
          border-color: #374151;
        }

        .panel-header {
          border-color: #374151;
        }

        .header-title {
          color: #f9fafb;
        }

        .header-meta,
        .panel-content ::slotted(p),
        .panel-content ::slotted(li) {
          color: #d1d5db;
        }

        .action-button {
          border-color: #374151;
          color: #9ca3af;
        }

        .action-button:hover {
          background: #374151;
          color: #f9fafb;
        }

        .panel-footer {
          background: #111827;
          border-color: #374151;
        }
      }
    `
];
C([
  l({ type: Number })
], $.prototype, "confidence", 2);
C([
  l({ type: Boolean })
], $.prototype, "dismissible", 2);
C([
  l({ type: Boolean, reflect: !0 })
], $.prototype, "collapsed", 2);
C([
  l({ type: String })
], $.prototype, "title", 2);
C([
  l({ type: String })
], $.prototype, "timestamp", 2);
C([
  l({ type: String, reflect: !0 })
], $.prototype, "variant", 2);
C([
  B()
], $.prototype, "isExpanded", 2);
$ = C([
  T("ai-result-panel")
], $);
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { I: tt } = I, R = () => document.createComment(""), S = (t, r, a) => {
  const o = t._$AA.parentNode, i = r === void 0 ? t._$AB : r._$AA;
  if (a === void 0) {
    const n = o.insertBefore(R(), i), s = o.insertBefore(R(), i);
    a = new tt(n, s, t, t.options);
  } else {
    const n = a._$AB.nextSibling, s = a._$AM, p = s !== t;
    if (p) {
      let c;
      a._$AQ?.(t), a._$AM = t, a._$AP !== void 0 && (c = t._$AU) !== s._$AU && a._$AP(c);
    }
    if (n !== i || p) {
      let c = a._$AA;
      for (; c !== n; ) {
        const P = c.nextSibling;
        o.insertBefore(c, i), c = P;
      }
    }
  }
  return a;
}, _ = (t, r, a = t) => (t._$AI(r, a), t), et = {}, it = (t, r = et) => t._$AH = r, rt = (t) => t._$AH, j = (t) => {
  t._$AR(), t._$AA.remove();
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const F = (t, r, a) => {
  const o = /* @__PURE__ */ new Map();
  for (let i = r; i <= a; i++) o.set(t[i], i);
  return o;
}, Y = V(class extends N {
  constructor(t) {
    if (super(t), t.type !== U.CHILD) throw Error("repeat() can only be used in text expressions");
  }
  dt(t, r, a) {
    let o;
    a === void 0 ? a = r : r !== void 0 && (o = r);
    const i = [], n = [];
    let s = 0;
    for (const p of t) i[s] = o ? o(p, s) : s, n[s] = a(p, s), s++;
    return { values: n, keys: i };
  }
  render(t, r, a) {
    return this.dt(t, r, a).values;
  }
  update(t, [r, a, o]) {
    const i = rt(t), { values: n, keys: s } = this.dt(r, a, o);
    if (!Array.isArray(i)) return this.ut = s, n;
    const p = this.ut ??= [], c = [];
    let P, G, h = 0, u = i.length - 1, g = 0, m = n.length - 1;
    for (; h <= u && g <= m; ) if (i[h] === null) h++;
    else if (i[u] === null) u--;
    else if (p[h] === s[g]) c[g] = _(i[h], n[g]), h++, g++;
    else if (p[u] === s[m]) c[m] = _(i[u], n[m]), u--, m--;
    else if (p[h] === s[m]) c[m] = _(i[h], n[m]), S(t, c[m + 1], i[h]), h++, m--;
    else if (p[u] === s[g]) c[g] = _(i[u], n[g]), S(t, i[h], i[u]), u--, g++;
    else if (P === void 0 && (P = F(s, g, m), G = F(p, h, u)), P.has(p[h])) if (P.has(p[u])) {
      const A = G.get(s[g]), O = A !== void 0 ? i[A] : null;
      if (O === null) {
        const X = S(t, i[h]);
        _(X, n[g]), c[g] = X;
      } else c[g] = _(O, n[g]), S(t, i[h], O), i[A] = null;
      g++;
    } else j(i[u]), u--;
    else j(i[h]), h++;
    for (; g <= m; ) {
      const A = S(t, c[m + 1]);
      _(A, n[g]), c[g++] = A;
    }
    for (; h <= u; ) {
      const A = i[h++];
      A !== null && j(A);
    }
    return this.ut = s, it(t, c), W;
  }
});
var at = Object.defineProperty, ot = Object.getOwnPropertyDescriptor, y = (t, r, a, o) => {
  for (var i = o > 1 ? void 0 : o ? ot(r, a) : r, n = t.length - 1, s; n >= 0; n--)
    (s = t[n]) && (i = (o ? s(r, a, i) : s(i)) || i);
  return o && i && at(r, a, i), i;
};
let f = class extends E {
  constructor() {
    super(...arguments), this.columns = [], this.data = [], this.highlightAnomalies = !1, this.showConfidence = !1, this.striped = !1, this.hoverable = !0, this.compact = !1, this.emptyMessage = "No data available", this.showLegend = !1, this.sortColumn = null, this.sortDirection = "asc";
  }
  /**
   * Get sorted data
   */
  get sortedData() {
    return this.sortColumn ? [...this.data].sort((t, r) => {
      const a = t[this.sortColumn], o = r[this.sortColumn];
      if (a === o) return 0;
      const i = a > o ? 1 : -1;
      return this.sortDirection === "asc" ? i : -i;
    }) : this.data;
  }
  /**
   * Handle column header click
   */
  handleSort(t) {
    t.sortable && (this.sortColumn === t.key ? this.sortDirection = this.sortDirection === "asc" ? "desc" : "asc" : (this.sortColumn = t.key, this.sortDirection = "asc"), this.dispatchEvent(
      new CustomEvent("ai:sort-changed", {
        detail: {
          column: this.sortColumn,
          direction: this.sortDirection,
          timestamp: Date.now()
        },
        bubbles: !0,
        composed: !0
      })
    ));
  }
  /**
   * Handle row click
   */
  handleRowClick(t, r) {
    this.dispatchEvent(
      new CustomEvent("ai:row-selected", {
        detail: {
          row: t,
          index: r,
          timestamp: Date.now()
        },
        bubbles: !0,
        composed: !0
      })
    );
  }
  /**
   * Format cell value based on type
   */
  formatCell(t, r) {
    switch (r.type) {
      case "currency":
        return typeof t == "number" ? t.toLocaleString() : t;
      case "percentage":
        return typeof t == "number" ? Math.round(t * 100) : t;
      case "number":
        return typeof t == "number" ? t.toLocaleString() : t;
      case "date":
        return t instanceof Date ? t.toLocaleDateString() : t;
      default:
        return t;
    }
  }
  /**
   * Render table header
   */
  renderHeader() {
    return d`
      <thead>
        <tr>
          ${this.columns.map(
      (t) => d`
              <th
                class=${H({
        sortable: t.sortable ?? !1,
        sorted: this.sortColumn === t.key,
        [`align-${t.align || "left"}`]: !0
      })}
                style=${t.width ? `width: ${t.width}` : ""}
                @click=${() => this.handleSort(t)}
              >
                ${t.label}
                ${t.sortable ? d`
                      <span class="sort-icon">
                        ${this.sortColumn === t.key ? this.sortDirection === "asc" ? "▲" : "▼" : "⇅"}
                      </span>
                    ` : null}
              </th>
            `
    )}
        </tr>
      </thead>
    `;
  }
  /**
   * Render table body
   */
  renderBody() {
    const t = this.sortedData;
    return t.length === 0 ? d`
        <tbody>
          <tr>
            <td colspan=${this.columns.length}>
              <div class="empty-state">
                <div class="empty-state-icon">📊</div>
                <p>${this.emptyMessage}</p>
              </div>
            </td>
          </tr>
        </tbody>
      ` : d`
      <tbody>
        ${Y(
      t,
      (r, a) => a,
      (r, a) => {
        const o = r._anomalySeverity || null, i = r._highlighted || !1;
        return d`
              <tr
                class=${H({
          highlighted: i
        })}
                data-anomaly=${o || ""}
                @click=${() => this.handleRowClick(r, a)}
              >
                ${this.columns.map((n) => {
          const s = r[n.key], p = this.formatCell(s, n);
          return d`
                    <td class=${`cell-${n.type || "text"} align-${n.align || "left"}`}>
                      ${n.type === "anomaly" ? d`
                            <div class="cell-anomaly">
                              ${o ? d`
                                    <span class="anomaly-indicator ${o}"></span>
                                  ` : null}
                              <span>${s ? "Anomaly" : "Normal"}</span>
                            </div>
                          ` : n.type === "confidence" && this.showConfidence ? d`
                            <ai-confidence-badge
                              score=${s || 0}
                              size="sm"
                              show-percentage
                            ></ai-confidence-badge>
                          ` : p}
                    </td>
                  `;
        })}
              </tr>
            `;
      }
    )}
      </tbody>
    `;
  }
  /**
   * Render legend
   */
  renderLegend() {
    return !this.showLegend || !this.highlightAnomalies ? null : d`
      <div class="legend">
        <span>Anomaly Severity:</span>
        <div class="legend-item">
          <span class="legend-dot" style="background: #eab308"></span>
          <span>Low</span>
        </div>
        <div class="legend-item">
          <span class="legend-dot" style="background: #f97316"></span>
          <span>Medium</span>
        </div>
        <div class="legend-item">
          <span class="legend-dot" style="background: #ef4444"></span>
          <span>High</span>
        </div>
        <div class="legend-item">
          <span class="legend-dot" style="background: #dc2626"></span>
          <span>Critical</span>
        </div>
      </div>
    `;
  }
  render() {
    return d`
      <table>
        ${this.renderHeader()} ${this.renderBody()}
      </table>
      ${this.renderLegend()}
    `;
  }
};
f.styles = [
  M,
  L`
      :host {
        display: block;
        width: 100%;
        overflow-x: auto;
        background: inherit;
        border: 1px solid var(--cg-gray-100);
        border-radius: var(--cg-Border-radius-150);
      }

      table {
        width: 100%;
        border-collapse: collapse;
        font-size: var(--cg-font-size-sm);
        font-family: inherit;
      }

      /* Header */
      thead {
        background: inherit;
        border-bottom: 2px solid var(--cg-gray-100);
      }

      th {
        padding: var(--cell-padding, 12px 16px);
        text-align: var(--cell-align, left);
        font-weight: inherit;
        color: inherit;
        white-space: nowrap;
        user-select: none;
      }

      th.sortable {
        cursor: pointer;
        transition: all inherit;
      }

      th.sortable:hover {
        background: var(--cg-gray-100);
        color: inherit;
      }

      .sort-icon {
        display: inline-block;
        margin-left: 4px;
        opacity: 0.5;
        font-size: 10px;
      }

      th.sorted .sort-icon {
        opacity: 1;
        color: inherit;
      }

      /* Body */
      tbody tr {
        border-bottom: 1px solid var(--cg-gray-100);
        transition: all inherit;
      }

      :host([striped]) tbody tr:nth-child(even) {
        background: inherit;
      }

      :host([hoverable]) tbody tr:hover {
        background: var(--cg-gray-100);
        cursor: pointer;
      }

      td {
        padding: var(--cell-padding, 12px 16px);
        text-align: var(--cell-align, left);
        color: var(--cg-gray-500);
      }

      /* Compact mode */
      :host([compact]) th,
      :host([compact]) td {
        --cell-padding: 8px 12px;
      }

      /* Anomaly highlighting */
      tr[data-anomaly='low'] {
        background: #fef9c3;
        border-left: 3px solid #eab308;
      }

      tr[data-anomaly='medium'] {
        background: #fed7aa;
        border-left: 3px solid #f97316;
      }

      tr[data-anomaly='high'] {
        background: #fecaca;
        border-left: 3px solid #ef4444;
      }

      tr[data-anomaly='critical'] {
        background: #fecaca;
        border-left: 3px solid #dc2626;
        box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1);
        animation: pulseGlow 2s infinite;
      }

      @keyframes pulseGlow {
        0%, 100% {
          box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1);
        }
        50% {
          box-shadow: 0 0 0 6px rgba(220, 38, 38, 0.2);
        }
      }

      /* Highlighted rows */
      tr.highlighted {
        background: inherit;
        border-left: 3px solid inherit;
      }

      /* Column alignment */
      .align-left {
        --cell-align: left;
      }

      .align-center {
        --cell-align: center;
      }

      .align-right {
        --cell-align: right;
      }

      /* Cell types */
      .cell-number,
      .cell-currency,
      .cell-percentage {
        font-variant-numeric: tabular-nums;
        font-weight: inherit;
        color: inherit;
      }

      .cell-currency::before {
        content: '$';
        opacity: 0.5;
        margin-right: 2px;
      }

      .cell-percentage::after {
        content: '%';
        opacity: 0.5;
        margin-left: 2px;
      }

      .cell-anomaly {
        display: inline-flex;
        align-items: center;
        gap: 6px;
      }

      .anomaly-indicator {
        width: 8px;
        height: 8px;
        border-radius: 50%;
      }

      .anomaly-indicator.low {
        background: #eab308;
      }

      .anomaly-indicator.medium {
        background: #f97316;
      }

      .anomaly-indicator.high {
        background: #ef4444;
      }

      .anomaly-indicator.critical {
        background: #dc2626;
        animation: pulse 2s infinite;
      }

      /* Empty state */
      .empty-state {
        padding: var(--cg-spacing-32);
        text-align: center;
        color: var(--cg-gray-500);
      }

      .empty-state-icon {
        font-size: 48px;
        opacity: 0.3;
        margin-bottom: var(--cg-spacing-8);
      }

      /* Legend */
      .legend {
        display: flex;
        align-items: center;
        gap: var(--cg-spacing-24);
        padding: var(--cg-spacing-16) var(--cg-spacing-24);
        background: inherit;
        border-top: 1px solid var(--cg-gray-100);
        font-size: inherit;
        color: var(--cg-gray-500);
      }

      .legend-item {
        display: flex;
        align-items: center;
        gap: 6px;
      }

      .legend-dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
      }

      /* Responsive */
      @media (max-width: 768px) {
        th, td {
          --cell-padding: 8px 12px;
          font-size: 12px;
        }

        .legend {
          flex-wrap: wrap;
        }
      }

      /* Dark mode */
      @media (prefers-color-scheme: dark) {
        :host {
          background: #1f2937;
          border-color: #374151;
        }

        thead {
          background: #111827;
          border-color: #374151;
        }

        th {
          color: #f9fafb;
        }

        tbody tr {
          border-color: #374151;
        }

        :host([striped]) tbody tr:nth-child(even) {
          background: #374151;
        }

        :host([hoverable]) tbody tr:hover {
          background: #4b5563;
        }

        td {
          color: #d1d5db;
        }

        .legend {
          background: #111827;
          border-color: #374151;
          color: #9ca3af;
        }
      }
    `
];
y([
  l({ type: Array })
], f.prototype, "columns", 2);
y([
  l({ type: Array })
], f.prototype, "data", 2);
y([
  l({ type: Boolean, attribute: "highlight-anomalies" })
], f.prototype, "highlightAnomalies", 2);
y([
  l({ type: Boolean, attribute: "show-confidence" })
], f.prototype, "showConfidence", 2);
y([
  l({ type: Boolean, reflect: !0 })
], f.prototype, "striped", 2);
y([
  l({ type: Boolean, reflect: !0 })
], f.prototype, "hoverable", 2);
y([
  l({ type: Boolean, reflect: !0 })
], f.prototype, "compact", 2);
y([
  l({ type: String, attribute: "empty-message" })
], f.prototype, "emptyMessage", 2);
y([
  l({ type: Boolean, attribute: "show-legend" })
], f.prototype, "showLegend", 2);
y([
  B()
], f.prototype, "sortColumn", 2);
y([
  B()
], f.prototype, "sortDirection", 2);
f = y([
  T("ai-table")
], f);
var nt = Object.defineProperty, st = Object.getOwnPropertyDescriptor, D = (t, r, a, o) => {
  for (var i = o > 1 ? void 0 : o ? st(r, a) : r, n = t.length - 1, s; n >= 0; n--)
    (s = t[n]) && (i = (o ? s(r, a, i) : s(i)) || i);
  return o && i && nt(r, a, i), i;
};
let k = class extends E {
  constructor() {
    super(...arguments), this.actions = [], this.layout = "horizontal", this.size = "md", this.variant = "secondary", this.wrap = !1, this.label = "", this.maxActions = 8;
  }
  /**
   * Handle action triggered
   */
  handleAction(t) {
    this.dispatchEvent(
      new CustomEvent("ai:action-selected", {
        detail: {
          action: t,
          timestamp: Date.now()
        },
        bubbles: !0,
        composed: !0
      })
    );
  }
  /**
   * Get visible actions
   */
  get visibleActions() {
    return this.actions.slice(0, this.maxActions);
  }
  /**
   * Get overflow count
   */
  get overflowCount() {
    return Math.max(0, this.actions.length - this.maxActions);
  }
  /**
   * Get action label
   */
  getActionLabel(t) {
    return {
      explain: "Explain",
      summarize: "Summarize",
      forecast: "Forecast",
      detect_anomaly: "Detect Anomaly",
      classify: "Classify",
      optimize: "Optimize",
      compare: "Compare",
      cluster: "Cluster"
    }[t] || t;
  }
  render() {
    return d`
      ${this.label ? d`<div class="group-label">${this.label}</div>` : null}

      <div class="group">
        ${Y(
      this.visibleActions,
      (t) => t,
      (t) => d`
            <ai-action-button
              action=${t}
              size=${this.size}
              variant=${this.variant}
              @ai:action-triggered=${() => this.handleAction(t)}
            >
              ${this.getActionLabel(t)}
            </ai-action-button>
          `
    )}
        ${this.overflowCount > 0 ? d`
              <div class="overflow" @click=${() => this.dispatchEvent(new CustomEvent("ai:overflow-clicked"))}>
                +${this.overflowCount} more
              </div>
            ` : null}
      </div>
    `;
  }
};
k.styles = [
  M,
  L`
      :host {
        display: block;
      }

      .group {
        display: flex;
        gap: var(--group-gap, var(--cg-spacing-8));
      }

      :host([layout='horizontal']) .group {
        flex-direction: row;
        align-items: center;
      }

      :host([layout='vertical']) .group {
        flex-direction: column;
        align-items: stretch;
      }

      :host([wrap]) .group {
        flex-wrap: wrap;
      }

      /* Size variants */
      :host([size='sm']) {
        --group-gap: 4px;
      }

      :host([size='md']) {
        --group-gap: var(--cg-spacing-8);
      }

      :host([size='lg']) {
        --group-gap: var(--cg-spacing-16);
      }

      /* Label */
      .group-label {
        font-size: var(--cg-font-size-sm);
        font-weight: inherit;
        color: var(--cg-gray-500);
        margin-bottom: var(--cg-spacing-4);
      }

      /* Overflow indicator */
      .overflow {
        display: inline-flex;
        align-items: center;
        gap: 4px;
        padding: 8px 12px;
        font-size: inherit;
        color: var(--cg-gray-500);
        background: inherit;
        border: 1px solid var(--cg-gray-100);
        border-radius: var(--cg-Border-radius-100);
        cursor: pointer;
        transition: all inherit;
      }

      .overflow:hover {
        background: var(--cg-gray-100);
        color: inherit;
      }

      /* Responsive */
      @media (max-width: 640px) {
        :host([layout='horizontal']) .group {
          flex-direction: column;
        }
      }

      /* Dark mode */
      @media (prefers-color-scheme: dark) {
        .group-label {
          color: #9ca3af;
        }

        .overflow {
          background: #374151;
          border-color: #4b5563;
          color: #d1d5db;
        }

        .overflow:hover {
          background: #4b5563;
          color: #f9fafb;
        }
      }
    `
];
D([
  l({ type: Array })
], k.prototype, "actions", 2);
D([
  l({ type: String, reflect: !0 })
], k.prototype, "layout", 2);
D([
  l({ type: String, reflect: !0 })
], k.prototype, "size", 2);
D([
  l({ type: String })
], k.prototype, "variant", 2);
D([
  l({ type: Boolean, reflect: !0 })
], k.prototype, "wrap", 2);
D([
  l({ type: String })
], k.prototype, "label", 2);
D([
  l({ type: Number, attribute: "max-actions" })
], k.prototype, "maxActions", 2);
k = D([
  T("ai-action-group")
], k);
var lt = Object.defineProperty, dt = Object.getOwnPropertyDescriptor, v = (t, r, a, o) => {
  for (var i = o > 1 ? void 0 : o ? dt(r, a) : r, n = t.length - 1, s; n >= 0; n--)
    (s = t[n]) && (i = (o ? s(r, a, i) : s(i)) || i);
  return o && i && lt(r, a, i), i;
};
let b = class extends E {
  constructor() {
    super(...arguments), this.data = [], this.type = "line", this.showForecast = !1, this.showAnomalies = !1, this.showGrid = !0, this.height = "200px", this.tooltipVisible = !1, this.tooltipX = 0, this.tooltipY = 0, this.tooltipContent = "";
  }
  /**
   * Get min/max values
   */
  get valueRange() {
    const t = this.data.map((r) => r.value);
    return {
      min: Math.min(...t),
      max: Math.max(...t)
    };
  }
  /**
   * Map value to Y coordinate
   */
  valueToY(t, r, a = 40) {
    const { min: o, max: i } = this.valueRange, n = i - o || 1, s = r - a * 2;
    return a + s - (t - o) / n * s;
  }
  /**
   * Map index to X coordinate
   */
  indexToX(t, r, a = 40) {
    const o = this.data.length, i = r - a * 2;
    return a + t / (o - 1) * i;
  }
  /**
   * Generate line path
   */
  generateLinePath(t, r) {
    return this.data.length === 0 ? "" : this.data.map((o, i) => {
      const n = this.indexToX(i, t), s = this.valueToY(o.value, r);
      return `${i === 0 ? "M" : "L"} ${n},${s}`;
    }).join(" ");
  }
  /**
   * Generate area path
   */
  generateAreaPath(t, r) {
    if (this.data.length === 0) return "";
    const a = this.generateLinePath(t, r), o = this.indexToX(0, t), i = this.indexToX(this.data.length - 1, t), n = r - 40;
    return `${a} L ${i},${n} L ${o},${n} Z`;
  }
  /**
   * Handle point hover
   */
  handlePointHover(t, r) {
    this.tooltipVisible = !0, this.tooltipX = t.clientX, this.tooltipY = t.clientY - 40, this.tooltipContent = `${r.label}: ${r.value}${r.forecast ? " (forecast)" : ""}`;
  }
  /**
   * Handle point leave
   */
  handlePointLeave() {
    this.tooltipVisible = !1;
  }
  /**
   * Render chart
   */
  renderChart() {
    return x`
      <svg viewBox="0 0 ${600} ${200}" preserveAspectRatio="none">
        ${this.showGrid ? this.renderGrid(600, 200) : null}
        ${this.renderAxes(600, 200)}

        ${this.type === "line" && x`
          <path class="data-line" d="${this.generateLinePath(600, 200)}" />
        `}

        ${this.type === "area" && x`
          <path class="data-area" d="${this.generateAreaPath(600, 200)}" />
          <path class="data-line" d="${this.generateLinePath(600, 200)}" />
        `}

        ${this.type === "bar" && this.renderBars(600, 200)}

        ${this.showForecast && this.renderForecast(600, 200)}

        ${(this.type === "line" || this.type === "area") && this.renderDataPoints(600, 200)}

        ${this.showAnomalies && this.renderAnomalies(600, 200)}

        ${this.renderLabels(600, 200)}
      </svg>
    `;
  }
  /**
   * Render grid
   */
  renderGrid(t, r) {
    return [0, 0.25, 0.5, 0.75, 1].map((o) => {
      const i = 40 + (r - 80) * (1 - o);
      return x`<line class="grid-line" x1="40" y1="${i}" x2="${t - 40}" y2="${i}" />`;
    });
  }
  /**
   * Render axes
   */
  renderAxes(t, r) {
    return x`
      <line class="axis-line" x1="40" y1="${r - 40}" x2="${t - 40}" y2="${r - 40}" />
      <line class="axis-line" x1="40" y1="40" x2="40" y2="${r - 40}" />
    `;
  }
  /**
   * Render bars
   */
  renderBars(t, r) {
    const a = (t - 80) / this.data.length * 0.8;
    return this.data.map((o, i) => {
      const n = this.indexToX(i, t) - a / 2, s = this.valueToY(o.value, r), p = r - 40 - s;
      return x`
        <rect
          class="bar"
          x="${n}"
          y="${s}"
          width="${a}"
          height="${p}"
        />
      `;
    });
  }
  /**
   * Render data points
   */
  renderDataPoints(t, r) {
    return this.data.map((a, o) => {
      const i = this.indexToX(o, t), n = this.valueToY(a.value, r);
      return x`
        <circle
          class="data-point"
          cx="${i}"
          cy="${n}"
          r="4"
          @mouseenter="${(s) => this.handlePointHover(s, a)}"
          @mouseleave="${() => this.handlePointLeave()}"
        />
      `;
    });
  }
  /**
   * Render forecast
   */
  renderForecast(t, r) {
    const a = this.data.filter((i) => i.forecast);
    if (a.length === 0) return null;
    const o = a.map((i, n) => {
      const s = this.data.indexOf(i), p = this.indexToX(s, t), c = this.valueToY(i.value, r);
      return `${n === 0 ? "M" : "L"} ${p},${c}`;
    });
    return x`<path class="forecast-line" d="${o.join(" ")}" />`;
  }
  /**
   * Render anomalies
   */
  renderAnomalies(t, r) {
    return this.data.filter((a) => a.anomaly).map((a, o) => {
      const i = this.data.indexOf(a), n = this.indexToX(i, t), s = this.valueToY(a.value, r);
      return x`
          <circle class="anomaly-marker" cx="${n}" cy="${s}" r="6" />
        `;
    });
  }
  /**
   * Render labels
   */
  renderLabels(t, r) {
    return this.data.map((a, o) => {
      const i = this.indexToX(o, t), n = r - 20;
      return o % Math.ceil(this.data.length / 6) === 0 ? x`
          <text class="axis-label" x="${i}" y="${n}" text-anchor="middle">
            ${a.label}
          </text>
        ` : null;
    });
  }
  render() {
    return d`
      <div class="chart-container" style="--chart-height: ${this.height}">
        ${this.renderChart()}

        <div
          class="tooltip ${this.tooltipVisible ? "visible" : ""}"
          style="left: ${this.tooltipX}px; top: ${this.tooltipY}px"
        >
          ${this.tooltipContent}
        </div>
      </div>

      ${this.showForecast || this.showAnomalies ? d`
            <div class="legend">
              <div class="legend-item">
                <div class="legend-line solid"></div>
                <span>Actual</span>
              </div>
              ${this.showForecast ? d`
                    <div class="legend-item">
                      <div class="legend-line dashed"></div>
                      <span>Forecast</span>
                    </div>
                  ` : null}
              ${this.showAnomalies ? d`
                    <div class="legend-item">
                      <div class="legend-dot"></div>
                      <span>Anomaly</span>
                    </div>
                  ` : null}
            </div>
          ` : null}
    `;
  }
};
b.styles = [
  M,
  L`
      :host {
        display: block;
        background: inherit;
        border: 1px solid var(--cg-gray-100);
        border-radius: var(--cg-Border-radius-150);
        padding: var(--cg-spacing-16);
      }

      .chart-container {
        position: relative;
        width: 100%;
        height: var(--chart-height, 200px);
      }

      svg {
        width: 100%;
        height: 100%;
        overflow: visible;
      }

      /* Chart elements */
      .grid-line {
        stroke: var(--cg-gray-100);
        stroke-width: 1;
        stroke-dasharray: 4 4;
      }

      .axis-line {
        stroke: var(--cg-gray-500);
        stroke-width: 2;
      }

      .axis-label {
        font-size: 11px;
        fill: var(--cg-gray-500);
        font-family: inherit;
      }

      /* Data line */
      .data-line {
        fill: none;
        stroke: inherit;
        stroke-width: 3;
        stroke-linecap: round;
        stroke-linejoin: round;
      }

      .data-area {
        fill: inherit;
        opacity: 0.1;
      }

      /* Forecast */
      .forecast-line {
        fill: none;
        stroke: inherit;
        stroke-width: 3;
        stroke-dasharray: 8 4;
        opacity: 0.7;
      }

      .confidence-band {
        fill: inherit;
        opacity: 0.3;
      }

      /* Data points */
      .data-point {
        fill: inherit;
        stroke: inherit;
        stroke-width: 2;
        cursor: pointer;
        transition: all inherit;
      }

      .data-point:hover {
        r: 6;
        fill: inherit;
        filter: brightness(1.2);
      }

      /* Anomaly markers */
      .anomaly-marker {
        fill: #ef4444;
        stroke: #ffffff;
        stroke-width: 2;
        animation: pulse 2s infinite;
      }

      @keyframes pulse {
        0%, 100% {
          opacity: 1;
        }
        50% {
          opacity: 0.5;
        }
      }

      /* Bars */
      .bar {
        fill: inherit;
        transition: all inherit;
      }

      .bar:hover {
        fill: inherit;
        filter: brightness(1.2);
      }

      /* Tooltip */
      .tooltip {
        position: absolute;
        background: inherit;
        color: white;
        padding: 8px 12px;
        border-radius: var(--cg-Border-radius-50);
        font-size: inherit;
        pointer-events: none;
        opacity: 0;
        transition: opacity inherit;
        z-index: 10;
        white-space: nowrap;
      }

      .tooltip.visible {
        opacity: 1;
      }

      .tooltip-label {
        font-weight: inherit;
        margin-bottom: 4px;
      }

      .tooltip-value {
        color: inherit;
      }

      /* Legend */
      .legend {
        display: flex;
        align-items: center;
        gap: var(--cg-spacing-16);
        margin-top: var(--cg-spacing-16);
        font-size: inherit;
        color: var(--cg-gray-500);
      }

      .legend-item {
        display: flex;
        align-items: center;
        gap: 6px;
      }

      .legend-line {
        width: 20px;
        height: 2px;
      }

      .legend-line.solid {
        background: inherit;
      }

      .legend-line.dashed {
        background: linear-gradient(to right, inherit 50%, transparent 50%);
        background-size: 8px 2px;
      }

      .legend-dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: #ef4444;
      }

      /* Dark mode */
      @media (prefers-color-scheme: dark) {
        :host {
          background: #1f2937;
          border-color: #374151;
        }

        .grid-line {
          stroke: #374151;
        }

        .axis-line,
        .axis-label {
          stroke: #9ca3af;
          fill: #9ca3af;
        }

        .data-point {
          stroke: #1f2937;
        }

        .legend {
          color: #9ca3af;
        }
      }
    `
];
v([
  l({ type: Array })
], b.prototype, "data", 2);
v([
  l({ type: String })
], b.prototype, "type", 2);
v([
  l({ type: Boolean, attribute: "show-forecast" })
], b.prototype, "showForecast", 2);
v([
  l({ type: Boolean, attribute: "show-anomalies" })
], b.prototype, "showAnomalies", 2);
v([
  l({ type: Boolean, attribute: "show-grid" })
], b.prototype, "showGrid", 2);
v([
  l({ type: String })
], b.prototype, "height", 2);
v([
  B()
], b.prototype, "tooltipVisible", 2);
v([
  B()
], b.prototype, "tooltipX", 2);
v([
  B()
], b.prototype, "tooltipY", 2);
v([
  B()
], b.prototype, "tooltipContent", 2);
b = v([
  T("ai-mini-chart")
], b);
function e(t) {
  return `var(--cg-${t})`;
}
const ft = {
  // Colors
  color: {
    primaryMain: e("brand-primary-300"),
    primaryLight: e("brand-primary-200"),
    primaryDark: e("brand-primary-400"),
    secondaryMain: e("brand-secondary-300"),
    aiAccent: e("brand-ai-accent"),
    aiHighlight: e("brand-ai-highlight"),
    aiBackground: e("brand-ai-background"),
    aiBorder: e("brand-ai-border"),
    aiGlow: e("brand-ai-glow"),
    success: e("brand-success-main"),
    warning: e("brand-warning-main"),
    danger: e("brand-danger-main"),
    info: e("brand-info-main"),
    grayWhite: e("gray-white"),
    gray50: e("gray-50"),
    gray100: e("gray-100"),
    gray500: e("gray-500"),
    gray900: e("gray-900")
  },
  // Spacing
  spacing: {
    xs: e("spacing-4"),
    sm: e("spacing-8"),
    md: e("spacing-16"),
    lg: e("spacing-24"),
    xl: e("spacing-32")
  },
  // Typography - Updated to use new semantic tokens
  fontSize: {
    xs: e("font-size-xs"),
    // 12px
    sm: e("font-size-sm"),
    // 14px
    base: e("font-size-base"),
    // 16px
    md: e("font-size-md"),
    // 18px
    lg: e("font-size-lg"),
    // 20px
    xl: e("font-size-xl"),
    // 24px
    "2xl": e("font-size-2xl"),
    // 30px
    "3xl": e("font-size-3xl")
    // 36px
  },
  fontWeight: {
    light: e("font-weight-light"),
    // 300
    normal: e("font-weight-normal"),
    // 400
    medium: e("font-weight-medium"),
    // 500
    semibold: e("font-weight-semibold"),
    // 600
    bold: e("font-weight-bold"),
    // 700
    extrabold: e("font-weight-extrabold"),
    // 800
    black: e("font-weight-black")
    // 900
  },
  fontFamily: {
    primary: e("font-family-primary"),
    // Inter Variable
    display: e("font-family-display"),
    // Satoshi Variable
    mono: e("font-family-mono")
    // Fira Code
  },
  lineHeight: {
    tight: e("line-height-tight"),
    // 1.2
    snug: e("line-height-snug"),
    // 1.375
    normal: e("line-height-normal"),
    // 1.5
    relaxed: e("line-height-relaxed"),
    // 1.625
    loose: e("line-height-loose")
    // 1.75
  },
  letterSpacing: {
    tighter: e("letter-spacing-tighter"),
    // -0.05em
    tight: e("letter-spacing-tight"),
    // -0.025em
    normal: e("letter-spacing-normal"),
    // 0em
    wide: e("letter-spacing-wide"),
    // 0.025em
    wider: e("letter-spacing-wider"),
    // 0.05em
    widest: e("letter-spacing-widest")
    // 0.1em
  },
  // Border radius
  radius: {
    sm: e("Border-radius-50"),
    md: e("Border-radius-100"),
    lg: e("Border-radius-150"),
    full: e("Border-radius-full")
  },
  // Transitions
  transition: {
    fast: e("transition-duration-fast"),
    default: e("transition-duration-default"),
    slow: e("transition-duration-slow")
  },
  // AI-specific tokens
  ai: {
    confidence: {
      high: {
        color: e("ai-confidence-high-color"),
        background: e("ai-confidence-high-background"),
        border: e("ai-confidence-high-border")
      },
      medium: {
        color: e("ai-confidence-medium-color"),
        background: e("ai-confidence-medium-background"),
        border: e("ai-confidence-medium-border")
      },
      low: {
        color: e("ai-confidence-low-color"),
        background: e("ai-confidence-low-background"),
        border: e("ai-confidence-low-border")
      }
    },
    anomaly: {
      critical: {
        color: e("ai-anomaly-critical-color"),
        background: e("ai-anomaly-critical-background"),
        border: e("ai-anomaly-critical-border"),
        glow: e("ai-anomaly-critical-glow")
      },
      high: {
        color: e("ai-anomaly-high-color"),
        background: e("ai-anomaly-high-background"),
        border: e("ai-anomaly-high-border"),
        glow: e("ai-anomaly-high-glow")
      },
      medium: {
        color: e("ai-anomaly-medium-color"),
        background: e("ai-anomaly-medium-background"),
        border: e("ai-anomaly-medium-border"),
        glow: e("ai-anomaly-medium-glow")
      },
      low: {
        color: e("ai-anomaly-low-color"),
        background: e("ai-anomaly-low-background"),
        border: e("ai-anomaly-low-border"),
        glow: e("ai-anomaly-low-glow")
      }
    },
    state: {
      idle: {
        color: e("ai-state-idle-color"),
        background: e("ai-state-idle-background"),
        border: e("ai-state-idle-border")
      },
      processing: {
        color: e("ai-state-processing-color"),
        background: e("ai-state-processing-background"),
        border: e("ai-state-processing-border")
      },
      streaming: {
        color: e("ai-state-streaming-color"),
        background: e("ai-state-streaming-background"),
        border: e("ai-state-streaming-border")
      },
      success: {
        color: e("ai-state-success-color"),
        background: e("ai-state-success-background"),
        border: e("ai-state-success-border")
      },
      error: {
        color: e("ai-state-error-color"),
        background: e("ai-state-error-background"),
        border: e("ai-state-error-border")
      }
    },
    thinking: {
      duration: e("ai-thinking-duration"),
      color: e("ai-thinking-color"),
      dotSize: {
        sm: e("ai-thinking-dotSize-sm"),
        md: e("ai-thinking-dotSize-md"),
        lg: e("ai-thinking-dotSize-lg")
      },
      dotGap: {
        sm: e("ai-thinking-dotGap-sm"),
        md: e("ai-thinking-dotGap-md"),
        lg: e("ai-thinking-dotGap-lg")
      }
    },
    chart: {
      forecastLine: e("ai-chart-forecastLine"),
      confidenceBand: e("ai-chart-confidenceBand"),
      anomalyMarker: e("ai-chart-anomalyMarker"),
      trendUp: e("ai-chart-trendUp"),
      trendDown: e("ai-chart-trendDown"),
      gridColor: e("ai-chart-gridColor"),
      axisColor: e("ai-chart-axisColor")
    },
    effect: {
      glow: {
        color: e("ai-effect-glow-color"),
        blur: e("ai-effect-glow-blur"),
        spread: e("ai-effect-glow-spread")
      },
      shimmer: {
        from: e("ai-effect-shimmer-from"),
        to: e("ai-effect-shimmer-to"),
        duration: e("ai-effect-shimmer-duration")
      },
      backdropBlur: e("ai-effect-backdropBlur"),
      gradient: {
        from: e("ai-effect-gradient-from"),
        to: e("ai-effect-gradient-to")
      }
    },
    result: {
      background: e("ai-result-background"),
      border: e("ai-result-border"),
      padding: e("ai-result-padding"),
      borderRadius: e("ai-result-borderRadius")
    }
  }
}, mt = "0.0.0";
export {
  w as AiActionButton,
  k as AiActionGroup,
  wt as AiConfidenceBadge,
  kt as AiInsightCard,
  b as AiMiniChart,
  $ as AiResultPanel,
  f as AiTable,
  vt as AiThinkingIndicator,
  mt as VERSION,
  e as token,
  ft as tokens
};
//# sourceMappingURL=index.js.map
