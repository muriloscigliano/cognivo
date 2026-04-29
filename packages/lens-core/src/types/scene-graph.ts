/**
 * Token usage detected on a node — produced by the Observer when reading
 * computed styles and reverse-mapping them against `@cognivo/tokens/manifest/runtime`.
 *
 * Tiers:
 *  - 0 = "off-grid" — value matches no known Cognivo token
 *  - 1 = primitive / palette / brand
 *  - 2 = semantic
 *  - 3 = component-scoped
 */
export interface TokenUsage {
  tier: 0 | 1 | 2 | 3;
  /** CSS property name (e.g. `color`, `padding-top`). */
  property: string;
  /** Computed value normalized to canonical form (e.g. `rgb(113, 113, 122)`, `8px`). */
  rawValue: string;
  /** Best-matching token name (lowest tier, longest name). Undefined when tier is 0. */
  resolvedToken?: string;
  /** All matching token names — lowest tier first within the bucket. Empty when tier is 0. */
  candidates: string[];
}

/**
 * A bounding rect in *page* coordinates (cross-shadow-aware).
 * Plain object so SceneGraph is structured-cloneable for postMessage.
 */
export interface PageRect {
  x: number;
  y: number;
  width: number;
  height: number;
  top: number;
  left: number;
  right: number;
  bottom: number;
}

/**
 * Component-manifest reference — carried alongside Cognivo `cg-*` / `ai-*` nodes.
 * Engaged-bias IDs come from the component package's manifest at scan time.
 */
export interface ComponentManifestRef {
  tagName: string;
  engagedBiasIds: string[];
  variant?: string;
  state?: string;
}

/**
 * One node of the scene graph. Identified by stable hash so re-scans dedup correctly.
 * SceneNodes are *snapshots* — never live DOM references. Safe to postMessage.
 */
export interface SceneNode {
  /** Stable hash; same node across re-scans returns same id when shape is unchanged. */
  id: string;
  /** Lowercase tag name. */
  tag: string;
  /** All HTML attributes (lowercase keys) except `role`, which lives at top level. */
  attributes: Record<string, string>;
  /** Resolved ARIA role, if any. */
  role?: string;
  /** Visible text content (truncated to 1024 chars). */
  text?: string;
  /** Bounding rect in page coordinates. */
  rect: PageRect;
  /** Subset of computed styles relevant to rules (color, font-size, padding, etc.). */
  computedStyle: Record<string, string>;
  /** Token usages detected from computed styles. */
  tokenUsage: TokenUsage[];
  /** Child node ids in document order. */
  children: string[];
  /** Parent node id, or undefined for the root. */
  parent?: string;
  /** If the node hosts a shadow root, that root's scene graph nests here. */
  shadowRoot?: SceneGraph;
  /** Component-manifest data when this is a `cg-*` / `ai-*` element. */
  componentManifest?: ComponentManifestRef;
  /** True if visible (not display:none / visibility:hidden / aria-hidden). */
  visible: boolean;
  /** True if the node hosts a *closed* shadow root we couldn't pierce. */
  hasClosedShadowRoot?: boolean;
}

/**
 * The scene graph produced by Observer.scan().
 * Nested shadow roots produce nested SceneGraphs (Spec §3.4).
 */
export interface SceneGraph {
  /** All nodes in this graph (excluding nested shadow contents — those live in node.shadowRoot.nodes). */
  nodes: SceneNode[];
  /** The root node of this graph. */
  root: SceneNode;
  /** ISO timestamp for when this snapshot was taken. */
  snapshottedAt: string;
  /** Source URL when scanning a Document. */
  url?: string;
  /** Viewport dimensions at snapshot time. */
  viewport: { width: number; height: number };
}
