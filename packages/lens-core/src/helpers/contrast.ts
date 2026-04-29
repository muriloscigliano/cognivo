import type { SceneNode } from '../types/scene-graph.js';

/**
 * WCAG 2.1 contrast levels (Spec §6, §8 of WCAG 2.1).
 *  - AA       — 4.5:1 for normal text
 *  - AA-large — 3.0:1 for large text (>= 18pt regular or >= 14pt bold)
 *  - AAA      — 7.0:1 for normal text
 *  - AAA-large — 4.5:1 for large text
 */
export type WcagLevel = 'AA' | 'AA-large' | 'AAA' | 'AAA-large';

const THRESHOLDS: Record<WcagLevel, number> = {
  AA: 4.5,
  'AA-large': 3.0,
  AAA: 7.0,
  'AAA-large': 4.5,
};

export interface ContrastResult {
  /** Contrast ratio rounded to two decimals. */
  ratio: number;
  /** True iff `ratio >= threshold(level)`. */
  passes: boolean;
  /** Threshold for the requested level. */
  threshold: number;
  /** Foreground color used in the calculation (canonical rgb()/rgba()). */
  foreground: string;
  /** Background color used in the calculation (canonical rgb()/rgba()). */
  background: string;
  /** True when no opaque ancestor was found and white was assumed. */
  inferredBackground: boolean;
}

/**
 * Compute WCAG 2.1 contrast for `node`'s text color against the nearest
 * non-transparent ancestor's background-color.
 *
 * Algorithm:
 *  1. Resolve foreground from `node.computedStyle.color` (transparent
 *     foreground is reported as ratio 0; not flagged here — caller decides).
 *  2. Walk `ancestorChain` (nearest first, root last). First ancestor with a
 *     non-transparent `background-color` wins.
 *  3. If no opaque ancestor is found, default to white and set
 *     `inferredBackground: true`.
 *  4. Compute relative luminance per WCAG 2.1 (sRGB → linear → luminance).
 *  5. Ratio = `(L_lighter + 0.05) / (L_darker + 0.05)`.
 *
 * Returns a fully-populated ContrastResult for downstream rule logic and UI.
 */
export function computeContrast(
  node: SceneNode,
  ancestorChain: readonly SceneNode[],
  level: WcagLevel
): ContrastResult {
  const fgRaw = node.computedStyle['color'] ?? '';
  const fg = parseColor(fgRaw);
  const { background, inferredBackground } = resolveBackground(ancestorChain);

  if (fg === null) {
    // Foreground unparseable. Return ratio 0 so caller can choose what to do.
    return {
      ratio: 0,
      passes: false,
      threshold: THRESHOLDS[level],
      foreground: fgRaw,
      background: formatRgb(background.r, background.g, background.b, background.a),
      inferredBackground,
    };
  }

  // Composite foreground over background if foreground has alpha < 1
  const composited = compositeOver(fg, background);
  const lf = relativeLuminance(composited);
  const lb = relativeLuminance(background);
  const lighter = Math.max(lf, lb);
  const darker = Math.min(lf, lb);
  const ratio = (lighter + 0.05) / (darker + 0.05);
  const rounded = Math.round(ratio * 100) / 100;

  return {
    ratio: rounded,
    passes: rounded >= THRESHOLDS[level],
    threshold: THRESHOLDS[level],
    foreground: formatRgb(composited.r, composited.g, composited.b, 1),
    background: formatRgb(background.r, background.g, background.b, background.a),
    inferredBackground,
  };
}

interface RgbColor {
  r: number;
  g: number;
  b: number;
  a: number;
}

const WHITE: RgbColor = { r: 255, g: 255, b: 255, a: 1 };

function resolveBackground(
  ancestorChain: readonly SceneNode[]
): { background: RgbColor; inferredBackground: boolean } {
  for (const ancestor of ancestorChain) {
    const bgRaw = ancestor.computedStyle['background-color'];
    if (!bgRaw) continue;
    const parsed = parseColor(bgRaw);
    if (parsed === null) continue;
    if (parsed.a < 0.001) continue; // Fully transparent — keep walking
    return { background: parsed, inferredBackground: false };
  }
  return { background: WHITE, inferredBackground: true };
}

/**
 * Composite a foreground over a background using straight alpha blending.
 * Returns an opaque RgbColor (alpha = 1) — what the user actually sees.
 */
function compositeOver(fg: RgbColor, bg: RgbColor): RgbColor {
  if (fg.a >= 0.9995) return { ...fg, a: 1 };
  const a = fg.a;
  return {
    r: Math.round(fg.r * a + bg.r * (1 - a)),
    g: Math.round(fg.g * a + bg.g * (1 - a)),
    b: Math.round(fg.b * a + bg.b * (1 - a)),
    a: 1,
  };
}

/**
 * WCAG 2.1 relative luminance for an RGB color. Alpha is ignored — caller
 * should composite first.
 *
 * Formula: gamma-decode each channel to linear, then weighted-average with
 * coefficients 0.2126 / 0.7152 / 0.0722.
 */
function relativeLuminance(c: RgbColor): number {
  const channel = (v: number): number => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * channel(c.r) + 0.7152 * channel(c.g) + 0.0722 * channel(c.b);
}

// ---------------------------------------------------------------------------
// Color parsing — accepts the same shapes as token-resolution but returns
// structured channels so we can run luminance math.
// ---------------------------------------------------------------------------

function parseColor(raw: string): RgbColor | null {
  const v = raw.trim();
  if (v === 'transparent') return { r: 0, g: 0, b: 0, a: 0 };
  if (v === 'currentColor' || v === 'inherit' || v === '') return null;

  const hexMatch = /^#([0-9a-fA-F]+)$/.exec(v);
  if (hexMatch) {
    const hex = hexMatch[1]!;
    if (hex.length === 3) {
      return {
        r: parseInt(hex[0]! + hex[0]!, 16),
        g: parseInt(hex[1]! + hex[1]!, 16),
        b: parseInt(hex[2]! + hex[2]!, 16),
        a: 1,
      };
    }
    if (hex.length === 4) {
      return {
        r: parseInt(hex[0]! + hex[0]!, 16),
        g: parseInt(hex[1]! + hex[1]!, 16),
        b: parseInt(hex[2]! + hex[2]!, 16),
        a: parseInt(hex[3]! + hex[3]!, 16) / 255,
      };
    }
    if (hex.length === 6) {
      return {
        r: parseInt(hex.slice(0, 2), 16),
        g: parseInt(hex.slice(2, 4), 16),
        b: parseInt(hex.slice(4, 6), 16),
        a: 1,
      };
    }
    if (hex.length === 8) {
      return {
        r: parseInt(hex.slice(0, 2), 16),
        g: parseInt(hex.slice(2, 4), 16),
        b: parseInt(hex.slice(4, 6), 16),
        a: parseInt(hex.slice(6, 8), 16) / 255,
      };
    }
    return null;
  }

  const rgbMatch = /^rgba?\(\s*([^)]+)\s*\)$/.exec(v);
  if (rgbMatch) {
    const parts = rgbMatch[1]!.split(/[\s,/]+/).filter(Boolean);
    if (parts.length < 3 || parts.length > 4) return null;
    const r = parseChannel(parts[0]!);
    const g = parseChannel(parts[1]!);
    const b = parseChannel(parts[2]!);
    const a = parts[3] === undefined ? 1 : parseAlpha(parts[3]!);
    return { r, g, b, a };
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
