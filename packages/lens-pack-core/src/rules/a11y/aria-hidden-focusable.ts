import type { SceneNode } from '@cognivo/lens-core';
import { defineRule } from '@cognivo/lens-core';
import { parseTabindex } from '../../internal/tabindex.js';

const FOCUSABLE_TAGS = new Set(['button', 'select', 'textarea', 'input']);

/**
 * Is this node focusable from the keyboard, by tag or tabindex?
 *
 * v1 conservative coverage:
 *  - Native interactive tags (button/select/textarea, plus input that isn't type=hidden)
 *  - <a> with an `href` attribute (anchors without href are not focusable)
 *  - Any element with `tabindex >= 0`
 *
 * Out of scope for v1: focusable descendants of an aria-hidden ancestor — we
 * only check the aria-hidden element itself. Documented in the rule's `why`.
 */
function isFocusable(node: SceneNode): boolean {
  if (FOCUSABLE_TAGS.has(node.tag)) {
    if (node.tag === 'input' && node.attributes['type'] === 'hidden') return false;
    return true;
  }
  if (node.tag === 'a' && 'href' in node.attributes) return true;
  return parseTabindex(node.attributes['tabindex']) >= 0;
}

export const RULE_ID = 'core/a11y/aria-hidden-focusable';

/**
 * Why this rule exists:
 * `aria-hidden="true"` removes the element from the accessibility tree. A
 * keyboard user can still tab to it, but the screen reader won't announce
 * anything when they land on it — they hit a silent dead-zone. The fix is
 * either to remove aria-hidden, or to also make the element non-tabbable
 * (tabindex="-1" + disabling the underlying widget if needed).
 */
export default defineRule({
  id: RULE_ID,
  title: 'Focusable element is hidden from assistive tech',
  category: 'accessibility',
  severity: 'blocker',
  intentScope: [],
  cost: 'cheap',
  citations: ['wcag/2.1/SC4.1.2', 'wai-aria/aria-hidden'],
  defaultEnabled: true,
  fixCategory: 'codeable',

  applies: () => true,

  detect: ({ scene }) => {
    const offenders = scene.find('*[aria-hidden=true]').filter(isFocusable);
    if (offenders.length === 0) return undefined;
    return offenders.map((node) => ({
      targetNodeId: node.id,
      confidence: 95,
      message: 'aria-hidden=true on a focusable element creates a silent tab stop.',
      why:
        'A keyboard user lands on this element with no screen-reader announcement. ' +
        'Either remove aria-hidden, or pair it with tabindex="-1" so the element is ' +
        'skipped by tab. (v1 only checks the element itself, not aria-hidden ancestors of focusable descendants.)',
      fixHint: {
        kind: 'attribute-set',
        attribute: 'tabindex',
        value: '-1',
        reason: 'Remove the silent tab stop, or remove aria-hidden if the element should be exposed.',
      },
    }));
  },

  fixtures: [
    { name: 'button-aria-hidden', expect: 'finding' },
    { name: 'div-aria-hidden-tabindex-0', expect: 'finding' },
    { name: 'aria-hidden-tabindex-neg', expect: 'no-finding' },
    { name: 'aria-hidden-false', expect: 'no-finding' },
    { name: 'aria-hidden-div', expect: 'no-finding' },
    { name: 'aria-hidden-link', expect: 'finding' },
  ],
});
