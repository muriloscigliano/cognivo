/**
 * Bias Registry - Central management system for cognitive bias cards
 *
 * This module provides advanced querying, filtering, and analysis capabilities
 * for the cognitive bias library.
 *
 * @module @cognivo/design-advisor/utils/bias-registry
 */

import type { BiasCard } from '../biases/core/types.js';
import { BiasCategory, ImpactLevel } from '../biases/core/types.js';
import { allBiases, biasRegistry } from '../biases/index.js';

// ============================================================================
// TYPES
// ============================================================================

export interface BiasQuery {
  categories?: BiasCategory[];
  tags?: string[];
  impactLevel?: ImpactLevel[];
  searchTerm?: string;
  limit?: number;
}

export interface BiasAnalysisContext {
  designType?: 'web' | 'mobile' | 'desktop' | 'other';
  industry?: string;
  userGoals?: string[];
  constraints?: string[];
}

export interface BiasRecommendation {
  bias: BiasCard;
  relevanceScore: number;
  reasoning: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
}

// ============================================================================
// CORE REGISTRY CLASS
// ============================================================================

export class BiasRegistry {
  private biases: Map<string, BiasCard>;

  constructor() {
    this.biases = new Map(Object.entries(biasRegistry));
  }

  /**
   * Get all bias cards
   */
  getAll(): BiasCard[] {
    return Array.from(this.biases.values());
  }

  /**
   * Get a bias by ID
   */
  getById(id: string): BiasCard | undefined {
    return this.biases.get(id);
  }

  /**
   * Get biases by category
   */
  getByCategory(category: BiasCategory): BiasCard[] {
    return this.getAll().filter(bias =>
      bias.metadata.category === category ||
      bias.metadata.relatedCategories.includes(category)
    );
  }

  /**
   * Get biases by tag
   */
  getByTag(tag: string): BiasCard[] {
    return this.getAll().filter(bias =>
      bias.metadata.tags.includes(tag)
    );
  }

  /**
   * Advanced query with multiple filters
   */
  query(filters: BiasQuery): BiasCard[] {
    let results = this.getAll();

    // Filter by categories
    if (filters.categories && filters.categories.length > 0) {
      results = results.filter(bias =>
        filters.categories!.includes(bias.metadata.category) ||
        filters.categories!.some(cat => bias.metadata.relatedCategories.includes(cat))
      );
    }

    // Filter by tags
    if (filters.tags && filters.tags.length > 0) {
      results = results.filter(bias =>
        filters.tags!.some(tag => bias.metadata.tags.includes(tag))
      );
    }

    // Filter by impact level
    if (filters.impactLevel && filters.impactLevel.length > 0) {
      results = results.filter(bias => {
        const levels = Object.values(bias.designImpact.impactAreas)
          .map(area => area.level);
        return filters.impactLevel!.some(level => levels.includes(level));
      });
    }

    // Search term
    if (filters.searchTerm) {
      const term = filters.searchTerm.toLowerCase();
      results = results.filter(bias =>
        bias.metadata.name.toLowerCase().includes(term) ||
        bias.metadata.aliases.some(alias => alias.toLowerCase().includes(term)) ||
        bias.definition.simple.toLowerCase().includes(term) ||
        bias.metadata.tags.some(tag => tag.toLowerCase().includes(term))
      );
    }

    // Limit results
    if (filters.limit) {
      results = results.slice(0, filters.limit);
    }

    return results;
  }

  /**
   * Get biases related to a specific bias
   */
  getRelated(biasId: string): BiasCard[] {
    const bias = this.getById(biasId);
    if (!bias) return [];

    const relatedIds = new Set<string>();

    // Add complementary biases
    bias.relationships.complements.forEach(id => relatedIds.add(id));

    // Add conflicting biases
    bias.relationships.conflicts.forEach(id => relatedIds.add(id));

    // Add often confused with
    bias.relationships.confusedWith.forEach(id => relatedIds.add(id));

    return Array.from(relatedIds)
      .map(id => this.getById(id))
      .filter((b): b is BiasCard => b !== undefined);
  }

  /**
   * Get biases that complement a given bias
   */
  getComplementary(biasId: string): BiasCard[] {
    const bias = this.getById(biasId);
    if (!bias) return [];

    return bias.relationships.complements
      .map(id => this.getById(id))
      .filter((b): b is BiasCard => b !== undefined);
  }

  /**
   * Get biases that conflict with a given bias
   */
  getConflicting(biasId: string): BiasCard[] {
    const bias = this.getById(biasId);
    if (!bias) return [];

    return bias.relationships.conflicts
      .map(id => this.getById(id))
      .filter((b): b is BiasCard => b !== undefined);
  }

  /**
   * Recommend biases based on context
   */
  recommend(context: BiasAnalysisContext): BiasRecommendation[] {
    const recommendations: BiasRecommendation[] = [];
    const biases = this.getAll();

    for (const bias of biases) {
      let relevanceScore = 0;
      const reasons: string[] = [];

      // Score based on use cases matching context
      if (context.designType) {
        const matchingUseCases = bias.designImpact.whenToUse.filter(
          uc => uc.scenario.toLowerCase().includes(context.designType!)
        );
        if (matchingUseCases.length > 0) {
          relevanceScore += matchingUseCases.length * 10;
          reasons.push(`Relevant for ${context.designType} design`);
        }
      }

      // Score based on impact level
      const impactLevels = Object.values(bias.designImpact.impactAreas)
        .map(area => area.level);
      const hasCritical = impactLevels.includes(ImpactLevel.CRITICAL);
      const hasHigh = impactLevels.includes(ImpactLevel.HIGH);

      if (hasCritical) {
        relevanceScore += 20;
        reasons.push('Critical design impact');
      } else if (hasHigh) {
        relevanceScore += 10;
        reasons.push('High design impact');
      }

      // Score based on user goals
      if (context.userGoals) {
        const matchingGoals = context.userGoals.filter(goal =>
          bias.designImpact.description.toLowerCase().includes(goal.toLowerCase()) ||
          bias.designImpact.whenToUse.some(uc =>
            uc.scenario.toLowerCase().includes(goal.toLowerCase())
          )
        );
        relevanceScore += matchingGoals.length * 5;
        if (matchingGoals.length > 0) {
          reasons.push(`Supports goals: ${matchingGoals.join(', ')}`);
        }
      }

      // Only include if relevance score > 0
      if (relevanceScore > 0) {
        const priority =
          relevanceScore >= 30 ? 'critical' :
          relevanceScore >= 20 ? 'high' :
          relevanceScore >= 10 ? 'medium' :
          'low';

        recommendations.push({
          bias,
          relevanceScore,
          reasoning: reasons.join('. '),
          priority,
        });
      }
    }

    // Sort by relevance score
    return recommendations.sort((a, b) => b.relevanceScore - a.relevanceScore);
  }

  /**
   * Get statistics about the bias library
   */
  getStatistics() {
    const biases = this.getAll();
    const total = biases.length;

    // Count by category
    const byCategory: Record<BiasCategory, number> = {
      [BiasCategory.PERCEPTION]: 0,
      [BiasCategory.DECISION_MAKING]: 0,
      [BiasCategory.MEMORY]: 0,
      [BiasCategory.SOCIAL]: 0,
      [BiasCategory.ATTRIBUTION]: 0,
      [BiasCategory.EMOTIONAL]: 0,
      [BiasCategory.COGNITIVE]: 0,
    };

    biases.forEach(bias => {
      byCategory[bias.metadata.category]++;
    });

    // Count by impact level
    const byImpact: Record<ImpactLevel, number> = {
      [ImpactLevel.CRITICAL]: 0,
      [ImpactLevel.HIGH]: 0,
      [ImpactLevel.MEDIUM]: 0,
      [ImpactLevel.LOW]: 0,
    };

    biases.forEach(bias => {
      Object.values(bias.designImpact.impactAreas).forEach(area => {
        byImpact[area.level]++;
      });
    });

    // Collect all tags
    const allTags = new Set<string>();
    biases.forEach(bias => {
      bias.metadata.tags.forEach(tag => allTags.add(tag));
    });

    return {
      total,
      byCategory,
      byImpact,
      totalTags: allTags.size,
      tags: Array.from(allTags).sort(),
      phase1Complete: 5,
      totalPlanned: 180,
      percentComplete: ((5 / 180) * 100).toFixed(1) + '%',
    };
  }

  /**
   * Export all biases as JSON
   */
  exportJSON(): string {
    return JSON.stringify(this.getAll(), null, 2);
  }

  /**
   * Export bias IDs and names for quick reference
   */
  exportIndex(): Array<{ id: string; name: string; category: BiasCategory }> {
    return this.getAll().map(bias => ({
      id: bias.metadata.id,
      name: bias.metadata.name,
      category: bias.metadata.category,
    }));
  }
}

// ============================================================================
// SINGLETON INSTANCE
// ============================================================================

/**
 * Global bias registry instance
 */
export const registry = new BiasRegistry();

// ============================================================================
// CONVENIENCE FUNCTIONS
// ============================================================================

/**
 * Get all biases
 */
export function getAllBiases(): BiasCard[] {
  return registry.getAll();
}

/**
 * Get a bias by ID
 */
export function getBiasById(id: string): BiasCard | undefined {
  return registry.getById(id);
}

/**
 * Query biases
 */
export function queryBiases(filters: BiasQuery): BiasCard[] {
  return registry.query(filters);
}

/**
 * Get bias recommendations for a context
 */
export function recommendBiases(context: BiasAnalysisContext): BiasRecommendation[] {
  return registry.recommend(context);
}

/**
 * Get library statistics
 */
export function getStatistics() {
  return registry.getStatistics();
}
