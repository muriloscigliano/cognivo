/**
 * Guardrails — Input/output safety validation types
 *
 * Guardrails provide a configurable layer of validation that wraps any AiClient.
 * Rules run against serialized inputs and outputs, catching unsafe patterns
 * (prompt injection, PII leakage, out-of-range values) before they reach or leave the LLM.
 */

/**
 * A single guardrail rule that validates a string.
 *
 * Rules are stateless functions — they receive the serialized input (or output)
 * and return a result indicating pass/fail with any violations.
 */
export interface GuardrailRule {
  /** Human-readable name for logging and error messages */
  name: string;

  /** Validate the serialized string and return a result */
  validate(input: string): GuardrailResult;
}

/**
 * Result from running a guardrail rule
 */
export interface GuardrailResult {
  /** Whether the input passed all checks in this rule */
  passed: boolean;

  /** List of violations found (empty if passed) */
  violations: GuardrailViolation[];
}

/**
 * A single violation detected by a guardrail rule
 */
export interface GuardrailViolation {
  /** Name of the rule that was violated */
  rule: string;

  /** Severity determines behavior: block stops execution, warn logs, info is silent */
  severity: 'block' | 'warn' | 'info';

  /** Human-readable description of the violation */
  message: string;
}

/**
 * Configuration for the GuardedClient decorator
 *
 * Input rules run before the LLM call (on serialized context).
 * Output rules run after the LLM call (on serialized result).
 */
export interface GuardrailsConfig {
  /** Input validation configuration */
  input?: {
    /** Rules to run against the serialized input */
    rules: GuardrailRule[];

    /** What to do when a blocking violation is found: block throws, warn logs */
    onViolation: 'block' | 'warn';

    /** Maximum allowed input length in characters (optional shorthand) */
    maxInputLength?: number;
  };

  /** Output validation configuration */
  output?: {
    /** Rules to run against the serialized output */
    rules: GuardrailRule[];

    /** What to do when a blocking violation is found: block throws, warn logs */
    onViolation: 'block' | 'warn';
  };
}
