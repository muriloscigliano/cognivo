/**
 * Bias Parser — Reads cognitive bias source files from the design-advisor
 * package and extracts structured BiasEntry data via regex.
 *
 * Strategy: We cannot import the design-advisor package at catalog-gen time
 * (circular dep), so we read the TypeScript sources as text and extract
 * the key fields with targeted regular expressions. This is "good enough"
 * extraction — not every field will be perfectly parsed for all 180 biases,
 * but the critical fields (id, name, category, tags, definition) are robust.
 */

import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';

import type { BiasEntry } from '../types.js';

// ─── Regex Helpers ─────────────────────────────────────────────────────────

/**
 * Extract a single-quoted or double-quoted string value for a given key.
 * Matches: `key: 'value'` or `key: "value"`
 */
function extractString(source: string, key: string): string {
  // Try single/double quotes first
  const quoteRe = new RegExp(`${key}:\\s*['"]([^'"]*?)['"]`);
  const quoteMatch = quoteRe.exec(source);
  if (quoteMatch) return quoteMatch[1]!;

  // Try template literal (backtick)
  const tickRe = new RegExp(`${key}:\\s*\`([^\`]*?)\``, 's');
  const tickMatch = tickRe.exec(source);
  if (tickMatch) return tickMatch[1]!.trim();

  // Try multi-line string continuation: key:\n  'value...'
  const multiRe = new RegExp(`${key}:\\s*\\n\\s*['"\`]([^'"\`]*?)['"\`]`);
  const multiMatch = multiRe.exec(source);
  if (multiMatch) return multiMatch[1]!;

  return '';
}

/**
 * Extract a longer text value that may span multiple lines,
 * supporting both quote styles and template literals.
 */
function extractLongString(source: string, key: string, maxLen: number): string {
  // Template literal (most common for long text)
  const tickRe = new RegExp(`${key}:\\s*\`([\\s\\S]*?)\``, 's');
  const tickMatch = tickRe.exec(source);
  if (tickMatch) {
    const text = tickMatch[1]!.replace(/\s+/g, ' ').trim();
    return text.substring(0, maxLen);
  }

  // Single/double quotes (shorter values)
  const quoteRe = new RegExp(`${key}:\\s*['"]([\\s\\S]*?)['"]`);
  const quoteMatch = quoteRe.exec(source);
  if (quoteMatch) {
    const text = quoteMatch[1]!.replace(/\s+/g, ' ').trim();
    return text.substring(0, maxLen);
  }

  // Multi-line string with concatenation: 'part1' +\n  'part2'
  const concatRe = new RegExp(
    `${key}:\\s*\\n?\\s*['"\`]([\\s\\S]*?)['"\`](?:\\s*\\+\\s*['"\`]([\\s\\S]*?)['"\`])*`,
  );
  const concatMatch = concatRe.exec(source);
  if (concatMatch) {
    const parts = [concatMatch[1]!, concatMatch[2]].filter(Boolean);
    const text = parts.join(' ').replace(/\s+/g, ' ').trim();
    return text.substring(0, maxLen);
  }

  return '';
}

/**
 * Extract a numeric value for a given key.
 * Matches: `key: 1974`
 */
function extractNumber(source: string, key: string): number {
  const re = new RegExp(`${key}:\\s*(\\d+)`);
  const match = re.exec(source);
  return match ? parseInt(match[1]!, 10) : 0;
}

/**
 * Extract an array of strings for a given key.
 * Matches: `key: ['a', 'b', 'c']` or multi-line arrays.
 */
function extractStringArray(source: string, key: string, limit = Infinity): string[] {
  // Find the array opening bracket after the key
  const re = new RegExp(`${key}:\\s*\\[([\\s\\S]*?)\\]`);
  const match = re.exec(source);
  if (!match) return [];

  const content = match[1]!;

  // Extract quoted strings from the array content
  const items: string[] = [];
  const itemRe = /['"]([^'"]*?)['"]/g;
  let itemMatch: RegExpExecArray | null;
  while ((itemMatch = itemRe.exec(content)) !== null) {
    items.push(itemMatch[1]!);
    if (items.length >= limit) break;
  }

  return items;
}

/**
 * Extract all BiasCategory.XXX enum values from a source string in a
 * specific context (array or single assignment).
 */
function extractCategory(source: string): string {
  const re = /category:\s*BiasCategory\.(\w+)/;
  const match = re.exec(source);
  return match ? match[1]!.toLowerCase().replace(/_/g, '-') : 'unknown';
}

function extractRelatedCategories(source: string): string[] {
  const re = /relatedCategories:\s*\[([\s\S]*?)\]/;
  const match = re.exec(source);
  if (!match) return [];

  const content = match[1]!;
  const categories: string[] = [];
  const catRe = /BiasCategory\.(\w+)/g;
  let catMatch: RegExpExecArray | null;
  while ((catMatch = catRe.exec(content)) !== null) {
    categories.push(catMatch[1]!.toLowerCase().replace(/_/g, '-'));
  }

  return categories;
}

/**
 * Extract relationship arrays (complements, conflicts, confusedWith).
 * These are arrays of bias ID strings within the `relationships:` block.
 */
function extractRelationships(source: string): {
  complements: string[];
  conflicts: string[];
  confusedWith: string[];
} {
  // Find the relationships block
  const blockRe = /relationships:\s*\{([\s\S]*?)\n\s*\}/;
  const blockMatch = blockRe.exec(source);
  if (!blockMatch) {
    return { complements: [], conflicts: [], confusedWith: [] };
  }

  const block = blockMatch[1]!;

  return {
    complements: extractStringArray(block, 'complements'),
    conflicts: extractStringArray(block, 'conflicts'),
    confusedWith: extractStringArray(block, 'confusedWith'),
  };
}

/**
 * Count occurrences of objects in an array for a given key.
 * Used for whenToUse, commonMistakes, patterns, etc.
 */
function countArrayObjects(source: string, key: string): number {
  const re = new RegExp(`${key}:\\s*\\[([\\s\\S]*?)\\n\\s*\\]`);
  const match = re.exec(source);
  if (!match) return 0;

  // Count `title:` or `{` occurrences as proxy for object count
  const content = match[1]!;
  const titleMatches = content.match(/title:\s/g);
  return titleMatches ? titleMatches.length : 0;
}

// ─── Registry Parser ───────────────────────────────────────────────────────

/**
 * Extract bias IDs from the registry file (packages/design-advisor/src/biases/index.ts).
 * Reads `biasRegistry = { 'id': varName, ... }` and returns all IDs.
 */
function extractBiasIdsFromRegistry(registryPath: string): string[] {
  if (!existsSync(registryPath)) {
    console.warn(`[bias-parser] Registry not found: ${registryPath}`);
    return [];
  }

  const source = readFileSync(registryPath, 'utf-8');
  const ids: string[] = [];

  // Match each `'bias-id': varName` line in the registry
  const entryRe = /['"]([a-z][a-z0-9-]+)['"]\s*:/g;
  let match: RegExpExecArray | null;

  // Only look at the biasRegistry block
  const registryBlockRe = /biasRegistry\s*=\s*\{([\s\S]*?)\}\s*as\s*const/;
  const registryBlock = registryBlockRe.exec(source);
  if (!registryBlock) {
    console.warn('[bias-parser] Could not find biasRegistry block');
    return [];
  }

  const block = registryBlock[1]!;
  while ((match = entryRe.exec(block)) !== null) {
    ids.push(match[1]!);
  }

  return ids;
}

// ─── Single Bias Parser ────────────────────────────────────────────────────

/**
 * Parse a single bias file and return a BiasEntry.
 */
function parseSingleBias(biasDir: string, biasId: string): BiasEntry | null {
  const filePath = join(biasDir, biasId, 'index.ts');
  if (!existsSync(filePath)) {
    console.warn(`[bias-parser] Bias file not found: ${filePath}`);
    return null;
  }

  const source = readFileSync(filePath, 'utf-8');

  // Extract the metadata section to avoid cross-contamination with deeper fields
  const metadataRe = /metadata:\s*\{([\s\S]*?)\n\s*\}/;
  const metadataBlock = metadataRe.exec(source)?.[1] ?? '';

  // Extract the definition section
  const definitionRe = /definition:\s*\{([\s\S]*?)\n\s*\},?\s*\n\s*\/\//;
  const definitionBlock = definitionRe.exec(source)?.[1] ?? '';

  // Extract the psychologyBasis sub-section
  const psychRe = /psychologyBasis:\s*\{([\s\S]*?)\n\s*\},?\s*\n/;
  const psychBlock = psychRe.exec(source)?.[1] ?? '';

  // Extract detection section
  const detectionRe = /detection:\s*\{([\s\S]*?)\n\s*\},?\s*\n\s*\/\//;
  const detectionBlock = detectionRe.exec(source)?.[1] ?? source;

  // Extract guidelines section
  const guidelinesRe = /guidelines:\s*\{([\s\S]*?)\n\s*\},?\s*\n\s*\/\//;
  const guidelinesBlock = guidelinesRe.exec(source)?.[1] ?? source;

  // ── Build the entry ──

  const id = extractString(metadataBlock, 'id') || biasId;
  const name = extractString(metadataBlock, 'name') || kebabToTitle(biasId);
  const aliases = extractStringArray(metadataBlock, 'aliases');
  const category = extractCategory(metadataBlock);
  const relatedCategories = extractRelatedCategories(metadataBlock);
  const tags = extractStringArray(metadataBlock, 'tags');

  // Definition
  const simple = extractLongString(source, 'simple', 500);
  const detailed = extractLongString(source, 'detailed', 500);
  const discoveredBy =
    extractString(psychBlock, 'discoveredBy') ||
    extractString(source, 'discoveredBy');
  const year =
    extractNumber(psychBlock, 'year') ||
    extractNumber(source, 'year');

  // Design impact
  const designDescription = extractLongString(source, 'description', 300);

  // Counts from structured arrays
  const whenToUseCount = countArrayObjects(source, 'whenToUse');
  const commonMistakeCount = countArrayObjects(source, 'commonMistakes');

  // Detection
  const checklistQuestions = extractStringArray(detectionBlock, 'checklistQuestions', 5);
  const patternCount = countArrayObjects(source, 'patterns');

  // Guidelines
  const dos = extractStringArray(guidelinesBlock.length > 50 ? guidelinesBlock : source, 'dos', 5);
  const donts = extractStringArray(guidelinesBlock.length > 50 ? guidelinesBlock : source, 'donts', 5);

  // Relationships
  const relationships = extractRelationships(source);

  return {
    id,
    name,
    aliases,
    category,
    relatedCategories,
    tags,
    definition: {
      simple,
      detailed,
      discoveredBy,
      year,
    },
    designImpact: {
      description: designDescription,
      whenToUseCount,
      commonMistakeCount,
    },
    detection: {
      checklistQuestions,
      patternCount,
    },
    guidelines: {
      dos,
      donts,
    },
    relationships,
  };
}

// ─── Utility ───────────────────────────────────────────────────────────────

/** Convert kebab-case to Title Case */
function kebabToTitle(s: string): string {
  return s
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

// ─── Public API ────────────────────────────────────────────────────────────

/**
 * Parse all cognitive biases from the design-advisor source directory.
 *
 * @param designAdvisorDir - Path to `packages/design-advisor/src/biases/`
 * @returns Array of BiasEntry objects and the resolved path used.
 */
export function parseBiases(designAdvisorDir: string): {
  biases: BiasEntry[];
  biasesFullPath: string;
} {
  const fullPath = resolve(designAdvisorDir);
  const registryPath = join(fullPath, 'index.ts');

  // Step 1: Get all bias IDs from the registry
  let biasIds = extractBiasIdsFromRegistry(registryPath);

  // Fallback: if registry parsing fails, scan subdirectories
  if (biasIds.length === 0) {
    console.warn(
      '[bias-parser] Falling back to directory scan for bias IDs',
    );
    biasIds = readdirSync(fullPath).filter((entry) => {
      if (entry === 'core' || entry === 'utils.ts' || entry.startsWith('.')) {
        return false;
      }
      const entryPath = join(fullPath, entry);
      return statSync(entryPath).isDirectory();
    });
  }

  // Step 2: Parse each bias file
  const biases: BiasEntry[] = [];
  let skipped = 0;

  for (const id of biasIds) {
    const entry = parseSingleBias(fullPath, id);
    if (entry) {
      biases.push(entry);
    } else {
      skipped++;
    }
  }

  if (skipped > 0) {
    console.warn(
      `[bias-parser] Skipped ${skipped} biases (file not found or parse error)`,
    );
  }

  console.log(
    `[bias-parser] Parsed ${biases.length} biases from ${fullPath}`,
  );

  return {
    biases,
    biasesFullPath: fullPath,
  };
}
