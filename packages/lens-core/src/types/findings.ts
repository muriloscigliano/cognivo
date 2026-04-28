/**
 * Severity tier for a Finding. Wide spread is intentional (Spec §6.2):
 * blockers should dominate considers in the score formula.
 */
export type Severity = 'blocker' | 'strong' | 'consider' | 'positive';

/**
 * The category a Finding falls into, used by the Scorer for sub-score routing.
 */
export type FindingCategory =
  | 'cognitive-clarity'
  | 'persuasive-integrity'
  | 'accessibility'
  | 'system-health';

/**
 * A hint about how a Finding can be fixed.
 *  - `token-swap` / `attribute-set` / `css-injection` are *codeable* (auto-diffable).
 *  - `restructure` / `copy-edit` are *structural* / *judgment* (suggestion only).
 */
export type FixHint =
  | { kind: 'token-swap'; property: string; from: string; to: string; reason: string }
  | { kind: 'attribute-set'; attribute: string; value: string; reason: string }
  | { kind: 'css-injection'; selector: string; declarations: string; reason: string }
  | { kind: 'restructure'; summary: string; reason: string }
  | { kind: 'copy-edit'; original: string; suggestion: string; reason: string };

/**
 * A Finding produced by a Rule. Streams from the engine as produced.
 * `id` is a stable hash of (ruleId + targetNodeId + structural-signature).
 */
export interface Finding {
  /** Stable hash for dedup. */
  id: string;
  /** Rule that produced this finding. */
  ruleId: string;
  /** Severity tier. */
  severity: Severity;
  /** Confidence 0–100. */
  confidence: number;
  /** SceneNode id this finding applies to. */
  targetNodeId: string;
  /** Sub-score this finding contributes to. */
  category: FindingCategory;
  /** One-line message shown in the toolbar. */
  message: string;
  /** Multi-sentence rationale shown when expanded. */
  why: string;
  /** Citation IDs (bias card IDs, WCAG refs, etc.). */
  citations: string[];
  /** Optional fix hint. */
  fixHint?: FixHint;
  /** ISO timestamp for telemetry. */
  detectedAt: string;
}
