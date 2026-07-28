import { chatCompletion, resolveLiteLLMConfig } from '../litellm.js';
import type { EvalCase } from '../types.js';

export interface RubricScore {
  rubricId: string;
  score: number; // 0..1
  reasoning: string;
}

export interface Judge {
  readonly name: string;
  score(caseDef: EvalCase, html: string): Promise<RubricScore[]>;
}

/**
 * Deterministic offline judge: passes a rubric when any offlineHint appears
 * in the output; abstains (0.5) on rubrics with no hints, since judgement
 * calls can't be verified offline. Crude by design — the live judge is the
 * real grader; this exists so CI wiring is testable without a key.
 */
export class MockJudge implements Judge {
  readonly name = 'mock-judge';

  async score(caseDef: EvalCase, html: string): Promise<RubricScore[]> {
    const lower = html.toLowerCase();
    return caseDef.rubrics.map((r) => {
      if (!r.offlineHints?.length) {
        return { rubricId: r.id, score: 0.5, reasoning: 'no offline hints — abstain (live judge only)' };
      }
      const hit = r.offlineHints.find((h) => lower.includes(h.toLowerCase()));
      return hit
        ? { rubricId: r.id, score: 1, reasoning: `matched hint "${hit}"` }
        : { rubricId: r.id, score: 0, reasoning: `no hint matched (${r.offlineHints.join(', ')})` };
    });
  }
}

/**
 * Live rubric judge via the shared LiteLLM proxy (same config as the agent:
 * LITELLM_BASE_URL / LITELLM_API_KEY / LITELLM_MODEL). Scores each rubric
 * 0 or 1 with one-sentence reasoning.
 */
export class LiteLLMJudge implements Judge {
  readonly name = 'litellm-judge';
  constructor(private model?: string) {}

  async score(caseDef: EvalCase, html: string): Promise<RubricScore[]> {
    const config = resolveLiteLLMConfig(this.model);
    const rubricList = caseDef.rubrics.map((r, i) => `${i + 1}. [${r.id}] ${r.text}`).join('\n');
    const text = await chatCompletion(
      config,
      [
        {
          role: 'system',
          content:
            'You grade generated UI code against rubrics. Reply with strict JSON only: ' +
            '[{"rubricId":"...","score":0|1,"reasoning":"one sentence"}]. Score 1 only when the output clearly satisfies the rubric.',
        },
        {
          role: 'user',
          content: `Intent: ${caseDef.prompt}\n\nGenerated output:\n${html}\n\nRubrics:\n${rubricList}`,
        },
      ],
      { maxTokens: 1024 },
    );
    const parsed = JSON.parse(
      text.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '').trim(),
    ) as RubricScore[];
    return parsed.map((p) => ({ rubricId: p.rubricId, score: p.score ? 1 : 0, reasoning: p.reasoning }));
  }
}
