import type { SceneGraph, SceneNode } from '../types/scene-graph.js';
import type { SceneQuery } from '../types/rule.js';
import { walkAll } from './walk.js';

/**
 * A subset of CSS selector grammar supported by scene-query in v1.
 *
 * Supported:
 *  - Tag: `cg-button`
 *  - Attribute presence: `[disabled]`
 *  - Attribute equality: `[variant=primary]`
 *  - Multiple attributes: `cg-button[variant=primary][size=md]`
 *  - Comma-separated alternatives: `cg-button, cg-link`
 *  - Universal: `*`
 *
 * Unsupported (defer to rule code):
 *  - Combinators (descendant, child, sibling)
 *  - Pseudo-classes (`:hover`, `:visible` — use node properties directly)
 *  - Attribute operators (`*=`, `^=`, `$=`, `~=`)
 *  - Class / id selectors (`.foo`, `#bar` — query attributes instead)
 */

interface SelectorClause {
  tag: string; // '*' for universal
  attributes: Array<{ name: string; value: string | undefined }>;
}

const TAG_RE = /^([a-z*][a-z0-9-]*)/i;
const ATTR_RE = /\[([a-z_][a-z0-9_-]*)(?:=([^\]]*))?\]/gi;

function parseClause(clause: string): SelectorClause {
  const trimmed = clause.trim();
  const tagMatch = trimmed.match(TAG_RE);
  if (!tagMatch) {
    throw new Error(`lens-core: invalid selector clause: "${clause}"`);
  }
  const tag = tagMatch[1]!.toLowerCase();

  const attributes: SelectorClause['attributes'] = [];
  const attrPart = trimmed.slice(tag.length);
  ATTR_RE.lastIndex = 0;
  let m: RegExpExecArray | null;
  while ((m = ATTR_RE.exec(attrPart)) !== null) {
    const name = m[1]!.toLowerCase();
    const value = m[2];
    attributes.push({ name, value });
  }
  return { tag, attributes };
}

function parseSelector(selector: string): SelectorClause[] {
  if (!selector || !selector.trim()) {
    throw new Error('lens-core: scene-query selector cannot be empty.');
  }
  return selector.split(',').map((part) => parseClause(part));
}

function nodeMatchesClause(node: SceneNode, clause: SelectorClause): boolean {
  if (clause.tag !== '*' && node.tag !== clause.tag) return false;
  for (const attr of clause.attributes) {
    const nodeValue = readQueryableAttribute(node, attr.name);
    if (nodeValue === undefined) return false;
    if (attr.value !== undefined && nodeValue !== attr.value) return false;
  }
  return true;
}

/**
 * `scan()` lifts `role` out of `attributes` to `node.role` so it has a typed
 * resolution path. Scene-query callers naturally write `[role=button]`, so we
 * transparently look up the lifted property when they do — otherwise selectors
 * like `*[role=dialog]` would silently match nothing. Add other lifted attrs
 * here if scan() ever lifts more fields to top-level.
 */
function readQueryableAttribute(node: SceneNode, name: string): string | undefined {
  if (name === 'role') return node.role;
  return node.attributes[name];
}

/**
 * Build a SceneQuery wrapper around a SceneGraph. Findings produced by rules
 * receive this object as `ctx.scene` so they can inspect the page declaratively.
 *
 * `find()` walks shadow trees by default — Cognivo components are heavily
 * shadow-rooted, and rules need to introspect across boundaries.
 */
export function createSceneQuery(graph: SceneGraph): SceneQuery {
  return {
    raw: graph,
    find(selector: string): SceneNode[] {
      const clauses = parseSelector(selector);
      const out: SceneNode[] = [];
      for (const node of walkAll(graph)) {
        if (clauses.some((c) => nodeMatchesClause(node, c))) out.push(node);
      }
      return out;
    },
    first(selector: string): SceneNode | undefined {
      const clauses = parseSelector(selector);
      for (const node of walkAll(graph)) {
        if (clauses.some((c) => nodeMatchesClause(node, c))) return node;
      }
      return undefined;
    },
    tokenViolations: (_opts) => {
      // Returning [] would falsely tell rules "no violations" — worse than a clear error.
      // Wired in when @cognivo/tokens integration adds token-resolution to the scan pass.
      throw new Error(
        'lens-core: scene.tokenViolations() is not yet implemented. ' +
          'Gate your rule on capability detection or query node.tokenUsage directly.'
      );
    },
    contrast: (_node, _opts) => {
      // Returning {ratio:0, passes:false} would falsely fail every contrast check.
      throw new Error(
        'lens-core: scene.contrast() is not yet implemented. ' +
          'Compute contrast from node.computedStyle directly until the helper lands.'
      );
    },
  };
}
