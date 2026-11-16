#!/usr/bin/env node
/**
 * validate-contrast.mjs
 *
 * Parses dist/index.css and validates WCAG 2.1 AA contrast ratios
 * for the on-color / status / bias / ai token pairs we care about.
 *
 * Fails (exit 1) if any semantic foreground/background pair is below 4.5:1.
 *
 * Strategy:
 *  1. Parse every `--cg-<name>: <value>;` declaration.
 *  2. Resolve `var(--cg-*)` references recursively until we get a literal.
 *  3. For a predefined list of foreground↔background pairs, compute contrast.
 *  4. Run twice: once against the :root (light) layer, once with data-theme="dark"
 *     overrides applied on top.
 *  5. Every text/background pair the components paint, derived from their
 *     Lit `css` templates (scripts/component-pairs.mjs), is a hard gate too.
 *     Known failures not fixed yet are listed, one per component + selector
 *     + theme + pair with the ratio measured when listed, in
 *     scripts/contrast-baseline.json (see contrast-baseline.mjs): the list
 *     can only shrink (`maxEntries`), a listed pair may not get worse, and an
 *     entry that passes or is no longer painted fails until removed.
 */

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { deriveComponentPairs } from './component-pairs.mjs'
import { checkBaseline } from './contrast-baseline.mjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const CSS_PATH = path.resolve(__dirname, '..', 'dist', 'index.css')
const COMPONENTS_DIR = path.resolve(__dirname, '..', '..', 'components', 'src', 'components')
const BASELINE_PATH = path.resolve(__dirname, 'contrast-baseline.json')

// ---------- color math ----------
function hexToRgb(hex) {
  let h = hex.replace('#', '').trim()
  if (h.length === 3) h = h.split('').map((c) => c + c).join('')
  if (h.length !== 6) return null
  const num = parseInt(h, 16)
  if (Number.isNaN(num)) return null
  return { r: (num >> 16) & 255, g: (num >> 8) & 255, b: num & 255, a: 1 }
}

function rgbaStringToRgb(str) {
  const m = str.match(/rgba?\(\s*([0-9.]+)[\s,]+([0-9.]+)[\s,]+([0-9.]+)(?:[\s,/]+([0-9.]+))?\s*\)/i)
  if (!m) return null
  return {
    r: Number(m[1]),
    g: Number(m[2]),
    b: Number(m[3]),
    a: m[4] !== undefined ? Number(m[4]) : 1,
  }
}

// composite foreground over a white/black backdrop for alpha colors
function flatten(color, backdrop = { r: 255, g: 255, b: 255, a: 1 }) {
  if (color.a >= 1) return color
  return {
    r: Math.round(color.r * color.a + backdrop.r * (1 - color.a)),
    g: Math.round(color.g * color.a + backdrop.g * (1 - color.a)),
    b: Math.round(color.b * color.a + backdrop.b * (1 - color.a)),
    a: 1,
  }
}

function relativeLuminance({ r, g, b }) {
  const [R, G, B] = [r, g, b].map((v) => {
    const s = v / 255
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4)
  })
  return 0.2126 * R + 0.7152 * G + 0.0722 * B
}

function contrastRatio(fg, bg) {
  const L1 = relativeLuminance(fg)
  const L2 = relativeLuminance(bg)
  const [light, dark] = L1 > L2 ? [L1, L2] : [L2, L1]
  return (light + 0.05) / (dark + 0.05)
}

// ---------- CSS parsing ----------
/** parse declarations from a block body into a Map of name->value */
function parseBlock(body) {
  const decls = new Map()
  const re = /--cg-([A-Za-z0-9-]+)\s*:\s*([^;]+);/g
  let m
  while ((m = re.exec(body))) {
    decls.set(m[1], m[2].trim())
  }
  return decls
}

function parseCSS(css) {
  // grab ALL :root blocks (tier 1 + tier 2/3 light emit in separate blocks)
  const rootMatches = [...css.matchAll(/:root\s*\{([\s\S]*?)\n\}/g)]
  const light = new Map()
  for (const m of rootMatches) {
    for (const [k, v] of parseBlock(m[1])) light.set(k, v)
  }

  // grab [data-theme="dark"] block(s) — merge all
  const darkMatches = [...css.matchAll(/\[data-theme=["']dark["']\]\s*\{([\s\S]*?)\n\}/g)]
  const dark = new Map(light)
  for (const m of darkMatches) {
    for (const [k, v] of parseBlock(m[1])) dark.set(k, v)
  }

  return { light, dark }
}

function resolveValue(name, decls, seen = new Set()) {
  if (seen.has(name)) return null // cycle
  seen.add(name)
  const v = decls.get(name)
  if (!v) return null
  return resolveRawValue(v, decls, seen)
}

function resolveRawValue(raw, decls, seen) {
  const trimmed = raw.trim()
  const varMatch = trimmed.match(/^var\(\s*--cg-([A-Za-z0-9-]+)\s*(?:,\s*([^)]+))?\)$/)
  if (varMatch) {
    const refName = varMatch[1]
    const fallback = varMatch[2]
    const resolved = resolveValue(refName, decls, seen)
    if (resolved) return resolved
    if (fallback) return resolveRawValue(fallback, decls, seen)
    return null
  }
  return trimmed
}

function toRgb(value) {
  if (!value) return null
  const v = value.trim()
  if (v.startsWith('#')) return hexToRgb(v)
  if (v.startsWith('rgb')) return rgbaStringToRgb(v)
  if (v === 'transparent') return { r: 0, g: 0, b: 0, a: 0 }
  return null
}

// ---------- the pairs we audit ----------
// Each entry: { label, fg: token-name, bg: token-name, backdrop?: 'light'|'dark' }
// backdrop is used to flatten alpha colors onto a base surface guess.
const PAIRS = [
  // status
  { label: 'status-success', fg: 'color-status-success-text-default', bg: 'color-status-success-background-default' },
  { label: 'status-warning', fg: 'color-status-warning-text-default', bg: 'color-status-warning-background-default' },
  { label: 'status-error', fg: 'color-status-error-text-default', bg: 'color-status-error-background-default' },
  { label: 'status-info', fg: 'color-status-info-text-default', bg: 'color-status-info-background-default' },

  // intent aliases
  { label: 'positive', fg: 'color-positive-text-default', bg: 'color-positive-background-default' },
  { label: 'negative', fg: 'color-negative-text-default', bg: 'color-negative-background-default' },
  { label: 'notice', fg: 'color-notice-text-default', bg: 'color-notice-background-default' },
  { label: 'informational', fg: 'color-informational-text-default', bg: 'color-informational-background-default' },
  { label: 'critical', fg: 'color-critical-text-default', bg: 'color-critical-background-default' },

  // bias on-pairs
  { label: 'bias-anchoring', fg: 'color-on-bias-anchoring-default', bg: 'color-bias-anchoring-background' },
  { label: 'bias-scarcity', fg: 'color-on-bias-scarcity-default', bg: 'color-bias-scarcity-background' },
  { label: 'bias-social-proof', fg: 'color-on-bias-social-proof-default', bg: 'color-bias-social-proof-background' },
  { label: 'bias-authority', fg: 'color-on-bias-authority-default', bg: 'color-bias-authority-background' },
  { label: 'bias-commitment', fg: 'color-on-bias-commitment-default', bg: 'color-bias-commitment-background' },
  { label: 'bias-reciprocity', fg: 'color-on-bias-reciprocity-default', bg: 'color-bias-reciprocity-background' },

  // ai-state pairs
  { label: 'ai-thinking', fg: 'color-ai-thinking-text', bg: 'color-ai-thinking-background' },
  { label: 'ai-streaming', fg: 'color-ai-streaming-text', bg: 'color-ai-streaming-background' },
  { label: 'ai-reasoning', fg: 'color-ai-reasoning-text', bg: 'color-ai-reasoning-background' },
  { label: 'ai-complete', fg: 'color-ai-complete-text', bg: 'color-ai-complete-background' },
  { label: 'ai-error', fg: 'color-ai-error-text', bg: 'color-ai-error-background' },
  { label: 'ai-cached', fg: 'color-ai-cached-text', bg: 'color-ai-cached-background' },
  { label: 'ai-rate-limited', fg: 'color-ai-rate-limited-text', bg: 'color-ai-rate-limited-background' },

  // primary/secondary on-surface
  { label: 'on-primary', fg: 'color-on-primary-default', bg: 'color-action-primary-background-default' },
  { label: 'on-secondary', fg: 'color-on-secondary-default', bg: 'color-action-secondary-background-default' },
  { label: 'on-surface-base', fg: 'color-on-surface-base-default', bg: 'color-surface-base-background' },
  { label: 'on-surface-cards', fg: 'color-on-surface-cards-default', bg: 'color-surface-cards-background' },

  // form fields — the resting floating label / placeholder sits on the input
  // background and is the only visible name of an empty field (text: 4.5:1)
  { label: 'input-label-resting', fg: 'color-input-text-placeholder', bg: 'color-input-background-default' },

  // secondary ("muted") text on containers: cg-table column headers sit on the
  // container background; cg-toaster's description sits on the modal
  // container background (axe colour-contrast failures in dark, 2026-11-16)
  { label: 'table-header-text', fg: 'color-on-surface-container-default', bg: 'color-surface-container-background' },
  { label: 'toast-description', fg: 'color-on-surface-container-default', bg: 'color-modal-container-background' },

  // focus indicators (WCAG 2.2 SC 1.4.11 / 2.4.11: non-text contrast 3:1).
  // The ring must exist in BOTH themes and be visible against the page, the
  // field it surrounds, and its own offset band.
  { label: 'focus-ring-on-page', fg: 'color-focus-ring', bg: 'color-surface-base-background', min: 3 },
  { label: 'focus-ring-on-field', fg: 'color-focus-ring', bg: 'color-input-background-default', min: 3 },
  { label: 'focus-ring-on-offset', fg: 'color-focus-ring', bg: 'color-focus-ring-offset', min: 3 },
]

// Pairs whose tokens MUST resolve in both themes (unresolved = failure).
const REQUIRED = new Set([
  'input-label-resting',
  'table-header-text',
  'toast-description',
  'focus-ring-on-page',
  'focus-ring-on-field',
  'focus-ring-on-offset',
])

// ---------- pairs derived from component styles ----------
function componentPairs() {
  if (!fs.existsSync(COMPONENTS_DIR)) {
    console.error(`[validate-contrast] component sources not found at ${COMPONENTS_DIR}; the component-pair audit cannot run.`)
    process.exit(2)
  }
  return deriveComponentPairs(COMPONENTS_DIR).map((p) => ({
    label: `${p.fg} on ${p.bg}`,
    fg: p.fg,
    bg: p.bg,
    min: p.min,
    usedBy: p.usedBy,
    component: true,
  }))
}

const MIN_AA = 4.5
const MIN_AA_LARGE = 3.0 // we still warn, but the hard gate is 4.5

function evaluate(decls, themeLabel, pairs) {
  const rows = []
  const backdrop = themeLabel === 'dark'
    ? { r: 9, g: 9, b: 11, a: 1 } // approx gray-950
    : { r: 255, g: 255, b: 255, a: 1 }

  for (const pair of pairs) {
    const fgRaw = resolveValue(pair.fg, decls)
    const bgRaw = resolveValue(pair.bg, decls)
    const fg = toRgb(fgRaw)
    const bg = toRgb(bgRaw)
    if (!fg || !bg) {
      rows.push({
        label: pair.label,
        theme: themeLabel,
        fg: pair.fg,
        bg: pair.bg,
        fgValue: fgRaw,
        bgValue: bgRaw,
        ratio: null,
        status: 'UNRESOLVED',
        pair,
      })
      continue
    }
    const bgFlat = flatten(bg, backdrop)
    const fgFlat = flatten(fg, bgFlat)
    const ratio = contrastRatio(fgFlat, bgFlat)
    const min = pair.min ?? MIN_AA
    const status = ratio >= min ? 'PASS' : ratio >= MIN_AA_LARGE ? 'AA-LARGE' : 'FAIL'
    rows.push({
      label: pair.label,
      theme: themeLabel,
      fg: pair.fg,
      bg: pair.bg,
      fgValue: fgRaw,
      bgValue: bgRaw,
      ratio,
      status,
      pair,
    })
  }
  return rows
}

function main() {
  if (!fs.existsSync(CSS_PATH)) {
    console.error(`[validate-contrast] dist/index.css not found at ${CSS_PATH}. Run pnpm build first.`)
    process.exit(2)
  }
  const css = fs.readFileSync(CSS_PATH, 'utf-8')
  const { light, dark } = parseCSS(css)

  const derived = componentPairs()
  const all = [...PAIRS, ...derived]
  const rows = [...evaluate(light, 'light', all), ...evaluate(dark, 'dark', all)]
  const baseline = JSON.parse(fs.readFileSync(BASELINE_PATH, 'utf-8'))
  const { errors: baselineErrors, known: knownCount } = checkBaseline(rows, baseline)

  let failures = 0
  let unresolved = 0
  let lowest = { label: null, theme: null, ratio: Infinity }

  for (const row of rows) {
    // Component pairs: hard gate at their own minimum, through the baseline.
    if (row.pair.component) continue
    if (row.status === 'UNRESOLVED') unresolved++
    // A required pair whose tokens are missing in a theme is a failure, not a
    // warning: an undefined focus-ring token renders no ring at all.
    if (row.status === 'UNRESOLVED' && REQUIRED.has(row.label)) failures++
    if (row.status === 'FAIL') failures++
    // Required pairs are hard gates at their own minimum (AA-LARGE is not a pass).
    else if (row.status === 'AA-LARGE' && REQUIRED.has(row.label)) failures++
    if (typeof row.ratio === 'number' && row.ratio < lowest.ratio) {
      lowest = { ...row }
    }
  }

  // print table
  console.log('\nWCAG 2.1 AA contrast audit — packages/tokens/dist/index.css')
  console.log('=' .repeat(80))
  const labelWidth = Math.max(...rows.map((r) => r.label.length)) + 2
  const header = ['theme', 'pair', 'ratio', 'status'].map((c, i) => c.padEnd(i === 1 ? Math.max(18, labelWidth) : 18)).join('')
  console.log(header)
  console.log('-'.repeat(80))
  for (const row of rows) {
    const ratio = row.ratio ? row.ratio.toFixed(2) : 'n/a'
    const line = [row.theme, row.label, ratio, row.status].map((c, i) => String(c).padEnd(i === 0 ? 8 : i === 1 ? Math.max(18, labelWidth) : 18)).join('')
    console.log(line)
  }
  console.log('-'.repeat(80))

  if (Number.isFinite(lowest.ratio) && lowest.label) {
    console.log(
      `Lowest-contrast pair: [${lowest.theme}] ${lowest.label} = ${lowest.ratio.toFixed(2)}:1 ` +
        `(fg ${lowest.fgValue} / bg ${lowest.bgValue})`,
    )
  }

  console.log(`component pairs: ${derived.length} derived from component styles, ${derived.length * 2} checks, ${knownCount} known failure(s) in contrast-baseline.json`)
  for (const e of baselineErrors) console.error(`  ${e}`)
  failures += baselineErrors.length

  if (unresolved > 0) {
    console.warn(`[validate-contrast] ${unresolved} pair(s) could not be resolved (missing tokens or unresolvable refs).`)
  }
  if (failures > 0) {
    console.error(`[validate-contrast] ${failures} pair(s) fail WCAG AA (4.5:1). Fix the tokens above.`)
    process.exit(1)
  }
  console.log(`[validate-contrast] OK — all ${rows.length - unresolved} resolved pairs pass AA.`)
}

main()
