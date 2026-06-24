/**
 * Dynamic Software Interfaces — D0: the ReshapeManifest (the vendor-declared
 * composable surface — the "constrain" in constrain-then-compose).
 * Plan: ../03-frontier-plan.md (Phase D). Design: multi-agent panel.
 *
 * THE DELIVERY/ACCESS ANSWER (the essay's core open question): a vendor does not
 * ship source code or a binary — it ships a MANIFEST + the runtime. The manifest
 * is the exact menu of components, props, value-domains, tokens, AND data-ops a
 * user's coding agent may compose from. The runtime (resolve + govern + reconcile)
 * enforces it: anything not in the manifest is rejected, fail-closed. The
 * manifest is DATA, never code — there is nothing to eval.
 *
 * This unifies governance's previously-loose injected deps (a getTagName lambda,
 * a token validator, ad-hoc a11y rules) into one frozen, diffable, validated
 * artifact — the peer of DatasetEnvelope and DataManifest:
 *   DatasetEnvelope  → what DATA may be referenced
 *   DataManifest     → what DATA-OPS may run (M0)
 *   ReshapeManifest  → what UI VOCABULARY may be composed  ← THIS
 *   InterfaceTemplate→ the agent's composition over all three
 *   govern()         → the gate enforcing composition ⊆ the manifests
 */

import { type FieldType } from './contracts.js';
import { type DataManifest } from './data-op.js';

// ─── Prop value-domains (what a prop is ALLOWED to be) ────────────────────────

export type PropValueDomain =
  | { kind: 'string'; oneOf?: string[]; maxLength?: number }
  | { kind: 'number'; min?: number; max?: number; integer?: boolean }
  | { kind: 'bool' }
  | { kind: 'enum'; oneOf: string[] }
  /** Token-valued: the literal must be one of the declared tokens in tokenGroup. */
  | { kind: 'token'; tokenGroup: string }
  /** For field/either props: which dataset FieldTypes may bind here. */
  | { kind: 'data'; fieldTypes?: FieldType[] };

export interface PropSpec {
  name: string;
  /** literal | field | either — cross-checked against the emitted BoundValue. */
  source: 'literal' | 'field' | 'either';
  value: PropValueDomain;
  required?: boolean;
}

// ─── Component vocabulary ─────────────────────────────────────────────────────

export interface ComponentSpec {
  /** Component type name, e.g. "Card". Must resolve to a real tag at runtime. */
  type: string;
  props: PropSpec[];
  /** May this component hold children (a layout/container)? */
  container?: boolean;
  /** If set, children are restricted to these component types. */
  allowedChildren?: string[];
}

// ─── Token surface (the bounded set of design tokens the agent may name) ──────

export interface TokenSurface {
  /** group name -> allowed token values, e.g. { variant: ['neutral','danger'] } */
  groups: Record<string, string[]>;
}

// ─── The manifest ─────────────────────────────────────────────────────────────

export interface ReshapeManifest {
  schemaId: string;
  components: ComponentSpec[];
  tokens: TokenSurface;
  /** Optional data-layer contract (M0). Present = the agent may shape data too. */
  data?: DataManifest;
}

// ─── Integrity validation (the manifest itself is validated before use) ───────

export interface ManifestIssue {
  where: string;
  problem: string;
}

export function validateManifest(m: ReshapeManifest): ManifestIssue[] {
  const issues: ManifestIssue[] = [];
  const seenComp = new Set<string>();
  for (const c of m.components) {
    if (seenComp.has(c.type)) issues.push({ where: c.type, problem: 'duplicate component' });
    seenComp.add(c.type);
    const seenProp = new Set<string>();
    for (const p of c.props) {
      if (seenProp.has(p.name)) issues.push({ where: `${c.type}.${p.name}`, problem: 'duplicate prop' });
      seenProp.add(p.name);
      // token-valued props must reference a declared token group
      if (p.value.kind === 'token' && !m.tokens.groups[p.value.tokenGroup]) {
        issues.push({ where: `${c.type}.${p.name}`, problem: `token group "${p.value.tokenGroup}" not declared` });
      }
      // a literal-only prop binding a data domain is contradictory
      if (p.source === 'literal' && p.value.kind === 'data') {
        issues.push({ where: `${c.type}.${p.name}`, problem: 'literal prop cannot have a data value-domain' });
      }
    }
    for (const child of c.allowedChildren ?? []) {
      if (!m.components.some((x) => x.type === child)) {
        issues.push({ where: c.type, problem: `allowedChild "${child}" is not a declared component` });
      }
    }
  }
  if (m.data && m.data.schemaId !== m.schemaId) {
    issues.push({ where: 'data', problem: `data manifest schemaId "${m.data.schemaId}" != "${m.schemaId}"` });
  }
  return issues;
}

// ─── Predicates the gate consumes ─────────────────────────────────────────────

export function componentSpec(m: ReshapeManifest, type: string): ComponentSpec | undefined {
  return m.components.find((c) => c.type === type);
}

/** The component firewall predicate: is this component in the vendor's menu? */
export function permitsComponent(m: ReshapeManifest, type: string): boolean {
  return m.components.some((c) => c.type === type);
}

export function propSpec(m: ReshapeManifest, type: string, prop: string): PropSpec | undefined {
  return componentSpec(m, type)?.props.find((p) => p.name === prop);
}

/** Is `token` a permitted value within `group`? */
export function permitsToken(m: ReshapeManifest, group: string, token: string): boolean {
  return m.tokens.groups[group]?.includes(token) ?? false;
}

/** Is `child` allowed under `parent` (per allowedChildren, or unrestricted)? */
export function permitsChild(m: ReshapeManifest, parent: string, child: string): boolean {
  const c = componentSpec(m, parent);
  if (!c?.container) return false;
  return c.allowedChildren ? c.allowedChildren.includes(child) : permitsComponent(m, child);
}
