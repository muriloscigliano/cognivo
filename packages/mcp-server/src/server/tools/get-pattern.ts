/**
 * MCP Tool: get_pattern
 *
 * Retrieves composition patterns showing how to combine Cognivo
 * components for common UI scenarios.
 */
import { z } from 'zod';
import type { CognivoCatalog, PatternEntry } from '../../catalog/types.js';
import { matchesSearch, searchScore } from '../helpers/search.js';

// ─── Schema ────────────────────────────────────────────────────────────────

export const getPatternSchema = z.object({
  id: z
    .string()
    .optional()
    .describe('Pattern ID, e.g. "form-with-validation"'),
  category: z
    .string()
    .optional()
    .describe('Filter by category: form, modal, data, chat, navigation, feedback, ai-workflow'),
  components: z
    .array(z.string())
    .optional()
    .describe('Find patterns using these components'),
});

export type GetPatternInput = z.infer<typeof getPatternSchema>;

// ─── Implementation ────────────────────────────────────────────────────────

export function getPattern(
  catalog: CognivoCatalog,
  input: GetPatternInput,
): string {
  // Single pattern lookup by ID
  if (input.id) {
    const pattern = catalog.patterns.find((p) => p.id === input.id);
    if (!pattern) {
      // Try fuzzy match
      const fuzzy = catalog.patterns.find(
        (p) =>
          p.id.includes(input.id!) ||
          p.name.toLowerCase().includes(input.id!.toLowerCase()),
      );
      if (fuzzy) {
        return formatPatternDetail(fuzzy);
      }
      const available = catalog.patterns.map((p) => `\`${p.id}\``).join(', ');
      return `Pattern "${input.id}" not found. Available patterns: ${available}`;
    }
    return formatPatternDetail(pattern);
  }

  // Filter mode
  let results = catalog.patterns;

  // Filter by category
  if (input.category) {
    const catLower = input.category.toLowerCase();
    results = results.filter((p) => p.category.toLowerCase() === catLower);
  }

  // Filter by components — pattern must include ALL requested components
  if (input.components && input.components.length > 0) {
    const requested = input.components.map((c) => c.toLowerCase());
    results = results.filter((p) => {
      const patternComps = p.components.map((c) => c.toLowerCase());
      return requested.every((rc) =>
        patternComps.some((pc) => pc === rc || pc.includes(rc)),
      );
    });
  }

  // Handle empty results
  if (results.length === 0) {
    const filters: string[] = [];
    if (input.category) filters.push(`category="${input.category}"`);
    if (input.components) filters.push(`components=[${input.components.join(', ')}]`);
    return `No patterns found matching ${filters.join(', ')}. The catalog contains ${catalog.patterns.length} patterns. Use \`cognivo_get_pattern\` with no filters to see all.`;
  }

  // Format list
  const lines: string[] = [];
  lines.push(`Found ${results.length} pattern${results.length === 1 ? '' : 's'}:\n`);

  for (const p of results) {
    lines.push(`- **${p.name}** (\`${p.id}\`) — ${p.description}`);
    lines.push(`  Category: ${p.category} | Components: ${p.components.join(', ')}`);
  }

  lines.push('');
  lines.push('Use `cognivo_get_pattern` with a specific `id` to get the full pattern with HTML example.');

  return lines.join('\n');
}

// ─── Formatting ────────────────────────────────────────────────────────────

function formatPatternDetail(pattern: PatternEntry): string {
  const lines: string[] = [];

  lines.push(`## ${pattern.name}`);
  lines.push(`Category: ${pattern.category}`);
  lines.push(`Components: ${pattern.components.join(', ')}`);

  if (pattern.tokens.length > 0) {
    lines.push(`Key tokens: ${pattern.tokens.join(', ')}`);
  }

  if (pattern.biases.length > 0) {
    lines.push(`Related biases: ${pattern.biases.join(', ')}`);
  }

  lines.push('');
  lines.push(pattern.description);
  lines.push('');

  lines.push('### HTML Example');
  lines.push('```html');
  lines.push(pattern.html);
  lines.push('```');

  if (pattern.notes.length > 0) {
    lines.push('');
    lines.push('### Notes');
    for (const note of pattern.notes) {
      lines.push(`- ${note}`);
    }
  }

  return lines.join('\n');
}
