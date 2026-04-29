import { defineRule } from '@cognivo/lens-core';

export const RULE_ID = 'core/system-health/closed-shadow-root-unauditable';

/**
 * Why this rule exists:
 * `attachShadow({ mode: 'closed' })` makes the shadow tree invisible to all
 * outside script — including Lens's own observer. The engine cannot evaluate
 * a11y, token, or any other rules against closed shadow contents. We surface
 * this as a `consider`-level finding so authors know whole sub-trees are
 * exempt from auditing, without claiming the page itself has a defect.
 */
export default defineRule({
  id: RULE_ID,
  title: 'Closed shadow root is hidden from the auditor',
  category: 'system-health',
  severity: 'consider',
  intentScope: [],
  cost: 'cheap',
  citations: [],
  defaultEnabled: true,
  fixCategory: 'judgment',

  applies: () => true,

  detect: ({ scene }) => {
    const offenders = scene.find('*').filter((n) => n.hasClosedShadowRoot === true);
    if (offenders.length === 0) return undefined;
    return offenders.map((node) => ({
      targetNodeId: node.id,
      confidence: 100,
      message: `<${node.tag}> hosts a closed shadow root \u2014 its contents cannot be audited.`,
      why:
        'Closed shadow roots are inaccessible from outside script, so Lens cannot run any rules ' +
        'against their contents. If this component is yours, switch to mode: "open" so it can be ' +
        'audited.',
      fixHint: {
        kind: 'restructure',
        summary: 'Use attachShadow({ mode: "open" }) so the contents can be inspected.',
        reason: 'Closed shadow trees are exempt from all auditing.',
      },
    }));
  },

  fixtures: [
    { name: 'has-closed-shadow', expect: 'finding' },
    { name: 'no-closed-shadow', expect: 'no-finding' },
  ],
});
