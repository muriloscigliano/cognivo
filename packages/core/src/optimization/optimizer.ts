import type { AiClient } from '../client/types.js';
import type { AiIntent } from '../intents/types.js';
import type { OptimizationConfig, OptimizationResult } from './types.js';
import { PromptEvaluator } from './evaluator.js';

/**
 * Prompt Optimizer
 *
 * Iteratively improves system prompts by evaluating against test cases
 * and using AI to generate variations.
 */
export class PromptOptimizer {
  private evaluator: PromptEvaluator;

  constructor(
    private client: AiClient,
    private config: OptimizationConfig
  ) {
    this.evaluator = new PromptEvaluator(client, config.metrics);
  }

  /**
   * Optimize a system prompt starting from the given base prompt.
   */
  async optimize(basePrompt: string): Promise<OptimizationResult> {
    const maxIterations = this.config.maxIterations ?? 3;
    const targetScore = this.config.targetScore ?? 0.85;
    const variationsPerIteration = this.config.variationsPerIteration ?? 3;

    const history: Array<{ iteration: number; prompt: string; score: number }> = [];
    let bestPrompt = basePrompt;
    let bestScore = 0;
    let totalEvaluations = 0;

    // Evaluate the base prompt first
    const baseResult = await this.evaluator.evaluate(this.config.testCases, basePrompt);
    bestScore = baseResult.overallScore;
    history.push({ iteration: 0, prompt: basePrompt, score: bestScore });
    totalEvaluations += this.config.testCases.length;

    if (bestScore >= targetScore) {
      return { bestPrompt, bestScore, history, totalEvaluations };
    }

    for (let i = 1; i <= maxIterations; i++) {
      // Generate variations using the AI client
      const variations = await this.generateVariations(bestPrompt, bestScore, variationsPerIteration);

      for (const variation of variations) {
        const evalResult = await this.evaluator.evaluate(this.config.testCases, variation);
        totalEvaluations += this.config.testCases.length;
        history.push({ iteration: i, prompt: variation, score: evalResult.overallScore });

        if (evalResult.overallScore > bestScore) {
          bestScore = evalResult.overallScore;
          bestPrompt = variation;
        }
      }

      if (bestScore >= targetScore) break;
    }

    return { bestPrompt, bestScore, history, totalEvaluations };
  }

  /**
   * Generate prompt variations using the AI client.
   */
  private async generateVariations(currentPrompt: string, currentScore: number, count: number): Promise<string[]> {
    const variations: string[] = [];

    try {
      const result = await this.client.runIntent(
        'optimize' as AiIntent,
        {
          dataset: [{ currentPrompt, currentScore, targetScore: this.config.targetScore ?? 0.85 }],
          meta: {
            userQuestion: `Generate ${count} improved variations of this system prompt for an AI data analysis assistant. Each variation should try to improve the quality of structured JSON responses. Return each variation as a bullet point.`,
          },
        }
      );

      // Extract variations from bullets
      if (result.bullets) {
        for (const bullet of result.bullets.slice(0, count)) {
          variations.push(bullet);
        }
      }

      // If not enough variations from bullets, use the explanation
      if (variations.length === 0 && result.explanation) {
        variations.push(result.explanation);
      }
    } catch {
      // If generation fails, create simple variations by appending instructions
      variations.push(`${currentPrompt}\n\nAlways include confidence scores.`);
      if (count > 1) {
        variations.push(`${currentPrompt}\n\nProvide at least 3 bullet points.`);
      }
      if (count > 2) {
        variations.push(`${currentPrompt}\n\nIdentify key drivers with their impact.`);
      }
    }

    return variations;
  }
}
