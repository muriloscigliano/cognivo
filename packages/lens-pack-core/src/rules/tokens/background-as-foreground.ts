import { defineRule } from '@cognivo/lens-core';
import { isBackgroundToken } from '../../internal/token-shapes.js';

export const RULE_ID = 'core/tokens/background-as-foreground';

const FOREGROUND_PROPERTIES: ReadonlySet<string> = new Set([
  'color',
  'border-color',
  'outline-color',
  'fill',
  'stroke',
]);

/**
 * Why this rule exists:
 * CLAUDE.semantic-rules.md Rule 1: a token whose name carries `-background-`
 * is sized + colored for use as a fill *behind* text. Using it as `color:`
 * or `border-color:` is semantic drift — even if the rendered value looks
 * fine today, the token is contractually a background and a future retune
 * may make it translucent or differently shaped.
 *
 * Lens fires when a foreground property's resolved token contains `-background-`,
 * pointing at the semantic mismatch.
 */
export default defineRule({
  id: RULE_ID,
  title: 'Background token used as foreground (color / border / fill / stroke)',
  category: 'system-health',
  severity: 'strong',
  intentScope: [],
  cost: 'cheap',
  citations: ['cognivo/semantic-rule-1'],
  defaultEnabled: true,
  fixCategory: 'codeable',

  applies: () => true,

  detect: ({ scene }) => {
    const offenders: Array<{ nodeId: string; property: string; token: string }> = [];
    for (const node of scene.find('*')) {
      for (const usage of node.tokenUsage) {
        if (!FOREGROUND_PROPERTIES.has(usage.property)) continue;
        if (!usage.resolvedToken || !isBackgroundToken(usage.resolvedToken)) continue;
        offenders.push({ nodeId: node.id, property: usage.property, token: usage.resolvedToken });
      }
    }
    if (offenders.length === 0) return undefined;
    return offenders.map(({ nodeId, property, token }) => ({
      targetNodeId: nodeId,
      confidence: 92,
      message: `${property} consumes background token ${token}.`,
      why:
        'A token named `-background-` is contractually a fill, not a foreground. Tomorrow ' +
        'the value may become translucent or differently shaped, and your foreground will ' +
        'break. Use the matching `-text-` / `-border-` token instead.',
      fixHint: {
        kind: 'token-swap',
        property,
        from: token,
        to: token.replace(/-background-/, property === 'border-color' ? '-border-' : '-text-'),
        reason: 'Use the semantic token that matches the property.',
      },
    }));
  },

  fixtures: [
    { name: 'bg-token-on-color', expect: 'finding' },
    { name: 'text-token-on-color', expect: 'no-finding' },
    { name: 'bg-token-on-background', expect: 'no-finding' },
    { name: 'off-grid-color', expect: 'no-finding' },
  ],
});
