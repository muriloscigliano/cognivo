/**
 * Dynamic Software Interfaces — FIX-1: the REAL library adapter.
 *
 * This is the bridge the engine was missing. Until now the engine governed an
 * invented UiNode shape against a fake registry — a closed loop that proved
 * nothing about reality. This file connects the engine to the ACTUAL gen-ui
 * library: it converts the real parser's ElementNode tree into the engine's
 * UiNode, and exposes the real cognivoLibrary + validateTokenUsage as engine
 * deps. Governance now runs on real parser output.
 *
 * IMPORTANT HONESTY (documented, not hidden):
 *   The real gen-ui DSL has NO field-binding concept — the LLM inlines data as
 *   literal prop values (e.g. text:"Budget"), not as { kind:'field', key:'…' }.
 *   So on the real path the "field firewall" cannot be a binding check; it is a
 *   DATA-PROVENANCE check: every inlined string value must trace back to a value
 *   that actually exists in the dataset (or be a known structural literal).
 *   See dataProvenanceRejections(). This replaces the earlier overclaim with a
 *   real, testable guarantee that fits how the DSL actually works.
 */

import {
  createParser,
  cognivoLibrary,
  validateTokenUsage,
} from '../../../../packages/gen-ui/dist/index.js';
import { type DatasetEnvelope, type GovernanceRejection } from './contracts.js';
import { type UiNode } from './resolver.js';
import { type ComponentRegistry, type TokenValidator, type TokenViolation } from './governance.js';

// ─── Real ElementNode shape (from the gen-ui parser) ──────────────────────────
interface ElementNode {
  type: 'element';
  typeName: string;
  props: Record<string, unknown>;
  partial: boolean;
}

function isElementNode(v: unknown): v is ElementNode {
  return (
    typeof v === 'object' &&
    v !== null &&
    (v as { type?: unknown }).type === 'element' &&
    typeof (v as { typeName?: unknown }).typeName === 'string'
  );
}

// ─── ElementNode → engine UiNode ──────────────────────────────────────────────

/**
 * Convert a real parser ElementNode into the engine's UiNode.
 * - `typeName` becomes `type` (the engine keys components by `type`).
 * - child ElementNodes (in any prop, incl. `children` arrays) are converted
 *   recursively; plain values are passed through.
 */
export function elementToUiNode(node: ElementNode): UiNode {
  const props: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(node.props ?? {})) {
    props[k] = convertValue(v);
  }
  return { type: node.typeName, props: props as UiNode['props'] };
}

function convertValue(v: unknown): unknown {
  if (isElementNode(v)) return elementToUiNode(v);
  if (Array.isArray(v)) return v.map(convertValue);
  return v;
}

// ─── Real library as engine deps ──────────────────────────────────────────────

export const realRegistry: ComponentRegistry = {
  getTagName: (type: string) => cognivoLibrary.getTagName(type),
};

export const realTokenValidator: TokenValidator = (tree: UiNode): TokenViolation[] => {
  // validateTokenUsage expects the ElementNode shape; we govern the UiNode, but
  // token violations are about raw values in props, which survive the conversion
  // 1:1. We re-wrap minimally so the real validator sees the same prop values.
  const violations = validateTokenUsage(uiNodeToElement(tree)) as Array<{ message?: string; where?: string } | string>;
  return violations.map((v) =>
    typeof v === 'string' ? { message: v } : { message: v.message ?? JSON.stringify(v), where: v.where },
  );
};

/** Minimal inverse conversion so the real token validator can inspect prop values. */
function uiNodeToElement(node: UiNode): ElementNode {
  const props: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(node.props)) {
    props[k] = uiValueToElement(v);
  }
  return { type: 'element', typeName: node.type, props, partial: false };
}
function uiValueToElement(v: unknown): unknown {
  if (v && typeof v === 'object' && 'type' in (v as object) && typeof (v as UiNode).type === 'string' && 'props' in (v as object)) {
    return uiNodeToElement(v as UiNode);
  }
  if (Array.isArray(v)) return v.map(uiValueToElement);
  return v;
}

// ─── Parse real DSL into an engine UiNode ─────────────────────────────────────

const sharedParser = createParser(cognivoLibrary.toJSONSchema());

export interface ParsedReal {
  uiNode: UiNode | null;
  /** Parser-level problems (incomplete, unresolved refs). */
  parseRejections: GovernanceRejection[];
}

/** Parse real DSL text and convert to an engine UiNode. */
export function parseRealDsl(dsl: string): ParsedReal {
  const result = sharedParser.parse(dsl);
  const parseRejections: GovernanceRejection[] = [];
  if (!result.root || result.meta.incomplete) {
    parseRejections.push({ code: 'parse', message: 'DSL did not parse to a complete tree.' });
    return { uiNode: null, parseRejections };
  }
  return { uiNode: elementToUiNode(result.root as ElementNode), parseRejections };
}

// ─── The HONEST firewall on the real path: data provenance ────────────────────

/**
 * On the real DSL the LLM inlines data as literal strings. The firewall here
 * verifies provenance: every inlined string prop value that looks like dataset
 * content must actually appear in the dataset. A value that does not trace back
 * to the dataset (and isn't a known structural literal) is flagged — this is how
 * we catch a model fabricating data ("everyone's passwords") on the real path.
 *
 * Structural literals (layout enums like "column", "row", sizes, variants) are
 * allowed via the allowlist; everything else string-valued must be in the
 * dataset's value set.
 */
const STRUCTURAL_LITERALS = new Set([
  'column', 'row', 'row-reverse', 'column-reverse',
  'xs', 'sm', 'md', 'lg', 'xl', '2xl',
  'start', 'center', 'end', 'stretch', 'baseline', 'between', 'around', 'evenly',
  'small', 'medium', 'large', 'bold', 'normal',
  'neutral', 'info', 'success', 'warning', 'danger', 'accent', 'up', 'down',
  'single', 'range', 'multiple', 'number', 'bullet', 'image', 'plain',
]);

function datasetValueSet(env: DatasetEnvelope): Set<string> {
  const set = new Set<string>();
  for (const item of env.items) {
    for (const f of env.fields) {
      const val = (item as Record<string, unknown>)[f.key];
      if (val !== null && val !== undefined) set.add(String(val));
    }
    // also enum/label vocab
  }
  for (const f of env.fields) {
    set.add(f.label);
    for (const e of f.enumValues ?? []) set.add(e);
  }
  return set;
}

/**
 * Prop names whose value is a navigation/action target. A structural-looking
 * string in one of these is the DANGEROUS case (javascript:, path traversal,
 * fabricated mailto). These get ZERO structural bypass — the value must trace
 * to the dataset exactly, or it is rejected. (Audit C1.)
 */
const ACTION_PROP_NAMES = new Set([
  'href', 'src', 'url', 'link', 'action', 'to', 'route', 'target',
  'onclick', 'onClick', 'onclickaction', 'onClickAction', 'onsubmit', 'onSubmit', 'formaction', 'formAction',
]);

/**
 * The provenance firewall on the REAL LLM path, rebuilt allowlist-by-construction
 * (audit C1). A string prop value is allowed ONLY if it is:
 *   (a) an exact value in the dataset (datasetValueSet), OR
 *   (b) a known structural literal (layout enums, sizes, variants).
 * There is NO "short token is probably fine" escape hatch — that let
 * javascript:alert(1) and ../../etc/passwd through. Action/URL props get rule
 * (a) ONLY (no structural bypass at all), because a structural-looking string in
 * an href is exactly the exploit.
 */
export function dataProvenanceRejections(tree: UiNode, env: DatasetEnvelope): GovernanceRejection[] {
  const allowed = datasetValueSet(env);
  const rejections: GovernanceRejection[] = [];

  const checkValue = (val: unknown, where: string, propName: string): void => {
    if (typeof val !== 'string') return;
    const s = val.trim();
    if (s === '') return;
    const isAction = ACTION_PROP_NAMES.has(propName);

    if (allowed.has(s)) return; // (a) traces to real data — always fine
    if (!isAction && STRUCTURAL_LITERALS.has(s)) return; // (b) structural, non-action only

    rejections.push({
      code: 'undeclared-field',
      message: isAction
        ? `Action/URL prop "${propName}" value "${s.slice(0, 40)}" is not a dataset value — refused (no structural bypass for navigation targets).`
        : `Inlined value "${s.slice(0, 40)}" does not trace back to the dataset (possible fabricated data).`,
      where,
    });
  };

  const walk = (node: UiNode, path: string): void => {
    for (const [k, v] of Object.entries(node.props)) {
      const p = `${path}.${k}`;
      if (v && typeof v === 'object' && 'type' in (v as object) && 'props' in (v as object)) {
        walk(v as UiNode, p);
      } else if (Array.isArray(v)) {
        v.forEach((c, i) =>
          c && typeof c === 'object' && 'props' in (c as object)
            ? walk(c as UiNode, `${p}[${i}]`)
            : checkValue(c, `${p}[${i}]`, k),
        );
      } else {
        checkValue(v, p, k);
      }
    }
  };
  walk(tree, tree.type);
  return rejections;
}
