import { defineRule } from '@cognivo/lens-core';
import { buildNodeLookup, hasAccessibleName } from '../../internal/accessible-name.js';

export const RULE_ID = 'core/a11y/button-without-name';

/**
 * Why this rule exists:
 * A `<button>` (or anything with role=button) that announces no name to a
 * screen reader is a dead-end interaction. Common cause: an icon-only button
 * where the SVG never gets `aria-label` on the host. The check is conservative
 * — we only fire when both visible text AND aria-label/labelledby are absent
 * or whitespace-only.
 */
export default defineRule({
  id: RULE_ID,
  title: 'Button has no accessible name',
  category: 'accessibility',
  severity: 'blocker',
  intentScope: [],
  cost: 'cheap',
  citations: ['wcag/2.1/SC4.1.2', 'wai-aria/button'],
  defaultEnabled: true,
  fixCategory: 'codeable',

  applies: () => true,

  detect: ({ scene }) => {
    const lookup = buildNodeLookup(scene);
    const offenders = scene
      .find('button, *[role=button]')
      .filter((node) => !hasAccessibleName(node, lookup));
    if (offenders.length === 0) return undefined;
    return offenders.map((node) => ({
      targetNodeId: node.id,
      confidence: 95,
      message: 'This button has no accessible name.',
      why:
        'Screen readers announce buttons by their text or aria-label. ' +
        'Add visible text, aria-label="…", or aria-labelledby="…" referencing a label element.',
      fixHint: {
        kind: 'attribute-set',
        attribute: 'aria-label',
        value: '',
        reason: 'Set aria-label to the button\u2019s visible purpose.',
      },
    }));
  },

  fixtures: [
    { name: 'icon-only-button-no-label', expect: 'finding' },
    { name: 'button-with-text', expect: 'no-finding' },
    { name: 'button-with-aria-label', expect: 'no-finding' },
    { name: 'button-empty-aria-label', expect: 'finding' },
    { name: 'role-button-no-name', expect: 'finding' },
    { name: 'no-buttons', expect: 'no-finding' },
  ],
});
