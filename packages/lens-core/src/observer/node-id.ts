/**
 * Deterministic 12-char hex hash of (tag, position-path, textHash).
 *
 * Uses FNV-1a — small, fast, good distribution for short inputs. We do not need
 * cryptographic strength; we need *stability across re-scans of the same DOM*.
 */
export function computeNodeId(input: { tag: string; position: string; textHash: string }): string {
  const composite = `${input.tag}\u0000${input.position}\u0000${input.textHash}`;
  return fnv1a64Hex(composite).slice(0, 12);
}

/** Hash text content (pre-truncated). Returns 8 hex chars. */
export function hashText(text: string | undefined): string {
  if (!text) return '00000000';
  return fnv1a64Hex(text).slice(0, 8);
}

/** FNV-1a 64-bit returned as 16-char hex. Implemented with BigInt for correctness across long inputs. */
function fnv1a64Hex(str: string): string {
  const FNV_OFFSET = 0xcbf29ce484222325n;
  const FNV_PRIME = 0x100000001b3n;
  const MASK = 0xffffffffffffffffn;

  let hash = FNV_OFFSET;
  for (let i = 0; i < str.length; i++) {
    hash ^= BigInt(str.charCodeAt(i));
    hash = (hash * FNV_PRIME) & MASK;
  }
  return hash.toString(16).padStart(16, '0');
}
