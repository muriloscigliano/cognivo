import type { FixChange, AgentFixProposal } from './types.js';

const FIX_CHANGE_KINDS = ['set-attribute', 'replace-text', 'set-style', 'replace-token'] as const;

export class ParseFixManifestError extends Error {
  constructor(message: string, public readonly raw?: unknown) {
    super(`lens-core: parseFixManifest — ${message}`);
    this.name = 'ParseFixManifestError';
  }
}

/**
 * Parse a candidate AgentFixProposal (typically from an LLM's structured
 * output) into a typed proposal. Throws on any structural mismatch — we never
 * silently produce a half-valid manifest.
 *
 * Required fields: findingId, change, summary, rationale, confidence,
 * generatedAt. confidence must be 0–100 inclusive.
 */
export function parseFixManifest(input: unknown, expectedFindingId?: string): AgentFixProposal {
  if (input === null || typeof input !== 'object') {
    throw new ParseFixManifestError('input is not an object', input);
  }
  const obj = input as Record<string, unknown>;

  const findingId = obj['findingId'];
  if (typeof findingId !== 'string' || findingId === '') {
    throw new ParseFixManifestError('findingId missing or not a string', input);
  }
  if (expectedFindingId !== undefined && findingId !== expectedFindingId) {
    throw new ParseFixManifestError(
      `findingId mismatch (expected "${expectedFindingId}", got "${findingId}")`,
      input
    );
  }

  const summary = obj['summary'];
  if (typeof summary !== 'string' || summary === '') {
    throw new ParseFixManifestError('summary missing or empty', input);
  }
  const rationale = obj['rationale'];
  if (typeof rationale !== 'string') {
    throw new ParseFixManifestError('rationale missing', input);
  }
  const confidence = obj['confidence'];
  if (typeof confidence !== 'number' || confidence < 0 || confidence > 100) {
    throw new ParseFixManifestError(
      `confidence must be a number in [0, 100], got ${String(confidence)}`,
      input
    );
  }
  const generatedAt = obj['generatedAt'];
  if (typeof generatedAt !== 'string' || generatedAt === '') {
    throw new ParseFixManifestError('generatedAt missing', input);
  }

  const change = parseChange(obj['change']);

  return {
    findingId,
    change,
    summary,
    rationale,
    confidence,
    generatedAt,
  };
}

function parseChange(input: unknown): FixChange {
  if (input === null || typeof input !== 'object') {
    throw new ParseFixManifestError('change is not an object', input);
  }
  const c = input as Record<string, unknown>;
  const kind = c['kind'];
  if (typeof kind !== 'string' || !FIX_CHANGE_KINDS.includes(kind as never)) {
    throw new ParseFixManifestError(
      `change.kind must be one of ${FIX_CHANGE_KINDS.join('|')}, got ${String(kind)}`,
      input
    );
  }
  const selector = c['selector'];
  if (typeof selector !== 'string' || selector === '') {
    throw new ParseFixManifestError('change.selector missing', input);
  }

  switch (kind) {
    case 'set-attribute': {
      const attribute = c['attribute'];
      const value = c['value'];
      if (typeof attribute !== 'string' || attribute === '') {
        throw new ParseFixManifestError('set-attribute.attribute missing', input);
      }
      if (typeof value !== 'string') {
        throw new ParseFixManifestError('set-attribute.value missing', input);
      }
      return { kind, selector, attribute, value };
    }
    case 'replace-text': {
      const from = c['from'];
      const to = c['to'];
      if (typeof from !== 'string' || typeof to !== 'string') {
        throw new ParseFixManifestError('replace-text.from / .to missing', input);
      }
      return { kind, selector, from, to };
    }
    case 'set-style': {
      const declarations = c['declarations'];
      if (declarations === null || typeof declarations !== 'object') {
        throw new ParseFixManifestError('set-style.declarations missing', input);
      }
      const decls: Record<string, string> = {};
      for (const [k, v] of Object.entries(declarations)) {
        if (typeof v !== 'string') {
          throw new ParseFixManifestError(
            `set-style.declarations[${k}] must be a string`,
            input
          );
        }
        decls[k] = v;
      }
      return { kind, selector, declarations: decls };
    }
    case 'replace-token': {
      const property = c['property'];
      const from = c['from'];
      const to = c['to'];
      if (typeof property !== 'string' || typeof from !== 'string' || typeof to !== 'string') {
        throw new ParseFixManifestError('replace-token.property/from/to missing', input);
      }
      return { kind, selector, property, from, to };
    }
    default:
      // Exhaustive — TypeScript knows kind is one of the four values, but
      // the runtime check at the top doesn't narrow `kind` for the switch.
      throw new ParseFixManifestError(`unhandled change.kind ${String(kind)}`, input);
  }
}
