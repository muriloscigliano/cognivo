/**
 * @cognivo/compose — Layout grammar linter.
 *
 * `lint(tree, grammar)` walks the tree once (via the canonical traversal) and
 * returns every violation. Clean tree → empty array. The modify loop retries the
 * agent while this is non-empty (bounded), so the user only ever sees valid layouts.
 */

import type { ElementNode } from '@cognivo/gen-ui';
import type { LayoutGrammar, GrammarRule, GrammarViolation } from './types.js';
import type { NodePath } from '../tree/traversal.js';
import { walk } from '../tree/traversal.js';
import { formatPath } from '../tree/path.js';

/** Read a numeric span from a node's `span`/`cols` prop, if present. */
function readSpan(node: ElementNode): number | null {
  const raw = node.props['span'] ?? node.props['cols'] ?? node.props['columns'];
  return typeof raw === 'number' ? raw : null;
}

/** The nearest region name for a node, from its own `region` prop or an ancestor's. */
function regionForPath(root: ElementNode, path: NodePath): string | null {
  // Walk the ancestor chain from the node up to the root, first `region` prop wins.
  const chain: ElementNode[] = [root];
  let current = root;
  for (const step of path) {
    const value = current.props[step.key];
    const next = step.index === null ? value : Array.isArray(value) ? value[step.index] : undefined;
    if (next && typeof next === 'object' && (next as ElementNode).type === 'element') {
      current = next as ElementNode;
      chain.push(current);
    }
  }
  for (let i = chain.length - 1; i >= 0; i--) {
    const ancestor = chain[i];
    const r = ancestor ? ancestor.props['region'] : undefined;
    if (typeof r === 'string') return r;
  }
  return null;
}

export function lint(root: ElementNode, grammar: LayoutGrammar): GrammarViolation[] {
  const violations: GrammarViolation[] = [];
  const counts = new Map<string, number>();
  const aboveFoldNames = new Set(grammar.regions.filter((r) => r.aboveFold).map((r) => r.name));
  // Fallback: if no region is flagged aboveFold, the first declared region is it.
  if (aboveFoldNames.size === 0 && grammar.regions[0]) aboveFoldNames.add(grammar.regions[0].name);

  const byKind = <K extends GrammarRule['kind']>(kind: K) =>
    grammar.rules.filter((r): r is Extract<GrammarRule, { kind: K }> => r.kind === kind);

  const maxNesting = byKind('max-nesting')[0];

  walk(root, (node, path) => {
    counts.set(node.typeName, (counts.get(node.typeName) ?? 0) + 1);

    // max-nesting
    if (maxNesting && path.length > maxNesting.depth) {
      violations.push({
        rule: maxNesting,
        path: formatPath(path),
        message: `Nesting depth ${path.length} exceeds max ${maxNesting.depth} at ${formatPath(path)}.`,
      });
    }

    // min-span
    for (const rule of byKind('min-span')) {
      if (rule.component !== node.typeName) continue;
      const span = readSpan(node);
      if (span !== null && span < rule.cols) {
        violations.push({
          rule,
          path: formatPath(path),
          message: `${node.typeName} spans ${span} cols; needs at least ${rule.cols} at ${formatPath(path)}.`,
        });
      }
      if (span !== null && span > grammar.columns) {
        violations.push({
          rule,
          path: formatPath(path),
          message: `${node.typeName} spans ${span} cols; grid only has ${grammar.columns} at ${formatPath(path)}.`,
        });
      }
    }

    // region
    for (const rule of byKind('region')) {
      if (rule.component !== node.typeName) continue;
      const region = regionForPath(root, path);
      if (region !== null && !rule.allowedRegions.includes(region)) {
        violations.push({
          rule,
          path: formatPath(path),
          message: `${node.typeName} is in region "${region}"; allowed only in ${rule.allowedRegions.join(', ')} at ${formatPath(path)}.`,
        });
      }
    }

    // above-fold
    for (const rule of byKind('above-fold')) {
      if (rule.component !== node.typeName) continue;
      const region = regionForPath(root, path);
      if (region !== null && !aboveFoldNames.has(region)) {
        violations.push({
          rule,
          path: formatPath(path),
          message: `${node.typeName} must be above the fold; found in region "${region}" at ${formatPath(path)}.`,
        });
      }
    }
  });

  // max-instances — evaluated after the full walk.
  for (const rule of byKind('max-instances')) {
    const n = counts.get(rule.component) ?? 0;
    if (n > rule.max) {
      violations.push({
        rule,
        path: 'root',
        message: `${rule.component} appears ${n} times; max allowed is ${rule.max}.`,
      });
    }
  }

  return violations;
}
