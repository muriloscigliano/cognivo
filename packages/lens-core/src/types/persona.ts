/** Evidence level for a persona — surfaced in UI; required by data model (Spec §8.6). */
export type EvidenceLevel = 'strong' | 'directional' | 'experimental';

/** A perceptual constraint — viewport, network, or input limitation. */
export interface PerceptualConstraint {
  kind: 'viewport' | 'network' | 'cpu' | 'visual-occlusion' | 'input-mode';
  /** Free-form parameters interpreted by the simulator's visualization layer. */
  params: Record<string, string | number | boolean>;
}

/** Attention pattern — used both for re-scoring and for visualization. */
export interface AttentionModel {
  dwellSeconds: number;
  scanPattern: 'F' | 'Z' | 'sequential' | 'spotlight';
  /** Multiplier applied to deductions on regions outside the scan focus. */
  outOfFocusPenalty: number;
}

/** The Persona manifest. */
export interface Persona {
  id: string;
  title: string;
  framing: string;
  evidenceLevel: EvidenceLevel;
  constraints: PerceptualConstraint[];
  attention: AttentionModel;
  /** Multipliers applied to specific rule severities (>1 amplifies, 0–1 dampens). */
  ruleWeights: Record<string, number>;
  /** Rule IDs that *only* fire under this persona. */
  activatesRules: string[];
  citations: string[];
}
