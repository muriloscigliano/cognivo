// Derives the text/background token pairs that @cognivo/components actually
// paint, by reading every component's Lit `css` template. validate-contrast.mjs
// gates each derived pair in both themes, so a component that starts painting
// a new token pair is audited without anyone editing a hand list.
//
// Derivation (per component, per CSS rule):
//  1. A rule that sets both `color: var(--cg-…)` and `background(-color):
//     var(--cg-…)` is a pair.
//  2. A rule that sets only one side borrows the other side from rules with
//     the same selector once state pseudo-classes are removed (`:hover`,
//     `:not(:disabled)`, …). `.btn:hover { background }` pairs with
//     `.btn { color }`.
//  3. Text whose element has no background sits on the component's `:host`
//     background, or, when the host is transparent, on the page: it is
//     paired with the three page surfaces (base, cards, container).
//
// Skipped: disabled / inactive states (WCAG 1.4.3 exempts them), `color:`
// values that are not a single `--cg-color-*` token (inherit, currentColor,
// gradients, fallbacks to raw values), and backgrounds that are not a single
// colour token (gradients, images, transparent).
//
// Non-text tokens painted through `color` (icons, checkmarks, dots, borders
// used via currentColor) are audited at 3:1 (WCAG 1.4.11), text at 4.5:1.
//
// When a rule's background comes from an ancestor element the CSS cannot show
// (text inside a code block, a checkmark on the checked box), the rule says so
// in a comment, next to the colour it explains:
//   .hl-keyword { color: var(--cg-color-code-keyword); /* contrast: on --cg-color-code-background */ }
//   .close { color: …; /* contrast: non-text */ }   (icon-only control: 3:1)
//   blockquote::before { color: …; /* contrast: decorative */ }   (not audited)
// `non-text` and `on …` combine: `/* contrast: non-text on --cg-color-x */`.

import fs from 'node:fs'
import path from 'node:path'

export const PAGE_SURFACES = [
  'color-surface-base-background',
  'color-surface-cards-background',
  'color-surface-container-background',
]

const NON_TEXT = /(^|-)(icon|checkmark|dot|border|divider|outline|ring|track|thumb|indicator|scrollbar)(-|$)/
const DISABLED_TOKEN = /(^|-)disabled?(-|$)/
const DISABLED_SELECTOR = /disabled|\[aria-disabled|inert/
const STATE_PSEUDO = /:(?:hover|focus-visible|focus-within|focus|active|visited|not\((?:[^()]|\([^()]*\))*\))/g

/** The single `--cg-*` token a colour declaration consists of, else null. */
function soleColorToken(value) {
  const m = value.trim().match(/^var\(\s*--cg-([a-z0-9-]+)\s*\)$/)
  return m ? m[1] : null
}

/** Text of every css`…` template in a TS source (interpolations removed). */
export function cssTemplates(source) {
  const out = []
  const re = /\bcss`/g
  while (re.exec(source)) {
    let i = re.lastIndex
    let depth = 0
    let text = ''
    for (; i < source.length; i++) {
      const c = source[i]
      if (depth === 0 && c === '\\') { text += source[i + 1] ?? ''; i++; continue }
      if (depth === 0 && c === '`') break
      if (depth === 0 && c === '$' && source[i + 1] === '{') { depth = 1; i++; continue }
      if (depth > 0) {
        if (c === '{') depth++
        else if (c === '}') depth--
        continue
      }
      text += c
    }
    out.push(text)
    re.lastIndex = i + 1
  }
  return out
}

/** Flat list of { selectors: string[], decls: Map } from CSS text; at-rule blocks are flattened, @keyframes dropped. */
export function cssRules(text) {
  // Comments are dropped, except `contrast:` annotations, kept as a declaration.
  const css = text.replace(/\/\*([\s\S]*?)\*\//g, (_, inner) => {
    const note = inner.match(/^\s*contrast:\s*([\s\S]+?)\s*$/)
    return note ? `;--contrast:${note[1]};` : ' '
  })
  const rules = []
  const walk = (s) => {
    let i = 0
    while (i < s.length) {
      const open = s.indexOf('{', i)
      if (open === -1) return
      const prelude = s.slice(i, open).trim()
      let depth = 1
      let j = open + 1
      for (; j < s.length && depth > 0; j++) {
        if (s[j] === '{') depth++
        else if (s[j] === '}') depth--
      }
      const body = s.slice(open + 1, j - 1)
      i = j
      // A stray `;` before a rule (e.g. after an @import) belongs to nothing.
      const sel = prelude.slice(prelude.lastIndexOf(';') + 1).trim()
      if (sel.startsWith('@')) {
        if (/^@(?:-webkit-)?keyframes/.test(sel) || sel.startsWith('@font-face')) continue
        walk(body)
        continue
      }
      const decls = new Map()
      for (const d of body.split(';')) {
        const k = d.indexOf(':')
        if (k === -1) continue
        decls.set(d.slice(0, k).trim().toLowerCase(), d.slice(k + 1).trim())
      }
      rules.push({ selectors: splitSelectors(sel), decls })
    }
  }
  walk(css)
  return rules
}

function splitSelectors(sel) {
  const out = []
  let depth = 0
  let cur = ''
  for (const c of sel) {
    if (c === '(' || c === '[') depth++
    else if (c === ')' || c === ']') depth--
    if (c === ',' && depth === 0) { out.push(cur.trim()); cur = ''; continue }
    cur += c
  }
  if (cur.trim()) out.push(cur.trim())
  return out
}

const baseSelector = (s) => s.replace(STATE_PSEUDO, '').replace(/\s+/g, ' ').trim()

/**
 * Pairs one component paints. Returns [{ fg, bg, min, selector }].
 */
export function pairsFromCss(text) {
  const entries = [] // { selector, base, fg, bg, on }
  for (const rule of cssRules(text)) {
    const note = rule.decls.get('--contrast')
    if (note === 'decorative') continue
    const fg = rule.decls.has('color') ? soleColorToken(rule.decls.get('color')) : null
    const bgDecl = rule.decls.get('background-color') ?? rule.decls.get('background')
    const bg = bgDecl ? soleColorToken(bgDecl) : null
    // `contrast: [non-text] [on --cg-color-x]`: icon-only (3:1) and/or the
    // background this rule's colour sits on.
    const parsed = note?.match(/^(non-text)?\s*(?:on\s+--cg-(color-[a-z0-9-]+))?$/)
    if (note && (!parsed || (!parsed[1] && !parsed[2]))) {
      throw new Error(`unknown contrast annotation "${note}" (use "on --cg-color-…", "non-text", or "decorative")`)
    }
    if (!fg && !bg) continue
    for (const selector of rule.selectors) {
      entries.push({ selector, base: baseSelector(selector), fg, bg, on: parsed?.[2] ?? null, nonText: Boolean(parsed?.[1]) })
    }
  }

  const byBase = new Map()
  for (const e of entries) {
    const list = byBase.get(e.base) ?? []
    list.push(e)
    byBase.set(e.base, list)
  }
  // A component that paints its own host sets the surface its text sits on.
  const hostBgs = [...new Set(entries.filter((e) => e.base === ':host' && e.bg).map((e) => e.bg))]

  const pairs = []
  const add = (fg, bg, selector, nonText = false) => {
    if (DISABLED_TOKEN.test(fg) || DISABLED_TOKEN.test(bg)) return
    if (DISABLED_SELECTOR.test(selector.replace(/:not\((?:[^()]|\([^()]*\))*\)/g, ''))) return
    pairs.push({ fg, bg, min: nonText || NON_TEXT.test(fg) ? 3 : 4.5, selector })
  }
  for (const e of entries) {
    const siblings = byBase.get(e.base)
    if (e.fg && e.bg) { add(e.fg, e.bg, e.selector, e.nonText); continue }
    if (e.fg && e.on) { add(e.fg, e.on, e.selector, e.nonText); continue }
    if (e.fg) {
      // A sibling that sets its own text colour paints a different pair.
      const bgs = [...new Set(siblings.filter((s) => s.bg && !s.fg).map((s) => s.bg))]
      // Text whose own element has no background sits on the host's surface,
      // or on the page when the host is transparent.
      const under = bgs.length ? bgs : hostBgs.length ? hostBgs : PAGE_SURFACES
      under.forEach((bg) => add(e.fg, bg, e.selector, e.nonText))
      continue
    }
    // Background only: pair with the text colours set for the same element.
    const fgs = [...new Set(siblings.filter((s) => s.fg).map((s) => s.fg))]
    const nonText = siblings.some((s) => s.nonText)
    fgs.forEach((fg) => add(fg, e.bg, e.selector, nonText))
  }
  return pairs
}

/**
 * Every pair painted by the components under `componentsDir`
 * (`packages/components/src/components`). Deduplicated by fg/bg/min, each
 * pair listing where it is used.
 */
export function deriveComponentPairs(componentsDir) {
  const map = new Map()
  for (const dir of fs.readdirSync(componentsDir).sort()) {
    const full = path.join(componentsDir, dir)
    if (!fs.statSync(full).isDirectory()) continue
    for (const file of fs.readdirSync(full).sort()) {
      if (!file.endsWith('.ts') || file.endsWith('.test.ts') || file.endsWith('.d.ts')) continue
      const source = fs.readFileSync(path.join(full, file), 'utf8')
      for (const tpl of cssTemplates(source)) {
        for (const p of pairsFromCss(tpl)) {
          const key = `${p.fg}|${p.bg}|${p.min}`
          const entry = map.get(key) ?? { fg: p.fg, bg: p.bg, min: p.min, usedBy: [] }
          const where = `${dir} ${p.selector}`
          if (!entry.usedBy.includes(where)) entry.usedBy.push(where)
          map.set(key, entry)
        }
      }
    }
  }
  return [...map.values()]
}
