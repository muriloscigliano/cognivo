import { describe, it, expect } from 'vitest';
import {
  cognivoLibrary,
  cognivoChatLibrary,
  AiThinkingDef,
  AiBadgeDef,
  AiInsightCardDef,
  AiResultPanelDef,
  AiChartSummaryDef,
  AiChatDef,
  StackDef,
  TextContentDef,
  MetricCardDef,
} from '../cognivo-library.js';
import { createParser, createStreamingParser } from '../parser/index.js';

// ─────────────────────────────────────────────────────────────────────────────
// Component definitions
// ─────────────────────────────────────────────────────────────────────────────

describe('Cognivo component definitions', () => {
  it('all 9 components have correct tagNames', () => {
    expect(AiThinkingDef.tagName).toBe('ai-thinking');
    expect(AiBadgeDef.tagName).toBe('ai-badge');
    expect(AiInsightCardDef.tagName).toBe('ai-insight-card');
    expect(AiResultPanelDef.tagName).toBe('ai-result-panel');
    expect(AiChartSummaryDef.tagName).toBe('ai-chart-summary');
    expect(AiChatDef.tagName).toBe('ai-chat');
    expect(StackDef.tagName).toBe('cg-stack');
    expect(TextContentDef.tagName).toBe('cg-text');
    expect(MetricCardDef.tagName).toBe('cg-metric-card');
  });

  it('AI components have biasHints', () => {
    expect(AiBadgeDef.biasHints).toContain('anchoring-bias');
    expect(AiInsightCardDef.biasHints).toContain('framing-effect');
    expect(AiResultPanelDef.biasHints).toContain('authority-bias');
    expect(MetricCardDef.biasHints).toContain('anchoring-bias');
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// cognivoLibrary
// ─────────────────────────────────────────────────────────────────────────────

describe('cognivoLibrary', () => {
  it('contains all 125 components', () => {
    const count = Object.keys(cognivoLibrary.components).length;
    expect(count).toBeGreaterThanOrEqual(125);
  });

  it('root is Stack', () => {
    expect(cognivoLibrary.root).toBe('Stack');
  });

  it('has component groups', () => {
    expect(cognivoLibrary.componentGroups!.length).toBeGreaterThanOrEqual(4);
    expect(cognivoLibrary.componentGroups![0]!.name).toBe('Foundation');
  });

  it('getTagName works for all component types', () => {
    expect(cognivoLibrary.getTagName('AiBadge')).toBe('ai-badge');
    expect(cognivoLibrary.getTagName('AiInsightCard')).toBe('ai-insight-card');
    expect(cognivoLibrary.getTagName('Stack')).toBe('cg-stack');
    expect(cognivoLibrary.getTagName('MetricCard')).toBe('cg-metric-card');
    expect(cognivoLibrary.getTagName('Table')).toBe('cg-table');
    expect(cognivoLibrary.getTagName('Chart')).toBe('cg-chart');
    expect(cognivoLibrary.getTagName('Tabs')).toBe('cg-tabs');
    expect(cognivoLibrary.getTagName('Button')).toBe('cg-button');
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// cognivoChatLibrary (subset without AiChat)
// ─────────────────────────────────────────────────────────────────────────────

describe('cognivoChatLibrary', () => {
  it('contains all components except AiChat', () => {
    const count = Object.keys(cognivoChatLibrary.components).length;
    expect(count).toBeGreaterThanOrEqual(124);
    expect(cognivoChatLibrary.components['AiChat']).toBeUndefined();
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// Prompt generation with real components
// ─────────────────────────────────────────────────────────────────────────────

describe('prompt generation', () => {
  const prompt = cognivoLibrary.prompt();

  it('includes all component signatures', () => {
    expect(prompt).toContain('AiThinking(');
    expect(prompt).toContain('AiBadge(');
    expect(prompt).toContain('AiInsightCard(');
    expect(prompt).toContain('AiResultPanel(');
    expect(prompt).toContain('AiChartSummary(');
    expect(prompt).toContain('Stack(');
    expect(prompt).toContain('TextContent(');
    expect(prompt).toContain('MetricCard(');
  });

  it('includes component descriptions', () => {
    expect(prompt).toContain('confidence score');
    expect(prompt).toContain('AI insight card');
    expect(prompt).toContain('Structured AI analysis');
    expect(prompt).toContain('chart insights');
  });

  it('includes type annotations from Zod schemas', () => {
    // AiInsightCard type enum
    expect(prompt).toMatch(/"explanation"\s*\|\s*"forecast"/);
    // Stack direction enum
    expect(prompt).toMatch(/"row"\s*\|\s*"column"/);
    // Trend direction enum
    expect(prompt).toMatch(/"up"\s*\|\s*"down"\s*\|\s*"neutral"/);
  });

  it('includes design token governance rules', () => {
    expect(prompt).toContain('--cg-');
    expect(prompt).toContain('NEVER use');
    expect(prompt).toContain('hex color');
  });

  it('includes cognitive bias guidance', () => {
    expect(prompt).toContain('Cognitive Design Principles');
    expect(prompt).toContain('Anchoring Bias');
    expect(prompt).toContain('Framing Effect');
    expect(prompt).toContain('Authority Bias');
  });

  it('includes component group notes', () => {
    expect(prompt).toContain('Stack is the root container');
    expect(prompt).toContain('AiInsightCard has 5 types');
    expect(prompt).toContain('MetricCard: group in a row Stack');
  });

  it('includes streaming rules', () => {
    expect(prompt).toContain('root = Stack(');
    expect(prompt).toContain('Hoisting');
    expect(prompt).toContain('progressive');
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// End-to-end: parse LLM output with real Cognivo schema
// ─────────────────────────────────────────────────────────────────────────────

describe('end-to-end parsing with Cognivo library', () => {
  const parser = createParser(cognivoLibrary.toJSONSchema());

  it('parses a dashboard with MetricCards', () => {
    const input = `root = Stack([header, metrics], "column", "lg")
header = TextContent("Revenue Dashboard", "2xl", "bold")
metrics = Stack([kpi1, kpi2, kpi3], "row", "md")
kpi1 = MetricCard("Revenue", "$1.2M", "+12%", "up")
kpi2 = MetricCard("Users", "5,432", "+8%", "up")
kpi3 = MetricCard("Churn", "2.1%", "-0.3%", "down")`;

    const result = parser.parse(input);
    expect(result.root).not.toBeNull();
    expect(result.root!.typeName).toBe('Stack');
    expect(result.meta.validationErrors).toEqual([]);
    expect(result.meta.statementCount).toBe(6);

    // Check MetricCard props are correctly mapped
    const metrics = result.root!.props.children as unknown[];
    expect(metrics).toHaveLength(2); // header + metrics stack
  });

  it('parses AI insight cards', () => {
    const input = `root = Stack([insight1, insight2])
insight1 = AiInsightCard("explanation", "Revenue grew 12% due to new product launch", 0.92, "2024-01-15")
insight2 = AiInsightCard("anomaly", "Unusual spike in returns detected", 0.78)`;

    const result = parser.parse(input);
    expect(result.root).not.toBeNull();

    const children = result.root!.props.children as any[];
    expect(children).toHaveLength(2);

    // First insight should have all props
    expect(children[0].typeName).toBe('AiInsightCard');
    expect(children[0].props.type).toBe('explanation');
    expect(children[0].props.text).toBe('Revenue grew 12% due to new product launch');
    expect(children[0].props.confidence).toBe(0.92);
  });

  it('parses an AiResultPanel with drivers', () => {
    const input = `root = AiResultPanel("Revenue Analysis", explanation, bullets, drivers, 0.95)
explanation = "Revenue increased 12% this quarter driven primarily by new enterprise deals."
bullets = ["Enterprise deals up 25%", "SMB segment flat", "Churn reduced by 15%"]
drivers = [driver1, driver2]
driver1 = {factor: "Enterprise Sales", impact: 0.45}
driver2 = {factor: "Churn Reduction", impact: 0.30}`;

    const result = parser.parse(input);
    expect(result.root).not.toBeNull();
    expect(result.root!.typeName).toBe('AiResultPanel');
    expect(result.root!.props.title).toBe('Revenue Analysis');
    expect(result.root!.props.confidence).toBe(0.95);
  });

  it('parses an AiChartSummary with trends', () => {
    const input = `root = AiChartSummary("Revenue is trending upward with strong Q4 performance.", trends, true)
trends = [t1, t2, t3]
t1 = {label: "Revenue", direction: "up", value: "+12%"}
t2 = {label: "Expenses", direction: "down", value: "-3%"}
t3 = {label: "Margin", direction: "neutral", value: "0.5%"}`;

    const result = parser.parse(input);
    expect(result.root).not.toBeNull();
    expect(result.root!.typeName).toBe('AiChartSummary');
    expect(result.root!.props.summary).toContain('trending upward');
    expect(result.root!.props.collapsible).toBe(true);
  });

  it('parses a full dashboard layout', () => {
    const input = `root = Stack([header, kpis, analysis, insights], "column", "lg")
header = TextContent("AI Dashboard", "3xl", "bold")
kpis = Stack([kpi1, kpi2], "row", "md")
kpi1 = MetricCard("Revenue", "$2.4M", "+18%", "up")
kpi2 = MetricCard("Customers", "12,500", "+5%", "up")
analysis = AiResultPanel("Quarterly Analysis", "Strong quarter driven by enterprise.", ["Deal size up 20%", "Pipeline healthy"], [], 0.91)
insights = Stack([ins1, ins2], "column", "sm")
ins1 = AiInsightCard("forecast", "Revenue projected to hit $3M next quarter", 0.85)
ins2 = AiInsightCard("optimization", "Consider increasing marketing spend in APAC", 0.72)`;

    const result = parser.parse(input);
    expect(result.root).not.toBeNull();
    expect(result.meta.incomplete).toBe(false);
    expect(result.meta.validationErrors).toEqual([]);
    expect(result.meta.statementCount).toBe(9);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// Golden parse strings for Wave 2-4 components
// ─────────────────────────────────────────────────────────────────────────────

describe('golden parse: Wave 2-4 new components', () => {
  const parser = createParser(cognivoLibrary.toJSONSchema());

  it('parses Table with columns and rows', () => {
    const r = parser.parse('root = Table([{key: "name", label: "Name"}], [["Alice"]])');
    expect(r.root!.typeName).toBe('Table');
    expect(r.root!.props.columns).toBeDefined();
  });

  it('parses Select with options', () => {
    const r = parser.parse('root = Select([{value: "a", label: "Alpha"}], "Pick one")');
    expect(r.root!.typeName).toBe('Select');
    expect(r.root!.props.placeholder).toBe('Pick one');
  });

  it('parses Checkbox with label', () => {
    const r = parser.parse('root = Checkbox("Agree to terms", "Read the full agreement", "terms")');
    expect(r.root!.typeName).toBe('Checkbox');
    expect(r.root!.props.label).toBe('Agree to terms');
  });

  it('parses Tabs with items', () => {
    const r = parser.parse('root = Tabs([{value: "a", label: "Tab A"}, {value: "b", label: "Tab B"}])');
    expect(r.root!.typeName).toBe('Tabs');
  });

  it('parses Accordion with items', () => {
    const r = parser.parse('root = Accordion([{value: "q1", trigger: "Question 1", content: "Answer 1"}])');
    expect(r.root!.typeName).toBe('Accordion');
  });

  it('parses Steps with status', () => {
    const r = parser.parse('root = Steps([{title: "Sign Up", status: "done"}, {title: "Verify", status: "active"}])');
    expect(r.root!.typeName).toBe('Steps');
  });

  it('parses Chart with data', () => {
    const r = parser.parse('root = Chart([{label: "Q1", value: 100}, {label: "Q2", value: 200}], "bar", "Revenue")');
    expect(r.root!.typeName).toBe('Chart');
    expect(r.root!.props.type).toBe('bar');
    expect(r.root!.props.title).toBe('Revenue');
  });

  it('parses CodeBlock', () => {
    const r = parser.parse('root = CodeBlock("const x = 1;", "javascript", "app.js")');
    expect(r.root!.typeName).toBe('CodeBlock');
    expect(r.root!.props.code).toBe('const x = 1;');
    expect(r.root!.props.language).toBe('javascript');
  });

  it('parses List with items', () => {
    const r = parser.parse('root = List([{title: "Item 1"}, {title: "Item 2"}], "bullet")');
    expect(r.root!.typeName).toBe('List');
    expect(r.root!.props.variant).toBe('bullet');
  });

  it('parses FollowUp with suggestions', () => {
    const r = parser.parse('root = FollowUp(["Tell me more", "Show data"], "Suggestions")');
    expect(r.root!.typeName).toBe('FollowUp');
    expect(r.root!.props.label).toBe('Suggestions');
  });

  it('parses Section foldable', () => {
    const r = parser.parse('root = Section("Details", "More information here", true, false, true)');
    expect(r.root!.typeName).toBe('Section');
    expect(r.root!.props.title).toBe('Details');
    expect(r.root!.props.foldable).toBe(true);
  });

  it('parses Button with all props', () => {
    const r = parser.parse('root = Button("Submit", "primary", "lg", "normal", false, true)');
    expect(r.root!.typeName).toBe('Button');
    expect(r.root!.props.label).toBe('Submit');
    expect(r.root!.props.loading).toBe(true);
  });

  it('parses Badge with variant', () => {
    const r = parser.parse('root = Badge("Active", "success", "md", true)');
    expect(r.root!.typeName).toBe('Badge');
    expect(r.root!.props.dot).toBe(true);
  });

  it('parses Callout with variant', () => {
    const r = parser.parse('root = Callout("warning", "Heads Up", "This will be permanent.")');
    expect(r.root!.typeName).toBe('Callout');
    expect(r.root!.props.variant).toBe('warning');
  });

  it('parses Markdown', () => {
    const r = parser.parse('root = Markdown("# Hello\\n**bold** text")');
    expect(r.root!.typeName).toBe('Markdown');
  });

  it('parses complex form', () => {
    const r = parser.parse(`root = Form([nameField, emailField, btn], "contact", "md")
nameField = Stack([Label("Name", "", "", true), Input("John", "name")], "column", "xs")
emailField = Stack([Label("Email"), Input("j@e.com", "email", "email")], "column", "xs")
btn = Button("Send", "primary")`);
    expect(r.root!.typeName).toBe('Form');
    expect(r.meta.validationErrors).toEqual([]);
    expect(r.meta.statementCount).toBe(4);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// Streaming with real Cognivo schema
// ─────────────────────────────────────────────────────────────────────────────

describe('streaming parsing with Cognivo library', () => {
  it('progressively builds a dashboard', () => {
    const sp = createStreamingParser(cognivoLibrary.toJSONSchema());

    // Root appears first
    let r = sp.push('root = Stack([header, kpis], "column", "lg")\n');
    expect(r.root).not.toBeNull();
    expect(r.root!.typeName).toBe('Stack');

    // Header fills in
    r = sp.push('header = TextContent("Dashboard", "2xl", "bold")\n');
    expect(r.meta.unresolved).not.toContain('header');

    // KPIs fill in
    r = sp.push('kpis = Stack([kpi1], "row")\n');
    r = sp.push('kpi1 = MetricCard("Revenue", "$1.2M", "+12%", "up")\n');
    expect(r.meta.incomplete).toBe(false);
    expect(r.meta.statementCount).toBe(4);
  });
});
