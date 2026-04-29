import { defineRule } from '@cognivo/lens-core';

const HEADING_SELECTOR = 'h1, h2, h3, h4, h5, h6';

function levelOf(tag: string): number {
  return Number.parseInt(tag.slice(1), 10);
}

export const RULE_ID = 'core/a11y/heading-skipped-level';

/**
 * Why this rule exists:
 * Screen readers expose a hierarchical headings list; skipped levels (h1 →
 * h3) imply a missing section to the user and break document outline. The
 * rule fires only on *forward* skips greater than +1; stepping back up (h3 →
 * h2) is normal — that's leaving a subsection. The first heading on the page
 * is never flagged regardless of its level, since starting deep inside a
 * shared layout is common.
 */
export default defineRule({
  id: RULE_ID,
  title: 'Heading level skipped (e.g., h1 \u2192 h3)',
  category: 'accessibility',
  severity: 'consider',
  intentScope: [],
  cost: 'cheap',
  citations: ['wcag/2.1/SC1.3.1', 'wcag/2.1/SC2.4.10'],
  defaultEnabled: true,
  fixCategory: 'structural',

  applies: () => true,

  detect: ({ scene }) => {
    const headings = scene.find(HEADING_SELECTOR);
    if (headings.length < 2) return undefined;
    const offenders: typeof headings = [];
    let prev = 0;
    for (const h of headings) {
      const lvl = levelOf(h.tag);
      if (prev > 0 && lvl > prev + 1) offenders.push(h);
      prev = lvl;
    }
    if (offenders.length === 0) return undefined;
    return offenders.map((node) => ({
      targetNodeId: node.id,
      confidence: 80,
      message: `Heading <${node.tag}> follows a higher-level heading by more than one step.`,
      why:
        'Screen readers expose headings as a navigable outline. Skipped levels imply a missing ' +
        'section. Either restructure to use the next level, or add the intermediate heading.',
      fixHint: {
        kind: 'restructure',
        summary: 'Use the next heading level (e.g., h3 \u2192 h2) or add the missing intermediate heading.',
        reason: 'Restore the linear heading outline.',
      },
    }));
  },

  fixtures: [
    { name: 'h1-then-h3', expect: 'finding' },
    { name: 'h1-then-h2', expect: 'no-finding' },
    { name: 'only-h2', expect: 'no-finding' },
    { name: 'h2-then-h4', expect: 'finding' },
    { name: 'h3-then-h2', expect: 'no-finding' },
    { name: 'one-skip-mid-doc', expect: 'finding' },
  ],
});
