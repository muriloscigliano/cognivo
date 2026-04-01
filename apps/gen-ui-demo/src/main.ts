/**
 * Cognivo Gen-UI Live Demo
 *
 * Two modes:
 * 1. SIMULATE — character-by-character simulation (no API key needed)
 * 2. GENERATE — real LLM streaming via OpenAI-compatible API
 *
 * Also shows bias analysis panel after generation.
 */

import '../../../packages/tokens/dist/index.css';
import '@cognivo/components';
import {
  cognivoLibrary,
  createParser,
  createStreamingParser,
  suggestBiasesForTree,
  formatBiasReport,
  type ParseResult,
} from '@cognivo/gen-ui';
import { LitRenderer } from '@cognivo/gen-ui-lit';

// ─── DOM refs ────────────────────────────────────────────────────────────────

const promptEl = document.getElementById('prompt') as HTMLTextAreaElement;
const streamBtn = document.getElementById('stream-btn') as HTMLButtonElement;
const generateBtn = document.getElementById('generate-btn') as HTMLButtonElement;
const parseBtn = document.getElementById('parse-btn') as HTMLButtonElement;
const resetBtn = document.getElementById('reset-btn') as HTMLButtonElement;
const previewEl = document.getElementById('preview') as HTMLDivElement;
const codeEl = document.getElementById('code-output') as HTMLPreElement;
const metaEl = document.getElementById('meta-output') as HTMLPreElement;
const biasEl = document.getElementById('bias-output') as HTMLDivElement;
const promptPreviewEl = document.getElementById('prompt-preview') as HTMLPreElement;
const apiKeyEl = document.getElementById('api-key') as HTMLInputElement;
const modelEl = document.getElementById('model-select') as HTMLSelectElement;
const statusEl = document.getElementById('status') as HTMLSpanElement;

// ─── Renderer ────────────────────────────────────────────────────────────────

const renderer = new LitRenderer(cognivoLibrary);
const systemPrompt = cognivoLibrary.prompt();

// ─── Example prompts ─────────────────────────────────────────────────────────

const examples: Record<string, string> = {
  dashboard: `root = Stack([header, metrics, analysis], "column", "lg")
header = TextContent("Revenue Dashboard", "2xl", "bold")
metrics = Stack([kpi1, kpi2, kpi3], "row", "md")
kpi1 = MetricCard("Revenue", "$2.4M", "+18%", "up")
kpi2 = MetricCard("Customers", "12,500", "+5%", "up")
kpi3 = MetricCard("Churn", "1.8%", "-0.3%", "down")
analysis = AiResultPanel("Q4 Analysis", "Strong quarter driven by enterprise expansion and reduced churn.", bullets, drivers, 0.93)
bullets = ["Enterprise deals up 25%", "SMB segment stable", "Churn reduced from 2.1% to 1.8%", "APAC region grew 40%"]
drivers = [{factor: "Enterprise Sales", impact: 0.45}, {factor: "Churn Reduction", impact: 0.30}, {factor: "APAC Expansion", impact: 0.25}]`,

  insights: `root = Stack([title, cards], "column", "lg")
title = TextContent("AI Insights", "xl", "bold")
cards = Stack([ins1, ins2, ins3], "column", "sm")
ins1 = AiInsightCard("explanation", "Revenue growth accelerated due to three enterprise deals closing simultaneously.", 0.94, "2024-01-15")
ins2 = AiInsightCard("forecast", "Q1 revenue projected to reach $2.8M with 85% probability.", 0.85, "2024-01-14")
ins3 = AiInsightCard("anomaly", "Unusual spike in EMEA support tickets — 340% above baseline.", 0.91, "2024-01-13")`,

  form: `root = Stack([title, form], "column", "lg")
title = TextContent("Contact Us", "2xl", "bold")
form = Form([nameField, emailField, msgField, sep, buttons], "contact", "md")
nameField = Stack([Label("Full Name", "", "", true), Input("John Doe", "name")], "column", "xs")
emailField = Stack([Label("Email", "We'll never share your email.", "", true), Input("john@example.com", "email", "email")], "column", "xs")
msgField = Stack([Label("Message", "", "", true), Textarea("How can we help?", "message", 5)], "column", "xs")
sep = Separator()
buttons = ButtonGroup([Button("Send", "primary", "lg"), Button("Cancel", "secondary", "lg")], "row")`,

  chart: `root = Stack([title, summary, chart], "column", "md")
title = TextContent("Sales Performance", "xl", "bold")
summary = AiChartSummary("Sales trending upward with strong Q4 momentum. Enterprise segment driving growth.", trends)
trends = [{label: "Revenue", direction: "up", value: "+18%"}, {label: "Deal Size", direction: "up", value: "+$12K"}, {label: "Cycle", direction: "down", value: "-8 days"}]
chart = Chart(chartData, "bar", "Monthly Revenue", "", 240, true, true, true)
chartData = [{label: "Jul", value: 180}, {label: "Aug", value: 195}, {label: "Sep", value: 210}, {label: "Oct", value: 198}, {label: "Nov", value: 225}, {label: "Dec", value: 240}]`,
};

// ─── Helper: Update bias panel ───────────────────────────────────────────────

function updateBiasPanel(result: ParseResult) {
  if (!biasEl) return;
  const suggestions = suggestBiasesForTree(result, cognivoLibrary);
  if (suggestions.length === 0) {
    biasEl.innerHTML = '<span class="no-bias">No cognitive biases detected</span>';
    return;
  }
  const html = suggestions.map(s => {
    const icon = s.severity === 'critical'
      ? '<svg width="10" height="10" viewBox="0 0 10 10"><circle cx="5" cy="5" r="5" fill="#EF4444"/></svg>'
      : s.severity === 'high'
      ? '<svg width="10" height="10" viewBox="0 0 10 10"><circle cx="5" cy="5" r="5" fill="#F97316"/></svg>'
      : s.severity === 'medium'
      ? '<svg width="10" height="10" viewBox="0 0 10 10"><circle cx="5" cy="5" r="5" fill="#F59E0B"/></svg>'
      : '<svg width="10" height="10" viewBox="0 0 10 10"><circle cx="5" cy="5" r="5" fill="#10B981"/></svg>';
    return `<div class="bias-item">
      <div class="bias-header">${icon} <strong>${s.biasName}</strong> <span class="bias-severity ${s.severity}">${s.severity}</span></div>
      <div class="bias-components">Components: ${s.components.join(', ')} (${s.occurrences}×)</div>
      <div class="bias-rec">${s.recommendation}</div>
    </div>`;
  }).join('');
  biasEl.innerHTML = html;
}

// ─── Simulate mode (character-by-character, no API) ──────────────────────────

async function streamSimulate() {
  const input = promptEl.value.trim();
  if (!input) return;

  streamBtn.disabled = true;
  generateBtn.disabled = true;
  parseBtn.disabled = true;
  statusEl.textContent = 'Simulating...';
  previewEl.innerHTML = '';
  codeEl.textContent = '';
  biasEl.innerHTML = '';

  const sp = createStreamingParser(cognivoLibrary.toJSONSchema());
  let accumulated = '';

  for (let i = 0; i < input.length; i++) {
    accumulated += input[i];
    codeEl.textContent = accumulated;

    const result = sp.push(input[i]!);
    if (result.root) renderer.render(result, previewEl);
    metaEl.textContent = JSON.stringify(result.meta, null, 2);

    const delay = input[i] === '\n' ? 30 : input[i] === ' ' ? 6 : 10;
    await new Promise(r => setTimeout(r, delay));
  }

  // Final bias analysis
  const finalResult = sp.getResult();
  updateBiasPanel(finalResult);

  streamBtn.disabled = false;
  generateBtn.disabled = false;
  parseBtn.disabled = false;
  statusEl.textContent = 'Done';
}

// ─── Parse mode (instant) ────────────────────────────────────────────────────

function parseInstant() {
  const input = promptEl.value.trim();
  if (!input) return;

  const parser = createParser(cognivoLibrary.toJSONSchema());
  const result = parser.parse(input);

  codeEl.textContent = input;
  metaEl.textContent = JSON.stringify(result.meta, null, 2);
  renderer.render(result, previewEl);
  updateBiasPanel(result);
}

// ─── Generate mode (real LLM) ───────────────────────────────────────────────

let abortController: AbortController | null = null;

async function generateWithLLM() {
  const apiKey = apiKeyEl?.value?.trim();
  if (!apiKey) {
    statusEl.textContent = 'Enter API key first';
    apiKeyEl?.focus();
    return;
  }

  const userPrompt = promptEl.value.trim();
  if (!userPrompt) {
    statusEl.textContent = 'Enter a prompt';
    promptEl.focus();
    return;
  }

  // Setup
  abortController = new AbortController();
  generateBtn.textContent = 'Stop';
  generateBtn.onclick = stopGeneration;
  streamBtn.disabled = true;
  parseBtn.disabled = true;
  statusEl.textContent = 'Generating...';
  previewEl.innerHTML = '';
  codeEl.textContent = '';
  biasEl.innerHTML = '';
  metaEl.textContent = '';

  const model = modelEl?.value || 'gpt-4o';
  const sp = createStreamingParser(cognivoLibrary.toJSONSchema());
  let accumulated = '';

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        stream: true,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
        temperature: 0.7,
        max_tokens: 4096,
      }),
      signal: abortController.signal,
    });

    if (!response.ok) {
      const err = await response.text();
      statusEl.textContent = `Error: ${response.status}`;
      metaEl.textContent = err;
      resetGenerateBtn();
      return;
    }

    const reader = response.body!.getReader();
    const decoder = new TextDecoder();
    let buffer = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop() || '';

      for (const line of lines) {
        if (!line.startsWith('data: ')) continue;
        const data = line.slice(6).trim();
        if (data === '[DONE]') break;

        try {
          const parsed = JSON.parse(data);
          const content = parsed.choices?.[0]?.delta?.content;
          if (content) {
            accumulated += content;
            codeEl.textContent = accumulated;

            const result = sp.push(content);
            if (result.root) renderer.render(result, previewEl);
            metaEl.textContent = JSON.stringify(result.meta, null, 2);
          }
        } catch { /* skip malformed chunks */ }
      }
    }

    // Final
    const finalResult = sp.getResult();
    if (finalResult.root) renderer.render(finalResult, previewEl);
    updateBiasPanel(finalResult);
    statusEl.textContent = `Done — ${accumulated.length} chars`;

  } catch (err: unknown) {
    if ((err as Error).name === 'AbortError') {
      statusEl.textContent = 'Stopped';
    } else {
      statusEl.textContent = `Error: ${(err as Error).message}`;
    }
  }

  resetGenerateBtn();
}

function stopGeneration() {
  abortController?.abort();
  resetGenerateBtn();
}

function resetGenerateBtn() {
  generateBtn.textContent = 'Generate';
  generateBtn.onclick = generateWithLLM;
  streamBtn.disabled = false;
  parseBtn.disabled = false;
}

// ─── Reset ───────────────────────────────────────────────────────────────────

function reset() {
  previewEl.innerHTML = '';
  codeEl.textContent = '';
  metaEl.textContent = '';
  biasEl.innerHTML = '';
  statusEl.textContent = '';
}

function loadExample(key: string) {
  promptEl.value = examples[key] ?? '';
}

function showSystemPrompt() {
  promptPreviewEl.textContent = systemPrompt;
  promptPreviewEl.style.display = promptPreviewEl.style.display === 'none' ? 'block' : 'none';
}

// ─── Wire up ─────────────────────────────────────────────────────────────────

streamBtn.addEventListener('click', streamSimulate);
generateBtn.addEventListener('click', generateWithLLM);
parseBtn.addEventListener('click', parseInstant);
resetBtn.addEventListener('click', reset);

document.querySelectorAll('[data-example]').forEach(btn => {
  btn.addEventListener('click', () => loadExample((btn as HTMLElement).dataset.example!));
});

document.getElementById('prompt-btn')!.addEventListener('click', showSystemPrompt);

// Load default example
loadExample('dashboard');
