/**
 * suggestBiasesForTree() — Post-render bias analysis.
 *
 * This is the killer feature. After an LLM generates a UI tree,
 * this function walks the ElementNode tree, identifies which components
 * are used, collects their biasHints, and produces actionable recommendations.
 *
 * This is what makes Cognivo different from OpenUI:
 * "OpenUI helps the model draw the UI faster;
 *  Cognivo helps teams ship AI UI that users interpret correctly."
 *
 * Usage:
 *   const result = parser.parse(llmOutput);
 *   const analysis = suggestBiasesForTree(result, cognivoLibrary);
 *   // → [{ biasId: "anchoring-bias", components: ["MetricCard", "Slider"], severity: "high", ... }]
 */

import type { ParseResult, ElementNode } from '../types.js';
import type { Library } from '../registry.js';

/**
 * A bias suggestion for a generated UI tree.
 */
export interface BiasTreeSuggestion {
  /** Cognitive bias ID (e.g. "anchoring-bias", "framing-effect"). */
  biasId: string;
  /** Human-readable bias name. */
  biasName: string;
  /** Which components in the tree engage this bias. */
  components: string[];
  /** How many instances of engaging components appear in the tree. */
  occurrences: number;
  /** Severity: more engaging components = higher severity. */
  severity: 'critical' | 'high' | 'medium' | 'low';
  /** Actionable recommendation. */
  recommendation: string;
  /** Which component tags to look at. */
  tagNames: string[];
}

/**
 * Bias-specific recommendations based on component type.
 */
const BIAS_RECOMMENDATIONS: Record<string, string> = {
  'anchoring-bias': 'Users will anchor on the first number they see. Consider showing context, ranges, or comparison values to reduce anchoring. Position the most important metric thoughtfully.',
  'framing-effect': 'How information is framed (positive vs negative) changes decisions. Present data neutrally — show both gains and losses. Avoid emotionally loaded language in labels.',
  'authority-bias': 'Users trust AI analysis disproportionately. Include confidence levels, data sources, and caveats. Make it easy to question the AI output.',
  'availability-heuristic': 'Recent or vivid information is overweighted. Show historical context alongside current trends. Use time ranges and baseline comparisons.',
  'confirmation-bias': 'Users seek information that confirms existing beliefs. Present contradictory data points alongside supporting ones. Use balanced callout variants.',
  'bandwagon-effect': 'Social proof can distort individual judgment. If showing aggregate data, also show variance and outliers.',
  'loss-aversion': 'Losses feel ~2x worse than equivalent gains. Frame negative metrics carefully. Consider showing absolute values alongside percentages.',
  'recency-bias': 'Recent data is weighted more heavily than historical patterns. Always show time context and long-term trends alongside current values.',
  'dunning-kruger-effect': 'Simple visualizations may create false confidence. Include complexity indicators and uncertainty ranges.',
  'status-quo-bias': 'Users resist change even when data supports it. Highlight actionable next steps alongside insights.',
};

/**
 * Human-readable names for common biases.
 */
const BIAS_NAMES: Record<string, string> = {
  'anchoring-bias': 'Anchoring Bias',
  'framing-effect': 'Framing Effect',
  'authority-bias': 'Authority Bias',
  'availability-heuristic': 'Availability Heuristic',
  'confirmation-bias': 'Confirmation Bias',
  'bandwagon-effect': 'Bandwagon Effect',
  'loss-aversion': 'Loss Aversion',
  'recency-bias': 'Recency Bias',
  'dunning-kruger-effect': 'Dunning-Kruger Effect',
  'status-quo-bias': 'Status Quo Bias',
};

/**
 * Walk an ElementNode tree and collect all component type names.
 */
function collectComponents(node: ElementNode | null): Map<string, number> {
  const counts = new Map<string, number>();
  if (!node) return counts;

  counts.set(node.typeName, (counts.get(node.typeName) ?? 0) + 1);

  // Recurse into props that contain ElementNodes
  for (const value of Object.values(node.props)) {
    if (isElementNode(value)) {
      for (const [k, v] of collectComponents(value as ElementNode)) {
        counts.set(k, (counts.get(k) ?? 0) + v);
      }
    }
    if (Array.isArray(value)) {
      for (const item of value) {
        if (isElementNode(item)) {
          for (const [k, v] of collectComponents(item as ElementNode)) {
            counts.set(k, (counts.get(k) ?? 0) + v);
          }
        }
      }
    }
  }

  return counts;
}

function isElementNode(value: unknown): value is ElementNode {
  return (
    typeof value === 'object' &&
    value !== null &&
    'type' in value &&
    (value as Record<string, unknown>).type === 'element' &&
    'typeName' in value
  );
}

/**
 * Determine severity based on number of engaging components.
 */
function getSeverity(occurrences: number, totalComponents: number): BiasTreeSuggestion['severity'] {
  const ratio = occurrences / Math.max(totalComponents, 1);
  if (ratio >= 0.5 || occurrences >= 5) return 'critical';
  if (ratio >= 0.3 || occurrences >= 3) return 'high';
  if (occurrences >= 2) return 'medium';
  return 'low';
}

/**
 * Analyze a generated UI tree for cognitive biases.
 *
 * Walks the ParseResult tree, identifies which components are used,
 * maps them to biasHints from the library, and returns actionable suggestions.
 *
 * @param result - The ParseResult from the parser
 * @param library - The component library with biasHints
 * @returns Array of bias suggestions, sorted by severity
 */
export function suggestBiasesForTree(
  result: ParseResult,
  library: Library,
): BiasTreeSuggestion[] {
  if (!result.root) return [];

  // 1. Collect all components used in the tree
  const componentCounts = collectComponents(result.root);
  const totalComponents = [...componentCounts.values()].reduce((a, b) => a + b, 0);

  // 2. Map components to their biasHints
  const biasMap = new Map<string, { components: Set<string>; tagNames: Set<string>; occurrences: number }>();

  for (const [componentName, count] of componentCounts) {
    const def = library.components[componentName];
    if (!def?.biasHints?.length) continue;

    for (const biasId of def.biasHints) {
      const existing = biasMap.get(biasId) ?? { components: new Set(), tagNames: new Set(), occurrences: 0 };
      existing.components.add(componentName);
      existing.tagNames.add(def.tagName);
      existing.occurrences += count;
      biasMap.set(biasId, existing);
    }
  }

  // 3. Build suggestions
  const suggestions: BiasTreeSuggestion[] = [];

  for (const [biasId, data] of biasMap) {
    suggestions.push({
      biasId,
      biasName: BIAS_NAMES[biasId] ?? biasId.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
      components: [...data.components],
      occurrences: data.occurrences,
      severity: getSeverity(data.occurrences, totalComponents),
      recommendation: BIAS_RECOMMENDATIONS[biasId] ?? `This UI engages ${biasId}. Review the affected components for potential user misinterpretation.`,
      tagNames: [...data.tagNames],
    });
  }

  // Sort by severity (critical first)
  const severityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
  suggestions.sort((a, b) => severityOrder[a.severity] - severityOrder[b.severity]);

  return suggestions;
}

/**
 * Generate a human-readable bias report for a UI tree.
 */
export function formatBiasReport(suggestions: BiasTreeSuggestion[]): string {
  if (suggestions.length === 0) return 'No cognitive biases detected in this UI tree.';

  const lines = [
    `## Cognitive Bias Analysis`,
    `Found ${suggestions.length} cognitive bias${suggestions.length > 1 ? 'es' : ''} engaged in this UI:`,
    '',
  ];

  for (const s of suggestions) {
    const icon = s.severity === 'critical' ? '🔴' : s.severity === 'high' ? '🟠' : s.severity === 'medium' ? '🟡' : '🟢';
    lines.push(`### ${icon} ${s.biasName} (${s.severity})`);
    lines.push(`**Components:** ${s.components.join(', ')} (${s.occurrences} occurrence${s.occurrences > 1 ? 's' : ''})`);
    lines.push(`**Recommendation:** ${s.recommendation}`);
    lines.push('');
  }

  return lines.join('\n');
}
