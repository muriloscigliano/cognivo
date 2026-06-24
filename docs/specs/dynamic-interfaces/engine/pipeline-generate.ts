/**
 * Dynamic Software Interfaces — M2+M3: generation emits {pipeline, template};
 * the template binds the pipeline's DERIVED collection.
 * Plan: ../03-frontier-plan.md (Phase M).
 *
 * This closes the governed-middleware loop end to end. The agent emits an
 * optional DataPipeline (M0/M1) plus an InterfaceTemplate (A1). The pipeline
 * runs first (governed, pure) and yields a derived DatasetEnvelope whose fields
 * are the proven outputSchema; the template then resolves + governs against THAT
 * derived envelope. So "show overdue items grouped by priority as a board"
 * works: pipeline = filter(isOverdue) → group(priority); template = a board over
 * the grouped collection. Both layers governed, no eval, fail-closed.
 *
 * M2 = templates bind pipeline output (resolve against the derived envelope).
 * M3 = generation emits both, governed together.
 */

import { type DatasetEnvelope, type GovernanceRejection } from './contracts.js';
import { type InterfaceTemplate, validateTemplate } from './template.js';
import { resolveTemplate, type RenderNode } from './template-resolver.js';
import { type ComponentRegistry } from './governance.js';
import { type DataPipeline, type DataManifest } from './data-op.js';
import { governPipeline, resolvePipeline } from './pipeline.js';

/** What a middleware-aware generator emits. */
export interface PipelineTemplateOutput {
  /** Optional data transform; when absent, the template binds the raw dataset. */
  pipeline?: DataPipeline;
  template: InterfaceTemplate;
}

export interface PipelineTemplateClient {
  readonly name: string;
  generate(req: { system: string; user: string; sample?: number }): Promise<PipelineTemplateOutput>;
}

export interface PipelineGenerateDeps {
  client: PipelineTemplateClient;
  registry: ComponentRegistry;
  /** Vendor data-layer contract; required only if a pipeline is emitted. */
  manifest?: DataManifest;
  now?: Date;
  sample?: number;
}

export interface PipelineGenerateResult {
  output: PipelineTemplateOutput;
  /** The (possibly derived) envelope the template was bound against. */
  boundEnvelope: DatasetEnvelope;
  resolved: RenderNode | null;
  rejections: GovernanceRejection[];
  ok: boolean;
}

function unknownComponentRejections(root: RenderNode, registry: ComponentRegistry): GovernanceRejection[] {
  const out: GovernanceRejection[] = [];
  const walk = (n: RenderNode): void => {
    if (n.type !== 'Group' && !registry.getTagName(n.type)) {
      out.push({ code: 'unknown-component', message: `Unknown component "${n.type}".`, where: n.type });
    }
    n.children.forEach(walk);
  };
  walk(root);
  return out;
}

/**
 * Generate + govern a middleware-aware surface.
 *  1. if a pipeline is emitted: govern it, run it → derived envelope (else raw env)
 *  2. validate the template structure
 *  3. resolve + govern the template against the bound (derived) envelope
 * Fail-closed at every step; `ok` only when everything passes.
 */
export async function generateWithPipeline(
  intent: string,
  env: DatasetEnvelope,
  deps: PipelineGenerateDeps,
  promptText: { system: string; user: string },
): Promise<PipelineGenerateResult> {
  const output = await deps.client.generate({ system: promptText.system, user: promptText.user, sample: deps.sample });
  const rejections: GovernanceRejection[] = [];
  let boundEnvelope = env;

  // 1. middleware layer (optional)
  if (output.pipeline) {
    if (!deps.manifest) {
      rejections.push({ code: 'parse', message: 'A pipeline was emitted but no data manifest is configured.' });
    } else {
      const gov = governPipeline(output.pipeline, env, deps.manifest);
      if (!gov.ok) {
        rejections.push(...gov.rejections);
      } else {
        const run = resolvePipeline(output.pipeline, env, deps.manifest, { now: deps.now });
        if (!run.output) rejections.push(...run.rejections);
        else boundEnvelope = run.output; // template binds the DERIVED collection
      }
    }
  }

  // 2. template structure
  for (const issue of validateTemplate(output.template)) {
    rejections.push({ code: 'parse', message: issue.problem, where: issue.nodeId });
  }

  // 3. template resolve + govern against the bound envelope
  let resolved: RenderNode | null = null;
  if (rejections.length === 0) {
    const r = resolveTemplate(output.template, boundEnvelope);
    rejections.push(...r.rejections);
    if (r.root) rejections.push(...unknownComponentRejections(r.root, deps.registry));
    resolved = rejections.length === 0 ? r.root : null;
  }

  return { output, boundEnvelope, resolved, rejections, ok: rejections.length === 0 && resolved !== null };
}
