import { css as F, LitElement as q, html as B } from "lit";
import { b as G, n as z, t as J } from "./base-Ce59O1a4.js";
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const I = globalThis, T = I.trustedTypes, O = T ? T.createPolicy("lit-html", { createHTML: (n) => n }) : void 0, W = "$lit$", g = `lit$${Math.random().toFixed(9).slice(2)}$`, k = "?" + g, K = `<${k}>`, f = document, C = () => f.createComment(""), x = (n) => n === null || typeof n != "object" && typeof n != "function", P = Array.isArray, Q = (n) => P(n) || typeof n?.[Symbol.iterator] == "function", E = `[ 	
\f\r]`, y = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, U = /-->/g, j = />/g, A = RegExp(`>|${E}(?:([^\\s"'>=/]+)(${E}*=${E}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), L = /'/g, R = /"/g, V = /^(?:script|style|textarea|title)$/i, m = Symbol.for("lit-noChange"), c = Symbol.for("lit-nothing"), D = /* @__PURE__ */ new WeakMap(), _ = f.createTreeWalker(f, 129);
function Z(n, t) {
  if (!P(n) || !n.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return O !== void 0 ? O.createHTML(t) : t;
}
const X = (n, t) => {
  const s = n.length - 1, e = [];
  let i, r = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = y;
  for (let p = 0; p < s; p++) {
    const h = n[p];
    let l, d, a = -1, $ = 0;
    for (; $ < h.length && (o.lastIndex = $, d = o.exec(h), d !== null); ) $ = o.lastIndex, o === y ? d[1] === "!--" ? o = U : d[1] !== void 0 ? o = j : d[2] !== void 0 ? (V.test(d[2]) && (i = RegExp("</" + d[2], "g")), o = A) : d[3] !== void 0 && (o = A) : o === A ? d[0] === ">" ? (o = i ?? y, a = -1) : d[1] === void 0 ? a = -2 : (a = o.lastIndex - d[2].length, l = d[1], o = d[3] === void 0 ? A : d[3] === '"' ? R : L) : o === R || o === L ? o = A : o === U || o === j ? o = y : (o = A, i = void 0);
    const u = o === A && n[p + 1].startsWith("/>") ? " " : "";
    r += o === y ? h + K : a >= 0 ? (e.push(l), h.slice(0, a) + W + h.slice(a) + g + u) : h + g + (a === -2 ? p : u);
  }
  return [Z(n, r + (n[s] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), e];
};
class H {
  constructor({ strings: t, _$litType$: s }, e) {
    let i;
    this.parts = [];
    let r = 0, o = 0;
    const p = t.length - 1, h = this.parts, [l, d] = X(t, s);
    if (this.el = H.createElement(l, e), _.currentNode = this.el.content, s === 2 || s === 3) {
      const a = this.el.content.firstChild;
      a.replaceWith(...a.childNodes);
    }
    for (; (i = _.nextNode()) !== null && h.length < p; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes()) for (const a of i.getAttributeNames()) if (a.endsWith(W)) {
          const $ = d[o++], u = i.getAttribute(a).split(g), N = /([.?@])?(.*)/.exec($);
          h.push({ type: 1, index: r, name: N[2], strings: u, ctor: N[1] === "." ? tt : N[1] === "?" ? et : N[1] === "@" ? st : M }), i.removeAttribute(a);
        } else a.startsWith(g) && (h.push({ type: 6, index: r }), i.removeAttribute(a));
        if (V.test(i.tagName)) {
          const a = i.textContent.split(g), $ = a.length - 1;
          if ($ > 0) {
            i.textContent = T ? T.emptyScript : "";
            for (let u = 0; u < $; u++) i.append(a[u], C()), _.nextNode(), h.push({ type: 2, index: ++r });
            i.append(a[$], C());
          }
        }
      } else if (i.nodeType === 8) if (i.data === k) h.push({ type: 2, index: r });
      else {
        let a = -1;
        for (; (a = i.data.indexOf(g, a + 1)) !== -1; ) h.push({ type: 7, index: r }), a += g.length - 1;
      }
      r++;
    }
  }
  static createElement(t, s) {
    const e = f.createElement("template");
    return e.innerHTML = t, e;
  }
}
function v(n, t, s = n, e) {
  if (t === m) return t;
  let i = e !== void 0 ? s._$Co?.[e] : s._$Cl;
  const r = x(t) ? void 0 : t._$litDirective$;
  return i?.constructor !== r && (i?._$AO?.(!1), r === void 0 ? i = void 0 : (i = new r(n), i._$AT(n, s, e)), e !== void 0 ? (s._$Co ??= [])[e] = i : s._$Cl = i), i !== void 0 && (t = v(n, i._$AS(n, t.values), i, e)), t;
}
class Y {
  constructor(t, s) {
    this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = s;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    const { el: { content: s }, parts: e } = this._$AD, i = (t?.creationScope ?? f).importNode(s, !0);
    _.currentNode = i;
    let r = _.nextNode(), o = 0, p = 0, h = e[0];
    for (; h !== void 0; ) {
      if (o === h.index) {
        let l;
        h.type === 2 ? l = new w(r, r.nextSibling, this, t) : h.type === 1 ? l = new h.ctor(r, h.name, h.strings, this, t) : h.type === 6 && (l = new it(r, this, t)), this._$AV.push(l), h = e[++p];
      }
      o !== h?.index && (r = _.nextNode(), o++);
    }
    return _.currentNode = f, i;
  }
  p(t) {
    let s = 0;
    for (const e of this._$AV) e !== void 0 && (e.strings !== void 0 ? (e._$AI(t, e, s), s += e.strings.length - 2) : e._$AI(t[s])), s++;
  }
}
class w {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, s, e, i) {
    this.type = 2, this._$AH = c, this._$AN = void 0, this._$AA = t, this._$AB = s, this._$AM = e, this.options = i, this._$Cv = i?.isConnected ?? !0;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const s = this._$AM;
    return s !== void 0 && t?.nodeType === 11 && (t = s.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, s = this) {
    t = v(this, t, s), x(t) ? t === c || t == null || t === "" ? (this._$AH !== c && this._$AR(), this._$AH = c) : t !== this._$AH && t !== m && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Q(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== c && x(this._$AH) ? this._$AA.nextSibling.data = t : this.T(f.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: s, _$litType$: e } = t, i = typeof e == "number" ? this._$AC(t) : (e.el === void 0 && (e.el = H.createElement(Z(e.h, e.h[0]), this.options)), e);
    if (this._$AH?._$AD === i) this._$AH.p(s);
    else {
      const r = new Y(i, this), o = r.u(this.options);
      r.p(s), this.T(o), this._$AH = r;
    }
  }
  _$AC(t) {
    let s = D.get(t.strings);
    return s === void 0 && D.set(t.strings, s = new H(t)), s;
  }
  k(t) {
    P(this._$AH) || (this._$AH = [], this._$AR());
    const s = this._$AH;
    let e, i = 0;
    for (const r of t) i === s.length ? s.push(e = new w(this.O(C()), this.O(C()), this, this.options)) : e = s[i], e._$AI(r), i++;
    i < s.length && (this._$AR(e && e._$AB.nextSibling, i), s.length = i);
  }
  _$AR(t = this._$AA.nextSibling, s) {
    for (this._$AP?.(!1, !0, s); t !== this._$AB; ) {
      const e = t.nextSibling;
      t.remove(), t = e;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class M {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, s, e, i, r) {
    this.type = 1, this._$AH = c, this._$AN = void 0, this.element = t, this.name = s, this._$AM = i, this.options = r, e.length > 2 || e[0] !== "" || e[1] !== "" ? (this._$AH = Array(e.length - 1).fill(new String()), this.strings = e) : this._$AH = c;
  }
  _$AI(t, s = this, e, i) {
    const r = this.strings;
    let o = !1;
    if (r === void 0) t = v(this, t, s, 0), o = !x(t) || t !== this._$AH && t !== m, o && (this._$AH = t);
    else {
      const p = t;
      let h, l;
      for (t = r[0], h = 0; h < r.length - 1; h++) l = v(this, p[e + h], s, h), l === m && (l = this._$AH[h]), o ||= !x(l) || l !== this._$AH[h], l === c ? t = c : t !== c && (t += (l ?? "") + r[h + 1]), this._$AH[h] = l;
    }
    o && !i && this.j(t);
  }
  j(t) {
    t === c ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class tt extends M {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === c ? void 0 : t;
  }
}
class et extends M {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== c);
  }
}
class st extends M {
  constructor(t, s, e, i, r) {
    super(t, s, e, i, r), this.type = 5;
  }
  _$AI(t, s = this) {
    if ((t = v(this, t, s, 0) ?? c) === m) return;
    const e = this._$AH, i = t === c && e !== c || t.capture !== e.capture || t.once !== e.once || t.passive !== e.passive, r = t !== c && (e === c || i);
    i && this.element.removeEventListener(this.name, this, e), r && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class it {
  constructor(t, s, e) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = s, this.options = e;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    v(this, t);
  }
}
const $t = { I: w }, nt = I.litHtmlPolyfillSupport;
nt?.(H, w), (I.litHtmlVersions ??= []).push("3.3.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const rt = { ATTRIBUTE: 1, CHILD: 2 }, ot = (n) => (...t) => ({ _$litDirective$: n, values: t });
class ht {
  constructor(t) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(t, s, e) {
    this._$Ct = t, this._$AM = s, this._$Ci = e;
  }
  _$AS(t, s) {
    return this.update(t, s);
  }
  update(t, s) {
    return this.render(...s);
  }
}
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const at = ot(class extends ht {
  constructor(n) {
    if (super(n), n.type !== rt.ATTRIBUTE || n.name !== "class" || n.strings?.length > 2) throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.");
  }
  render(n) {
    return " " + Object.keys(n).filter(((t) => n[t])).join(" ") + " ";
  }
  update(n, [t]) {
    if (this.st === void 0) {
      this.st = /* @__PURE__ */ new Set(), n.strings !== void 0 && (this.nt = new Set(n.strings.join(" ").split(/\s/).filter(((e) => e !== ""))));
      for (const e in t) t[e] && !this.nt?.has(e) && this.st.add(e);
      return this.render(t);
    }
    const s = n.element.classList;
    for (const e of this.st) e in t || (s.remove(e), this.st.delete(e));
    for (const e in t) {
      const i = !!t[e];
      i === this.st.has(e) || this.nt?.has(e) || (i ? (s.add(e), this.st.add(e)) : (s.remove(e), this.st.delete(e)));
    }
    return m;
  }
});
var lt = Object.defineProperty, ct = Object.getOwnPropertyDescriptor, S = (n, t, s, e) => {
  for (var i = e > 1 ? void 0 : e ? ct(t, s) : t, r = n.length - 1, o; r >= 0; r--)
    (o = n[r]) && (i = (e ? o(t, s, i) : o(i)) || i);
  return e && i && lt(t, s, i), i;
};
let b = class extends q {
  constructor() {
    super(...arguments), this.score = 0, this.size = "md", this.showPercentage = !1;
  }
  /**
   * Get confidence level based on score
   */
  get level() {
    return this.score >= 0.8 ? "high" : this.score >= 0.5 ? "medium" : "low";
  }
  /**
   * Get label text based on level
   */
  get label() {
    switch (this.level) {
      case "high":
        return "High confidence";
      case "medium":
        return "Medium confidence";
      case "low":
        return "Low confidence";
    }
  }
  render() {
    const n = Math.round(this.score * 100), t = {
      badge: !0,
      [this.level]: !0
    };
    return B`
      <div class=${at(t)} role="status" aria-label="${this.label}">
        <span class="dot"></span>
        ${this.showPercentage ? B`<span class="percentage">${n}%</span>` : null}
      </div>
    `;
  }
};
b.styles = [
  G,
  F`
      :host {
        display: inline-flex;
        align-items: center;
        gap: var(--cg-spacing-4);
      }

      .badge {
        display: inline-flex;
        align-items: center;
        gap: var(--cg-spacing-4);
        padding: var(--badge-padding, 4px 8px);
        border-radius: var(--cg-Border-radius-full);
        font-size: var(--badge-font-size, inherit);
        font-weight: inherit;
        transition: all inherit;
      }

      .badge.high {
        background: inherit;
        color: white;
      }

      .badge.medium {
        background: inherit;
        color: white;
      }

      .badge.low {
        background: inherit;
        color: white;
      }

      .dot {
        width: 6px;
        height: 6px;
        border-radius: var(--cg-Border-radius-full);
        background: currentColor;
      }

      /* Size variants */
      :host([size='sm']) {
        --badge-padding: 2px 6px;
        --badge-font-size: 10px;
      }

      :host([size='md']) {
        --badge-padding: 4px 8px;
        --badge-font-size: inherit;
      }

      :host([size='lg']) {
        --badge-padding: 6px 12px;
        --badge-font-size: var(--cg-font-size-sm);
      }

      .percentage {
        font-variant-numeric: tabular-nums;
      }
    `
];
S([
  z({ type: Number })
], b.prototype, "score", 2);
S([
  z({ type: String, reflect: !0 })
], b.prototype, "size", 2);
S([
  z({ type: Boolean, attribute: "show-percentage" })
], b.prototype, "showPercentage", 2);
b = S([
  J("ai-confidence-badge")
], b);
export {
  b as A,
  m as T,
  $t as Z,
  ot as a,
  at as e,
  ht as i,
  rt as t
};
//# sourceMappingURL=ai-confidence-badge-ANAt5vzm.js.map
