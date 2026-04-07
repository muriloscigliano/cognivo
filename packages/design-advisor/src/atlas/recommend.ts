/**
 * Component Recommendation Engine
 *
 * Given a context of current components and/or target Atlas patterns,
 * recommends additional Cognivo components to improve coverage.
 *
 * @module @cognivo/design-advisor/atlas/recommend
 */

import type { AtlasPatternCard } from './types.js';
import { atlasRegistry } from './atlas-registry.js';
import { COMPONENT_PATTERN_MAP } from './mappings/component-pattern-map.js';

// ---------------------------------------------------------------------------
// Public interfaces
// ---------------------------------------------------------------------------

export interface ComponentRecommendation {
  /** Cognivo component tag name (e.g. "ai-guardrail"). */
  tag: string;
  /** Human-readable reason for the recommendation. */
  reason: string;
  /** Atlas pattern IDs this component would cover. */
  patterns: string[];
  /** Priority based on how many uncovered patterns this would address. */
  priority: 'critical' | 'high' | 'medium' | 'low';
}

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

/**
 * Build a reverse map: patternId -> component tags that implement it.
 */
function buildPatternToComponentMap(): Record<string, string[]> {
  const map: Record<string, string[]> = {};
  for (const [tag, patternIds] of Object.entries(COMPONENT_PATTERN_MAP)) {
    for (const pid of patternIds) {
      if (!map[pid]) map[pid] = [];
      map[pid].push(tag);
    }
  }
  return map;
}

function scorePriority(newPatternCount: number, totalUncovered: number): ComponentRecommendation['priority'] {
  const ratio = totalUncovered > 0 ? newPatternCount / totalUncovered : 0;
  if (newPatternCount >= 4 || ratio >= 0.15) return 'critical';
  if (newPatternCount >= 3 || ratio >= 0.10) return 'high';
  if (newPatternCount >= 2 || ratio >= 0.05) return 'medium';
  return 'low';
}

// ---------------------------------------------------------------------------
// Main recommendation function
// ---------------------------------------------------------------------------

/**
 * Recommend components based on current usage and/or target patterns.
 *
 * Strategies:
 * - If `currentComponents` is provided, find patterns not yet covered and
 *   recommend components that would cover the most uncovered ground.
 * - If `targetPatterns` is provided, find components that implement those
 *   specific patterns.
 * - If both are provided, focus on target patterns not yet covered.
 */
export function recommendComponents(context: {
  currentComponents?: string[];
  targetPatterns?: string[];
}): ComponentRecommendation[] {
  const { currentComponents = [], targetPatterns } = context;
  const currentSet = new Set(currentComponents);

  // Determine which patterns are already covered
  const coveredPatternIds = new Set<string>();
  for (const tag of currentComponents) {
    const pids = COMPONENT_PATTERN_MAP[tag];
    if (pids) {
      for (const pid of pids) {
        coveredPatternIds.add(pid);
      }
    }
  }

  // Determine which patterns we want to cover
  let targetPatternIds: Set<string>;

  if (targetPatterns && targetPatterns.length > 0) {
    // Only care about the specified target patterns that aren't already covered
    targetPatternIds = new Set(
      targetPatterns.filter(pid => !coveredPatternIds.has(pid)),
    );
  } else {
    // Target all actionable patterns that aren't covered
    const allPatterns = atlasRegistry.getAll();
    targetPatternIds = new Set(
      allPatterns
        .filter(p => !coveredPatternIds.has(p.id) && p.status !== 'not-applicable')
        .map(p => p.id),
    );
  }

  if (targetPatternIds.size === 0) {
    return []; // Everything is already covered
  }

  const patternToComponents = buildPatternToComponentMap();

  // Score each candidate component by how many target patterns it covers
  const candidateScores: Record<string, Set<string>> = {};

  for (const pid of targetPatternIds) {
    const implementingTags = patternToComponents[pid] ?? [];
    for (const tag of implementingTags) {
      if (currentSet.has(tag)) continue; // Already in the workflow
      if (!candidateScores[tag]) candidateScores[tag] = new Set();
      candidateScores[tag].add(pid);
    }
  }

  // Build recommendations sorted by coverage count (descending)
  const recommendations: ComponentRecommendation[] = Object.entries(candidateScores)
    .map(([tag, patternSet]) => {
      const patterns = Array.from(patternSet);
      const patternCards = patterns
        .map(pid => atlasRegistry.getById(pid))
        .filter((p): p is AtlasPatternCard => p !== undefined);

      const patternNames = patternCards.slice(0, 3).map(p => p.name).join(', ');
      const extra = patterns.length > 3 ? ` and ${patterns.length - 3} more` : '';

      return {
        tag,
        reason: `Covers ${patterns.length} uncovered pattern${patterns.length > 1 ? 's' : ''}: ${patternNames}${extra}.`,
        patterns,
        priority: scorePriority(patterns.length, targetPatternIds.size),
      };
    })
    .sort((a, b) => {
      const order: Record<string, number> = { critical: 0, high: 1, medium: 2, low: 3 };
      const pDiff = (order[a.priority] ?? 4) - (order[b.priority] ?? 4);
      if (pDiff !== 0) return pDiff;
      return b.patterns.length - a.patterns.length;
    });

  return recommendations;
}
