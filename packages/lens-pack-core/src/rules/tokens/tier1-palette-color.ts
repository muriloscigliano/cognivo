import { defineRule } from '@cognivo/lens-core';
import { COLOR_PROPERTIES } from '../../internal/color-props.js';
import { isPaletteToken, allTier1Color } from '../../internal/token-shapes.js';

export const RULE_ID = 'core/tokens/tier1-palette-color';

/**
 * Why this rule exists:
 * Cognivo's design-system contract says component CSS uses tier-2 *semantic*
 * color tokens (`--cg-color-action-primary-*`), never the tier-1 palette
 * primitives directly (`--cg-gray-500`). Reaching past the semantic layer
 * into the palette breaks themability — when a designer retunes the brand,
 * components bypassing the semantic layer don't follow.
 *
 * We fire only when ALL candidates for the resolved value are tier-1 palette
 * (no tier-2+ alternative resolves to the same value). When the value is
 * ambiguous between palette and a semantic token, we suppress to avoid
 * false-positive noise — the developer probably wrote the semantic form.
 */
export default defineRule({
  id: RULE_ID,
  title: 'Tier-1 palette color used directly in component CSS',
  category: 'system-health',
  severity: 'strong',
  intentScope: [],
  cost: 'cheap',
  citations: ['cognivo/token-guardrails'],
  defaultEnabled: true,
  fixCategory: 'codeable',

  applies: () => true,

  detect: ({ scene }) => {
    const offenders: Array<{ nodeId: string; property: string; token: string }> = [];
    for (const node of scene.find('*')) {
      for (const usage of node.tokenUsage) {
        if (usage.tier !== 1) continue;
        if (!COLOR_PROPERTIES.has(usage.property)) continue;
        if (!usage.resolvedToken || !isPaletteToken(usage.resolvedToken)) continue;
        // Suppress when any candidate is tier-2+ (ambiguous — give benefit of the doubt).
        if (!allTier1Color(usage.candidates)) continue;
        offenders.push({ nodeId: node.id, property: usage.property, token: usage.resolvedToken });
      }
    }
    if (offenders.length === 0) return undefined;
    return offenders.map(({ nodeId, property, token }) => ({
      targetNodeId: nodeId,
      confidence: 95,
      message: `${property} resolves to tier-1 palette token ${token}.`,
      why:
        'Tier-1 palette primitives skip the semantic color layer, breaking themability. ' +
        'Use the matching tier-2 semantic token (e.g. --cg-color-surface-base-text instead of --cg-gray-500).',
      fixHint: {
        kind: 'token-swap',
        property,
        from: token,
        to: '--cg-color-…  (tier-2 equivalent)',
        reason: 'Route this color through the semantic layer.',
      },
    }));
  },

  fixtures: [
    { name: 'slate-on-color', expect: 'finding' },
    { name: 'gray-on-spacing', expect: 'no-finding' },
    { name: 'semantic-color', expect: 'no-finding' },
    { name: 'brand-color', expect: 'no-finding' },
    { name: 'off-grid-color', expect: 'no-finding' },
  ],
});
