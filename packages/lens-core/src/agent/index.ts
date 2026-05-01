// Public surface for the lens agent runtime.
//
// Three implementations:
//   AiClientAgent — wraps a peer @cognivo/core AiClient
//   CassetteAgent — replays recorded responses (for tests + offline demos)
//   NoOpAgent     — default; throws on every call (Tier 0 per spec §10.4)
//
// Consumers typically call `createAgent({ aiClient })` to get a working agent
// or `createAgent()` for the strict no-network default.

export type {
  LensAgent,
  FixManifest,
  FixChange,
  Cassette,
  CassetteResponse,
} from './types.js';

export {
  CASSETTE_SCHEMA_VERSION,
  NoAgentConfiguredError,
  CassetteSchemaMismatchError,
  cassetteKey,
} from './types.js';

export { createAgent, type CreateAgentOptions } from './create-agent.js';
export { AiClientAgent } from './ai-client-agent.js';
export { CassetteAgent } from './cassette-agent.js';
export { loadCassette } from './cassette-loader.js';
export { parseFixManifest, ParseFixManifestError } from './parse-fix-manifest.js';
