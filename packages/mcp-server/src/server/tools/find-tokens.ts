/**
 * MCP Tool: find_tokens
 *
 * Searches the design token catalog with filtering by tier,
 * category, component association, and free-text search.
 * Results are sorted by tier (3 first) then alphabetically.
 */
import { z } from 'zod';
import type { CognivoCatalog, TokenEntry } from '../../catalog/types.js';
import { searchScore } from '../helpers/search.js';
import { truncateList } from '../helpers/truncation.js';

// ─── Schema ────────────────────────────────────────────────────────────────

export const findTokensSchema = z.object({
  search: z
    .string()
    .optional()
    .describe('Search token names, categories, or values'),
  tier: z
    .enum(['1', '2', '3'])
    .optional()
    .describe('Filter by token tier (1=core, 2=semantic, 3=component)'),
  category: z
    .string()
    .optional()
    .describe('Filter by token category, e.g. "color", "spacing", "dimension"'),
  component: z
    .string()
    .optional()
    .describe('Filter by component association, e.g. "button", "input"'),
  limit: z
    .number()
    .min(1)
    .max(100)
    .optional()
    .default(30)
    .describe('Max results to return (1-100)'),
});

export type FindTokensInput = z.infer<typeof findTokensSchema>;

// ─── Implementation ────────────────────────────────────────────────────────

export function findTokens(
  catalog: CognivoCatalog,
  input: FindTokensInput,
): string {
  let results = catalog.tokens;

  // Filter by tier
  if (input.tier) {
    const tierNum = Number(input.tier) as 1 | 2 | 3;
    results = results.filter((t) => t.tier === tierNum);
  }

  // Filter by category (case-insensitive partial match)
  if (input.category) {
    const catLower = input.category.toLowerCase();
    results = results.filter(
      (t) =>
        t.category.toLowerCase().includes(catLower) ||
        t.subcategory.toLowerCase().includes(catLower),
    );
  }

  // Filter by component association
  if (input.component) {
    const compLower = input.component.toLowerCase();
    results = results.filter(
      (t) =>
        t.componentAssociation !== undefined &&
        t.componentAssociation.toLowerCase().includes(compLower),
    );
  }

  // Search and score
  if (input.search) {
    const query = input.search;
    const scored = results
      .map((t) => ({
        token: t,
        score: searchScore(query, [
          t.name,
          t.category,
          t.subcategory,
          t.value,
          t.componentAssociation ?? '',
        ]),
      }))
      .filter((s) => s.score > 0)
      .sort((a, b) => b.score - a.score);

    results = scored.map((s) => s.token);
  } else {
    // Default sort: tier 3 first, then 2, then 1; alphabetical within tier
    results = [...results].sort((a, b) => {
      if (a.tier !== b.tier) return b.tier - a.tier; // 3 > 2 > 1
      return a.name.localeCompare(b.name);
    });
  }

  // Handle empty results
  if (results.length === 0) {
    const filters: string[] = [];
    if (input.search) filters.push(`search="${input.search}"`);
    if (input.tier) filters.push(`tier=${input.tier}`);
    if (input.category) filters.push(`category="${input.category}"`);
    if (input.component) filters.push(`component="${input.component}"`);
    return `No tokens found${filters.length ? ` matching ${filters.join(', ')}` : ''}. The catalog contains ${catalog.tokens.length} tokens total.`;
  }

  const totalCount = results.length;
  const { items, message } = truncateList(results, input.limit, totalCount);

  // Build header
  const lines: string[] = [];
  const filterParts: string[] = [];
  if (input.search) filterParts.push(`"${input.search}"`);
  if (input.tier) filterParts.push(`tier ${input.tier}`);
  if (input.category) filterParts.push(`category "${input.category}"`);
  if (input.component) filterParts.push(`component "${input.component}"`);

  const filterDesc = filterParts.length > 0 ? ` matching ${filterParts.join(', ')}` : '';
  lines.push(`Found ${totalCount} token${totalCount === 1 ? '' : 's'}${filterDesc}:\n`);

  // Build list
  for (const token of items) {
    lines.push(formatTokenLine(token));
  }

  // Truncation message
  lines.push('');
  lines.push(message);

  return lines.join('\n');
}

// ─── Formatting ────────────────────────────────────────────────────────────

function formatTokenLine(t: TokenEntry): string {
  const value = t.resolvedValue !== t.value ? `${t.value} → ${t.resolvedValue}` : t.value;
  const assoc = t.componentAssociation ? `, ${t.componentAssociation}` : '';
  return `${t.name} = ${value} [tier ${t.tier}, ${t.type}${assoc}]`;
}
