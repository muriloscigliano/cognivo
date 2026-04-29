import type { TokenUsage } from '../types/scene-graph.js';
import { tierByName, tokensByValue } from '@cognivo/tokens/manifest/runtime';

/**
 * The CSS properties whose values we attempt to reverse-map against the
 * Cognivo token manifest. We only consider properties that:
 *   1. Are likely to land on a design-system token (colors, dimensions, etc.)
 *   2. Are relatively cheap to look up (single value, not compound)
 *
 * Compound properties like `transition` and `box-shadow` aren't here because
 * their values aren't single-token candidates — the rules that care about
 * them inspect computedStyle directly.
 */
const TOKENABLE_PROPERTIES: ReadonlyArray<{ readonly property: string; readonly kind: 'color' | 'numeric' }> = [
  { property: 'color', kind: 'color' },
  { property: 'background-color', kind: 'color' },
  { property: 'border-color', kind: 'color' },
  { property: 'outline-color', kind: 'color' },
  { property: 'fill', kind: 'color' },
  { property: 'stroke', kind: 'color' },
  { property: 'border-radius', kind: 'numeric' },
  { property: 'border-top-left-radius', kind: 'numeric' },
  { property: 'border-top-right-radius', kind: 'numeric' },
  { property: 'border-bottom-left-radius', kind: 'numeric' },
  { property: 'border-bottom-right-radius', kind: 'numeric' },
  { property: 'border-width', kind: 'numeric' },
  { property: 'padding-top', kind: 'numeric' },
  { property: 'padding-right', kind: 'numeric' },
  { property: 'padding-bottom', kind: 'numeric' },
  { property: 'padding-left', kind: 'numeric' },
  { property: 'margin-top', kind: 'numeric' },
  { property: 'margin-right', kind: 'numeric' },
  { property: 'margin-bottom', kind: 'numeric' },
  { property: 'margin-left', kind: 'numeric' },
  { property: 'font-size', kind: 'numeric' },
  { property: 'font-weight', kind: 'numeric' },
  { property: 'line-height', kind: 'numeric' },
  { property: 'opacity', kind: 'numeric' },
  { property: 'outline-width', kind: 'numeric' },
];

/**
 * Resolve the design-token usage for an element's computed styles.
 *
 * For each property in `TOKENABLE_PROPERTIES`:
 *   - Normalize the computed value (color → canonical rgb(); numeric → as-is).
 *   - Look up in the manifest's reverse map.
 *   - On match: emit a TokenUsage with tier from the lowest-tier match, plus
 *     all matching names in `candidates` (already sorted lowest-first).
 *   - On miss: emit a TokenUsage with `tier: 0` and empty `candidates` so
 *     "off-grid" rules can find raw values.
 *
 * Properties whose computed value is empty or ambiguous (`inherit`,
 * `currentColor`, `unset`) are skipped — they don't represent a concrete
 * value the page renders.
 */
export function resolveTokenUsage(computedStyle: Record<string, string>): TokenUsage[] {
  const out: TokenUsage[] = [];
  for (const { property, kind } of TOKENABLE_PROPERTIES) {
    const raw = computedStyle[property];
    if (!raw || raw === 'inherit' || raw === 'unset' || raw === 'initial') continue;
    const normalized = kind === 'color' ? normalizeColorAtRuntime(raw) : raw.trim();
    if (normalized === null) continue;
    const candidates = tokensByValue.get(normalized);
    if (candidates && candidates.length > 0) {
      const best = candidates[0]!;
      const tier = (tierByName.get(best) ?? 0) as TokenUsage['tier'];
      out.push({
        tier,
        property,
        rawValue: normalized,
        resolvedToken: best,
        candidates: [...candidates],
      });
    } else {
      out.push({
        tier: 0,
        property,
        rawValue: normalized,
        candidates: [],
      });
    }
  }
  return out;
}

/**
 * Runtime color normalizer: same algorithm as the build-time normalizer in
 * @cognivo/tokens/scripts/manifest-lib.mjs, kept in sync so reverse lookups
 * always hit. Handles hex (#rgb / #rrggbb / #rgba / #rrggbbaa), rgb(), rgba(),
 * and the `transparent` keyword. Returns null for `currentColor` / `inherit`
 * / unparseable values so callers can skip them cleanly.
 *
 * Why duplicated here instead of imported: the manifest builder is a
 * build-time CommonJS-ish ESM script that we don't ship. Duplicating ~60
 * lines is cheaper than wiring a runtime export.
 */
function normalizeColorAtRuntime(raw: string): string | null {
  const value = raw.trim();
  if (value === 'transparent') return 'rgba(0, 0, 0, 0)';
  if (value === 'currentColor' || value === 'inherit' || value === '') return null;

  const hexMatch = /^#([0-9a-fA-F]+)$/.exec(value);
  if (hexMatch) {
    const hex = hexMatch[1]!;
    if (hex.length !== 3 && hex.length !== 4 && hex.length !== 6 && hex.length !== 8) return null;
    let r: number, g: number, b: number, a: number;
    if (hex.length === 3) {
      r = parseInt(hex[0]! + hex[0]!, 16);
      g = parseInt(hex[1]! + hex[1]!, 16);
      b = parseInt(hex[2]! + hex[2]!, 16);
      a = 1;
    } else if (hex.length === 4) {
      r = parseInt(hex[0]! + hex[0]!, 16);
      g = parseInt(hex[1]! + hex[1]!, 16);
      b = parseInt(hex[2]! + hex[2]!, 16);
      a = parseInt(hex[3]! + hex[3]!, 16) / 255;
    } else if (hex.length === 6) {
      r = parseInt(hex.slice(0, 2), 16);
      g = parseInt(hex.slice(2, 4), 16);
      b = parseInt(hex.slice(4, 6), 16);
      a = 1;
    } else {
      r = parseInt(hex.slice(0, 2), 16);
      g = parseInt(hex.slice(2, 4), 16);
      b = parseInt(hex.slice(4, 6), 16);
      a = parseInt(hex.slice(6, 8), 16) / 255;
    }
    return formatRgb(r, g, b, a);
  }

  const rgbMatch = /^rgba?\(\s*([^)]+)\s*\)$/.exec(value);
  if (rgbMatch) {
    const parts = rgbMatch[1]!.split(/[\s,/]+/).filter(Boolean);
    if (parts.length < 3 || parts.length > 4) return null;
    const r = parseChannel(parts[0]!);
    const g = parseChannel(parts[1]!);
    const b = parseChannel(parts[2]!);
    const a = parts[3] === undefined ? 1 : parseAlpha(parts[3]!);
    return formatRgb(r, g, b, a);
  }

  return null;
}

function parseChannel(s: string): number {
  if (s.endsWith('%')) return Math.round((parseFloat(s) / 100) * 255);
  return Math.max(0, Math.min(255, Math.round(parseFloat(s))));
}

function parseAlpha(s: string): number {
  if (s.endsWith('%')) return Math.max(0, Math.min(1, parseFloat(s) / 100));
  return Math.max(0, Math.min(1, parseFloat(s)));
}

function formatRgb(r: number, g: number, b: number, a: number): string {
  if (a >= 0.9995) return `rgb(${r}, ${g}, ${b})`;
  const aStr = a.toFixed(3).replace(/\.?0+$/, '');
  return `rgba(${r}, ${g}, ${b}, ${aStr})`;
}
