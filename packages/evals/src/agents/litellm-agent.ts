import { readFileSync } from 'node:fs';
import { chatCompletion, resolveLiteLLMConfig } from '../litellm.js';
import type { AgentOutput, EvalCase } from '../types.js';
import type { AgentClient } from './types.js';

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

/**
 * Live agent via the shared LiteLLM gateway (Freely's `freely-litellm`).
 * Config: LITELLM_BASE_URL (default http://localhost:4791/v1),
 * LITELLM_API_KEY, LITELLM_MODEL (default deepseek/deepseek-v4-pro — a
 * gateway alias).
 */
export class LiteLLMAgent implements AgentClient {
  readonly name = 'litellm-agent';
  constructor(private model?: string) {}

  async generate(caseDef: EvalCase, sample: number): Promise<AgentOutput> {
    const config = resolveLiteLLMConfig(this.model);
    const text = await chatCompletion(
      config,
      [
        { role: 'system', content: buildSystemPrompt() },
        { role: 'user', content: caseDef.prompt },
      ],
      { maxTokens: 4096, temperature: sample > 0 ? 1 : 0 },
    );
    const html = text
      .replace(/^```(?:html)?\n?/, '')
      .replace(/\n?```$/, '')
      .trim();
    return { html, raw: html };
  }
}
