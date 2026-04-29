import { defineRule } from '@cognivo/lens-core';
import { COLOR_PROPERTIES } from '../../internal/color-props.js';

export const RULE_ID = 'core/tokens/raw-color-no-token';

/**
 * Why this rule exists:
 * Component CSS should consume color values via `var(--cg-color-…)` so the
 * design system can retune the brand without touching the components. When
 * a color resolves to a value that matches NO Cognivo token, the developer
 * either:
 *   - hard-coded a hex (a magic-number violation), or
 *   - used a tier that resolves outside the manifest (often a one-off).
 *
 * Either way, Lens flags it as `consider`-severity so the developer can
 * decide if a new token is warranted or if the raw value is intentional
 * (e.g. a one-off scrollbar override).
 *
 * Skips fully-transparent values (alpha 0) — those are common for
 * "background reset" patterns where the magic value carries semantic intent.
 */
export default defineRule({
  id: RULE_ID,
  title: 'Color value not derived from any Cognivo token',
  category: 'system-health',
  severity: 'consider',
  intentScope: [],
  cost: 'cheap',
  citations: ['cognivo/token-guardrails'],
  defaultEnabled: true,
  fixCategory: 'codeable',

  applies: () => true,

  detect: ({ scene }) => {
    const offenders: Array<{ nodeId: string; property: string; rawValue: string }> = [];
    for (const node of scene.find('*')) {
      for (const usage of node.tokenUsage) {
        if (usage.tier !== 0) continue;
        if (!COLOR_PROPERTIES.has(usage.property)) continue;
        // Skip fully-transparent values; they're a deliberate "no fill" signal.
        if (/^rgba\([^)]*,\s*0\)$/i.test(usage.rawValue)) continue;
        offenders.push({ nodeId: node.id, property: usage.property, rawValue: usage.rawValue });
      }
    }
    if (offenders.length === 0) return undefined;
    return offenders.map(({ nodeId, property, rawValue }) => ({
      targetNodeId: nodeId,
      confidence: 88,
      message: `${property} value ${rawValue} matches no Cognivo token.`,
      why:
        'Off-grid color values bypass the design system. Either add a tier-2/3 token for ' +
        'this purpose or replace the value with the closest existing token.',
      fixHint: {
        kind: 'token-swap',
        property,
        from: rawValue,
        to: '--cg-color-…  (closest semantic equivalent)',
        reason: 'Route the color through the token system.',
      },
    }));
  },

  fixtures: [
    { name: 'off-grid', expect: 'finding' },
    { name: 'token-color', expect: 'no-finding' },
    { name: 'transparent', expect: 'no-finding' },
    { name: 'numeric-property', expect: 'no-finding' },
  ],
});
