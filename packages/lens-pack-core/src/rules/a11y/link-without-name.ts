import { defineRule } from '@cognivo/lens-core';
import { buildNodeLookup, hasAccessibleName } from '../../internal/accessible-name.js';

export const RULE_ID = 'core/a11y/link-without-name';

/**
 * Why this rule exists:
 * A link with no name appears in a screen reader's links-list as either the
 * filename (image link) or as nothing — leaving the user no way to choose it.
 * Mirror of button-without-name but for `<a>` elements.
 */
export default defineRule({
  id: RULE_ID,
  title: 'Link has no accessible name',
  category: 'accessibility',
  severity: 'blocker',
  intentScope: [],
  cost: 'cheap',
  citations: ['wcag/2.1/SC2.4.4', 'wcag/2.1/SC4.1.2'],
  defaultEnabled: true,
  fixCategory: 'codeable',

  applies: () => true,

  detect: ({ scene }) => {
    const lookup = buildNodeLookup(scene);
    const offenders = scene.find('a').filter((node) => !hasAccessibleName(node, lookup));
    if (offenders.length === 0) return undefined;
    return offenders.map((node) => ({
      targetNodeId: node.id,
      confidence: 92,
      message: 'This link has no accessible name.',
      why:
        'Links with no text or aria-label are unreachable in a screen reader\u2019s links list. ' +
        'Add visible link text, aria-label, or aria-labelledby.',
      fixHint: {
        kind: 'attribute-set',
        attribute: 'aria-label',
        value: '',
        reason: 'Set aria-label describing where the link goes.',
      },
    }));
  },

  fixtures: [
    { name: 'icon-link-no-label', expect: 'finding' },
    { name: 'link-with-text', expect: 'no-finding' },
    { name: 'link-with-aria-label', expect: 'no-finding' },
    { name: 'empty-anchor', expect: 'finding' },
    { name: 'no-links', expect: 'no-finding' },
  ],
});
