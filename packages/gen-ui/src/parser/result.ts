/**
 * Parse result builders.
 *
 * Shared utilities for constructing ParseResult objects
 * from resolved symbol tables.
 */

import type { ASTNode } from './ast.js';
import { resolveNode } from './resolver.js';
import { mapNode } from './mapper.js';
import type { ParseResult, ParamMap } from '../types.js';

/**
 * Create an empty ParseResult.
 */
export function emptyResult(incomplete = true): ParseResult {
  return {
    root: null,
    meta: {
      incomplete,
      unresolved: [],
      statementCount: 0,
      validationErrors: [],
      tokenViolations: [],
    },
  };
}

/**
 * Build a ParseResult from a symbol table.
 *
 * @param syms          - Resolved symbol table (id → AST node)
 * @param firstId       - The first statement id (used as root)
 * @param wasIncomplete - Whether the input was auto-closed
 * @param stmtCount     - Total statement count
 * @param cat           - Optional param map for positional→named mapping
 */
export function buildResult(
  syms: Map<string, ASTNode>,
  firstId: string,
  wasIncomplete: boolean,
  stmtCount: number,
  cat: ParamMap | undefined,
): ParseResult {
  if (!syms.has(firstId)) return emptyResult(wasIncomplete);

  const unres: string[] = [];
  const resolved = resolveNode(syms.get(firstId)!, syms, unres, new Set());
  const errors: ParseResult['meta']['validationErrors'] = [];
  const root = mapNode(resolved, wasIncomplete, errors, cat);

  return {
    root,
    meta: {
      incomplete: wasIncomplete,
      unresolved: unres,
      statementCount: stmtCount,
      validationErrors: errors,
      tokenViolations: [],
    },
  };
}
