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
import {
  type ReshapeManifest,
  componentSpec,
  permitsToken,
  permitsChild,
} from './reshape-manifest.js';

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
  /**
   * The vendor's composable surface (D0). When present, the gate enforces it:
   * prop names must be declared, prop values must satisfy their PropValueDomain,
   * token-valued literals must be permitted, and nesting must obey
   * allowedChildren. This is the "constrain" half of constrain-then-compose,
   * actually enforced (audit C2). When absent, the gate falls back to the
   * registry-only check (looser, for callers without a manifest).
   */
  manifest?: ReshapeManifest;
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

// ─── Manifest enforcement (audit C2 — the constrain half, actually enforced) ──

/** Validate a literal value against a PropValueDomain. Returns a reason or null. */
function checkValueDomain(
  manifest: ReshapeManifest,
  domain: import('./reshape-manifest.js').PropValueDomain,
  value: unknown,
): string | null {
  switch (domain.kind) {
    case 'string':
      if (typeof value !== 'string') return 'expected a string';
      if (domain.oneOf && !domain.oneOf.includes(value)) return `must be one of [${domain.oneOf.join(', ')}]`;
      if (domain.maxLength !== undefined && value.length > domain.maxLength) return `exceeds maxLength ${domain.maxLength}`;
      return null;
    case 'number':
      if (typeof value !== 'number') return 'expected a number';
      if (domain.integer && !Number.isInteger(value)) return 'must be an integer';
      if (domain.min !== undefined && value < domain.min) return `< min ${domain.min}`;
      if (domain.max !== undefined && value > domain.max) return `> max ${domain.max}`;
      return null;
    case 'bool':
      return typeof value === 'boolean' ? null : 'expected a boolean';
    case 'enum':
      return domain.oneOf.includes(String(value)) ? null : `must be one of [${domain.oneOf.join(', ')}]`;
    case 'token':
      return permitsToken(manifest, domain.tokenGroup, String(value)) ? null : `not a permitted "${domain.tokenGroup}" token`;
    case 'data':
      return 'a data-domain prop must be field-bound, not a literal';
  }
}

/** Enforce one node against the manifest's ComponentSpec. Pushes rejections. */
function enforceManifestNode(
  manifest: ReshapeManifest,
  node: UiNode,
  rejections: GovernanceRejection[],
): void {
  const spec = componentSpec(manifest, node.type);
  if (!spec) {
    rejections.push({ code: 'unknown-component', message: `Component "${node.type}" is not in the manifest.`, where: node.type });
    return;
  }
  const declared = new Map(spec.props.map((p) => [p.name, p]));

  for (const [name, value] of Object.entries(node.props)) {
    if (name === 'children' || name === '_args') continue; // structural, handled elsewhere
    const p = declared.get(name);
    if (!p) {
      rejections.push({ code: 'arity', message: `Prop "${name}" is not declared on "${node.type}".`, where: `${node.type}.${name}` });
      continue;
    }
    const bound = isFieldBinding(value);
    const lit = isLiteralValue(value);
    if (bound && p.source === 'literal') rejections.push({ code: 'token-violation', message: `Prop "${name}" must be a literal, not a field.`, where: `${node.type}.${name}` });
    if (lit && p.source === 'field') rejections.push({ code: 'token-violation', message: `Prop "${name}" must be field-bound, not a literal.`, where: `${node.type}.${name}` });
    if (lit) {
      const reason = checkValueDomain(manifest, p.value, (value as { value: unknown }).value);
      if (reason) rejections.push({ code: 'token-violation', message: `Prop "${node.type}.${name}": ${reason}.`, where: `${node.type}.${name}` });
    }
  }
  // required props present
  for (const p of spec.props) {
    if (p.required && !(p.name in node.props)) {
      rejections.push({ code: 'arity', message: `Required prop "${p.name}" missing on "${node.type}".`, where: `${node.type}.${p.name}` });
    }
  }
}

/** Enforce parent→child nesting against allowedChildren. */
function enforceManifestNesting(manifest: ReshapeManifest, parent: UiNode, rejections: GovernanceRejection[]): void {
  const childNodes: UiNode[] = [];
  const kids = parent.props.children;
  if (Array.isArray(kids)) for (const c of kids) if (isUiNode(c)) childNodes.push(c);
  for (const c of childNodes) {
    if (!permitsChild(manifest, parent.type, c.type)) {
      rejections.push({ code: 'unknown-component', message: `"${c.type}" is not an allowed child of "${parent.type}".`, where: `${parent.type}>${c.type}` });
    }
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

  // 1. component existence + arity + a11y + manifest enforcement (single walk)
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
    // The manifest is the gate (audit C2): props, value-domains, tokens, nesting.
    if (deps.manifest) {
      enforceManifestNode(deps.manifest, node, rejections);
      enforceManifestNesting(deps.manifest, node, rejections);
    }
  });

  // 2. token violations (injected validator)
  for (const v of deps.validateTokens(tree)) {
    rejections.push({ code: 'token-violation', message: v.message, where: v.where });
  }

  // 3. field firewall (reuse F1) — resolve ONCE; reuse the result (audit M4).
  const res = collectFieldBindings(tree).length > 0 ? resolveTree(tree, env) : null;
  if (res) rejections.push(...res.rejections);

  const ok = rejections.length === 0;
  return {
    ok,
    rejections,
    // Reuse the single resolve; if none was needed, resolve once here.
    resolved: ok ? (res ? res.resolved : resolveTree(tree, env).resolved) : null,
  };
}
