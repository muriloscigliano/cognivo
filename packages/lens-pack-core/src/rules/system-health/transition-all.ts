import { defineRule } from '@cognivo/lens-core';

const ALL_KEYWORD = /\ball\b/;

export const RULE_ID = 'core/system-health/transition-all';

/**
 * Why this rule exists:
 * `transition: all` triggers on every property change including layout and
 * paint properties the author may not have intended (height, width, top,
 * left), which causes janky relayouts and accidental animation of state
 * transitions that should be instantaneous. CLAUDE.token-guardrails bans it
 * outright: enumerate the properties you want to animate.
 *
 * Reads `computedStyle.transition` and `computedStyle.transition-property`
 * (both captured by the Observer's default scan since the Phase 0 enhancement).
 */
export default defineRule({
  id: RULE_ID,
  title: '`transition: all` is too broad',
  category: 'system-health',
  severity: 'consider',
  intentScope: [],
  cost: 'cheap',
  citations: ['cognivo/token-guardrails'],
  defaultEnabled: true,
  fixCategory: 'codeable',

  applies: () => true,

  detect: ({ scene }) => {
    const offenders = scene.find('*').filter((node) => {
      const t = node.computedStyle['transition'];
      const tp = node.computedStyle['transition-property'];
      return (
        (typeof t === 'string' && ALL_KEYWORD.test(t)) ||
        (typeof tp === 'string' && ALL_KEYWORD.test(tp))
      );
    });
    if (offenders.length === 0) return undefined;
    return offenders.map((node) => ({
      targetNodeId: node.id,
      confidence: 85,
      message: '`transition: all` triggers on every property change.',
      why:
        'Animating "all" pulls in layout properties you did not intend (height, width, position) ' +
        'and causes jank. Enumerate the specific properties to animate.',
      fixHint: {
        kind: 'css-injection',
        selector: '',
        declarations: 'transition: background-color 100ms ease, color 100ms ease;',
        reason: 'Replace `all` with the specific properties you intend to animate.',
      },
    }));
  },

  fixtures: [
    { name: 'inline-transition-all', expect: 'finding' },
    { name: 'transition-color', expect: 'no-finding' },
    { name: 'no-transition', expect: 'no-finding' },
    { name: 'transition-with-allergy-bait', expect: 'no-finding' },
  ],
});
