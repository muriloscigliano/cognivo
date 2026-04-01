/**
 * Gen-UI Parser Benchmarks
 *
 * Run: pnpm --filter @cognivo/gen-ui bench
 */
import { bench, describe } from 'vitest';
import { createParser, createStreamingParser, cognivoLibrary } from '@cognivo/gen-ui';

const schema = cognivoLibrary.toJSONSchema();

const DASHBOARD_DSL = `root = Stack([header, metrics, analysis], "column", "lg")
header = TextContent("Revenue Dashboard", "2xl", "bold")
metrics = Stack([kpi1, kpi2, kpi3], "row", "md")
kpi1 = MetricCard("Revenue", "$2.4M", "+18%", "up")
kpi2 = MetricCard("Customers", "12,500", "+5%", "up")
kpi3 = MetricCard("Churn", "1.8%", "-0.3%", "down")
analysis = AiResultPanel("Q4 Analysis", "Strong quarter driven by enterprise expansion.", bullets, drivers, 0.93)
bullets = ["Enterprise deals up 25%", "SMB segment stable", "Churn reduced", "APAC grew 40%"]
drivers = [{factor: "Enterprise Sales", impact: 0.45}, {factor: "Churn Reduction", impact: 0.30}, {factor: "APAC Expansion", impact: 0.25}]`;

const SIMPLE_DSL = `root = Stack([text, btn], "column", "md")
text = TextContent("Hello World", "xl", "bold")
btn = Button("Click me", "primary", "md")`;

describe('Parser — one-shot', () => {
  bench('parse simple DSL (3 lines)', () => {
    const parser = createParser(schema);
    parser.parse(SIMPLE_DSL);
  });

  bench('parse dashboard DSL (9 lines)', () => {
    const parser = createParser(schema);
    parser.parse(DASHBOARD_DSL);
  });

  bench('create parser + parse', () => {
    const parser = createParser(schema);
    parser.parse(DASHBOARD_DSL);
  });
});

describe('Parser — streaming', () => {
  bench('stream dashboard DSL char-by-char', () => {
    const sp = createStreamingParser(schema);
    for (let i = 0; i < DASHBOARD_DSL.length; i++) {
      sp.push(DASHBOARD_DSL[i]!);
    }
  });

  bench('stream dashboard DSL in 10-char chunks', () => {
    const sp = createStreamingParser(schema);
    for (let i = 0; i < DASHBOARD_DSL.length; i += 10) {
      sp.push(DASHBOARD_DSL.slice(i, i + 10));
    }
  });

  bench('stream dashboard DSL line-by-line', () => {
    const sp = createStreamingParser(schema);
    for (const line of DASHBOARD_DSL.split('\n')) {
      sp.push(line + '\n');
    }
  });

  bench('create streaming parser', () => {
    createStreamingParser(schema);
  });
});

describe('Library — schema generation', () => {
  bench('toJSONSchema()', () => {
    cognivoLibrary.toJSONSchema();
  });

  bench('prompt()', () => {
    cognivoLibrary.prompt();
  });
});
