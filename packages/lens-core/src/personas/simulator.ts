import type { Finding } from '../types/findings.js';
import type { Persona } from '../types/persona.js';
import { clamp01to100 } from '../helpers/math.js';

/**
 * Re-weight a Finding's contribution under a persona (Spec §8.3).
 *
 * v1 implementation: multiply the finding's *confidence* by the persona's
 * weight for that rule, clamped to [0, 100]. This way persona-adjusted
 * findings flow through the existing Scorer without it needing persona
 * awareness. Activation rules (rules that fire only under personas) are
 * handled at engine-evaluation time, not here.
 */
export function applyPersonaWeights(findings: Finding[], persona: Persona): Finding[] {
  return findings.map((finding) => {
    const multiplier = persona.ruleWeights[finding.ruleId];
    if (multiplier === undefined || multiplier === 1) return finding;

    return { ...finding, confidence: clamp01to100(finding.confidence * multiplier) };
  });
}
