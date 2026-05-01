import { defineRule } from '@cognivo/lens-core';
import { findScarcityClaims } from '../../internal/scarcity-patterns.js';

export const RULE_ID = 'ethics/dark-pattern/scarcity-claim';

const TEXT_ONLY_TAGS = new Set(['code', 'pre', 'style', 'script', 'noscript']);

/**
 * Why this rule exists:
 * Scarcity messaging ("Only 3 left!", "12 people bought today!", "Selling
 * fast") manufactures purchase pressure. The claims are often unverified
 * or auto-generated regardless of actual stock — a deceptive pattern when
 * the underlying numbers aren't real.
 *
 * v0.1 detection is text-pattern only: if a visible node carries a phrase
 * matching one of the curated scarcity patterns, fire as advisory.
 * Confidence stays at 65 because the rule cannot verify whether the claim
 * is accurate — the dark pattern is the *unverifiable* assertion, not the
 * fact of having low stock per se.
 */
export default defineRule({
  id: RULE_ID,
  title: 'Unverifiable scarcity / urgency claim',
  category: 'persuasive-integrity',
  severity: 'consider',
  intentScope: [],
  cost: 'cheap',
  citations: [],
  defaultEnabled: true,
  fixCategory: 'judgment',

  applies: () => true,

  detect: ({ scene }) => {
    const offenders: Array<{ nodeId: string; matched: string; label: string }> = [];
    const seen = new Set<string>();
    for (const node of scene.find('*')) {
      if (TEXT_ONLY_TAGS.has(node.tag)) continue;
      if (!node.visible) continue;
      // Only the *direct* text on a leaf node — composite ancestors carry
      // their descendants' text via textContent and would double-flag.
      // Heuristic: skip nodes that have element children with text.
      if (node.children.length > 0) continue;
      const text = node.text;
      if (!text) continue;
      const matches = findScarcityClaims(text);
      if (matches.length === 0) continue;
      const dedupKey = `${node.id}|${matches[0]!.text}`;
      if (seen.has(dedupKey)) continue;
      seen.add(dedupKey);
      offenders.push({ nodeId: node.id, matched: matches[0]!.text, label: matches[0]!.label });
    }
    if (offenders.length === 0) return undefined;
    return offenders.map(({ nodeId, matched, label }) => ({
      targetNodeId: nodeId,
      confidence: 65,
      message: `Scarcity claim ("${matched}") — verify the underlying number is real.`,
      why:
        'Scarcity / urgency messaging like "Only N left" or "X people bought today" creates ' +
        'pressure to buy. When the numbers are auto-generated rather than tied to real stock or ' +
        'real activity, this is a dark pattern. Cite a verifiable source or remove the claim.',
      fixHint: {
        kind: 'copy-edit',
        original: matched,
        suggestion: '(remove unless backed by real data)',
        reason: `Scarcity pattern "${label}" needs a verifiable source.`,
      },
    }));
  },

  fixtures: [
    { name: 'only-N-left', expect: 'finding' },
    { name: 'social-pressure', expect: 'finding' },
    { name: 'selling-fast', expect: 'finding' },
    { name: 'limited-time', expect: 'finding' },
    { name: 'time-discount', expect: 'finding' },
    { name: 'neutral-copy', expect: 'no-finding' },
    { name: 'out-of-stock', expect: 'no-finding' },
  ],
});
