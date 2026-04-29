import { defineRule } from '@cognivo/lens-core';

export const RULE_ID = 'core/tokens/missing-component-tier3-token';

const COMPONENT_PREFIXES = ['cg-', 'ai-'];

const ADVISORY_PROPERTIES: ReadonlySet<string> = new Set([
  'border-radius',
  'border-top-left-radius',
  'border-top-right-radius',
  'border-bottom-left-radius',
  'border-bottom-right-radius',
  'padding-top',
  'padding-right',
  'padding-bottom',
  'padding-left',
]);

/**
 * Why this rule exists:
 * Cognivo's token tier hierarchy says component-specific dimensions
 * (`--cg-component-button-radius-md`, `--cg-component-input-height-sm`)
 * should be used INSIDE that component's CSS. When a `<cg-*>` or `<ai-*>`
 * element renders these properties via tier-1 primitives or off-grid
 * values, the component is missing its tier-3 token contract — refactor
 * candidates surface here.
 *
 * Advisory severity: this is a hint, not a hard violation. The rule lacks
 * full knowledge of which tier-3 tokens exist for each (tag, property)
 * pair (would require the full @cognivo/tokens manifest at runtime, which
 * we don't ship to keep lens-core lean). Confidence is dialed down
 * accordingly.
 */
export default defineRule({
  id: RULE_ID,
  title: 'Cognivo component should use a tier-3 component-scoped token',
  category: 'system-health',
  severity: 'consider',
  intentScope: [],
  cost: 'cheap',
  citations: ['cognivo/token-guardrails'],
  defaultEnabled: true,
  fixCategory: 'codeable',

  applies: () => true,

  detect: ({ scene }) => {
    const offenders: Array<{ nodeId: string; tag: string; property: string; rawValue: string }> = [];
    for (const node of scene.find('*')) {
      const isCognivoComponent = COMPONENT_PREFIXES.some((p) => node.tag.startsWith(p));
      if (!isCognivoComponent) continue;
      for (const usage of node.tokenUsage) {
        if (!ADVISORY_PROPERTIES.has(usage.property)) continue;
        if (usage.tier === 3) continue;
        offenders.push({ nodeId: node.id, tag: node.tag, property: usage.property, rawValue: usage.rawValue });
      }
    }
    if (offenders.length === 0) return undefined;
    return offenders.map(({ nodeId, tag, property, rawValue }) => ({
      targetNodeId: nodeId,
      confidence: 75,
      message: `<${tag}> ${property} = ${rawValue} is not a tier-3 component token.`,
      why:
        'Cognivo components define dimension tokens at tier 3 (e.g. ' +
        '--cg-component-button-radius-md). Using a tier-1 primitive or off-grid ' +
        'value here means consumers can’t retune the component without ' +
        'editing its CSS. Add the tier-3 token to @cognivo/tokens or, if the ' +
        'component intentionally uses a primitive, ignore this advisory.',
      fixHint: {
        kind: 'token-swap',
        property,
        from: rawValue,
        to: `--cg-component-${tag.replace(/^(cg-|ai-)/, '')}-${property}-md`,
        reason: 'Use a tier-3 component-scoped token if one exists.',
      },
    }));
  },

  fixtures: [
    { name: 'cg-no-tier3', expect: 'finding' },
    { name: 'cg-with-tier3', expect: 'no-finding' },
    { name: 'plain-html', expect: 'no-finding' },
  ],
});
