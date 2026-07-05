// Pure helpers for building @cognivo/tokens/manifest.
// Exported so tests can exercise them without driving a CLI.
//
// Conventions:
//  - All classifier functions throw on unknown patterns. The build is the
//    place to fail loudly; runtime should never see an unclassified token.
//  - Color values are normalized to canonical lowercase rgb()/rgba() form
//    so the runtime reverse-lookup needs zero further normalization.
//  - var() chains are resolved fully at build time. The runtime never needs
//    to walk the chain.

// ---------------------------------------------------------------------------
// CSS parsing
// ---------------------------------------------------------------------------

/**
 * Extract `--cg-*: value;` declarations from a CSS string, grouped by selector.
 * Recognized selectors: `:root`, `[data-theme="..."]`. Multiple `:root` blocks
 * are merged (later wins, matching CSS cascade).
 *
 * Returns: `{ themes: { [selector]: { [name]: rawDeclaration } }, selectors: string[] }`.
 *
 * `rawDeclaration` keeps original whitespace + var() form, so resolveVarChain()
 * can replay the CSS-spec resolution.
 */
export function parseCss(text) {
  // Strip CSS block comments so they don't bleed into selectors.
  const stripped = text.replace(/\/\*[\s\S]*?\*\//g, '');
  const themes = {};
  const selectors = [];
  // Match selector { ... } blocks (very simple — tokens CSS is hand-generated
  // by Style Dictionary, so the structure is predictable: top-level rule
  // blocks containing `--cg-*: …;` lines and nothing exotic).
  const blockRe = /([^{}]+)\s*\{([^{}]*)\}/g;
  let match;
  while ((match = blockRe.exec(stripped)) !== null) {
    const selector = match[1].trim();
    const body = match[2];
    if (!selector.includes(':root') && !selector.includes('[data-theme')) continue;
    const decls = themes[selector] ?? {};
    const declRe = /(--cg-[a-z0-9-]+)\s*:\s*([^;]+);/gi;
    let dm;
    while ((dm = declRe.exec(body)) !== null) {
      decls[dm[1]] = dm[2].trim();
    }
    themes[selector] = decls;
    if (!selectors.includes(selector)) selectors.push(selector);
  }
  return { themes, selectors };
}

// ---------------------------------------------------------------------------
// Color normalization (hex / rgb / rgba → canonical rgb()/rgba())
// ---------------------------------------------------------------------------

// Anything starting with `#` is a hex attempt. We then validate the digit
// count separately so malformed lengths throw rather than silently returning
// null (which would leak into the manifest as a missed color).
const HEX_RE = /^#([0-9a-fA-F]+)$/;
const VALID_HEX_LENGTHS = new Set([3, 4, 6, 8]);

/**
 * Normalize a color value to canonical `rgb(R, G, B)` or `rgba(R, G, B, A)`.
 * Returns null when the input is not a recognizable color (e.g. a shadow
 * spec, a number, or a non-color value). Caller decides what to do with null.
 */
export function normalizeColor(raw) {
  const value = raw.trim();
  if (value === 'transparent') return 'rgba(0, 0, 0, 0)';
  if (value === 'currentColor' || value === 'inherit') return null;

  // Hex
  const hexMatch = HEX_RE.exec(value);
  if (hexMatch) {
    const hex = hexMatch[1];
    if (!VALID_HEX_LENGTHS.has(hex.length)) {
      throw new Error(`normalizeColor: malformed hex "${raw}"`);
    }
    let r, g, b, a;
    if (hex.length === 3) {
      r = parseInt(hex[0] + hex[0], 16);
      g = parseInt(hex[1] + hex[1], 16);
      b = parseInt(hex[2] + hex[2], 16);
      a = 1;
    } else if (hex.length === 4) {
      r = parseInt(hex[0] + hex[0], 16);
      g = parseInt(hex[1] + hex[1], 16);
      b = parseInt(hex[2] + hex[2], 16);
      a = parseInt(hex[3] + hex[3], 16) / 255;
    } else if (hex.length === 6) {
      r = parseInt(hex.slice(0, 2), 16);
      g = parseInt(hex.slice(2, 4), 16);
      b = parseInt(hex.slice(4, 6), 16);
      a = 1;
    } else {
      // hex.length === 8
      r = parseInt(hex.slice(0, 2), 16);
      g = parseInt(hex.slice(2, 4), 16);
      b = parseInt(hex.slice(4, 6), 16);
      a = parseInt(hex.slice(6, 8), 16) / 255;
    }
    return formatRgb(r, g, b, a);
  }

  // rgb() / rgba()
  const rgbMatch = /^rgba?\(\s*([^)]+)\s*\)$/.exec(value);
  if (rgbMatch) {
    const parts = rgbMatch[1].split(/[\s,/]+/).filter(Boolean);
    if (parts.length < 3 || parts.length > 4) {
      throw new Error(`normalizeColor: rgb() expects 3–4 components, got "${raw}"`);
    }
    const r = parseChannel(parts[0]);
    const g = parseChannel(parts[1]);
    const b = parseChannel(parts[2]);
    const a = parts[3] === undefined ? 1 : parseAlpha(parts[3]);
    return formatRgb(r, g, b, a);
  }

  return null;
}

function parseChannel(s) {
  if (s.endsWith('%')) {
    return Math.round((parseFloat(s) / 100) * 255);
  }
  return Math.max(0, Math.min(255, Math.round(parseFloat(s))));
}

function parseAlpha(s) {
  if (s.endsWith('%')) return Math.max(0, Math.min(1, parseFloat(s) / 100));
  return Math.max(0, Math.min(1, parseFloat(s)));
}

function formatRgb(r, g, b, a) {
  if (a >= 0.9995) return `rgb(${r}, ${g}, ${b})`;
  // Round alpha to 3 decimals so identical inputs produce byte-identical output.
  const aStr = a.toFixed(3).replace(/\.?0+$/, '');
  return `rgba(${r}, ${g}, ${b}, ${aStr})`;
}

// ---------------------------------------------------------------------------
// Tier classification (throws on unknown — by design)
// ---------------------------------------------------------------------------

const TIER_RULES = [
  // Tier 3 — component-scoped (per-tag dimensions + colors)
  { test: (n) => n.startsWith('--cg-component-'), tier: 3 },
  { test: (n) => n.startsWith('--cg-ai-'), tier: 3 },
  // Tier 2 — semantic (purpose + state)
  { test: (n) => n.startsWith('--cg-color-'), tier: 2 },
  { test: (n) => n.startsWith('--cg-shadow-'), tier: 2 },
  { test: (n) => n.startsWith('--cg-elevation-'), tier: 2 },
  { test: (n) => n.startsWith('--cg-overlay-'), tier: 2 },
  { test: (n) => n.startsWith('--cg-focus-ring-'), tier: 2 },
  { test: (n) => n.startsWith('--cg-interaction-'), tier: 2 },
  { test: (n) => n.startsWith('--cg-bias-'), tier: 2 },
  { test: (n) => n.startsWith('--cg-typography-'), tier: 2 },
  { test: (n) => /^--cg-outline-color-/.test(n), tier: 2 },
  // text-* mostly carries semantic colors (text-primary, text-danger). The
  // text-align / text-decoration / text-style / text-transform sub-namespaces
  // are CSS keyword primitives — explicitly handled below.
  { test: (n) => /^--cg-text-(accent|danger|disabled|info|inverse|muted|onAccent|placeholder|primary|secondary|success|warning)$/.test(n), tier: 2 },
  // Tier 1 — palette + brand + primitives
  { test: (n) => /^--cg-(gray|red|orange|amber|yellow|lime|green|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose|brown|stone|neutral|zinc|slate)-/.test(n), tier: 1 },
  { test: (n) => n.startsWith('--cg-brand-'), tier: 1 },
  { test: (n) => n.startsWith('--cg-size-'), tier: 1 },
  { test: (n) => /^--cg-(spacing|font-size|font-weight|font-family|line-height|letter-spacing|border-width|border-radius|border-style|opacity|icon-size|transition|motion|easing|blur|cursor|layout|outline-width|outline-style|outline-offset|z-index)-/.test(n), tier: 1 },
  // text-align / text-decoration / text-style / text-transform are CSS keyword primitives
  { test: (n) => /^--cg-text-(align|decoration|style|transform)-/.test(n), tier: 1 },
];

export function classifyTier(name) {
  for (const rule of TIER_RULES) {
    if (rule.test(name)) return rule.tier;
  }
  throw new Error(
    `classifyTier: unknown tier for "${name}". ` +
      `Add a TIER_RULES entry in scripts/manifest-lib.mjs or rename the token.`
  );
}

// ---------------------------------------------------------------------------
// Category classification (throws on unknown — by design)
// ---------------------------------------------------------------------------

/**
 * Classify a token's value-shape. We classify by VALUE, not by name —
 * tokens come from many naming conventions (kebab + camel, ai-*, bias-*,
 * etc.) and a name-based classifier turns into an unmaintainable substring
 * lookup. The value's syntactic shape is unambiguous.
 *
 * Categories:
 *  - color: any normalizable color (hex, rgb, rgba, transparent)
 *  - numeric: a single unit-bearing or unitless number (8px, 1.5, 100ms)
 *  - compound: multi-component values like shadows / gradients
 *    ("0 1px 2px rgba(0,0,0,.1)")
 *  - easing: cubic-bezier / linear / ease* / step*
 *  - keyword: bare strings like "pointer", "inherit", '"Inter", sans-serif'
 *  - throws on values that resolve to nothing (empty / undefined)
 */
export function classifyCategory(_name, resolvedValue) {
  const v = (resolvedValue ?? '').trim();
  if (v === '') {
    throw new Error(`classifyCategory: empty resolved value for "${_name}"`);
  }
  // 1. Easing functions (must come before numeric/keyword — these contain parens but are NOT colors)
  if (/^(cubic-bezier|steps|linear-gradient|radial-gradient)\b/i.test(v)) return 'easing';
  if (/^(linear|ease|ease-in|ease-out|ease-in-out|step-start|step-end)$/i.test(v)) return 'easing';
  // 2. Color
  if (normalizeColor(v) !== null) return 'color';
  // 3. Single numeric (with or without unit)
  if (/^-?[\d.]+(px|rem|em|%|vw|vh|ch|ex|fr|deg|rad|turn|s|ms)?$/i.test(v)) return 'numeric';
  // 4. Compound: multiple parts (whitespace or comma separated), at least one of which has digits
  if (/\d/.test(v) && (v.includes(' ') || v.includes(','))) return 'compound';
  // 5. Bare keyword
  return 'keyword';
}

// ---------------------------------------------------------------------------
// var() chain resolution
// ---------------------------------------------------------------------------

const VAR_RE = /var\(\s*(--[a-zA-Z0-9-]+)(?:\s*,\s*([^)]+))?\)/;

/**
 * Resolve a token's value by walking var() references. Returns:
 *   { resolvedValue, varChain }
 * where `varChain` is `[name, intermediate1, ..., leaf-name]`.
 *
 * Throws on unresolvable references (var() points to an undefined name with
 * no fallback) and on cycles. The build is the place to fail loudly.
 */
export function resolveVarChain(startName, decls) {
  const chain = [startName];
  const seen = new Set([startName]);
  let raw = decls[startName];
  if (raw === undefined) {
    throw new Error(`resolveVarChain: undefined token "${startName}"`);
  }

  // Loop while the current value IS purely a var() reference. If the value is
  // a compound (e.g. "0 1px 2px var(--x)" — a shadow), we don't walk into it.
  let m;
  while ((m = VAR_RE.exec(raw)) !== null && raw.trim().startsWith('var(')) {
    const referencedName = m[1];
    const fallback = m[2];
    if (decls[referencedName] !== undefined) {
      if (seen.has(referencedName)) {
        throw new Error(
          `resolveVarChain: cycle detected for "${startName}" via "${referencedName}".`
        );
      }
      seen.add(referencedName);
      chain.push(referencedName);
      raw = decls[referencedName];
    } else if (fallback !== undefined) {
      raw = fallback.trim();
      break;
    } else {
      throw new Error(
        `resolveVarChain: "${startName}" references "${referencedName}" with no fallback.`
      );
    }
  }
  return { resolvedValue: raw.trim(), varChain: chain };
}

// ---------------------------------------------------------------------------
// Top-level: build the manifest
// ---------------------------------------------------------------------------

/**
 * Build the manifest from a parsed CSS object.
 *
 * Returns `{ entries, themes, hash }`.
 * - `entries`: array of TokenEntry, sorted by tier ascending then by name.
 *   Each entry's `themes` field carries per-theme resolvedValue + varChain.
 * - `themes`: list of selector keys present in the source CSS.
 * - `hash`: short content hash of the entries, for cache invalidation.
 */
export function buildManifest(parsed) {
  // Token NAMES are the union of names across all theme blocks. Theme-only
  // tokens (defined under [data-theme="dark"] but not :root) are real tokens
  // components rely on — dropping them made the manifest lie about ~30
  // dark-only names. Each entry's `themes` keys record which themes bind it.
  const nameSet = new Set(Object.keys(mergeBase(parsed)));
  for (const selector of Object.keys(parsed.themes)) {
    for (const name of Object.keys(parsed.themes[selector])) {
      nameSet.add(name);
    }
  }
  const allNames = [...nameSet].sort();

  const entries = [];
  for (const name of allNames) {
    const tier = classifyTier(name);
    // Resolve themes first so we can classify the category by value-shape.
    const themes = {};
    for (const selector of Object.keys(parsed.themes)) {
      const themeDecls = mergeForSelector(parsed, selector);
      if (themeDecls[name] === undefined) continue;
      const { resolvedValue, varChain } = resolveVarChain(name, themeDecls);
      themes[themeKey(selector)] = {
        rawDeclaration: themeDecls[name],
        resolvedValue,
        varChain,
      };
    }
    // Classify by the default theme's value (or first theme if no default).
    const sampleTheme = themes.default ?? themes[Object.keys(themes)[0]];
    if (!sampleTheme) {
      throw new Error(`buildManifest: token "${name}" has no theme bindings`);
    }
    const category = classifyCategory(name, sampleTheme.resolvedValue);
    // Now that we know it's a color, normalize across all theme bindings.
    if (category === 'color') {
      for (const themeName of Object.keys(themes)) {
        const norm = normalizeColor(themes[themeName].resolvedValue);
        if (norm !== null) themes[themeName].resolvedValue = norm;
      }
    }
    entries.push({ name, tier, category, themes });
  }

  entries.sort((a, b) => a.tier - b.tier || a.name.localeCompare(b.name));

  return {
    entries,
    themes: Object.keys(parsed.themes).map(themeKey),
    hash: computeHash(entries),
  };
}

function themeKey(selector) {
  if (selector === ':root') return 'default';
  const m = /\[data-theme="([^"]+)"\]/.exec(selector);
  if (m) return m[1];
  // Fallback: use raw selector (sanitized)
  return selector.replace(/[^\w-]/g, '_');
}

function mergeBase(parsed) {
  // Merge all `:root` blocks (later wins).
  const out = {};
  for (const sel of parsed.selectors) {
    if (sel !== ':root') continue;
    Object.assign(out, parsed.themes[sel]);
  }
  return out;
}

function mergeForSelector(parsed, selector) {
  // Theme block resolution: start with all `:root` decls, layer the theme block on top.
  const out = mergeBase(parsed);
  if (selector !== ':root') {
    Object.assign(out, parsed.themes[selector]);
  }
  return out;
}

function computeHash(entries) {
  // 32-bit FNV-1a hash over a stable string representation of entries.
  // Plain Node, no crypto deps. Output: 8-hex-char string.
  let s = '';
  for (const e of entries) {
    s += e.name + '|' + e.tier + '|' + e.category + '|';
    for (const tk of Object.keys(e.themes).sort()) {
      s += tk + '=' + e.themes[tk].resolvedValue + ';';
    }
    s += '\n';
  }
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return h.toString(16).padStart(8, '0');
}

// ---------------------------------------------------------------------------
// Reverse map (value → tokens) — the runtime payload
// ---------------------------------------------------------------------------

/**
 * Build the value → tokenName[] reverse map from manifest entries.
 * For colors, we index every theme's resolvedValue, so a value matches its
 * token regardless of active theme. Within a bucket, tokens are sorted by
 * tier ascending, then by name length descending (most specific first).
 */
export function buildReverseMap(entries) {
  const m = new Map();
  for (const entry of entries) {
    for (const themeName of Object.keys(entry.themes)) {
      const value = entry.themes[themeName].resolvedValue;
      if (!value) continue;
      const list = m.get(value) ?? [];
      if (!list.includes(entry.name)) list.push(entry.name);
      m.set(value, list);
    }
  }
  // Sort buckets: lowest tier first, then longer name (more specific) first.
  const tierByName = new Map(entries.map((e) => [e.name, e.tier]));
  for (const [v, list] of m) {
    list.sort((a, b) => {
      const ta = tierByName.get(a) ?? 9;
      const tb = tierByName.get(b) ?? 9;
      if (ta !== tb) return ta - tb;
      return b.length - a.length;
    });
    m.set(v, list);
  }
  return m;
}
