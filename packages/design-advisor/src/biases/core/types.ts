/**
 * Comprehensive type system for cognitive bias cards
 * Every bias follows this exact structure - NO EXCEPTIONS!
 */

/**
 * Intent structure for AI analysis
 */
export interface Intent<TInput, TOutput> {
  systemPrompt: string;
  outputSchema?: Record<string, unknown>;
}

/**
 * Main category classification for biases
 */
export enum BiasCategory {
  PERCEPTION = 'perception',
  DECISION_MAKING = 'decision-making',
  MEMORY = 'memory',
  SOCIAL = 'social',
  ATTRIBUTION = 'attribution',
  EMOTIONAL = 'emotional',
  COGNITIVE = 'cognitive',
}

/**
 * Design impact severity levels
 */
export enum ImpactLevel {
  CRITICAL = 'critical', // Must address immediately
  HIGH = 'high', // Should address soon
  MEDIUM = 'medium', // Consider addressing
  LOW = 'low', // Nice to have
}

/**
 * Complete bias card structure
 * Every single bias MUST implement this interface fully
 */
export interface BiasCard {
  //===========================================
  // METADATA - Who and What
  //===========================================
  metadata: {
    id: string; // kebab-case: "anchoring-bias"
    name: string; // Display name: "Anchoring Bias"
    aliases: string[]; // Other names: ["First Impression Bias"]
    category: BiasCategory; // Primary category
    relatedCategories: BiasCategory[]; // Secondary categories
    tags: string[]; // Searchable tags: ["pricing", "first-impression"]
  };

  //===========================================
  // DEFINITION - What It Is
  //===========================================
  definition: {
    // One-sentence explanation (< 100 chars)
    simple: string;

    // Full explanation (2-3 paragraphs)
    detailed: string;

    // Scientific/psychological foundation
    psychologyBasis: {
      discoveredBy: string; // Researcher(s)
      year: number; // Year discovered/published
      theory: string; // Underlying psychological theory
      mechanism: string; // How it works in the brain
    };

    // Real-world example (non-design)
    realWorldExample: string;
  };

  //===========================================
  // DESIGN APPLICATION - How It Applies to UI/UX
  //===========================================
  designImpact: {
    // How this bias affects user interfaces
    description: string;

    // When designers SHOULD leverage this bias
    whenToUse: UseCase[];

    // When designers should AVOID leveraging this
    whenToAvoid: AvoidCase[];

    // Common mistakes designers make with this bias
    commonMistakes: Mistake[];

    // Impact on different design areas
    impactAreas: {
      layout: ImpactAssessment;
      typography: ImpactAssessment;
      color: ImpactAssessment;
      interaction: ImpactAssessment;
      content: ImpactAssessment;
      accessibility: ImpactAssessment;
    };
  };

  //===========================================
  // EXAMPLES - Show, Don't Tell
  //===========================================
  examples: {
    // ✅ GOOD examples - proper usage
    good: DesignExample[];

    // ❌ BAD examples - what NOT to do
    bad: DesignExample[];

    // 🌍 REAL WORLD - actual products/sites using this
    realWorld: RealWorldExample[];

    // 🧪 A/B TEST - before/after comparisons
    abTests: ABTestExample[];
  };

  //===========================================
  // DETECTION - How AI Finds This in Designs
  //===========================================
  detection: {
    // Visual cues that indicate this bias at play
    visualCues: VisualCue[];

    // Patterns AI should detect
    patterns: DetectionPattern[];

    // Questions to ask about the design
    checklistQuestions: string[];
  };

  //===========================================
  // AI INTENT - How Cognivo Analyzes This
  //===========================================
  intent: Intent<BiasAnalysisInput, BiasAnalysisOutput>;

  //===========================================
  // GUIDELINES - How to Use Properly
  //===========================================
  guidelines: {
    // Step-by-step implementation guide
    implementation: ImplementationStep[];

    // Do's and Don'ts
    dos: string[];
    donts: string[];

    // Best practices
    bestPractices: BestPractice[];

    // Accessibility considerations
    accessibility: AccessibilityGuideline[];

    // Ethical considerations
    ethics: EthicalConsideration[];
  };

  //===========================================
  // RESEARCH & RESOURCES
  //===========================================
  resources: {
    // Academic papers
    papers: Resource[];

    // Books
    books: Resource[];

    // Articles & blog posts
    articles: Resource[];

    // Videos & talks
    videos: Resource[];

    // Interactive demos
    demos: Resource[];
  };

  //===========================================
  // RELATIONSHIPS - Connected Biases
  //===========================================
  relationships: {
    // Biases that work together with this one
    complements: string[]; // Bias IDs

    // Biases that conflict with this one
    conflicts: string[]; // Bias IDs

    // Biases often confused with this one
    confusedWith: string[]; // Bias IDs

    // Parent/child relationships
    hierarchy: {
      parent?: string; // More general bias
      children: string[]; // More specific biases
    };
  };
}

//===========================================
// SUPPORTING TYPES
//===========================================

export interface UseCase {
  title: string;
  scenario: string; // When this applies
  example: string; // Concrete example
  impact: ImpactLevel;
}

export interface AvoidCase {
  title: string;
  reason: string; // Why to avoid
  consequence: string; // What happens if you don't
  alternative: string; // What to do instead
}

export interface Mistake {
  title: string;
  description: string;
  why: string; // Why it's wrong
  fix: string; // How to correct it
}

export interface ImpactAssessment {
  level: ImpactLevel;
  description: string;
  examples: string[];
}

export interface DesignExample {
  title: string;
  description: string;
  image?: string; // URL or path to image
  code?: string; // HTML/CSS code snippet
  explanation: string; // Why it works/doesn't work
  principle: string; // What principle it demonstrates
  metrics?: {
    // If available, show impact
    before?: string;
    after?: string;
    improvement?: string;
  };
}

export interface RealWorldExample {
  company: string;
  product: string;
  url?: string;
  screenshot?: string;
  description: string;
  effectiveness: 'very-effective' | 'effective' | 'somewhat-effective';
  analysis: string;
}

export interface ABTestExample {
  title: string;
  hypothesis: string;
  controlVersion: {
    description: string;
    image?: string;
    metrics: TestMetrics;
  };
  treatmentVersion: {
    description: string;
    image?: string;
    metrics: TestMetrics;
  };
  results: {
    winner: 'control' | 'treatment' | 'inconclusive';
    analysis: string;
    learnings: string[];
  };
}

export interface TestMetrics {
  conversionRate?: string;
  clickThroughRate?: string;
  timeOnPage?: string;
  bounceRate?: string;
  [key: string]: string | undefined;
}

export interface VisualCue {
  name: string;
  description: string;
  howToSpot: string;
  severity: ImpactLevel;
}

export interface DetectionPattern {
  name: string;
  description: string;
  indicators: string[]; // What to look for
  severity: ImpactLevel;
  confidence: 'high' | 'medium' | 'low'; // How certain this detection is
}

export interface ImplementationStep {
  step: number;
  title: string;
  description: string;
  example: string;
  tips: string[];
}

export interface BestPractice {
  title: string;
  description: string;
  rationale: string; // Why this is best practice
  example: string;
}

export interface AccessibilityGuideline {
  wcagLevel: 'A' | 'AA' | 'AAA';
  criterion: string; // WCAG criterion number
  guideline: string;
  implementation: string;
}

export interface EthicalConsideration {
  concern: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  explanation: string;
  mitigation: string; // How to address this ethically
}

export interface Resource {
  title: string;
  author: string;
  year?: number;
  url?: string;
  isbn?: string; // For books
  doi?: string; // For papers
  description: string;
  type: 'foundational' | 'advanced' | 'practical' | 'case-study';
}

//===========================================
// AI ANALYSIS TYPES
//===========================================

export interface BiasAnalysisInput {
  // Design to analyze
  design: {
    html?: string;
    css?: string;
    screenshot?: string; // Base64 or URL
    url?: string;
    description?: string;
  };

  // Context
  context: {
    industry?: string;
    targetAudience?: string;
    goals?: string[];
    constraints?: string[];
  };

  // Focus areas (optional - analyze specific bias)
  focusBiases?: string[]; // Bias IDs to focus on
}

export interface BiasAnalysisOutput {
  // Overall assessment
  summary: {
    biasesDetected: number;
    overallScore: number; // 0-100
    severity: ImpactLevel;
    topIssues: string[];
    topStrengths: string[];
  };

  // Per-bias findings
  biasFindings: BiasFind[];

  // Recommendations
  recommendations: Recommendation[];

  // Confidence
  confidence: number; // 0-1
}

export interface BiasFind {
  biasId: string;
  biasName: string;
  detected: boolean;
  confidence: number; // 0-1
  severity: ImpactLevel;
  locations: Location[]; // Where found in design
  explanation: string;
  impact: string;
  suggestion: string;
}

export interface Location {
  type: 'element' | 'section' | 'page' | 'interaction';
  selector?: string; // CSS selector if applicable
  description: string;
  screenshot?: string; // Highlighted area
}

export interface Recommendation {
  priority: number; // 1 = highest
  title: string;
  description: string;
  biasesAddressed: string[]; // Bias IDs
  implementation: string;
  expectedImpact: string;
  effort: 'low' | 'medium' | 'high';
}
