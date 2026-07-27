/** One rubric: a judgement call scored by a Judge. */
export interface Rubric {
  id: string;
  /** What the LLM judge scores, e.g. "Chose a confirmation dialog over a generic modal". */
  text: string;
  /**
   * Deterministic offline hints: MockJudge passes the rubric if ANY hint
   * (case-insensitive substring) appears in the output HTML. Omit for
   * live-judge-only rubrics.
   */
  offlineHints?: string[];
}

export interface Expectations {
  /** At least one tag from EACH group must appear (component-choice check). */
  anyOf?: string[][];
  /** All of these tags must appear. */
  mustUseTags?: string[];
  /** None of these tags may appear. */
  forbidTags?: string[];
}

export interface EvalCase {
  id: string;
  category: 'component-choice' | 'token-discipline' | 'a11y' | 'composition';
  /** Intent-level prompt. NEVER names the expected component. */
  prompt: string;
  expect: Expectations;
  rubrics: Rubric[];
}

export interface AgentOutput {
  html: string;
  raw?: string;
}

export interface SampleResult {
  caseId: string;
  sample: number;
  output: AgentOutput;
  deterministicPass: boolean;
  expectationsPass: boolean;
  rubricScores: Array<{ rubricId: string; score: number; reasoning: string }>;
  issues: string[];
  pass: boolean;
}

export interface CaseResult {
  caseId: string;
  category: EvalCase['category'];
  samples: SampleResult[];
  /** True only if EVERY sample passed (worst-of-N). */
  worstOfN: boolean;
  passRate: number;
}

export interface EvalReport {
  mode: 'mock' | 'live' | 'replay';
  agentName: string;
  judgeName: string;
  cases: CaseResult[];
  worstOfNPassRate: number;
  meanPassRate: number;
  startedAt: string;
}
