/**
 * Atlas Registry — Central query engine for Atlas pattern cards.
 *
 * Mirrors the BiasRegistry pattern: singleton class with getAll(), getById(),
 * query(), and cross-reference lookups between patterns, components, and biases.
 *
 * @module @cognivo/design-advisor/atlas/atlas-registry
 */

import type {
  AtlasDimension,
  AtlasLayer,
  AtlasPatternCard,
  AtlasQuery,
  AtlasBridgeStats,
  ImplementationStatus,
} from './types.js';
import { ALL_ATLAS_PATTERNS } from './patterns.js';
import { COMPONENT_PATTERN_MAP } from './mappings/component-pattern-map.js';
import { BIAS_PATTERN_MAP } from './mappings/bias-pattern-map.js';

// ---------------------------------------------------------------------------
// Registry Class
// ---------------------------------------------------------------------------

export class AtlasRegistry {
  private patterns: Map<string, AtlasPatternCard>;

  constructor() {
    this.patterns = new Map(
      ALL_ATLAS_PATTERNS.map((p) => [p.id, p]),
    );
  }

  // -----------------------------------------------------------------------
  // Core accessors
  // -----------------------------------------------------------------------

  /** Get all pattern cards. */
  getAll(): AtlasPatternCard[] {
    return Array.from(this.patterns.values());
  }

  /** Get a single pattern by its upstream Atlas ID. */
  getById(id: string): AtlasPatternCard | undefined {
    return this.patterns.get(id);
  }

  /** Get all patterns in a given dimension. */
  getByDimension(dimension: AtlasDimension): AtlasPatternCard[] {
    return this.getAll().filter((p) => p.dimension === dimension);
  }

  /** Get all patterns in a given processing layer. */
  getByLayer(layer: AtlasLayer): AtlasPatternCard[] {
    return this.getAll().filter((p) => p.layer === layer);
  }

  /** Get all patterns with a given implementation status. */
  getByStatus(status: ImplementationStatus): AtlasPatternCard[] {
    return this.getAll().filter((p) => p.status === status);
  }

  // -----------------------------------------------------------------------
  // Querying
  // -----------------------------------------------------------------------

  /**
   * Query patterns with multiple combined filters.
   * All provided filters are ANDed together.
   */
  query(filters: AtlasQuery): AtlasPatternCard[] {
    let results = this.getAll();

    if (filters.dimensions?.length) {
      results = results.filter((p) =>
        filters.dimensions!.includes(p.dimension),
      );
    }

    if (filters.layers?.length) {
      results = results.filter((p) => filters.layers!.includes(p.layer));
    }

    if (filters.status?.length) {
      results = results.filter((p) => filters.status!.includes(p.status));
    }

    if (filters.searchTerm) {
      const term = filters.searchTerm.toLowerCase();
      results = results.filter(
        (p) =>
          p.name.toLowerCase().includes(term) ||
          p.id.toLowerCase().includes(term) ||
          p.elevatorPitch.toLowerCase().includes(term) ||
          p.uxNotes?.risk?.toLowerCase().includes(term) ||
          p.uxNotes?.tip?.toLowerCase().includes(term),
      );
    }

    if (filters.limit && filters.limit > 0) {
      results = results.slice(0, filters.limit);
    }

    return results;
  }

  // -----------------------------------------------------------------------
  // Cross-reference lookups
  // -----------------------------------------------------------------------

  /**
   * Get component tags that implement a given pattern.
   * Returns the tags from the component-pattern map.
   */
  getComponentsForPattern(patternId: string): string[] {
    const card = this.patterns.get(patternId);
    return card?.cognivoComponents ?? [];
  }

  /**
   * Get all Atlas patterns that a given component tag participates in.
   */
  getPatternsForComponent(tagName: string): AtlasPatternCard[] {
    const patternIds = COMPONENT_PATTERN_MAP[tagName];
    if (!patternIds) return [];
    return patternIds
      .map((id) => this.patterns.get(id))
      .filter((p): p is AtlasPatternCard => p !== undefined);
  }

  /**
   * Get bias IDs related to a given pattern.
   */
  getBiasesForPattern(patternId: string): string[] {
    return BIAS_PATTERN_MAP[patternId] ?? [];
  }

  /**
   * Get all patterns related to a given bias ID.
   */
  getPatternsForBias(biasId: string): AtlasPatternCard[] {
    const patternIds: string[] = [];
    for (const [pid, biases] of Object.entries(BIAS_PATTERN_MAP)) {
      if (biases.includes(biasId)) {
        patternIds.push(pid);
      }
    }
    return patternIds
      .map((id) => this.patterns.get(id))
      .filter((p): p is AtlasPatternCard => p !== undefined);
  }

  /**
   * Get all components that are affected by a given bias, via Atlas patterns.
   */
  getComponentsAffectedByBias(biasId: string): string[] {
    const patterns = this.getPatternsForBias(biasId);
    const componentSet = new Set<string>();
    for (const p of patterns) {
      for (const c of p.cognivoComponents) {
        componentSet.add(c);
      }
    }
    return Array.from(componentSet).sort();
  }

  // -----------------------------------------------------------------------
  // Statistics
  // -----------------------------------------------------------------------

  /** Get summary statistics about the Atlas bridge. */
  getStats(): AtlasBridgeStats {
    const all = this.getAll();
    const dimensions: AtlasDimension[] = [
      'ai_tasks',
      'human_tasks',
      'system_tasks',
      'data_artifacts',
      'constraints',
      'touchpoints',
    ];
    const layers: AtlasLayer[] = [
      'inbound',
      'internal',
      'outbound',
      'interactive',
    ];
    const statuses: ImplementationStatus[] = [
      'implemented',
      'partial',
      'planned',
      'not-applicable',
    ];

    const byDimension = {} as Record<AtlasDimension, number>;
    for (const d of dimensions) {
      byDimension[d] = all.filter((p) => p.dimension === d).length;
    }

    const byLayer = {} as Record<AtlasLayer, number>;
    for (const l of layers) {
      byLayer[l] = all.filter((p) => p.layer === l).length;
    }

    const byStatus = {} as Record<ImplementationStatus, number>;
    for (const s of statuses) {
      byStatus[s] = all.filter((p) => p.status === s).length;
    }

    let totalComponentMappings = 0;
    let totalBiasMappings = 0;
    for (const p of all) {
      totalComponentMappings += p.cognivoComponents.length;
      totalBiasMappings += p.relatedBiases.length;
    }

    return {
      totalPatterns: all.length,
      byDimension,
      byLayer,
      byStatus,
      totalComponentMappings,
      totalBiasMappings,
    };
  }
}

// ---------------------------------------------------------------------------
// Singleton + convenience exports
// ---------------------------------------------------------------------------

/** Singleton AtlasRegistry instance. */
export const atlasRegistry = new AtlasRegistry();

/** Get all Atlas pattern cards. */
export const getAllPatterns = () => atlasRegistry.getAll();

/** Query patterns with filters. */
export const queryPatterns = (filters: AtlasQuery) =>
  atlasRegistry.query(filters);

/** Get patterns for a Cognivo component tag. */
export const getPatternsForComponent = (tagName: string) =>
  atlasRegistry.getPatternsForComponent(tagName);

/** Get components for an Atlas pattern ID. */
export const getComponentsForPattern = (patternId: string) =>
  atlasRegistry.getComponentsForPattern(patternId);

/** Get bias IDs for an Atlas pattern ID. */
export const getBiasesForPattern = (patternId: string) =>
  atlasRegistry.getBiasesForPattern(patternId);

/** Get Atlas bridge statistics. */
export const getAtlasBridgeStats = () => atlasRegistry.getStats();
