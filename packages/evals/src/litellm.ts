import { readFileSync } from 'node:fs';

/** Read repo-root .env without logging values (same approach as live-gate.ts). */
export function loadDotEnv(): void {
  // Tests set this to isolate from a real repo-root .env.
  if (process.env.COGNIVO_EVALS_NO_DOTENV) return;
  try {
    // packages/evals/src/ → repo root is three levels up.
    const text = readFileSync(new URL('../../../.env', import.meta.url), 'utf8');
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

export interface LiteLLMConfig {
  baseUrl: string;
  apiKey: string;
  model: string;
}

const DEFAULT_BASE_URL = 'http://localhost:4791/v1';
const DEFAULT_MODEL = 'deepseek/deepseek-v4-pro';

/**
 * Resolve the shared LiteLLM proxy config. All projects hit the same gateway
 * (Freely's `freely-litellm` container); model names are proxy-side aliases
 * (e.g. deepseek/deepseek-v4-pro, zai/glm-4.6 — see the freely repo's
 * backend/litellm/config.yaml).
 */
export function resolveLiteLLMConfig(modelOverride?: string): LiteLLMConfig {
  loadDotEnv();
  const apiKey = process.env.LITELLM_API_KEY;
  if (!apiKey) {
    throw new Error('LITELLM_API_KEY is not set — live evals go through the shared LiteLLM proxy (env or repo-root .env).');
  }
  return {
    baseUrl: (process.env.LITELLM_BASE_URL ?? DEFAULT_BASE_URL).replace(/\/$/, ''),
    apiKey,
    model: modelOverride ?? process.env.LITELLM_MODEL ?? DEFAULT_MODEL,
  };
}

export interface ChatMessage {
  role: 'system' | 'user';
  content: string;
}

interface ChatCompletionResponse {
  choices?: Array<{ message?: { content?: string } }>;
  error?: { message?: string };
}

/**
 * One OpenAI-compatible chat completion against the LiteLLM proxy.
 * Plain fetch — no SDK, works for any provider the proxy routes to.
 */
export async function chatCompletion(
  config: LiteLLMConfig,
  messages: ChatMessage[],
  opts: { maxTokens?: number; temperature?: number } = {},
): Promise<string> {
  const res = await fetch(`${config.baseUrl}/chat/completions`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${config.apiKey}`,
    },
    body: JSON.stringify({
      model: config.model,
      messages,
      max_tokens: opts.maxTokens ?? 4096,
      ...(opts.temperature !== undefined ? { temperature: opts.temperature } : {}),
    }),
  });

  const body = (await res.json().catch(() => ({}))) as ChatCompletionResponse;
  if (!res.ok) {
    throw new Error(`LiteLLM ${res.status}: ${body.error?.message ?? res.statusText}`);
  }
  const content = body.choices?.[0]?.message?.content;
  if (!content) throw new Error('LiteLLM returned an empty completion.');
  return content;
}
