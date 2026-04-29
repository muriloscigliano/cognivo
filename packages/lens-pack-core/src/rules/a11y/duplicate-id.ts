import { defineRule } from '@cognivo/lens-core';

export const RULE_ID = 'core/a11y/duplicate-id';

/**
 * Why this rule exists:
 * Duplicate ids break aria-labelledby / aria-describedby / aria-controls /
 * aria-owns references — the assistive tech follows the *first* match, so
 * later references silently target the wrong element. They also poison
 * `<label for>` matching. This rule emits one finding per offending node so
 * each duplicate can be highlighted independently in the overlay.
 */
export default defineRule({
  id: RULE_ID,
  title: 'Duplicate id attribute',
  category: 'accessibility',
  severity: 'strong',
  intentScope: [],
  cost: 'cheap',
  citations: ['wcag/2.1/SC4.1.1'],
  defaultEnabled: true,
  fixCategory: 'codeable',

  applies: () => true,

  detect: ({ scene }) => {
    const buckets = new Map<string, string[]>();
    for (const node of scene.find('*[id]')) {
      const id = node.attributes['id'];
      if (id === undefined || id === '') continue;
      const list = buckets.get(id) ?? [];
      list.push(node.id);
      buckets.set(id, list);
    }

    const offenders: Array<{ idValue: string; nodeId: string }> = [];
    for (const [idValue, nodeIds] of buckets) {
      if (nodeIds.length > 1) {
        for (const nodeId of nodeIds) offenders.push({ idValue, nodeId });
      }
    }

    if (offenders.length === 0) return undefined;
    return offenders.map((o) => ({
      targetNodeId: o.nodeId,
      confidence: 100,
      message: `id="${o.idValue}" appears on more than one element.`,
      why:
        'aria-labelledby, aria-controls, and <label for=> follow only the first match. Duplicate ids ' +
        'silently send later references to the wrong element. Make every id unique within the document.',
      fixHint: {
        kind: 'attribute-set',
        attribute: 'id',
        value: '',
        reason: 'Rename one of the duplicate ids to something unique.',
      },
    }));
  },

  fixtures: [
    { name: 'two-same-id', expect: 'finding' },
    { name: 'three-same-id', expect: 'finding' },
    { name: 'unique-ids', expect: 'no-finding' },
    { name: 'no-ids', expect: 'no-finding' },
    { name: 'empty-ids', expect: 'no-finding' },
  ],
});
