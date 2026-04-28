import type { FixManifest } from '../types/fix.js';

/** Result from a single verifier check. */
export interface CheckResult {
  /** Stable identifier for the check (used in reports). */
  checkId: string;
  /** Did the fix pass this check? */
  passed: boolean;
  /** Human-readable reason — required when failed; optional when passed. */
  reason?: string;
}

/**
 * A verifier check is a pure function with a stable `checkId` attached as
 * a static property — so the orchestrator can filter by id without invoking.
 */
export type VerifierCheck = ((manifest: FixManifest) => CheckResult) & {
  readonly checkId: string;
};

/** Combined verdict + per-check breakdown. */
export interface VerifierVerdict {
  passed: boolean;
  results: CheckResult[];
}
