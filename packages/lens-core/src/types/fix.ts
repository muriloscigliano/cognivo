/** Origin label surfaced in UI as the trust badge. */
export type FixOrigin = 'deterministic' | 'llm-verified';

/** A single file change in a unified-diff-style range. */
export interface FileChange {
  path: string;
  range: { startLine: number; endLine: number };
  before: string;
  after: string;
  rationale: string;
}

/** A virtual attribute change for in-page preview (no file mutation). */
export interface AttributeChange {
  targetNodeId: string;
  attribute: string;
  /** null = remove attribute */
  value: string | null;
}

/** The full serializable FixManifest (Spec §9.3). */
export interface FixManifest {
  ruleId: string;
  findingId: string;
  confidence: number;
  origin: FixOrigin;

  changes: FileChange[];

  preview: {
    cssOverrides?: string;
    attributeChanges?: AttributeChange[];
    notes?: string;
  };

  rollbackable: true;
  reviewRequired: boolean;
  citations: string[];
}
