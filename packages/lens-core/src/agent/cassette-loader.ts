import { CASSETTE_SCHEMA_VERSION, CassetteSchemaMismatchError, type Cassette } from './types.js';

/**
 * Validate + return a cassette object. The input is typically the result
 * of JSON.parse on a cassette file — this is a runtime guard against
 * stale or hand-edited cassettes.
 *
 * Throws CassetteSchemaMismatchError when the cassette's schemaVersion
 * doesn't match the runtime's. This is intentional: we'd rather fail
 * loudly during test setup than mis-replay an old cassette.
 *
 * For Node-side cassette loading (reading from disk), call this on the
 * parsed JSON. We don't ship a fs reader here so the agent module stays
 * runtime-agnostic — works in browsers, Workers, Deno, etc.
 */
export function loadCassette(input: unknown): Cassette {
  if (input === null || typeof input !== 'object') {
    throw new TypeError('lens-core: loadCassette() expected an object');
  }
  const obj = input as Record<string, unknown>;
  if (obj['schemaVersion'] !== CASSETTE_SCHEMA_VERSION) {
    throw new CassetteSchemaMismatchError(CASSETTE_SCHEMA_VERSION, obj['schemaVersion']);
  }
  if (obj['responses'] === null || typeof obj['responses'] !== 'object') {
    throw new TypeError('lens-core: cassette.responses is required and must be an object');
  }
  return input as Cassette;
}
