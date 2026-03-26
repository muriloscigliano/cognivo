/**
 * AST → ElementNode mapper.
 *
 * Converts resolved AST nodes into the framework-agnostic ElementNode tree.
 * Handles positional-to-named argument mapping via the library's param catalog.
 */

import type { ASTNode } from './ast.js';
import type { ParseResult, ParamMap } from '../types.js';

type JsonVal = string | number | boolean | null | JsonVal[] | { [k: string]: JsonVal };

/**
 * Convert an AST node to a JSON-compatible value.
 * Component nodes are mapped through `mapNode`.
 */
export function toJson(
  node: ASTNode,
  partial: boolean,
  errors: ParseResult['meta']['validationErrors'],
  cat: ParamMap | undefined,
): JsonVal {
  if (node.k === 'Str') return node.v;
  if (node.k === 'Num') return node.v;
  if (node.k === 'Bool') return node.v;
  if (node.k === 'Null') return null;
  if (node.k === 'Arr') {
    const items: JsonVal[] = [];
    for (const e of node.els) {
      // Drop unresolved references from arrays
      if (e.k === 'Ph') continue;
      const value = toJson(e, partial, errors, cat);
      // Drop invalid component entries from arrays
      if (e.k === 'Comp' && value === null) continue;
      items.push(value);
    }
    return items;
  }
  if (node.k === 'Obj') {
    const o: { [k: string]: JsonVal } = {};
    for (const [k, v] of node.entries) o[k] = toJson(v, partial, errors, cat);
    return o;
  }
  if (node.k === 'Comp') return mapNode(node, partial, errors, cat) as unknown as JsonVal;
  if (node.k === 'Ph') return null;
  return null;
}

/**
 * Map a Comp AST node into an ElementNode.
 *
 * Uses the param catalog to convert positional args into named props.
 * If required props are missing and have no defaults, the component is
 * dropped (returns null) and errors are recorded.
 */
export function mapNode(
  node: ASTNode,
  partial: boolean,
  errors: ParseResult['meta']['validationErrors'],
  cat: ParamMap | undefined,
): ParseResult['root'] {
  if (node.k === 'Ph') return null;
  if (node.k !== 'Comp') return null;

  const { name, args } = node;
  const def = cat?.get(name);
  const props: { [k: string]: JsonVal } = {};

  if (def) {
    // Map positional args → named props using library param order
    for (let i = 0; i < def.params.length && i < args.length; i++) {
      props[def.params[i]!.name] = toJson(args[i]!, partial, errors, cat);
    }

    // Validate required props — try defaultValue first before dropping
    const missingRequired = def.params.filter(
      (p) => p.required && (!(p.name in props) || props[p.name] === null),
    );
    if (missingRequired.length) {
      const stillInvalid = missingRequired.filter((p) => {
        if (p.defaultValue !== undefined) {
          props[p.name] = p.defaultValue as JsonVal;
          return false;
        }
        return true;
      });
      if (stillInvalid.length) {
        for (const p of stillInvalid) {
          errors.push({
            component: name,
            path: `/${p.name}`,
            message: p.name in props
              ? `required field "${p.name}" cannot be null`
              : `missing required field "${p.name}"`,
          });
        }
        return null;
      }
    }
  } else {
    // No library entry — preserve all args under _args
    props._args = args.map((a) => toJson(a, partial, errors, cat));
  }

  return { type: 'element', typeName: name, props, partial };
}
