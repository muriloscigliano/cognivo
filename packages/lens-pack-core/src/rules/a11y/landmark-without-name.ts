import { defineRule } from '@cognivo/lens-core';
import { hasAriaName } from '../../internal/accessible-name.js';

const LANDMARK_ROLES = [
  'region',
  'navigation',
  'complementary',
  'banner',
  'contentinfo',
  'search',
  'form',
] as const;

const LANDMARK_SELECTOR = LANDMARK_ROLES.map((r) => `*[role=${r}]`).join(', ');

export const RULE_ID = 'core/a11y/landmark-without-name';

/**
 * Why this rule exists:
 * Unnamed landmarks pollute the screen-reader landmark list — users see
 * "navigation" three times with no way to distinguish them. CLAUDE.semantic-rules
 * Rule 9 says: if you can't name it, drop the role. v1 only checks role-
 * attributed landmarks; implicit landmarks (`<nav>`, `<aside>`) are a v1.1
 * expansion.
 */
export default defineRule({
  id: RULE_ID,
  title: 'Landmark role with no accessible name',
  category: 'accessibility',
  severity: 'strong',
  intentScope: [],
  cost: 'cheap',
  citations: ['wai-aria/landmark', 'cognivo/semantic-rule-9'],
  defaultEnabled: true,
  fixCategory: 'codeable',

  applies: () => true,

  detect: ({ scene }) => {
    const offenders = scene.find(LANDMARK_SELECTOR).filter((node) => !hasAriaName(node));
    if (offenders.length === 0) return undefined;
    return offenders.map((node) => ({
      targetNodeId: node.id,
      confidence: 88,
      message: `Landmark <${node.tag} role="${node.role}"> has no accessible name.`,
      why:
        'Multiple unnamed landmarks of the same type are indistinguishable in the ' +
        'screen-reader landmark list. Add aria-label or aria-labelledby \u2014 or ' +
        'remove the role if a name is not meaningful.',
      fixHint: {
        kind: 'attribute-set',
        attribute: 'aria-label',
        value: '',
        reason: 'Name the landmark, or remove the role attribute entirely.',
      },
    }));
  },

  fixtures: [
    { name: 'nav-no-name', expect: 'finding' },
    { name: 'nav-with-label', expect: 'no-finding' },
    { name: 'nav-with-labelledby', expect: 'no-finding' },
    { name: 'region-no-name', expect: 'finding' },
    { name: 'search-no-name', expect: 'finding' },
    { name: 'role-button-not-landmark', expect: 'no-finding' },
  ],
});
