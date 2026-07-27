import type { AgentOutput, EvalCase } from '../types.js';

export interface AgentClient {
  readonly name: string;
  /** Generate UI output for an intent prompt. `sample` varies output for self-consistency runs. */
  generate(caseDef: EvalCase, sample: number): Promise<AgentOutput>;
}
