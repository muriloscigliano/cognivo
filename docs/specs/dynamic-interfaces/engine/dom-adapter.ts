/**
 * Dynamic Software Interfaces — A4: real-DOM adapter for the reconciler.
 * Architecture: ../01-architecture.md §L3.
 *
 * The reconciler (A3) works against the RenderEl/RenderDoc seam so its keyed-diff
 * logic is testable without a DOM. This adapter backs that seam with REAL DOM
 * elements: each RenderEl proxies appendChild / setAttribute / property sets to
 * an actual HTMLElement, and the `children` array setter re-seats real DOM nodes
 * in order (preserving the nodes themselves — that's the no-flicker guarantee).
 *
 * Browser-only (touches document). Pure logic stays in reconcile.ts.
 */

import { type RenderEl, type RenderDoc } from './render.js';

interface DomBackedEl extends RenderEl {
  /** The real DOM node this proxies. */
  readonly _dom: HTMLElement;
}

export function createDomDoc(): RenderDoc {
  function wrap(dom: HTMLElement): DomBackedEl {
    const childList: DomBackedEl[] = [];
    const el: DomBackedEl = {
      _dom: dom,
      tagName: dom.tagName.toLowerCase(),
      attributes: {},
      props: {},
      get children() {
        return childList;
      },
      set children(next: RenderEl[]) {
        // Re-seat real DOM nodes in the new order WITHOUT recreating them — this
        // is what preserves element identity / focus / scroll (no flicker).
        const typed = next as DomBackedEl[];
        childList.length = 0;
        childList.push(...typed);
        for (const child of typed) dom.appendChild(child._dom); // appendChild moves, not clones
      },
      appendChild(child: RenderEl) {
        const c = child as DomBackedEl;
        childList.push(c);
        dom.appendChild(c._dom);
      },
      setAttribute(name: string, value: string) {
        this.attributes[name] = value;
        dom.setAttribute(name, value);
        // Also set as a property so Lit components that don't reflect still update.
        try {
          (dom as unknown as Record<string, unknown>)[name] = value;
        } catch {
          /* read-only prop — attribute already set */
        }
      },
    };
    // The reconciler only ever calls appendChild/setAttribute, assigns el.props[k],
    // and re-seats el.children — all handled above. No Proxy needed.
    return el;
  }

  return {
    createElement(tag: string): RenderEl {
      return wrap(document.createElement(tag));
    },
  };
}

/** Mount a reconciler root (DomBackedEl) into a real container, replacing contents. */
export function mountInto(container: HTMLElement): (rootEl: RenderEl) => void {
  return (rootEl: RenderEl) => {
    const dom = (rootEl as DomBackedEl)._dom;
    container.replaceChildren(dom);
  };
}
