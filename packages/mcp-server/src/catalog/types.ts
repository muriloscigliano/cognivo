/**
 * Catalog schema types — the single source of truth for both
 * the build-time generator and the runtime MCP server.
 */

// ─── Component Catalog ──────────────────────────────────────────────────────

export interface ComponentEntry {
  tag: string;
  className: string;
  category: 'foundation' | 'ai';
  wave: string;
  description: string;
  properties: PropertyEntry[];
  events: EventEntry[];
  slots: SlotEntry[];
  cssProperties: CssPropertyEntry[];
  examples: string[];
  formAssociated: boolean;
  dependencies: string[];
}

export interface PropertyEntry {
  name: string;
  type: string;
  default: string;
  reflect: boolean;
  description: string;
}

export interface EventEntry {
  name: string;
  detail: string;
  description: string;
}

export interface SlotEntry {
  name: string;
  description: string;
}

export interface CssPropertyEntry {
  name: string;
  description: string;
}

// ─── Token Catalog ──────────────────────────────────────────────────────────

export interface TokenEntry {
  name: string;
  path: string[];
  value: string;
  resolvedValue: string;
  type: string;
  tier: 1 | 2 | 3;
  category: string;
  subcategory: string;
  componentAssociation?: string;
  usableInComponents: boolean;
}

// ─── Bias Catalog ───────────────────────────────────────────────────────────

export interface BiasEntry {
  id: string;
  name: string;
  aliases: string[];
  category: string;
  relatedCategories: string[];
  tags: string[];
  definition: {
    simple: string;
    detailed: string;
    discoveredBy: string;
    year: number;
  };
  designImpact: {
    description: string;
    whenToUseCount: number;
    commonMistakeCount: number;
  };
  detection: {
    checklistQuestions: string[];
    patternCount: number;
  };
  guidelines: {
    dos: string[];
    donts: string[];
  };
  relationships: {
    complements: string[];
    conflicts: string[];
    confusedWith: string[];
  };
}

// ─── Pattern Catalog ────────────────────────────────────────────────────────

export interface PatternEntry {
  id: string;
  name: string;
  description: string;
  category: 'form' | 'modal' | 'data' | 'chat' | 'navigation' | 'feedback' | 'ai-workflow';
  components: string[];
  tokens: string[];
  biases: string[];
  html: string;
  notes: string[];
}

// ─── Root Catalog ───────────────────────────────────────────────────────────

export interface CognivoCatalog {
  components: ComponentEntry[];
  tokens: TokenEntry[];
  biases: BiasEntry[];
  patterns: PatternEntry[];
  meta: {
    version: string;
    generatedAt: string;
    generationTimeMs: number;
    counts: {
      components: number;
      tokens: number;
      biases: number;
      patterns: number;
    };
  };
}
