import { defineRule } from '@cognivo/lens-core';
import { parseTabindex } from '../../internal/tabindex.js';

export const RULE_ID = 'core/a11y/positive-tabindex';

/**
 * Why this rule exists:
 * Positive tabindex values jump the element to the front of the tab order
 * regardless of where it appears in the DOM, which destroys the source-order
 * navigation contract every other element on the page relies on. The right
 * tools are tabindex="0" (focusable in source order) and tabindex="-1"
 * (programmatically focusable, skipped by tab).
 */
export default defineRule({
  id: RULE_ID,
  title: 'Element has positive tabindex',
  category: 'accessibility',
  severity: 'strong',
  intentScope: [],
  cost: 'cheap',
  citations: ['wcag/2.1/SC2.4.3'],
  defaultEnabled: true,
  fixCategory: 'codeable',

  applies: () => true,

  detect: ({ scene }) => {
    const offenders = scene
      .find('*[tabindex]')
      .filter((node) => parseTabindex(node.attributes['tabindex']) > 0);
    if (offenders.length === 0) return undefined;
    return offenders.map((node) => ({
      targetNodeId: node.id,
      confidence: 100,
      message: `tabindex="${node.attributes['tabindex']}" overrides natural tab order.`,
      why:
        'Any positive tabindex jumps the element to the front of the tab order, breaking the ' +
        'source-order convention. Use tabindex="0" (focusable in order) or tabindex="-1" ' +
        '(programmatic focus only) instead.',
      fixHint: {
        kind: 'attribute-set',
        attribute: 'tabindex',
        value: '0',
        reason: 'Replace positive tabindex with 0 to keep source-order navigation.',
      },
    }));
  },

  fixtures: [
    { name: 'tabindex-1', expect: 'finding' },
    { name: 'tabindex-99', expect: 'finding' },
    { name: 'tabindex-0', expect: 'no-finding' },
    { name: 'tabindex-neg', expect: 'no-finding' },
    { name: 'no-tabindex', expect: 'no-finding' },
    { name: 'tabindex-garbage', expect: 'no-finding' },
  ],
});
