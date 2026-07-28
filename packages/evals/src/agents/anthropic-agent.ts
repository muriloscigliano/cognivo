import { readFileSync } from 'node:fs';
import type { AgentOutput, EvalCase } from '../types.js';
import type { AgentClient } from './types.js';

/** Read repo-root .env without logging values (same approach as live-gate.ts). */
function loadDotEnv(): void {
  try {
    // packages/evals/src/agents/ → repo root is four levels up.
    const text = readFileSync(new URL('../../../../.env', import.meta.url), 'utf8');
    for (const raw of text.split('\n')) {
      const line = raw.trim();
      if (!line || line.startsWith('#')) continue;
      const eq = line.indexOf('=');
      if (eq < 0) continue;
      const k = line.slice(0, eq).trim();
      let v = line.slice(eq + 1).trim();
      if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) v = v.slice(1, -1);
      const existing = process.env[k];
      if (k && (existing === undefined || existing === '')) process.env[k] = v;
    }
  } catch {
    /* rely on the real environment */
  }
}

/**
 * The grounding under test, verbatim: the published claude-code-skill docs an
 * agent consumer would receive. If these files change, eval results change —
 * that is the point.
 */
function buildSystemPrompt(): string {
  // packages/evals/src/agents/ → packages/ is three levels up. The CLI runs
  // via tsx directly from src, so these relative paths are stable.
  const skillDir = new URL('../../../claude-code-skill/skill/', import.meta.url);
  const parts = ['SKILL.md', 'COMPONENTS.md', 'TOKENS.md', 'PATTERNS.md'].map((f) =>
    readFileSync(new URL(f, skillDir), 'utf8'),
  );
  return [
    'You are generating UI with the Cognivo design system. Follow these docs exactly.',
    'Respond with ONLY the HTML markup for the request — no markdown fences, no commentary.',
    ...parts,
  ].join('\n\n---\n\n');
}

export class AnthropicAgent implements AgentClient {
  readonly name = 'anthropic-agent';
  constructor(private model = 'claude-opus-4-8') {}

  async generate(caseDef: EvalCase, sample: number): Promise<AgentOutput> {
    loadDotEnv();
    if (!process.env.ANTHROPIC_API_KEY) {
      throw new Error('ANTHROPIC_API_KEY is not set — live evals need a key (env or repo-root .env).');
    }
    const { default: Anthropic } = await import('@anthropic-ai/sdk');
    const client = new Anthropic();
    const res = await client.messages.create({
      model: this.model,
      max_tokens: 4096,
      system: buildSystemPrompt(),
      messages: [{ role: 'user', content: caseDef.prompt }],
      ...(sample > 0 ? { temperature: 1 } : { temperature: 0 }),
    });
    const html = res.content
      .filter((b) => b.type === 'text')
      .map((b) => b.text)
      .join('')
      .replace(/^```(?:html)?\n?/, '')
      .replace(/\n?```$/, '')
      .trim();
    return { html, raw: html };
  }
}
