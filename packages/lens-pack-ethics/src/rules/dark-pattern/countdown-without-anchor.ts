import type { SceneNode } from '@cognivo/lens-core';
import { defineRule } from '@cognivo/lens-core';

export const RULE_ID = 'ethics/dark-pattern/countdown-without-anchor';

/**
 * Why this rule exists:
 * Countdown timers manufacture urgency. The HTML spec provides `<time
 * datetime="…">` for declaring a deadline; legitimate sale timers should
 * use it (or a `data-deadline` attribute) so the deadline is real and
 * verifiable. A bare HH:MM:SS / MM:SS countdown text with no such anchor
 * is almost always a fake-urgency dark pattern — the timer "resets" on
 * page reload, the sale never actually ends.
 *
 * Detection:
 *  - Visible text matches `\d{1,2}:\d{2}(:\d{2})?` (countdown shape)
 *  - Skip if accompanied by AM/PM (clock time, not a countdown)
 *  - Skip if any ancestor has `<time datetime>` or `[data-deadline]`
 */
export default defineRule({
  id: RULE_ID,
  title: 'Countdown timer with no deadline anchor',
  category: 'persuasive-integrity',
  severity: 'consider',
  intentScope: [],
  cost: 'cheap',
  citations: [],
  defaultEnabled: true,
  fixCategory: 'codeable',

  applies: () => true,

  detect: ({ scene }) => {
    const offenders: Array<{ nodeId: string; matched: string }> = [];
    const byId = new Map(scene.raw.nodes.map((n) => [n.id, n]));
    for (const node of scene.find('*')) {
      if (!node.visible) continue;
      if (node.children.length > 0) continue;
      const text = node.text;
      if (!text) continue;
      const m = COUNTDOWN_RE.exec(text);
      if (!m) continue;
      // Skip clock times — "09:00 AM" / "17:00 PM" are clocks, not countdowns.
      if (CLOCK_AMPM_RE.test(text)) continue;
      // Skip if anchored to a real deadline.
      if (hasDeadlineAnchor(node, byId)) continue;
      offenders.push({ nodeId: node.id, matched: m[0] });
    }
    if (offenders.length === 0) return undefined;
    return offenders.map(({ nodeId, matched }) => ({
      targetNodeId: nodeId,
      confidence: 70,
      message: `Countdown "${matched}" has no <time datetime> or data-deadline ancestor.`,
      why:
        'Real deadlines should declare themselves via <time datetime="…"> or a data-deadline ' +
        'attribute. A bare HH:MM:SS / MM:SS without an anchor strongly suggests a fake-urgency ' +
        'timer — one that resets on reload regardless of the actual deadline.',
      fixHint: {
        kind: 'restructure',
        summary:
          'Wrap the countdown in <time datetime="…"> with the actual deadline timestamp, ' +
          'or add data-deadline to a parent.',
        reason: 'Real deadlines are auditable; fake ones are not.',
      },
    }));
  },

  fixtures: [
    { name: 'hms-no-anchor', expect: 'finding' },
    { name: 'ms-no-anchor', expect: 'finding' },
    { name: 'hms-with-time-anchor', expect: 'no-finding' },
    { name: 'hms-with-data-deadline', expect: 'no-finding' },
    { name: 'clock-am-pm', expect: 'no-finding' },
    { name: 'neutral', expect: 'no-finding' },
  ],
});

const COUNTDOWN_RE = /\b\d{1,2}:\d{2}(:\d{2})?\b/;
const CLOCK_AMPM_RE = /\b(am|pm|a\.m\.|p\.m\.)\b/i;

function hasDeadlineAnchor(node: SceneNode, byId: Map<string, SceneNode>): boolean {
  let cur: SceneNode | undefined = node;
  let depth = 0;
  while (cur && depth < 10) {
    if (cur.tag === 'time' && cur.attributes['datetime'] !== undefined) return true;
    if (cur.attributes['data-deadline'] !== undefined) return true;
    if (cur.parent === undefined) return false;
    cur = byId.get(cur.parent);
    depth++;
  }
  return false;
}
