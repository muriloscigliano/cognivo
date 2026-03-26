/**
 * LazyBiasRegistry - Loads bias cards on demand by category
 *
 * Unlike the eager BiasRegistry that loads all 180 biases at import time,
 * this registry uses dynamic import() to load categories only when needed.
 * Each category is loaded from its dedicated entry point in src/categories/
 * and cached for subsequent access.
 *
 * @module @cognivo/design-advisor/utils/lazy-bias-registry
 */

import type { BiasCard } from '../biases/core/types.js';
import { BiasCategory } from '../biases/core/types.js';

/**
 * Maps BiasCategory enum values to the category module file names
 * used in src/categories/.
 */
const CATEGORY_TO_MODULE: Record<BiasCategory, string> = {
  [BiasCategory.PERCEPTION]: 'perception',
  [BiasCategory.DECISION_MAKING]: 'decision-making',
  [BiasCategory.MEMORY]: 'memory',
  [BiasCategory.SOCIAL]: 'social',
  [BiasCategory.ATTRIBUTION]: 'attribution',
  [BiasCategory.EMOTIONAL]: 'emotional',
  [BiasCategory.COGNITIVE]: 'cognitive',
};

/**
 * All valid category keys derived from the BiasCategory enum.
 */
const ALL_CATEGORIES = Object.values(BiasCategory);

/**
 * Extract BiasCard objects from a dynamically imported category module.
 *
 * Category modules use named exports where each export is a BiasCard.
 * This function filters the module's exports to find all BiasCard-shaped
 * objects (those with a metadata.id property).
 */
function extractBiasCards(moduleExports: Record<string, unknown>): BiasCard[] {
  const cards: BiasCard[] = [];
  for (const key of Object.keys(moduleExports)) {
    const value = moduleExports[key];
    if (
      value !== null &&
      typeof value === 'object' &&
      'metadata' in value
    ) {
      const meta = (value as Record<string, unknown>).metadata;
      if (
        meta !== null &&
        meta !== undefined &&
        typeof meta === 'object' &&
        'id' in (meta as Record<string, unknown>)
      ) {
        cards.push(value as BiasCard);
      }
    }
  }
  return cards;
}

/**
 * LazyBiasRegistry - Loads bias cards on demand by category
 *
 * Usage:
 * ```ts
 * const registry = new LazyBiasRegistry();
 *
 * // Load just one category
 * const social = await registry.loadCategory(BiasCategory.SOCIAL);
 *
 * // Find a specific bias (loads all if needed)
 * const anchoring = await registry.getById('anchoring-bias');
 *
 * // Query with filters
 * const results = await registry.query({
 *   category: BiasCategory.COGNITIVE,
 *   tags: ['pricing'],
 * });
 *
 * // Check what's loaded without triggering loads
 * const status = registry.getLoadStatus();
 * ```
 */
export class LazyBiasRegistry {
  private loaded: Map<string, BiasCard[]> = new Map();
  private allLoaded = false;

  /**
   * Dynamically import a category module.
   * This method encapsulates the import() calls so they can be
   * individually resolved by the bundler.
   */
  private async importCategoryModule(
    category: BiasCategory
  ): Promise<Record<string, unknown>> {
    const moduleName = CATEGORY_TO_MODULE[category];
    if (moduleName === undefined) {
      throw new Error(`Unknown category: ${String(category)}`);
    }

    switch (category) {
      case BiasCategory.PERCEPTION:
        return import('../categories/perception.js') as Promise<Record<string, unknown>>;
      case BiasCategory.DECISION_MAKING:
        return import('../categories/decision-making.js') as Promise<Record<string, unknown>>;
      case BiasCategory.MEMORY:
        return import('../categories/memory.js') as Promise<Record<string, unknown>>;
      case BiasCategory.SOCIAL:
        return import('../categories/social.js') as Promise<Record<string, unknown>>;
      case BiasCategory.ATTRIBUTION:
        return import('../categories/attribution.js') as Promise<Record<string, unknown>>;
      case BiasCategory.EMOTIONAL:
        return import('../categories/emotional.js') as Promise<Record<string, unknown>>;
      case BiasCategory.COGNITIVE:
        return import('../categories/cognitive.js') as Promise<Record<string, unknown>>;
      default: {
        // Exhaustive check: if a new category is added, TypeScript will
        // flag this as unreachable only if all cases are covered.
        const _exhaustive: never = category;
        throw new Error(`Unhandled category: ${String(_exhaustive)}`);
      }
    }
  }

  /**
   * Load all biases from a specific category.
   *
   * Dynamically imports the category module, extracts all BiasCard exports,
   * caches them, and returns the array. Returns cached results on subsequent
   * calls for the same category.
   *
   * @param category - The BiasCategory to load
   * @returns Array of BiasCard objects in that category
   */
  async loadCategory(category: BiasCategory): Promise<BiasCard[]> {
    const key = category as string;

    // Return cached if already loaded
    const cached = this.loaded.get(key);
    if (cached !== undefined) {
      return cached;
    }

    try {
      const mod = await this.importCategoryModule(category);
      const cards = extractBiasCards(mod);
      this.loaded.set(key, cards);
      return cards;
    } catch (error) {
      // Return empty array for categories with no biases or on error
      const empty: BiasCard[] = [];
      this.loaded.set(key, empty);
      return empty;
    }
  }

  /**
   * Load all categories in parallel.
   *
   * Imports all category modules concurrently, caches each result,
   * and returns all bias cards as a flat array.
   *
   * @returns Array of all BiasCard objects across all categories
   */
  async loadAll(): Promise<BiasCard[]> {
    if (this.allLoaded) {
      return this.getAllLoadedBiases();
    }

    await Promise.all(
      ALL_CATEGORIES.map(category => this.loadCategory(category))
    );

    this.allLoaded = true;
    return this.getAllLoadedBiases();
  }

  /**
   * Get a bias by its unique ID.
   *
   * First searches through already-loaded categories. If not found and
   * not all categories are loaded, loads all categories and searches again.
   *
   * @param id - The bias ID (e.g., 'anchoring-bias')
   * @returns The matching BiasCard, or undefined if not found
   */
  async getById(id: string): Promise<BiasCard | undefined> {
    // Search loaded categories first
    for (const cards of this.loaded.values()) {
      const found = cards.find(card => card.metadata.id === id);
      if (found) {
        return found;
      }
    }

    // If not all loaded, load everything and search again
    if (!this.allLoaded) {
      const allCards = await this.loadAll();
      return allCards.find(card => card.metadata.id === id);
    }

    return undefined;
  }

  /**
   * Query biases with filters.
   *
   * Supports filtering by category (loads only that category),
   * tags (OR logic), and free-text search across name, aliases,
   * definition, and tags.
   *
   * @param filters - Query filters
   * @returns Array of matching BiasCard objects
   */
  async query(filters: {
    category?: BiasCategory;
    tags?: string[];
    search?: string;
  }): Promise<BiasCard[]> {
    let results: BiasCard[];

    // If category specified, only load that category
    if (filters.category !== undefined) {
      results = await this.loadCategory(filters.category);
    } else {
      results = await this.loadAll();
    }

    // Filter by tags (OR logic: bias must have at least one matching tag)
    if (filters.tags !== undefined && filters.tags.length > 0) {
      const filterTags = filters.tags;
      results = results.filter(bias =>
        filterTags.some(tag => bias.metadata.tags.includes(tag))
      );
    }

    // Filter by search text across name, aliases, definition, and tags
    if (filters.search !== undefined && filters.search.length > 0) {
      const term = filters.search.toLowerCase();
      results = results.filter(bias =>
        bias.metadata.name.toLowerCase().includes(term) ||
        bias.metadata.aliases.some(alias => alias.toLowerCase().includes(term)) ||
        bias.definition.simple.toLowerCase().includes(term) ||
        bias.metadata.tags.some(tag => tag.toLowerCase().includes(term))
      );
    }

    return results;
  }

  /**
   * Get count of loaded biases and which categories are loaded.
   *
   * This method does NOT trigger any dynamic imports -- it only
   * reports on what has already been loaded.
   *
   * @returns Object with loaded count and category names
   */
  getLoadStatus(): { loaded: number; categories: string[] } {
    let total = 0;
    const categories: string[] = [];

    for (const [category, cards] of this.loaded.entries()) {
      if (cards.length > 0) {
        categories.push(category);
      }
      total += cards.length;
    }

    return { loaded: total, categories };
  }

  /**
   * Clear all cached data to free memory.
   *
   * After clearing, subsequent calls to load/query methods will
   * trigger fresh dynamic imports.
   */
  clear(): void {
    this.loaded.clear();
    this.allLoaded = false;
  }

  /**
   * Gather all loaded BiasCard arrays into a single flat array.
   * Internal helper -- does not trigger any imports.
   */
  private getAllLoadedBiases(): BiasCard[] {
    const all: BiasCard[] = [];
    for (const cards of this.loaded.values()) {
      all.push(...cards);
    }
    return all;
  }
}
