import { defineRule } from '@cognivo/lens-core';

export const RULE_ID = 'core/a11y/text-contrast-below-AA';

/**
 * Why this rule exists:
 * WCAG 2.1 SC 1.4.3 requires text to have at least 4.5:1 contrast against
 * its background (3:1 for large text). Lower contrast is a blocker for
 * users with low vision and degrades readability for everyone in bright
 * environments. We compute the ratio per text-bearing element via the
 * lens-core contrast helper, which walks the scene's parent chain to find
 * the nearest opaque background.
 *
 * v1: tests against AA only. AA-large / AAA / AAA-large variants are
 * configurable via rule overrides in lens.config.ts later.
 */
export default defineRule({
  id: RULE_ID,
  title: 'Text contrast below WCAG AA (4.5:1)',
  category: 'accessibility',
  severity: 'blocker',
  intentScope: [],
  cost: 'cheap',
  citations: ['wcag/2.1/SC1.4.3'],
  defaultEnabled: true,
  fixCategory: 'codeable',

  applies: () => true,

  detect: ({ scene }) => {
    const offenders: Array<{ nodeId: string; ratio: number }> = [];
    for (const node of scene.find('*')) {
      // Only check elements that actually carry rendered text. node.text is
      // undefined when there's no visible content, which means there's no
      // foreground to contrast.
      if (!node.text || node.text.trim() === '') continue;
      const result = scene.contrast(node, { against: 'background', wcag: 'AA' });
      if (result.ratio === 0) continue; // foreground unparseable — skip
      if (result.passes) continue;
      offenders.push({ nodeId: node.id, ratio: result.ratio });
    }
    if (offenders.length === 0) return undefined;
    return offenders.map(({ nodeId, ratio }) => ({
      targetNodeId: nodeId,
      confidence: 90,
      message: `Text contrast ${ratio.toFixed(2)}:1 is below the WCAG AA threshold of 4.5:1.`,
      why:
        'Users with low vision cannot read low-contrast text, and bright environments make ' +
        'the problem worse for all users. Either darken the foreground or lighten the background ' +
        'until the ratio reaches 4.5:1 (or 3:1 for text >= 18pt regular / 14pt bold).',
      fixHint: {
        kind: 'token-swap',
        property: 'color',
        from: '(current value)',
        to: '--cg-color-surface-base-text  (or another token with sufficient contrast)',
        reason: 'Increase contrast to meet WCAG AA.',
      },
    }));
  },

  fixtures: [
    { name: 'low-contrast-text', expect: 'finding' },
    { name: 'high-contrast-text', expect: 'no-finding' },
    { name: 'no-text', expect: 'no-finding' },
  ],
});
