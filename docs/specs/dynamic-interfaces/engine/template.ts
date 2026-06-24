/**
 * Dynamic Software Interfaces — A1: the flat Interface Template (the core
 * future-proof data model). Architecture: ../01-architecture.md §L2.
 *
 * WHY this exists: the prototype inlined data into a nested tree — a snapshot
 * that forces an LLM regeneration whenever data changes (cost, latency, drift,
 * fabrication). The SOTA review (Google A2UI, Microsoft Adaptive Cards,
 * vercel-labs json-render) is unanimous: separate STRUCTURE from DATA via
 * bindings, over a FLAT adjacency-list with stable IDs (streaming-resilient,
 * keyed re-render). A template is generated ONCE; the runtime re-renders it
 * against live data deterministically, with no LLM in the hot path.
 *
 * Data enters props ONLY as a FieldBinding (never a literal value). This is what
 * makes the field firewall real BY CONSTRUCTION: you cannot bind a field the
 * dataset doesn't declare.
 */

import { type BoundValue, type FieldBinding, isFieldBinding, isLiteralValue } from './contracts.js';

/**
 * A node in the flat tree. Children are referenced by ID (adjacency list), NOT
 * nested inline — so streaming heals cleanly and re-render is keyed by stable ID.
 */
export interface TemplateNode {
  /** STABLE id — survives re-render, focus, and mid-stream partial parse. */
  id: string;
  /** Governed component type, e.g. "Stack", "RichRow", "Badge". */
  type: string;
  /** Every prop value is a binding or a literal — never raw inlined data. */
  props: Record<string, BoundValue>;
  /** Child node IDs (adjacency list). Resolved via the template's node map. */
  children?: string[];
}

/**
 * A repeat: render `nodeId`'s subtree once per item in a collection binding.
 * e.g. one RichRow per inbox message. The structure is authored ONCE; the
 * runtime expands it against the live collection (no N inlined rows).
 */
export interface RepeatSpec {
  /** The collection field to iterate (e.g. the dataset's items via a field). */
  over: FieldBinding;
  /** Binding key under which each item is exposed to the repeated subtree. */
  as: string;
}

export interface InterfaceTemplate {
  /** Which DatasetEnvelope this binds against. */
  schemaId: string;
  /** Root node id. */
  root: string;
  /** Flat map: id -> node. No nesting. */
  nodes: Record<string, TemplateNode>;
  /** Optional per-node repeat specs (nodeId -> repeat). */
  repeats?: Record<string, RepeatSpec>;
}

// ─── Integrity ────────────────────────────────────────────────────────────────

export interface TemplateIssue {
  nodeId: string;
  problem: string;
}

/**
 * Structural integrity of a template (independent of any dataset):
 * - root exists; every child id resolves; no cycles; ids unique by construction
 *   (it's a map); every repeat's host node exists.
 * Field-binding validity vs. a dataset is governance's job (A3), not this.
 */
export function validateTemplate(t: InterfaceTemplate): TemplateIssue[] {
  const issues: TemplateIssue[] = [];

  // Top-level shape must be safe to traverse — a malformed template (from an LLM
  // that omitted a field) is REJECTED here, never crashed on downstream.
  if (!t || typeof t !== 'object') return [{ nodeId: '(root)', problem: 'template is not an object' }];
  if (typeof t.root !== 'string' || t.root === '') issues.push({ nodeId: '(root)', problem: 'missing or invalid "root"' });
  if (!t.nodes || typeof t.nodes !== 'object') {
    issues.push({ nodeId: '(nodes)', problem: 'missing or invalid "nodes" map' });
    return issues; // can't traverse without a nodes map
  }
  if (typeof t.root === 'string' && !t.nodes[t.root]) issues.push({ nodeId: t.root, problem: 'root node not found' });

  for (const [id, node] of Object.entries(t.nodes)) {
    if (!node || typeof node !== 'object') { issues.push({ nodeId: id, problem: 'node is not an object' }); continue; }
    if (node.id !== id) issues.push({ nodeId: id, problem: `node.id "${node.id}" != map key "${id}"` });
    if (typeof node.type !== 'string' || node.type === '') issues.push({ nodeId: id, problem: 'node missing "type"' });
    if (node.props !== undefined && (typeof node.props !== 'object' || node.props === null)) issues.push({ nodeId: id, problem: 'node "props" must be an object' });
    if (node.children !== undefined && !Array.isArray(node.children)) issues.push({ nodeId: id, problem: 'node "children" must be an array of ids' });
    for (const childId of Array.isArray(node.children) ? node.children : []) {
      if (typeof childId !== 'string' || !t.nodes[childId]) issues.push({ nodeId: id, problem: `child "${String(childId)}" not found` });
    }
  }
  for (const [hostId, spec] of Object.entries(t.repeats ?? {})) {
    if (!t.nodes[hostId]) issues.push({ nodeId: hostId, problem: 'repeat host node not found' });
    if (!spec || typeof spec !== 'object' || !spec.over || typeof spec.over.key !== 'string') {
      issues.push({ nodeId: hostId, problem: 'repeat must have { over: {kind:"field",key}, as }' });
    }
  }

  // cycle detection (children form a DAG rooted at `root`)
  const visiting = new Set<string>();
  const done = new Set<string>();
  const walk = (id: string): void => {
    if (done.has(id)) return;
    if (visiting.has(id)) {
      issues.push({ nodeId: id, problem: 'cycle detected' });
      return;
    }
    visiting.add(id);
    for (const c of t.nodes[id]?.children ?? []) walk(c);
    visiting.delete(id);
    done.add(id);
  };
  if (t.nodes[t.root]) walk(t.root);

  return issues;
}

/** Every field key any binding in the template references (incl. repeats). */
export function templateFieldKeys(t: InterfaceTemplate): string[] {
  const keys = new Set<string>();
  for (const node of Object.values(t.nodes ?? {})) {
    for (const v of Object.values(node?.props ?? {})) {
      if (isFieldBinding(v)) keys.add(v.key);
    }
  }
  for (const r of Object.values(t.repeats ?? {})) {
    if (r?.over?.key) keys.add(r.over.key);
  }
  return [...keys];
}

/** Helper: build a node tersely. */
export function node(
  id: string,
  type: string,
  props: Record<string, BoundValue> = {},
  children?: string[],
): TemplateNode {
  return children ? { id, type, props, children } : { id, type, props };
}

/** Guard for callers that accept mixed values. */
export function isBoundValue(v: unknown): v is BoundValue {
  return isFieldBinding(v) || isLiteralValue(v);
}
