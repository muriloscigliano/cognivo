import { composePalette, type ComposeInput } from './compose.js';
import { emitTokens, type TokenOverride } from './emit.js';
import type { Palette } from './palettes.js';

export interface GenerateOptions extends ComposeInput {
  /** If true, return the raw palette instead of the tier-2 token JSON. */
  raw?: boolean;
}

/**
 * Deterministic theme generator.
 *
 * Accepts either a plain string description or an options object.
 * Returns a tier-2 semantic token override by default, or the raw
 * `Palette` when `raw: true`.
 *
 * @example
 *   generateTheme('warm ocean professional')
 *   generateTheme({ description: 'cyberpunk neon', preferDark: true })
 */
export function generateTheme(opts: string): TokenOverride;
export function generateTheme(opts: GenerateOptions & { raw: true }): Palette;
export function generateTheme(opts: GenerateOptions): TokenOverride;
export function generateTheme(opts: string | GenerateOptions): TokenOverride | Palette {
  const input: GenerateOptions = typeof opts === 'string' ? { description: opts } : opts;
  const palette = composePalette(input);
  if (input.raw) return palette;
  return emitTokens(palette);
}

export { scoreDescription, composePalette } from './compose.js';
export { emitTokens } from './emit.js';
export { PALETTES, PALETTE_COUNT } from './palettes.js';

export type { Palette } from './palettes.js';
export type { TokenOverride } from './emit.js';
export type { ComposeInput, ScoredPalette } from './compose.js';
