/**
 * MCP Tool: suggest_biases
 *
 * Given a UI scenario description, recommends the most relevant
 * cognitive biases and explains how to apply each one.
 */
import { z } from 'zod';
import type { CognivoCatalog, BiasEntry } from '../../catalog/types.js';

// ─── Schema ────────────────────────────────────────────────────────────────

export const suggestBiasesSchema = z.object({
  scenario: z
    .string()
    .describe('UI scenario, e.g. "pricing page with three tiers"'),
  tags: z
    .array(z.string())
    .optional()
    .describe('Optional tags to boost matching, e.g. ["pricing", "conversion"]'),
  limit: z
    .number()
    .min(1)
    .max(10)
    .optional()
    .default(5)
    .describe('Number of recommendations (1-10)'),
});

export type SuggestBiasesInput = z.infer<typeof suggestBiasesSchema>;

// ─── Stop Words ────────────────────────────────────────────────────────────

const STOP_WORDS = new Set([
  'a', 'an', 'the', 'with', 'for', 'and', 'or', 'is', 'in', 'to', 'of',
  'on', 'at', 'by', 'from', 'as', 'it', 'its', 'that', 'this', 'be',
  'are', 'was', 'were', 'been', 'has', 'have', 'had', 'do', 'does',
  'did', 'but', 'not', 'no', 'so', 'if', 'my', 'your', 'our', 'their',
  'we', 'you', 'they', 'i', 'me', 'us', 'them', 'he', 'she', 'his',
  'her', 'who', 'what', 'when', 'where', 'how', 'which', 'up', 'can',
  'will', 'just', 'should', 'would', 'could', 'about', 'into',
]);

// ─── Scoring ───────────────────────────────────────────────────────────────

function extractKeywords(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 1 && !STOP_WORDS.has(w));
}

interface ScoredBias {
  bias: BiasEntry;
  score: number;
}

function scoreBias(
  bias: BiasEntry,
  keywords: string[],
  explicitTags: string[],
): number {
  let score = 0;
  const biasNameLower = bias.name.toLowerCase();
  const biasAliases = bias.aliases.map((a) => a.toLowerCase());
  const biasTags = bias.tags.map((t) => t.toLowerCase());
  const biasCategoryLower = bias.category.toLowerCase();

  for (const keyword of keywords) {
    // +3 for tag match
    if (biasTags.some((t) => t === keyword || t.includes(keyword))) {
      score += 3;
    }

    // +2 for name or alias match
    if (
      biasNameLower.includes(keyword) ||
      biasAliases.some((a) => a.includes(keyword))
    ) {
      score += 2;
    }

    // +1 for category match
    if (biasCategoryLower.includes(keyword)) {
      score += 1;
    }
  }

  // +3 for each explicit tag match
  for (const tag of explicitTags) {
    const tagLower = tag.toLowerCase();
    if (biasTags.some((t) => t === tagLower || t.includes(tagLower))) {
      score += 3;
    }
  }

  return score;
}

// ─── How to Apply ──────────────────────────────────────────────────────────

function generateHowToApply(bias: BiasEntry): string {
  // Use the first "do" guideline as a concrete action if available.
  // The definition is already printed above the "How to apply" line,
  // so never repeat it here.
  const firstDo = bias.guidelines.dos[0];
  if (firstDo) {
    return firstDo;
  }

  return bias.designImpact.description || 'See the full bias card for guidance.';
}

// ─── Relevance Label ───────────────────────────────────────────────────────

function relevanceLabel(score: number, maxScore: number): string {
  const ratio = maxScore > 0 ? score / maxScore : 0;
  if (ratio >= 0.7) return 'high';
  if (ratio >= 0.4) return 'medium';
  return 'low';
}

// ─── Implementation ────────────────────────────────────────────────────────

export function suggestBiases(
  catalog: CognivoCatalog,
  input: SuggestBiasesInput,
): string {
  const keywords = extractKeywords(input.scenario);
  const explicitTags = input.tags ?? [];

  if (keywords.length === 0 && explicitTags.length === 0) {
    return 'Could not extract meaningful keywords from the scenario. Try a more descriptive scenario, e.g. "pricing page with three subscription tiers and a free trial".';
  }

  // Score all biases
  const scored: ScoredBias[] = catalog.biases
    .map((bias) => ({
      bias,
      score: scoreBias(bias, keywords, explicitTags),
    }))
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score);

  if (scored.length === 0) {
    return `No biases matched the scenario "${input.scenario}". Try adding more specific tags or a longer description. The catalog contains ${catalog.biases.length} biases across categories like cognitive, social, memory, and decision-making.`;
  }

  const limit = input.limit ?? 5;
  const topResults = scored.slice(0, limit);
  const maxScore = topResults[0]!.score;

  const lines: string[] = [];
  lines.push(`## Bias Recommendations for "${input.scenario}"\n`);

  topResults.forEach((result, i) => {
    const { bias, score } = result;
    const relevance = relevanceLabel(score, maxScore);

    lines.push(`### ${i + 1}. ${bias.name} (relevance: ${relevance})`);
    lines.push(bias.definition.simple);
    lines.push(`**How to apply:** ${generateHowToApply(bias)}`);

    if (bias.guidelines.donts.length > 0) {
      lines.push(`**Watch out:** ${bias.guidelines.donts[0]}`);
    }

    lines.push('');
  });

  // Related tags for further exploration
  const allTags = new Set<string>();
  for (const result of topResults) {
    for (const tag of result.bias.tags) {
      allTags.add(tag);
    }
  }
  const tagList = [...allTags].slice(0, 10).join(', ');
  lines.push(`**Related tags for further exploration:** ${tagList}`);
  lines.push('');
  lines.push('Use `cognivo_get_bias` with a specific ID for the full design impact analysis.');

  return lines.join('\n');
}
