import { describe, it, expect } from 'vitest';
import { computeLensScore, ScoreEwma, getFormula, DEFAULT_FORMULA_VERSION } from '../../scorer';
import { definePersona } from '../../personas/define-persona';
import type { Finding } from '../../types/findings';

function f(overrides: Partial<Finding> = {}): Finding {
  return {
    id: overrides.id ?? 'f-1',
    ruleId: overrides.ruleId ?? 'r/x',
    severity: overrides.severity ?? 'consider',
    confidence: overrides.confidence ?? 80,
    targetNodeId: overrides.targetNodeId ?? 'n-1',
    category: overrides.category ?? 'system-health',
    message: overrides.message ?? 'm',
    why: overrides.why ?? '',
    citations: overrides.citations ?? [],
    detectedAt: overrides.detectedAt ?? new Date().toISOString(),
    ...(overrides.fixHint && { fixHint: overrides.fixHint }),
  };
}

describe('computeLensScore', () => {
  it('returns 100 across all sub-scores when there are no findings', () => {
    const score = computeLensScore([]);
    expect(score.composite).toBe(100);
    expect(score.subScores['cognitive-clarity'].value).toBe(100);
    expect(score.subScores['accessibility'].value).toBe(100);
  });

  it('a single blocker at 100% confidence deducts 20 from its sub-score', () => {
    const finding = f({ severity: 'blocker', confidence: 100, category: 'accessibility' });
    const score = computeLensScore([finding]);
    expect(score.subScores['accessibility'].value).toBe(80);
  });

  it('confidence factor scales the deduction', () => {
    const half = f({ severity: 'blocker', confidence: 50, category: 'accessibility' });
    const score = computeLensScore([half]);
    // -20 * 0.5 = -10 → 90
    expect(score.subScores['accessibility'].value).toBe(90);
  });

  it('diminishing returns reduce repeat-rule contributions', () => {
    const findings = Array.from({ length: 5 }, (_, i) =>
      f({
        id: `f-${i}`,
        ruleId: 'r/repeat',
        severity: 'consider',
        confidence: 100,
        category: 'system-health',
        targetNodeId: `n-${i}`,
      })
    );
    const score = computeLensScore(findings);
    // Without DR: 5 × -2 = -10. With DR: -2 + -2/1.15 + -2/1.30 + -2/1.45 + -2/1.60 ≈ -7.34
    // So sub-score should be > 90 (less deduction than without DR)
    expect(score.subScores['system-health'].value).toBeGreaterThan(90);
    expect(score.subScores['system-health'].value).toBeLessThan(95);
  });

  it('positive findings add to the sub-score (bounded by clamp at 100)', () => {
    const wins = [
      f({ severity: 'positive', confidence: 100, category: 'persuasive-integrity' }),
      f({
        id: 'f-2',
        ruleId: 'r/y',
        severity: 'positive',
        confidence: 100,
        category: 'persuasive-integrity',
      }),
    ];
    const score = computeLensScore(wins);
    expect(score.subScores['persuasive-integrity'].value).toBe(100);
  });

  it('composite uses weighted arithmetic of sub-scores (default formula)', () => {
    // Each sub-score = 80, weights 0.30 + 0.25 + 0.25 + 0.20 = 1, so composite = 80
    const findings: Finding[] = [
      f({ severity: 'blocker', confidence: 100, category: 'cognitive-clarity', id: '1', ruleId: 'a' }),
      f({ severity: 'blocker', confidence: 100, category: 'persuasive-integrity', id: '2', ruleId: 'b' }),
      f({ severity: 'blocker', confidence: 100, category: 'accessibility', id: '3', ruleId: 'c' }),
      f({ severity: 'blocker', confidence: 100, category: 'system-health', id: '4', ruleId: 'd' }),
    ];
    const score = computeLensScore(findings);
    expect(score.composite).toBe(80);
  });

  it('caps composite at 70 if any sub-score < 40', () => {
    // Drive accessibility to ~10 by stacking 5 blockers (DR softens but still below 40)
    const findings: Finding[] = Array.from({ length: 5 }, (_, i) =>
      f({
        id: `a${i}`,
        ruleId: `a/${i}`,
        severity: 'blocker',
        confidence: 100,
        category: 'accessibility',
        targetNodeId: `n${i}`,
      })
    );
    const score = computeLensScore(findings);
    expect(score.subScores['accessibility'].value).toBeLessThan(40);
    expect(score.composite).toBeLessThanOrEqual(70);
  });

  it('caps composite at 50 if any sub-score < 25', () => {
    const findings: Finding[] = Array.from({ length: 8 }, (_, i) =>
      f({
        id: `a${i}`,
        ruleId: `a/${i}`,
        severity: 'blocker',
        confidence: 100,
        category: 'accessibility',
        targetNodeId: `n${i}`,
      })
    );
    const score = computeLensScore(findings);
    expect(score.subScores['accessibility'].value).toBeLessThan(25);
    expect(score.composite).toBeLessThanOrEqual(50);
  });

  it('records formulaVersion + engineVersion on the LensScore', () => {
    const score = computeLensScore([], { engineVersion: '0.1.0-test' });
    expect(score.formulaVersion).toBe(DEFAULT_FORMULA_VERSION);
    expect(score.engineVersion).toBe('0.1.0-test');
  });

  it('topDeductions are sorted by most negative delta first', () => {
    const findings = [
      f({
        id: '1',
        ruleId: 'small',
        severity: 'consider',
        confidence: 100,
        category: 'system-health',
      }),
      f({
        id: '2',
        ruleId: 'big',
        severity: 'blocker',
        confidence: 100,
        category: 'system-health',
      }),
    ];
    const score = computeLensScore(findings);
    const top = score.subScores['system-health'].topDeductions;
    expect(top[0]!.ruleId).toBe('big');
  });

  it('persona ruleWeights modulate confidence', () => {
    const persona = definePersona({
      id: 'screen-reader',
      title: 'Screen reader',
      framing: 'A user navigating exclusively by keyboard with a screen reader.',
      evidenceLevel: 'strong',
      constraints: [],
      attention: { dwellSeconds: 60, scanPattern: 'sequential', outOfFocusPenalty: 1 },
      ruleWeights: { 'a/contrast': 3 },
      activatesRules: [],
      citations: ['WCAG 2.1 AA'],
    });

    // Low confidence finding gets amplified by persona weight
    const finding = f({
      id: '1',
      ruleId: 'a/contrast',
      severity: 'strong',
      confidence: 30,
      category: 'accessibility',
    });

    const baseScore = computeLensScore([finding]);
    const personaScore = computeLensScore([finding], { persona });

    // Persona-adjusted confidence should hurt accessibility more
    expect(personaScore.subScores['accessibility'].value).toBeLessThan(
      baseScore.subScores['accessibility'].value
    );
  });
});

describe('ScoreEwma', () => {
  it('first push returns the input unchanged', () => {
    const ewma = new ScoreEwma(0.7);
    expect(ewma.push(80)).toBe(80);
  });

  it('subsequent pushes mix toward new values', () => {
    const ewma = new ScoreEwma(0.7);
    ewma.push(80);
    const next = ewma.push(90);
    // 0.7 * 90 + 0.3 * 80 = 63 + 24 = 87
    expect(next).toBe(87);
  });

  it('rejects alpha out of range', () => {
    expect(() => new ScoreEwma(-0.1)).toThrow();
    expect(() => new ScoreEwma(1.5)).toThrow();
  });

  it('reset() clears state', () => {
    const ewma = new ScoreEwma();
    ewma.push(50);
    ewma.reset();
    expect(ewma.peek()).toBeNull();
    expect(ewma.push(80)).toBe(80);
  });
});

describe('formula registry', () => {
  it('returns the v2026.04 formula by default', () => {
    const f = getFormula(DEFAULT_FORMULA_VERSION);
    expect(f.severityWeight.blocker).toBe(-20);
    expect(f.subScoreWeights['cognitive-clarity']).toBe(0.3);
  });

  it('throws on unknown version', () => {
    expect(() => getFormula('v9999.99')).toThrow(/unknown formula/);
  });
});
