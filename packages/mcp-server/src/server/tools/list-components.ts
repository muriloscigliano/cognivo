/**
 * MCP Tool: list_components
 *
 * Lists components from the Cognivo catalog with optional filtering
 * by category, search query, wave, and result limit.
 */
import { z } from 'zod';
import type { CognivoCatalog, ComponentEntry } from '../../catalog/types.js';
import { searchScore, matchesSearch } from '../helpers/search.js';
import { truncateList } from '../helpers/truncation.js';

// ─── Schema ────────────────────────────────────────────────────────────────

export const listComponentsSchema = z.object({
  category: z
    .enum(['foundation', 'ai', 'all'])
    .optional()
    .default('all')
    .describe('Filter by component category'),
  search: z
    .string()
    .optional()
    .describe('Fuzzy search across tag, description, and class name'),
  wave: z
    .string()
    .optional()
    .describe('Filter by wave, e.g. "Wave 1" or "1"'),
  limit: z
    .number()
    .min(1)
    .max(50)
    .optional()
    .default(20)
    .describe('Max results to return (1-50)'),
});

export type ListComponentsInput = z.infer<typeof listComponentsSchema>;

// ─── Implementation ────────────────────────────────────────────────────────

export function listComponents(
  catalog: CognivoCatalog,
  input: ListComponentsInput,
): string {
  let results = catalog.components;

  // Filter by category
  if (input.category && input.category !== 'all') {
    results = results.filter((c) => c.category === input.category);
  }

  // Filter by wave (case-insensitive, partial match)
  if (input.wave) {
    const waveLower = input.wave.toLowerCase();
    results = results.filter((c) => c.wave.toLowerCase().includes(waveLower));
  }

  // Filter and sort by search relevance
  if (input.search) {
    const query = input.search;
    const scored = results
      .map((c) => ({
        component: c,
        score: searchScore(query, [c.tag, c.description, c.className]),
      }))
      .filter((s) => s.score > 0)
      .sort((a, b) => b.score - a.score);

    results = scored.map((s) => s.component);
  }

  // Handle empty results
  if (results.length === 0) {
    const filters: string[] = [];
    if (input.category && input.category !== 'all') filters.push(`category="${input.category}"`);
    if (input.search) filters.push(`search="${input.search}"`);
    if (input.wave) filters.push(`wave="${input.wave}"`);
    return `No components found${filters.length ? ` matching ${filters.join(', ')}` : ''}. The catalog contains ${catalog.components.length} components total.`;
  }

  const totalCount = results.length;
  const { items, message } = truncateList(results, input.limit, totalCount);

  // Build header
  const lines: string[] = [];
  if (input.search) {
    lines.push(`Found ${totalCount} component${totalCount === 1 ? '' : 's'} matching "${input.search}":\n`);
  } else {
    const scope = input.category === 'all' ? '' : ` ${input.category}`;
    lines.push(`Found ${totalCount}${scope} component${totalCount === 1 ? '' : 's'}:\n`);
  }

  // Build list
  items.forEach((c, i) => {
    lines.push(formatComponentLine(c, i + 1));
  });

  // Truncation message
  lines.push('');
  lines.push(message);

  return lines.join('\n');
}

// ─── Formatting ────────────────────────────────────────────────────────────

function formatComponentLine(c: ComponentEntry, index: number): string {
  const propCount = c.properties.length;
  const eventCount = c.events.length;
  const slotCount = c.slots.length;

  return [
    `${index}. ${c.tag} — ${c.description} [${c.category}]`,
    `   Props: ${propCount} | Events: ${eventCount} | Slots: ${slotCount}`,
  ].join('\n');
}
