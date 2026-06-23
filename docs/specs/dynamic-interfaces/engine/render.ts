/**
 * Dynamic Software Interfaces — FIX-2: render a GOVERNED tree to real components.
 *
 * Ends the "zero pixels" problem. Takes an engine UiNode that has ALREADY passed
 * governance and creates real cg-* web components in the DOM. Render is only ever
 * called on a governed tree — a rejected tree never reaches here (the gate is the
 * doorway). Browser-only (touches document); pure logic stays elsewhere.
 */

import { type UiNode } from './resolver.js';
import { type ComponentRegistry } from './governance.js';

/**
 * Minimal element interface the renderer needs — satisfied by a real DOM Element
 * AND by a tiny fake in tests. Lets us test the tree→element mapping logic
 * (the part that can be wrong) without a heavyweight DOM dependency; the real
 * browser proof comes from the playground page using the global document.
 */
export interface RenderEl {
  tagName: string;
  children: RenderEl[];
  attributes: Record<string, string>;
  props: Record<string, unknown>;
  appendChild(child: RenderEl): void;
  setAttribute(name: string, value: string): void;
}

export interface RenderDoc {
  createElement(tag: string): RenderEl;
}

/** A dependency-free document for tests (and a reference impl). */
export function makeFakeDoc(): RenderDoc {
  return {
    createElement(tag: string): RenderEl {
      const el: RenderEl = {
        tagName: tag,
        children: [],
        attributes: {},
        props: {},
        appendChild(c) { this.children.push(c); },
        setAttribute(n, v) { this.attributes[n] = v; },
      };
      return el;
    },
  };
}

/** Build the element tree for a governed UiNode (returns the root element). */
export function buildElement(
  tree: UiNode,
  registry: ComponentRegistry,
  doc: RenderDoc,
): RenderEl | null {
  return createElement(tree, registry, doc);
}

/**
 * Render a governed UiNode into a real DOM container, replacing its contents.
 * Browser entry — uses the global document. Render is only ever called on a tree
 * that already passed governance (the gate is the doorway).
 */
export function renderGoverned(tree: UiNode, container: HTMLElement, registry: ComponentRegistry): void {
  const doc: RenderDoc = { createElement: (t) => document.createElement(t) as unknown as RenderEl };
  const el = buildElement(tree, registry, doc) as unknown as Node | null;
  container.replaceChildren(el ?? document.createComment('unrenderable'));
}

function createElement(node: UiNode, registry: ComponentRegistry, doc: RenderDoc): RenderEl | null {
  const tag = registry.getTagName(node.type);
  if (!tag) return null; // governance guarantees this won't happen; defensive only
  const el = doc.createElement(tag);

  for (const [key, value] of Object.entries(node.props)) {
    if (key === 'children' && Array.isArray(value)) {
      for (const child of value) {
        if (isUiNode(child)) {
          const c = createElement(child, registry, doc);
          if (c) el.appendChild(c);
        }
      }
    } else if (isUiNode(value)) {
      const c = createElement(value, registry, doc);
      if (c) el.appendChild(c);
    } else {
      // Record as a property (Lit reflects properties) and, for primitives, an
      // attribute too. The fake element records both so tests can assert either.
      el.props[key] = value;
      if (value !== null && value !== undefined && typeof value !== 'object') {
        el.setAttribute(key, String(value));
      }
    }
  }
  return el;
}

function isUiNode(v: unknown): v is UiNode {
  return (
    typeof v === 'object' &&
    v !== null &&
    typeof (v as { type?: unknown }).type === 'string' &&
    typeof (v as { props?: unknown }).props === 'object'
  );
}
