/**
 * Dynamic Software Interfaces — F2: governance as a hard engine gate.
 *
 * Plan: ../plans/F2-governance.md.  Build principle: no shortcuts — governance
 * BLOCKS render. A tree either passes (renderable) or is rejected (NOT
 * renderable) with structured reasons. This fixes the prototype's lie #2, where
 * violations were warnings and demo glue decided whether to render.
 *
 * Decoupled by design: F2 hard-imports nothing from gen-ui. It takes a
 * ComponentRegistry + TokenValidator + a11y rules as injected deps, so it is
 * testable in isolation and not pinned to one library version. A thin adapter
 * (later) wires the real cognivoLibrary in.
 */

import {
  type DatasetEnvelope,
  type GovernanceRejection,
  isFieldBinding,
  isLiteralValue,
} from './contracts.js';
import {
  resolveTree,
  collectFieldBindings,
  type UiNode,
  type PropValue,
  type ResolvedNode,
} from './resolver.js';

// ─── Injected capabilities (the decoupling seam) ──────────────────────────────

export interface ComponentRegistry {
  /** Tag name for a component type, or undefined if unknown. */
  getTagName(type: string): string | undefined;
}

export interface TokenViolation {
  message: string;
  where?: string;
}

export type TokenValidator = (tree: UiNode) => TokenViolation[];

/** An a11y rule: returns a rejection if the node violates it, else null. */
export type A11yRule = (node: UiNode) => GovernanceRejection | null;

export interface GovernDeps {
  registry: ComponentRegistry;
  validateTokens: TokenValidator;
  a11yRules?: A11yRule[];
}

export interface GovernResult {
  ok: boolean;
  rejections: GovernanceRejection[];
  /** Non-null ONLY when ok === true (render is impossible off a failed gate). */
  resolved: ResolvedNode | null;
}

// ─── Default a11y rules (extensible; vision §5.2 — a11y as a constraint) ──────

const INTERACTIVE_TYPES = new Set(['Button', 'Checkbox', 'Link', 'Input', 'Radio', 'Toggle', 'Switch']);

function hasAccessibleName(node: UiNode): boolean {
  for (const key of ['label', 'ariaLabel', 'aria-label', 'text', 'name', 'title']) {
    const v = node.props[key];
    if (isLiteralValue(v) && String(v.value).trim() !== '') return true;
    if (isFieldBinding(v)) return true; // bound to data → has an accessible name at render
  }
  return false;
}

export const DEFAULT_A11Y_RULES: A11yRule[] = [
  (node) =>
    INTERACTIVE_TYPES.has(node.type) && !hasAccessibleName(node)
      ? {
          code: 'a11y',
          message: `Interactive component "${node.type}" has no accessible name (label/aria-label/text required).`,
          where: node.type,
        }
      : null,
];

// ─── Tree walk for component + arity + a11y checks ────────────────────────────

function isUiNode(v: unknown): v is UiNode {
  return (
    typeof v === 'object' &&
    v !== null &&
    typeof (v as { type?: unknown }).type === 'string' &&
    typeof (v as { props?: unknown }).props === 'object' &&
    !isFieldBinding(v) &&
    !isLiteralValue(v)
  );
}

function walk(node: UiNode, visit: (n: UiNode) => void): void {
  visit(node);
  for (const v of Object.values(node.props) as PropValue[]) {
    if (Array.isArray(v)) v.forEach((c) => isUiNode(c) && walk(c, visit));
    else if (isUiNode(v)) walk(v, visit);
  }
}

// ─── The gate ─────────────────────────────────────────────────────────────────

/**
 * Govern a tree. Returns ok:true + resolved only if ALL checks pass with zero
 * rejections. Collects every rejection (no early-stop) so the user sees the
 * full picture (vision §5.4).
 */
export function govern(tree: UiNode, env: DatasetEnvelope, deps: GovernDeps): GovernResult {
  const rejections: GovernanceRejection[] = [];
  const a11yRules = deps.a11yRules ?? DEFAULT_A11Y_RULES;

  // 1. component existence + arity + a11y (single walk)
  walk(tree, (node) => {
    if (!deps.registry.getTagName(node.type)) {
      rejections.push({
        code: 'unknown-component',
        message: `Unknown component "${node.type}" — not in the registry.`,
        where: node.type,
      });
    }
    if (Array.isArray((node.props as Record<string, unknown>)._args)) {
      rejections.push({
        code: 'arity',
        message: `Component "${node.type}" has unmapped positional args (wrong arity).`,
        where: node.type,
      });
    }
    for (const rule of a11yRules) {
      const r = rule(node);
      if (r) rejections.push(r);
    }
  });

  // 2. token violations (injected validator)
  for (const v of deps.validateTokens(tree)) {
    rejections.push({ code: 'token-violation', message: v.message, where: v.where });
  }

  // 3. field firewall (reuse F1; itemIndex omitted = descriptor mode, only needs validity)
  const fieldKeys = collectFieldBindings(tree);
  if (fieldKeys.length > 0) {
    const res = resolveTree(tree, env);
    rejections.push(...res.rejections);
  }

  const ok = rejections.length === 0;
  return {
    ok,
    rejections,
    resolved: ok ? resolveTree(tree, env).resolved : null,
  };
}
