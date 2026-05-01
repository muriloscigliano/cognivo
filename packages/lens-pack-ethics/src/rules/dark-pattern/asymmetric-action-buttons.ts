import type { SceneNode } from '@cognivo/lens-core';
import { defineRule } from '@cognivo/lens-core';
import { classifyButton } from '../../internal/button-text-patterns.js';

export const RULE_ID = 'ethics/dark-pattern/asymmetric-action-buttons';

/**
 * Why this rule exists:
 * The classic cookie-banner dark pattern: a bright "Accept all" button
 * paired with a muted/grey "Decline" button so the user's eye is steered
 * toward consent. The asymmetry is the violation — both options are
 * supposed to feel equal in weight.
 *
 * Detection: within a dialog-like container ([role=dialog] or <dialog>),
 * find a button pair where:
 *   - one button text is an accept-pattern (Accept, Allow, OK, …)
 *   - the other is a decline-pattern (Decline, Reject, No thanks, …)
 *   - their computed text-color rgb values differ noticeably (>= 60 in
 *     summed-channel distance) — a heuristic for "looks visually muted vs
 *     prominent" without needing the full contrast helper.
 *
 * v0.1 limitations (see README):
 *   - Only catches foreground (text-color) asymmetry; not background or size.
 *   - Won't fire if the page applies CSS via stylesheet rather than inline
 *     style — happy-dom in the test env reads inline style only. Real
 *     browsers see all applied styles and the rule works the same.
 *   - Confidence 70 reflects this is a heuristic — manual review still
 *     warranted.
 */
export default defineRule({
  id: RULE_ID,
  title: 'Asymmetric accept/decline action buttons',
  category: 'persuasive-integrity',
  severity: 'consider',
  intentScope: [],
  cost: 'cheap',
  citations: [],
  defaultEnabled: true,
  fixCategory: 'judgment',

  applies: () => true,

  detect: ({ scene }) => {
    const dialogs = scene.find('dialog, *[role=dialog]');
    if (dialogs.length === 0) return undefined;

    const offenders: Array<{ acceptText: string; decline: SceneNode }> = [];
    const byId = new Map(scene.raw.nodes.map((n) => [n.id, n]));

    for (const dialog of dialogs) {
      const buttons = collectDescendantButtons(dialog, byId);
      const accept = buttons.find((b) => classifyButton(b.text) === 'accept');
      const decline = buttons.find((b) => classifyButton(b.text) === 'decline');
      if (!accept || !decline) continue;
      if (!hasAsymmetricColors(accept, decline)) continue;
      offenders.push({ acceptText: accept.text ?? '', decline });
    }

    if (offenders.length === 0) return undefined;
    return offenders.map(({ acceptText, decline }) => ({
      targetNodeId: decline.id,
      confidence: 70,
      message: `"${decline.text ?? ''}" appears visually muted next to a more-prominent "${acceptText}".`,
      why:
        'Asymmetric styling between accept and decline buttons steers the user toward one option ' +
        'instead of letting them choose freely. Both options should feel equally visible. ' +
        'Match contrast levels and visual weight.',
      fixHint: {
        kind: 'restructure',
        summary: 'Match the visual weight of the decline button to the accept button.',
        reason: 'Equal visual weight prevents persuasive bias.',
      },
    }));
  },

  fixtures: [
    { name: 'cookie-banner-asymmetric', expect: 'finding' },
    { name: 'cookie-banner-symmetric', expect: 'no-finding' },
    { name: 'single-accept', expect: 'no-finding' },
    { name: 'neutral-pair', expect: 'no-finding' },
    { name: 'footer-pair', expect: 'no-finding' },
    { name: 'native-dialog', expect: 'finding' },
  ],
});

function collectDescendantButtons(
  root: SceneNode,
  byId: Map<string, SceneNode>
): SceneNode[] {
  const out: SceneNode[] = [];
  const stack = [...root.children];
  while (stack.length > 0) {
    const id = stack.pop()!;
    const node = byId.get(id);
    if (!node) continue;
    if (node.tag === 'button' || node.role === 'button') out.push(node);
    if (node.children.length > 0) stack.push(...node.children);
  }
  return out;
}

function hasAsymmetricColors(a: SceneNode, b: SceneNode): boolean {
  const ca = parseRgbSum(a.computedStyle['color']);
  const cb = parseRgbSum(b.computedStyle['color']);
  if (ca === null || cb === null) return false;
  return Math.abs(ca - cb) >= 60;
}

function parseRgbSum(value: string | undefined): number | null {
  if (!value) return null;
  const m = /^rgba?\(\s*(\d+)\s*[,\s]\s*(\d+)\s*[,\s]\s*(\d+)/.exec(value);
  if (!m) return null;
  return parseInt(m[1]!, 10) + parseInt(m[2]!, 10) + parseInt(m[3]!, 10);
}
