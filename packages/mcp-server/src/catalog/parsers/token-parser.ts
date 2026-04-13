/**
 * Parses all Cognivo design-token JSON files (W3C DTCG format),
 * resolves cross-tier references, and returns a flat TokenEntry[].
 */

import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import type { TokenEntry } from '../types.js';
import {
  buildFlatTokenMap,
  resolveTokenValue,
} from '../resolvers/token-resolver.js';

// ─── Tier 1 palette families that should never be used directly in component CSS
const TIER1_PALETTE_FAMILIES = new Set([
  'gray',
  'red',
  'blue',
  'green',
  'yellow',
  'teal',
  'brand',
]);

// ─── Source file definitions ────────────────────────────────────────────────

interface TokenSource {
  /** Path relative to tokensDir */
  relativePath: string;
  /** Which tier this file belongs to */
  tier: 1 | 2 | 3;
}

const TOKEN_SOURCES: TokenSource[] = [
  { relativePath: 'tier1-core/core.json', tier: 1 },
  { relativePath: 'tier1-core/brand-cognivo.json', tier: 1 },
  { relativePath: 'tier2-semantic/cognivo-light.json', tier: 2 },
  { relativePath: 'tier2-semantic/cognivo-dark.json', tier: 2 },
  { relativePath: 'tier3-component/components.json', tier: 3 },
];

// ─── Main parser ────────────────────────────────────────────────────────────

/**
 * Read all token JSON files from `tokensDir`, resolve references,
 * and return a flat array of `TokenEntry` objects.
 */
export function parseTokens(tokensDir: string): TokenEntry[] {
  // Step 1: Load all JSON data
  const sourceData: Array<{ data: Record<string, unknown>; tier: 1 | 2 | 3 }> =
    [];

  for (const source of TOKEN_SOURCES) {
    const filePath = join(tokensDir, source.relativePath);
    try {
      const raw = readFileSync(filePath, 'utf-8');
      const data = JSON.parse(raw) as Record<string, unknown>;
      sourceData.push({ data, tier: source.tier });
    } catch {
      // File may not exist (e.g. brand file is optional) — skip silently
      continue;
    }
  }

  // Step 2: Build a merged flat map of ALL token paths → raw values
  //         This is used for cross-tier reference resolution.
  const allRawData = sourceData.map((s) => s.data);
  const flatMap = buildFlatTokenMap(allRawData);

  // Step 3: Walk each source and produce TokenEntry[]
  const entries: TokenEntry[] = [];

  for (const { data, tier } of sourceData) {
    walkAndCollect(data, [], tier, flatMap, entries);
  }

  return entries;
}

// ─── Tree walker ────────────────────────────────────────────────────────────

/**
 * Recursively walk a DTCG JSON object. When a leaf (node with `$value`) is
 * found, create a `TokenEntry` and push it onto `entries`.
 */
function walkAndCollect(
  obj: Record<string, unknown>,
  pathSegments: string[],
  tier: 1 | 2 | 3,
  flatMap: Map<string, string>,
  entries: TokenEntry[],
): void {
  if ('$value' in obj) {
    const entry = buildEntry(obj, pathSegments, tier, flatMap);
    if (entry) {
      entries.push(entry);
    }
    return;
  }

  for (const key of Object.keys(obj)) {
    if (key.startsWith('$')) continue;
    const child = obj[key];
    if (child !== null && typeof child === 'object' && !Array.isArray(child)) {
      walkAndCollect(
        child as Record<string, unknown>,
        [...pathSegments, key],
        tier,
        flatMap,
        entries,
      );
    }
  }
}

// ─── Entry builder ──────────────────────────────────────────────────────────

/**
 * Convert a single DTCG leaf node into a `TokenEntry`.
 */
function buildEntry(
  node: Record<string, unknown>,
  pathSegments: string[],
  tier: 1 | 2 | 3,
  flatMap: Map<string, string>,
): TokenEntry | undefined {
  const rawValue = node['$value'];
  if (rawValue === undefined || rawValue === null) return undefined;

  const valueStr = String(rawValue);
  const resolvedValue = resolveTokenValue(valueStr, flatMap);

  const type = typeof node['$type'] === 'string' ? node['$type'] : 'unknown';
  const category = pathSegments[0] ?? 'unknown';
  const subcategory = pathSegments[1] ?? 'unknown';

  const entry: TokenEntry = {
    name: toCssCustomProperty(pathSegments),
    path: pathSegments,
    value: valueStr,
    resolvedValue,
    type,
    tier,
    category,
    subcategory,
    usableInComponents: isUsableInComponents(pathSegments, tier),
  };

  const componentName = deriveComponentAssociation(pathSegments, tier);
  if (componentName !== undefined) {
    entry.componentAssociation = componentName;
  }

  return entry;
}

// ─── Naming helpers ─────────────────────────────────────────────────────────

/**
 * Convert a path like `["color", "action", "primary", "background", "default"]`
 * to `--cg-color-action-primary-background-default`.
 */
function toCssCustomProperty(pathSegments: string[]): string {
  const joined = pathSegments.join('-');
  return `--cg-${joined}`;
}

/**
 * For tier 3 tokens whose top-level key is "component", the component name
 * is the second path segment (e.g. "button", "input", "modal").
 */
function deriveComponentAssociation(
  pathSegments: string[],
  tier: 1 | 2 | 3,
): string | undefined {
  if (tier === 3 && pathSegments[0] === 'component') {
    return pathSegments[1];
  }
  return undefined;
}

/**
 * Determine whether a token should be used directly in component CSS.
 *
 * Tier 1 raw palette colors (gray, red, blue, green, yellow, teal, brand)
 * should NEVER be used directly — components must go through
 * tier 2 semantic tokens instead.
 */
function isUsableInComponents(
  pathSegments: string[],
  tier: 1 | 2 | 3,
): boolean {
  if (tier !== 1) {
    // Tier 2 (semantic) and tier 3 (component) tokens are always usable
    return true;
  }

  // Tier 1: block palette color families
  const topLevel = pathSegments[0];
  if (topLevel !== undefined && TIER1_PALETTE_FAMILIES.has(topLevel)) {
    return false;
  }

  // Other tier 1 tokens (spacing, border, font, etc.) are usable as fallbacks
  return true;
}
