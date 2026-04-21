import { PALETTES, type Palette } from './palettes.js';

export interface ComposeInput {
  /** Free-form descriptor — e.g. "warm ocean professional minimalist". */
  description: string;
  /** If true, bias toward dark-mode palettes when available. */
  preferDark?: boolean;
}

export interface ScoredPalette {
  palette: Palette;
  score: number;
  key: string;
}

/**
 * Split a description into lowercased tokens. Accepts comma, whitespace,
 * and hyphen separators; drops empty tokens.
 */
function tokenize(desc: string): string[] {
  return desc
    .toLowerCase()
    .split(/[,\s\-_/]+/)
    .map((t) => t.trim())
    .filter(Boolean);
}

/**
 * Score every palette against a description string.
 *
 * Scoring:
 *   +2.0 exact keyword match
 *   +1.5 token appears inside the palette key (e.g. "ocean" in "ocean-professional")
 *   +1.0 partial (substring) keyword match
 * The total is then multiplied by palette.weight.
 *
 * Deterministic: ties break by insertion order (Object.entries preserves it).
 */
export function scoreDescription(desc: string): ScoredPalette[] {
  const words = tokenize(desc);
  const scored: ScoredPalette[] = Object.entries(PALETTES).map(([key, palette]) => {
    let score = 0;
    for (const word of words) {
      for (const kw of palette.keywords) {
        if (kw === word) {
          score += 2;
        } else if (kw.includes(word) || word.includes(kw)) {
          score += 1;
        }
      }
      if (key.includes(word)) {
        score += 1.5;
      }
    }
    return { palette, score: score * palette.weight, key };
  });
  scored.sort((a, b) => b.score - a.score);
  return scored;
}

/**
 * Compose a single palette from a description.
 *
 * Behavior:
 *   - Returns the top-scoring palette.
 *   - If nothing matches, falls back to `ocean-professional` (or
 *     `midnight-tech` when `preferDark` is set).
 *   - When `preferDark` is true, promotes the highest-scoring dark palette
 *     over a brighter-scoring light one.
 */
export function composePalette(input: ComposeInput): Palette {
  const scored = scoreDescription(input.description);
  const top = scored[0];

  if (!top || top.score === 0) {
    return input.preferDark
      ? (PALETTES['midnight-tech'] as Palette)
      : (PALETTES['ocean-professional'] as Palette);
  }

  if (input.preferDark) {
    const dark = scored.find((s) => s.palette.dark && s.score > 0);
    if (dark) return dark.palette;
  }

  return top.palette;
}
