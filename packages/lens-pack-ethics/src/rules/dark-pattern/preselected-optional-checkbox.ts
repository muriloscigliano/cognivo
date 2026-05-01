import { defineRule } from '@cognivo/lens-core';
import { findInputLabelText } from '../../internal/visible-label-text.js';
import { matchesOptionalOptin } from '../../internal/optin-keywords.js';

export const RULE_ID = 'ethics/dark-pattern/preselected-optional-checkbox';

/**
 * Why this rule exists:
 * GDPR recital 32 explicitly bans pre-checked consent for optional opt-ins
 * (newsletter, marketing, third-party data sharing). Pre-selecting these
 * boxes counts as deceptive default — the user didn't actively consent.
 *
 * The rule fires only when:
 *   1. an input is type=checkbox AND has the `checked` attribute
 *   2. its label text matches an optional-opt-in keyword
 *   3. the label does NOT match the allow-list (Remember me, Keep signed in,
 *      Save credentials — usability convenience pre-checks)
 *   4. the label does NOT match terms-acceptance phrasing — that's a
 *      different bug class (forced consent), out of scope for this rule.
 *
 * Confidence 85: heuristic but precise. The allow-list + opt-in keyword
 * combination is targeted enough to keep false positives low.
 */
export default defineRule({
  id: RULE_ID,
  title: 'Pre-checked optional opt-in (deceptive default)',
  category: 'persuasive-integrity',
  severity: 'strong',
  intentScope: [],
  cost: 'cheap',
  citations: ['gdpr/recital-32'],
  defaultEnabled: true,
  fixCategory: 'codeable',

  applies: () => true,

  detect: ({ scene }) => {
    const offenders: Array<{ nodeId: string; label: string }> = [];
    for (const input of scene.find('input[type=checkbox]')) {
      if (!('checked' in input.attributes)) continue;
      const label = findInputLabelText(input, scene);
      if (label === null || label === '') continue;
      if (!matchesOptionalOptin(label)) continue;
      offenders.push({ nodeId: input.id, label });
    }
    if (offenders.length === 0) return undefined;
    return offenders.map(({ nodeId, label }) => ({
      targetNodeId: nodeId,
      confidence: 85,
      message: `Optional opt-in checkbox is pre-checked (label: "${label.slice(0, 80)}").`,
      why:
        'Pre-checking an optional opt-in is a deceptive default — the user has not actively consented. ' +
        'GDPR recital 32 specifically prohibits pre-ticked consent boxes for non-essential processing. ' +
        'Default the checkbox to unchecked and let the user opt in.',
      fixHint: {
        kind: 'attribute-set',
        attribute: 'checked',
        value: '',
        reason: 'Remove the `checked` attribute — let the user opt in actively.',
      },
    }));
  },

  fixtures: [
    { name: 'checked-newsletter', expect: 'finding' },
    { name: 'checked-marketing-for-label', expect: 'finding' },
    { name: 'checked-aria-label', expect: 'finding' },
    { name: 'checked-remember-me', expect: 'no-finding' },
    { name: 'checked-keep-signed', expect: 'no-finding' },
    { name: 'unchecked-newsletter', expect: 'no-finding' },
    { name: 'checked-generic', expect: 'no-finding' },
    { name: 'checked-terms', expect: 'no-finding' },
  ],
});
