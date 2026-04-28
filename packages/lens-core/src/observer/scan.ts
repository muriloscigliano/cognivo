import type { SceneGraph, SceneNode, PageRect } from '../types/scene-graph.js';
import { computeNodeId, hashText } from './node-id.js';

/**
 * Computed CSS properties the Observer extracts by default. Rules can request more
 * via `ScanOptions.computedStyleProperties`, but this set covers what the v1 rule
 * packs need (color, spacing, layout, focus state).
 */
const DEFAULT_RELEVANT_PROPERTIES = [
  'color',
  'background-color',
  'font-size',
  'font-weight',
  'font-family',
  'padding-top',
  'padding-right',
  'padding-bottom',
  'padding-left',
  'margin-top',
  'margin-right',
  'margin-bottom',
  'margin-left',
  'border-radius',
  'border-width',
  'border-color',
  'display',
  'visibility',
  'opacity',
  'position',
  'width',
  'height',
  'overflow',
  'outline',
  'outline-color',
  'outline-width',
] as const;

const DEFAULT_MAX_TEXT_LENGTH = 1024;

export interface ScanOptions {
  /** Computed CSS properties to capture. Defaults to a curated list of ~25 properties. */
  computedStyleProperties?: readonly string[];
  /** Maximum text length captured per node. Default 1024. */
  maxTextLength?: number;
  /** Whether to pierce open shadow roots. Default true. (Shadow piercing implemented in Task 14.) */
  pierceShadowDOM?: boolean;
}

interface ResolvedScanOptions {
  computedStyleProperties: readonly string[];
  maxTextLength: number;
  pierceShadowDOM: boolean;
}

/**
 * Walk a DOM tree and produce a SceneGraph snapshot.
 *
 * Accepts:
 *  - `Document` (scans `documentElement`)
 *  - `Element` (scans the element + descendants)
 *  - `ShadowRoot` (scans the shadow contents)
 *
 * The output is structured-cloneable and safe to `postMessage` to a Worker.
 */
export function scan(
  root: Document | Element | ShadowRoot,
  options?: ScanOptions
): SceneGraph {
  const opts: ResolvedScanOptions = {
    computedStyleProperties: options?.computedStyleProperties ?? DEFAULT_RELEVANT_PROPERTIES,
    maxTextLength: options?.maxTextLength ?? DEFAULT_MAX_TEXT_LENGTH,
    pierceShadowDOM: options?.pierceShadowDOM ?? true,
  };

  const rootElement = resolveRootElement(root);
  if (!rootElement) {
    throw new Error('lens-core: scan() input has no root element to walk.');
  }

  const nodes: SceneNode[] = [];
  const rootNode = walkElement(rootElement, '', undefined, nodes, opts);

  const url = extractUrl(root);
  return {
    nodes,
    root: rootNode,
    snapshottedAt: new Date().toISOString(),
    viewport: extractViewport(root),
    ...(url !== undefined && { url }),
  };
}

function resolveRootElement(root: Document | Element | ShadowRoot): Element | null {
  if (isDocumentLike(root)) return root.documentElement;
  if (isShadowRootLike(root)) {
    const children = Array.from(root.children);
    return (children.find((c) => isElementLike(c)) as Element | undefined) ?? null;
  }
  if (isElementLike(root)) return root;
  return null;
}

function walkElement(
  el: Element,
  positionPath: string,
  parentId: string | undefined,
  out: SceneNode[],
  opts: ResolvedScanOptions
): SceneNode {
  const tag = el.tagName.toLowerCase();
  const text = extractText(el, opts.maxTextLength);
  const id = computeNodeId({
    tag,
    position: positionPath,
    textHash: hashText(text),
  });

  const attributes = readAttributes(el);
  const role = attributes['role'];
  if (role !== undefined) delete attributes['role'];
  const rect = readRect(el);
  const computedStyle = readComputedStyle(el, opts.computedStyleProperties);
  const visible = isVisible(el, computedStyle);

  const node: SceneNode = {
    id,
    tag,
    attributes,
    rect,
    computedStyle,
    tokenUsage: [], // Token detection lands in a later phase.
    children: [],
    visible,
    ...(role !== undefined && { role }),
    ...(text !== undefined && { text }),
    ...(parentId !== undefined && { parent: parentId }),
  };

  out.push(node);

  const childElements = Array.from(el.children).filter((c): c is Element => isElementLike(c));
  childElements.forEach((child, idx) => {
    const childPath = positionPath === '' ? `${idx}` : `${positionPath}:${idx}`;
    const childNode = walkElement(child, childPath, id, out, opts);
    node.children.push(childNode.id);
  });

  // Shadow-DOM piercing (Spec §3.4). We walk *open* shadow roots into a nested
  // SceneGraph attached at `node.shadowRoot`. Closed shadow roots are not
  // accessible from script and are not detectable from outside, so we cannot
  // produce a `cant-observe` finding without a host-supplied signal.
  if (opts.pierceShadowDOM) {
    const shadow = getOpenShadowRoot(el);
    if (shadow) {
      const nested = scanShadowRoot(shadow, positionPath, opts);
      if (nested) {
        node.shadowRoot = nested;
      }
    }
  }

  return node;
}

function scanShadowRoot(
  shadow: ShadowRoot,
  hostPath: string,
  opts: ResolvedScanOptions
): SceneGraph | undefined {
  const children = Array.from(shadow.children).filter((c): c is Element => isElementLike(c));
  if (children.length === 0) return undefined;

  const shadowNodes: SceneNode[] = [];
  const shadowBase = hostPath === '' ? 'S' : `${hostPath}:S`;

  // First top-level child becomes the SceneGraph root.
  const firstChild = children[0]!;
  const rootNode = walkElement(firstChild, shadowBase, undefined, shadowNodes, opts);

  // Additional top-level children: rare in practice but valid per Shadow DOM spec.
  for (let i = 1; i < children.length; i++) {
    walkElement(children[i]!, `${shadowBase}:${i}`, undefined, shadowNodes, opts);
  }

  return {
    nodes: shadowNodes,
    root: rootNode,
    snapshottedAt: new Date().toISOString(),
    viewport: { width: 0, height: 0 }, // shadow trees have no viewport of their own
  };
}

function getOpenShadowRoot(el: Element): ShadowRoot | null {
  if ('shadowRoot' in el) {
    const sr = (el as { shadowRoot: ShadowRoot | null }).shadowRoot;
    return sr ?? null;
  }
  return null;
}

function readAttributes(el: Element): Record<string, string> {
  const out: Record<string, string> = {};
  const attrs = el.attributes;
  // attrs is a NamedNodeMap; iterate by index for cross-env compatibility.
  for (let i = 0; i < attrs.length; i++) {
    const attr = attrs.item(i);
    if (attr) out[attr.name.toLowerCase()] = attr.value;
  }
  return out;
}

function extractText(el: Element, maxLength: number): string | undefined {
  const raw = el.textContent;
  if (!raw) return undefined;
  const trimmed = raw.trim();
  if (!trimmed) return undefined;
  return trimmed.length > maxLength ? trimmed.slice(0, maxLength) : trimmed;
}

function readRect(el: Element): PageRect {
  // getBoundingClientRect() returns *viewport* coordinates and works correctly across
  // shadow boundaries (the browser/jsdom layout engine handles the math). We add
  // window scroll offsets to produce *page* coordinates so the overlay can draw
  // accurately regardless of the host page's scroll position.
  const r = el.getBoundingClientRect();
  const view = el.ownerDocument?.defaultView;
  const scrollX = view?.scrollX ?? 0;
  const scrollY = view?.scrollY ?? 0;
  return {
    x: r.x + scrollX,
    y: r.y + scrollY,
    width: r.width,
    height: r.height,
    top: r.top + scrollY,
    left: r.left + scrollX,
    right: r.right + scrollX,
    bottom: r.bottom + scrollY,
  };
}

function readComputedStyle(
  el: Element,
  properties: readonly string[]
): Record<string, string> {
  const view = el.ownerDocument?.defaultView;
  if (!view) return {};
  const styles = view.getComputedStyle(el);
  const out: Record<string, string> = {};
  for (const prop of properties) {
    const value = styles.getPropertyValue(prop);
    if (value) out[prop] = value;
  }
  return out;
}

function isVisible(el: Element, computedStyle: Record<string, string>): boolean {
  if (computedStyle['display'] === 'none') return false;
  if (computedStyle['visibility'] === 'hidden') return false;
  if (computedStyle['opacity'] === '0') return false;
  if (el.getAttribute('aria-hidden') === 'true') return false;
  return true;
}

function extractUrl(root: Document | Element | ShadowRoot): string | undefined {
  if (isDocumentLike(root)) return root.URL;
  return root.ownerDocument?.URL;
}

function extractViewport(root: Document | Element | ShadowRoot): { width: number; height: number } {
  const view = isDocumentLike(root)
    ? root.defaultView
    : root.ownerDocument?.defaultView;
  if (view) return { width: view.innerWidth, height: view.innerHeight };
  return { width: 0, height: 0 };
}

// --- Duck-typed guards (work across real DOM, jsdom, happy-dom) ----------------

function isDocumentLike(x: unknown): x is Document {
  return (
    typeof x === 'object' &&
    x !== null &&
    'documentElement' in x &&
    'defaultView' in x
  );
}

function isShadowRootLike(x: unknown): x is ShadowRoot {
  return (
    typeof x === 'object' &&
    x !== null &&
    'host' in x &&
    'children' in x &&
    !('tagName' in x)
  );
}

function isElementLike(x: unknown): x is Element {
  return (
    typeof x === 'object' &&
    x !== null &&
    'tagName' in x &&
    'getBoundingClientRect' in x
  );
}
