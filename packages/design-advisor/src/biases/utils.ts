/**
 * Utility functions for working with the cognitive bias library
 *
 * @module @cognivo/design-advisor/biases/utils
 */

import type { BiasCard } from './core/types.js';
import { BiasCategory } from './core/types.js';
import { allBiases, getBiasById, getBiasesByCategory, getBiasesByTag, searchBiases } from './index.js';

/**
 * Filter biases by multiple categories
 */
export function getBiasesByCategories(categories: BiasCategory[]): BiasCard[] {
  return allBiases.filter(bias =>
    categories.includes(bias.metadata.category) ||
    bias.metadata.relatedCategories.some(cat => categories.includes(cat))
  );
}

/**
 * Get biases by multiple tags (OR logic)
 */
export function getBiasesByTags(tags: string[]): BiasCard[] {
  return allBiases.filter(bias =>
    bias.metadata.tags.some(tag => tags.includes(tag))
  );
}

/**
 * Get biases that match ALL provided tags (AND logic)
 */
export function getBiasesByAllTags(tags: string[]): BiasCard[] {
  return allBiases.filter(bias =>
    tags.every(tag => bias.metadata.tags.includes(tag))
  );
}

/**
 * Find biases related to a given bias
 */
export function getRelatedBiases(biasId: string): BiasCard[] {
  const bias = getBiasById(biasId);
  if (!bias) return [];

  const relatedIds = [
    ...bias.relationships.complements,
    ...bias.relationships.conflicts,
    ...bias.relationships.confusedWith,
  ];

  return relatedIds
    .map((id: string) => getBiasById(id))
    .filter((b): b is BiasCard => b !== undefined);
}

/**
 * Get biases that complement a given bias
 */
export function getComplementaryBiases(biasId: string): BiasCard[] {
  const bias = getBiasById(biasId);
  if (!bias) return [];

  return bias.relationships.complements
    .map(id => getBiasById(id))
    .filter((b): b is BiasCard => b !== undefined);
}

/**
 * Get biases that conflict with a given bias
 */
export function getConflictingBiases(biasId: string): BiasCard[] {
  const bias = getBiasById(biasId);
  if (!bias) return [];

  return bias.relationships.conflicts
    .map((id: string) => getBiasById(id))
    .filter((b): b is BiasCard => b !== undefined);
}

/**
 * Get biases that are often confused with a given bias
 */
export function getConfusedWithBiases(biasId: string): BiasCard[] {
  const bias = getBiasById(biasId);
  if (!bias) return [];

  return bias.relationships.confusedWith
    .map((id: string) => getBiasById(id))
    .filter((b): b is BiasCard => b !== undefined);
}

/**
 * Search biases by keyword in name, description, or tags
 */
export function searchBiasesByKeyword(keyword: string): BiasCard[] {
  const lowerKeyword = keyword.toLowerCase();
  return allBiases.filter(bias =>
    bias.metadata.name.toLowerCase().includes(lowerKeyword) ||
    bias.metadata.aliases.some(alias => alias.toLowerCase().includes(lowerKeyword)) ||
    bias.definition.simple.toLowerCase().includes(lowerKeyword) ||
    bias.definition.detailed.toLowerCase().includes(lowerKeyword) ||
    bias.metadata.tags.some(tag => tag.toLowerCase().includes(lowerKeyword))
  );
}

/**
 * Get biases relevant for a specific use case
 */
export function getBiasesForUseCase(useCaseKeyword: string): BiasCard[] {
  const lowerKeyword = useCaseKeyword.toLowerCase();
  return allBiases.filter(bias =>
    bias.designImpact.whenToUse.some(useCase =>
      useCase.title.toLowerCase().includes(lowerKeyword) ||
      useCase.scenario.toLowerCase().includes(lowerKeyword)
    )
  );
}

/**
 * Get biases that should be avoided in a specific scenario
 */
export function getBiasesToAvoid(scenarioKeyword: string): BiasCard[] {
  const lowerKeyword = scenarioKeyword.toLowerCase();
  return allBiases.filter(bias =>
    bias.designImpact.whenToAvoid.some(avoidCase =>
      avoidCase.title.toLowerCase().includes(lowerKeyword) ||
      avoidCase.reason.toLowerCase().includes(lowerKeyword) ||
      avoidCase.consequence.toLowerCase().includes(lowerKeyword)
    )
  );
}

/**
 * Get random biases (useful for learning/exploration)
 */
export function getRandomBiases(count: number = 5): BiasCard[] {
  const shuffled = [...allBiases].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

/**
 * Get biases discovered by a specific researcher
 */
export function getBiasesByResearcher(researcher: string): BiasCard[] {
  return allBiases.filter(bias =>
    bias.definition.psychologyBasis.discoveredBy.toLowerCase().includes(researcher.toLowerCase())
  );
}

/**
 * Get biases discovered in a specific decade
 */
export function getBiasesByDecade(decade: number): BiasCard[] {
  const startYear = Math.floor(decade / 10) * 10;
  const endYear = startYear + 9;

  return allBiases.filter(bias =>
    bias.definition.psychologyBasis.year >= startYear &&
    bias.definition.psychologyBasis.year <= endYear
  );
}

/**
 * Group biases by category
 */
export function groupBiasesByCategory(): Record<BiasCategory, BiasCard[]> {
  const grouped: Partial<Record<BiasCategory, BiasCard[]>> = {};

  for (const category of Object.values(BiasCategory)) {
    grouped[category] = getBiasesByCategory(category);
  }

  return grouped as Record<BiasCategory, BiasCard[]>;
}

/**
 * Get bias statistics and metadata
 */
export function getBiasLibraryStats() {
  const byCategory: Record<string, number> = {};
  const byDecade: Record<number, number> = {};
  const allTags = new Set<string>();

  allBiases.forEach(bias => {
    // Count by category
    const cat = bias.metadata.category;
    byCategory[cat] = (byCategory[cat] || 0) + 1;

    // Count by decade
    const year = bias.definition.psychologyBasis.year;
    const decade = Math.floor(year / 10) * 10;
    byDecade[decade] = (byDecade[decade] || 0) + 1;

    // Collect all tags
    bias.metadata.tags.forEach(tag => allTags.add(tag));
  });

  return {
    total: allBiases.length,
    byCategory,
    byDecade,
    uniqueTags: Array.from(allTags).sort(),
    tagCount: allTags.size,
    averageTagsPerBias: (Array.from(allTags).length / allBiases.length).toFixed(2),
  };
}

/**
 * Check if two biases are related
 */
export function areBiasesRelated(biasId1: string, biasId2: string): boolean {
  const bias1 = getBiasById(biasId1);
  if (!bias1) return false;

  const allRelated = [
    ...bias1.relationships.complements,
    ...bias1.relationships.conflicts,
    ...bias1.relationships.confusedWith,
  ];

  return allRelated.includes(biasId2);
}

/**
 * Get the relationship type between two biases
 */
export function getRelationshipType(
  biasId1: string,
  biasId2: string
): 'complements' | 'conflicts' | 'confusedWith' | 'none' {
  const bias1 = getBiasById(biasId1);
  if (!bias1) return 'none';

  if (bias1.relationships.complements.includes(biasId2)) return 'complements';
  if (bias1.relationships.conflicts.includes(biasId2)) return 'conflicts';
  if (bias1.relationships.confusedWith.includes(biasId2)) return 'confusedWith';

  return 'none';
}

/**
 * Create a learning path through related biases
 */
export function createLearningPath(startBiasId: string, maxDepth: number = 3): BiasCard[] {
  const visited = new Set<string>();
  const path: BiasCard[] = [];

  function traverse(biasId: string, depth: number) {
    if (depth > maxDepth || visited.has(biasId)) return;

    const bias = getBiasById(biasId);
    if (!bias) return;

    visited.add(biasId);
    path.push(bias);

    // Follow complementary biases first (most related)
    for (const relatedId of bias.relationships.complements) {
      if (!visited.has(relatedId)) {
        traverse(relatedId, depth + 1);
      }
    }
  }

  traverse(startBiasId, 0);
  return path;
}

/**
 * Get biases suitable for a specific design context
 */
export function getBiasesForContext(context: {
  categories?: BiasCategory[];
  tags?: string[];
  keywords?: string[];
  avoidKeywords?: string[];
}): BiasCard[] {
  let results = allBiases;

  // Filter by categories
  if (context.categories && context.categories.length > 0) {
    results = results.filter(bias =>
      context.categories!.includes(bias.metadata.category) ||
      bias.metadata.relatedCategories.some(cat => context.categories!.includes(cat))
    );
  }

  // Filter by tags
  if (context.tags && context.tags.length > 0) {
    results = results.filter(bias =>
      bias.metadata.tags.some(tag => context.tags!.includes(tag))
    );
  }

  // Filter by keywords
  if (context.keywords && context.keywords.length > 0) {
    results = results.filter(bias =>
      context.keywords!.some(keyword => {
        const lowerKeyword = keyword.toLowerCase();
        return (
          bias.metadata.name.toLowerCase().includes(lowerKeyword) ||
          bias.definition.simple.toLowerCase().includes(lowerKeyword) ||
          bias.definition.detailed.toLowerCase().includes(lowerKeyword)
        );
      })
    );
  }

  // Exclude by keywords
  if (context.avoidKeywords && context.avoidKeywords.length > 0) {
    results = results.filter(bias =>
      !context.avoidKeywords!.some(keyword => {
        const lowerKeyword = keyword.toLowerCase();
        return (
          bias.metadata.name.toLowerCase().includes(lowerKeyword) ||
          bias.definition.simple.toLowerCase().includes(lowerKeyword)
        );
      })
    );
  }

  return results;
}

/**
 * Export individual utility functions
 */
export {
  getBiasById,
  getBiasesByCategory,
  getBiasesByTag,
  searchBiases,
};
