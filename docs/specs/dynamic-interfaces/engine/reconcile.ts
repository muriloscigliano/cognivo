/**
 * Dynamic Software Interfaces — A3: keyed/idempotent reconcile renderer.
 * Architecture: ../01-architecture.md §L3.
 *
 * The prototype renderer did replaceChildren() — a full remount that loses focus,
 * scroll, input state, and causes flicker (the "feels like a page reload" failure
 * the review flagged). A3 reconciles by STABLE id: when data changes and the
 * template re-resolves, only the nodes that actually changed are touched. Same
 * id + type → update props in place; new id → create; gone id → remove. This is
 * what makes "morph in place, no flicker" possible and keeps the LLM out of the
 * data-change path.
 *
 * Reconciliation is tested against the dependency-free RenderEl/RenderDoc seam
 * (from render.ts) so the keyed-diff logic — the part that can be wrong — is
 * verified without a DOM. The browser uses the same logic over real elements.
 */

import { type ComponentRegistry } from './governance.js';
import { type RenderNode } from './template-resolver.js';
import { type RenderEl, type RenderDoc, makeFakeDoc } from './render.js';

/** A managed element: the real/fake element + the RenderNode it represents. */
interface Managed {
  el: RenderEl;
  node: RenderNode;
  children: Map<string, Managed>; // by stable id
}

export interface Reconciler {
  /** Reconcile the container's subtree to match `tree`. Returns ops performed. */
  render(tree: RenderNode): ReconcileStats;
}

export interface ReconcileStats {
  created: number;
  updated: number;
  removed: number;
  reused: number;
}

/**
 * Create a reconciler bound to a root managed element. `mount(el)` attaches the
 * root element to wherever it belongs (DOM container, or a fake holder in tests).
 */
export function createReconciler(
  registry: ComponentRegistry,
  doc: RenderDoc,
  mount: (rootEl: RenderEl) => void,
): Reconciler {
  let current: Managed | null = null;

  function create(node: RenderNode, stats: ReconcileStats): Managed | null {
    const tag = node.type === 'Group' ? 'cg-stack' : registry.getTagName(node.type);
    if (!tag) return null; // governance guarantees known types; defensive
    const el = doc.createElement(tag);
    // Stamp the stable id so a FLIP layer (W1) can key animations to it.
    el.setAttribute('data-flip-id', node.id);
    applyProps(el, node);
    stats.created++;
    const children = new Map<string, Managed>();
    for (const child of node.children) {
      const m = create(child, stats);
      if (m) {
        el.appendChild(m.el);
        children.set(child.id, m);
      }
    }
    return { el, node, children };
  }

  function applyProps(el: RenderEl, node: RenderNode): void {
    for (const [k, v] of Object.entries(node.props)) {
      el.props[k] = v;
      if (v !== null && v !== undefined && typeof v !== 'object') el.setAttribute(k, String(v));
    }
  }

  function diffProps(el: RenderEl, prev: RenderNode, next: RenderNode, stats: ReconcileStats): void {
    let changed = false;
    // update/add
    for (const [k, v] of Object.entries(next.props)) {
      if (prev.props[k] !== v) {
        el.props[k] = v;
        if (v !== null && v !== undefined && typeof v !== 'object') el.setAttribute(k, String(v));
        changed = true;
      }
    }
    // remove props no longer present
    for (const k of Object.keys(prev.props)) {
      if (!(k in next.props)) {
        delete el.props[k];
        delete el.attributes[k];
        changed = true;
      }
    }
    if (changed) stats.updated++;
    else stats.reused++;
  }

  /** Reconcile a managed node in place to match `next` (same id assumed). */
  function update(managed: Managed, next: RenderNode, stats: ReconcileStats): Managed {
    // Same id but different type → replace wholesale.
    if (managed.node.type !== next.type) {
      const created = create(next, stats);
      return created ?? managed;
    }
    diffProps(managed.el, managed.node, next, stats);

    // Keyed child reconcile by stable id.
    const nextChildren = new Map<string, Managed>();
    const newChildEls: RenderEl[] = [];
    for (const childNode of next.children) {
      const existing = managed.children.get(childNode.id);
      if (existing) {
        const updated = update(existing, childNode, stats);
        nextChildren.set(childNode.id, updated);
        newChildEls.push(updated.el);
      } else {
        const created = create(childNode, stats);
        if (created) {
          nextChildren.set(childNode.id, created);
          newChildEls.push(created.el);
        }
      }
    }
    // Removed children: any in old not in new.
    for (const [id] of managed.children) {
      if (!nextChildren.has(id)) stats.removed++;
    }
    // Re-seat children in the new order (stable els are reused, not recreated).
    managed.el.children = newChildEls;
    return { el: managed.el, node: next, children: nextChildren };
  }

  return {
    render(tree: RenderNode): ReconcileStats {
      const stats: ReconcileStats = { created: 0, updated: 0, removed: 0, reused: 0 };
      if (!current || current.node.type !== tree.type || current.node.id !== tree.id) {
        const created = create(tree, stats);
        current = created;
        if (created) mount(created.el);
      } else {
        current = update(current, tree, stats);
      }
      return stats;
    },
  };
}

/** Convenience for tests: a reconciler over a fake doc with a captured root. */
export function createTestReconciler(registry: ComponentRegistry): {
  reconciler: Reconciler;
  getRoot: () => RenderEl | null;
} {
  let root: RenderEl | null = null;
  const reconciler = createReconciler(registry, makeFakeDoc(), (el) => {
    root = el;
  });
  return { reconciler, getRoot: () => root };
}
