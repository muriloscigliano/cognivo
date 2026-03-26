/**
 * Built-in guardrail rules
 *
 * Each factory function returns a GuardrailRule. These cover common safety
 * scenarios: length limits, prompt injection detection, PII detection,
 * and output range validation.
 */

import type { GuardrailRule, GuardrailResult } from './types.js';

/**
 * Blocks input that exceeds a maximum character length.
 *
 * @param maxLength - Maximum allowed string length
 * @returns A GuardrailRule that checks string length
 */
export function maxLengthRule(maxLength: number): GuardrailRule {
  return {
    name: 'max-length',
    validate(input: string): GuardrailResult {
      if (input.length > maxLength) {
        return {
          passed: false,
          violations: [
            {
              rule: 'max-length',
              severity: 'block',
              message: `Input length ${input.length} exceeds maximum of ${maxLength} characters`,
            },
          ],
        };
      }
      return { passed: true, violations: [] };
    },
  };
}

/**
 * Detects common prompt injection patterns.
 *
 * Catches attempts to override system instructions such as
 * "ignore previous instructions", "system:", "you are now", etc.
 * Case-insensitive matching.
 */
export const noPromptInjectionRule: GuardrailRule = {
  name: 'no-prompt-injection',
  validate(input: string): GuardrailResult {
    const patterns = [
      /ignore\s+previous\s+instructions/i,
      /ignore\s+all\s+previous/i,
      /system\s*:/i,
      /you\s+are\s+now/i,
      /disregard/i,
      /forget\s+your\s+instructions/i,
    ];

    const violations = patterns
      .filter((pattern) => pattern.test(input))
      .map((pattern) => ({
        rule: 'no-prompt-injection',
        severity: 'block' as const,
        message: `Prompt injection pattern detected: ${pattern.source}`,
      }));

    return {
      passed: violations.length === 0,
      violations,
    };
  },
};

/**
 * Detects personally identifiable information (PII).
 *
 * Catches:
 * - SSN patterns (XXX-XX-XXXX)
 * - Credit card numbers (16 consecutive digits, with optional separators)
 * - Email addresses
 */
export const noPiiRule: GuardrailRule = {
  name: 'no-pii',
  validate(input: string): GuardrailResult {
    const violations: GuardrailResult['violations'] = [];

    // SSN pattern: XXX-XX-XXXX
    if (/\b\d{3}-\d{2}-\d{4}\b/.test(input)) {
      violations.push({
        rule: 'no-pii',
        severity: 'block',
        message: 'SSN pattern detected (XXX-XX-XXXX)',
      });
    }

    // Credit card: 16 digits (with optional spaces or dashes)
    if (/\b\d{4}[\s-]?\d{4}[\s-]?\d{4}[\s-]?\d{4}\b/.test(input)) {
      violations.push({
        rule: 'no-pii',
        severity: 'block',
        message: 'Credit card number pattern detected (16 digits)',
      });
    }

    // Email address
    if (/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/.test(input)) {
      violations.push({
        rule: 'no-pii',
        severity: 'block',
        message: 'Email address detected',
      });
    }

    return {
      passed: violations.length === 0,
      violations,
    };
  },
};

/**
 * Output rule: validates that confidence values are in the [0, 1] range.
 *
 * Parses the serialized result JSON and checks the `confidence` field.
 * Severity is warn (not block) since out-of-range confidence is a quality
 * issue, not a safety issue.
 */
export const confidenceRangeRule: GuardrailRule = {
  name: 'confidence-range',
  validate(input: string): GuardrailResult {
    try {
      const parsed: unknown = JSON.parse(input);

      if (
        typeof parsed === 'object' &&
        parsed !== null &&
        'confidence' in parsed
      ) {
        const confidence = (parsed as Record<string, unknown>)['confidence'];

        if (typeof confidence === 'number' && (confidence < 0 || confidence > 1)) {
          return {
            passed: false,
            violations: [
              {
                rule: 'confidence-range',
                severity: 'warn',
                message: `Confidence value ${confidence} is outside the valid range [0, 1]`,
              },
            ],
          };
        }
      }

      return { passed: true, violations: [] };
    } catch {
      // If the output is not valid JSON, skip this rule
      return { passed: true, violations: [] };
    }
  },
};
