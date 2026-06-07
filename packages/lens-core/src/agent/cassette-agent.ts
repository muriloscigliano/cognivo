import type { Finding } from '../types/findings.js';
import {
  cassetteKey,
  type Cassette,
  type CassetteResponse,
  type AgentFixProposal,
  type LensAgent,
} from './types.js';

/**
 * Replay-only LensAgent for tests + offline demos. Looks up each call by
 * `${method}:${findingId}` in the cassette and returns the recorded
 * response. A missing key throws — we never silently produce empty output
 * because that hides test bugs.
 *
 * Cassettes are JSON files in `__fixtures__/cassettes/` loaded via
 * loadCassette(). For runtime construction, you can also pass the parsed
 * cassette object directly.
 */
export class CassetteAgent implements LensAgent {
  constructor(private readonly cassette: Cassette) {}

  async *explain(finding: Finding): AsyncIterable<string> {
    const response = this._lookup('explain', finding);
    switch (response.kind) {
      case 'text':
        for (const chunk of response.chunks) {
          // Yield chunks at microtask granularity so consumers that need to
          // schedule UI work between tokens have a chance to do so.
          await Promise.resolve();
          yield chunk;
        }
        return;
      case 'error':
        throw new Error(`cassette error: ${response.message}`);
      default:
        throw new Error(
          `cassette: explain(${finding.id}) entry has unsupported kind "${response.kind}". ` +
            `Expected "text" or "error".`
        );
    }
  }

  async suggestFix(finding: Finding): Promise<AgentFixProposal | null> {
    if (isJudgmentShaped(finding)) return null;
    const response = this._lookup('suggestFix', finding);
    switch (response.kind) {
      case 'fix':
        return response.manifest;
      case 'null':
        return null;
      case 'error':
        throw new Error(`cassette error: ${response.message}`);
      default:
        throw new Error(
          `cassette: suggestFix(${finding.id}) entry has unsupported kind "${response.kind}". ` +
            `Expected "fix", "null", or "error".`
        );
    }
  }

  private _lookup(method: 'explain' | 'suggestFix', finding: Finding): CassetteResponse {
    const key = cassetteKey(method, finding.id);
    const response = this.cassette.responses[key];
    if (response === undefined) {
      throw new Error(
        `cassette: no response for "${key}". Add it to the cassette or check the finding id.`
      );
    }
    return response;
  }
}

function isJudgmentShaped(finding: Finding): boolean {
  if (finding.fixHint === undefined) return true;
  return finding.fixHint.kind === 'restructure' || finding.fixHint.kind === 'copy-edit';
}
