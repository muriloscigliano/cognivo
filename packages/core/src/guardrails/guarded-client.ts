/**
 * GuardedClient — Decorator that wraps an AiClient with safety guardrails
 *
 * This implements the Decorator pattern: it takes an inner AiClient and
 * interposes input/output validation rules before/after every call.
 *
 * Usage:
 *   const inner = new OpenAiAdapter({ apiKey: '...' });
 *   const safe = new GuardedClient(inner, {
 *     input: { rules: [noPromptInjectionRule, noPiiRule], onViolation: 'block' },
 *     output: { rules: [confidenceRangeRule], onViolation: 'warn' },
 *   });
 *   const result = await safe.runIntent(intent, context);
 */

import type { AiClient, AiRequestOptions } from '../client/types.js';
import type { AiIntent } from '../intents/types.js';
import type { AiContext } from '../context/types.js';
import type { AiResult } from '../results/types.js';
import type {
  GuardrailsConfig,
  GuardrailRule,
  GuardrailViolation,
} from './types.js';

/**
 * Error thrown when a guardrail rule blocks execution.
 *
 * Contains the full list of violations so callers can inspect
 * which rules failed and why.
 */
export class GuardrailError extends Error {
  /** All violations that triggered this error */
  public readonly violations: GuardrailViolation[];

  constructor(message: string, violations: GuardrailViolation[]) {
    super(message);
    this.name = 'GuardrailError';
    this.violations = violations;
  }
}

/**
 * Run an array of guardrail rules against a serialized string.
 *
 * @returns All violations found across all rules
 */
function runRules(rules: GuardrailRule[], serialized: string): GuardrailViolation[] {
  const violations: GuardrailViolation[] = [];

  for (const rule of rules) {
    const result = rule.validate(serialized);
    if (!result.passed) {
      violations.push(...result.violations);
    }
  }

  return violations;
}

/**
 * GuardedClient — Wraps any AiClient with input/output safety validation
 *
 * Implements the AiClient interface so it can be used as a drop-in replacement.
 * The decorator pattern means existing code doesn't need to change — just wrap
 * the client and the guardrails apply transparently.
 */
export class GuardedClient implements AiClient {
  private readonly inner: AiClient;
  private readonly config: GuardrailsConfig;

  constructor(inner: AiClient, config: GuardrailsConfig) {
    this.inner = inner;
    this.config = config;
  }

  /**
   * Run an AI intent with guardrail validation on input and output.
   *
   * 1. Serialize context to JSON string
   * 2. Run input rules — if block violations found and onViolation === 'block', throw
   * 3. Call inner.runIntent
   * 4. Serialize result to JSON string
   * 5. Run output rules — if block violations found and onViolation === 'block', throw
   * 6. Return result
   */
  /**
   * Validate the request context against the configured input guardrails.
   * Throws GuardrailError when a block-severity violation is found in
   * `block` mode. Runs on the fully-available context, so it applies
   * equally to streaming and non-streaming calls.
   */
  private checkInputGuardrails<T>(context: AiContext<T>): void {
    if (!this.config.input) return;

    const serializedInput = JSON.stringify(context);
    const inputViolations = runRules(this.config.input.rules, serializedInput);

    if (inputViolations.length > 0) {
      const hasBlockViolation = inputViolations.some((v) => v.severity === 'block');

      if (hasBlockViolation && this.config.input.onViolation === 'block') {
        throw new GuardrailError(
          `Input guardrail violated: ${inputViolations.map((v) => v.message).join('; ')}`,
          inputViolations
        );
      }
      // In warn mode, we log but continue
      // Consumers could hook into this via config extensions in the future
    }
  }

  async runIntent<T = unknown>(
    intent: AiIntent,
    context: AiContext<T>,
    options?: AiRequestOptions
  ): Promise<AiResult> {
    // --- Input guardrails ---
    this.checkInputGuardrails(context);

    // --- Call inner client ---
    const result = await this.inner.runIntent(intent, context, options);

    // --- Output guardrails ---
    if (this.config.output) {
      const serializedOutput = JSON.stringify(result);
      const outputViolations = runRules(this.config.output.rules, serializedOutput);

      if (outputViolations.length > 0) {
        const hasBlockViolation = outputViolations.some((v) => v.severity === 'block');

        if (hasBlockViolation && this.config.output.onViolation === 'block') {
          throw new GuardrailError(
            `Output guardrail violated: ${outputViolations.map((v) => v.message).join('; ')}`,
            outputViolations
          );
        }
        // In warn mode, violations are noted but execution continues
      }
    }

    return result;
  }

  /**
   * Stream an AI intent.
   *
   * Input guardrails ARE enforced: they validate the request context, which
   * is fully available before the first chunk, so there's no buffering cost
   * and no reason to skip them. Skipping input rules here would let a caller
   * bypass prompt-injection / PII blocks simply by choosing the streaming
   * path. Output guardrails are still not applied to the stream — validating
   * partial chunks would require buffering the whole response, defeating the
   * point of streaming.
   */
  streamIntent?<T = unknown>(
    intent: AiIntent,
    context: AiContext<T>,
    options?: AiRequestOptions
  ): AsyncGenerator<Partial<AiResult>> {
    if (!this.inner.streamIntent) {
      throw new Error('Inner client does not support streaming');
    }

    // --- Input guardrails (throws eagerly on block, before any inner call) ---
    this.checkInputGuardrails(context);

    return this.inner.streamIntent(intent, context, options);
  }
}
