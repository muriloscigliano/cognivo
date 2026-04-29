import { defineRule } from '@cognivo/lens-core';
import { parseTabindex } from '../../internal/tabindex.js';

export const RULE_ID = 'core/focus/disabled-with-tabindex';

/**
 * Why this rule exists:
 * A disabled control that is still tab-reachable creates a focus trap with no
 * visible reason to be there — the user lands on it, can't activate it, and
 * has to keep tabbing. tabindex="-1" (or removing the attribute) is the right
 * fix. This is especially common when teams roll their own button via div
 * and forget to clear the tabindex on the disabled state.
 */
export default defineRule({
  id: RULE_ID,
  title: 'Disabled element is still in the tab order',
  category: 'accessibility',
  severity: 'strong',
  intentScope: [],
  cost: 'cheap',
  citations: ['wcag/2.1/SC2.1.1', 'wai-aria/aria-disabled'],
  defaultEnabled: true,
  fixCategory: 'codeable',

  applies: () => true,

  detect: ({ scene }) => {
    const offenders = scene
      .find('*[disabled], *[aria-disabled=true]')
      .filter((node) => parseTabindex(node.attributes['tabindex']) >= 0);
    if (offenders.length === 0) return undefined;
    return offenders.map((node) => ({
      targetNodeId: node.id,
      confidence: 95,
      message: 'Disabled element has tabindex >= 0 — still tab-reachable.',
      why:
        'Tab navigation lands on this disabled control with nothing the user can do. ' +
        'Set tabindex="-1" or remove the tabindex attribute so disabled controls are skipped.',
      fixHint: {
        kind: 'attribute-set',
        attribute: 'tabindex',
        value: '-1',
        reason: 'Skip disabled controls in the tab order.',
      },
    }));
  },

  fixtures: [
    { name: 'disabled-tabindex-0', expect: 'finding' },
    { name: 'aria-disabled-tabindex-0', expect: 'finding' },
    { name: 'disabled-tabindex-neg', expect: 'no-finding' },
    { name: 'disabled-no-tabindex', expect: 'no-finding' },
    { name: 'aria-disabled-false', expect: 'no-finding' },
  ],
});
