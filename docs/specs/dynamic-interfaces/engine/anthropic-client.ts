/**
 * Dynamic Software Interfaces — the REAL Anthropic adapter (the live gate path).
 * Plan: ../03-frontier-plan.md (Phase E / X1).
 *
 * Implements PipelineTemplateClient (and TemplateLlmClient) against the real
 * Anthropic API, using SCHEMA-CONSTRAINED output (forced tool call, playbook
 * P49): the model is forced to call a single tool whose input_schema IS our
 * { pipeline?, template } shape, so it returns structured JSON we never parse by
 * hand. Default model claude-opus-4-8. The API key is read from
 * ANTHROPIC_API_KEY — NEVER hard-coded, never committed.
 *
 * This is the ONLY file that talks to the network. Everything else (govern,
 * resolve, reconcile) is pure and offline. Swapping MockPipelineTemplateLLM for
 * this is the entire "go live" change.
 */

// SDK resolves via the adapter-anthropic package (root can't see it by bare name).
import Anthropic from '../../../../packages/adapter-anthropic/node_modules/@anthropic-ai/sdk/index.mjs';
import { type PipelineTemplateClient, type PipelineTemplateOutput } from './pipeline-generate.js';

export interface AnthropicClientOptions {
  apiKey?: string; // defaults to process.env.ANTHROPIC_API_KEY
  model?: string; // defaults to claude-opus-4-8
  maxTokens?: number;
}

/** The tool schema that forces the model to emit { pipeline?, template }. */
const EMIT_SURFACE_TOOL = {
  name: 'emit_surface',
  description:
    'Emit the interface as an optional data pipeline plus a flat template. ' +
    'Bind data ONLY via {kind:"field",key:"<declared field>"}; constants via ' +
    '{kind:"literal",value:...}. Use repeats to render one node per item.',
  input_schema: {
    type: 'object',
    additionalProperties: false,
    required: ['template'],
    properties: {
      pipeline: {
        type: 'object',
        description: 'Optional data transform (filter/sort/group/derive/aggregate). Omit for raw data.',
      },
      template: {
        type: 'object',
        description: 'A flat InterfaceTemplate: { schemaId, root, nodes, repeats? }.',
      },
    },
  },
} as const;

export class AnthropicTemplateClient implements PipelineTemplateClient {
  readonly name = 'anthropic';
  private client: Anthropic;
  private model: string;
  private maxTokens: number;

  constructor(opts: AnthropicClientOptions = {}) {
    const apiKey = opts.apiKey ?? process.env.ANTHROPIC_API_KEY;
    if (!apiKey) throw new Error('ANTHROPIC_API_KEY is not set — provide it via env, never in source.');
    this.client = new Anthropic({ apiKey });
    this.model = opts.model ?? 'claude-haiku-4-5'; // cheap default; caller overrides for quality
    this.maxTokens = opts.maxTokens ?? 4096;
  }

  async generate(req: { system: string; user: string; sample?: number }): Promise<PipelineTemplateOutput> {
    const res = await this.client.messages.create({
      model: this.model,
      max_tokens: this.maxTokens,
      system: req.system,
      messages: [{ role: 'user', content: req.user }],
      tools: [EMIT_SURFACE_TOOL as never],
      tool_choice: { type: 'tool', name: 'emit_surface' }, // force the structured emit (P49)
    });

    // The forced tool call's `input` IS our { pipeline?, template } object.
    const toolUse = res.content.find((b: { type: string }) => b.type === 'tool_use') as
      | { type: 'tool_use'; input: PipelineTemplateOutput }
      | undefined;
    if (!toolUse) throw new Error('Model did not emit the surface tool call.');
    return toolUse.input;
  }
}
