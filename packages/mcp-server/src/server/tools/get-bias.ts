/**
 * MCP Tool: get_bias
 *
 * Looks up cognitive biases from Cognivo's library of 180 biases
 * with design impact analysis, guidelines, and relationships.
 */
import { z } from 'zod';
import type { CognivoCatalog, BiasEntry } from '../../catalog/types.js';
import { searchScore } from '../helpers/search.js';
import { truncateList } from '../helpers/truncation.js';

// ─── Schema ────────────────────────────────────────────────────────────────

export const getBiasSchema = z.object({
  id: z
    .string()
    .optional()
    .describe('Bias ID, e.g. "anchoring-bias"'),
  search: z
    .string()
    .optional()
    .describe('Search biases by name, definition, or tags'),
  category: z
    .string()
    .optional()
    .describe('Filter by category, e.g. "cognitive", "social", "memory"'),
  detail: z
    .enum(['summary', 'full'])
    .optional()
    .default('summary')
    .describe('Level of detail: "summary" or "full"'),
});

export type GetBiasInput = z.infer<typeof getBiasSchema>;

// ─── Implementation ────────────────────────────────────────────────────────

export function getBias(
  catalog: CognivoCatalog,
  input: GetBiasInput,
): string {
  // Single bias lookup by ID
  if (input.id) {
    const bias = catalog.biases.find((b) => b.id === input.id);
    if (!bias) {
      // Try fuzzy match on ID or name
      const fuzzy = catalog.biases.find(
        (b) =>
          b.id.includes(input.id!) ||
          b.name.toLowerCase().includes(input.id!.toLowerCase()) ||
          b.aliases.some((a) => a.toLowerCase().includes(input.id!.toLowerCase())),
      );
      if (fuzzy) {
        return input.detail === 'full'
          ? formatBiasFull(fuzzy)
          : formatBiasSummary(fuzzy);
      }
      return `Bias "${input.id}" not found. Use \`cognivo_get_bias\` with \`search\` to find biases by keyword, or browse by \`category\`.`;
    }
    return input.detail === 'full'
      ? formatBiasFull(bias)
      : formatBiasSummary(bias);
  }

  // Filter/search mode
  let results = catalog.biases;

  // Filter by category
  if (input.category) {
    const catLower = input.category.toLowerCase();
    results = results.filter(
      (b) =>
        b.category.toLowerCase() === catLower ||
        b.relatedCategories.some((rc) => rc.toLowerCase() === catLower),
    );
  }

  // Search by query
  if (input.search) {
    const query = input.search;
    const scored = results
      .map((b) => ({
        bias: b,
        score: searchScore(query, [
          b.name,
          b.id,
          ...b.aliases,
          ...b.tags,
          b.category,
          b.definition.simple,
        ]),
      }))
      .filter((s) => s.score > 0)
      .sort((a, b) => b.score - a.score);

    results = scored.map((s) => s.bias);
  }

  // Handle empty results
  if (results.length === 0) {
    const filters: string[] = [];
    if (input.category) filters.push(`category="${input.category}"`);
    if (input.search) filters.push(`search="${input.search}"`);
    return `No biases found matching ${filters.join(', ')}. The catalog contains ${catalog.biases.length} biases. Try a broader search term.`;
  }

  // Format compact list
  const { items, message } = truncateList(results, 15, results.length);

  const lines: string[] = [];
  lines.push(`Found ${results.length} bias${results.length === 1 ? '' : 'es'}:\n`);

  for (const b of items) {
    lines.push(`- **${b.name}** (\`${b.id}\`) — ${b.definition.simple}`);
    lines.push(`  Category: ${b.category} | Tags: ${b.tags.slice(0, 5).join(', ')}`);
  }

  lines.push('');
  lines.push(message);
  lines.push('');
  lines.push('Use `cognivo_get_bias` with a specific `id` for full details.');

  return lines.join('\n');
}

// ─── Formatting ────────────────────────────────────────────────────────────

function formatBiasSummary(bias: BiasEntry): string {
  const lines: string[] = [];

  lines.push(`## ${bias.name}`);
  lines.push(`Category: ${bias.category} | Tags: ${bias.tags.join(', ')}`);
  lines.push(`Discovered by: ${bias.definition.discoveredBy} (${bias.definition.year})`);
  lines.push('');
  lines.push(bias.definition.simple);

  if (bias.guidelines.dos.length > 0) {
    lines.push('');
    lines.push("### Do's");
    for (const d of bias.guidelines.dos) {
      lines.push(`- ${d}`);
    }
  }

  if (bias.guidelines.donts.length > 0) {
    lines.push('');
    lines.push("### Don'ts");
    for (const d of bias.guidelines.donts) {
      lines.push(`- ${d}`);
    }
  }

  if (
    bias.relationships.complements.length > 0 ||
    bias.relationships.conflicts.length > 0
  ) {
    lines.push('');
    lines.push('### Related');
    if (bias.relationships.complements.length > 0) {
      lines.push(`Complements: ${bias.relationships.complements.join(', ')}`);
    }
    if (bias.relationships.conflicts.length > 0) {
      lines.push(`Conflicts: ${bias.relationships.conflicts.join(', ')}`);
    }
    if (bias.relationships.confusedWith.length > 0) {
      lines.push(`Often confused with: ${bias.relationships.confusedWith.join(', ')}`);
    }
  }

  return lines.join('\n');
}

function formatBiasFull(bias: BiasEntry): string {
  const lines: string[] = [];

  // Start with the summary
  lines.push(formatBiasSummary(bias));

  // Add detailed definition
  lines.push('');
  lines.push('### Detailed Definition');
  lines.push(bias.definition.detailed);

  // Design impact
  lines.push('');
  lines.push('### Design Impact');
  lines.push(bias.designImpact.description);
  lines.push(`When-to-use patterns: ${bias.designImpact.whenToUseCount} | Common mistakes: ${bias.designImpact.commonMistakeCount}`);

  // Detection
  if (bias.detection.checklistQuestions.length > 0) {
    lines.push('');
    lines.push('### Detection Questions');
    for (const q of bias.detection.checklistQuestions) {
      lines.push(`- ${q}`);
    }
  }

  // Aliases
  if (bias.aliases.length > 0) {
    lines.push('');
    lines.push(`**Also known as:** ${bias.aliases.join(', ')}`);
  }

  return lines.join('\n');
}
