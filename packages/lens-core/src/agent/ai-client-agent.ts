import type { Finding } from '../types/findings.js';
import { startSpan, withSpanAsync } from '../instrumentation/spans.js';
import {
  LENS_SYSTEM_PROMPT,
  buildExplainPrompt,
  buildSuggestFixPrompt,
} from './prompts.js';
import { parseFixManifest, ParseFixManifestError } from './parse-fix-manifest.js';
import type { FixManifest, LensAgent } from './types.js';

/**
 * The minimal surface this agent needs from `@cognivo/core`'s AiClient.
 * We don't import the AiClient type directly — that would force an
 * @cognivo/core peer dep on lens-core itself. Instead we structurally type
 * the surface we use; consumers pass any object that conforms.
 *
 * Why structural typing: lens consumers may have their own LLM clients
 * (raw OpenAI SDK, Anthropic SDK, fetch-to-Ollama) and shouldn't have to
 * adopt @cognivo/core just to get an audit explanation.
 */
export interface AiClientLike {
  /**
   * Single-shot call. Receives the system prompt + user prompt and returns
   * an object whose `explanation` (or `metadata` for structured outputs)
   * carries the response text.
   */
  runIntent: (
    intent: string,
    context: AgentContext,
    options?: AgentOptions
  ) => Promise<AgentResult>;
  /**
   * Optional streaming variant. When present, AiClientAgent uses it for
   * explain(); otherwise falls back to chunking the runIntent result.
   */
  streamIntent?: (
    intent: string,
    context: AgentContext,
    options?: AgentOptions
  ) => AsyncIterable<{ explanation?: string; metadata?: Record<string, unknown> }>;
}

export interface AgentContext {
  /** Single-finding "dataset" — keeps the AiClient API happy without forcing real datasets. */
  dataset: ReadonlyArray<Finding>;
  meta?: Record<string, unknown>;
}

export interface AgentOptions {
  systemPrompt?: string;
  temperature?: number;
  maxTokens?: number;
  [key: string]: unknown;
}

export interface AgentResult {
  explanation?: string;
  metadata?: Record<string, unknown>;
  [key: string]: unknown;
}

/**
 * The reference LensAgent backed by an AiClient. Wraps every call in a
 * `lens:agent:*` span for self-observability per Pattern 53.
 *
 * For findings whose fix hint is judgment-shaped (`restructure` / `copy-edit`),
 * suggestFix returns null without making an LLM call — there's no
 * deterministic answer to ask for.
 */
export class AiClientAgent implements LensAgent {
  constructor(private readonly client: AiClientLike) {}

  async *explain(finding: Finding): AsyncIterable<string> {
    const span = startSpan('agent:explain');
    try {
      yield* this._explainInner(finding);
    } finally {
      span.end();
    }
  }

  private async *_explainInner(finding: Finding): AsyncIterable<string> {
    const userPrompt = buildExplainPrompt(finding);
    const context: AgentContext = { dataset: [finding] };
    const options: AgentOptions = {
      systemPrompt: `${LENS_SYSTEM_PROMPT}\n\n${userPrompt}`,
    };

    if (typeof this.client.streamIntent === 'function') {
      let lastEmitted = '';
      for await (const chunk of this.client.streamIntent('explain', context, options)) {
        const text = chunk.explanation ?? '';
        if (text.length > lastEmitted.length) {
          // Yield only the *delta* so consumers can append; total text grows
          // monotonically as the LLM streams.
          yield text.slice(lastEmitted.length);
          lastEmitted = text;
        }
      }
      return;
    }

    // Non-streaming fallback: chunk the full response by sentence so the UI
    // can still progressively render even when the adapter doesn't stream.
    const result = await this.client.runIntent('explain', context, options);
    const full = result.explanation ?? '';
    for (const chunk of chunkBySentence(full)) yield chunk;
  }

  async suggestFix(finding: Finding): Promise<FixManifest | null> {
    if (isJudgmentShaped(finding)) return null;
    const { value } = await withSpanAsync('agent:suggest-fix', async () => {
      const userPrompt = buildSuggestFixPrompt(finding);
      const context: AgentContext = { dataset: [finding] };
      const options: AgentOptions = {
        systemPrompt: `${LENS_SYSTEM_PROMPT}\n\n${userPrompt}`,
        temperature: 0,
      };
      const result = await this.client.runIntent('optimize', context, options);
      return parseManifestFromResult(result, finding.id);
    });
    return value;
  }
}

/**
 * Pull a FixManifest out of an AgentResult. The LLM may emit:
 *   1. The JSON in `metadata` (preferred — structured outputs)
 *   2. The JSON in `explanation` (string — parse it)
 *   3. A "judgment-call" sentinel where change is null (return null)
 */
function parseManifestFromResult(result: AgentResult, expectedFindingId: string): FixManifest | null {
  // Prefer structured output if the adapter delivered it.
  if (result.metadata && typeof result.metadata === 'object') {
    const candidate = result.metadata['fixManifest'] ?? result.metadata;
    const parsed = tryParseManifest(candidate, expectedFindingId);
    if (parsed !== undefined) return parsed;
  }

  // Fall back to parsing the explanation string.
  if (typeof result.explanation === 'string' && result.explanation.trim() !== '') {
    let candidate: unknown;
    try {
      candidate = JSON.parse(result.explanation);
    } catch {
      throw new ParseFixManifestError(
        `LLM returned non-JSON explanation: ${result.explanation.slice(0, 200)}`,
        result.explanation
      );
    }
    const parsed = tryParseManifest(candidate, expectedFindingId);
    if (parsed !== undefined) return parsed;
  }

  throw new ParseFixManifestError('AgentResult had no parseable manifest', result);
}

function tryParseManifest(input: unknown, expectedFindingId: string): FixManifest | null | undefined {
  if (input === null || typeof input !== 'object') return undefined;
  const obj = input as Record<string, unknown>;
  // Judgment sentinel: explicit null change = no fix available.
  if (obj['change'] === null) return null;
  return parseFixManifest(input, expectedFindingId);
}

/**
 * Chunk text by sentence terminators (.!?) plus newlines. Keeps the
 * terminator with the chunk so downstream consumers don't need to re-add
 * punctuation.
 */
function chunkBySentence(text: string): string[] {
  if (text === '') return [];
  const out: string[] = [];
  let buf = '';
  for (const ch of text) {
    buf += ch;
    if (/[.!?]/.test(ch) || ch === '\n') {
      out.push(buf);
      buf = '';
    }
  }
  if (buf !== '') out.push(buf);
  return out;
}

/**
 * Findings whose fix hint kind is `restructure` or `copy-edit` are judgment
 * calls — the LLM can't produce a deterministic structural change. We
 * shortcut to null so suggestFix doesn't burn tokens on cases the rule
 * itself flagged as ambiguous.
 *
 * Findings with NO fixHint are also treated as judgment-shaped: nothing for
 * the agent to elaborate.
 */
function isJudgmentShaped(finding: Finding): boolean {
  if (finding.fixHint === undefined) return true;
  return finding.fixHint.kind === 'restructure' || finding.fixHint.kind === 'copy-edit';
}
