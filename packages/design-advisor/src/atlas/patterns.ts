/**
 * Atlas Pattern Data — All 69 Atlas task/pattern cards enriched with Cognivo metadata.
 *
 * This module pulls live data from @quietloudlab/ai-interaction-atlas and
 * enriches each pattern with Cognivo component mappings, bias cross-references,
 * and implementation status.
 *
 * Pattern data is derived at module load from the upstream Atlas package,
 * ensuring we stay in sync with upstream taxonomy changes.
 *
 * @module @cognivo/design-advisor/atlas/patterns
 */

import {
  AI_TASKS,
  HUMAN_TASKS,
  SYSTEM_TASKS,
} from '@quietloudlab/ai-interaction-atlas';

import type { AtlasDimension, AtlasLayer, AtlasPatternCard } from './types.js';
import { COMPONENT_PATTERN_MAP } from './mappings/component-pattern-map.js';
import { BIAS_PATTERN_MAP } from './mappings/bias-pattern-map.js';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Convert an upstream layer_id like "layer_inbound" to our AtlasLayer type. */
function toLayer(layerId: string): AtlasLayer {
  const map: Record<string, AtlasLayer> = {
    layer_inbound: 'inbound',
    layer_internal: 'internal',
    layer_outbound: 'outbound',
    layer_interactive: 'interactive',
  };
  return map[layerId] ?? 'internal';
}

/** Reverse-lookup: which component tags map to a given pattern ID. */
function componentsForPattern(patternId: string): string[] {
  const result: string[] = [];
  for (const [tag, patternIds] of Object.entries(COMPONENT_PATTERN_MAP)) {
    if (patternIds.includes(patternId)) {
      result.push(tag);
    }
  }
  return result.sort();
}

/** Lookup: which bias IDs are related to a given pattern ID. */
function biasesForPattern(patternId: string): string[] {
  return BIAS_PATTERN_MAP[patternId] ?? [];
}

/** Determine implementation status based on component coverage. */
function inferStatus(components: string[]): AtlasPatternCard['status'] {
  if (components.length >= 2) return 'implemented';
  if (components.length === 1) return 'partial';
  return 'planned';
}

// ---------------------------------------------------------------------------
// Build pattern cards from upstream data
// ---------------------------------------------------------------------------

function buildAiPatterns(): AtlasPatternCard[] {
  return AI_TASKS.map((task) => {
    const components = componentsForPattern(task.id);
    return {
      id: task.id,
      name: task.name,
      dimension: 'ai_tasks' as AtlasDimension,
      layer: toLayer(task.layer_id),
      elevatorPitch: task.elevator_pitch,
      uxNotes: task.ux_notes
        ? {
            risk: task.ux_notes.risk || undefined,
            tip: task.ux_notes.tip || undefined,
            antiPatterns:
              task.ux_notes.anti_patterns?.length
                ? task.ux_notes.anti_patterns
                : undefined,
          }
        : undefined,
      implementationNotes: task.implementation_notes
        ? {
            maturity: task.implementation_notes.maturity || undefined,
            humanOversight:
              task.implementation_notes.human_oversight || undefined,
          }
        : undefined,
      cognivoComponents: components,
      relatedBiases: biasesForPattern(task.id),
      status: inferStatus(components),
    };
  });
}

function buildHumanPatterns(): AtlasPatternCard[] {
  return HUMAN_TASKS.map((task) => {
    const components = componentsForPattern(task.id);
    return {
      id: task.id,
      name: task.name,
      dimension: 'human_tasks' as AtlasDimension,
      layer: toLayer(task.layer_id),
      elevatorPitch: task.elevator_pitch,
      cognivoComponents: components,
      relatedBiases: biasesForPattern(task.id),
      status: inferStatus(components),
    };
  });
}

function buildSystemPatterns(): AtlasPatternCard[] {
  return SYSTEM_TASKS.map((task) => {
    const components = componentsForPattern(task.id);
    return {
      id: task.id,
      name: task.name,
      dimension: 'system_tasks' as AtlasDimension,
      layer: toLayer(task.layer_id),
      elevatorPitch: task.elevator_pitch,
      cognivoComponents: components,
      relatedBiases: biasesForPattern(task.id),
      status: inferStatus(components),
    };
  });
}

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

/** All Atlas pattern cards, enriched with Cognivo metadata. */
export const ALL_ATLAS_PATTERNS: AtlasPatternCard[] = [
  ...buildAiPatterns(),
  ...buildHumanPatterns(),
  ...buildSystemPatterns(),
];

/** AI task patterns only. */
export const AI_PATTERN_CARDS: AtlasPatternCard[] = buildAiPatterns();

/** Human task patterns only. */
export const HUMAN_PATTERN_CARDS: AtlasPatternCard[] = buildHumanPatterns();

/** System task patterns only. */
export const SYSTEM_PATTERN_CARDS: AtlasPatternCard[] = buildSystemPatterns();
