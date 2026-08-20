/**
 * @cognivo/compose — Deterministic tree hashing.
 *
 * Two uses:
 *   1. Provenance — a stable id for "the tree that resulted from this commit".
 *   2. Diff safety — `CompositionDiff.baseHash` pins a diff to the exact tree it
 *      was computed against, so `apply` can refuse a stale diff (see diff/apply.ts).
 *
 * The hash must be STABLE across prop key ordering (an agent may emit props in a
 * different order than a prior tree) but SENSITIVE to any value/structure change.
 * We serialize with sorted keys, then FNV-1a hash the canonical string. This is a
 * content hash, not a cryptographic one — collision resistance isn't the goal;
 * cheap deterministic change-detection is.
 */

import type { ElementNode } from '@cognivo/gen-ui';

/** Canonical JSON with recursively sorted object keys (arrays keep order). */
function canonicalize(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(canonicalize);
  if (value && typeof value === 'object') {
    const sorted: Record<string, unknown> = {};
    for (const key of Object.keys(value as Record<string, unknown>).sort()) {
      sorted[key] = canonicalize((value as Record<string, unknown>)[key]);
    }
    return sorted;
  }
  return value;
}

/** FNV-1a 32-bit, returned as an 8-char hex string. */
function fnv1a(str: string): string {
  let h = 0x811c9dc5;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  // >>> 0 forces unsigned; pad to a fixed 8-char width.
  return (h >>> 0).toString(16).padStart(8, '0');
}

/** Deterministic content hash of an ElementNode tree. */
export function hashTree(root: ElementNode): string {
  return fnv1a(JSON.stringify(canonicalize(root)));
}
