/**
 * Resolves {path.to.token} references in W3C DTCG token values.
 * Handles chained references up to depth 10 to prevent cycles.
 */

const REFERENCE_RE = /\{([^}]+)\}/g;
const MAX_DEPTH = 10;

/**
 * Resolve a single token value. If it contains `{...}` references,
 * look up each path in `allTokens` and recursively resolve.
 * Returns the raw value unchanged if no references are found or
 * if a reference cannot be resolved.
 */
export function resolveTokenValue(
  value: string,
  allTokens: Map<string, string>,
  depth = 0,
): string {
  if (depth >= MAX_DEPTH) {
    return value; // bail out — likely a cycle
  }

  // Fast path: no references at all
  if (!value.includes('{')) {
    return value;
  }

  // Check if the entire value is a single reference (common case)
  const singleMatch = /^\{([^}]+)\}$/.exec(value);
  if (singleMatch) {
    const refPath = singleMatch[1]!;
    const resolved = allTokens.get(refPath);
    if (resolved === undefined) {
      return value; // unresolvable — return as-is
    }
    return resolveTokenValue(resolved, allTokens, depth + 1);
  }

  // Composite value: replace each {ref} inline (e.g. "0 4px 8px {color.shadow}")
  const result = value.replace(REFERENCE_RE, (_match, refPath: string) => {
    const resolved = allTokens.get(refPath);
    if (resolved === undefined) {
      return `{${refPath}}`; // keep unresolvable refs as-is
    }
    return resolveTokenValue(resolved, allTokens, depth + 1);
  });

  return result;
}

/**
 * Walk one or more W3C DTCG JSON objects and collect every leaf node
 * that has a `$value` field into a flat map of `dotPath → rawValue`.
 *
 * A "leaf" is any object containing `$value`. Everything else is
 * treated as a grouping namespace and its keys become path segments.
 *
 * Example:
 *   { gray: { 50: { $type: "color", $value: "#FAFAFA" } } }
 * produces:
 *   Map { "gray.50" => "#FAFAFA" }
 */
export function buildFlatTokenMap(
  tieredData: Record<string, unknown>[],
): Map<string, string> {
  const map = new Map<string, string>();

  for (const data of tieredData) {
    walkObject(data, [], map);
  }

  return map;
}

/**
 * Recursively walk a JSON object tree, collecting leaf `$value` entries.
 */
function walkObject(
  obj: Record<string, unknown>,
  pathSegments: string[],
  map: Map<string, string>,
): void {
  // If this node has $value, it's a leaf token
  if ('$value' in obj) {
    const rawValue = obj['$value'];
    const dotPath = pathSegments.join('.');
    // Convert value to string (handles numbers like font-weight: 400)
    map.set(dotPath, String(rawValue));
    return;
  }

  // Otherwise recurse into child keys, skipping DTCG metadata keys
  for (const key of Object.keys(obj)) {
    if (key.startsWith('$')) {
      continue; // skip $type, $description, $extensions, etc.
    }
    const child = obj[key];
    if (child !== null && typeof child === 'object' && !Array.isArray(child)) {
      walkObject(
        child as Record<string, unknown>,
        [...pathSegments, key],
        map,
      );
    }
  }
}
