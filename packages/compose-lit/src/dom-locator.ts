/**
 * @cognivo/compose-lit — Map ElementNode paths to rendered DOM elements.
 *
 * After `LitRenderer` builds the DOM, we walk the node tree and the DOM in
 * lockstep — using the SAME child ordering `childSlots` defines — and stamp each
 * element with `data-compose-path`. The ghost overlay then finds any node by path
 * with a single querySelector. This is the bridge that lets the framework-agnostic
 * diff (paths through props) address concrete Lit elements.
 *
 * The lockstep walk mirrors exactly how `LitRenderer.setProps` appends children:
 *   1. `props.children[]` → appended in order as real child elements,
 *   2. a single nested ElementNode prop → appended with `slot=key`,
 *   3. an array-of-ElementNodes prop → appended in order as real child elements.
 * Shimmer overlays (`[data-partial-indicator]`) are skipped, matching the
 * renderer's own reconciliation filter.
 */

import type { ElementNode } from '@cognivo/gen-ui';
import { childSlots, formatPath } from '@cognivo/compose';
import type { NodePath } from '@cognivo/compose';

const PATH_ATTR = 'data-compose-path';

/**
 * Escape a string for use inside a CSS attribute-selector value. Uses the native
 * `CSS.escape` when present, else a minimal fallback (jsdom and older runtimes may
 * not expose it). Our values are path strings and prop keys, so escaping quotes
 * and backslashes is sufficient.
 */
function cssEscape(value: string): string {
  if (typeof CSS !== 'undefined' && typeof CSS.escape === 'function') return CSS.escape(value);
  return value.replace(/["\\]/g, '\\$&');
}

/** The renderer wraps the root in a trust div; the root element is its first child. */
export function rootElementOf(container: HTMLElement): HTMLElement | null {
  const wrapper = container.querySelector(':scope > [data-ai-generated]');
  const root = (wrapper ?? container).querySelector(':scope > *:not([data-partial-indicator])');
  return root instanceof HTMLElement ? root : null;
}

/**
 * The real (non-slotted, non-shimmer) child elements of `el`, in DOM order —
 * i.e. the elements the renderer created from `children[]` and array props.
 */
function realChildren(el: HTMLElement): HTMLElement[] {
  return Array.from(el.children).filter(
    (c): c is HTMLElement =>
      c instanceof HTMLElement && !c.hasAttribute('data-partial-indicator') && !c.slot,
  );
}

/** Find a slotted child element by its slot name. */
function slottedChild(el: HTMLElement, key: string): HTMLElement | null {
  const found = el.querySelector(`:scope > [slot="${cssEscape(key)}"]`);
  return found instanceof HTMLElement ? found : null;
}

/**
 * Stamp every element in the rendered tree with its NodePath, walking the node
 * tree and DOM together. Returns a Map from formatted path → element for callers
 * that prefer a lookup table over attribute queries.
 */
export function stampPaths(root: ElementNode, rootEl: HTMLElement): Map<string, HTMLElement> {
  const index = new Map<string, HTMLElement>();

  const recurse = (node: ElementNode, el: HTMLElement, path: NodePath): void => {
    const key = formatPath(path);
    el.setAttribute(PATH_ATTR, key);
    index.set(key, el);

    // Real children are consumed positionally in the same order childSlots yields
    // the 'children'/'array' kinds; slots are matched by name.
    const domReal = realChildren(el);
    let realCursor = 0;

    for (const slot of childSlots(node)) {
      const childPath: NodePath = [...path, { key: slot.key, kind: slot.kind, index: slot.index }];
      if (slot.kind === 'slot') {
        const childEl = slottedChild(el, slot.key);
        if (childEl) recurse(slot.node, childEl, childPath);
      } else {
        const childEl = domReal[realCursor];
        realCursor += 1;
        if (childEl) recurse(slot.node, childEl, childPath);
      }
    }
  };

  recurse(root, rootEl, []);
  return index;
}

/** Look up a stamped element by its NodePath within a container. */
export function elementAtPath(container: HTMLElement, path: NodePath): HTMLElement | null {
  const key = formatPath(path);
  const found = container.querySelector(`[${PATH_ATTR}="${cssEscape(key)}"]`);
  return found instanceof HTMLElement ? found : null;
}

export { PATH_ATTR, cssEscape };
