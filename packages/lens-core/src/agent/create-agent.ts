import type { Finding } from '../types/findings.js';
import { AiClientAgent, type AiClientLike } from './ai-client-agent.js';
import { CassetteAgent } from './cassette-agent.js';
import {
  NoAgentConfiguredError,
  type Cassette,
  type AgentFixProposal,
  type LensAgent,
} from './types.js';

export interface CreateAgentOptions {
  /**
   * AiClient-like instance (any object exposing runIntent / streamIntent).
   * When provided, returns an AiClientAgent.
   *
   * When omitted alongside `cassette`, returns a NoOpAgent that throws
   * `NoAgentConfiguredError` on every call. This is the strict Tier 0
   * default per spec §10.4 — opt in to network calls explicitly.
   */
  aiClient?: AiClientLike;
  /**
   * Cassette object (already loaded via loadCassette). When provided,
   * returns a CassetteAgent. Mutually exclusive with aiClient — if both
   * are passed, the cassette wins (test cassettes always trump live calls).
   */
  cassette?: Cassette;
}

/**
 * Build a LensAgent. The variant returned depends on the options:
 *
 *   createAgent()                    → NoOpAgent (default; throws on use)
 *   createAgent({ aiClient })        → AiClientAgent (live LLM calls)
 *   createAgent({ cassette })        → CassetteAgent (replay only)
 *   createAgent({ aiClient, cassette }) → CassetteAgent (cassette wins)
 *
 * The "cassette wins" rule means tests that pass both can't accidentally
 * make a live call — a misconfigured environment yields deterministic
 * replay, never network traffic.
 */
export function createAgent(options: CreateAgentOptions = {}): LensAgent {
  if (options.cassette !== undefined) {
    return new CassetteAgent(options.cassette);
  }
  if (options.aiClient !== undefined) {
    return new AiClientAgent(options.aiClient);
  }
  return new NoOpAgent();
}

/**
 * Default agent: throws on every call. Tier 0 (no network) is the
 * default — consumers must explicitly opt in to LLM calls.
 */
class NoOpAgent implements LensAgent {
  // eslint-disable-next-line require-yield -- async generator shape is preserved by `async *`; the throw is the contract
  async *explain(_finding: Finding): AsyncIterable<string> {
    throw new NoAgentConfiguredError();
  }

  async suggestFix(_finding: Finding): Promise<AgentFixProposal | null> {
    throw new NoAgentConfiguredError();
  }
}
