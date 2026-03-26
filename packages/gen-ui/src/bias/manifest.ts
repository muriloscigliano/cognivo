/**
 * Component Manifest — Machine-readable psychology metadata per component.
 *
 * Each component in the library gets a manifest entry documenting:
 * - Which cognitive biases it engages (from biasHints)
 * - What semantic tags it carries (inferred from name + description)
 * - Which design token categories it requires
 *
 * This is what makes Cognivo different: components carry psychological metadata.
 * No other component library does this.
 *
 * Usage:
 *   const manifests = getManifest(cognivoLibrary);
 *   // → [{ name: "MetricCard", tagName: "cg-metric-card", engagedBiasIds: ["anchoring-bias", "framing-effect"], ... }]
 */

import type { Library, ComponentDefinition } from '../registry.js';

/**
 * Manifest entry for a single component.
 */
export interface ComponentManifest {
  /** Component name (PascalCase). */
  name: string;
  /** Web Component tag name. */
  tagName: string;
  /** Semantic tags for categorization (auto-inferred + from description). */
  tags: string[];
  /** Cognitive bias IDs this component engages. From biasHints on defineComponent(). */
  engagedBiasIds: string[];
  /** Brief description of what the component does. */
  description: string;
  /** Component group name in the library. */
  group: string;
}

/**
 * Infer semantic tags from a component's name and description.
 */
function inferTags(name: string, description: string): string[] {
  const tags: string[] = [];
  const lower = (name + ' ' + description).toLowerCase();

  // Category tags
  if (lower.includes('chart') || lower.includes('graph') || lower.includes('pie') || lower.includes('bar')) tags.push('data-visualization');
  if (lower.includes('form') || lower.includes('input') || lower.includes('select') || lower.includes('checkbox') || lower.includes('radio')) tags.push('form');
  if (lower.includes('metric') || lower.includes('kpi') || lower.includes('stat')) tags.push('metrics', 'dashboard');
  if (lower.includes('price') || lower.includes('pricing')) tags.push('pricing', 'conversion');
  if (lower.includes('card') || lower.includes('container') || lower.includes('layout')) tags.push('layout');
  if (lower.includes('button') || lower.includes('action') || lower.includes('click')) tags.push('interactive', 'cta');
  if (lower.includes('badge') || lower.includes('status') || lower.includes('indicator')) tags.push('feedback');
  if (lower.includes('table') || lower.includes('data')) tags.push('data-display');
  if (lower.includes('nav') || lower.includes('tab') || lower.includes('step') || lower.includes('breadcrumb')) tags.push('navigation');
  if (lower.includes('modal') || lower.includes('dialog') || lower.includes('popover') || lower.includes('tooltip')) tags.push('overlay');
  if (lower.includes('ai') || lower.includes('insight') || lower.includes('confidence') || lower.includes('thinking')) tags.push('ai', 'trust');
  if (lower.includes('image') || lower.includes('gallery') || lower.includes('carousel')) tags.push('media');
  if (lower.includes('code') || lower.includes('markdown')) tags.push('content');
  if (lower.includes('chat') || lower.includes('follow') || lower.includes('suggestion')) tags.push('chat', 'conversation');
  if (lower.includes('callout') || lower.includes('alert') || lower.includes('warning') || lower.includes('error')) tags.push('notification');

  return [...new Set(tags)];
}

/**
 * Generate manifests for all components in a library.
 *
 * @param library - The component library
 * @returns Array of ComponentManifest entries
 */
export function getManifest(library: Library): ComponentManifest[] {
  const groupMap = new Map<string, string>();
  if (library.componentGroups) {
    for (const group of library.componentGroups) {
      for (const name of group.components) {
        groupMap.set(name, group.name);
      }
    }
  }

  return Object.entries(library.components).map(([name, def]) => ({
    name,
    tagName: def.tagName,
    tags: inferTags(name, def.description),
    engagedBiasIds: def.biasHints ?? [],
    description: def.description,
    group: groupMap.get(name) ?? 'Ungrouped',
  }));
}

/**
 * Get all unique bias IDs engaged across the entire library.
 */
export function getAllEngagedBiases(library: Library): string[] {
  const biasIds = new Set<string>();
  for (const def of Object.values(library.components)) {
    if (def.biasHints) {
      for (const id of def.biasHints) biasIds.add(id);
    }
  }
  return [...biasIds];
}

/**
 * Get components that engage a specific bias.
 */
export function getComponentsByBias(library: Library, biasId: string): string[] {
  return Object.entries(library.components)
    .filter(([, def]) => def.biasHints?.includes(biasId))
    .map(([name]) => name);
}
