import { defineRule } from '@cognivo/lens-core';
import { hasAriaName } from '../../internal/accessible-name.js';

const SELECTOR = 'dialog, *[role=dialog], *[role=alertdialog]';

export const RULE_ID = 'core/a11y/dialog-without-name';

/**
 * Why this rule exists:
 * A dialog without a name is read out as just "dialog" — the user has no idea
 * what it is asking. Modal interruptions are high-stakes; the cost of an
 * unnamed one is real. Like landmarks, dialog text content is the body, not
 * the name — only aria signals count.
 */
export default defineRule({
  id: RULE_ID,
  title: 'Dialog has no accessible name',
  category: 'accessibility',
  severity: 'strong',
  intentScope: [],
  cost: 'cheap',
  citations: ['wai-aria/dialog'],
  defaultEnabled: true,
  fixCategory: 'codeable',

  applies: () => true,

  detect: ({ scene }) => {
    const offenders = scene.find(SELECTOR).filter((node) => !hasAriaName(node));
    if (offenders.length === 0) return undefined;
    return offenders.map((node) => ({
      targetNodeId: node.id,
      confidence: 90,
      message: 'Dialog has no accessible name.',
      why:
        'Dialogs are announced as "dialog" with no further context if unnamed. ' +
        'Add aria-label or aria-labelledby pointing to the dialog\u2019s heading.',
      fixHint: {
        kind: 'attribute-set',
        attribute: 'aria-labelledby',
        value: '',
        reason: 'Reference the id of the dialog\u2019s heading.',
      },
    }));
  },

  fixtures: [
    { name: 'dialog-no-name', expect: 'finding' },
    { name: 'dialog-aria-label', expect: 'no-finding' },
    { name: 'role-dialog-no-name', expect: 'finding' },
    { name: 'alertdialog-no-name', expect: 'finding' },
    { name: 'role-dialog-labelledby', expect: 'no-finding' },
  ],
});
