/**
 * Symbol resolution with hoisting support.
 *
 * Walks the AST replacing Ref nodes with their definitions.
 * Supports hoisting: references can appear before definitions.
 * Detects circular references and missing definitions.
 */

import type { ASTNode } from './ast.js';

/**
 * Resolve all references in an AST node.
 *
 * @param node    - The AST node to resolve
 * @param syms    - Symbol table (id → AST node)
 * @param unres   - Accumulator for unresolved reference names
 * @param visited - Cycle detection set
 */
export function resolveNode(
  node: ASTNode,
  syms: Map<string, ASTNode>,
  unres: string[],
  visited: Set<string>,
): ASTNode {
  if (node.k === 'Ref') {
    const { n } = node;
    if (visited.has(n)) { unres.push(n); return { k: 'Ph', n }; } // cycle
    if (!syms.has(n)) { unres.push(n); return { k: 'Ph', n }; }   // missing

    visited.add(n);
    const resolved = resolveNode(syms.get(n)!, syms, unres, visited);
    visited.delete(n);
    return resolved;
  }

  if (node.k === 'Comp') {
    return { ...node, args: node.args.map((a) => resolveNode(a, syms, unres, visited)) };
  }
  if (node.k === 'Arr') {
    return { ...node, els: node.els.map((e) => resolveNode(e, syms, unres, visited)) };
  }
  if (node.k === 'Obj') {
    return { ...node, entries: node.entries.map(([k, v]) => [k, resolveNode(v, syms, unres, visited)] as [string, ASTNode]) };
  }

  // Literals and placeholders pass through unchanged
  return node;
}
