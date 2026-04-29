import { defineRule } from '@cognivo/lens-core';

export const RULE_ID = 'core/a11y/img-without-alt';

/**
 * Why this rule exists:
 * Screen readers fall back to announcing the image's filename ("cat.jpg") when
 * `alt` is missing entirely — useless and noisy. An empty `alt=""` is
 * different: it is the WCAG-sanctioned opt-out signaling "decorative, skip me."
 * So we fire only when the attribute is absent, not when it is present-but-empty.
 */
export default defineRule({
  id: RULE_ID,
  title: 'Image is missing an alt attribute',
  category: 'accessibility',
  severity: 'blocker',
  intentScope: [],
  cost: 'cheap',
  citations: ['wcag/2.1/SC1.1.1'],
  defaultEnabled: true,
  fixCategory: 'codeable',

  applies: () => true,

  detect: ({ scene }) => {
    const offenders = scene.find('img').filter((node) => !('alt' in node.attributes));
    if (offenders.length === 0) return undefined;
    return offenders.map((node) => ({
      targetNodeId: node.id,
      confidence: 95,
      message: 'This <img> has no alt attribute.',
      why:
        'Screen readers announce the filename when alt is missing. Add alt="…" with ' +
        'a short description, or alt="" to mark the image as decorative.',
      fixHint: {
        kind: 'attribute-set',
        attribute: 'alt',
        value: '',
        reason: 'Mark as decorative (alt="") or supply a description.',
      },
    }));
  },

  fixtures: [
    { name: 'img-without-alt', expect: 'finding' },
    { name: 'img-with-descriptive-alt', expect: 'no-finding' },
    { name: 'img-with-empty-alt-decorative', expect: 'no-finding' },
    { name: 'imgs-mixed', expect: 'finding' },
    { name: 'no-imgs', expect: 'no-finding' },
  ],
});
