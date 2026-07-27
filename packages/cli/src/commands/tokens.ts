import { createRequire } from 'node:module';
import type { CognivoCatalog, TokenEntry } from '@cognivo/mcp-server/catalog-types';

const require = createRequire(import.meta.url);
const catalog = require('@cognivo/mcp-server/catalog.json') as CognivoCatalog;

export interface CommandResult {
  exitCode: number; // 0 = ok, 2 = no matches
  text: string;
}

const LIMIT = 20;

export function findTokens(query: string): CommandResult {
  const q = query.toLowerCase();
  const matches = catalog.tokens.filter(
    (t) =>
      t.name.toLowerCase().includes(q) ||
      t.category.toLowerCase().includes(q) ||
      t.subcategory.toLowerCase().includes(q),
  );

  if (matches.length === 0) {
    return {
      exitCode: 2,
      text: `No tokens matching "${query}". The catalog contains ${catalog.tokens.length} tokens.`,
    };
  }

  const lines: string[] = [`Found ${matches.length} tokens matching "${query}":`];
  for (const t of sortTokens(matches).slice(0, LIMIT)) lines.push(formatToken(t));
  if (matches.length > LIMIT) lines.push(`… and ${matches.length - LIMIT} more.`);
  return { exitCode: 0, text: lines.join('\n') };
}

/** CSS property → token name patterns, mirroring the tier priority Tier 3 > Tier 2 > Tier 1. */
const PROPERTY_PATTERNS: Record<string, string[]> = {
  color: ['color-text', 'color'],
  background: ['background', 'surface'],
  spacing: ['spacing'],
  gap: ['gap', 'spacing'],
  padding: ['padding', 'spacing'],
  margin: ['spacing'],
  'font-size': ['font-size'],
  'border-radius': ['radius'],
  radius: ['radius'],
  shadow: ['shadow'],
};

export function tokenFor(property: string): CommandResult {
  const prop = property.toLowerCase().trim();
  const patterns = PROPERTY_PATTERNS[prop] ?? [prop];

  const matches = catalog.tokens.filter((t) => {
    const name = t.name.toLowerCase();
    return patterns.some((p) => name.includes(p));
  });

  if (matches.length === 0) {
    return {
      exitCode: 2,
      text: `No tokens for CSS property "${property}". Try 'cognivo tokens find <query>' with a broader term.`,
    };
  }

  const sorted = sortTokens(matches);
  const lines: string[] = [`Tokens for "${property}" (tier 3 component > tier 2 semantic > tier 1 core):`];
  for (const t of sorted.slice(0, LIMIT)) lines.push(formatToken(t));
  if (sorted.length > LIMIT) lines.push(`… and ${sorted.length - LIMIT} more.`);
  return { exitCode: 0, text: lines.join('\n') };
}

/** Tier 3 first, then 2, then 1; alphabetical within tier. */
function sortTokens(tokens: TokenEntry[]): TokenEntry[] {
  return [...tokens].sort((a, b) => {
    if (a.tier !== b.tier) return b.tier - a.tier;
    return a.name.localeCompare(b.name);
  });
}

function formatToken(t: TokenEntry): string {
  const value = t.resolvedValue !== t.value ? `${t.value} → ${t.resolvedValue}` : t.value;
  const assoc = t.componentAssociation ? `, ${t.componentAssociation}` : '';
  return `${t.name} = ${value} [tier ${t.tier}, ${t.type}${assoc}]`;
}
