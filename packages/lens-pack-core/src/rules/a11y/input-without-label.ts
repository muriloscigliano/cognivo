import { defineRule } from '@cognivo/lens-core';
import { hasAriaName } from '../../internal/accessible-name.js';

const TEXT_INPUT_TYPES = new Set([
  'text',
  'email',
  'password',
  'search',
  'tel',
  'url',
  'number',
]);

export const RULE_ID = 'core/a11y/input-without-label';

/**
 * Why this rule exists:
 * Text-family inputs without a programmatic label leave the user unable to
 * tell what value to type. v1 covers the text-family inputs only — checkbox
 * and radio have their own labeling conventions (often wrapped by <label>),
 * which a future rule will address separately.
 *
 * Has-label signals:
 *  - aria-label / aria-labelledby (handled by hasAriaName)
 *  - a sibling <label for="X"> where X = input.id
 *
 * Wrapping <label><input></label> is also valid HTML but harder to detect
 * without parent-walking; deferred to v1.1 — for now, recommend the explicit
 * `for=` pattern.
 */
export default defineRule({
  id: RULE_ID,
  title: 'Text input has no associated label',
  category: 'accessibility',
  severity: 'blocker',
  intentScope: [],
  cost: 'cheap',
  citations: ['wcag/2.1/SC1.3.1', 'wcag/2.1/SC4.1.2'],
  defaultEnabled: true,
  fixCategory: 'structural',

  applies: () => true,

  detect: ({ scene }) => {
    const labelFors = new Set<string>();
    for (const label of scene.find('label')) {
      const target = label.attributes['for'];
      if (target !== undefined && target !== '') labelFors.add(target);
    }

    const offenders = scene.find('input').filter((node) => {
      const type = node.attributes['type'];
      if (type !== undefined && !TEXT_INPUT_TYPES.has(type)) return false;
      if (hasAriaName(node)) return false;
      const id = node.attributes['id'];
      if (id !== undefined && labelFors.has(id)) return false;
      return true;
    });

    if (offenders.length === 0) return undefined;
    return offenders.map((node) => ({
      targetNodeId: node.id,
      confidence: 90,
      message: 'This input has no associated label.',
      why:
        'Inputs without a label are unannounced by screen readers and unidentifiable in form ' +
        'errors. Add a <label for="…"> referencing the input\u2019s id, or aria-label / aria-labelledby.',
      fixHint: {
        kind: 'restructure',
        summary: 'Add <label for="X"> referencing this input\u2019s id, or aria-label.',
        reason: 'Programmatic label is required for accessible form fields.',
      },
    }));
  },

  fixtures: [
    { name: 'bare-text-input', expect: 'finding' },
    { name: 'default-type-input', expect: 'finding' },
    { name: 'input-with-aria-label', expect: 'no-finding' },
    { name: 'input-with-label-for', expect: 'no-finding' },
    { name: 'input-skip-hidden', expect: 'no-finding' },
    { name: 'input-bare-password', expect: 'finding' },
  ],
});
