/**
 * Tool 9: recommend_component
 *
 * Given a sample of the content an agent wants to render, returns the
 * best-fit Cognivo component with reasoning. This is the tool to call
 * BEFORE picking a component — it disambiguates between visually similar
 * choices (markdown vs data card vs insight card vs chart summary).
 *
 * Classification is based on content shape heuristics, not keywords.
 */
import { z } from 'zod';
import type { CognivoCatalog } from '../../catalog/types.js';

export const recommendComponentSchema = z.object({
  content: z
    .string()
    .describe(
      'A sample of the content to render — can be raw text, JSON, markdown, or a description. The tool classifies it and picks the right component.',
    ),
  context: z
    .string()
    .optional()
    .describe(
      'Optional context about where the content will be shown: "chat message", "dashboard widget", "form helper", "alert banner", "chart caption", etc.',
    ),
});

export type RecommendComponentInput = z.infer<typeof recommendComponentSchema>;

interface ContentSignals {
  isStructuredData: boolean;
  hasKeyValuePairs: boolean;
  hasMetricNumbers: boolean;
  hasStatusWords: boolean;
  hasTrends: boolean;
  hasAlertKeywords: boolean;
  hasAnomalyKeywords: boolean;
  hasForecastKeywords: boolean;
  hasProseStructure: boolean;
  hasCodeBlocks: boolean;
  hasListMarkers: boolean;
  avgLineLength: number;
  lineCount: number;
  wordCount: number;
  sentenceCount: number;
}

/**
 * If the content is a JSON object (or array of objects), return the first
 * object's entries so it can be analyzed as key-value data. Returns null
 * for primitives, empty arrays, and anything that doesn't parse.
 */
function tryParseJsonObject(content: string): Record<string, unknown> | null {
  const trimmed = content.trim();
  if (!trimmed.startsWith('{') && !trimmed.startsWith('[')) return null;
  try {
    const parsed: unknown = JSON.parse(trimmed);
    const candidate = Array.isArray(parsed) ? parsed[0] : parsed;
    if (candidate && typeof candidate === 'object' && !Array.isArray(candidate)) {
      return candidate as Record<string, unknown>;
    }
    return null;
  } catch {
    return null;
  }
}

function analyzeContent(content: string): ContentSignals {
  // JSON payloads (the common case for agent tool output) carry their
  // structure in the object shape, not in line layout — normalize to
  // "key: value" lines so the line-based heuristics below apply.
  const json = tryParseJsonObject(content);
  if (json !== null) {
    const normalized = Object.entries(json)
      .map(([k, v]) => `${k}: ${typeof v === 'object' ? JSON.stringify(v) : String(v)}`)
      .join('\n');
    return { ...analyzeContent(normalized), isStructuredData: true };
  }

  const lines = content.split('\n').filter((l) => l.trim().length > 0);
  const words = content.split(/\s+/).filter((w) => w.length > 0);
  const sentences = content.split(/[.!?]+\s+/).filter((s) => s.trim().length > 0);

  // Key-value pairs: "Label: value" or "Label = value" patterns.
  // Values may carry signs (+12.4%), currency, and short phrases (Q2 2026).
  const kvPattern = /^[\w\s]{2,30}[:=]\s*[+\-\w$%.,\d ]+$/;
  const kvLines = lines.filter((l) => kvPattern.test(l.trim()));

  // Pure metric numbers (currency, percentage, count)
  const metricPattern = /\$[\d,]+(\.\d+)?|\d+(\.\d+)?%|\b\d{1,3}(,\d{3})+\b/;

  // Status words commonly paired with metrics
  const statusWords = /\b(success|error|warning|failed|passed|pending|active|disabled|completed|in[- ]progress)\b/i;

  // Trend indicators (signed deltas like "+12.4%" have no \b before the sign)
  const trendPattern = /\b(up|down|↑|↓|▲|▼|increas|decreas|spike|drop|surge)\b|(^|[\s:="'])[+\-]\d/im;

  // Alert urgency
  const alertPattern = /\b(critical|urgent|warning|danger|caution|deadline|expires?|overdue|immediate|action required)\b/i;

  // AI anomaly/insight vocabulary
  const anomalyPattern = /\b(anomaly|outlier|unusual|unexpected|irregular|deviation)\b/i;
  const forecastPattern = /\b(forecast|predict|projection|estimate|trend|expected|future)\b/i;

  // Prose structure: multiple sentences in paragraph form
  const proseStructure =
    sentences.length >= 2 && words.length / sentences.length > 5;

  // Code blocks
  const codeBlocks = /```[\s\S]*?```|`[^`]+`/.test(content);

  // List markers
  const listMarkers = /^[-*]\s+|^\d+\.\s+/m.test(content);

  const avgLineLength = lines.length > 0 ? words.length / lines.length : 0;

  return {
    isStructuredData: false,
    hasKeyValuePairs: kvLines.length >= 2,
    hasMetricNumbers: metricPattern.test(content),
    hasStatusWords: statusWords.test(content),
    hasTrends: trendPattern.test(content),
    hasAlertKeywords: alertPattern.test(content),
    hasAnomalyKeywords: anomalyPattern.test(content),
    hasForecastKeywords: forecastPattern.test(content),
    hasProseStructure: proseStructure,
    hasCodeBlocks: codeBlocks,
    hasListMarkers: listMarkers,
    avgLineLength,
    lineCount: lines.length,
    wordCount: words.length,
    sentenceCount: sentences.length,
  };
}

interface Recommendation {
  component: string;
  confidence: 'high' | 'medium' | 'low';
  reasoning: string[];
  example: string;
  alternatives: { component: string; whenInstead: string }[];
}

function classify(signals: ContentSignals, context: string): Recommendation {
  const reasoning: string[] = [];
  const ctx = context.toLowerCase();

  // ── Alerts (highest priority — urgency trumps everything)
  if (signals.hasAlertKeywords && signals.wordCount < 50) {
    reasoning.push('Content contains alert/urgency keywords (critical, deadline, action required).');
    reasoning.push('Short form suggests a banner or card, not a full article.');
    return {
      component: 'ai-alert-card',
      confidence: 'high',
      reasoning,
      example: `<ai-alert-card
  severity="high"
  title="Action required"
  message="${signals.wordCount < 20 ? 'Your content here' : '...'}"
  deadline="2 hours"
></ai-alert-card>`,
      alternatives: [
        { component: 'cg-callout', whenInstead: 'For static inline notices without AI urgency framing.' },
        { component: 'ai-toast', whenInstead: 'For transient notifications that auto-dismiss.' },
      ],
    };
  }

  // ── Metric data (key-value pairs dominate)
  if (
    (signals.hasKeyValuePairs || signals.isStructuredData) &&
    (signals.hasMetricNumbers || signals.hasStatusWords || signals.hasTrends)
  ) {
    reasoning.push(
      signals.isStructuredData
        ? 'Content is structured JSON data (label → value pairs).'
        : 'Content is structured as label → value pairs.',
    );
    if (signals.hasMetricNumbers) reasoning.push('Contains numeric metrics (currency, percentages, counts).');
    if (signals.hasTrends) reasoning.push('Contains trend/delta indicators.');
    if (signals.hasStatusWords) reasoning.push('Contains status indicators (success/error/warning).');
    reasoning.push('Users will scan/compare, not read top-to-bottom.');
    return {
      component: 'ai-data-card',
      confidence: 'high',
      reasoning,
      example: `<ai-data-card
  title="Summary"
  headerStatus="success"
  .fields=\${[
    { label: 'Errors', value: 2, type: 'number', status: 'error' },
    { label: 'Warnings', value: 2, type: 'number', status: 'warning' },
    { label: 'Passed', value: '1,127', type: 'number', status: 'success' },
  ]}
></ai-data-card>`,
      alternatives: [
        { component: 'cg-metric-card', whenInstead: 'For a single headline metric with a trend delta.' },
        { component: 'ai-kpi-grid', whenInstead: 'For 4+ metrics in a responsive grid layout.' },
      ],
    };
  }

  // ── Anomaly / insight with confidence
  if (signals.hasAnomalyKeywords || (signals.hasForecastKeywords && signals.sentenceCount <= 3)) {
    reasoning.push('Content describes an AI insight (anomaly/forecast/explanation).');
    reasoning.push('Short enough to fit a single card with expandable detail.');
    return {
      component: 'ai-insight-card',
      confidence: 'high',
      reasoning,
      example: `<ai-insight-card
  type="${signals.hasAnomalyKeywords ? 'anomaly' : 'forecast'}"
  text="Your insight text"
  confidence="0.87"
  expandable
  .sources=\${['source1.csv']}
></ai-insight-card>`,
      alternatives: [
        { component: 'ai-chart-summary', whenInstead: 'If the insight sits alongside a chart/visualization.' },
        { component: 'cg-markdown', whenInstead: 'If the insight is a long-form analysis without typed metadata.' },
      ],
    };
  }

  // ── Chart summary with trends
  if (signals.hasTrends && (ctx.includes('chart') || ctx.includes('graph') || ctx.includes('dashboard'))) {
    reasoning.push('Content has trend indicators and chart context.');
    return {
      component: 'ai-chart-summary',
      confidence: 'high',
      reasoning,
      example: `<ai-chart-summary
  summary="Revenue grew 12% this quarter"
  type="summary"
  .trends=\${[
    { label: 'Q3 Revenue', direction: 'up', value: '+12%' },
    { label: 'Churn', direction: 'down', value: '-3%' },
  ]}
  timeRange="Q3 2024"
></ai-chart-summary>`,
      alternatives: [
        { component: 'ai-insight-card', whenInstead: 'Standalone insight not tied to a specific chart.' },
      ],
    };
  }

  // ── Code blocks dominate
  if (signals.hasCodeBlocks && signals.wordCount < 100) {
    reasoning.push('Content is primarily code.');
    return {
      component: 'cg-code-block',
      confidence: 'high',
      reasoning,
      example: `<cg-code-block language="typescript" copyable>
const result = process(data);
</cg-code-block>`,
      alternatives: [
        { component: 'cg-markdown', whenInstead: 'If code is mixed with explanation prose.' },
      ],
    };
  }

  // ── Prose / markdown (default for AI chat output, explanations, etc.)
  if (signals.hasProseStructure || signals.hasListMarkers || signals.wordCount > 30) {
    reasoning.push('Content is narrative prose or loose bullets.');
    if (signals.hasProseStructure) reasoning.push('Multiple full sentences detected.');
    if (signals.hasListMarkers) reasoning.push('Contains list markers (- or 1.).');
    reasoning.push('Users will read top-to-bottom; no structured metadata to exploit.');
    return {
      component: 'cg-markdown',
      confidence: 'high',
      reasoning,
      example: `<cg-markdown
  text="## Summary

The dataset shows strong upward trend from Q1 to Q3. Outliers were detected in March, likely caused by a seasonal spike.

- Strong growth
- March anomaly
- Regional variance"
></cg-markdown>`,
      alternatives: [
        { component: 'ai-streaming-text', whenInstead: 'When content is actively streaming from an LLM.' },
        { component: 'ai-data-card', whenInstead: 'If bullets turn out to be label→value pairs.' },
      ],
    };
  }

  // ── Fallback: short text
  reasoning.push('Content is too short to classify confidently.');
  reasoning.push('Defaulting to plain text rendering.');
  return {
    component: 'cg-text',
    confidence: 'low',
    reasoning,
    example: '<cg-text>Short text content</cg-text>',
    alternatives: [
      { component: 'cg-markdown', whenInstead: 'If content may grow or contain formatting.' },
      { component: 'cg-badge', whenInstead: 'If this is a label or status tag.' },
    ],
  };
}

export function recommendComponent(
  catalog: CognivoCatalog,
  input: RecommendComponentInput,
): string {
  const signals = analyzeContent(input.content);
  const recommendation = classify(signals, input.context ?? '');

  // Verify component exists in catalog
  const component = catalog.components.find((c) => c.tag === recommendation.component);
  const status = component
    ? `(${component.category}, ${component.properties.length} props)`
    : '(not in catalog — may be deprecated)';

  const lines: string[] = [];
  lines.push('## Recommended Component\n');
  lines.push(`**\`<${recommendation.component}>\`** ${status}`);
  lines.push(`Confidence: **${recommendation.confidence}**\n`);

  lines.push('### Why this component');
  recommendation.reasoning.forEach((r, i) => {
    lines.push(`${i + 1}. ${r}`);
  });
  lines.push('');

  lines.push('### Usage');
  lines.push('```html');
  lines.push(recommendation.example);
  lines.push('```\n');

  if (recommendation.alternatives.length > 0) {
    lines.push('### Consider these alternatives');
    recommendation.alternatives.forEach((alt) => {
      lines.push(`- **\`<${alt.component}>\`** — ${alt.whenInstead}`);
    });
    lines.push('');
  }

  lines.push('### Next step');
  lines.push(
    `Call \`cognivo_get_component\` with \`tag: "${recommendation.component}"\` for the full API reference, or \`cognivo_validate_usage\` to lint your generated code.`,
  );

  return lines.join('\n');
}
