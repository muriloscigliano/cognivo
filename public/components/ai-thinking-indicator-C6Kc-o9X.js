import { css as p, LitElement as c, html as h } from "lit";
import { b as g, a as v, n as l, t as m } from "./base-Ce59O1a4.js";
var u = Object.defineProperty, x = Object.getOwnPropertyDescriptor, o = (d, e, a, s) => {
  for (var i = s > 1 ? void 0 : s ? x(e, a) : e, n = d.length - 1, r; n >= 0; n--)
    (r = d[n]) && (i = (s ? r(e, a, i) : r(i)) || i);
  return s && i && u(e, a, i), i;
};
let t = class extends c {
  constructor() {
    super(...arguments), this.size = "md", this.label = "AI is thinking";
  }
  render() {
    return h`
      <div class="container" role="status" aria-live="polite">
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
        <span class="sr-only">${this.label}</span>
      </div>
    `;
  }
};
t.styles = [
  g,
  v,
  p`
      :host {
        display: inline-flex;
        align-items: center;
        gap: var(--gap, var(--cg-spacing-4));
      }

      .container {
        display: inline-flex;
        align-items: center;
        gap: inherit;
        padding: var(--cg-spacing-4);
      }

      .dot {
        background: inherit;
        border-radius: var(--cg-Border-radius-full);
        width: var(--dot-size, 8px);
        height: var(--dot-size, 8px);
        animation: pulse 1.4s ease-in-out infinite;
      }

      .dot:nth-child(1) {
        animation-delay: 0s;
      }

      .dot:nth-child(2) {
        animation-delay: 0.2s;
      }

      .dot:nth-child(3) {
        animation-delay: 0.4s;
      }

      /* Size variants */
      :host([size='sm']) {
        --dot-size: 6px;
        --gap: 4px;
      }

      :host([size='md']) {
        --dot-size: 8px;
        --gap: 6px;
      }

      :host([size='lg']) {
        --dot-size: 10px;
        --gap: 8px;
      }

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
o([
  l({ type: String, reflect: !0 })
], t.prototype, "size", 2);
o([
  l({ type: String })
], t.prototype, "label", 2);
t = o([
  m("ai-thinking-indicator")
], t);
export {
  t as A
};
//# sourceMappingURL=ai-thinking-indicator-C6Kc-o9X.js.map
