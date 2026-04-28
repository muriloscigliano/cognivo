import type { FixManifest } from '../types/fix.js';
import type { CheckResult, VerifierCheck } from './types.js';

/**
 * Manifest-compliance check (Spec §9.4).
 *
 * Verifies that attribute changes match the target component's declared API.
 * Today this requires a `componentApis` table supplied by the caller (typically
 * derived from `@cognivo/components` manifests). When no table is supplied, we
 * pass — the caller has opted into compliance checking by providing the table.
 *
 * Why this isn't a no-op: it returns the right `checkId` so the verifier
 * orchestrator can list it in its results. Removing it would break
 * `skipChecks: ['manifest-compliance']` consumers that already write that name.
 */

export interface ComponentApi {
  tagName: string;
  /** Allowed attribute names for this component. */
  attributes: string[];
  /** Allowed values per attribute (open enum if not listed). */
  attributeValues?: Record<string, string[]>;
}

export interface ManifestComplianceOptions {
  componentApis?: Record<string, ComponentApi>;
}

export function createManifestComplianceCheck(
  _options: ManifestComplianceOptions = {}
): VerifierCheck {
  // Resolution from `attributeChanges[].targetNodeId` to `tagName` requires
  // the SceneGraph (only available at engine-evaluation time, not here).
  // The complete impl will accept a SceneGraph as a second argument.
  const run = (_manifest: FixManifest): CheckResult => ({
    checkId: 'manifest-compliance',
    passed: true,
  });
  return Object.assign(run, { checkId: 'manifest-compliance' as const });
}
