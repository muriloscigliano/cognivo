/**
 * Dynamic Software Interfaces — A2: the template resolver (the hot path).
 * Architecture: ../01-architecture.md §L3.
 *
 * Resolves a flat InterfaceTemplate against a LIVE DatasetEnvelope into a
 * concrete render tree:
 *   1. expand `repeats` once per collection item (no inlined rows),
 *   2. resolve every FieldBinding to a live value (fabrication impossible —
 *      values come ONLY from the dataset; an undeclared binding is rejected),
 *   3. produce a plain render tree the renderer (A3) reconciles by stable id.
 *
 * THE POINT: this runs on every data change with NO LLM call. The template is
 * generated once; this re-renders it deterministically forever.
 */

import {
  type DatasetEnvelope,
  type GovernanceRejection,
  isFieldBinding,
  isLiteralValue,
  hasField,
} from './contracts.js';
import { type InterfaceTemplate, type TemplateNode } from './template.js';

/** A resolved render node: bindings replaced by live values, children inlined. */
export interface RenderNode {
  /** Stable id, suffixed with the repeat index when inside a repeat (#0, #1…). */
  id: string;
  type: string;
  props: Record<string, unknown>;
  children: RenderNode[];
}

export interface ResolveTemplateResult {
  /** The render tree, or null if any rejection occurred (fail-closed). */
  root: RenderNode | null;
  rejections: GovernanceRejection[];
}

/** Per-item scope when resolving inside a repeat: the `as` key → the item. */
type Scope = { itemAlias?: string; item?: Record<string, unknown>; index?: number };

function resolveValue(
  value: unknown,
  env: DatasetEnvelope,
  scope: Scope,
  rejections: GovernanceRejection[],
  where: string,
): unknown {
  if (isLiteralValue(value)) return value.value;
  if (isFieldBinding(value)) {
    // Inside a repeat, a binding to the repeat alias reads the current item's field.
    if (scope.itemAlias && value.key.startsWith(`${scope.itemAlias}.`)) {
      const fieldKey = value.key.slice(scope.itemAlias.length + 1);
      if (!hasField(env, fieldKey)) {
        rejections.push({ code: 'undeclared-field', message: `Repeat binding "${value.key}" references undeclared field "${fieldKey}".`, where });
        return undefined;
      }
      return scope.item ? scope.item[fieldKey] : undefined;
    }
    // Top-level binding to a declared field.
    if (!hasField(env, value.key)) {
      rejections.push({ code: 'undeclared-field', message: `Binding references undeclared field "${value.key}".`, where });
      return undefined;
    }
    // A non-repeat binding to a scalar field resolves to the first item's value
    // (header/summary contexts); collections are handled by repeats.
    const first = env.items[0] as Record<string, unknown> | undefined;
    return first ? first[value.key] : undefined;
  }
  return value; // already a plain value (shouldn't happen — props are BoundValue)
}

function resolveNode(
  nodeId: string,
  template: InterfaceTemplate,
  env: DatasetEnvelope,
  scope: Scope,
  rejections: GovernanceRejection[],
  idSuffix: string,
): RenderNode | null {
  const node = template.nodes[nodeId];
  if (!node) {
    rejections.push({ code: 'parse', message: `Template node "${nodeId}" not found.`, where: nodeId });
    return null;
  }

  // A repeat host expands once per item in its collection.
  const repeat = template.repeats?.[nodeId];
  if (repeat && !scope.itemAlias) {
    // `over` names the envelope's item COLLECTION, not a per-row field. The
    // canonical name is "items"; a vendor may also declare it as a field marker.
    // Either is valid — what a repeat iterates is always env.items.
    if (repeat.over.key !== 'items' && !hasField(env, repeat.over.key)) {
      rejections.push({ code: 'undeclared-field', message: `Repeat collection "${repeat.over.key}" is not a known collection (use "items").`, where: nodeId });
      return null;
    }
    // The collection is the dataset items (repeat.over names the item set).
    const items = env.items as Array<Record<string, unknown>>;
    const expanded: RenderNode[] = [];
    items.forEach((item, i) => {
      const child = resolveNode(
        nodeId,
        template,
        env,
        { itemAlias: repeat.as, item, index: i },
        rejections,
        `${idSuffix}#${i}`,
      );
      if (child) expanded.push(child);
    });
    // Wrap expansions in a synthetic group so the host's position is preserved.
    return { id: `${node.id}${idSuffix}`, type: 'Group', props: {}, children: expanded };
  }

  const props: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(node.props)) {
    props[k] = resolveValue(v, env, scope, rejections, `${node.id}.${k}`);
  }

  const children: RenderNode[] = [];
  for (const childId of node.children ?? []) {
    const c = resolveNode(childId, template, env, scope, rejections, idSuffix);
    if (c) children.push(c);
  }

  return { id: `${node.id}${idSuffix}`, type: node.type, props, children };
}

/**
 * Resolve a template against live data. Fail-closed: any undeclared binding →
 * root null + rejection. No LLM involved — safe to call on every data change.
 */
export function resolveTemplate(template: InterfaceTemplate, env: DatasetEnvelope): ResolveTemplateResult {
  const rejections: GovernanceRejection[] = [];
  const root = resolveNode(template.root, template, env, {}, rejections, '');
  return { root: rejections.length === 0 ? root : null, rejections };
}
