import type { SceneNode } from '@cognivo/lens-core';
import { defineRule } from '@cognivo/lens-core';

export const RULE_ID = 'ethics/transparency/sponsored-without-label';

/**
 * Why this rule exists:
 * The FTC requires sponsored / native ad content to be clearly labeled. An
 * element marked sponsored in markup (`class="sponsored-*"`, `data-sponsored`,
 * etc.) but with no visible "Sponsored" / "Advertisement" / "Promoted"
 * label is a transparency failure — the user can't tell they're seeing
 * paid content.
 *
 * Detection:
 *   1. Find elements with sponsored markers in class / data attributes
 *      (strict patterns to avoid matching "padding-" / "header" etc.).
 *   2. For each, look for visible disclosure text (Sponsored / Advertisement
 *      / Promoted / Ad / Paid post / Paid partnership) within the element
 *      or one of its descendants.
 *   3. Fire when no label is found.
 */
export default defineRule({
  id: RULE_ID,
  title: 'Sponsored content lacks a visible disclosure label',
  category: 'persuasive-integrity',
  severity: 'strong',
  intentScope: [],
  cost: 'cheap',
  citations: ['ftc/native-advertising-guides'],
  defaultEnabled: true,
  fixCategory: 'codeable',

  applies: () => true,

  detect: ({ scene }) => {
    const offenders: SceneNode[] = [];
    const byId = new Map(scene.raw.nodes.map((n) => [n.id, n]));
    for (const node of scene.find('*')) {
      if (!isSponsoredMarked(node)) continue;
      if (hasDescendantDisclosure(node, byId)) continue;
      offenders.push(node);
    }
    if (offenders.length === 0) return undefined;
    return offenders.map((node) => ({
      targetNodeId: node.id,
      confidence: 90,
      message: `Element marked sponsored has no visible disclosure label.`,
      why:
        'Sponsored / native-ad content is required by the FTC to be clearly labeled so users know ' +
        'they are seeing paid content. Add a visible "Sponsored", "Advertisement", or "Promoted" ' +
        'label inside the element.',
      fixHint: {
        kind: 'attribute-set',
        attribute: 'aria-label',
        value: 'Sponsored',
        reason: 'Add a visible disclosure label inside the sponsored block.',
      },
    }));
  },

  fixtures: [
    { name: 'class-sponsored-no-label', expect: 'finding' },
    { name: 'class-ad-banner-no-label', expect: 'finding' },
    { name: 'data-sponsored-no-label', expect: 'finding' },
    { name: 'sponsored-with-label', expect: 'no-finding' },
    { name: 'ad-with-advert-label', expect: 'no-finding' },
    { name: 'plain-content', expect: 'no-finding' },
    { name: 'false-positive-padding', expect: 'no-finding' },
  ],
});

const SPONSORED_CLASS_PATTERNS: readonly RegExp[] = [
  /\bsponsored(-|\s|$)/i,
  /\bad-(banner|slot|unit|wrapper|container|content|item)/i,
  /\bpromo-(banner|slot|content|item)/i,
  /\bpromoted(-|\s|$)/i,
  /\bnative-ad/i,
];

const SPONSORED_DATA_ATTRIBUTES = ['data-sponsored', 'data-ad', 'data-promoted'];

const DISCLOSURE_TEXT_RE = /\b(sponsored|advertisement|promoted|paid post|paid partnership|^ad$|\sad\s)/i;

function isSponsoredMarked(node: SceneNode): boolean {
  const className = node.attributes['class'] ?? '';
  if (className && SPONSORED_CLASS_PATTERNS.some((p) => p.test(className))) return true;
  for (const attr of SPONSORED_DATA_ATTRIBUTES) {
    if (attr in node.attributes) return true;
  }
  return false;
}

function hasDescendantDisclosure(
  root: SceneNode,
  byId: Map<string, SceneNode>
): boolean {
  // Check the root's own text first (truncated to combined descendant text).
  if (root.text && DISCLOSURE_TEXT_RE.test(root.text)) return true;
  const stack = [...root.children];
  while (stack.length > 0) {
    const id = stack.pop()!;
    const node = byId.get(id);
    if (!node) continue;
    if (node.text && DISCLOSURE_TEXT_RE.test(node.text)) return true;
    if (node.children.length > 0) stack.push(...node.children);
  }
  return false;
}
