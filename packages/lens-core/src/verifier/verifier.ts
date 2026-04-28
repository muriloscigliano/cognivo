import type { FixManifest } from '../types/fix.js';
import type { CheckResult, VerifierCheck, VerifierVerdict } from './types.js';
import { checkTokenValidity } from './token-validity.js';
import { checkSchemaValidity } from './schema-validity.js';
import { createManifestComplianceCheck } from './manifest-compliance.js';

export interface VerifierConfig {
  /** Extra checks to run alongside the defaults. */
  additionalChecks?: VerifierCheck[];
  /** Skip default checks by id. Use sparingly. */
  skipChecks?: string[];
}

const DEFAULT_CHECKS: readonly VerifierCheck[] = [
  checkTokenValidity,
  checkSchemaValidity,
  createManifestComplianceCheck(),
];

/**
 * Verifier orchestrator (Spec §9.4). Runs each check; the verdict passes only
 * when every check passes. LLM-suggested fixes that fail verification are
 * downgraded to suggestion-text findings rather than coded changes.
 */
export class FixVerifier {
  private readonly checks: VerifierCheck[];

  constructor(config: VerifierConfig = {}) {
    const skip = new Set(config.skipChecks ?? []);
    this.checks = [
      ...DEFAULT_CHECKS.filter((check) => !skip.has(check.checkId)),
      ...(config.additionalChecks ?? []),
    ];
  }

  verify(manifest: FixManifest): VerifierVerdict {
    const results: CheckResult[] = this.checks.map((check) => check(manifest));
    return { passed: results.every((r) => r.passed), results };
  }
}
