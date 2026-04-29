import { defineRule } from '@cognivo/lens-core';
import { COLOR_PROPERTIES } from '../../internal/color-props.js';
import { isBrandToken, allTier1Color } from '../../internal/token-shapes.js';

export const RULE_ID = 'core/tokens/tier1-brand-color';

/**
 * Why this rule exists:
 * The brand palette (`--cg-brand-*`) is a tier-1 primitive — components that
 * use `var(--cg-brand-primary-500)` directly bypass the tier-2 action /
 * accent / surface tokens that adapt across themes and personas. Same
 * argument as tier-1 palette but for the brand subset.
 *
 * Suppress when any candidate is tier-2+ (ambiguous; assume the developer
 * used the semantic form).
 */
export default defineRule({
  id: RULE_ID,
  title: 'Tier-1 brand color used directly in component CSS',
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
        if (!usage.resolvedToken || !isBrandToken(usage.resolvedToken)) continue;
        if (!allTier1Color(usage.candidates)) continue;
        offenders.push({ nodeId: node.id, property: usage.property, token: usage.resolvedToken });
      }
    }
    if (offenders.length === 0) return undefined;
    return offenders.map(({ nodeId, property, token }) => ({
      targetNodeId: nodeId,
      confidence: 95,
      message: `${property} resolves to tier-1 brand token ${token}.`,
      why:
        'Brand primitives skip the action / accent / surface semantic layer. ' +
        'Use --cg-color-action-primary-* or --cg-color-accent-* so the value adapts.',
      fixHint: {
        kind: 'token-swap',
        property,
        from: token,
        to: '--cg-color-action-primary-…  (or another tier-2 semantic equivalent)',
        reason: 'Route the brand color through the semantic layer.',
      },
    }));
  },

  fixtures: [
    { name: 'brand-on-color', expect: 'finding' },
    { name: 'brand-via-semantic', expect: 'no-finding' },
    { name: 'palette-not-brand', expect: 'no-finding' },
    { name: 'off-grid-color', expect: 'no-finding' },
  ],
});
