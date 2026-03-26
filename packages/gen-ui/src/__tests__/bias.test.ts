import { describe, it, expect } from 'vitest';
import {
  cognivoLibrary,
  createParser,
  suggestBiasesForTree,
  formatBiasReport,
  getManifest,
  getAllEngagedBiases,
  getComponentsByBias,
} from '../index.js';

const parser = createParser(cognivoLibrary.toJSONSchema());

// ─────────────────────────────────────────────────────────────────────────────
// suggestBiasesForTree
// ─────────────────────────────────────────────────────────────────────────────

describe('suggestBiasesForTree()', () => {
  it('returns empty for null root', () => {
    const result = { root: null, meta: { incomplete: true, unresolved: [], statementCount: 0, validationErrors: [], tokenViolations: [] } };
    expect(suggestBiasesForTree(result, cognivoLibrary)).toEqual([]);
  });

  it('detects anchoring-bias in MetricCard dashboard', () => {
    const result = parser.parse(`root = Stack([kpi1, kpi2, kpi3], "row")
kpi1 = MetricCard("Revenue", "$2.4M", "+18%", "up")
kpi2 = MetricCard("Users", "12,500", "+5%", "up")
kpi3 = MetricCard("Churn", "1.8%", "-0.3%", "down")`);

    const suggestions = suggestBiasesForTree(result, cognivoLibrary);
    expect(suggestions.length).toBeGreaterThan(0);

    const anchoring = suggestions.find(s => s.biasId === 'anchoring-bias');
    expect(anchoring).toBeDefined();
    expect(anchoring!.components).toContain('MetricCard');
    expect(anchoring!.occurrences).toBe(3);
  });

  it('detects framing-effect in insight cards', () => {
    const result = parser.parse(`root = Stack([ins1, ins2])
ins1 = AiInsightCard("explanation", "Revenue grew 12%", 0.94)
ins2 = AiInsightCard("forecast", "Projected to reach $3M", 0.85)`);

    const suggestions = suggestBiasesForTree(result, cognivoLibrary);
    const framing = suggestions.find(s => s.biasId === 'framing-effect');
    expect(framing).toBeDefined();
    expect(framing!.components).toContain('AiInsightCard');
  });

  it('detects authority-bias in AiResultPanel', () => {
    const result = parser.parse(`root = AiResultPanel("Analysis", "Strong quarter.", ["Revenue up 18%"], [], 0.93)`);

    const suggestions = suggestBiasesForTree(result, cognivoLibrary);
    const authority = suggestions.find(s => s.biasId === 'authority-bias');
    expect(authority).toBeDefined();
  });

  it('detects multiple biases in complex dashboard', () => {
    const result = parser.parse(`root = Stack([header, kpis, analysis, chart])
header = TextContent("Dashboard", "2xl", "bold")
kpis = Stack([k1, k2], "row")
k1 = MetricCard("Revenue", "$2.4M", "+18%", "up")
k2 = MetricCard("Users", "12K", "+5%", "up")
analysis = AiResultPanel("Q4 Analysis", "Strong quarter.", ["Revenue up"], [], 0.93)
chart = Chart([{label: "Q1", value: 100}, {label: "Q2", value: 150}], "bar", "Revenue")`);

    const suggestions = suggestBiasesForTree(result, cognivoLibrary);
    expect(suggestions.length).toBeGreaterThanOrEqual(3);

    const biasIds = suggestions.map(s => s.biasId);
    expect(biasIds).toContain('anchoring-bias');
    expect(biasIds).toContain('framing-effect');
    expect(biasIds).toContain('authority-bias');
  });

  it('sorts by severity (critical/high first)', () => {
    const result = parser.parse(`root = Stack([k1, k2, k3, k4, k5], "row")
k1 = MetricCard("A", "1", "+1%", "up")
k2 = MetricCard("B", "2", "+2%", "up")
k3 = MetricCard("C", "3", "+3%", "up")
k4 = MetricCard("D", "4", "+4%", "up")
k5 = MetricCard("E", "5", "+5%", "up")`);

    const suggestions = suggestBiasesForTree(result, cognivoLibrary);
    if (suggestions.length >= 2) {
      const severities = suggestions.map(s => s.severity);
      const order = { critical: 0, high: 1, medium: 2, low: 3 };
      for (let i = 1; i < severities.length; i++) {
        expect(order[severities[i]!]).toBeGreaterThanOrEqual(order[severities[i - 1]!]);
      }
    }
  });

  it('includes recommendations', () => {
    const result = parser.parse('root = MetricCard("Revenue", "$2.4M", "+18%", "up")');
    const suggestions = suggestBiasesForTree(result, cognivoLibrary);
    for (const s of suggestions) {
      expect(s.recommendation.length).toBeGreaterThan(10);
    }
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// formatBiasReport
// ─────────────────────────────────────────────────────────────────────────────

describe('formatBiasReport()', () => {
  it('returns no-bias message for empty suggestions', () => {
    expect(formatBiasReport([])).toContain('No cognitive biases');
  });

  it('formats a real report', () => {
    const result = parser.parse(`root = Stack([k1, panel])
k1 = MetricCard("Revenue", "$2.4M", "+18%", "up")
panel = AiResultPanel("Analysis", "Good quarter.", ["Up 18%"], [], 0.9)`);

    const suggestions = suggestBiasesForTree(result, cognivoLibrary);
    const report = formatBiasReport(suggestions);

    expect(report).toContain('Cognitive Bias Analysis');
    expect(report).toContain('Anchoring Bias');
    expect(report).toContain('Recommendation');
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// getManifest
// ─────────────────────────────────────────────────────────────────────────────

describe('getManifest()', () => {
  const manifests = getManifest(cognivoLibrary);

  it('returns manifest for all 41 components', () => {
    expect(manifests).toHaveLength(41);
  });

  it('each manifest has required fields', () => {
    for (const m of manifests) {
      expect(m.name).toBeTruthy();
      expect(m.tagName).toBeTruthy();
      expect(Array.isArray(m.tags)).toBe(true);
      expect(Array.isArray(m.engagedBiasIds)).toBe(true);
      expect(m.description).toBeTruthy();
      expect(m.group).toBeTruthy();
    }
  });

  it('MetricCard has anchoring-bias and dashboard tags', () => {
    const metric = manifests.find(m => m.name === 'MetricCard');
    expect(metric).toBeDefined();
    expect(metric!.engagedBiasIds).toContain('anchoring-bias');
    expect(metric!.tags).toContain('metrics');
    expect(metric!.tags).toContain('dashboard');
  });

  it('Chart has data-visualization tag', () => {
    const chart = manifests.find(m => m.name === 'Chart');
    expect(chart).toBeDefined();
    expect(chart!.tags).toContain('data-visualization');
  });

  it('AiInsightCard has ai and trust tags', () => {
    const insight = manifests.find(m => m.name === 'AiInsightCard');
    expect(insight).toBeDefined();
    expect(insight!.tags).toContain('ai');
    expect(insight!.tags).toContain('trust');
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// getAllEngagedBiases / getComponentsByBias
// ─────────────────────────────────────────────────────────────────────────────

describe('getAllEngagedBiases()', () => {
  it('returns all unique bias IDs across the library', () => {
    const biases = getAllEngagedBiases(cognivoLibrary);
    expect(biases).toContain('anchoring-bias');
    expect(biases).toContain('framing-effect');
    expect(biases).toContain('authority-bias');
    expect(biases).toContain('availability-heuristic');
    expect(biases.length).toBeGreaterThanOrEqual(4);
  });
});

describe('getComponentsByBias()', () => {
  it('finds all components that engage anchoring-bias', () => {
    const components = getComponentsByBias(cognivoLibrary, 'anchoring-bias');
    expect(components).toContain('MetricCard');
    expect(components).toContain('AiBadge');
    expect(components).toContain('Slider');
    expect(components).toContain('Chart');
  });

  it('returns empty for unknown bias', () => {
    expect(getComponentsByBias(cognivoLibrary, 'nonexistent-bias')).toEqual([]);
  });
});
